"use client";

import { useCallback, useEffect, useState } from "react";
import { tiraderas } from "@/data/tiraderas";

/**
 * Who goes through each round of the Mundial de Tiraderas, picked from the bracket in admin mode.
 * Keys: "r1:<name>" (goes through from round 1 to the battle royale), "r2:<name>" (from the
 * battle royale to the final) and "final" (the champion). Value: that competitor's name.
 *
 * Stored in this browser's localStorage (instant, no setup). When the shared store is set up
 * (`app/api/winners`), the same picks are also saved there so every visitor sees them.
 */
export type Winners = Record<string, string>;

const KEY = "fmr-winners";
const ADMIN_KEY = "fmr-admin";

const read = (): Winners => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Winners;
  } catch {
    return {};
  }
};

/** The bracket with the picks applied: each round fills the next, and the final's winner is the champion. */
export function resolveBracket(w: Winners) {
  const b = tiraderas.bracket;
  const through = (round: string, names: string[]) => names.filter((n) => n && w[`${round}:${n}`] === n);
  const royale = through("r1", b.round1).slice(0, b.advance1);
  const finalists = through("r2", royale).slice(0, b.advance2);
  const final = Array.from({ length: b.advance2 }, (_, i) => finalists[i] ?? "");
  const champion = final.includes(w.final) ? w.final : "";
  return {
    round1: b.round1,
    /** Round 1 → battle royale: the three slots fill in as picks are made. */
    royale: Array.from({ length: b.advance1 }, (_, i) => royale[i] ?? ""),
    final,
    champion,
    /** Names that go through round 1, and the battle royale; only picks that still hold. */
    through1: royale,
    through2: finalists,
  };
}

export function useWinners() {
  const [winners, setWinners] = useState<Winners>({});
  const [admin, setAdmin] = useState(false);
  const [shared, setShared] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWinners(read());
    // ?admin turns admin mode on for this browser; ?admin=off turns it off
    const q = new URLSearchParams(window.location.search).get("admin");
    try {
      if (q === "off") localStorage.removeItem(ADMIN_KEY);
      else if (q !== null) localStorage.setItem(ADMIN_KEY, localStorage.getItem(ADMIN_KEY) ?? "1");
      setAdmin(localStorage.getItem(ADMIN_KEY) !== null);
    } catch {}
    // the shared copy wins when the store is set up
    fetch("/api/winners", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { configured?: boolean; winners?: Winners }) => {
        if (!d.configured) return;
        setShared(true);
        setWinners(d.winners ?? {});
        try {
          localStorage.setItem(KEY, JSON.stringify(d.winners ?? {}));
        } catch {}
      })
      .catch(() => {});
  }, []);

  const pickWinner = useCallback(
    async (id: string, name: string) => {
      // clicking the current winner again clears it
      const next = { ...winners };
      if (next[id] === name) delete next[id];
      else next[id] = name;
      setWinners(next);
      setError("");
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      if (!shared) return;
      let password = "";
      try {
        password = localStorage.getItem(ADMIN_KEY) ?? "";
        if (!password || password === "1") {
          password = window.prompt("Contraseña de administrador") ?? "";
          localStorage.setItem(ADMIN_KEY, password || "1");
        }
      } catch {}
      try {
        const r = await fetch("/api/winners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, winners: next }),
        });
        if (!r.ok) {
          if (r.status === 401) localStorage.setItem(ADMIN_KEY, "1");
          setError(r.status === 401 ? "Contraseña incorrecta" : "No se pudo guardar");
        }
      } catch {
        setError("No se pudo guardar");
      }
    },
    [winners, shared],
  );

  return { winners, admin, shared, error, pickWinner };
}

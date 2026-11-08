"use client";

import { useCallback, useEffect, useState } from "react";
import { tiraderas } from "@/data/tiraderas";

/**
 * Who goes through each round of the Mundial de Tiraderas, picked from the bracket in admin mode.
 * Keys: "r2:<name>" (wins a Round 2 duel and reaches the semifinals), "sf:<name>" (wins the
 * semifinal and reaches the final) and "final" (the champion). Round 1's result is fixed in data. Value: that competitor's name.
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

/** The bracket with the picks applied: Round 2's winners join Round 1's in the semifinals; the final's winner is the champion. */
export function resolveBracket(w: Winners) {
  const b = tiraderas.bracket;
  const duelists = b.round2.flat();
  const through = (round: string, names: string[]) => names.filter((n) => n && w[`${round}:${n}`] === n);
  // one winner per Round 2 duel
  const r2 = b.round2.map((duel) => through("r2", duel)[0] ?? "");
  const semis = [...b.round1.through, ...r2.filter(Boolean)];
  const finalists = through("sf", semis).slice(0, b.finalists);
  const final = Array.from({ length: b.finalists }, (_, i) => finalists[i] ?? "");
  const champion = final.includes(w.final) ? w.final : "";
  return {
    round1: b.round1,
    round2: b.round2,
    /** Round 2's winner of each duel ("" while open). */
    r2,
    /** The four semifinalists; the empty places are Round 2's open duels. */
    semis: Array.from({ length: b.semis }, (_, i) => semis[i] ?? ""),
    final,
    champion,
    duelists,
    /** Semifinal winners (the finalists); only picks that still hold. */
    through3: finalists,
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

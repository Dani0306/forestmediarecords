"use client";

import { useCallback, useEffect, useState } from "react";
import { tiraderas } from "@/data/tiraderas";

/**
 * Winners of the Mundial de Tiraderas battles, picked from the bracket in admin mode.
 * Keys: "qf0".."qf3" (quarter-finals), "sf0", "sf1" (semi-finals), "final". Value: the winner's name.
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

/** The bracket with the winners applied: each round fills the next, and the final's winner is the champion. */
export function resolveBracket(w: Winners) {
  const b = tiraderas.bracket;
  const pick = (id: string, pair: string[]) => (pair.includes(w[id]) ? w[id] : "");
  const quarterWinners = b.quarterfinals.map((p, i) => pick(`qf${i}`, p));
  const semifinals = [
    [quarterWinners[0], quarterWinners[1]],
    [quarterWinners[2], quarterWinners[3]],
  ] as [string, string][];
  const semiWinners = semifinals.map((p, i) => pick(`sf${i}`, p));
  const final = [semiWinners[0], semiWinners[1]] as [string, string];
  return {
    quarterfinals: b.quarterfinals,
    semifinals,
    final,
    champion: pick("final", final),
    /** Match id → winner, only picks that still hold. */
    winners: {
      ...Object.fromEntries(quarterWinners.map((n, i) => [`qf${i}`, n])),
      ...Object.fromEntries(semiWinners.map((n, i) => [`sf${i}`, n])),
      final: pick("final", final),
    } as Winners,
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

"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dictionaries, type Dict, type Lang } from "./dictionary";

const STORAGE_KEY = "fmr-lang";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx>({
  lang: "es",
  t: dictionaries.es,
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    // Spanish is the default; switch only on an explicit past choice.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "en" || stored === "es") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  return (
    <LangContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>{children}</LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

/** Current time, ticking. Null until mounted so server and client markup agree. */
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function formatCountdown(ms: number, lang: Lang) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    d: String(d),
    h: pad(h),
    m: pad(m),
    s: pad(sec),
    short: d > 0 ? `${d}d ${pad(h)}h` : `${pad(h)}h ${pad(m)}m`,
    units: lang === "es" ? { d: "días", h: "h", m: "min", s: "s" } : { d: "days", h: "h", m: "min", s: "s" },
  };
}

const TZ = "America/Bogota";

export function formatDateParts(iso: string, lang: Lang) {
  const date = new Date(iso);
  const locale = lang === "es" ? "es-CO" : "en-US";
  const get = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, { timeZone: TZ, ...o }).format(date);
  return {
    day: get({ day: "2-digit" }),
    month: get({ month: "short" }).replace(".", "").toUpperCase(),
    weekday: get({ weekday: "short" }).replace(".", "").toUpperCase(),
    time: get({ hour: "2-digit", minute: "2-digit", hour12: false }),
    full: get({ weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }),
  };
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const KEY = "fmr-consent";
export const OPEN_COOKIES = "fmr:cookies";

type Consent = { choice: "all" | "necessary"; date: string };

/** Read the stored consent (null when none, or when storage is blocked). */
export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/**
 * Cookie notice: a steel plate pinned to the bottom until the visitor chooses.
 * The footer's "Preferencias de cookies" reopens it (window event `fmr:cookies`).
 * TODO: load analytics only when `readConsent()?.choice === "all"`.
 */
export default function CookieBanner() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIES, reopen);
    return () => window.removeEventListener(OPEN_COOKIES, reopen);
  }, []);

  const choose = (choice: Consent["choice"]) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ choice, date: new Date().toISOString() }));
    } catch {
      /* storage blocked: the choice holds for this visit */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label={t.cookies.label}
      className="cookie-in fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[56rem] sm:inset-x-6 sm:bottom-6"
    >
      <div className="plate flex flex-col gap-5 rounded-[3px] border border-anvil p-5 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)] sm:p-6 md:flex-row md:items-center md:gap-8">
        <p className="text-[0.95rem] leading-relaxed text-iron/85 md:flex-1">
          {t.cookies.body}{" "}
          <Link href="/privacidad" className="text-ember underline decoration-ember/40 underline-offset-2 hover:text-white-heat">
            {t.cookies.more}
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button type="button" onClick={() => choose("necessary")} className="btn btn-steel min-h-11 flex-1 px-4 text-[0.95rem] sm:flex-none">
            {t.cookies.necessary}
          </button>
          <button type="button" onClick={() => choose("all")} className="btn btn-hot min-h-11 flex-1 px-5 text-[0.95rem] sm:flex-none">
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

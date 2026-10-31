"use client";

import { useSyncExternalStore } from "react";
import { useLang } from "@/lib/i18n";

/** One-day decoration: only renders on 31 October 2026, Medellín time. Delete this file and its CSS afterwards. */
const DAY = "2026-10-31";

const never = () => () => {};
const today = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date()) === DAY;

function Bat({ className, style }: { className: string; style: React.CSSProperties }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 32" className={className} style={style}>
      <g className="hw-flap">
        <path d="M32 10c-3 0-4 3-6 3-3-4-8-8-14-9 3 4 3 8 2 11-3 0-6 1-10 4 6 0 9 1 11 4 3-2 6-1 8 3 2-2 3-4 4-5 3 0 5 1 5 4 0-3 2-4 5-4 1 1 2 3 4 5 2-4 5-5 8-3 2-3 5-4 11-4-4-3-7-4-10-4-1-3-1-7 2-11-6 1-11 5-14 9-2 0-3-3-6-3Z" fill="currentColor" />
      </g>
    </svg>
  );
}

function Web({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 160" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      {[0, 22, 45, 68, 90].map((a) => (
        <line key={a} x1="0" y1="0" x2={160 * Math.cos((a * Math.PI) / 180)} y2={160 * Math.sin((a * Math.PI) / 180)} />
      ))}
      {[28, 52, 80, 112, 148].map((r) => (
        <path key={r} d={`M${r} 0Q${r * 0.62} ${r * 0.62} 0 ${r}`} />
      ))}
    </svg>
  );
}

export default function Halloween() {
  const { t } = useLang();
  const on = useSyncExternalStore(never, today, () => false);
  if (!on) return null;

  return (
    <div aria-hidden="true" className="hw pointer-events-none fixed inset-0 z-[44] overflow-hidden">
      <div className="hw-glow absolute inset-x-0 bottom-0 h-[38svh]" />
      <Web className="absolute left-0 top-16 size-28 text-iron/30 sm:size-40" />
      <Web className="absolute right-0 top-16 size-28 -scale-x-100 text-iron/30 sm:size-40" />

      <div className="hw-spider absolute right-[14%] top-16 flex origin-top flex-col items-center sm:right-[10%]">
        <span className="block w-px bg-iron/50" style={{ height: "clamp(3rem,12svh,8rem)" }} />
        <svg viewBox="0 0 40 36" className="size-8 text-forge-3 drop-shadow-[0_0_6px_rgb(255_90_17/0.55)]">
          <g stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M12 16 3 8M12 20 2 20M12 24 4 32M28 16l9-8M28 20l10 0M28 24l8 8" />
          </g>
          <ellipse cx="20" cy="22" rx="8" ry="9" fill="currentColor" stroke="#ff5a11" strokeWidth="1" />
          <circle cx="20" cy="12" r="5" fill="currentColor" stroke="#ff5a11" strokeWidth="1" />
          <circle cx="18" cy="11" r="1.1" fill="#ff5a11" />
          <circle cx="22" cy="11" r="1.1" fill="#ff5a11" />
        </svg>
      </div>

      <Bat className="hw-bat absolute left-0 top-[22%] w-14 text-forge-3" style={{ ["--d" as string]: "17s", ["--y" as string]: "-6svh" }} />
      <Bat className="hw-bat absolute left-0 top-[48%] w-9 text-forge-3" style={{ ["--d" as string]: "23s", ["--dl" as string]: "-9s", ["--y" as string]: "8svh" }} />
      <Bat className="hw-bat absolute left-0 top-[70%] w-12 text-forge-3" style={{ ["--d" as string]: "29s", ["--dl" as string]: "-18s", ["--y" as string]: "-10svh" }} />

      <span className="hw-pill readout absolute left-1/2 top-[4.75rem] -translate-x-1/2 whitespace-nowrap border border-ember/60 bg-forge/90 px-3 py-1.5 text-[0.68rem] text-glow">
        {t.halloween.greeting} · 31.10
      </span>
    </div>
  );
}

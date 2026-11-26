"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cantina as C, cantinaIso, cantinaPhase, cantinaStart, type CantinaPhase as Phase } from "@/data/cantina";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { ArrowDown, Broadcast } from "./icons";

const HEAT: Record<Phase, string> = { upcoming: "warm", tomorrow: "hot", today: "white", live: "live", done: "cold" };
const PHASES: Phase[] = ["upcoming", "tomorrow", "today", "live", "done"];

/** The print leans toward the mouse: perspective tilt written straight to the element (no re-render). */
function useTilt(max = 6) {
  const ref = useRef<HTMLDivElement>(null);
  return [
    ref,
    {
      onPointerMove: (e: React.PointerEvent) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1100px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
      },
      onPointerLeave: () => {
        if (ref.current) ref.current.style.transform = "";
      },
    },
  ] as const;
}

function Print({ lang }: { lang: "es" | "en" }) {
  const p = C.picture;
  const [tilt, handlers] = useTilt();
  return (
    <figure className="cantina-print" {...handlers}>
      <div ref={tilt} className="cantina-tilt relative overflow-hidden rounded-[3px]" style={{ aspectRatio: "4 / 5" }}>
        <Image src={p.src} alt={p.alt[lang]} fill sizes="(max-width: 1024px) 80vw, 30rem" className="object-cover" style={{ objectPosition: p.focus }} />
        <span aria-hidden="true" className="cantina-gloss pointer-events-none absolute inset-0" />
      </div>
    </figure>
  );
}

/** La Cantina de Trianiss: the FMR Gang's night at Trianiss's bar, live on Kick. */
export default function Cantina() {
  const { t, lang } = useLang();
  const c = t.cantina;
  const now = useNow(60_000);
  // `?cantina=upcoming|tomorrow|today|live|done` previews each state
  const [preview, setPreview] = useState<Phase | null>(null);
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("cantina") as Phase | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (v && PHASES.includes(v)) setPreview(v);
  }, []);

  const phase = preview ?? cantinaPhase(now ?? Number(process.env.BUILD_TIME));
  const done = phase === "done";
  const live = phase === "live";
  // "Empieza en 1d 04h": only once mounted (the clock is null on the server) and while it's ahead
  const left = !preview && now !== null && cantinaStart !== null && cantinaStart > now ? formatCountdown(cantinaStart - now, lang).short : null;
  const d = formatDateParts(cantinaIso, lang);
  // "9:00 p. m." / "9:00 PM": how the team and the flyers say it
  const clock =
    cantinaStart === null
      ? ""
      : new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", { timeZone: "America/Bogota", hour: "numeric", minute: "2-digit", hour12: true }).format(cantinaStart);

  return (
    <section id="cantina" aria-labelledby="cantina-title" data-heat={HEAT[phase]} className="cantina relative isolate overflow-clip border-t border-anvil">
      {/* the bar's own light: the flyer, blown up and dimmed */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image src={C.picture.src} alt="" fill sizes="40vw" className="scale-125 object-cover blur-[80px] brightness-[0.3] saturate-[0.9]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-forge),rgb(11_11_13/0.35)_24%,rgb(11_11_13/0.5)_70%,var(--color-forge))]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="flex flex-wrap items-center gap-3">
              <span className="stamp flex items-center gap-2" style={{ color: "var(--h)" }}>
                {live && <span aria-hidden="true" className="live-dot size-2 rounded-full bg-white-heat" />}
                {c.when[phase]}
              </span>
              <span className="readout text-[0.72rem] text-iron/90">
                {d.weekday} {d.day} {d.month}
              </span>
              {left && (
                <span className="readout text-[0.72rem]" style={{ color: "var(--h)" }}>
                  · {c.startsIn} <span className="tabular-nums">{left}</span>
                </span>
              )}
            </p>
            <h2 id="cantina-title" className="stencil drop mt-5 text-[clamp(3.5rem,11vw,7rem)] leading-[0.84] [--wdth:64]">
              <span className="block">{C.name.lead}</span>
              <span className="flex items-baseline gap-[0.18em]">
                <span className="text-[0.42em] text-iron/80">{c.de}</span>
                <span className="cantina-host" style={{ color: done ? "var(--color-steel)" : "var(--h)" }}>
                  {C.name.host}
                </span>
              </span>
            </h2>
            <p className="readout mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.72rem] text-iron/90">
              <span aria-hidden="true" className="h-px w-10 bg-iron/40" />
              <span>{cantinaStart !== null ? `${clock} · ${c.tz}` : c.timeTbc}</span>
              <span className="text-steel">·</span>
              <span>Kick · {C.channelLabel}</span>
            </p>
            <p className="readout mt-3 text-[0.72rem] text-steel">{c.tags}</p>
            <p className="mt-7 max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/85">{done ? c.done : c.lede}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={C.channel} target="_blank" rel="noreferrer" className={`btn ${done ? "btn-steel" : "btn-hot"}`}>
                <Broadcast className={`size-5 ${done ? "text-ember" : ""}`} />
                {done ? c.channel : live ? c.watchLive : c.watch}
              </a>
              <a href="#streamers" className="btn btn-steel">
                {c.host}
                <ArrowDown className="size-4 text-ember" />
              </a>
            </div>
          </div>

          {/* the flyer art, leaning on the bar */}
          <div className="mx-auto w-full max-w-[19rem] sm:max-w-[26rem] lg:col-span-6 lg:col-start-7 lg:max-w-[30rem]">
            <Print lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

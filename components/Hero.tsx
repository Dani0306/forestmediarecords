"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { artists } from "@/data/artists";
import { heatOf, upcoming } from "@/data/events";
import { hasKick, site } from "@/data/site";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import ForgeBar, { type ForgeBarHandle, type StrikeInfo } from "./ForgeBar";
import { ArrowDown, ArrowUpRight, Broadcast, Hammer } from "./icons";

const BASE_WDTH = 70;

function NextHeat() {
  const { t, lang } = useLang();
  const now = useNow(1000);
  const next = now === null ? null : upcoming(now)[0];
  const heat = next && now !== null ? heatOf(next, now) : "embers";
  const live = heat === "live";
  const cd = next && now !== null ? formatCountdown(new Date(next.start).getTime() - now, lang) : null;
  const date = next ? formatDateParts(next.start, lang) : null;
  const names = next ? next.artists.map((s) => artists.find((a) => a.slug === s)?.name).filter(Boolean) : [];
  const lead = next ? artists.find((a) => a.slug === next.artists[0]) : undefined;
  const photo = lead?.photos[lead.slug === "lentino" ? 1 : 0];

  return (
    <section
      aria-labelledby="next-heat"
      data-heat={heat}
      className="plate relative flex h-full flex-col rounded-[3px] border border-anvil shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)]"
    >
      <div className="flex items-center justify-between gap-4 border-b border-anvil px-5 py-3">
        <h2 id="next-heat" className="stamp text-iron">
          {t.hero.next}
        </h2>
        <span className="stamp flex items-center gap-2" style={{ color: "var(--h)" }}>
          <span className="heat-bar inline-block h-1.5 w-8 rounded-full" />
          {next ? (live ? t.hero.liveNow : t.heat[heat]) : "—"}
        </span>
      </div>

      <div className="iron-photo relative min-h-40 flex-1 overflow-hidden border-b border-anvil bg-forge-3">
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt[lang]}
            fill
            sizes="(max-width: 1024px) 100vw, 34vw"
            loading="eager"
            className="object-cover object-[50%_30%]"
          />
        )}
      </div>

      {now === null ? (
        <div className="h-[15.5rem]" aria-hidden="true" />
      ) : next && date && cd ? (
        <div className="flex flex-col gap-5 px-5 pb-5 pt-5">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center border-r border-anvil pr-4 text-center">
              <span className="stencil text-[3.25rem] leading-none [--wdth:70]" style={{ color: "var(--h)" }}>
                {date.day}
              </span>
              <span className="readout mt-1 text-xs text-iron">{date.month}</span>
            </div>
            <div className="min-w-0">
              <p className="stencil text-[1.65rem] leading-[0.95] text-iron [--wdth:80]">{next.title[lang]}</p>
              <p className="readout mt-2 text-[0.7rem] leading-relaxed text-steel">
                {t.types[next.type]} · {date.weekday} {date.time} · {next.place[lang]}
              </p>
              {names.length > 0 && <p className="mt-1 text-sm text-iron/80">{names.join(" · ")}</p>}
            </div>
          </div>

          <div aria-live="off">
            <p className="stamp mb-2">{live ? t.hero.liveNow : t.hero.startsIn}</p>
            {!live && (
              <p className="readout flex items-baseline gap-1 text-[1.65rem] tracking-normal text-iron">
                <span>{cd.d}</span>
                <span className="text-xs text-steel">{cd.units.d}</span>
                <span className="ml-2">{cd.h}</span>
                <span className="text-xs text-steel">{cd.units.h}</span>
                <span className="ml-2">{cd.m}</span>
                <span className="text-xs text-steel">{cd.units.m}</span>
                <span className="ml-2 tabular-nums" style={{ color: "var(--h)" }}>
                  {cd.s}
                </span>
                <span className="text-xs text-steel">{cd.units.s}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {next.type === "stream" && hasKick ? (
              <a href={site.kick.url} target="_blank" rel="noreferrer" className="readout inline-flex items-center gap-2 text-xs text-ember hover:text-white-heat">
                {t.agenda.watch} <ArrowUpRight className="size-4" />
              </a>
            ) : (
              <a href="#agenda" className="readout inline-flex items-center gap-2 text-xs text-ember hover:text-white-heat">
                {t.hero.ctaAgenda} <ArrowDown className="size-4" />
              </a>
            )}
            {next.sample && (
              <span className="readout rounded-[2px] border border-anvil px-1.5 py-0.5 text-[0.6rem] text-steel">
                {t.agenda.sample}
              </span>
            )}
          </div>
        </div>
      ) : (
        <p className="stencil px-5 py-10 text-[1.65rem] text-steel [--wdth:80]">{t.hero.nextNone}</p>
      )}
    </section>
  );
}

export default function Hero() {
  const { t } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const tempRef = useRef<HTMLSpanElement>(null);
  const bar = useRef<ForgeBarHandle>(null);
  const [blow, setBlow] = useState<StrikeInfo>({ blows: 0, drawn: 0, reset: false });

  const onStrike = useCallback((info: StrikeInfo) => setBlow(info), []);
  const onHeat = useCallback((heat: number, celsius: number) => {
    heroRef.current?.style.setProperty("--heat", heat.toFixed(3));
    if (tempRef.current) tempRef.current.textContent = String(celsius);
  }, []);
  const wdth = BASE_WDTH + Math.min(blow.blows, 9) * 4;

  return (
    <section
      id="top"
      ref={heroRef}
      aria-labelledby="hero-title"
      className="hero-gutter relative grid min-h-[100svh] grid-cols-1 content-center gap-x-8 overflow-hidden px-[var(--g)] pt-24 [--heat:1] lg:grid-cols-12 lg:pt-28"
    >
      <h1
        id="hero-title"
        className="stencil hot-type order-1 text-[clamp(3.25rem,13vw,6rem)] transition-[font-variation-settings] duration-500 ease-[var(--ease-hammer)] lg:col-span-7 lg:row-start-1 lg:text-[6rem]"
        style={{ "--wdth": wdth } as React.CSSProperties}
      >
        {t.hero.lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </h1>

      <div className="order-3 pb-10 pt-8 lg:col-span-7 lg:row-start-2 lg:pb-0 lg:pt-8">
        <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/85 [font-variation-settings:'wdth'_92]">
          {t.hero.lede}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#agenda" className="btn btn-hot">
            {t.hero.ctaAgenda}
            <ArrowDown className="size-5" />
          </a>
          <a
            href={hasKick ? site.kick.url : "#kick"}
            {...(hasKick ? { target: "_blank", rel: "noreferrer" } : {})}
            className="btn btn-steel"
          >
            <Broadcast className="size-5 text-ember" />
            {t.hero.ctaKick}
          </a>
          <a
            href="#demos"
            className="readout ml-1 inline-flex min-h-11 items-center px-2 text-xs text-steel underline decoration-anvil hover:text-iron hover:decoration-ember"
          >
            {t.hero.ctaDemo}
          </a>
        </div>
      </div>

      <div className="order-4 pb-12 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:pb-0">
        <NextHeat />
      </div>

      {/* the bar: the page's one unbroken line */}
      <div className="order-2 -mx-[var(--g)] mt-4 lg:order-none lg:col-span-12 lg:row-start-3 lg:mt-10">
        <ForgeBar ref={bar} onHeat={onHeat} onStrike={onStrike} className="h-[clamp(110px,18vh,180px)] w-full" />
        <div className="px-[var(--g)]">
          <div className="ruler h-3 w-full opacity-70" aria-hidden="true" />
          <div className="readout flex justify-between pt-1 text-[0.6rem] text-steel" aria-hidden="true">
            {["0", "+25", "+50", "+75", "+100", "+125", "+150", "+175", "+200", "+225", "MM"].map((n, i) => (
              <span key={n} className={i % 2 ? "hidden sm:inline" : ""}>
                {n}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-anvil py-3 lg:border-b-0">
            <dl className="readout flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] sm:gap-x-8">
              <div className="flex items-baseline gap-2">
                <dt className="text-steel">{t.hero.blow}</dt>
                <dd className="text-xl tracking-normal text-iron">{String(blow.blows).padStart(2, "0")}</dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="text-steel">{t.hero.length}</dt>
                <dd className="text-xl tracking-normal text-ember">
                  +{blow.drawn}
                  <span className="ml-1 text-[0.7rem] text-steel">MM</span>
                </dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="text-steel">{t.hero.temp}</dt>
                <dd className="text-xl tracking-normal text-iron">
                  <span ref={tempRef}>1280</span>
                  <span className="ml-1 text-[0.7rem] text-steel">°C</span>
                </dd>
              </div>
            </dl>
            <span className="stamp hidden xl:inline">{t.hero.origin} · 6.2442° N 75.5812° W</span>
            <button
              type="button"
              onClick={() => bar.current?.strike()}
              aria-label={t.hero.strikeLabel}
              className="btn btn-steel ml-auto min-h-11 px-4 text-[0.95rem]"
            >
              <Hammer className="size-5 text-ember" />
              {t.hero.strike}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { artists } from "@/data/artists";
import {
  heatOf,
  nextMain,
  nextSecondary,
  type ForgeEvent,
  type Heat,
} from "@/data/events";
import { hasKick, site } from "@/data/site";
import { eventPhoto } from "@/lib/eventPhoto";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { ArrowDown, ArrowUpRight, Broadcast } from "./icons";

const artistNames = (e: ForgeEvent) =>
  e.artists
    .map((s) => artists.find((a) => a.slug === s)?.name)
    .filter(Boolean) as string[];

/** Where an event's action points: Kick for streams (when connected), else the agenda. */
function EventAction({ e }: { e: ForgeEvent }) {
  const { t } = useLang();
  const cls =
    "readout inline-flex min-h-11 items-center gap-2 text-xs text-ember hover:text-white-heat";
  const url = e.url || (e.type === "stream" && hasKick ? site.kick.url : "");
  return url ? (
    <a href={url} target="_blank" rel="noreferrer" className={cls}>
      {e.type === "stream" ? t.agenda.watch : "Info"}{" "}
      <ArrowUpRight className="size-4" />
    </a>
  ) : (
    <a href="#agenda" className={cls}>
      {t.hero.seeAgenda} <ArrowDown className="size-4" />
    </a>
  );
}

/**
 * Main event: no card. The event sits straight on a blurred black field on the
 * right of the hero (a band under the actions on mobile), feathered into the video.
 */
function MainHeat({ e, now: initial }: { e: ForgeEvent; now: number }) {
  const { t, lang } = useLang();
  // the countdown ticks here, so only this block re-renders each second
  const now = useNow(1000) ?? initial;
  const heat = heatOf(e, now);
  const live = heat === "live";
  const cd = formatCountdown(new Date(e.start).getTime() - now, lang);
  const date = formatDateParts(e.start, lang);
  const names = artistNames(e);
  const photo = eventPhoto(e);

  return (
    <section
      aria-labelledby="main-heat"
      data-heat={heat}
      className="main-heat relative flex flex-col justify-end px-[var(--g)] pb-12 pt-14 lg:absolute lg:inset-y-0 lg:right-0 lg:z-10 lg:w-[calc(var(--g)+var(--mh-content)+var(--mh-lead))] lg:pb-14 lg:pl-(--mh-lead) lg:pt-24 lg:[--mh-content:clamp(24rem,32vw,32rem)] lg:[--mh-lead:clamp(5rem,7vw,7rem)]"
    >
      {/* the field: black, blurred, feathered into the video */}
      <div aria-hidden="true" className="glass-side absolute inset-0 -z-10" />

      <div className="flex items-center justify-between gap-4">
        <h2 id="main-heat" className="stamp text-iron">
          {t.hero.next}
        </h2>
        <span
          className="stamp flex items-center gap-2"
          style={{ color: "var(--h)" }}
        >
          <span className="heat-bar inline-block h-1.5 w-8 rounded-full" />
          {live ? t.hero.liveNow : t.heat[heat]}
        </span>
      </div>

      {photo && e.poster ? (
        /* a poster keeps its own shape and shows whole, untreated; the panel sizes around it */
        <div
          className="main-poster relative mt-5 shrink-0 overflow-hidden rounded-[3px] bg-forge-3 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)]"
          style={
            {
              "--ratio": e.poster.width / e.poster.height,
              aspectRatio: `${e.poster.width} / ${e.poster.height}`,
            } as React.CSSProperties
          }
        >
          <Image
            src={photo.src}
            alt={photo.alt[lang]}
            fill
            sizes="(max-width: 1024px) 100vw, 32rem"
            loading="eager"
            className="object-cover"
          />
        </div>
      ) : (
        photo && (
          <div
            className="iron-photo relative mt-5 aspect-[16/10] overflow-hidden rounded-[3px] bg-forge-3 lg:aspect-[16/9] lg:max-h-[30vh] lg:w-full"
            style={{ "--lift": photo.lift ?? 0.9 } as React.CSSProperties}
          >
            <Image
              src={photo.src}
              alt={photo.alt[lang]}
              fill
              sizes="(max-width: 1024px) 100vw, 36vw"
              loading="eager"
              className="object-cover object-[50%_30%]"
            />
            <span className="readout absolute left-3 top-3 z-10 bg-forge/85 px-2 py-1 text-[0.58rem] text-glow">
              {t.agenda.featured}
            </span>
          </div>
        )
      )}

      <div className="mt-6 flex items-end gap-5">
        <p className="flex shrink-0 flex-col">
          <span
            className="stencil text-[clamp(4rem,7vw,5.5rem)] leading-[0.8] [--wdth:64]"
            style={{ color: "var(--h)" }}
          >
            {date.day}
          </span>
          <span className="readout mt-2 text-xs text-iron">
            {date.month} · {date.weekday}
          </span>
        </p>
        <div className="min-w-0 pb-0.5">
          <p className="stencil text-[clamp(1.6rem,2.4vw,2.25rem)] leading-[0.92] text-iron [--wdth:78]">
            {e.title[lang]}
          </p>
          <p className="readout mt-2 text-[0.68rem] leading-relaxed text-steel">
            {t.types[e.type]} · {date.time} · {e.place[lang]}
            {names.length > 0 && (
              <span className="text-iron/80"> · {names.join(", ")}</span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-7 border-t border-iron/15 pt-5" aria-live="off">
        <p className="stamp mb-3">{live ? t.hero.liveNow : t.hero.startsIn}</p>
        {!live && (
          <p className="readout flex flex-wrap items-baseline gap-x-1 text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-normal text-iron">
            <span>{cd.d}</span>
            <span className="mr-3 text-xs text-steel">{cd.units.d}</span>
            <span>{cd.h}</span>
            <span className="mr-3 text-xs text-steel">{cd.units.h}</span>
            <span>{cd.m}</span>
            <span className="mr-3 text-xs text-steel">{cd.units.m}</span>
            <span style={{ color: "var(--h)" }}>{cd.s}</span>
            <span className="text-xs text-steel">{cd.units.s}</span>
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <EventAction e={e} />
        {e.sample && (
          <span className="readout rounded-[2px] border border-anvil px-1.5 py-0.5 text-[0.6rem] text-steel">
            {t.agenda.sample}
          </span>
        )}
      </div>
    </section>
  );
}

/** Secondary event, stamped along the hero's heat line.
 * Kept for when the first real secondary event exists; its render is commented out in Hero. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SecondaryHeat({ e, now }: { e?: ForgeEvent; now: number | null }) {
  const heat = e && now !== null ? heatOf(e, now) : "embers";
  const live = heat === "live";

  return (
    <section
      aria-labelledby={e ? "secondary-heat" : undefined}
      data-heat={heat}
      className="relative"
    >
      {/* the heat line: cold steel on the left, glowing toward the event */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, rgb(42 45 49 / 0.9) 0%, var(--h2) 45%, var(--h) 85%, color-mix(in oklab, var(--h) 50%, var(--color-white-heat)) 100%)",
          boxShadow:
            "0 4px 14px -4px color-mix(in oklab, var(--h) 70%, transparent)",
        }}
      />
      {e && now !== null && (
        <SecondaryRow e={e} now={now} live={live} heat={heat} />
      )}
    </section>
  );
}

function SecondaryRow({
  e,
  now,
  live,
  heat,
}: {
  e: ForgeEvent;
  now: number;
  live: boolean;
  heat: Heat;
}) {
  const { t, lang } = useLang();
  const cd = formatCountdown(new Date(e.start).getTime() - now, lang);
  const date = formatDateParts(e.start, lang);
  const names = artistNames(e);

  return (
    <div className="bg-forge/90 px-[var(--g)]">
      <div className="flex min-h-20 flex-wrap items-center gap-x-8 gap-y-3 py-4">
        <h2
          id="secondary-heat"
          className="stamp flex items-center gap-2 text-iron"
        >
          {t.hero.alsoNext}
          <span style={{ color: "var(--h)" }}>
            · {live ? t.hero.liveNow : t.heat[heat]}
          </span>
        </h2>

        <p className="flex min-w-0 items-baseline gap-4">
          <span
            className="stencil shrink-0 text-[2.25rem] leading-none [--wdth:68]"
            style={{ color: "var(--h)" }}
          >
            {date.day} <span className="text-[1.25rem]">{date.month}</span>
          </span>
          <span className="min-w-0">
            <span className="stencil block truncate text-[1.35rem] leading-none text-iron [--wdth:80]">
              {e.title[lang]}
            </span>
            <span className="readout mt-1 block truncate text-[0.62rem] text-steel">
              {t.types[e.type]} · {date.weekday} {date.time} · {e.place[lang]}
              {names.length > 0 && ` · ${names.join(", ")}`}
            </span>
          </span>
        </p>

        {!live && (
          <p
            className="readout flex items-baseline gap-1 text-[1.15rem] tracking-normal text-iron"
            aria-live="off"
          >
            <span className="sr-only">{t.hero.startsIn} </span>
            {cd.d}
            <span className="text-[0.6rem] text-steel">{cd.units.d}</span>
            <span className="ml-1.5">{cd.h}</span>
            <span className="text-[0.6rem] text-steel">{cd.units.h}</span>
            <span className="ml-1.5">{cd.m}</span>
            <span className="text-[0.6rem] text-steel">{cd.units.m}</span>
            <span className="ml-1.5" style={{ color: "var(--h)" }}>
              {cd.s}
            </span>
            <span className="text-[0.6rem] text-steel">{cd.units.s}</span>
          </p>
        )}

        <div className="flex items-center gap-4 lg:ml-auto">
          {e.sample && (
            <span className="readout rounded-[2px] border border-anvil px-1.5 py-0.5 text-[0.58rem] text-steel">
              {t.agenda.sample}
            </span>
          )}
          <EventAction e={e} />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  // which events lead only changes when one starts or ends; a slow clock is enough
  const now = useNow(30_000);
  const video = useRef<HTMLVideoElement>(null);
  const main = now === null ? undefined : nextMain(now);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- used by the secondary strip
  const secondary = now === null ? undefined : nextSecondary(now);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // reduced motion: the loop has no controls, so it stays on its poster frame
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // only decode (and re-blur under the glass) while the hero is on screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else if (!entry.isIntersecting) v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero-gutter hero-scope relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* background: artist loop */}
      <video
        ref={video}
        className="hero-zoom absolute inset-0 size-full object-cover object-[60%_30%] lg:object-[52%_40%]"
        src="/videoloop-web.webm"
        poster="/videoloop-poster.webp"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* scrims keep the type legible without hiding the artist */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-forge)_0%,rgb(11_11_13/0.78)_30%,rgb(11_11_13/0.38)_52%,rgb(11_11_13/0.08)_74%,rgb(11_11_13/0.5)_100%)] lg:bg-[linear-gradient(90deg,var(--color-forge)_0%,rgb(11_11_13/0.86)_28%,rgb(11_11_13/0.3)_55%,rgb(11_11_13/0.15)_75%,rgb(11_11_13/0.1)_100%),linear-gradient(to_top,var(--color-forge)_0%,transparent_38%)]"
      />

      <div className="relative z-10 grid flex-1 grid-cols-1 content-end gap-10 px-[var(--g)] pb-10 pt-28 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-12">
        <div className="hero-exit lg:col-span-6 xl:col-span-7">
          <h1
            id="hero-title"
            className="stencil hot-type cool-in text-[clamp(3.25rem,13vw,6rem)] [--wdth:70] lg:text-[6rem]"
          >
            {t.hero.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/90 [font-variation-settings:'wdth'_92]">
            {t.hero.lede}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#demos"
              className="btn btn-hot max-w-full whitespace-normal py-3 text-center leading-tight sm:whitespace-nowrap"
            >
              {t.hero.ctaJoin}
            </a>
            <a
              href={hasKick ? site.kick.url : "#kick"}
              {...(hasKick ? { target: "_blank", rel: "noreferrer" } : {})}
              className="btn btn-steel"
            >
              <Broadcast className="size-5 text-ember" />
              {t.hero.ctaKick}
            </a>
          </div>
        </div>
      </div>
      {main && now !== null && <MainHeat e={main} now={now} />}
      {/* <div className="relative z-10">
        <SecondaryHeat e={secondary} now={now} />
      </div> */}
    </section>
  );
}

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
import { icsHref } from "@/lib/ics";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { ArrowDown, ArrowUpRight, Broadcast, CalendarPlus } from "./icons";

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

/** Calendar day in Medellín, for "Hoy" / "Mañana". */
const dayKey = (ms: number) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(ms);

/** The countdown, big: four measured cells; only this block re-renders each second. */
function BigCountdown({ e }: { e: ForgeEvent }) {
  const { t, lang } = useLang();
  const now = useNow(1000);
  const cd =
    now === null
      ? null
      : formatCountdown(new Date(e.start).getTime() - now, lang);
  const cells = [
    { v: cd?.d, label: t.hero.units.d },
    { v: cd?.h, label: t.hero.units.h },
    { v: cd?.m, label: t.hero.units.m },
    { v: cd?.s, label: t.hero.units.s, hot: true },
  ];
  return (
    <div>
      <p className="stamp mb-3 text-iron/90">{t.hero.startsIn}</p>
      <div
        role="timer"
        aria-live="off"
        aria-label={
          cd
            ? `${t.hero.startsIn} ${cd.d} ${t.hero.units.d}, ${cd.h} ${t.hero.units.h}, ${cd.m} ${t.hero.units.m}`
            : t.hero.startsIn
        }
        className="grid grid-cols-4 border-y border-iron/15"
      >
        {cells.map((c, i) => (
          <div
            key={c.label}
            className={`flex flex-col gap-2 py-4 sm:py-5 ${i > 0 ? "border-l border-iron/15 pl-3 sm:pl-5" : ""}`}
          >
            <span
              className="readout overflow-hidden text-[clamp(2.6rem,7.2vw,7rem)] leading-[0.9] tracking-normal"
              style={{
                // the heat colour, lifted toward white heat so far-off (dark) states still read
                color: c.hot
                  ? "color-mix(in oklab, var(--h) 55%, var(--color-white-heat))"
                  : "var(--color-iron)",
              }}
            >
              {/* the seconds drop in like a stamp on every tick */}
              <span
                key={c.hot ? c.v : undefined}
                className={`inline-block ${c.hot && c.v ? "tick" : ""}`}
              >
                {c.v ?? "--"}
              </span>
            </span>
            <span className="readout text-[0.58rem] text-steel sm:text-[0.68rem]">
              {c.label}
            </span>
          </div>
        ))}
      </div>
      {/* the heat line under the clock: the event's temperature */}
      <span
        aria-hidden="true"
        className="heat-bar mt-[-1px] block h-[3px] w-full rounded-full"
      />
    </div>
  );
}

/**
 * Event takeover: when a main event is coming, the whole first screen is the event.
 * Its poster (or photo) leads, its own picture glows behind everything, the title
 * is stamped huge and the countdown is the loudest thing on the page.
 */
function EventTakeover({
  e,
  now,
  secondary,
}: {
  e: ForgeEvent;
  now: number | null;
  secondary?: ForgeEvent;
}) {
  const { t, lang } = useLang();
  const heat = now === null ? "white" : heatOf(e, now);
  const live = heat === "live";
  const date = formatDateParts(e.start, lang);
  const names = artistNames(e);
  const photo = eventPhoto(e);
  const title = e.title[lang];
  const split = title.match(/^(.*?)\s*(#\s?\d+)$/);
  const startMs = new Date(e.start).getTime();
  const rel =
    now === null
      ? null
      : dayKey(startMs) === dayKey(now)
        ? t.hero.today
        : dayKey(startMs) === dayKey(now + 24 * 3600_000)
          ? t.hero.tomorrow
          : null;
  const url = e.url || (e.type === "stream" && hasKick ? site.kick.url : "");
  const ratio = e.poster ? e.poster.width / e.poster.height : 4 / 5;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-heat={heat}
      className="hero-gutter hero-scope relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* the event's own picture, blown up into a dark glow */}
      {photo && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="50vw"
            preload
            className="scale-125 object-cover blur-[70px] brightness-[0.42] saturate-[1.1]"
          />
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_70%_80%,color-mix(in_oklab,var(--h)_16%,transparent),transparent_70%),linear-gradient(to_bottom,rgb(11_11_13/0.55),transparent_22%,transparent_70%,var(--color-forge))]"
      />

      <div className="grid flex-1 grid-cols-1 items-center gap-6 px-[var(--g)] pb-8 pt-20 lg:grid-cols-12 lg:gap-12 lg:pb-10 lg:pt-28">
        {/* the poster, whole, in its own shape */}
        <div className="flex justify-center lg:col-span-5 lg:justify-start">
          {photo && (
            <div
              className={`takeover-poster relative overflow-hidden rounded-[3px] bg-forge-3 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95)] ${e.poster ? "" : "iron-photo"}`}
              style={
                {
                  "--ratio": ratio,
                  "--lift": photo.lift ?? 0.9,
                  aspectRatio: String(ratio),
                } as React.CSSProperties
              }
            >
              <Image
                src={photo.src}
                alt={photo.alt[lang]}
                fill
                preload
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="hero-exit min-w-0 lg:col-span-7">
          <h1
            id="hero-title"
            className="readout flex items-center gap-3 text-[0.7rem] text-iron/90"
          >
            <Image
              src="/logo-512.webp"
              alt=""
              width={28}
              height={28}
              className="size-7"
            />
            <span>
              Forest Media Récords{" "}
              <span className="text-steel">{t.hero.presents}</span>
            </span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 lg:mt-6">
            <p className="stamp text-iron">{t.hero.next}</p>
            <span
              className="stamp flex items-center gap-2"
              style={{ color: "var(--h)" }}
            >
              <span
                className={`heat-bar inline-block h-1.5 w-8 rounded-full`}
              />
              {live ? t.hero.liveNow : t.heat[heat]}
            </span>
            {e.sample && (
              <span className="readout rounded-[2px] border border-anvil px-1.5 py-0.5 text-[0.58rem] text-steel">
                {t.agenda.sample}
              </span>
            )}
          </div>

          <h2 className="stencil drop mt-3 text-balance text-[clamp(3rem,6.6vw,7.25rem)] leading-[0.84] text-iron [--wdth:64]">
            {split ? (
              <>
                {split[1]} <span style={{ color: "var(--h)" }}>{split[2]}</span>
              </>
            ) : (
              title
            )}
          </h2>

          <p className="readout mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.72rem] leading-relaxed text-iron/90 sm:text-[0.8rem]">
            {rel && (
              <span
                className="rounded-[2px] px-1.5 py-0.5 text-scale"
                style={{ background: "var(--h)" }}
              >
                {rel}
              </span>
            )}
            <span>
              {date.weekday} {date.day} {date.month} · {date.time}
            </span>
            <span className="text-steel">·</span>
            <span>{e.place[lang]}</span>
            <span className="text-steel">·</span>
            <span className="text-steel">{t.types[e.type]}</span>
            {names.length > 0 && (
              <span className="text-steel">· {names.join(", ")}</span>
            )}
          </p>

          <div className="mt-6 lg:mt-10">
            {live ? (
              <div className="border-y border-iron/15 py-5">
                <p
                  className="stencil flex items-center gap-4 text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] [--wdth:66]"
                  style={{ color: "var(--h)" }}
                >
                  <span
                    aria-hidden="true"
                    className="live-dot size-[0.28em] rounded-full"
                    style={{ background: "var(--h)" }}
                  />
                  {t.hero.liveBig}
                </p>
              </div>
            ) : (
              <BigCountdown e={e} />
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-hot"
              >
                <Broadcast className="size-5" />
                {live
                  ? t.hero.watchLive
                  : e.type === "stream"
                    ? t.agenda.watch
                    : "Info"}
              </a>
            ) : null}
            {!live && (
              <a
                href={icsHref(e, lang)}
                download={`${e.id}.ics`}
                className={`btn ${url ? "btn-steel" : "btn-hot"}`}
              >
                <CalendarPlus className={`size-5 ${url ? "text-ember" : ""}`} />
                {t.agenda.addCal}
              </a>
            )}
            <a
              href="#agenda"
              className="readout inline-flex min-h-11 items-center gap-2 px-2 text-xs text-iron/80 hover:text-white-heat"
            >
              {t.hero.allEvents} <ArrowDown className="size-4 text-ember" />
            </a>
          </div>
        </div>
      </div>
      {secondary && (
        <div className="relative z-10">
          <SecondaryHeat e={secondary} now={now} />
        </div>
      )}
    </section>
  );
}

/**
 * Secondary event: the soonest `main: false` event, stamped along a heat line
 * at the bottom of the first screen (both hero modes). Absent when there is none.
 */
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
  now: initial,
  live,
  heat,
}: {
  e: ForgeEvent;
  now: number;
  live: boolean;
  heat: Heat;
}) {
  const { t, lang } = useLang();
  // the strip ticks on its own 1s clock (the hero's clock only runs every 30s),
  // so only this row re-renders each second
  const now = useNow(1000) ?? initial;
  const cd = formatCountdown(new Date(e.start).getTime() - now, lang);
  const date = formatDateParts(e.start, lang);
  const names = artistNames(e);

  return (
    <div className="bg-forge/90 px-[var(--g)]">
      <div className="flex min-h-20 flex-wrap items-center gap-x-8 gap-y-3 py-4 lg:flex-nowrap">
        <h2
          id="secondary-heat"
          className="stamp flex shrink-0 items-center gap-2 text-iron"
        >
          {t.hero.alsoNext}
          <span style={{ color: "var(--h)" }}>
            · {live ? t.hero.liveNow : t.heat[heat]}
          </span>
        </h2>

        <p className="flex min-w-0 items-baseline gap-4 max-lg:basis-full lg:flex-1">
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
            className="readout flex shrink-0 items-baseline gap-1 text-[1.15rem] tracking-normal text-iron"
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

        <div className="flex shrink-0 items-center gap-4 lg:ml-auto">
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
  // before the clock mounts, use the build time so server and client agree
  const main = nextMain(now ?? Number(process.env.BUILD_TIME));
  const takeover = Boolean(main);
  const secondary = nextSecondary(now ?? Number(process.env.BUILD_TIME));

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
    // re-run when the takeover hands the hero back to the video
  }, [takeover]);

  // a main event takes over the whole first screen; otherwise the artist video leads
  if (main) return <EventTakeover e={main} now={now} secondary={secondary} />;

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
        poster="/videoloop-renzo-poster.webp"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        {/* MP4 (H.264) first: iPhones can't play these WebM files */}
        <source src="/videoloop-renzo.mp4" type="video/mp4" />
        <source src="/videoloop-renzo.webm" type="video/webm" />
      </video>
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
      {/* {secondary && (
        <div className="relative z-10">
          <SecondaryHeat e={secondary} now={now} />
        </div>
      )} */}
    </section>
  );
}

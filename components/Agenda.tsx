"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { artists } from "@/data/artists";
import {
  eventEnd,
  heatOf,
  past,
  upcoming,
  type EventType,
  type ForgeEvent,
  type Heat,
} from "@/data/events";
import { hasKick, site } from "@/data/site";
import { eventPhoto } from "@/lib/eventPhoto";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { icsHref } from "@/lib/ics";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CalendarPlus } from "./icons";

type Filter = "all" | EventType;
const TYPES: EventType[] = ["concert", "stream", "showcase", "release"];
const DAY = 24 * 3600_000;
/** Finished events kept on the rod, for context: the last few heats, cooled. */
const PAST_ON_ROD = 3;

const LG = "(min-width: 1024px)";
const subscribe = (cb: () => void) => {
  const mq = matchMedia(LG);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
/** Desktop draws the rod across; phones run it down the left edge. */
const useDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => matchMedia(LG).matches,
    () => false,
  );

const startOf = (e: ForgeEvent) => new Date(e.start).getTime();
const watchUrl = (e: ForgeEvent) =>
  e.url || (e.type === "stream" && hasKick ? site.kick.url : "");
/** Where to watch a finished event: its recording, else (streams) the Kick channel. */
const replayUrl = (e: ForgeEvent) => e.replay || (e.type === "stream" && hasKick ? site.kick.url : "");
const names = (e: ForgeEvent) =>
  e.artists
    .map((s) => artists.find((a) => a.slug === s)?.name)
    .filter(Boolean)
    .join(", ");

/** Midnight in Medellín for a timestamp (Bogotá has no daylight saving: UTC−5). */
const dayStart = (ms: number) => {
  const offset = 5 * 3600_000;
  return Math.floor((ms - offset) / DAY) * DAY + offset;
};

/**
 * The rod's domain: a little before the first heat (or today) to a little after the last.
 * Positions are true to time, so the gaps between events mean something.
 */
function useScale(list: ForgeEvent[], now: number) {
  const times = list.map(startOf);
  const lo = dayStart(Math.min(now, ...times)) - 2 * DAY;
  const hi = dayStart(Math.max(now, ...times.map((t, i) => Math.max(t, eventEnd(list[i]))))) + 3 * DAY;
  const x = (t: number) => ((t - lo) / (hi - lo)) * 100;
  return { lo, hi, x };
}

/**
 * The rod's colour is the heat ramp laid onto time: cold steel behind "today",
 * white heat at the needle, cooling through the agenda's own thresholds
 * (3 days, 1 week, 3 weeks) to embers at the far end.
 */
function rodGradient(now: number, x: (t: number) => number) {
  const n = x(now);
  const at = (days: number) => Math.min(100, Math.max(n, x(now + days * DAY)));
  return `linear-gradient(90deg, var(--color-anvil) 0%, #5b5f66 ${n}%, var(--color-white-heat) ${n}%, var(--color-glow) ${at(3)}%, var(--color-ember) ${at(7)}%, #e04a16 ${at(21)}%, #9c2410 ${at(45)}%, #3a0f08 100%)`;
}

/** Ticks under the rod: every day a hairline, Mondays a taller mark with a date, the 1st a month stamp. */
function Ruler({ lo, hi, x }: { lo: number; hi: number; x: (t: number) => number }) {
  const { lang } = useLang();
  const days = Math.round((hi - lo) / DAY);
  const dense = days > 100;
  const marks: { t: number; kind: "day" | "week" | "month"; label: boolean }[] = [];
  let lastMonth = -Infinity;
  for (let t = lo; t <= hi; t += DAY) {
    const p = formatDateParts(new Date(t + 12 * 3600_000).toISOString(), lang);
    const monday = new Date(t + 12 * 3600_000).getUTCDay() === 1;
    const fits = x(t) < 94;
    if (p.day === "01") {
      marks.push({ t, kind: "month", label: fits });
      lastMonth = t;
    } else if (monday) marks.push({ t, kind: "week", label: fits && t - lastMonth > 3 * DAY });
    else if (!dense) marks.push({ t, kind: "day", label: false });
  }
  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-full h-14">
      {marks.map(({ t, kind, label }) => {
        const p = formatDateParts(new Date(t + 12 * 3600_000).toISOString(), lang);
        return (
          <span
            key={t}
            className="absolute top-0 flex -translate-x-px flex-col items-start"
            style={{ left: `${x(t)}%` }}
          >
            <span
              className={`block w-px ${kind === "day" ? "h-1.5 bg-iron/15" : kind === "week" ? "h-3 bg-iron/35" : "h-5 bg-iron/60"}`}
            />
            {label && (
              <span
                className={`readout mt-1.5 whitespace-nowrap pl-1 text-[0.56rem] ${kind === "month" ? "text-iron" : "text-steel"}`}
              >
                {kind === "month" ? p.month : `${p.day} ${p.month}`}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

/** The four measured cells; only this ticks every second. */
function Countdown({ e }: { e: ForgeEvent }) {
  const { t, lang } = useLang();
  const now = useNow(1000);
  if (now === null) return null;
  const start = startOf(e);
  if (now >= start && now < eventEnd(e)) {
    return (
      <p
        className="stencil flex items-center gap-3 text-[clamp(2.5rem,5vw,4rem)] leading-none [--wdth:66]"
        style={{ color: "var(--h)" }}
      >
        <span aria-hidden="true" className="live-dot size-[0.3em] rounded-full" style={{ background: "var(--h)" }} />
        {t.hero.liveBig}
      </p>
    );
  }
  const cd = formatCountdown(start - now, lang);
  const cells = [
    { v: cd.d, label: t.hero.units.d },
    { v: cd.h, label: t.hero.units.h },
    { v: cd.m, label: t.hero.units.m },
    { v: cd.s, label: t.hero.units.s, hot: true },
  ];
  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={`${t.hero.startsIn} ${cd.d} ${t.hero.units.d}, ${cd.h} ${t.hero.units.h}, ${cd.m} ${t.hero.units.m}`}
      className="grid max-w-[34rem] grid-cols-4"
    >
      {cells.map((c, i) => (
        <div key={c.label} className={`flex flex-col gap-1.5 ${i > 0 ? "border-l border-iron/15 pl-3 sm:pl-4" : ""}`}>
          <span
            className="readout text-[clamp(1.9rem,3.6vw,3rem)] leading-none tracking-normal"
            style={{ color: c.hot ? "color-mix(in oklab, var(--h) 40%, var(--color-white-heat))" : "var(--color-iron)" }}
          >
            <span key={c.hot ? c.v : undefined} className={`inline-block ${c.hot ? "tick" : ""}`}>
              {c.v}
            </span>
          </span>
          <span className="readout text-[0.56rem] text-steel">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

/** The heat on the anvil: the chosen event, opened out under the rod. */
function Detail({
  e,
  heat,
  isNext,
  index,
  count,
  onStep,
  panelId,
  labelledBy,
}: {
  e: ForgeEvent;
  heat: Heat;
  isNext: boolean;
  index: number;
  count: number;
  onStep: (dir: 1 | -1) => void;
  panelId: string;
  labelledBy: string;
}) {
  const { t, lang } = useLang();
  const cold = heat === "cold";
  const live = heat === "live";
  const d = formatDateParts(e.start, lang);
  const photo = eventPhoto(e);
  const url = watchUrl(e);
  const who = names(e);
  const ratio = e.poster ? e.poster.width / e.poster.height : 4 / 5;
  const split = e.title[lang].split(" · ");

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      data-heat={heat}
      className="relative grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,13rem)_1fr] lg:grid-cols-12 lg:gap-12"
    >
      {/* the picture: a print at the end of the stem, true colour once the event is close */}
      <div className="lg:col-span-4 xl:col-span-3">
        {photo && (
          <div
            key={e.id}
            className={`agenda-swap relative aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-anvil bg-forge-3 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] sm:aspect-[var(--ratio)]`}
            style={{ "--ratio": String(ratio), "--lift": photo.lift ?? 0.9 } as React.CSSProperties}
          >
            <Image
              src={photo.src}
              alt={photo.alt[lang]}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 13rem, 24vw"
              className={`object-cover object-[50%_25%] ${cold ? "grayscale" : ""}`}
            />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col lg:col-span-8 xl:col-span-9">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {isNext && !live && (
            <span className="readout flex items-center gap-1.5 rounded-[2px] bg-ember px-1.5 py-1 text-[0.6rem] text-scale">
              <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-scale" />
              {t.agenda.upNext}
            </span>
          )}
          <span className="stamp flex items-center gap-2" style={{ color: cold ? "var(--color-steel)" : "var(--h)" }}>
            <span aria-hidden="true" className="heat-bar inline-block h-1.5 w-8 rounded-full" />
            {cold ? t.agenda.finished : t.heat[heat]}
          </span>
          <span className="stamp">{t.types[e.type]}</span>
          {e.main && !cold && <span className="stamp text-glow">{t.agenda.featured}</span>}
          {e.sample && (
            <span className="readout rounded-[2px] border border-anvil px-1.5 py-0.5 text-[0.58rem] text-steel">
              {t.agenda.sample}
            </span>
          )}
        </p>

        <h3
          key={e.id}
          className={`agenda-swap stencil mt-4 text-balance text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[0.86] [--wdth:66] ${cold ? "text-steel" : "text-iron"}`}
        >
          {split.length > 1 ? (
            <>
              <span className="block text-[0.42em] leading-none text-steel [--wdth:80]">{split[0]}</span>
              <span className="mt-2 block">{split.slice(1).join(" · ")}</span>
            </>
          ) : (
            e.title[lang]
          )}
        </h3>

        <p className="readout mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] leading-relaxed text-iron/90">
          <span style={{ color: cold ? undefined : "var(--h)" }}>
            {d.weekday} {d.day} {d.month}
          </span>
          <span className="text-steel">·</span>
          <span>{d.time}</span>
          <span className="text-steel">·</span>
          <span>{e.place[lang]}</span>
          {who && (
            <>
              <span className="text-steel">·</span>
              <span>{who}</span>
            </>
          )}
        </p>

        {!cold && (
          <div className="mt-7 border-y border-iron/15 py-5">
            <p className="stamp mb-3">{t.hero.startsIn}</p>
            <Countdown e={e} />
          </div>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {!cold && url && (
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-hot">
              {e.type === "stream" ? t.agenda.watch : "Info"}
              <ArrowUpRight className="size-4" />
            </a>
          )}
          {cold && replayUrl(e) && (
            <a href={replayUrl(e)} target="_blank" rel="noreferrer" className="btn btn-hot">
              {t.agenda.watchReplay}
              <ArrowUpRight className="size-4" />
            </a>
          )}
          {!cold && !live && (
            <a
              href={icsHref(e, lang)}
              download={`${e.id}.ics`}
              className={`btn ${url ? "btn-steel" : "btn-hot"}`}
            >
              <CalendarPlus className={`size-5 ${url ? "text-ember" : ""}`} />
              {t.agenda.addCal}
            </a>
          )}

          {count > 1 && (
            <div className="ml-auto flex items-center gap-3">
              <span className="readout text-[0.7rem] text-steel" aria-hidden="true">
                <span className="text-iron">{String(index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="btn btn-steel min-h-11 px-3"
                onClick={() => onStep(-1)}
                aria-disabled={index === 0}
                aria-label={t.agenda.prevEvent}
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                className="btn btn-steel min-h-11 px-3"
                onClick={() => onStep(1)}
                aria-disabled={index === count - 1}
                aria-label={t.agenda.nextEvent}
              >
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Desktop: the rod across the bench, every event a notch at its true place in time. */
function Rod({
  list,
  now,
  selected,
  onSelect,
  tabProps,
}: {
  list: ForgeEvent[];
  now: number;
  selected: number;
  onSelect: (i: number) => void;
  tabProps: (i: number) => React.ButtonHTMLAttributes<HTMLButtonElement> & { ref: (el: HTMLButtonElement | null) => void };
}) {
  const { t, lang } = useLang();
  const { lo, hi, x } = useScale(list, now);
  const n = x(now);
  const today = formatDateParts(new Date(now).toISOString(), lang);

  // the rod's width in pixels, so collisions are measured, not guessed
  const bench = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);
  useEffect(() => {
    const el = bench.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const next = list.findIndex((e) => eventEnd(e) > now);
  // a label's width: its picture or its longest mono line (~6.3px a character), plus the 12px inset;
  // it runs right of its stem, or left past 82%. One that would overlap its neighbour
  // takes the upper shelf and drops its picture.
  const labelWidth = (i: number) => {
    const e = list[i];
    const cold = eventEnd(e) <= now;
    const photo = eventPhoto(e) ? (i === next ? Math.min(152, width * 0.1) : cold ? Math.min(80, width * 0.055) : Math.min(104, width * 0.07)) : 0;
    const name = e.title[lang].split(" · ").pop() ?? "";
    return Math.max(photo, name.length * 6.3, 80) + 12;
  };
  const span = (i: number) => {
    const px = (x(startOf(list[i])) / 100) * width;
    return x(startOf(list[i])) > 82 ? [px - labelWidth(i), px] : [px, px + labelWidth(i)];
  };
  const shelves: number[] = [];
  for (let i = 0; i < list.length; i++) {
    const close = i > 0 && span(i)[0] < span(i - 1)[1] + 12;
    shelves.push(close && shelves[i - 1] === 0 ? 1 : 0);
  }
  const tall = shelves.includes(1);
  const pictures = list.some((e, i) => !shelves[i] && eventPhoto(e));
  // room above the rod: the tallest stack (the next event's print) plus the upper shelf
  const room = `${(pictures ? 25 : 8.5) + (tall ? 6.5 : 0)}rem`;

  return (
    <div ref={bench} className="relative pb-20 [container-type:inline-size]" style={{ paddingTop: room }}>
      {/* the rod */}
      <div className="relative h-2">
        <div className="absolute inset-0 rounded-full bg-anvil/60" />
        <div
          className="rod-heat absolute inset-0 rounded-full"
          style={{ background: rodGradient(now, x), "--now": `${n}%` } as React.CSSProperties}
        />
        {/* light off the hot side only */}
        <div
          aria-hidden="true"
          className="rod-heat absolute inset-y-0 right-0 rounded-full shadow-[0_6px_26px_-6px_rgb(255_90_17/0.75)]"
          style={{ left: `${n}%`, "--now": "0%" } as React.CSSProperties}
        />
        {/* the fuse: from today to the next heat, a spark keeps running toward it */}
        {next !== -1 && (
          <div
            aria-hidden="true"
            className="rod-fuse absolute -inset-y-1 overflow-hidden rounded-full"
            style={{ left: `${n}%`, width: `${Math.max(0, x(startOf(list[next])) - n)}%` }}
          >
            <span className="rod-spark absolute inset-0" />
          </div>
        )}
        <Ruler lo={lo} hi={hi} x={x} />

        {/* the "today" needle */}
        <div
          aria-hidden="true"
          className="absolute -top-2.5 bottom-[-4.75rem] z-10 w-px bg-white-heat/70"
          style={{ left: `${n}%` }}
        >
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-white-heat" />
          <span className="readout absolute bottom-0 left-2 whitespace-nowrap bg-forge pr-1 text-[0.6rem] text-white-heat">
            {t.agenda.today} · {today.day} {today.month}
          </span>
        </div>
      </div>

      {/* the notches */}
      <div
        role="tablist"
        aria-label={t.agenda.timeline}
        aria-orientation="horizontal"
        className="absolute inset-x-0 top-0"
        style={{ height: room }}
      >
        {list.map((e, i) => {
          const heat = heatOf(e, now);
          const cold = heat === "cold";
          const on = i === selected;
          const isNext = i === next;
          const shelf = shelves[i] === 1;
          const d = formatDateParts(e.start, lang);
          const p = x(startOf(e));
          const right = p > 82;
          const title = e.title[lang].split(" · ");
          const photo = !shelf ? eventPhoto(e) : undefined;
          const left = isNext && heat !== "live" ? formatCountdown(startOf(e) - now, lang).short : null;
          return (
            <button
              key={e.id}
              type="button"
              data-heat={heat}
              {...tabProps(i)}
              onClick={() => onSelect(i)}
              className={`rod-pin group absolute flex w-max flex-col whitespace-nowrap outline-none ${shelf ? "inset-y-0" : "bottom-0"} ${right ? "items-end" : "items-start"}`}
              style={
                {
                  left: `${p}%`,
                  translate: right ? "-100% 0" : "0 0",
                  // each notch ignites as the heat front passes it
                  animationRange: `cover ${12 + p * 0.22}% cover ${16 + p * 0.22}%`,
                } as React.CSSProperties
              }
            >
              <span
                className={`flex flex-col pb-3 transition-opacity duration-500 ${right ? "items-end pr-3 text-right" : "items-start pl-3"} ${on || isNext ? "" : cold ? "opacity-55 group-hover:opacity-90" : "opacity-85 group-hover:opacity-100"}`}
              >
                {isNext && (
                  <span className="readout mb-2 flex items-center gap-1.5 rounded-[2px] bg-ember px-1.5 py-1 text-[0.58rem] text-scale">
                    <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-scale" />
                    {heat === "live" ? t.heat.live : t.agenda.upNext}
                  </span>
                )}
                {photo && (
                  <span
                    className={`relative mb-3 block aspect-[4/5] overflow-hidden rounded-[3px] border transition-[border-color,box-shadow,filter] duration-500 ${on ? "border-[var(--h)]" : "border-anvil group-hover:border-iron/40"} ${cold ? "grayscale group-hover:grayscale-0" : isNext || on ? "" : "iron-photo"}`}
                    style={
                      {
                        width: isNext ? "min(9.5rem, 10cqw)" : cold ? "min(5rem, 5.5cqw)" : "min(6.5rem, 7cqw)",
                        "--lift": photo.lift ?? 0.9,
                        boxShadow: isNext ? "0 18px 40px -18px color-mix(in oklab, var(--h) 70%, transparent)" : undefined,
                      } as React.CSSProperties
                    }
                  >
                    <Image src={photo.src} alt="" fill sizes="10rem" className="object-cover object-[50%_25%]" />
                  </span>
                )}
                <span
                  className={`stencil leading-[0.8] transition-[font-size] duration-500 ease-[var(--ease-hammer)] [--wdth:64] ${on || isNext ? "text-[3.5rem]" : "text-[2.5rem]"}`}
                  style={{ color: cold ? "var(--color-steel)" : "var(--h)" }}
                >
                  {d.day}
                </span>
                <span className="readout mt-2 text-[0.6rem] text-iron">
                  {d.month} · {d.time}
                </span>
                <span
                  className={`readout mt-1 text-[0.56rem] leading-snug ${on || isNext ? "text-iron" : "text-steel"} group-focus-visible:text-white-heat`}
                >
                  {title[title.length - 1]}
                </span>
                {left && (
                  <span className="readout mt-1 text-[0.6rem]" style={{ color: "var(--h)" }}>
                    {t.agenda.in} {left}
                  </span>
                )}
              </span>
              {/* the stem down to the rod (it stretches for the upper shelf), and the notch it strikes */}
              <span
                aria-hidden="true"
                className={`block w-[3px] rounded-[1px] transition-[height,box-shadow] duration-500 ease-[var(--ease-hammer)] ${right ? "-mr-[1.5px]" : "-ml-[1.5px]"} ${shelf ? "flex-1" : on || isNext ? "h-12" : "h-7"}`}
                style={{
                  background: cold ? "var(--color-anvil)" : "linear-gradient(to top, var(--h), color-mix(in oklab, var(--h) 10%, transparent))",
                  boxShadow: (on || isNext) && !cold ? "0 0 18px 0 color-mix(in oklab, var(--h) 60%, transparent)" : undefined,
                }}
              />
              <span
                aria-hidden="true"
                className={`absolute bottom-[-0.75rem] size-4 rotate-45 rounded-[2px] border-2 transition-transform duration-500 ease-[var(--ease-hammer)] ${right ? "-right-2" : "-left-2"} ${on ? "scale-125" : "scale-75 group-hover:scale-100"} ${isNext ? "rod-beacon" : ""}`}
                style={{
                  background: on || isNext ? "var(--h)" : "var(--color-forge)",
                  borderColor: cold ? "var(--color-anvil)" : "var(--h)",
                }}
              />
              {/* focus ring sits around the label, not the whole button box */}
              <span aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-[3px] ring-2 ring-white-heat opacity-0 group-focus-visible:opacity-100" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Phones: the rod runs down the left edge; each heat is a row, spaced by real time. */
function Spine({
  list,
  now,
  selected,
  onSelect,
  tabProps,
  children,
}: {
  list: ForgeEvent[];
  now: number;
  selected: number;
  onSelect: (i: number) => void;
  children: React.ReactNode;
  tabProps: (i: number) => React.ButtonHTMLAttributes<HTMLButtonElement> & { ref: (el: HTMLButtonElement | null) => void };
}) {
  const { t, lang } = useLang();
  const today = formatDateParts(new Date(now).toISOString(), lang);
  const firstUpcoming = list.findIndex((e) => eventEnd(e) > now);

  return (
    <div role="tablist" aria-label={t.agenda.timeline} aria-orientation="vertical" className="relative">
      {list.map((e, i) => {
        const heat = heatOf(e, now);
        const cold = heat === "cold";
        const on = i === selected;
        const d = formatDateParts(e.start, lang);
        const prev = i > 0 ? startOf(list[i - 1]) : startOf(e);
        // the gap before a row is the time since the last heat (capped)
        const gap = Math.min(4, Math.max(0.25, ((startOf(e) - prev) / DAY) * 0.18));
        const title = e.title[lang].split(" · ");
        const isNext = i === firstUpcoming;
        const photo = !cold ? eventPhoto(e) : undefined;
        const left = isNext && heat !== "live" ? formatCountdown(startOf(e) - now, lang).short : null;
        return (
          <div key={e.id}>
            {i === firstUpcoming && (
              <div aria-hidden="true" className="relative flex items-center gap-3 py-3 pl-8">
                <span className="absolute left-[5px] top-1/2 size-2.5 -translate-y-1/2 rotate-45 bg-white-heat" />
                <span className="h-px flex-1 bg-white-heat/50" />
                <span className="readout text-[0.6rem] text-white-heat">
                  {t.agenda.today} · {today.day} {today.month}
                </span>
              </div>
            )}
            <div data-heat={heat} className="relative pl-8" style={{ paddingTop: `${gap}rem` }}>
              {/* the spine segment, in this heat's colour; the next heat's carries the running spark */}
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-[9px] top-0 w-[3px] overflow-hidden ${isNext ? "shadow-[0_0_14px_0_var(--h)]" : ""}`}
                style={{ background: cold ? "var(--color-anvil)" : "linear-gradient(to bottom, var(--h2), var(--h))" }}
              >
                {isNext && <span className="spine-spark absolute inset-x-0 h-16" />}
              </span>
              <span
                aria-hidden="true"
                className={`absolute left-[3px] top-[calc(var(--pt)+1.1rem)] size-[15px] rotate-45 rounded-[2px] border-2 transition-transform duration-300 ${on || isNext ? "scale-110" : "scale-75"} ${isNext ? "rod-beacon" : ""}`}
                style={{ "--pt": `${gap}rem`, background: on || isNext ? "var(--h)" : "var(--color-forge)", borderColor: cold ? "var(--color-anvil)" : "var(--h)" } as React.CSSProperties}
              />
              <button
                type="button"
                {...tabProps(i)}
                onClick={() => onSelect(i)}
                className={`flex min-h-16 w-full items-center gap-3 rounded-[3px] py-2 pr-2 text-left ${on || isNext ? "" : "opacity-85"}`}
              >
                <span className="flex w-12 shrink-0 flex-col">
                  <span
                    className="stencil text-[2.6rem] leading-[0.8] [--wdth:64]"
                    style={{ color: cold ? "var(--color-steel)" : "var(--h)" }}
                  >
                    {d.day}
                  </span>
                  <span className="readout mt-1 text-[0.58rem] text-iron">{d.month}</span>
                </span>
                {photo && (
                  <span
                    className={`relative block aspect-[4/5] shrink-0 overflow-hidden rounded-[3px] border ${isNext ? "w-16 border-[var(--h)]" : "w-12 border-anvil iron-photo"}`}
                    style={{ "--lift": photo.lift ?? 0.9 } as React.CSSProperties}
                  >
                    <Image src={photo.src} alt="" fill sizes="4rem" className="object-cover object-[50%_25%]" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  {isNext && (
                    <span className="readout mb-1.5 inline-flex items-center gap-1.5 rounded-[2px] bg-ember px-1.5 py-0.5 text-[0.56rem] text-scale">
                      <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-scale" />
                      {heat === "live" ? t.heat.live : t.agenda.upNext}
                    </span>
                  )}
                  <span className={`stencil block text-[1.3rem] leading-[0.95] [--wdth:80] ${cold ? "text-steel" : "text-iron"}`}>
                    {title[title.length - 1]}
                  </span>
                  <span className="readout mt-1.5 block truncate text-[0.58rem] text-steel">
                    {left ? (
                      <span style={{ color: "var(--h)" }}>
                        {t.agenda.in} {left}
                      </span>
                    ) : cold ? (
                      t.agenda.finished
                    ) : (
                      t.heat[heat]
                    )}{" "}
                    · {d.time}
                  </span>
                </span>
                <ArrowDown
                  className={`size-4 shrink-0 text-ember transition-transform duration-300 ${on ? "rotate-180" : ""}`}
                />
              </button>
              {on && <div className="pb-8 pt-4">{children}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Agenda() {
  const { t } = useLang();
  // before mount, use the build time so server and client agree
  const now = useNow(30_000) ?? Number(process.env.BUILD_TIME);
  const desktop = useDesktop();
  const [filter, setFilter] = useState<Filter>("all");
  const [pick, setPick] = useState<string | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = useId();
  const tabId = useId();

  // the rod: the last few finished heats, cooled, then everything coming
  const recent = past(now).slice(0, PAST_ON_ROD).reverse();
  const all = [...recent, ...upcoming(now)];
  const kinds = TYPES.filter((k) => all.some((e) => e.type === k));
  const list = all.filter((e) => filter === "all" || e.type === filter);
  const nextIndex = list.findIndex((e) => eventEnd(e) > now);
  const fallback = nextIndex === -1 ? list.length - 1 : nextIndex;
  const found = list.findIndex((e) => e.id === pick);
  const selected = found === -1 ? fallback : found;
  const current = list[selected];

  const select = (i: number, focus = false) => {
    const e = list[Math.max(0, Math.min(list.length - 1, i))];
    if (!e) return;
    setPick(e.id);
    if (focus) tabs.current[list.indexOf(e)]?.focus();
  };

  const tabProps = (i: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabs.current[i] = el;
    },
    id: `${tabId}-${i}`,
    role: "tab",
    "aria-selected": i === selected,
    "aria-controls": panelId,
    tabIndex: i === selected ? 0 : -1,
    onKeyDown: (ev: React.KeyboardEvent) => {
      const keys: Record<string, number> = {
        ArrowRight: i + 1,
        ArrowDown: i + 1,
        ArrowLeft: i - 1,
        ArrowUp: i - 1,
        Home: 0,
        End: list.length - 1,
      };
      if (ev.key in keys) {
        ev.preventDefault();
        select(keys[ev.key], true);
      }
    },
  });

  return (
    <section id="agenda" aria-labelledby="agenda-title" className="relative overflow-clip border-t border-anvil">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="agenda-title" className="stencil drop text-[clamp(4rem,14vw,6rem)] [--wdth:70] lg:col-span-5">
            {t.agenda.title}
          </h2>
          <div className="lg:col-span-7">
            <p className="max-w-[36rem] text-[1.0625rem] leading-relaxed text-iron/80">{t.agenda.intro}</p>
            {kinds.length > 1 && (
              <div role="group" aria-label={t.agenda.filterLabel} className="mt-5 flex flex-wrap gap-x-1 gap-y-2">
                {(["all", ...kinds] as Filter[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={filter === f}
                    onClick={() => {
                      // a new filter reopens on its next heat
                      setFilter(f);
                      setPick(null);
                    }}
                    className={`readout min-h-11 border-b-2 px-3 text-[0.68rem] transition-colors ${filter === f ? "border-ember text-white-heat" : "border-transparent text-steel hover:text-iron"}`}
                  >
                    {t.agenda.filters[f]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {current ? (
          <div className="mt-12 lg:mt-10">
            {desktop ? (
              <>
                <Rod list={list} now={now} selected={selected} onSelect={select} tabProps={tabProps} />
                <div className="mt-4 border-t border-anvil pt-12">
                  <Detail
                    e={current}
                    heat={heatOf(current, now)}
                    isNext={selected === nextIndex}
                    index={selected}
                    count={list.length}
                    onStep={(dir) => select(selected + dir)}
                    panelId={panelId}
                    labelledBy={`${tabId}-${selected}`}
                  />
                </div>
              </>
            ) : (
              <>
                <Spine list={list} now={now} selected={selected} onSelect={select} tabProps={tabProps}>
                  <Detail
                    e={current}
                    heat={heatOf(current, now)}
                    isNext={selected === nextIndex}
                    index={selected}
                    count={list.length}
                    onStep={(dir) => select(selected + dir)}
                    panelId={panelId}
                    labelledBy={`${tabId}-${selected}`}
                  />
                </Spine>
              </>
            )}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-start gap-5 border-y border-anvil py-14">
            <p className="stencil max-w-[28ch] text-[2rem] leading-none text-steel [--wdth:80]">{t.agenda.emptyAll}</p>
            <a href="#siguenos" className="btn btn-steel">
              {t.agenda.follow}
              <ArrowDown className="size-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

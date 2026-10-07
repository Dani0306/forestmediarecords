"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { artists } from "@/data/artists";
import {
  heatLevel,
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
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarPlus } from "./icons";

type Filter = "all" | EventType;
const FILTERS: Filter[] = ["all", "concert", "stream", "showcase", "release"];
const LEGEND: Heat[] = ["live", "white", "hot", "warm", "embers", "cold"];
const GAP = 16;

/** One event: its picture fills the card, the details sit below on black glass. */
function EventCard({ e, now }: { e: ForgeEvent; now: number | null }) {
  const { t, lang } = useLang();
  const heat: Heat = now === null ? "embers" : heatOf(e, now);
  const level = now === null ? 0.3 : heatLevel(e, now);
  const cold = heat === "cold";
  const date = formatDateParts(e.start, lang);
  const photo = eventPhoto(e);
  const names = e.artists
    .map((s) => artists.find((a) => a.slug === s)?.name)
    .filter(Boolean);
  const left =
    now !== null && heat !== "live" && !cold
      ? formatCountdown(new Date(e.start).getTime() - now, lang).short
      : null;
  const watchUrl =
    e.url || (e.type === "stream" && hasKick ? site.kick.url : "");

  return (
    <li
      data-heat={heat}
      className="event-card relative flex h-[min(31rem,76vh)] w-[min(82vw,22rem)] shrink-0 snap-start flex-col overflow-hidden rounded-[3px] border border-anvil bg-forge-3 lg:w-[23rem]"
    >
      {photo && (
        <div
          className="iron-photo absolute inset-0"
          style={{ "--lift": photo.lift ?? 0.9 } as React.CSSProperties}
        >
          <Image
            src={photo.src}
            alt={photo.alt[lang]}
            fill
            sizes="(max-width: 1024px) 82vw, 23rem"
            className="object-cover object-[50%_25%]"
          />
        </div>
      )}

      {/* state and tags ride on the picture */}
      <div className="relative z-10 flex items-start justify-between gap-2 p-4">
        <span
          className="readout flex items-center gap-2 bg-forge/85 px-2 py-1 text-[0.6rem]"
          style={{ color: cold ? "var(--color-steel)" : "var(--h)" }}
        >
          <span className="heat-bar inline-block h-1.5 w-5 rounded-full" />
          {t.heat[heat]}
        </span>
        <span className="flex flex-wrap justify-end gap-1.5">
          {e.featured && !cold && (
            <span className="readout bg-forge/85 px-2 py-1 text-[0.58rem] text-glow">
              {t.agenda.featured}
            </span>
          )}
          {e.sample && (
            <span className="readout bg-forge/85 px-2 py-1 text-[0.58rem] text-steel">
              {t.agenda.sample}
            </span>
          )}
        </span>
      </div>

      {/* details on black glass, feathered into the picture */}
      <div className="relative z-10 mt-auto">
        <div aria-hidden="true" className="glass-field absolute inset-0 -z-10">
          {photo && (
            <div
              className="glass-blur absolute inset-x-0 bottom-0 h-[min(31rem,76vh)]"
              style={{ "--lift": photo.lift ?? 0.9 } as React.CSSProperties}
            >
              <div className="iron-photo absolute inset-0">
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 82vw, 23rem"
                  className="object-cover object-[50%_25%]"
                />
              </div>
            </div>
          )}
        </div>
        <div className="px-5 pb-5 pt-12">
          <span
            aria-hidden="true"
            className="mb-5 block h-[3px] rounded-full bg-iron/10"
          >
            <span
              className="heat-bar block h-full rounded-full"
              style={{ width: `${Math.round(14 + level * 86)}%` }}
            />
          </span>

          <div className="flex items-end gap-4">
            <p className="flex shrink-0 flex-col">
              <span
                className="stencil text-[3.75rem] leading-[0.8] [--wdth:64]"
                style={{ color: cold ? "var(--color-steel)" : "var(--h)" }}
              >
                {date.day}
              </span>
              <span className="readout mt-2 text-[0.65rem] text-iron">
                {date.month} · {date.weekday}
              </span>
            </p>
            <h3
              className={`stencil min-w-0 text-[1.6rem] leading-[0.92] [--wdth:78] ${cold ? "text-steel" : "text-iron"}`}
            >
              {e.title[lang]}
            </h3>
          </div>

          <p className="readout mt-4 text-[0.64rem] leading-relaxed text-steel">
            {t.types[e.type]} · {date.time} · {e.place[lang]}
            {names.length > 0 && (
              <span className="text-iron/80"> · {names.join(", ")}</span>
            )}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-iron/15 pt-4">
            <p className="readout text-[0.68rem] text-steel">
              {left ? (
                <>
                  {t.agenda.in} <span className="text-iron">{left}</span>
                </>
              ) : (
                t.heat[heat]
              )}
            </p>
            {!cold && (
              <div className="flex items-center gap-2">
                <a
                  href={icsHref(e, lang)}
                  download={`${e.id}.ics`}
                  className="btn btn-steel min-h-11 px-3"
                  aria-label={`${t.agenda.addCal}: ${e.title[lang]}`}
                  title={t.agenda.addCal}
                >
                  <CalendarPlus className="size-5" />
                </a>
                {watchUrl && (
                  <a
                    href={watchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-steel min-h-11 px-3 text-[0.9rem]"
                  >
                    {e.type === "stream" ? t.agenda.watch : "Info"}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Agenda() {
  const { t } = useLang();
  const now = useNow(30_000);
  const [filter, setFilter] = useState<Filter>("all");
  const [showPast, setShowPast] = useState(false);
  const track = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ index: 0, start: true, end: false });

  // before mount, list everything by date so markup is stable
  const ref = now ?? 0;
  const match = (e: ForgeEvent) => filter === "all" || e.type === filter;
  const list = upcoming(ref).filter(match);
  const done = now === null ? [] : past(now).filter(match);
  const cards = showPast ? [...list, ...done] : list;
  const anySample = [...list, ...done].some((e) => e.sample);

  const step = () => {
    const first = track.current?.querySelector("li");
    return (first?.getBoundingClientRect().width ?? 352) + GAP;
  };

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const first = el.querySelector("li");
    const w = (first?.getBoundingClientRect().width ?? 352) + GAP;
    setPos({
      index: Math.round(el.scrollLeft / w),
      start: el.scrollLeft < 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  // a new category starts the carousel from its first card
  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
    measure();
  }, [filter, showPast, cards.length, measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const nudge = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  return (
    <section
      id="agenda"
      aria-labelledby="agenda-title"
      className="relative overflow-hidden border-t border-anvil"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            id="agenda-title"
            className="stencil drop text-[clamp(4rem,14vw,6rem)] [--wdth:70] lg:col-span-5"
          >
            {t.agenda.title}
          </h2>
          <div className="lg:col-span-7">
            <p className="max-w-[36rem] text-[1.0625rem] leading-relaxed text-iron/80">
              {t.agenda.intro}
            </p>
            <div
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2"
              aria-label={t.agenda.legend}
            >
              {LEGEND.map((h) => (
                <span
                  key={h}
                  data-heat={h}
                  className="readout flex items-center gap-2 text-[0.62rem] text-steel"
                >
                  <span
                    className="heat-bar block h-1.5 w-6 rounded-full"
                    aria-hidden="true"
                  />
                  {t.heat[h]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 lg:mt-16">
          <div
            role="group"
            aria-label={t.agenda.filterLabel}
            className="-mx-4 flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:max-w-full sm:px-0"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`btn min-h-11 shrink-0 px-4 text-[0.95rem] ${filter === f ? "btn-hot" : "btn-steel"}`}
              >
                {t.agenda.filters[f]}
              </button>
            ))}
          </div>

          {cards.length > 1 && (
            <div className="flex items-center gap-3">
              <span className="readout text-[0.7rem] text-steel" aria-hidden="true">
                <span className="text-iron">
                  {String(Math.min(pos.index + 1, cards.length)).padStart(2, "0")}
                </span>{" "}
                / {String(cards.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="btn btn-steel min-h-11 px-3"
                onClick={() => nudge(-1)}
                aria-disabled={pos.start}
                aria-controls="agenda-track"
              >
                <ArrowLeft />
                <span className="sr-only">{t.agenda.prev}</span>
              </button>
              <button
                type="button"
                className="btn btn-steel min-h-11 px-3"
                onClick={() => nudge(1)}
                aria-disabled={pos.end}
                aria-controls="agenda-track"
              >
                <ArrowRight />
                <span className="sr-only">{t.agenda.next}</span>
              </button>
            </div>
          )}
        </div>

        {anySample && (
          <p className="readout mt-6 text-[0.65rem] text-steel">
            <span
              className="mr-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-ember align-middle"
              aria-hidden="true"
            />
            {t.agenda.sampleNote}
          </p>
        )}

        {cards.length > 0 ? (
          <div className="forge-in relative -mx-4 mt-6 min-w-0 sm:-mx-6 lg:ml-0 lg:mr-[calc((100vw-min(100vw,1440px))/-2-2.5rem)]">
            <ul
              id="agenda-track"
              ref={track}
              onScroll={measure}
              tabIndex={0}
              aria-label={t.agenda.carousel}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:thin] sm:px-6 lg:scroll-pl-0 lg:pl-0 lg:pr-10"
            >
              {cards.map((e) => (
                <EventCard key={e.id} e={e} now={now} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-start gap-5 border-y border-anvil py-14">
            <p className="stencil max-w-[28ch] text-[2rem] leading-none text-steel [--wdth:80]">
              {t.agenda.empty}
            </p>
            <button
              type="button"
              className="btn btn-steel"
              onClick={() => setFilter("all")}
            >
              {t.agenda.showAll}
            </button>
          </div>
        )}

        {done.length > 0 && (
          <div className="mt-8">
            <button
              type="button"
              aria-expanded={showPast}
              aria-controls="agenda-track"
              onClick={() => setShowPast((v) => !v)}
              className="readout inline-flex min-h-11 items-center gap-3 text-[0.7rem] text-steel hover:text-iron"
            >
              <span
                className="heat-bar block h-1.5 w-6 rounded-full"
                data-heat="cold"
                aria-hidden="true"
              />
              {showPast ? t.agenda.hidePast : t.agenda.showPast} ({done.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

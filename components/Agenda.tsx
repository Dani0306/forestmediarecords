"use client";

import { useState } from "react";
import { artists } from "@/data/artists";
import { heatLevel, heatOf, past, upcoming, type EventType, type ForgeEvent, type Heat } from "@/data/events";
import { hasKick, site } from "@/data/site";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { icsHref } from "@/lib/ics";
import { ArrowUpRight, CalendarPlus } from "./icons";

type Filter = "all" | EventType;
const FILTERS: Filter[] = ["all", "concert", "stream", "showcase", "release"];
const LEGEND: Heat[] = ["live", "white", "hot", "warm", "embers", "cold"];

function Row({ e, now }: { e: ForgeEvent; now: number | null }) {
  const { t, lang } = useLang();
  const heat: Heat = now === null ? "embers" : heatOf(e, now);
  const level = now === null ? 0.3 : heatLevel(e, now);
  const date = formatDateParts(e.start, lang);
  const names = e.artists.map((s) => artists.find((a) => a.slug === s)?.name).filter(Boolean);
  const cold = heat === "cold";
  const left = now !== null && heat !== "live" && !cold ? formatCountdown(new Date(e.start).getTime() - now, lang).short : null;
  const watchUrl = e.url || (e.type === "stream" && hasKick ? site.kick.url : "");

  return (
    <li
      data-heat={heat}
      className={`group relative grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-4 border-b border-anvil py-6 transition-colors duration-500 hover:bg-forge-2 sm:grid-cols-[7rem_1fr] md:grid-cols-[8rem_minmax(0,1fr)_14rem_auto] md:items-center md:gap-x-8 lg:px-4 ${
        cold ? "text-steel" : ""
      }`}
    >
      {/* date stamped into the row */}
      <div className="row-span-2 flex flex-col md:row-span-1">
        <span
          className="stencil text-[3.25rem] leading-none transition-[color,text-shadow] duration-500 [--wdth:66] sm:text-[4.5rem]"
          style={{ color: cold ? "var(--color-anvil)" : "var(--h)" }}
        >
          {date.day}
        </span>
        <span className="readout mt-1 text-[0.7rem] text-iron/80">
          {date.month} · {date.weekday}
        </span>
      </div>

      <div className="min-w-0">
        <h3
          className={`stencil text-[clamp(1.6rem,3vw,2.35rem)] leading-[0.95] [--wdth:80] ${cold ? "text-steel" : "text-iron"}`}
        >
          {e.title[lang]}
        </h3>
        <p className="mt-2 text-[0.95rem] text-iron/70">
          {e.place[lang]}
          {names.length > 0 && <span className="text-steel"> · {names.join(", ")}</span>}
        </p>
        <div className="readout mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] text-steel">
          <span className="text-iron/80">{t.types[e.type]}</span>
          <span aria-hidden="true">/</span>
          <span>{date.time}</span>
          {e.sample && (
            <span className="rounded-[2px] border border-anvil px-1.5 py-px text-[0.58rem]">{t.agenda.sample}</span>
          )}
        </div>
      </div>

      {/* temperature gauge */}
      <div className="col-start-2 md:col-start-auto">
        <div className="flex items-center gap-3">
          <span className="block h-2 w-20 rounded-full bg-anvil/60 sm:w-28" aria-hidden="true">
            <span className="heat-bar block h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.round(18 + level * 82)}%` }} />
          </span>
          <span className="readout text-[0.68rem]" style={{ color: cold ? "var(--color-steel)" : "var(--h)" }}>
            {t.heat[heat]}
          </span>
        </div>
        {left && (
          <p className="readout mt-2 text-[0.68rem] text-steel">
            {t.agenda.in} <span className="text-iron">{left}</span>
          </p>
        )}
      </div>

      <div className="col-start-2 flex items-center gap-2 md:col-start-auto md:justify-end">
        {!cold && (
          <a
            href={icsHref(e, lang)}
            download={`${e.id}.ics`}
            className="btn btn-steel min-h-11 px-3"
            aria-label={`${t.agenda.addCal}: ${e.title[lang]}`}
            title={t.agenda.addCal}
          >
            <CalendarPlus className="size-5" />
          </a>
        )}
        {watchUrl && !cold && (
          <a href={watchUrl} target="_blank" rel="noreferrer" className="btn btn-steel min-h-11 px-4 text-[0.9rem]">
            {e.type === "stream" ? t.agenda.watch : "Info"}
            <ArrowUpRight className="size-4" />
          </a>
        )}
      </div>
    </li>
  );
}

export default function Agenda() {
  const { t } = useLang();
  const now = useNow(30_000);
  const [filter, setFilter] = useState<Filter>("all");
  const [showPast, setShowPast] = useState(false);

  // before mount, list everything by date so markup is stable
  const ref = now ?? 0;
  const list = upcoming(ref).filter((e) => filter === "all" || e.type === filter);
  const done = now === null ? [] : past(now).filter((e) => filter === "all" || e.type === filter);
  const anySample = [...list, ...done].some((e) => e.sample);

  return (
    <section id="agenda" aria-labelledby="agenda-title" className="relative border-t border-anvil">
      <div className="mx-auto max-w-[1440px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="agenda-title" className="stencil drop text-[clamp(4rem,14vw,6rem)] [--wdth:70] lg:col-span-5">
            {t.agenda.title}
          </h2>
          <div className="lg:col-span-7">
            <p className="max-w-[36rem] text-[1.0625rem] leading-relaxed text-iron/80">{t.agenda.intro}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2" aria-label={t.agenda.legend}>
              {LEGEND.map((h) => (
                <span key={h} data-heat={h} className="readout flex items-center gap-2 text-[0.62rem] text-steel">
                  <span className="heat-bar block h-1.5 w-6 rounded-full" aria-hidden="true" />
                  {t.heat[h]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          role="group"
          aria-label={t.agenda.filterLabel}
          className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:mt-16"
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

        {anySample && (
          <p className="readout mt-6 text-[0.65rem] text-steel">
            <span className="mr-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-ember align-middle" aria-hidden="true" />
            {t.agenda.sampleNote}
          </p>
        )}

        {list.length > 0 ? (
          <ol className="mt-6 border-t border-anvil">
            {list.map((e) => (
              <Row key={e.id} e={e} now={now} />
            ))}
          </ol>
        ) : (
          <div className="mt-6 flex flex-col items-start gap-5 border-y border-anvil py-14">
            <p className="stencil max-w-[28ch] text-[2rem] leading-none text-steel [--wdth:80]">{t.agenda.empty}</p>
            <button type="button" className="btn btn-steel" onClick={() => setFilter("all")}>
              {t.agenda.showAll}
            </button>
          </div>
        )}

        {done.length > 0 && (
          <div className="mt-10">
            <button
              type="button"
              aria-expanded={showPast}
              aria-controls="agenda-past"
              onClick={() => setShowPast((v) => !v)}
              className="readout inline-flex min-h-11 items-center gap-3 text-[0.7rem] text-steel hover:text-iron"
            >
              <span className="heat-bar block h-1.5 w-6 rounded-full" data-heat="cold" aria-hidden="true" />
              {showPast ? t.agenda.hidePast : t.agenda.showPast} ({done.length})
            </button>
            {showPast && (
              <ol id="agenda-past" className="mt-4 border-t border-anvil opacity-80">
                {done.map((e) => (
                  <Row key={e.id} e={e} now={now} />
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

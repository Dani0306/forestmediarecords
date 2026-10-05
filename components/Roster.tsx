"use client";

import Image from "next/image";
import { useRef } from "react";
import { artists, type Artist } from "@/data/artists";
import { upcoming } from "@/data/events";
import { formatDateParts, useLang, useNow } from "@/lib/i18n";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";

function Piece({ a, index }: { a: Artist; index: number }) {
  const { t, lang } = useLang();
  const now = useNow(60_000);
  const strip = useRef<HTMLUListElement>(null);
  const next = now === null ? undefined : upcoming(now).find((e) => e.artists.includes(a.slug));
  const nextDate = next ? formatDateParts(next.start, lang) : null;
  const tall = a.photos[0].height / a.photos[0].width > 1.5;

  const nudge = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    const item = el.querySelector("li");
    el.scrollBy({ left: dir * ((item?.clientWidth ?? 320) + 12), behavior: "smooth" });
  };

  return (
    <article
      aria-labelledby={`artist-${a.slug}`}
      className="grid gap-8 border-t border-anvil py-16 lg:grid-cols-12 lg:gap-8 lg:py-24"
    >
      <div className="flex min-w-0 flex-col lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
        <h3 id={`artist-${a.slug}`} className="stencil drop text-[clamp(4.5rem,16vw,6rem)] [--wdth:66]">
          {a.name}
        </h3>

        <dl className="readout mt-8 text-[0.7rem]">
          <div className="flex justify-between gap-6 border-t border-anvil py-3">
            <dt className="text-steel">{t.roster.piece}</dt>
            <dd className="text-iron">{String(index + 1).padStart(3, "0")}</dd>
          </div>
          <div className="flex justify-between gap-6 border-t border-anvil py-3">
            <dt className="text-steel">{t.roster.next}</dt>
            <dd className="text-right text-iron">
              {next && nextDate ? (
                <a href="#agenda" className="hover:text-ember">
                  <span className="text-ember">
                    {nextDate.day} {nextDate.month}
                  </span>{" "}
                  · {t.types[next.type]}
                </a>
              ) : (
                <span className="text-steel">{t.roster.none}</span>
              )}
            </dd>
          </div>
          <div className="flex justify-between gap-6 border-t border-anvil py-3">
            <dt className="text-steel">{t.roster.kick}</dt>
            <dd className="text-right">
              {a.kickUrl ? (
                <a href={a.kickUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ember hover:text-white-heat">
                  kick.com <ArrowUpRight className="size-3.5" />
                </a>
              ) : (
                <span className="text-steel">{t.kick.pending}</span>
              )}
            </dd>
          </div>
          <div className="flex justify-between gap-6 border-y border-anvil py-3">
            <dt className="text-steel">Links</dt>
            <dd className="flex flex-wrap justify-end gap-3 text-right">
              {a.links.length ? (
                a.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="text-iron hover:text-ember">
                    {l.label}
                  </a>
                ))
              ) : (
                <span className="text-steel">{t.roster.soon}</span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex gap-2">
          <button type="button" className="btn btn-steel min-h-11 px-3" onClick={() => nudge(-1)}>
            <ArrowLeft />
            <span className="sr-only">{t.roster.prev}</span>
          </button>
          <button type="button" className="btn btn-steel min-h-11 px-3" onClick={() => nudge(1)}>
            <ArrowRight />
            <span className="sr-only">{t.roster.nextPhoto}</span>
          </button>
        </div>
      </div>

      <div className="relative -mx-4 min-w-0 sm:-mx-6 lg:col-span-8 lg:mr-[calc((100vw-min(100vw,1440px))/-2-2.5rem)] lg:ml-0">
        <ul
          ref={strip}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:thin] sm:px-6 lg:pl-0 lg:pr-10"
          aria-label={a.name}
        >
          {a.photos.map((p, i) => {
            const ratio = p.width / p.height;
            const h = tall ? "h-[min(78vh,40rem)]" : "h-[min(70vh,34rem)]";
            return (
              <li key={p.src} className={`iron-photo relative shrink-0 snap-start overflow-hidden rounded-[3px] bg-forge-2 ${h}`} style={{ aspectRatio: ratio, "--lift": p.lift ?? 0.9 } as React.CSSProperties} tabIndex={0}>
                <Image
                  src={p.src}
                  alt={p.alt[lang]}
                  fill
                  sizes={tall ? "(max-width: 1024px) 60vw, 24vw" : ratio > 1 ? "(max-width: 1024px) 90vw, 50vw" : "(max-width: 1024px) 75vw, 30vw"}
                  className="object-cover"
                />
                <span className="readout absolute bottom-3 left-3 z-10 bg-forge/80 px-2 py-1 text-[0.6rem] text-iron">
                  {String(i + 1).padStart(2, "0")} / {String(a.photos.length).padStart(2, "0")}
                </span>
              </li>
            );
          })}
          <li className={`plate flex w-[min(80vw,22rem)] shrink-0 snap-start flex-col justify-between rounded-[3px] border border-anvil p-6 ${tall ? "h-[min(78vh,40rem)]" : "h-[min(70vh,34rem)]"}`}>
            <p className="stamp">{t.roster.next}</p>
            {next && nextDate ? (
              <div>
                <p className="stencil text-[6rem] leading-none text-ember [--wdth:64]">{nextDate.day}</p>
                <p className="readout mt-2 text-[0.75rem] text-iron">
                  {nextDate.month} · {nextDate.weekday} · {nextDate.time}
                </p>
                <p className="stencil mt-5 text-[2rem] leading-[0.95] [--wdth:80]">{next.title[lang]}</p>
                <p className="mt-2 text-[0.95rem] text-iron/70">
                  {t.types[next.type]} · {next.place[lang]}
                </p>
              </div>
            ) : (
              <p className="stencil text-[2rem] leading-[0.95] text-steel [--wdth:80]">{t.roster.none}</p>
            )}
            <a href="#agenda" className="btn btn-steel self-start">
              {t.hero.ctaAgenda}
              <ArrowRight className="size-5" />
            </a>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default function Roster() {
  const { t } = useLang();
  return (
    <section id="artistas" aria-labelledby="artistas-title" className="border-t border-anvil">
      <div className="mx-auto max-w-[1440px] px-4 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="grid gap-6 pb-12 lg:grid-cols-12 lg:items-end">
          <h2 id="artistas-title" className="stencil drop text-[clamp(2.75rem,6vw,4.5rem)] [--wdth:74] lg:col-span-7">
            {t.roster.title}
          </h2>
          <p className="max-w-[32rem] text-[1.0625rem] leading-relaxed text-iron/80 lg:col-span-5">{t.roster.intro}</p>
        </div>
        {artists.map((a, i) => (
          <Piece key={a.slug} a={a} index={i} />
        ))}
      </div>
    </section>
  );
}

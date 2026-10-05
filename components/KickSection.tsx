"use client";

import Image from "next/image";
import { artists } from "@/data/artists";
import { heatLevel, heatOf, upcoming } from "@/data/events";
import { hasKick, site } from "@/data/site";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { ArrowUpRight, Broadcast } from "./icons";

/**
 * The Kick ingot: a full-width band whose temperature is the next stream's.
 * The closer the stream, the hotter (and longer) the metal.
 */
export default function KickSection() {
  const { t, lang } = useLang();
  const now = useNow(30_000);
  const streams = now === null ? [] : upcoming(now).filter((e) => e.type === "stream").slice(0, 3);
  const next = streams[0];
  const heat = next && now !== null ? heatOf(next, now) : "embers";
  const level = next && now !== null ? heatLevel(next, now) : 0.15;

  const channels = [
    { key: "forest", name: t.kick.label, img: "/logo.png", url: site.kick.url, handle: site.kick.handle },
    ...artists.map((a) => ({ key: a.slug, name: a.name, img: a.photos[0].src, url: a.kickUrl, handle: "" })),
  ];

  return (
    <section id="kick" aria-labelledby="kick-title" data-heat={heat} className="relative overflow-hidden border-t border-anvil">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-x-8 gap-y-4 px-4 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <h2 id="kick-title" className="stencil drop text-[clamp(3.5rem,11vw,6rem)] [--wdth:68]">
          {t.kick.title}
        </h2>
        <p className="readout pb-2 text-[0.7rem] text-steel">{t.kick.supported}</p>
      </div>

      {/* the ingot: its length and colour are the next stream's temperature */}
      <div className="mt-10 flex items-center gap-4" aria-hidden="true">
        <div
          className="h-[clamp(44px,6vw,80px)] rounded-r-[6px] transition-[width] duration-1000 ease-[var(--ease-hammer)]"
          style={{
            width: `${Math.round(34 + level * 58)}%`,
            backgroundImage:
              "var(--scale-flecks), linear-gradient(90deg, #141010 0%, var(--h2) 38%, var(--h) 82%, color-mix(in oklab, var(--h) 55%, var(--color-white-heat)) 100%)",
            backgroundSize: "180px 180px, 100% 100%",
            boxShadow: "0 18px 40px -18px color-mix(in oklab, var(--h) 75%, transparent)",
          }}
        />
        {next && now !== null && (
          <span className="readout shrink-0 pr-4 text-[0.68rem]" style={{ color: "var(--h)" }}>
            {t.heat[heat]}
          </span>
        )}
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-32">
        <div className="lg:col-span-5">
          <p className="max-w-[34rem] text-[1.125rem] leading-relaxed text-iron/85">{t.kick.body}</p>
          <div className="mt-8">
            {hasKick ? (
              <a href={site.kick.url} target="_blank" rel="noreferrer" className="btn btn-hot">
                <Broadcast className="size-5" />
                {t.agenda.watch}
              </a>
            ) : (
              <span className="readout inline-flex min-h-11 items-center gap-2 border border-dashed border-steel/50 px-4 text-[0.7rem] text-steel">
                <Broadcast className="size-4 text-ember" />
                {t.kick.pending}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:col-span-7">
          <div>
            <h3 className="stencil text-[1.75rem] [--wdth:84]">{t.kick.upcoming}</h3>
            {streams.length > 0 ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {streams.map((e) => {
                  const d = formatDateParts(e.start, lang);
                  const h = now !== null ? heatOf(e, now) : "embers";
                  const left = now !== null ? formatCountdown(new Date(e.start).getTime() - now, lang).short : "";
                  return (
                    <li key={e.id} data-heat={h} className="plate flex flex-col rounded-[3px] border border-anvil p-5">
                      <p className="stencil text-[1.5rem] leading-[0.95] [--wdth:80]">{e.title[lang]}</p>
                      <p className="readout mt-3 text-[0.62rem]" style={{ color: "var(--h)" }}>
                        {d.weekday} {d.day} {d.month} · {d.time}
                      </p>
                      <p className="readout mt-4 flex items-center justify-between gap-3 border-t border-anvil pt-3 text-[0.62rem] text-steel">
                        <span>
                          {t.agenda.in} <span className="text-iron">{left}</span>
                        </span>
                        {e.sample && <span className="rounded-[2px] border border-anvil px-1.5 py-px">{t.agenda.sample}</span>}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-iron/70">{now === null ? " " : t.kick.none}</p>
            )}
          </div>

          <div>
            <h3 className="stencil text-[1.75rem] [--wdth:84]">{t.kick.channels}</h3>
            <ul className="mt-4 border-t border-anvil">
              {channels.map((c) => (
                <li key={c.key} className="flex items-center gap-4 border-b border-anvil py-3">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-[3px] bg-scale">
                    <Image src={c.img} alt="" fill sizes="48px" className="object-cover grayscale" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="stencil truncate text-[1.5rem] leading-none [--wdth:80]">{c.name}</p>
                    <p className="readout mt-1 truncate text-[0.62rem] text-steel">
                      {c.url ? `kick.com/${c.handle || c.url.split("/").pop()}` : t.kick.pending}
                    </p>
                  </div>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noreferrer" className="btn btn-steel min-h-11 px-3 text-[0.9rem]">
                      {t.kick.visit}
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

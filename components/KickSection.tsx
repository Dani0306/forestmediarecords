"use client";

import Image from "next/image";
import { heatOf, upcoming } from "@/data/events";
import { editions } from "@/data/kick";
import { hasKick, site } from "@/data/site";
import { streamers } from "@/data/streamers";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { ArrowUpRight, Broadcast } from "./icons";

/**
 * Kick: the latest showcase leads (its posters, pinned like prints over a
 * blurred glow of the lead poster), then upcoming streams and the channel.
 */
export default function KickSection() {
  const { t, lang } = useLang();
  const now = useNow(30_000);
  const ed = editions[0];
  const lead = ed?.posters[0];
  const back = ed?.posters[1];
  const streams =
    now === null
      ? []
      : upcoming(now)
          .filter((e) => e.type === "stream")
          .slice(0, 3);

  const channels = [
    {
      key: "forest",
      name: site.kick.handle || t.kick.label,
      img: "/logo-512.webp",
      url: site.kick.url,
      handle: site.kick.handle,
      focus: "50% 50%",
      zoom: 1,
    },
    // the team's other Kick channels (from data/streamers.ts)
    ...streamers
      .filter((s) => s.url && s.url !== site.kick.url)
      .map((s) => ({
        key: s.slug,
        name: s.handle,
        img: s.photo.src,
        url: s.url,
        handle: s.handle,
        focus: s.photo.focus ?? "50% 25%",
        // full-body portraits: zoom the 48px avatar in on the face
        zoom: 2.4,
      })),
  ];

  const kickLink = hasKick
    ? { href: site.kick.url, target: "_blank", rel: "noreferrer" }
    : { href: "#kick" };

  return (
    <section
      id="kick"
      aria-labelledby="kick-title"
      className="relative isolate overflow-clip border-t border-anvil"
    >
      {/* atmosphere: the lead poster, blown up and blurred into a glow (static, rasterised once) */}
      {lead && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={lead.src}
            alt=""
            fill
            sizes="40vw"
            className="scale-125 object-cover blur-[70px] brightness-[0.4] saturate-[0.9]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-forge)_0%,rgb(11_11_13/0.55)_18%,rgb(11_11_13/0.45)_60%,var(--color-forge)_100%)]" />
        </div>
      )}

      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="kick-title"
            className="stencil drop text-[clamp(3.5rem,11vw,6rem)] [--wdth:68] lg:col-span-7"
          >
            {t.kick.title}
          </h2>
          <div className="lg:col-span-5">
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/85">
              {t.kick.body}
            </p>
            <p className="readout mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] text-steel">
              {t.kick.supported}
              {hasKick && (
                <>
                  <span aria-hidden="true">·</span>
                  <a
                    {...kickLink}
                    className="text-iron underline decoration-iron/30 underline-offset-4 hover:text-white-heat hover:decoration-ember"
                  >
                    kick.com/{site.kick.handle}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>

        {ed && lead && (
          <article
            aria-labelledby="kick-edition"
            className="float-scope mt-16 grid grid-cols-1 items-center gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-8"
          >
            {/* the edition */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              <h3
                id="kick-edition"
                className="stencil text-[clamp(3rem,6vw,5rem)] leading-[0.86] [--wdth:70]"
              >
                {ed.name} <span className="text-ember">{ed.edition}</span>
              </h3>
              <p className="readout mt-4 text-[0.68rem] text-steel">
                {t.kick.presents} · {ed.format[lang]}
                {ed.when && <> · <span className="text-iron">{ed.when[lang]}</span></>}
              </p>

              <dl className="mt-10">
                {ed.winner && (
                  <div className="flex items-baseline justify-between gap-6 border-t border-iron/15 py-5">
                    <dt className="stamp">{t.kick.winner}</dt>
                    <dd className="text-right">
                      <span className="stencil block text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none text-ember [--wdth:72]">
                        {ed.winner}
                      </span>
                      {ed.winnerFrom && (
                        <span className="readout mt-2 block text-[0.62rem] text-steel">{ed.winnerFrom}</span>
                      )}
                    </dd>
                  </div>
                )}
                {ed.lineup.length > 0 && (
                  <div className="border-y border-iron/15 py-5">
                    <dt className="stamp">{t.kick.feat}</dt>
                    <dd className="stencil mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[1.5rem] leading-none [--wdth:80]">
                      {ed.lineup.map((name, i) => (
                        <span key={name} className="flex items-baseline gap-3">
                          {i > 0 && (
                            <span
                              aria-hidden="true"
                              className="text-[1rem] text-steel"
                            >
                              ×
                            </span>
                          )}
                          <span
                            className={
                              name === ed.winner ? "text-ember" : "text-iron"
                            }
                          >
                            {name}
                          </span>
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {ed.lineup.length === 0 && ed.cities && (
                  <div className="border-y border-iron/15 py-5">
                    <dt className="stamp">{t.kick.cities}</dt>
                    <dd className="stencil mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[1.5rem] leading-none [--wdth:80]">
                      {ed.cities.map((c, i) => (
                        <span key={c} className="flex items-baseline gap-3">
                          {i > 0 && (
                            <span aria-hidden="true" className="text-[1rem] text-steel">
                              ×
                            </span>
                          )}
                          <span className={c === ed.winnerFrom ? "text-ember" : "text-iron"}>{c}</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>

              {ed.motto && (
                <p className="mt-8 text-[1.25rem] italic text-iron/80">
                  “{ed.motto[lang]}”
                </p>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a {...kickLink} className="btn btn-hot">
                  <Broadcast className="size-5" />
                  {hasKick ? t.agenda.watch : t.kick.pending}
                </a>
              </div>
            </div>

            {/* the posters, pinned like prints */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="relative mx-auto max-w-[44rem] pb-[6%] pl-[14%] sm:pl-[22%] lg:pl-[26%]">
                {back && (
                  <figure className="kick-poster float-b absolute bottom-0 left-0 z-0 w-[58%] -rotate-3 sm:w-[48%] lg:w-[46%]">
                    <Image
                      src={back.src}
                      alt={back.alt[lang]}
                      width={back.width}
                      height={back.height}
                      sizes="(max-width: 1024px) 50vw, 22rem"
                      className="block h-auto w-full"
                    />
                    <figcaption className="readout absolute left-3 top-3 bg-forge/85 px-2 py-1 text-[0.58rem] text-iron">
                      {back.label[lang]}
                    </figcaption>
                  </figure>
                )}
                <figure className="kick-poster float-a relative z-10 rotate-[1.5deg]">
                  <Image
                    src={lead.src}
                    alt={lead.alt[lang]}
                    width={lead.width}
                    height={lead.height}
                    sizes="(max-width: 1024px) 80vw, 32rem"
                    className="block h-auto w-full"
                  />
                  <figcaption className="readout absolute left-3 top-3 bg-forge/85 px-2 py-1 text-[0.58rem] text-glow">
                    {lead.label[lang]}
                  </figcaption>
                </figure>
              </div>
            </div>
          </article>
        )}

        {/* streams and the channel on a translucent black plate over the glow */}
        <div className="mt-20 grid grid-cols-1 gap-10 rounded-[3px] border border-iron/10 bg-forge/70 p-5 sm:p-8 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h3 className="stencil text-[1.75rem] [--wdth:84]">
              {t.kick.upcoming}
            </h3>
            {streams.length > 0 ? (
              <ul className="mt-4 border-t border-iron/15">
                {streams.map((e) => {
                  const d = formatDateParts(e.start, lang);
                  const h = now !== null ? heatOf(e, now) : "embers";
                  const left =
                    now !== null
                      ? formatCountdown(new Date(e.start).getTime() - now, lang)
                          .short
                      : "";
                  return (
                    <li
                      key={e.id}
                      data-heat={h}
                      className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-iron/15 py-4"
                    >
                      <span
                        className="stencil w-14 text-[2.5rem] leading-none [--wdth:64]"
                        style={{ color: "var(--h)" }}
                      >
                        {d.day}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="stencil text-[1.4rem] leading-[0.95] [--wdth:80]">
                          {e.title[lang]}
                        </p>
                        <p className="readout mt-1.5 text-[0.62rem] text-steel">
                          {d.month} · {d.weekday} {d.time} · {t.agenda.in}{" "}
                          <span className="text-iron">{left}</span>
                        </p>
                      </div>
                      {e.sample && (
                        <span className="readout rounded-[2px] border border-anvil px-1.5 py-px text-[0.58rem] text-steel">
                          {t.agenda.sample}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-iron/70">
                {now === null ? " " : t.kick.none}
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            <h3 className="stencil text-[1.75rem] [--wdth:84]">
              {t.kick.channels}
            </h3>
            <ul className="mt-4 border-t border-iron/15">
              {channels.map((c) => (
                <li
                  key={c.key}
                  className="flex items-center gap-4 border-b border-iron/15 py-3"
                >
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-[3px] bg-scale">
                    <Image
                      src={c.img}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover grayscale"
                      style={{ objectPosition: c.focus, transform: `scale(${c.zoom})`, transformOrigin: c.focus }}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="stencil truncate text-[1.5rem] leading-none [--wdth:80]">
                      {c.name}
                    </p>
                    <p className="readout mt-1 truncate text-[0.62rem] text-steel">
                      {c.url
                        ? `kick.com/${c.handle || c.url.split("/").pop()}`
                        : t.kick.pending}
                    </p>
                  </div>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${t.kick.visit}: kick.com/${c.handle}`}
                      className="btn btn-steel min-h-11 px-3 text-[0.9rem]"
                    >
                      <span className="hidden sm:inline">{t.kick.visit}</span>
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

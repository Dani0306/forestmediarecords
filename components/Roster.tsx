"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { artists, type Artist } from "@/data/artists";
import { heatOf, upcoming } from "@/data/events";
import { formatDateParts, useLang, useNow } from "@/lib/i18n";
import { ArrowDown, ArrowUpRight, Play } from "./icons";

/**
 * "Escuchar": a hot plate with a play key and a little equalizer that opens
 * the artist's platforms (Spotify, YouTube). Missing links read "Muy pronto".
 */
function Listen({ a }: { a: Artist }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const platforms = [
    { label: "Spotify", url: a.listen.spotify },
    { label: "YouTube", url: a.listen.youtube },
  ];

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !root.current?.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={root} className="relative shrink-0 self-start">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t.roster.listen}: ${a.name}`}
        onClick={() => setOpen((v) => !v)}
        className="listen btn btn-hot h-16 gap-4 pl-2 pr-5 text-[1.05rem]"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-[2px] bg-scale text-ember">
          <Play className="size-5 translate-x-px" />
        </span>
        <span className="flex flex-col items-start leading-none">
          {t.roster.listen}
          <span className="readout mt-1.5 text-[0.55rem] tracking-[0.12em] text-scale/70">
            Spotify · YouTube
          </span>
        </span>
        <span aria-hidden="true" className="flex h-5 items-end gap-[3px]">
          {[0, 1, 2, 3].map((k) => (
            <span
              key={k}
              className="eq-bar block h-full w-[3px] origin-bottom rounded-[1px] bg-scale"
              style={{ animationDelay: `${k * -0.23}s` }}
            />
          ))}
        </span>
      </button>

      <ul
        id={menuId}
        hidden={!open}
        className="absolute left-0 top-full z-30 mt-2 w-[min(17rem,80vw)] overflow-hidden rounded-[3px] border border-anvil bg-forge/95 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)]"
      >
        <li className="readout border-b border-anvil px-4 py-3 text-[0.6rem] text-steel">
          {t.roster.listenOn} {a.name}
        </li>
        {platforms.map((pl) => (
          <li key={pl.label} className="border-b border-anvil last:border-b-0">
            {pl.url ? (
              <a
                href={pl.url}
                target="_blank"
                rel="noreferrer"
                className="stencil flex min-h-12 items-center justify-between gap-4 px-4 text-[1.2rem] text-iron [--wdth:80] hover:bg-forge-3 hover:text-white-heat"
              >
                {pl.label}
                <ArrowUpRight className="size-4 text-ember" />
              </a>
            ) : (
              <span className="flex min-h-12 items-center justify-between gap-4 px-4">
                <span className="stencil text-[1.2rem] text-steel [--wdth:80]">
                  {pl.label}
                </span>
                <span className="readout text-[0.58rem] text-steel">
                  {t.roster.soonLink}
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * One artist on stage: the photo is graded into the forge (iron duotone), the
 * profile sits on black glass (right column on desktop, a band under the photo
 * on mobile). On desktop the photo frame covers only the open area left of the
 * profile, over a blurred wash of itself, so portraits keep their framing.
 */
function Stage({ a, index }: { a: Artist; index: number }) {
  const { t, lang } = useLang();
  const now = useNow(60_000);
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(false);
  const bioId = useId();
  const p = a.profile;
  const bio = p.bio[lang];
  const next =
    now === null
      ? undefined
      : upcoming(now).find((e) => e.artists.includes(a.slug));
  const nextDate = next ? formatDateParts(next.start, lang) : null;
  const heat = next && now !== null ? heatOf(next, now) : "embers";

  return (
    <div
      data-heat={heat}
      className="relative overflow-hidden rounded-[3px] border border-anvil bg-forge-2 lg:h-[min(74vh,44rem)] lg:min-h-[36rem]"
    >
      {/* the photo */}
      <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:absolute lg:inset-0 lg:aspect-auto">
        {/* desktop: the same photo, graded, fills the whole stage as the background the
            black glass blurs over; the sharp copy below keeps its proportions on the left */}
        <div aria-hidden="true" className="absolute inset-0 hidden overflow-hidden lg:block">
          <div
            className="iron-photo absolute inset-0 scale-110 blur-[26px]"
            style={{ "--lift": a.photos[shown].lift ?? 0.9 } as React.CSSProperties}
          >
            <Image
              key={a.photos[shown].src}
              src={a.photos[shown].src}
              alt=""
              fill
              sizes="60vw"
              className="object-cover"
              style={{ objectPosition: a.photos[shown].focus ?? "50% 22%" }}
            />
          </div>
        </div>
        <div className="absolute inset-0 lg:right-[calc(min(48%,38rem)-7rem)] lg:[mask-image:linear-gradient(90deg,#000_calc(100%-7rem),transparent)]">
          {a.photos.map((ph, i) => (
            <div
              key={ph.src}
              className={`iron-photo absolute inset-0 transition-opacity duration-700 ease-[var(--ease-hammer)] ${i === shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
              style={{ "--lift": ph.lift ?? 0.9 } as React.CSSProperties}
              aria-hidden={i !== shown}
            >
              <Image
                src={ph.src}
                alt={i === shown ? ph.alt[lang] : ""}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                style={{ objectPosition: ph.focus ?? "50% 22%" }}
              />
            </div>
          ))}
        </div>
        <span className="readout absolute left-4 top-4 z-10 bg-forge/85 px-2 py-1 text-[0.6rem] text-iron">
          {t.roster.piece} {String(index + 1).padStart(3, "0")}
        </span>
      </div>

      {/* the profile on black glass */}
      <div className="relative -mt-28 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[min(48%,38rem)]">
        <div aria-hidden="true" className="glass-side absolute inset-0" />
        <div className="relative flex h-full flex-col gap-6 overflow-y-auto lg:max-[1440px]:gap-4 overscroll-contain px-5 pb-6 pt-24 [scrollbar-width:thin] sm:px-8 lg:pb-6 lg:pl-[clamp(5rem,7vw,7rem)] lg:pr-10 lg:pt-10 lg:max-[1440px]:pt-7">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="readout text-[0.65rem] text-glow">{p.role[lang]}</p>
              {p.sample && (
                <span className="readout rounded-[2px] border border-anvil px-1.5 py-0.5 text-[0.58rem] text-steel">
                  {t.roster.sampleBio}
                </span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
              <h3
                id={`artist-${a.slug}`}
                className="stencil min-w-0 text-[clamp(3rem,5vw,4.75rem)] leading-[0.86] [--wdth:66]"
              >
                {a.name}
              </h3>
              <Listen a={a} />
            </div>
          </div>

          <div>
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/90">{bio[0]}</p>
            {bio.length > 1 && (
              <>
                <div
                  id={bioId}
                  hidden={!open}
                  className="mt-4 max-w-[34rem] space-y-4 text-[1rem] leading-relaxed text-iron/75"
                >
                  {bio.slice(1).map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={bioId}
                  onClick={() => setOpen((v) => !v)}
                  className="readout mt-2 inline-flex min-h-11 items-center gap-2 text-xs text-ember hover:text-white-heat"
                >
                  {open ? t.roster.readLess : t.roster.readMore}
                  <ArrowDown
                    className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
              </>
            )}
          </div>

          <dl className="readout grid grid-cols-2 gap-x-6 text-[0.68rem]">
            <div className="border-t border-iron/15 py-3">
              <dt className="text-steel">{t.roster.genre}</dt>
              <dd className={`mt-1 ${p.genres.length ? "text-iron" : "text-steel"}`}>
                {p.genres.length ? p.genres.join(" · ") : t.roster.tbc}
              </dd>
            </div>
            <div className="border-t border-iron/15 py-3">
              <dt className="text-steel">{t.roster.city}</dt>
              <dd className="mt-1 text-iron">{p.city}</dd>
            </div>
            <div className="border-t border-iron/15 py-3">
              <dt className="text-steel">{t.roster.since}</dt>
              <dd className={`mt-1 ${p.since ? "text-iron" : "text-steel"}`}>
                {p.since || t.roster.tbc}
              </dd>
            </div>
            <div className="border-t border-iron/15 py-3">
              <dt className="text-steel">{t.roster.next}</dt>
              <dd className="mt-1">
                {next && nextDate ? (
                  <a href="#agenda" className="hover:text-white-heat">
                    <span style={{ color: "var(--h)" }}>
                      {nextDate.day} {nextDate.month}
                    </span>{" "}
                    <span className="text-iron">· {t.types[next.type]}</span>
                  </a>
                ) : (
                  <span className="text-steel">{t.roster.none}</span>
                )}
              </dd>
            </div>
            <div className="border-y border-iron/15 py-3">
              <dt className="text-steel">{t.roster.kick}</dt>
              <dd className="mt-1">
                {a.kickUrl ? (
                  <a
                    href={a.kickUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-ember hover:text-white-heat"
                  >
                    kick.com <ArrowUpRight className="size-3.5" />
                  </a>
                ) : (
                  <span className="text-steel">{t.kick.pending}</span>
                )}
              </dd>
            </div>
            <div className="border-y border-iron/15 py-3">
              <dt className="text-steel">Links</dt>
              <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {a.links.length ? (
                  a.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-iron hover:text-ember"
                    >
                      {l.label}
                    </a>
                  ))
                ) : (
                  <span className="text-steel">{t.roster.soon}</span>
                )}
              </dd>
            </div>
          </dl>

          {a.photos.length > 1 && (
            <div className="lg:mt-auto">
              <p className="stamp mb-3">
                {t.roster.photos}{" "}
                <span className="text-iron">{String(shown + 1).padStart(2, "0")}</span> /{" "}
                {String(a.photos.length).padStart(2, "0")}
              </p>
              <ul className="flex flex-wrap gap-2">
                {a.photos.map((ph, i) => (
                  <li key={ph.src}>
                    <button
                      type="button"
                      onClick={() => setShown(i)}
                      aria-pressed={i === shown}
                      aria-label={`${t.roster.showPhoto} ${i + 1}`}
                      className={`relative block size-12 overflow-hidden rounded-[3px] border transition-[border-color,opacity] duration-300 ${i === shown ? "border-ember" : "border-anvil opacity-60 hover:opacity-100"}`}
                    >
                      <Image src={ph.src} alt="" fill sizes="48px" className="object-cover grayscale" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Roster() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = (i: number) => {
    const n = (i + artists.length) % artists.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <section
      id="artistas"
      aria-labelledby="artistas-title"
      className="border-t border-anvil"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="artistas-title"
            className="stencil drop text-[clamp(2.75rem,6vw,4.5rem)] [--wdth:74] lg:col-span-7"
          >
            {t.roster.title}
          </h2>
          <p className="max-w-[32rem] text-[1.0625rem] leading-relaxed text-iron/80 lg:col-span-5">
            {t.roster.intro}
          </p>
        </div>

        {/* the roster index: scales to any roster size */}
        <div
          role="tablist"
          aria-label={t.roster.select}
          className="-mx-4 mt-10 flex gap-8 overflow-x-auto border-b border-anvil px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:mt-12 lg:gap-12"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") pick(active + 1);
            if (e.key === "ArrowLeft") pick(active - 1);
          }}
        >
          {artists.map((a, i) => {
            const on = i === active;
            return (
              <button
                key={a.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`artist-tab-${a.slug}`}
                aria-selected={on}
                aria-controls={`artist-panel-${a.slug}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className="group relative flex min-h-16 shrink-0 items-center gap-4 pb-4 pt-2 text-left"
              >
                <span
                  className={`relative size-12 shrink-0 overflow-hidden rounded-[2px] bg-forge transition-opacity duration-300 ${on ? "" : "opacity-50 group-hover:opacity-90"}`}
                >
                  <Image
                    src={a.photos[0].src}
                    alt=""
                    fill
                    sizes="48px"
                    className={`object-cover ${on ? "" : "grayscale"}`}
                  />
                </span>
                <span>
                  <span
                    className={`readout block text-[0.6rem] ${on ? "text-glow" : "text-steel"}`}
                  >
                    {String(i + 1).padStart(2, "0")} ·{" "}
                    {String(a.photos.length).padStart(2, "0")} {t.roster.photos}
                  </span>
                  <span
                    className={`stencil mt-1 block whitespace-nowrap text-[clamp(1.6rem,2.6vw,2.25rem)] leading-none [--wdth:72] transition-colors duration-300 ${on ? "text-iron" : "text-steel group-hover:text-iron"}`}
                  >
                    {a.name}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-[3px] origin-left rounded-full bg-[linear-gradient(90deg,var(--color-cherry),var(--color-ember),var(--color-glow))] shadow-[0_3px_10px_-3px_rgb(255_90_17/0.7)] transition-transform duration-500 ease-[var(--ease-hammer)] ${on ? "scale-x-100" : "scale-x-0"}`}
                />
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`artist-panel-${artists[active].slug}`}
          aria-labelledby={`artist-tab-${artists[active].slug}`}
          className="forge-in mt-6"
        >
          <Stage key={artists[active].slug} a={artists[active]} index={active} />
        </div>
      </div>
    </section>
  );
}

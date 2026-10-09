"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Heat } from "@/data/events";
import { trending, type Trend } from "@/data/trending";
import { useLang } from "@/lib/i18n";
import { ArrowDown, ArrowUpRight, Pause, Play } from "./icons";

/** Rank is temperature: the hottest piece leads, the rest cool down the list. */
const HEAT: Heat[] = ["white", "hot", "hot", "warm", "warm", "embers"];

/** Desktop mosaic: the lead piece takes a tall 7-column slot, two sit beside it, the rest run three across. */
const SLOT = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
];

/** After the lead three, cards run three across; a last row of one or two stretches to fill it. */
function TrendCard({ item, rank, count }: { item: Trend; rank: number; count: number }) {
  const { t, lang } = useLang();
  const card = useRef<HTMLLIElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);

  const lead = rank === 0;
  const heat = HEAT[rank] ?? "embers";
  const isVideo = item.media.kind === "video";
  const still = item.media.kind === "video" ? item.media.poster : item.media.src;
  const lift = item.media.kind === "image" ? item.media.lift : undefined;
  const focus = item.focus ?? "50% 35%";
  const sizes = lead
    ? "(max-width: 1024px) 82vw, 58vw"
    : "(max-width: 1024px) 82vw, 34vw";

  const play = useCallback(() => {
    video.current?.play().catch(() => {});
  }, []);
  const pause = useCallback(() => video.current?.pause(), []);
  const calm = () =>
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  // touch screens play the card that sits in view; every video stops once it leaves
  useEffect(() => {
    const el = card.current;
    if (!isVideo || !el) return;
    const touch = matchMedia("(hover: none)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.6;
        if (!entry.isIntersecting || (touch && !inView)) pause();
        else if (touch && inView && !calm()) play();
      },
      { threshold: [0, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isVideo, play, pause]);

  // the heat line under the picture follows playback (transform only, no layout)
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const v = video.current;
      if (v && bar.current && v.duration)
        bar.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // in-page links name their section; others go to Kick
  const internalLabel = (href: string) =>
    href === "#artistas" ? t.trending.artist : href.startsWith("#") ? t.trending.agenda : t.trending.open;

  const hover = isVideo
    ? {
        onPointerEnter: (e: React.PointerEvent) => {
          if (e.pointerType === "mouse" && !calm()) play();
        },
        onPointerLeave: (e: React.PointerEvent) => {
          if (e.pointerType === "mouse") pause();
        },
      }
    : {};

  return (
    <li
      ref={card}
      data-heat={heat}
      data-playing={playing || undefined}
      className={`trend-card trend-in parallax relative flex [container-type:size] h-[min(32rem,76vh)] w-[min(82vw,24rem)] shrink-0 snap-start flex-col overflow-hidden rounded-[3px] border border-anvil bg-forge-3 lg:h-auto lg:w-auto ${SLOT[rank] ?? (rank >= count - ((count - 3) % 3 || 3) && (count - 3) % 3 === 2 ? "lg:col-span-6" : (count - 3) % 3 === 1 && rank === count - 1 ? "lg:col-span-12" : "lg:col-span-4")}`}
      {...hover}
    >
      <div
        className="iron-photo absolute inset-0"
        style={{ "--lift": lift ?? 0.9 } as React.CSSProperties}
      >
        {item.media.kind === "video" ? (
          <video
            ref={video}
            src={item.media.src}
            poster={item.media.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={item.alt[lang]}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: focus }}
          />
        ) : (
          <Image
            src={item.media.src}
            alt={item.alt[lang]}
            fill
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: focus }}
          />
        )}
      </div>

      {/* kind and tags ride on the picture */}
      <div className="relative z-10 flex items-start justify-between gap-2 p-4">
        <span className="readout flex items-center gap-2 bg-forge/85 px-2 py-1 text-[0.6rem] text-iron">
          {isVideo ? (
            <Play className="size-3 text-ember" />
          ) : (
            <span className="heat-bar inline-block h-1.5 w-5 rounded-full" />
          )}
          {t.trending.kinds[item.kind]}
        </span>
        {item.sample && (
          <span className="readout bg-forge/85 px-2 py-1 text-[0.58rem] text-steel">
            {t.agenda.sample}
          </span>
        )}
      </div>

      {/* details on black glass: a pre-blurred copy of the still, feathered into the picture */}
      <div className="relative z-10 mt-auto">
        <div aria-hidden="true" className="glass-field absolute inset-0 -z-10">
          <div
            className="glass-blur absolute inset-x-0 bottom-0 h-[100cqh]"
            style={{ "--lift": lift ?? 0.9 } as React.CSSProperties}
          >
            <div className="iron-photo absolute inset-0">
              <Image
                src={still}
                alt=""
                fill
                sizes={sizes}
                className="object-cover"
                style={{ objectPosition: focus }}
              />
            </div>
          </div>
        </div>

        <div className={`pb-5 ${lead ? "px-5 pt-12 lg:px-8 lg:pb-8" : "px-5 pt-10"}`}>
          <span
            aria-hidden="true"
            className="mb-4 block h-[3px] overflow-hidden rounded-full bg-iron/10"
          >
            <span
              ref={bar}
              className={`heat-bar block h-full origin-left rounded-full ${isVideo ? "w-full bg-[linear-gradient(90deg,var(--h2),var(--h))]" : "w-10"}`}
              style={isVideo ? { transform: "scaleX(0)" } : undefined}
            />
          </span>

          <div className="flex items-end gap-4">
            <span
              aria-hidden="true"
              className={`stencil shrink-0 leading-[0.8] [--wdth:64] ${lead ? "text-[clamp(3.75rem,6vw,5.5rem)]" : "text-[3.25rem]"}`}
              style={{ color: "var(--h)" }}
            >
              {String(rank + 1).padStart(2, "0")}
            </span>
            <h3
              className={`stencil min-w-0 leading-[0.92] text-iron ${lead ? "text-[clamp(1.6rem,3vw,2.75rem)] [--wdth:76]" : "text-[1.5rem] [--wdth:78]"}`}
            >
              {item.title[lang]}
            </h3>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <p className="readout min-w-0 text-[0.64rem] leading-relaxed text-steel">
              {t.trending.kinds[item.kind]} ·{" "}
              <span className="text-iron/80">{item.meta[lang]}</span>
            </p>
            {isVideo ? (
              <button
                type="button"
                onClick={playing ? pause : play}
                aria-pressed={playing}
                aria-label={`${playing ? t.trending.pause : t.trending.play}: ${item.title[lang]}`}
                className="btn btn-steel min-h-11 px-3 text-[0.9rem]"
              >
                {playing ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4" />
                )}
                <span className="hidden sm:inline">
                  {playing ? t.trending.pause : t.trending.play}
                </span>
              </button>
            ) : (
              item.href && (
                <a
                  href={item.href}
                  {...(item.href.startsWith("#") ? {} : { target: "_blank", rel: "noreferrer" })}
                  aria-label={`${internalLabel(item.href)}: ${item.title[lang]}`}
                  className="btn btn-steel min-h-11 px-3 text-[0.9rem]"
                >
                  <span className="hidden sm:inline">
                    {internalLabel(item.href)}
                  </span>
                  {item.href.startsWith("#") ? <ArrowDown className="size-4" /> : <ArrowUpRight className="size-4" />}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/** En tendencia: the latest productions and projects, ranked hottest first. */
export default function Trending() {
  const { t } = useLang();
  if (trending.length === 0) return null;

  return (
    <section
      id="tendencia"
      aria-labelledby="trending-title"
      className="border-t border-anvil"
    >
      <div className="mx-auto max-w-[1440px] py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-0">
          <div className="lg:col-span-7">
            <h2
              id="trending-title"
              className="stencil drop text-[clamp(3.5rem,11vw,6rem)] [--wdth:68]"
            >
              {t.trending.title}
            </h2>
            <p className="readout mt-5 flex items-center gap-3 text-[0.72rem] text-iron/80">
              <span aria-hidden="true" className="h-px w-10 bg-iron/40" />
              {t.trending.caption}
            </p>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/85">
              {t.trending.intro}
            </p>
            <p className="readout mt-4 hidden text-[0.64rem] text-steel [@media(hover:hover)_and_(pointer:fine)]:block">
              {t.trending.hint}
            </p>
          </div>
        </div>

        <ol
          aria-label={t.trending.list}
          className="mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:scroll-px-6 sm:px-6 lg:mt-16 lg:grid lg:grid-cols-12 lg:grid-rows-[repeat(2,clamp(16rem,21vw,21rem))] lg:auto-rows-[clamp(20rem,25vw,24rem)] lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {trending.map((item, i) => (
            <TrendCard key={item.id} item={item} rank={i} count={trending.length} />
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { artists } from "@/data/artists";
import type { Heat } from "@/data/events";
import { topSongs, type TopSide, type TopSong } from "@/data/topSongs";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight, Pause, Play, Spotify, YouTube } from "./icons";

const SLOTS = 3;
/** Rank is temperature, as in Trending: the most played burns hottest. */
const HEAT: Heat[] = ["white", "hot", "warm"];

type Player = {
  playing: string | null;
  toggle: (key: string, song: TopSong) => void;
  bar: (key: string) => (el: HTMLSpanElement | null) => void;
};

/**
 * Covers lean toward the pointer (mouse only, never under reduced motion).
 * The transform is written straight to the element: no re-render, no inherited variables.
 */
function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const handlers = {
    onPointerMove: (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
    },
    onPointerLeave: () => {
      if (ref.current) ref.current.style.transform = "";
    },
  };
  return [ref, handlers] as const;
}

/** The artwork, or, with none yet, the title printed on a steel plate in the rank's heat. */
function CoverArt({ song, artist, rank, sizes }: { song?: TopSong; artist: string; rank: number; sizes: string }) {
  const { t } = useLang();
  if (song?.cover) {
    return <Image src={song.cover.src} alt={`${t.top.coverOf} ${song.title}, ${artist}`} fill sizes={sizes} className="object-cover" />;
  }
  return (
    <div className={`plate absolute inset-0 flex flex-col justify-between p-[9%] ${song ? "" : "top-empty"}`}>
      <span className="readout text-[0.62rem] text-steel">
        {String(rank + 1).padStart(2, "0")} · {artist}
      </span>
      <span
        className={`stencil text-balance leading-[0.84] [--wdth:64] ${song ? "text-iron" : "text-steel"} ${rank === 0 ? "text-[clamp(2.5rem,6vw,5.5rem)]" : "text-[clamp(1.4rem,2.4vw,2.2rem)]"}`}
      >
        {song?.title ?? t.top.tbd}
      </span>
      <span aria-hidden="true" className="heat-bar block h-1.5 w-1/3 rounded-full" />
    </div>
  );
}

/** The record behind a sleeve; its label is the cover. Spins slowly on hover, at 33⅓ while playing. */
function Record({ song, mirror }: { song?: TopSong; mirror: boolean }) {
  return (
    <div aria-hidden="true" className={`top-record absolute inset-[4%] ${mirror ? "top-record-left" : ""}`}>
      <div className="top-spin-slow size-full">
        <div className="top-spin size-full">
          <div className="record-face relative size-full rounded-full">
            <span className="absolute inset-[31%] overflow-hidden rounded-full border-[3px] border-scale bg-ember">
              {song?.cover ? (
                <Image src={song.cover.src} alt="" fill sizes="160px" className="object-cover" />
              ) : (
                <Image src="/brand/logo-512.webp" alt="" fill sizes="160px" className="scale-90 object-contain" />
              )}
            </span>
            <span className="absolute left-1/2 top-1/2 size-[3%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forge" />
          </div>
        </div>
      </div>
      <span className="record-sheen absolute inset-0 rounded-full" />
    </div>
  );
}

/** Three bars that dance while a preview plays. */
function Eq() {
  return (
    <span aria-hidden="true" className="top-eq flex h-3 items-end gap-[2px]">
      <span />
      <span />
      <span />
    </span>
  );
}

/** Per-song actions: preview (only with a clip), Spotify, YouTube. Number one gets the hot plate. */
function Actions({ song, id, player, lead }: { song: TopSong; id: string; player: Player; lead?: boolean }) {
  const { t } = useLang();
  const playing = player.playing === id;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {lead && song.spotify && (
        <a href={song.spotify} target="_blank" rel="noreferrer" className="btn btn-hot">
          <Spotify className="size-5" />
          {t.top.spotify}
          <ArrowUpRight className="size-4" />
        </a>
      )}
      {song.preview && (
        <button
          type="button"
          onClick={() => player.toggle(id, song)}
          aria-pressed={playing}
          aria-label={`${playing ? t.top.pause : t.top.preview}: ${song.title}`}
          title={playing ? t.top.pause : t.top.preview}
          className={`btn btn-steel ${lead ? "px-4" : "size-11 min-h-11 px-0"}`}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4 text-ember" />}
          {lead && <span>{playing ? t.top.pause : t.top.preview}</span>}
        </button>
      )}
      {!lead && song.spotify && (
        <a
          href={song.spotify}
          target="_blank"
          rel="noreferrer"
          aria-label={`${t.top.spotify}: ${song.title}`}
          title={t.top.spotify}
          className="btn btn-steel size-11 min-h-11 px-0"
        >
          <Spotify className="size-5 text-ember" />
        </a>
      )}
      {song.youtube && (
        <a
          href={song.youtube}
          target="_blank"
          rel="noreferrer"
          aria-label={`${t.top.youtube}: ${song.title}`}
          title={t.top.youtube}
          className="btn btn-steel size-11 min-h-11 px-0"
        >
          <YouTube className="size-5 text-ember" />
        </a>
      )}
    </div>
  );
}

/** Plays, year, explicit and sample tags, on one mono line. */
function Meta({ song, big }: { song: TopSong; big?: boolean }) {
  const { t } = useLang();
  return (
    <p className={`readout flex flex-wrap items-baseline gap-x-4 gap-y-1 text-steel ${big ? "text-[0.7rem]" : "text-[0.62rem]"}`}>
      {song.plays && (
        <span>
          <span className={`tracking-normal ${big ? "text-[1.6rem]" : "text-[1rem] text-iron"}`} style={big ? { color: "var(--h)" } : undefined}>
            {song.plays}
          </span>{" "}
          {t.top.plays}
        </span>
      )}
      {song.year && <span>{song.year}</span>}
      {song.explicit && (
        <span aria-label={t.releases.explicit} title={t.releases.explicit} className="grid size-4 place-items-center self-center rounded-[2px] bg-iron/70 text-[0.55rem] leading-none text-forge">
          E
        </span>
      )}
      {song.sample && <span className="self-center rounded-[2px] border border-anvil px-1.5 py-0.5 text-[0.56rem]">{t.agenda.sample}</span>}
    </p>
  );
}

/** Number one: the big sleeve, its record sliding out, the giant outlined "1" behind it. */
function Lead({ song, artist, id, mirror, player }: { song?: TopSong; artist: string; id: string; mirror: boolean; player: Player }) {
  const { t } = useLang();
  const [tilt, tiltHandlers] = useTilt(9);
  const playing = player.playing === id;

  return (
    <article data-heat={HEAT[0]} data-playing={playing || undefined} className={`top-card relative lg:col-span-7 ${mirror ? "lg:col-start-6 lg:row-start-1" : ""}`}>
      <span
        aria-hidden="true"
        className={`top-numeral stencil pointer-events-none absolute top-[clamp(1rem,3vw,3rem)] z-0 text-[clamp(15rem,32vw,28rem)] leading-[0.8] [--wdth:60] ${mirror ? "right-0" : "left-0"}`}
      >
        1
      </span>

      <div
        className={`top-deal relative z-10 flex pt-[clamp(5rem,10vw,9rem)] ${mirror ? "justify-end" : "lg:pl-[8%]"}`}
        style={{ animationRange: "entry 5% cover 30%" } as React.CSSProperties}
      >
        <div className={`top-sleeve-wrap group relative w-[min(74%,32rem)] ${mirror ? "lg:mr-[8%]" : ""}`} {...tiltHandlers}>
          <Record song={song} mirror={mirror} />
          <div ref={tilt} className="top-sleeve relative z-10 aspect-square overflow-hidden rounded-[3px] bg-forge-3">
            <CoverArt song={song} artist={artist} rank={0} sizes="(max-width: 1024px) 74vw, 32rem" />
            {playing && (
              <span className="readout absolute left-3 top-3 flex items-center gap-2 rounded-[2px] bg-forge/85 px-2 py-1 text-[0.6rem] text-white-heat">
                <Eq />
                {t.top.nowPlaying}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={`relative z-10 mt-8 max-w-[40rem] ${mirror ? "lg:ml-auto lg:text-right" : "lg:pl-[8%]"}`}>
        <p className={`readout flex items-center gap-3 text-[0.66rem] text-iron ${mirror ? "lg:justify-end" : ""}`}>
          <span aria-hidden="true" className="heat-bar inline-block h-1.5 w-10 rounded-full" />
          {t.top.number} 1
        </p>
        <h4 className="stencil mt-3 text-balance text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.84] text-iron [--wdth:64]">
          {song?.title ?? t.top.tbd}
        </h4>
        {song && (
          <>
            <div className={`mt-4 ${mirror ? "lg:flex lg:justify-end" : ""}`}>
              <Meta song={song} big />
            </div>
            <div className={`mt-6 ${mirror ? "lg:flex lg:justify-end" : ""}`}>
              <Actions song={song} id={id} player={player} lead />
            </div>
          </>
        )}
        {playing && (
          <span aria-hidden="true" className="mt-5 block h-[3px] overflow-hidden rounded-full bg-iron/10">
            <span ref={player.bar(id)} className="heat-bar block h-full w-full origin-left" style={{ transform: "scaleX(0)" }} />
          </span>
        )}
      </div>
    </article>
  );
}

/** Numbers two and three: smaller sleeves thrown on the table at an angle, each with its outlined numeral. */
function Runner({
  song,
  artist,
  rank,
  id,
  mirror,
  player,
}: {
  song?: TopSong;
  artist: string;
  rank: number;
  id: string;
  mirror: boolean;
  player: Player;
}) {
  const { t } = useLang();
  const [tilt, tiltHandlers] = useTilt(12);
  const playing = player.playing === id;
  const lean = (rank === 1 ? -4 : 3) * (mirror ? -1 : 1);

  return (
    <article
      data-heat={song ? HEAT[rank] : "cold"}
      data-playing={playing || undefined}
      className={`top-card top-deal relative flex items-end gap-5 sm:gap-7 ${mirror ? "lg:flex-row-reverse lg:text-right" : ""}`}
      style={{ animationRange: `entry ${10 + rank * 8}% cover ${34 + rank * 8}%` } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className={`top-numeral stencil pointer-events-none absolute -top-[0.16em] z-0 text-[clamp(8rem,15vw,13rem)] leading-[0.8] [--wdth:60] ${mirror ? "right-[2%] lg:left-[2%] lg:right-auto" : "right-[2%]"}`}
      >
        {rank + 1}
      </span>

      <div className="top-sleeve-wrap group relative z-10 w-[46%] max-w-[16rem] shrink-0" style={{ "--lean": `${lean}deg` } as React.CSSProperties} {...tiltHandlers}>
        {song && <Record song={song} mirror={mirror} />}
        <div ref={tilt} className="top-sleeve relative z-10 aspect-square overflow-hidden rounded-[3px] bg-forge-3">
          <CoverArt song={song} artist={artist} rank={rank} sizes="(max-width: 1024px) 46vw, 16rem" />
          {playing && (
            <span className="absolute left-2 top-2 rounded-[2px] bg-forge/85 px-1.5 py-1">
              <Eq />
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 min-w-0 flex-1 pb-1">
        <p className={`readout flex items-center gap-2 text-[0.62rem] text-iron ${mirror ? "lg:justify-end" : ""}`}>
          <span aria-hidden="true" className="heat-bar inline-block h-1.5 w-6 rounded-full" />
          {t.top.number} {rank + 1}
        </p>
        <h4 className={`stencil mt-2 text-balance text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[0.88] [--wdth:68] ${song ? "text-iron" : "text-steel"}`}>
          {song?.title ?? t.top.tbd}
        </h4>
        {song && (
          <>
            <div className={`mt-3 ${mirror ? "lg:flex lg:justify-end" : ""}`}>
              <Meta song={song} />
            </div>
            <div className={`mt-4 ${mirror ? "lg:flex lg:justify-end" : ""}`}>
              <Actions song={song} id={id} player={player} />
            </div>
          </>
        )}
        {playing && (
          <span aria-hidden="true" className="mt-4 block h-[2px] overflow-hidden rounded-full bg-iron/10">
            <span ref={player.bar(id)} className="heat-bar block h-full w-full origin-left" style={{ transform: "scaleX(0)" }} />
          </span>
        )}
      </div>
    </article>
  );
}

/** One artist's band: the name stamped across, number one big, two and three beside it, the lead cover's glow behind. */
function Band({ side, index, player }: { side: TopSide; index: number; player: Player }) {
  const { t } = useLang();
  const a = artists.find((x) => x.slug === side.artist);
  const name = a?.name ?? side.artist;
  const mirror = index % 2 === 1;
  const lead = side.songs[0];

  return (
    <div role="group" aria-labelledby={`top-${side.artist}`} className="top-band relative isolate py-16 lg:py-24">
      {/* the number one's cover, blown up into the band's light */}
      {lead?.cover && (
        <div aria-hidden="true" className="top-glow absolute inset-0 -z-10 overflow-hidden">
          <Image src={lead.cover.src} alt="" fill sizes="40vw" className="scale-125 object-cover blur-[80px] brightness-[0.4] saturate-[1.3]" />
        </div>
      )}

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <header className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-3 ${mirror ? "lg:flex-row-reverse" : ""}`}>
          <h3 id={`top-${side.artist}`} className="stencil text-[clamp(3.5rem,12vw,10rem)] leading-[0.8] text-iron [--wdth:62]">
            {name}
          </h3>
          {a?.listen.spotify && (
            <a
              href={a.listen.spotify}
              target="_blank"
              rel="noreferrer"
              className="readout inline-flex min-h-11 items-center gap-2 pb-2 text-[0.68rem] text-iron underline decoration-iron/30 underline-offset-4 hover:text-white-heat hover:decoration-ember"
            >
              <Spotify className="size-4 text-ember" />
              {t.top.more} {name}
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </header>

        <div className="mt-4 grid grid-cols-1 gap-16 lg:mt-0 lg:grid-cols-12 lg:gap-10">
          <Lead song={lead} artist={name} id={`${index}-0`} mirror={mirror} player={player} />
          <div className={`flex flex-col gap-16 lg:col-span-5 lg:justify-center lg:pt-24 ${mirror ? "lg:col-start-1 lg:row-start-1" : ""}`}>
            {Array.from({ length: SLOTS - 1 }, (_, i) => (
              <Runner
                key={i}
                song={side.songs[i + 1]}
                artist={name}
                rank={i + 1}
                id={`${index}-${i + 1}`}
                mirror={mirror}
                player={player}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Lo más escuchado: each artist's three most played songs, both artists on one scroll. */
export default function TopSongs({ sides = topSongs }: { sides?: TopSide[] }) {
  const { t } = useLang();
  const [playing, setPlaying] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const loading = useRef<string | null>(null);
  const bars = useRef(new Map<string, HTMLSpanElement>());

  // one audio element for every preview; it stops when the page hides or the section unmounts
  useEffect(() => {
    const a = new Audio();
    a.preload = "none";
    audio.current = a;
    const on = () => setPlaying(loading.current);
    const off = () => setPlaying(null);
    a.addEventListener("play", on);
    a.addEventListener("pause", off);
    a.addEventListener("ended", off);
    const hide = () => document.hidden && a.pause();
    document.addEventListener("visibilitychange", hide);
    return () => {
      a.pause();
      a.removeEventListener("play", on);
      a.removeEventListener("pause", off);
      a.removeEventListener("ended", off);
      document.removeEventListener("visibilitychange", hide);
    };
  }, []);

  // the playing song's heat line follows playback (transform only)
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const a = audio.current;
      const el = bars.current.get(playing);
      if (a && el && a.duration) el.style.transform = `scaleX(${a.currentTime / a.duration})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  if (!sides.some((s) => s.songs.length > 0)) return null;

  const player: Player = {
    playing,
    toggle: (key, song) => {
      const a = audio.current;
      if (!a || !song.preview) return;
      if (playing === key) {
        a.pause();
        return;
      }
      loading.current = key;
      a.setAttribute("src", song.preview);
      a.play().catch(() => setPlaying(null));
    },
    bar: (key) => (el) => {
      if (el) bars.current.set(key, el);
      else bars.current.delete(key);
    },
  };

  const names = sides.map((s) => artists.find((a) => a.slug === s.artist)?.name ?? s.artist);

  return (
    <section id="mas-escuchadas" aria-labelledby="top-title" className="relative overflow-clip border-t border-anvil">
      <div className="mx-auto max-w-[1440px] px-4 pt-20 sm:px-6 lg:px-10 lg:pt-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="top-title" className="stencil drop text-[clamp(3.25rem,10vw,6rem)] [--wdth:66] lg:col-span-7">
            {t.top.title}
          </h2>
          <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/80 lg:col-span-5">{t.top.intro}</p>
        </div>
      </div>

      {/* the names run across the floor as the section scrolls by */}
      <div aria-hidden="true" className="mt-12 overflow-hidden border-y border-anvil py-4 lg:mt-16">
        <div className="top-ticker flex w-max items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 4 }, (_, k) =>
            names.map((n, i) => (
              <span key={`${k}-${i}`} data-heat={i % 2 ? "hot" : "white"} className="flex items-center gap-8">
                <span className="stencil top-outline text-[clamp(3rem,7vw,6rem)] leading-none [--wdth:62]">{n}</span>
                <span className="heat-bar block h-2 w-16 rounded-full" />
              </span>
            )),
          )}
        </div>
      </div>

      {sides.map((s, i) => (
        <Band key={s.artist} side={s} index={i} player={player} />
      ))}
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { events, eventEnd, heatOf, type ForgeEvent } from "@/data/events";
import { futurasPromesas as FP, type Poster, type Promesa } from "@/data/futurasPromesas";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { icsHref } from "@/lib/ics";
import { ArrowDown, Broadcast, CalendarPlus } from "./icons";

const event = events.find((e) => e.id === FP.eventId) as ForgeEvent | undefined;

type Slot = { n: number; who: Promesa | null };

// every slot on the board, revealed or not; they alternate left and right of the
// guest, and an odd one out hangs under the guest's print
const slots: Slot[] = Array.from({ length: Math.max(FP.slots, FP.competitors.length) }, (_, n) => ({ n, who: FP.competitors[n] ?? null }));
const under = slots.length % 2 === 1 ? slots[slots.length - 1] : null;
const sides = under ? slots.slice(0, -1) : slots;
const left = sides.filter((s) => s.n % 2 === 0);
const right = sides.filter((s) => s.n % 2 === 1);

// the strings: the top prints run to the guest's pin, lower ones to a pin on the
// guest's near edge, so no string crosses the guest's face. Unrevealed slots hang loose.
const links = sides
  .filter((s) => s.who)
  .map((s) => ({ id: s.who!.name, to: s.n < 2 ? "guest" : s.n % 2 === 0 ? "guest-l" : "guest-r" }));
// the guest's edge pins, only where a string ties on
const guestEdges = (["l", "r"] as const).filter((e) => links.some((l) => l.to === `guest-${e}`));

/** The poster leans toward the mouse: perspective tilt written straight to the element (no re-render). */
function useTilt(max = 7) {
  const ref = useRef<HTMLDivElement>(null);
  const handlers = {
    onPointerMove: (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1100px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
    },
    onPointerLeave: () => {
      if (ref.current) ref.current.style.transform = "";
    },
  };
  return [ref, handlers] as const;
}

/** A print pinned to the board: the pin stays put; the print straightens and lifts toward you on hover. */
function Pinned({
  id,
  poster,
  sheet,
  lean,
  sizes,
  pin,
  edges,
  onHeat,
  lang,
  children,
}: {
  id: string;
  /** The print; without one, `sheet` is drawn in its place (a slot still to be revealed). */
  poster?: Poster;
  sheet?: React.ReactNode;
  lean: number;
  sizes?: string;
  /** Registers a pin on the board by id: this print's is `id`, its edge pins `id-l` and `id-r`. */
  pin: (id: string) => (el: HTMLSpanElement | null) => void;
  /** Extra pins on the print's left ("l") and right ("r") edges, for the lower strings. */
  edges?: readonly ("l" | "r")[];
  onHeat: (id: string | null) => void;
  lang: "es" | "en";
  children: React.ReactNode;
}) {
  const ratio = poster ? `${poster.width} / ${poster.height}` : "2 / 3";
  const [tilt, tiltHandlers] = useTilt();
  return (
    <figure
      className="fp-print relative"
      style={{ "--lean": `${lean}deg` } as React.CSSProperties}
      onPointerEnter={() => onHeat(id)}
      onPointerLeave={() => {
        onHeat(null);
        tiltHandlers.onPointerLeave();
      }}
      onPointerMove={tiltHandlers.onPointerMove}
    >
      <span ref={pin(id)} aria-hidden="true" className="fp-pin absolute left-1/2 top-0 z-30 -ml-[7px] -mt-[7px]" />
      {!poster && (
        <svg aria-hidden="true" className="fp-loose absolute left-1/2 top-0 z-30 -ml-[3px] overflow-visible" width="20" height="64" viewBox="0 0 20 64">
          <path d="M3 1 C 14 18, -2 30, 9 46 S 12 58, 6 63" />
        </svg>
      )}
      {edges && edges.length > 0 && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-30" style={{ aspectRatio: ratio }}>
          {edges.includes("l") && <span ref={pin(`${id}-l`)} className="fp-pin absolute left-0 top-[58%] -ml-[5px]" />}
          {edges.includes("r") && <span ref={pin(`${id}-r`)} className="fp-pin absolute right-0 top-[58%] -mr-[5px]" />}
        </div>
      )}
      <div className="fp-sheet">
        <div ref={tilt} className="fp-tilt relative overflow-hidden rounded-[3px]" style={{ aspectRatio: ratio }}>
          {poster ? <Image src={poster.src} alt={poster.alt[lang]} fill sizes={sizes} className="object-cover" /> : sheet}
          <span aria-hidden="true" className="fp-gloss pointer-events-none absolute inset-0" />
        </div>
      </div>
      <figcaption className="mt-5">{children}</figcaption>
    </figure>
  );
}

/** Red string from each competitor's pin to the guest's, sagging under its own weight. Drawn in on scroll. */
function Strings({ board, pins, hot }: { board: React.RefObject<HTMLDivElement | null>; pins: Map<string, HTMLSpanElement>; hot: string | null }) {
  const [paths, setPaths] = useState<{ id: string; d: string }[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const measure = () => {
      const b = { width: el.offsetWidth, height: el.offsetHeight };
      // offsets, not client rects: the scroll-in transforms never move the string's ends
      const at = (id: string) => {
        let node: HTMLElement | null = pins.get(id) ?? null;
        if (!node) return null;
        let x = node.offsetWidth / 2;
        let y = node.offsetHeight / 2;
        while (node && node !== el) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return node === el ? { x, y } : null;
      };
      const next: { id: string; d: string }[] = [];
      if (window.matchMedia("(min-width: 1024px)").matches) {
        for (const l of links) {
          const from = at(l.id);
          const guest = at(l.to);
          if (!from || !guest) continue;
          const sag = Math.hypot(guest.x - from.x, guest.y - from.y) * 0.16;
          const mx = (from.x + guest.x) / 2;
          const my = Math.max(from.y, guest.y) + sag;
          next.push({ id: l.id, d: `M${from.x.toFixed(1)} ${from.y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${guest.x.toFixed(1)} ${guest.y.toFixed(1)}` });
        }
      }
      setBox({ w: b.width, h: b.height });
      setPaths(next);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [board, pins]);

  if (paths.length === 0) return null;
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-visible" width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`}>
      {paths.map((p, i) => (
        <path
          key={p.id}
          d={p.d}
          pathLength={1}
          className={`fp-string ${hot === p.id || hot === "guest" ? "is-hot" : ""}`}
          style={{ animationRange: `entry ${30 + i * 10}% cover ${55 + i * 10}%` } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

/** Small measured countdown: four cells, the seconds stamped in on every tick. */
function Clock({ e, now }: { e: ForgeEvent; now: number | null }) {
  const { t, lang } = useLang();
  const c = formatCountdown(now === null ? 0 : new Date(e.start).getTime() - now, lang);
  const cells = [
    [c.d, t.hero.units.d],
    [c.h, t.hero.units.h],
    [c.m, t.hero.units.m],
    [c.s, t.hero.units.s],
  ];
  return (
    <div role="timer" aria-label={`${t.hero.startsIn} ${c.d} ${t.hero.units.d}, ${c.h} ${t.hero.units.h}, ${c.m} ${t.hero.units.m}`} className="grid grid-cols-4 border-y border-iron/15">
      {cells.map(([v, u], i) => (
        <div key={u} className={`py-3 ${i > 0 ? "border-l border-iron/15 pl-3 sm:pl-4" : ""}`}>
          <span
            key={i === 3 ? v : undefined}
            aria-hidden="true"
            className={`readout block text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none tracking-normal ${i === 3 ? "tick" : "text-iron"}`}
            style={i === 3 ? { color: "var(--h)" } : undefined}
          >
            {now === null ? "--" : v}
          </span>
          <span aria-hidden="true" className="readout mt-2 block text-[0.58rem] text-steel">
            {u}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Futuras Promesas 4: the next showcase on Kick, laid out as the case board its posters draw. */
export default function FuturasPromesas() {
  const { t, lang } = useLang();
  const now = useNow(1000);
  const c = t.fp;
  const board = useRef<HTMLDivElement>(null);
  // every pin on the board, by id; filled by the pins' own ref callbacks
  const [pins] = useState(() => new Map<string, HTMLSpanElement>());
  const [hot, setHot] = useState<string | null>(null);
  if (!event) return null;

  const heat = now === null ? "hot" : heatOf(event, now);
  const live = now !== null && now >= new Date(event.start).getTime() && now < eventEnd(event);
  const done = heat === "cold";
  const d = formatDateParts(event.start, lang);
  const pin = (id: string) => (el: HTMLSpanElement | null) => {
    if (el) pins.set(id, el);
    else pins.delete(id);
  };
  const print = (slot: Slot, side: number) => {
    const p = slot.who;
    const lean = side * (3.5 + (slot.n % 2) * 1.5) || (slot.n % 2 ? 2 : -2);
    const label = `${c.competitor} ${String(slot.n + 1).padStart(2, "0")}`;
    if (!p)
      return (
        <Pinned
          key={slot.n}
          id={`slot-${slot.n}`}
          lean={lean}
          pin={pin}
          onHeat={setHot}
          lang={lang}
          sheet={
            <div aria-hidden="true" className="fp-mystery absolute inset-0" style={{ "--i": slot.n } as React.CSSProperties}>
              <span className="readout absolute left-[9%] top-[6%] text-[0.58rem] text-steel">FP4 · {String(slot.n + 1).padStart(2, "0")}</span>
              <span className="fp-mystery-q stencil absolute inset-0 grid place-items-center">?</span>
              <span className="fp-mystery-bar absolute inset-x-[14%] bottom-[24%] h-[7%]" />
              <span className="stamp absolute inset-x-0 bottom-[9%] text-center text-ember">{c.soonStamp}</span>
            </div>
          }
        >
          <p className="readout text-[0.6rem] text-steel">{label}</p>
          <p className="stencil mt-1.5 text-[clamp(1.75rem,3vw,2.75rem)] leading-[0.9] text-steel [--wdth:74]">{c.soonName}</p>
          <p className="mt-2 text-[0.9rem] leading-snug text-iron/60">{c.soonNote}</p>
        </Pinned>
      );
    return (
      <Pinned
        key={p.name}
        id={p.name}
        poster={p.poster}
        lean={lean}
        sizes="(max-width: 1024px) 46vw, 22rem"
        pin={pin}
        onHeat={setHot}
        lang={lang}
      >
        <p className="readout text-[0.6rem] text-steel">{label}</p>
        <p className="stencil mt-1.5 text-[clamp(1.75rem,3vw,2.75rem)] leading-[0.9] text-iron [--wdth:74]">{p.name}</p>
      </Pinned>
    );
  };
  const hidden = slots.length - FP.competitors.length;

  return (
    <section
      id="futuras-promesas"
      aria-labelledby="fp-title"
      data-heat={heat}
      className="fp relative isolate overflow-clip border-t border-anvil"
    >
      {/* the guest's poster, blown up into the room's light */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image src={FP.guest.poster.src} alt="" fill sizes="40vw" className="scale-125 object-cover blur-[80px] brightness-[0.32] saturate-[0.9]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-forge),rgb(11_11_13/0.4)_20%,rgb(11_11_13/0.55)_70%,var(--color-forge))]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="fp-title" className="stencil drop flex items-end gap-[0.06em] text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.82] [--wdth:64]">
              <span>
                {FP.name.split(" ").map((w) => (
                  <span key={w} className="block">
                    {w}
                  </span>
                ))}
              </span>
              <span className="fp-number text-[1.9em] leading-[0.74]" style={{ color: done ? "var(--color-steel)" : "var(--h)" }}>
                {FP.edition}
              </span>
            </h2>
            <p className="readout mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.72rem] text-iron/90">
              <span aria-hidden="true" className="h-px w-10 bg-iron/40" />
              <span>
                {d.weekday} {d.day} {d.month} · {d.time}
              </span>
              <span className="text-steel">·</span>
              <span>{event.place[lang]}</span>
            </p>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/85">{c.lede}</p>
            <div className="mt-7">
              {live ? (
                <p className="stencil flex items-center gap-3 text-[clamp(2.25rem,4vw,3.5rem)] leading-none text-white-heat [--wdth:72]">
                  <span aria-hidden="true" className="live-dot size-3 rounded-full bg-white-heat" />
                  {t.hero.liveNow}
                </p>
              ) : done ? (
                <p className="readout text-[0.72rem] text-steel">{c.done}</p>
              ) : (
                <Clock e={event} now={now} />
              )}
            </div>
            {!done && (
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href={FP.channel} target="_blank" rel="noreferrer" className="btn btn-hot">
                  <Broadcast className="size-5" />
                  {live ? t.hero.watchLive : t.agenda.watch}
                </a>
                {!live && (
                  <a href={icsHref(event, lang)} download={`${event.id}.ics`} className="btn btn-steel">
                    <CalendarPlus className="size-5 text-ember" />
                    {t.agenda.addCal}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* the case board: competitors pinned either side, the guest judge in the middle, red string between them */}
        <div ref={board} className="fp-board relative mt-16 rounded-[3px] border border-anvil px-4 pb-10 pt-20 sm:px-8 sm:pt-14 lg:mt-24 lg:px-10 lg:pb-14 lg:pt-20">
          <p aria-hidden="true" className="stamp absolute left-4 top-4 text-steel sm:left-8 lg:left-10">
            {c.board}
          </p>
          <p className="readout absolute left-4 top-10 text-[0.62rem] text-steel sm:left-auto sm:right-8 sm:top-4 lg:right-10">
            {slots.length} {c.count}
            {hidden > 0 && ` · ${hidden} ${c.toReveal}`} · 1 {c.guestShort}
          </p>

          <Strings board={board} pins={pins} hot={hot} />

          {/* desktop: the side columns span both rows, so the print under the guest sits right below it */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8">
            {/* the guest: first on phones, centre stage on desktop */}
            <div className="fp-in relative col-span-2 mx-auto w-full max-w-[24rem] lg:col-span-6 lg:col-start-4 lg:row-start-1 lg:max-w-[30rem]">
              <Pinned
                id="guest"
                poster={FP.guest.poster}
                lean={-1}
                sizes="(max-width: 1024px) 80vw, 30rem"
                pin={pin}
                edges={guestEdges}
                onHeat={setHot}
                lang={lang}
              >
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                  <div>
                    <p className="readout text-[0.6rem] text-glow">{c.guest}</p>
                    <p className="stencil mt-1.5 text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[0.86] text-iron [--wdth:70]">{FP.guest.name}</p>
                  </div>
                  <a
                    href="#artistas"
                    className="readout inline-flex min-h-11 items-center gap-1.5 text-[0.62rem] text-ember underline decoration-ember/40 underline-offset-4 hover:text-white-heat"
                  >
                    {c.profile}
                    <ArrowDown className="size-3" />
                  </a>
                </div>
                <p className="mt-3 max-w-[28rem] text-[0.95rem] leading-relaxed text-iron/75">{c.guestNote}</p>
              </Pinned>
              {/* the stamp across the print */}
              <span aria-hidden="true" className="fp-stamp stencil pointer-events-none absolute right-[-5%] top-[34%] z-40 hidden lg:block">
                {c.guestStamp}
              </span>
            </div>

            <div className="fp-in flex flex-col gap-14 lg:col-span-3 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:pt-28">
              {left.map((s) => print(s, -1))}
            </div>
            <div className="fp-in flex flex-col gap-14 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:pt-44">
              {right.map((s) => print(s, 1))}
            </div>
            {under && (
              <div className="fp-in col-span-2 mx-auto w-[calc(50%-0.5rem)] sm:w-[calc(50%-1rem)] lg:col-span-6 lg:col-start-4 lg:row-start-2 lg:w-full lg:max-w-[18rem] lg:pt-6">
                {print(under, 0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

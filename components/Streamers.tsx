"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { heatOf, upcoming } from "@/data/events";
import { site } from "@/data/site";
import { streamers, type Streamer } from "@/data/streamers";
import { formatDateParts, useLang, useNow } from "@/lib/i18n";
import { ArrowDown, ArrowUpRight, Broadcast } from "./icons";

const LG = "(min-width: 1024px)";
const subscribe = (cb: () => void) => {
  const mq = matchMedia(LG);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
/** Desktop shows a split screen with one channel open; below 1024px every channel is open. */
const useDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => matchMedia(LG).matches,
    () => false,
  );

function Channel({
  s,
  index,
  open,
  desktop,
  onOpen,
}: {
  s: Streamer;
  index: number;
  open: boolean;
  desktop: boolean;
  onOpen: () => void;
}) {
  const { t, lang } = useLang();
  const now = useNow(60_000);
  const detailsId = useId();
  const bioId = useId();
  const [more, setMore] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const handoff = useRef(false);

  // opening a channel removes the button that had focus: hand focus to its name
  useEffect(() => {
    if (open && handoff.current) {
      handoff.current = false;
      title.current?.focus({ preventScroll: true });
    }
  }, [open]);
  const p = s.profile;
  const next =
    now === null
      ? undefined
      : upcoming(now).find(
          (e) => e.type === "stream" && (e.url || site.kick.url) === s.url,
        );
  const nextDate = next ? formatDateParts(next.start, lang) : null;
  const heat = next && now !== null ? heatOf(next, now) : "embers";
  const ch = `CH ${String(index + 1).padStart(2, "0")}`;
  const [shown, setShown] = useState(0);
  const photo = s.photos[shown] ?? s.photos[0];
  const lift = { "--lift": photo.lift ?? 1 } as React.CSSProperties;

  return (
    <li
      data-heat={heat}
      data-open={open || undefined}
      onPointerEnter={(e) => {
        if (desktop && e.pointerType === "mouse") onOpen();
      }}
      style={{ flexGrow: open ? 2.6 : 1 }}
      className="stream-panel relative flex flex-col overflow-hidden rounded-[3px] border border-anvil bg-forge-2 lg:min-w-0 lg:basis-0 lg:[container-type:size] lg:transition-[flex-grow] lg:duration-700 lg:ease-[var(--ease-hammer)]"
    >
      {/* the picture: true colour when the channel is open, cold iron when it is not */}
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:absolute lg:inset-0 lg:aspect-auto">
        {/* desktop: the open channel shows its portrait at true size on the right,
            over a blurred wash of itself, instead of blowing it up to the panel width */}
        {desktop && (
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="30vw"
              className={`scale-125 object-cover blur-[48px] transition-[filter] duration-700 ${open ? "brightness-[0.45] saturate-[0.85]" : "brightness-[0.3] grayscale"}`}
            />
          </div>
        )}
        <div
          className={`stream-photo absolute inset-y-0 right-0 overflow-hidden transition-[width] duration-700 ease-[var(--ease-hammer)] ${desktop && open ? "w-[min(50%,30rem)] [mask-image:linear-gradient(90deg,transparent,#000_5rem)]" : "w-full"}`}
          style={lift}
        >
          <Image
            src={photo.src}
            alt={photo.alt[lang]}
            fill
            sizes="(max-width: 1024px) 100vw, 34vw"
            className="object-cover"
            style={{
              objectPosition:
                desktop && open && photo.height > photo.width
                  ? "50% 20%"
                  : (photo.focus ?? "50% 25%"),
            }}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-2 p-4">
        <span className="readout flex items-center gap-2 bg-forge/85 px-2 py-1 text-[0.6rem] text-iron">
          <Broadcast className="size-3.5 text-ember" />
          {ch}
        </span>
        {photo.sample && (
          <span className="readout bg-forge/85 px-2 py-1 text-[0.58rem] text-steel">
            {t.streamers.samplePhoto}
          </span>
        )}
        {/* more than one photo: thumbnails switch the picture (open channel only) */}
        {s.photos.length > 1 && !(desktop && !open) && (
          <ul aria-label={t.roster.photos} className="ml-auto flex gap-1.5">
            {s.photos.map((ph, i) => (
              <li key={ph.src}>
                <button
                  type="button"
                  onClick={() => setShown(i)}
                  aria-pressed={i === shown}
                  aria-label={`${t.roster.showPhoto} ${i + 1}`}
                  className={`relative block size-11 overflow-hidden rounded-[2px] border transition-[border-color,opacity] duration-300 ${i === shown ? "border-ember" : "border-iron/20 opacity-70 hover:opacity-100"}`}
                >
                  <Image
                    src={ph.src}
                    alt=""
                    fill
                    sizes="44px"
                    className={`object-cover ${i === shown ? "" : "grayscale"}`}
                    style={{ objectPosition: ph.focus ?? "50% 25%" }}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* closed channel (desktop): the name runs up the edge; the whole panel opens it */}
      {desktop && !open && (
        <button
          type="button"
          onClick={() => {
            handoff.current = true;
            onOpen();
          }}
          aria-expanded={false}
          aria-controls={detailsId}
          aria-label={`${t.streamers.show} ${s.handle} (${s.name})`}
          className="absolute inset-0 z-30 flex flex-col items-start justify-end gap-5 bg-[linear-gradient(to_top,rgb(11_11_13/0.85),rgb(11_11_13/0.2)_55%,transparent)] p-6 text-left"
        >
          <span className="stencil rotate-180 text-[clamp(3rem,4.6vw,4.75rem)] leading-[0.85] text-iron [--wdth:66] [writing-mode:vertical-rl]">
            {s.handle}
          </span>
          <span className="readout flex items-center gap-2 text-[0.64rem] text-iron/80">
            {s.name}
            <ArrowUpRight className="size-3.5 text-ember" />
          </span>
        </button>
      )}

      {/* the open channel: details on black glass across the bottom */}
      <div
        id={detailsId}
        inert={desktop && !open}
        className={`relative z-10 -mt-28 transition-opacity duration-500 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:max-h-full ${desktop && open ? "lg:right-[min(40%,20rem)] min-[1440px]:right-[min(46%,28rem)]" : ""} lg:overflow-y-auto lg:overscroll-contain lg:[scrollbar-width:thin] ${desktop && !open ? "opacity-0" : "opacity-100 lg:delay-200"}`}
      >
        <div
          aria-hidden="true"
          className={`glass-field absolute inset-0 -z-10 ${desktop && open ? "glass-fade-right" : ""} max-lg:[mask-image:none] max-lg:bg-[linear-gradient(to_bottom,transparent,var(--color-forge-2)_7rem)] max-lg:after:hidden`}
        >
          <div
            className="glass-blur absolute inset-x-0 bottom-0 hidden h-[100cqh] lg:block"
            style={lift}
          >
            <div className="stream-photo absolute inset-0">
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="70vw"
                className="object-cover"
          style={{ objectPosition: photo.focus ?? "50% 25%" }}
              />
            </div>
          </div>
        </div>

        <div className="px-5 pb-6 pt-24 sm:px-8 lg:px-8 lg:pb-7 lg:pt-12">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="readout text-[0.65rem] text-glow">
                {p.role[lang]}
              </p>
              {p.sample && (
                <span className="readout rounded-[2px] border border-anvil px-1.5 py-0.5 text-[0.58rem] text-steel">
                  {t.streamers.sampleProfile}
                </span>
              )}
            </div>
            <h3
              ref={title}
              tabIndex={-1}
              className="stencil mt-3 outline-none text-[clamp(2.75rem,4.8vw,4.75rem)] leading-[0.86] [--wdth:66]">
              {s.handle}
            </h3>
            <span
              aria-hidden="true"
              className="mt-5 block h-[3px] w-24 rounded-full bg-iron/10"
            >
              <span className="heat-bar block h-full w-full rounded-full" />
            </span>
            <p className="mt-4 max-w-[34rem] text-[1rem] leading-relaxed text-iron/85 lg:max-xl:text-[0.95rem]">
              {p.bio[lang][0]}
            </p>
            {p.bio[lang].length > 1 && (
              <>
                <div
                  id={bioId}
                  hidden={!more}
                  className="mt-3 max-w-[34rem] space-y-3 text-[0.95rem] leading-relaxed text-iron/75"
                >
                  {p.bio[lang].slice(1).map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
                <button
                  type="button"
                  aria-expanded={more}
                  aria-controls={bioId}
                  onClick={() => setMore((v) => !v)}
                  className="readout mt-2 inline-flex min-h-11 items-center gap-2 text-xs text-ember hover:text-white-heat"
                >
                  {more ? t.roster.readLess : t.roster.readMore}
                  <ArrowDown
                    className={`size-4 transition-transform duration-300 ${more ? "rotate-180" : ""}`}
                  />
                </button>
              </>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-hot"
              >
                <Broadcast className="size-5" />
                {t.streamers.watch}
              </a>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                tabIndex={-1}
                className="readout text-[0.68rem] text-iron underline decoration-iron/30 underline-offset-4 hover:text-white-heat hover:decoration-ember"
              >
                kick.com/{s.handle}
              </a>
            </div>
          </div>

          <div className="mt-5">
            <dl className="readout text-[0.68rem]">
              <div className="grid grid-cols-2 gap-x-6">
                <div className="border-t border-iron/15 py-3">
                  <dt className="text-steel">{t.streamers.name}</dt>
                  <dd className="mt-1 text-iron">{s.name}</dd>
                </div>
                {(p.origin || p.base) && (
                  <div className="border-t border-iron/15 py-3">
                    <dt className="text-steel">{t.streamers.from}</dt>
                    <dd className="mt-1 text-iron">
                      {[p.origin, p.base].filter(Boolean).join(" → ")}
                    </dd>
                  </div>
                )}
              </div>
              <div className="border-t border-iron/15 py-3">
                <dt className="text-steel">{t.streamers.content}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {p.content[lang].map((c) => (
                    <span
                      key={c}
                      className="rounded-[2px] border border-iron/20 px-2 py-1 text-[0.62rem] text-iron"
                    >
                      {c}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-x-6">
                <div className="border-t border-iron/15 py-3">
                  <dt className="text-steel">{t.streamers.schedule}</dt>
                  <dd className="mt-1 text-iron">{p.schedule[lang]}</dd>
                </div>
                <div className="border-t border-iron/15 py-3">
                  <dt className="text-steel">{t.streamers.nextStream}</dt>
                  <dd className="mt-1">
                    {next && nextDate ? (
                      <a href="#agenda" className="hover:text-white-heat">
                        <span style={{ color: "var(--h)" }}>
                          {nextDate.day} {nextDate.month}
                        </span>{" "}
                        <span className="text-iron">· {nextDate.time}</span>
                      </a>
                    ) : (
                      <span className="text-steel">{t.streamers.none}</span>
                    )}
                  </dd>
                </div>
              </div>
            </dl>

            {s.highlight && (
              <a
                href={s.highlight.href}
                className="group flex items-center gap-4 border-y border-iron/15 py-3 lg:hidden"
              >
                <span className="relative block h-16 w-12 shrink-0 overflow-hidden rounded-[2px] bg-forge">
                  <Image
                    src={s.highlight.src}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="readout block text-[0.6rem] text-steel">
                    {t.streamers.highlight}
                  </span>
                  <span className="stencil mt-1 block text-[1.25rem] leading-none text-iron [--wdth:80] group-hover:text-white-heat">
                    {s.highlight.title}
                  </span>
                  <span className="readout mt-1 block text-[0.6rem] text-iron/70">
                    {s.highlight.note[lang]}
                  </span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/** Nuestros streamers: a split screen of Kick channels, one open at a time on desktop. */
export default function Streamers() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const desktop = useDesktop();
  if (streamers.length === 0) return null;

  return (
    <section
      id="streamers"
      aria-labelledby="streamers-title"
      className="border-t border-anvil"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="streamers-title"
            className="stencil drop text-[clamp(2.75rem,6vw,4.5rem)] [--wdth:74] lg:col-span-7"
          >
            {t.streamers.title}
          </h2>
          <p className="max-w-[32rem] text-[1.0625rem] leading-relaxed text-iron/80 lg:col-span-5">
            {t.streamers.intro}
          </p>
        </div>

        <ul
          aria-label={t.streamers.list}
          className="forge-in mt-12 grid grid-cols-1 gap-4 lg:mt-16 lg:flex lg:h-[min(84vh,46rem)] lg:min-h-[38rem]"
        >
          {streamers.map((s, i) => (
            <Channel
              key={s.slug}
              s={s}
              index={i}
              desktop={desktop}
              open={!desktop || i === active}
              onOpen={() => setActive(i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

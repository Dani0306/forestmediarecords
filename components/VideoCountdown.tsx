"use client";

import type { Release } from "@/data/releases";
import { site } from "@/data/site";
import { formatDateParts, useLang, useNow } from "@/lib/i18n";
import { ArrowUpRight, YouTube } from "./icons";

const HOUR = 3600_000;
/** The fuse burns down over the last day before the premiere. */
const FUSE = 24 * HOUR;

const pad = (n: number) => String(n).padStart(2, "0");

/** Days, hours, minutes and seconds left, as two-digit strings (days only when there are any). */
function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  return {
    d: d > 0 ? pad(d) : "",
    h: pad(Math.floor((s % 86400) / 3600)),
    m: pad(Math.floor((s % 3600) / 60)),
    s: pad(s % 60),
  };
}

/**
 * One digit of the counter. A countdown only ever moves one way, so the digit that just left
 * is the same position one second earlier: when it differs, the old one lifts out under a
 * blur while the new one drops in with the hammer overshoot. Unchanged digits stay still.
 */
function Digit({ now, prev }: { now: string; prev: string }) {
  const moved = now !== prev;
  return (
    <span className="vc-digit relative inline-block overflow-hidden">
      {/* holds the width; the visible digits sit on top of it */}
      <span className="invisible">0</span>
      {moved && (
        <span key={`out-${prev}`} aria-hidden="true" className="vc-out absolute inset-0">
          {prev}
        </span>
      )}
      <span key={`in-${now}`} className={`absolute inset-0 ${moved ? "vc-in" : ""}`}>
        {now}
      </span>
    </span>
  );
}

/** A two-digit group (hours, minutes or seconds) with its unit under it. */
function Group({ now, prev, unit, hot = false }: { now: string; prev: string; unit: string; hot?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className={`flex ${hot ? "vc-hot" : ""}`}>
        <Digit now={now[0]} prev={prev[0]} />
        <Digit now={now[1]} prev={prev[1]} />
      </span>
      <span className="readout mt-2 text-[0.58rem] text-steel">{unit}</span>
    </div>
  );
}

const Colon = () => (
  <span aria-hidden="true" className="vc-colon -mx-0.5 self-start text-steel/70">
    :
  </span>
);

/**
 * The official video's premiere, on the release takeover: a live counter to `videoAt`, a fuse
 * that burns down over the final day, white heat for the last minute, and at zero the plate is
 * struck "Ya disponible" with a link to the video. With no `videoAt` it reads "Muy pronto".
 */
export default function VideoCountdown({ r }: { r: Release }) {
  const { t, lang } = useLang();
  const h = t.hero;
  const now = useNow(1000);
  const at = r.videoAt ? new Date(r.videoAt).getTime() : null;
  const youtube = site.socials.find((s) => s.id === "youtube")?.url ?? "";
  const videoUrl = r.videoUrl || youtube;

  // before the clock mounts, render the counter at rest so server and client agree
  const left = at === null ? null : now === null ? null : at - now;
  const out = left !== null && left <= 0;
  const final = left !== null && left > 0 && left <= 60_000;
  const heat = out || final ? "white" : "hot";

  const cur = parts(left ?? 0);
  const prev = parts((left ?? 0) + 1000);
  const fuse = left === null ? 1 : Math.max(0, Math.min(1, left / FUSE));

  const when = r.videoAt ? formatDateParts(r.videoAt, lang) : null;
  const today = r.videoAt && now !== null
    ? new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(now) ===
      new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date(r.videoAt))
    : false;

  return (
    <div
      data-heat={heat}
      className={`video-plate relative mt-6 max-w-[36rem] overflow-hidden rounded-[3px] border border-anvil bg-forge-2/85 px-5 pb-5 pt-5 ${final ? "vc-final" : ""}`}
    >
      <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />

      <p className="stamp flex flex-wrap items-center gap-x-2.5 gap-y-1" style={{ color: "var(--h)" }}>
        <span aria-hidden="true" className="live-dot size-2 rounded-full bg-[var(--h)] shadow-[0_0_10px_var(--h)]" />
        {h.videoLabel}
        {when && !out && (
          <span className="text-iron/80">
            · {h.videoPremiere} {today ? h.videoToday : `${when.weekday} ${when.day} ${when.month}`} {when.time}
          </span>
        )}
      </p>

      {at === null ? (
        <p className="stencil mt-2.5 text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[0.85] text-white-heat [--wdth:70]">
          {h.videoSoon}
        </p>
      ) : out ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-4">
          <p className="vc-strike stencil text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[0.85] text-white-heat [--wdth:70]">
            {h.videoOut}
          </p>
          {videoUrl && (
            <a href={videoUrl} target="_blank" rel="noreferrer" className="btn btn-steel">
              <YouTube className="size-5 text-ember" />
              {h.videoWatch}
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      ) : (
        <>
          {/* screen readers get the time left as text; it isn't announced every second */}
          <p className="sr-only">
            {h.startsIn} {cur.d && `${Number(cur.d)} ${lang === "es" ? "días" : "days"}`} {Number(cur.h)} h {Number(cur.m)} min
          </p>
          <div
            aria-hidden="true"
            className="vc-counter readout mt-3 flex items-start gap-2 text-[clamp(2.75rem,7vw,4.75rem)] leading-none tracking-normal text-iron sm:gap-3"
          >
            {cur.d && (
              <>
                <Group now={cur.d} prev={prev.d || cur.d} unit={lang === "es" ? "días" : "days"} />
                <Colon />
              </>
            )}
            <Group now={left === null ? "--" : cur.h} prev={left === null ? "--" : prev.h} unit="h" />
            <Colon />
            <Group now={left === null ? "--" : cur.m} prev={left === null ? "--" : prev.m} unit="min" />
            <Colon />
            <Group now={left === null ? "--" : cur.s} prev={left === null ? "--" : prev.s} unit="s" hot />
          </div>

          {/* the fuse: burns down toward the premiere over the last day, a spark at its tip */}
          <div aria-hidden="true" className="relative mt-5 h-[3px] rounded-full bg-anvil">
            <span
              className="vc-fuse absolute inset-y-0 left-0 block origin-left rounded-full"
              style={{ transform: `scaleX(${fuse})` }}
            />
            <span
              className="vc-spark absolute top-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white-heat"
              style={{ left: `${fuse * 100}%` }}
            />
          </div>
          <p className="readout mt-3 text-[0.6rem] text-steel sm:text-[0.66rem]">{h.videoPlatforms}</p>
        </>
      )}
    </div>
  );
}

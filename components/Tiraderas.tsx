"use client";

import Image from "next/image";
import { eventEnd, events, heatOf, type ForgeEvent, type Heat } from "@/data/events";
import { hasKick, site } from "@/data/site";
import { participantByName, tiraderas as T, type Participant } from "@/data/tiraderas";
import { formatCOP } from "@/data/studio";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { icsHref } from "@/lib/ics";
import { useWinners } from "@/lib/winners";
import { ArrowUpRight, CalendarPlus, Crown, YouTube } from "./icons";

const roundEvent = (id: string) => events.find((e) => e.id === id) as ForgeEvent | undefined;

/**
 * One corner of the final: the finalist's print (graded into the forge, colour on hover),
 * their name struck big, their Kick channel and who they knocked out to get here.
 * The right corner mirrors the left, so the two face each other across the VS.
 */
function Corner({
  p,
  side,
  beat,
  champion,
  lost,
  onPick,
}: {
  p: Participant;
  side: "left" | "right";
  beat?: string;
  champion: boolean;
  lost: boolean;
  onPick?: () => void;
}) {
  const { t } = useLang();
  const c = t.tiraderas.final;
  const right = side === "right";
  const [host, ...path] = p.url.replace(/^https?:\/\//, "").split("/");

  return (
    <div className={`final-corner final-corner-${side} min-w-0 ${right ? "text-right" : ""} ${lost ? "opacity-45" : ""}`}>
      <a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${t.tiraderas.channel} ${p.name}`}
        className="fighter group block rounded-[3px]"
      >
        <div
          className={`iron-photo relative aspect-[4/5] overflow-hidden lg:aspect-square rounded-[3px] border bg-forge-2 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.95)] ${champion ? "border-[var(--h)]" : "border-anvil"}`}
        >
          <Image
            src={p.photo.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 34vw, 46vw"
            className="object-cover"
            style={{ objectPosition: p.photo.focus ?? "50% 30%" }}
          />
          <span aria-hidden="true" className="fighter-heat heat-bar absolute inset-x-0 bottom-0 z-10 block h-[3px]" />
          {champion && (
            <span className="win-stamp stencil absolute left-1/2 top-[46%] z-10 -translate-x-1/2">{c.champion}</span>
          )}
        </div>
      </a>

      <p className="stamp mt-5 text-steel">{c.corner}</p>
      <p className="stencil mt-2 break-words text-[clamp(1.9rem,5.4vw,4.75rem)] leading-[0.86] text-iron [--wdth:70]">
        {p.name}
      </p>
      <p className={`readout mt-3 flex items-center gap-1 text-[0.6rem] text-steel sm:text-[0.66rem] ${right ? "justify-end" : ""}`}>
        <span className="truncate">
          {host}/{path.join("/")}
        </span>
        <ArrowUpRight className="size-3 shrink-0 text-ember" />
      </p>
      {beat && (
        <p className="readout mt-1.5 text-[0.6rem] leading-relaxed text-iron/70 sm:text-[0.66rem]">
          {c.beat} <span className="text-iron">{beat}</span>
        </p>
      )}
      {onPick && (
        <button
          type="button"
          onClick={onPick}
          aria-pressed={champion}
          className="readout mt-3 inline-flex min-h-11 items-center gap-2 border border-ember/50 px-3 text-[0.6rem] text-glow hover:bg-ember/15"
        >
          <Crown className="size-4" />
          {c.markChampion}
        </button>
      )}
    </div>
  );
}

/** Mundial de Tiraderas, now all about the grand final: the two finalists face off across a VS, with the date, a live countdown and the one hot action. */
export default function Tiraderas() {
  const { t, lang } = useLang();
  const now = useNow(1000);
  const c = t.tiraderas;
  const f = c.final;
  const { winners, admin, shared, error, pickWinner } = useWinners();

  const fin = roundEvent(T.grandFinal.eventId);
  const [a, b] = T.grandFinal.players.map(participantByName);
  if (!fin || !a || !b) return null;

  // until the clock mounts, the final renders as upcoming so server and client agree
  const heat: Heat = now !== null ? heatOf(fin, now) : "hot";
  const live = heat === "live";
  const done = now !== null && now >= eventEnd(fin);
  const d = formatDateParts(fin.start, lang);
  const cd = formatCountdown(new Date(fin.start).getTime() - (now ?? new Date(fin.start).getTime()), lang);
  const names = T.grandFinal.players;
  const champion = [T.bracket.champion, winners.final].find((n) => n && names.includes(n)) ?? "";
  const pick = (name: string) => (admin ? () => void pickWinner("final", name) : undefined);

  const watchUrl = fin.url || (hasKick ? site.kick.url : "");
  const recordings = T.rounds.filter((r) => r.watchUrl);
  const semis = T.rounds.find((r) => r.eventId === "tiraderas-semifinal");

  return (
    <section
      id="tiraderas"
      aria-labelledby="tiraderas-title"
      data-heat={done ? "white" : heat}
      className="relative isolate overflow-clip border-t border-anvil"
    >
      {/* the floor glows under the fight: a heat bloom low and centre */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_62%,color-mix(in_oklab,var(--h)_13%,transparent),transparent_72%)]"
      />

      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        {/* heading and lede */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <h2 id="tiraderas-title" className="stencil drop text-[clamp(3.75rem,12vw,6rem)] leading-[0.84] [--wdth:64]">
              {f.title}
            </h2>
            <p className="readout mt-5 flex items-center gap-3 text-[0.68rem] text-iron/80 sm:text-[0.72rem]">
              <span aria-hidden="true" className="h-px w-10 shrink-0 bg-iron/40" />
              {f.caption}
            </p>
          </div>
          <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/85 lg:col-span-5">{f.lede}</p>
        </div>

        {admin && (
          <p role="status" className="readout mt-8 border border-ember/50 bg-ember/10 px-3 py-2 text-[0.62rem] text-glow">
            {c.adminHint} · {shared ? c.adminShared : c.adminLocal}
            {error && <span className="ml-2 text-white-heat">{error}</span>}
          </p>
        )}

        {/* the face-off: two corners across a glowing VS; on phones the VS sits on the seam between the prints */}
        <div className="relative mt-12 grid grid-cols-2 gap-x-4 sm:gap-x-6 lg:mt-16 lg:grid-cols-[1fr_minmax(13rem,17rem)_1fr] lg:gap-x-10">
          <Corner
            p={a}
            side="left"
            beat={T.grandFinal.beat[a.name]}
            champion={champion === a.name}
            lost={Boolean(champion) && champion !== a.name}
            onPick={pick(a.name)}
          />

          <div className="pointer-events-none absolute left-1/2 top-[min(28vw,15rem)] z-20 -translate-x-1/2 -translate-y-1/2 lg:pointer-events-auto lg:static lg:translate-x-0 lg:translate-y-0 lg:flex lg:flex-col lg:items-center lg:pt-[4%] lg:text-center">
            <span aria-hidden="true" className="final-rod hidden h-24 w-[3px] rounded-full lg:block" />
            <p
              aria-hidden="true"
              className="final-vs stencil text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.8] text-white-heat [--wdth:62]"
            >
              VS
            </p>
            <div className="hidden lg:block">
              <p className="stencil mt-6 text-[2.6rem] leading-[0.85] [--wdth:66]" style={{ color: "var(--h)" }}>
                {d.weekday} {d.day}
                <span className="block text-[1.6rem]">{d.month}</span>
              </p>
              <p className="readout mt-3 text-[0.72rem] text-iron">
                {d.time} · {c.tz}
              </p>
              <p className="readout mt-1 text-[0.62rem] text-steel">{fin.place[lang]}</p>
            </div>
            <span aria-hidden="true" className="final-rod mt-6 hidden h-24 w-[3px] rounded-full lg:block" />
          </div>

          <Corner
            p={b}
            side="right"
            beat={T.grandFinal.beat[b.name]}
            champion={champion === b.name}
            lost={Boolean(champion) && champion !== b.name}
            onPick={pick(b.name)}
          />
        </div>

        {/* when, how long, where to watch: one steel plate under the fight, the one hot action in it */}
        <div className="forge-in plate relative mt-12 overflow-hidden rounded-[3px] border border-anvil p-5 sm:p-7 lg:mt-16">
          <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center lg:gap-10">
            {/* phones read the date here, since the VS column is desktop only */}
            <div className="lg:hidden">
              <p className="stencil text-[2.25rem] leading-none [--wdth:68]" style={{ color: "var(--h)" }}>
                {d.weekday} {d.day} {d.month}
              </p>
              <p className="readout mt-2 text-[0.66rem] text-iron">
                {d.time} · {c.tz} · {fin.place[lang]}
              </p>
            </div>

            <div className="lg:col-span-7">
              {live ? (
                <p className="stencil flex items-center gap-3 text-[clamp(2.5rem,6vw,4rem)] leading-none text-white-heat [--wdth:70]">
                  <span aria-hidden="true" className="live-dot size-3 rounded-full bg-[var(--h)] shadow-[0_0_14px_var(--h)]" />
                  {f.live}
                </p>
              ) : done ? (
                <div>
                  <p className="stamp text-steel">{f.done}</p>
                  <p className="stencil mt-2 flex items-center gap-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-none text-white-heat [--wdth:72]">
                    {champion ? (
                      <>
                        <Crown className="size-8 shrink-0" style={{ color: "var(--h)" }} />
                        {f.champion}: {champion}
                      </>
                    ) : (
                      f.soon
                    )}
                  </p>
                </div>
              ) : (
                <>
                  <p className="stamp text-steel">{f.startsIn}</p>
                  <div className="mt-3 grid grid-cols-4 border-y border-anvil" aria-live="off">
                    {(
                      [
                        [cd.d, cd.units.d],
                        [cd.h, cd.units.h],
                        [cd.m, cd.units.m],
                        [cd.s, cd.units.s],
                      ] as const
                    ).map(([v, u], i) => (
                      <div key={u} className={`py-4 ${i > 0 ? "border-l border-anvil pl-3 sm:pl-5" : ""}`}>
                        <p
                          key={i === 3 ? v : undefined}
                          className={`readout text-[clamp(2rem,5.2vw,3.75rem)] leading-none tracking-normal ${i === 3 ? "tick" : "text-iron"}`}
                          style={i === 3 ? { color: "var(--h)" } : undefined}
                        >
                          {now === null ? "--" : v}
                        </p>
                        <p className="readout mt-2 text-[0.6rem] text-steel">{u}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
              {watchUrl && (
                <a href={watchUrl} target="_blank" rel="noreferrer" className="btn btn-hot">
                  {live ? f.watchLive : f.watch}
                  <ArrowUpRight className="size-5" />
                </a>
              )}
              {!done && !live && (
                <a
                  href={icsHref(fin, lang)}
                  download={`${fin.id}.ics`}
                  className="btn btn-steel"
                  aria-label={`${t.agenda.addCal}: ${fin.title[lang]}`}
                >
                  <CalendarPlus className="size-5 text-ember" />
                  {t.agenda.addCal}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* the rest of the tournament, compressed: who judges, what's at stake, how they got here */}
        <div className="mt-12 grid grid-cols-1 border-t border-anvil lg:mt-16 lg:grid-cols-12">
          <div className="border-b border-anvil py-7 lg:col-span-5 lg:border-b-0 lg:border-r lg:pr-10">
            <h3 className="stamp text-steel">{f.judges}</h3>
            <ul className="mt-5 grid grid-cols-3 gap-3 sm:gap-5">
              {T.judges.slice(0, T.judgeSeats).map((j) => (
                <li key={j.url}>
                  <a href={j.url} target="_blank" rel="noreferrer" aria-label={`${c.channel} ${j.name}`} className="fighter group block rounded-[3px]">
                    <div className="iron-photo relative aspect-square overflow-hidden rounded-[3px] border border-anvil bg-forge-2">
                      <Image src={j.photo.src} alt="" fill sizes="(min-width: 1024px) 9rem, 28vw" className="object-cover" style={{ objectPosition: j.photo.focus ?? "50% 30%" }} />
                    </div>
                    <p className="stencil mt-2.5 truncate text-[clamp(0.95rem,2.6vw,1.2rem)] leading-none text-iron [--wdth:80]">{j.name}</p>
                  </a>
                </li>
              ))}
            </ul>
            <p className="readout mt-5 text-[0.6rem] text-steel">
              {c.scoring}: {T.criteria.map((k) => k[lang]).join(" · ")}
            </p>
          </div>

          <div className="border-b border-anvil py-7 lg:col-span-3 lg:border-b-0 lg:border-r lg:px-10">
            <h3 className="stamp text-steel">{c.prize}</h3>
            <p className="readout mt-4 flex items-baseline gap-2 leading-none">
              <span className="text-[clamp(2.25rem,4vw,3rem)] tracking-normal text-glow">{formatCOP(T.prize.amount)}</span>
              <span className="text-[0.75rem] text-iron/80">COP</span>
            </p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-iron/75">{T.prize.note[lang]}</p>
          </div>

          <div className="py-7 lg:col-span-4 lg:pl-10">
            <h3 className="stamp text-steel">{f.road}</h3>
            {semis && <p className="mt-4 text-[0.95rem] leading-relaxed text-iron/80">{semis.body[lang]}</p>}
            {recordings.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                {recordings.map((r) => (
                  <li key={r.eventId}>
                    <a
                      href={r.watchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="readout inline-flex min-h-11 items-center gap-1.5 text-[0.62rem] text-ember underline decoration-ember/40 underline-offset-4 hover:text-white-heat"
                    >
                      <YouTube className="size-3.5" />
                      {r.watchLabel?.[lang] ?? c.watchDraw}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

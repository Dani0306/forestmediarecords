"use client";

import Image from "next/image";
import { eventEnd, events, heatOf, type ForgeEvent, type Heat } from "@/data/events";
import { hasKick, site } from "@/data/site";
import { participantByName, tiraderas as T, type Participant } from "@/data/tiraderas";
import { formatCOP } from "@/data/studio";
import { formatCountdown, formatDateParts, useLang, useNow } from "@/lib/i18n";
import { icsHref } from "@/lib/ics";
import { resolveBracket, useWinners } from "@/lib/winners";
import { ArrowUpRight, CalendarPlus, Crown, YouTube } from "./icons";

type Lang = "es" | "en";

const roundEvent = (id: string) => events.find((e) => e.id === id) as ForgeEvent | undefined;

/** One competitor in the line-up: the photo, then the name and their Kick channel. */
function Fighter({ p, label, judge = false }: { p: Participant; label: string; judge?: boolean }) {
  const [host, ...path] = p.url.replace(/^https?:\/\//, "").split("/");
  return (
    <li>
      <a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${label} ${p.name}`}
        className="fighter group block rounded-[3px]"
      >
        <div
          className={`iron-photo relative rounded-[3px] border border-anvil bg-forge-2 ${judge ? "aspect-square" : "aspect-[3/4]"}`}
        >
          <Image
            src={p.photo.src}
            alt=""
            fill
            sizes={judge ? "(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 50vw" : "(min-width: 1280px) 12vw, (min-width: 640px) 24vw, 50vw"}
            className="object-cover"
            style={{ objectPosition: p.photo.focus ?? "50% 30%" }}
          />
          <span aria-hidden="true" data-heat="hot" className="fighter-heat heat-bar absolute inset-x-0 bottom-0 z-10 block h-[3px]" />
        </div>
        <p
          className={`stencil mt-3 break-words leading-[0.95] text-iron [--wdth:78] ${judge ? "text-[clamp(1.15rem,2.4vw,2rem)]" : "text-[clamp(1.15rem,1.6vw,1.35rem)]"}`}
        >
          {p.name}
        </p>
        <p className="readout mt-1.5 flex items-center gap-1 text-[0.58rem] text-steel transition-colors group-hover:text-ember group-focus-visible:text-ember">
          <span className="truncate">
            {host}/
            {path.join("/")}
          </span>
          <ArrowUpRight className="size-3 shrink-0" />
        </p>
      </a>
    </li>
  );
}

/** A place still to be announced: same footprint, no face yet. */
function OpenSlot({
  label,
  aspect = "aspect-[3/2] sm:aspect-[3/4]",
  className,
  surprise = false,
}: {
  label: string;
  aspect?: string;
  className?: string;
  /** A surprise entrant (known, revealed later): the "?" glows instead of sitting cold. */
  surprise?: boolean;
}) {
  return (
    <li aria-label={label} className={className}>
      <div
        aria-hidden="true"
        className={`flex ${aspect} items-center justify-center rounded-[3px] border border-anvil bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgb(42_45_49/0.35)_10px_11px)]`}
      >
        <span className={`stencil text-[3.5rem] leading-none [--wdth:66] ${surprise ? "text-ember" : "text-anvil"}`}>?</span>
      </div>
      <p aria-hidden="true" className="readout mt-3 text-[0.62rem] text-steel">
        {label}
      </p>
    </li>
  );
}

/** One competitor slot in the bracket: a name once known (with the photo when confirmed), else a quiet placeholder. */
function Slot({
  name,
  empty,
  won = false,
  lost = false,
  onPick,
}: {
  name: string;
  empty: string;
  won?: boolean;
  lost?: boolean;
  /** Admin mode: makes the slot a button that marks this competitor as the winner. */
  onPick?: () => void;
}) {
  const p = participantByName(name);
  const inner = (
    <>
      {p && (
        <span className="relative size-6 shrink-0 overflow-hidden rounded-[2px] border border-anvil">
          <Image
            src={p.photo.src}
            alt=""
            fill
            sizes="24px"
            className="object-cover grayscale"
            style={{ objectPosition: p.photo.focus ?? "50% 30%" }}
          />
        </span>
      )}
      {name ? (
        <span
          className={`stencil truncate text-[1rem] leading-none [--wdth:80] ${won ? "text-glow" : lost ? "text-iron/40" : "text-iron"}`}
        >
          {name}
        </span>
      ) : (
        <span className="readout truncate text-[0.6rem] text-steel/70">{empty}</span>
      )}
      {won && <Crown className="ml-auto size-4 shrink-0 text-glow" />}
    </>
  );
  const cls = `flex h-10 w-full items-center gap-2 border-b border-anvil px-3 last:border-b-0 ${won ? "bg-ember/10" : ""}`;
  return onPick && name ? (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={won}
      className={`${cls} cursor-pointer text-left outline-offset-[-2px] hover:bg-ember/15 focus-visible:outline-2 focus-visible:outline-ember`}
    >
      {inner}
    </button>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/** A battle: two slots, one per competitor; the winner (when picked) is lit and the other dims. */
function Match({
  names,
  empty,
  winner = "",
  onPick,
}: {
  names: string[];
  empty: string;
  winner?: string;
  onPick?: (name: string) => void;
}) {
  return (
    <div
      className={`relative w-full rounded-[3px] border bg-forge ${names.some(Boolean) ? "border-steel/40" : "border-anvil"}`}
    >
      {names.map((n, i) => (
        <Slot
          key={i}
          name={n}
          empty={empty}
          won={Boolean(winner) && n === winner}
          lost={Boolean(winner) && n !== winner}
          onPick={onPick ? () => onPick(n) : undefined}
        />
      ))}
    </div>
  );
}

/** Column header: stage name and its date, coloured by how close that round is. */
function StageHead({ label, e, heat, lang }: { label: string; e?: ForgeEvent; heat: Heat; lang: Lang }) {
  const d = e ? formatDateParts(e.start, lang) : null;
  return (
    <div data-heat={heat} className="mb-4 border-b border-anvil pb-3">
      <p className="stencil text-[1.15rem] leading-none text-iron [--wdth:80]">{label}</p>
      {d && (
        <p className="readout mt-1.5 text-[0.62rem]" style={{ color: heat === "cold" ? undefined : "var(--h)" }}>
          {d.day} {d.month}
        </p>
      )}
    </div>
  );
}

/** Mundial de Tiraderas: LeoLugoLive's tournament with the label, its calendar, bracket and rules. */
export default function Tiraderas() {
  const { t, lang } = useLang();
  const now = useNow(1000);
  const c = t.tiraderas;
  const { winners, admin, shared, error, pickWinner } = useWinners();

  const rounds = T.rounds
    .map((r) => ({ ...r, e: roundEvent(r.eventId) }))
    .filter((r): r is typeof r & { e: ForgeEvent } => Boolean(r.e));
  if (rounds.length === 0) return null;

  // until the clock mounts, every round renders as upcoming so server and client agree
  const heat = (e?: ForgeEvent): Heat => (e && now !== null ? heatOf(e, now) : "embers");
  const nextIdx = now === null ? 0 : rounds.findIndex((r) => eventEnd(r.e) > now);
  const next = nextIdx >= 0 ? rounds[nextIdx] : undefined;

  const byId = (id: string) => rounds.find((r) => r.eventId === id)?.e;
  const qf = byId("tiraderas-cuartos");
  const sf = byId("tiraderas-semifinal");
  const fin = byId("tiraderas-final");
  const youtubeUrl = site.socials.find((x) => x.id === "youtube")?.url;
  const drawUrl = rounds.find((r) => r.eventId === "tiraderas-sorteo")?.watchUrl;
  const drawn = T.bracket.quarterfinals.some(([a, b]) => a || b);
  const b = resolveBracket(winners);
  const pick = (id: string) => (admin ? (name: string) => void pickWinner(id, name) : undefined);

  return (
    <section id="tiraderas" aria-labelledby="tiraderas-title" className="relative overflow-clip border-t border-anvil">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        {/* heading, intro, prize and the one hot action */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2
              id="tiraderas-title"
              className="stencil drop text-[clamp(3.25rem,9.5vw,6rem)] leading-[0.86] [--wdth:66]"
            >
              {T.name}
            </h2>
            <p className="readout mt-5 flex items-center gap-3 text-[0.72rem] text-iron/80">
              <span aria-hidden="true" className="h-px w-10 bg-iron/40" />
              {c.caption}
            </p>
            <p className="mt-8 max-w-[36rem] text-[1.0625rem] leading-relaxed text-iron/85">{T.intro[lang]}</p>
            <p className="readout mt-4 text-[0.68rem] text-glow">{c.tagline}</p>
          </div>

          <div className="lg:col-span-5">
            <div className="border-y border-anvil py-5">
              <p className="stamp text-steel">{c.prize}</p>
              <p className="readout mt-2 flex items-baseline gap-3 leading-none">
                <span className="text-[clamp(2.75rem,6vw,4.25rem)] tracking-normal text-glow">
                  {formatCOP(T.prize.amount)}
                </span>
                <span className="text-[0.8rem] text-iron/80">COP</span>
              </p>
              <p className="mt-3 max-w-[30rem] text-[0.95rem] leading-relaxed text-iron/75">{T.prize.note[lang]}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {hasKick && (
                <a href={site.kick.url} target="_blank" rel="noreferrer" className="btn btn-hot">
                  {c.watch}
                  <ArrowUpRight className="size-5" />
                </a>
              )}
              {youtubeUrl && (
                <a href={youtubeUrl} target="_blank" rel="noreferrer" className="btn btn-steel">
                  <YouTube className="size-5" />
                  {c.watchYoutube}
                </a>
              )}
              {next && (
                <a
                  href={icsHref(next.e, lang)}
                  download={`${next.e.id}.ics`}
                  className="btn btn-steel"
                  aria-label={`${t.agenda.addCal}: ${next.e.title[lang]}`}
                >
                  <CalendarPlus className="size-5" />
                  {t.agenda.addCal}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* the people: the judges' panel leads (they score every tiradera), the competitors line up right under it */}
        <div className="mt-14 lg:mt-20">
          <div
            data-heat="hot"
            className="forge-in plate relative grid grid-cols-1 gap-x-10 gap-y-7 overflow-hidden rounded-[3px] border border-anvil p-5 sm:p-7 lg:grid-cols-12 lg:p-8"
          >
            <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />
            <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
              <h3 className="stencil text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[0.9] text-iron [--wdth:70]">
                {c.judges}
              </h3>
              <p className="readout mt-2 text-[0.62rem] text-iron/70">
                {Math.min(T.judges.length, T.judgeSeats)} / {T.judgeSeats} {c.confirmed}
              </p>
            </div>

            {/* each confirmed judge links to their Kick channel; open seats until all are known */}
            <ul className="judges grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1">
              {T.judges.slice(0, T.judgeSeats).map((j) => (
                <Fighter key={j.url} p={j} label={c.channel} judge />
              ))}
              {Array.from({ length: Math.max(0, T.judgeSeats - T.judges.length) }, (_, i) => (
                <OpenSlot
                  key={i}
                  label={c.tbc}
                  aspect="aspect-[5/1] sm:aspect-square"
                  className="col-span-2 sm:col-span-1"
                />
              ))}
            </ul>

            {/* how they score, next to who scores */}
            <div className="border-t border-anvil pt-6 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:self-end">
              <h4 className="stamp text-steel">{c.scoring}</h4>
              <ul className="mt-3 grid grid-cols-3 gap-4">
                {T.criteria.map((k) => (
                  <li key={k.es}>
                    <p className="stencil text-[1.1rem] leading-none text-iron [--wdth:80] sm:text-[1.35rem]">{k[lang]}</p>
                    <span aria-hidden="true" className="heat-bar mt-3 block h-1.5 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* the line-up: every confirmed competitor and their Kick channel; open slots until all are known */}
          {T.participants.length > 0 && (
            <div className="mt-10">
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="stamp text-steel">{c.lineup}</h3>
                <p className="readout text-[0.62rem] text-iron/70">
                  {T.participants.length >= T.players
                    ? `${T.players} streamers`
                    : T.surprise
                      ? `${T.participants.length} + ${T.players - T.participants.length} ${c.surpriseCount}`
                      : `${T.participants.length} / ${T.players} ${c.announced}`}
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-4 sm:gap-x-4 xl:grid-cols-8">
                {T.participants.slice(0, T.players).map((p) => (
                  <Fighter key={p.url} p={p} label={c.channel} />
                ))}
                {Array.from({ length: Math.max(0, T.players - T.participants.length) }, (_, i) => (
                  <OpenSlot
                    key={i}
                    label={T.surprise ? c.surprise : c.toAnnounce}
                    surprise={T.surprise}
                    // a surprise sits beside a face card, so it keeps the same 3:4 frame on phones too
                    aspect={T.surprise ? "aspect-[3/4]" : undefined}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* the bracket: quarter-finals → semi-finals → final → champion, filled in as the rounds run */}
        <div className="mt-14 lg:mt-20">
        <div className="forge-in plate rounded-[3px] border border-anvil p-5 sm:p-6">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="stamp text-steel">{c.bracket}</h3>
            {drawUrl && (
              <a
                href={drawUrl}
                target="_blank"
                rel="noreferrer"
                className="readout inline-flex items-center gap-1.5 text-[0.62rem] text-ember underline decoration-ember/40 underline-offset-4 hover:text-white-heat"
              >
                <YouTube className="size-3.5" />
                {c.watchDraw}
                <ArrowUpRight className="size-3" />
              </a>
            )}
            <p className="readout text-[0.62rem] text-iron/70">
              {T.players} streamers · {T.judgeSeats} {c.judges.toLowerCase()}
            </p>
          </div>
          {admin && (
            <p role="status" className="readout mb-5 border border-ember/50 bg-ember/10 px-3 py-2 text-[0.62rem] text-glow">
              {c.adminHint} · {shared ? c.adminShared : c.adminLocal}
              {error && <span className="ml-2 text-white-heat">{error}</span>}
            </p>
          )}
          <div className="-mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:thin] sm:-mx-6 sm:px-6">
            <div className="bracket grid min-w-[40rem] grid-cols-4 gap-x-8">
              <div className="flex flex-col">
                <StageHead label={c.stages.quarterfinals} e={qf} heat={heat(qf)} lang={lang} />
                {/* four battles, bracketed two by two into the semi-finals */}
                <div className="flex flex-1 flex-col gap-3">
                  {[0, 1].map((p) => (
                    <div key={p} className="bracket-pair relative flex flex-1 flex-col gap-3">
                      {[0, 1].map((m) => (
                        <div key={m} className="flex flex-1 items-center">
                          <Match
                            names={b.quarterfinals[p * 2 + m]}
                            empty={drawn ? c.tbdLater : c.tbd}
                            winner={b.winners[`qf${p * 2 + m}`]}
                            onPick={pick(`qf${p * 2 + m}`)}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <StageHead label={c.stages.semifinals} e={sf} heat={heat(sf)} lang={lang} />
                <div className="bracket-pair relative flex flex-1 flex-col gap-3">
                  {b.semifinals.map((pair, m) => (
                    <div key={m} className="bracket-in-line relative flex flex-1 items-center">
                      <Match names={pair} empty={c.tbdLater} winner={b.winners[`sf${m}`]} onPick={pick(`sf${m}`)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <StageHead label={c.stages.final} e={fin} heat={heat(fin)} lang={lang} />
                <div className="bracket-in-line bracket-out-line relative flex flex-1 items-center">
                  <Match names={b.final} empty={c.tbdLater} winner={b.winners.final} onPick={pick("final")} />
                </div>
              </div>

              <div className="flex flex-col" data-heat={heat(fin) === "cold" ? "white" : heat(fin)}>
                <StageHead label={c.stages.champion} e={fin} heat={heat(fin)} lang={lang} />
                <div className="relative flex flex-1 items-center">
                  <div className="champion relative w-full overflow-hidden rounded-[3px] border p-4 text-center">
                    <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />
                    <Crown className="mx-auto size-7" style={{ color: "var(--h)" }} />
                    {b.champion ? (
                      <p className="stencil mt-3 text-[1.35rem] leading-none text-white-heat [--wdth:78]">{b.champion}</p>
                    ) : (
                      <p className="readout mt-3 text-[0.6rem] text-steel">{c.tbdLater}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="readout mt-3 text-[0.6rem] text-steel lg:hidden">{c.bracketHint}</p>
        </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* the calendar: one row per round, heated by how close it is */}
          <div className="lg:col-span-7">
            <h3 className="stamp mb-2 text-steel">{c.calendar}</h3>
            <ol>
              {rounds.map((r, i) => {
                const h = heat(r.e);
                const d = formatDateParts(r.e.start, lang);
                const isNext = i === nextIdx;
                const done = h === "cold";
                return (
                  <li
                    key={r.eventId}
                    data-heat={h}
                    className={`drop relative grid grid-cols-[4.25rem_1fr] gap-x-5 border-b border-anvil py-6 first:border-t ${done ? "opacity-60" : ""}`}
                  >
                    <div className="text-center">
                      <span
                        className="stencil block text-[3rem] leading-[0.85] [--wdth:66]"
                        style={{ color: done ? "var(--color-steel)" : "var(--h)" }}
                      >
                        {d.day}
                      </span>
                      <span className="readout mt-1 block text-[0.62rem] text-iron/80">{d.month}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="stencil text-[1.45rem] leading-[0.95] text-iron [--wdth:80]">{r.name[lang]}</p>
                        {!done && (
                          <a
                            href={icsHref(r.e, lang)}
                            download={`${r.e.id}.ics`}
                            className="btn btn-steel -mt-1 size-11 min-h-11 shrink-0 px-0"
                            aria-label={`${t.agenda.addCal}: ${r.e.title[lang]}`}
                            title={t.agenda.addCal}
                          >
                            <CalendarPlus className="size-5" />
                          </a>
                        )}
                      </div>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-iron/75">{r.body[lang]}</p>
                      {r.watchUrl && (
                        <a
                          href={r.watchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-steel mt-4 min-h-11 px-4 text-[0.9rem]"
                        >
                          <YouTube className="size-5 text-ember" />
                          {c.watchDraw}
                          <ArrowUpRight className="size-4" />
                        </a>
                      )}
                      <p className="readout mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.62rem] text-steel">
                        <span>
                          {d.weekday} · {d.time} {c.tz} · {r.e.place[lang]}
                        </span>
                        {h === "live" ? (
                          <span style={{ color: "var(--h)" }}>{t.heat.live}</span>
                        ) : done ? (
                          <span>{c.done}</span>
                        ) : isNext && now !== null ? (
                          <span style={{ color: "var(--h)" }}>
                            {c.next} · {formatCountdown(new Date(r.e.start).getTime() - now, lang).short}
                          </span>
                        ) : null}
                      </p>
                      {isNext && (
                        <span aria-hidden="true" className="heat-bar mt-4 block h-[3px] w-full rounded-full" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* how tiraderas are made */}
          <div className="lg:col-span-5">
            <h3 className="stamp mb-2 text-steel">{c.making}</h3>
            <ul className="space-y-3 border-y border-anvil py-7">
              {T.making.map((m) => (
                <li key={m.es} className="flex gap-3 text-[0.98rem] leading-relaxed text-iron/85">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-ember" />
                  {m[lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

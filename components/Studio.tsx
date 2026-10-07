"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { formatCOP, services, slots, slotsSample } from "@/data/studio";
import { requestBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";
import { ArrowDown, ArrowUpRight } from "./icons";

type Errs = Partial<Record<"service" | "date" | "slot" | "name" | "email" | "phone", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,}$/;

const isoDay = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function Field({
  id,
  label,
  error,
  optional,
  hint,
  children,
  wide,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  hint?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="stamp mb-2 flex justify-between gap-4 text-iron/90">
        <span>{label}</span>
        {optional && <span className="text-steel">{optional}</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="readout mt-2 text-[0.6rem] text-steel">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[0.875rem] text-[#ff7a52]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (error?: string) =>
  `w-full min-h-12 rounded-[3px] border bg-forge px-4 text-[1rem] text-iron outline-none transition-colors placeholder:text-steel/70 focus:border-ember focus:bg-forge-2 [color-scheme:dark] ${
    error ? "border-cherry" : "border-anvil hover:border-steel/60"
  }`;

/** A numbered step of the booking form. */
function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-anvil pt-6 first:border-t-0 first:pt-0">
      <legend className="flex items-baseline gap-4">
        <span className="readout text-[0.7rem] text-ember">{String(n).padStart(2, "0")}</span>
        <span className="stencil text-[1.75rem] leading-none [--wdth:80]">{title}</span>
      </legend>
      <div className="mt-5">{children}</div>
    </fieldset>
  );
}

/** Estudio: the rate card, then the booking request (design only; see lib/booking.ts). */
export default function Studio() {
  const { t, lang } = useLang();
  const f = t.studio.form;
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [blocks, setBlocks] = useState(1);
  const [errors, setErrors] = useState<Errs>({});
  const [status, setStatus] = useState<Status>("idle");
  const [minDate, setMinDate] = useState<string>();
  const panel = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);

  // the earliest bookable day is tomorrow (computed on the client, after hydration)
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(isoDay(d));
  }, []);

  const chosen = services.find((s) => s.id === service);
  const qty = chosen?.blocks ? blocks : 1;
  const total = chosen ? chosen.price * qty : 0;
  const chosenSlot = slots.find((s) => s.id === slot);
  const dateLabel = date
    ? new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(new Date(`${date}T12:00:00`))
    : f.noDate;

  const pick = (id: string) => {
    setService(id);
    setErrors((e) => ({ ...e, service: undefined }));
    document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errs = {};
    if (!service) next.service = f.errors.service;
    if (!date || (minDate && date < minDate)) next.date = f.errors.date;
    if (!slot) next.slot = f.errors.slot;
    if (!v("b-name")) next.name = f.errors.name;
    if (!EMAIL.test(v("b-email"))) next.email = f.errors.email;
    if (!PHONE.test(v("b-phone"))) next.phone = f.errors.phone;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      const target: Record<string, string> = {
        service: `svc-${services[0].id}`,
        date: "b-date",
        slot: `slot-${slots[0].id}`,
        name: "b-name",
        email: "b-email",
        phone: "b-phone",
      };
      document.getElementById(target[first])?.focus();
      setStatus("idle");
      return;
    }
    setStatus("sending");
    const res = await requestBooking({
      service,
      date,
      slot,
      blocks: qty,
      total,
      name: v("b-name"),
      artist: v("b-artist"),
      email: v("b-email"),
      phone: v("b-phone"),
      notes: v("b-notes"),
    });
    setStatus(res.ok ? "sent" : "error");
    requestAnimationFrame(() => panel.current?.focus());
  };

  const reset = () => {
    form.current?.reset();
    setService("");
    setDate("");
    setSlot("");
    setBlocks(1);
    setStatus("idle");
  };

  return (
    <section id="estudio" aria-labelledby="estudio-title" className="border-t border-anvil">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="estudio-title"
            className="stencil drop text-[clamp(3.25rem,9vw,5.5rem)] [--wdth:68] lg:col-span-7"
          >
            {t.studio.title}
          </h2>
          <p className="max-w-[32rem] text-[1.0625rem] leading-relaxed text-iron/80 lg:col-span-5">
            {t.studio.intro}
          </p>
        </div>

        {/* the rate card: rule-separated rows, prices in mono */}
        <div className="mt-12 lg:mt-16">
          <p className="stamp mb-4 flex justify-between">
            <span>{t.studio.rates}</span>
            <span>{t.studio.currency}</span>
          </p>
          <ul className="border-t border-anvil">
            {services.map((s, i) => (
              <li
                key={s.id}
                data-heat={s.featured ? "hot" : undefined}
                className={`rate-row drop group relative grid grid-cols-1 gap-x-8 gap-y-4 border-b border-anvil py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-center lg:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)_auto_auto] lg:py-7 ${s.featured ? "bg-[linear-gradient(90deg,rgb(255_90_17/0.07),transparent_70%)]" : ""}`}
              >
                {s.featured && (
                  <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 h-px" />
                )}
                <span className="readout hidden text-[0.7rem] text-steel sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="stencil text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[0.95] [--wdth:78]">
                      {s.name[lang]}
                    </h3>
                    {s.featured && (
                      <span className="readout rounded-[2px] bg-ember px-1.5 py-0.5 text-[0.58rem] text-scale">
                        {t.studio.featured}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-iron/75">{s.body[lang]}</p>
                </div>
                <div className="hidden lg:block">
                  {s.includes && (
                    <p className="readout text-[0.62rem] leading-relaxed text-steel">
                      {t.studio.includes}:{" "}
                      <span className="text-iron">{s.includes[lang].join(" + ")}</span>
                    </p>
                  )}
                </div>
                <p className="flex items-baseline gap-2 sm:col-start-3 sm:row-start-1 sm:flex-col sm:items-end sm:gap-1 lg:col-start-4 lg:min-w-[11rem]">
                  <span
                    className="readout text-[clamp(1.6rem,2.4vw,2.1rem)] tracking-normal"
                    style={{ color: s.featured ? "var(--color-glow)" : "var(--color-iron)" }}
                  >
                    {formatCOP(s.price)}
                  </span>
                  <span className="readout text-[0.6rem] text-steel">{t.studio.units[s.unit]}</span>
                </p>
                {s.includes && (
                  <p className="readout text-[0.62rem] leading-relaxed text-steel sm:col-start-2 sm:row-start-2 lg:hidden">
                    {t.studio.includes}: <span className="text-iron">{s.includes[lang].join(" + ")}</span>
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => pick(s.id)}
                  aria-label={`${t.studio.book}: ${s.name[lang]}`}
                  className="btn btn-steel min-h-11 justify-self-start px-4 text-[0.95rem] sm:col-start-3 sm:row-start-2 sm:justify-self-end lg:col-start-5 lg:row-start-1"
                >
                  {t.studio.book}
                  <ArrowDown className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* the booking request */}
        <div id="reserva" className="mt-16 scroll-mt-24 lg:mt-24">
          {status === "sent" ? (
            <div
              ref={panel}
              tabIndex={-1}
              role="status"
              data-heat="white"
              className="plate relative mx-auto max-w-[48rem] overflow-hidden rounded-[3px] border border-anvil p-6 outline-none sm:p-10"
            >
              <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />
              <p className="readout text-[0.65rem] text-glow">
                {chosen?.name[lang]} · {dateLabel} · {chosenSlot?.hours}
              </p>
              <h3 className="stencil mt-4 text-[clamp(2.5rem,5vw,4rem)] leading-[0.88] [--wdth:72]">
                {f.doneTitle}
              </h3>
              <p className="mt-5 max-w-[34rem] text-[1.125rem] leading-relaxed text-iron/90">{f.doneBody}</p>
              <button type="button" onClick={reset} className="btn btn-steel mt-8">
                {f.another}
              </button>
            </div>
          ) : (
            <form
              ref={form}
              noValidate
              onSubmit={onSubmit}
              aria-busy={status === "sending"}
              className="forge-in grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
            >
              <div className="plate flex flex-col gap-8 rounded-[3px] border border-anvil p-5 sm:p-8 lg:col-span-8">
                <h3 className="stencil text-[clamp(2.25rem,4vw,3.25rem)] leading-[0.9] [--wdth:72]">{f.title}</h3>

                {status === "error" && (
                  <div
                    ref={panel}
                    tabIndex={-1}
                    role="alert"
                    className="rounded-[3px] border border-cherry bg-cherry/10 p-4 outline-none sm:p-5"
                  >
                    <p className="stencil text-[1.4rem] leading-none text-[#ff7a52] [--wdth:80]">{f.failTitle}</p>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-iron/85">
                      {f.failBody}{" "}
                      <a href={`mailto:${site.contactEmail}`} className="text-ember underline decoration-ember/40 hover:text-white-heat">
                        {site.contactEmail}
                      </a>
                      .
                    </p>
                  </div>
                )}

                <Step n={1} title={f.step1}>
                  <div
                    role="radiogroup"
                    aria-label={f.step1}
                    aria-describedby={errors.service ? "svc-err" : undefined}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {services.map((s) => {
                      const on = s.id === service;
                      return (
                        <label
                          key={s.id}
                          htmlFor={`svc-${s.id}`}
                          className={`relative flex min-h-[5.5rem] cursor-pointer flex-col justify-between gap-3 rounded-[3px] border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-white-heat ${on ? "border-ember bg-ember/10" : errors.service ? "border-cherry" : "border-anvil hover:border-steel/60"}`}
                        >
                          <input
                            type="radio"
                            id={`svc-${s.id}`}
                            name="b-service"
                            value={s.id}
                            checked={on}
                            onChange={() => {
                              setService(s.id);
                              setErrors((er) => ({ ...er, service: undefined }));
                            }}
                            className="sr-only"
                          />
                          <span className="stencil text-[1.2rem] leading-[0.95] [--wdth:82]">{s.name[lang]}</span>
                          <span className="readout flex items-baseline justify-between gap-2 text-[0.85rem] tracking-normal">
                            <span style={{ color: on ? "var(--color-glow)" : "var(--color-iron)" }}>{formatCOP(s.price)}</span>
                            <span className="text-[0.55rem] tracking-[0.08em] text-steel">{t.studio.units[s.unit]}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.service && (
                    <p id="svc-err" className="mt-2 text-[0.875rem] text-[#ff7a52]">
                      {errors.service}
                    </p>
                  )}
                </Step>

                <Step n={2} title={f.step2}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field id="b-date" label={f.date} error={errors.date}>
                      <input
                        id="b-date"
                        name="b-date"
                        type="date"
                        min={minDate}
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                          setErrors((er) => ({ ...er, date: undefined }));
                        }}
                        aria-invalid={errors.date ? true : undefined}
                        aria-describedby={errors.date ? "b-date-err" : undefined}
                        className={inputCls(errors.date)}
                      />
                    </Field>
                    {chosen?.blocks ? (
                      <div>
                        <p id="b-blocks-label" className="stamp mb-2 text-iron/90">{f.blocks}</p>
                        <div role="group" aria-labelledby="b-blocks-label" className="flex min-h-12 items-stretch">
                          <button
                            type="button"
                            onClick={() => setBlocks((b) => Math.max(1, b - 1))}
                            aria-label="−1"
                            disabled={blocks <= 1}
                            className="btn btn-steel min-h-12 rounded-r-none px-4"
                          >
                            −
                          </button>
                          <output
                            aria-live="polite"
                            className="readout grid min-w-24 place-items-center border-y border-anvil bg-forge text-[0.9rem] tracking-normal text-iron"
                          >
                            {blocks} · {blocks * 4}h
                          </output>
                          <button
                            type="button"
                            onClick={() => setBlocks((b) => Math.min(3, b + 1))}
                            aria-label="+1"
                            disabled={blocks >= 3}
                            className="btn btn-steel min-h-12 rounded-l-none px-4"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ) : null}
                    <div className="sm:col-span-2">
                      <p id="slot-label" className="stamp mb-2 flex justify-between gap-4 text-iron/90">
                        <span>{f.slot}</span>
                        {slotsSample && <span className="text-steel">{f.sampleSlots}</span>}
                      </p>
                      <div
                        role="radiogroup"
                        aria-labelledby="slot-label"
                        aria-describedby={errors.slot ? "slot-err" : undefined}
                        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                      >
                        {slots.map((s) => {
                          const on = s.id === slot;
                          return (
                            <label
                              key={s.id}
                              htmlFor={`slot-${s.id}`}
                              className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[3px] border px-4 py-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-white-heat ${on ? "border-ember bg-ember/10" : errors.slot ? "border-cherry" : "border-anvil hover:border-steel/60"}`}
                            >
                              <input
                                type="radio"
                                id={`slot-${s.id}`}
                                name="b-slot"
                                value={s.id}
                                checked={on}
                                onChange={() => {
                                  setSlot(s.id);
                                  setErrors((er) => ({ ...er, slot: undefined }));
                                }}
                                className="sr-only"
                              />
                              <span className="stencil text-[1.15rem] [--wdth:82]">{s.label[lang]}</span>
                              <span className={`readout text-[0.62rem] ${on ? "text-glow" : "text-steel"}`}>{s.hours}</span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.slot && (
                        <p id="slot-err" className="mt-2 text-[0.875rem] text-[#ff7a52]">
                          {errors.slot}
                        </p>
                      )}
                    </div>
                  </div>
                </Step>

                <Step n={3} title={f.step3}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field id="b-name" label={f.name} error={errors.name}>
                      <input id="b-name" name="b-name" autoComplete="name" aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "b-name-err" : undefined} className={inputCls(errors.name)} />
                    </Field>
                    <Field id="b-artist" label={f.artist} optional={f.optional}>
                      <input id="b-artist" name="b-artist" autoComplete="nickname" className={inputCls()} />
                    </Field>
                    <Field id="b-email" label={f.email} error={errors.email}>
                      <input id="b-email" name="b-email" type="email" autoComplete="email" aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "b-email-err" : undefined} className={inputCls(errors.email)} />
                    </Field>
                    <Field id="b-phone" label={f.phone} error={errors.phone}>
                      <input id="b-phone" name="b-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+57" aria-invalid={errors.phone ? true : undefined} aria-describedby={errors.phone ? "b-phone-err" : undefined} className={inputCls(errors.phone)} />
                    </Field>
                    <Field id="b-notes" label={f.notes} optional={f.optional} hint={f.notesHint} wide>
                      <textarea id="b-notes" name="b-notes" rows={3} aria-describedby="b-notes-hint" className={`${inputCls()} resize-y py-3`} />
                    </Field>
                  </div>
                </Step>
              </div>

              {/* the summary rides along on desktop */}
              <aside aria-label={f.summary} className="lg:col-span-4">
                <div className="plate rounded-[3px] border border-anvil p-5 sm:p-6 lg:sticky lg:top-24" data-heat={chosen ? "hot" : "embers"}>
                  <p className="stamp">{f.summary}</p>
                  <dl className="readout mt-4 text-[0.68rem]">
                    <div className="border-t border-iron/15 py-3">
                      <dt className="text-steel">{f.step1}</dt>
                      <dd className="stencil mt-1 text-[1.35rem] leading-none tracking-normal text-iron [--wdth:80]">
                        {chosen ? chosen.name[lang] : <span className="text-steel">{f.pick}</span>}
                      </dd>
                    </div>
                    <div className="border-t border-iron/15 py-3">
                      <dt className="text-steel">{f.date}</dt>
                      <dd className={`mt-1 first-letter:uppercase ${date ? "text-iron" : "text-steel"}`}>{dateLabel}</dd>
                    </div>
                    <div className="border-t border-iron/15 py-3">
                      <dt className="text-steel">{f.slot}</dt>
                      <dd className={`mt-1 ${chosenSlot ? "text-iron" : "text-steel"}`}>
                        {chosenSlot ? `${chosenSlot.label[lang]} · ${chosenSlot.hours}` : f.noSlot}
                        {chosen?.blocks && ` · ${blocks * 4}h`}
                      </dd>
                    </div>
                    <div className="border-y border-iron/15 py-4">
                      <dt className="text-steel">{f.total}</dt>
                      <dd className="mt-2 flex items-baseline gap-2">
                        <span className="text-[2.25rem] leading-none tracking-normal" style={{ color: chosen ? "var(--color-glow)" : "var(--color-anvil)" }}>
                          {formatCOP(total)}
                        </span>
                        <span className="text-steel">{t.studio.currency}</span>
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-[0.9rem] leading-relaxed text-iron/70">{f.disclaimer}</p>
                  <button
                    type="submit"
                    aria-disabled={status === "sending"}
                    className="btn btn-hot mt-6 w-full"
                  >
                    {status === "sending" ? (
                      <>
                        <span aria-hidden="true" className="sending-dot size-2 rounded-full bg-scale" />
                        {f.sending}
                      </>
                    ) : (
                      <>
                        {f.submit}
                        <ArrowUpRight className="size-5" />
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-[0.8rem] leading-relaxed text-steel">
                    {f.consent}{" "}
                    <Link href="/terminos" className="text-iron underline decoration-iron/30 underline-offset-2 hover:text-white-heat">
                      {t.legal.terms.toLowerCase()}
                    </Link>{" "}
                    {f.and}{" "}
                    <Link href="/privacidad" className="text-iron underline decoration-iron/30 underline-offset-2 hover:text-white-heat">
                      {t.legal.privacy.toLowerCase()}
                    </Link>
                    .
                  </p>
                </div>
              </aside>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { site } from "@/data/site";
import { sendDemo, type DemoResult } from "@/lib/demo";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight } from "./icons";

type Field = "name" | "email" | "city" | "link" | "message";
type Errors = Partial<Record<"name" | "email" | "link", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Input({
  id,
  label,
  hint,
  optional,
  error,
  type = "text",
  multiline,
  autoComplete,
}: {
  id: Field;
  label: string;
  hint?: string;
  optional?: string;
  error?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const cls = `peer w-full rounded-[3px] border bg-forge px-4 text-[1rem] text-iron outline-none transition-colors placeholder:text-steel/70 focus:border-ember focus:bg-forge-2 ${
    error ? "border-cherry" : "border-anvil hover:border-steel/60"
  }`;
  const described = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={multiline ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="stamp mb-2 flex justify-between gap-4 text-iron/90">
        <span>{label}</span>
        {optional && <span className="text-steel">{optional}</span>}
      </label>
      {multiline ? (
        <textarea id={id} name={id} rows={4} className={`${cls} resize-y py-3`} aria-describedby={described} />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          className={`${cls} min-h-12`}
          aria-invalid={error ? true : undefined}
          aria-describedby={described}
        />
      )}
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

export default function DemoForm() {
  const { t } = useLang();
  const f = t.demo.fields;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [via, setVia] = useState<"mailto" | "api">("api");
  const [who, setWho] = useState({ name: "", link: "" });
  const panel = useRef<HTMLDivElement>(null);
  const open = site.contactEmail.length > 0;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    const v = (k: Field) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("name")) next.name = t.demo.errors.name;
    if (!EMAIL.test(v("email"))) next.email = t.demo.errors.email;
    if (!/^https?:\/\/\S+\.\S+/.test(v("link"))) next.link = t.demo.errors.link;
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("idle");
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    if (!open) return;
    setStatus("sending");
    const res: DemoResult = await sendDemo(
      { name: v("name"), email: v("email"), city: v("city"), link: v("link"), message: v("message") },
      { subject: t.demo.subject, name: f.name, email: f.email, city: f.city, link: f.link },
    );
    if (res.ok) {
      setVia(res.via);
      setWho({ name: v("name"), link: v("link") });
      setStatus("sent");
    } else setStatus("error");
    requestAnimationFrame(() => panel.current?.focus());
  };

  return (
    <section id="demos" aria-labelledby="demos-title" className="border-t border-anvil">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="demos-title" className="stencil drop text-[clamp(3.5rem,10vw,6rem)] [--wdth:68]">
            {t.demo.title}
          </h2>
          <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-iron/80">{t.demo.body}</p>
          <p className="mt-10 max-w-[30rem] border-t border-anvil pt-6 text-[0.95rem] text-iron/70">
            {t.demo.partners}{" "}
            {open ? (
              <a href={`mailto:${site.contactEmail}`} className="text-ember underline decoration-ember/40 hover:text-white-heat">
                {site.contactEmail}
              </a>
            ) : (
              <span className="readout text-[0.75rem] text-steel">{t.demo.emailPending}</span>
            )}
          </p>
        </div>

        <div className="forge-in lg:col-span-7">
          {status === "sent" ? (
            /* thanks: the form is replaced by a hot plate that says what happens next */
            <div
              ref={panel}
              tabIndex={-1}
              role="status"
              data-heat="white"
              className="plate thanks relative overflow-hidden rounded-[3px] border border-anvil p-6 outline-none sm:p-10"
            >
              <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />
              <p className="readout text-[0.65rem] text-glow">{t.demo.sentFrom} {who.name}</p>
              <h3 className="stencil mt-4 text-[clamp(2.5rem,5vw,4rem)] leading-[0.88] [--wdth:72]">
                {t.demo.thanksTitle}
              </h3>
              <p className="mt-5 max-w-[34rem] text-[1.125rem] leading-relaxed text-iron/90">{t.demo.thanksBody}</p>
              {via === "mailto" && (
                <p className="mt-4 max-w-[34rem] text-[0.95rem] text-iron/70">{t.demo.thanksMailto}</p>
              )}
              <p className="readout mt-8 truncate border-t border-iron/15 pt-4 text-[0.62rem] text-steel">
                {f.link}: <span className="text-iron">{who.link}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  requestAnimationFrame(() => document.getElementById("name")?.focus());
                }}
                className="btn btn-steel mt-6"
              >
                {t.demo.sendAnother}
              </button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={onSubmit}
              aria-busy={status === "sending"}
              className="plate grid gap-6 rounded-[3px] border border-anvil p-5 sm:grid-cols-2 sm:p-8"
            >
              {status === "error" && (
                <div
                  ref={panel}
                  tabIndex={-1}
                  role="alert"
                  className="rounded-[3px] border border-cherry bg-cherry/10 p-4 outline-none sm:col-span-2 sm:p-5"
                >
                  <div>
                    <p className="stencil text-[1.4rem] leading-none text-[#ff7a52] [--wdth:80]">{t.demo.errorTitle}</p>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-iron/85">
                      {t.demo.errorBody}{" "}
                      <a href={`mailto:${site.contactEmail}`} className="text-ember underline decoration-ember/40 hover:text-white-heat">
                        {site.contactEmail}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}
              <Input id="name" label={f.name} error={errors.name} autoComplete="nickname" />
              <Input id="email" label={f.email} type="email" error={errors.email} autoComplete="email" />
              <Input id="link" label={f.link} hint={f.linkHint} type="url" error={errors.link} autoComplete="url" />
              <Input id="city" label={f.city} optional={f.optional} autoComplete="address-level2" />
              <Input id="message" label={f.message} optional={f.optional} multiline />
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p role="status" className="text-[0.95rem] text-steel">
                  {!open ? t.demo.closed : ""}
                </p>
                <button
                  type="submit"
                  aria-disabled={!open || status === "sending"}
                  className="btn btn-hot sm:min-w-[14rem]"
                >
                  {status === "sending" ? (
                    <>
                      <span aria-hidden="true" className="sending-dot size-2 rounded-full bg-scale" />
                      {t.demo.sending}
                    </>
                  ) : (
                    <>
                      {status === "error" ? t.demo.retry : t.demo.submit}
                      <ArrowUpRight className="size-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

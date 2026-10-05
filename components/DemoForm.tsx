"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight } from "./icons";

type Field = "name" | "email" | "city" | "link" | "message";
type Errors = Partial<Record<"name" | "email" | "link", string>>;

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
  const [sent, setSent] = useState(false);
  const open = site.contactEmail.length > 0;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const v = (k: Field) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("name")) next.name = t.demo.errors.name;
    if (!EMAIL.test(v("email"))) next.email = t.demo.errors.email;
    if (!/^https?:\/\/\S+\.\S+/.test(v("link"))) next.link = t.demo.errors.link;
    setErrors(next);
    setSent(false);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(first)?.focus();
      return;
    }
    if (!open) return;
    const lines = [`${f.name}: ${v("name")}`, `${f.email}: ${v("email")}`];
    if (v("city")) lines.push(`${f.city}: ${v("city")}`);
    lines.push(`${f.link}: ${v("link")}`);
    if (v("message")) lines.push("", v("message"));
    const body = lines.join("\n");
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
      `${t.demo.subject} · ${v("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="demos" aria-labelledby="demos-title" className="border-t border-anvil">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-32">
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

        <form noValidate onSubmit={onSubmit} className="plate grid gap-6 rounded-[3px] border border-anvil p-5 sm:grid-cols-2 sm:p-8 lg:col-span-7">
          <Input id="name" label={f.name} error={errors.name} autoComplete="nickname" />
          <Input id="email" label={f.email} type="email" error={errors.email} autoComplete="email" />
          <Input id="link" label={f.link} hint={f.linkHint} type="url" error={errors.link} autoComplete="url" />
          <Input id="city" label={f.city} optional={f.optional} autoComplete="address-level2" />
          <Input id="message" label={f.message} optional={f.optional} multiline />
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p role="status" className={`text-[0.95rem] ${open ? "text-glow" : "text-steel"}`}>
              {!open ? t.demo.closed : sent ? t.demo.success : ""}
            </p>
            <button type="submit" aria-disabled={!open} className="btn btn-hot sm:min-w-[14rem]">
              {t.demo.submit}
              <ArrowUpRight className="size-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

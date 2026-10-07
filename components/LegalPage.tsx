"use client";

import Link from "next/link";
import { legalMeta, privacy, terms } from "@/data/legal";
import { useLang } from "@/lib/i18n";
import { ArrowLeft } from "./icons";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";

/** A legal document in the reading layout: sticky contents on desktop, a 68ch column. */
export default function LegalPage({ doc }: { doc: "privacy" | "terms" }) {
  const { t, lang } = useLang();
  const d = (doc === "privacy" ? privacy : terms)[lang];
  const updated = new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${legalMeta.updated}T12:00:00`));

  return (
    <>
      <SiteNav />
      <main id="main" className="pt-16">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-24">
          <header className="lg:col-span-12">
            <Link
              href="/"
              className="readout inline-flex min-h-11 items-center gap-2 text-[0.65rem] text-steel hover:text-white-heat"
            >
              <ArrowLeft className="size-4 text-ember" />
              {t.legal.back}
            </Link>
            <h1 className="stencil drop mt-6 text-[clamp(3rem,8vw,5.5rem)] leading-[0.88] [--wdth:68]">
              {d.title}
            </h1>
            <p className="readout mt-5 flex flex-wrap items-center gap-3 text-[0.65rem] text-steel">
              {t.legal.updated}: <span className="text-iron">{updated}</span>
              {legalMeta.draft && (
                <span className="rounded-[2px] border border-anvil px-1.5 py-0.5 text-[0.58rem]">
                  {t.legal.draft}
                </span>
              )}
            </p>
          </header>

          <nav aria-label={t.legal.contents} className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <p className="stamp mb-3">{t.legal.contents}</p>
              <ol className="border-t border-anvil">
                {d.sections.map((s, i) => (
                  <li key={s.id} className="border-b border-anvil">
                    <a
                      href={`#${s.id}`}
                      className="flex min-h-11 items-baseline gap-3 py-2 text-[0.95rem] text-iron/75 hover:text-white-heat"
                    >
                      <span className="readout w-6 shrink-0 text-[0.6rem] text-steel">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-[68ch] lg:col-span-8 lg:col-start-5">
            <p className="text-[1.125rem] leading-relaxed text-iron/90">{d.intro}</p>
            {d.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-24">
                <h2 className="flex items-baseline gap-4">
                  <span className="readout text-[0.7rem] text-ember">{String(i + 1).padStart(2, "0")}</span>
                  <span className="stencil text-[clamp(1.6rem,3vw,2.25rem)] leading-[0.95] [--wdth:78]">
                    {s.title}
                  </span>
                </h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-[1.7] text-iron/80">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                  {s.list && (
                    <ul className="space-y-2.5">
                      {s.list.map((li) => (
                        <li key={li.slice(0, 32)} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.7em] block h-px w-3 shrink-0 bg-ember" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

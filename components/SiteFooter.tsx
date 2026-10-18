"use client";

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { OPEN_COOKIES } from "./CookieBanner";
import { ArrowUpRight, Globe, Instagram, LinkedIn, Mail } from "./icons";

export default function SiteFooter() {
  const { t } = useLang();
  const c = site.credits;
  const links = [
    { href: "/#agenda", label: t.nav.agenda },
    { href: "/#tendencia", label: t.nav.trending },
    { href: "/#artistas", label: t.nav.artists },
    { href: "/#streamers", label: t.nav.streamers },
    { href: "/#forja", label: t.nav.forge },
    { href: "/#estudio", label: t.nav.studio },
    { href: "/#kick", label: t.nav.kick },
    { href: "/#demos", label: t.nav.demos },
    { href: "/#siguenos", label: t.follow.title },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-anvil bg-scale">
      {/* maker's mark: the smith's stamp on the finished piece */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="maker-mark relative flex flex-col gap-6 border-t border-anvil py-8 sm:flex-row sm:items-center sm:justify-between">
          <span
            aria-hidden="true"
            className="maker-heat absolute left-0 top-[-1px] h-px w-24"
          />
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="maker-stamp stencil grid size-16 shrink-0 place-items-center rounded-[3px] border text-[1.6rem] leading-none [--wdth:70]"
            >
              {c.initials}
            </span>
            <div className="min-w-0">
              <p className="readout text-[0.62rem] text-steel">
                {t.footer.credit}
              </p>
              <p className="stencil mt-1.5 text-[clamp(1.6rem,3vw,2.1rem)] leading-none text-iron [--wdth:80]">
                {c.name}
              </p>
              <p className="mt-2 text-[0.95rem] leading-snug text-iron/85">
                {t.footer.creditLine}
              </p>
              <p className="readout mt-1.5 text-[0.6rem] leading-relaxed text-iron/55">
                {c.role} · {c.unit}
              </p>
            </div>
          </div>
          <ul className="flex gap-2 sm:shrink-0">
            <li>
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.footer.creditSite} ${c.name}: ${c.website.replace(/^https?:\/\//, "")}`}
                title={c.website.replace(/^https?:\/\//, "")}
                className="social-link grid size-11 place-items-center rounded-[3px] border border-iron/25 bg-forge/60 text-iron"
              >
                <Globe className="size-5" />
              </a>
            </li>
            {c.links.map((l) => {
              const Icon = l.platform === "instagram" ? Instagram : LinkedIn;
              return (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${c.name} ${t.footer.creditOn} ${l.label}`}
                    title={l.label}
                    className="social-link grid size-11 place-items-center rounded-[3px] border border-iron/25 bg-forge/60 text-iron"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={`mailto:${c.email}`}
                aria-label={`${t.footer.creditMail} ${c.name}: ${c.email}`}
                title={c.email}
                className="social-link grid size-11 place-items-center rounded-[3px] border border-iron/25 bg-forge/60 text-iron"
              >
                <Mail className="size-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-10 pt-20 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="group flex items-center gap-6 lg:col-span-7">
          <Image
            src="/logo-512.webp"
            alt="Forest Media Récords"
            width={160}
            height={160}
            className="size-28 shrink-0 group-hover:spin-slow sm:size-40"
          />
          <div>
            <p className="stencil text-[clamp(2.5rem,6vw,4.25rem)] [--wdth:70]">
              Forest Media Récords
            </p>
            <p className="readout mt-3 text-[0.7rem] text-ember">
              {t.footer.tag}
            </p>
          </div>
        </div>
        <nav aria-label="Footer" className="lg:col-span-5 lg:justify-self-end">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="stencil flex min-h-11 items-center text-[1.25rem] text-iron/80 [--wdth:84] hover:text-white-heat"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {site.socials
              .filter((s) => s.url)
              .map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="stencil flex min-h-11 items-center gap-1 text-[1.25rem] text-iron/80 [--wdth:84] hover:text-white-heat"
                  >
                    {s.label} <ArrowUpRight className="size-4 text-ember" />
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="readout flex flex-wrap justify-between gap-4 border-t border-anvil py-6 text-[0.62rem] text-steel">
          <span>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacidad" className="hover:text-white-heat">
              {t.legal.privacy}
            </Link>
            <Link href="/terminos" className="hover:text-white-heat">
              {t.legal.terms}
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_COOKIES))}
              className="uppercase tracking-[inherit] hover:text-white-heat"
            >
              {t.cookies.settings}
            </button>
          </span>
          <span>{t.kick.supported}</span>
          <span>6.2442° N · 75.5812° W</span>
        </div>
      </div>
    </footer>
  );
}

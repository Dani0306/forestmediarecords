"use client";

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { OPEN_COOKIES } from "./CookieBanner";
import { ArrowUpRight } from "./icons";

export default function SiteFooter() {
  const { t } = useLang();
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
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-10 pt-20 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="group flex items-center gap-6 lg:col-span-7">
          <Image src="/logo-512.webp" alt="Forest Media Récords" width={160} height={160} className="size-28 shrink-0 group-hover:spin-slow sm:size-40" />
          <div>
            <p className="stencil text-[clamp(2.5rem,6vw,4.25rem)] [--wdth:70]">Forest Media Récords</p>
            <p className="readout mt-3 text-[0.7rem] text-ember">{t.footer.tag}</p>
          </div>
        </div>
        <nav aria-label="Footer" className="lg:col-span-5 lg:justify-self-end">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="stencil flex min-h-11 items-center text-[1.25rem] text-iron/80 [--wdth:84] hover:text-white-heat">
                  {l.label}
                </Link>
              </li>
            ))}
            {site.socials
              .filter((s) => s.url)
              .map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="stencil flex min-h-11 items-center gap-1 text-[1.25rem] text-iron/80 [--wdth:84] hover:text-white-heat">
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
            <Link href="/privacidad" className="hover:text-white-heat">{t.legal.privacy}</Link>
            <Link href="/terminos" className="hover:text-white-heat">{t.legal.terms}</Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIES))} className="uppercase tracking-[inherit] hover:text-white-heat">
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

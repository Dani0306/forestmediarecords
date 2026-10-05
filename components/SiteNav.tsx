"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/dictionary";
import { Broadcast, Close, Menu } from "./icons";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t.nav.language} className={`readout flex text-[0.75rem] ${className}`}>
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className="min-h-11 min-w-11 border border-anvil px-2.5 text-steel transition-colors first:rounded-l-[3px] last:-ml-px last:rounded-r-[3px] hover:text-iron aria-pressed:border-ember aria-pressed:bg-ember aria-pressed:text-scale"
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function SiteNav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#agenda", label: t.nav.agenda },
    { href: "#artistas", label: t.nav.artists },
    { href: "#forja", label: t.nav.forge },
    { href: "#kick", label: t.nav.kick },
    { href: "#demos", label: t.nav.demos },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-anvil bg-forge">
      <a
        href="#main"
        className="readout absolute left-4 top-2 z-10 -translate-y-24 bg-ember px-3 py-2 text-xs text-scale focus:translate-y-0"
      >
        {t.skip}
      </a>
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:px-10">
        <a href="#top" aria-label={t.nav.home} className="group flex shrink-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="size-10 group-hover:spin-slow"
            fetchPriority="high"
          />
          <span className="flex items-baseline gap-2">
            <span className="stencil text-[1.6rem] [--wdth:72]">Forest</span>
            <span className="readout hidden text-[0.625rem] text-steel sm:inline">Media Récords</span>
          </span>
        </a>

        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="stencil relative flex h-11 items-center px-3 text-[1.05rem] tracking-[0.06em] text-iron/80 transition-colors [--wdth:84] after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-ember after:transition-transform after:duration-300 hover:text-white-heat hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3 lg:ml-4">
          <LangSwitch className="hidden sm:flex" />
          <a href="#kick" className="btn btn-steel hidden min-h-11 px-4 text-[0.95rem] md:inline-flex">
            <Broadcast className="size-4 text-ember" />
            Kick
          </a>
          <button
            type="button"
            className="btn btn-steel min-h-11 px-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
            <span className="sr-only">{t.nav.menu}</span>
          </button>
        </div>
      </nav>

      {open && (
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        className="fixed inset-0 z-50 flex flex-col bg-forge px-4 pb-8 pt-4 sm:px-6 lg:hidden"
      >
        <div className="flex h-12 items-center justify-between">
          <LangSwitch />
          <button type="button" className="btn btn-steel min-h-11 px-3" onClick={() => setOpen(false)} autoFocus>
            <Close />
            <span className="sr-only">{t.nav.close}</span>
          </button>
        </div>
        <ul className="mt-10 flex flex-col">
          {links.map((l) => (
            <li key={l.href} className="border-b border-anvil">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline py-4 text-iron hover:text-white-heat"
              >
                <span className="stencil text-[3rem] [--wdth:80]">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="readout mt-auto text-xs text-steel">Medellín · Colombia</p>
      </div>
      )}
    </header>
  );
}

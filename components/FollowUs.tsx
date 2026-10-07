"use client";

import { hasKick, site, type SocialLink } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight, Broadcast, Instagram, SoundCloud, YouTube } from "./icons";

const ICON = { instagram: Instagram, youtube: YouTube, soundcloud: SoundCloud };

type Row = { key: string; label: string; handle: string; url: string; Icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement; note?: string };

/**
 * Síguenos: each platform is a full-width stamped row. Live profiles heat up
 * on hover (an ember plate sweeps across); pending ones sit cold as "Muy pronto".
 */
export default function FollowUs() {
  const { t } = useLang();
  const social = (s: SocialLink): Row => ({ key: s.id, label: s.label, handle: s.handle, url: s.url, Icon: ICON[s.id] });
  const rows: Row[] = [
    ...site.socials.filter((s) => s.url).map(social),
    ...(hasKick
      ? [{ key: "kick", label: "Kick", handle: `kick.com/${site.kick.handle}`, url: site.kick.url, Icon: Broadcast, note: t.follow.live }]
      : []),
    ...site.socials.filter((s) => !s.url).map(social),
  ];
  const lead = site.socials.find((s) => s.url && s.handle)?.handle;

  return (
    <section id="siguenos" aria-labelledby="follow-title" className="border-t border-anvil">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="follow-title" className="stencil drop text-[clamp(3.5rem,11vw,6rem)] [--wdth:68]">
              {t.follow.title}
            </h2>
            {lead && (
              <p className="readout mt-5 flex items-center gap-3 text-[0.72rem] text-iron/80">
                <span aria-hidden="true" className="h-px w-10 bg-iron/40" />
                {lead}
              </p>
            )}
          </div>
          <p className="max-w-[32rem] text-[1.0625rem] leading-relaxed text-iron/80 lg:col-span-5">{t.follow.intro}</p>
        </div>

        <ul aria-label={t.follow.list} className="mt-12 border-t border-anvil lg:mt-16">
          {rows.map(({ key, label, handle, url, Icon, note }, i) => {
            const inner = (
              <>
                <span className="readout follow-handle hidden w-10 shrink-0 text-[0.68rem] sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="follow-icon size-8 shrink-0 sm:size-10" />
                <span className="min-w-0 flex-1">
                  <span className="stencil block truncate text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] [--wdth:66]">
                    {label}
                  </span>
                  {url && (
                    <span className="readout follow-handle mt-2 block truncate text-[0.66rem]">
                      {handle || note}
                      {note && handle && <span className="ml-3 hidden sm:inline">· {note}</span>}
                    </span>
                  )}
                </span>
                {url ? (
                  <span className="follow-cta readout hidden shrink-0 items-center gap-2 text-[0.72rem] sm:flex">
                    {t.follow.follow}
                    <ArrowUpRight className="size-5" />
                  </span>
                ) : (
                  <span className="readout shrink-0 rounded-[2px] border border-anvil px-2 py-1 text-[0.58rem] text-steel">
                    {t.follow.soon}
                  </span>
                )}
                {url && <ArrowUpRight className="follow-cta size-6 shrink-0 sm:hidden" />}
              </>
            );
            return (
              <li key={key} className="border-b border-anvil">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${t.follow.follow}: ${label}${handle ? ` ${handle}` : ""}`}
                    className="follow-row group relative flex items-center gap-4 overflow-hidden py-6 sm:gap-6 sm:px-4 lg:py-8"
                  >
                    {inner}
                  </a>
                ) : (
                  <div aria-disabled="true" className="follow-row is-soon flex items-center gap-4 py-6 sm:gap-6 sm:px-4 lg:py-8">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

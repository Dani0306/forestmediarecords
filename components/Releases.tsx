"use client";

import Image from "next/image";
import { releases, type Release } from "@/data/releases";
import { formatDateParts, useLang } from "@/lib/i18n";
import { ArrowUpRight, Spotify } from "./icons";

function ReleaseCard({ r, index }: { r: Release; index: number }) {
  const { t, lang } = useLang();
  const d = formatDateParts(r.date, lang);
  const fresh = index === 0;

  return (
    <li data-heat={fresh ? "hot" : "warm"} className="forge-in group relative">
      {/* the cover, with a record that slides out of the sleeve on hover or focus */}
      <a
        href={r.spotify}
        target="_blank"
        rel="noreferrer"
        aria-label={`${t.releases.listen}: ${r.title}, ${r.artist.name}`}
        className="relative block aspect-square outline-offset-4"
      >
        <span
          aria-hidden="true"
          className="vinyl absolute inset-y-[3%] right-0 aspect-square rounded-full border border-anvil bg-[radial-gradient(circle,var(--color-ember)_0_13%,var(--color-scale)_13.5%_16%,transparent_16.5%),repeating-radial-gradient(circle,#0b0b0d_0_2px,#16161a_2px_3px)] shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)]"
        />
        <span className="relative block size-full overflow-hidden rounded-[3px] border border-anvil bg-forge-3 shadow-[0_30px_70px_-30px_rgb(0_0_0/0.9)]">
          <Image
            src={r.cover.src}
            alt={r.cover.alt[lang]}
            width={r.cover.width}
            height={r.cover.height}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 28vw"
            className="size-full object-cover"
          />
        </span>
      </a>

      <div className="mt-6 flex items-end gap-4">
        <span
          aria-hidden="true"
          className="stencil shrink-0 text-[3rem] leading-[0.8] [--wdth:64]"
          style={{ color: "var(--h)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="stencil flex flex-wrap items-center gap-x-3 text-[clamp(2rem,3.6vw,3rem)] leading-[0.9] [--wdth:72]">
            {r.title}
            {r.explicit && (
              <span
                title={t.releases.explicit}
                aria-label={t.releases.explicit}
                className="readout grid size-5 place-items-center rounded-[2px] bg-iron/80 text-[0.65rem] font-bold leading-none text-forge"
              >
                E
              </span>
            )}
          </h3>
          <p className="readout mt-2 text-[0.66rem] text-steel">
            <a href="#artistas" className="text-iron hover:text-white-heat">
              {r.artist.name}
            </a>{" "}
            · {t.releases.kinds[r.kind]} · {d.day} {d.month}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <a href={r.spotify} target="_blank" rel="noreferrer" className="btn btn-hot">
          <Spotify className="size-5" />
          {t.releases.listen}
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </li>
  );
}

/** Lo nuevo: the latest releases on Spotify, newest first. */
export default function Releases() {
  const { t } = useLang();
  if (releases.length === 0) return null;

  return (
    <section
      id="lanzamientos"
      aria-labelledby="releases-title"
      className="border-t border-anvil"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2
              id="releases-title"
              className="stencil drop text-[clamp(3.5rem,11vw,6rem)] [--wdth:68]"
            >
              {t.releases.title}
            </h2>
            <p className="readout mt-5 flex items-center gap-3 text-[0.72rem] text-iron/80">
              <span aria-hidden="true" className="h-px w-10 bg-iron/40" />
              {t.releases.caption}
            </p>
          </div>
          <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/85 lg:col-span-5">
            {t.releases.intro}
          </p>
        </div>

        <ol
          aria-label={t.releases.list}
          className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8 lg:mt-16 lg:gap-12"
        >
          {releases.map((r, i) => (
            <ReleaseCard key={r.slug} r={r} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

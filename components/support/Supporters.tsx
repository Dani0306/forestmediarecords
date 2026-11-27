"use client";

import type { Heat } from "@/data/events";
import { formatCOP } from "@/data/studio";
import type { Supporter } from "@/data/support";
import { useLang } from "@/lib/i18n";
import { BOARD_TOP, rankSupporters } from "@/lib/support";
import { ArrowUpRight } from "../icons";

/** Rank is temperature, as in "En tendencia": the first name runs hottest, the rest cool down the board. */
const HEAT: Heat[] = ["white", "hot", "hot", "warm", "warm"];

/**
 * "Quienes más apoyan": the people who back the label most, by total given. Only names
 * that asked to appear are in `data/support.ts`; an amount shows only when its owner agreed.
 * Spots nobody holds yet stay on the board, cold and open: an invitation, not a gap.
 */
export default function Supporters({
  supporters,
  sample,
  whatsapp,
}: {
  supporters: Supporter[];
  /** Stand-in names: tag the board. */
  sample: boolean;
  /** Where the proof goes: the same WhatsApp message as the plate's button. */
  whatsapp: string;
}) {
  const { t } = useLang();
  const s = t.support;
  const b = s.board;
  const { top, rest } = rankSupporters(supporters);
  const spots = Array.from({ length: BOARD_TOP }, (_, i) => top[i] ?? null);
  const empty = top.length === 0;

  return (
    <div className="forge-in plate relative flex h-full flex-col overflow-hidden rounded-[3px] border border-anvil">
      <div className="flex flex-1 flex-col p-5 sm:p-8">
        <h3 className="stencil text-[clamp(2rem,4.2vw,3.25rem)] leading-[0.92] [--wdth:76]">
          {b.title}
          {sample && (
            <span className="readout ml-3 inline-block rounded-[2px] border border-anvil px-1.5 py-0.5 align-middle text-[0.58rem] leading-none text-steel">
              {s.sample}
            </span>
          )}
        </h3>
        {/* empty, the invitation takes the first spot itself (below) */}
        {!empty && <p className="mt-3 max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/80">{b.lede}</p>}

        <ol className="mt-7 border-t border-iron/15">
          {spots.map((who, i) => {
            const first = i === 0;
            // an open spot below the first is a short cold line, so the board doesn't read as dead weight
            const slim = !who && !first;
            return (
              <li
                key={who?.id ?? `open-${i}`}
                data-heat={who ? HEAT[i] : "cold"}
                className={`board-row relative flex items-center gap-x-4 border-b border-iron/15 sm:gap-x-6 ${
                  first ? "py-5 sm:py-6" : slim ? "py-2.5" : "py-3.5 sm:py-4"
                }`}
              >
                <span
                  className={`board-rank stencil w-[4.25rem] shrink-0 leading-none tabular-nums [--wdth:70] sm:w-24 ${
                    first ? "text-[3.5rem] sm:text-[4.75rem]" : slim ? "text-[1.75rem]" : "text-[2.25rem] sm:text-[2.75rem]"
                  }`}
                >
                  <span className="sr-only">{b.rank} </span>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {who ? (
                  <span className="flex min-w-0 flex-1 flex-col gap-y-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-x-6">
                    <span
                      className={`stencil min-w-0 text-balance break-words leading-[0.95] [--wdth:80] ${
                        first ? "text-[clamp(1.75rem,3.6vw,2.75rem)]" : "text-[clamp(1.35rem,2.4vw,1.75rem)]"
                      }`}
                    >
                      {who.name}
                    </span>
                    {who.showAmount && (
                      <span className={`readout shrink-0 tracking-normal text-iron tabular-nums ${first ? "text-[1.05rem]" : "text-[0.9rem]"}`}>
                        {formatCOP(who.total)}
                      </span>
                    )}
                  </span>
                ) : first && empty ? (
                  <span className="stencil min-w-0 text-balance text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[0.95] text-steel [--wdth:80]">
                    {b.first}
                  </span>
                ) : (
                  <span className="readout text-[0.68rem] text-steel">{b.open}</span>
                )}
                {who && <span aria-hidden="true" className="heat-bar absolute bottom-[-1px] left-0 block h-[2px] w-[4.25rem] sm:w-24" />}
              </li>
            );
          })}
        </ol>

        {rest.length > 0 && (
          <div className="mt-6">
            <p className="stamp">{b.rest}</p>
            <ul className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1 text-[1rem] leading-relaxed text-iron/85">
              {rest.map((who, i) => (
                <li key={who.id} className="flex min-w-0 gap-x-2.5">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-steel">
                      ·
                    </span>
                  )}
                  <span className="min-w-0 break-words">{who.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-auto pt-7 text-[1rem] leading-relaxed text-iron/75">
          {b.how}{" "}
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-iron underline decoration-ember/60 underline-offset-4 hover:text-white-heat"
          >
            {s.proof.cta}
            <ArrowUpRight className="size-4 text-ember" />
            <span className="sr-only">({s.newTab})</span>
          </a>
        </p>
      </div>
    </div>
  );
}

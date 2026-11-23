"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/data/site";
import { formatCOP } from "@/data/studio";
import { hasBreb, hasPaypal } from "@/data/support";
import { useLang } from "@/lib/i18n";
import { supportView } from "@/lib/support";
import PayPalDonate from "./support/PayPalDonate";
import { ArrowUpRight, Check, Copy } from "./icons";

// the address never changes under the section: read it once, the same way on server and client
const never = () => () => {};
const useAddress = () => ({
  search: useSyncExternalStore(never, () => window.location.search, () => ""),
  host: useSyncExternalStore(never, () => window.location.hostname, () => ""),
});

/** Sparks off the anvil: where each one lands (px) and when it leaves (s). */
const SPARKS: [number, number, number][] = [
  [-104, -34, 0.04],
  [-72, -50, 0],
  [-44, -82, 0.03],
  [-18, -60, 0.06],
  [-6, -108, 0.08],
  [14, -90, 0.02],
  [38, -54, 0.05],
  [56, -100, 0.05],
  [70, -72, 0.01],
  [98, -40, 0.07],
];

/**
 * "Apoya a Forest": support the label. The Bre-B key is stamped on a steel ingot;
 * copying it is a hammer strike (the key runs white hot and cools, sparks fly, a
 * stamp is pressed on). Donors abroad get a PayPal row. Hidden until `data/support.ts`
 * holds at least one way to give. The site never claims a payment arrived: a Bre-B
 * transfer happens in the donor's own bank app.
 */
export default function Support() {
  const { t, lang } = useLang();
  const { search, host } = useAddress();
  const view = supportView(search, host);
  const { data, sample } = view;

  const [strikes, setStrikes] = useState(0);
  const [thanked, setThanked] = useState<"copied" | "paid" | null>(null);
  const [justCopied, setJustCopied] = useState(false);
  const [manual, setManual] = useState(false);
  const keyText = useRef<HTMLParagraphElement>(null);
  const copiedTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const breb = hasBreb(data);
  const paypal = hasPaypal(data);
  if (!breb && !paypal) return null;

  const s = t.support;
  const b = s.breb;
  const thanks = thanked ?? (view.thanks ? "copied" : null);
  const struck = strikes > 0 || view.thanks;
  const whatsapp = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(s.thanks.message)}`;

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(data.breb.key);
      ok = true;
    } catch {
      // clipboard API blocked (some in-app browsers): select the key and try the old command;
      // if that fails too, the key stays selected so it can be copied by hand
      const node = keyText.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        try {
          ok = document.execCommand("copy");
        } catch {}
        if (ok) selection?.removeAllRanges();
      }
    }
    setManual(!ok);
    if (!ok) return;
    setStrikes((n) => n + 1);
    setThanked((k) => k ?? "copied");
    setJustCopied(true);
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setJustCopied(false), 2600);
  };

  const tag = sample && (
    <span className="readout ml-3 inline-block rounded-[2px] border border-anvil px-1.5 py-0.5 align-middle text-[0.58rem] leading-none text-steel">
      {s.sample}
    </span>
  );

  const qr = data.breb.qr && (
    <figure className="[grid-area:qr]">
      {sample ? (
        <div className="ingot-qr-sample grid size-44 place-items-center rounded-[3px] border border-anvil">
          <span className="readout rounded-[2px] border border-anvil bg-forge px-2 py-1 text-[0.6rem] text-steel">
            {b.qrSample}
          </span>
        </div>
      ) : (
        <div className="ingot-qr inline-block">
          <Image src={data.breb.qr} alt={b.qrAlt} width={352} height={352} unoptimized className="block size-40 sm:size-44" />
        </div>
      )}
      <figcaption className="readout mt-2 max-w-[11rem] text-[0.6rem] leading-relaxed text-steel">{b.qr}</figcaption>
    </figure>
  );

  return (
    <section id="apoyar" aria-labelledby="apoyar-title" className="border-t border-anvil">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          <header className="lg:col-span-5">
            <h2 id="apoyar-title" className="stencil drop text-[clamp(2.75rem,6vw,4.5rem)] [--wdth:74]">
              {s.title}
            </h2>
            <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-iron/80">{s.lede}</p>
          </header>

          {/* the ways to give */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            {breb && (
              <div className="ingot forge-in" data-struck={struck ? "" : undefined}>
                <div
                  data-heat={struck ? "white" : "cold"}
                  className="ingot-face plate relative overflow-hidden rounded-[3px] border border-anvil"
                >
                  <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />
                  {strikes > 0 && <span key={strikes} aria-hidden="true" className="ingot-flash" />}

                  <div className="relative p-5 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <p className="stamp text-iron/90">{b.label}</p>
                      <p className="readout text-[0.65rem] text-steel">{b.free}</p>
                    </div>

                    <div className="mt-8 grid gap-x-8 gap-y-7 [grid-template-areas:'key'_'copy'_'steps'_'qr'] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:[grid-template-areas:'key_qr'_'copy_copy'_'steps_steps']">
                      <div className="relative min-w-0 [grid-area:key]">
                        <p className="stamp">
                          {b.key}
                          {tag}
                        </p>
                        <p
                          key={`key-${strikes}`}
                          ref={keyText}
                          data-struck={struck ? "" : undefined}
                          className="ingot-key mt-2 select-all break-all font-mono text-[clamp(1.25rem,5.2vw,2.75rem)] leading-[1.1] [font-variation-settings:'wdth'_87.5]"
                        >
                          {data.breb.key}
                        </p>
                        {data.breb.holder && (
                          <p className="mt-4 text-[0.95rem] leading-snug text-iron/85">
                            <span className="stamp mr-2">{b.holder}</span>
                            {data.breb.holder}
                            {data.breb.bank && <span className="text-steel"> · {data.breb.bank}</span>}
                          </p>
                        )}
                        <p className="mt-3 max-w-[30rem] text-[1rem] leading-relaxed text-iron/75">{b.sub}</p>
                        {struck && (
                          <span
                            key={`stamp-${strikes}`}
                            aria-hidden="true"
                            className="ingot-stamp stencil absolute -top-5 right-0 uppercase max-sm:text-[1rem] sm:-top-9"
                          >
                            {b.stamp}
                          </span>
                        )}
                      </div>

                      {qr}

                      <div className="relative [grid-area:copy]">
                        {strikes > 0 &&
                          SPARKS.map(([dx, dy, d]) => (
                            <span
                              key={`${strikes}-${dx}`}
                              aria-hidden="true"
                              className="ingot-spark"
                              style={{ "--dx": `${dx}px`, "--dy": `${dy}px`, "--d": `${d}s` } as React.CSSProperties}
                            />
                          ))}
                        <button type="button" onClick={copy} className="btn btn-hot w-full">
                          {justCopied ? <Check className="size-5" /> : <Copy className="size-5" />}
                          {justCopied ? b.copied : b.copy}
                        </button>
                        <p role="status" className="sr-only">
                          {justCopied ? b.copied : ""}
                        </p>
                        {manual && (
                          <p role="alert" className="mt-3 text-[0.95rem] leading-relaxed text-[#ff7a52]">
                            {b.copyFailed}
                          </p>
                        )}
                      </div>

                      <ol aria-label={b.stepsLabel} className="grid border-t border-iron/15 [grid-area:steps] sm:grid-cols-3">
                        {b.steps.map((step, i) => (
                          <li
                            key={step}
                            className="flex items-baseline gap-3 border-b border-iron/15 py-3 sm:border-b-0 sm:border-l sm:px-4 sm:pb-0 sm:pt-4 sm:first:border-l-0 sm:first:pl-0"
                          >
                            <span className="readout text-[0.65rem] text-steel">{String(i + 1).padStart(2, "0")}</span>
                            <span className="text-[0.95rem] leading-snug text-iron/85">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {thanks && (
              <div
                role="status"
                data-heat="white"
                className="ingot-thanks plate relative mt-4 overflow-hidden rounded-[3px] border border-anvil p-5 first:mt-0 sm:p-8"
              >
                <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />
                <h3 className="stencil text-[clamp(1.6rem,3vw,2.35rem)] leading-[0.95] [--wdth:80]">{s.thanks.title}</h3>
                <p className="mt-3 max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/85">
                  {thanks === "paid" ? s.thanks.paid : s.thanks.copied}
                </p>
                {thanks === "copied" && (
                  <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-steel mt-5">
                    {s.thanks.tellUs}
                    <ArrowUpRight className="size-5 text-ember" />
                    <span className="sr-only">({s.newTab})</span>
                  </a>
                )}
              </div>
            )}

            {paypal && (
              <div className={breb || thanks ? "mt-8 border-y border-anvil py-6" : "border-y border-anvil py-6"}>
                <PayPalDonate
                  paypal={data.paypal}
                  sample={sample}
                  fails={view.paypalFails}
                  primary={!breb}
                  onComplete={() => setThanked("paid")}
                />
              </div>
            )}

            <p className="mt-6 text-[0.875rem] leading-relaxed text-steel">
              {s.fine}{" "}
              <Link href="/terminos#aportes" className="text-iron/90 underline decoration-iron/30 hover:text-white-heat">
                {s.terms}
              </Link>
            </p>
          </div>

          {/* why it matters */}
          <ul className="self-start border-t border-anvil lg:col-span-5 lg:col-start-1 lg:row-start-2">
            {s.messages.map((m, i) => (
              <li key={m.title} className="drop border-b border-anvil py-6">
                <p className="stencil text-[clamp(1.5rem,2.6vw,2rem)] leading-[0.95] [--wdth:80]">{m.title}</p>
                <p className="mt-2 max-w-[30rem] text-[1rem] leading-relaxed text-iron/75">{m.body}</p>
                {i === 0 && data.suggested.length > 0 && (
                  <p className="readout mt-3 text-[0.65rem] leading-relaxed text-steel">
                    {s.suggested}: <span className="text-iron/85">{data.suggested.map(formatCOP).join(" · ")}</span>
                    {tag}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* what the money is for */}
        {data.uses.length > 0 && (
          <div className="mt-16 lg:mt-24">
            <h3 className="stencil drop text-[clamp(1.6rem,3vw,2.35rem)] leading-[0.95] [--wdth:80]">{s.uses.title}</h3>
            <ul className="mt-6 border-t border-anvil">
              {data.uses.map((use) => {
                const bought = use.status === "bought";
                return (
                  <li
                    key={use.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-2 border-b border-anvil py-5 sm:grid-cols-[minmax(0,1fr)_auto_10rem]"
                  >
                    <div className="min-w-0">
                      <p className={`stencil text-[1.5rem] leading-[0.95] [--wdth:80] ${bought ? "text-steel" : ""}`}>
                        {use.name[lang]}
                        {tag}
                      </p>
                      {use.body && (
                        <p className="mt-1.5 max-w-[40rem] text-[0.95rem] leading-relaxed text-iron/75">{use.body[lang]}</p>
                      )}
                    </div>
                    <p className="readout text-[0.9rem] tracking-normal text-iron">
                      {use.cost !== undefined && (
                        <>
                          {formatCOP(use.cost)} <span className="text-[0.6rem] tracking-[0.08em] text-steel">{s.uses.approx}</span>
                        </>
                      )}
                    </p>
                    <p
                      className={`readout col-span-2 flex items-center gap-2 text-[0.62rem] sm:col-span-1 sm:justify-self-end ${
                        bought ? "text-steel" : "text-iron"
                      }`}
                    >
                      {bought ? (
                        <Check className="size-4" />
                      ) : (
                        <span aria-hidden="true" className="block size-2 border border-iron/70" />
                      )}
                      {bought ? s.uses.bought : s.uses.needed}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

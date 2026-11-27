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
import Supporters from "./support/Supporters";
import { ArrowUpRight, Check, Copy, Plus } from "./icons";

// the address never changes under the section: read it once, the same way on server and client
const never = () => () => {};
const useAddress = () => ({
  search: useSyncExternalStore(never, () => window.location.search, () => ""),
  host: useSyncExternalStore(never, () => window.location.hostname, () => ""),
});

/** Sparks off the anvil: where along the button each one starts (%), where it lands (px) and when it leaves (s). */
const SPARKS: [number, number, number, number][] = [
  [8, -70, -96, 0.05],
  [16, -34, -150, 0],
  [24, 22, -84, 0.08],
  [31, -58, -176, 0.03],
  [38, 14, -128, 0.06],
  [45, -26, -202, 0.01],
  [50, 6, -112, 0.09],
  [55, 30, -190, 0.02],
  [62, -12, -138, 0.07],
  [69, 52, -168, 0],
  [76, -20, -92, 0.04],
  [84, 40, -146, 0.06],
  [92, 74, -100, 0.02],
];

/**
 * "Apoya a Forest": support the label. The Bre-B key is stamped on a steel ingot;
 * copying it is a hammer strike (the key runs white hot and cools to a warm rest,
 * sparks fly, a stamp is inked on) and the next step appears under it. Donors abroad
 * get a PayPal row. Hidden until `data/support.ts` holds at least one way to give.
 * The site never claims a payment arrived: a Bre-B transfer happens in the donor's
 * own bank app. Only PayPal's own confirmation shows the thank-you plate.
 * Proof of a transfer goes by WhatsApp ("Enviar comprobante"), which is also how a
 * supporter asks to be named on the board ("Quienes más apoyan"). The label's vinyl
 * logo sits over the title; a studio photo beside the board shows where the money goes.
 */
export default function Support() {
  const { t, lang } = useLang();
  const { search, host } = useAddress();
  const view = supportView(search, host);
  const { data, sample } = view;

  const [strikes, setStrikes] = useState(0);
  const [paidNow, setPaidNow] = useState(false);
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
  const struck = strikes > 0 || view.preview === "copied";
  const paid = paidNow || view.preview === "paid";
  const whatsapp = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(s.next.message)}`;
  // the key may only break after an @ or a dot, never at a hyphen or inside a word (unless one part alone can't fit)
  const keyParts = (data.breb.key.match(/[^@.]*[@.]?/g) ?? [data.breb.key]).filter(Boolean);
  if (keyParts.length > 1 && keyParts[0] === "@") keyParts.splice(0, 2, `@${keyParts[1]}`); // a leading @ stays with its word
  const { side } = data.photos;
  const board = data.showBoard;

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
    setJustCopied(true);
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setJustCopied(false), 2600);
  };

  const tag = sample && (
    <span className="readout ml-3 inline-block rounded-[2px] border border-anvil px-1.5 py-0.5 align-middle text-[0.58rem] leading-none text-steel">
      {s.sample}
    </span>
  );

  const qr = data.breb.qr ? (
    <figure>
      {sample ? (
        <div className="ingot-qr-sample grid size-44 place-items-center rounded-[3px] border border-anvil">
          <span className="readout rounded-[2px] border border-anvil bg-forge px-2 py-1 text-[0.6rem] text-steel">
            {b.qrSample}
          </span>
        </div>
      ) : (
        <div className="ingot-qr inline-block">
          <Image src={data.breb.qr} alt={b.qrAlt} width={352} height={352} unoptimized className="block size-44 mix-blend-multiply" />
        </div>
      )}
      <figcaption className="readout mt-2 max-w-[11rem] text-[0.6rem] leading-relaxed text-steel">{b.qr}</figcaption>
    </figure>
  ) : null;

  return (
    <section id="apoyar" aria-labelledby="apoyar-title" className="border-t border-anvil">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          {/* the label's own mark over the title: the vinyl logo whole, never cropped or graded */}
          <header className="plate flex flex-col overflow-hidden rounded-[3px] border border-anvil lg:col-span-5">
            <div className="flex flex-1 items-center justify-center px-8 pb-2 pt-10 sm:pt-12">
              <Image
                src="/brand/logo.png"
                alt={s.logoAlt}
                width={1254}
                height={1254}
                sizes="(max-width: 640px) 62vw, 22rem"
                className="forge-in h-auto w-[min(62%,22rem)] drop-shadow-[0_24px_40px_rgb(0_0_0/0.65)]"
              />
            </div>
            <div className="px-5 pb-6 pt-6 sm:px-8 sm:pb-8">
              <h2 id="apoyar-title" className="stencil drop text-[clamp(2.4rem,6vw,4.5rem)] [--wdth:74]">
                {s.title}
              </h2>
              <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-relaxed text-iron/85">{s.lede}</p>
            </div>
          </header>

          {/* the ways to give */}
          <div className="lg:col-span-7 lg:col-start-6">
            {breb && (
              <div className="ingot forge-in" data-struck={struck ? "" : undefined}>
                <div
                  data-heat={struck ? "white" : "cold"}
                  className="ingot-face plate relative overflow-hidden rounded-[3px] border border-anvil"
                >
                  <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />
                  {strikes > 0 && <span key={strikes} aria-hidden="true" className="ingot-flash" />}

                  <div className="relative flex flex-col gap-7 p-5 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <p className="stamp text-iron/90">{b.label}</p>
                      <p className="readout text-[0.7rem] text-iron">{b.free}</p>
                    </div>

                    {/* the key, stamped into its well */}
                    <div className="ingot-well px-3 pb-7 pt-3 sm:px-6 sm:pb-9 sm:pt-4">
                      <div className="relative flex min-h-10 items-center">
                        <p className="stamp">
                          {b.key}
                          {tag}
                        </p>
                        {struck && (
                          <span
                            key={`stamp-${strikes}`}
                            aria-hidden="true"
                            className="ingot-stamp stencil absolute right-0 top-0.5 uppercase"
                          >
                            {b.stamp}
                          </span>
                        )}
                      </div>
                      <p
                        key={`key-${strikes}`}
                        ref={keyText}
                        data-struck={struck ? "" : undefined}
                        style={{ "--n": data.breb.key.length } as React.CSSProperties}
                        className="ingot-key mt-2 select-all"
                      >
                        {keyParts.map((part, i) => (
                          <span key={i} className="inline-block max-w-full">
                            {part}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="flex flex-col gap-7 sm:flex-row sm:items-stretch sm:gap-8">
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                        {data.breb.holder && (
                          <p className="text-[1rem] leading-snug text-iron/90">
                            <span className="stamp mr-2">{b.holder}</span>
                            {data.breb.holder}
                          </p>
                        )}
                        {data.breb.bank && <p className="readout mt-1.5 text-[0.65rem] text-steel">{data.breb.bank}</p>}
                        <p className="mt-3 max-w-[30rem] text-[1rem] leading-relaxed text-iron/75">{b.sub}</p>
                        </div>

                        <div className="relative mt-6">
                          {strikes > 0 &&
                            SPARKS.map(([x, dx, dy, d]) => (
                              <span
                                key={`${strikes}-${x}`}
                                aria-hidden="true"
                                className="ingot-spark"
                                style={{ "--x": `${x}%`, "--dx": `${dx}px`, "--dy": `${dy}px`, "--d": `${d}s` } as React.CSSProperties}
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
                      </div>
                      {qr && <div className="hidden shrink-0 sm:block">{qr}</div>}
                    </div>

                    <ol aria-label={b.stepsLabel} className="grid border-t border-iron/15 sm:grid-cols-3">
                      {b.steps.map((step, i) => (
                        <li
                          key={step}
                          className="flex items-baseline gap-3 border-b border-iron/15 py-3 last:border-b-0 last:pb-0 sm:border-b-0 sm:border-l sm:px-4 sm:pb-0 sm:pt-4 sm:first:border-l-0 sm:first:pl-0"
                        >
                          <span className="readout text-[0.65rem] text-steel">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-[0.95rem] leading-snug text-iron/85">{step}</span>
                        </li>
                      ))}
                    </ol>

                    {/* proof goes by WhatsApp, and it is how a supporter gets named on the board. After the
                        strike the same row says what to do next. Never a thank-you: nothing has been sent yet */}
                    <div className="flex flex-col gap-5 border-t border-iron/15 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                      <div role="status" className="min-w-0">
                        <div key={struck ? "next" : "proof"} className={struck ? "ingot-next" : undefined}>
                          <h3 className="stencil text-[clamp(1.5rem,2.6vw,2rem)] leading-[0.95] [--wdth:80]">
                            {struck ? s.next.title : s.proof.title}
                          </h3>
                          <p className="mt-2 max-w-[32rem] text-[1rem] leading-relaxed text-iron/85">
                            {struck ? s.next.body : s.proof.body}
                          </p>
                        </div>
                      </div>
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-steel shrink-0 max-sm:gap-2 max-sm:px-3 max-sm:text-[1rem]"
                      >
                        {s.proof.cta}
                        <ArrowUpRight className="size-5 shrink-0 text-ember" />
                        <span className="sr-only">({s.newTab})</span>
                      </a>
                    </div>

                    {/* phones can't scan their own screen: the code waits behind a steel switch */}
                    {qr && (
                      <details className="group border-t border-iron/15 sm:hidden">
                        <summary className="readout flex min-h-12 cursor-pointer list-none items-center gap-3 text-[0.68rem] text-iron/90 [&::-webkit-details-marker]:hidden">
                          <Plus className="size-4 text-ember transition-transform duration-300 ease-[var(--ease-hammer)] group-open:rotate-45" />
                          {b.qrShow}
                        </summary>
                        <div className="pb-1 pt-2">{qr}</div>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* only PayPal's own confirmation earns the thank-you plate */}
            {paid && (
              <div
                role="status"
                data-heat="white"
                className="ingot-next plate relative mt-4 overflow-hidden rounded-[3px] border border-anvil p-5 first:mt-0 sm:p-8"
              >
                <span aria-hidden="true" className="heat-bar absolute inset-x-0 top-0 block h-[3px]" />
                <h3 className="stencil text-[clamp(1.6rem,3vw,2.35rem)] leading-[0.95] [--wdth:80]">{s.thanks.title}</h3>
                <p className="mt-3 max-w-[34rem] text-[1.0625rem] leading-relaxed text-iron/85">{s.thanks.body}</p>
              </div>
            )}

            {paypal && (
              <div className={`border-y border-anvil py-6 ${breb || paid ? "mt-8" : ""}`}>
                <PayPalDonate
                  paypal={data.paypal}
                  sample={sample}
                  fails={view.paypalFails}
                  primary={!breb}
                  onComplete={() => setPaidNow(true)}
                />
              </div>
            )}
          </div>

          {/* why it matters */}
          <ul
            className={`border-t border-anvil sm:grid sm:grid-cols-3 sm:border-b lg:col-span-12 ${paypal ? "max-lg:border-t-0" : ""}`}
          >
            {s.messages.map((m, i) => (
              <li
                key={m.title}
                className="drop border-b border-anvil py-6 sm:border-b-0 sm:border-l sm:px-6 sm:py-7 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
              >
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

        {/* who backs the forge, beside the desk their support pays for */}
        {(board || side.src) && (
          <div className="mt-16 grid gap-x-8 gap-y-8 lg:mt-24 lg:grid-cols-12">
            {board && (
              <div className={side.src ? "lg:col-span-8" : "lg:col-span-12"}>
                <Supporters supporters={data.supporters} sample={sample} whatsapp={whatsapp} />
              </div>
            )}
            {side.src && (
              <figure data-heat="hot" className={`forge-in flex flex-col ${board ? "lg:col-span-4" : "lg:col-span-12"}`}>
                <div
                  className={`parallax iron-photo relative aspect-[4/5] overflow-hidden rounded-[3px] border border-anvil bg-forge-3 sm:aspect-[16/9] ${
                    board ? "lg:aspect-auto lg:min-h-[26rem] lg:flex-1" : "lg:aspect-[21/9]"
                  }`}
                  style={{ "--lift": side.lift ?? 0.9 } as React.CSSProperties}
                >
                  {/* beside the board the slot is taller than the shot: the frame overshoots the foot so the
                      desk stays in the picture and the dark floor falls outside it */}
                  <div className={`absolute inset-x-0 top-0 h-full ${board ? "lg:h-[122%]" : ""}`}>
                    <Image
                      src={side.src}
                      alt={side.alt[lang]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover"
                      style={{ objectPosition: side.focus ?? "50% 40%" }}
                    />
                  </div>
                </div>
                <span aria-hidden="true" className="heat-bar mt-3 block h-[3px] w-10 rounded-full" />
                {side.caption && <figcaption className="readout mt-2 text-[0.6rem] text-steel">{side.caption[lang]}</figcaption>}
              </figure>
            )}
          </div>
        )}

        {/* what the money is for */}
        {data.uses.length > 0 && (
          <div className="mt-16 lg:mt-24">
            <h3 className="stencil text-[clamp(1.6rem,3vw,2.35rem)] leading-[0.95] [--wdth:80]">{s.uses.title}</h3>
            <ul className="mt-6 border-t border-anvil">
              {data.uses.map((use) => {
                const bought = use.status === "bought";
                return (
                  <li
                    key={use.id}
                    className="grid grid-cols-2 items-baseline gap-x-6 gap-y-3 border-b border-anvil py-5 sm:grid-cols-[minmax(0,1fr)_auto_10rem]"
                  >
                    <div className="col-span-2 min-w-0 sm:col-span-1">
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
                      className={`readout flex items-center gap-2 justify-self-end text-[0.62rem] ${
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

        <p className="mt-10 text-[0.875rem] leading-relaxed text-steel">
          {s.fine}{" "}
          <Link href="/terminos#aportes" className="text-iron/90 underline decoration-iron/30 hover:text-white-heat">
            {s.terms}
          </Link>
        </p>
      </div>
    </section>
  );
}

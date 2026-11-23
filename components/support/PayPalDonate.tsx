"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import type { Support } from "@/data/support";
import { useLang } from "@/lib/i18n";
import { paypalLink } from "@/lib/support";
import { ArrowUpRight } from "../icons";

/**
 * "Apoyar con PayPal": our own button over PayPal's Donate SDK, which opens PayPal's
 * donation popup over the page. PayPal's script is not part of the page: it is fetched
 * when the visitor reaches for the button (pointer, focus or touch), so the popup can
 * open inside the click itself and nobody else ever loads it.
 *
 * The SDK renders its own image button and opens the popup from that image's click, so
 * we render it into a hidden box and click it for the visitor.
 * Docs: https://developer.paypal.com/sdk/donate/
 */
const SDK = "https://www.paypalobjects.com/donate/sdk/donate-sdk.js";
const BOX = "fmr-paypal-donate";
// a 1×1 transparent GIF, so the hidden SDK button doesn't fetch PayPal's artwork
const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

type DonateButton = (options: Record<string, unknown>) => { render: (selector: string) => void };
type PayPalWindow = Window & { PayPal?: { Donation?: { Button?: DonateButton } } };

let sdk: Promise<void> | null = null;
function loadSdk() {
  const w = window as PayPalWindow;
  if (w.PayPal?.Donation?.Button) return Promise.resolve();
  sdk ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    const timer = window.setTimeout(() => reject(new Error("timeout")), 12_000);
    script.src = SDK;
    script.async = true;
    script.onload = () => {
      window.clearTimeout(timer);
      if (w.PayPal?.Donation?.Button) resolve();
      else reject(new Error("sdk missing"));
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("blocked"));
    };
    document.head.appendChild(script);
  }).catch((error) => {
    sdk = null; // let the next click try again
    throw error;
  });
  return sdk;
}

type Status = "idle" | "loading" | "error";

export default function PayPalDonate({
  paypal,
  sample,
  fails,
  primary,
  onComplete,
}: {
  paypal: Support["paypal"];
  /** Stand-in details: act the states out without calling PayPal. */
  sample: boolean;
  /** Sample only: fail to open. */
  fails: boolean;
  /** The only way to give on the page: the button becomes the hot one. */
  primary: boolean;
  onComplete: () => void;
}) {
  const { t } = useLang();
  const p = t.support.paypal;
  const [status, setStatus] = useState<Status>("idle");
  const box = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const done = useRef(onComplete);
  useEffect(() => {
    done.current = onComplete;
  }, [onComplete]);

  const link = sample ? "#apoyar" : paypalLink(paypal);
  const usesSdk = paypal.hostedButtonId.length > 0 || paypal.business.length > 0;
  const tone = primary ? "btn-hot" : "btn-steel";

  const mount = () => {
    if (mounted.current) return;
    const button = (window as PayPalWindow).PayPal?.Donation?.Button;
    if (!button || !box.current) throw new Error("sdk missing");
    button({
      env: paypal.env,
      ...(paypal.hostedButtonId ? { hosted_button_id: paypal.hostedButtonId } : { business: paypal.business }),
      image: { src: BLANK, alt: "", title: "" },
      onComplete: () => done.current(),
    }).render(`#${BOX}`);
    mounted.current = true;
  };

  /** Fetch PayPal's script as soon as the visitor reaches for the button. */
  const warm = () => {
    if (sample || !usesSdk || mounted.current) return;
    loadSdk()
      .then(mount)
      .catch(() => {});
  };

  const open = async () => {
    if (status === "loading") return;
    if (sample) {
      setStatus("loading");
      await new Promise((r) => setTimeout(r, 900));
      setStatus(fails ? "error" : "idle");
      if (!fails) onComplete();
      return;
    }
    try {
      if (!mounted.current) {
        setStatus("loading");
        await loadSdk();
        mount();
      }
      const trigger = box.current?.querySelector("img");
      if (!trigger) throw new Error("no button");
      trigger.click();
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="stamp text-iron/90">{p.label}</p>
          <p className="mt-2 max-w-[30rem] text-[1rem] leading-relaxed text-iron/75">{p.sub}</p>
        </div>
        {usesSdk ? (
          <button
            type="button"
            onClick={open}
            onPointerEnter={warm}
            onFocus={warm}
            onTouchStart={warm}
            aria-disabled={status === "loading"}
            className={`btn ${tone} shrink-0`}
          >
            {status === "loading" ? (
              <>
                <span aria-hidden="true" className={`sending-dot size-2 rounded-full ${primary ? "bg-scale" : "bg-ember"}`} />
                {p.loading}
              </>
            ) : (
              <>
                {p.cta}
                <ArrowUpRight className={`size-5 ${primary ? "" : "text-ember"}`} />
              </>
            )}
          </button>
        ) : (
          <a href={link} target="_blank" rel="noreferrer" className={`btn ${tone} shrink-0`}>
            {p.cta}
            <ArrowUpRight className={`size-5 ${primary ? "" : "text-ember"}`} />
            <span className="sr-only">({t.support.newTab})</span>
          </a>
        )}
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <div className="mt-4 rounded-[3px] border border-cherry bg-cherry/10 p-4">
            <p className="stencil text-[1.4rem] leading-none text-[#ff7a52] [--wdth:80]">{p.error}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-iron/85">
              {link ? (
                <a
                  href={link}
                  target={sample ? undefined : "_blank"}
                  rel="noreferrer"
                  className="text-ember underline decoration-ember/40 hover:text-white-heat"
                >
                  {p.errorLink}
                  <span className="sr-only"> ({t.support.newTab})</span>
                </a>
              ) : (
                <>
                  {p.errorMail}{" "}
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="text-ember underline decoration-ember/40 hover:text-white-heat"
                  >
                    {site.contactEmail}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* PayPal's own button lives here, out of sight; ours clicks it */}
      <div id={BOX} ref={box} hidden aria-hidden="true" />
    </div>
  );
}

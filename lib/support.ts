import { hasSupport, support, type Support } from "@/data/support";

/**
 * Review the support section before the real details exist: add `?apoyo=…` to the URL.
 *   ?apoyo=demo        every piece, with clearly fake details (key, QR slot, PayPal, spending list)
 *   ?apoyo=demo-llave  the smallest version: a key only (no QR, no PayPal, no list)
 *   ?apoyo=demo-error  like demo, but PayPal fails to open
 *   ?apoyo=gracias     the thank-you state, without copying or paying (on the demo details while the real ones are empty)
 *
 * The demo details never show on the live site: they work on localhost and on Vercel
 * preview addresses only, so a fake key can't reach a real visitor.
 */
const LIVE_HOSTS = ["forestmediarecords.com", "www.forestmediarecords.com", "forestmr.vercel.app"];

const demo: Support = {
  breb: { key: "@llave-de-ejemplo", holder: "Titular de ejemplo", bank: "Banco de ejemplo", qr: "demo" },
  paypal: { hostedButtonId: "DEMO", business: "", env: "sandbox", paypalMe: "" },
  suggested: [10_000, 20_000, 50_000, 100_000],
  uses: [
    {
      id: "demo-1",
      name: { es: "Equipo de ejemplo uno", en: "Sample item one" },
      body: { es: "Aquí va para qué sirve y por qué hace falta.", en: "What it is for and why it is needed goes here." },
      cost: 1_200_000,
      status: "needed",
    },
    {
      id: "demo-2",
      name: { es: "Equipo de ejemplo dos", en: "Sample item two" },
      body: { es: "Una línea corta sobre el equipo.", en: "A short line about the item." },
      cost: 850_000,
      status: "needed",
    },
    {
      id: "demo-3",
      name: { es: "Equipo de ejemplo tres", en: "Sample item three" },
      status: "bought",
    },
  ],
};

const demoKeyOnly: Support = {
  breb: { key: "@llave-de-ejemplo", holder: "Titular de ejemplo", bank: "", qr: "" },
  paypal: { hostedButtonId: "", business: "", env: "sandbox", paypalMe: "" },
  suggested: [],
  uses: [],
};

export type SupportView = {
  data: Support;
  /** The details are stand-ins: tag them and never call the real services. */
  sample: boolean;
  /** Open on the thank-you state. */
  thanks: boolean;
  /** Demo only: PayPal fails to open. */
  paypalFails: boolean;
};

/** What the section shows for this address (`search` is `window.location.search`, `host` its hostname). */
export function supportView(search: string, host: string): SupportView {
  const mode = new URLSearchParams(search).get("apoyo");
  const mayDemo = host !== "" && !LIVE_HOSTS.includes(host);
  const isDemo =
    mayDemo &&
    (mode === "demo" || mode === "demo-llave" || mode === "demo-error" || (mode === "gracias" && !hasSupport));
  return {
    data: isDemo ? (mode === "demo-llave" ? demoKeyOnly : demo) : support,
    sample: isDemo,
    thanks: mode === "gracias",
    paypalFails: isDemo && mode === "demo-error",
  };
}

/** PayPal's own hosted donation page for this button: the fallback when the popup can't open. */
export function paypalLink(p: Support["paypal"]) {
  if (p.paypalMe) return p.paypalMe;
  if (p.hostedButtonId) return `https://www.paypal.com/donate/?hosted_button_id=${encodeURIComponent(p.hostedButtonId)}`;
  if (p.business) return `https://www.paypal.com/donate/?business=${encodeURIComponent(p.business)}&no_recurring=0`;
  return "";
}

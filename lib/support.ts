import { hasSupport, support, type Support, type Supporter } from "@/data/support";

/**
 * Review the support section before the real details exist: add `?apoyo=…` to the URL.
 *   ?apoyo=demo        every piece, with clearly fake details (key, QR slot, PayPal, spending list, seven supporters)
 *   ?apoyo=demo-llave  the smallest version: a key only (no QR, no PayPal, no list, an empty board)
 *   ?apoyo=demo-larga  like demo, with a long email-type key
 *   ?apoyo=demo-error  like demo, but PayPal fails to open
 *   ?apoyo=copiada     the state after copying the key, without copying
 *   ?apoyo=gracias     the thank-you state after a PayPal payment, without paying
 * (`copiada` and `gracias` use the demo details while the real ones are empty)
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
  supporters: [
    { id: "demo-a", name: "Nombre de ejemplo uno", total: 250_000, showAmount: true, since: "2026-01" },
    { id: "demo-b", name: "Ejemplo dos", total: 120_000, showAmount: true, since: "2026-01" },
    { id: "demo-c", name: "Un nombre de ejemplo bastante más largo tres", total: 100_000, since: "2026-02" },
    { id: "demo-d", name: "Ejemplo cuatro", total: 50_000, showAmount: true, since: "2026-02" },
    { id: "demo-e", name: "Ejemplo cinco", total: 50_000, since: "2026-03" },
    { id: "demo-f", name: "Ejemplo seis", total: 20_000, since: "2026-03" },
    { id: "demo-g", name: "Ejemplo siete", total: 10_000, showAmount: true, since: "2026-04" },
  ],
  showBoard: true,
  photos: support.photos,
};

const demoLong: Support = {
  ...demo,
  breb: { ...demo.breb, key: "llave.de.ejemplo@correo-ejemplo.com" },
};

const demoKeyOnly: Support = {
  breb: { key: "@llave-de-ejemplo", holder: "Titular de ejemplo", bank: "", qr: "" },
  paypal: { hostedButtonId: "", business: "", env: "sandbox", paypalMe: "" },
  suggested: [],
  uses: [],
  supporters: [],
  showBoard: true,
  photos: support.photos,
};

export type SupportView = {
  data: Support;
  /** The details are stand-ins: tag them and never call the real services. */
  sample: boolean;
  /** Open on a later state: the key already copied, or a PayPal payment completed. */
  preview: "copied" | "paid" | null;
  /** Demo only: PayPal fails to open. */
  paypalFails: boolean;
};

/** What the section shows for this address (`search` is `window.location.search`, `host` its hostname). */
export function supportView(search: string, host: string): SupportView {
  const mode = new URLSearchParams(search).get("apoyo");
  const mayDemo = host !== "" && !LIVE_HOSTS.includes(host);
  const preview = mode === "copiada" ? "copied" : mode === "gracias" ? "paid" : null;
  const isDemo =
    mayDemo &&
    (mode === "demo" ||
      mode === "demo-llave" ||
      mode === "demo-larga" ||
      mode === "demo-error" ||
      (preview !== null && !hasSupport));
  return {
    data: isDemo ? (mode === "demo-llave" ? demoKeyOnly : mode === "demo-larga" ? demoLong : demo) : support,
    sample: isDemo,
    preview,
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

/** How many supporters the board ranks; the rest are named under "También apoyan". */
export const BOARD_TOP = 5;

/** The board's order: biggest total first, then whoever gave first, then by name. */
export function rankSupporters(list: Supporter[]) {
  const ordered = [...list].sort(
    (a, b) =>
      b.total - a.total ||
      (a.since ?? "9999").localeCompare(b.since ?? "9999") ||
      a.name.localeCompare(b.name, "es"),
  );
  return { top: ordered.slice(0, BOARD_TOP), rest: ordered.slice(BOARD_TOP) };
}

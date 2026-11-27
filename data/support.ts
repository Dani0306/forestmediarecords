/**
 * "Apoya a Forest": how visitors can support the label with money.
 *
 * The section stays hidden until at least one way to give is filled in here:
 * a Bre-B key (`breb.key`) or a PayPal button (`paypal`). Nothing below is
 * invented; every empty string hides its piece.
 *
 * BRE-B (Colombia, no fees): create a key just for this in the bank or Nequi
 * app. Use an alphanumeric or email-type key, never a phone number or cédula:
 * the key is public on the site.
 *   key     the key exactly as the bank shows it
 *   holder  the account holder's name as the payer will see it in their app
 *   bank    optional, e.g. "Nequi" or "Bancolombia"
 *   qr      optional path to the QR image exported from the app, saved in
 *           `public/support/` (e.g. "/support/breb-qr.png"); keep it sharp
 *
 * PAYPAL (donors abroad): create a Donate button at paypal.com/donate/buttons.
 *   hostedButtonId  the button id (business accounts), OR
 *   business        the account email or merchant id (personal accounts);
 *                   fill one of the two, not both
 *   env             "sandbox" while testing, "production" when live
 *   paypalMe        optional paypal.me link, used if the popup can't open
 *
 * `suggested`: amounts in COP shown as ideas (the donor types the amount in
 * their own bank app). Empty hides the line.
 *
 * `uses`: what the money is for. One entry per real item the team needs;
 * `cost` in COP is optional; `status` is "needed" or "bought". Empty hides
 * the "A dónde va tu aporte" block.
 *
 * `supporters`: the "Quienes más apoyan" board. ONLY add someone who asked to
 * appear (their WhatsApp message is the record) and whose transfer shows in
 * the bank. One entry per person; the site orders them by `total`.
 *   id          a short unique slug, never reused ("juan-p")
 *   name        the public name THEY chose (Kick or artist name is fine)
 *   total       everything they have given so far, in COP, as it arrived;
 *               when they give again, raise this number
 *   showAmount  true only if they agreed to show the amount; without it the
 *               name shows in its place but the amount doesn't
 *   since       optional, first gift as "YYYY-MM"; breaks ties (earlier first)
 * The top five are ranked; the rest are named under "También apoyan".
 * To remove someone, delete their entry.
 *
 * `showBoard`: false hides the board (the rest of the section stays).
 *
 * `photos.side`: the studio picture beside the board. Only real Forest
 * photos in `public/`. An empty `src` removes it. `focus` is the
 * object-position that keeps the subject in frame; `lift` brightens a dark
 * shot (0.9 is normal). The title carries the label's logo, not a photo.
 */
export type SupportUse = {
  id: string;
  name: { es: string; en: string };
  body?: { es: string; en: string };
  /** Approximate cost in COP. */
  cost?: number;
  status: "needed" | "bought";
};

export type Supporter = {
  id: string;
  name: string;
  /** Everything given so far, in COP. */
  total: number;
  showAmount?: boolean;
  /** First gift, "YYYY-MM". */
  since?: string;
};

export type SupportPhoto = {
  src: string;
  alt: { es: string; en: string };
  /** A short mono line under the picture. */
  caption?: { es: string; en: string };
  focus?: string;
  lift?: number;
};

export type Support = {
  breb: { key: string; holder: string; bank: string; qr: string };
  paypal: {
    hostedButtonId: string;
    business: string;
    env: "sandbox" | "production";
    paypalMe: string;
  };
  suggested: number[];
  uses: SupportUse[];
  supporters: Supporter[];
  showBoard: boolean;
  photos: { side: SupportPhoto };
};

export const support: Support = {
  // From the Nequi Negocios QR sheet (marketing/donations/qr-code-donations.pdf, 2026-11-26).
  breb: {
    key: "0093728205",
    holder: "Forest Media Records · Daniel Colorado",
    bank: "Nequi",
    qr: "/support/breb-qr.png",
  },
  paypal: { hostedButtonId: "", business: "", env: "sandbox", paypalMe: "" },
  suggested: [],
  uses: [],
  supporters: [],
  showBoard: true,
  photos: {
    side: {
      src: "/artists/lowkey/lowkey4.webp",
      alt: {
        es: "Lowkey trabajando en el portátil en la cabina del estudio, junto al micrófono y la consola",
        en: "Lowkey working on the laptop in the studio booth, next to the microphone and the console",
      },
      caption: { es: "Lowkey en el estudio", en: "Lowkey in the studio" },
      focus: "50% 55%",
      lift: 1.05,
    },
  },
};

export const hasBreb = (s: Support) => s.breb.key.length > 0;
export const hasPaypal = (s: Support) =>
  s.paypal.hostedButtonId.length > 0 ||
  s.paypal.business.length > 0 ||
  s.paypal.paypalMe.length > 0;

/** True once the team has filled in at least one way to give: the section, its nav link and its footer link appear. */
export const hasSupport = hasBreb(support) || hasPaypal(support);

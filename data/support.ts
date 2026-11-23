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
 */
export type SupportUse = {
  id: string;
  name: { es: string; en: string };
  body?: { es: string; en: string };
  /** Approximate cost in COP. */
  cost?: number;
  status: "needed" | "bought";
};

export type Support = {
  breb: { key: string; holder: string; bank: string; qr: string };
  paypal: { hostedButtonId: string; business: string; env: "sandbox" | "production"; paypalMe: string };
  suggested: number[];
  uses: SupportUse[];
};

export const support: Support = {
  breb: { key: "", holder: "", bank: "", qr: "" },
  paypal: { hostedButtonId: "", business: "", env: "sandbox", paypalMe: "" },
  suggested: [],
  uses: [],
};

export const hasBreb = (s: Support) => s.breb.key.length > 0;
export const hasPaypal = (s: Support) =>
  s.paypal.hostedButtonId.length > 0 || s.paypal.business.length > 0 || s.paypal.paypalMe.length > 0;

/** True once the team has filled in at least one way to give: the section, its nav link and its footer link appear. */
export const hasSupport = hasBreb(support) || hasPaypal(support);

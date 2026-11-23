---
type: feature
status: building
date: 2026-11-22
code: "components/Support.tsx"
tags:
  - feature
related:
  - "[[Support starts with Bre-B and PayPal, gateway later]]"
  - "[[Support section ships dark until the accounts exist]]"
  - "[[Legal pages]]"
  - "[[Chat assistant]]"
---

# Support

**Code:** `components/Support.tsx`, `components/support/PayPalDonate.tsx`, `data/support.ts`, `lib/support.ts`, styles `.ingot-*` in `app/globals.css`; prompt `prompts/001-donation-system.md`

## What it does
"Apoya a Forest" / "Support Forest", anchor `#apoyar`, after [[La forja]] and before [[Studio]]. Visitors support the label with money for production equipment and tools. The page says "apoyo / aporte", never "donación": a person on the team receives the money, and contributions are not tax-deductible.

- **Hidden until filled.** The section, its nav link ("Apoyar", desktop bar from 1600px, always in the menu) and its footer link render only when `data/support.ts` holds a Bre-B key or a PayPal button ([[Support section ships dark until the accounts exist]]). All of it is empty today, so the live site shows nothing.
- **Layout ("the ingot", chosen by Daniel).** Left: title, pitch and three messages as rule-separated rows ("No importa el monto", "Todo va a la producción", "Tú pones la chispa"), with the suggested amounts under the first. Right: the Bre-B key on one steel plate (key in large mono, holder's name, QR on pale iron, the one hot "Copiar llave", three numbered steps), then PayPal as a cold steel row, then the fine print linking to `/terminos#aportes`. On phones: title, pitch, key plate, PayPal, messages.
- **The strike.** Copying the key flashes the plate white hot, the key cools down the heat ramp and stays warm, sparks fly off the button, a "Copiada" stamp is pressed on and a thank-you plate appears with "Avísanos por WhatsApp" (prefilled message to `site.whatsapp`). The site never says a payment arrived: a Bre-B transfer happens in the donor's bank app. If the clipboard is blocked the key is left selected with a line saying so.
- **PayPal** (donors abroad): our button over PayPal's Donate SDK, which opens PayPal's popup over the page. PayPal's script is fetched only when the visitor reaches for the button. If it can't load, an alert links to PayPal's hosted page (or the contact email). With only a `paypalMe` link set, the button is a plain link. With no Bre-B key, the PayPal button becomes the hot one.
- **Spending list** ("A dónde va tu aporte"): `uses` in `data/support.ts`, rule-separated rows with name, body, approximate cost in mono and a needed / bought status. Hidden while the list is empty.
- **Preview** (localhost and Vercel preview addresses only, never the live domains): `?apoyo=demo` (everything, with stand-in details tagged "Ejemplo"), `?apoyo=demo-llave` (a key only), `?apoyo=demo-error` (PayPal fails), `?apoyo=gracias` (thank-you state). `/preview/apoyar` shows the section alone in development.
- No server code, no env vars, no totals, goals or donor names.

## Open issues
- [ ] Team: the Bre-B key created for this (alphanumeric or email type, not a phone number or cédula), the holder's name as the bank shows it, and the QR image if the app offers one (saved in a new `support` folder under `public/`)
- [ ] Team: the PayPal account and its Donate button id (or account email); try it with `env: "sandbox"` first. The real PayPal popup has not been tested yet: it needs a real button id
- [ ] Team: the spending list (items, optional costs) and the suggested amounts
- [ ] Team: refund wording and who receives the money, for the terms ("Aportes voluntarios" is a draft)
- [ ] Vercel plan: Hobby allows only personal or non-commercial use; decide on Pro before going live
- [ ] Later: payment gateway (PayPal Checkout + Wompi), plan kept in `prompts/002-support-gateway-paypal-wompi.md`

## Decisions
[[Support starts with Bre-B and PayPal, gateway later]] · [[Support section ships dark until the accounts exist]]

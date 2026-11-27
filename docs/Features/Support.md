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
  - "[[Top supporters are listed by consent and edited by hand]]"
  - "[[Legal pages]]"
  - "[[Chat assistant]]"
---

# Support

**Code:** `components/Support.tsx`, `components/support/PayPalDonate.tsx`, `components/support/Supporters.tsx`, `data/support.ts`, `lib/support.ts`, styles `.ingot-*` and `.board-rank` in `app/globals.css`; prompts `prompts/001-donation-system.md` and `prompts/004-top-supporters-and-photos.md`

## What it does
"Apoya a Forest" / "Support Forest", anchor `#apoyar`, after [[La forja]] and before [[Studio]]. Visitors support the label with money for production equipment and tools. The page says "apoyo / aporte", never "donación": a person on the team receives the money, and contributions are not tax-deductible.

- **Hidden until filled.** The section, its nav link ("Apoyar", desktop bar from 1600px, always in the menu) and its footer link render only when `data/support.ts` holds a Bre-B key or a PayPal button ([[Support section ships dark until the accounts exist]]). Since 2026-11-26 the Bre-B details are filled in (key `0093728205`, held by "Forest Media Records · Daniel Colorado", Nequi, QR in `public/support/breb-qr.png`) on branch `feat/donation-system`; PayPal, the suggested amounts and the spending list are still empty, so those pieces stay hidden. The live site shows nothing until the branch is merged.
- **Layout ("the ingot", chosen by Daniel; logo, board and photo added 2026-11-26 because the section read too linear).** Left: a steel plate with the label's vinyl logo (`public/brand/logo.png`, whole, not graded) over the title and pitch; Daniel chose the logo over artist photos. Under both columns, the three messages run three across ("No importa el monto", "Todo va a la producción", "Tú pones la chispa"), with the suggested amounts under the first. Then the board beside a studio print (`photos.side`, Lowkey at the desk). Right of the logo plate: one steel plate. The Bre-B key sits in a forge-black well with an mm ruler along its foot, in bold mono sized to its own length so it fills the well on one line (it breaks only after "@" or a dot); under it the holder's name, the bank, the one hot "Copiar llave" and the QR on pale iron; then three numbered steps. PayPal follows as a cold steel row. The fine print (voluntary, not tax-deductible, link to `/terminos#aportes`) closes the section. On phones: title, pitch, key plate, PayPal, messages, list; the QR waits behind "Ver código QR" because a phone can't scan its own screen.
- **The strike.** Copying the key flashes the plate, the key runs white hot and cools down the ramp (yellow, orange) to a warm rest, sparks fly off the button, a "Copiada" stamp is inked on and the proof row under the steps changes its heading to "Ya tienes la llave" with what to do in the bank app. It is not a thank-you: nothing has been sent yet, and the site can't see a Bre-B transfer. If the clipboard is blocked the key is left selected with a line saying so.
- **Proof row.** Always visible under the steps: "Cuéntanos que fuiste tú" and a steel "Escribir por WhatsApp" that opens WhatsApp (`site.whatsapp`) with a friendly prefilled message sharing the receipt and the name to show. Daniel asked for soft wording (2026-11-26): the page never demands a receipt. The site never receives the receipt.
- **Board ("Quienes más apoyan").** `supporters` in `data/support.ts`, ordered by `total` (`rankSupporters()` in `lib/support.ts`): the top five as ranked rows where rank is temperature (white, hot, hot, warm, warm), an amount only where `showAmount` is true, the rest named under "También apoyan". Spots nobody holds show cold as "Lugar libre"; with no supporters spot 01 itself reads "El primer nombre puede ser el tuyo". `showBoard: false` hides it. To add someone: one entry with `id`, `name` (the name they chose), `total` in COP, `showAmount` if they agreed, `since`. Only after the transfer shows in Nequi and they asked to appear ([[Top supporters are listed by consent and edited by hand]]).
- **PayPal** (donors abroad): our button over PayPal's Donate SDK, which opens PayPal's popup over the page. PayPal's script is fetched only when the visitor reaches for the button; if it hasn't arrived when they click, PayPal's own donation page opens in a new tab instead (a popup opened after waiting would be dropped silently on iPhones). A blocked tab shows an alert with the link. Only PayPal's own confirmation shows the thank-you plate ("Gracias por apoyar a Forest"). With only a `paypalMe` link set, the button is a plain link. With no Bre-B key, the PayPal button becomes the hot one.
- **Spending list** ("A dónde va tu aporte"): `uses` in `data/support.ts`, rule-separated rows with name, body, approximate cost in mono and a needed / bought status. Hidden while the list is empty.
- **Preview** (localhost and Vercel preview addresses only, never the live domains): `?apoyo=demo` (everything, with stand-in details tagged "Ejemplo", seven sample supporters), `?apoyo=demo-llave` (a key only, empty board), `?apoyo=demo-larga` (a long email-type key), `?apoyo=demo-error` (PayPal fails), `?apoyo=copiada` (the state after copying), `?apoyo=gracias` (the PayPal thank-you plate). `/preview/apoyar` shows the section alone in development.
- No server code, no env vars, no overall total and no goal. Names appear only by consent.

## Open issues
- [x] Bre-B key, holder and QR (2026-11-26): from the Nequi Negocios QR sheet Daniel made (`marketing/donations/qr-code-donations.pdf`, not in git). The QR image is the sheet's own embedded code, unchanged; it decodes to the same key and scans from the page at 320, 390 and 1440px. Daniel is the treasurer for now
- [ ] Daniel: one small real transfer from another bank before going live: check the name the payer's app shows (the holder line should match it) and that the full amount arrives
- [ ] Team: the PayPal account and its Donate button id (or account email); try it with `env: "sandbox"` first. The real PayPal popup has not been tested yet: it needs a real button id
- [ ] Team: the spending list (items, optional costs) and the suggested amounts
- [ ] Team: refund wording for the terms ("Aportes voluntarios" is a draft; the bracketed placeholder shows on `/terminos` once the section is live). The terms now say where the money is received from the data ("Se reciben en la cuenta Nequi a nombre de …") and name PayPal only when it is set up
- [ ] Vercel plan: Hobby allows only personal or non-commercial use; decide on Pro before going live
- [ ] The label's WhatsApp (`site.whatsapp`) receives the receipts: confirm Daniel reads it or gets them forwarded
- [ ] Later: an `?admin` form to update the board without a deploy, if updates become frequent
- [ ] Later: payment gateway (PayPal Checkout + Wompi), plan kept in `prompts/002-support-gateway-paypal-wompi.md`

## Decisions
[[Support starts with Bre-B and PayPal, gateway later]] · [[Support section ships dark until the accounts exist]] · [[Top supporters are listed by consent and edited by hand]]

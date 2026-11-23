# 001 · Support section: Bre-B key + PayPal button ("Apoya a Forest")

**Date:** 2026-11-22 · **Branch:** `feat/donation-system` · **Status:** approved (2026-11-22)

## Goal
A visitor can read why Forest Media Récords asks for support and where the money goes, then give in under a minute: from any Colombian bank or wallet with a Bre-B key or QR (no fee), or from abroad through a PayPal popup. The team keeps nearly everything it receives and runs no payment server.

The gateway version (PayPal Checkout + Wompi) is deferred: `prompts/002-support-gateway-paypal-wompi.md`.

## Docs read
- [PayPal Donate SDK](https://developer.paypal.com/sdk/donate/): script `https://www.paypalobjects.com/donate/sdk/donate-sdk.js`; `PayPal.Donation.Button({ env, hosted_button_id | business, image, onComplete }).render(selector)`; `hosted_button_id` for a business account, `business` for a personal one, never both; `onComplete` receives `tx`, `st`, `amt`, `cc`, `cm`, `item_number`, `item_name`; the donor pays in a popup over the page; eligibility is whether the account can start a button at paypal.com/donate/buttons. Not stated: supported countries, card payment without a PayPal account.
- [Banco de la República, Bre-B](https://banrep.gov.co/es/bre-b/que-es) and [FAQ](https://www.banrep.gov.co/bre-b/preguntas-frecuentes): keys ("llaves") work across banks and wallets; transfers between people are free; ceiling of 1.000 UVB per transfer (about $12,1 million COP in 2026), each bank may set lower limits; QR codes for personal accounts were scheduled for 2026 (not confirmed live in every app).
- `node_modules/next/dist/docs/01-app/02-guides/scripts.md`: `next/script` strategies (`afterInteractive`, `lazyOnload`) and `onLoad` / `onReady`. Neither strategy waits for a click, so the PayPal script is injected by hand when the visitor opens the PayPal step.
- [Vercel Hobby plan](https://vercel.com/docs/plans/hobby) and [terms](https://vercel.com/legal/terms) (updated 2026-10-19): Hobby is for "personal or non-commercial use"; no sentence on donations found; Pro is US$20 per month.
- PayPal fees for Colombian accounts: the official page blocks automated reading. Third-party pages give 4.4% to 5.4% + US$0.30 per international payment and about 3.5% conversion on withdrawal. To confirm by the team on the official page.

## Code inspected
- `app/page.tsx`: section order. Support goes between `ForgeProcess` and `Studio`.
- `components/ForgeProcess.tsx`, `components/FollowUs.tsx`: section shell to match (`<section id aria-labelledby class="border-t border-anvil">`, `max-w-[1440px]` container, `stencil drop` heading with a `--wdth` value, `readout` labels, 12-column grid on `lg`).
- `components/SiteNav.tsx` and `components/SiteFooter.tsx`: link lists built from `t.nav.*`; the nav hides entries by breakpoint, so the new entry must be checked at 1440px and in the menu.
- `lib/sendForm.ts` → `previewState(param)`: reused for `?apoyo=gracias`.
- `lib/dictionary.ts`: `es` object, `Dict = typeof es`, `en: Dict`. New `support` block and `nav.support` in both.
- `data/studio.ts`, `data/site.ts`: data-file style (doc comment at the top, `{ es, en }` text, empty strings hide what's missing). `site.whatsapp` gives the number for the "Avísanos" link; until now only the chat assistant used it.
- `data/legal.ts`: `privacy` and `terms` as `Record<"es" | "en", LegalDoc>`, sections with `id`; `legalMeta.draft` is true. Terms have `demos` and `reservas`; privacy has `terceros`.
- `lib/assistantContext.ts`: one function per topic built with `section(title, lines)`, assembled in `buildAssistantContext()`.
- `app/globals.css`: tokens in `@theme`; materials `.btn-hot`, `.btn-steel`, `.stencil`, `.readout`, `.stamp`, `.plate`, `[data-heat]`; a global `:focus-visible` rule exists.
- `components/icons.tsx`: hand-drawn icons; a copy icon and a check icon may need adding there.

## Decisions and assumptions
- **Decision: Bre-B key and QR for Colombia, no gateway.** Rejected: Wompi's widget now. It keeps the donor inside the page and confirms payments, but takes 2.65% + $700 + IVA from each gift (about 7% of $20.000) and needs four server routes, three secrets and a webhook. The team is small and chose to keep the money and add the gateway later (002).
- **Decision: PayPal's Donate SDK for donors abroad.** Rejected: PayPal Checkout (Orders API). Checkout lets the site own the amount picker and verify the capture on the server, but needs a Business REST app, two routes and a secret. The Donate SDK works with a personal or business account, opens over the page and needs no server code. Its `onComplete` runs in the browser, so it only switches the section to its thank-you state; nothing of value depends on it.
- **Decision: the site never says a payment was received.** A Bre-B transfer happens in the donor's bank app and the site can't see it. The thank-you state thanks the intent ("Gracias por apoyar a Forest") and offers "Avísanos" on WhatsApp. Rejected: asking donors to upload proof or fill a form, which adds friction and stores personal data for no gain.
- **Decision: the payment step is a list of rails driven by `data/support.ts`** (`type: "breb" | "paypal"`, later `"wompi"`). Rejected: hard-coding two blocks, which would need a redesign when 002 arrives.
- **Decision: the section ships dark.** It renders only when at least one rail has its details filled in `data/support.ts`. Rejected: a "coming soon" state, which asks for money the visitor can't yet give. The nav and footer links follow the same condition.
- **Decision: the page says "apoyo / aporte", not "donación"**, and the terms say gifts are voluntary and not tax-deductible. A person receives the money and FMR isn't a non-profit; "donación" can suggest a deductible certificate. The anchor is `#apoyar`.
- **Decision: the PayPal script loads only when the visitor opens the PayPal step.** It isn't tracking and isn't loaded on page view, so it doesn't go behind the cookie banner, but the privacy page names PayPal as a third party. Rejected: `next/script` with `lazyOnload`, which would load PayPal for every visitor.
- **Decision: no totals, goal bar or donor names.** Nothing to show is real and consented yet (AGENTS.md section 10).
- **Assumption: suggested amounts** are $10.000, $20.000, $50.000 and $100.000 COP, shown as ideas next to the line that any amount counts. They aren't prices; the donor types the amount in their bank app. To confirm by the team; an empty list hides them.
- **Assumption: placement** after La forja and before Studio. One line to move in `app/page.tsx` if the team prefers elsewhere.
- **Assumption: the Bre-B key is created for this purpose** (alphanumeric or email type), not the person's phone number or cédula, because it is published.

## Files to touch
- `data/support.ts`: create. Rails (Bre-B: `key`, `qr` image path and size, `holder` name as the bank shows it; PayPal: `hostedButtonId` or `business`, `env`, optional `paypalMe` fallback link), `suggested` amounts, `uses: []` (spending list: `name`, `body`, optional `cost`, `status: "needed" | "bought"`), `recipient`, and `hasSupport` (true when any rail is usable). All empty for now.
- `components/Support.tsx`: create. The section: pitch, spending block (hidden when `uses` is empty), suggested amounts, rails, thank-you state.
- `components/support/PayPalDonate.tsx`: create. Injects the Donate SDK on demand, renders the button, handles load failure with the fallback link.
- `public/support/`: create when the team sends the QR image (WebP or PNG; keep it sharp, a QR must not be compressed into blur).
- `lib/dictionary.ts`: edit. `nav.support` and the `support` block, ES and EN.
- `app/page.tsx`: edit. `<Support />` between `<ForgeProcess />` and `<Studio />`.
- `components/SiteNav.tsx`, `components/SiteFooter.tsx`: edit. "Apoyar" / "Support" link to `/#apoyar`, only when `hasSupport`.
- `components/icons.tsx`: edit, if a copy, check or QR icon is needed.
- `lib/assistantContext.ts`: edit. `support()` topic: how to support, that any amount helps, what it funds, that it isn't tax-deductible; says "not available yet" when `hasSupport` is false.
- `data/legal.ts`: edit. Terms: new `aportes` section in ES and EN. Privacy: PayPal added under `terceros`; a line that the site doesn't process or store payment data. `legalMeta.updated` bumped; `draft` stays true.
- `app/globals.css`: edit only if a shared material is needed in two places; record it in `DESIGN.md`.
- `docs/`: see Vault updates.

## Requirements
1. With `data/support.ts` empty, the section, the nav link and the footer link don't render, and the build passes.
2. With a Bre-B key set, the section shows the key in mono type, a copy button, the holder's name, and three steps. With a QR path set, the QR shows too. On phones the copy button is the main action; from `lg` the QR leads.
3. The copy button writes the exact key to the clipboard, announces "Llave copiada" in an `aria-live` region, shows a copied state for a few seconds, and still lets the visitor select the key by hand if the clipboard API is blocked.
4. After a copy, a thank-you block appears with the "Avísanos" link: `https://wa.me/<site.whatsapp.number>?text=<prefilled message>` in the visitor's language, opened in a new tab. The text never claims a payment arrived.
5. With PayPal set, a "Desde otro país" rail shows a button. The first click loads the SDK and opens the PayPal popup; while it loads the button shows a loading state; if the script fails or times out, the button becomes a link to `paypalMe` when set, otherwise an error line with the contact email.
6. PayPal's `onComplete` switches the section to its thank-you state. Closing the popup returns to idle.
7. The spending block lists `uses` with name, description, optional cost in mono type and a needed / bought status that doesn't rely on colour alone. Empty list: the block isn't rendered.
8. Suggested amounts are plain text chips, not buttons, unless a rail can use them. Empty list: not rendered.
9. `?apoyo=gracias` shows the thank-you state without copying or paying. `?apoyo=demo` renders the section with clearly fake placeholder rails (key `llave-de-ejemplo`, no real account) so it can be reviewed before the real details arrive; this mode never appears without the parameter, and it is switched off on the live site (it works only in development and on Vercel preview deployments), so a fake key can never be shown to a real visitor.
10. All visible text comes from `lib/dictionary.ts` in ES and EN; all facts from `data/support.ts`.
11. No new dependency, no API route, no env var.
12. The hero is untouched; `hero.ctaJoin` stays.

## Copy (ES / EN)
Drafts. The impeccable pass may sharpen them; the meaning stays.

| Key | ES | EN |
| --- | --- | --- |
| `nav.support` | Apoyar | Support |
| `support.title` | Apoya a Forest | Support Forest |
| `support.lede` | Forest Media Récords desarrolla artistas emergentes desde Medellín. Cada aporte se convierte en equipos y herramientas para producir mejor música y mejor contenido. | Forest Media Récords develops emerging artists from Medellín. Every contribution becomes gear and tools for better music and better content. |
| `support.anyAmount` | No importa el monto: todo suma, todo se convierte en música. | The amount doesn't matter: it all adds up, it all turns into music. |
| `support.spark` | Tú pones la chispa, nosotros el trabajo. Sigamos. | You bring the spark, we bring the work. Let's keep going. |
| `support.usesTitle` | A dónde va tu aporte | Where your support goes |
| `support.needed` / `support.bought` | Por conseguir / Conseguido | Needed / Got it |
| `support.suggested` | Ideas, por si ayudan | Ideas, if they help |
| `support.breb.title` | Desde Colombia | From Colombia |
| `support.breb.sub` | Con tu llave Bre-B, desde cualquier banco o billetera. Llega completo, sin comisiones. | With a Bre-B key, from any bank or wallet. It arrives whole, with no fees. |
| `support.breb.key` | Llave | Key |
| `support.breb.holder` | A nombre de | In the name of |
| `support.breb.copy` / `copied` | Copiar llave / Llave copiada | Copy key / Key copied |
| `support.breb.steps` | Abre tu banco o billetera · Elige transferir con llave · Pega la llave y envía lo que quieras | Open your bank or wallet · Choose transfer with a key · Paste the key and send what you like |
| `support.breb.qr` | O escanea el código desde tu app | Or scan the code from your app |
| `support.paypal.title` | Desde otro país | From another country |
| `support.paypal.sub` | Con PayPal o tarjeta, en una ventana segura de PayPal. | With PayPal or a card, in a secure PayPal window. |
| `support.paypal.cta` / `loading` | Apoyar con PayPal / Abriendo PayPal… | Support with PayPal / Opening PayPal… |
| `support.paypal.error` | No pudimos abrir PayPal. Inténtalo otra vez o escríbenos a | We couldn't open PayPal. Try again or write to us at |
| `support.thanksTitle` | Gracias por apoyar a Forest | Thank you for supporting Forest |
| `support.thanksBody` | Si ya hiciste tu aporte, cuéntanos para darte las gracias como se debe. | If you've sent your support, tell us so we can thank you properly. |
| `support.tellUs` | Avísanos por WhatsApp | Tell us on WhatsApp |
| `support.tellUsMessage` | Hola, acabo de hacer un aporte a Forest Media Récords. | Hi, I just sent my support to Forest Media Récords. |
| `support.fine` | Los aportes son voluntarios y no son deducibles de impuestos. | Contributions are voluntary and not tax-deductible. |
| `support.terms` | Ver términos | See terms |

## Design and motion
Built with the impeccable skill (`shape`, then `craft`), inside the forge world of `DESIGN.md`.
- **Layout chosen by Daniel (2026-11-22): "The ingot".** The Bre-B key leads: one large steel plate with the key stamped in big mono type, the QR and the one hot "Copiar llave" button; the title ("Apoya a Forest", chosen over "Aviva la fragua"), the pitch and the three messages sit beside it; PayPal is a quieter steel row under the plate; the spending block is a rule-separated inventory below (mono costs), hidden while empty.
- **Signature moment:** copying the key is a hammer strike: the plate jumps to white heat, cools down the ramp, and a "Copiada" stamp is pressed on it.
- **Heat as state:** the section sits at working heat only where the visitor acts. The key plate is cold steel until copied, then runs up the heat ramp once (cherry → ember → white heat) and settles; the thank-you block holds that heat. No decorative glow elsewhere, no eyebrow labels, no glass (there's no photo or video behind it).
- **Type:** Saira Stencil for the title and rail titles, Archivo for the pitch, Martian Mono with `tabular-nums` for the key, costs and suggested amounts. The key must stay readable and selectable at 320px wide (wraps, never truncates).
- **Layout:** phone first: title, pitch, any-amount line, spending block, Bre-B rail (copy button full width, at least 48px tall), PayPal rail, fine print. From `lg`: 12 columns, the pitch and spending block on one side, the rails on the other; the QR leads the Bre-B rail.
- **QR:** shown on a light plate with a quiet zone so every bank app reads it, at a real size of at least 180px; `alt` text in both languages.
- **Motion:** CSS only. The section's blocks enter with the existing `drop` treatment; the heat run on copy is a short transition on colour and `transform`; under `prefers-reduced-motion` the state changes instantly with no run.
- **States:** hidden (no rails), idle, copied, PayPal loading, PayPal error, thank-you. Preview: `?apoyo=gracias`, `?apoyo=demo`.
- **Accessibility:** copy result announced politely; buttons have `focus-visible` and disabled states; status uses text plus colour; external links say they open a new tab.

## Security, privacy and money
- No secrets, no env vars, no server code. The Bre-B key, the QR and the PayPal button id are public by nature and live in `data/support.ts`.
- The site handles no payment data. PayPal runs in its own popup; Bre-B runs in the donor's bank app.
- The published key should be one created for this purpose, not a phone number or cédula. The holder's name appears because bank apps show it to the payer anyway and the terms must say who receives the money; the team confirms the exact name.
- PayPal's script comes from `paypalobjects.com` and loads only on the visitor's click. Privacy (`terceros`) names PayPal and says the site doesn't receive card details. No cookie or storage key is added by the site.
- Terms, new `aportes` section: contributions are voluntary; nothing is given in exchange; they aren't tax-deductible; who receives them; they're used for production equipment and tools; refunds only for a mistaken transfer, by writing to the contact email. This is a draft under the existing `draft` flag: the team and, ideally, a lawyer confirm it. I'm not writing final legal terms.
- "Avísanos" opens WhatsApp with a prefilled message; nothing is sent or stored by the site.
- Nothing invented: no totals, goals, donor names, or spending items until the team sends real ones.
- Vercel: the Hobby terms allow only personal or non-commercial use, and whether asking for support counts is unclear. Raise before going live (roadmap item: move to Pro).

## Cost impact
- Bre-B: $0 per transfer between people today.
- PayPal: no monthly fee; about 4.4% to 5.4% + US$0.30 on each international payment plus conversion on withdrawal (to confirm on PayPal's official fee page).
- Site: no new service, no API calls. Possible Vercel Pro at US$20 per month, already on the roadmap.

## Vault updates
- `docs/Features/Support.md` (new, from `docs/Templates/Feature.md`), linked from `docs/Home.md` in page order.
- `docs/Decisions/Support starts with Bre-B and PayPal, gateway later.md` and `docs/Decisions/Support section ships dark until the accounts exist.md` (from the Decision template).
- `docs/Daily/2026-11-22.md` (or the day of the build): log bullets.
- `docs/Project/Roadmap.md`: the gateway (002) under "Next features"; the Vercel Pro item gets a note that support makes it urgent.
- `docs/Project/Open questions.md`: Bre-B key and QR, holder's name as shown, PayPal account and button id, spending list, suggested amounts, refund wording, Vercel plan.
- `docs/Features/Legal pages.md`, `docs/Features/Chat assistant.md`, `docs/Features/Navigation and footer.md`: one line each.
- `DESIGN.md`: only if a shared material or pattern is added.

## Acceptance criteria
- [ ] Empty `data/support.ts`: no section, no nav link, no footer link; `npm run build` passes.
- [ ] `?apoyo=demo`: the whole section is reviewable with fake rails, in ES and EN, at 320px, 390px and 1440px, with no horizontal scroll.
- [ ] Copy button copies the exact key, announces it, and the thank-you block appears with a working WhatsApp link.
- [ ] PayPal rail: the SDK isn't requested until the click (checked in the network panel on `npm run build && npm start`); sandbox payment completes and shows the thank-you state; closing the popup returns to idle; a blocked script shows the fallback.
- [ ] Reduced motion: no heat run, state changes are instant.
- [ ] Keyboard only: every control reachable, focus visible, results announced.
- [ ] Terms and privacy show the new text in both languages with the draft tag.
- [ ] The chat assistant answers "¿cómo puedo apoyar?" from the data, and says it isn't open yet when the data is empty.
- [ ] The impeccable detector raises nothing new, or each flag is explained.
- [ ] Vault check passes.

## Checks
- [ ] `npx tsc --noEmit`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run build && npm start` (the PayPal script loads only on click)
- [ ] Click-through: phone and desktop, ES and EN, reduced motion, `?apoyo=demo` and `?apoyo=gracias`
- [ ] `python3 .claude/skills/obsidian-gardener/scripts/check_vault.py docs`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000/`. With the data empty, confirm there's no "Apoyar" in the nav, menu or footer and no section between La forja and Estudio.
2. Open `http://localhost:3000/?apoyo=demo#apoyar`. Read the section in Spanish, switch to English, resize to a phone width.
3. Click "Copiar llave", paste somewhere: it should read `llave-de-ejemplo`. Confirm the thank-you block and that "Avísanos por WhatsApp" opens WhatsApp with the prefilled text.
4. Open `http://localhost:3000/?apoyo=gracias#apoyar`: the thank-you state shows directly.
5. Turn on reduced motion in the OS and repeat step 3: no animation, same result.
6. Tab through the section with the keyboard only.
7. When the team sends real details: fill `data/support.ts` (PayPal `env: "sandbox"` first), reload without parameters, and run a sandbox payment; then scan the QR with two different bank apps and check the recipient's name, and send one small real transfer.
8. Open `/terminos` and `/privacidad` and read the new text in both languages.
9. Ask the chat "¿cómo puedo apoyar a Forest?" and check the answer matches the data.

## Needed from the team before going live
- The Bre-B key created for this, the QR image if the app offers one, and the holder's name as the bank shows it.
- The PayPal account's Donate button id (or account email) and, optionally, its PayPal.me link.
- The spending list, the suggested amounts, and the refund wording.
- The decision on the Vercel plan.

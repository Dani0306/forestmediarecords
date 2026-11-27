# 002 · Support gateway: PayPal Checkout + Wompi (Plan A)

**Date:** 2026-11-22 · **Branch:** not started · **Status:** deferred

> Kept for later. On 2026-11-22 the team chose to start with the low-fee version (`prompts/001-donation-system.md`: Bre-B key + PayPal Donate button, no gateway) and to add this gateway once contributions justify the fees. This file is the plan as approved that day, not yet a full implementation prompt: before building it, re-read the provider docs (fees, SDK versions and limits will have moved), turn it into a prompt from `prompts/_template.md`, and get approval.
>
> What 001 already delivers and this plan reuses: the section (`components/Support.tsx`, `#apoyar`), its copy, `data/support.ts`, the legal text, the nav and footer links and the vault notes. This plan adds payment rails to that section; it does not redesign it.


## Context

FMR wants visitors to support the label with money that goes to the gear it needs for music and content production. The site today has no way to take money. This plan adds a section on the landing page that explains why to give and how the money is used, with payment inside the page, at no fixed monthly cost.

Your decisions so far:
- **Payments:** PayPal (international) + Wompi (Colombia).
- **Account owner:** a person on the team, not a registered company.
- **Spending list:** not ready; the section is built ready to fill and that block stays hidden until the team sends real items.

## Recommended tools and services

| Need | Choice | Cost | Why |
| --- | --- | --- | --- |
| International donors | **PayPal Business account** (a person can open one) + PayPal Checkout (JS SDK v6 + Orders API) | No monthly fee. About 5.4% + US$0.30 per international payment, plus about 3.5% conversion when withdrawing to pesos (third-party figures; confirm on PayPal Colombia's fee page) | Works from almost any country, pays in a popup without leaving the page, withdraws to a Colombian bank or Nequi |
| Colombian donors | **Wompi** (Bancolombia) widget | No monthly fee. 2.65% + $700 COP + IVA on the fee, successful payments only | Nequi, PSE, Bancolombia, Daviplata and cards in pesos; foreign cards with no surcharge; opens over the page |
| Receipts to the team | **Resend** (already in use) | Free tier | An email to the label for every completed payment |
| Rate limit and duplicates | **Upstash Redis** (already wired for the Tiraderas winners) | Free tier | Stops abuse of the order endpoints; makes the Wompi webhook safe to retry |
| Hosting | Vercel (current) | See risk 1 | |
| Framework, UI | Next.js 16, React 19, Tailwind v4, `/impeccable` | Free | No new libraries; the PayPal and Wompi scripts load only when the visitor opens the payment step |

Considered and not chosen: Stripe (I couldn't confirm it opens accounts for Colombian owners), Ko-fi / Buy Me a Coffee (the donor leaves the site, and payouts still depend on PayPal or Stripe), Mercado Pago (a fair alternative to Wompi; Wompi reaches Nequi and Bancolombia users at similar fees), PayPal's simple Donate button (kept as the fallback if Checkout can't be enabled on the account).

## What gets built

### 1. The section (`components/Support.tsx`, anchor `#apoyar`)
Designed with `/impeccable` (shape, then craft) inside the forge world. Concept: **the visitor's contribution is fuel for the forge.**
- **Why:** a short pitch, then the spending block ("A dónde va tu aporte"), rendered from `data/support.ts` and hidden while the list is empty.
- **How much:** amount tiles plus a free amount. The fire responds to the choice (heat as state of the selection, which fits the design rule that heat is state, not decoration).
- **Pay:** two rails. "Nequi, PSE o tarjeta" (Wompi, COP) and "PayPal o tarjeta internacional" (USD). Spanish shows Wompi first, English shows PayPal first; both are always available.
- **States:** idle, processing, thank you, cancelled, error. Preview without paying: `?apoyo=gracias|error|procesando`, the same way `previewState()` in `lib/sendForm.ts` works for the forms.
- **Placement:** after La forja (`ForgeProcess`) and before `Studio`, so the story of how FMR develops artists leads into the ask. Adds a nav entry ("Apoyar" / "Support") in `components/SiteNav.tsx` and a footer link in `components/SiteFooter.tsx`. The hero is not touched.
- **Ships dark:** the section renders only when at least one rail has its public key set, so the code can merge before the accounts exist.

Draft messages (final wording comes out of the impeccable pass; all go in `lib/dictionary.ts` under `support`, ES and EN):

| ES | EN |
| --- | --- |
| Aviva la fragua | Fuel the forge |
| No importa el monto: todo se convierte en música. | The amount doesn't matter: all of it turns into music. |
| Cada aporte va directo a equipos y herramientas para producir mejor música y mejor contenido. | Every contribution goes straight into gear and tools for better music and better content. |
| Tú pones la chispa, nosotros el trabajo. Sigamos. | You bring the spark, we bring the work. Let's keep going. |
| Gracias. La fragua arde más fuerte gracias a ti. | Thank you. The forge burns hotter because of you. |

Wording: I recommend **"apoyo / aporte"** on the page, not "donación". A person receives the money and FMR is not a non-profit, so no tax-deductible certificate exists; "donación" can suggest one. The terms page states this plainly.

### 2. Content and copy
- `data/support.ts` (new): preset amounts per currency, minimums, the spending list (`uses: []`, each with name, description, optional cost, status needed/bought), and `recipient` (who receives the money). Doc comment at the top like `data/studio.ts`.
- `lib/dictionary.ts`: `support` block and `nav.support`, both languages (`en: Dict` makes `tsc` fail if one is missing).
- Preset amounts to confirm with the team (suggested: US$5 / 10 / 25 / 50, minimum US$2; $10.000 / 20.000 / 50.000 / 100.000 COP, minimum $5.000, because fixed fees eat tiny payments).

### 3. PayPal rail
- Client: `components/support/PayPalPay.tsx` loads SDK v6 (`/web-sdk/v6/core`) on demand, `createInstance({ clientId, components: ["paypal-payments"] })`, `<paypal-button>`.
- Server (new route handlers, written like `app/api/contact/route.ts`: env doc comment, capped inputs, `{ ok }` answers, graceful 503 without keys):
  - `app/api/support/paypal/order/route.ts`: validates the amount on the server (integer cents, min/max from `data/support.ts`), gets an OAuth token, calls `POST /v2/checkout/orders` (`intent: CAPTURE`, USD).
  - `app/api/support/paypal/capture/route.ts`: calls `POST /v2/checkout/orders/{id}/capture` and treats the payment as done only when PayPal's own response says `COMPLETED` with the expected amount and currency. This server-side answer is the proof; no webhook is needed for PayPal in v1.

### 4. Wompi rail
- Client: `components/support/WompiPay.tsx` loads `https://checkout.wompi.co/widget.js` on demand and opens `WidgetCheckout`.
- Server:
  - `app/api/support/wompi/checkout/route.ts`: validates the amount, creates a unique reference, and computes the integrity signature on the server (`SHA256(reference + amountInCents + "COP" + integritySecret)`).
  - `app/api/support/wompi/events/route.ts`: the webhook. Verifies the checksum (`signature.properties` values + `timestamp` + events secret, SHA256, compared case-insensitively), ignores anything that fails, answers 200, and is idempotent (Upstash `SET NX` on the transaction id) because Wompi retries.
  - The thank-you state is confirmed by a server-side lookup of the transaction on Wompi's API, never by the widget's callback or the redirect alone.

### 5. Shared server pieces
- `lib/payments.ts` (server use only): amount validation, a rate limit on order creation backed by Upstash (the in-memory limiter in the contact route resets on cold starts and isn't enough here), and `notifySupport()` which emails the label through Resend (amount, currency, method, provider transaction id; no card or personal data).
- No database. The PayPal and Wompi dashboards are the ledger. No public totals, goal bar or donor names in v1 (nothing shown that isn't real and consented).

### 6. Around the feature
- `data/legal.ts`: terms get a "Aportes" section (voluntary, nothing given in exchange, not tax-deductible, who receives the money, refunds); privacy names PayPal and Wompi as processors and says the site never sees or stores card data. Both stay under the existing `draft` flag for legal review.
- `lib/assistantContext.ts`: a `support()` section so the chat can answer "¿cómo puedo apoyar?".
- `.env.example`: `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_ENV` (sandbox | live), `NEXT_PUBLIC_WOMPI_PUBLIC_KEY`, `WOMPI_INTEGRITY_SECRET`, `WOMPI_EVENTS_SECRET`.
- Vault: `docs/Features/Support.md`, decision notes ("Support goes through PayPal and Wompi", "Support section ships dark until the accounts exist"), today's daily note, roadmap, open questions, and `DESIGN.md` if a new shared material appears.

## Order of work

1. **Prompt file.** Write `prompts/001-donation-system.md` from this plan (AGENTS.md step 4), then branch `feat/donation-system`.
2. **Design.** `/impeccable shape` then `craft` for the section with all states and preview URLs, no real payments yet.
3. **PayPal rail** against the sandbox.
4. **Wompi rail** against the sandbox.
5. **Legal, assistant, nav, footer, vault.**
6. **Checks**, then you review on a Vercel preview. Nothing is pushed to `main` without your yes.
7. **Go live** (your call): live keys in Vercel, Wompi events URL set to the production route, one small real payment on each rail.

In parallel, the team does this (I can't do it for you):
- Open the **PayPal Business** account under the person's name, link the bank account or Nequi, and create a REST app (sandbox and live keys) at developer.paypal.com.
- Sign up at **Wompi** as persona natural (cédula, RUT and a bank account are the usual requirements; confirm on wompi.co) and copy the public key, integrity secret and events secret.
- Send: the recipient's name as it should appear on the site, the spending list when ready, confirmation of the preset amounts, and the refund wording.

## Risks and open points

1. **Vercel plan.** The Hobby terms (updated 19 Oct 2026) allow only "personal or non-commercial use". Sources conflict on whether asking for donations counts, and the site already advertises paid studio services. The roadmap already lists moving to Pro (US$20/month); do that, or get Vercel's answer in writing, before going live. This is the one fixed cost that may be unavoidable.
2. **Money lands in a personal account.** The site must say who receives it, and that person carries the income for tax purposes. Worth a short talk with an accountant; I'm not giving tax advice.
3. **PayPal fees and withdrawal costs** come from third-party pages (PayPal's fee page blocks automated reading, and sources range from 4.4% to 5.4%). Check the official page while logged in.
4. **Card payment without a PayPal account** inside the PayPal popup is not confirmed for Colombian accounts. If it isn't offered, Wompi covers cards.
5. **If PayPal Checkout can't be enabled** on the account, fall back to PayPal's Donate SDK (popup, works with a personal account, PayPal's own amount screen). Smaller build, less control over the design.
6. **Wompi minimum amount and sign-up requirements** weren't readable (the pricing page blocks automated reading); confirm during sign-up.

## Files

New: `components/Support.tsx`, `components/support/PayPalPay.tsx`, `components/support/WompiPay.tsx`, `data/support.ts`, `lib/support.ts` (client helpers + preview states), `lib/payments.ts`, `app/api/support/paypal/order/route.ts`, `app/api/support/paypal/capture/route.ts`, `app/api/support/wompi/checkout/route.ts`, `app/api/support/wompi/events/route.ts`, `prompts/001-donation-system.md`, `docs/Features/Support.md`, two `docs/Decisions/` notes.

Edited: `app/page.tsx`, `components/SiteNav.tsx`, `components/SiteFooter.tsx`, `lib/dictionary.ts`, `lib/assistantContext.ts`, `data/legal.ts`, `.env.example`, `app/globals.css` (only if a shared material is needed), `DESIGN.md`, vault notes.

Reused: `previewState()` in `lib/sendForm.ts`, the route conventions and Resend call in `app/api/contact/route.ts`, the Upstash REST pattern in `app/api/winners/route.ts`, `useLang()` in `lib/i18n.tsx`, materials in `app/globals.css` (`.btn-hot`, `.btn-steel`, `.plate`, `.readout`, `.stamp`, `[data-heat]`).

## Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- `npm run dev`: the section at phone width and desktop, in ES and EN, with reduced motion, through `?apoyo=gracias|error|procesando`.
- **PayPal sandbox:** pay with a sandbox buyer; the capture route returns completed, the thank-you state shows, the label gets the email. Cancel the popup: the cancelled state shows and nothing is recorded. Send a tampered amount to the order route: rejected.
- **Wompi sandbox:** pay with Wompi's test card and test Nequi number (approved and declined); the webhook verifies and emails once; replay the same event: no second email; send an event with a wrong checksum: ignored.
- Without any keys set: the section doesn't render and the build passes.
- `npm run build && npm start`: the payment scripts don't load until the visitor opens the payment step.
- Vault check: `python3 .claude/skills/obsidian-gardener/scripts/check_vault.py docs`.


## Sources

- PayPal: [Donate SDK](https://developer.paypal.com/sdk/donate/), [Checkout quick start (SDK v6)](https://developer.paypal.com/checkout/integrate), [webhooks](https://developer.paypal.com/api/rest/webhooks/rest/), [seller fees, Colombia](https://www.paypal.com/co/business/paypal-business-fees)
- PayPal in Colombia (third party): [Wise](https://wise.com/co/blog/para-recibir-dinero-en-paypal-tengo-que-pagar), [La República on Nequi withdrawals](https://www.larepublica.co/finanzas/union-entre-nequi-y-paypal-permitira-a-clientes-hacer-retiros-internacionales-2775164), [Meru](https://getmeru.com/blog/finanzas-internacionales/comisiones-de-paypal/)
- Wompi: [widget and web checkout](https://docs.wompi.co/docs/colombia/widget-checkout-web/), [events](https://docs.wompi.co/docs/colombia/eventos/), [Plan Avanzado](https://wompi.com/es/co/planes-tarifas/plan-avanzado-agregador), [gateway comparison](https://btodigital.com/pasarelas-pago-colombia-comparativa-guia-negocio/)
- Vercel: [Hobby plan](https://vercel.com/docs/plans/hobby), [terms](https://vercel.com/legal/terms), [fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines), [pricing](https://vercel.com/pricing)
- Stripe: [availability by country](https://support.stripe.com/questions/stripe-feature-availability-by-country)

---
type: decision
status: accepted
date: 2026-11-22
tags:
  - decision
---

# Support starts with Bre-B and PayPal, gateway later

## Context
The team wants visitors to support the label with money for production equipment, at no fixed cost and losing as little as possible to fees. Two plans were written on 2026-11-22. Plan A: a payment gateway inside the page (PayPal Checkout plus Wompi for Nequi, PSE and cards), which confirms payments but takes about 2.65% + $700 + IVA from each Colombian payment and needs server routes, secrets and a webhook. Plan B: publish a Bre-B key and QR (free transfers from any Colombian bank or wallet) plus PayPal's Donate popup for donors abroad, with no server code.

## Decision
Build Plan B now and keep Plan A for later (Daniel, 2026-11-22). The account belongs to a person on the team, not a registered company. The page says "apoyo / aporte" instead of "donación" and states that contributions are voluntary and not tax-deductible.

## Consequences
- Colombian gifts arrive whole; PayPal's fee applies only to payments from abroad.
- The donor finishes a Bre-B transfer in their own bank app, so the site can't confirm a payment and never claims one; the team checks the bank app. The thank-you state offers "Avísanos por WhatsApp".
- No card or PSE payments from Colombia until the gateway is added.
- The payment step in [[Support]] is driven by `data/support.ts`, so Wompi can join as another way to give without a redesign. Plan A lives in `prompts/002-support-gateway-paypal-wompi.md`; re-read the providers' docs before building it.
- Money lands in a personal account: the terms must say who receives it, and that person carries the income for tax purposes.
- Vercel Hobby allows only personal or non-commercial use; settle the plan before going live.
- 2026-11-26: proof of a transfer is now asked for by WhatsApp ("Enviar comprobante"), optional, and it is the way onto the supporters board ([[Top supporters are listed by consent and edited by hand]]).

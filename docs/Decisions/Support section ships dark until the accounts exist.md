---
type: decision
status: accepted
date: 2026-11-22
tags:
  - decision
---

# Support section ships dark until the accounts exist

## Context
The [[Support]] section was built before the team had a Bre-B key, a PayPal button or a spending list. The site never shows invented content ([[Placeholder content policy]]), and a "coming soon" block would ask for money the visitor can't yet give.

## Decision
The section, its nav link, its footer link and its legal texts render only when `data/support.ts` holds at least one way to give (`hasSupport`). To review the design before that, a preview mode (`?apoyo=demo` and its variants, see `lib/support.ts`) shows stand-in details tagged "Ejemplo". It works on localhost and Vercel preview addresses only, never on the live domains, so a fake key can't reach a real visitor.

## Consequences
- The code can merge and deploy without changing the live site.
- Going live is a data edit: fill `data/support.ts` and add the QR to `public/support/`.
- The chat assistant says support isn't available on the site yet until then (`supportInfo()` in `lib/assistantContext.ts`).
- The spending block and the suggested amounts have their own empty states, so the section can go live with a key alone.

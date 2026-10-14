---
type: decision
status: accepted
date: 2026-10-13
tags:
  - decision
related:
  - "[[Legal pages]]"
  - "[[Deploy on Vercel]]"
---

# Analytics after cookie consent

## Context
The team wants visitor and page stats. The privacy policy (`data/legal.ts`) already says measurement tools run only if the visitor accepts all cookies.

## Decision
Use Vercel Web Analytics (`@vercel/analytics`, `<Analytics />` from `@vercel/analytics/next`), wrapped in `components/SiteAnalytics.tsx` and rendered from `app/layout.tsx`. It mounts only when `readConsent()?.choice === "all"`; the cookie banner fires `fmr:consent` on every choice so tracking starts without a reload, and a `beforeSend` check drops events if the visitor later switches to "Solo necesarias".

## Consequences
- Web Analytics must be enabled once in the Vercel dashboard (project → Analytics → Enable); data appears after the next deploy.
- Stats count only visitors who accept all cookies, so they undercount real traffic. Vercel Web Analytics sets no cookies, so loading it for everyone is possible, but the privacy policy text would have to change first.
- The script is served from `/_vercel/insights/script.js` and only exists on Vercel; locally it 404s, which is harmless.

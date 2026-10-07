---
type: feature
status: building
date: 2026-10-06
code: "app/privacidad/page.tsx"
tags:
  - feature
related:
  - "[[Navigation and footer]]"
  - "[[Studio]]"
---

# Legal pages

**Code:** `app/privacidad/page.tsx`, `app/terminos/page.tsx`, `components/LegalPage.tsx`, `data/legal.ts`, `components/CookieBanner.tsx`

## What it does
- `/privacidad`: privacy policy written for Colombia (Ley 1581 de 2012, Decreto 1377 de 2013): controller, data collected (demos, bookings, browser preferences), purposes, cookies, sharing, rights, how to exercise them (10/15 business days), retention, security, minors, changes.
- `/terminos`: site use, IP, demo submissions (artists keep their rights), studio bookings (COP, request until confirmed), external links, events, liability, Colombian law and Medellín courts.
- Reading layout: sticky numbered contents, 68ch column, "Borrador · pendiente de revisión legal" tag while `legalMeta.draft` is true. Both languages.
- **Cookie notice**: bottom plate until the visitor picks "Aceptar todas" or "Solo necesarias" (stored as `fmr-consent` in localStorage); "Preferencias de cookies" in the footer reopens it.

## Open issues
- [ ] Lawyer review, then set `draft: false`
- [ ] Company NIT and address (`legalMeta` in `data/legal.ts`)
- [ ] Load analytics only after `choice === "all"` if analytics are added

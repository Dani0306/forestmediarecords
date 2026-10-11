---
type: feature
status: building
date: 2026-10-06
code: "components/Studio.tsx"
tags:
  - feature
related:
  - "[[Studio booking is a request]]"
  - "[[Legal pages]]"
---

# Studio

**Code:** `components/Studio.tsx`, `data/studio.ts`, `lib/booking.ts`

## What it does
"Reserva el estudio", anchor `#estudio` (desktop nav from 1440px; menu and footer always), after [[La forja]] and before the [[Demo form]].
- **Rate card** (prices from Daniel, COP; recording price and service texts from RS el Italiano, 2026-10-10): Instrumental original $500.000 · Sesión de grabación $150.000 (demo only, with direction in the booth) · Producción, mezcla y máster $200.000 · Producción completa $600.000 (from scratch: exclusive beat, recording, mix and final master; tagged "Todo en uno"; its body lists what is included, so it has no "Incluye" line) · Arriendo del estudio $100.000 per 4 hours. Each row's "Reservar" preselects the service and scrolls to the form.
- **Booking form** in three numbered steps: service (radio tiles), date (from tomorrow) and time slot (sample hours) plus 4-hour blocks for rentals, then contact details (name, artist name optional, email, WhatsApp, notes). A sticky summary shows the choice and the estimated total, the disclaimer that it's a request, and consent links to the terms and privacy policy.
- States: validation errors, sending, error (with email fallback) and "Solicitud enviada".

## Open issues
- [ ] **Design only**: wire `requestBooking()` in `lib/booking.ts` to the real backend (Daniel will do the logic)
- [ ] Real studio hours (`slots` in `data/studio.ts` are samples)
- [ ] Deposit, cancellation and rescheduling policy (placeholder in the terms)
- [x] Does "Producción completa" also include mix and master? Yes (2026-10-10).
- [ ] Is "Instrumental original" ($500.000) still offered? It was not in the 2026-10-10 service list.

## Decisions
[[Studio booking is a request]]

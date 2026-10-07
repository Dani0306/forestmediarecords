---
type: decision
status: accepted
date: 2026-10-06
tags:
  - decision
---

# Studio booking is a request

## Context
Daniel asked for a prices section and a booking design for the recording studio, and will build the booking logic himself.

## Decision
- The form sends a **request**, not a confirmed booking: the copy says Forest confirms availability and payment by email or WhatsApp before charging anything.
- Contact details: full name, optional artist name, email and WhatsApp (the channel used in Medellín), plus optional notes.
- Prices are shown as a rule-separated rate card in mono (COP), not as pricing cards; "Producción completa" is the one highlighted row.
- All sending goes through `requestBooking()` in `lib/booking.ts` so the backend can be swapped in without touching the UI.

## Consequences
- Until the backend exists, the form shows "Solicitud enviada" without sending anything; don't deploy it publicly before wiring it.

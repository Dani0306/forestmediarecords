---
type: feature
status: built
date: 2026-10-05
code: "components/DemoForm.tsx"
tags:
  - feature
related:
  - "[[Placeholder content policy]]"
---

# Demo form

**Code:** `components/DemoForm.tsx`

## What it does
"¿Tienes música?" / "Got music?". Fields: artist name, email, music link (required), city and message (optional). Validates inline, then posts to `app/api/contact/route.ts`, which emails **`forestmediarecords@gmail.com`** (`site.contactEmail`) through Resend with the artist as reply-to (since 2026-10-11, [[Forms send through Resend]]); demos go by email by decision. If the email is ever emptied, the form closes again ("Los envíos abren muy pronto").

States (2026-10-06): sending (pulsing dot, "Enviando…"), **error** (cherry alert with the email fallback, button becomes "Reintentar", fields keep their values) and **thanks** (the form is replaced by "¡Gracias por aplicar!" with what happens next and "Enviar otra demo"). Sending lives in `lib/demo.ts` → `sendDemo()`; preview with `?demo=sent` or `?demo=error`.

## Open issues
- [x] Real send instead of the `mailto:` hand-off (2026-10-11): errors and thanks now reflect the actual send
- [x] Resend live (2026-10-11): domain verified, key in Vercel Production; test sends from local and production returned 200
- [ ] Optional: confirmation email to the applicant

## Decisions
[[Placeholder content policy]]

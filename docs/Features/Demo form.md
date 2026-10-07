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
"¿Tienes música?" / "Got music?". Fields: artist name, email, music link (required), city and message (optional). Validates inline, then opens a pre-filled `mailto:` to **`forestmediarecords@gmail.com`** (`site.contactEmail`); demos go by email by decision. If the email is ever emptied, the form closes again ("Los envíos abren muy pronto").

States (2026-10-06): sending (pulsing dot, "Enviando…"), **error** (cherry alert with the email fallback, button becomes "Reintentar", fields keep their values) and **thanks** (the form is replaced by "¡Gracias por aplicar!" with what happens next and "Enviar otra demo"). Sending lives in `lib/demo.ts` → `sendDemo()`; preview with `?demo=sent` or `?demo=error`.

## Open issues
- [ ] Replace the `mailto:` hand-off in `lib/demo.ts` with a real endpoint so errors and thanks reflect a real send (today the thanks note asks the visitor to hit send in their mail app)

## Decisions
[[Placeholder content policy]]

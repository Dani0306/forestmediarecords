---
type: feature
status: built
date: 2026-10-05
code: "lib/dictionary.ts, lib/i18n.tsx"
tags:
  - feature
related:
  - "[[Bilingual client-side copy]]"
---

# Bilingual copy

**Code:** `lib/dictionary.ts, lib/i18n.tsx`

## What it does
Spanish by default, English toggle. `LangProvider` keeps the choice in `localStorage` (`fmr-lang`) and sets `<html lang>`. Every visible string has ES and EN keys; dates format with `es-CO` / `en-US` in `America/Bogota`. Metadata (title, description, OG) is Spanish.

## Open issues
- [ ] Client-side only: search engines index the Spanish version

## Decisions
[[Bilingual client-side copy]]

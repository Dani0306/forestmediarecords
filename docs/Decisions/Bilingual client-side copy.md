---
type: decision
status: accepted
date: 2026-10-05
tags:
  - decision
---

# Bilingual client-side copy

## Context
The audience is Medellín/LATAM plus partners; the team chose ES/EN.

## Decision
Spanish default with an English toggle, implemented client-side (`lib/i18n.tsx`), all copy in `lib/dictionary.ts`.

## Consequences
Simple and instant switching. Trade-off: one URL, so search engines index the Spanish version; locale routes are an option later.

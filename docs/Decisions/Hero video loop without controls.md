---
type: decision
status: accepted
date: 2026-10-06
tags:
  - decision
---

# Hero video loop without controls

## Context
The hero background video (`public/videoloop-web.webm`) shows the company's latest productions. A pause button was added for accessibility and later removed.

## Decision
The video stays a muted, silent loop with **no pause button**. It pauses automatically when the hero is off-screen, and visitors who prefer reduced motion see the still poster instead of the loop.

## Consequences
- Cleaner hero; unused pause/play code removed from `components/Hero.tsx`.
- Trade-off: WCAG 2.2.2 recommends a pause control for moving content longer than 5 seconds; the reduced-motion fallback covers the visitors most affected.
- When new productions are ready, replace the file with a re-encoded loop (see [[Content guide]]).

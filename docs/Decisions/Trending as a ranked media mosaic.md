---
type: decision
status: accepted
date: 2026-10-06
tags:
  - decision
---

# Trending as a ranked media mosaic

## Context
The team asked for an "En tendencia" section showing the latest productions and projects as cards with images, details on black blur, and short 4–8 s videos that play in a loop on hover.

## Decision
- A ranked mosaic (lead piece large, the rest smaller) rather than a carousel, so it reads differently from the [[Agenda]]; a snap strip on mobile.
- Rank is shown as temperature (heat-coloured numerals), keeping the forge rule that colour means state.
- Clips are muted WebM loops with a poster frame; they load only when played (`preload="none"`). Touch screens play the card in view, since hover does not exist there. A play button covers keyboard and reduced-motion users.
- The glass under the details is a pre-blurred copy of the poster or still (no live backdrop-filter), like the agenda cards.

## Consequences
- New content goes in `data/trending.ts` plus files in `public/trending/`.
- Clips cut in the browser with MediaRecorder need their duration written into the file (done for clip-01/02), or the progress line cannot work.

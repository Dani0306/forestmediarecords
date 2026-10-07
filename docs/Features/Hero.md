---
type: feature
status: built
date: 2026-10-05
code: "components/Hero.tsx"
tags:
  - feature
related:
  - "[[Main and secondary events]]"
  - "[[Hero video replaces forge bar]]"
  - "[[Performance pass]]"
  - "[[Hero video loop without controls]]"
---

# Hero

**Code:** `components/Hero.tsx`

## What it does
Full-viewport opening.
- **Background**: `public/videoloop-web.webm`, a loop of the company's latest productions (muted, no controls by design, poster `videoloop-poster.webp`), dark scrims, pauses when off-screen; reduced motion shows the poster.
- **Left**: stencil headline (copy key `hero.lines`, now "Forest / Media / Récords"), lede, hot button "Forma parte de Forest Media Récords" (`hero.ctaJoin` → `#demos`) and "Ver en Kick".
- **Right**: the **main event field**: the next `featured` event on `.glass-side` black glass with its photo, date, title and a per-second countdown.
- **Scroll**: as the hero leaves, the video pushes in slightly and the headline column lifts and fades (CSS view timeline).
- **Secondary strip**: the heat line with the next non-featured event; **commented out on purpose** in `Hero.tsx` until the first real secondary event exists.

## Open issues
- [ ] Uncomment the secondary strip when a real secondary event exists

## Decisions
[[Main and secondary events]], [[Hero video replaces forge bar]], [[Performance pass]], [[Hero video loop without controls]]

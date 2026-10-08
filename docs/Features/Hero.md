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
- **Event takeover** (2026-10-07): while a `main: true` event is upcoming or live, the whole first screen becomes that event: poster whole on the left over its own blurred glow, "Forest Media Récords presenta", huge title, Hoy/Mañana chip, a giant four-cell countdown (EN VIVO when live), and Ver en Kick / Agregar al calendario / Ver toda la agenda. With no main event the video hero (left column only) comes back.
- **Scroll**: as the hero leaves, the video pushes in slightly and the headline column lifts and fades (CSS view timeline).
- **Secondary strip** (on since 2026-10-08): the soonest upcoming `main: false` event along a heat line at the bottom of the first screen, in both hero modes (video hero and event takeover): state, date, title, meta, live countdown, sample tag, action. Not rendered when there is no secondary event.

## Open issues

## Decisions
[[Main and secondary events]], [[Hero video replaces forge bar]], [[Performance pass]], [[Hero video loop without controls]]

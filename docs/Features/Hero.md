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
- **Background**: `public/videoloop-hero-2.mp4` + `videoloop-hero-2.webm` (since 2026-10-20: a new 16:9 studio clip of RS el Italiano, 1024×576, 16.6 s, supplied by the team as `public/poster1.webm`, which replaced the first 9 s version, `poster.webm`; replaced the 4:3 `videoloop-renzo.*` of 2026-10-09), a loop of the company's latest productions (muted, no controls by design, poster `videoloop-hero-2-poster.webp`). Crop: `object-[50%_30%]` on phones (a narrow slice of the 16:9 frame; he stays in it for almost the whole clip) and `52% 40%` from 1024px, dark scrims, pauses when off-screen; reduced motion shows the poster.
- **Left**: stencil headline (copy key `hero.lines`, now "Forest / Media / Récords"), lede, hot button "Forma parte de Forest Media Récords" (`hero.ctaJoin` → `#demos`) and steel "Ver en YouTube" with the YouTube mark (`hero.ctaYouTube` → the label channel youtube.com/@forestmediarecords from `site.socials`; was "Ver en Kick" until 2026-10-13).
- **Event takeover** (2026-10-07): while a `main: true` event is upcoming or live, the whole first screen becomes that event: poster whole on the left over its own blurred glow, "Forest Media Récords presenta", huge title, Hoy/Mañana chip, a giant four-cell countdown (EN VIVO when live), and Ver en Kick / Agregar al calendario / Ver toda la agenda. With no main event the video hero (left column only) comes back.
- **Scroll**: as the hero leaves, the video pushes in slightly and the headline column lifts and fades (CSS view timeline).
- **Secondary strip** (on since 2026-10-08): the soonest upcoming `main: false` event along a heat line at the bottom of the first screen, in both hero modes (video hero and event takeover): state, date, title, meta, live countdown, sample tag, action. Not rendered when there is no secondary event.

## Open issues

## Decisions
[[Main and secondary events]], [[Hero video replaces forge bar]], [[Performance pass]], [[Hero video loop without controls]]

---
type: feature
status: built
date: 2026-10-06
code: "components/Trending.tsx"
tags:
  - feature
related:
  - "[[Placeholder content policy]]"
  - "[[Trending as a ranked media mosaic]]"
---

# Trending

**Code:** `components/Trending.tsx`, `data/trending.ts`, clips in `public/trending/`

## What it does
"En tendencia" / "Trending", caption "En Forest Media Récords". Sits between the [[Agenda]] and [[Artists]], anchor `#tendencia` (nav from 1280px wide, always in the mobile menu and footer).
- Items in `data/trending.ts`, ranked by order: the first takes the big slot. Rank colours the numeral by heat.
- Media is a short loop (`kind: "video"`, WebM + poster) or a still (`kind: "image"`).
- Videos play on hover (mouse), when centred in view (touch), or from the "Ver avance" button; under reduced motion only the button plays them. The heat line shows playback progress.
- Items with `href` get a "Ver en Kick" link (Futuras Promesas #2).

## Current items (2026-10-08)
1. 2BLE B gana Futuras Promesas #3 (`trending/ganadorft3.avif`, real, Barranquilla, "El talento también es del Caribe")
2. Futuras Promesas #3 (`trending/ft3.avif`, real, 7 Oct on kick.com/leolugolive)
3. Presentación de la página web oficial (`events/lanzamiento-web.avif`, **placeholder artwork**; links to the agenda)
4. Jhanky gana Futuras Promesas #2 (`trending/ganadorft2.avif`, real)
5. Futuras Promesas #2 line-up (`trending/ft2.avif`, real)
6. Avance del nuevo videoclip (clip-01, sample; kept so the section has a playable loop)

Items with an `href` starting with `#` show "Ver en la agenda" and stay on the page; others open in a new tab ("Ver en Kick").

## Open issues
- [ ] Real artwork for the website launch (replace `public/events/lanzamiento-web.avif`, same name)
- [ ] Replace the sample video item with a real production clip
- [ ] Dedicated 4–8 s clips per production (today both come from the hero video)
- [ ] Who is in the hero / trending video, and what is the production called?

## Decisions
[[Placeholder content policy]], [[Trending as a ranked media mosaic]]

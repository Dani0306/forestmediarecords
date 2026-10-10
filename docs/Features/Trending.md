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
- Details sit on a lean glass band so the picture keeps most of the card: the action is a 44px icon button beside the title (labelled only on the lead card on desktop), and the meta line is one line on the smaller cards. The photo grade is lighter than in the rest of the site (grayscale 85%, duotone 60%) and still heats to true colour on hover, focus or while a clip plays.

## Current items (2026-10-09)
1. 2BLE B gana Futuras Promesas #3 (poster)
2. RS el Italiano en el estudio (video `trending/renzo-estudio-01.webm`, 6 s, from `renzoclip.webm`)
3. Nikosan llega a Forest Media Récords (`nicocol/nico1.avif`, links to the artists section: "Conocer al artista")
4. Futuras Promesas #3 (poster)
5. Sesión en el estudio (video `trending/renzo-estudio-02.webm`, 6 s vertical, from `renzoclip2.webm`)
6. Presentación de la página web oficial (placeholder artwork)
7. Jhanky gana Futuras Promesas #2
8. Futuras Promesas #2

After the lead three, cards run three across; a last row of two (or one) stretches to fill the width.

Items with an `href` starting with `#` show "Ver en la agenda" and stay on the page; others open in a new tab ("Ver en Kick").

## Open issues
- [ ] Real artwork for the website launch (replace `public/events/lanzamiento-web.avif`, same name)
- [ ] Replace the sample video item with a real production clip
- [ ] Dedicated 4–8 s clips per production (today both come from the hero video)
- [ ] Who is in the hero / trending video, and what is the production called?

## Decisions
[[Placeholder content policy]], [[Trending as a ranked media mosaic]]

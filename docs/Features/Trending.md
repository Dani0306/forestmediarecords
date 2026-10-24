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
- Items with `href` get a link. The four Futuras Promesas cards (#3 and #2, winner and line-up) link to the full sessions on YouTube since 2026-10-13 (#3 `N9ULbUEwrAA`, #2 `xcGN1dQ535c`; constants `FP3`/`FP2` in `data/trending.ts`), labelled "Ver en YouTube"; the two winner cards go to the winner's Instagram instead ("Ver en Instagram": 2BLE B instagram.com/el2ble_b, Jhanky instagram.com/jhanky.10).
- Details sit on a lean glass band so the picture keeps most of the card: the action is a 44px icon button beside the title (labelled only on the lead card on desktop), and the meta line is one line on the smaller cards. The photo grade is lighter than in the rest of the site (grayscale 85%, duotone 60%) and still heats to true colour on hover, focus or while a clip plays.

## Current items (2026-10-21)
- 2026-10-21: the "Presentación de la página web oficial" card now plays the promo ad (`trending/anuncio-web.mp4`/`.webm`, 12 s, 1280×720, muted, ~1.1 MB each, from `marketing/anuncio-2026-10/forest-anuncio-16x9-sin-voz.mp4`; replaces the placeholder artwork).
- Added 2026-10-21 (slot 2): **El sorteo del Mundial de Tiraderas** (16 Oct, Leo's Kick channel; image `tiraderas/sorteo.avif` is the YouTube thumbnail of the draw video; links to https://youtu.be/bVALI_U5n5g, "Ver en YouTube"). See [[Mundial de Tiraderas]].
- Added 2026-10-21 (slot 3): **Lentino graba su nueva canción** (video `trending/lentino-nueva-cancion.mp4`/`.webm`, 8 s cut of the team's `source/hero/poster1-lentino.webm`, 1024×576; meta "Nueva canción muy pronto", no release date given). The older "Lentino en el estudio" card (`lentino.webm`) stays right after it. The list below is the 2026-10-09 order.
1. 2BLE B gana Futuras Promesas #3 (poster)
2. RS el Italiano en el estudio (video `trending/renzo-estudio-01.webm`, 6 s, from `renzoclip.webm`)
3. Nikosan llega a Forest Media Récords (`artists/nikosan/nikosan-1.avif`, links to the artists section: "Conocer al artista")
4. Futuras Promesas #3 (poster)
5. Sesión en el estudio (video `trending/renzo-estudio-02.webm`, 6 s vertical, from `renzoclip2.webm`)
6. Presentación de la página web oficial (placeholder artwork)
7. Jhanky gana Futuras Promesas #2
8. Futuras Promesas #2

After the lead three, cards run three across; a last row of two (or one) stretches to fill the width.

Items with an `href` starting with `#` show "Ver en la agenda" and stay on the page; others open in a new tab, labelled "Ver en YouTube" for YouTube links and "Ver en Kick" otherwise (`t.trending.youtube` / `t.trending.open`).

## Open issues
- [ ] Real artwork for the website launch (replace `source/events/lanzamiento-web.avif`, same name)
- [ ] Replace the sample video item with a real production clip
- [ ] Dedicated 4–8 s clips per production (today both come from the hero video)
- [ ] Who is in the hero / trending video, and what is the production called?

## Decisions
[[Placeholder content policy]], [[Trending as a ranked media mosaic]]

- 2026-10-23: two photo cards from the "FMR" video shoot (`fmr-rs-videoclip`, `fmr-lentino-videoclip`) sit before the Lentino new-song card.

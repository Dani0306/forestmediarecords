---
type: feature
status: built
date: 2026-10-26
code: "components/Releases.tsx"
tags:
  - feature
related:
  - "[[Artists]]"
  - "[[Trending]]"
---

# Releases

**Code:** `components/Releases.tsx`, `data/releases.ts`, covers in `public/releases/`

## What it does
"Lo nuevo" / "New music", right after the [[Hero]] (moved up 2026-10-26 for priority), anchor `#lanzamientos`. First link in the footer and the menu, and the first desktop nav link from 1280px; Tendencia and Streamers moved to 1600px+ and Tiraderas/Estudio stay at 1440px+ to make room.
- One card per release in `data/releases.ts`, newest first: square cover in true colour, numeral, title (with an "E" tag for explicit), artist (links to `#artistas`), type and date, and a "Escuchar en Spotify" button.
- Hover or focus slides a vinyl record out of the sleeve (CSS only, off under reduced motion). Cards forge in on scroll (`forge-in`).
- Empty list hides the section.

## Current releases (2026-10-26)
- Lentino, **Coronao** and **La Vuelta**, both singles dated 10 Oct 2026 (the date Spotify shows; both explicit).
- Covers cropped from the team's Spotify screenshots (originals in `source/releases/`). Spotify links are stripped of `si` and `utm_source`.

## Open issues
- [ ] Higher-resolution cover files from the team (current crops are 736 px)
- [ ] Link the other platforms (YouTube, Apple Music) when they exist

## Also in Trending (2026-10-26)
Both singles are cards in `data/trending.ts` (kind `music`, label "Música"): **Coronao** leads the mosaic (slot 1), **La Vuelta** is slot 4 (the wide slots 2 and 3 would crop the square cover). They link to Spotify ("Escuchar en Spotify"). The data comes from `data/releases.ts`, so alt text and links live in one place.

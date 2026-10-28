---
type: feature
status: built
date: 2026-10-27
code: "components/TopSongs.tsx"
tags:
  - feature
related:
  - "[[Artists]]"
  - "[[Releases]]"
  - "[[Top songs as sleeve bands]]"
  - "[[Top songs as two sides of a record]]"
---

# Top songs

**Code:** `components/TopSongs.tsx`, `data/topSongs.ts`, preview `app/preview/lo-mas-escuchado/page.tsx` (dev only, 404 in production)

## What it does
"Lo más escuchado" / "Most played", right after [[Artists]], anchor `#mas-escuchadas`. Redesigned 2026-10-27 ([[Top songs as sleeve bands]]): the first version (two record sides with a switch) felt too plain, and the team wanted both artists on screen without switching.
- Under the heading, the artists' names run across the page in giant outlined letters, sliding sideways as you scroll.
- One band per artist (Lentino, then RS el Italiano, mirrored), lit by the number one's cover, blurred.
- Number one: a big sleeve with its record peeking out (the record's label is the cover), a giant outlined "1" behind it, the title huge, plays in a big heat-coloured number, hot "Escuchar en Spotify", plus preview and YouTube.
- Two and three: smaller sleeves at an angle, each with its outlined numeral, title, plays and icon actions.
- Hover a cover: it leans toward the mouse, straightens, lifts, and the record slides further out and turns. A playing preview spins it at 33⅓ rpm with an equalizer chip and a progress line. Sleeves drop into place as the band scrolls in. Motion is off under reduced motion.
- Missing cover: the title printed on a steel plate. Missing song: a dashed "Por anunciar" sleeve. Hidden while every side in `data/topSongs.ts` is empty. The chat assistant lists the songs once they're filled in.

## Content (live since 2026-10-27)
Rank is the order the team sent the links in.
- Lentino: 1. La Vuelta (Spotify + YouTube, cover from [[Releases]]), 2. Dragón, 3. Stripper (YouTube only).
- RS el Italiano: 1. Cuidao Wao, 2. Nalguita, 3. Dragones de Komodo (Spotify only).
- Titles as Spotify and YouTube list them ("Dragón" with the accent, as on its cover). Covers are in the `top` folder under `public`. The team sent RS's covers at 300 px, so they were swapped for Spotify's 640 px copies of the same artwork.

## To fill in
- [x] Each artist's real top 3, in order, with links and covers
- [ ] Plays per song (optional; only as the team reports them)
- [ ] Spotify links for Dragón and Stripper, if they're on Spotify
- [ ] Larger originals of Dragón and Stripper (the ones sent are ~700 px screenshots, not quite square)
- [ ] Optional 15–30 s MP3 previews in the same folder for the play buttons

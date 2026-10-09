---
type: feature
status: built
date: 2026-10-05
code: "components/Roster.tsx"
tags:
  - feature
related:
  - "[[Artist stage with tabs]]"
---

# Artists

**Code:** `components/Roster.tsx`

## What it does
Section title "Nuestros Artistas". One artist at a time:
- **Roster index** (portrait, "01 · 05 fotos", big stencil name, heat rule under the selected one) chooses the artist; arrow keys move between tabs, so it scales to any roster size.
- **Stage** (74vh / 44rem): photos graded with `.iron-photo` (iron duotone), cross-fading via thumbnails. On desktop the same graded photo, softened, fills the whole stage as the background the black glass sits on, and a sharp copy covers the area left of the profile in its own proportions, so faces stay in frame.
- **Escuchar** button next to the name: a hot plate with a play key and equalizer bars that opens Spotify / YouTube links from `listen` in `data/artists.ts` (empty shows "Muy pronto").
- **Profile** on `.glass-side`: role and sample tag, name with the Escuchar button, bio intro + "Leer biografía completa", facts grid (genre, city, since, next date in its heat colour, Kick, links), thumbnails.
- Data: `data/artists.ts` → `profile`. **Lentino** is real (2026-10-06): bio summarised from Daniel's text (born in Sincelejo in 1997, in Medellín since 2022, reguetón · R&B · trap, songs "La Vuelta" and "BM", upcoming "Sobrio" with RS el Italiano). **RS el Italiano** is still a mock-up (`sample: true`).

## Lowkey (2026-10-06)
- Third artist (added by Daniel): photos in `public/lowkey/`. `lowkey1-crop.avif` is cropped from the story screenshot `lowkey1.avif`. Each photo has its own `focus` so the stage centres on him (studio shots with the subject low in the frame); sizes and alt text were fixed (they had been copied from Lentino).

## Nikosan (2026-10-09)
- Nicolás Lozano, **Nikosan**, beatmaker and music producer from San Javier, Medellín. Photos `public/nicocol/nico1–3.avif` (studio, blue/red/green light). Bio summarised from Daniel's text in three paragraphs.
- Genres and "En Forest desde" are **por confirmar** (the note "9/10/2018" from the team is unclear: start in music or date he joined?). The stage shows "Por confirmar" when `genres` is empty.

## Open issues
- [ ] Nikosan: genres he produces; what "9/10/2018" refers to; Spotify/YouTube
- [ ] Higher-resolution photos of Lowkey (738 px wide; the first is a 445 px tall crop)
- [ ] Spotify and YouTube URLs for each artist (`listen` in `data/artists.ts`)
- [ ] RS el Italiano bio and facts are mock-ups
- [x] Lentino joined Forest about two months before 2026-10-06: `since: "2026"`
- [ ] Release date of "Sobrio" (not set yet); add it to the [[Agenda]] as a release once dated
- [ ] New RS photos still use `lift: 2.1` (sizes now match the files)

## Decisions
[[Artist stage with tabs]], [[Artist stage as a reel]] (superseded)

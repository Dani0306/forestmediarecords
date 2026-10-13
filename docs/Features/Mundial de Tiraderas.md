---
type: feature
status: built
date: 2026-10-10
code: "components/Tiraderas.tsx"
tags:
  - feature
  - kick
related:
  - "[[Agenda]]"
  - "[[Streamers]]"
  - "[[Kick section]]"
  - "[[Tournament as its own section with a live bracket]]"
---

# Mundial de Tiraderas

**Code:** `components/Tiraderas.tsx`, `data/tiraderas.ts`, round dates in `data/events.ts`, bracket CSS in `app/globals.css`

## What it does
LeoLugoLive's tiradera (diss track) tournament with Forest Media Récords, from the team's announcement (2026-10-10). Section `#tiraderas`, right after the [[Agenda]]; nav link "Tiraderas" (desktop from 1440px, always in the mobile menu).
- Heading "Mundial de Tiraderas", caption "2026 · LeoLugoLive × Forest Media Récords", intro, tagline "6 streamers · 3 jueces · un campeón". Six players since 2026-10-13 → [[Six-player format with a battle royale]].
- Prize $100.000 COP in the glow readout, with its note (from the Forest Media Récords investment fund, surprise prizes possible); hot "Ver en Kick" and steel "Agregar al calendario" for the next round.
- **Competidores** line-up (right under the judges' panel, before the calendar): one card per participant from `participants` in `data/tiraderas.ts` (photo in `public/participants/`, name, Kick channel). The whole card links to the channel; photos sit in a lighter forge grade (`.fighter`) and heat to true colour with an ember line on hover or focus. Readout "6 streamers" (it would read "n / 6 anunciados" with hatched "Por anunciar" slots if a place were open). 6 columns from 1280px, 3 from 640px, 2 on phones. The six: valedanyy07, ElFerpo2, soyjosema, Emvy_29, Cuartiz, Edisson.
- **Calendar**: one row per round (Sorteo 16 Oct, Face off 23 Oct, Primera ronda · 1 vs 1 6 Nov, Battle royale 13 Nov, Gran final 21 Nov; all 21:00, Kick, all channels). Each row is heated by how close it is; the next one shows "Siguiente" with a countdown and a heat bar; finished rounds dim to "Finalizado". Each upcoming row has an `.ics` button.
- **Bracket** (sticky on desktop, swipeable on phones): "1 vs 1" (3 battles, bracketed together by `.bracket-trio`) → "Battle royale" (one three-slot box with "Pasan 2" and two heat rods) → Final (2) → Campeón, joined by anvil hairlines (`.bracket-stub`, `.bracket-in-line`); the line into the champion carries the final's heat. Data: `bracket.battles`, `bracket.royale`, `bracket.final`, `bracket.champion`. Slots read "Por sortear" until the draw, then "Por definir". A bracket name that matches a participant's `name` (case-insensitive) shows their photo next to it. Fill `bracket` in `data/tiraderas.ts` as results come in.
- **Judges' panel** (right after the header, before the competitors, because the judges score every tiradera): a heated plate (heat line on top) with "Jueces" in large stencil, "3 / 3 confirmados", and big square photo cards linking to each Kick channel: Jaycol (`public/juries/jaycol.avif`, kick.com/jaycol), Trianiss (`triana1.avif`, chosen over his lead photo because it has no sponsor backdrop; kick.com/trianiss) and LeoLugoLive (his portrait). An unfilled seat (`judgeSeats: 3`) would show "Por confirmar". The scoring criteria (letra, ritmo, creatividad, 1–3 points each, up to 9) sit in the same panel. On desktop the title and scoring are on the left and the judges on the right; on phones the judges are 2 across, an odd last judge spans the row as a wide card (`.judges` in `app/globals.css`), and an open seat is a slim bar.
- **How it works** rows: how tiraderas are made (BandLab, YouTube or own beat, 3–8 min, written live, optional video), winner's moment (3:00 on Discord with camera).
- The five rounds are regular `stream` events (`main: false`), so they also appear in the [[Agenda]], the [[Kick section]] list and LeoLugoLive's next stream in [[Streamers]]. Event cards use LeoLugoLive and Trianiss photos until the poster exists, except the first round (6 Nov), which shows Jaycol (`public/juries/jaycol-tall.avif`: his square photo over a soft mirror of its own bottom, so the tall card shows his face above the glass) and whose "Ver en Kick" goes to kick.com/jaycol (event `url`), as the team asked. `lib/eventPhoto.ts` gives judge and competitor photos their own alt text ("Jaycol, juez del Mundial de Tiraderas").
- The [[Chat assistant]] knows the tournament (`tiraderasInfo()` in `lib/assistantContext.ts`).

## Open issues
- [ ] Official poster: swap `image` on the five events in `data/events.ts`
- [ ] Fill the bracket after the draw (16 Oct) and after each round
- [x] Participants' photos and Kick channels (6 of 8, 2026-10-12)
- [x] ~~The two remaining participants~~: never confirmed; the format moved to six players (2026-10-13)
- [ ] Cuartiz's photo shows a toy rifle and a pistol held to his head: confirm the team is fine with it on the label's site
- [x] Jaycol's channel link and photo (2026-10-13)
- [x] The third judge: Trianiss (2026-10-13)
- [ ] Hero: the secondary "Próximo en agenda" strip is commented out in `components/Hero.tsx`, so the first screen doesn't show the next round

## Decisions
[[Tournament as its own section with a live bracket]]

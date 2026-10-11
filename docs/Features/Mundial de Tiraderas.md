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
- Heading "Mundial de Tiraderas", caption "2026 · LeoLugoLive × Forest Media Récords", intro, tagline "8 streamers · 3 jueces · un campeón".
- Prize $100.000 COP in the glow readout, with its note (from the Forest Media Récords investment fund, surprise prizes possible); hot "Ver en Kick" and steel "Agregar al calendario" for the next round.
- **Calendar**: one row per round (Sorteo 16 Oct, Face off 23 Oct, Cuartos 6 Nov, Semifinal 13 Nov, Gran final 21 Nov; all 21:00, Kick, all channels). Each row is heated by how close it is; the next one shows "Siguiente" with a countdown and a heat bar; finished rounds dim to "Finalizado". Each upcoming row has an `.ics` button.
- **Bracket** (sticky on desktop, swipeable on phones): Cuartos (4 matches) → Semifinal (2) → Final → Campeón, joined by anvil hairlines; the line into the champion carries the final's heat. Slots read "Por sortear" until the draw, then "Por definir". Fill `bracket` in `data/tiraderas.ts` as results come in.
- **How it works** rows: judges (Jaycol, Trianiss and LeoLugoLive, the last two linked to Kick), scoring (lyrics, rhythm, creativity, 1–3 points each, up to 9), how tiraderas are made (BandLab, YouTube or own beat, 3–8 min, written live, optional video), winner's moment (3:00 on Discord with camera).
- The five rounds are regular `stream` events (`main: false`), so they also appear in the [[Agenda]], the [[Kick section]] list and LeoLugoLive's next stream in [[Streamers]]. Event cards use LeoLugoLive and Trianiss photos until the poster exists.
- The [[Chat assistant]] knows the tournament (`tiraderasInfo()` in `lib/assistantContext.ts`).

## Open issues
- [ ] Official poster: swap `image` on the five events in `data/events.ts`
- [ ] Fill the bracket after the draw (16 Oct) and after each round
- [ ] Names of the 8 participants (revealed at the draw)
- [ ] Jaycol's channel link, if he has one
- [ ] Hero: the secondary "Próximo en agenda" strip is commented out in `components/Hero.tsx`, so the first screen doesn't show the next round

## Decisions
[[Tournament as its own section with a live bracket]]

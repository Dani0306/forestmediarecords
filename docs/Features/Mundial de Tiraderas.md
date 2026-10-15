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
  - "[[Eight-player bracket with a surprise entrant]]"
---

# Mundial de Tiraderas

**Code:** `components/Tiraderas.tsx`, `data/tiraderas.ts`, round dates in `data/events.ts`, bracket CSS in `app/globals.css`

## What it does
LeoLugoLive's tiradera (diss track) tournament with Forest Media Récords, from the team's announcement (2026-10-10). Section `#tiraderas`, right after the [[Agenda]]; nav link "Tiraderas" (desktop from 1440px, always in the mobile menu).
- Heading "Mundial de Tiraderas", caption "2026 · LeoLugoLive × Forest Media Récords", intro (says every date is at 8:00 p. m., Colombia time), tagline "8 streamers · 3 jueces · un campeón". Eight players since 2026-10-14 (seven confirmed plus a surprise) → [[Eight-player bracket with a surprise entrant]]; it replaced the short-lived [[Six-player format with a battle royale]].
- Prize $100.000 COP in the glow readout, with its note (from the Forest Media Récords investment fund, surprise prizes possible); hot "Ver en Kick" and steel "Agregar al calendario" for the next round.
- **Competidores** line-up (right under the judges' panel, before the calendar): one card per participant from `participants` in `data/tiraderas.ts` (photo in `public/participants/`, name, Kick channel). The whole card links to the channel; photos sit in a lighter forge grade (`.fighter`) and heat to true colour with an ember line on hover or focus. Readout "7 + 1 sorpresa": with `surprise: true` the open place is a hatched card with an ember "?" and "Sorpresa · se revela pronto" (3:4 like the photo cards); without it, open places read "Por anunciar" and the readout "n / 8 anunciados". 8 columns from 1280px, 4 from 640px, 2 on phones. The seven: valedanyy07 (new photo `valedanyy07-1.avif`, 2026-10-14), ElFerpo2, soyjosema, Emvy_29, Cuartiz, Edisson, Cang5 (kick.com/cang5, added 2026-10-14).
- **Calendar**: one row per round (Sorteo 16 Oct, Face off 23 Oct, Cuartos de final 6 Nov, Semifinal 13 Nov, Gran final 21 Nov; all 20:00 Colombia time, shown as "20:00 hora Colombia", Kick, all channels). Each row is heated by how close it is; the next one shows "Siguiente" with a countdown and a heat bar; finished rounds dim to "Finalizado". Each upcoming row has an `.ics` button.
- **Bracket** (sticky on desktop, swipeable on phones): Cuartos (4 battles, bracketed two by two by `.bracket-pair`) → Semifinal (2) → Final (2) → Campeón, joined by anvil hairlines (`.bracket-pair`, `.bracket-in-line`); the line into the champion carries the final's heat. Data: `bracket.quarterfinals`, `bracket.semifinals`, `bracket.final`, `bracket.champion`. Slots read "Por sortear" until the draw, then "Por definir". A bracket name that matches a participant's `name` (case-insensitive) shows their photo next to it. Fill `bracket` in `data/tiraderas.ts` as results come in.
- **Judges' panel** (right after the header, before the competitors, because the judges score every tiradera): a heated plate (heat line on top) with "Jueces" in large stencil, "3 / 3 confirmados", and big square photo cards linking to each Kick channel: Jaycol (`public/juries/jaycol.avif`, kick.com/jaycol), Trianiss (`triana1.avif`, chosen over his lead photo because it has no sponsor backdrop; kick.com/trianiss) and LeoLugoLive (his portrait). An unfilled seat (`judgeSeats: 3`) would show "Por confirmar". The scoring criteria (letra, ritmo, creatividad, 1–3 points each, up to 9) sit in the same panel. On desktop the title and scoring are on the left and the judges on the right; on phones the judges are 2 across, an odd last judge spans the row as a wide card (`.judges` in `app/globals.css`), and an open seat is a slim bar.
- **How it works** rows: how tiraderas are made (each competitor makes theirs however they like — the BandLab rule was dropped 2026-10-14 —, YouTube or own beat, 3–8 min, written live, optional video), winner's moment (3:00 on Discord with camera).
- The five rounds are regular `stream` events (`main: false`), so they also appear in the [[Agenda]], the [[Kick section]] list and LeoLugoLive's next stream in [[Streamers]]. Event cards use LeoLugoLive and Trianiss photos until the poster exists, except the quarter-finals (6 Nov), which show Jaycol (`public/juries/jaycol-tall.avif`: his square photo over a soft mirror of its own bottom, so the tall card shows his face above the glass) and whose "Ver en Kick" goes to kick.com/jaycol (event `url`), as the team asked. `lib/eventPhoto.ts` gives judge and competitor photos their own alt text ("Jaycol, juez del Mundial de Tiraderas").
- The [[Chat assistant]] knows the tournament (`tiraderasInfo()` in `lib/assistantContext.ts`).

## Open issues
- [ ] Official poster: swap `image` on the five events in `data/events.ts`
- [ ] Fill the bracket after the draw (16 Oct) and after each round
- [x] Participants' photos and Kick channels (6 of 8, 2026-10-12)
- [x] ~~The two remaining participants~~: never confirmed; the format moved to six players (2026-10-13)
- [ ] Cuartiz's photo shows a toy rifle and a pistol held to his head: confirm the team is fine with it on the label's site
- [x] Jaycol's channel link and photo (2026-10-13)
- [x] Seventh participant: Cang5 (2026-10-14)
- [ ] The surprise eighth participant: add to `participants` when revealed (the "?" card disappears on its own)
- [ ] valedanyy07's new photo is a small (606×497) stream capture; ask for a larger one if it looks soft
- [x] The third judge: Trianiss (2026-10-13)
- [ ] Hero: the secondary "Próximo en agenda" strip is commented out in `components/Hero.tsx`, so the first screen doesn't show the next round

## Decisions
[[Tournament as its own section with a live bracket]] · [[Eight-player bracket with a surprise entrant]]

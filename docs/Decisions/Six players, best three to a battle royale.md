---
type: decision
status: accepted
date: 2026-11-02
tags:
  - decision
  - kick
related:
  - "[[Mundial de Tiraderas]]"
  - "[[Eight-player bracket with a surprise entrant]]"
---

# Six players, best three to a battle royale

## Context
Carlogato and Edisson will no longer take part in the [[Mundial de Tiraderas]] (team, 2026-11-02). The team asked to redo the draw with six participants.

## Decision
- Six competitors: **Round 1** (the best three go through) → **battle royale** between those three (the best two go through) → **final** between the two.
- The six: Cang5, Pablomeji4, Cuartiz, ElFerpo2, Emvy_29, soyjosema.
- Dates unchanged: Round 1 on 6 Nov, battle royale 13 Nov, final 21 Nov. Event ids are `tiraderas-ronda-1` and `tiraderas-battle-royale`.
- Round 1 lists the six without pairs: the team said "best 3 advance" and the new draw has not been published, so the site does not claim 1 vs 1 battles or match-ups.
- Admin picks are now per competitor (`r1:<name>`, `r2:<name>`, `final` in `lib/winners.ts` and `app/api/winners/route.ts`); old `qf`/`sf` picks are ignored.

## Consequences
- The old draw video (16 Oct) still shows on the Sorteo row and above the bracket; it includes the two who left.
- Carlogato's and Edisson's photos stay in `public/tiraderas/participants/` unused.
- If the team gives a date for the new draw or new dates for the rounds, change them in `data/events.ts`.

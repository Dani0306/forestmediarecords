---
type: decision
status: superseded
date: 2026-10-13
tags:
  - decision
  - kick
related:
  - "[[Mundial de Tiraderas]]"
  - "[[Tournament as its own section with a live bracket]]"
---

# Six-player format with a battle royale

> Superseded on 2026-10-14 by [[Eight-player bracket with a surprise entrant]].

## Context
The [[Mundial de Tiraderas]] was announced for 8 streamers, but the last two places were never filled. The team changed the format (2026-10-13).

## Decision
- Six players: three 1 vs 1 battles, then a **battle royale** between the three winners (all three at once), then a **final** between the top two of the royale.
- The rounds keep their dates: the first round (was quarter-finals) on 6 Nov, the battle royale (was semi-final) on 13 Nov, the final on 21 Nov. Event ids became `tiraderas-batallas` and `tiraderas-battle-royale`.
- The bracket shows 3 battles → one three-slot royale box ("Pasan 2") → final → champion. `bracket` in `data/tiraderas.ts` holds `battles`, `royale`, `final`, `champion`.

## Consequences
- The line-up shows six across on desktop with no open slots.
- Anyone who saved the old quarter-final or semi-final `.ics` files keeps the old title; the dates are the same.
- If the team gives new dates for the new rounds, change them in `data/events.ts`.

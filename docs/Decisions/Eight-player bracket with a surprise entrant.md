---
type: decision
status: accepted
date: 2026-10-14
tags:
  - decision
  - kick
related:
  - "[[Mundial de Tiraderas]]"
  - "[[Six-player format with a battle royale]]"
---

# Eight-player bracket with a surprise entrant

## Context
A day after the [[Six-player format with a battle royale]], the team confirmed a seventh competitor (Cang5) and an eighth who will be a surprise, revealed later (2026-10-14).

## Decision
- Eight players: **quarter-finals** (four 1 vs 1 battles; the four best tiraderas go through) → **semi-final** (two battles) → **final**. No battle royale.
- Same dates as before: quarter-finals 6 Nov, semi-final 13 Nov, final 21 Nov. The draw is at **8:00 p. m. Colombia time** (was 9:00) and, from 2026-10-16, every later round at **7:00 p. m.**. Event ids are `tiraderas-cuartos` and `tiraderas-semifinal` again.
- `surprise: true` in `data/tiraderas.ts` marks the open place as a surprise: an ember "?" card, "Sorpresa · se revela pronto", and the readout "7 + 1 sorpresa". The chat assistant says the eighth is a surprise and doesn't guess who.
- The tiradera-making rules no longer require BandLab: each competitor makes theirs however they like.

## Update 2026-10-16
The surprise was revealed: Pablomeji4 (kick.com/pablomeji4) is the eighth competitor, so `surprise` is `false` and the "?" card is gone. The flag stays for any future open place.

## Consequences
- When the surprise is revealed, add them to `participants`; the "?" card and the "+ 1" readout go away on their own.
- `.ics` files saved before this change keep the old title and the 9 PM time.

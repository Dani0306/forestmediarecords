---
type: feature
status: built
date: 2026-10-05
code: "components/Agenda.tsx"
tags:
  - feature
related:
  - "[[Agenda as a heat rod timeline]]"
  - "[[Agenda as photo carousel]]"
  - "[[Performance pass]]"
---

# Agenda

**Code:** `components/Agenda.tsx`

## What it does
Redesigned 2026-10-27 as the **heat rod** ([[Agenda as a heat rod timeline]]): the old photo-card carousel looked like every other section.
- Desktop: one rod drawn to real time. Cold steel behind the "Hoy" needle, then the heat ramp mapped onto the agenda thresholds (3 days white, 7 hot, 21 warm, embers beyond). A ruler under it (days, Mondays, months).
- Each event is a notch with its day, month, time and short name (the part after " · " in the title). The last 3 finished events stay on the rod, cold. Notches are tabs (arrow keys, Home, End).
- The chosen event (default: the next one) opens under the rod: picture, heat and type, title (series name small above), meta, the four-cell countdown, "Ver en Kick" and "Agregar al calendario", a 04 / 06 counter with arrows.
- Phones: a vertical spine of rows spaced by real time, with a "Hoy" rule; the chosen row opens its details inline.
- Type filters only show when the agenda holds more than one type (right now everything is a stream, so there are none).
- Motion: the heat wipes out from the needle as the rod scrolls in, notches drop in as the front passes; a new choice strikes its title and picture in. Off under reduced motion.
- Empty state unchanged: "Nuevas fechas muy pronto" with a link to the follow section.

## Open issues
- [x] Sample events removed 2026-10-10 (website launch, Forest showcase, RS el Italiano single, RS live, RS studio session); only real events remain. With nothing upcoming, the agenda says "Nuevas fechas muy pronto" and links to the follow section.
- [ ] Add the next real events as they are confirmed
- [x] Mundial de Tiraderas rounds added 2026-10-10 (16 Oct, 23 Oct, 6 Nov, 13 Nov, 21 Nov; 21:00, Kick) → [[Mundial de Tiraderas]]

## Decisions
[[Agenda as a heat rod timeline]] (replaces [[Agenda as photo carousel]]), [[Performance pass]]

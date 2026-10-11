---
type: feature
status: built
date: 2026-10-05
code: "components/Agenda.tsx"
tags:
  - feature
related:
  - "[[Agenda as photo carousel]]"
  - "[[Performance pass]]"
---

# Agenda

**Code:** `components/Agenda.tsx`

## What it does
Events as photo cards in a snap **carousel**, filtered by category (Todo, Conciertos, Streams, Showcases, Lanzamientos).
- Card: photo fills it (`.iron-photo`), heat and tags on the photo, details on `.glass-field` (pre-blurred copy of the photo), heat line, date, title, meta, countdown, add-to-calendar `.ics`, Kick/Info link.
- Counter `01 / 05`, prev/next arrows, finished events shown at the end via "Mostrar finalizados".
- Heat legend (six states) under the intro.

## Open issues
- [x] Sample events removed 2026-10-10 (website launch, Forest showcase, RS el Italiano single, RS live, RS studio session); only real events remain. With nothing upcoming, the agenda says "Nuevas fechas muy pronto" and links to the follow section.
- [ ] Add the next real events as they are confirmed
- [x] Mundial de Tiraderas rounds added 2026-10-10 (16 Oct, 23 Oct, 6 Nov, 13 Nov, 21 Nov; 21:00, Kick) → [[Mundial de Tiraderas]]

## Decisions
[[Agenda as photo carousel]], [[Performance pass]]

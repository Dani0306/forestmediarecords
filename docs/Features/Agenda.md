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
- [ ] Website launch ("Presentación de la página web oficial", release, `main: false`): **date 31 Oct 20:00 and place are placeholders** (tagged Ejemplo); artwork is a placeholder
- [ ] Most other events are samples

## Decisions
[[Agenda as photo carousel]], [[Performance pass]]

---
type: feature
status: built
date: 2026-11-04
code: "components/FuturasPromesas.tsx, data/futurasPromesas.ts"
tags:
  - feature
  - kick
related:
  - "[[Futuras Promesas 4 as a case board]]"
  - "[[Hero]]"
  - "[[Kick section]]"
---

# Futuras Promesas 4

**Code:** `components/FuturasPromesas.tsx`, `data/futurasPromesas.ts`, event `futuras-promesas-4` in `data/events.ts`

## What it does
The label's next Kick showcase, announced in its own section right after the [[Hero]] (anchor `#futuras-promesas`) and as the site's main event (`main: true`), so the hero is taken over until it ends. See [[Futuras Promesas 4 as a case board]].
- Facts, all printed on the team's three posters (2026-11-04): **7 de noviembre, 9 PM, kick.com/leolugolive**; competitors **Colmaill** and **Leykan**; **Lowkey** (from the roster) as **Jurado invitado**, a special guest invited for this edition.
- Header: "Futuras Promesas" stacked in stencil with a giant "4" in the event's heat colour, a mono date line, the lede, a four-cell countdown (seconds stamped in each tick; "En vivo ahora" while live; "Finalizado" after), hot "Ver en Kick" and steel "Agregar al calendario".
- The case board (the posters' own detective motif, in steel): a plate with a faint 2.5rem grid and an mm ruler along the top, stamped "Expediente FP4" and "2 participantes · 1 jurado invitado". The guest's poster sits centre stage with an "Invitado especial" rubber stamp; the competitors hang either side, tilted, each from a cherry pin. Red string runs from each competitor's pin to the guest's, sagging under its own weight, and draws itself in as the board scrolls into view. Hovering a print straightens and lifts it, tilts it toward the mouse and heats its string to ember.
- Phones: the guest first, then the competitors two across; no strings.
- More competitors: add them to `competitors` in `data/futurasPromesas.ts`; they alternate left and right.
- The hero takeover fans the two competitors' posters out behind the guest's (`gallery` on the event) and adds "Ver line-up y jurado" (to `#futuras-promesas`).
- Also in the [[Kick section]] (first edition in `data/kick.ts`, with a "Jurado invitado" row) and the [[Agenda]]; the [[Chat assistant]] knows the line-up and the guest.

## Assets
- `public/futuras-promesas/ft4-lowkey-jurado.webp` (1024×1536), `ft4-colmaill.webp` and `ft4-leykan.webp` (738×1107, cropped out of phone screenshots). Originals in `source/futuras-promesas-4/`.

## Open
- [ ] End time (the posters give none; the agenda assumes 2 hours)
- [ ] Winner after the event (then the section can close and the edition keeps the winner in `data/kick.ts`)
- [ ] Remove the section after the event, or turn it into the results

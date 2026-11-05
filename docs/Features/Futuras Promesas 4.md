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
- Facts, all printed on the team's posters (2026-11-04): **7 de noviembre, 9 PM, kick.com/leolugolive**; competitors **Colmaill**, **Leykan** and **Tyan4** (her poster prints "TYAN4"; the file was named TYANA); **Lowkey** (from the roster) as **Jurado invitado**, a special guest invited for this edition.
- **Five singers compete** (team, 2026-11-04); two are still to be announced. `slots: 5` in `data/futurasPromesas.ts`: each slot past `competitors` shows as a mystery print.
- Header: "Futuras Promesas" stacked in stencil with a giant "4" in the event's heat colour, a mono date line, the lede, a four-cell countdown (seconds stamped in each tick; "En vivo ahora" while live; "Finalizado" after), hot "Ver en Kick" and steel "Agregar al calendario".
- The case board (the posters' own detective motif, in steel): a plate with a faint 2.5rem grid and an mm ruler along the top, stamped "Expediente FP4" and "5 participantes · 2 por revelar · 1 jurado invitado". The guest's poster sits centre stage with an "Invitado especial" rubber stamp; the competitors hang either side, tilted, each from a cherry pin. Red string runs from each competitor's pin to the guest's, sagging under its own weight, and draws itself in as the board scrolls into view. Hovering a print straightens and lifts it, tilts it toward the mouse and heats its string to ember.
- Slots alternate left and right of the guest (01 left, 02 right, 03 left, 04 right); with an odd count the last hangs under the guest's print. The top prints' strings run to the guest's top pin, lower ones to a pin on the guest's near edge (drawn only where a string ties on), so no string crosses the guest's face.
- Mystery print ("Participante 04/05", "Por revelar", "Lo anunciamos en los próximos días."): a blank steel plate with a hatch, an outlined stencil "?", a redaction bar and an ember "Muy pronto" stamp; a slow light sweep crosses it every 5.5 s (staggered per slot, off under reduced motion); its red string hangs loose from the pin and swings on hover, while the "?" heats to ember.
- Phones: the guest first, then the slots two across, the odd one centred last; no strings.
- Announcing a competitor: add them to `competitors` in `data/futurasPromesas.ts` (they take the next slot), to `lineup` in `data/kick.ts`, and their poster to `gallery` on the event.
- The hero takeover fans the competitors' posters out behind the guest's (`gallery` on the event; positions in `FAN` in `components/Hero.tsx`) and adds "Ver line-up y jurado" (to `#futuras-promesas`).
- Also in the [[Kick section]] (first edition in `data/kick.ts`, with a "Jurado invitado" row and "+2 por revelar" after the line-up, from `slots`) and the [[Agenda]]; the [[Chat assistant]] knows the line-up, the guest and that two names are still unannounced.

## Assets
- `public/futuras-promesas/ft4-lowkey-jurado.webp` (1024×1536), `ft4-colmaill.webp` and `ft4-leykan.webp` (738×1107, cropped out of phone screenshots), `ft4-tyan4.webp` (1024×1536, as sent). Originals in `source/futuras-promesas-4/`.

## Open
- [ ] The last two competitors (names and posters)
- [ ] Confirm the spelling "Tyan4" (poster) vs "Tyana" (file name)
- [ ] End time (the posters give none; the agenda assumes 2 hours)
- [ ] Winner after the event (then the section can close and the edition keeps the winner in `data/kick.ts`)
- [ ] Remove the section after the event, or turn it into the results

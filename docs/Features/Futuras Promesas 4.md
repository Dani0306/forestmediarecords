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
- Facts, all printed on the team's posters (2026-11-04): **7 de noviembre, 9 PM, kick.com/leolugolive**; competitors **Colmaill**, **Leykan**, **Tyan4** (her poster prints "TYAN4"; the file was named TYANA), **2BLE B** (added 2026-11-05; the same name as the winner of #3, see Open) and **Septu RG** (added 2026-11-06; his poster prints "SEPTU RG"); **Lowkey** (from the roster) as **Jurado invitado**, a special guest invited for this edition.
- **Five singers compete** (team, 2026-11-04), and since 2026-11-06 all five are announced, so no mystery print shows. `slots: 5` in `data/futurasPromesas.ts` stays: each slot past `competitors` would show as a mystery print.
- Header: "Futuras Promesas" stacked in stencil with a giant "4" in the event's heat colour, a mono date line, the lede, a four-cell countdown (seconds stamped in each tick; "En vivo ahora" while live; "Finalizado" after), hot "Ver en Kick" and steel "Agregar al calendario".
- The case board (the posters' own detective motif, in steel): a plate with a faint 2.5rem grid and an mm ruler along the top, stamped "Expediente FP4" and "5 participantes · 1 jurado invitado" ("· 1 por revelar" while a name is missing). The guest's poster sits centre stage with an "Invitado especial" rubber stamp; the competitors hang either side, tilted, each from a cherry pin. Red string runs from each competitor's pin to the guest's, sagging under its own weight, and draws itself in as the board scrolls into view. Hovering a print straightens and lifts it, tilts it toward the mouse and heats its string to ember.
- Slots alternate left and right of the guest (01 left, 02 right, 03 left, 04 right); with an odd count the last (05, Septu RG) hangs under the guest's print. The top prints' strings run to the guest's top pin, lower ones to a pin on the guest's near edge (drawn only where a string ties on; the left one at 58% of the print's height, the right one at 87% so its string passes under the caption of the print above), so no string crosses the guest's face.
- Mystery print ("Participante 04/05", "Por revelar", "Lo anunciamos en los próximos días."): a blank steel plate with a hatch, an outlined stencil "?", a redaction bar and an ember "Muy pronto" stamp; a slow light sweep crosses it every 5.5 s (staggered per slot, off under reduced motion); its red string hangs loose from the pin and swings on hover, while the "?" heats to ember.
- Phones: the guest first, then the slots two across, the odd one centred last; no strings.
- Announcing a competitor: add them to `competitors` in `data/futurasPromesas.ts` (they take the next slot), to `lineup` in `data/kick.ts`, and their poster to `gallery` on the event.
- The hero takeover fans the competitors' posters out behind the guest's (`gallery` on the event; positions in `FAN` in `components/Hero.tsx`, five since Septu RG: three prints on the left, two on the right) and adds "Ver line-up y jurado" (to `#futuras-promesas`).
- Also in the [[Kick section]] (first edition in `data/kick.ts`, with a "Jurado invitado" row and "+1 por revelar" after the line-up, from `slots`) and the [[Agenda]]; the [[Chat assistant]] knows the line-up and the guest (and, while a slot is empty, that one name is still unannounced).

## Assets
- `public/futuras-promesas/ft4-lowkey-jurado.webp` (1024×1536), `ft4-colmaill.webp` and `ft4-leykan.webp` (738×1107, cropped out of phone screenshots), `ft4-tyan4.webp`, `ft4-dobleb.webp` and `ft4-septu-rg.webp` (1024×1536, as sent; the last one arrived as "septu rg.webp" and was renamed without the space). Originals in `source/futuras-promesas-4/`.

## Open
- [ ] 2BLE B also won Futuras Promesas #3 (Barranquilla): is this the same artist coming back? If so, the site could say it (the poster doesn't)
- [ ] Confirm the spelling "Tyan4" (poster) vs "Tyana" (file name)
- [ ] End time (the posters give none; the agenda assumes 2 hours)
- [ ] Winner after the event (then the section can close and the edition keeps the winner in `data/kick.ts`)
- [ ] Remove the section after the event, or turn it into the results

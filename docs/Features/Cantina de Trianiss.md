---
type: feature
status: built
date: 2026-11-26
code: "components/Cantina.tsx"
tags:
  - feature
related:
  - "[[Trending]]"
  - "[[Streamers]]"
---

# Cantina de Trianiss

**Code:** `components/Cantina.tsx`, `data/cantina.ts`, `app/globals.css` (`cantina-*`), `lib/dictionary.ts` (`cantina`)

## What it does
- Section `#cantina`, right after [[Releases]]: "La Cantina de Trianiss", the FMR Gang's night at Trianiss's bar (charla · temas · tragos), **viernes 27 de noviembre de 2026, 9:00 p. m. (hora de Colombia)**, live on kick.com/trianiss. Facts from the team's flyers (`marketing/cantina-de-trianiss*`) and Daniel.
- Left: day stamp (Próximamente / Mañana / Hoy by calendar day in Medellín, En vivo from 9 PM until midnight, then Ya pasó) with "Empieza en 1d 03h" beside it, stencil title with "Trianiss" in the heat colour, readout line (9:00 p. m. · hora de Colombia · Kick · kick.com/trianiss), lede, "Ver en Kick" (hot) and "Conoce a Trianiss" (→ `#streamers`).
- Right: the cartoon FMR Gang art (`public/cantina/cantina-fmr-gang.webp`, text-free), cropped 4:5, leaning; it slides onto the bar on scroll (view timeline, `translate` + `opacity`), straightens and lifts on hover, tilts toward the mouse. Static under reduced motion. The Trianiss-at-the-bar photo was removed on 2026-11-26 at the team's request (section and trending).
- After midnight (or `end`, if set): heat goes cold, the button becomes "Canal de Trianiss" and the lede says the cantina closed.
- Number 2 in [[Trending]] (`cantina-de-trianiss`, links to kick.com/trianiss). The [[Chat assistant]] knows the date and that the time is unconfirmed.
- Preview: `?cantina=upcoming|tomorrow|today|live|done`.

## Open issues
- [ ] End time unknown: "En vivo" runs until midnight. Set `end` in `data/cantina.ts` if the team gives one.
- [ ] Remove the section from `app/page.tsx` (and the trending card) when the team no longer wants it.

## Decisions
- Not in `data/events.ts`: at first it had no start time; now that it does, an agenda entry would also replace the hero's "Próximo en agenda" strip, and the hero stays untouched at the team's request.
- Text-free art instead of the finished flyer, which prints "Mañana" (stale from the 27th on).
- Prompt: `prompts/003-cantina-de-trianiss.md`.

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
- Section `#cantina`, right after [[Releases]]: "La Cantina de Trianiss", the FMR Gang's night at Trianiss's bar (charla · temas · tragos), **viernes 27 de noviembre de 2026**, live on kick.com/trianiss. Facts from the team's flyers (`marketing/cantina-de-trianiss*`) and Daniel.
- Left: day stamp (Próximamente / Mañana / Hoy / Ya pasó, by calendar day in Medellín), stencil title with "Trianiss" in the heat colour, readout line (time or "Hora por confirmar" · Kick · kick.com/trianiss), lede, "Ver en Kick" (hot) and "Conoce a Trianiss" (→ `#streamers`).
- Right: two prints from the text-free art (`public/cantina/cantina-trianiss.webp` photo, `cantina-fmr-gang.webp` cartoon), cropped 4:5, leaning; they slide onto the bar on scroll (view timeline, `translate` + `opacity`), straighten and lift on hover, tilt toward the mouse. Static under reduced motion. Phone: side by side, photo first.
- After the day: heat goes cold, the button becomes "Canal de Trianiss" and the lede says the cantina closed.
- Number 2 in [[Trending]] (`cantina-de-trianiss`, links to kick.com/trianiss). The [[Chat assistant]] knows the date and that the time is unconfirmed.
- Preview: `?cantina=upcoming|tomorrow|today|done`.

## Open issues
- [ ] Start time not confirmed. Set `time` in `data/cantina.ts`; then consider an agenda entry in `data/events.ts` (`main: false`).
- [ ] Remove the section from `app/page.tsx` (and the trending card) when the team no longer wants it.

## Decisions
- Not in `data/events.ts`: an event needs a start time, and an invented one would show in the agenda, the .ics and the chat. Hero untouched at the team's request.
- Text-free art instead of the finished flyers, which print "Mañana" (stale from the 27th on).
- Prompt: `prompts/003-cantina-de-trianiss.md`.

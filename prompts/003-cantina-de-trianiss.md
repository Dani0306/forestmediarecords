# 003 · La Cantina de Trianiss: section + trending #2

**Date:** 2026-11-26 · **Branch:** `feat/cantina-de-trianiss` (from `main`) · **Status:** built

## Goal
Give "La Cantina de Trianiss" (Friday 27 November, live on kick.com/trianiss) visibility: a new landing-page section right after the new releases, and the number 2 card in "En tendencia". The hero stays as it is.

## Facts (from the team's flyers in `marketing/cantina-de-trianiss*/` and Daniel, 2026-11-26)
- Title: **La Cantina de Trianiss**. Date: **viernes 27 de noviembre de 2026**. Line: "Toda la FMR Gang reunida · Charla · temas · tragos".
- Where: live on **kick.com/trianiss** (Daniel).
- Start time: **not confirmed**. No countdown, no agenda entry, no calendar file until it is (each needs a start time). The section says "Hora por confirmar".

## Code inspected
- `app/page.tsx`: section order. Cantina goes after `<Releases />`, before `<Tiraderas />` (both Tiraderas and FP4 are past events now).
- `components/FuturasPromesas.tsx`: closest pattern (event section: stencil title, readout date line, lede, `btn-hot` Kick button, posters with tilt + gloss, `fp-in` scroll entry). Reused as a pattern, not imported.
- `data/trending.ts` + `components/Trending.tsx`: the uncommitted "F.M.R · Video oficial" #1 work on `feat/donation-system` ships too (Daniel, 2026-11-26). Order becomes: 1 F.M.R video, **2 Cantina**, 3 F.M.R song, then the rest. A card with an external Kick `href` already labels itself "Ver en Kick".
- `data/streamers.ts`: Trianiss = Daniel Triana, kick.com/trianiss. Section links "Conoce a Trianiss" to `#streamers`.
- `lib/i18n.tsx` (`useNow`, `formatDateParts`), `data/events.ts` (`heatOf` needs a full event; not used here).

## Decisions and assumptions
- **Decision:** a small data file `data/cantina.ts` (date as `YYYY-MM-DD`, optional `time`, channel, two pictures, ES/EN alt). **Rejected:** adding it to `data/events.ts`, because `ForgeEvent.start` needs a time and an invented 8 PM would show in the agenda, the chat assistant and the .ics. When the time arrives, set `time` and (optionally) add the agenda event.
- **Decision:** use the **text-free art** (`cantina-de-trianiss-raw.png` 752×1344, `cantina-cartoon-raw-v1.png` 1520×2688) as WebP in `public/cantina/`. **Rejected:** the finished 1080×1920 flyers: they print "Mañana", which is wrong from tomorrow on, and the section already sets the title in the site's own type.
- **Decision:** heat by day in Bogotá time: before the day → `hot`, on the day → `white` with "Hoy" (still no "En vivo", since the time is unknown), after the day → `cold`, the Kick button becomes "Canal de Trianiss" and the copy says it already happened. **Rejected:** hiding the section after the day (the trending card would still point at it); Daniel can remove it.
- **Decision:** the trending card links to kick.com/trianiss ("Ver en Kick"). **Rejected:** `#cantina`, which the card would label "Ver en la agenda".
- **Assumption:** no nav entry (temporary event). Easy to add.

## Files to touch
- `data/cantina.ts` (new), `components/Cantina.tsx` (new), `app/page.tsx`, `app/globals.css` (a few `cantina-*` rules), `lib/dictionary.ts` (`cantina` ES/EN), `data/trending.ts` (#2 card), `lib/assistantContext.ts` (chat knows the event), `public/cantina/*.webp`.
- Also shipped: the existing uncommitted F.M.R video #1 changes (`components/Trending.tsx`, `data/trending.ts`, `docs/Features/Trending.md`, `docs/Daily/2026-11-23.md`).
- Vault: `docs/Features/Cantina de Trianiss.md` (new, linked from `docs/Home.md`), today's daily, `docs/Project/Open questions.md` (start time).

## Copy (ES / EN)
| Key | ES | EN |
| --- | --- | --- |
| `cantina.lede` | Toda la FMR Gang reunida en la cantina de Trianiss: charla, temas y tragos, en vivo en Kick. | The whole FMR Gang together at Trianiss's cantina: talk, tracks and drinks, live on Kick. |
| `cantina.timeTbc` | Hora por confirmar | Time to be confirmed |
| `cantina.today` / `tomorrow` | Hoy / Mañana | Today / Tomorrow |
| `cantina.watch` | Ver en Kick | Watch on Kick |
| `cantina.channel` | Canal de Trianiss | Trianiss's channel |
| `cantina.host` | Conoce a Trianiss | Meet Trianiss |
| `cantina.done` | La cantina ya cerró. Mira lo que pasó en el canal de Trianiss. | The cantina has closed. Catch up on Trianiss's channel. |
| `cantina.tags` | Charla · temas · tragos | Talk · tracks · drinks |
| trending title / meta | La Cantina de Trianiss · Viernes 27 de noviembre · En vivo en Kick | La Cantina de Trianiss · Friday 27 November · Live on Kick |

## Design and motion
- Forge world, warm bar light: background is the photo art blown up and blurred (like FP), dark gradient top and bottom. Left: stencil title "La Cantina / de Trianiss" (Trianiss in the heat colour `var(--h)`), readout line "Vie 27 nov · Hora por confirmar · Kick · kick.com/trianiss" with a "Mañana/Hoy" stamp, lede, `btn-hot` Ver en Kick + `btn-steel` Conoce a Trianiss. Right: the two pictures as leaning prints (photo in front, cartoon behind and offset), tilt toward the mouse and gloss on hover (desktop), stacked side by side at phone width.
- Motion: CSS scroll-driven entry (prints deal in from the side, title drops), compositor-only; static under reduced motion and without `animation-timeline` support. Section uses `overflow: clip`.
- Preview: `?cantina=today|done` forces the day states for review.

## Security, privacy and money
- None: static content, one external link.

## Cost impact
- None. Two WebP images (~150–250 KB each, lazy below the fold).

## Acceptance criteria
- [ ] Section `#cantina` shows after the releases, ES and EN, phone (320/390) and desktop, no sideways scroll.
- [ ] Trending order: F.M.R video, Cantina, F.M.R song…; the Cantina card opens kick.com/trianiss.
- [ ] Hero unchanged (no `data/events.ts` change).
- [ ] `?cantina=today` and `?cantina=done` show their states; reduced motion shows everything static.
- [ ] Chat assistant can answer "¿cuándo es la cantina de Trianiss?" with the date and "hora por confirmar".

## Checks
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build`
- [ ] Click-through as above; impeccable detector output.
- [ ] `python3 .claude/skills/obsidian-gardener/scripts/check_vault.py docs`

## Ship
Branch `feat/cantina-de-trianiss` from `main` carrying only these changes (plus the F.M.R video trending work). Merge to `main` and push **only after a yes** (push = production deploy).

## Manual test steps
1. `npm run dev`, open `http://localhost:3000/#cantina` (ES), toggle EN.
2. `http://localhost:3000/?cantina=today#cantina` and `?cantina=done#cantina`.
3. Scroll to "En tendencia": the second card is the Cantina; "Ver en Kick" opens kick.com/trianiss.
4. Phone width (390px) in devtools; macOS "Reduce motion" on.

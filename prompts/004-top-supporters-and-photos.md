# 004 · Support section: top supporters, proof by WhatsApp, studio photos

**Date:** 2026-11-26 · **Branch:** `feat/donation-system` (continues 001, not merged yet) · **Status:** built (2026-11-26)

## Goal
A visitor who gives can send the proof of their transfer by WhatsApp in one tap and choose the name they want to appear under. The section shows a ranked board of the people who support the label most, which only Daniel updates in `data/support.ts`. Two studio photos make the section less linear and show where the money goes.

## Docs read
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`: `sizes` is needed with `fill` so the browser doesn't fetch a full-width file; `preload` replaces the deprecated `priority` (not used here: the section is far below the fold, so the photos stay lazy).
- `DESIGN.md`: `.iron-photo` grades photos into the forge (grayscale plus the heat duotone, `--lift` brightens dark shots); `.parallax` drifts a photo ±4% on scroll; glass and blur are allowed only over photos; "En tendencia" already uses "rank is temperature" (`HEAT` in `components/Trending.tsx`); "Support Ingot" describes the section as built.
- `docs/Features/Support.md`, `docs/Decisions/Support starts with Bre-B and PayPal, gateway later.md`, `docs/Decisions/Support section ships dark until the accounts exist.md`: the section as built and why.
- `AGENTS.md` section 10: never show a donor name or amount that isn't real and consented.
- WhatsApp click-to-chat (`https://wa.me/<number>?text=<message>`, already used in the section): it can prefill text only; the visitor attaches the proof by hand.

## Code inspected
- `components/Support.tsx`: 12-column grid; header and three message rows on the left (5 columns), the ingot plate on the right (7 columns), spending list and fine print below. "Avisar por WhatsApp" appears only after the key is copied (`s.next`). No image anywhere in the section.
- `data/support.ts`: `breb`, `paypal`, `suggested`, `uses`; `hasSupport`. Gains `supporters`, `showBoard` and `photos`.
- `lib/support.ts`: `supportView()` and the demo data sets for `?apoyo=…`. Gains sample supporters and a ranking helper.
- `lib/dictionary.ts` → `support`: `next.tellUs` ("Avisar por WhatsApp") and `next.message` change; new `proof` and `board` blocks.
- `components/Trending.tsx`: `HEAT` ramp by rank and the `.iron-photo` + `next/image` pattern to reuse.
- `components/Roster.tsx`, `data/artists.ts`: photos carry `focus` (object-position) and `lift`; same fields for the section's photos.
- `data/legal.ts`: `supportTerms` and `supportPrivacy` (draft, only when the section is live). Gain one sentence each.
- `lib/assistantContext.ts` → `supportInfo()`: says no totals or names exist. Changes to describe the board.
- `data/studio.ts`: `formatCOP()` for amounts.
- Photos already in `public/`: `artists/rs-el-italiano/rs-estudio-1–4.avif` (RS el Italiano recording, red light, Medellín at night through the window) and `artists/nikosan/nikosan-1–3.avif` (Nikosan producing at the laptop and monitors).

## Decisions and assumptions
- **Decision: the board is a list in `data/support.ts` that only Daniel edits.** Rejected: an `?admin` form backed by Upstash Redis, like the Tiraderas winners. It would update without a deploy, but needs a route, a password and a store for something that changes a few times a month. Kept as a later step if updates become frequent.
- **Decision: proof goes by WhatsApp, never through the site.** Rejected: an upload form. A bank receipt is personal data; a form would need storage, a route, limits and a retention policy. WhatsApp already reaches the team and the site stores nothing. This replaces the 001 decision not to ask for proof: proof is still optional to give, but it is now the way onto the board.
- **Decision: nobody appears without asking.** The prefilled message asks for the name to show. A transfer with no message stays in the private ledger only. Rejected: listing every sender by their bank name, which publishes personal data without consent.
- **Decision: amounts show per person.** The board orders everyone by total; the amount is printed only for supporters who agreed (`showAmount: true`). Rejected: always showing amounts (no consent) and never showing them (loses the point of a top list). This also answers the open question from the chat; change the default by setting the flag.
- **Decision: the top five are ranked, everyone else is named.** A "También apoyan" line lists the rest without amounts, so a small gift is still thanked and the page keeps its promise that the amount doesn't matter. Rejected: a full ranked table, which puts the smallest giver last in public.
- **Decision: the board shows from day one, with open spots.** With no supporters it shows five cold, empty spots and the invitation to be the first. Rejected: hiding it until three names exist (my earlier suggestion): empty spots read as an invitation, a hidden board gives nobody a reason to send proof. `showBoard: false` hides it.
- **Decision: reuse photos the site already has.** RS el Italiano in the booth and Nikosan at the desk are real FMR production shots and are already published on the roster. Rejected: stock or generated images (invented content).
- **Decision: continue on `feat/donation-system`.** The section isn't merged yet; one branch keeps the review and the go-live as one step. Rejected: a new branch on top of an unmerged one.
- **Assumption: proofs arrive at the label's WhatsApp** (`site.whatsapp`, +57 304 464 6964) and Daniel can read it or gets them forwarded. If not, a second number goes in `data/support.ts`.
- **Assumption: totals are in COP**, the amount that actually arrived (a PayPal gift counts at what was withdrawn in pesos).
- **Assumption: photo choice** is `rs-estudio-2` (lead) and `nikosan-2` (beside the board). Both paths are data; swapping is a one-line change.

## Files to touch
- `data/support.ts`: edit. Add `Supporter` (`id`, `name`, `total` in COP, `showAmount?`, `since?` as "YYYY-MM"), `supporters: []`, `showBoard: true`, and `photos` (`lead` and `side`: `src`, `alt` in ES and EN, optional `focus`, `lift`). Extend the doc comment with how to add a supporter.
- `lib/support.ts`: edit. `rankSupporters()` (total descending, then earlier `since`, then name; returns `top` (5) and `rest`); sample supporters in the demo sets, tagged as samples.
- `components/support/Supporters.tsx`: create. The board.
- `components/Support.tsx`: edit. New layout with the photos, the always-visible proof row, the board.
- `lib/dictionary.ts`: edit. Copy below, ES and EN.
- `components/icons.tsx`: edit only if a WhatsApp mark is needed for the proof button.
- `app/globals.css`: edit only for board styles that can't be done with existing materials; under the existing Support block.
- `data/legal.ts`: edit. One sentence in privacy and one in terms (draft flag stays).
- `lib/assistantContext.ts`: edit. `supportInfo()` explains the board and how to appear.
- `DESIGN.md`, `docs/`: see Vault updates.

## Requirements
1. **Proof row, always visible.** Under the three steps the plate shows "¿Ya hiciste tu aporte?" with a steel button "Enviar comprobante" that opens `https://wa.me/<site.whatsapp.number>?text=<message>` in a new tab, in the visitor's language. "Copiar llave" stays the only hot button.
2. **After copying the key**, the same row changes its heading to "Ya tienes la llave" with the next-step text. There is one WhatsApp button in the plate, never two.
3. **The site never says a transfer arrived.** No thank-you appears from copying or from tapping the proof button.
4. **Board.** Shows the top five from `rankSupporters()`: rank numeral, name, and the amount only when `showAmount` is true. Ranks 6 and beyond appear by name in "También apoyan". Names are plain text (never HTML) and long names wrap or truncate without breaking the layout at 320px.
5. **Open spots.** With fewer than five supporters, the remaining ranks show as empty spots ("Lugar libre"). With none, all five are empty and the invitation line leads.
6. **How to appear.** The board carries one line explaining it (send your proof, tell us the name) and links to the proof button's WhatsApp message.
7. **Hide switch.** `showBoard: false` removes the board; the rest of the section is unchanged.
8. **Photos.** The lead photo and the side photo render through `next/image` with `sizes`, lazy, in the `.iron-photo` grade, with `alt` text in both languages. If a path is empty, that photo's block is absent and the layout still holds.
9. **Preview.** `?apoyo=demo` shows seven sample supporters (five ranked, two named) tagged "Ejemplo"; `?apoyo=demo-llave` shows the empty board. Samples never show on the live hosts (existing rule in `lib/support.ts`).
10. **Assistant.** It can say the board exists, how to appear, and who is on it (names, and amounts only where shown). It never invents names, amounts or totals.
11. No new server code, env vars, dependencies or storage keys.

## Copy (ES / EN)
| Key | ES | EN |
| --- | --- | --- |
| `support.proof.title` | ¿Ya hiciste tu aporte? | Already sent your support? |
| `support.proof.body` | Envíanos el comprobante por WhatsApp y dinos con qué nombre quieres aparecer. | Send us the receipt on WhatsApp and tell us the name you want to appear under. |
| `support.proof.cta` | Enviar comprobante | Send receipt |
| `support.next.body` (changed) | Pégala en tu banco o billetera y envía lo que quieras. Después, mándanos el comprobante. | Paste it in your bank or wallet and send what you like. Then send us the receipt. |
| `support.next.message` (changed) | Hola, hice un aporte a Forest Media Récords y adjunto el comprobante. Nombre para la lista de apoyo (opcional): | Hi, I sent support to Forest Media Récords and I'm attaching the receipt. Name for the supporters list (optional): |
| `support.board.title` | Quienes más apoyan | Top supporters |
| `support.board.lede` | Gente que cree en esto y lo demuestra. | People who believe in this and show it. |
| `support.board.open` | Lugar libre | Open spot |
| `support.board.first` | El primer nombre puede ser el tuyo. | The first name can be yours. |
| `support.board.rest` | También apoyan | Also supporting |
| `support.board.how` | ¿Quieres aparecer? Envía tu comprobante y elige tu nombre. | Want to appear? Send your receipt and choose your name. |
| `support.board.rank` (screen readers) | Puesto | Rank |
| `support.photos.lead` (alt, in `data/support.ts`) | RS el Italiano grabando en la cabina de Forest Media Récords, con Medellín de noche al fondo | RS el Italiano recording in the Forest Media Récords booth, Medellín at night behind him |
| `support.photos.side` (alt, in `data/support.ts`) | Nikosan produciendo en el estudio de Forest Media Récords | Nikosan producing in the Forest Media Récords studio |

`support.next.tellUs` ("Avisar por WhatsApp") is removed: the proof button replaces it.

## Design and motion
Built with `/impeccable` (shape the change against `DESIGN.md` → craft → finish review), extending the Support Ingot. The world stays the forge floor; nothing new is invented where a material exists.

- **Why it reads linear today:** two text columns and one plate, no picture, same rhythm top to bottom. The change adds two pictures and one ranked object, each with a different shape.
- **Desktop (from `lg`):**
  1. Row one: the lead photo as a tall print on the left (5 columns, about 4:5, `.iron-photo`, `.parallax`), with the title and the pitch set on its foot over a forge-black fade; the ingot plate on the right (7 columns), unchanged except for the proof row.
  2. Row two: the three messages three across, on hairlines, so they stop competing with the plate.
  3. Row three: the board (8 columns) beside the side photo (4 columns, 3:4 print with a short heat bar and a mono caption, like the FMR Gang prints).
  4. Then the spending list (when filled) and the fine print.
- **Phones:** title and pitch on a short crop of the lead photo (about 4:3, so the key plate is still reached in one scroll), key plate with the proof row, messages, board, side photo, fine print. No horizontal scroll at 320px.
- **Board:** one steel plate. Five rows on iron hairlines: a stencil numeral 01–05, the name in stencil, the amount in mono tabular figures on the right when shown. **Rank is temperature**, the same rule as "En tendencia": the numeral and a 3px heat line take white, hot, hot, warm, warm. Empty spots are cold: steel numeral, "Lugar libre" in mono. "También apoyan" is one wrapped mono line under the rows. No avatars, no medals, no confetti.
- **Proof row:** steel button, ember arrow, same row in both states so nothing jumps when the key is copied.
- **States:** board empty (five open spots), partly filled, full with a "También apoyan" line, sample (`?apoyo=demo`), hidden (`showBoard: false`), photo missing. All reviewable at `/preview/apoyar` with the existing `?apoyo=` modes.
- **Motion:** photos forge in with the existing `.forge-in` shutter and drift with `.parallax`; board rows use the existing `.drop`. No new keyframes unless the review asks for them. Everything is off under `prefers-reduced-motion`, as today.
- **Accessibility:** the board is an ordered list; each row's accessible text reads "Puesto 1, <name>, <amount>"; heat is never the only signal (the numeral carries the rank); the proof button says it opens a new tab.

## Security, privacy and money
- No secrets, routes or storage. The site doesn't receive the proof: it travels by WhatsApp.
- Names and amounts on the board are personal data published by consent. Daniel adds a name only after the supporter asked for it in writing (the WhatsApp message is the record) and after the transfer shows in Nequi. Removal on request is a one-line edit.
- `data/legal.ts` (draft, for the team's review):
  - Privacy: "Si nos envías un comprobante por WhatsApp, lo usamos solo para confirmar tu aporte y llevar nuestro registro. Tu nombre aparece en la lista pública de apoyo solo si lo pides, con el nombre que elijas, y lo quitamos cuando nos lo pidas." / "If you send us a receipt on WhatsApp, we use it only to confirm your support and keep our records. Your name appears on the public supporters list only if you ask, under the name you choose, and we remove it whenever you ask."
  - Terms: "Aparecer en la lista de quienes apoyan es opcional y no es una contraprestación: publicamos el nombre que nos indiques, y el monto solo si lo autorizas." / "Appearing on the supporters list is optional and is not something given in exchange: we publish the name you give us, and the amount only if you allow it."
- Every total on the board must match the private ledger. The site shows no overall total and no goal.

## Cost impact
None. No new service, script or request; two more lazy images below the fold.

## Vault updates
- `docs/Features/Support.md`: the board, the proof row, the photos, how to add a supporter.
- `docs/Decisions/`: new note "Top supporters are listed by consent and edited by hand" (covers proof by WhatsApp, per-person amounts, open spots); `Support starts with Bre-B and PayPal, gateway later` gets a line that proof is now asked for.
- `docs/Daily/` (build day), `docs/Project/Roadmap.md` (later: `?admin` form for the board), `docs/Project/Open questions.md` (who reads the label's WhatsApp).
- `DESIGN.md` → "Support Ingot": the photos, the board and its rank-is-temperature rule.

## Acceptance criteria
- [ ] The proof button is visible before and after copying the key and opens WhatsApp with the message in the page's language.
- [ ] With `supporters: []` the board shows five open spots and the invitation.
- [ ] With seven supporters, five are ranked by total and two are named below; an amount shows only where `showAmount` is true.
- [ ] `showBoard: false` removes the board; an empty photo path removes that photo; the layout holds in both cases.
- [ ] No horizontal scroll at 320, 390 and 1440px; a 40-character name doesn't break a row.
- [ ] ES and EN complete (`tsc` passes); sample data never shows on the live hosts.
- [ ] The finish review returns "ship", or its fixes are applied.

## Checks
- [ ] `npx tsc --noEmit`
- [ ] `npm run lint` (touched files; the two old errors in `marketing/` are not from this work)
- [ ] `npm run build`
- [ ] `npm run build && npm start`: the two photos load lazily and the section doesn't slow the page
- [ ] Click-through: phone and desktop, ES and EN, reduced motion, every `?apoyo=` state
- [ ] `python3 .claude/skills/obsidian-gardener/scripts/check_vault.py docs`

## Manual test steps
1. Run `npm run dev` and open `http://localhost:3000/preview/apoyar`: real key, empty board with five open spots, both photos.
2. Tap "Enviar comprobante": WhatsApp opens with the prefilled message. Switch to English and repeat.
3. Tap "Copiar llave": the proof row changes its heading, and there is still one WhatsApp button.
4. Open `http://localhost:3000/preview/apoyar?apoyo=demo`: seven sample supporters, five ranked, two named, tagged "Ejemplo".
5. In `data/support.ts`, add one real-looking test entry with `showAmount: true` and one without; check the order and that only one amount shows. Remove both afterwards.
6. Set `showBoard: false`: the board disappears. Set it back.
7. Repeat steps 1 to 4 at phone width, and once with reduced motion turned on.

## As built
- **Logo, not a photo, over the title.** Daniel reviewed the lead photo (RS el Italiano), then the three-artist strip from the QR card, and chose the label's vinyl logo instead. It sits whole on a steel plate (`public/brand/logo.png`), not graded. `photos.lead` was removed from `data/support.ts`; only `photos.side` remains.
- **Side photo:** Lowkey at the studio desk (`lowkey4.webp`) instead of Nikosan, at Daniel's request.
- **Empty board:** after the design review, spot 01 carries "El primer nombre puede ser el tuyo" in steel stencil and the open spots below are slimmer; the lede only shows once there are supporters.
- **Title floor** lowered to 2.4rem so "Apoya a Forest" keeps one line at 320px.
- The page-wide detector run flags only patterns that predate this work (small mono labels, heat glows elsewhere on the page). Not addressed here.


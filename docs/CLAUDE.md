# Vault: Forest Media Récords (docs/)

## Overview
The project's working vault: knowledge about the Forest Media Récords website (code in the parent folder). It holds the project overview, architecture, conventions, one note per page feature, dated decisions, the roadmap, open questions and daily logs. Edited only by Daniel and Claude; synced with Obsidian Sync and git. Entry point: `Home.md`.

## Structure
- `Home.md`: index linking everything; embeds `Decisions.base`.
- `Project/`: Overview, Tech stack, Architecture, Conventions, Content guide, Roadmap, Open questions.
- `Design/`: Design system (short version of `../DESIGN.md`).
- `Features/`: one note per page section (Hero, Agenda, Trending, Artists, Streamers, Kick section, La forja, Studio, Demo form, Legal pages, Navigation and footer, Bilingual copy).
- `Decisions/`: one note per durable decision (context, decision, consequences).
- `Daily/YYYY-MM-DD.md`: work logs (core Daily notes, template `Templates/Daily`).
- `Templates/`: Daily, Decision, Feature (core Templates syntax `{{date:YYYY-MM-DD}}`, `{{title}}`).
- `Decisions.base`, `Features.base`: Bases table views.
- New, unsorted notes: `Inbox/` (create when first needed).

## Conventions
- Links: `[[wikilinks]]`, shortest form (note names are unique). Link liberally: features ↔ decisions ↔ code paths.
- Frontmatter (required): `type` (`index|reference|roadmap|feature|decision|daily`), `date: YYYY-MM-DD`, `tags` (list). Plus `status`: features `planned|building|built`, decisions `proposed|accepted|superseded`, others `active|open`. Features add `code:` (repo paths) and `related:` (wikilinks in quotes).
- Note names: Title case in plain words; daily notes by date; decision names state the decision.
- Code references as repo-relative paths in backticks (`components/Hero.tsx`).
- Core plugins only (no Dataview/Templater). Use Bases for views (see the `obsidian-bases` skill).

## How Claude works in this vault
Keep the vault in step with the code. After any meaningful change:
1. Update the affected `Features/` note (what it does, open issues).
2. Add a `Decisions/` note when something durable was chosen (from `Templates/Decision.md`); mark the old one `superseded` if it changes.
3. Append factual bullets under `## Log` in today's `Daily/` note (create it from the template if missing).
4. Tick or add items in `Project/Roadmap.md`; move answered items out of `Project/Open questions.md`.

Claude may create and edit notes in `Project/`, `Features/`, `Decisions/`, `Daily/` and `Inbox/` for this purpose.

## Restrictions
- Do not move, rename, or delete notes without asking (renames break links unless done in Obsidian or via `obsidian move`).
- Never edit `.obsidian/` except when asked.
- Don't rewrite notes the team wrote; append, or propose edits.
- Preserve frontmatter keys and order, wikilinks, block IDs and embeds.
- Never invent project facts (events, URLs, names, dates); mirror what the code and the team say, and record unknowns in `Project/Open questions.md`.
- No emojis or filler. When answering from the vault, cite notes as [[wikilinks]].

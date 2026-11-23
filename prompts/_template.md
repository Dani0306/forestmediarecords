# NNN · Short title

**Date:** YYYY-MM-DD · **Branch:** `feat/<slug>` · **Status:** draft | approved | built

## Goal
What the visitor or the team can do when this ships, in one or two sentences.

## Docs read
- Link or path, and what it confirmed (API shape, limit, price, model ID…).

## Code inspected
- `path/to/file.ts`: what it does today and what this task changes or reuses.

## Decisions and assumptions
- **Decision:** what was chosen. **Rejected:** the alternative, and why (two or three sentences).
- **Assumption:** what was assumed without asking, and how to undo it if wrong.

## Files to touch
- `path`: create / edit, and why.

## Requirements
1. Behaviour, in testable statements.

## Copy (ES / EN)
| Key | ES | EN |
| --- | --- | --- |
| `section.key` | … | … |

## Design and motion
- Where it sits in the forge world (tokens, materials, heat as state), layout at phone and desktop widths, the states (loading, empty, error, success) and their preview URLs, the motion and its reduced-motion fallback.

## Security, privacy and money
- Secrets and env vars (added to `.env.example`), input validation, rate limits, personal data and what `data/legal.ts` must say, payment handling if any.

## Cost impact
- New services, API calls per visit, monthly estimate. "None" if none.

## Vault updates
- `docs/Features/…`, `docs/Decisions/…`, today's daily note, roadmap, open questions, `DESIGN.md`.

## Acceptance criteria
- [ ] …

## Checks
- [ ] `npx tsc --noEmit`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Click-through: phone and desktop, ES and EN, reduced motion, every preview state

## Manual test steps
1. Run `npm run dev`, open `http://localhost:3000/...`
2. …

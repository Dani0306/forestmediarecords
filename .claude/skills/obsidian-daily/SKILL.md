---
name: obsidian-daily
description: Log work into today's daily note in the docs/ Obsidian vault. Use after any meaningful code, content, design or deploy change in this project, when the user says "log this", "update the daily", "add to today's note", or at the end of a work session. Creates Daily/YYYY-MM-DD.md from the template when missing and appends factual bullets under Log.
---

# Obsidian daily log

The vault is `docs/` (rules: `docs/CLAUDE.md`). Daily notes live in `docs/Daily/YYYY-MM-DD.md`, built from `docs/Templates/Daily.md`.

## Workflow

1. **Get today's date** from the environment (`date +%F`). Never guess it.
2. **Open or create the note** `docs/Daily/<date>.md`.
   - If missing, copy `docs/Templates/Daily.md` and replace every `{{date:YYYY-MM-DD}}` with the date. Leave no template tokens behind.
   - If present, read it first.
3. **Append bullets under `## Log`**, after the existing ones. If the note has no `## Log` heading, add one at the end.
4. **Verify** the frontmatter still has `type: daily`, `date`, `tags: [daily]`, and that no wikilink you added is broken (check the target exists under `docs/`).

## Writing the bullets

- One bullet per change, past tense, factual: what changed and where.
- Link the affected note: `→ [[Hero]]`, decisions as `→ [[Deploy on Vercel]]`. Use the shortest wikilink form; note names are unique.
- Code paths in backticks, repo-relative: `data/artists.ts`.
- Group a batch of related changes as one parent bullet with nested bullets.
- Credit the team when they did it ("renamed by Daniel").
- No emojis, no filler, no claims you did not verify (say "build not run" rather than implying it passed).

Example:

```markdown
## Log
- New photo `public/RS/rsmain.avif` set as the main RS el Italiano portrait in `data/artists.ts` → [[Artists]].
- Deployed to production with `npx vercel@latest --prod`.
```

## Do not

- Rewrite or reorder earlier bullets, or edit past days' notes (append a correction to today instead).
- Touch `## Plan` or `## Tasks` unless asked; tick a task only when its work is done.
- Use Templater or Dataview syntax; the vault uses core plugins only.

## After logging

The daily log is one of four upkeep steps in `docs/CLAUDE.md`. Also check whether the change needs a `Features/` update, a `Decisions/` note, or a Roadmap / Open questions edit, and do those too.

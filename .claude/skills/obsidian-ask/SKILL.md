---
name: obsidian-ask
description: Answer questions about the Forest Media Récords project from the docs/ Obsidian vault, citing notes as wikilinks. Use when the user asks why something was decided, what a feature does, what is pending or open, what happened on a given day, or any "what do we know about X" question that the vault may cover.
---

# Answer from the vault

The vault `docs/` is the project's memory. Answer from it first, cite it, and say plainly when it does not know.

## Workflow

1. **Locate.** Start from `docs/Home.md` for the map. Then search:
   - `grep -ril "<term>" docs --include=*.md` for keywords (try Spanish and English terms, artist slugs, file paths).
   - Pick the folder by question type: why → `Decisions/`; what/how → `Features/` and `Project/Architecture.md`; when → `Daily/`; pending → `Project/Roadmap.md` and `Project/Open questions.md`; content rules → `Project/Content guide.md`.
   - Follow `[[wikilinks]]` and `related:` frontmatter one hop out.
2. **Read** the relevant notes in full, not just the matching lines.
3. **Check freshness** when the answer is about current behavior: compare against the code paths the note lists (`code:` frontmatter). If the code disagrees, say so and trust the code.
4. **Answer.**

## Answer format

- Lead with the direct answer in one or two sentences.
- Cite every claim with the note it came from: `(see [[Main event takes over the hero]])`. Cite daily notes by date: `[[2026-10-06]]`.
- If decisions conflict, prefer the one with `status: accepted` and mention the `superseded` one.
- If the vault has no answer, say "The vault doesn't record this" and, if it is a real gap, offer to add it to `Project/Open questions.md`.
- Never fill gaps with guesses about events, dates, people, URLs or stats.

## Do not

- Edit notes while answering, unless the user asks or a fix is trivial and you say so.
- Quote long passages; summarize and link.

---
name: obsidian-gardener
description: Health-check and tidy the docs/ Obsidian vault - broken wikilinks, orphan notes, missing or invalid frontmatter, stale feature notes, Inbox triage. Use when the user asks to clean up, audit, garden or check the vault, fix links, find orphans, or after a large batch of changes.
---

# Vault gardener

Keeps `docs/` consistent with its rules in `docs/CLAUDE.md`.

## 1. Run the check

```bash
python3 .claude/skills/obsidian-gardener/scripts/check_vault.py docs
```

It reports (read-only):
- **Broken links**: `[[Target]]` with no matching note, attachment or heading file.
- **Orphans**: notes nothing links to (excluding `Home`, `Daily/`, `Templates/`).
- **Frontmatter**: missing `type`, `date`, `tags`, or `status` values outside the allowed set per type; features missing `code:`.
- **Stale code paths**: backticked repo paths in feature notes that no longer exist.
- **Inbox**: notes waiting in `Inbox/`.

## 2. Fix what is safe

Fix without asking:
- A broken link where the intended target is obvious (typo, case): edit the link text.
- Missing required frontmatter keys: add them, keeping existing keys and their order.
- Orphans: add a link from the natural parent (`Home.md` section, the related feature, or the decision's feature note).
- Stale code paths: update to the moved path if you can confirm it in the repo.

Ask first:
- Renaming, moving, merging or deleting any note (renames break links unless done in Obsidian or with `obsidian move`; see `obsidian-cli`).
- Rewriting prose the team wrote.
- Changing a decision's `status` or a feature's `status`.
- Moving Inbox notes into `Project/`, `Features/` or `Decisions/`.

Never edit `.obsidian/`.

## 3. Check feature notes against the code

For each `Features/*.md` touched recently: read its `code:` files and compare with "What it does" and "Open issues". Report mismatches; fix only factual drift (paths, names), propose the rest.

## 4. Report

Summarize: counts per issue type, what you fixed (with note names as wikilinks), and what needs a decision from the user. Log the cleanup in today's daily note (see `obsidian-daily`).

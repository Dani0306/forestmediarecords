---
name: obsidian-vault-setup
description: Create or repair the structure of the docs/ Obsidian vault - folders, templates, Bases views, Home index and vault rules - following docs/CLAUDE.md. Use when the vault is missing pieces, when adding a new note type or folder, when the user asks to set up or restructure the vault, or when starting a similar vault for another project.
---

# Vault setup

Builds or repairs the vault so it matches the structure in `docs/CLAUDE.md`. Idempotent: never overwrite a file that exists; report it and move on.

## Target structure

```
docs/
  CLAUDE.md            vault rules (source of truth for this skill)
  Home.md              index; links every folder, embeds Decisions.base
  Decisions.base       table of type=decision
  Features.base        table of type=feature
  Project/             Overview, Tech stack, Architecture, Conventions, Content guide, Roadmap, Open questions
  Design/              Design system
  Features/            one note per page section
  Decisions/           one note per durable decision
  Daily/               YYYY-MM-DD.md
  Inbox/               unsorted captures (create when first needed)
  Templates/           Daily, Decision, Feature
  .obsidian/           app config (do not edit unless asked)
```

## Workflow

1. **Inventory** what exists: `find docs -not -path '*/.obsidian/*' -type f | sort`.
2. **Compare** with the target structure and list what is missing.
3. **Create only what is missing**:
   - Templates use core Templates syntax: `{{date:YYYY-MM-DD}}` and `{{title}}`. No Templater.
   - Frontmatter follows `docs/CLAUDE.md`: `type`, `date`, `tags`, `status` (+ `code`, `related` for features).
   - Bases: follow the `obsidian-bases` skill. Minimal decisions view:

```yaml
filters:
  and:
    - 'type == "decision"'
views:
  - type: table
    name: Decisions
    order:
      - file.name
      - status
      - date
```

   - Project notes: create with headings and an empty body; never invent content. Put unknowns into `Project/Open questions.md`.
4. **Wire** every new note into `Home.md` or its parent note so nothing is orphaned.
5. **Config** (only if asked or missing): `.obsidian/daily-notes.json` → `{"folder":"Daily","format":"YYYY-MM-DD","template":"Templates/Daily"}`; `.obsidian/templates.json` → `{"folder":"Templates"}`.
6. **Verify** with the `obsidian-gardener` check script, then log the setup in today's daily note.

## Adding a new note type

1. Add the type and its allowed `status` values to `docs/CLAUDE.md` (Conventions).
2. Add a template in `Templates/`.
3. Add a `.base` view if the type will have many notes, and embed it in `Home.md`.
4. Add the type to `ALLOWED_STATUS` in `.claude/skills/obsidian-gardener/scripts/check_vault.py`.

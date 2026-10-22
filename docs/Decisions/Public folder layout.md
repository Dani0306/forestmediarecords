---
type: decision
status: accepted
date: 2026-10-21
tags:
  - decision
related:
  - "[[Architecture]]"
  - "[[Content guide]]"
---

# Public folder layout

## Context
`public/` had loose files in the root (logo, loop videos, `poster1.webm`), mixed-case folders (`RS`, `nicocol`), duplicate images (the Futuras Promesas posters lived in `kick/`, `events/` and `trending/`) and large unused originals that were only kept out of Vercel by `.vercelignore`.

## Decision
- `public/` holds only what the site serves, grouped by purpose, lowercase kebab-case: `brand/`, `hero/`, `artists/<artist>/`, `streamers/<streamer>/`, `tiraderas/{participants,juries}/` plus `sorteo.avif`, `futuras-promesas/`, `trending/`.
- Files are named `<subject>-<n>` (`lentino-1.avif`, `trianiss-2.avif`, `rs-estudio-3.avif`); participant files are lowercase Kick names.
- Unused originals, video sources and exact duplicates moved to `source/` at the repo root (git-tracked, listed in `.vercelignore`, never served). Nothing was deleted.
- Every code and docs path was rewritten in the same change; all `/path` strings in `app/`, `components/`, `data/`, `lib/` were checked to exist.

## Consequences
- New files go in the matching folder. Re-encoded images should get a new name (browser and `next/image` caches are keyed by URL).
- Paths are case-sensitive on Vercel: keep everything lowercase.

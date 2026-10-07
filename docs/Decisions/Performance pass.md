---
type: decision
status: accepted
date: 2026-10-05
tags:
  - decision
---

# Performance pass

## Context
Scrolling lagged, worst on large screens and in `next dev`.

## Decision
Video re-encoded 5.7 → 1.08 MB and paused off-screen; agenda glass uses a pre-blurred photo copy instead of live `backdrop-filter`; photo heat sweep animates `transform`; countdown isolated; logo served as 42 KB `logo-512.webp`.

## Consequences
Production page about 2.3 MB at a steady 60 fps. Judge performance with `npm run build && npm start`, not `next dev`.

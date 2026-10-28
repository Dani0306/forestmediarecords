---
type: decision
status: superseded
date: 2026-10-27
tags:
  - decision
related:
  - "[[Top songs]]"
---

# Top songs as two sides of a record

## Context
The team asked for a section with the three most played songs of Lentino and RS el Italiano, with covers and songs to come later. Most of the page already uses photo cards over black glass, and the team had just said the agenda felt too similar to the rest.

## Decision
Draw the two artists as the two sides of one vinyl record: Lado A and Lado B, tracks A1–A3 and B1–B3 (real vinyl notation, which also carries the rank). A sleeve with its record peeking out shows the chosen song; the tracklist sits beside it.

## Consequences
- Works before any artwork exists: a missing cover prints the title on a steel plate, a missing song reads "Por anunciar", and the section stays hidden while all sides are empty.
- Audio previews are optional per song; without them the play button doesn't appear.
- Built for two artists (A/B). A third artist would need a different device (a second record, or a C side).
- A dev-only preview route with sample songs exists for design review; it returns 404 in production.

> [!note] Superseded 2026-10-27 by [[Top songs as sleeve bands]]: the team found it too plain and didn't want to switch between artists.

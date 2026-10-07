---
type: decision
status: accepted
date: 2026-10-06
tags:
  - decision
---

# Kick section led by Futuras Promesas

## Context
The Kick section had only placeholder streams and a heat "ingot" gauge. The team supplied two real posters for **Futuras Promesas #2**, a Forest Media Records streaming session on kick.com/leolugolive.

## Decision
Lead the section with the latest Kick edition: posters shown untreated as pinned prints, the lead poster blurred into the section's background glow, and the edition facts (winner, line-up, motto) set in the forge type. Content lives in `data/kick.ts`; the ingot gauge was removed. Upcoming streams and the channel move to a translucent plate below.

## Consequences
- Real proof of activity on Kick instead of placeholders.
- New editions only need a `data/kick.ts` entry and posters in `public/kick/` ([[Content guide]]).
- Posters bring Kick's green into the forge palette in this one section, by design.

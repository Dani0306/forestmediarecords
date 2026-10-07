---
type: decision
status: accepted
date: 2026-10-05
tags:
  - decision
---

# Artist stage with tabs

## Context
The roster will grow and gain bios and more data.

## Decision
One artist at a time: tabs to pick, large photo stage, profile on `.glass-side`, bio intro plus expandable full bio; data in `artists[].profile` with mock-ups flagged `sample`.

## Consequences
Scales to many artists without a very long page; data shape ready for real bios.

## Update (2026-10-06)
The stage look and motion changed in [[Artist stage as a reel]]; the tab model and data stay as decided here.

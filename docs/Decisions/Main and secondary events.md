---
type: decision
status: accepted
date: 2026-10-05
tags:
  - decision
---

# Main and secondary events

## Context
The team liked the big countdown panel and the slim heat-line strip, and wanted both.

## Decision
`featured: true` events are **main** (hero panel with photo and countdown); others are **secondary** (heat-line strip). Later the main panel lost its card and sits on blurred black glass on the right of the hero; the secondary strip is commented out **on purpose** and will be enabled once there is a real secondary event.

## Consequences
One source of truth (`data/events.ts`) drives both; editors pick main events with a flag.

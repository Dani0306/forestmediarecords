---
type: decision
status: accepted
date: 2026-10-10
tags:
  - decision
---

# Tournament as its own section with a live bracket

## Context
The team sent the full announcement for the Mundial de Tiraderas 2026 (five dated rounds, judges, scoring, prize, rules) and asked for a way to show it. The agenda only holds date, title and place per event.

## Decision
- Each round is a regular `stream` event in `data/events.ts` (`main: false`, 21:00, Kick), so the agenda, Kick list and streamer panel pick it up from one source.
- The tournament gets its own section after the agenda ([[Mundial de Tiraderas]]): calendar heated by proximity, a bracket filled in as results come in (8 players at first; 6 with a battle royale since [[Six-player format with a battle royale]]), and rule-separated rows for judges, scoring, making and the winner's moment. Content lives in `data/tiraderas.ts`, linked to the events by id.
- No hero takeover: the rounds stay `main: false` so the artist video keeps the first screen.

## Consequences
- Dates are edited once, in `data/events.ts`.
- The bracket needs updating after the draw and after every round.
- Making a round `main: true` would put it in the hero takeover (poster or photo with a big countdown) if the team wants more weight on it.

---
type: decision
status: accepted
date: 2026-10-07
tags:
  - decision
---

# Main event takes over the hero

## Context
Daniel: the main event is what gives Forest visibility, so it should get the visitor's full attention on arrival; the artist video should stay the default hero.

## Decision
- Two hero modes chosen from `data/events.ts`: a `main: true` event upcoming or live → **event takeover** (the event and its countdown fill the first screen); none → the **video hero**.
- The takeover replaces the side panel from [[Main and secondary events]]; the video does not play behind it (the poster's own blurred glow is the background), so nothing competes with the event.
- The countdown is the loudest element; "Agregar al calendario" is offered next to "Ver en Kick" so visitors can commit before leaving.
- Server render uses the build time as "now" (`BUILD_TIME` in `next.config.ts`) so the right mode survives hydration.

## Consequences
- Marking an event `main: true` changes the whole first screen: use it for the one event that matters most.
- A redeploy is not needed when events start or end; the browser switches modes on its own.

---
type: reference
status: active
date: 2026-10-05
tags:
  - design
related:
  - "[[Visual direction - forge world]]"
---

# Design system

Full spec: `DESIGN.md` (tokens in frontmatter) and `.impeccable/design.json`. This note is the short version.

**World:** a blacksmith's forge floor at night. Artists are workpieces, events are heats. Chosen in [[Visual direction - forge world]].

## Palette
- Neutrals: forge `#0b0b0d`, forge-2 `#131316`, forge-3 `#1b1c20`, anvil `#2a2d31`, steel `#9a9ea5`, iron `#ece6da`, scale `#070707`.
- Heat ramp (**state only**): cherry `#c21e0e` → ember `#ff5a11` → glow `#ffa62b` → white-heat `#fff3c4`.
- Heat states: `live`, `white` (≤72 h), `hot` (≤7 d), `warm` (≤21 d), `embers`, `cold` (finished).

## Type
- **Saira Stencil** 800, uppercase, live `wdth` axis: headings and names.
- **Martian Mono**: readouts, dates, labels (tabular numbers).
- **Archivo**: body text.

## Signature components
- **Hot / steel buttons**, **stamp** labels, **heat gauge** bars.
- **Iron photo**: grayscale and heat-ramp duotone, true colour on hover.
- **Glass**: `.glass-side` (hero main event, artist stage) and `.glass-field` (agenda, trending and streamer cards, pre-blurred).
- [[Hero]] video and main-event field, [[Agenda]] event cards, [[Trending]] mosaic, [[Artists]] stage, [[Streamers]] channel split screen, [[Kick section]] pinned posters.
- [[Studio]] rate card (mono prices, rule-separated rows) and booking form; form states (sending, error, thanks) shared with the [[Demo form]].
- Cookie notice and the legal reading layout ([[Legal pages]]).
- **Scroll choreography**: CSS view timelines (forge-in shutter, photo drift, hero sink, floating posters).

## Rules
- No eyebrow labels above headings; no decorative glows except the hero headline cooling.
- Motion: hammer ease `cubic-bezier(0.16, 1, 0.3, 1)`; everything respects reduced motion.

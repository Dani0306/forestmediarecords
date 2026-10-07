---
type: decision
status: superseded
date: 2026-10-06
tags:
  - decision
---

# Artist stage as a reel

## Context
After [[Streamers]] shipped, Daniel felt it overshadowed [[Artists]]: the artist stage was dark (iron duotone), static and had small tab buttons.

## Decision
- Artist photos show in true colour, lit from below by the forge ramp, instead of the full iron duotone.
- Photos auto-advance as a reel with heat-filling segment bars and a slow zoom, paused on hover, focus, off screen, open bio and reduced motion. The CSS animation's end drives the advance, so pausing stays in sync.
- The artist name is stamped huge across the photo; the tabs became a big roster index with a heat rule.
- The next date became a highlighted row in the profile.

## Consequences
- Artists and streamers now each have their own motion: a reel for artists, a channel switch for streamers.
- Supersedes the stage part of [[Artist stage with tabs]] (tabs and data model unchanged).

## Superseded (2026-10-06)
Daniel preferred the earlier stage look (iron duotone, name in the glass panel, fact grid). It is back, keeping the smaller size, the photo framing and the Escuchar button; the reel, the giant stamped name and the colour grade were removed. The roster index tabs stay.

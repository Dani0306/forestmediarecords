---
type: decision
status: accepted
date: 2026-10-06
tags:
  - decision
---

# Streamers as a channel split screen

## Context
The team asked for a "Nuestros streamers" section similar to [[Artists]] but not the same, with different details, for Leonardo Lugo (leolugolive) and Daniel Triana (trianiss). Their photos come later.

## Decision
- Same materials as the artist stage (photo, black glass, stencil name, readout facts), different structure: channels side by side, one open at a time, like switching feeds, instead of tabs over one stage.
- The open channel is in true colour, closed channels in cold grayscale. It reads as "on air" without claiming live status (there is no Kick live API in the site).
- Streaming-specific details: CH number, handle, content, schedule, next stream from the agenda, a highlight from the channel.
- Stand-in photos from the artist folders, tagged "Foto de ejemplo", with alt text that says so.

## Consequences
- New streamers are one entry in `data/streamers.ts`; the split screen handles any count, but more than three makes closed panels thin.
- To show a stream as a streamer's next stream, set the event `url` to their channel.

## Update (2026-10-06)
Both streamers now have real photos and bios, shown by their Kick nicknames (LeoLugoLive, Trianiss) with full names in the details. The open channel shows the portrait at true size on the right instead of full-bleed.

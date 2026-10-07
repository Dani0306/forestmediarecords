---
type: feature
status: built
date: 2026-10-06
code: "components/Streamers.tsx"
tags:
  - feature
related:
  - "[[Placeholder content policy]]"
  - "[[Streamers as a channel split screen]]"
  - "[[Artists]]"
---

# Streamers

**Code:** `components/Streamers.tsx`, `data/streamers.ts`

## What it does
"Nuestros streamers" / "Our streamers", right after [[Artists]], anchor `#streamers` (desktop nav from 1280px; always in the menu and footer).
- The big display name is the **Kick nickname**; the full name shows in the "Nombre" row, the bio and the closed panel.
- **LeoLugoLive** (Leonardo Lugo), `kick.com/leolugolive`: the channel that supports Forest; highlight: Futuras Promesas #2 streamed there → [[Kick section]].
- **Trianiss** (Daniel Triana), `kick.com/trianiss`.
- Desktop: split screen, one channel open, the other narrow (grayscale, vertical name). Hover or click opens a channel. The open channel shows its portrait at true size on the right over a blurred wash, with the details in one left column (so low-resolution photos are never upscaled). Mobile: both stacked and open.
- Details differ from the artists: channel number (CH 01), Kick handle, content chips, schedule, next stream (from `data/events.ts` streams whose `url` is the channel; streams with no `url` count as leolugolive), "En su canal" highlight.

## LeoLugoLive (real, 2026-10-06)
- Photo `public/leolugo/leolugo-portrait.avif`, cropped from Daniel's phone screenshot `leolugo1.avif` (status bar and chat bar removed); `focus: "50% 42%"` keeps the face high in the wide open panel.
- Bio summarised from Daniel's text in three paragraphs (born in Villavicencio in 2003, in Medellín for two years, on-camera presence, Forest projects joining streaming and music, his goals). Details: Nombre, De (Villavicencio → Medellín), content chips.


## Trianiss (real, 2026-10-06)
- Photo `public/triana/triana.avif` (1440×1800, at Stream Fighters), `focus: "50% 24%"`.
- Bio summarised from Daniel's text: born in Medellín in 2004, started streaming in the US, back in Medellín about two years; Westcol moderator, Stream Fighters guest, collaborations; Kick ~500 followers, Twitch 2,000+, ~25 average viewers, peak 130 (as of 2026-10-06, will go stale).

## Open issues
- [ ] Refresh Trianiss's follower and viewer numbers from time to time (they're in the bio text)
- [ ] Higher-resolution photos of Leo (the current one is 738 px wide, from a phone screenshot)
- [ ] Leo's streaming schedule
- [ ] Does any agenda stream go out on kick.com/trianiss? Set its `url` in `data/events.ts` to show it here

## Decisions
[[Placeholder content policy]], [[Streamers as a channel split screen]]

---
type: feature
status: built
date: 2026-10-05
code: "components/KickSection.tsx"
tags:
  - feature
related:
  - "[[Placeholder content policy]]"
  - "[[Kick section led by Futuras Promesas]]"
---

# Kick section

**Code:** `components/KickSection.tsx`, `data/kick.ts`

## What it does
"En vivo en Kick", led by the latest **Kick edition** from `data/kick.ts`: currently **Futuras Promesas #2** (Forest Media Récords presents, streaming session on Kick), winner **Jhanky**, line-up Jhanky × Kamerongray × Superwil × Vcelest × Falo KLK, motto "El talento también se premia".
- Background: the lead poster blurred into a dark glow (static, cheap to scroll).
- Posters `public/kick/kick1.avif` (winner) and `kick2.avif` (line-up) pinned like prints; hover straightens one.
- Bottom plate: upcoming streams (from `data/events.ts`, heat-coloured dates) and the channel **`leolugolive`** with "Ir al canal". Every "Ver en Kick" action links to `https://kick.com/leolugolive`.
- Channels: the supporting channel **`leolugolive`** first (logo), then the team's other Kick channels taken from `data/streamers.ts` (today **`trianiss`**, with his photo zoomed on the face). Artist channels were removed earlier.

## Open issues
- [x] `leolugolive` is LeoLugoLive (Leonardo Lugo), see [[Streamers]]
- [ ] Artist Kick channels, if any
- [ ] Dates of Futuras Promesas editions (none printed on the posters)
- [ ] Should Futuras Promesas also appear in the [[Agenda]]?

## Decisions
[[Placeholder content policy]], [[Kick section led by Futuras Promesas]]

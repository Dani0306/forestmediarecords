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
"En vivo en Kick", led by the latest **Kick edition** from `data/kick.ts` (the first entry): since 2026-10-08 **Futuras Promesas #3** (7 Oct, 9:00 PM), winner **2BLE B** from Barranquilla, motto "El talento también es del Caribe". Its poster prints cities, not names, so the row shows **Ciudades: Medellín × Bogotá × Barranquilla** (winner's city in ember) until the competitors' names exist. Posters: `trending/ganadorft3.avif` (winner, front) and `trending/ft3.avif` (line-up, behind). Futuras Promesas #2 (Jhanky) stays in `editions` as the previous edition.
- Background: the lead poster blurred into a dark glow (static, cheap to scroll).
- Posters `public/kick/kick1.avif` (winner) and `kick2.avif` (line-up) pinned like prints; hover straightens one.
- Bottom plate: upcoming streams (from `data/events.ts`, heat-coloured dates) and the channel **`leolugolive`** with "Ir al canal". Every "Ver en Kick" action links to `https://kick.com/leolugolive`.
- Channels: the supporting channel **`leolugolive`** first (logo), then the team's other Kick channels taken from `data/streamers.ts` (today **`trianiss`**, with his photo zoomed on the face). Artist channels were removed earlier.

## Open issues
- [x] `leolugolive` is LeoLugoLive (Leonardo Lugo), see [[Streamers]]
- [ ] Artist Kick channels, if any
- [ ] Names of the Futuras Promesas #3 competitors (only cities on the poster)
- [ ] Should Futuras Promesas also appear in the [[Agenda]]?

## Decisions
[[Placeholder content policy]], [[Kick section led by Futuras Promesas]]

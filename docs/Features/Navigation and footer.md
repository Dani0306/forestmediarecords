---
type: feature
status: built
date: 2026-10-05
code: "components/SiteNav.tsx, components/SiteFooter.tsx"
tags:
  - feature
related:
  []
---

# Navigation and footer

**Code:** `components/SiteNav.tsx, components/SiteFooter.tsx`

## What it does
Fixed nav: vinyl logo (`logo-512.webp`, spins on hover), "FOREST" + "MEDIA RÉCORDS" (mobile shows "MD"), stencil anchor links, ES/EN switch, Kick button; full-screen menu below `lg`. Links point to `/#section` so they work from the legal pages too. In the desktop bar "Tendencia" ([[Trending]]) and "Streamers" ([[Streamers]]) show from 1280px and "Estudio" ([[Studio]]) from 1440px, because the bar is full below that; all links are always in the menu and footer. Footer: logo, name, tag "Forjado en Medellín", anchor links, socials (from `data/site.ts`), links to the [[Legal pages]] and "Preferencias de cookies", "Con el apoyo de Kick", coordinates.

## Open issues
- [x] Socials: Instagram live; YouTube and SoundCloud pending (see [[Follow us]])

## Decisions
none

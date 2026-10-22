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
Fixed nav: vinyl logo (`brand/logo-512.webp`, spins on hover), "FOREST" + "MEDIA RÉCORDS" (mobile shows "MD"), stencil anchor links, ES/EN switch, Kick button; full-screen menu below `lg`. Links point to `/#section` so they work from the legal pages too. In the desktop bar "Tendencia" ([[Trending]]) and "Streamers" ([[Streamers]]) show from 1280px and "Estudio" ([[Studio]]) from 1440px, because the bar is full below that; all links are always in the menu and footer. Footer: logo, name, tag "Forjado en Medellín", anchor links, socials (from `data/site.ts`), links to the [[Legal pages]] and "Preferencias de cookies", "Con el apoyo de Kick", coordinates.

- **Maker's mark** (2026-10-12): a credit band at the end of the footer, above the legal row, for the site's designer and developer, Daniel Colorado: "Desarrollador de software oficial de Forest Media Récords", Digital Product & Operations Director · Digital Systems & Software, with a "DC" stamp that heats on hover and icon links to his website (danielcolorado.dev, a globe icon first in the row, added 2026-10-18), Instagram, LinkedIn and email (danielcolorado.dev@gmail.com). Data in `site.credits`.

## Open issues
- [x] Socials: Instagram live; YouTube and SoundCloud pending (see [[Follow us]])

## Decisions
none

---
type: decision
status: accepted
date: 2026-10-06
tags:
  - decision
---

# Deploy on Vercel

## Context
The site is a static Next.js 16 page and needed a home.

## Decision
Buy a custom domain and deploy on **Vercel**.

## Consequences
- Next.js image optimisation and caching work out of the box on Vercel.
- Once the domain exists, set `metadataBase` in `app/layout.tsx` so Open Graph images resolve, and update the share metadata.
- Domain name still to be chosen ([[Open questions]]).

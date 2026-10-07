---
type: reference
status: active
date: 2026-10-05
tags:
  - project
related:
  - "[[Roadmap]]"
---

# Overview

**Forest Media Récords** is a music production company in **Medellín, Colombia**, focused on **developing emerging artists**. **Kick** supports it for streaming and content creation. This repo is its public website: a landing page (`app/page.tsx`) plus two legal pages (`/privacidad`, `/terminos`).

## Who it serves
A label hub for three audiences at once (from `PRODUCT.md`):
- **Fans** in Medellín and LATAM: follow the roster, watch Kick streams, attend shows.
- **Emerging artists**: decide whether to develop with Forest, then send a demo.
- **Partners** (Kick, brands, venues, promoters): judge the label as a collaborator.

## What the page must do
- Introduce the company and its mission in one line.
- Show the **next main event** and the full **agenda** (concerts, streams, showcases, releases).
- Show what's **trending**: the latest productions as video loops and photos ([[Trending]]).
- Present the **artists** with photos, profile, bio and a listen button ([[Artists]]).
- Present the **streamers**, LeoLugoLive and Trianiss ([[Streamers]]).
- Make the **Kick** partnership visible, led by the Futuras Promesas showcase ([[Kick section]]).
- Explain how a music career is built with Forest ([[La forja]]).
- Show **studio prices** and take **booking requests** ([[Studio]]).
- Collect **demos** from emerging artists ([[Demo form]]).

## Status
- All sections, legal pages, cookie notice, bilingual copy and scroll animations: **built** (see [[2026-10-05]], [[2026-10-06]]).
- Real: Kick channel `leolugolive`, contact email `forestmediarecords@gmail.com`, streamer profiles, studio prices, Futuras Promesas #2.
- Placeholders until provided: events, artist bios, trending items, artist Spotify/YouTube links, socials, studio hours, legal company details. See [[Roadmap]] and [[Content guide]].
- Not wired yet: the studio booking (design only) and a real demo endpoint (the form uses `mailto:`).
- Git: last commit `57d4b6f` "landing finished"; everything since is **uncommitted**.

## Key documents in the repo
- `PRODUCT.md`: product truth (users, purpose, principles). Source of truth for *what*.
- `DESIGN.md` + `.impeccable/design.json`: the design system. Source of truth for *how it looks*.
- `.impeccable/surfaces/app-page-tsx.md`: the page's direction contract.
- `CLAUDE.md` / `AGENTS.md`: instructions for Claude Code.

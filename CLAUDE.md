@AGENTS.md

# Forest Media Récords — website

Marketing and information site for **Forest Media Récords**, a music production company based in **Medellín, Colombia**. Its main focus is **developing emerging artists**. The company is also **supported by Kick** (the streaming platform) for streaming and content creation.

## What the site must do

- Introduce the company and its mission of developing emerging artists.
- Show the artist roster.
- Give detailed, up-to-date information about **upcoming events, concerts, streams** and other activity (releases, content drops, and so on).
- Make the Kick partnership visible, along with the streaming and content-creation side of the company.
- Look modern and striking: high-end visual design with **stunning, purposeful animations**. Design quality is a core requirement, not an extra.

## Stack

- Next.js 16 (App Router, `app/`). It has breaking changes compared with older versions, so read `node_modules/next/dist/docs/` before writing Next-specific code (see AGENTS.md).
- React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` in `app/globals.css`; there is no `tailwind.config`).
- Scripts: `npm run dev`, `npm run build`, `npm run lint`.

## Brand assets (`public/`)

- `logo.png`: 1254×1254. A chrome/brushed-metal "FR" monogram with a stag head and tree roots, set in the label of a black vinyl record. It is the primary brand mark, so keep it intact.
- Artist photos (AVIF): `lentino1–5.avif` (moody street and night portraits with teal/green tones) and `renzo1–3.avif` (live performance in blue stage light, vertical 9:16). The artist names come from the filenames; confirm their spelling before using them in copy.
- `app/favicon.ico` was already customised.

## Content rules

- Never invent events, dates, venues, release titles, streaming stats, testimonials or social links. Use clearly marked placeholders until the real data exists.
- Keep event, concert and stream data in a structured data file (not hard-coded in components) so it is easy to update.
- Site language is still to be decided (Spanish, English or bilingual). The current metadata is in English.

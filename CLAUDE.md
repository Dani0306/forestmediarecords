@AGENTS.md

# Forest Media Récords — website

Marketing and information site for **Forest Media Récords**, a music production company based in **Medellín, Colombia**. Its main focus is **developing emerging artists**. The company is also **supported by Kick** (the streaming platform) for streaming and content creation.

## What the site must do

- Introduce the company and its mission of developing emerging artists.
- Show the artist roster.
- Give detailed, up-to-date information about **upcoming events, concerts, streams** and other activity (releases, content drops, and so on).
- Make the Kick partnership visible, along with the streaming and content-creation side of the company.
- Look modern and striking: high-end visual design with **stunning, purposeful animations**. Design quality is a core requirement, not an extra.

## Project knowledge: the `docs/` Obsidian vault

`docs/` is the team's Obsidian vault and the project's memory. Start a session by reading `docs/Home.md`, then `docs/Project/Roadmap.md` and `docs/Project/Open questions.md`. Vault rules live in `docs/CLAUDE.md`.

**Keep the vault updated as we build.** After a meaningful change: update the affected `docs/Features/` note, add a `docs/Decisions/` note for durable choices, append a log bullet to today's `docs/Daily/YYYY-MM-DD.md`, and update the roadmap or open questions.

## Sources of truth

- `PRODUCT.md`: product truth (users, purpose, principles).
- `DESIGN.md` + `.impeccable/design.json`: design system (forge world, tokens, components). Update when a durable pattern changes.
- `.impeccable/surfaces/app-page-tsx.md`: the landing page's direction contract.
- `data/events.ts`, `data/artists.ts`, `data/site.ts`, `data/kick.ts`, `data/trending.ts`, `data/streamers.ts`, `data/studio.ts` (prices), `data/legal.ts` (privacy and terms): all content. Sending lives in `lib/demo.ts` and `lib/booking.ts` (booking is design only, not wired). `lib/dictionary.ts`: all copy, ES and EN.

## Skills

- **impeccable**: all UI/design work (`/impeccable <command>`: polish, critique, audit, optimize, animate…). Its design detector hook runs after UI edits.
- **Obsidian vault**: `obsidian-markdown`, `obsidian-bases`, `json-canvas`, `obsidian-cli` (official, by kepano); `obsidian-daily` (daily log), `obsidian-gardener` (links and orphans), `obsidian-ask` (answer from the vault with citations), `obsidian-capture` (clip sources into notes), `obsidian-vault-setup`; `defuddle` and `knap` for web-to-note capture.

## Stack

- Next.js 16 (App Router, `app/`). It has breaking changes compared with older versions, so read `node_modules/next/dist/docs/` before writing Next-specific code (see AGENTS.md).
- React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` in `app/globals.css`; there is no `tailwind.config`). Custom classes live in `@layer components`.
- Fonts via `next/font/google`: Saira Stencil, Martian Mono, Archivo.
- Scripts: `npm run dev`, `npm run build`, `npm run lint`. Judge performance on `npm run build && npm start`, not on `next dev`.
- Deployment: Vercel project `dani0306s-projects/forestmr`, live at **https://forestmr.vercel.app** (deployed from the local folder with `npx vercel@latest --prod`; the global CLI 41 is too old). `metadataBase` uses `VERCEL_PROJECT_PRODUCTION_URL` until the custom domain is bought. `.vercelignore` keeps `docs/`, `.impeccable/` and unused originals out of the upload.
- Live links: Kick channel `https://kick.com/leolugolive` and email `forestmediarecords@gmail.com` (both in `data/site.ts`).

## Brand assets (`public/`)

- `logo.png` (1254×1254, used for Open Graph) and `logo-512.webp` (used in the UI): chrome "FR" monogram with a stag head and roots on a vinyl record. Keep it intact.
- Artist photos (AVIF) in folders: `public/lentino/lentino1–5.avif`; `public/RS/RS1–3.avif` for RS el Italiano (slug `renzo`). `lift` in `data/artists.ts` brightens dark stage shots. Paths are case-sensitive on Vercel (`/RS/`).
- Kick posters: `public/kick/kick1.avif` (Futuras Promesas #2 winner) and `kick2.avif` (line-up), described in `data/kick.ts`.
- Streamers (`data/streamers.ts`): LeoLugoLive (Leonardo Lugo, kick.com/leolugolive) in `public/leolugo/` (`leolugo-portrait.avif` is the crop of the screenshot `leolugo1.avif`) and Trianiss (Daniel Triana, kick.com/trianiss) in `public/triana/triana.avif`. Both profiles are real (from the team).
- Trending clips: `public/trending/clip-01.webm`, `clip-02.webm` (4–5 s cuts of `videoloop.webm`, ~400 KB each) with `.webp` poster frames (sidecar `.webp.json` records the origin), described in `data/trending.ts`.
- Hero video: `videoloop-web.webm` (1.08 MB, used) re-encoded from `videoloop.webm` (original, unused); poster `videoloop-poster.webp`.

## Content rules

- Never invent events, dates, venues, release titles, streaming stats, testimonials, bios or social links. Use clearly marked placeholders (`sample: true` shows an "Ejemplo" tag) until the real data exists.
- Keep content in the `data/` files and copy in `lib/dictionary.ts` (both languages), never hard-coded in components.
- The site is bilingual: Spanish by default, English toggle (client-side, `lib/i18n.tsx`).

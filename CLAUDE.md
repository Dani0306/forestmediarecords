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
- `data/events.ts`, `data/artists.ts`, `data/site.ts`, `data/kick.ts`, `data/trending.ts`, `data/streamers.ts`, `data/studio.ts` (prices), `data/legal.ts` (privacy and terms): all content. Sending: `lib/demo.ts` and `lib/booking.ts` post to `app/api/contact/route.ts`, which emails the contact inbox through Resend (needs `RESEND_API_KEY` in Vercel; see `.env.example`). `lib/dictionary.ts`: all copy, ES and EN.

## Skills

- **impeccable**: all UI/design work (`/impeccable <command>`: polish, critique, audit, optimize, animate…). Its design detector hook runs after UI edits.
- **Obsidian vault**: `obsidian-markdown`, `obsidian-bases`, `json-canvas`, `obsidian-cli` (official, by kepano); `obsidian-daily` (daily log), `obsidian-gardener` (links and orphans), `obsidian-ask` (answer from the vault with citations), `obsidian-capture` (clip sources into notes), `obsidian-vault-setup`; `defuddle` and `knap` for web-to-note capture. All live in `.claude/skills/` (official ones copied from github.com/kepano/obsidian-skills, MIT; the rest written for this vault). Vault check: `python3 .claude/skills/obsidian-gardener/scripts/check_vault.py docs`.

## Stack

- Next.js 16 (App Router, `app/`). It has breaking changes compared with older versions, so read `node_modules/next/dist/docs/` before writing Next-specific code (see AGENTS.md).
- React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` in `app/globals.css`; there is no `tailwind.config`). Custom classes live in `@layer components`.
- Fonts via `next/font/google`: Saira Stencil, Martian Mono, Archivo.
- Scripts: `npm run dev`, `npm run build`, `npm run lint`. Judge performance on `npm run build && npm start`, not on `next dev`.
- Analytics: Vercel Web Analytics (`components/SiteAnalytics.tsx`), loaded only after the visitor accepts all cookies; enable it in the Vercel dashboard (project → Analytics).
- Deployment: Vercel project `dani0306s-projects/forestmr`, live at **https://forestmediarecords.com** (domain bought on Vercel 2026-10-07; `www.` and `forestmr.vercel.app` also serve it). The GitHub repo `Dani0306/forestmediarecords` is connected: every push to `main` deploys to production. If a push doesn't show up (no new deployment in Vercel), deploy manually with `npx vercel@latest --prod` (the global CLI 41 is too old) or use Redeploy in the Vercel dashboard. `metadataBase` in `app/layout.tsx` is the domain. `.vercelignore` keeps `docs/`, `.impeccable/` and unused originals out of the upload.
- Live links: Kick channel `https://kick.com/leolugolive`, email `forestmediarecords@gmail.com`, WhatsApp `+57 304 464 6964` (`site.whatsapp`; so far only the chat assistant uses it) Instagram `https://www.instagram.com/forestmediarecords/` and YouTube `https://www.youtube.com/@forestmediarecords` (the video hero's second button) (all in `data/site.ts`; SoundCloud URL pending, shown as "Muy pronto").

## Brand assets (`public/`)

- `public/brand/logo.png` (1254×1254, used for Open Graph) and `logo-512.webp` (used in the UI): chrome "FR" monogram with a stag head and roots on a vinyl record. Keep it intact.
- Artist photos (AVIF) in folders: `public/artists/lentino/lentino-1–5.avif`; `public/artists/rs-el-italiano/rs-main.avif` + `rs-estudio-1–4.avif` for RS el Italiano (slug `renzo`); `public/artists/lowkey/` for Lowkey; `public/artists/nikosan/nikosan-1–3.avif` for Nikosan (producer) (`lowkey-1.avif` is the crop of the story screenshot kept in `source/artists/lowkey1-screenshot.avif`). Each photo can set `focus` (object-position) when the subject sits low or off-centre. `lift` in `data/artists.ts` brightens dark stage shots. Paths are case-sensitive on Vercel (`/RS/`).
- Tiraderas participants: `public/tiraderas/participants/` (one photo per Kick name), listed in `data/tiraderas.ts`; judges' photos in `public/tiraderas/juries/` (Trianiss and LeoLugoLive reuse their streamer photos; `jaycol-tall.avif` is Jaycol's square photo extended for the tall agenda card).
- Futuras Promesas posters: `public/futuras-promesas/` (`ft2-poster`, `ft2-ganador`, `ft3-poster`, `ft3-ganador`), used by `data/kick.ts`, `data/trending.ts`, `data/streamers.ts` and `data/events.ts`.
- Streamers (`data/streamers.ts`): LeoLugoLive (Leonardo Lugo, kick.com/leolugolive) in `public/streamers/leolugo/` (`leolugo-portrait.avif` is the crop of the screenshot kept in `source/artists/leolugo1-screenshot.avif`) and Trianiss (Daniel Triana, kick.com/trianiss) in `public/streamers/trianiss/trianiss-1–4.avif`. Both profiles are real (from the team).
- Trending clips: `public/trending/` (MP4 + WebM + `.webp` poster per clip, sidecar `.webp.json` records the origin), described in `data/trending.ts`. The 4–5 s `clip-01/02` cuts and the big originals are in `source/`.
- Videos ship as **two files**: an H.264 MP4 (`-movflags +faststart`, yuv420p; iPhones only play this) listed first, and the WebM as fallback. Encode MP4s with ffmpeg (installed via Homebrew 2026-10-09).
- Hero video (since 2026-10-24): `public/hero/hero-fmr.webm` (AV1 CRF 40 preset 2, ~1.3 MB, listed first with `codecs="av01.0.05M.08"`) + `hero-fmr.mp4` (H.264 CRF 28, ~1.5 MB; the fallback older iPhones and Safari take), both 1280×720, 10 s, 24 fps, no audio; poster `hero-fmr-poster.webp` is the first frame. Made from the team's `poster.mov` (4K HEVC 10-bit, flat log-style footage of the "FMR" shoot): colour-graded (levels + gamma 1.25 + saturation 1.25), denoised with `hqdn3d=4:4:8:8` and trimmed to 10 s. The 74 MB original is in the git-ignored `marketing/hero-source/poster-4k.mov`. Earlier loops: `source/hero/previous-hero-loop*/`. Measured: AV1 beats H.264 by about 35% in bytes at the same VMAF (~85).
- `source/` (repo root, git-tracked, never uploaded to Vercel): unused originals, video sources and duplicate images set aside when `public/` was organised on 2026-10-21. Safe to delete if the repo gets heavy.

## Content rules

- Never invent events, dates, venues, release titles, streaming stats, testimonials, bios or social links. The site is live (since 2026-10-10 it carries no sample content): leave a section empty (it has an empty state) rather than add placeholder items. `sample: true` still exists for a clearly tagged exception.
- Keep content in the `data/` files and copy in `lib/dictionary.ts` (both languages), never hard-coded in components.
- The site is bilingual: Spanish by default, English toggle (client-side, `lib/i18n.tsx`).

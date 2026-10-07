---
type: reference
status: active
date: 2026-10-05
tags:
  - project
  - tech
---

# Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.3.8** (App Router) | Breaking changes vs older Next; read `node_modules/next/dist/docs/` before Next-specific code (`AGENTS.md`). `next/image` uses `preload`, not the deprecated `priority`. |
| UI | **React 19.2.8** | Almost every section is a client component (shared language context). |
| Styling | **Tailwind CSS v4** | `@import "tailwindcss"` + `@theme` tokens in `app/globals.css`; no `tailwind.config`. Custom classes live in `@layer components` so utilities can override them. |
| Language | TypeScript 5 | `@/*` path alias to the repo root. |
| Lint | ESLint 9 + `eslint-config-next` | `npm run lint` |
| Fonts | `next/font/google` | **Saira Stencil** (display, `wdth` axis), **Martian Mono** (readouts), **Archivo** (body). |
| Media | AVIF photos, WebM video | Hero loop `public/videoloop-web.webm` (1.08 MB re-encode of `videoloop.webm`). |

## Scripts
- `npm run dev`: dev server. Heavier than production; the first scroll after a restart can stutter while images are optimised on demand.
- `npm run build` / `npm start`: production; use this to judge real performance (about 2.3 MB total page weight).
- `npm run lint`

## Tooling around the code
- **Impeccable** design skill (user-level): design commands, design detector hook (`.codex/hooks.json`, `.cursor/hooks.json`), artifacts in `.impeccable/`.
- **Obsidian vault** in `docs/` (this vault); see the vault's `CLAUDE.md`.

## Deployment
**Vercel**, on a custom domain still to be bought. See [[Deploy on Vercel]].

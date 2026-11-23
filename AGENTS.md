<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

You are a **senior full-stack engineer and implementation agent** building the website of **Forest Media Récords**, a music production company in Medellín, Colombia, that develops emerging artists, with Kick supporting its streaming and content creation. The site is live at https://forestmediarecords.com.

Your job is to understand the request, read the right docs and code, write a clear implementation prompt, get approval, then build it to a high-end standard, both in the code and in the design.

`CLAUDE.md` holds the project context: brand assets, live links, sources of truth and content rules. `docs/` (the Obsidian vault) holds the project's memory. Read both. This file is the operating manual: how to work, how the app is structured, and what will trip you up.

---

# 1. What you are building

A bilingual (Spanish by default, English toggle) single-page label site with a few side routes:

1. **The landing page** (`app/page.tsx`): hero, new releases, the Mundial de Tiraderas, Futuras Promesas, agenda, trending clips, roster, top songs, streamers, Kick, La forja, studio, demo form, follow us. Page order lives in `app/page.tsx` and `docs/Home.md`.
2. **Forms that send**: the demo submission and the studio booking request email the label through Resend.
3. **A chat assistant** ("Pregúntanos") that answers visitors' questions from the site's own data via the OpenAI Responses API.
4. **Live shared state**, where needed, in Upstash Redis (the Tiraderas winners, saved from `?admin`).
5. **Legal pages** (`/privacidad`, `/terminos`) and a cookie notice that gates analytics.

Audiences: fans (mostly on mobile, arriving from social media), emerging artists deciding whether to join, and partners (Kick, brands, venues). See `PRODUCT.md`.

Build what the request asks for, at the quality the brand needs, and nothing more. Ideas outside the request go in `docs/Project/Roadmap.md` under "Next features", not in the code.

---

# 2. How to work

Follow this loop for every feature or non-trivial change:

1. **Read.** This file and `CLAUDE.md`, then `docs/Home.md`, `docs/Project/Roadmap.md` and `docs/Project/Open questions.md`, then the `docs/Features/` note and the docs (section 4) that the task touches.
2. **Inspect.** Look at the existing components, data files, dictionary keys, CSS classes and routes before assuming how anything is shaped. Reuse a pattern that exists before inventing one.
3. **Ask only what changes the build.** Ask one focused question when the answer changes what gets built: a real date, a price, a provider, a name. Otherwise state the assumption and continue. Never fill a content gap by inventing it (section 8).
4. **Write an implementation prompt** in `prompts/` from `prompts/_template.md`. Name it `NNN-short-slug.md` (`001-donation-system.md`). It covers the goal, the docs you read, the code you inspected, decisions and assumptions (each with the alternative you rejected), files to touch, requirements, copy to add (ES and EN), design and motion notes, security and privacy notes, cost impact, vault updates, acceptance criteria, checks to run, and exact manual test steps.
5. **Get approval.** Ask in the question panel, with Yes and No as options: `I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?`
6. **Build.** Once approved, create a branch for the task (`feat/<slug>`, `fix/<slug>`), build strictly to the prompt, and run the checks (section 12). Commit in small conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).
7. **Never push without asking.** A push to `main` is a production deploy (Vercel deploys every push to `main`). Merging the branch into `main` and pushing both need an explicit yes.
8. **Update the vault** (section 9): the feature note, a decision note if something durable was chosen, today's daily log, and the roadmap or open questions.
9. **Report** in short bullets under three headings:
   - `What I did`: a few one-line bullets.
   - `Test`: numbered steps to run or see it, including the preview URLs.
   - `Needs your attention`: anything to decide, provide or fix, or "None".
   Keep the detail and the reasoning in the prompt file, not the report.

Skip the prompt file only for trivial changes (a typo, a copy tweak, a date or link update in `data/`, a one-line config fix) or when the user says to skip it. Content updates the team sends (a new event, a new photo) still update the vault.

When you need a decision, ask through the interactive question panel (AskUserQuestion or your agent's equivalent). Use plain text only if no panel exists.

**Explain decisions, not basics.** For each non-obvious choice (a payment provider, server action or route handler, where state lives, an animation technique), write in the prompt file what you chose and the alternative you rejected, in two or three sentences. Don't explain TypeScript, React, Next.js, Tailwind or Git basics.

---

# 3. UI and design work

Design quality is a core requirement of this site, not an extra. Visitors should feel a high-end, striking label site with purposeful motion.

- **Use the impeccable skill** for all UI work (`/impeccable <command>`: shape, craft, polish, critique, audit, animate…). Its design detector hook runs after UI edits; read its output and fix what it flags or say why not.
- **The design authority is `DESIGN.md`** (+ `.impeccable/design.json`); the landing page's direction contract is `.impeccable/surfaces/app-page-tsx.md`. The world is a **forge floor**: forge-black ground, anvil-grey steel plates, one heat ramp (cherry → ember → glow → white heat), stencil display type, mono readouts. A new feature lives in that world; it doesn't bring its own.
- **Tokens only.** Colours, fonts and easings live in `app/globals.css` `@theme` (`forge`, `forge-2`, `forge-3`, `anvil`, `steel`, `iron`, `cherry`, `ember`, `glow`, `white-heat`, `scale`; `font-stencil`, `font-mono`, `font-sans`; `ease-hammer`, `ease-drop`). No raw hex in components.
- **Reuse the materials** in `app/globals.css` (`@layer components`): `.btn-hot`, `.btn-steel`, `.stencil`, `.readout`, `.stamp`, `.plate`, `.iron-photo`, `.glass-side`, `.glass-field`, `[data-heat]`. Add a new shared class there only when two or more places need it, and record it in `DESIGN.md`.
- **Heat is state, not decoration.** The heat ramp says how close or live something is (`heatOf()` in `data/events.ts`). Don't use ember or glow to decorate. No eyebrow labels above headings. Glass and blur only over photos or video.
- **Type:** Saira Stencil for display, headings and buttons; Archivo for body; Martian Mono for readouts, dates, prices and counts (`tabular-nums`). Follow the type ramp in `DESIGN.md`.
- **Motion:** CSS first. Scroll choreography uses CSS scroll-driven animations (view timelines) on compositor properties (`transform`, `opacity`). Every animation and every video autoplay respects `prefers-reduced-motion`. Use the `animate` and `animation-performance` skills when they're available.
- **Mobile first.** Most visitors arrive on a phone. Check every change at phone width before desktop. No horizontal scroll.
- **Accessibility:** every interactive element has a visible `focus-visible` state and a disabled state; colour is never the only signal; images have `alt` text in both languages when it matters; headings stay in order.
- **States are part of the design.** Loading, empty, error and success states are designed, not afterthoughts. Async UI gets a preview switch in the URL like the existing ones (`?chat=preview|thinking|error`, `?<form>=sent|error` via `previewState()` in `lib/sendForm.ts`), so each state can be reviewed without triggering the real action.
- **Reference images:** if the user gives one, reproduce it exactly (layout, spacing, type, colour, states), then make it responsive without restyling beyond the reference.
- **No component or animation library** unless the user asks. Icons are hand-drawn SVGs in `components/icons.tsx`.
- **Keep the hero's join button.** "Forma parte de Forest Media Récords" (`hero.ctaJoin`) stays in every hero mode.

---

# 4. Docs and skills to lean on

Verify against these before writing code. APIs, model IDs, limits, prices and SDK signatures change; don't write from memory.

- `node_modules/next/dist/docs/` (`01-app/`): routing, route handlers, server actions, server and client components, `next/image` (it uses `preload`, not the deprecated `priority`), `next/font`, metadata, caching, runtime limits.
- **Vercel docs**: function duration and body-size limits, environment variables, Web Analytics, the Hobby plan's terms.
- **OpenAI docs**: Responses API, model IDs and pricing, before touching `actions/AI/AIresponse.ts` or `lib/assistantContext.ts`.
- **Resend docs**: the emails API (`app/api/contact/route.ts` calls it with `fetch`, no SDK).
- **Upstash Redis REST docs**: for anything stored in KV (`app/api/winners/route.ts`).
- **Tailwind CSS v4 docs**: `@theme`, `@layer`, utilities. There is no `tailwind.config`.
- **MDN**: scroll-driven animations, view timelines, `@property`, and their browser support (test on iOS Safari).
- **Any third-party provider a feature adds** (payments, ticketing, embeds): its official docs and its sandbox/test mode, fetched before writing the integration.
- **Skills**: `impeccable` (UI), the Obsidian skills (`obsidian-markdown`, `obsidian-bases`, `obsidian-daily`, `obsidian-gardener`…) for the vault. See `CLAUDE.md` → Skills.

Fetch the real page. If a doc contradicts this file, the doc wins: tell the user and update this file.

---

# 5. How the app is structured

One Next.js App Router app, deployed on Vercel.

```
app/
  layout.tsx            fonts, metadata, LangProvider, chat, cookie banner, analytics
  page.tsx              the landing page: section order
  globals.css           @theme tokens, @layer components materials, motion
  api/contact/          demo + booking forms → Resend
  api/winners/          Tiraderas winners ↔ Upstash Redis
  privacidad/ terminos/ legal pages (components/LegalPage.tsx + data/legal.ts)
  preview/              internal previews, not linked from the site
actions/                server actions ("use server"), e.g. AI/AIresponse.ts for the chat
openai/client.ts        OpenAI SDK client (server only)
components/             one file per page section; chat/ for the assistant; icons.tsx
data/                   all content, typed (events, artists, releases, site, kick, legal…)
lib/                    dictionary.ts (ES/EN copy), i18n.tsx, helpers (sendForm, ics, winners…)
public/                 media the site serves, by folder (see CLAUDE.md → Brand assets)
source/                 originals kept in git but not served
marketing/              campaign assets (stories, QR cards, ads): not part of the site
docs/                   Obsidian vault: project memory
prompts/                implementation prompts, one per task
.impeccable/            design system sidecar and surface direction contracts
```

Create folders only when a task needs them. Keep these responsibilities apart:

- **Content** (`data/*.ts`). Every fact the site shows (events, artists, prices, links, legal text) lives in a typed data file, with a doc comment at the top explaining how to edit it. Components never hard-code content.
- **Copy** (`lib/dictionary.ts`). Every visible string, in **both** `es` and `en`. `en` is typed as `Dict = typeof es`, so a key missing in English fails `tsc`. Bilingual content inside `data/` uses `{ es, en }` objects.
- **Sections** (`components/`). One file per page section, client components when they use `useLang()` or `useNow()`. Keep per-second state (countdowns) in the smallest component that shows it.
- **Server code** (`app/api/*/route.ts`, `actions/`). Each route opens with a doc comment listing the env vars it needs and what happens without them, like the existing two. Parse and cap every input (lengths, counts, allowed values), answer `{ ok: boolean }` with an honest status code, and log failures with a `[route]` prefix. A missing env var degrades gracefully (`503`, or `{ configured: false }`), never crashes the page.
- **Client → server** (`lib/`). Small fetch helpers (`sendForm()`) that never throw to the UI: they return `{ ok }` and the component shows its error state.
- **Admin actions**. Turned on in the browser with `?admin`, but always checked on the server against a password in an env var (`WINNERS_PASSWORD`). The browser flag only shows the controls.

**A new feature touches more than its component.** Check each of these:
- `app/page.tsx` (placement in page order) and `components/SiteNav.tsx` + `nav` in the dictionary, if it gets a nav entry.
- `lib/assistantContext.ts`, if visitors could ask the chat assistant about it.
- `data/legal.ts`, if it collects personal data, adds a cookie or storage key, or adds a third party.
- `.env.example`, for every new env var, with a comment saying where to get it.
- The vault (section 9).

**Boundaries that never bend.** The browser never holds a secret (OpenAI, Resend, Upstash, any payment provider's secret key, admin passwords), never calls those services directly, and never decides anything that costs money or changes shared state. Never prefix a secret with `NEXT_PUBLIC_`. Every write goes through a route handler or server action that validates it.

---

# 6. Tech stack

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4, `next/font/google` (Saira Stencil, Martian Mono, Archivo), the `openai` SDK (Responses API), Resend (via `fetch`), Upstash Redis (via its REST API), Vercel Web Analytics, ESLint (`eslint-config-next`). Hosted on Vercel; the domain is on Vercel too.

Don't add, without saying why the feature needs it and what it costs: a component or animation library, a CMS, a database or ORM (Upstash Redis covers small shared state), an auth provider, a state-management library, a CSS-in-JS library, a new language, or any paid service. If a feature needs a dependency (a payment provider's SDK, a validation library like Zod), propose it in the prompt file with its size, cost and the alternative you rejected.

---

# 7. Decisions already made

Build to these unless the user changes them. Each has a note in `docs/Decisions/`.

- **No invented content** (Placeholder content policy). Real facts only; an empty section shows its empty state. `sample: true` shows an "Ejemplo" tag and is for a clearly flagged exception only.
- **Spanish by default, client-side i18n** (`lib/i18n.tsx`, `localStorage` key `fmr-lang`). Dates are ISO strings in Medellín time (`-05:00`), formatted in `America/Bogota`.
- **Hydration-safe time.** `useNow()` returns `null` until mount; `BUILD_TIME` (from `next.config.ts`) is the shared "now" for the first render. Anything time-dependent follows the same pattern.
- **Main events take over the hero** (`main: true` in `data/events.ts`; `nextMain()` / `nextSecondary()`).
- **Hero video loops with no controls**, and pauses off-screen.
- **CSS scroll-driven animations**, no scroll-film or JS animation library.
- **Forms send through Resend**; the visitor's email is the reply-to. **Studio booking is a request**, not a confirmed reservation.
- **Analytics only after consent.** `components/SiteAnalytics.tsx` loads after the visitor accepts all cookies (`fmr-consent`). Any new tracking, pixel or third-party embed follows the same rule.
- **Videos ship as two files**: H.264 MP4 listed first (iPhones), then WebM/AV1. Posters are `.webp`.
- **Media layout**: only media the site uses goes in `public/`, by folder; originals go in `source/` or out of the repo (Public folder layout).

---

# 8. Content and data

- **Never invent** events, dates, venues, prices, release titles, stats, follower counts, testimonials, bios, donor names, amounts raised or social links. Ask the team, or leave it empty and record the question in `docs/Project/Open questions.md`.
- Content goes in `data/`, copy in `lib/dictionary.ts` in both languages. Never hard-code visible text in a component.
- Keep data files easy for a non-developer to edit: a doc comment at the top, one entry per object, optional fields documented inline (see `data/events.ts`).
- Spelling matters: **Forest Media Récords** keeps the accent; artist and streamer names are spelled as the team gives them. If two sources disagree, ask.
- Asset paths are case-sensitive on Vercel. Check the exact file name in `public/`.

---

# 9. Keeping the vault current

`docs/` is the project's memory; rules are in `docs/CLAUDE.md`. After every meaningful change:

1. Update the affected `docs/Features/` note (what it does, code paths, open issues), or create one from `docs/Templates/Feature.md` for a new feature and link it from `docs/Home.md`.
2. Add a `docs/Decisions/` note (from `docs/Templates/Decision.md`) for each durable choice; mark the old one `superseded` if it changes.
3. Append factual bullets under `## Log` in today's `docs/Daily/YYYY-MM-DD.md` (create it if missing).
4. Tick or add items in `docs/Project/Roadmap.md`; move answered items out of `docs/Project/Open questions.md`.
5. Update `DESIGN.md` when a durable design pattern changes.

Use `[[wikilinks]]`, keep frontmatter keys and order, and don't move, rename or delete notes without asking. Run `python3 .claude/skills/obsidian-gardener/scripts/check_vault.py docs` after vault edits.

---

# 10. Security, privacy and money

- **Secrets stay on the server** and out of git. `.env.local` is never committed or printed; new vars go in `.env.example` (empty) and in Vercel → Settings → Environment Variables. Ask the user to set production values; don't set them yourself without a yes.
- **Server actions are public endpoints.** Anything exported from a `"use server"` file can be called by anyone with any arguments. Validate and cap inputs there just as in a route handler.
- **Rate limits.** The in-memory limiter in `app/api/contact/route.ts` is per instance and resets on cold starts. It's fine for spam, but it's not a guarantee. Anything that costs money per call (model calls, emails, payments) needs a limit that holds, such as a counter in Upstash Redis.
- **Bots.** Public forms keep the honeypot field (`website`) and validate on the server.
- **Personal data.** Collect only what the feature needs, say why in `data/legal.ts` (privacy), and never log full personal data or message bodies.

**Features that take money (donations, tickets, merch)** follow these rules too:
- Use the provider's **hosted checkout or payment link**. Card data never touches this site's code, logs or storage.
- **Trust only verified webhooks.** Treat a payment as complete only when a webhook arrives with a verified signature (or after a server-side lookup on the provider's API), never because of the redirect back or a query parameter. Make the webhook handler idempotent: providers retry.
- **Amounts are integers** in the provider's minor unit, decided on the server, never taken as-is from the browser. Read the provider's docs for how it handles COP. Keep the currency explicit.
- **Test mode first.** Build and demo with sandbox keys. Going live is the user's decision.
- **Vercel Hobby is non-commercial.** The roadmap already says to move to Pro before launch; taking money makes that urgent. Raise it before shipping.
- **Honesty.** Never show a goal, total, donor count or donor name that isn't real and consented. Terms (`data/legal.ts`) say what the money is for, refunds, and who receives it. Ask the team for that text; don't write legal terms from scratch.

---

# 11. Things that will trip you up

You cannot infer these from the code.

- **The Next.js block at the top is managed.** `next dev` rewrites it; leave the markers and their text alone.
- **Hydration mismatches.** Anything that depends on the clock, `localStorage`, the language or `window` must render the same on the server and on first client render. Use `useNow()` / `BUILD_TIME`, read storage in an effect, and wrap every `localStorage` access in `try/catch` (private mode throws).
- **The language is client-side.** The server always renders Spanish; English swaps in after mount. Metadata and Open Graph are Spanish. Don't build anything that needs the language on the server without discussing it.
- **Scroll-driven animations and `overflow`.** A section that hosts a view timeline needs `overflow: clip`, not `hidden`, or the timeline breaks. Check iOS Safari; support differs.
- **Performance is judged on `npm run build && npm start`**, never on `next dev`. Large media, live `backdrop-filter` and per-frame React state are the usual culprits (see the Performance pass decision).
- **Videos on iPhone** play only the H.264 MP4. List it first, with `-movflags +faststart` and `yuv420p`.
- **Case-sensitive paths.** macOS doesn't care about case; Vercel does. `/RS/` and `/rs/` are different folders in production.
- **Vercel's webhook sometimes misses a push.** If a push to `main` doesn't show a new deployment, deploy with `npx vercel@latest --prod` (the global CLI is too old) after asking.
- **Vercel function limits.** Request bodies and function duration are capped on Hobby. Check the current limits before any upload, long model call or slow third-party call, and set `maxDuration` where needed.
- **Model calls cost money.** The chat calls OpenAI on every message (`actions/AI/AIresponse.ts`). Keep `max_output_tokens` capped and the conversation trimmed. Confirm model IDs in the OpenAI docs. Don't run model calls in a loop to test.
- **The chat assistant only knows what `lib/assistantContext.ts` feeds it.** A new feature it doesn't know about makes it give wrong answers.
- **Admin mode is per browser.** `?admin` stores `fmr-admin` in `localStorage`; without the KV store configured, admin picks live only in that browser.
- **Emails go to a real inbox.** Testing the live forms sends real email to the label. Use the `?<form>=sent|error` previews for UI work.

---

# 12. Checks to run

Run them and report the real output. Never claim a check passed without running it.

- `npx tsc --noEmit` and `npm run lint`: always.
- `npm run build`: when routes, server actions, config, data shapes or anything rendered on the server change, and always before asking to merge.
- `npm run dev` and click through: for UI changes, at phone width and desktop, in **both languages**, with reduced motion on, and through every preview state the feature has.
- `npm run build && npm start`: when the change could affect performance (media, animation, a new client component high on the page).
- The impeccable detector output: after UI edits.
- `python3 .claude/skills/obsidian-gardener/scripts/check_vault.py docs`: after vault edits.

No test runner is installed. Don't add one unless a task needs it (logic with real edge cases: payments, money maths, date rules), and ask first.

---

# 13. When in doubt

Keep it small and keep it beautiful. Read the doc instead of guessing. Reuse the forge's tokens and materials before inventing new ones. Write copy in both languages. Never invent content. Keep secrets on the server. Write a prompt and get approval before coding. Run the checks. Never push without asking. Update the vault. Share exact test steps.

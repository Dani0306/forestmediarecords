---
type: reference
status: active
date: 2026-10-05
tags:
  - project
  - content
---

# Content guide

How to replace placeholders with real content. No component changes needed.

## Events (`data/events.ts`)
```ts
{
  id: "lentino-live",            // unique, kebab-case
  type: "concert",               // concert | stream | showcase | release
  title: { es: "…", en: "…" },
  artists: ["lentino"],          // artist slugs
  start: "2026-10-24T21:00:00-05:00",
  end: "2026-10-25T00:00:00-05:00", // optional, default start + 2h
  place: { es: "…", en: "…" },
  url: "https://…",              // optional: tickets / Kick / release
  main: true,                    // required: true → takes over the hero's first screen
  image: "/lentino/lentino1.avif", // optional, else lead artist photo
  poster: { width: 1254, height: 1254 }, // optional: image is a poster (its pixel size); the hero shows it whole, in colour, in its own shape
  sample: true,                  // REMOVE for real events
}
```
Finished events move to "Mostrar finalizados" automatically.

## Artists (`data/artists.ts`)
- `name`, `photos[]` (first = lead; paths like `/lentino/lentino1.avif` or `/RS/RS1.avif`, case-sensitive; `lift` brightens dark stage shots, about 1.1 to 2.1), `kickUrl`, `links[]`, `listen` (`spotify`, `youtube` URLs for the Escuchar button; empty shows "Muy pronto").
- `profile`: `role`, `genres`, `city`, `since`, `bio` (paragraphs ES/EN; the first is the intro). Remove `sample: true` once real.

## Kick editions (`data/kick.ts`)
Each Kick showcase (for example Futuras Promesas) is one entry in `editions`; the **first** one leads the [[Kick section]]. Fields: `name`, `edition` ("#2"), `format`, `winner`, `motto`, `lineup[]`, `posters[]` (first = lead poster, in `public/kick/`, with `width`, `height`, `label` and `alt`). Only use facts printed on the posters or confirmed by the team.

## Trending (`data/trending.ts`)
Order is rank: the first item takes the big slot. Fields: `kind` (`video|studio|photo|kick|live`), `title`, `meta` (one line: who or what), `media` (`{kind:"video", src, mp4, poster}` for a 4–8 s muted loop: `src` WebM plus `mp4` H.264 copy, which iPhones need, or `{kind:"image", src}`), `alt`, optional `focus` (crop, e.g. `"50% 25%"`), `href`, `sample`. Files go in `public/trending/`; keep clips around 1280×720 and under 1 MB, with a poster frame. See [[Trending]].

## Streamers (`data/streamers.ts`)
One entry per streamer: `name` (full name, shown in the details), `handle` (Kick nickname, the big name), `url` (Kick channel), `photo` (in a folder per streamer, e.g. `public/triana/`; `focus` sets the crop; `sample: true` only for stand-ins), optional `highlight` (a poster and link for something on their channel), and `profile` (`role`, `content[]`, `schedule`, optional `origin` / `base`, `bio` as paragraphs: the first shows, the rest open with "Leer biografía completa"). The next stream comes from `data/events.ts`: an upcoming `stream` whose `url` is the channel. See [[Streamers]].

## Studio (`data/studio.ts`)
`services[]`: `name`, `body`, `price` (COP, a number), `unit` (`piece` per song, `session`, `block` per 4 hours), optional `includes`, `main: true`, `blocks` (lets the form pick 4-hour blocks). `slots` are the bookable time slots (samples until the real hours exist; `slotsSample` shows the tag). See [[Studio]].

## Legal (`data/legal.ts`)
`legalMeta` (updated date, `draft`, company name, NIT, address, email) and the `privacy` / `terms` documents in ES and EN as titled sections. Fill the [brackets] and set `draft: false` after legal review. See [[Legal pages]].

## Site (`data/site.ts`)
- `contactEmail`: empty keeps the demo form closed.
- `kick.url` / `kick.handle`: enables every "Ver en Kick" action.
- `socials[]`: shown in the footer.

## Copy (`lib/dictionary.ts`)
Edit ES and EN together. Keys are grouped by section (`nav`, `hero`, `agenda`, `trending`, `roster`, `streamers`, `kick`, `forge`, `studio`, `demo`, `cookies`, `legal`, `footer`).

## Media (`public/`)
Photos as AVIF (small, about 20 KB), grouped by folder (`public/lentino/`, `public/RS/`, `public/leolugo/`, `public/triana/`); Kick posters in `public/kick/`; trending clips and posters in `public/trending/`. Video as WebM, about 1 Mbit/s, 720p, around 10 s loop.

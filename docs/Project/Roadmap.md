---
type: roadmap
status: active
date: 2026-10-05
tags:
  - project
  - roadmap
---

# Roadmap

## Content to replace (blocked on the team)
- [ ] Real **events** in `data/events.ts` (all six are samples)
- [x] **Kick** channel for the label: `leolugolive` (2026-10-06)
- [ ] Kick URLs for each artist, if they get their own (`data/artists.ts`)
- [x] **Contact / demo email**: `forestmediarecords@gmail.com` (2026-10-06)
- [ ] Real **trending projects** and their 4–8 s clips in `data/trending.ts` ([[Trending]])
- [x] Real **streamer photos and profiles** for LeoLugoLive and Trianiss (2026-10-06, [[Streamers]])
- [x] **Demo** and **booking** forms send through Resend via `app/api/contact/route.ts` (2026-10-11, [[Forms send through Resend]])
- [x] Resend setup: account, `forestmediarecords.com` verified, `RESEND_API_KEY` in Vercel Production (2026-10-11)
- [ ] Legal review of [[Legal pages]]; NIT and address
- [ ] Spotify / YouTube links per artist (`listen` in `data/artists.ts`)
- [x] Real **artist profiles and bios**: all four artists (2026-10-09); pending: join year for RS el Italiano and Nikosan
- [ ] **Social links**: label Instagram done (2026-10-07); YouTube done (2026-10-13); SoundCloud URL pending; artist socials: Lentino, RS el Italiano and Nikosan (Instagram, 2026-10-17) done, Lowkey pending ([[Follow us]])
- [x] Images of the Kick channel that supports the company: Futuras Promesas posters and LeoLugoLive photo (2026-10-06)

## Fixes and polish
- [x] Hero button copy fixed: "Forma parte de Forest Media Récords" / "Become part of Forest Media Récords" (2026-10-06)
- [x] Hero primary button points to `#demos` (2026-10-06)
- [x] Hero video stays a loop with no pause button (decided: [[Hero video loop without controls]])
- [x] **Secondary heat strip** turned on: soonest `main: false` event, both hero modes (2026-10-08)
- [ ] New RS photos (`RS1–3.avif`) are well lit but still use `lift: 2.1` (sizes fixed 2026-10-06)
- [x] Demo deploy on Vercel: https://forestmr.vercel.app (2026-10-06)
- [x] Domain **forestmediarecords.com** bought on Vercel, attached and set as `metadataBase` (2026-10-07, [[Deploy on Vercel]])
- [ ] Optional: make `www` and `forestmr.vercel.app` redirect to `forestmediarecords.com` (Vercel → Settings → Domains)
- [ ] Move to Vercel Pro before the public launch (Hobby is non-commercial)
- [x] Repo connected to Vercel: pushes to `main` deploy automatically (confirmed 2026-10-12; one push, `a5d69ef`, was missed by the webhook and deployed by hand)
- [ ] Clean unused assets: `public/lowkey/lowkey1.avif` (original screenshot), `public/videoloop.webm` (5.7 MB original; source of the trending clips), `public/leolugo/leolugo1.avif` (original screenshot of the cropped portrait), `videoloop-poster.webp.json`
- [ ] Align font sizes with the `DESIGN.md` type ramp (detector flags about 45 sizes)
- [ ] Replace the create-next-app `README.md`
- [ ] Commit the work since `57d4b6f`

- [ ] Leo's corrected bio, if it differs from the current one

## Next features (ideas, not committed)
- [ ] Artist detail pages (bio, releases, gallery) as the roster grows
- [ ] Live Kick status (only if Kick exposes a reliable API)
- [ ] Vercel project + custom domain ([[Deploy on Vercel]])

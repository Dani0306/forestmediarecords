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
- [ ] Wire the **studio booking** backend (`lib/booking.ts`) and the **demo** endpoint (`lib/demo.ts`) ([[Studio]], [[Demo form]])
- [ ] Legal review of [[Legal pages]]; NIT and address
- [ ] Spotify / YouTube links per artist (`listen` in `data/artists.ts`)
- [ ] Real **artist profiles and bios**: Lentino done (2026-10-06); RS el Italiano still a mock-up
- [ ] **Social links**: label Instagram done (2026-10-07); YouTube and SoundCloud URLs pending; artist socials pending ([[Follow us]])
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
- [ ] Connect the repo to Vercel (`vercel git connect`) once the work is committed, so pushes deploy automatically
- [ ] Clean unused assets: `public/lowkey/lowkey1.avif` (original screenshot), `public/videoloop.webm` (5.7 MB original; source of the trending clips), `public/leolugo/leolugo1.avif` (original screenshot of the cropped portrait), `videoloop-poster.webp.json`
- [ ] Align font sizes with the `DESIGN.md` type ramp (detector flags about 45 sizes)
- [ ] Replace the create-next-app `README.md`
- [ ] Commit the work since `57d4b6f`

- [ ] Leo's corrected bio, if it differs from the current one

## Next features (ideas, not committed)
- [ ] Artist detail pages (bio, releases, gallery) as the roster grows
- [ ] Live Kick status (only if Kick exposes a reliable API)
- [ ] Vercel project + custom domain ([[Deploy on Vercel]])

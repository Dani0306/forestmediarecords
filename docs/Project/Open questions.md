---
type: reference
status: open
date: 2026-10-06
tags:
  - project
  - questions
---

# Open questions

Things the code can't answer. Move answers into the relevant note, then tick them off.

## Open
- [ ] Kick URLs for Lentino and RS el Italiano, if they get their own
- [ ] Who is in the hero video and what is the production called? (needed to title the [[Trending]] clips)
- [ ] Which real projects should appear in [[Trending]], and do they have their own short clips?
- [ ] Streamers: streaming schedules for both; do any agenda streams go out on kick.com/trianiss? ([[Streamers]])
- [ ] Studio: real opening hours, deposit/cancellation policy, and does "Producción completa" include mix and master? ([[Studio]])
- [ ] Company NIT and address for the legal pages ([[Legal pages]])
- [ ] Spotify and YouTube links for Lentino and RS el Italiano ([[Artists]])
- [ ] When does "Sobrio" (Lentino × RS el Italiano) come out? Not dated yet ([[Artists]], [[Agenda]])

- [ ] Website launch event: real date, time and place? Should it be a main event (takes over the hero)? ([[Agenda]], [[Trending]])
- [ ] Nikosan: what does "9/10/2018" mean (start in music, or joined Forest)? Which genres? Is `public/RS/rs7.avif` Renzo or Nikosan, and where should it go? ([[Artists]])

## Answered (2026-10-06)
- [x] Domain: **forestmediarecords.com** (bought on Vercel 2026-10-07) → [[Deploy on Vercel]]
- [x] Lentino joined Forest about two months ago (≈ August 2026) → `since: "2026"`
- [x] No `/scroll-world` film: keep the free CSS scroll animations
- [x] Studio hours/policies, NIT/address and artist Spotify/YouTube links: still to be defined by the team (kept open above)
- [x] Deployment: buy a domain and deploy on Vercel → [[Deploy on Vercel]]
- [x] Kick channel supporting the company: `https://kick.com/leolugolive` → `data/site.ts`, [[Kick section]]
- [x] Demo/contact email: `forestmediarecords@gmail.com`, demos go by email → [[Demo form]]
- [x] Hero button: goes to the demo form; typo fixed → [[Hero]]
- [x] Hero video: a loop with no pause button by design, showcasing the latest productions → [[Hero video loop without controls]]
- [x] Secondary heat strip: commented out on purpose until there is a real secondary event → [[Main and secondary events]]
- [x] The `leolugolive` channel belongs to streamer Leonardo Lugo; Daniel Triana streams at `kick.com/trianiss` → [[Streamers]]
- [x] Artist name "RS el Italiano" is final (code slug stays `renzo`)
- [x] Vault editors: Daniel and Claude only

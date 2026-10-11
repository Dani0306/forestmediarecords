---
type: decision
status: accepted
date: 2026-10-11
tags:
  - decision
---

# Forms send through Resend

## Context
The demo and booking forms opened the visitor's email app (`mailto:`). Submissions were lost whenever a phone had no mail app set up or the visitor didn't press send, and the site showed "sent" either way.

## Decision
Both forms post to one Route Handler, `app/api/contact/route.ts`, which emails the label through Resend's HTTP API (no SDK). The sender is `formularios@forestmediarecords.com` on the domain bought on Vercel (verified in Resend with DNS records); the inbox is `site.contactEmail`; the visitor is reply-to. A hidden honeypot field drops bots and a light per-instance limit allows 5 sends per visitor every 10 minutes. Without `RESEND_API_KEY` the route answers 503 and the forms show their error state with the email fallback.

## Consequences
- Needs a Resend account, the domain verified (DNS records in Vercel) and `RESEND_API_KEY` set in Vercel; optional `FORMS_FROM` and `FORMS_TO` (see `.env.example`).
- Free plan limits apply (about 3,000 emails a month, 100 a day at the time of writing).
- The rate limit is per server instance; add a shared store if spam becomes a problem.
- No confirmation email to the applicant yet.

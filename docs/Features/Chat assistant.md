---
type: feature
status: building
date: 2026-10-08
code: "components/chat/ChatLayout.tsx"
tags:
  - feature
related:
  - "[[Navigation and footer]]"
---

# Chat assistant

**Code:** `components/chat/` (`ChatLayout`, `ChatHeader`, `ChatMessagesContainer`, `ChatInput`, `types.ts`), mounted in `app/layout.tsx`; AI call stub in `actions/AI/AIresponse.ts`.

## What it does
An AI assistant that answers visitors' questions about Forest. Floating launcher "Pregúntanos" (bottom right, appears after the first screen) opens a panel: header, conversation log with greeting and suggested questions, thinking and error states, composer. Copy under `chat` in `lib/dictionary.ts`. Preview: `?chat=preview`, `?chat=thinking`, `?chat=error`.

- **Knowledge** (`lib/assistantContext.ts`, built from `data/` on every request): company, career steps, roster, streamers, Kick, the tournament, studio prices, demos, contact and agenda, plus **who built the site** (`developer()`, from `site.credits`: name, role, website, email, Instagram, LinkedIn; added 2026-10-18). It points to the developer only for questions about the site or a project with him; company questions go to the team's contact.

## Open issues
- [ ] **Design only**: Daniel wires `send` in `ChatLayout.tsx` to `getResponseFromConversation` (status thinking → append the answer → idle, or error)
- [ ] Decide what the assistant knows (agenda, artists, prices, demo process) and how it is kept current with `data/`

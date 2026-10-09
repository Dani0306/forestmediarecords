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

## Open issues
- [ ] **Design only**: Daniel wires `send` in `ChatLayout.tsx` to `getResponseFromConversation` (status thinking → append the answer → idle, or error)
- [ ] Decide what the assistant knows (agenda, artists, prices, demo process) and how it is kept current with `data/`

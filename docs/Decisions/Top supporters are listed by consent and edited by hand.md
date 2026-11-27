---
type: decision
status: accepted
date: 2026-11-26
tags:
  - decision
---

# Top supporters are listed by consent and edited by hand

## Context
Daniel asked for a public list of the people who support the label most, ordered by amount, that only he updates. He also asked for a WhatsApp button so supporters can send the proof of their transfer. The site can't see Bre-B transfers ([[Support starts with Bre-B and PayPal, gateway later]]), and it never shows a name or amount that isn't real and consented ([[Placeholder content policy]]).

## Decision
- The board ("Quienes más apoyan") is a list in `data/support.ts` (`supporters`). Only Daniel edits it. An `?admin` form with Upstash Redis, like the Tiraderas winners, was rejected for now: it needs a route, a password and a store for something that changes a few times a month.
- Proof goes by WhatsApp ("Escribir por WhatsApp"; the page asks softly and the prefilled message carries the receipt), never through the site. An upload form was rejected: a bank receipt is personal data and would need storage and a retention policy. This replaces the earlier choice not to ask for proof: giving it is optional, but it is the way onto the board.
- Nobody appears without asking. The prefilled WhatsApp message asks for the name to show; a transfer with no message stays in the private ledger.
- The board orders everyone by total. An amount is printed only for supporters who agreed (`showAmount`).
- The top five are ranked; everyone else is named under "También apoyan" without amounts, so a small gift is still thanked.
- The board shows from day one with open spots ("Lugar libre") as an invitation. `showBoard: false` hides it.

## Consequences
- A name goes up only after the transfer shows in Nequi and the supporter asked in writing; the WhatsApp message is the record. Removal is deleting the entry.
- Every total on the board must match the private ledger. The site still shows no overall total and no goal.
- Updating the board is a data edit plus a push to `main`.
- Privacy and terms each carry one sentence about the receipt and the public name (draft, `data/legal.ts`).
- If updates become frequent, add the `?admin` form (see [[Roadmap]]).

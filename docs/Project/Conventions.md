---
type: reference
status: active
date: 2026-10-05
tags:
  - project
  - conventions
---

# Conventions

## Content
- **Never invent facts**: no made-up events, venues, stats, testimonials or social links. Use clearly marked placeholders (`sample: true` → visible "Ejemplo" tag; empty strings hide links or show "por conectar").
- All content lives in `data/*.ts`; all copy lives in `lib/dictionary.ts` with **both ES and EN**. Never hard-code visible text in components.
- Dates are ISO strings in Medellín time (`-05:00`); formatting uses `America/Bogota`.

## Code
- Match the surrounding style; Prettier formatting (80 columns) is applied by the editor.
- Client components for anything using `useLang` / `useNow`. Keep per-second state in the smallest component that shows it.
- Tailwind utilities first; shared materials and states as classes in `app/globals.css` (`.btn-hot`, `.btn-steel`, `.stencil`, `.readout`, `.stamp`, `.plate`, `.iron-photo`, `.glass-side`, `.glass-field`, `[data-heat]`).
- Respect `prefers-reduced-motion` for every animation and for video autoplay.

## Design
- `DESIGN.md` is the design authority; `PRODUCT.md` is the product authority. Update `DESIGN.md` when a durable pattern changes.
- The heat ramp is **state, not decoration**. No eyebrow labels above headings. Glass/blur is used only over photos or video.

## Working with Claude
- Use the Impeccable skill for UI work, and the Obsidian skills for this vault (see [[Home]] and the repo's `CLAUDE.md`).
- After each feature or decision, update its note here, add a decision note (from the [[Decision]] template) when something durable was chosen, and append to the day's daily note.

---
name: Forest Media Récords
description: A forge floor for emerging artists in Medellín; every artist a workpiece, every event a heat.
colors:
  forge: "#0b0b0d"
  forge-2: "#131316"
  forge-3: "#1b1c20"
  anvil: "#2a2d31"
  steel: "#9a9ea5"
  iron: "#ece6da"
  cherry: "#c21e0e"
  ember: "#ff5a11"
  glow: "#ffa62b"
  white-heat: "#fff3c4"
  scale: "#070707"
typography:
  display:
    fontFamily: "Saira Stencil, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 13vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 70"
  headline:
    fontFamily: "Saira Stencil, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 74"
  title:
    fontFamily: "Saira Stencil, Arial Narrow, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 2.35rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 80"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  readout:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    letterSpacing: "0.08em"
    fontFeature: "'tnum', 'zero'"
    fontVariation: "'wdth' 87.5"
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.16em"
    fontVariation: "'wdth' 87.5"
  button:
    fontFamily: "Saira Stencil, Arial Narrow, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 88"
rounded:
  tag: "2px"
  plate: "3px"
  gauge: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "40px"
  section: "96px"
  section-lg: "128px"
  container: "1440px"
components:
  button-hot:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.scale}"
    typography: "{typography.button}"
    rounded: "{rounded.plate}"
    padding: "0 24px"
    height: "52px"
  button-hot-hover:
    backgroundColor: "{colors.glow}"
    textColor: "{colors.scale}"
  button-steel:
    backgroundColor: "{colors.forge-2}"
    textColor: "{colors.iron}"
    typography: "{typography.button}"
    rounded: "{rounded.plate}"
    padding: "0 24px"
    height: "52px"
  button-steel-hover:
    backgroundColor: "{colors.forge-3}"
    textColor: "{colors.white-heat}"
  plate:
    backgroundColor: "{colors.forge-2}"
    textColor: "{colors.iron}"
    rounded: "{rounded.plate}"
    padding: "20px"
  input:
    backgroundColor: "{colors.forge}"
    textColor: "{colors.iron}"
    rounded: "{rounded.plate}"
    padding: "0 16px"
    height: "48px"
  input-focus:
    backgroundColor: "{colors.forge-2}"
  tag-sample:
    textColor: "{colors.steel}"
    typography: "{typography.readout}"
    rounded: "{rounded.tag}"
    padding: "2px 6px"
---

# Design System: Forest Media Récords

## Overview

**Creative North Star: "The Forge Floor"**

The interface is a blacksmith's floor at night: forge-black ground, anvil-gray steel plates, chalk-ruled measurement scales, and a single heat ramp (black to cherry to orange to white heat) that is never decoration, always state. Anything glowing is either happening now, coming soon, or being worked. Anything cold is finished or past. Artists are workpieces on the floor, events are heats on the schedule, and the visitor reads temperature before reading text.

Density is workshop-dense rather than editorial-airy: big stenciled headlines stamped onto the floor, tabular mono readouts beside them, hairline anvil rules separating everything. The layout is a 12-column steel bench with generous section height, so each station (agenda, roster, Kick, process, demos) reads as its own heat. Motion is physical: headings drop like a hammer with a small overshoot, hero type cools from white heat to iron, and the signature canvas bar in the hero takes blows.

Surfaces carry texture. A faint soot grain lies over the whole page, steel plates have fine brushed striations, and the hot button is flecked with mill scale. Flat, clean, untextured panels read as foreign to this world.

**Key Characteristics:**
- Dark only (`color-scheme: dark`); forge black is the floor, never a light theme.
- One heat ramp, used as a state scale (live, white, hot, warm, embers, cold).
- Heavy Saira Stencil caps whose width axis flexes; Martian Mono for every number and measurement; Archivo for reading.
- Hairline anvil rules and near-square 3px corners; steel plates with grain.
- Hammer-drop motion with a hard overshoot, never floaty eases.

## Colors

A cold steel neutral world lit by one incandescent ramp that encodes temperature, and therefore time.

### Primary
- **Working Ember** (ember): the bright orange of metal at working heat. Hot button base, active toggles, link text, focus-adjacent accents (hover underlines, active nav rule), icon tint inside steel buttons, selection background. The one color that says "act here".

### Secondary
- **Cherry Red** (cherry): the dull red of cooling metal. Left stop of the hot button gradient, completed steps in the forge process, form error borders, scrollbar thumb hover.
- **Forge Glow** (glow): orange-yellow. Right stop of hot gradients and hover state, the currently active process step, success status text.

### Tertiary
- **White Heat** (white-heat): the hottest stop, near-cream. Focus outlines (2px, 3px offset), hover text on steel buttons and nav links, the hero headline at full heat, the "live" heat state.

### Neutral
- **Forge Black** (forge): page ground, nav bar, input fields.
- **Raised Plate** (forge-2): steel plate panels, row hover, focused input fill.
- **Deep Plate** (forge-3): photo wells and the steel button hover fill.
- **Anvil Gray** (anvil): every rule, panel edge and divider; also the color of untouched step numerals and cold dates.
- **Cold Steel** (steel): secondary text, labels, units, captions.
- **Iron White** (iron): primary text, with opacity steps (80%, 75%, 70%) for body copy.
- **Mill Scale** (scale): text on hot surfaces, footer ground, selection text.

### Named Rules
**The Heat Is State Rule.** The ramp's colors mean temperature, and temperature means time-to-event or activity. Set them through the heat state (`live`, `white`, `hot`, `warm`, `embers`, `cold`), which exposes a hot stop and a cooler stop to children; never paint a ramp color on something just to make it pop. The intermediate stops (warm #e04a16 / #6a1709, embers #9c2410 / #3a0f08, cold #5b5f66 / anvil) exist only inside that ramp.

**The One Hot Button Rule.** A view carries one hot plate action per decision point; every other action is cold steel. Toggle groups (agenda filters) use hot for the selected option only.

## Typography

**Display Font:** Saira Stencil (with Arial Narrow fallback), variable width axis
**Body Font:** Archivo (with system-ui fallback), width axis tuned to about 92 for ledes
**Label/Mono Font:** Martian Mono (with ui-monospace), width 87.5

**Character:** Stamped stencil caps against a technical mono that reads like gauge markings; Archivo sits quietly between them for anything longer than a line.

### Hierarchy
- **Display** (800, clamp 3.25 to 6rem, line-height 0.88, width 70): the hero headline only. Width grows by 4 per hammer blow up to 9 blows, and color cools from white heat to iron.
- **Headline** (800, clamp from about 2.75rem up to 6rem, 0.88, width 66 to 74): section titles. Narrower widths (66 to 70) for short one-word titles at the larger sizes, 74 for longer two-word titles.
- **Title** (800, 1.5 to 2.35rem, 0.95, width 80): event titles, card titles, sub-headings; 84 for small section subheads and nav links.
- **Numerals** (800 stencil, 2.75 to 6rem, leading none, width 64 to 70): dates stamped into rows and step numbers, colored by heat.
- **Body** (400, 1rem, 1.55): running text. Ledes run 1.0625 to 1.125rem at relaxed leading, capped at 30 to 36rem.
- **Readout** (mono, uppercase, 0.08em tracking, tabular and slashed-zero): every date, time, countdown, unit, measurement and metadata line, 0.6 to 0.75rem. Large readout values (countdown, blow counters) drop tracking to normal.
- **Label / Stamp** (mono, 0.6875rem, 0.16em, uppercase, steel): labels stamped on panels and form fields.

### Named Rules
**The Stamp Sits On The Plate Rule.** Stamp labels live inside panels (panel headers, field labels, plate captions). They never sit above a section heading as a kicker or eyebrow.

**The Numbers Are Measured Rule.** Any figure (date, time, countdown, length, temperature, index like 001 or 02 / 05) is set in the mono readout with tabular numerals, never in Archivo.

**The Width Axis Moves Rule.** Stencil width is a live parameter, not a fixed style: it responds to blows in the hero and widens (74 to 92) on the active forge step.

## Layout

A 12-column grid inside a 1440px container, with gutters of 16px (mobile), 24px (from 640px) and 40px (from 1024px). Sections stack full-width, separated by a single anvil top rule, with vertical padding of 96px on mobile and 128px (up to 144px for the process) on large screens. Desktop splits are asymmetric: 5/7 or 7/5 for heading versus content, 4/8 with a sticky left column for roster and process. The hero is a full-viewport grid with a 7-column headline, a 5-column live heat panel, and the forge bar breaking out edge to edge beneath both, followed by its chalk ruler and readouts. Lists are rule-separated rows (agenda, process, channels, roster stats), not card grids; the only card grid is the two-up Kick upcoming list. Artist photos run in a horizontal snap strip that bleeds off the right edge on desktop. Below 1024px everything collapses to one column; the nav collapses to a full-screen menu at the same point. Touch targets are at least 44px.

## Elevation & Depth

Depth comes from heat, not height. Surfaces are flat steel at rest, separated by hairline anvil borders and tonal plate steps (forge, forge-2, forge-3). Shadows are light emission: the hot button and heat bars cast a colored glow beneath them, and hero type carries a heat-scaled text glow. The one neutral shadow is a deep, soft drop under the hero's live heat panel, lifting it off the floor.

### Shadow Vocabulary
- **Hot plate** (`box-shadow: 0 1px 0 rgb(255 243 196 / 0.35) inset, 0 10px 30px -12px rgb(255 90 17 / 0.7)`): hot button at rest; hover brightens to `0 1px 0 rgb(255 243 196 / 0.6) inset, 0 14px 40px -10px rgb(255 166 43 / 0.75)`.
- **Heat bar glow** (`box-shadow: 0 3px 10px -3px color-mix(in oklab, var(--h) 70%, transparent)`): heat gauges; removed when cold.
- **Panel lift** (`box-shadow: 0 24px 60px -30px rgb(0 0 0 / 0.9)`): the hero live heat panel only.
- **Hot type** (text-shadow scaled by heat, up to 28px orange bloom): hero headline while hot.

### Named Rules
**The Only Glow Is Heat Rule.** A colored shadow appears only on something at heat. Cold elements cast nothing.

## Shapes

Near-square, machined edges: 3px on buttons, plates, inputs and photos; 2px on small sample tags. The one fully rounded form is the heat gauge (pill bars and the tiny legend dots), because it reads as a glowing rod. Borders are 1px anvil hairlines; steel buttons use a translucent iron 28% edge. The chalk ruler (10 major and 50 minor ticks in iron at 38%) is a recurring measurement motif under the forge bar. Icons are custom 24px-grid strokes at 1.75 weight with square caps and mitered joins, inheriting current color.

## Components

### Buttons
Stamped, heavy and tactile; they press down 1px and shrink slightly on press.
- **Shape:** near-square (3px), minimum height 52px, 44px for compact toolbar and icon buttons.
- **Hot plate (primary):** mill-scale text on an ember plate with a cherry-to-ember-to-glow gradient and scale flecks; stencil caps 1.125rem, 0.08em tracking.
- **Hover / Focus:** hot gradient shifts toward ember-glow-white heat and the glow widens; focus is the global 2px white heat outline at 3px offset. Transitions use the hammer ease (0.25s color, 0.12s transform).
- **Cold steel (secondary):** iron text on translucent plate with a 28% iron edge; hover turns the edge ember, fill to deep plate, text to white heat. Icons inside steel buttons are tinted ember.
- **Disabled:** 45% opacity, no pointer events.

### Chips
- **Sample tag:** tiny mono readout in a 2px anvil-bordered box, steel text; marks placeholder data.
- **Language toggle:** joined mono segments with anvil borders; pressed segment fills ember with mill-scale text.

### Cards / Containers
- **Corner Style:** 3px.
- **Background:** raised plate with soot grain and fine vertical brushed striations.
- **Shadow Strategy:** flat; see Elevation (panel lift only for the hero live heat panel).
- **Border:** 1px anvil; internal headers and footers split by anvil rules.
- **Internal Padding:** 20px, up to 32px for the demo form.

### Inputs / Fields
- **Style:** forge-black fill, 1px anvil border, 3px corners, 48px minimum height, stamp label above.
- **Focus:** border turns ember and fill steps to raised plate.
- **Error:** cherry border with a lighter orange-red message line below; hint text is a small steel readout.

### Navigation
Fixed 64px forge-black bar with an anvil bottom rule. Logo (spinning vinyl on hover) plus stencil wordmark; links in stencil caps at width 84, iron 80%, with an ember hairline that wipes in from the left on hover. Right cluster: language toggle and a compact steel Kick button. Below 1024px a full-screen forge-black menu lists links in 3rem stencil separated by anvil rules.

### Heat Gauge (signature)
A pill bar filled with a gradient from near black through the heat state's cooler stop to its hot stop, with a matching glow. Width encodes proximity in agenda rows; it flickers in stepped brightness when live. It doubles as the legend swatch and status chip.

### Iron Photo (signature)
Artist photos are graded into the forge: grayscale with slight contrast lift, overlaid by a heat-ramp duotone in color blend mode. The ramp sweeps up as the photo scrolls into view; hover or focus releases the photo to full color with a 1.03 scale.

### Forge Bar (signature)
The hero canvas: a white-hot bar on dark steel that sheds a scale shower, cools over time, and takes blows on click or the Strike button, lengthening and widening the headline. Always paired with the chalk ruler and mono readouts (blows, length in MM, temperature in degrees C).

## Do's and Don'ts

### Do:
- **Do** route every ramp color through a heat state so color always means temperature.
- **Do** set every number, date, unit and measurement in the Martian Mono readout with tabular numerals.
- **Do** separate content with 1px anvil rules and rule-separated rows before reaching for cards.
- **Do** keep corners at 3px (2px for tags) and reserve full rounding for heat gauges.
- **Do** use the hammer ease (`cubic-bezier(0.16, 1, 0.3, 1)`) and the drop reveal with its small overshoot; respect reduced motion.
- **Do** grade photography into the forge with the iron duotone, releasing color only on interaction.
- **Do** keep the soot grain and plate texture on surfaces.

### Don't:
- **Don't** put a stamp label, kicker or eyebrow above a section heading.
- **Don't** use more than one hot plate action per decision point.
- **Don't** introduce a light theme or a second accent hue outside the heat ramp.
- **Don't** cast colored glows from cold or inactive elements.
- **Don't** use soft floating eases or fade-up-from-below reveals; things drop like a hammer.
- **Don't** use rounded pill buttons or large radii on plates.

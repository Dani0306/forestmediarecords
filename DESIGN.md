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

The interface is a blacksmith's floor at night: forge-black ground, anvil-gray steel plates, mm-ruled measurement marks, and a single heat ramp (black to cherry to orange to white heat) that is never decoration, always state. Anything glowing is either happening now, coming soon, or being worked. Anything cold is finished or past. Artists are workpieces on the floor, events are heats on the schedule, and the visitor reads temperature before reading text.

Density is workshop-dense rather than editorial-airy: big stenciled headlines stamped onto the floor, tabular mono readouts beside them, hairline anvil rules separating everything. The layout is a 12-column steel bench with generous section height, so each station (agenda, roster, Kick, process, demos) reads as its own heat. Motion is physical: headings drop like a hammer with a small overshoot, hero type cools from white heat to iron over the artist video loop.

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
- **Display** (800, clamp 3.25 to 6rem, line-height 0.88, width 70): the hero headline only. Color cools from white heat to iron once on load (`cool-in`, 2.8s).
- **Headline** (800, clamp from about 2.75rem up to 6rem, 0.88, width 66 to 74): section titles. Narrower widths (66 to 70) for short one-word titles at the larger sizes, 74 for longer two-word titles.
- **Title** (800, 1.5 to 2.35rem, 0.95, width 80): event titles, card titles, sub-headings; 84 for small section subheads and nav links.
- **Numerals** (800 stencil, 2.75 to 6rem, leading none, width 64 to 70): dates stamped into rows and step numbers, colored by heat.
- **Body** (400, 1rem, 1.55): running text. Ledes run 1.0625 to 1.125rem at relaxed leading, capped at 30 to 36rem.
- **Readout** (mono, uppercase, 0.08em tracking, tabular and slashed-zero): every date, time, countdown, unit, measurement and metadata line, 0.6 to 0.75rem. Large readout values (countdowns) drop tracking to normal.
- **Label / Stamp** (mono, 0.6875rem, 0.16em, uppercase, steel): labels stamped on panels and form fields.

### Named Rules
**The Stamp Sits On The Plate Rule.** Stamp labels live inside panels (panel headers, field labels, plate captions). They never sit above a section heading as a kicker or eyebrow.

**The Numbers Are Measured Rule.** Any figure (date, time, countdown, length, temperature, index like 001 or 02 / 05) is set in the mono readout with tabular numerals, never in Archivo.

**The Width Axis Moves Rule.** Stencil width is a live parameter, not a fixed style: it widens (74 to 92) on the active forge step.

## Layout

A 12-column grid inside a 1440px container, with gutters of 16px (mobile), 24px (from 640px) and 40px (from 1024px). Sections stack full-width, separated by a single anvil top rule, with vertical padding of 96px on mobile and 128px (up to 144px for the process) on large screens. Desktop splits are asymmetric: 5/7 or 7/5 for heading versus content, 4/8 with a sticky left column for roster and process. The hero is a full-viewport artist video loop (muted, looping, poster frame, pause control; held on the poster under reduced motion) with forge-black scrims from the left and bottom; the headline, lede and actions sit bottom-left, and the next main event's panel sits bottom-right, and a full-width heat line with the next secondary event closes the viewport. Lists are rule-separated rows (agenda, process, channels, roster stats), not card grids; the only card grid is the two-up Kick upcoming list. Artist photos run in a horizontal snap strip that bleeds off the right edge on desktop. Below 1024px everything collapses to one column; the nav collapses to a full-screen menu at the same point. Touch targets are at least 44px.

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

Near-square, machined edges: 3px on buttons, plates, inputs and photos; 2px on small sample tags. The one fully rounded form is the heat gauge (pill bars and the tiny legend dots), because it reads as a glowing rod. Borders are 1px anvil hairlines; steel buttons use a translucent iron 28% edge. Icons are custom 24px-grid strokes at 1.75 weight with square caps and mitered joins, inheriting current color.

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

### Hero Heat Line (signature): secondary events
Shown at the bottom of the first screen in both hero modes (video hero and event takeover) whenever an upcoming `main: false` event exists; not rendered otherwise.
A 3px full-width rule along the bottom of the video hero, graded from cold steel on the left to the next secondary event's heat on the right (the `[data-heat]` ramp, with a small offset glow). It carries the "Próximo en agenda" strip on forge black at 90%: stamp label with state, stencil date, title, mono meta line, live countdown, sample tag and one ember text action. With no secondary event it shows the line alone.

### Artist Stage (roster)
One artist at a time (stage up to 74vh / 44rem), picked from a roster index: a tab row on an anvil rule, each tab a small portrait (colour when selected), a mono "01 · 05 fotos" line and the name in 1.6–2.25rem stencil, with a 3px cherry-to-glow heat rule under the selected tab; arrow keys move between tabs. The stage photos are graded into the forge with `.iron-photo` (grayscale plus the heat-ramp duotone glowing from below), cross-fading when a thumbnail is chosen. On desktop the photo frame covers only the open area left of the profile (reaching about 7rem under the glass with a feathered edge, focus 50% 22%) over the same photo, iron-graded and softened (26px blur, 1.1 scale), filling the whole stage as the background the black glass sits on, so the glass always blurs the picture itself while the sharp copy keeps its proportions and faces stay in frame. A "Pieza 001" chip sits top left. The profile sits on `.glass-side` (right column on desktop, a band overlapping the photo on mobile): role in glow mono with the "Biografía de ejemplo" tag, the stencil name with the Escuchar button beside it, the first bio paragraph and the "Leer biografía completa" toggle, a two-column fact grid (genre, city, with Forest since, next date in its heat colour, Kick, links) on iron hairlines, and the photo thumbnails at the bottom.

### Kick Showcase
The Kick section leads with the latest Kick edition (`data/kick.ts`). Its lead poster, enlarged, blurred 70px and darkened to 40%, is the section's static background glow, faded into forge black at both ends. The edition sits in the left column: stencil name with the edition number in ember, a mono meta line, a winner row (stamp label, ember stencil name) and a line-up row on iron hairlines (the winner in ember, names joined by ×), the motto in italic, and a hot "Ver en Kick" button. The posters sit on the right as untreated prints (`.kick-poster`: 3px radius, hairline ring, deep offset shadow), the lead tilted 1.5° in front and the line-up −3° behind; hover straightens one and lifts it. Below, upcoming streams and the channel sit on a translucent forge-black plate (no backdrop-filter). Posters are the one place real third-party artwork shows in full colour.

### Trending Mosaic ("En tendencia")
The latest productions, ranked hottest first (`data/trending.ts`). Title "En tendencia" in headline stencil with the caption "En Forest Media Récords" as an iron mono readout led by a 2.5rem hairline (a caption below the heading, never an eyebrow above it). On desktop a 12-column mosaic: the lead piece takes a tall 7-column slot over two rows, two pieces stack beside it, the rest run three across; below 1024px the same cards become a snap strip. Each card is media-first: a 4–8 s muted WebM loop or a still under `.iron-photo`, kind and sample chips on the picture, details on `.glass-field` over a pre-blurred copy of the still or poster (sized to the card with `100cqh`). Rank is temperature: the stencil numeral 01, 02… takes the heat colour (white, hot, hot, warm, warm, embers). Videos play on mouse hover, while centred in view on touch screens, or from the steel "Ver avance" toggle; never on hover under reduced motion. While a clip plays, the card releases to true colour and its 3px heat line fills with playback progress (transform only).

### Streamer Channels ("Nuestros streamers")
A sibling of the Artist Stage, built as a broadcast split screen instead of a tabbed stage (`data/streamers.ts`). On desktop the channels sit side by side in one 50rem band; the open channel grows to about 2.6× (flex-grow, hammer ease, 0.7s) and the others shrink to narrow panels showing the Kick nickname running up the edge in stencil and the full name in mono. Hovering (mouse) or activating a closed panel opens it and moves focus to its name. The open channel shows its photo in true colour ("on air"); closed ones sit in cold grayscale iron (no duotone), warming slightly on hover. Each panel carries a "CH 01" broadcast chip and a "Foto de ejemplo" tag while the photo is a stand-in. On desktop the open channel shows its portrait at true size in a frame on the right (up to 30rem, feathered on its left edge) over a blurred wash of itself, and the details take a single left column whose glass fades out toward the portrait (`.glass-fade-right`); the photo is never blown up past its resolution. Details sit on `.glass-field` over a pre-blurred copy of the photo: role in glow mono with a sample tag, the Kick nickname as the stencil name, a short heat bar coloured by the next stream, the bio, a hot "Ver canal" button beside the underlined handle (the first bio paragraph shows; the rest open with "Leer biografía completa" and the details scroll inside the panel if they outgrow it), then a readout list (full name, content chips, schedule, next stream in its heat colour) and an "En su canal" highlight with a small poster (hidden between 1024 and 1280px). Below 1024px every channel is open and stacked.

### Listen Button (artist stage)
"Escuchar" sits beside the artist name in the profile: a 64px hot plate holding a mill-scale square with an ember play key, the stencil label over a mono "Spotify · YouTube" line, and four equalizer bars that rest low and dance on hover, focus or while open (still under reduced motion). It opens a small forge-black menu below it with one row per platform; a missing link reads "Muy pronto".

### Studio Rate Card and Booking
Prices are a rule-separated rate card, never pricing cards: index, stencil service name with a one-line body, an "Incluye" mono line where it applies, the price in large mono readout (glow on the featured row) with its unit, and a steel "Reservar" that preselects the service. The featured "Producción completa" row carries a 1px heat line, a faint ember wash and an ember "Todo en uno" tag. The booking form is a steel plate in three numbered fieldsets (01 Servicio as radio tiles, 02 Fecha y hora with a native dark date input, slot tiles and a 4-hour block stepper for rentals, 03 Tus datos); selected tiles turn ember-bordered with a 10% ember fill. A sticky summary plate on the right holds the choice, the mono total in glow, the "it's a request" disclaimer, the one hot "Solicitar reserva" and the consent links.

### Form States (demo and booking)
Sending: the hot button shows a stepped pulsing dot and "Enviando…". Error: a cherry-bordered alert at the top of the form (10% cherry fill, stencil title in light orange-red, body with the email fallback, no side stripe), fields keep their values and the action becomes "Reintentar". Success: the form is replaced by a steel plate with a full-width heat line on top (white heat state), a glow mono line, a stencil thank-you title, what happens next, and a steel action to start again; focus moves to it.

### Cookie Notice and Legal Pages
The cookie notice is a bottom steel plate (max 56rem, deep panel lift) with the copy, a privacy link and two actions: steel "Solo necesarias" and hot "Aceptar todas"; it rises in once after 0.8s. Legal pages use the Read layout: back link, stencil title, mono updated date with a "Borrador" tag, a sticky numbered contents list on desktop, and a 68ch column with numbered stencil headings and ember hairline bullets.

### Scroll Choreography
Scroll-driven, CSS view timelines only (compositor properties, off under reduced motion, absent where unsupported). Media blocks (agenda carousel, trending cards on desktop, artist stage, streamer band, forms) are forged in: a top-down clip shutter with a 2rem hammer drop and small overshoot. Photos inside `.parallax` blocks drift ±4% against the scroll using `translate`, so hover scales keep working. The hero sinks away as it leaves: the video pushes in to 1.12 and the copy lifts and fades. The two Kick posters float at different speeds. Rows (forge steps, rate rows) keep the heading `.drop`. Sections that host timelines use `overflow: clip`, not `hidden`, so their children resolve to the page scroller.

### Follow Rows ("Síguenos")
The label's socials as full-width rule-separated rows after the demo form: index, a platform mark drawn on the icon grid (ember), the platform name stamped in stencil up to 5.5rem, the handle in mono, and "Seguir ↗" on the right. Hover or focus sweeps a cherry-to-glow hot plate in from the left (transform only) and turns the row's text to mill scale. Live profiles come first (Instagram, then the Kick channel); platforms without a link sit cold in steel at 40% with a "Muy pronto" tag and are not links.

### Assistant (chat)
A floating assistant on every page (`components/chat/`). The launcher is a hot plate pinned bottom right (a mill-scale square with the chat mark, "Pregúntanos") that appears only after the first screen, so it never covers the main event or the secondary strip. It opens a steel plate panel (25rem × up to 40rem on desktop, full screen on phones) topped by a heat line: header (the vinyl logo, which spins while the assistant thinks; "Asistente Forest" in stencil; a flickering glow dot and "En línea · Respuestas con IA"; steel new-chat and close buttons), the log (assistant turns on the left on forge black with a glow "FOREST" stamp; the visitor's turns on the right on a warm ember-tinted plate with an ember hairline; mono times; a greeting and four suggested questions when empty; three stepped ember dots and "Pensando…" while thinking; a cherry alert with "Reintentar" on error), and the composer (a forge-black field framed in anvil that turns ember on focus, growing to four lines, Enter to send, a hot square send button that stays cold until there is text, and a mono "AI answers may contain mistakes" line). Preview states with `?chat=preview`, `?chat=thinking`, `?chat=error`.

### Event Card (agenda)
Each event is a card in a snap carousel filtered by category (Todo, Conciertos, Streams, Showcases, Lanzamientos), with a 01 / 05 counter and steel prev/next arrows; the track bleeds off the right edge on desktop. The event picture (`image` in `data/events.ts`, else the lead artist's photo) fills the whole card under `.iron-photo`; its heat state, "Evento principal" and sample tags ride on the picture as forge-black chips. The details sit at the bottom on `.glass-field` (forge black 35 to 80% over a pre-blurred copy of the card's own photo, `.glass-blur` 18px, feathered over its top 3rem; no live backdrop-filter, so cards scroll for free): a 3px heat line whose length is the event's temperature, a big stencil date beside the title, the mono meta line, then the countdown and the calendar / watch actions. Hovering or focusing a card heats the picture to true colour; finished events stay plain grayscale and appear at the end of the carousel when shown.

### Event Takeover: main events
When a main event (`main: true`) is upcoming or live, it takes over the whole first screen and the video hero steps aside; with none, the video hero returns. The event's own picture, scaled up, blurred 70px and darkened, fills the background, with a soft glow in its heat colour low right. Desktop is a 5/7 split: the poster on the left, whole, in its own shape (`poster: { width, height }`, sized to the viewport height; plain photos keep the iron duotone at 4:5); on the right a small "Forest Media Récords presenta" line with the logo (the page's h1), the "Próximo gran evento" stamp with its heat state and sample tag, the title stamped huge (stencil, width 64, up to 7.25rem; a trailing "#3" takes the heat colour), a mono line with a heat-coloured "Hoy"/"Mañana" chip, date, time, place and type, then the countdown: four measured cells (días, horas, minutos, segundos) in mono up to 7rem between iron hairlines, seconds in the heat colour lifted toward white heat and stamped in on every tick, closed by a full-width heat bar. Live replaces the clock with a giant "EN VIVO" and a flickering dot, and the action becomes "Ver en vivo". Actions: hot "Ver en Kick" (streams), steel "Agregar al calendario" (.ics), and a quiet "Ver toda la agenda". On phones the poster shrinks (34svh) so the title and the whole countdown land on the first screen. The server renders with the build time as "now" so the takeover survives hydration, then the live clock takes over.

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

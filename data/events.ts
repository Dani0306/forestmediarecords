/**
 * Agenda: concerts, Kick streams, showcases and releases.
 * Dates are ISO strings in Medellín time (UTC-5).
 *
 * Only real, confirmed events go here. `sample: true` would show an
 * "Ejemplo" tag; the live site carries none.
 *
 * MAIN EVENTS: every event says `main: true` or `main: false`.
 *   main: true  → while it is upcoming or live, it takes over the whole first
 *                 screen of the site (poster, title, big countdown). If several
 *                 are marked, the soonest one wins; when it ends, the next takes over.
 *                 With no main event left, the artist video hero comes back.
 *   main: false → a regular event: it shows in the agenda only.
 * Keep `main: true` for the one event that matters most.
 */
export type EventType = "concert" | "stream" | "showcase" | "release";

export type ForgeEvent = {
  id: string;
  type: EventType;
  title: { es: string; en: string };
  artists: string[]; // artist slugs
  start: string;
  /** Defaults to start + 2h when omitted. */
  end?: string;
  /** Venue name for live shows; for streams use "Kick". */
  place: { es: string; en: string };
  url?: string; // tickets, Kick channel or release link
  /** Main event? true → takes over the hero's first screen (see the note above). Required. */
  main: boolean;
  /** Event picture (agenda card and hero); defaults to the lead artist's photo. */
  image?: string;
  /**
   * The image is a poster (artwork with text): give its pixel size and the hero
   * shows it whole, in full colour, in its own shape (the panel sizes around it).
   */
  poster?: { width: number; height: number };
  sample?: boolean;
};

export const events: ForgeEvent[] = [
  // {
  //   id: "studio-session-lentino",
  //   type: "stream",
  //   main: false,
  //   title: {
  //     es: "Sesión en vivo desde el estudio",
  //     en: "Live session from the studio",
  //   },
  //   artists: ["lentino"],
  //   start: "2026-10-09T20:00:00-05:00",
  //   place: { es: "Kick", en: "Kick" },
  //   image: "/artists/lentino/lentino-2.avif",
  //   sample: false,
  // },
  {
    id: "futuras-promesas-3",
    type: "stream",
    main: false,
    title: { es: "Futuras promesas #3", en: "Futuras promesas #3" },
    artists: [""],
    start: "2026-10-07T21:00:00-05:00",
    end: "2026-10-08T00:00:00-05:00",
    place: {
      es: "Estudio Forest Media · Sabaneta",
      en: "Forest Media headquarters · Medellín",
    },
    image: "/futuras-promesas/ft3-poster.avif",
    poster: { width: 1254, height: 1254 },
    sample: false,
  },
  // Mundial de Tiraderas 2026 (data/tiraderas.ts): the draw is at 8 PM and every later round at 7:30 PM (Colombia time), on Kick, all channels.
  // TODO: swap `image` for the official poster when it's ready.
  {
    id: "tiraderas-sorteo",
    type: "stream",
    main: false,
    title: {
      es: "Mundial de Tiraderas · Sorteo",
      en: "Mundial de Tiraderas · The draw",
    },
    artists: [],
    start: "2026-10-16T20:00:00-05:00",
    place: { es: "Kick · todos los canales", en: "Kick · all channels" },
    image: "/streamers/leolugo/leolugo-portrait.avif",
  },
  {
    id: "tiraderas-face-off",
    type: "stream",
    main: true,
    title: {
      es: "Mundial de Tiraderas · Face off",
      en: "Mundial de Tiraderas · Face off",
    },
    artists: [],
    start: "2026-10-23T19:30:00-05:00",
    place: { es: "Kick · todos los canales", en: "Kick · all channels" },
    image: "/streamers/trianiss/trianiss-4.avif",
  },
  {
    id: "tiraderas-cuartos",
    type: "stream",
    main: false,
    title: {
      es: "Mundial de Tiraderas · Cuartos de final",
      en: "Mundial de Tiraderas · Quarter-finals",
    },
    artists: [],
    start: "2026-11-06T19:30:00-05:00",
    place: { es: "Kick · todos los canales", en: "Kick · all channels" },
    // the team asked for Jaycol (judge) on this round, watched from his channel.
    image: "/tiraderas/juries/jaycol.jpg",
    url: "https://kick.com/jaycol",
  },
  {
    id: "tiraderas-semifinal",
    type: "stream",
    main: false,
    title: {
      es: "Mundial de Tiraderas · Semifinal",
      en: "Mundial de Tiraderas · Semi-final",
    },
    artists: [],
    start: "2026-11-13T19:30:00-05:00",
    place: { es: "Kick · todos los canales", en: "Kick · all channels" },
    image: "/streamers/trianiss/trianiss-2.avif",
  },
  {
    id: "tiraderas-final",
    type: "stream",
    main: false,
    title: {
      es: "Mundial de Tiraderas · Gran final",
      en: "Mundial de Tiraderas · Grand final",
    },
    artists: [],
    start: "2026-11-21T19:30:00-05:00",
    place: { es: "Kick · todos los canales", en: "Kick · all channels" },
    image: "/streamers/leolugo/leolugo-portrait.avif",
  },
];

export const eventEnd = (e: ForgeEvent) =>
  e.end
    ? new Date(e.end).getTime()
    : new Date(e.start).getTime() + 2 * 3600_000;

export type Heat = "live" | "white" | "hot" | "warm" | "embers" | "cold";

const DAY = 24 * 3600_000;

/**
 * Temperature is the agenda's state vocabulary:
 * live = on air now, white = within 72h, hot = within 7 days,
 * warm = within 3 weeks, embers = further out, cold = finished.
 */
export function heatOf(e: ForgeEvent, now: number): Heat {
  const start = new Date(e.start).getTime();
  const end = eventEnd(e);
  if (now >= end) return "cold";
  if (now >= start) return "live";
  const d = start - now;
  if (d <= 3 * DAY) return "white";
  if (d <= 7 * DAY) return "hot";
  if (d <= 21 * DAY) return "warm";
  return "embers";
}

/** Continuous temperature 0–1 (1 = on air), so rows in the same state still read hotter or cooler. */
export function heatLevel(e: ForgeEvent, now: number) {
  const start = new Date(e.start).getTime();
  if (now >= eventEnd(e)) return 0;
  if (now >= start) return 1;
  const days = (start - now) / DAY;
  return Math.max(0.08, Math.min(0.97, 1 - Math.log1p(days) / Math.log1p(90)));
}

export const upcoming = (now: number) =>
  events
    .filter((e) => eventEnd(e) > now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

export const past = (now: number) =>
  events
    .filter((e) => eventEnd(e) <= now)
    .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

/** The next main event (`main: true`), or undefined. */
export const nextMain = (now: number) => upcoming(now).find((e) => e.main);

/** The next secondary event (`main: false`), or undefined. */
export const nextSecondary = (now: number) =>
  upcoming(now).find((e) => !e.main);

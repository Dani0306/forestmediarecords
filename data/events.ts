/**
 * Agenda: concerts, Kick streams, showcases and releases.
 * Dates are ISO strings in Medellín time (UTC-5).
 *
 * Every entry below is a SAMPLE (`sample: true`) shown with a visible
 * "Example" tag. Replace them with real events and drop the flag.
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
  sample?: boolean;
};

export const events: ForgeEvent[] = [
  {
    id: "studio-session-lentino",
    type: "stream",
    title: { es: "Sesión en vivo desde el estudio", en: "Live session from the studio" },
    artists: ["lentino"],
    start: "2026-10-09T20:00:00-05:00",
    place: { es: "Kick", en: "Kick" },
    sample: true,
  },
  {
    id: "renzo-stream",
    type: "stream",
    title: { es: "Renzo · Directo y freestyle", en: "Renzo · Live & freestyle" },
    artists: ["renzo"],
    start: "2026-10-16T21:00:00-05:00",
    place: { es: "Kick", en: "Kick" },
    sample: true,
  },
  {
    id: "lentino-live",
    type: "concert",
    title: { es: "Lentino en concierto", en: "Lentino live in concert" },
    artists: ["lentino"],
    start: "2026-10-24T21:00:00-05:00",
    end: "2026-10-25T00:00:00-05:00",
    place: { es: "Lugar por confirmar · Medellín", en: "Venue TBA · Medellín" },
    sample: true,
  },
  {
    id: "forest-showcase",
    type: "showcase",
    title: { es: "Showcase Forest: artistas emergentes", en: "Forest Showcase: emerging artists" },
    artists: ["lentino", "renzo"],
    start: "2026-11-14T19:00:00-05:00",
    end: "2026-11-14T23:00:00-05:00",
    place: { es: "Lugar por confirmar · Medellín", en: "Venue TBA · Medellín" },
    sample: true,
  },
  {
    id: "renzo-single",
    type: "release",
    title: { es: "Renzo · Nuevo sencillo", en: "Renzo · New single" },
    artists: ["renzo"],
    start: "2026-11-28T00:00:00-05:00",
    end: "2026-11-28T23:59:00-05:00",
    place: { es: "Todas las plataformas", en: "All platforms" },
    sample: true,
  },
  {
    id: "renzo-live-sep",
    type: "concert",
    title: { es: "Renzo en vivo", en: "Renzo live" },
    artists: ["renzo"],
    start: "2026-09-20T22:00:00-05:00",
    end: "2026-09-21T01:00:00-05:00",
    place: { es: "Medellín", en: "Medellín" },
    sample: true,
  },
];

export const eventEnd = (e: ForgeEvent) =>
  e.end ? new Date(e.end).getTime() : new Date(e.start).getTime() + 2 * 3600_000;

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

/**
 * La Cantina de Trianiss: the FMR Gang's night in Trianiss's cantina, live on Kick.
 * Shown by `components/Cantina.tsx` (section `#cantina`, right after the new releases)
 * and as the number 2 card in "En tendencia" (`data/trending.ts`).
 *
 * Facts come from the team (flyers in `marketing/cantina-de-trianiss*`, time from Daniel
 * on 2026-11-26). Don't invent any.
 *
 * - `date`: the day, YYYY-MM-DD, Medellín time.
 * - `time`: start time "HH:MM" (24 h), or "" while it isn't confirmed ("Hora por confirmar").
 * - `end`: optional end "YYYY-MM-DDTHH:MM" (Medellín). Without it the section reads
 *   "En vivo" from the start until midnight, then cools down ("La cantina ya cerró").
 * - `picture`: the cartoon flyer art (only picture, at the team's request on 2026-11-26).
 * - Not in `data/events.ts` on purpose: an agenda entry would replace the hero's
 *   "Próximo en agenda" strip, and the hero stays as it is.
 *   Delete the section from `app/page.tsx` when it's no longer wanted.
 */
export type CantinaPicture = {
  src: string;
  width: number;
  height: number;
  /** CSS object-position inside the 4:5 crop the section shows. */
  focus: string;
  alt: { es: string; en: string };
};

export const cantina: {
  name: { lead: string; host: string };
  date: string;
  time: string;
  end?: string;
  host: string;
  channel: string;
  channelLabel: string;
  picture: CantinaPicture;
} = {
  name: { lead: "La Cantina", host: "Trianiss" },
  date: "2026-11-27",
  time: "21:00",
  host: "Trianiss",
  channel: "https://kick.com/trianiss",
  channelLabel: "kick.com/trianiss",
  picture: {
    src: "/cantina/cantina-fmr-gang.webp",
    width: 900,
    height: 1592,
    focus: "50% 42%",
    alt: {
      es: "Ilustración de la FMR Gang en la cantina con sombreros vueltiaos y ruanas, brindando con cervezas bajo una bandera de Colombia",
      en: "Illustration of the FMR Gang in the cantina in sombreros vueltiaos and ruanas, raising beers under a Colombian flag",
    },
  },
};

const TZ = "America/Bogota";
const dayKey = (ms: number) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(ms);

/** The start as an ISO instant in Medellín time (noon while the time is unconfirmed, for day/month formatting). */
export const cantinaIso = `${cantina.date}T${cantina.time || "12:00"}:00-05:00`;
/** When it starts (ms), or null while the time is unconfirmed. */
export const cantinaStart = cantina.time ? new Date(cantinaIso).getTime() : null;
/** When it ends (ms): `end`, or the midnight after the day. */
const cantinaEnd = cantina.end
  ? new Date(`${cantina.end}:00-05:00`).getTime()
  : new Date(`${cantina.date}T00:00:00-05:00`).getTime() + 24 * 3600_000;

export type CantinaPhase = "upcoming" | "tomorrow" | "today" | "live" | "done";

/** Where the cantina stands relative to `now` (Medellín calendar days, then the start time). */
export function cantinaPhase(now: number): CantinaPhase {
  if (now >= cantinaEnd) return "done";
  if (cantinaStart !== null && now >= cantinaStart) return "live";
  const today = dayKey(now);
  if (today === cantina.date) return "today";
  return dayKey(now + 24 * 3600_000) === cantina.date ? "tomorrow" : "upcoming";
}

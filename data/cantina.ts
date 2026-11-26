/**
 * La Cantina de Trianiss: the FMR Gang's night in Trianiss's cantina, live on Kick.
 * Shown by `components/Cantina.tsx` (section `#cantina`, right after the new releases)
 * and as the number 2 card in "En tendencia" (`data/trending.ts`).
 *
 * Facts come from the team's flyers (`marketing/cantina-de-trianiss*`). Don't invent any.
 *
 * - `date`: the day, YYYY-MM-DD, Medellín time.
 * - `time`: start time "HH:MM" (24 h), or "" while it isn't confirmed. Empty shows
 *   "Hora por confirmar". When it's known, also consider adding the event to
 *   `data/events.ts` (`main: false`) so it shows in the agenda.
 * - After the day passes the section cools down ("La cantina ya cerró") on its own.
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

export const cantina = {
  name: { lead: "La Cantina", host: "Trianiss" },
  date: "2026-11-27",
  time: "",
  host: "Trianiss",
  channel: "https://kick.com/trianiss",
  channelLabel: "kick.com/trianiss",
  pictures: [
    {
      src: "/cantina/cantina-trianiss.webp",
      width: 752,
      height: 1344,
      focus: "50% 88%",
      alt: {
        es: "Trianiss de pie frente a la barra de una cantina de madera, con gorra, gafas oscuras y ropa negra, bajo bombillas cálidas y estantes de botellas",
        en: "Trianiss standing in front of a wooden cantina bar in a cap, dark glasses and black clothes, under warm bulbs and shelves of bottles",
      },
    },
    {
      src: "/cantina/cantina-fmr-gang.webp",
      width: 900,
      height: 1592,
      focus: "50% 42%",
      alt: {
        es: "Ilustración de la FMR Gang en la cantina con sombreros vueltiaos y ruanas, brindando con cervezas bajo una bandera de Colombia",
        en: "Illustration of the FMR Gang in the cantina in sombreros vueltiaos and ruanas, raising beers under a Colombian flag",
      },
    },
  ] satisfies CantinaPicture[],
};

const TZ = "America/Bogota";
const dayKey = (ms: number) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(ms);

/** Where the cantina stands relative to `now`, by calendar day in Medellín. */
export function cantinaPhase(now: number): "upcoming" | "tomorrow" | "today" | "done" {
  const today = dayKey(now);
  if (today > cantina.date) return "done";
  if (today === cantina.date) return "today";
  return dayKey(now + 24 * 3600_000) === cantina.date ? "tomorrow" : "upcoming";
}

/** The date as an ISO instant at noon Medellín time, for day/month formatting. */
export const cantinaIso = `${cantina.date}T${cantina.time || "12:00"}:00-05:00`;

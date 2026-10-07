/**
 * Recording studio: services, prices (COP) and booking slots.
 * Prices come from the team (2026-10-06).
 *
 * `unit` sets the price line: per song, per session, or per 4-hour block.
 * `blocks: true` lets the booking form pick several 4-hour blocks.
 */
export type StudioService = {
  id: string;
  name: { es: string; en: string };
  body: { es: string; en: string };
  price: number;
  unit: "piece" | "session" | "block";
  includes?: { es: string[]; en: string[] };
  featured?: boolean;
  blocks?: boolean;
};

export const services: StudioService[] = [
  {
    id: "instrumental",
    name: { es: "Instrumental original", en: "Original instrumental" },
    body: {
      es: "Un beat hecho a la medida de tu canción, producido desde cero.",
      en: "A beat made to measure for your song, produced from scratch.",
    },
    price: 500_000,
    unit: "piece",
  },
  {
    id: "grabacion",
    name: { es: "Sesión de grabación", en: "Recording session" },
    body: {
      es: "Graba tus voces en el estudio, con la cabina lista para ti.",
      en: "Record your vocals in the studio, with the booth ready for you.",
    },
    price: 200_000,
    unit: "session",
  },
  {
    id: "mezcla",
    name: { es: "Producción, mezcla y máster", en: "Production, mix and master" },
    body: {
      es: "Llevamos tu tema a sonido de lanzamiento.",
      en: "We take your track to release-ready sound.",
    },
    price: 200_000,
    unit: "piece",
  },
  {
    id: "completa",
    name: { es: "Producción completa", en: "Full production" },
    body: {
      es: "Tu canción de principio a fin, en un solo paquete.",
      en: "Your song from start to finish, in one package.",
    },
    price: 600_000,
    unit: "piece",
    featured: true,
    includes: {
      es: ["Instrumental original", "Sesión de grabación"],
      en: ["Original instrumental", "Recording session"],
    },
  },
  {
    id: "arriendo",
    name: { es: "Arriendo del estudio", en: "Studio rental" },
    body: {
      es: "El estudio para ti durante 4 horas, a tu ritmo.",
      en: "The studio to yourself for 4 hours, at your own pace.",
    },
    price: 100_000,
    unit: "block",
    blocks: true,
  },
];

/** SAMPLE hours: replace with the studio's real schedule (the form tags them "Horarios de ejemplo"). */
export const slotsSample = true;
export const slots = [
  { id: "am", label: { es: "Mañana", en: "Morning" }, hours: "9:00 – 13:00" },
  { id: "pm", label: { es: "Tarde", en: "Afternoon" }, hours: "14:00 – 18:00" },
  { id: "night", label: { es: "Noche", en: "Night" }, hours: "19:00 – 23:00" },
];

export const formatCOP = (n: number) =>
  `$${new Intl.NumberFormat("es-CO").format(n)}`;

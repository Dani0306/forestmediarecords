/**
 * Recording studio: services, prices (COP) and booking slots.
 * Prices come from the team (2026-10-06; recording session and service texts
 * updated 2026-10-10).
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
      es: "Captura tus voces con calidad de audio profesional y dirección en cabina. Solo maqueta.",
      en: "Capture your vocals with professional audio quality and direction in the booth. Demo only.",
    },
    price: 150_000,
    unit: "session",
  },
  {
    id: "mezcla",
    name: { es: "Producción, mezcla y máster", en: "Production, mix and master" },
    body: {
      es: "Procesamiento vocal, mezcla detallada y máster final listo para distribución. Dale a tu canción el brillo, la potencia y el balance necesarios para competir en el mercado.",
      en: "Vocal processing, a detailed mix and a final master ready for distribution. Give your song the shine, power and balance it needs to compete.",
    },
    price: 200_000,
    unit: "piece",
  },
  {
    id: "completa",
    name: { es: "Producción completa", en: "Full production" },
    body: {
      es: "Creamos tu canción desde cero: beat exclusivo, grabación, mezcla y máster final.",
      en: "We build your song from scratch: an exclusive beat, recording, mix and final master.",
    },
    price: 600_000,
    unit: "piece",
    // the body already lists what's included, so no "Incluye" line here
    featured: true,
  },
  {
    id: "arriendo",
    name: { es: "Arriendo del estudio", en: "Studio rental" },
    body: {
      es: "4 horas de uso libre de las instalaciones para tus procesos creativos, maquetas o sesiones.",
      en: "4 hours of free use of the facilities for your creative work, demos or sessions.",
    },
    price: 100_000,
    unit: "block",
    blocks: true,
  },
];

/** Time slots a visitor can request; the team confirms each booking. Set `slotsSample` to tag them as provisional. */
export const slotsSample = false;
export const slots = [
  { id: "am", label: { es: "Mañana", en: "Morning" }, hours: "9:00 – 13:00" },
  { id: "pm", label: { es: "Tarde", en: "Afternoon" }, hours: "14:00 – 18:00" },
  { id: "night", label: { es: "Noche", en: "Night" }, hours: "19:00 – 23:00" },
];

export const formatCOP = (n: number) =>
  `$${new Intl.NumberFormat("es-CO").format(n)}`;

/**
 * Kick showcase content. Everything here is taken from the official
 * posters in public/kick/ (no dates are printed on them, so none are set).
 * Add the next edition by appending to `editions`; the newest goes first.
 */
export type KickPoster = {
  src: string;
  width: number;
  height: number;
  label: { es: string; en: string };
  alt: { es: string; en: string };
};

export type KickEdition = {
  id: string;
  name: string; // series name
  edition: string; // e.g. "#2"
  format: { es: string; en: string };
  winner?: string;
  motto?: { es: string; en: string };
  lineup: string[];
  posters: KickPoster[]; // first = lead poster
};

export const editions: KickEdition[] = [
  {
    id: "futuras-promesas-2",
    name: "Futuras Promesas",
    edition: "#2",
    format: { es: "Sesión de streaming en Kick", en: "Streaming session on Kick" },
    winner: "Jhanky",
    motto: { es: "El talento también se premia", en: "Talent gets rewarded too" },
    lineup: ["Jhanky", "Kamerongray", "Superwil", "Vcelest", "Falo KLK"],
    posters: [
      {
        src: "/kick/kick1.avif",
        width: 1313,
        height: 1751,
        label: { es: "Ganador", en: "Winner" },
        alt: {
          es: "Afiche de Futuras Promesas #2: Jhanky, ganador, sobre una bicicleta con camiseta amarilla. Forest Media Records presenta, en Kick: kick.com/leolugolive.",
          en: "Futuras Promesas #2 poster: Jhanky, the winner, on a bike in a yellow jersey. Presented by Forest Media Records on Kick: kick.com/leolugolive.",
        },
      },
      {
        src: "/kick/kick2.avif",
        width: 675,
        height: 794,
        label: { es: "Line-up", en: "Line-up" },
        alt: {
          es: "Afiche de la sesión de streaming de Futuras Promesas #2 con Jhanky, Kamerongray, Superwil, Vcelest y Falo KLK.",
          en: "Futuras Promesas #2 streaming session poster with Jhanky, Kamerongray, Superwil, Vcelest and Falo KLK.",
        },
      },
    ],
  },
];

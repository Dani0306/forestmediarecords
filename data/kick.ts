/**
 * Kick showcase content. Everything here is taken from the official
 * posters (public/kick/, public/trending/); only facts printed on them.
 * Add the next edition at the TOP of `editions`: the first one leads the Kick section.
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
  /** Date and time as printed on the poster. */
  when?: { es: string; en: string };
  winner?: string;
  /** Where the winner is from, when the poster says. */
  winnerFrom?: string;
  motto?: { es: string; en: string };
  /** Competitors' names; empty when the poster doesn't print them. */
  lineup: string[];
  /** Cities represented, when the poster shows them instead of names. */
  cities?: string[];
  posters: KickPoster[]; // first = lead poster
};

export const editions: KickEdition[] = [
  {
    id: "futuras-promesas-3",
    name: "Futuras Promesas",
    edition: "#3",
    format: { es: "Sesión de streaming en Kick", en: "Streaming session on Kick" },
    when: { es: "7 de octubre · 9:00 PM", en: "October 7 · 9:00 PM" },
    winner: "2BLE B",
    winnerFrom: "Barranquilla",
    motto: { es: "El talento también es del Caribe", en: "Talent is from the Caribbean too" },
    lineup: [], // TODO: competitors' names (not printed on the poster)
    cities: ["Medellín", "Bogotá", "Barranquilla"],
    posters: [
      {
        src: "/trending/ganadorft3.avif",
        width: 1254,
        height: 1254,
        label: { es: "Ganador", en: "Winner" },
        alt: {
          es: "Afiche del ganador de Futuras Promesas #3: 2BLE B, de Barranquilla, con gafas oscuras frente al malecón de noche. Forest Media Récords presenta.",
          en: "Futuras Promesas #3 winner poster: 2BLE B from Barranquilla, in dark glasses in front of the riverfront at night. Presented by Forest Media Récords.",
        },
      },
      {
        src: "/trending/ft3.avif",
        width: 1254,
        height: 1254,
        label: { es: "Line-up", en: "Line-up" },
        alt: {
          es: "Afiche de Futuras Promesas #3 con los artistas de Medellín, Bogotá y Barranquilla; 7 de octubre, 9:00 PM en kick.com/leolugolive.",
          en: "Futuras Promesas #3 poster with the artists from Medellín, Bogotá and Barranquilla; October 7, 9:00 PM on kick.com/leolugolive.",
        },
      },
    ],
  },
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

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
  /** The winner's own profile (Instagram), linked from their name. */
  winnerUrl?: string;
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
  // the Mundial de Tiraderas has no printed poster yet: its two stream screenshots stand in (face off and draw)
  {
    id: "mundial-tiraderas",
    name: "Mundial de Tiraderas",
    edition: "Face off",
    format: { es: "Competencia de tiraderas en Kick", en: "Tiraderas competition on Kick" },
    when: { es: "23 de octubre · 7:30 PM", en: "October 23 · 7:30 PM" },
    lineup: ["Cang5", "Pablomeji4", "Edisson", "Carlogato", "Cuartiz", "ElFerpo2", "Emvy_29", "soyjosema"],
    posters: [
      {
        src: "/tiraderas/face-off.avif",
        width: 1280,
        height: 720,
        label: { es: "Face off", en: "Face off" },
        alt: {
          es: "Cinco streamers en videollamada durante el face off del Mundial de Tiraderas, en Kick.",
          en: "Five streamers on a video call during the Mundial de Tiraderas face off, on Kick.",
        },
      },
      {
        src: "/tiraderas/sorteo.avif",
        width: 1280,
        height: 720,
        label: { es: "Sorteo", en: "The draw" },
        alt: {
          es: "Tres streamers en videollamada durante el sorteo del Mundial de Tiraderas, en Kick.",
          en: "Three streamers on a video call during the Mundial de Tiraderas draw, on Kick.",
        },
      },
    ],
  },
  {
    id: "futuras-promesas-3",
    name: "Futuras Promesas",
    edition: "#3",
    format: { es: "Sesión de streaming en Kick", en: "Streaming session on Kick" },
    when: { es: "7 de octubre · 9:00 PM", en: "October 7 · 9:00 PM" },
    winner: "2BLE B",
    winnerUrl: "https://www.instagram.com/el2ble_b/",
    winnerFrom: "Barranquilla",
    motto: { es: "El talento también es del Caribe", en: "Talent is from the Caribbean too" },
    lineup: [], // TODO: competitors' names (not printed on the poster)
    cities: ["Medellín", "Bogotá", "Barranquilla"],
    posters: [
      {
        src: "/futuras-promesas/ft3-ganador.avif",
        width: 1254,
        height: 1254,
        label: { es: "Ganador", en: "Winner" },
        alt: {
          es: "Afiche del ganador de Futuras Promesas #3: 2BLE B, de Barranquilla, con gafas oscuras frente al malecón de noche. Forest Media Récords presenta.",
          en: "Futuras Promesas #3 winner poster: 2BLE B from Barranquilla, in dark glasses in front of the riverfront at night. Presented by Forest Media Récords.",
        },
      },
      {
        src: "/futuras-promesas/ft3-poster.avif",
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
    winnerUrl: "https://www.instagram.com/jhanky.10/",
    motto: { es: "El talento también se premia", en: "Talent gets rewarded too" },
    lineup: ["Jhanky", "Kamerongray", "Superwil", "Vcelest", "Falo KLK"],
    posters: [
      {
        src: "/futuras-promesas/ft2-ganador.avif",
        width: 1313,
        height: 1751,
        label: { es: "Ganador", en: "Winner" },
        alt: {
          es: "Afiche de Futuras Promesas #2: Jhanky, ganador, sobre una bicicleta con camiseta amarilla. Forest Media Records presenta, en Kick: kick.com/leolugolive.",
          en: "Futuras Promesas #2 poster: Jhanky, the winner, on a bike in a yellow jersey. Presented by Forest Media Records on Kick: kick.com/leolugolive.",
        },
      },
      {
        src: "/futuras-promesas/ft2-poster.avif",
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

import { site } from "./site";

/**
 * Futuras Promesas 4: the label's next Kick showcase, announced in its own
 * section ("#futuras-promesas") and as the main event (`data/events.ts`).
 *
 * Everything here is printed on the team's three posters (2026-11-04):
 * "Futuras Promesas 4", 7 de noviembre, 9 PM, kick.com/leolugolive; the two
 * competitors (Colmaill, Leykan) and Lowkey as "Jurado invitado", a guest
 * invited for this edition. Posters are cropped from the originals in
 * `source/futuras-promesas-4/` (the competitors' were phone screenshots).
 * More competitors join the line-up by adding them to `competitors`.
 */
export type Poster = {
  src: string;
  width: number;
  height: number;
  alt: { es: string; en: string };
};

export type Promesa = {
  name: string;
  poster: Poster;
};

export const futurasPromesas = {
  /** The event in `data/events.ts`: date, time, place and the countdown come from there. */
  eventId: "futuras-promesas-4",
  name: "Futuras Promesas",
  edition: "4",
  channel: site.kick.url,
  competitors: [
    {
      name: "Colmaill",
      poster: {
        src: "/futuras-promesas/ft4-colmaill.webp",
        width: 738,
        height: 1107,
        alt: {
          es: "Afiche de Futuras Promesas 4 con Colmaill, con gafas oscuras y camiseta mostaza, en una foto clavada a un tablero de pistas; 7 de noviembre, 9 PM, kick.com/leolugolive.",
          en: "Futuras Promesas 4 poster with Colmaill, in dark glasses and a mustard tee, in a photo pinned to an evidence board; November 7, 9 PM, kick.com/leolugolive.",
        },
      },
    },
    {
      name: "Leykan",
      poster: {
        src: "/futuras-promesas/ft4-leykan.webp",
        width: 738,
        height: 1107,
        alt: {
          es: "Afiche de Futuras Promesas 4 con Leykan, con gorra y gafas, en una foto clavada a un tablero de pistas; 7 de noviembre, 9 PM, kick.com/leolugolive.",
          en: "Futuras Promesas 4 poster with Leykan, in a cap and glasses, in a photo pinned to an evidence board; November 7, 9 PM, kick.com/leolugolive.",
        },
      },
    },
  ] as Promesa[],
  /** The guest judge: Lowkey, from the roster (`data/artists.ts`, slug "lowkey"), invited for this edition. */
  guest: {
    name: "Lowkey",
    artist: "lowkey",
    poster: {
      src: "/futuras-promesas/ft4-lowkey-jurado.webp",
      width: 1024,
      height: 1536,
      alt: {
        es: "Afiche de Futuras Promesas 4: Lowkey, jurado invitado, con gorra y chaqueta clara en el estudio; 7 de noviembre, 9 PM, kick.com/leolugolive.",
        en: "Futuras Promesas 4 poster: Lowkey, guest judge, in a cap and light jacket in the studio; November 7, 9 PM, kick.com/leolugolive.",
      },
    } as Poster,
  },
};

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
 * Five singers compete (team, 2026-11-04). Tyan4 was announced the same day
 * (her poster prints "TYAN4"), 2BLE B on 2026-11-05 and Septu RG on 2026-11-06
 * (the line-up is complete). If a slot is ever empty, the board shows a "por
 * revelar" print in it: add a competitor to `competitors` and it takes the next slot.
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
  /** Recording of the night on YouTube (team, 2026-11-12). */
  watchUrl: "https://youtu.be/p_ai7crPUf0",
  /** How many singers compete; slots past `competitors` show as "por revelar". */
  slots: 5,
  /** The winner (team, 2026-11-08): a competitor's `name`. Leads the page while `winnerHeroUntil` lasts, then stays on the section. */
  winner: "Leykan",
  /** The winner takes over the first screen until this moment (two weeks after the event; the artist video hero returns). */
  winnerHeroUntil: "2026-11-22T00:00:00-05:00",
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
    {
      name: "Tyan4",
      poster: {
        src: "/futuras-promesas/ft4-tyan4.webp",
        width: 1024,
        height: 1536,
        alt: {
          es: "Afiche de Futuras Promesas 4 con Tyan4, con gorro de piel blanco y la mano junto a la cara, en una foto clavada a un tablero de pistas; 7 de noviembre, 9 PM, kick.com/leolugolive.",
          en: "Futuras Promesas 4 poster with Tyan4, in a white fur hat with her hand by her face, in a photo pinned to an evidence board; November 7, 9 PM, kick.com/leolugolive.",
        },
      },
    },
    {
      name: "2BLE B",
      poster: {
        src: "/futuras-promesas/ft4-dobleb.webp",
        width: 1024,
        height: 1536,
        alt: {
          es: "Afiche de Futuras Promesas 4 con 2BLE B, de perfil con gafas oscuras y el cuello de la chaqueta entre las manos, en una foto clavada a un tablero de pistas; 7 de noviembre, 9 PM, kick.com/leolugolive.",
          en: "Futuras Promesas 4 poster with 2BLE B, in profile in dark glasses with his hands on his jacket collar, in a photo pinned to an evidence board; November 7, 9 PM, kick.com/leolugolive.",
        },
      },
    },
    {
      name: "Septu RG",
      poster: {
        src: "/futuras-promesas/ft4-septu-rg.webp",
        width: 1024,
        height: 1536,
        alt: {
          es: "Afiche de Futuras Promesas 4 con Septu RG, de perfil con camiseta blanca y pantalón oscuro holgado, cantando con el micrófono en la mano, en una foto clavada a un tablero de pistas; 7 de noviembre, 9 PM, kick.com/leolugolive.",
          en: "Futuras Promesas 4 poster with Septu RG, in profile in a white tee and baggy dark pants, singing with a microphone in hand, in a photo pinned to an evidence board; November 7, 9 PM, kick.com/leolugolive.",
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

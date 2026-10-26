import { releases } from "./releases";

/**
 * "En tendencia": the latest productions and projects, hottest first.
 * Order is rank: the first item takes the big slot.
 *
 * Media is a short loop (4–8 s, muted WebM ~1280×720, plus a poster frame
 * that is also the blurred glass under the details) or a still image.
 * Put new files in `public/trending/`. Videos play on hover (desktop) or
 * while centred on screen (touch), never under reduced motion.
 *
 * `sample: true` marks MOCK-UP items (titles written from what the media
 * shows); the UI tags them "Ejemplo". Replace with the real projects.
 */
export type TrendKind =
  | "video"
  | "music"
  | "studio"
  | "photo"
  | "kick"
  | "live"
  | "event";

export type TrendMedia =
  | {
      kind: "video";
      /** WebM loop (Chrome, Android, desktop). */
      src: string;
      /** H.264 MP4 copy: iPhones (Safari) play this one. */
      mp4?: string;
      poster: string;
      width: number;
      height: number;
    }
  | {
      kind: "image";
      src: string;
      width: number;
      height: number;
      lift?: number;
    };

export type Trend = {
  id: string;
  kind: TrendKind;
  title: { es: string; en: string };
  /** One line under the title: who, or what it is. */
  meta: { es: string; en: string };
  media: TrendMedia;
  alt: { es: string; en: string };
  /** CSS object-position for the crop, e.g. "50% 20%". */
  focus?: string;
  href?: string;
  sample?: boolean;
};

// the full Futuras Promesas sessions, uploaded to YouTube after each stream
const FP3 = "https://www.youtube.com/watch?v=N9ULbUEwrAA";
const FP2 = "https://www.youtube.com/watch?v=xcGN1dQ535c";
// the winner cards go to the winner's own Instagram (same links as `winnerUrl` in data/kick.ts)
const FP3_WINNER = "https://www.instagram.com/el2ble_b/";
const FP2_WINNER = "https://www.instagram.com/jhanky.10/";

export const trending: Trend[] = [
  // Lentino's new singles (2026-10-10) lead; the covers also live in "Lo nuevo" (data/releases.ts)
  {
    id: "coronao",
    kind: "music",
    title: { es: "Coronao", en: "Coronao" },
    meta: {
      es: "Lentino · Nuevo sencillo",
      en: "Lentino · New single",
    },
    media: { kind: "image", src: "/releases/coronao-cover.webp", width: 736, height: 736 },
    alt: releases[0].cover.alt,
    focus: "50% 50%",
    href: releases[0].spotify,
  },
  // the "FMR" teaser (new song) leads
  {
    id: "fmr-avance",
    kind: "video",
    title: {
      es: "Avance de «FMR»",
      en: "“FMR” teaser",
    },
    meta: {
      es: "Nueva canción · Forest Media Récords",
      en: "New song · Forest Media Récords",
    },
    media: {
      kind: "video",
      src: "/trending/fmr.webm",
      mp4: "/trending/fmr.mp4",
      poster: "/trending/fmr.webp",
      width: 1280,
      height: 720,
    },
    alt: {
      es: "Un artista con gorra negra y camiseta sin mangas se mueve frente a la cámara en un parqueadero de noche, en el avance de «FMR»",
      en: "An artist in a black cap and sleeveless shirt moves in front of the camera in a parking garage at night, in the “FMR” teaser",
    },
    focus: "50% 35%",
  },
  // behind the scenes of the "FMR" shoot (2026-10-23): a portrait phone clip, so the card crops it
  {
    id: "fmr-bts",
    kind: "video",
    title: {
      es: "Detrás de cámaras de «FMR»",
      en: "Behind the scenes of “FMR”",
    },
    meta: {
      es: "RS el Italiano y Lentino · Forest Media Récords",
      en: "RS el Italiano and Lentino · Forest Media Récords",
    },
    media: {
      kind: "video",
      src: "/trending/bts-fmr.webm",
      mp4: "/trending/bts-fmr.mp4",
      poster: "/trending/bts-fmr.webp",
      width: 464,
      height: 832,
    },
    alt: {
      es: "Dos artistas en un parqueadero mojado de noche durante la grabación de «FMR»: uno rapea con la mano en la cabeza y el otro mira con gorra negra",
      en: "Two artists in a wet parking garage at night during the “FMR” shoot: one raps with a hand on his head, the other watches in a black cap",
    },
    focus: "50% 24%",
  },
  // the second single sits right behind the video cards
  {
    id: "la-vuelta",
    kind: "music",
    title: { es: "La Vuelta", en: "La Vuelta" },
    meta: {
      es: "Lentino · Nuevo sencillo",
      en: "Lentino · New single",
    },
    media: { kind: "image", src: "/releases/lavuelta-cover.webp", width: 736, height: 736 },
    alt: releases[1].cover.alt,
    focus: "50% 40%",
    href: releases[1].spotify,
  },
  // Futuras Promesas #3 (2026-10-07), the latest edition, follows the new-song teaser
  {
    id: "futuras-promesas-3-ganador",
    kind: "kick",
    title: {
      es: "2BLE B gana Futuras Promesas #3",
      en: "2BLE B wins Futuras Promesas #3",
    },
    meta: {
      es: "Barranquilla · El talento también es del Caribe",
      en: "Barranquilla · Talent is from the Caribbean too",
    },
    media: {
      kind: "image",
      src: "/futuras-promesas/ft3-ganador.avif",
      width: 1254,
      height: 1254,
    },
    alt: {
      es: "Afiche del ganador de Futuras Promesas #3: 2BLE B, de Barranquilla, frente al malecón de noche",
      en: "Futuras Promesas #3 winner poster: 2BLE B from Barranquilla, in front of the riverfront at night",
    },
    focus: "50% 30%",
    href: FP3_WINNER,
  },
  // the Mundial de Tiraderas face off (2026-10-23, Kick; full video on YouTube)
  {
    id: "face-off-mundial-tiraderas",
    kind: "live",
    title: {
      es: "El face off del Mundial de Tiraderas",
      en: "The Mundial de Tiraderas face off",
    },
    meta: {
      es: "23 de octubre · kick.com/leolugolive",
      en: "October 23 · kick.com/leolugolive",
    },
    media: {
      kind: "image",
      src: "/tiraderas/face-off.avif",
      width: 1280,
      height: 720,
    },
    alt: {
      es: "Cinco streamers en videollamada durante el face off del Mundial de Tiraderas",
      en: "Five streamers on a video call during the Mundial de Tiraderas face off",
    },
    focus: "50% 40%",
    href: "https://youtu.be/HAtpw_8Kbb8",
  },
  // the Mundial de Tiraderas draw (2026-10-16, on Leo's Kick channel; full video on YouTube)
  {
    id: "sorteo-mundial-tiraderas",
    kind: "live",
    title: {
      es: "El sorteo del Mundial de Tiraderas",
      en: "The Mundial de Tiraderas draw",
    },
    meta: {
      es: "16 de octubre · kick.com/leolugolive",
      en: "October 16 · kick.com/leolugolive",
    },
    media: {
      kind: "image",
      src: "/tiraderas/sorteo.avif",
      width: 1280,
      height: 720,
    },
    alt: {
      es: "Tres streamers en videollamada durante el sorteo del Mundial de Tiraderas",
      en: "Three streamers on a video call during the Mundial de Tiraderas draw",
    },
    focus: "50% 35%",
    href: "https://youtu.be/bVALI_U5n5g",
  },
  {
    id: "fmr-rs-videoclip",
    kind: "photo",
    title: {
      es: "RS el Italiano graba el videoclip de «FMR»",
      en: "RS el Italiano shoots the “FMR” video",
    },
    meta: {
      es: "Nueva canción · Forest Media Récords",
      en: "New song · Forest Media Récords",
    },
    media: { kind: "image", src: "/artists/rs-el-italiano/rs-fmr-1.avif", width: 1440, height: 1920, lift: 1.25 },
    alt: {
      es: "RS el Italiano recostado contra un carro oscuro en un parqueadero de noche, en el avance de «FMR»",
      en: "RS el Italiano leaning on a dark car in a parking garage at night, on the shoot of the “FMR” video",
    },
    focus: "50% 24%",
  },
  {
    id: "fmr-lentino-videoclip",
    kind: "photo",
    title: {
      es: "Lentino en el rodaje de «FMR»",
      en: "Lentino on the “FMR” shoot",
    },
    meta: {
      es: "Nueva canción · Forest Media Récords",
      en: "New song · Forest Media Récords",
    },
    media: { kind: "image", src: "/artists/lentino/lentino-fmr-1.avif", width: 1440, height: 1920, lift: 1.25 },
    alt: {
      es: "Lentino con gorra roja y chaqueta negra frente a un carro, durante el rodaje del videoclip de «FMR»",
      en: "Lentino in a red cap and black jacket in front of a car, on the shoot of the “FMR” video",
    },
    focus: "50% 22%",
  },
  {
    id: "lentino-nueva-cancion",
    kind: "studio",
    title: {
      es: "Lentino graba su nueva canción",
      en: "Lentino records his new song",
    },
    meta: {
      es: "Nueva canción muy pronto · Forest Media Récords",
      en: "Coming soon · Forest Media Récords",
    },
    media: {
      kind: "video",
      src: "/trending/lentino-nueva-cancion.webm",
      mp4: "/trending/lentino-nueva-cancion.mp4",
      poster: "/trending/lentino-nueva-cancion.webp",
      width: 1024,
      height: 576,
    },
    alt: {
      es: "Lentino en el estudio durante la grabación de su nueva canción, con luz azul y una pared de piedra al fondo",
      en: "Lentino in the studio recording his new song, under blue light with a stone wall behind him",
    },
    focus: "40% 30%",
  },
  {
    id: "lentino-estudio-grabando",
    kind: "studio",
    title: {
      es: "Lentino en el estudio",
      en: "Lentino in the studio",
    },
    meta: {
      es: "Grabando nueva música en Forest Media Récords",
      en: "Recording new music at Forest Media Récords",
    },
    media: {
      kind: "video",
      src: "/trending/lentino.webm",
      poster: "/artists/lentino/lentino-1.avif",
      width: 1280,
      height: 960,
    },
    alt: {
      es: "Lentino cantando en la cabina del estudio bajo luces de colores, con la ciudad de noche en la ventana",
      en: "Lentino singing in the studio booth under coloured lights, with the city at night in the window",
    },
    focus: "45% 35%",
  },
  {
    id: "rs-estudio-grabando",
    kind: "studio",
    title: {
      es: "RS el Italiano en el estudio",
      en: "RS el Italiano in the studio",
    },
    meta: {
      es: "Grabando nueva música en Forest Media Récords",
      en: "Recording new music at Forest Media Récords",
    },
    media: {
      kind: "video",
      src: "/trending/renzo-estudio-01.webm",
      mp4: "/trending/renzo-estudio-01.mp4",
      poster: "/trending/renzo-estudio-01.webp",
      width: 1280,
      height: 960,
    },
    alt: {
      es: "RS el Italiano rapeando en la cabina del estudio bajo luces de colores, con la ciudad de noche en la ventana",
      en: "RS el Italiano rapping in the studio booth under coloured lights, with the city at night in the window",
    },
    focus: "45% 35%",
  },
  {
    id: "nikosan-productor",
    kind: "studio",
    title: {
      es: "Nikosan llega a Forest Media Récords",
      en: "Nikosan joins Forest Media Récords",
    },
    meta: {
      es: "Beatmaker y productor · San Javier, Medellín",
      en: "Beatmaker and producer · San Javier, Medellín",
    },
    media: {
      kind: "image",
      src: "/artists/nikosan/nikosan-1.avif",
      width: 3024,
      height: 4032,
    },
    alt: {
      es: "Nikosan produciendo un beat en su portátil bajo luz azul en el estudio",
      en: "Nikosan producing a beat on his laptop under blue studio light",
    },
    focus: "60% 35%",
    href: "#artistas",
  },
  {
    id: "futuras-promesas-3",
    kind: "kick",
    title: { es: "Futuras Promesas #3", en: "Futuras Promesas #3" },
    meta: {
      es: "7 de octubre · kick.com/leolugolive",
      en: "October 7 · kick.com/leolugolive",
    },
    media: {
      kind: "image",
      src: "/futuras-promesas/ft3-poster.avif",
      width: 1254,
      height: 1254,
    },
    alt: {
      es: "Afiche de Futuras Promesas #3 con los artistas participantes de Medellín, Bogotá y Barranquilla",
      en: "Futuras Promesas #3 poster with the competing artists from Medellín, Bogotá and Barranquilla",
    },
    focus: "50% 28%",
    href: FP3,
  },
  {
    id: "rs-estudio-sesion",
    kind: "studio",
    title: { es: "Grabando nuevo tema ...", en: "Recording new song ..." },
    meta: {
      es: "RS el Italiano · detrás de cámaras",
      en: "RS el Italiano · behind the scenes",
    },
    media: {
      kind: "video",
      src: "/trending/renzo-estudio-02.webm",
      mp4: "/trending/renzo-estudio-02.mp4",
      poster: "/trending/renzo-estudio-02.webp",
      width: 720,
      height: 960,
    },
    alt: {
      es: "RS el Italiano en una sesión en el estudio, grabado con el celular bajo luces de colores",
      en: "RS el Italiano during a studio session, filmed on a phone under coloured lights",
    },
    focus: "50% 40%",
  },
  // the upcoming website launch (in the agenda too); the card plays the promo ad (made with Higgsfield)
  {
    id: "lanzamiento-web",
    kind: "event",
    title: {
      es: "Presentación de la página web oficial",
      en: "Official website launch",
    },
    meta: {
      es: "Forest Media Récords",
      en: "Forest Media Récords",
    },
    media: {
      kind: "video",
      src: "/trending/anuncio-web.webm",
      mp4: "/trending/anuncio-web.mp4",
      poster: "/trending/anuncio-web.webp",
      width: 1280,
      height: 720,
    },
    alt: {
      es: "Anuncio de la página: un micrófono en el estudio, la web de Forest Media Récords y el logo con forestmediarecords.com",
      en: "Site promo: a studio microphone, the Forest Media Récords website and the logo with forestmediarecords.com",
    },
    focus: "50% 45%",
  },
  // Futuras Promesas #2
  {
    id: "futuras-promesas-2-ganador",
    kind: "kick",
    title: {
      es: "Jhanky gana Futuras Promesas #2",
      en: "Jhanky wins Futuras Promesas #2",
    },
    meta: {
      es: "El talento también se premia",
      en: "Talent gets rewarded too",
    },
    media: {
      kind: "image",
      src: "/futuras-promesas/ft2-ganador.avif",
      width: 1313,
      height: 1751,
    },
    alt: {
      es: "Afiche del ganador de Futuras Promesas #2: Jhanky en bicicleta",
      en: "Futuras Promesas #2 winner poster: Jhanky on a bicycle",
    },
    focus: "50% 40%",
    href: FP2_WINNER,
  },
  {
    id: "futuras-promesas-2",
    kind: "kick",
    title: { es: "Futuras Promesas #2", en: "Futuras Promesas #2" },
    meta: {
      es: "Jhanky × Kamerongray × Superwil × Vcelest × Falo KLK",
      en: "Jhanky × Kamerongray × Superwil × Vcelest × Falo KLK",
    },
    media: {
      kind: "image",
      src: "/futuras-promesas/ft2-poster.avif",
      width: 675,
      height: 794,
    },
    alt: {
      es: "Afiche de Futuras Promesas #2 con el line-up de la sesión de streaming",
      en: "Futuras Promesas #2 poster with the streaming session line-up",
    },
    focus: "50% 45%",
    href: FP2,
  },
  // the one video loop, so the section keeps a playable piece
];

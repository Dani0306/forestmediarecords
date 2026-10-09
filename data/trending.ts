import { site } from "./site";

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
export type TrendKind = "video" | "studio" | "photo" | "kick" | "live" | "event";

export type TrendMedia =
  | {
      kind: "video";
      src: string;
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

export const trending: Trend[] = [
  // Futuras Promesas #3 (2026-10-07) leads: the latest edition
  {
    id: "futuras-promesas-3-ganador",
    kind: "kick",
    title: { es: "2BLE B gana Futuras Promesas #3", en: "2BLE B wins Futuras Promesas #3" },
    meta: {
      es: "Barranquilla · El talento también es del Caribe",
      en: "Barranquilla · Talent is from the Caribbean too",
    },
    media: { kind: "image", src: "/trending/ganadorft3.avif", width: 1254, height: 1254 },
    alt: {
      es: "Afiche del ganador de Futuras Promesas #3: 2BLE B, de Barranquilla, frente al malecón de noche",
      en: "Futuras Promesas #3 winner poster: 2BLE B from Barranquilla, in front of the riverfront at night",
    },
    focus: "50% 30%",
    href: site.kick.url,
  },
  {
    id: "rs-estudio-grabando",
    kind: "studio",
    title: { es: "RS el Italiano en el estudio", en: "RS el Italiano in the studio" },
    meta: { es: "Grabando nueva música en Forest Media Récords", en: "Recording new music at Forest Media Récords" },
    media: {
      kind: "video",
      src: "/trending/renzo-estudio-01.webm",
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
    title: { es: "Nikosan llega a Forest Media Récords", en: "Nikosan joins Forest Media Récords" },
    meta: { es: "Beatmaker y productor · San Javier, Medellín", en: "Beatmaker and producer · San Javier, Medellín" },
    media: { kind: "image", src: "/nicocol/nico1.avif", width: 3024, height: 4032 },
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
    media: { kind: "image", src: "/trending/ft3.avif", width: 1254, height: 1254 },
    alt: {
      es: "Afiche de Futuras Promesas #3 con los artistas participantes de Medellín, Bogotá y Barranquilla",
      en: "Futuras Promesas #3 poster with the competing artists from Medellín, Bogotá and Barranquilla",
    },
    focus: "50% 28%",
    href: site.kick.url,
  },
  {
    id: "rs-estudio-sesion",
    kind: "studio",
    title: { es: "Sesión en el estudio", en: "Studio session" },
    meta: { es: "RS el Italiano · detrás de cámaras", en: "RS el Italiano · behind the scenes" },
    media: {
      kind: "video",
      src: "/trending/renzo-estudio-02.webm",
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
  // the upcoming website launch (in the agenda too); artwork is a placeholder
  {
    id: "lanzamiento-web",
    kind: "event",
    title: {
      es: "Presentación de la página web oficial",
      en: "Official website launch",
    },
    meta: { es: "Forest Media Récords · Muy pronto", en: "Forest Media Récords · Coming soon" },
    media: { kind: "image", src: "/events/lanzamiento-web.avif", width: 1254, height: 1254 },
    alt: {
      es: "Logo de Forest Media Récords: monograma FR con cabeza de venado sobre un vinilo",
      en: "Forest Media Récords logo: FR monogram with a stag head on a vinyl record",
    },
    focus: "50% 45%",
    href: "#agenda",
  },
  // Futuras Promesas #2
  {
    id: "futuras-promesas-2-ganador",
    kind: "kick",
    title: { es: "Jhanky gana Futuras Promesas #2", en: "Jhanky wins Futuras Promesas #2" },
    meta: { es: "El talento también se premia", en: "Talent gets rewarded too" },
    media: { kind: "image", src: "/trending/ganadorft2.avif", width: 1313, height: 1751 },
    alt: {
      es: "Afiche del ganador de Futuras Promesas #2: Jhanky en bicicleta",
      en: "Futuras Promesas #2 winner poster: Jhanky on a bicycle",
    },
    focus: "50% 40%",
    href: site.kick.url,
  },
  {
    id: "futuras-promesas-2",
    kind: "kick",
    title: { es: "Futuras Promesas #2", en: "Futuras Promesas #2" },
    meta: {
      es: "Jhanky × Kamerongray × Superwil × Vcelest × Falo KLK",
      en: "Jhanky × Kamerongray × Superwil × Vcelest × Falo KLK",
    },
    media: { kind: "image", src: "/trending/ft2.avif", width: 675, height: 794 },
    alt: {
      es: "Afiche de Futuras Promesas #2 con el line-up de la sesión de streaming",
      en: "Futuras Promesas #2 poster with the streaming session line-up",
    },
    focus: "50% 45%",
    href: site.kick.url,
  },
  // the one video loop, so the section keeps a playable piece
];

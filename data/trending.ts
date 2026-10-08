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
  {
    id: "videoclip-avance",
    kind: "video",
    title: { es: "Avance del nuevo videoclip", en: "New music video preview" },
    meta: {
      es: "Producción Forest Media Récords",
      en: "A Forest Media Récords production",
    },
    media: {
      kind: "video",
      src: "/trending/clip-01.webm",
      poster: "/trending/clip-01.webp",
      width: 1280,
      height: 720,
    },
    alt: {
      es: "Un artista rapea de noche frente a la cámara durante un rodaje",
      en: "An artist raps into the camera at night during a shoot",
    },
    focus: "45% 40%",
    sample: true,
  },
];

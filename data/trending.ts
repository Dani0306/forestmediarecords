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
export type TrendKind = "video" | "studio" | "photo" | "kick" | "live";

export type TrendMedia =
  | { kind: "video"; src: string; poster: string; width: number; height: number }
  | { kind: "image"; src: string; width: number; height: number; lift?: number };

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
  {
    id: "videoclip-rodaje",
    kind: "video",
    title: { es: "Rodaje nocturno", en: "Night shoot" },
    meta: { es: "Detrás de cámaras", en: "Behind the scenes" },
    media: {
      kind: "video",
      src: "/trending/clip-02.webm",
      poster: "/trending/clip-02.webp",
      width: 1280,
      height: 720,
    },
    alt: {
      es: "Tomas del rodaje de un videoclip junto a una reja iluminada de azul",
      en: "Shots from a music video shoot by a fence lit in blue",
    },
    sample: true,
  },
  {
    id: "rs-estudio",
    kind: "studio",
    title: { es: "RS el Italiano en el estudio", en: "RS el Italiano in the studio" },
    meta: { es: "RS el Italiano", en: "RS el Italiano" },
    media: { kind: "image", src: "/RS/RS2.avif", width: 1254, height: 1254 },
    alt: {
      es: "RS el Italiano junto a un micrófono de estudio, tocándose la gorra",
      en: "RS el Italiano next to a studio microphone, touching his cap",
    },
    focus: "50% 30%",
    sample: true,
  },
  {
    id: "futuras-promesas-2",
    kind: "kick",
    title: { es: "Futuras Promesas #2", en: "Futuras Promesas #2" },
    meta: { es: "Ganador: Jhanky", en: "Winner: Jhanky" },
    media: { kind: "image", src: "/kick/kick1.avif", width: 1313, height: 1751 },
    alt: {
      es: "Afiche de Futuras Promesas #2 con Jhanky, el ganador",
      en: "Futuras Promesas #2 poster featuring the winner, Jhanky",
    },
    focus: "50% 22%",
    href: site.kick.url,
  },
  {
    id: "lentino-fotos",
    kind: "photo",
    title: { es: "Lentino: nueva sesión de fotos", en: "Lentino: new photo shoot" },
    meta: { es: "Lentino", en: "Lentino" },
    media: { kind: "image", src: "/lentino/lentino3.avif", width: 1023, height: 1280 },
    alt: {
      es: "Lentino sentado frente a un mural, ajustándose la gorra",
      en: "Lentino seated in front of a mural, adjusting his cap",
    },
    focus: "50% 25%",
    sample: true,
  },
  {
    id: "rs-noche",
    kind: "photo",
    title: { es: "RS el Italiano de noche", en: "RS el Italiano after dark" },
    meta: { es: "RS el Italiano", en: "RS el Italiano" },
    media: { kind: "image", src: "/RS/RS3.avif", width: 940, height: 960 },
    alt: {
      es: "RS el Italiano de noche con la ciudad iluminada detrás",
      en: "RS el Italiano at night with the city lights behind him",
    },
    focus: "60% 25%",
    sample: true,
  },
];

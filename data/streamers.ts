import { site } from "./site";

/**
 * "Nuestros streamers": the people who put Forest Media Récords live on Kick.
 *
 * Names, handles and channel URLs are real. Everything flagged `sample`
 * is a MOCK-UP the UI tags as such:
 * - `photo.sample`: a stand-in picture borrowed from the artists' folders
 *   until the streamer's own photos arrive (Leo's are in `public/leolugo/`).
 * - `profile.sample`: role, content, schedule and bio are placeholders.
 *
 * The next stream is read from `data/events.ts`: any upcoming `stream` whose
 * `url` is this channel (streams with no `url` go out on the label channel).
 */
export type Streamer = {
  slug: string;
  /** Full name: shown in the details and the bio. */
  name: string;
  /** Kick nickname: the big display name. */
  handle: string;
  url: string;
  photo: {
    src: string;
    width: number;
    height: number;
    lift?: number;
    /** CSS object-position for the crop; portraits in the wide open panel want the face high, e.g. "50% 40%". */
    focus?: string;
    sample?: boolean;
    alt: { es: string; en: string };
  };
  /** Something real that runs on this channel, shown as a small poster. */
  highlight?: {
    title: string;
    src: string;
    href: string;
    note: { es: string; en: string };
  };
  profile: {
    sample?: boolean;
    role: { es: string; en: string };
    content: { es: string[]; en: string[] };
    schedule: { es: string; en: string };
    /** Hometown and current base, shown in the details. */
    origin?: string;
    base?: string;
    /** Paragraphs: the first shows; the rest open with "Leer más". */
    bio: { es: string[]; en: string[] };
  };
};

export const streamers: Streamer[] = [
  {
    slug: "leolugo",
    name: "Leonardo Lugo",
    handle: "leolugolive",
    url: site.kick.url,
    photo: {
      // cropped from leolugo1.avif (a phone screenshot) to the photo itself
      src: "/leolugo/leolugo-portrait.avif",
      width: 738,
      height: 1095,
      focus: "50% 42%",
      alt: {
        es: "LeoLugoLive de noche en un balcón, con gorra y camiseta negra, frente a los edificios de la ciudad",
        en: "LeoLugoLive at night on a balcony, in a cap and black tee, with city buildings behind him",
      },
    },
    highlight: {
      title: "Futuras Promesas #3",
      src: "/trending/ft3.avif",
      href: "#kick",
      note: {
        es: "Sesión de streaming en su canal",
        en: "Streaming session on his channel",
      },
    },
    profile: {
      role: {
        es: "Canal que apoya a Forest Media Récords",
        en: "The channel supporting Forest Media Récords",
      },
      content: {
        es: ["Streaming", "Entretenimiento", "Música", "Colaboraciones"],
        en: ["Streaming", "Entertainment", "Music", "Collabs"],
      },
      schedule: { es: "Por anunciar", en: "To be announced" },
      origin: "Villavicencio",
      base: "Medellín",
      bio: {
        es: [
          "Leonardo Lugo Gómez nació en Villavicencio en 2004 y hace dos años vive en Medellín, desde donde construye su camino en el entretenimiento digital y el streaming. Se destaca por su presencia frente a la cámara y su conexión con la audiencia.",
          "Hace parte de los proyectos de Forest Media Récords que unen el streaming con la música, abriendo espacio a artistas y creadores emergentes. En su canal salen sesiones como Futuras Promesas.",
          "Su meta es seguir creciendo en la industria digital, fortalecer su comunidad y crear nuevos proyectos que unan streaming, música y entretenimiento.",
        ],
        en: [
          "Leonardo Lugo Gómez was born in Villavicencio in 2003 and has lived in Medellín for two years, where he's building his path in digital entertainment and streaming. He stands out for his on-camera presence and his connection with his audience.",
          "He's part of the Forest Media Récords projects that bring streaming and music together, opening space for emerging artists and creators. Sessions like Futuras Promesas go out on his channel.",
          "His goal is to keep growing in the digital industry, strengthen his community and build new projects that join streaming, music and entertainment.",
        ],
      },
    },
  },
  {
    slug: "trianiss",
    name: "Daniel Triana",
    handle: "trianiss",
    url: "https://kick.com/trianiss",
    photo: {
      src: "/triana/triana.avif",
      width: 1440,
      height: 1800,
      focus: "50% 24%",
      alt: {
        es: "Trianiss en Stream Fighters, con gorra, gafas oscuras y ropa negra frente al muro de prensa del evento",
        en: "Trianiss at Stream Fighters, in a cap, dark glasses and black clothes in front of the event's press wall",
      },
    },
    profile: {
      role: { es: "Streamer", en: "Streamer" },
      content: {
        es: [
          "Streaming",
          "Entretenimiento",
          "Colaboraciones",
          "Cultura digital",
        ],
        en: ["Streaming", "Entertainment", "Collabs", "Digital culture"],
      },
      schedule: { es: "Por anunciar", en: "To be announced" },
      origin: "Medellín",
      bio: {
        es: [
          "Daniel Triana Suaza, Trianiss, nació en Medellín en 2004. Empezó a hacer streaming mientras vivía en Estados Unidos y hace unos dos años volvió a Medellín para consolidar su proyecto en el entretenimiento digital.",
          "Ha sido moderador de Westcol, invitado a Stream Fighters y ha colaborado con reconocidos creadores de contenido del medio.",
          "Hoy transmite principalmente en Kick, donde tiene cerca de 500 seguidores, y suma más de 2.000 en Twitch, con una media de unos 25 espectadores y picos de 130. Sigue haciendo crecer su comunidad y creando colaboraciones que conecten el streaming, el entretenimiento y la cultura digital en Colombia.",
        ],
        en: [
          "Daniel Triana Suaza, Trianiss, was born in Medellín in 2004. He started streaming while living in the United States and came back to Medellín about two years ago to build his project in digital entertainment.",
          "He has been a moderator for Westcol, a guest at Stream Fighters and has collaborated with well-known content creators.",
          "He now streams mainly on Kick, where he has around 500 followers, plus over 2,000 on Twitch, averaging about 25 viewers with peaks of 130. He keeps growing his community and building collaborations that connect streaming, entertainment and digital culture in Colombia.",
        ],
      },
    },
  },
];

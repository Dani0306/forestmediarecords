export type Artist = {
  slug: string;
  name: string;
  /** First image is the lead portrait. */
  /** `lift` brightens dark sources (stage light) before the forge duotone. */
  photos: {
    src: string;
    width: number;
    height: number;
    lift?: number;
    /** CSS object-position for the crop (default "50% 22%"); set it when the subject sits low or off-centre. */
    focus?: string;
    alt: { es: string; en: string };
  }[];
  kickUrl: string; // TODO: artist Kick channel
  links: { label: string; url: string }[]; // TODO: Instagram, TikTok…
  /** Where to hear the music: the stage's "Escuchar" button. Empty shows "Muy pronto". */
  listen: { spotify: string; youtube: string }; // TODO: Spotify artist/playlist and YouTube channel URLs
  profile: ArtistProfile;
};

/**
 * Everything the artist stage shows beyond photos.
 * `sample: true` marks MOCK-UP copy: the UI tags it "Biografía de ejemplo".
 * Replace the text with the real data and drop the flag.
 */
export type ArtistProfile = {
  sample?: boolean;
  role: { es: string; en: string };
  genres: string[];
  city: string;
  /** Year the artist joined Forest Media Récords. */
  since: string;
  /** Paragraphs. The first one is the short intro; the rest open with "Leer biografía". */
  bio: { es: string[]; en: string[] };
};

export const artists: Artist[] = [
  {
    slug: "lentino",
    name: "Lentino",
    photos: [
      {
        src: "/lentino/lentino3.avif",
        width: 1023,
        height: 1280,
        alt: {
          es: "Lentino sentado frente a un mural, ajustándose la gorra",
          en: "Lentino seated in front of a mural, adjusting his cap",
        },
      },
      {
        src: "/lentino/lentino1.avif",
        width: 1280,
        height: 1023,
        alt: {
          es: "Lentino recostado contra una columna verde en la noche",
          en: "Lentino leaning against a green pillar at night",
        },
      },
      {
        src: "/lentino/lentino2.avif",
        width: 1023,
        height: 1280,
        alt: {
          es: "Lentino bajo luz verde azulada, mirando a la cámara",
          en: "Lentino under teal light, looking down the lens",
        },
      },
      {
        src: "/lentino/lentino4.avif",
        width: 1023,
        height: 1280,
        alt: {
          es: "Lentino con pañoleta, sentado bajo los árboles al anochecer",
          en: "Lentino in a bandana, seated under trees at dusk",
        },
      },
      {
        src: "/lentino/lentino5.avif",
        width: 852,
        height: 1280,
        alt: {
          es: "Lentino de pie con sombrero de pescador en la noche",
          en: "Lentino standing in a bucket hat at night",
        },
      },
    ],
    kickUrl: "",
    links: [],
    listen: { spotify: "", youtube: "" },
    profile: {
      role: { es: "Artista de música urbana", en: "Urban music artist" },
      genres: ["Reguetón", "R&B", "Trap"],
      city: "Medellín",
      since: "2026", // joined about August 2026 (two months before 2026-10-06)
      bio: {
        es: [
          "Luis Rafael Lentino nació en Sincelejo en 1997 y vive en Medellín desde 2022, donde ha venido consolidando su propuesta en la música urbana. Su sonido mezcla reguetón, R&B y trap para construir una identidad propia.",
          "Entre sus canciones se destacan «La Vuelta» y «BM», parte del camino que viene construyendo en la escena urbana.",
          "Hoy prepara nuevos lanzamientos, entre ellos «Sobrio», una colaboración con RS el Italiano que marca una nueva etapa en su evolución artística.",
        ],
        en: [
          "Luis Rafael Lentino was born in Sincelejo in 1997 and has lived in Medellín since 2022, where he's been building his place in urban music. His sound blends reggaeton, R&B and trap into an identity of his own.",
          "His standout songs include “La Vuelta” and “BM”, part of the path he's building in the urban scene.",
          "He's now preparing new releases, including “Sobrio”, a collaboration with RS el Italiano that marks a new stage in his artistic growth.",
        ],
      },
    },
  },
  {
    slug: "renzo",
    name: "RS el Italiano",
    photos: [
      {
        src: "/RS/RS2.avif",
        width: 3024,
        height: 4032,
        lift: 1.4,
        alt: {
          es: "RS el Italiano en la cabina de grabación bajo luz azul, con Medellín de noche detrás",
          en: "RS el Italiano in the recording booth under blue light, with Medellín at night behind him",
        },
      },
      {
        src: "/RS/RS1.avif",
        width: 744,
        height: 1280,
        lift: 2.1,
        alt: {
          es: "Renzo rapeando en vivo bajo luz azul, grabado con un celular",
          en: "Renzo rapping live under blue light, filmed on a phone",
        },
      },
      {
        src: "/RS/RS3.avif",
        width: 3024,
        height: 4032,
        alt: {
          es: "RS el Italiano grabando frente al micrófono en el estudio, bajo luz turquesa",
          en: "RS el Italiano recording at the mic in the studio, under teal light",
        },
      },
    ],
    kickUrl: "",
    links: [],
    listen: { spotify: "", youtube: "" },
    profile: {
      sample: true, // TODO: replace with RS el Italiano's real data
      role: { es: "Rapero", en: "Rapper" },
      genres: ["Rap", "Hip hop"],
      city: "Medellín",
      since: "2024",
      bio: {
        es: [
          "RS el Italiano es rap de tarima: barras rápidas, presencia fuerte y un público que se sabe sus letras.",
          "Se curtió en el freestyle y en los escenarios pequeños de la ciudad, donde cada show es una prueba. Con Forest Media Récords lleva ese directo al estudio y a los streams en Kick.",
          "Sus próximos lanzamientos buscan llevar la energía del vivo a cada canción. Este texto es una biografía de ejemplo y será reemplazado por la historia real del artista.",
        ],
        en: [
          "RS el Italiano is stage rap: fast bars, a heavy presence and a crowd that knows his lyrics.",
          "He came up through freestyle and the city's small stages, where every show is a test. With Forest Media Récords he is taking that live energy into the studio and onto Kick streams.",
          "His upcoming releases aim to carry the energy of his live shows into every song. This is a sample biography and will be replaced with the artist's real story.",
        ],
      },
    },
  },
  {
    slug: "lowkey",
    name: "Lowkey",
    photos: [
      {
        // cropped from lowkey1.avif (a phone story screenshot) to the photo itself
        src: "/lowkey/lowkey3.avif",

        width: 738,
        height: 445,
        focus: "40% 45%",
        alt: {
          es: "Lowkey con audífonos y gorra produciendo en el estudio frente a un portátil",
          en: "Lowkey in headphones and a cap producing in the studio at a laptop",
        },
      },
      {
        src: "/lowkey/lowkey2.avif",
        width: 738,
        height: 899,
        focus: "50% 78%",
        alt: {
          es: "Lowkey de espaldas trabajando en el estudio bajo luz morada",
          en: "Lowkey from behind, working in the studio under purple light",
        },
      },
      {
        src: "/lowkey/lowkey1-crop.avif",

        width: 691,
        height: 974,
        focus: "50% 25%",
        alt: {
          es: "Sesión de grabación en el estudio: dos artistas con audífonos frente al micrófono",
          en: "Recording session in the studio: two artists in headphones at the mic",
        },
      },
    ],
    kickUrl: "",
    links: [],
    listen: { spotify: "", youtube: "" },
    profile: {
      role: { es: "Compositor de música urbana", en: "Urban music songwriter" },
      genres: ["Reguetón", "R&B", "Trap"],
      city: "Medellín",
      since: "2026", // joined about August 2026 (two months before 2026-10-06)
      bio: {
        es: [
          "Mateo Andrés Valera nació en Cali en 1998 y se radicó en Medellín en 2021, donde comenzó a desarrollar su proyecto musical. Su propuesta combina reguetón, R&B y sonidos urbanos contemporáneos para crear una identidad fresca y versátil.",

          "Entre sus primeros lanzamientos se encuentran «Noche Cero» y «Sin Señal», canciones que reflejan su evolución y su interés por explorar diferentes sonidos dentro de la escena urbana.",

          "Actualmente trabaja en nueva música y prepara «Después de las 12», una colaboración con el artista colombiano Jhay Ríos que representa una nueva etapa en su carrera y en la consolidación de su propuesta artística.",
        ],

        en: [
          "Mateo Andrés Valera was born in Cali in 1998 and moved to Medellín in 2021, where he began developing his musical project. His sound blends reggaeton, R&B and contemporary urban influences to create a fresh and versatile identity.",

          "His early releases include “Noche Cero” and “Sin Señal”, songs that reflect his evolution and his interest in exploring different sounds within the urban music scene.",

          "He is currently working on new music and preparing “Después de las 12”, a collaboration with Colombian artist Jhay Ríos that represents a new chapter in his career and the continued development of his artistic identity.",
        ],
      },
    },
  },
  {
    slug: "nikosan",
    name: "Nikosan",
    photos: [
      {
        src: "/nicocol/nico1.avif",
        width: 3024,
        height: 4032,
        focus: "60% 30%",
        alt: {
          es: "Nikosan produciendo un beat en su portátil, de espaldas bajo luz azul en el estudio",
          en: "Nikosan producing a beat on his laptop, seen from behind under blue studio light",
        },
      },
      {
        src: "/nicocol/nico2.avif",
        width: 3024,
        height: 4032,
        focus: "60% 30%",
        alt: {
          es: "Nikosan trabajando en un beat junto a los monitores del estudio, bajo luz roja",
          en: "Nikosan working on a beat next to the studio monitors, under red light",
        },
      },
      {
        src: "/nicocol/nico3.avif",
        width: 3024,
        height: 4032,
        focus: "60% 45%",
        alt: {
          es: "Nikosan con gorra y gafas inclinado sobre su portátil en el estudio, bajo luz verde",
          en: "Nikosan in a cap and glasses leaning over his laptop in the studio, under green light",
        },
      },
    ],
    kickUrl: "",
    links: [],
    listen: { spotify: "", youtube: "" },
    profile: {
      role: { es: "Beatmaker y productor musical", en: "Beatmaker and music producer" },
      genres: [], // TODO: genres he produces
      city: "San Javier, Medellín",
      since: "", // TODO: confirm what 9/10/2018 refers to (start in music? joined Forest?)
      bio: {
        es: [
          "Nicolás Lozano, Nikosan, viene de San Javier, Medellín. Como beatmaker y productor musical de Forest Media Récords, convierte ideas en sonidos, emociones en melodías y sueños en proyectos musicales.",
          "San Javier es parte de su identidad, sus raíces y su historia. Su camino representa la pasión por crear, aprender y construir algo que trascienda más allá de una canción.",
          "Hoy su visión va más allá de producir beats: busca aportar al crecimiento de nuevos artistas y demostrar que el talento puede nacer en cualquier lugar y llegar tan lejos como la disciplina y la ambición lo permitan.",
        ],
        en: [
          "Nicolás Lozano, Nikosan, comes from San Javier, Medellín. As a beatmaker and music producer at Forest Media Récords, he turns ideas into sounds, emotions into melodies and dreams into music projects.",
          "San Javier is part of his identity, his roots and his story. His path is driven by a passion for creating, learning and building something that lasts beyond a single song.",
          "Today his vision goes beyond making beats: he wants to help new artists grow and prove that talent can come from anywhere and go as far as discipline and ambition allow.",
        ],
      },
    },
  },
];

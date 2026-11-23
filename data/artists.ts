export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "x"
  | "threads"
  | "facebook"
  | "youtube"
  | "spotify"
  | "soundcloud"
  | "applemusic";

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
  /** Social profiles, shown as icon buttons on the stage. */
  links: { platform: SocialPlatform; url: string }[];
  /** Where to hear the music: the stage's "Escuchar" button. Empty shows "Muy pronto". */
  listen: { spotify: string; youtube: string; appleMusic?: string }; // TODO: Spotify artist/playlist and YouTube channel URLs
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
        src: "/artists/lentino/lentino-6.webp",
        width: 828,
        height: 1459,
        focus: "50% 25%",
        alt: {
          es: "Lentino sentado de lado con gorra azul de visera verde, gafas y sudadera negra, con las manos tatuadas sobre la rodilla",
          en: "Lentino seated side-on in a navy cap with a green brim, sunglasses and a black hoodie, tattooed hands over his knee",
        },
      },
      {
        src: "/artists/lentino/lentino-3.avif",
        width: 1023,
        height: 1280,
        alt: {
          es: "Lentino sentado frente a un mural, ajustándose la gorra",
          en: "Lentino seated in front of a mural, adjusting his cap",
        },
      },
      {
        src: "/artists/lentino/lentino-fmr-1.avif",
        width: 1440,
        height: 1920,
        focus: "50% 22%",
        lift: 1.25,
        alt: {
          es: "Lentino con gorra roja y chaqueta negra, con la mirada baja frente a un carro, en el rodaje de «FMR»",
          en: "Lentino in a red cap and black jacket, eyes down in front of a car, on the “FMR” shoot",
        },
      },
      {
        src: "/artists/lentino/lentino-7.webp",
        width: 700,
        height: 727,
        alt: {
          es: "Lentino en versión ilustrada 3D: gorra azul hacia atrás, gafas oscuras, barba y capucha negra",
          en: "Lentino as a 3D illustration: a navy cap on backwards, dark sunglasses, a beard and a black hoodie",
        },
      },
      {
        src: "/artists/lentino/lentino-1.avif",
        width: 1280,
        height: 1023,
        alt: {
          es: "Lentino recostado contra una columna verde en la noche",
          en: "Lentino leaning against a green pillar at night",
        },
      },
      {
        src: "/artists/lentino/lentino-2.avif",
        width: 1023,
        height: 1280,
        alt: {
          es: "Lentino bajo luz verde azulada, mirando a la cámara",
          en: "Lentino under teal light, looking down the lens",
        },
      },
      {
        src: "/artists/lentino/lentino-4.avif",
        width: 1023,
        height: 1280,
        alt: {
          es: "Lentino con pañoleta, sentado bajo los árboles al anochecer",
          en: "Lentino in a bandana, seated under trees at dusk",
        },
      },
      {
        src: "/artists/lentino/lentino-5.avif",
        width: 852,
        height: 1280,
        alt: {
          es: "Lentino de pie con sombrero de pescador en la noche",
          en: "Lentino standing in a bucket hat at night",
        },
      },
    ],
    links: [
      { platform: "instagram", url: "https://www.instagram.com/lenttino/" },
      { platform: "tiktok", url: "https://www.tiktok.com/@lenttino_" },
      { platform: "x", url: "https://x.com/lentinolr" },
      { platform: "threads", url: "https://www.threads.com/@lenttino" },
    ],
    listen: {
      spotify: "https://open.spotify.com/artist/1FnpqdOMeuitHo76GJc5h4",
      youtube: "https://www.youtube.com/@lenttino",
    },
    profile: {
      role: { es: "Artista de música urbana", en: "Urban music artist" },
      genres: ["Reguetón", "R&B", "Trap"],
      city: "Medellín",
      since: "2026", // joined about August 2026 (two months before 2026-10-06)
      bio: {
        es: [
          "Lentino «El de la Magia», cuyo nombre es Luis Lentino, es un artista urbano colombiano nacido en Sincelejo en 1997. En 2018 inició profesionalmente su carrera artística en Barranquilla, ciudad donde comenzó a desarrollar su visión musical y a dar forma a su proyecto. En 2022 se trasladó a Medellín, donde ha continuado consolidando su propuesta y expandiendo su identidad dentro de la escena urbana.",
          "Su sonido se caracteriza por la fusión de reguetón, R&B y trap, géneros que convergen en una propuesta versátil, con una visión creativa orientada a explorar nuevas sonoridades y construir un sello musical propio.",
          "Entre sus lanzamientos destacan «La Vuelta», «Stalker», «Stripper», «BM» y «Coronao», canciones que representan distintas etapas de su recorrido y evolución artística.",
          "Actualmente, Lentino se encuentra trabajando en nueva música. Entre sus próximos lanzamientos se destacan «Contacto Cero», que será su single, y «Sobrio», una colaboración con RS el Italiano que marca un nuevo capítulo en su carrera y refleja su constante búsqueda de evolución, autenticidad y crecimiento dentro de la música urbana.",
        ],
        en: [
          "Lentino “El de la Magia” (“the one with the magic”), whose name is Luis Lentino, is a Colombian urban artist born in Sincelejo in 1997. In 2018 he began his artistic career professionally in Barranquilla, the city where he started to develop his musical vision and shape his project. In 2022 he moved to Medellín, where he has kept consolidating his work and expanding his identity within the urban scene.",
          "His sound blends reggaeton, R&B and trap, genres that come together in a versatile approach, with a creative vision aimed at exploring new sounds and building a musical signature of his own.",
          "His releases include “La Vuelta”, “Stalker”, “Stripper”, “BM” and “Coronao”, songs that stand for different stages of his path and artistic evolution.",
          "Lentino is currently working on new music. His upcoming releases include “Contacto Cero”, which will be his single, and “Sobrio”, a collaboration with RS el Italiano that marks a new chapter in his career and reflects his constant search for evolution, authenticity and growth in urban music.",
        ],
      },
    },
  },
  {
    slug: "renzo",
    name: "RS el Italiano",
    photos: [
      {
        src: "/artists/rs-el-italiano/rs-fmr-2.avif",
        width: 1440,
        height: 1920,
        focus: "50% 24%",
        lift: 1.25,
        alt: {
          es: "RS el Italiano señalando a la cámara en el parqueadero, durante el rodaje de «FMR»",
          en: "RS el Italiano pointing at the camera in the parking garage, on the “FMR” shoot",
        },
      },
      {
        src: "/artists/rs-el-italiano/rs-fmr-1.avif",
        width: 1440,
        height: 1920,
        focus: "50% 24%",
        lift: 1.25,
        alt: {
          es: "RS el Italiano recostado contra un carro oscuro en un parqueadero, de noche, durante la grabación del videoclip «FMR»",
          en: "RS el Italiano leaning on a dark car in a parking garage at night, during the shoot of the “FMR” video",
        },
      },
      {
        src: "/artists/rs-el-italiano/rs-fmr-3.avif",
        width: 1440,
        height: 1920,
        focus: "50% 24%",
        lift: 1.25,
        alt: {
          es: "RS el Italiano con la mano en la gorra, mirando a la cámara, en el rodaje de «FMR»",
          en: "RS el Italiano with a hand on his cap, looking into the lens, on the “FMR” shoot",
        },
      },
      {
        src: "/artists/rs-el-italiano/rs-fmr-4.avif",
        width: 1440,
        height: 1920,
        focus: "50% 28%",
        lift: 1.25,
        alt: {
          es: "RS el Italiano apoyado en el carro con el brazo tatuado cruzado, en el parqueadero",
          en: "RS el Italiano propped on the car with his tattooed arm crossed, in the parking garage",
        },
      },
      {
        src: "/artists/rs-el-italiano/rs-fmr-5.avif",
        width: 1440,
        height: 1920,
        focus: "50% 28%",
        lift: 1.25,
        alt: {
          es: "RS el Italiano de medio cuerpo, mirando a la cámara con camiseta sin mangas, en el parqueadero",
          en: "RS el Italiano from the waist up in a sleeveless shirt, looking at the lens, in the parking garage",
        },
      },
      {
        src: "/artists/rs-el-italiano/rs-fmr-6.avif",
        width: 1440,
        height: 1920,
        focus: "50% 30%",
        lift: 1.25,
        alt: {
          es: "RS el Italiano de pie frente al carro, con la cabeza baja, en el parqueadero",
          en: "RS el Italiano standing in front of the car, head down, in the parking garage",
        },
      },
      {
        src: "/artists/rs-el-italiano/rs-estudio-1.avif",
        width: 1440,
        height: 1920,
        focus: "35% 55%",
        alt: {
          es: "RS el Italiano con audífonos y gorra, inclinado sobre el portátil en el estudio, bajo luz roja",
          en: "RS el Italiano in headphones and a cap, leaning over the laptop in the studio under red light",
        },
      },
      {
        src: "/artists/rs-el-italiano/rs-estudio-2.avif",
        width: 1440,
        height: 1920,
        focus: "55% 45%",
        alt: {
          es: "RS el Italiano grabándose con el celular junto al filtro del micrófono, con la ciudad de noche en la ventana",
          en: "RS el Italiano filming himself on his phone beside the mic filter, with the city at night in the window",
        },
      },
      {
        src: "/artists/rs-el-italiano/rs-estudio-3.avif",
        width: 1440,
        height: 1920,
        focus: "55% 45%",
        alt: {
          es: "RS el Italiano de espaldas, grabando frente al micrófono en el estudio bajo luz roja, con las luces de Medellín al fondo",
          en: "RS el Italiano seen from behind, recording at the mic in the studio under red light, with the Medellín lights behind him",
        },
      },
      {
        src: "/artists/rs-el-italiano/rs-estudio-4.avif",
        width: 1440,
        height: 1920,
        focus: "60% 45%",
        alt: {
          es: "RS el Italiano cantando frente al micrófono mientras se graba con el celular, bajo luz roja",
          en: "RS el Italiano singing at the mic while filming himself on his phone, under red light",
        },
      },
    ],
    links: [
      { platform: "instagram", url: "https://www.instagram.com/rselitaliano/" },
      { platform: "tiktok", url: "https://www.tiktok.com/@rs_italiano" },
      { platform: "facebook", url: "https://www.facebook.com/RS.ITALIANO" },
      { platform: "threads", url: "https://www.threads.com/@rselitaliano" },
    ],
    listen: {
      spotify: "https://open.spotify.com/artist/4EZilV2kRfc5pkbaCb7eDn",
      youtube: "https://www.youtube.com/@rs.italiano",
    },
    profile: {
      role: {
        es: "Cantante, compositor y productor",
        en: "Singer, songwriter and producer",
      },
      genres: ["Trap", "Música urbana"],
      city: "Medellín",
      // TODO: the bio doesn't say when he joined Forest; "2024" was a placeholder
      since: "2026",
      bio: {
        es: [
          "Renzo Scoppettone, RS el Italiano, es cantante, compositor y productor de ascendencia italiana, con más de una década en la música urbana. Su propuesta nace del trap y mezcla calle, ambición y evolución, con una identidad que va más allá de un solo género.",
          "Ha recorrido todas las facetas de la música: la composición, la interpretación, la producción y el desarrollo de proyectos completos. Por eso entiende cada canción como un universo que conecta el sonido con la imagen, la narrativa y el concepto.",
          "Como artista independiente sigue su propia visión sin perder sus raíces urbanas, y hoy trabaja con la mirada puesta en la expansión internacional y en dejar su huella en la nueva generación de la música urbana.",
        ],
        en: [
          "Renzo Scoppettone, RS el Italiano, is a singer, songwriter and producer of Italian descent with more than a decade in urban music. His sound is rooted in trap and blends street, ambition and growth, with an identity that reaches beyond a single genre.",
          "He has worked every side of music: songwriting, performing, production and building whole projects. That's why he sees each song as a world that connects sound with image, story and concept.",
          "As an independent artist he follows his own vision without losing his urban roots, and today he's working toward international growth and leaving his mark on the new generation of urban music.",
        ],
      },
    },
  },
  {
    // Added 2026-11-14; bio, genre and links from the team on 2026-11-15. Still placeholders: more photos (team uploads later), latest release.
    // Photos from the team (2026-11-15); originals in `source/leykan/`. The first leads the stage and the welcome hero.
    slug: "leykan",
    name: "Leykan",
    photos: [
      {
        src: "/artists/leykan/leykan-2.avif",
        width: 1400,
        height: 2100,
        focus: "50% 26%",
        alt: {
          es: "Leykan con gorra blanca, gafas y pañoleta, haciendo un gesto con la mano frente a la cámara, de noche",
          en: "Leykan in a white cap, sunglasses and a bandana, making a hand sign toward the camera at night",
        },
      },
      {
        src: "/artists/leykan/leykan-3.avif",
        width: 1400,
        height: 2488,
        focus: "50% 22%",
        alt: {
          es: "Leykan de pie junto a un carro negro, sujetando la pañoleta sobre su gorra, con una camiseta blanca de labios estampados",
          en: "Leykan standing beside a black car, holding a bandana over his cap, in a white tee with a lips print",
        },
      },
    ],
    links: [
      { platform: "instagram", url: "https://www.instagram.com/leykanmusic" },
      { platform: "tiktok", url: "https://www.tiktok.com/@leykanmusic" },
      {
        platform: "facebook",
        url: "https://www.facebook.com/share/1Fbn3QxTo6/",
      },
      { platform: "youtube", url: "https://youtube.com/@leykan" },
      {
        platform: "spotify",
        url: "https://open.spotify.com/artist/0RiYU88aiUZxDSs4CYA5XK",
      },
      {
        platform: "applemusic",
        url: "https://music.apple.com/co/artist/leykan/1677278442",
      },
    ],
    listen: {
      spotify: "https://open.spotify.com/artist/0RiYU88aiUZxDSs4CYA5XK",
      youtube: "https://youtube.com/@leykan",
      appleMusic: "https://music.apple.com/co/artist/leykan/1677278442",
    },
    profile: {
      role: { es: "Cantante", en: "Singer" },
      genres: ["Trap"],
      city: "Cali",
      since: "2026",
      bio: {
        es: [
          "Nacido en Cali y criado entre estudios de grabación y tarimas, Juan Sebastian Gallego Perea (Leykan) lleva la música en las venas desde los tres años. Influenciado por el legado del género urbano desde los 2000 y una profunda visión de la cultura y la sociedad, este joven artista ha convertido su vida en una constante búsqueda de autenticidad.",
          "Más que hacer música, Leykan esculpe su propia identidad a través del trap y el rap con barras afiladas y líneas melódicas e innovadoras que rompen esquemas. Su sonido fresco y su incansable dedicación al arte conectan con una nueva generación que busca verdad, identidad y estilo propio.",
          "Prepárate para conectar con el movimiento. Su más reciente lanzamiento ya se encuentra disponible en todas las plataformas digitales.",
        ],
        en: [
          "Born in Cali and raised between recording studios and stages, Juan Sebastian Gallego Perea (Leykan) has had music in his veins since he was three. Shaped by the legacy of urban music since the 2000s and a deep view of culture and society, this young artist has made his life a constant search for authenticity.",
          "More than making music, Leykan sculpts his own identity through trap and rap, with sharp bars and innovative melodic lines that break the mould. His fresh sound and tireless dedication to the craft connect with a new generation looking for truth, identity and a style of its own.",
          "Get ready to connect with the movement. His latest release is now available on all digital platforms.",
        ],
      },
    },
  },
  {
    slug: "lowkey",
    name: "Lowkey",
    photos: [
      {
        src: "/artists/lowkey/lowkey1.webp",
        width: 3024,
        height: 4032,
        focus: "60% 40%",
        alt: {
          es: "Lowkey con audífonos y camiseta blanca produciendo en el estudio, con un compañero grabándolo al fondo",
          en: "Lowkey in headphones and a white tee producing in the studio, a friend filming him in the background",
        },
      },
      {
        src: "/artists/lowkey/lowkey4.webp",
        width: 960,
        height: 1280,
        focus: "50% 55%",
        alt: {
          es: "Lowkey trabajando en el portátil en la cabina del estudio, junto al micrófono y la consola",
          en: "Lowkey working on his laptop in the studio booth, beside the microphone and the console",
        },
      },
      {
        src: "/artists/lowkey/lowkey2.webp",
        width: 3120,
        height: 4160,
        focus: "50% 40%",
        alt: {
          es: "Lowkey sentado con gorra y camiseta verde frente a una bicicleta colgada en la pared",
          en: "Lowkey seated in a cap and a green jersey in front of a bicycle hung on the wall",
        },
      },
      {
        src: "/artists/lowkey/lowkey5.webp",
        width: 960,
        height: 1280,
        focus: "50% 45%",
        alt: {
          es: "Lowkey de espaldas frente al portátil, con los monitores del estudio al fondo",
          en: "Lowkey from behind at his laptop, the studio monitors in the background",
        },
      },
      {
        src: "/artists/lowkey/lowkey3.webp",
        width: 1170,
        height: 650,
        focus: "40% 45%",
        alt: {
          es: "Sesión de grabación en el estudio bajo luces de neón: un artista frente al micrófono y Lowkey en la mesa",
          en: "Recording session in the studio under neon light: an artist at the mic and Lowkey at the desk",
        },
      },
    ],
    links: [
      { platform: "instagram", url: "https://www.instagram.com/lowkey.bpm" },
      { platform: "tiktok", url: "https://www.tiktok.com/@lowkey.bpm" },
      { platform: "youtube", url: "https://www.youtube.com/@weloveulowkey" },
    ],
    listen: {
      spotify: "https://open.spotify.com/artist/14hwNhHKQD60YcNDYWtDXI",
      youtube: "https://www.youtube.com/@weloveulowkey",
    },
    profile: {
      role: { es: "Artista y productor", en: "Artist and producer" },
      genres: ["Urbano", "Afro"],
      city: "",
      since: "",
      bio: {
        es: [
          "Ian Martínez, mejor conocido como «Lowkey», es un artista y productor con más de 6 años de experiencia en la industria musical. Ha trabajado con múltiples artistas de la escena urbana de Colombia y otros países, y se caracteriza por un estilo propio que cautiva los oídos de quien lo escucha.",
          "Influenciado por ritmos latinos, europeos y africanos, Lowkey lleva su diseño sonoro a un estilo particular y comercial que da a sus obras una estética sonora distintiva.",
        ],
        en: [
          "Ian Martínez, better known as “Lowkey”, is an artist and producer with more than 6 years of experience in the music industry. He has worked with many artists from the urban scene in Colombia and other countries, and is known for a style of his own that captivates whoever listens.",
          "Influenced by Latin, European and African rhythms, Lowkey takes his sound design into a particular, commercial style that gives his work a distinctive sonic aesthetic.",
        ],
      },
    },
  },
  {
    slug: "nikosan",
    name: "Nikosan",
    photos: [
      {
        src: "/artists/nikosan/nikosan-1.avif",
        width: 3024,
        height: 4032,
        focus: "60% 30%",
        alt: {
          es: "Nikosan produciendo un beat en su portátil, de espaldas bajo luz azul en el estudio",
          en: "Nikosan producing a beat on his laptop, seen from behind under blue studio light",
        },
      },
      {
        src: "/artists/nikosan/nikosan-2.avif",
        width: 3024,
        height: 4032,
        focus: "60% 30%",
        alt: {
          es: "Nikosan trabajando en un beat junto a los monitores del estudio, bajo luz roja",
          en: "Nikosan working on a beat next to the studio monitors, under red light",
        },
      },
      {
        src: "/artists/nikosan/nikosan-3.avif",
        width: 3024,
        height: 4032,
        focus: "60% 45%",
        alt: {
          es: "Nikosan con gorra y gafas inclinado sobre su portátil en el estudio, bajo luz verde",
          en: "Nikosan in a cap and glasses leaning over his laptop in the studio, under green light",
        },
      },
    ],
    links: [
      { platform: "instagram", url: "https://www.instagram.com/nicolozanoo_/" },
    ],
    listen: { spotify: "", youtube: "" },
    profile: {
      role: {
        es: "Beatmaker y productor musical",
        en: "Beatmaker and music producer",
      },
      genres: ["Rap", "BoomBap", "Trap", "Drumless"],
      city: "San Javier, Medellín",
      since: "2026", // TODO: confirm what 9/10/2018 refers to (start in music? joined Forest?)
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

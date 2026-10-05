export type Artist = {
  slug: string;
  name: string;
  /** First image is the lead portrait. */
  /** `lift` brightens dark sources (stage light) before the forge duotone. */
  photos: { src: string; width: number; height: number; lift?: number; alt: { es: string; en: string } }[];
  kickUrl: string; // TODO: artist Kick channel
  links: { label: string; url: string }[]; // TODO: Instagram, Spotify, YouTube…
};

export const artists: Artist[] = [
  {
    slug: "lentino",
    name: "Lentino",
    photos: [
      {
        src: "/lentino3.avif",
        width: 1023,
        height: 1280,
        alt: {
          es: "Lentino sentado frente a un mural, ajustándose la gorra",
          en: "Lentino seated in front of a mural, adjusting his cap",
        },
      },
      {
        src: "/lentino1.avif",
        width: 1280,
        height: 1023,
        alt: {
          es: "Lentino recostado contra una columna verde en la noche",
          en: "Lentino leaning against a green pillar at night",
        },
      },
      {
        src: "/lentino2.avif",
        width: 1023,
        height: 1280,
        alt: { es: "Lentino bajo luz verde azulada, mirando a la cámara", en: "Lentino under teal light, looking down the lens" },
      },
      {
        src: "/lentino4.avif",
        width: 1023,
        height: 1280,
        alt: { es: "Lentino con pañoleta, sentado bajo los árboles al anochecer", en: "Lentino in a bandana, seated under trees at dusk" },
      },
      {
        src: "/lentino5.avif",
        width: 852,
        height: 1280,
        alt: { es: "Lentino de pie con sombrero de pescador en la noche", en: "Lentino standing in a bucket hat at night" },
      },
    ],
    kickUrl: "",
    links: [],
  },
  {
    slug: "renzo",
    name: "Renzo",
    photos: [
      {
        src: "/renzo2.avif",
        width: 900,
        height: 1600,
        lift: 2.1,
        alt: {
          es: "Renzo rapeando en vivo bajo luz azul, grabado con un celular",
          en: "Renzo rapping live under blue light, filmed on a phone",
        },
      },
      {
        src: "/renzo3.avif",
        width: 900,
        height: 1600,
        lift: 2.1,
        alt: { es: "Renzo rapeando frente al público durante un show", en: "Renzo rapping to the crowd during a show" },
      },
    ],
    kickUrl: "",
    links: [],
  },
];

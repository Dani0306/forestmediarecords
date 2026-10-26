/**
 * "Lo nuevo": the latest releases from the roster, newest first.
 *
 * Covers live in `public/releases/` (square WebP, cropped from the Spotify
 * screenshots in `source/releases/`). `href` is the Spotify album link
 * without its tracking parameters. The release date is the "10 Oct" Spotify
 * shows on both singles.
 */
export type Release = {
  slug: string;
  title: string;
  /** Matches `slug` in `data/artists.ts`. */
  artist: { slug: string; name: string };
  kind: "single";
  /** ISO date with offset (midday Bogotá, so the day never slips). */
  date: string;
  cover: { src: string; width: number; height: number; alt: { es: string; en: string } };
  spotify: string;
  /** Explicit content, shown as an "E" tag next to the title. */
  explicit?: boolean;
};

export const releases: Release[] = [
  {
    slug: "coronao",
    title: "Coronao",
    artist: { slug: "lentino", name: "Lentino" },
    kind: "single",
    date: "2026-10-10T12:00:00-05:00",
    cover: {
      src: "/releases/coronao-cover.webp",
      width: 736,
      height: 736,
      alt: {
        es: "Portada de Coronao: Lentino con una corona dorada sobre su nombre, frente a una ciudad de noche, con fajos de billetes y monedas",
        en: "Coronao cover art: Lentino under a golden crown over the title, in front of a city at night, with stacks of cash and coins",
      },
    },
    spotify: "https://open.spotify.com/album/3LZ7e2bQOGNzNAcOou2R4L",
    explicit: true,
  },
  {
    slug: "la-vuelta",
    title: "La Vuelta",
    artist: { slug: "lentino", name: "Lentino" },
    kind: "single",
    date: "2026-10-10T12:00:00-05:00",
    cover: {
      src: "/releases/lavuelta-cover.webp",
      width: 736,
      height: 736,
      alt: {
        es: "Portada de La Vuelta: Lentino sentado junto a una mujer en un muro con Medellín y el metrocable al atardecer detrás",
        en: "La Vuelta cover art: Lentino seated beside a woman on a wall, with Medellín and the cable car at sunset behind them",
      },
    },
    spotify: "https://open.spotify.com/album/3ws3s3R0QX9qb5ZpiCylkZ",
    explicit: true,
  },
];

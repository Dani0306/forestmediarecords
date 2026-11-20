/**
 * "Lo nuevo": the latest releases from the roster, newest first.
 *
 * Covers live in `public/releases/` (square WebP, cropped from the Spotify
 * screenshots in `source/releases/`). `href` is the Spotify album link
 * without its tracking parameters. The release date is the "10 Oct" Spotify
 * shows on both singles.
 */
import { artists } from "./artists";

export type Release = {
  slug: string;
  title: string;
  /** Matches `slug` in `data/artists.ts`. */
  artist: { slug: string; name: string };
  kind: "single";
  /** ISO date with offset (midday Bogotá, so the day never slips). Omit when unknown: the date is left out. */
  date?: string;
  cover: { src: string; width: number; height: number; alt: { es: string; en: string } };
  /** The song on Spotify; "" until the team sends it (the buttons then open the lead artist's Spotify profile). */
  spotify: string;
  /** The label's official song: the hero and the assistant say so. */
  official?: boolean;
  /** Explicit content, shown as an "E" tag next to the title. */
  explicit?: boolean;
};

/**
 * Lentino's Coronao and La Vuelta (10 Oct) were taken out on 2026-11-15; their covers and links
 * still live in `data/trending.ts` and `data/topSongs.ts`.
 * With no releases, "Lo nuevo" hides itself, along with its nav links and hero shortcut.
 */
export const releases: Release[] = [
  {
    // the label's official song, out on all platforms (team, 2026-11-20). Cover from the team
    // (`source/releases/fmr-portrait.jpg`). TODO: the Spotify link and the release date.
    slug: "fmr",
    title: "F.M.R",
    artist: { slug: "lentino", name: "Lentino × RS el Italiano" },
    kind: "single",
    official: true,
    cover: {
      src: "/releases/fmr-cover.webp",
      width: 1200,
      height: 1200,
      alt: {
        es: "Portada de F.M.R #1, de Lentino y RS el Italiano: el título en letras de metal sobre dos carros negros enfrentados con las luces encendidas, con placas que dicen «We love» y «U Lowkey»",
        en: "F.M.R #1 cover art by Lentino and RS el Italiano: the title in metal letters over two black cars facing each other with their lights on, plates reading “We love” and “U Lowkey”",
      },
    },
    spotify: "",
  },
];

/** Where "Escuchar en Spotify" goes: the song, or the lead artist's Spotify profile until the song link arrives. */
export const listenUrl = (r: Release) =>
  r.spotify || artists.find((a) => a.slug === r.artist.slug)?.listen.spotify || "";

/**
 * The release that takes over the first screen (its `slug`), below a main event and
 * above the welcome and winner takeovers. "" hands the hero back to the video.
 */
export const heroRelease = "fmr";

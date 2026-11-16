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

/**
 * Empty on 2026-11-15 at the team's request: Lentino's Coronao and La Vuelta (10 Oct) are no
 * longer "new". Their covers and links still live in `data/trending.ts` and `data/topSongs.ts`.
 * With no releases, "Lo nuevo" hides itself, along with its nav links and hero shortcut.
 */
export const releases: Release[] = [];

/**
 * Welcome takeover: a new artist leads the first screen for a short window
 * (below a main event, above the winner takeover). The artist's name, photos,
 * genre, city and Spotify link come from `data/artists.ts`; only the schedule
 * lives here. Outside the window the video hero comes back on its own.
 */
export const welcome = {
  /** `slug` in `data/artists.ts`. */
  artist: "leykan",
  /** The window, Medellín time (UTC-5). Push `until` forward to keep the welcome up longer. */
  from: "2026-11-15T00:00:00-05:00",
  until: "2026-11-22T00:00:00-05:00",
};

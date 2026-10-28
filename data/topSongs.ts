/**
 * "Lo más escuchado": each artist's three most played songs, as one band per
 * artist. Order is rank: the first song is number one.
 *
 * Fill these in with the team's real numbers; never guess a song's rank or plays.
 * The section stays hidden while every artist is empty. An artist with fewer
 * than three songs shows the missing slots as "Por anunciar".
 *
 * - `cover`: square artwork in `public/top/<artist>/` (WebP or AVIF, ~640 px
 *   or more). Without one the sleeve is printed with the title instead.
 * - `preview`: a 15–30 s MP3 clip in `public/top/`. With one, the song gets a
 *   play button and the record spins at 33⅓ while it plays.
 * - `plays`: as the team reports it, already formatted ("1,2 M"). Optional.
 *
 * Songs and links from the team (2026-10-27). Titles as Spotify and YouTube
 * list them; RS el Italiano's covers are Spotify's 640 px artwork. To see the
 * design with sample songs: `npm run dev` → /preview/lo-mas-escuchado
 */
export type TopSong = {
  title: string;
  cover?: { src: string; width: number; height: number };
  spotify?: string;
  youtube?: string;
  preview?: string;
  plays?: string;
  year?: string;
  explicit?: boolean;
  /** Sample content: tagged "Ejemplo" in the UI. */
  sample?: boolean;
};

export type TopSide = {
  /** Matches `slug` in `data/artists.ts`. */
  artist: string;
  songs: TopSong[];
};

export const topSongs: TopSide[] = [
  {
    artist: "lentino",
    songs: [
      {
        title: "La Vuelta",
        cover: { src: "/releases/lavuelta-cover.webp", width: 736, height: 736 },
        spotify: "https://open.spotify.com/album/3ws3s3R0QX9qb5ZpiCylkZ",
        youtube: "https://www.youtube.com/watch?v=v-BjMDk-CPM",
        explicit: true,
      },
      {
        title: "Dragón",
        cover: { src: "/top/lentino/dragon.webp", width: 748, height: 724 },
        youtube: "https://www.youtube.com/watch?v=A1aZBXdR6dQ",
        explicit: true,
      },
      {
        title: "Stripper",
        cover: { src: "/top/lentino/stripper.webp", width: 702, height: 683 },
        youtube: "https://www.youtube.com/watch?v=XjmvUxm_mUo",
      },
    ],
  },
  {
    artist: "renzo",
    songs: [
      {
        title: "Cuidao Wao",
        cover: { src: "/top/RS/cuidao_wao.webp", width: 640, height: 640 },
        spotify: "https://open.spotify.com/track/5uoKP2yv9HorNghReUuFFo",
      },
      {
        title: "Nalguita",
        cover: { src: "/top/RS/nalguita.webp", width: 640, height: 640 },
        spotify: "https://open.spotify.com/track/4YfwDyFmayw3irN5Fgv6hw",
      },
      {
        title: "Dragones de Komodo",
        cover: { src: "/top/RS/dragones_de_comodo.webp", width: 640, height: 640 },
        spotify: "https://open.spotify.com/track/4EeNOd2xhMrSghTDFGq3tD",
      },
    ],
  },
];

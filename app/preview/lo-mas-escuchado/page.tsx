import { notFound } from "next/navigation";
import TopSongs from "@/components/TopSongs";
import type { TopSide } from "@/data/topSongs";

/**
 * Dev-only preview of "Lo más escuchado" with SAMPLE songs (tagged "Ejemplo"),
 * so the design can be reviewed before the real top 3 arrive in data/topSongs.ts.
 * Covers here are artist photos, not song artwork. Production returns 404.
 */
const sample: TopSide[] = [
  {
    artist: "lentino",
    songs: [
      { title: "Canción de ejemplo", cover: { src: "/artists/lentino/lentino-3.avif", width: 1023, height: 1280 }, plays: "0,0 M", year: "2026", spotify: "https://open.spotify.com/artist/1FnpqdOMeuitHo76GJc5h4", explicit: true, sample: true },
      { title: "Segunda de ejemplo", cover: { src: "/artists/lentino/lentino-fmr-1.avif", width: 1280, height: 1280 }, plays: "0,0 M", year: "2026", spotify: "https://open.spotify.com/artist/1FnpqdOMeuitHo76GJc5h4", sample: true },
      { title: "Sin portada aún", plays: "0,0 M", year: "2026", sample: true },
    ],
  },
  {
    artist: "renzo",
    songs: [
      { title: "Ejemplo de RS", cover: { src: "/artists/rs-el-italiano/rs-fmr-1.avif", width: 1280, height: 1280 }, plays: "0,0 M", year: "2026", spotify: "https://open.spotify.com/artist/4EZilV2kRfc5pkbaCb7eDn", sample: true },
      { title: "Otra de ejemplo", cover: { src: "/artists/rs-el-italiano/rs-estudio-1.avif", width: 1280, height: 1280 }, year: "2025", sample: true },
    ],
  },
];

export const metadata = { robots: { index: false } };

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <main className="pt-16">
      <TopSongs sides={sample} />
    </main>
  );
}

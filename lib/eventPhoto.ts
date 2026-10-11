import { artists } from "@/data/artists";
import { streamers } from "@/data/streamers";
import type { ForgeEvent } from "@/data/events";

export type EventPhoto = {
  src: string;
  alt: { es: string; en: string };
  lift?: number;
};

/**
 * The picture for an event: its own `image` (reusing an artist's or streamer's
 * alt text and exposure lift when it is one of theirs), else the lead artist's photo.
 */
export function eventPhoto(e: ForgeEvent): EventPhoto | undefined {
  const lead = artists.find((a) => a.slug === e.artists[0]);
  if (!e.image) return lead?.photos[0];
  for (const a of artists) {
    const match = a.photos.find((p) => p.src === e.image);
    if (match) return match;
  }
  // streamer photos (e.g. the hosts of a Kick event) carry their own alt text too
  for (const st of streamers) {
    const match = st.photos.find((p) => p.src === e.image);
    if (match) return match;
  }
  return { src: e.image, alt: { es: e.title.es, en: e.title.en } };
}

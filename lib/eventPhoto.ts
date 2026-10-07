import { artists } from "@/data/artists";
import type { ForgeEvent } from "@/data/events";

export type EventPhoto = {
  src: string;
  alt: { es: string; en: string };
  lift?: number;
};

/**
 * The picture for an event: its own `image` (reusing the artist photo's alt
 * text and exposure lift when it is one of theirs), else the lead artist's photo.
 */
export function eventPhoto(e: ForgeEvent): EventPhoto | undefined {
  const lead = artists.find((a) => a.slug === e.artists[0]);
  if (!e.image) return lead?.photos[0];
  for (const a of artists) {
    const match = a.photos.find((p) => p.src === e.image);
    if (match) return match;
  }
  return { src: e.image, alt: { es: e.title.es, en: e.title.en } };
}

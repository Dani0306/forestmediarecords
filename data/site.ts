export type SocialLink = {
  id: "instagram" | "youtube" | "soundcloud";
  label: string;
  handle: string;
  url: string;
};

/**
 * Global site configuration.
 * Every empty string is a placeholder: the UI hides or softens what is missing
 * instead of inventing it. Fill these in as the real links arrive.
 */
export const site = {
  name: "Forest Media Récords",
  city: "Medellín",
  country: "Colombia",
  /** Demo submissions open a pre-filled email to this address. */
  contactEmail: "forestmediarecords@gmail.com",
  kick: {
    /** The Kick channel that supports Forest Media Récords; label streams go out here. */
    url: "https://kick.com/leolugolive",
    handle: "leolugolive",
  },
  /**
   * The label's social profiles: the "Síguenos" section and the footer.
   * An empty `url` shows the platform as "Muy pronto" (not a link).
   */
  socials: [
    { id: "instagram", label: "Instagram", handle: "@forestmediarecords", url: "https://www.instagram.com/forestmediarecords/" },
    { id: "youtube", label: "YouTube", handle: "", url: "" }, // TODO: YouTube channel URL
    { id: "soundcloud", label: "SoundCloud", handle: "", url: "" }, // TODO: SoundCloud profile URL
  ] as SocialLink[],
};

export const hasKick = site.kick.url.length > 0;

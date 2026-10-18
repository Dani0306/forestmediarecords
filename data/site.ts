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
  /** The forms (demo, studio booking) are emailed to this address. */
  contactEmail: "forestmediarecords@gmail.com",
  /** Maker's mark at the very bottom of the footer: who designed and built the site. */
  credits: {
    name: "Daniel Colorado",
    initials: "DC",
    role: "Digital Product & Operations Director",
    unit: "Digital Systems & Software",
    email: "danielcolorado.dev@gmail.com",
    website: "https://danielcolorado.dev",
    links: [
      { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/daniel1colorado1/" },
      { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/daniel-colorado-774b632b1/" },
    ] as { platform: "instagram" | "linkedin"; label: string; url: string }[],
  },
  /** Contact WhatsApp: display form and the digits for wa.me links. */
  whatsapp: { display: "+57 304 464 6964", number: "573044646964" },
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
    { id: "youtube", label: "YouTube", handle: "@forestmediarecords", url: "https://www.youtube.com/@forestmediarecords" },
    { id: "soundcloud", label: "SoundCloud", handle: "", url: "" }, // TODO: SoundCloud profile URL
  ] as SocialLink[],
};

export const hasKick = site.kick.url.length > 0;

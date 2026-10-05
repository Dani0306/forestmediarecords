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
  contactEmail: "", // TODO: the real demo/contact email; the form stays closed until set
  kick: {
    /** Label channel on Kick, e.g. "https://kick.com/forestmediarecords" */
    url: "", // TODO
    handle: "", // TODO, e.g. "forestmediarecords"
  },
  socials: [
    // TODO: add the real profiles, e.g.
    // { label: "Instagram", url: "https://instagram.com/..." },
  ] as { label: string; url: string }[],
};

export const hasKick = site.kick.url.length > 0;

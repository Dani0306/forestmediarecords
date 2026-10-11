type P = React.SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
};

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CalendarPlus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M12 13v5M9.5 15.5h5" />
  </svg>
);

/** Anvil: horn on the left, face on top, waist and foot below. */
export const Anvil = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 7h14l4-2v4l-4 2h-2v2H9v-2C6 11 4 9.5 3 7Z" />
    <path d="M9 13 7.5 17h9L15 13M6 20h12" />
  </svg>
);

/** Play mark used for Kick links (not the Kick logo). */
export const Broadcast = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 5h16v11H4zM9 20h6" />
    <path d="M10.5 8.5v4l3.5-2z" fill="currentColor" />
  </svg>
);

export const Play = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 5v14l11-7z" fill="currentColor" />
  </svg>
);

export const Pause = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 5v14M16 5v14" strokeWidth={3} />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Spark = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
  </svg>
);

/* platform marks, drawn on the same 24px grid and 1.75 stroke as the rest */
export const Instagram = (p: P) => (
  <svg {...base} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);

export const YouTube = (p: P) => (
  <svg {...base} strokeLinejoin="round" {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
  </svg>
);

export const SoundCloud = (p: P) => (
  <svg {...base} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M10 17.5V8.6a5 5 0 0 1 9.4 2.4 3.3 3.3 0 0 1-.4 6.5H10" />
    <path d="M7 17.5v-7M4 17.5v-4.5" />
  </svg>
);

export const TikTok = (p: P) => (
  <svg {...base} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14 3.5v11.3a3.9 3.9 0 1 1-3.9-3.9" />
    <path d="M14 3.5c.4 2.7 2.3 4.6 5 4.8" />
  </svg>
);

export const XMark = (p: P) => (
  <svg {...base} strokeLinejoin="round" {...p}>
    <path d="M4.5 4h4.3l10.7 16h-4.3z" />
    <path d="M19 4l-6.2 7.1M11.2 12.9 5 20" />
  </svg>
);

export const Threads = (p: P) => (
  <svg {...base} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M17.6 8.3C16.6 5.5 14.4 4 11.6 4 7.4 4 5 7.2 5 12s2.4 8 6.7 8c3.2 0 5.6-1.9 5.8-4.7.2-2.6-1.7-4.2-4.7-4.2-2.4 0-3.9 1.1-3.9 2.7 0 1.5 1.2 2.4 2.8 2.4 2.6 0 3.8-2 3.8-5.6" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg {...base} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
    <path d="M15.5 8h-1.6c-1.3 0-2.2.9-2.2 2.2v10.3M9.5 13h5.5" />
  </svg>
);

export const Spotify = (p: P) => (
  <svg {...base} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M7.4 9.6c3-1 6.6-.8 9.3.8M8 12.7c2.5-.7 5.2-.5 7.4.8M8.6 15.5c1.9-.5 3.9-.3 5.6.6" />
  </svg>
);

export const Crown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 17 3 7l5 4 4-6 4 6 5-4-1 10z" />
    <path d="M5 20h14" />
  </svg>
);

export const Chat = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
);

export const Send = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h14M12 6l6 6-6 6" />
  </svg>
);

export const NewChat = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5H5v14h14v-7" />
    <path d="M17 3v6M14 6h6" />
  </svg>
);

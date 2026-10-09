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

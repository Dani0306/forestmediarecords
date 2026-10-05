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

export const Hammer = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13 4h6v5h-6zM13 6.5H9.5L8 5" />
    <path d="M15 9 6 20l-2-2 9-9" />
  </svg>
);

/** Play mark used for Kick links (not the Kick logo). */
export const Broadcast = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 5h16v11H4zM9 20h6" />
    <path d="M10.5 8.5v4l3.5-2z" fill="currentColor" />
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

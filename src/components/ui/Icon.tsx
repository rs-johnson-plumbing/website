import type { IconName } from "@/lib/content";
import { stroke } from "@/styles/tokens";

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  /** Fill instead of stroke (used for the star in the trust line). */
  filled?: boolean;
};

/**
 * One outline icon set, ported from the Claude Design export. Every icon is a
 * 24x24 viewBox drawn at 1.6 stroke so the whole site shares one weight.
 */
const paths: Record<IconName, React.ReactNode> = {
  star: <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6z" />,
  shield: <path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6z" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  "water-heater": (
    <>
      <rect x="7" y="3" width="10" height="18" rx="4" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </>
  ),
  drop: <path d="M12 3c3 4 6 7.5 6 11a6 6 0 1 1-12 0c0-3.5 3-7 6-11z" />,
  filter: <path d="M4 5h16l-6 8v6l-4 2v-8z" />,
  drain: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 9l4 4-4 4M16 9l-4 4 4 4" />
    </>
  ),
  faucet: (
    <>
      <path d="M5 12h9a3 3 0 0 1 3 3v1H8" />
      <circle cx="17" cy="8" r="2" />
      <path d="M17 10v2" />
    </>
  ),
  tub: (
    <>
      <rect x="4" y="13" width="16" height="6" rx="2" />
      <path d="M6 13V9a2 2 0 0 1 2-2" />
    </>
  ),
  gas: (
    <>
      <line x1="4" y1="15" x2="14" y2="15" />
      <circle cx="17" cy="15" r="3" />
      <line x1="20" y1="15" x2="20" y2="9" />
    </>
  ),
  pump: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v6M9 21h6" />
    </>
  ),
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V4h8l10 10-8 8z" />
      <circle cx="7.5" cy="8.5" r="1.5" />
    </>
  ),
  sparkle: <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />,
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  message: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9h8M8 12.5h5" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </>
  ),
};

export function Icon({ name, size = 18, className, strokeWidth = stroke.icon, filled = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

/** Light-blue circle behind an icon, as in the trust bar. */
export function IconCircle({ name, size = 34 }: { name: IconName; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue"
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={Math.round(size * 0.53)} />
    </span>
  );
}

/** Light-blue rounded square behind an icon, as on service cards. */
export function IconTile({ name, size = 40 }: { name: IconName; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-tile bg-blue-tint text-blue"
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={Math.round(size * 0.5)} />
    </span>
  );
}

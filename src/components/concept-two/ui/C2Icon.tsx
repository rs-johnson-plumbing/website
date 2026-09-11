import type { ReactNode } from "react";

/**
 * Concept 2's own icon set: one 24x24 grid, 1.7 stroke, round joins, drawn to
 * match the line weight in the visual authority. Concept 1 keeps its own set.
 */
export type C2IconName =
  | "arrow-right"
  | "arrow-left"
  | "phone"
  | "phone-heart"
  | "message"
  | "calendar"
  | "menu"
  | "close"
  | "star"
  | "house"
  | "users"
  | "shield"
  | "shield-check"
  | "tag"
  | "clock"
  | "wrench"
  | "hammer"
  | "hard-hat"
  | "check"
  | "map-pin"
  | "chevron-right";

const paths: Record<C2IconName, ReactNode> = {
  "arrow-right": <path d="M4 12h15m-6-6 6 6-6 6" />,
  "arrow-left": <path d="M20 12H5m6-6-6 6 6 6" />,
  phone: <path d="M5 4h3.6l1.8 4.5-2.3 1.4a11.5 11.5 0 0 0 5.2 5.2l1.4-2.3L19.3 15v3.5a1.7 1.7 0 0 1-1.9 1.7A15.6 15.6 0 0 1 3.3 5.9 1.7 1.7 0 0 1 5 4Z" />,
  "phone-heart": (
    <>
      <path d="M4.5 4.2h3.2l1.7 4.2-2.1 1.3a10.8 10.8 0 0 0 4.8 4.8l1.3-2.1 4.2 1.7v3.2a1.6 1.6 0 0 1-1.7 1.6A14.6 14.6 0 0 1 2.9 5.9a1.6 1.6 0 0 1 1.6-1.7Z" />
      <path d="M18.4 3.2c1-1 2.6-.9 3.4.2.7 1 .5 2.3-.4 3.1L18.6 9l-2.8-2.5c-.9-.8-1.1-2.1-.4-3.1.8-1.1 2.4-1.2 3.4-.2Z" fill="#0876D1" stroke="#0876D1" />
    </>
  ),
  message: (
    <>
      <path d="M4 5.5h16v10.5H9.5L5.5 19.5V16H4Z" />
      <path d="M8.5 9.5h7M8.5 12.5h4.5" stroke="#0876D1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3.2v3.6M16 3.2v3.6" />
      <rect x="7" y="12.5" width="4" height="3.5" rx="1" fill="#0876D1" stroke="none" />
    </>
  ),
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M5.5 5.5l13 13m0-13-13 13" />,
  star: <path d="M12 3.2l2.7 5.9 6.4.6-4.8 4.3 1.4 6.3-5.7-3.4-5.7 3.4 1.4-6.3L2.9 9.7l6.4-.6Z" />,
  house: (
    <>
      <path d="M3.6 10.6 12 3.8l8.4 6.8V20a.9.9 0 0 1-.9.9h-15a.9.9 0 0 1-.9-.9Z" />
      <path d="M9.6 20.9v-6.4h4.8v6.4" stroke="#0876D1" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="16.7" cy="9" r="2.6" />
      <path d="M3.8 19.5v-1.2c0-3.1 2.4-5.5 5.4-5.5s5.4 2.4 5.4 5.5v1.2" />
      <path d="M14.2 14.4c.7-.4 1.6-.6 2.5-.6 2.4 0 4.3 1.9 4.3 4.3v1.4" stroke="#0876D1" />
    </>
  ),
  shield: <path d="M12 2.9 20 6v6.2c0 4.8-3.2 7.9-8 9.1-4.8-1.2-8-4.3-8-9.1V6Z" />,
  "shield-check": (
    <>
      <path d="M12 2.9 20 6v6.2c0 4.8-3.2 7.9-8 9.1-4.8-1.2-8-4.3-8-9.1V6Z" />
      <path d="m8.6 11.9 2.5 2.5 4.5-4.6" stroke="#0876D1" strokeWidth="2" />
    </>
  ),
  tag: (
    <>
      <path d="M11.3 2.9H21v9.7l-9.4 9.4a1.4 1.4 0 0 1-2 0l-7.7-7.7a1.4 1.4 0 0 1 0-2Z" />
      <circle cx="16.9" cy="7.1" r="1.7" fill="#0876D1" stroke="#0876D1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9.1" />
      <path d="M12 6.6V12l3.8 2.4" stroke="#0876D1" />
    </>
  ),
  wrench: <path d="M15.2 3.4a5 5 0 0 0-5.5 6.6L3 16.7l2.9 2.9 6.7-6.7a5 5 0 0 0 6.6-5.5l-2.8 2.8-2.8-2.8Z" />,
  hammer: (
    <>
      <path d="M13.7 8.3 4.6 17.4a1.9 1.9 0 0 0 2.7 2.7l9.1-9.1" />
      <path d="M12.2 3.4 21 12.2l-2.5 2.5-1.6-1.6-3.7-3.7-1.6-1.6Z" />
    </>
  ),
  "hard-hat": (
    <>
      <path d="M13.7 8.3 4.6 17.4a1.9 1.9 0 0 0 2.7 2.7l9.1-9.1" />
      <path d="M12.2 3.4 21 12.2l-2.5 2.5-1.6-1.6-3.7-3.7-1.6-1.6Z" />
    </>
  ),
  check: <path d="m5 12.6 4.5 4.4L19 7.4" strokeWidth="2" />,
  "map-pin": (
    <>
      <path d="M12 21.4s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10.2" r="2.6" stroke="#0876D1" />
    </>
  ),
  "chevron-right": <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
};

export function C2Icon({ name, size = 20, className }: { name: C2IconName; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

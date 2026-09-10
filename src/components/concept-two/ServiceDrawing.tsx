import type { ReactNode } from "react";
import { colors } from "@/styles/tokens";

/** A separate, consistent line-art family for Concept 2. */
const drawings: Record<string, ReactNode> = {
  heater: <>
    <path d="M33 21v-9m26 9v-9M30 20h32a6 6 0 0 1 6 6v48a7 7 0 0 1-7 7H31a7 7 0 0 1-7-7V26a6 6 0 0 1 6-6Z" />
    <path d="M24 32h44M32 81v5m28-5v5" />
    <circle cx="46" cy="48" r="7" /><path d="m46 48 3-3" />
    <path d="M46 61c0 5-6 6-6 11a6 6 0 0 0 12 0c0-5-6-6-6-11Z" fill={colors.blueTint} stroke={colors.blue} />
    <path d="M76 32c4 5 4 10 0 15m6-19c6 8 6 17 0 25" stroke={colors.blue} />
  </>,
  leaks: <>
    <path d="M12 31h26v11h20V31h26M12 47h19v11h34V47h19" />
    <rect x="9" y="26" width="8" height="27" rx="2" fill={colors.offwhite} />
    <rect x="79" y="26" width="8" height="27" rx="2" fill={colors.offwhite} />
    <path d="m46 42-4 8 7 4-4 4" stroke={colors.blue} />
    <path d="M46 65c0 4-5 6-5 10a5 5 0 0 0 10 0c0-4-5-6-5-10Z" fill={colors.blueTint} stroke={colors.blue} />
    <path d="M31 76h-8m38 0h8" stroke={colors.blue} />
  </>,
  drains: <>
    <ellipse cx="45" cy="49" rx="29" ry="26" /><ellipse cx="45" cy="49" rx="20" ry="18" />
    <path d="M34 41h22M30 49h30M34 57h22m-17-23v29m12-29v29" />
    <path d="M69 22c8 1 14 8 14 16m-6-5 6 6 5-6M22 76c-8-1-14-8-14-16m-5 5 5-6 6 6" stroke={colors.blue} />
  </>,
  fixtures: <>
    <path d="M23 48V26c0-12 22-12 22 0v5M18 48h12M39 31h12M22 41h10v7" />
    <path d="M11 53h46l-5 15H16l-5-15Zm20 15v12" />
    <path d="M65 33h17v23H65zm-5 23h28v6c0 9-8 15-17 13l-3 7h14M71 39h5" />
    <path d="M45 37v6m0 4v1" stroke={colors.blue} />
  </>,
  remodels: <>
    <path d="M14 43V23c0-10 16-10 16 0v5M24 28h12M9 47h77v7a22 22 0 0 1-22 22H31A22 22 0 0 1 9 54v-7Zm13 27-4 8m55-8 4 8" />
    <path d="M11 54h73M30 35v4" />
    <path d="M68 13v16m-8-8h16m4 11v8m-4-4h8" stroke={colors.blue} />
  </>,
  other: <>
    <path d="m32 42 24 25m7-29L36 72a6 6 0 0 1-9-8l30-31a16 16 0 0 1 21-19L67 25l7 7 11-11a16 16 0 0 1-22 17Z" />
    <path d="m26 21 9 10-6 6-10-9-5-12 12 5Z" />
    <path d="m57 62 10 10a5 5 0 0 0 7-7l-9-10" />
    <circle cx="31" cy="68" r="1" fill={colors.blue} stroke={colors.blue} />
    <path d="M15 46v10m-5-5h10" stroke={colors.blue} />
  </>,
};

export function ServiceDrawing({ id }: { id: string }) {
  return <svg viewBox="0 0 96 96" fill="none" stroke={colors.blueDark} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawings[id]}</svg>;
}

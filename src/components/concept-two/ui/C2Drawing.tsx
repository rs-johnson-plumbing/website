import type { ReactNode } from "react";

const NAVY = "#0D2A4D";
const BLUE = "#2868A8";
/** The brushed-metal fill the authority gives every pipe, tank and fitting. */
const METAL = "#E8E9EA";

/** A solid blue drop, tip at (x, y). */
function Drop({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d="M0 -11c0 0-7 8-7 13a7 7 0 0 0 14 0c0-5-7-13-7-13z"
      transform={`translate(${x} ${y + 11}) scale(${s})`}
      fill={BLUE}
      stroke="none"
    />
  );
}

/**
 * A run of pipe: the navy outline first, the metal core over it, which gives
 * an outlined tube of any shape from one path.
 */
function Tube({ d, w = 19 }: { d: string; w?: number }) {
  return (
    <>
      <path d={d} stroke={NAVY} strokeWidth={w} />
      <path d={d} stroke={METAL} strokeWidth={w - 6.6} />
    </>
  );
}

/**
 * Concept 2 service illustrations, drawn to the authority's icon style: a
 * thick navy outline, a light metal fill, and water, flame and the one
 * working part in brand blue. One 96 grid.
 */
const drawings: Record<string, ReactNode> = {
  // Water heater: upright tank, gauge, drop at the base.
  heater: (
    <>
      <rect x="40" y="7" width="15" height="12" rx="3.5" fill={METAL} />
      <rect x="23" y="18" width="50" height="61" rx="13" fill={METAL} />
      <path d="M23 35h50" />
      <circle cx="44" cy="53" r="8.5" fill="#fff" />
      <path d="M44 53l5-4.5" strokeWidth="2.8" />
      <path d="M33 79v8M63 79v8" />
      <Drop x={35} y={57} s={0.85} />
    </>
  ),
  // Leaks: a run of pipe between two flanges, split and dripping.
  leaks: (
    <>
      <rect x="17" y="35" width="62" height="25" rx="5" fill={METAL} />
      <rect x="9" y="28" width="13" height="39" rx="4" fill={METAL} />
      <rect x="74" y="28" width="13" height="39" rx="4" fill={METAL} />
      <path d="M45 35l6 11-10 4 6 10" stroke={BLUE} strokeWidth="4" />
      <Drop x={48} y={67} s={1.1} />
    </>
  ),
  // Drains and sewer: a P-trap with a blue outlet.
  drains: (
    <>
      <rect x="20" y="7" width="21" height="10" rx="3.5" fill={METAL} />
      <Tube d="M30.5 17v22a17.5 17.5 0 0 0 35 0v-7" />
      <path d="M65.5 32h13" stroke={NAVY} strokeWidth="19" />
      <path d="M65.5 32h13" stroke={BLUE} strokeWidth="12.4" />
      <rect x="76" y="21" width="11" height="22" rx="3" fill={BLUE} stroke={NAVY} />
      <Drop x={48} y={68} s={0.85} />
    </>
  ),
  // Toilets and faucets: a faucet with a blue lever, dripping.
  fixtures: (
    <>
      <rect x="16" y="78" width="42" height="10" rx="4" fill={METAL} />
      <Tube d="M37 78V40" w={22} />
      <Tube d="M37 42h16a13 13 0 0 1 13 13v9" w={18} />
      <rect x="23" y="22" width="28" height="13" rx="6.5" fill={BLUE} stroke={NAVY} />
      <path d="M37 35v7" strokeWidth="7" />
      <Drop x={66} y={70} s={0.95} />
    </>
  ),
  // Remodels: a shower head with spray.
  remodels: (
    <>
      <path d="M16 14h12a30 30 0 0 1 30 30" strokeWidth="7" />
      <path d="M30 47a28 28 0 0 1 56 0Z" fill={METAL} />
      <rect x="27" y="45" width="62" height="10" rx="5" fill={METAL} />
      <path d="M40 62v13m9-13v18m9-18v13m9-13v18m9-18v13" stroke={BLUE} strokeWidth="4" />
    </>
  ),
  // Other plumbing: a wrench crossed with a screwdriver.
  other: (
    <>
      {/* ring spanner, corner to corner */}
      <g transform="rotate(-45 48 48)">
        <rect x="42" y="32" width="13" height="49" rx="5" fill={METAL} />
        <circle cx="48.5" cy="27" r="15" fill={METAL} />
        <circle cx="48.5" cy="27" r="6.5" fill="#fff" />
      </g>
      {/* screwdriver across it, blue handle */}
      <g transform="rotate(45 48 48)">
        <rect x="41" y="12" width="15" height="27" rx="6" fill={BLUE} stroke={NAVY} />
        <rect x="44.5" y="39" width="8" height="33" rx="1.5" fill={METAL} />
        <path d="M43.5 72h10v10h-10z" fill={METAL} />
      </g>
    </>
  ),
  // Water softener: brine tank with a control head.
  softener: (
    <>
      <rect x="24" y="25" width="48" height="56" rx="10" fill={METAL} />
      <path d="M37 25v-9h22v9" />
      <path d="M24 41h48" />
      <path d="M38 57h20m-20 11h20" stroke={BLUE} strokeWidth="4" />
      <rect x="73" y="32" width="12" height="17" rx="3" fill={BLUE} stroke={NAVY} />
    </>
  ),
  // Gas lines: a run of pipe feeding a burner flame.
  gas: (
    <>
      <Tube d="M12 70h30" />
      <rect x="40" y="60" width="19" height="19" rx="4" fill={METAL} />
      <Tube d="M59 70h25" />
      <path d="M50 48c9-7 9-15 4-21 10 5 15 14 9 23-4 6-13 6-16 1-2-3-1-7 3-9Z" fill={BLUE} stroke={NAVY} />
    </>
  ),
  // Sump pumps: a basin, pump body, discharge line.
  pump: (
    <>
      <path d="M15 43h48v34a6 6 0 0 1-6 6H21a6 6 0 0 1-6-6Z" fill={METAL} />
      <rect x="27" y="52" width="24" height="27" rx="5" fill="#fff" />
      <Tube d="M39 52V30h32v-8" w={15} />
      <rect x="63" y="11" width="16" height="12" rx="3" fill={BLUE} stroke={NAVY} />
      <path d="M20 61h5m0 11h-5" stroke={BLUE} strokeWidth="4" />
    </>
  ),
  // Emergency: a burst pipe under pressure.
  emergency: (
    <>
      <rect x="17" y="36" width="24" height="24" rx="5" fill={METAL} />
      <rect x="55" y="36" width="24" height="24" rx="5" fill={METAL} />
      <rect x="8" y="29" width="12" height="38" rx="4" fill={METAL} />
      <rect x="76" y="29" width="12" height="38" rx="4" fill={METAL} />
      <path d="M52 17 39 48h11l-6 30 21-33H53l7-28Z" fill={BLUE} stroke={NAVY} />
    </>
  ),
  // Builder: underground, drain lines under the slab.
  underground: (
    <>
      <path d="M8 31h80" strokeWidth="5" />
      <Tube d="M26 31v19a12 12 0 0 0 12 12h20a12 12 0 0 0 12-12V31" />
      <Tube d="M48 62v20" w={15} />
      <path d="M14 84h68" stroke={BLUE} strokeWidth="4.5" strokeDasharray="7 8" />
    </>
  ),
  // Builder: rough-in through the framing.
  roughin: (
    <>
      <path d="M14 11v74m22-74v74m22-74v74m22-74v74" strokeWidth="5" />
      <Tube d="M24 27h48a8 8 0 0 1 8 8v13" w={15} />
      <path d="M24 27h48a8 8 0 0 1 8 8v13" stroke={BLUE} strokeWidth="8.4" />
      <Tube d="M24 71h30a8 8 0 0 0 8-8V52" w={15} />
      <path d="M24 71h30a8 8 0 0 0 8-8V52" stroke={BLUE} strokeWidth="8.4" />
    </>
  ),
  // Builder: trim and fixture set.
  trim: (
    <>
      <rect x="10" y="74" width="32" height="9" rx="4" fill={METAL} />
      <Tube d="M28 74V46c0-12-13-16-19-9" w={17} />
      <rect x="50" y="26" width="36" height="52" rx="6" fill={METAL} />
      <path d="M58 41h20m-20 13h20m-20 13h10" stroke={BLUE} strokeWidth="4" />
    </>
  ),
  // Builder: plans and takeoffs.
  plans: (
    <>
      <path d="M16 12h46l18 18v54H16Z" fill={METAL} />
      <path d="M62 12v18h18" />
      <path d="M28 46h32m-32 13h32m-32 13h18" stroke={BLUE} strokeWidth="4" />
    </>
  ),
  // Builder: water service and sewer tie-in.
  service: (
    <>
      <Tube d="M8 58h32a9 9 0 0 0 9-9V29a9 9 0 0 1 9-9h20" />
      <rect x="70" y="10" width="16" height="21" rx="4" fill={BLUE} stroke={NAVY} />
      <path d="M14 78h68" stroke={BLUE} strokeWidth="4.5" strokeDasharray="7 8" />
    </>
  ),
};

export function C2Drawing({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke={NAVY}
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {drawings[id] ?? drawings.other}
    </svg>
  );
}

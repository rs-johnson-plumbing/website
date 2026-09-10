import type { ReactNode } from "react";

const NAVY = "#0D2A4D";
const BLUE = "#2868A8";
const TINT = "#E4ECF6";

/**
 * Concept 2 service illustrations: one 96x96 grid, navy outline at 2.2, with
 * water, flame, and the one working part picked out in brand blue. Drawn to
 * the icon style shown in the visual authority.
 */
const drawings: Record<string, ReactNode> = {
  // Water heater: upright tank, dial, top connections, a drop at the base.
  heater: (
    <>
      <path d="M36 18V9m24 9V9" />
      <rect x="28" y="18" width="40" height="52" rx="10" />
      <path d="M28 30h40" />
      <path d="M36 70v9m24-9v9" />
      <circle cx="48" cy="44" r="7" />
      <path d="M48 44v-4" />
      <path d="M48 62c0 4.5-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-6.5-6-11Z" fill={TINT} stroke={BLUE} />
    </>
  ),
  // Leaks: a run of pipe between two flanges, split, dripping.
  leaks: (
    <>
      <path d="M18 36h60v22H18z" />
      <rect x="12" y="29" width="9" height="36" rx="2" />
      <rect x="75" y="29" width="9" height="36" rx="2" />
      <path d="m46 36 5 10-8 4 5 8" stroke={BLUE} />
      <path d="M48 68c0 3.5-5 5-5 9a5 5 0 0 0 10 0c0-4-5-5.5-5-9Z" fill={TINT} stroke={BLUE} />
    </>
  ),
  // Drains and sewer: a P-trap, with the outlet picked out in blue.
  drains: (
    <>
      <rect x="21" y="8" width="18" height="7" rx="2" />
      <path d="M30 15v30a18 18 0 0 0 36 0v-9h14" />
      <rect x="76" y="29" width="8" height="14" rx="2" fill={TINT} stroke={BLUE} />
      <path d="M40 66c0 4-5 5.5-5 9.5a5 5 0 0 0 10 0c0-4-5-5.5-5-9.5Z" fill={TINT} stroke={BLUE} />
    </>
  ),
  // Toilets and faucets: a gooseneck faucet over a basin edge, dripping.
  fixtures: (
    <>
      <path d="M24 76h46" />
      <path d="M56 76V36" />
      <path d="M56 36c0-13-14-19-24-11-3.5 3-5.5 7.5-5.5 13v6" />
      <path d="M44 22h24" />
      <path d="M26 58c0 4-5 5.5-5 9.5a5 5 0 0 0 10 0c0-4-5-5.5-5-9.5Z" fill={TINT} stroke={BLUE} />
    </>
  ),
  // Remodels: a shower head with spray.
  remodels: (
    <>
      <path d="M48 12v12" />
      <path d="M25 47a23 23 0 0 1 46 0Z" />
      <path d="M34 57v13m9-13v18m10-18v13m9-13v9" stroke={BLUE} strokeDasharray="5 6" />
    </>
  ),
  // Other plumbing: crossed wrench and screwdriver.
  other: (
    <>
      <path d="M71 16A14 14 0 0 0 53.6 33.6L23 64.2l8.8 8.8 30.6-30.6A14 14 0 0 0 80 25l-8.6 8.6-6.8-6.8L71 16Z" />
      <path d="m17 17 10 3 5 9-5 5-9-5-3-10Z" fill={TINT} stroke={BLUE} />
      <path d="m30 32 26 26" />
      <path d="m55 57 9 9a4.5 4.5 0 0 1-6.4 6.4l-9-9Z" />
    </>
  ),
  // Water softener: brine tank with a control head.
  softener: (
    <>
      <rect x="26" y="26" width="44" height="54" rx="8" />
      <path d="M38 26v-8h20v8" />
      <path d="M26 40h44" />
      <path d="M40 56h16m-16 10h16" stroke={BLUE} />
      <rect x="74" y="34" width="10" height="14" rx="2" fill={TINT} stroke={BLUE} />
    </>
  ),
  // Gas lines: a run of pipe feeding a burner flame.
  gas: (
    <>
      <path d="M12 70h30" />
      <rect x="42" y="62" width="16" height="16" rx="3" />
      <path d="M58 70h26M84 70V48" />
      <path d="M50 48c8-6 8-13 4-18 9 4 13 12 8 20-3 5-11 5-14 1-2-3-1-6 2-8Z" fill={TINT} stroke={BLUE} />
    </>
  ),
  // Sump pumps: a basin, pump body, discharge line.
  pump: (
    <>
      <path d="M16 44h46v34a5 5 0 0 1-5 5H21a5 5 0 0 1-5-5Z" />
      <rect x="29" y="54" width="20" height="24" rx="4" />
      <path d="M39 54V32h32v-8" />
      <rect x="64" y="14" width="14" height="10" rx="2" fill={TINT} stroke={BLUE} />
      <path d="M22 62h4m0 10h-4" stroke={BLUE} />
    </>
  ),
  // Emergency: a burst pipe under pressure.
  emergency: (
    <>
      <path d="M18 38h22M56 38h22M18 62h22M56 62h22" />
      <rect x="10" y="31" width="9" height="38" rx="2" />
      <rect x="77" y="31" width="9" height="38" rx="2" />
      <path d="M52 20 40 48h10l-6 28 20-32H52l8-24Z" fill={TINT} stroke={BLUE} />
    </>
  ),
  // Builder: underground rough, drain lines under the slab.
  underground: (
    <>
      <path d="M8 32h80" />
      <path d="M26 32v20a11 11 0 0 0 11 11h22a11 11 0 0 0 11-11V32" />
      <path d="M48 63v19" />
      <path d="M14 82h68" stroke={BLUE} strokeDasharray="6 7" />
    </>
  ),
  // Builder: rough-in through the framing.
  roughin: (
    <>
      <path d="M14 12v72m22-72v72m22-72v72m22-72v72" />
      <path d="M25 26h46a7 7 0 0 1 7 7v13" stroke={BLUE} />
      <path d="M25 70h30a7 7 0 0 0 7-7V52" stroke={BLUE} />
    </>
  ),
  // Builder: trim and fixture set.
  trim: (
    <>
      <path d="M12 78h28" />
      <path d="M32 78V44c0-11-14-15-20-8" />
      <rect x="52" y="30" width="32" height="48" rx="5" />
      <path d="M60 44h16m-16 12h16m-16 12h8" stroke={BLUE} />
    </>
  ),
  // Builder: plans and takeoffs.
  plans: (
    <>
      <path d="M16 14h48l16 16v52H16Z" />
      <path d="M64 14v16h16" />
      <path d="M28 46h30m-30 12h30m-30 12h18" stroke={BLUE} />
    </>
  ),
  // Builder: water service and sewer tie-in.
  service: (
    <>
      <path d="M8 58h34a8 8 0 0 0 8-8V30a8 8 0 0 1 8-8h22" />
      <rect x="72" y="14" width="14" height="16" rx="2" fill={TINT} stroke={BLUE} />
      <path d="M14 76h68" stroke={BLUE} strokeDasharray="6 7" />
    </>
  ),
};

export function C2Drawing({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {/* The authority's icons fill their tile; the drawings are keyed to a
          96 grid with margin, so scale the whole group about its centre. */}
      <g transform="translate(48 48) scale(1.16) translate(-48 -48)">{drawings[id] ?? drawings.other}</g>
    </svg>
  );
}

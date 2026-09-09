/**
 * Cartoon service illustrations, one per service slug. Rounded shapes, one
 * charcoal outline weight, brand teal for water, flame, and fittings,
 * off-white fills, all on the same light-teal disc. Pure SVG so they scale
 * from a 64px tile to a truck door.
 */
const C = "#2B2B2B";
const B = "#3F6C78";
const T = "#E3EEF0";
const O = "#F7F5F0";
const W = "#FFFFFF";
const H = "#E3DFD5";

const art: Record<string, React.ReactNode> = {
  "water-heaters": (
    <>
      <path d="M62 22 v14 M98 22 v14" stroke={C} strokeWidth="5" />
      <rect x="46" y="36" width="68" height="92" rx="14" fill={O} stroke={C} strokeWidth="4" />
      <rect x="46" y="36" width="68" height="20" rx="10" fill={B} stroke={C} strokeWidth="4" />
      <circle cx="80" cy="86" r="11" fill={W} stroke={C} strokeWidth="4" />
      <path d="M80 86 l6 -6" stroke={C} strokeWidth="3" />
      <path d="M70 128 c0 -8 4 -10 6 -14 c2 6 8 8 8 14 c0 6 -4 9 -7 9 c-3 0 -7 -3 -7 -9z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M70 132 h20" stroke={C} strokeWidth="4" />
      <path d="M124 60 c6 -4 6 -10 0 -14 M132 68 c8 -6 8 -16 0 -22" stroke={B} strokeWidth="4" />
    </>
  ),
  "leaks-and-repairs": (
    <>
      <rect x="22" y="58" width="116" height="26" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <rect x="16" y="52" width="14" height="38" rx="3" fill={B} stroke={C} strokeWidth="4" />
      <rect x="130" y="52" width="14" height="38" rx="3" fill={B} stroke={C} strokeWidth="4" />
      <path d="M74 58 l6 9 l-6 8 l6 9" stroke={C} strokeWidth="3" />
      <path d="M80 98 c0 -6 4 -8 5 -11 c1 3 5 5 5 11 a5 5 0 0 1 -10 0z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M66 118 c0 -6 4 -8 5 -11 c1 3 5 5 5 11 a5 5 0 0 1 -10 0z" fill={B} stroke={C} strokeWidth="3" />
      <g transform="rotate(-35 116 118)">
        <rect x="98" y="112" width="40" height="12" rx="4" fill={C} />
        <path d="M132 104 a14 14 0 1 1 0 28 l-6 -6 v-16 z" fill={C} />
        <path d="M132 112 h10 v12 h-10z" fill={T} />
      </g>
    </>
  ),
  "drains-and-sewer": (
    <>
      <circle cx="80" cy="84" r="40" fill={O} stroke={C} strokeWidth="4" />
      <circle cx="80" cy="84" r="30" fill={W} stroke={C} strokeWidth="3" />
      <path d="M62 84 h36 M80 66 v36 M68 72 l24 24 M92 72 l-24 24" stroke={C} strokeWidth="3" />
      <path d="M104 46 c-10 -10 -34 -10 -44 4 c-8 12 0 26 12 24" stroke={B} strokeWidth="6" />
      <path d="M112 60 c8 -2 12 -12 10 -20" stroke={B} strokeWidth="5" />
      <circle cx="120" cy="34" r="4" fill={B} />
      <circle cx="130" cy="46" r="3" fill={B} />
      <circle cx="44" cy="40" r="3" fill={B} />
    </>
  ),
  "toilets-and-faucets": (
    <>
      <rect x="52" y="112" width="56" height="12" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <rect x="70" y="74" width="20" height="40" rx="5" fill={O} stroke={C} strokeWidth="4" />
      <path d="M80 74 v-16 c0 -14 10 -22 26 -22 h4 v18 h-4 c-6 0 -8 2 -8 6 v6" stroke={C} strokeWidth="4" fill={O} />
      <rect x="60" y="54" width="20" height="12" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="56" y="46" width="28" height="10" rx="5" fill={B} stroke={C} strokeWidth="3" />
      <path d="M104 68 c0 -6 4 -8 5 -11 c1 3 5 5 5 11 a5 5 0 0 1 -10 0z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M100 92 c2 6 8 8 12 6" stroke={B} strokeWidth="4" />
    </>
  ),
  "bath-and-kitchen-remodel": (
    <>
      <g stroke={H} strokeWidth="2" fill={W}>
        <rect x="28" y="24" width="24" height="24" />
        <rect x="52" y="24" width="24" height="24" />
        <rect x="76" y="24" width="24" height="24" />
        <rect x="100" y="24" width="24" height="24" />
        <rect x="40" y="48" width="24" height="24" />
        <rect x="64" y="48" width="24" height="24" />
        <rect x="88" y="48" width="24" height="24" />
      </g>
      <path d="M30 84 h100 v18 c0 14 -10 24 -24 24 h-52 c-14 0 -24 -10 -24 -24z" fill={O} stroke={C} strokeWidth="4" />
      <rect x="24" y="78" width="112" height="10" rx="5" fill={B} stroke={C} strokeWidth="3" />
      <path d="M40 96 c8 -6 16 6 24 0 c8 -6 16 6 24 0 c8 -6 16 6 24 0" stroke={B} strokeWidth="4" />
      <path d="M44 126 v10 M116 126 v10" stroke={C} strokeWidth="5" />
      <path d="M118 78 v-20 c0 -8 6 -12 12 -12" stroke={C} strokeWidth="4" />
      <circle cx="130" cy="46" r="5" fill={B} stroke={C} strokeWidth="3" />
    </>
  ),
  "water-softeners": (
    <>
      {/* resin tank with a control head, brine tank beside it */}
      <rect x="40" y="46" width="44" height="86" rx="12" fill={O} stroke={C} strokeWidth="4" />
      <rect x="34" y="30" width="56" height="22" rx="7" fill={B} stroke={C} strokeWidth="4" />
      <circle cx="62" cy="41" r="4" fill={W} />
      <rect x="94" y="70" width="40" height="62" rx="8" fill={W} stroke={C} strokeWidth="4" />
      <rect x="90" y="62" width="48" height="12" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <path d="M100 118 h28" stroke={B} strokeWidth="4" opacity="0.5" />
      <path d="M84 40 h30 v22" stroke={C} strokeWidth="4" />
      {/* soft water drop */}
      <path d="M62 78 c6 8 10 14 10 20 a10 10 0 0 1 -20 0 c0 -6 4 -12 10 -20z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M52 112 h20" stroke={C} strokeWidth="3" opacity="0.4" />
    </>
  ),
  "gas-lines": (
    <>
      <rect x="22" y="94" width="116" height="20" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <rect x="16" y="88" width="12" height="32" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="132" y="88" width="12" height="32" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <circle cx="80" cy="104" r="13" fill={W} stroke={C} strokeWidth="4" />
      <path d="M80 91 v-14 M68 77 h24" stroke={C} strokeWidth="5" />
      <path d="M80 68 c-12 -10 -14 -24 -4 -34 c0 8 6 10 6 10 c0 -8 6 -14 12 -18 c-2 10 8 14 8 26 c0 10 -8 18 -18 18 c-2 0 -3 0 -4 -2z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M82 60 c-4 -4 -4 -10 0 -14 c2 4 6 6 6 10 a4 4 0 0 1 -6 4z" fill={O} />
    </>
  ),
  "sump-pumps": (
    <>
      <path d="M40 60 v50 a40 20 0 0 0 80 0 v-50" fill={O} stroke={C} strokeWidth="4" />
      <ellipse cx="80" cy="60" rx="40" ry="12" fill={W} stroke={C} strokeWidth="4" />
      <path d="M44 96 c8 -6 16 6 24 0 c8 -6 16 6 24 0 c8 -6 16 6 24 0" stroke={B} strokeWidth="4" />
      <rect x="66" y="74" width="28" height="40" rx="6" fill={C} />
      <rect x="72" y="80" width="16" height="8" rx="2" fill={T} />
      <circle cx="108" cy="84" r="8" fill={B} stroke={C} strokeWidth="3" />
      <path d="M104 90 l-8 8" stroke={C} strokeWidth="3" />
      <path d="M80 74 v-30 h40" stroke={C} strokeWidth="6" />
      <path d="M80 74 v-30 h40" stroke={O} strokeWidth="2" />
      <path d="M124 38 c4 3 4 9 0 12" stroke={B} strokeWidth="4" />
    </>
  ),
  "emergency-plumbing": (
    <>
      <path d="M30 110 h50 v-40 h30" stroke={C} strokeWidth="22" />
      <path d="M30 110 h50 v-40 h30" stroke={O} strokeWidth="12" />
      <rect x="104" y="58" width="12" height="24" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="24" y="98" width="12" height="24" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <path d="M92 78 l6 -10 M100 84 l10 -6 M86 66 l-2 -12" stroke={B} strokeWidth="5" />
      <circle cx="120" cy="36" r="18" fill={B} stroke={C} strokeWidth="3" />
      <path d="M120 26 v12 M120 44 v1" stroke={W} strokeWidth="5" />
    </>
  ),
  "planning-and-takeoffs": (
    <>
      <path d="M40 28 h64 l20 20 v84 h-84z" fill={W} stroke={C} strokeWidth="4" />
      <path d="M104 28 v20 h20" fill={O} stroke={C} strokeWidth="4" />
      <path d="M54 66 h26 l14 -12 h20" stroke={B} strokeWidth="5" />
      <path d="M60 84 v28 h34" stroke={B} strokeWidth="5" />
      <circle cx="80" cy="66" r="4" fill={W} stroke={C} strokeWidth="3" />
      <circle cx="60" cy="84" r="4" fill={W} stroke={C} strokeWidth="3" />
      <circle cx="94" cy="112" r="4" fill={W} stroke={C} strokeWidth="3" />
      <path d="M54 96 h10 M54 104 h6" stroke={H} strokeWidth="3" />
      <g transform="rotate(-45 118 116)">
        <rect x="104" y="108" width="34" height="14" rx="3" fill={B} stroke={C} strokeWidth="3" />
        <path d="M138 108 l10 7 l-10 7z" fill={O} stroke={C} strokeWidth="3" />
        <path d="M104 108 v14" stroke={C} strokeWidth="3" />
      </g>
    </>
  ),
  underground: (
    <>
      <rect x="18" y="94" width="124" height="34" rx="6" fill={H} />
      <path d="M18 94 h124" stroke={C} strokeWidth="4" />
      <path d="M30 108 h6 M48 116 h6 M100 118 h6 M118 108 h6" stroke={C} strokeWidth="3" opacity="0.5" />
      <rect x="30" y="102" width="100" height="14" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <rect x="48" y="60" width="14" height="46" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="73" y="48" width="14" height="58" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="98" y="66" width="14" height="40" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="44" y="54" width="22" height="8" rx="2" fill={W} stroke={C} strokeWidth="3" />
      <rect x="69" y="42" width="22" height="8" rx="2" fill={W} stroke={C} strokeWidth="3" />
      <rect x="94" y="60" width="22" height="8" rx="2" fill={W} stroke={C} strokeWidth="3" />
      <path d="M24 86 h112" stroke={C} strokeWidth="3" strokeDasharray="6 6" opacity="0.5" />
    </>
  ),
  "rough-in": (
    <>
      <rect x="28" y="24" width="104" height="10" rx="2" fill={O} stroke={C} strokeWidth="3" />
      <rect x="28" y="126" width="104" height="10" rx="2" fill={O} stroke={C} strokeWidth="3" />
      <rect x="38" y="34" width="12" height="92" fill={O} stroke={C} strokeWidth="3" />
      <rect x="74" y="34" width="12" height="92" fill={O} stroke={C} strokeWidth="3" />
      <rect x="110" y="34" width="12" height="92" fill={O} stroke={C} strokeWidth="3" />
      <rect x="92" y="34" width="16" height="92" rx="3" fill={W} stroke={C} strokeWidth="4" />
      <path d="M92 76 h-14 a6 6 0 0 0 -6 6 v10" fill="none" stroke={C} strokeWidth="4" />
      <rect x="30" y="58" width="100" height="10" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="30" y="104" width="60" height="8" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <circle cx="60" cy="63" r="6" fill={W} stroke={C} strokeWidth="3" />
    </>
  ),
  "trim-and-fixture-set": (
    <>
      <rect x="26" y="100" width="108" height="12" rx="3" fill={O} stroke={C} strokeWidth="4" />
      <path d="M52 112 h56 v10 a12 12 0 0 1 -12 12 h-32 a12 12 0 0 1 -12 -12z" fill={W} stroke={C} strokeWidth="4" />
      <path d="M80 100 v-30 a14 14 0 0 1 14 -14 h4 a8 8 0 0 1 8 8 v6" fill="none" stroke={C} strokeWidth="6" />
      <path d="M80 100 v-30 a14 14 0 0 1 14 -14 h4 a8 8 0 0 1 8 8 v6" fill="none" stroke={W} strokeWidth="2" />
      <rect x="99" y="70" width="14" height="8" rx="2" fill={B} stroke={C} strokeWidth="3" />
      <rect x="60" y="86" width="12" height="14" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="88" y="86" width="12" height="14" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <path d="M106 82 v12" stroke={B} strokeWidth="4" />
      <path d="M40 46 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" fill={B} stroke={C} strokeWidth="2.5" />
      <path d="M120 36 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" fill={B} stroke={C} strokeWidth="2" />
    </>
  ),
  "water-and-sewer-tie-in": (
    <>
      <rect x="30" y="22" width="20" height="116" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <path d="M30 40 h20 M30 120 h20" stroke={C} strokeWidth="3" opacity="0.5" />
      <rect x="50" y="74" width="52" height="14" rx="3" fill={B} stroke={C} strokeWidth="4" />
      <rect x="46" y="68" width="10" height="26" rx="2" fill={O} stroke={C} strokeWidth="3" />
      <circle cx="116" cy="81" r="18" fill={W} stroke={C} strokeWidth="4" />
      <circle cx="116" cy="81" r="9" fill={O} stroke={C} strokeWidth="3" />
      <path d="M116 81 l5 -6" stroke={C} strokeWidth="3" />
      <path d="M78 74 v-10 M70 64 h16" stroke={C} strokeWidth="4" />
      <path d="M106 30 l14 -12 l14 12 v14 h-28z" fill={W} stroke={C} strokeWidth="3" />
      <path d="M116 44 v-8" stroke={B} strokeWidth="3" />
    </>
  ),
};

export function ServiceIllustration({ slug, className }: { slug: string; className?: string }) {
  const inner = art[slug];
  if (!inner) return null;
  return (
    <svg viewBox="0 0 160 160" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="80" cy="80" r="70" fill={T} />
      {inner}
    </svg>
  );
}

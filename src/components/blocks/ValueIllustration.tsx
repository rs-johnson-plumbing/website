import type { IconName } from "@/lib/content";
import { IconTile } from "@/components/ui/Icon";

/**
 * Cartoon illustrations for the value-prop cards ("You Talk to the
 * Plumber", "Price Before We Start", "We Show Up When We Say", and the
 * builder set) and the homeowner FAQ. Same style as ServiceIllustration: charcoal outline, brand
 * teal accents, off-white fills, light-teal disc. Keyed by the card's icon
 * name so content stays unchanged; falls back to the icon tile.
 */
const C = "#2B2B2B";
const B = "#3F6C78";
const T = "#E3EEF0";
const O = "#F7F5F0";
const W = "#FFFFFF";

const art: Partial<Record<IconName, React.ReactNode>> = {
  map: (
    <>
      {/* folded map with a pin */}
      <path d="M28 52 l34 -12 l36 12 l34 -12 v76 l-34 12 l-36 -12 l-34 12z" fill={W} stroke={C} strokeWidth="4" />
      <path d="M62 40 v76 M98 52 v76" stroke={C} strokeWidth="3" opacity="0.4" />
      <path d="M36 80 c14 -6 22 4 34 -2 c10 -6 20 2 30 -4" stroke={B} strokeWidth="4" strokeDasharray="7 6" />
      <path d="M104 22 c14 0 24 10 24 24 c0 18 -24 40 -24 40 s-24 -22 -24 -40 c0 -14 10 -24 24 -24z" fill={B} stroke={C} strokeWidth="4" />
      <circle cx="104" cy="46" r="8" fill={W} stroke={C} strokeWidth="3" />
    </>
  ),
  bolt: (
    <>
      {/* burst fitting with an alert */}
      <path d="M30 108 h44 v-40 h40" stroke={C} strokeWidth="22" />
      <path d="M30 108 h44 v-40 h40" stroke={O} strokeWidth="12" />
      <rect x="108" y="56" width="12" height="24" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="24" y="96" width="12" height="24" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <path d="M86 76 l6 -10 M94 82 l10 -6 M80 64 l-2 -12" stroke={B} strokeWidth="5" />
      <circle cx="120" cy="36" r="18" fill={B} stroke={C} strokeWidth="3" />
      <path d="M124 26 l-10 12 h8 l-4 10 l12 -14 h-8z" fill={W} />
    </>
  ),
  shield: (
    <>
      {/* license badge */}
      <path d="M80 26 l42 14 v34 c0 26 -18 44 -42 56 c-24 -12 -42 -30 -42 -56 v-34z" fill={O} stroke={C} strokeWidth="4" />
      <path d="M80 40 l30 10 v24 c0 20 -13 33 -30 42 c-17 -9 -30 -22 -30 -42 v-24z" fill={W} stroke={C} strokeWidth="3" />
      <path d="M64 82 l11 11 l22 -24" stroke={B} strokeWidth="6" />
      <rect x="62" y="112" width="36" height="10" rx="3" fill={B} stroke={C} strokeWidth="2" />
    </>
  ),
  building: (
    <>
      {/* rolled plans and a framed house */}
      <path d="M40 120 l40 -34 l40 34" fill={W} stroke={C} strokeWidth="4" />
      <path d="M52 110 v26 h56 v-26" fill={O} stroke={C} strokeWidth="4" />
      <path d="M62 110 v26 M74 110 v26 M86 110 v26 M98 110 v26" stroke={C} strokeWidth="3" opacity="0.35" />
      <path d="M80 86 v-8" stroke={C} strokeWidth="4" />
      <rect x="28" y="30" width="72" height="36" rx="6" fill={W} stroke={C} strokeWidth="4" />
      <path d="M38 42 h20 l8 8 h26 M38 54 h30" stroke={B} strokeWidth="4" />
      <rect x="100" y="24" width="14" height="48" rx="7" fill={B} stroke={C} strokeWidth="3" />
      <path d="M118 44 h14" stroke={C} strokeWidth="4" />
    </>
  ),
  "water-heater": (
    <>
      <path d="M62 24 v14 M98 24 v14" stroke={C} strokeWidth="5" />
      <rect x="46" y="38" width="68" height="92" rx="14" fill={O} stroke={C} strokeWidth="4" />
      <rect x="46" y="38" width="68" height="20" rx="10" fill={B} stroke={C} strokeWidth="4" />
      <circle cx="80" cy="88" r="11" fill={W} stroke={C} strokeWidth="4" />
      <path d="M80 88 l6 -6" stroke={C} strokeWidth="3" />
      <path d="M70 130 c0 -8 4 -10 6 -14 c2 6 8 8 8 14 c0 6 -4 9 -7 9 c-3 0 -7 -3 -7 -9z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M124 62 c6 -4 6 -10 0 -14 M132 70 c8 -6 8 -16 0 -22" stroke={B} strokeWidth="4" />
    </>
  ),
  gas: (
    <>
      {/* gas valve with a flame */}
      <path d="M30 104 h100" stroke={C} strokeWidth="18" />
      <path d="M30 104 h100" stroke={O} strokeWidth="10" />
      <rect x="38" y="92" width="14" height="24" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="108" y="92" width="14" height="24" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="66" y="88" width="28" height="32" rx="6" fill={O} stroke={C} strokeWidth="4" />
      <path d="M80 88 v-14" stroke={C} strokeWidth="5" />
      <rect x="66" y="62" width="28" height="12" rx="4" fill={B} stroke={C} strokeWidth="3" />
      <path d="M80 54 c-12 -12 -12 -24 -2 -34 c0 10 7 12 7 12 c0 -9 5 -14 11 -18 c-2 10 9 14 9 24 c0 10 -8 18 -17 18 c-3 0 -6 -1 -8 -2z" fill={B} stroke={C} strokeWidth="3" />
    </>
  ),
  calendar: (
    <>
      <rect x="36" y="40" width="88" height="84" rx="10" fill={W} stroke={C} strokeWidth="4" />
      <rect x="36" y="40" width="88" height="24" rx="10" fill={B} stroke={C} strokeWidth="4" />
      <path d="M58 30 v18 M102 30 v18" stroke={C} strokeWidth="5" />
      <path d="M52 84 h12 M74 84 h12 M96 84 h12 M52 104 h12 M74 104 h12" stroke={C} strokeWidth="3" opacity="0.35" />
      <circle cx="102" cy="104" r="12" fill={B} stroke={C} strokeWidth="3" />
      <path d="M96 104 l4 4 l8 -8" stroke={W} strokeWidth="3" />
    </>
  ),
  phone: (
    <>
      <rect x="50" y="30" width="54" height="104" rx="12" fill={O} stroke={C} strokeWidth="4" />
      <rect x="58" y="44" width="38" height="66" rx="4" fill={W} stroke={C} strokeWidth="3" />
      <circle cx="77" cy="122" r="4" fill={C} />
      <path d="M70 38 h14" stroke={C} strokeWidth="3" />
      <path d="M68 70 c0 -6 8 -6 10 -2 c3 -6 12 -3 10 4 c-2 6 -10 10 -10 10 c0 0 -10 -4 -10 -12z" fill={B} />
      <path d="M96 24 h34 a10 10 0 0 1 10 10 v18 a10 10 0 0 1 -10 10 h-16 l-10 10 v-10 h-8 a10 10 0 0 1 -10 -10 v-18 a10 10 0 0 1 10 -10z" fill={W} stroke={C} strokeWidth="4" />
      <circle cx="106" cy="43" r="3.5" fill={B} />
      <circle cx="118" cy="43" r="3.5" fill={B} />
      <circle cx="130" cy="43" r="3.5" fill={B} />
      <path d="M34 60 c-6 6 -6 14 0 20 M26 52 c-10 10 -10 26 0 36" stroke={B} strokeWidth="4" />
    </>
  ),
  tag: (
    <>
      <path d="M44 36 h40 l52 52 a8 8 0 0 1 0 12 l-36 36 a8 8 0 0 1 -12 0 l-52 -52 v-40 a8 8 0 0 1 8 -8z" fill={O} stroke={C} strokeWidth="4" />
      <circle cx="60" cy="54" r="8" fill={W} stroke={C} strokeWidth="4" />
      <path d="M60 54 l-16 -20" stroke={C} strokeWidth="4" />
      <path d="M84 104 l10 10 l22 -22" stroke={B} strokeWidth="6" />
      <path d="M124 34 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z" fill={B} stroke={C} strokeWidth="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="80" cy="80" r="44" fill={W} stroke={C} strokeWidth="4" />
      <circle cx="80" cy="80" r="36" fill={O} stroke={C} strokeWidth="2" />
      <path d="M80 48 v6 M112 80 h-6 M80 112 v-6 M48 80 h6" stroke={C} strokeWidth="3" />
      <path d="M80 80 v-24 M80 80 l16 12" stroke={C} strokeWidth="5" />
      <circle cx="80" cy="80" r="4" fill={B} />
      <path d="M80 40 a40 40 0 0 1 28 12" stroke={B} strokeWidth="6" />
      <circle cx="118" cy="114" r="16" fill={B} stroke={C} strokeWidth="3" />
      <path d="M110 114 l6 6 l11 -12" stroke={W} strokeWidth="4" />
    </>
  ),
  "check-circle": (
    <>
      <rect x="46" y="36" width="68" height="96" rx="10" fill={O} stroke={C} strokeWidth="4" />
      <rect x="66" y="26" width="28" height="18" rx="5" fill={B} stroke={C} strokeWidth="3" />
      <path d="M60 68 h16 M84 68 h20 M60 90 h16 M84 90 h20 M60 112 h16" stroke={C} strokeWidth="3" opacity="0.5" />
      <path d="M58 64 l4 4 l8 -8" stroke={B} strokeWidth="4" />
      <path d="M58 86 l4 4 l8 -8" stroke={B} strokeWidth="4" />
      <circle cx="116" cy="118" r="16" fill={B} stroke={C} strokeWidth="3" />
      <path d="M108 118 l6 6 l11 -12" stroke={W} strokeWidth="4" />
    </>
  ),
};

export function ValueIllustration({ icon, className }: { icon: IconName; className?: string }) {
  const inner = art[icon];
  if (!inner) return <IconTile name={icon} size={48} />;
  return (
    <svg viewBox="0 0 160 160" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="80" cy="80" r="70" fill={T} />
      {inner}
    </svg>
  );
}

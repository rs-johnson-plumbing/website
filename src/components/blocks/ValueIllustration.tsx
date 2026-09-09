import type { IconName } from "@/lib/content";
import { IconTile } from "@/components/ui/Icon";

/**
 * Cartoon illustrations for the value-prop cards ("You Talk to the
 * Plumber", "Price Before We Start", "We Show Up When We Say", and the
 * builder set). Same style as ServiceIllustration: charcoal outline, brand
 * blue accents, off-white fills, light-blue disc. Keyed by the card's icon
 * name so content stays unchanged; falls back to the icon tile.
 */
const C = "#2B2B2B";
const B = "#2F6FE0";
const T = "#E3EBFB";
const O = "#F7F5F0";
const W = "#FFFFFF";

const art: Partial<Record<IconName, React.ReactNode>> = {
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

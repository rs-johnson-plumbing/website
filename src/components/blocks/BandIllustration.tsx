import { cn } from "@/lib/cn";

/**
 * Wide (4:3) cartoon scenes for the services hub bands, used in the photo
 * slot until a real photo exists. Same palette and outline weight as the
 * service illustrations. Add a slug here to replace that band's placeholder.
 */
const C = "#2B2B2B";
const B = "#2F6FE0";
const T = "#E3EBFB";
const O = "#F7F5F0";
const W = "#FFFFFF";
const H = "#E3DFD5";

const scenes: Record<string, React.ReactNode> = {
  "water-heaters": (
    <>
      {/* floor and wall */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="250" width="400" height="50" fill={H} />
      <path d="M0 250 h400" stroke={C} strokeWidth="4" />
      {/* tank water heater */}
      <path d="M100 20 v40 M150 20 v40" stroke={C} strokeWidth="9" />
      <rect x="92" y="14" width="16" height="10" rx="2" fill={B} stroke={C} strokeWidth="2" />
      <rect x="142" y="14" width="16" height="10" rx="2" fill={B} stroke={C} strokeWidth="2" />
      <rect x="70" y="60" width="110" height="190" rx="20" fill={O} stroke={C} strokeWidth="5" />
      <rect x="70" y="60" width="110" height="30" rx="15" fill={B} stroke={C} strokeWidth="5" />
      <circle cx="125" cy="140" r="16" fill={W} stroke={C} strokeWidth="4" />
      <path d="M125 140 l9 -9" stroke={C} strokeWidth="4" />
      <rect x="108" y="196" width="34" height="30" rx="6" fill={W} stroke={C} strokeWidth="4" />
      <path d="M125 220 c-6 -6 -6 -12 -1 -17 c0 5 4 6 4 6 c0 -5 3 -8 6 -10 c-1 6 5 8 5 14 c0 6 -5 10 -10 10 c-2 0 -3 -1 -4 -3z" fill={B} stroke={C} strokeWidth="2" />
      <path d="M84 236 h82" stroke={C} strokeWidth="4" />
      {/* tankless unit on the wall */}
      <path d="M300 22 v48" stroke={C} strokeWidth="9" />
      <rect x="292" y="16" width="16" height="10" rx="2" fill={B} stroke={C} strokeWidth="2" />
      <rect x="248" y="70" width="104" height="132" rx="14" fill={O} stroke={C} strokeWidth="5" />
      <rect x="262" y="86" width="76" height="66" rx="8" fill={W} stroke={C} strokeWidth="3" />
      <rect x="280" y="104" width="40" height="18" rx="3" fill={B} />
      <circle cx="300" cy="138" r="5" fill={C} />
      <path d="M262 170 h76" stroke={C} strokeWidth="3" opacity="0.4" />
      <path d="M270 202 v48 M300 202 v48 M330 202 v48" stroke={C} strokeWidth="9" />
      <rect x="262" y="208" width="16" height="10" rx="2" fill={B} stroke={C} strokeWidth="2" />
      <rect x="292" y="208" width="16" height="10" rx="2" fill={B} stroke={C} strokeWidth="2" />
      <rect x="322" y="208" width="16" height="10" rx="2" fill={B} stroke={C} strokeWidth="2" />
      <path d="M370 100 c8 6 8 16 0 22 M384 88 c14 12 14 34 0 46" stroke={B} strokeWidth="5" />
      {/* water drop between them */}
      <path d="M214 120 c8 10 14 18 14 26 a14 14 0 0 1 -28 0 c0 -8 6 -16 14 -26z" fill={B} stroke={C} strokeWidth="3" />
    </>
  ),
};

export function hasBandIllustration(slug: string) {
  return slug in scenes;
}

export function BandIllustration({ slug, title, className }: { slug: string; title: string; className?: string }) {
  const inner = scenes[slug];
  if (!inner) return null;
  return (
    <svg viewBox="0 0 400 300" fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={title} className={cn("block h-auto w-full overflow-hidden rounded-card border border-hairline-strong", className)}>
      {inner}
    </svg>
  );
}

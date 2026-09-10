/**
 * The "we're on it" scene for the intake done step: a plumber in a cap with
 * a rocking wrench, an open toolbox, and a couple of bobbing drops. Same
 * palette and outline weight as the other illustrations. Motion is CSS,
 * and stops under prefers-reduced-motion.
 */
const C = "#2B2B2B";
const B = "#246FF2";
const T = "#E3ECFD";
const O = "#F7F5F0";
const W = "#FFFFFF";
const S = "#E9B98E";

export function ReadyIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 150" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <ellipse cx="120" cy="120" rx="96" ry="22" fill={T} />
      {/* toolbox */}
      <rect x="150" y="92" width="62" height="34" rx="5" fill={O} stroke={C} strokeWidth="3" />
      <path d="M150 104 h62" stroke={C} strokeWidth="2" opacity="0.4" />
      <path d="M170 92 v-8 a4 4 0 0 1 4 -4 h14 a4 4 0 0 1 4 4 v8" stroke={C} strokeWidth="3" />
      <rect x="176" y="98" width="10" height="8" rx="2" fill={B} />
      {/* plumber: body, head, cap */}
      <path d="M60 126 v-30 a26 26 0 0 1 52 0 v30z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M60 126 h52" stroke={C} strokeWidth="3" />
      <rect x="78" y="86" width="16" height="10" rx="3" fill={S} stroke={C} strokeWidth="2" />
      <circle cx="86" cy="64" r="20" fill={S} stroke={C} strokeWidth="3" />
      <path d="M66 60 a20 20 0 0 1 40 0" fill={B} stroke={C} strokeWidth="3" />
      <path d="M64 60 h48" stroke={C} strokeWidth="3" />
      <rect x="98" y="56" width="18" height="7" rx="3" fill={B} stroke={C} strokeWidth="2.5" />
      <circle cx="80" cy="68" r="2" fill={C} />
      <circle cx="92" cy="68" r="2" fill={C} />
      <path d="M81 76 q5 4 10 0" stroke={C} strokeWidth="2" />
      {/* right arm with the wrench, rocking */}
      <g className="anim-rock">
        <path d="M108 104 l24 -26" stroke={S} strokeWidth="9" />
        <path d="M108 104 l24 -26" stroke={C} strokeWidth="3" fill="none" opacity="0" />
        <path d="M132 78 l14 -14" stroke={C} strokeWidth="9" />
        <path d="M132 78 l14 -14" stroke={O} strokeWidth="4" />
        <path d="M146 64 l-6 -8 l8 -8 l8 4 l-2 10z" fill={B} stroke={C} strokeWidth="3" />
      </g>
      {/* left arm resting */}
      <path d="M64 104 l-14 12" stroke={S} strokeWidth="9" />
      <circle cx="49" cy="117" r="6" fill={S} stroke={C} strokeWidth="2.5" />
      {/* drops that bob */}
      <g className="anim-bob">
        <path d="M30 40 c6 8 10 14 10 20 a10 10 0 0 1 -20 0 c0 -6 4 -12 10 -20z" fill={B} stroke={C} strokeWidth="2.5" />
      </g>
      <g className="anim-bob-late">
        <path d="M196 34 c5 6 8 11 8 16 a8 8 0 0 1 -16 0 c0 -5 3 -10 8 -16z" fill={B} stroke={C} strokeWidth="2.5" />
      </g>
      {/* the check that pops in */}
      <g className="anim-pop">
        <circle cx="200" cy="72" r="14" fill={W} stroke={C} strokeWidth="3" />
        <path d="M193 72 l5 5 l10 -11" stroke={B} strokeWidth="3.5" />
      </g>
    </svg>
  );
}

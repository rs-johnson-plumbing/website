/**
 * Placeholder sketch for the "Why R.S. Johnson" photo slot: Ryan and the
 * crew beside a marked truck, drawn in the same cartoon style as the
 * service illustrations. Swap for the real photo when it exists.
 */
const C = "#2B2B2B";
const B = "#2F6FE0";
const T = "#E3EBFB";
const O = "#F7F5F0";
const W = "#FFFFFF";
const S = "#6E7178";

function Person({ x, y, shirt, tall = 1 }: { x: number; y: number; shirt: string; tall?: number }) {
  const h = 92 * tall;
  return (
    <g transform={`translate(${x} ${y - h})`} stroke={C} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* legs */}
      <path d={`M-9 ${h - 40} v40 M9 ${h - 40} v40`} stroke={C} strokeWidth="9" />
      <path d={`M-9 ${h - 40} v40 M9 ${h - 40} v40`} stroke="#4A4A4A" strokeWidth="5" />
      {/* boots */}
      <path d={`M-15 ${h} h13 M2 ${h} h13`} stroke={C} strokeWidth="6" />
      {/* body */}
      <rect x="-19" y="26" width="38" height={h - 66} rx="9" fill={shirt} />
      {/* arms */}
      <path d={`M-19 36 l-10 30 M19 36 l10 30`} stroke={C} strokeWidth="9" />
      <path d={`M-19 36 l-10 30 M19 36 l10 30`} stroke={shirt} strokeWidth="5" />
      {/* logo on shirt */}
      <path d="M4 40 v10 a4 4 0 0 1 -8 0 v-1 a2 2 0 0 0 -2 -2 h-2" stroke={shirt === C ? O : C} strokeWidth="2.5" fill="none" />
      {/* head */}
      <circle cx="0" cy="12" r="14" fill="#F1D9C5" />
      {/* cap */}
      <path d="M-14 8 a14 14 0 0 1 28 0 z" fill={B} />
      <path d="M-14 8 h32" stroke={B} strokeWidth="5" />
      {/* face */}
      <path d="M-5 14 q5 5 10 0" stroke={C} strokeWidth="2" fill="none" />
      <circle cx="-5" cy="9" r="1.5" fill={C} stroke="none" />
      <circle cx="5" cy="9" r="1.5" fill={C} stroke="none" />
    </g>
  );
}

export function CrewSketch({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 480 300" role="img" aria-label={title ?? "Sketch of Ryan and the crew beside a marked R.S. Johnson Plumbing truck"} className={className}>
      <rect width="480" height="300" rx="8" fill={T} />
      {/* ground */}
      <rect x="0" y="232" width="480" height="68" fill="#DCE3F0" />
      <path d="M0 232 H480" stroke={C} strokeWidth="3" />
      {/* clouds */}
      <g fill={W}>
        <ellipse cx="90" cy="58" rx="34" ry="14" />
        <ellipse cx="112" cy="50" rx="24" ry="14" />
        <ellipse cx="400" cy="46" rx="30" ry="12" />
        <ellipse cx="420" cy="40" rx="20" ry="12" />
      </g>
      {/* truck */}
      <g stroke={C} strokeWidth="4" strokeLinejoin="round">
        {/* bed / box */}
        <rect x="222" y="96" width="196" height="118" rx="6" fill={O} />
        {/* cab */}
        <path d="M418 214 V132 q0 -10 10 -10 h18 q10 0 14 8 l12 26 q4 8 4 16 v42 z" fill={O} />
        {/* windshield */}
        <path d="M434 132 h18 l12 26 h-30 z" fill={B} />
        {/* door line */}
        <path d="M418 132 v82" />
        {/* bumper */}
        <rect x="470" y="200" width="8" height="18" rx="2" fill={C} />
        {/* mark on the box */}
        <g transform="translate(250 118) scale(0.34)" fill="none">
          <path d="M140 22 V150 A35 35 0 0 1 70 150 V138 A24 24 0 0 0 46 114 H18" stroke={C} strokeWidth="34" strokeLinejoin="round" />
          <rect x="112" y="6" width="56" height="18" rx="2" fill={B} stroke="none" />
          <rect x="116" y="112" width="48" height="14" rx="2" fill={B} stroke="none" />
          <rect x="8" y="90" width="16" height="48" rx="2" fill={B} stroke="none" />
        </g>
        <g fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fill={C} stroke="none">
          <text x="314" y="146" fontSize="14">R.S. JOHNSON</text>
          <text x="314" y="166" fontSize="14">PLUMBING</text>
          <text x="314" y="184" fontSize="10" fill={S}>314-220-1827</text>
        </g>
        {/* wheels */}
        <circle cx="268" cy="222" r="20" fill={C} />
        <circle cx="268" cy="222" r="8" fill={O} />
        <circle cx="440" cy="222" r="20" fill={C} />
        <circle cx="440" cy="222" r="8" fill={O} />
      </g>
      {/* crew */}
      <Person x={60} y={232} shirt={C} tall={1.02} />
      <Person x={118} y={232} shirt={C} />
      <Person x={176} y={232} shirt={B} tall={1.06} />
      {/* wrench in the middle figure's hand */}
      <g transform="translate(146 200) rotate(-30)" fill={C}>
        <rect x="-3" y="-16" width="6" height="32" rx="2" />
        <circle cx="0" cy="-18" r="6" />
        <rect x="-2" y="-21" width="4" height="6" fill={T} />
      </g>
      {/* sketch label */}
      <g fontFamily="inherit" fontWeight="700" fill={S} stroke="none">
        <text x="16" y="284" fontSize="10" letterSpacing="1">PLACEHOLDER SKETCH · REAL PHOTO TO COME</text>
      </g>
    </svg>
  );
}

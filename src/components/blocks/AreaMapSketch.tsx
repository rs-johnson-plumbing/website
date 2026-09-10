import { cn } from "@/lib/cn";

/**
 * Placeholder service-area map: a schematic of St. Charles County and West
 * St. Louis County with the main cities tagged, drawn in the same cartoon
 * style as the service illustrations. Not to scale. Swap for a real map
 * (static image or embedded map) when one exists.
 */
const C = "#2B2B2B";
const B = "#2868A8";
const T = "#EFEBE1";
const W = "#FFFFFF";
const S = "#6E7178";
const RIVER = "#C5D6F6";

type Pin = { name: string; x: number; y: number; home?: boolean; anchor?: "start" | "end" | "middle"; dy?: number };

const pins: Pin[] = [
  { name: "Wentzville", x: 100, y: 215, anchor: "middle", dy: -40 },
  { name: "Lake St. Louis", x: 160, y: 250, anchor: "middle", dy: 18 },
  { name: "Dardenne Prairie", x: 232, y: 275, anchor: "start", dy: 18 },
  { name: "O'Fallon", x: 245, y: 200, home: true, anchor: "middle", dy: -42 },
  { name: "St. Peters", x: 312, y: 232, anchor: "start", dy: -38 },
  { name: "St. Charles", x: 380, y: 180, anchor: "start", dy: -38 },
  { name: "Chesterfield", x: 345, y: 322, anchor: "start", dy: -38 },
  { name: "Wildwood", x: 235, y: 390, anchor: "middle", dy: 18 },
  { name: "Ballwin", x: 335, y: 410, anchor: "middle", dy: 18 },
  { name: "Kirkwood", x: 450, y: 405, anchor: "middle", dy: 18 },
];

function PinMark({ x, y, home }: Pin) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={C} strokeWidth="2.5" strokeLinejoin="round">
      <path d="M0 0 c-9 -12 -11 -16 -11 -22 a11 11 0 0 1 22 0 c0 6 -2 10 -11 22z" fill={home ? B : W} />
      <circle cx="0" cy="-22" r="4" fill={home ? W : B} stroke="none" />
    </g>
  );
}

export function AreaMapSketch({ title, className }: { title: string; className?: string }) {
  return (
    <figure className={cn("overflow-hidden rounded-card border border-hairline-strong bg-white", className)}>
      <svg viewBox="0 0 600 470" role="img" aria-label={title} className="block h-auto w-full">
        <rect width="600" height="470" fill="#F7F5F0" />
        {/* county tint: St. Charles County above the Missouri, West County below */}
        <path d="M0 0 H600 V120 C540 140 490 190 450 250 C410 300 300 330 180 335 C110 338 40 345 0 360 Z" fill={T} opacity="0.55" />
        {/* Missouri River */}
        <path d="M0 380 C80 355 170 350 250 345 C340 340 420 300 460 240 C490 195 530 150 600 110" fill="none" stroke={RIVER} strokeWidth="18" strokeLinecap="round" />
        <path d="M0 380 C80 355 170 350 250 345 C340 340 420 300 460 240 C490 195 530 150 600 110" fill="none" stroke={C} strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
        {/* Mississippi River */}
        <path d="M545 0 C560 80 555 200 570 300 C580 370 575 420 585 470" fill="none" stroke={RIVER} strokeWidth="18" strokeLinecap="round" />
        {/* Interstates */}
        <path d="M0 215 C120 210 260 205 400 175 C470 160 520 150 600 140" fill="none" stroke={S} strokeWidth="4" strokeLinecap="round" />
        <path d="M60 275 C160 270 250 285 320 350 C380 400 470 385 600 380" fill="none" stroke={S} strokeWidth="4" strokeLinecap="round" />
        <g fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="700" fontSize="11" fill={W}>
          <rect x="470" y="140" width="34" height="18" rx="4" fill={C} />
          <text x="487" y="153" textAnchor="middle">I-70</text>
          <rect x="470" y="372" width="34" height="18" rx="4" fill={C} />
          <text x="487" y="385" textAnchor="middle">I-64</text>
          <rect x="500" y="215" width="72" height="18" rx="4" fill={C} />
          <text x="536" y="228" textAnchor="middle">Mississippi</text>
        </g>
        {/* Region labels */}
        <g fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="700" fontSize="13" fill={S} letterSpacing="1">
          <text x="30" y="60">ST. CHARLES COUNTY</text>
          <text x="330" y="450">WEST ST. LOUIS COUNTY</text>
        </g>
        {/* Pins and tags */}
        {pins.map((p) => (
          <PinMark key={p.name} {...p} />
        ))}
        <g fontFamily="var(--font-figtree), system-ui, sans-serif" fontSize="14" fill={C}>
          {pins.map((p) => (
            <text key={p.name} x={p.x} y={p.y + (p.dy ?? 0)} textAnchor={p.anchor ?? "middle"} fontWeight={p.home ? 800 : 600} fontSize={p.home ? 16 : 14}>
              {p.name}
            </text>
          ))}
        </g>
        <g fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="700" fontSize="11" fill={S} letterSpacing="1.5">
          <text x="300" y="30" textAnchor="middle">PLACEHOLDER MAP · NOT TO SCALE · REAL MAP TO COME</text>
        </g>
      </svg>
    </figure>
  );
}

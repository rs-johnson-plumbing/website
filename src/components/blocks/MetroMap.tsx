/**
 * A quiet line drawing of the St. Louis metro for the homepage hero: the
 * Missouri and Mississippi, a handful of the artery roads with their
 * shields, and a few place names. Everything is one ink at low opacity so
 * it reads as texture behind the headline, not as a map to study. The
 * drawing is wider than it is tall and sits to the right; a mask fades it
 * out under the headline on the left. Not to scale.
 */
type Shield = { kind: "i" | "us" | "mo"; n: string; x: number; y: number };

const roads: { d: string; w: number }[] = [
  // I-70: Warrenton, Wentzville, O'Fallon, St. Charles, then south-east into downtown and across the river
  { d: "M-80 140 C40 150 150 148 230 150 C300 152 380 158 455 170 C500 178 530 186 548 196 C575 212 600 240 645 278 C680 260 720 220 792 190 L870 175", w: 3 },
  // I-64 / US 40: Wentzville to Chesterfield, Kirkwood, downtown, Illinois
  { d: "M245 168 C280 200 320 240 355 258 C400 268 450 270 480 272 C530 282 580 298 650 300 C690 318 740 328 870 335", w: 3 },
  // I-44: Pacific to downtown
  { d: "M250 425 C300 405 340 396 400 390 C450 392 480 385 500 370 C540 345 590 322 645 300", w: 3 },
  // I-55: south from downtown
  { d: "M645 300 C630 340 600 385 570 425 C555 450 545 480 540 520", w: 3 },
  // I-270: the western loop, from the north bridge around to I-55
  { d: "M700 55 C640 90 590 130 548 178 C520 210 500 250 495 300 C492 340 500 372 520 390 C560 405 610 405 640 395", w: 3 },
  // I-255: the eastern loop up to Illinois
  { d: "M640 395 C660 370 690 340 700 300 C712 250 705 200 700 150 C698 100 700 60 695 40", w: 2.5 },
  // MO 370: St. Peters to I-270
  { d: "M372 152 C410 148 440 146 457 146 C500 150 530 160 548 178", w: 2 },
  // MO 364: Lake St. Louis to I-270
  { d: "M265 190 C300 195 350 205 400 220 C430 228 470 235 500 245", w: 2 },
  // MO 100 / Manchester: Wildwood to Kirkwood
  { d: "M330 340 C370 332 420 328 470 332 C520 336 570 334 610 328", w: 1.6 },
  // US 61 / MO 79 north from Wentzville, US 94 along the river
  { d: "M232 150 C240 110 260 80 300 78 C310 60 320 30 330 0", w: 1.6 },
  { d: "M190 335 C230 330 280 300 330 268", w: 1.4 },
];

const shields: Shield[] = [
  { kind: "i", n: "70", x: 548, y: 178 },
  { kind: "i", n: "70", x: 752, y: 196 },
  { kind: "i", n: "64", x: 355, y: 258 },
  { kind: "i", n: "44", x: 345, y: 398 },
  { kind: "i", n: "55", x: 565, y: 392 },
  { kind: "i", n: "270", x: 500, y: 366 },
  { kind: "i", n: "270", x: 575, y: 220 },
  { kind: "i", n: "255", x: 656, y: 352 },
  { kind: "mo", n: "370", x: 457, y: 146 },
  { kind: "mo", n: "364", x: 325, y: 196 },
  { kind: "mo", n: "364", x: 452, y: 230 },
  { kind: "mo", n: "100", x: 417, y: 328 },
  { kind: "us", n: "40", x: 515, y: 262 },
];

const places: { name: string; x: number; y: number; big?: boolean }[] = [
  { name: "Wentzville", x: 228, y: 138 },
  { name: "O'Fallon", x: 325, y: 138 },
  { name: "St. Charles", x: 465, y: 162 },
  { name: "Chesterfield", x: 395, y: 292 },
  { name: "Kirkwood", x: 515, y: 350 },
  { name: "St. Louis", x: 645, y: 322, big: true },
  { name: "Alton", x: 655, y: 72 },
];

function ShieldMark({ kind, n, x, y }: Shield) {
  const wide = n.length > 2;
  return (
    <g transform={`translate(${x} ${y})`} fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="800" fontSize="9" textAnchor="middle">
      {kind === "i" && (
        <>
          <path d={wide ? "M-14 -8 h28 c0 8 -4 13 -14 17 c-10 -4 -14 -9 -14 -17z" : "M-11 -8 h22 c0 8 -3 13 -11 17 c-8 -4 -11 -9 -11 -17z"} fill="currentColor" />
          <text y="4" fill="var(--map-ground)">{n}</text>
        </>
      )}
      {kind === "mo" && (
        <>
          <circle r="9" fill="var(--map-ground)" stroke="currentColor" strokeWidth="1.5" />
          <text y="3.5" fill="currentColor" fontSize="8">{n}</text>
        </>
      )}
      {kind === "us" && (
        <>
          <path d="M-10 -8 h20 v10 c0 4 -4 7 -10 8 c-6 -1 -10 -4 -10 -8z" fill="var(--map-ground)" stroke="currentColor" strokeWidth="1.5" />
          <text y="3.5" fill="currentColor" fontSize="8">{n}</text>
        </>
      )}
    </g>
  );
}

export function MetroMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1800 500" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" className={className} style={{ ["--map-ground" as string]: "#F7F5F0" }}>
      <defs>
        <linearGradient id="metro-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.62" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="metro-mask">
          <rect width="1800" height="500" fill="url(#metro-fade)" />
        </mask>
      </defs>
      <g mask="url(#metro-mask)">
      <g transform="translate(660 -61) scale(1.35)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Rivers: the Missouri from Washington to the confluence, the Mississippi from Alton past downtown */}
        <g className="text-teal" stroke="currentColor" opacity="0.28">
          <path d="M100 350 C160 338 210 328 250 300 C290 275 340 262 400 240 C435 222 455 195 470 172 C500 140 540 118 600 100" strokeWidth="9" />
          <path d="M330 -10 C380 30 440 48 500 60 C560 74 600 92 625 115 C645 160 640 240 642 300 C648 360 660 420 690 500" strokeWidth="10" />
        </g>
        {/* Roads, shields, and place names in one ink */}
        <g className="text-charcoal" stroke="currentColor" opacity="0.45">
          {roads.map((r, i) => (
            <path key={i} d={r.d} strokeWidth={r.w} />
          ))}
        </g>
        <g className="text-charcoal" stroke="none" opacity="0.55">
          {shields.map((s, i) => (
            <ShieldMark key={i} {...s} />
          ))}
        </g>
        <g className="text-charcoal" fill="currentColor" stroke="none" opacity="0.5" fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="600">
          {places.map((p) => (
            <text key={p.name} x={p.x} y={p.y} fontSize={p.big ? 15 : 10} textAnchor="middle">
              {p.name}
            </text>
          ))}
        </g>
      </g>
      </g>
    </svg>
  );
}

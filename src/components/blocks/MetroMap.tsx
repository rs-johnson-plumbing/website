/**
 * A quiet line drawing of the St. Louis metro for the homepage hero. Road
 * shapes follow a hand-traced sketch of the artery routes (I-70, I-64, I-44,
 * I-55, I-270, I-255, US 61, MO 79, 370, 364, 141, 94, 109) with the Missouri
 * and Mississippi. Only two names appear, St. Charles and St. Louis; everyone
 * local knows the rest. Everything sits at low opacity so it reads as texture
 * behind the headline, not as a map to study. The drawing is weighted to the
 * right and a mask fades it out under the headline. Not to scale.
 */
export type MetroMapVariant = "ink" | "roads" | "teal" | "pipes" | "blueprint" | "valve";

type P = [number, number];

/** Catmull-Rom through the points, emitted as cubic beziers. */
function smooth(pts: P[]): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: P = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: P = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/** Interstates: heavier. State and US routes: lighter. Coordinates are the traced sketch's canvas. */
const interstates: P[][] = [
  // I-70
  [[203, 278], [260, 283], [320, 290], [380, 297], [440, 298], [510, 298], [565, 305], [615, 305], [665, 315], [715, 325], [775, 332], [845, 335], [895, 335]],
  // I-64 / US 40, from Wentzville
  [[383, 310], [408, 350], [428, 380], [443, 410], [493, 440], [543, 470], [593, 490], [643, 505], [693, 510], [753, 510], [823, 510], [893, 505], [963, 510]],
  // I-44
  [[333, 670], [383, 665], [423, 655], [473, 650], [513, 645], [553, 630], [593, 612], [633, 602], [683, 592], [733, 580], [783, 550], [823, 530], [883, 512]],
  // I-55
  [[883, 512], [853, 545], [803, 580], [783, 630], [768, 670], [753, 710], [748, 750], [743, 785]],
  // I-270
  [[713, 328], [693, 360], [683, 400], [683, 450], [688, 510], [698, 570], [713, 600], [743, 630], [783, 660], [823, 680]],
  // I-255
  [[823, 680], [883, 685], [933, 630], [968, 590]],
];
const routes: P[][] = [
  // US 61
  [[253, 145], [293, 220], [343, 280], [378, 320]],
  // MO 79
  [[431, 85], [418, 140], [411, 190]],
  [[431, 195], [458, 230], [483, 260], [511, 298]],
  // MO 370
  [[558, 298], [613, 270], [653, 285], [683, 325], [713, 350]],
  // MO 364
  [[458, 355], [513, 400], [553, 405], [603, 390], [633, 400], [673, 410]],
  // MO 141
  [[638, 390], [638, 450], [633, 510], [643, 570], [658, 595]],
  // MO 94
  [[433, 410], [413, 440], [398, 480], [383, 520], [373, 540]],
  // MO 109
  [[483, 490], [498, 530], [508, 560], [518, 590]],
];
const mississippi: P[] = [[453, 20], [513, 80], [563, 130], [613, 160], [663, 190], [733, 210], [803, 200], [873, 180], [923, 210], [948, 250], [953, 310], [963, 400], [973, 470], [963, 530], [943, 600], [913, 670], [893, 750]];
const missouri: P[] = [[0, 440], [70, 445], [130, 470], [170, 535], [215, 550], [275, 530], [335, 512], [395, 492], [440, 468], [488, 440], [545, 415], [595, 395], [645, 372], [695, 345], [730, 318], [765, 285], [800, 245], [835, 205]];

const shields: { n: string; x: number; y: number }[] = [
  { n: "70", x: 511, y: 298 },
  { n: "70", x: 845, y: 335 },
  { n: "64", x: 493, y: 440 },
  { n: "64", x: 823, y: 510 },
  { n: "44", x: 473, y: 650 },
  { n: "55", x: 768, y: 670 },
  { n: "270", x: 683, y: 450 },
  { n: "270", x: 713, y: 600 },
  { n: "255", x: 933, y: 630 },
];
/** Interchanges, where pipe fittings sit on the pipes treatment. */
const joints: P[] = [[383, 310], [511, 298], [713, 328], [443, 410], [493, 440], [683, 450], [693, 510], [883, 512], [823, 680], [713, 600], [558, 298], [673, 410]];
/** O'Fallon, the home base. */
const home: P = [475, 300];
const labels: { name: string; x: number; y: number }[] = [
  { name: "St. Charles", x: 560, y: 340 },
  { name: "St. Louis", x: 905, y: 496 },
];

function Shield({ n, x, y }: { n: string; x: number; y: number }) {
  const wide = n.length > 2;
  return (
    <g transform={`translate(${x} ${y})`} fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="800" fontSize="11" textAnchor="middle">
      <path d={wide ? "M-16 -9 h32 c0 9 -5 15 -16 19 c-11 -4 -16 -10 -16 -19z" : "M-13 -9 h26 c0 9 -4 15 -13 19 c-9 -4 -13 -10 -13 -19z"} fill="currentColor" />
      <text y="4.5" fill="var(--map-ground)">{n}</text>
    </g>
  );
}

export function MetroMap({ className, variant = "ink", area = false }: { className?: string; variant?: MetroMapVariant; /** Tint the service area and pin O'Fallon. */ area?: boolean }) {
  const mono = variant === "teal";
  const pipes = variant === "pipes" || variant === "valve";
  const blueprint = variant === "blueprint";
  const roadColor = mono || blueprint ? "text-teal" : "text-charcoal";
  const interW = variant === "roads" ? 6 : pipes ? 9 : 4.5;
  const routeW = pipes ? 5 : 2.5;
  return (
    <svg viewBox="0 0 1800 500" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" className={className} style={{ ["--map-ground" as string]: "#F7F5F0" }}>
      <defs>
        <linearGradient id="metro-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="metro-mask">
          <rect width="1800" height="500" fill="url(#metro-fade)" />
        </mask>
        <pattern id="metro-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#3F6C78" strokeWidth="0.8" />
        </pattern>
      </defs>
      <g mask="url(#metro-mask)">
        {blueprint && <rect width="1800" height="500" fill="url(#metro-grid)" opacity="0.35" />}
        <g transform="translate(920 -70) scale(0.8)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Service area: a soft wash over St. Charles County and West St. Louis County, and a pin on O'Fallon */}
          {area && (
            <>
              <path d="M300 240 C360 200 470 210 560 230 C640 250 700 300 720 360 C700 420 640 470 560 480 C470 490 380 470 320 420 C280 380 270 300 300 240z" fill="#3F6C78" opacity="0.07" />
              <g transform="translate(475 300)">
                <path d="M0 0 c-14 -18 -18 -26 -18 -36 a18 18 0 0 1 36 0 c0 10 -4 18 -18 36z" fill="#A85A2E" stroke="#F7F5F0" strokeWidth="3" opacity="0.9" />
                <circle cx="0" cy="-36" r="7" fill="#F7F5F0" />
              </g>
              <text x="475" y="292" dy="-56" fontSize="16" fontWeight="800" textAnchor="middle" fill="#A85A2E" fontFamily="var(--font-figtree), system-ui, sans-serif">O&apos;Fallon</text>
            </>
          )}
          {/* Rivers: water */}
          <g className="text-teal" stroke="currentColor" opacity={mono ? 0.18 : blueprint ? 0.22 : 0.15}>
            <path d={smooth(mississippi)} strokeWidth={mono ? 22 : 12} strokeDasharray={blueprint ? "2 10" : undefined} />
            <path d={smooth(missouri)} strokeWidth={mono ? 18 : 10} strokeDasharray={blueprint ? "2 10" : undefined} />
          </g>
          {/* Roads. On the pipes treatments each road is a pipe: a dark wall with a lighter bore down the middle. */}
          <g className={roadColor} stroke="currentColor" opacity={mono ? 0.3 : blueprint ? 0.32 : 0.22}>
            {interstates.map((pts, i) => (
              <path key={`i${i}`} d={smooth(pts)} strokeWidth={interW} />
            ))}
            {routes.map((pts, i) => (
              <path key={`r${i}`} d={smooth(pts)} strokeWidth={routeW} strokeDasharray={variant === "roads" ? "10 8" : undefined} />
            ))}
          </g>
          {pipes && (
            <g stroke="var(--map-ground)" opacity="0.9">
              {interstates.map((pts, i) => (
                <path key={`b${i}`} d={smooth(pts)} strokeWidth={interW - 5} />
              ))}
              {routes.map((pts, i) => (
                <path key={`c${i}`} d={smooth(pts)} strokeWidth={routeW - 3} />
              ))}
            </g>
          )}
          {/* Fittings at the interchanges: copper flanges like the logo's */}
          {pipes && (
            <g opacity="0.3">
              {joints.map(([x, y], i) => (
                <rect key={i} x={x - 8} y={y - 8} width="16" height="16" rx="3" fill="#A85A2E" />
              ))}
            </g>
          )}
          {/* Blueprint: junction circles */}
          {blueprint && (
            <g className="text-teal" fill="var(--map-ground)" stroke="currentColor" strokeWidth="2" opacity="0.3">
              {joints.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="6" />
              ))}
            </g>
          )}
          {/* Home base: a shutoff valve at O'Fallon on the valve treatment */}
          {variant === "valve" && (
            <g transform={`translate(${home[0]} ${home[1]})`} opacity="0.9">
              <circle r="22" fill="var(--map-ground)" stroke="#A85A2E" strokeWidth="4" />
              <circle r="13" fill="none" stroke="#A85A2E" strokeWidth="4" />
              <path d="M0 -13V13M-13 0H13" stroke="#A85A2E" strokeWidth="4" />
              <circle r="4" fill="#A85A2E" />
            </g>
          )}
          {/* Shields, on the ink version only */}
          {variant === "ink" && (
            <g className="text-charcoal" stroke="none" opacity="0.4">
              {shields.map((s, i) => (
                <Shield key={i} {...s} />
              ))}
            </g>
          )}
          {/* The two names */}
          <g className={mono || blueprint ? "text-teal-dark" : "text-charcoal"} fill="currentColor" stroke="none" opacity={mono || blueprint ? 0.92 : 0.9} fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="800">
            {labels.map((l) => (
              <text key={l.name} x={l.x} y={l.y} fontSize={variant === "roads" || blueprint ? 36 : 34} textAnchor="middle" letterSpacing={variant === "roads" || blueprint ? 1 : 0}>
                {variant === "roads" || blueprint ? l.name.toUpperCase() : l.name}
              </text>
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet line drawing of the St. Louis metro for the homepage hero. Road
 * shapes follow a hand-traced sketch of the artery routes (I-70, I-64, I-44,
 * I-55, I-270, I-255, US 61, MO 79, 370, 364, 141, 94, 109) with the Missouri
 * and Mississippi. Only two names appear, St. Charles and St. Louis; everyone
 * local knows the rest. Everything sits at low opacity so it reads as texture
 * behind the headline, not as a map to study. The drawing is weighted to the
 * right and a mask fades it out under the headline. Not to scale.
 *
 * With `animate`, the water gets turned on: the shutoff valve at O'Fallon
 * opens, a drop rises, and water runs out along the roads from the valve,
 * reaching each town in the order the roads would. On the pipes treatment,
 * which the hero uses, the roads are pipes with fittings at the
 * interchanges and the water fills the bore. Town names pop as the water
 * arrives. No character: the valve turns on its own. It plays once per
 * session, about three seconds, and everything else on the page stays still.
 * Under prefers-reduced-motion, or on a repeat view, the map simply shows
 * the water on. The server renders the map as it is today (no water), so
 * the first paint is the still map and the animation adds to it.
 */
export type MetroMapVariant = "ink" | "roads" | "blue" | "pipes" | "blueprint" | "valve";

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
/** Towns the water reaches, with where their name sits. Positions follow the sketch, not a survey. */
const towns: { name: string; x: number; y: number; dx: number; dy: number; anchor: "start" | "end" }[] = [
  { name: "Wentzville", x: 383, y: 310, dx: -10, dy: -14, anchor: "end" },
  { name: "Lake St. Louis", x: 428, y: 304, dx: -6, dy: 26, anchor: "end" },
  { name: "St. Peters", x: 528, y: 300, dx: 2, dy: -14, anchor: "start" },
  { name: "Chesterfield", x: 622, y: 468, dx: -12, dy: 6, anchor: "end" },
  { name: "Wildwood", x: 518, y: 560, dx: 10, dy: 6, anchor: "start" },
  { name: "Ballwin", x: 608, y: 562, dx: 10, dy: 22, anchor: "start" },
  { name: "Kirkwood", x: 713, y: 600, dx: 12, dy: 26, anchor: "start" },
];

const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
/** Polyline length, close enough to the smoothed curve for timing. */
const polylen = (pts: P[]) => pts.reduce((sum, p, i) => (i ? sum + dist(pts[i - 1], p) : 0), 0);

/** Map units per second the water travels, and the seconds before it starts (the valve's turn). */
const SPEED = 300;
const LEAD = 0.7;
const SESSION_KEY = "rsj-water-on";

/** One water path per road: which end is nearer O'Fallon, and when and how long it fills. */
const waterPaths = [...interstates.map((pts) => ({ pts, major: true })), ...routes.map((pts) => ({ pts, major: false }))].map(({ pts, major }) => {
  const dA = dist(pts[0], home);
  const dB = dist(pts[pts.length - 1], home);
  const reverse = dB < dA;
  return { d: smooth(pts), major, reverse, delay: Math.min(dA, dB) / SPEED, dur: polylen(pts) / SPEED };
});

const labels: { name: string; x: number; y: number }[] = [
  { name: "St. Charles", x: 560, y: 340 },
  { name: "St. Louis", x: 905, y: 496 },
];

function Shield({ n, x, y }: { n: string; x: number; y: number }) {
  const wide = n.length > 2;
  return (
    <g transform={`translate(${x} ${y})`} fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="800" fontSize="13" textAnchor="middle">
      <path d={wide ? "M-19 -11 h38 c0 11 -6 18 -19 23 c-13 -5 -19 -12 -19 -23z" : "M-15 -11 h30 c0 11 -5 18 -15 23 c-10 -5 -15 -12 -15 -23z"} fill="currentColor" />
      <text y="5.5" fill="var(--map-ground)">{n}</text>
    </g>
  );
}

export function MetroMap({ className, variant = "ink", frame = "wide", pin = true, animate = false }: { className?: string; variant?: MetroMapVariant; /** "wide" fades out under the desktop headline; "phone" crops to the drawing with no fade and sits at the bottom of a tall narrow hero. */ frame?: "wide" | "phone"; /** Blue pin on O'Fallon, the headquarters. */ pin?: boolean; /** Turn the water on from O'Fallon once per session: the valve replaces the pin, the roads fill blue, the towns pop. */ animate?: boolean }) {
  const stage = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = stage.current;
    if (!animate || !root) return;
    const q = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const water = q<SVGPathElement>("[data-water]");
    const townEls = q<SVGGElement>("[data-town]");
    const handle = root.querySelector<SVGGElement>("[data-handle]");
    const drop = root.querySelector<SVGPathElement>("[data-drop]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let played = false;
    try {
      played = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}

    if (reduce || played) {
      // Water on, no motion.
      water.forEach((p) => (p.style.strokeDashoffset = "0"));
      townEls.forEach((t) => (t.style.opacity = "1"));
      if (handle) handle.style.transform = "rotate(90deg)";
      return;
    }

    const ms = (sec: number) => sec * 1000;
    const anims: Animation[] = [];
    if (handle) anims.push(handle.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(90deg)" }], { delay: ms(0.2), duration: ms(0.5), fill: "forwards", easing: "cubic-bezier(.3,.9,.4,1)" }));
    if (drop) anims.push(drop.animate([{ opacity: 0, transform: "translateY(10px) scale(0.6)" }, { opacity: 1, transform: "translateY(-6px) scale(1)", offset: 0.5 }, { opacity: 0, transform: "translateY(-22px) scale(0.9)" }], { delay: ms(LEAD - 0.25), duration: ms(0.7), fill: "forwards" }));
    water.forEach((p) => {
      const reverse = p.dataset.reverse === "1";
      anims.push(p.animate([{ strokeDashoffset: reverse ? "-1" : "1" }, { strokeDashoffset: "0" }], { delay: ms(LEAD + Number(p.dataset.delay)), duration: ms(Number(p.dataset.dur)), fill: "forwards", easing: "cubic-bezier(.2,.6,.4,1)" }));
    });
    townEls.forEach((t) => {
      anims.push(t.animate([{ opacity: 0, transform: "scale(0.4)" }, { opacity: 1, transform: "scale(1.15)", offset: 0.7 }, { opacity: 1, transform: "scale(1)" }], { delay: ms(LEAD + Number(t.dataset.at)), duration: ms(0.35), fill: "forwards", easing: "ease-out" }));
    });
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    return () => anims.forEach((a) => a.cancel());
  }, [animate]);

  const mono = variant === "blue";
  const pipes = variant === "pipes" || variant === "valve";
  const blueprint = variant === "blueprint";
  const roadColor = mono || blueprint ? "text-blue" : "text-charcoal";
  const interW = variant === "roads" ? 6 : pipes ? 9 : 4.5;
  const routeW = pipes ? 5 : 2.5;
  return (
    <svg
      viewBox={frame === "wide" ? "0 0 1800 500" : "880 0 900 500"}
      preserveAspectRatio={frame === "wide" ? "xMaxYMid slice" : "xMidYMax meet"}
      aria-hidden="true"
      className={className}
      style={{ ["--map-ground" as string]: "#F7F5F0" }}
    >
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
          <path d="M40 0H0V40" fill="none" stroke="#2868A8" strokeWidth="0.8" />
        </pattern>
      </defs>
      <g mask={frame === "wide" ? "url(#metro-mask)" : undefined}>
        {blueprint && <rect width="1800" height="500" fill="url(#metro-grid)" opacity="0.35" />}
        <g ref={stage} transform="translate(920 -70) scale(0.8)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Headquarters: a blue pin on O'Fallon. No area outline, the whole metro is served. With the water on, the valve below stands in for the pin. */}
          {pin && !animate && (
            <>
              <g transform="translate(475 300)">
                <path d="M0 0 c-14 -18 -18 -26 -18 -36 a18 18 0 0 1 36 0 c0 10 -4 18 -18 36z" fill="#2868A8" stroke="#F7F5F0" strokeWidth="3" opacity="0.9" />
                <circle cx="0" cy="-36" r="7" fill="#F7F5F0" />
              </g>
              <text x="475" y="292" dy="-56" fontSize="16" fontWeight="800" textAnchor="middle" fill="#2868A8" fontFamily="var(--font-figtree), system-ui, sans-serif">O&apos;Fallon</text>
            </>
          )}
          {/* Rivers: water */}
          <g className="text-blue" stroke="currentColor" opacity={mono ? 0.18 : blueprint ? 0.22 : 0.15}>
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
          {/* Water on: one blue path per road, hidden by its dash until the effect reveals it from the end nearer O'Fallon. pathLength=1 keeps the offsets unit-free. On the pipes treatment the water fills the bore, under the fittings. */}
          {animate && (
            <g stroke="#2868A8" opacity={pipes ? 0.9 : 0.6}>
              {waterPaths.map((wp, i) => (
                <path key={i} d={wp.d} strokeWidth={wp.major ? (pipes ? interW - 5 : 4.5) : pipes ? routeW - 3 : 3} pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: wp.reverse ? -1 : 1 }} data-water data-reverse={wp.reverse ? "1" : "0"} data-delay={wp.delay.toFixed(2)} data-dur={wp.dur.toFixed(2)} />
              ))}
            </g>
          )}
          {/* Fittings at the interchanges: blue flanges like the logo's */}
          {pipes && (
            <g opacity="0.3">
              {joints.map(([x, y], i) => (
                <rect key={i} x={x - 8} y={y - 8} width="16" height="16" rx="3" fill="#2868A8" />
              ))}
            </g>
          )}
          {/* Blueprint: junction circles */}
          {blueprint && (
            <g className="text-blue" fill="var(--map-ground)" stroke="currentColor" strokeWidth="2" opacity="0.3">
              {joints.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="6" />
              ))}
            </g>
          )}
          {/* Home base: a shutoff valve at O'Fallon on the valve treatment */}
          {variant === "valve" && (
            <g transform={`translate(${home[0]} ${home[1]})`} opacity="0.9">
              <circle r="22" fill="var(--map-ground)" stroke="#2868A8" strokeWidth="4" />
              <circle r="13" fill="none" stroke="#2868A8" strokeWidth="4" />
              <path d="M0 -13V13M-13 0H13" stroke="#2868A8" strokeWidth="4" />
              <circle r="4" fill="#2868A8" />
            </g>
          )}
          {/* Shields, on the ink version only */}
          {variant === "ink" && (
            <g className="text-charcoal" stroke="none" opacity="0.62">
              {shields.map((s, i) => (
                <Shield key={i} {...s} />
              ))}
            </g>
          )}
          {/* Towns the water reaches, each popping in when it arrives */}
          {animate && (
            <g fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="800" stroke="none">
              {towns.map((t) => (
                <g key={t.name} transform={`translate(${t.x} ${t.y})`}>
                  <g data-town data-at={(dist([t.x, t.y], home) / SPEED + 0.15).toFixed(2)} style={{ opacity: 0, transformBox: "fill-box", transformOrigin: "center" }}>
                    <circle r="5" fill="#2868A8" stroke="var(--map-ground)" strokeWidth="2.5" />
                    <text x={t.dx} y={t.dy} fontSize="16" textAnchor={t.anchor} fill="#0D2A4D" opacity="0.85">
                      {t.name}
                    </text>
                  </g>
                </g>
              ))}
            </g>
          )}
          {/* The shutoff valve at O'Fallon, a lever handle that turns a quarter turn on its own, and the drop that rises when it opens */}
          {animate && (
            <>
              <g transform={`translate(${home[0]} ${home[1]})`}>
                <circle r="22" fill="var(--map-ground)" stroke="#2868A8" strokeWidth="4" />
                <circle r="13" fill="none" stroke="#2868A8" strokeWidth="3" />
                <g data-handle style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                  <path d="M-15 0 H15" stroke="#2868A8" strokeWidth="5" />
                  <circle cx="15" r="5" fill="#2868A8" stroke="var(--map-ground)" strokeWidth="2" />
                  <circle r="4" fill="#2868A8" />
                </g>
              </g>
              <text x={home[0]} y={home[1] - 34} fontSize="16" fontWeight="800" textAnchor="middle" fill="#2868A8" stroke="none" fontFamily="var(--font-figtree), system-ui, sans-serif">
                O&apos;Fallon
              </text>
              <g transform={`translate(${home[0] + 26} ${home[1] - 56})`}>
                <path data-drop d="M0 0 c6 8 10 14 10 20 a10 10 0 0 1 -20 0 c0 -6 4 -12 10 -20z" fill="#2868A8" stroke="#2B2B2B" strokeWidth="2" style={{ opacity: 0, transformBox: "fill-box", transformOrigin: "center" }} />
              </g>
            </>
          )}
          {/* The two names */}
          <g className={mono || blueprint ? "text-blue-dark" : "text-charcoal"} fill="currentColor" stroke="none" opacity={mono || blueprint ? 0.92 : 0.9} fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="800">
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

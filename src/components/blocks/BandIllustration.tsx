import { cn } from "@/lib/cn";

/**
 * Wide (4:3) cartoon scenes for the services hub bands, used in the photo
 * slot until a real photo exists. Same palette and outline weight as the
 * service illustrations. Every band with a photo slot has one; swap in the
 * real photo by setting `ready` on PhotoPlaceholder and removing the slug.
 */
const C = "#2B2B2B";
const B = "#2868A8";
const T = "#E4ECF6";
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
  "leaks-and-repairs": (
    <>
      {/* wall and floor */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="250" width="400" height="50" fill={H} />
      <path d="M0 250 h400" stroke={C} strokeWidth="4" />
      {/* supply line: down from the ceiling, elbow, across the wall */}
      <path d="M60 0 v96 a16 16 0 0 0 16 16 h324" stroke={C} strokeWidth="22" />
      <path d="M60 0 v96 a16 16 0 0 0 16 16 h324" stroke={O} strokeWidth="14" />
      {/* couplings */}
      <rect x="46" y="40" width="28" height="18" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="150" y="98" width="20" height="28" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="300" y="98" width="20" height="28" rx="3" fill={B} stroke={C} strokeWidth="3" />
      {/* shutoff valve with a blue handle */}
      <rect x="226" y="96" width="34" height="32" rx="6" fill={O} stroke={C} strokeWidth="4" />
      <path d="M243 96 v-18" stroke={C} strokeWidth="5" />
      <rect x="226" y="66" width="34" height="12" rx="4" fill={B} stroke={C} strokeWidth="3" />
      {/* the split, with drips */}
      <path d="M198 104 l6 8 l-6 8 l6 6" stroke={C} strokeWidth="3" />
      <path d="M201 132 c5 7 9 12 9 17 a9 9 0 0 1 -18 0 c0 -5 4 -10 9 -17z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M201 172 c5 7 9 12 9 17 a9 9 0 0 1 -18 0 c0 -5 4 -10 9 -17z" fill={B} stroke={C} strokeWidth="3" />
      {/* bucket on the floor */}
      <path d="M168 250 l8 -46 h50 l8 46z" fill={W} stroke={C} strokeWidth="4" />
      <path d="M176 204 h50" stroke={C} strokeWidth="4" />
      <path d="M181 226 h40" stroke={B} strokeWidth="4" />
      <path d="M176 204 a25 14 0 0 1 50 0" stroke={C} strokeWidth="4" fill="none" />
      {/* pipe wrench leaning at the joint */}
      <path d="M340 236 l-44 -78" stroke={C} strokeWidth="12" />
      <path d="M340 236 l-44 -78" stroke={O} strokeWidth="6" />
      <path d="M292 160 l-16 -6 l4 -18 l20 4 l6 12z" fill={B} stroke={C} strokeWidth="4" />
      <path d="M300 146 l-14 -22" stroke={C} strokeWidth="9" />
      <path d="M300 146 l-14 -22" stroke={B} strokeWidth="4" />
      <circle cx="342" cy="238" r="7" fill={C} />
    </>
  ),
  "drains-and-sewer": (
    <>
      {/* sky and ground cutaway */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="120" width="400" height="180" fill={H} />
      <path d="M0 120 h400" stroke={C} strokeWidth="4" />
      {/* grass tufts */}
      <path d="M40 120 l6 -12 l6 12 M210 120 l6 -12 l6 12 M330 120 l6 -12 l6 12" stroke={C} strokeWidth="3" />
      {/* house corner at left */}
      <path d="M0 120 v-70 h70 l-35 -30 h-35" fill={O} stroke={C} strokeWidth="4" />
      <rect x="18" y="72" width="22" height="30" rx="2" fill={B} stroke={C} strokeWidth="3" />
      {/* cleanout stack up to the surface */}
      <path d="M118 108 v96" stroke={C} strokeWidth="20" />
      <path d="M118 108 v96" stroke={O} strokeWidth="12" />
      <rect x="104" y="96" width="28" height="16" rx="3" fill={B} stroke={C} strokeWidth="3" />
      {/* sewer pipe underground, cut open */}
      <rect x="40" y="196" width="360" height="56" rx="6" fill={W} stroke={C} strokeWidth="5" />
      <path d="M40 210 h360 M40 238 h360" stroke={C} strokeWidth="2" opacity="0.35" />
      {/* roots pushing in from above at right */}
      <path d="M300 200 c-6 12 -14 18 -10 30 M312 200 c2 10 -6 16 -2 26 M290 200 c-8 8 -16 12 -20 22" stroke={C} strokeWidth="3" />
      <path d="M296 150 c-4 16 4 26 0 46 M286 160 c10 6 16 20 12 36 M306 168 c-10 6 -2 22 -8 30" stroke={C} strokeWidth="3" />
      {/* camera cable in from the cleanout, head with a light beam */}
      <path d="M118 200 c0 20 12 24 40 24 h60" stroke={B} strokeWidth="6" />
      <rect x="216" y="214" width="34" height="20" rx="6" fill={B} stroke={C} strokeWidth="4" />
      <circle cx="244" cy="224" r="4" fill={W} />
      <path d="M250 214 l30 -12 v44 l-30 -12z" fill={W} opacity="0.7" />
      {/* monitor on the grass */}
      <rect x="228" y="60" width="96" height="60" rx="8" fill={O} stroke={C} strokeWidth="4" />
      <rect x="238" y="70" width="76" height="40" rx="4" fill={W} stroke={C} strokeWidth="3" />
      <circle cx="276" cy="90" r="14" fill="none" stroke={B} strokeWidth="4" />
      <circle cx="276" cy="90" r="5" fill={B} />
      <path d="M324 90 c40 0 -10 106 -38 122" stroke={B} strokeWidth="4" strokeDasharray="6 6" />
    </>
  ),
  "toilets-and-faucets": (
    <>
      {/* tiled backsplash and floor */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="250" width="400" height="50" fill={H} />
      <path d="M0 250 h400" stroke={C} strokeWidth="4" />
      <path d="M0 40 h400 M0 80 h400 M0 120 h400 M60 40 v40 M140 40 v40 M220 40 v40 M300 40 v40 M100 80 v40 M180 80 v40 M260 80 v40 M340 80 v40" stroke={C} strokeWidth="2" opacity="0.18" />
      {/* counter and cabinet */}
      <rect x="30" y="150" width="272" height="18" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <rect x="44" y="168" width="246" height="82" fill={O} stroke={C} strokeWidth="4" />
      <path d="M167 168 v82" stroke={C} strokeWidth="4" />
      <rect x="136" y="200" width="22" height="6" rx="3" fill={C} />
      <rect x="178" y="200" width="22" height="6" rx="3" fill={C} />
      {/* sink basin cut into the counter */}
      <path d="M120 152 v30 a12 12 0 0 0 12 12 h136 a12 12 0 0 0 12 -12 v-30" fill={W} stroke={C} strokeWidth="4" />
      <path d="M200 194 v30 a8 8 0 0 0 8 8 h10" stroke={C} strokeWidth="5" />
      {/* gooseneck faucet with a blue handle and a stream */}
      <path d="M232 150 v-28 a34 34 0 0 0 -68 0 v10" stroke={C} strokeWidth="14" />
      <path d="M232 150 v-28 a34 34 0 0 0 -68 0 v10" stroke={O} strokeWidth="8" />
      <rect x="220" y="136" width="24" height="18" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <path d="M244 132 h22" stroke={C} strokeWidth="9" />
      <path d="M244 132 h22" stroke={B} strokeWidth="5" />
      <path d="M164 136 v34" stroke={B} strokeWidth="6" />
      <path d="M160 176 c-4 6 -6 10 -6 13 a6 6 0 0 0 12 0 c0 -3 -2 -7 -6 -13z" fill={B} />
      {/* toilet standing on the floor at right */}
      <rect x="322" y="104" width="60" height="62" rx="8" fill={W} stroke={C} strokeWidth="4" />
      <rect x="330" y="96" width="44" height="12" rx="4" fill={O} stroke={C} strokeWidth="3" />
      <circle cx="368" cy="122" r="5" fill={B} />
      <rect x="300" y="164" width="96" height="22" rx="11" fill={W} stroke={C} strokeWidth="4" />
      <path d="M314 186 h68 l-8 64 h-52z" fill={W} stroke={C} strokeWidth="4" />
      {/* wrench on the counter */}
      <path d="M60 140 l40 -20" stroke={C} strokeWidth="8" />
      <path d="M100 120 l12 -6 l6 10 l-12 6z" fill={B} stroke={C} strokeWidth="3" />
    </>
  ),
  "bath-and-kitchen-remodel": (
    <>
      {/* open stud wall, rough-in */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="250" width="400" height="50" fill={H} />
      <path d="M0 250 h400" stroke={C} strokeWidth="4" />
      <rect x="0" y="0" width="400" height="22" fill={O} stroke={C} strokeWidth="4" />
      <rect x="0" y="228" width="400" height="22" fill={O} stroke={C} strokeWidth="4" />
      {/* studs */}
      <rect x="40" y="22" width="26" height="206" fill={O} stroke={C} strokeWidth="4" />
      <rect x="140" y="22" width="26" height="206" fill={O} stroke={C} strokeWidth="4" />
      <rect x="240" y="22" width="26" height="206" fill={O} stroke={C} strokeWidth="4" />
      <rect x="340" y="22" width="26" height="206" fill={O} stroke={C} strokeWidth="4" />
      {/* PEX supply lines through the studs, capped */}
      <path d="M0 120 h400" stroke={B} strokeWidth="7" />
      <path d="M0 140 h400" stroke={B} strokeWidth="7" />
      <path d="M200 120 v-60 M212 140 v-80" stroke={B} strokeWidth="7" />
      <rect x="192" y="48" width="16" height="14" rx="3" fill={W} stroke={C} strokeWidth="3" />
      <rect x="204" y="48" width="16" height="14" rx="3" fill={W} stroke={C} strokeWidth="3" />
      {/* shower valve rough-in box between studs */}
      <rect x="178" y="150" width="56" height="44" rx="6" fill={O} stroke={C} strokeWidth="4" />
      <circle cx="206" cy="172" r="12" fill={W} stroke={C} strokeWidth="4" />
      <circle cx="206" cy="172" r="4" fill={B} />
      {/* drain stub up through the floor */}
      <path d="M300 228 v-52" stroke={C} strokeWidth="22" />
      <path d="M300 228 v-52" stroke={W} strokeWidth="14" />
      <rect x="284" y="166" width="32" height="14" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <path d="M300 128 h-20 v-40" stroke={C} strokeWidth="4" strokeDasharray="6 6" />
      {/* level resting on the bottom plate */}
      <rect x="70" y="200" width="100" height="22" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <rect x="110" y="204" width="20" height="14" rx="3" fill={W} stroke={C} strokeWidth="3" />
      <circle cx="120" cy="211" r="3" fill={B} />
      {/* tub waiting in the corner */}
      <path d="M356 250 v-24 a14 14 0 0 1 14 -14 h30 v38z" fill={W} stroke={C} strokeWidth="4" />
    </>
  ),
  "gas-lines": (
    <>
      {/* patio and siding */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="230" width="400" height="70" fill={H} />
      <path d="M0 230 h400" stroke={C} strokeWidth="4" />
      <path d="M0 262 h400 M0 286 h400 M120 230 v70 M260 230 v70" stroke={C} strokeWidth="2" opacity="0.25" />
      {/* house wall with lap siding */}
      <rect x="0" y="0" width="120" height="230" fill={O} stroke={C} strokeWidth="4" />
      <path d="M0 30 h120 M0 60 h120 M0 90 h120 M0 120 h120 M0 150 h120 M0 180 h120 M0 210 h120" stroke={C} strokeWidth="2" opacity="0.25" />
      {/* meter and shutoff on the wall */}
      <rect x="28" y="70" width="56" height="70" rx="8" fill={W} stroke={C} strokeWidth="4" />
      <circle cx="56" cy="98" r="14" fill={O} stroke={C} strokeWidth="4" />
      <path d="M56 98 l7 -8" stroke={C} strokeWidth="3" />
      <rect x="42" y="120" width="28" height="10" rx="2" fill={B} />
      {/* gas line down the wall, along the patio, into the grill */}
      <path d="M56 140 v40 a12 12 0 0 0 12 12 h140 v-30" stroke={C} strokeWidth="14" />
      <path d="M56 140 v40 a12 12 0 0 0 12 12 h140 v-30" stroke={O} strokeWidth="8" />
      <rect x="104" y="184" width="20" height="16" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="198" y="184" width="20" height="16" rx="3" fill={B} stroke={C} strokeWidth="3" />
      {/* shutoff valve on the line */}
      <rect x="146" y="180" width="30" height="24" rx="5" fill={O} stroke={C} strokeWidth="4" />
      <path d="M161 180 v-14" stroke={C} strokeWidth="4" />
      <rect x="148" y="158" width="26" height="10" rx="3" fill={B} stroke={C} strokeWidth="3" />
      {/* grill */}
      <rect x="228" y="110" width="150" height="56" rx="10" fill={O} stroke={C} strokeWidth="5" />
      <path d="M228 110 a75 40 0 0 1 150 0" fill={W} stroke={C} strokeWidth="5" />
      <rect x="292" y="60" width="22" height="8" rx="4" fill={C} />
      <rect x="242" y="128" width="12" height="12" rx="6" fill={B} stroke={C} strokeWidth="3" />
      <rect x="264" y="128" width="12" height="12" rx="6" fill={B} stroke={C} strokeWidth="3" />
      <path d="M250 166 v64 M356 166 v64" stroke={C} strokeWidth="8" />
      <circle cx="250" cy="234" r="8" fill={C} />
      <circle cx="356" cy="234" r="8" fill={C} />
      <path d="M378 138 h20 v-70" stroke={C} strokeWidth="6" />
      {/* blue flame above the grate */}
      <path d="M303 100 c-8 -10 -8 -18 -1 -26 c0 7 5 9 5 9 c0 -7 4 -11 8 -14 c-1 8 7 11 7 19 c0 8 -6 14 -13 14 c-3 0 -5 -1 -6 -2z" fill={B} stroke={C} strokeWidth="2" />
    </>
  ),
  "sump-pumps": (
    <>
      {/* basement wall, floor, and the pit cut open */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="190" width="400" height="110" fill={H} />
      <path d="M0 190 h400" stroke={C} strokeWidth="4" />
      <path d="M0 40 h400 M0 80 h400 M0 120 h400 M0 160 h400 M80 0 v40 M200 0 v40 M320 0 v40 M140 40 v40 M260 40 v40 M80 80 v40 M200 80 v40 M320 80 v40 M140 120 v40 M260 120 v40" stroke={C} strokeWidth="2" opacity="0.15" />
      {/* pit */}
      <path d="M130 190 v80 a12 12 0 0 0 12 12 h116 a12 12 0 0 0 12 -12 v-80" fill={W} stroke={C} strokeWidth="5" />
      <path d="M135 240 h130 v30 a7 7 0 0 1 -7 7 h-116 a7 7 0 0 1 -7 -7z" fill={B} opacity="0.35" />
      <path d="M135 240 h130" stroke={B} strokeWidth="4" />
      {/* pump in the pit */}
      <rect x="170" y="218" width="60" height="52" rx="8" fill={O} stroke={C} strokeWidth="4" />
      <rect x="182" y="206" width="36" height="16" rx="4" fill={B} stroke={C} strokeWidth="3" />
      <path d="M176 258 h48" stroke={C} strokeWidth="3" opacity="0.4" />
      {/* float on an arm */}
      <path d="M230 232 l26 -12" stroke={C} strokeWidth="4" />
      <circle cx="258" cy="218" r="9" fill={W} stroke={C} strokeWidth="4" />
      {/* discharge pipe up and out through the wall */}
      <path d="M200 206 v-120 a14 14 0 0 1 14 -14 h186" stroke={C} strokeWidth="18" />
      <path d="M200 206 v-120 a14 14 0 0 1 14 -14 h186" stroke={O} strokeWidth="10" />
      <rect x="188" y="150" width="24" height="18" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="300" y="60" width="18" height="24" rx="3" fill={B} stroke={C} strokeWidth="3" />
      {/* check valve on the riser */}
      <rect x="186" y="110" width="28" height="22" rx="5" fill={O} stroke={C} strokeWidth="4" />
      <path d="M194 121 l8 -6 v12z" fill={B} />
      {/* battery backup on the wall */}
      <rect x="40" y="70" width="90" height="100" rx="10" fill={O} stroke={C} strokeWidth="5" />
      <rect x="54" y="84" width="62" height="36" rx="6" fill={W} stroke={C} strokeWidth="3" />
      <rect x="62" y="96" width="46" height="12" rx="3" fill={B} />
      <circle cx="70" cy="146" r="6" fill={B} stroke={C} strokeWidth="2" />
      <circle cx="90" cy="146" r="6" fill={W} stroke={C} strokeWidth="2" />
      <path d="M130 130 h40 v90" stroke={C} strokeWidth="4" strokeDasharray="6 6" />
      {/* a lightning bolt on the box, power out */}
      <path d="M100 138 l-8 12 h7 l-3 10 l10 -14 h-7z" fill={B} stroke={C} strokeWidth="2" />
    </>
  ),
  "water-softeners": (
    <>
      {/* basement wall and floor */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="250" width="400" height="50" fill={H} />
      <path d="M0 250 h400" stroke={C} strokeWidth="4" />
      <path d="M0 40 h400 M0 80 h400 M0 120 h400 M0 160 h400 M0 200 h400 M80 0 v40 M200 0 v40 M320 0 v40 M140 40 v40 M260 40 v40 M80 80 v40 M200 80 v40 M320 80 v40 M140 120 v40 M260 120 v40 M80 160 v40 M200 160 v40 M320 160 v40" stroke={C} strokeWidth="2" opacity="0.15" />
      {/* resin tank with control head */}
      <rect x="110" y="70" width="80" height="180" rx="18" fill={O} stroke={C} strokeWidth="5" />
      <rect x="100" y="40" width="100" height="40" rx="12" fill={B} stroke={C} strokeWidth="5" />
      <rect x="126" y="52" width="48" height="16" rx="4" fill={W} stroke={C} strokeWidth="3" />
      <circle cx="150" cy="60" r="4" fill={B} />
      <path d="M130 200 h40" stroke={C} strokeWidth="3" opacity="0.35" />
      {/* brine tank */}
      <rect x="220" y="120" width="76" height="130" rx="10" fill={W} stroke={C} strokeWidth="5" />
      <rect x="212" y="106" width="92" height="20" rx="6" fill={O} stroke={C} strokeWidth="4" />
      <path d="M232 200 h52" stroke={B} strokeWidth="5" opacity="0.5" />
      <path d="M200 60 h60 v46" stroke={C} strokeWidth="6" />
      {/* supply in, soft water out, with a bypass valve */}
      <path d="M0 96 h100" stroke={C} strokeWidth="18" />
      <path d="M0 96 h100" stroke={O} strokeWidth="10" />
      <path d="M200 96 h200" stroke={C} strokeWidth="18" />
      <path d="M200 96 h200" stroke={O} strokeWidth="10" />
      <rect x="40" y="84" width="22" height="24" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="330" y="84" width="22" height="24" rx="3" fill={B} stroke={C} strokeWidth="3" />
      {/* hard water in, soft water out */}
      <path d="M60 150 l-4 -4 M70 146 l4 4 M56 160 l8 0" stroke={C} strokeWidth="3" opacity="0.5" />
      <path d="M350 140 c8 10 14 18 14 26 a14 14 0 0 1 -28 0 c0 -8 6 -16 14 -26z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M340 200 h24 M346 212 h12" stroke={B} strokeWidth="3" opacity="0.5" />
      {/* drain line to the floor */}
      <path d="M150 250 v-12" stroke={C} strokeWidth="6" strokeDasharray="4 5" />
    </>
  ),
  "emergency-plumbing": (
    <>
      {/* basement at night, a burst line spraying */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="250" width="400" height="50" fill={H} />
      <path d="M0 250 h400" stroke={C} strokeWidth="4" />
      {/* the pipe across the wall with a split */}
      <path d="M0 110 h400" stroke={C} strokeWidth="22" />
      <path d="M0 110 h400" stroke={O} strokeWidth="14" />
      <rect x="60" y="98" width="22" height="26" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="330" y="98" width="22" height="26" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <path d="M212 100 l6 8 l-6 6 l6 6" stroke={C} strokeWidth="3" />
      {/* spray */}
      <path d="M216 96 l-10 -30 M222 94 l4 -34 M228 96 l18 -26 M232 100 l30 -14" stroke={B} strokeWidth="5" />
      <circle cx="200" cy="58" r="4" fill={B} />
      <circle cx="252" cy="62" r="4" fill={B} />
      <circle cx="270" cy="80" r="3" fill={B} />
      {/* drips and a puddle */}
      <path d="M220 128 c5 7 9 12 9 17 a9 9 0 0 1 -18 0 c0 -5 4 -10 9 -17z" fill={B} stroke={C} strokeWidth="3" />
      <path d="M220 168 c5 7 9 12 9 17 a9 9 0 0 1 -18 0 c0 -5 4 -10 9 -17z" fill={B} stroke={C} strokeWidth="3" />
      <ellipse cx="220" cy="246" rx="60" ry="10" fill={B} opacity="0.35" />
      <path d="M160 246 a60 10 0 0 1 120 0" stroke={B} strokeWidth="3" />
      {/* main shutoff with an arrow, the thing we talk you through */}
      <rect x="100" y="94" width="40" height="32" rx="6" fill={O} stroke={C} strokeWidth="4" />
      <path d="M120 94 v-22" stroke={C} strokeWidth="5" />
      <rect x="100" y="60" width="40" height="14" rx="4" fill={B} stroke={C} strokeWidth="3" />
      <path d="M96 52 a28 28 0 0 1 24 -14" stroke={C} strokeWidth="3" strokeDasharray="4 4" />
      <path d="M118 36 l4 4 l-6 2z" fill={C} />
      {/* phone in hand, on the call */}
      <rect x="300" y="150" width="60" height="96" rx="12" fill={O} stroke={C} strokeWidth="4" />
      <rect x="308" y="164" width="44" height="62" rx="4" fill={W} stroke={C} strokeWidth="3" />
      <circle cx="330" cy="236" r="4" fill={C} />
      <circle cx="330" cy="188" r="14" fill={B} />
      <path d="M324 184 h3l1.5 3.5 -2 1.5a8 8 0 0 0 4 4l1.5 -2 3.5 1.5v3a1.5 1.5 0 0 1 -1.5 1.5a12 12 0 0 1 -12 -12a1.5 1.5 0 0 1 1.5 -1.5z" fill={W} />
      <path d="M368 176 c6 6 6 14 0 20 M380 166 c12 10 12 30 0 40" stroke={B} strokeWidth="4" />
    </>
  ),

  "planning-and-takeoffs": (
    <>
      {/* plans on a table */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="230" width="400" height="70" fill={H} />
      <path d="M0 230 h400" stroke={C} strokeWidth="4" />
      {/* drawing sheet */}
      <path d="M50 60 h230 l40 40 v140 h-270z" fill={W} stroke={C} strokeWidth="5" />
      <path d="M280 60 v40 h40" fill={O} stroke={C} strokeWidth="5" />
      {/* floor plan lines */}
      <path d="M80 100 h150 v100 h-150z" stroke={C} strokeWidth="3" opacity="0.5" />
      <path d="M80 150 h70 M150 100 v50" stroke={C} strokeWidth="3" opacity="0.5" />
      {/* fixture symbols in blue, pipe run */}
      <rect x="92" y="108" width="22" height="14" rx="3" fill={B} />
      <circle cx="200" cy="120" r="8" fill="none" stroke={B} strokeWidth="4" />
      <rect x="170" y="170" width="30" height="18" rx="4" fill="none" stroke={B} strokeWidth="4" />
      <path d="M103 122 v28 h97 v-22 M185 188 v-16" stroke={B} strokeWidth="4" strokeDasharray="7 5" />
      {/* scale ruler and pencil */}
      <rect x="230" y="150" width="120" height="16" rx="3" fill={O} stroke={C} strokeWidth="3" transform="rotate(-20 290 158)" />
      <path d="M244 160 l6 -2 M258 155 l6 -2 M272 150 l6 -2 M286 145 l6 -2 M300 140 l6 -2" stroke={C} strokeWidth="2" opacity="0.6" />
      <path d="M300 200 l70 -40" stroke={C} strokeWidth="12" />
      <path d="M300 200 l70 -40" stroke={B} strokeWidth="6" />
      <path d="M298 204 l-12 4 l6 -12z" fill={C} />
      {/* takeoff tally */}
      <rect x="330" y="76" width="50" height="60" rx="6" fill={W} stroke={C} strokeWidth="3" />
      <path d="M340 92 h30 M340 104 h30 M340 116 h20" stroke={C} strokeWidth="3" opacity="0.4" />
      <path d="M340 128 h30" stroke={B} strokeWidth="4" />
    </>
  ),
  underground: (
    <>
      {/* trench before the pour */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="150" width="400" height="150" fill={H} />
      <path d="M0 150 h400" stroke={C} strokeWidth="4" />
      {/* form boards at grade */}
      <rect x="20" y="132" width="360" height="18" fill={O} stroke={C} strokeWidth="4" />
      {/* gravel */}
      <g fill="none" stroke={C} strokeWidth="2" opacity="0.35">
        <circle cx="60" cy="270" r="5" /><circle cx="110" cy="282" r="4" /><circle cx="160" cy="268" r="5" /><circle cx="230" cy="280" r="4" /><circle cx="300" cy="266" r="5" /><circle cx="350" cy="284" r="4" /><circle cx="40" cy="240" r="4" /><circle cx="370" cy="250" r="4" />
      </g>
      {/* main drain across, with a wye and stub-ups */}
      <path d="M20 224 h360" stroke={C} strokeWidth="24" />
      <path d="M20 224 h360" stroke={W} strokeWidth="16" />
      <path d="M120 224 v-90 M220 224 v-90 M320 224 v-90" stroke={C} strokeWidth="24" />
      <path d="M120 224 v-90 M220 224 v-90 M320 224 v-90" stroke={W} strokeWidth="16" />
      <rect x="106" y="112" width="28" height="18" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="206" y="112" width="28" height="18" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="306" y="112" width="28" height="18" rx="3" fill={B} stroke={C} strokeWidth="3" />
      <rect x="160" y="210" width="30" height="28" rx="4" fill={B} stroke={C} strokeWidth="3" />
      <rect x="260" y="210" width="30" height="28" rx="4" fill={B} stroke={C} strokeWidth="3" />
      {/* test plug and gauge */}
      <circle cx="60" cy="90" r="18" fill={W} stroke={C} strokeWidth="4" />
      <path d="M60 90 l8 -8" stroke={C} strokeWidth="3" />
      <path d="M60 108 v24" stroke={C} strokeWidth="5" />
      <path d="M46 132 h28" stroke={B} strokeWidth="6" />
    </>
  ),
  "gas-runs": (
    <>
      {/* manifold on a wall */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="250" width="400" height="50" fill={H} />
      <path d="M0 250 h400" stroke={C} strokeWidth="4" />
      <path d="M0 40 h400 M0 80 h400 M0 120 h400 M0 160 h400 M0 200 h400 M80 0 v40 M200 0 v40 M320 0 v40 M140 40 v40 M260 40 v40 M80 80 v40 M200 80 v40 M320 80 v40 M140 120 v40 M260 120 v40 M80 160 v40 M200 160 v40 M320 160 v40" stroke={C} strokeWidth="2" opacity="0.15" />
      {/* supply in, manifold body */}
      <path d="M0 150 h90" stroke={C} strokeWidth="18" />
      <path d="M0 150 h90" stroke={O} strokeWidth="10" />
      <rect x="90" y="120" width="60" height="60" rx="8" fill={O} stroke={C} strokeWidth="5" />
      <circle cx="120" cy="150" r="12" fill={W} stroke={C} strokeWidth="3" />
      <path d="M120 150 l6 -7" stroke={C} strokeWidth="3" />
      {/* four branch lines with valves */}
      <path d="M150 128 h230 M150 143 h230 M150 158 h230 M150 173 h230" stroke={C} strokeWidth="9" />
      <path d="M150 128 h230 M150 143 h230 M150 158 h230 M150 173 h230" stroke={O} strokeWidth="4" />
      <rect x="190" y="121" width="16" height="14" rx="3" fill={B} stroke={C} strokeWidth="2.5" />
      <rect x="230" y="136" width="16" height="14" rx="3" fill={B} stroke={C} strokeWidth="2.5" />
      <rect x="270" y="151" width="16" height="14" rx="3" fill={B} stroke={C} strokeWidth="2.5" />
      <rect x="310" y="166" width="16" height="14" rx="3" fill={B} stroke={C} strokeWidth="2.5" />
      {/* drops to appliances */}
      <path d="M380 128 v122 M380 173 v77" stroke={C} strokeWidth="9" />
      <path d="M380 128 v122" stroke={O} strokeWidth="4" />
      {/* pressure gauge with a check */}
      <circle cx="120" cy="70" r="26" fill={W} stroke={C} strokeWidth="4" />
      <circle cx="120" cy="70" r="19" fill={O} stroke={C} strokeWidth="2" />
      <path d="M120 70 l10 -10" stroke={C} strokeWidth="4" />
      <path d="M120 96 v24" stroke={C} strokeWidth="6" />
      <circle cx="150" cy="52" r="11" fill={B} stroke={C} strokeWidth="2.5" />
      <path d="M144 52 l4 4 l8 -8" stroke={W} strokeWidth="3" />
      {/* a flame at the appliance drop */}
      <path d="M380 236 c-8 -8 -8 -16 -1 -24 c0 7 5 9 5 9 c0 -7 4 -10 8 -13 c-1 8 7 11 7 18 c0 7 -6 12 -13 12 c-2 0 -4 -1 -6 -2z" fill={B} stroke={C} strokeWidth="2" transform="translate(-38 -12)" />
    </>
  ),
  "water-and-sewer-tie-in": (
    <>
      {/* street to house, cut open */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="130" width="400" height="170" fill={H} />
      <path d="M0 130 h400" stroke={C} strokeWidth="4" />
      {/* street at left with a curb */}
      <rect x="0" y="118" width="110" height="12" fill={C} opacity="0.7" />
      <path d="M110 118 v12" stroke={C} strokeWidth="4" />
      {/* house at right */}
      <path d="M280 130 v-60 h100 v60" fill={O} stroke={C} strokeWidth="4" />
      <path d="M270 72 l60 -40 l60 40" fill={W} stroke={C} strokeWidth="4" />
      <rect x="318" y="94" width="24" height="36" rx="2" fill={B} stroke={C} strokeWidth="3" />
      {/* water main and service line to the house */}
      <path d="M0 190 h60" stroke={C} strokeWidth="18" />
      <path d="M0 190 h60" stroke={W} strokeWidth="10" />
      <path d="M60 190 h230 v-60" stroke={B} strokeWidth="9" />
      {/* meter pit */}
      <rect x="40" y="130" width="44" height="40" rx="4" fill={W} stroke={C} strokeWidth="4" />
      <circle cx="62" cy="150" r="10" fill={O} stroke={C} strokeWidth="3" />
      <path d="M62 150 l5 -5" stroke={C} strokeWidth="2.5" />
      {/* sewer lateral sloping down to the main */}
      <path d="M300 130 v90 l-240 26" stroke={C} strokeWidth="22" />
      <path d="M300 130 v90 l-240 26" stroke={W} strokeWidth="14" />
      <path d="M0 262 h70" stroke={C} strokeWidth="26" />
      <path d="M0 262 h70" stroke={W} strokeWidth="18" />
      {/* backflow and cleanout */}
      <rect x="196" y="176" width="30" height="28" rx="5" fill={O} stroke={C} strokeWidth="4" />
      <path d="M204 190 l8 -6 v12z" fill={B} />
      <path d="M300 120 v-30" stroke={C} strokeWidth="14" />
      <rect x="288" y="80" width="24" height="14" rx="3" fill={B} stroke={C} strokeWidth="3" />
      {/* locate flag */}
      <path d="M150 128 v-36" stroke={C} strokeWidth="3" />
      <path d="M150 92 h26 l-8 9 l8 9 h-26z" fill={B} stroke={C} strokeWidth="2.5" />
    </>
  ),
  "trim-and-fixture-set": (
    <>
      {/* finished bath: vanity, faucet, shower trim */}
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="250" width="400" height="50" fill={H} />
      <path d="M0 250 h400" stroke={C} strokeWidth="4" />
      <path d="M0 40 h400 M0 80 h400 M0 120 h400 M60 40 v40 M140 40 v40 M220 40 v40 M300 40 v40 M100 80 v40 M180 80 v40 M260 80 v40 M340 80 v40" stroke={C} strokeWidth="2" opacity="0.18" />
      {/* vanity */}
      <rect x="40" y="150" width="200" height="16" rx="4" fill={O} stroke={C} strokeWidth="4" />
      <rect x="54" y="166" width="172" height="84" fill={O} stroke={C} strokeWidth="4" />
      <path d="M140 166 v84" stroke={C} strokeWidth="4" />
      <rect x="112" y="200" width="20" height="6" rx="3" fill={C} />
      <rect x="148" y="200" width="20" height="6" rx="3" fill={C} />
      {/* basin and faucet */}
      <path d="M90 152 v22 a10 10 0 0 0 10 10 h80 a10 10 0 0 0 10 -10 v-22" fill={W} stroke={C} strokeWidth="4" />
      <path d="M150 150 v-26 a20 20 0 0 0 -40 0 v8" stroke={C} strokeWidth="12" />
      <path d="M150 150 v-26 a20 20 0 0 0 -40 0 v8" stroke={O} strokeWidth="6" />
      <path d="M156 132 h18" stroke={B} strokeWidth="6" />
      {/* mirror */}
      <rect x="80" y="40" width="120" height="80" rx="6" fill={W} stroke={C} strokeWidth="4" />
      {/* shower trim on the right */}
      <path d="M320 40 v30 h20" stroke={C} strokeWidth="12" />
      <path d="M320 40 v30 h20" stroke={O} strokeWidth="6" />
      <path d="M340 60 h24 l6 14 h-36z" fill={O} stroke={C} strokeWidth="4" />
      <path d="M346 82 v10 M356 82 v14 M366 82 v10" stroke={B} strokeWidth="4" />
      <circle cx="330" cy="160" r="22" fill={W} stroke={C} strokeWidth="4" />
      <circle cx="330" cy="160" r="8" fill={B} />
      <path d="M330 160 l0 -14" stroke={C} strokeWidth="4" />
      {/* punch list on the counter */}
      <rect x="252" y="120" width="40" height="30" rx="4" fill={W} stroke={C} strokeWidth="3" />
      <path d="M260 130 l4 4 l8 -8 M260 142 h24" stroke={B} strokeWidth="3" />
    </>
  ),
};

const aliases: Record<string, string> = { "rough-in": "bath-and-kitchen-remodel" };

export function hasBandIllustration(slug: string) {
  return (aliases[slug] ?? slug) in scenes;
}

export function BandIllustration({ slug, title, className }: { slug: string; title: string; className?: string }) {
  const inner = scenes[aliases[slug] ?? slug];
  if (!inner) return null;
  return (
    <svg viewBox="0 0 400 300" fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={title} className={cn("block h-auto w-full overflow-hidden rounded-card border border-hairline-strong", className)}>
      {inner}
    </svg>
  );
}

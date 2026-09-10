/**
 * Design tokens for R.S. Johnson Plumbing.
 *
 * Single source of truth for color, type, spacing, and radius. Tailwind reads
 * these in tailwind.config.ts; components import them when a value is needed
 * outside a class name (SVG strokes, JSON-LD, etc.).
 *
 * Brand blues are sampled from the UngerBuild sign-in screen Daren supplied
 * (eagle #2868A8, navy 900 #0D2A4D).
 */
export const colors = {
  offwhite: "#F7F5F0",
  charcoal: "#2B2B2B",
  /** Brand blue, the St. Louis Blues alternate-jersey blue: buttons, links,
   * active states, the logo flanges, and inside the illustrations only
   * water, flame, pipe runs, and the one active part. Blue means "tap here"
   * on the page. */
  blue: "#2868A8",
  /** Navy: the builders bands, and the crew's shirts in the avatars. */
  blueDark: "#0D2A4D",
  /** Pale blue, for hover states on tappable chips. Illustrations and icon
   * tiles sit on sand instead, so the drawings read as warm, not as a
   * software tint. */
  blueTint: "#E4ECF6",
  blueOnDark: "#C2D6EE",
  /** Copper. Not in use since the palette went back to blue; kept for reference. */
  copper: "#A85A2E",
  /** Navy 900 family: blueDark is the builders bands, blueInk the deepest band. */
  blueInk: "#081C36",
  /** Muted text, and the second ink in the illustrations: metal fittings,
   * caps, handles, and rims. */
  slate: "#6E7178",
  hairline: "#E3DFD5",
  hairlineStrong: "#D8D3C5",
  sand: "#EFEBE1",
  white: "#FFFFFF",
  onDarkMuted: "#C9D3E3",
  onDarkHelper: "#D6DFEE",
  onDarkBlueTint: "#C2D6EE",
  darkCard: "#16385F",
  darkBorder: "#4F6E99",
} as const;

export const fonts = {
  sans: "'Figtree', ui-sans-serif, system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
} as const;

export const fontSize = {
  h1: { desktop: "48px", mobile: "32px" },
  h2: { desktop: "32px", mobile: "26px" },
  h3: "22px",
  body: { desktop: "18px", mobile: "16px" },
  small: "14px",
} as const;

export const radius = {
  button: "8px",
  card: "8px",
  iconTile: "10px",
} as const;

export const layout = {
  gutterDesktop: "64px",
  gutterMobile: "20px",
  maxWidth: "1440px",
  headerDesktop: "80px",
  headerMobile: "60px",
  stickyBarHeight: "76px",
  /** Below this width the site switches to the mobile header and sticky bar. */
  mobileBreakpoint: 1140,
} as const;

export const stroke = {
  icon: 1.6,
  check: 2,
} as const;

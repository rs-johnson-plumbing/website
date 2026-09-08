/**
 * Design tokens for R.S. Johnson Plumbing.
 *
 * Single source of truth for color, type, spacing, and radius. Tailwind reads
 * these in tailwind.config.ts; components import them when a value is needed
 * outside a class name (SVG strokes, JSON-LD, etc.).
 *
 * Brand hex values are eyeballed from the business card and unconfirmed.
 */
export const colors = {
  offwhite: "#F7F5F0",
  charcoal: "#2B2B2B",
  blue: "#2F6FE0",
  blueDark: "#1F4FB0",
  blueTint: "#E3EBFB",
  blueOnDark: "#A9C4F5",
  slate: "#6E7178",
  hairline: "#E3DFD5",
  hairlineStrong: "#D8D3C5",
  sand: "#EFEBE1",
  white: "#FFFFFF",
  onDarkMuted: "#C9C6BE",
  onDarkHelper: "#D9D6CE",
  onDarkBlueTint: "#DCE6FA",
  darkCard: "#3A3A3A",
  darkBorder: "#5C5C5C",
} as const;

export const fonts = {
  sans: "'Manrope', ui-sans-serif, system-ui, sans-serif",
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

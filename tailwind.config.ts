import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors, fonts, layout } from "./src/styles/tokens";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.json"],
  theme: {
    extend: {
      colors: {
        offwhite: colors.offwhite,
        charcoal: colors.charcoal,
        blue: {
          DEFAULT: colors.blue,
          dark: colors.blueDark,
          tint: colors.blueTint,
          ondark: colors.blueOnDark,
          ink: colors.blueInk,
        },
        slate: colors.slate,
        hairline: {
          DEFAULT: colors.hairline,
          strong: colors.hairlineStrong,
        },
        sand: colors.sand,
        ondark: {
          muted: colors.onDarkMuted,
          helper: colors.onDarkHelper,
          bluetint: colors.onDarkBlueTint,
        },
        darkcard: colors.darkCard,
        darkborder: colors.darkBorder,
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: fonts.serif.split(",").map((f) => f.trim()),
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.1", fontWeight: "600" }],
        "h1-m": ["32px", { lineHeight: "1.15", fontWeight: "600" }],
        h2: ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "h2-m": ["26px", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["18px", { lineHeight: "1.6" }],
        "body-m": ["16px", { lineHeight: "1.6" }],
        small: ["14px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        btn: "8px",
        card: "8px",
        tile: "10px",
      },
      spacing: {
        gutter: layout.gutterDesktop,
        "gutter-m": layout.gutterMobile,
        header: layout.headerDesktop,
        "header-m": layout.headerMobile,
        sticky: layout.stickyBarHeight,
      },
      maxWidth: {
        site: layout.maxWidth,
      },
      screens: {
        // "lg" is the desktop breakpoint: header, nav, and grids switch here.
        lg: `${layout.mobileBreakpoint}px`,
      },
    },
  },
  plugins: [
    // `builders:` applies inside a dark band (an element carrying .band-dark, or anything within one).
    // `bpage:` applies anywhere on a page whose audience is builders (AudienceProvider sets
    // data-audience on <body>); the sticky bar's button swap uses it.
    plugin(({ addVariant }) => {
      addVariant("builders", ":is(.band-dark&, .band-dark &)");
      addVariant("bpage", 'body[data-audience="builders"] &');
    }),
  ],
};

export default config;

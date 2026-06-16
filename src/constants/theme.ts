export const COLORS = {
  primary: "#2E5BFF",
  primaryStrong: "#0040E0",
  primaryLight: "#DDE1FF",
  primarySoft: "#EEF1FF",
  primaryDark: "#001356",
  secondary: "#FFD23F",
  secondarySoft: "#FFEFB0",
  mint: "#DDF7ED",
  lavender: "#EEE9FF",
  peach: "#FFE1DA",
  coral: "#FF9F89",
  amber: "#FAC775",
  pink: "#D4537E",
  teal: "#1D9E75",
  textPrimary: "#191C1D",
  textSecondary: "#434656",
  textMuted: "#747688",
  background: "#F8F9FA",
  surface: "#FFFFFF",
  surfaceSoft: "#F3F4F5",
  surfaceRaised: "#FFFFFF",
  surfacePressed: "#E7E8E9",
  border: "#C4C5D9",
  shadowBlue: "rgba(46,91,255,0.18)",
  shadowYellow: "rgba(252,208,61,0.28)",
  scrim: "rgba(25,28,29,0.16)",
  error: "#BA1A1A"
} as const;

export const FONT_FAMILY = {
  regular: "Quicksand_400Regular",
  medium: "Quicksand_500Medium",
  semiBold: "Quicksand_600SemiBold",
  bold: "Quicksand_700Bold"
} as const;

export const TYPOGRAPHY = {
  display: { fontFamily: FONT_FAMILY.bold, fontSize: 32, fontWeight: "700" as const, lineHeight: 40 },
  h1: { fontFamily: FONT_FAMILY.bold, fontSize: 28, fontWeight: "700" as const, lineHeight: 36 },
  h2: { fontFamily: FONT_FAMILY.semiBold, fontSize: 24, fontWeight: "600" as const, lineHeight: 32 },
  h3: { fontFamily: FONT_FAMILY.semiBold, fontSize: 18, fontWeight: "600" as const, lineHeight: 26 },
  body: { fontFamily: FONT_FAMILY.medium, fontSize: 16, fontWeight: "500" as const, lineHeight: 24 },
  small: { fontFamily: FONT_FAMILY.medium, fontSize: 13, fontWeight: "500" as const, lineHeight: 20 },
  label: { fontFamily: FONT_FAMILY.bold, fontSize: 12, fontWeight: "700" as const, lineHeight: 16, letterSpacing: 0.4 }
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  mobileMargin: 24,
  desktopMargin: 64
} as const;

export const RADIUS = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 999
} as const;

export const TOUCH_TARGET = {
  baby: 88,
  parent: 48
} as const;

export const SHADOWS = {
  card: {
    shadowColor: COLORS.primary,
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6
  },
  warm: {
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.28,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5
  },
  pressLip: {
    shadowColor: COLORS.primaryStrong,
    shadowOpacity: 0.22,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3
  }
} as const;

export const COLORS = {
  primary: "#7F77DD",
  primaryLight: "#EEEDFE",
  primaryDark: "#3C3489",
  teal: "#1D9E75",
  coral: "#D85A30",
  amber: "#FAC775",
  pink: "#D4537E",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B6B6B",
  background: "#FFFFFF",
  surface: "#F8F7FE",
  border: "rgba(0,0,0,0.08)"
} as const;

export const TYPOGRAPHY = {
  h1: { fontSize: 28, fontWeight: "500" as const },
  h2: { fontSize: 22, fontWeight: "500" as const },
  h3: { fontSize: 18, fontWeight: "500" as const },
  body: { fontSize: 16, lineHeight: 26 },
  small: { fontSize: 13, lineHeight: 20 },
  label: { fontSize: 11 }
} as const;

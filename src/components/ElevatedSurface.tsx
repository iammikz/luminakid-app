import type React from "react";
import { StyleSheet, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import { COLORS, RADIUS, SHADOWS, SPACING } from "../constants/theme";

interface ElevatedSurfaceProps {
  children: React.ReactNode;
  tone?: "white" | "lavender" | "mint" | "peach" | "yellow";
  style?: StyleProp<ViewStyle>;
}

const toneColors = {
  white: COLORS.surfaceRaised,
  lavender: COLORS.lavender,
  mint: COLORS.mint,
  peach: COLORS.peach,
  yellow: COLORS.secondarySoft
} as const;

export function ElevatedSurface({ children, tone = "white", style }: ElevatedSurfaceProps) {
  return <View style={[styles.surface, { backgroundColor: toneColors[tone] }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  surface: {
    gap: SPACING.md,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.card
  }
});

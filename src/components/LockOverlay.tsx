import { StyleSheet, Text, View } from "react-native";

import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from "../constants/theme";

interface LockOverlayProps {
  unlockMonth: number;
}

export function LockOverlay({ unlockMonth }: LockOverlayProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.iconBubble}>
        <Text style={styles.icon}>🔒</Text>
      </View>
      <Text style={styles.title}>Unlocks at {unlockMonth} months</Text>
      <Text style={styles.copy}>LuminaKid opens each activity when your baby reaches the right milestone window.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    minHeight: 320,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.secondarySoft,
    padding: SPACING.xl,
    ...SHADOWS.warm
  },
  iconBubble: {
    width: 92,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface
  },
  icon: {
    fontSize: 38
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primaryDark,
    textAlign: "center"
  },
  copy: {
    ...TYPOGRAPHY.body,
    maxWidth: 320,
    color: COLORS.textSecondary,
    textAlign: "center"
  }
});

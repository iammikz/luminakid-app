import { StyleSheet, Text, View } from "react-native";

import { COLORS, TYPOGRAPHY } from "../constants/theme";

interface LockOverlayProps {
  unlockMonth: number;
}

export function LockOverlay({ unlockMonth }: LockOverlayProps) {
  return (
    <View style={styles.overlay}>
      <Text style={styles.icon}>Lock</Text>
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
    gap: 12,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    padding: 24
  },
  icon: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    textAlign: "center"
  },
  copy: {
    ...TYPOGRAPHY.body,
    maxWidth: 320,
    color: COLORS.textSecondary,
    textAlign: "center"
  }
});

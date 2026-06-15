import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from "../constants/theme";
import type { ActivityProps } from "../types/activity";

interface PlaceholderProps extends ActivityProps {
  emoji: string;
  title: string;
  goal: string;
}

export function ActivityPlaceholder({ babyAgeMonths, emoji, title, goal }: PlaceholderProps) {
  return (
    <Pressable style={({ pressed }) => [styles.canvas, pressed && styles.pressed]}>
      <View style={styles.orb}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.goal}>{goal}</Text>
      <Text style={styles.age}>Baby age: {babyAgeMonths} months</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  canvas: {
    minHeight: 360,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.primaryLight,
    padding: SPACING.lg,
    ...SHADOWS.card
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  },
  orb: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    backgroundColor: COLORS.background,
    ...SHADOWS.warm
  },
  emoji: {
    fontSize: 64
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primaryDark,
    textAlign: "center"
  },
  goal: {
    ...TYPOGRAPHY.body,
    maxWidth: 320,
    color: COLORS.textSecondary,
    textAlign: "center"
  },
  age: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary
  }
});

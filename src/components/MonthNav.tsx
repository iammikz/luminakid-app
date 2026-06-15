import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { COLORS, RADIUS, SHADOWS, SPACING, TOUCH_TARGET, TYPOGRAPHY } from "../constants/theme";
import type { Activity } from "../types/activity";

interface MonthNavProps {
  activities: Activity[];
  babyAgeMonths: number;
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
}

export function MonthNav({ activities, babyAgeMonths, selectedMonth, onSelectMonth }: MonthNavProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
      {activities.map((activity) => {
        const locked = babyAgeMonths < activity.minMonths;
        const selected = selectedMonth === activity.minMonths;
        return (
          <Pressable
            key={activity.id}
            accessibilityRole="button"
            disabled={locked}
            onPress={() => onSelectMonth(activity.minMonths)}
            style={({ pressed }) => [styles.item, selected && styles.selected, locked && styles.locked, pressed && styles.pressed]}
          >
            <Text style={styles.emoji}>{activity.emoji}</Text>
            <Text style={[styles.label, selected && styles.selectedLabel]}>{activity.minMonths}m</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.md,
    paddingHorizontal: SPACING.mobileMargin,
    paddingVertical: SPACING.sm
  },
  item: {
    width: TOUCH_TARGET.baby,
    height: TOUCH_TARGET.baby,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    ...SHADOWS.card
  },
  selected: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primaryStrong,
    shadowOpacity: 0.24
  },
  locked: {
    opacity: 0.42,
    backgroundColor: COLORS.surfaceSoft
  },
  pressed: {
    transform: [{ translateY: 3 }, { scale: 0.97 }]
  },
  emoji: {
    fontSize: 30
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary
  },
  selectedLabel: {
    color: COLORS.background
  }
});

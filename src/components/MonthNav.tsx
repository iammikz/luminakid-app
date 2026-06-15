import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { COLORS, TYPOGRAPHY } from "../constants/theme";
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
            style={[styles.item, selected && styles.selected, locked && styles.locked]}
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
    gap: 10,
    paddingHorizontal: 20
  },
  item: {
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background
  },
  selected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary
  },
  locked: {
    opacity: 0.4
  },
  emoji: {
    fontSize: 28
  },
  label: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary
  },
  selectedLabel: {
    color: COLORS.background
  }
});

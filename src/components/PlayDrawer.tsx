import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS, RADIUS, SHADOWS, SPACING, TOUCH_TARGET, TYPOGRAPHY } from "../constants/theme";
import { buildPlayDrawerItems } from "../engine/playDrawerItems";
import type { Activity } from "../types/activity";
import { SkillTags } from "./SkillTags";

interface PlayDrawerProps {
  activities: Activity[];
  activity: Activity;
  babyAgeMonths: number;
  babyName: string;
  onSelectMonth: (month: number) => void;
  onOpenOptions: () => void;
}

export function PlayDrawer({ activities, activity, babyAgeMonths, babyName, onSelectMonth, onOpenOptions }: PlayDrawerProps) {
  const items = buildPlayDrawerItems(activities, babyAgeMonths, activity.minMonths);

  return (
    <View style={styles.drawer}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{babyName}</Text>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.goal}>{activity.goal}</Text>
        <SkillTags skills={activity.skills} style={styles.tags} />
      </View>

      <View style={styles.activityGroup}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.monthList}>
          {items.map((item) => (
            <Pressable
              key={item.id}
              accessibilityLabel={`${item.title}, ${item.locked ? "locked" : "unlocked"}, ${item.minMonths} months`}
              accessibilityRole="button"
              accessibilityState={{ disabled: item.locked, selected: item.selected }}
              disabled={item.locked}
              onPress={() => onSelectMonth(item.minMonths)}
              style={({ pressed }) => [
                styles.monthItem,
                item.selected && styles.monthItemSelected,
                item.locked && styles.monthItemLocked,
                pressed && styles.monthItemPressed
              ]}
            >
              <View style={[styles.emojiBubble, item.selected && styles.emojiBubbleSelected]}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>
              <View style={styles.monthText}>
                <Text style={[styles.monthLabel, item.selected && styles.monthLabelSelected]}>{item.monthLabel}</Text>
                <Text style={[styles.monthTitle, item.selected && styles.monthTitleSelected]} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
              {item.locked ? <Text style={styles.lock}>Locked</Text> : null}
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Pressable
        accessibilityLabel="Open app navigation options"
        accessibilityRole="button"
        onPress={onOpenOptions}
        style={({ pressed }) => [styles.optionsButton, pressed && styles.optionsButtonPressed]}
      >
        <Text style={styles.optionsLabel}>Options</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    width: "86%",
    maxWidth: 340,
    height: "100%",
    backgroundColor: COLORS.surfaceRaised,
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    ...SHADOWS.card
  },
  header: {
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.md
  },
  eyebrow: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primaryDark
  },
  goal: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary
  },
  tags: {
    paddingHorizontal: 0
  },
  activityGroup: {
    flex: 1,
    minHeight: 0
  },
  monthList: {
    gap: SPACING.sm,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md
  },
  monthItem: {
    minHeight: TOUCH_TARGET.baby,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceSoft,
    padding: SPACING.sm
  },
  monthItemSelected: {
    backgroundColor: COLORS.primary
  },
  monthItemLocked: {
    opacity: 0.46
  },
  monthItemPressed: {
    transform: [{ translateY: 2 }, { scale: 0.99 }]
  },
  emojiBubble: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface
  },
  emojiBubbleSelected: {
    backgroundColor: "rgba(255,255,255,0.22)"
  },
  emoji: {
    fontSize: 30
  },
  monthText: {
    flex: 1,
    minWidth: 0
  },
  monthLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary
  },
  monthLabelSelected: {
    color: COLORS.secondary
  },
  monthTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary
  },
  monthTitleSelected: {
    color: COLORS.background
  },
  lock: {
    ...TYPOGRAPHY.label,
    color: COLORS.textMuted
  },
  optionsButton: {
    minHeight: TOUCH_TARGET.parent,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.pressLip
  },
  optionsButtonPressed: {
    transform: [{ translateY: 2 }, { scale: 0.98 }],
    backgroundColor: COLORS.primaryStrong
  },
  optionsLabel: {
    ...TYPOGRAPHY.h3,
    color: COLORS.background
  }
});

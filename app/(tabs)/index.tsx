import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { DepthBackdrop } from "../../src/components/DepthBackdrop";
import { ElevatedSurface } from "../../src/components/ElevatedSurface";
import { LockOverlay } from "../../src/components/LockOverlay";
import { MonthNav } from "../../src/components/MonthNav";
import { SkillTags } from "../../src/components/SkillTags";
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from "../../src/constants/theme";
import { getActiveActivity } from "../../src/engine/ageEngine";
import { ACTIVITY_REGISTRY } from "../../src/engine/activityRegistry";
import { useBabyAge } from "../../src/hooks/useBabyAge";
import { useBabyStore } from "../../src/store/useBabyStore";

export default function PlayScreen() {
  const baby = useBabyStore((state) => state.baby);
  const selectedMonth = useBabyStore((state) => state.selectedMonth);
  const setSelectedMonth = useBabyStore((state) => state.setSelectedMonth);
  const babyAgeMonths = useBabyAge();

  if (!baby) {
    return (
      <AppScreen>
        <ElevatedSurface style={styles.empty}>
          <Text style={styles.title}>LuminaKid</Text>
          <Link href="/setup" style={styles.link}>
            Set up baby profile
          </Link>
        </ElevatedSurface>
      </AppScreen>
    );
  }

  const autoActivity = getActiveActivity(babyAgeMonths, ACTIVITY_REGISTRY);
  const activeMonth = selectedMonth ?? autoActivity.minMonths;
  const activity = ACTIVITY_REGISTRY.find((item) => item.minMonths === activeMonth) ?? autoActivity;
  const ActivityComponent = activity.component;
  const locked = babyAgeMonths < activity.minMonths;

  return (
    <AppScreen centered={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ElevatedSurface tone="lavender" style={styles.header}>
          <DepthBackdrop />
          <Text style={styles.eyebrow}>{baby.name}</Text>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.copy}>{activity.goal}</Text>
        </ElevatedSurface>

        <MonthNav
          activities={ACTIVITY_REGISTRY}
          babyAgeMonths={babyAgeMonths}
          selectedMonth={activity.minMonths}
          onSelectMonth={setSelectedMonth}
        />

        <View style={styles.activitySlot}>
          {locked ? <LockOverlay unlockMonth={activity.minMonths} /> : <ActivityComponent babyAgeMonths={babyAgeMonths} />}
        </View>

        <SkillTags skills={activity.skills} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0
  },
  content: {
    gap: SPACING.lg,
    paddingVertical: SPACING.lg
  },
  header: {
    overflow: "hidden",
    marginHorizontal: SPACING.mobileMargin,
    gap: SPACING.sm,
    minHeight: 180
  },
  eyebrow: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary
  },
  title: {
    ...TYPOGRAPHY.display,
    color: COLORS.primaryDark
  },
  copy: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary
  },
  activitySlot: {
    marginHorizontal: SPACING.mobileMargin,
    borderRadius: RADIUS.xl,
    ...SHADOWS.card
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.lg
  },
  link: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary
  }
});

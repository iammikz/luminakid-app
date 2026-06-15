import { Link } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { LockOverlay } from "../../src/components/LockOverlay";
import { MonthNav } from "../../src/components/MonthNav";
import { SkillTags } from "../../src/components/SkillTags";
import { COLORS, TYPOGRAPHY } from "../../src/constants/theme";
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
      <SafeAreaView style={styles.safe}>
        <View style={styles.empty}>
          <Text style={styles.title}>LuminaKid</Text>
          <Link href="/setup" style={styles.link}>
            Set up baby profile
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  const autoActivity = getActiveActivity(babyAgeMonths, ACTIVITY_REGISTRY);
  const activeMonth = selectedMonth ?? autoActivity.minMonths;
  const activity = ACTIVITY_REGISTRY.find((item) => item.minMonths === activeMonth) ?? autoActivity;
  const ActivityComponent = activity.component;
  const locked = babyAgeMonths < activity.minMonths;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{baby.name}</Text>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.copy}>{activity.goal}</Text>
        </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.surface
  },
  content: {
    gap: 20,
    paddingVertical: 24
  },
  header: {
    gap: 8,
    paddingHorizontal: 20
  },
  eyebrow: {
    ...TYPOGRAPHY.small,
    color: COLORS.primary
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary
  },
  copy: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary
  },
  activitySlot: {
    paddingHorizontal: 20
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    padding: 24
  },
  link: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary
  }
});

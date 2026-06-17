import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { ElevatedSurface } from "../../src/components/ElevatedSurface";
import { JournalCard } from "../../src/components/JournalCard";
import { COLORS, SPACING, TYPOGRAPHY } from "../../src/constants/theme";
import { getSupportedJournalMonth } from "../../src/engine/ageEngine";
import { getSelectableActivity } from "../../src/engine/activitySelection";
import { ACTIVITY_REGISTRY } from "../../src/engine/activityRegistry";
import { JOURNAL_DATA } from "../../src/engine/journalData";
import { useBabyAge } from "../../src/hooks/useBabyAge";
import { useBabyStore } from "../../src/store/useBabyStore";

export default function JournalScreen() {
  const baby = useBabyStore((state) => state.baby);
  const selectedMonth = useBabyStore((state) => state.selectedMonth);
  const babyAgeMonths = useBabyAge();

  if (!baby) {
    return (
      <AppScreen>
        <ElevatedSurface style={styles.empty}>
          <Text style={styles.title}>Journal</Text>
          <Link href="/setup" style={styles.link}>
            Set up baby profile
          </Link>
        </ElevatedSurface>
      </AppScreen>
    );
  }

  const activity = getSelectableActivity(selectedMonth, babyAgeMonths, ACTIVITY_REGISTRY);
  const journalMonth = getSupportedJournalMonth(activity.minMonths);
  const journal = JOURNAL_DATA[journalMonth];

  return (
    <AppScreen centered={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ElevatedSurface tone="peach" style={styles.header}>
          <Text style={styles.eyebrow}>{baby.name}</Text>
          <Text style={styles.title}>{journal.monthLabel}</Text>
          <Text style={styles.copy}>Development notes and real-world play ideas for this stage.</Text>
        </ElevatedSurface>

        <JournalCard title="Development Focus" tone="white">
          <Text style={styles.body}>{journal.developmentFocus}</Text>
          <Text style={styles.tip}>{journal.parentTip}</Text>
        </JournalCard>

        <JournalCard title="Milestones This Month" tone="lavender">
          <View style={styles.list}>
            {journal.milestones.map((milestone) => (
              <Text key={milestone} style={styles.body}>
                • {milestone}
              </Text>
            ))}
          </View>
        </JournalCard>

        <JournalCard title="Parent Activity Idea" tone="mint">
          <Text style={styles.body}>{journal.parentActivity}</Text>
        </JournalCard>
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
    padding: SPACING.mobileMargin
  },
  header: {
    gap: SPACING.sm
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
  body: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary
  },
  tip: {
    ...TYPOGRAPHY.body,
    marginTop: 10,
    color: COLORS.primaryDark
  },
  list: {
    gap: SPACING.sm
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

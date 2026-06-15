import { Link } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { JournalCard } from "../../src/components/JournalCard";
import { COLORS, TYPOGRAPHY } from "../../src/constants/theme";
import { getActiveActivity, getSupportedJournalMonth } from "../../src/engine/ageEngine";
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
      <SafeAreaView style={styles.safe}>
        <View style={styles.empty}>
          <Text style={styles.title}>Journal</Text>
          <Link href="/setup" style={styles.link}>
            Set up baby profile
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  const autoActivity = getActiveActivity(babyAgeMonths, ACTIVITY_REGISTRY);
  const journalMonth = getSupportedJournalMonth(selectedMonth ?? autoActivity.minMonths);
  const journal = JOURNAL_DATA[journalMonth];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{baby.name}</Text>
          <Text style={styles.title}>{journal.monthLabel}</Text>
          <Text style={styles.copy}>Development notes and real-world play ideas for this stage.</Text>
        </View>

        <JournalCard title="Development Focus">
          <Text style={styles.body}>{journal.developmentFocus}</Text>
          <Text style={styles.tip}>{journal.parentTip}</Text>
        </JournalCard>

        <JournalCard title="Milestones This Month">
          <View style={styles.list}>
            {journal.milestones.map((milestone) => (
              <Text key={milestone} style={styles.body}>
                • {milestone}
              </Text>
            ))}
          </View>
        </JournalCard>

        <JournalCard title="Parent Activity Idea">
          <Text style={styles.body}>{journal.parentActivity}</Text>
        </JournalCard>
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
    gap: 16,
    padding: 20
  },
  header: {
    gap: 8
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
    gap: 8
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

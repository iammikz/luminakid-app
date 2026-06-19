import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen } from "../src/components/AppScreen";
import { BirthDateField } from "../src/components/BirthDateField";
import { DepthBackdrop } from "../src/components/DepthBackdrop";
import { ElevatedSurface } from "../src/components/ElevatedSurface";
import { TactileButton } from "../src/components/TactileButton";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../src/constants/theme";
import {
  DEFAULT_BABY_NAME,
  DEFAULT_DATE_OF_BIRTH,
  createBabyProfile,
  getMonthsUntilFirstActivity,
  validateDateOfBirth
} from "../src/engine/onboarding";
import { useBabyStore } from "../src/store/useBabyStore";

export default function SetupScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const baby = useBabyStore((state) => state.baby);
  const setBaby = useBabyStore((state) => state.setBaby);
  const updateBaby = useBabyStore((state) => state.updateBaby);
  const isEditing = mode === "edit" && baby !== null;
  const [name, setName] = useState(isEditing ? baby.name : DEFAULT_BABY_NAME);
  const [dateOfBirth, setDateOfBirth] = useState(isEditing ? baby.dateOfBirth : DEFAULT_DATE_OF_BIRTH);
  const [error, setError] = useState<string | null>(null);
  const [monthsUntilFirstActivity, setMonthsUntilFirstActivity] = useState<number | null>(null);

  const save = () => {
    const validationError = validateDateOfBirth(dateOfBirth);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    if (isEditing) {
      updateBaby(name, dateOfBirth);
    } else {
      setBaby(createBabyProfile(name, dateOfBirth));
    }
    const monthsUntilUnlock = getMonthsUntilFirstActivity(dateOfBirth);
    if (monthsUntilUnlock > 0) {
      setMonthsUntilFirstActivity(monthsUntilUnlock);
      return;
    }
    router.replace("/(tabs)");
  };

  if (monthsUntilFirstActivity !== null) {
    return (
      <AppScreen>
        <ElevatedSurface style={styles.card}>
          <DepthBackdrop />
          <Text style={styles.brand}>LuminaKid</Text>
          <Text style={styles.title}>First activity coming soon</Text>
          <Text style={styles.copy}>
            Touch & Sparkle opens at 6 months. That is about {monthsUntilFirstActivity}{" "}
            {monthsUntilFirstActivity === 1 ? "month" : "months"} away.
          </Text>
          <Text style={styles.copy}>The journal is ready now with gentle real-world play ideas.</Text>
          <TactileButton accessibilityLabel="Open LuminaKid" onPress={() => router.replace("/(tabs)")}>
            Open LuminaKid
          </TactileButton>
        </ElevatedSurface>
      </AppScreen>
    );
  }

  return (
    <AppScreen centered={false} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ElevatedSurface style={styles.card}>
        <DepthBackdrop />
        <Text style={styles.brand}>LuminaKid</Text>
        <Text style={styles.title}>
          {isEditing ? "Edit your baby's profile" : "Set up your baby's first activity path"}
        </Text>
        <Text style={styles.copy}>
          Enter a birth date once. LuminaKid will open the right activity month by month.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Baby name</Text>
          <TextInput
            accessibilityLabel="Baby name"
            value={name}
            onChangeText={setName}
            placeholder={DEFAULT_BABY_NAME}
            style={styles.input}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date of birth</Text>
          <BirthDateField value={dateOfBirth} onChange={setDateOfBirth} />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TactileButton accessibilityLabel={isEditing ? "Save profile" : "Continue setup"} onPress={save}>
          {isEditing ? "Save profile" : "Continue"}
        </TactileButton>
        {isEditing ? (
          <TactileButton
            accessibilityLabel="Cancel profile editing"
            onPress={() => router.back()}
            variant="secondary"
          >
            Cancel
          </TactileButton>
        ) : null}
        </ElevatedSurface>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING.mobileMargin,
    paddingVertical: SPACING.lg
  },
  card: {
    overflow: "hidden",
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    gap: SPACING.md,
    padding: SPACING.xl
  },
  brand: {
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
  field: {
    gap: SPACING.sm
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.textPrimary
  },
  input: {
    minHeight: 56,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceSoft,
    paddingHorizontal: SPACING.md,
    color: COLORS.textPrimary
  },
  error: {
    ...TYPOGRAPHY.small,
    color: COLORS.error
  }
});

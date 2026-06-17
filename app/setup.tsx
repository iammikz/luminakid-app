import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen } from "../src/components/AppScreen";
import { DepthBackdrop } from "../src/components/DepthBackdrop";
import { ElevatedSurface } from "../src/components/ElevatedSurface";
import { TactileButton } from "../src/components/TactileButton";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../src/constants/theme";
import { createBabyProfile, getMonthsUntilFirstActivity, validateDateOfBirth } from "../src/engine/onboarding";
import { useBabyStore } from "../src/store/useBabyStore";

export default function SetupScreen() {
  const router = useRouter();
  const setBaby = useBabyStore((state) => state.setBaby);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [monthsUntilFirstActivity, setMonthsUntilFirstActivity] = useState<number | null>(null);

  const save = () => {
    const validationError = validateDateOfBirth(dateOfBirth);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setBaby(createBabyProfile(name, dateOfBirth));
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
    <AppScreen>
      <ElevatedSurface style={styles.card}>
        <DepthBackdrop />
        <Text style={styles.brand}>LuminaKid</Text>
        <Text style={styles.title}>Set up your baby's first activity path</Text>
        <Text style={styles.copy}>
          Enter a birth date once. LuminaKid will open the right activity month by month.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Baby name</Text>
          <TextInput
            accessibilityLabel="Baby name"
            value={name}
            onChangeText={setName}
            placeholder="Your baby"
            style={styles.input}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date of birth</Text>
          <TextInput
            accessibilityLabel="Date of birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder="YYYY-MM-DD"
            style={styles.input}
            keyboardType="numbers-and-punctuation"
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TactileButton accessibilityLabel="Continue setup" onPress={save}>Continue</TactileButton>
      </ElevatedSurface>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
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

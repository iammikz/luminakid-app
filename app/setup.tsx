import { differenceInMonths, isFuture, isValid, parseISO } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS, TYPOGRAPHY } from "../src/constants/theme";
import { useBabyStore } from "../src/store/useBabyStore";
import type { BabyProfile } from "../src/types/baby";

function createProfile(name: string, dateOfBirth: string): BabyProfile {
  const now = new Date().toISOString();
  return {
    id: `${Date.now()}`,
    name: name.trim() || "Your baby",
    dateOfBirth,
    createdAt: now
  };
}

function validateDob(value: string): string | null {
  const parsed = parseISO(value);
  if (!isValid(parsed)) {
    return "Enter a valid date as YYYY-MM-DD.";
  }
  if (isFuture(parsed)) {
    return "Date of birth must be in the past.";
  }
  if (differenceInMonths(new Date(), parsed) > 24) {
    return "LuminaKid currently supports babies up to 24 months.";
  }
  return null;
}

export default function SetupScreen() {
  const router = useRouter();
  const setBaby = useBabyStore((state) => state.setBaby);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    const validationError = validateDob(dateOfBirth);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setBaby(createProfile(name, dateOfBirth));
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.brand}>LuminaKid</Text>
        <Text style={styles.title}>Set up your baby's first activity path</Text>
        <Text style={styles.copy}>
          Enter a birth date once. LuminaKid will open the right activity month by month.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Baby name</Text>
          <TextInput
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
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder="YYYY-MM-DD"
            style={styles.input}
            keyboardType="numbers-and-punctuation"
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable accessibilityRole="button" onPress={save} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 18,
    padding: 24
  },
  brand: {
    ...TYPOGRAPHY.h3,
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
  field: {
    gap: 8
  },
  label: {
    ...TYPOGRAPHY.small,
    color: COLORS.textPrimary
  },
  input: {
    minHeight: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    color: COLORS.textPrimary
  },
  error: {
    ...TYPOGRAPHY.small,
    color: COLORS.coral
  },
  button: {
    minHeight: 88,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: COLORS.primary
  },
  buttonText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.background
  }
});

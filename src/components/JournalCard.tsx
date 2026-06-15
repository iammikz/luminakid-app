import { StyleSheet, Text, View } from "react-native";
import type React from "react";

import { COLORS, TYPOGRAPHY } from "../constants/theme";

interface JournalCardProps {
  title: string;
  children: React.ReactNode;
}

export function JournalCard({ title, children }: JournalCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    padding: 18
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary
  }
});

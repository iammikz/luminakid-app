import { StyleSheet, Text, View } from "react-native";
import type React from "react";

import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";
import { ElevatedSurface } from "./ElevatedSurface";

interface JournalCardProps {
  title: string;
  children: React.ReactNode;
  tone?: "white" | "lavender" | "mint" | "peach" | "yellow";
}

export function JournalCard({ title, children, tone = "white" }: JournalCardProps) {
  return (
    <ElevatedSurface tone={tone} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </ElevatedSurface>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: SPACING.md
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primaryDark
  }
});

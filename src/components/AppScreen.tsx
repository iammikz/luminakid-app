import type React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import { COLORS, SPACING } from "../constants/theme";

interface AppScreenProps {
  children: React.ReactNode;
  centered?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AppScreen({ children, centered = true, style }: AppScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.backdropTop} />
      <View style={styles.backdropBottom} />
      <View style={[styles.content, centered && styles.centered, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  backdropTop: {
    position: "absolute",
    top: -110,
    right: -40,
    left: -40,
    height: 260,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    backgroundColor: COLORS.primarySoft
  },
  backdropBottom: {
    position: "absolute",
    right: -40,
    bottom: -120,
    left: -40,
    height: 240,
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
    backgroundColor: COLORS.peach
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 920,
    alignSelf: "center",
    paddingHorizontal: SPACING.mobileMargin
  },
  centered: {
    justifyContent: "center"
  }
});

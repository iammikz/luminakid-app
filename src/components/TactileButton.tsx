import type React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

import { COLORS, RADIUS, SHADOWS, SPACING, TOUCH_TARGET, TYPOGRAPHY } from "../constants/theme";

interface TactileButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: "primary" | "secondary";
}

export function TactileButton({
  children,
  onPress,
  accessibilityLabel,
  style,
  textStyle,
  variant = "primary"
}: TactileButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" && styles.secondary,
        pressed && styles.pressed,
        style
      ]}
    >
      <Text style={[styles.text, variant === "secondary" && styles.secondaryText, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    ...SHADOWS.pressLip
  },
  secondary: {
    minHeight: TOUCH_TARGET.baby,
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.32
  },
  pressed: {
    transform: [{ translateY: 4 }, { scale: 0.98 }],
    shadowOffset: { width: 0, height: 1 }
  },
  text: {
    ...TYPOGRAPHY.h3,
    color: COLORS.surface,
    textAlign: "center"
  },
  secondaryText: {
    color: COLORS.primaryDark
  }
});

import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../constants/theme";

interface SkillTagsProps {
  skills: string[];
  style?: StyleProp<ViewStyle>;
}

export function SkillTags({ skills, style }: SkillTagsProps) {
  return (
    <View style={[styles.wrap, style]}>
      {skills.map((skill) => (
        <View key={skill} style={styles.tag}>
          <Text style={styles.text}>{skill}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.mobileMargin
  },
  tag: {
    minHeight: 40,
    justifyContent: "center",
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md
  },
  text: {
    ...TYPOGRAPHY.small,
    color: COLORS.primaryDark
  }
});

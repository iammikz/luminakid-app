import { StyleSheet, Text, View } from "react-native";

import { COLORS, TYPOGRAPHY } from "../constants/theme";

interface SkillTagsProps {
  skills: string[];
}

export function SkillTags({ skills }: SkillTagsProps) {
  return (
    <View style={styles.wrap}>
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
    gap: 8
  },
  tag: {
    minHeight: 36,
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14
  },
  text: {
    ...TYPOGRAPHY.small,
    color: COLORS.primaryDark
  }
});

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar, type DateData } from "react-native-calendars";

import { COLORS, RADIUS, SHADOWS, SPACING, TOUCH_TARGET, TYPOGRAPHY } from "../constants/theme";
import { formatBirthDate, getBirthDateBounds } from "../engine/birthDatePicker";

interface BirthDateFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function BirthDateField({ value, onChange }: BirthDateFieldProps) {
  const [expanded, setExpanded] = useState(false);
  const { minDate, maxDate } = getBirthDateBounds();

  const selectDate = (day: DateData) => {
    onChange(day.dateString);
    setExpanded(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityLabel={`Date of birth, ${formatBirthDate(value)}`}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded((current) => !current)}
        style={({ pressed }) => [styles.field, pressed && styles.pressed]}
      >
        <Ionicons name="calendar-outline" size={26} color={COLORS.primaryDark} />
        <Text style={styles.value}>{formatBirthDate(value)}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={COLORS.primaryDark}
        />
      </Pressable>

      {expanded ? (
        <View style={styles.calendarShell}>
          <Calendar
            current={value}
            minDate={minDate}
            maxDate={maxDate}
            onDayPress={selectDate}
            markedDates={{
              [value]: {
                selected: true,
                selectedColor: COLORS.primary,
                selectedTextColor: COLORS.surface
              }
            }}
            enableSwipeMonths
            theme={{
              calendarBackground: COLORS.surface,
              monthTextColor: COLORS.primaryDark,
              arrowColor: COLORS.primary,
              todayTextColor: COLORS.coral,
              dayTextColor: COLORS.textPrimary,
              textDisabledColor: COLORS.textMuted,
              textSectionTitleColor: COLORS.textSecondary,
              textDayFontFamily: "Quicksand_500Medium",
              textMonthFontFamily: "Quicksand_700Bold",
              textDayHeaderFontFamily: "Quicksand_600SemiBold"
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm
  },
  field: {
    minHeight: TOUCH_TARGET.baby,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceSoft,
    paddingHorizontal: SPACING.md
  },
  pressed: {
    opacity: 0.84
  },
  value: {
    ...TYPOGRAPHY.body,
    flex: 1,
    color: COLORS.textPrimary
  },
  calendarShell: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    ...SHADOWS.card
  }
});

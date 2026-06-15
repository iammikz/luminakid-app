import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, TYPOGRAPHY } from "../constants/theme";
import type { ActivityProps } from "../types/activity";
import type { Animal } from "./activityHelpers";
import { selectUniqueAnimals } from "./activityHelpers";

export function AnimalDiscovery(_props: ActivityProps) {
  const animals = useMemo(() => selectUniqueAnimals(4), []);
  const [activeAnimal, setActiveAnimal] = useState<Animal | null>(null);
  const speechTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (speechTimer.current) {
        clearTimeout(speechTimer.current);
      }
    },
    []
  );

  function showAnimal(animal: Animal) {
    if (speechTimer.current) {
      clearTimeout(speechTimer.current);
    }

    setActiveAnimal(animal);
    speechTimer.current = setTimeout(() => {
      setActiveAnimal((current) => (current?.id === animal.id ? null : current));
    }, 2000);
  }

  return (
    <View style={styles.canvas}>
      {activeAnimal ? (
        <View pointerEvents="none" style={styles.speechBubble}>
          <Text style={styles.speechText}>{activeAnimal.soundLabel}</Text>
        </View>
      ) : null}

      <View style={styles.grid}>
        {animals.map((animal) => (
          <Pressable
            key={animal.id}
            accessibilityLabel={animal.label}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => showAnimal(animal)}
          >
            <Text style={styles.emoji}>{animal.emoji}</Text>
            <Text style={styles.label}>{animal.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    minHeight: 380,
    justifyContent: "flex-end",
    borderRadius: 8,
    backgroundColor: "#FFF6E8",
    padding: 16
  },
  speechBubble: {
    position: "absolute",
    top: 18,
    right: 18,
    left: 18,
    zIndex: 1,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  speechText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryDark,
    textAlign: "center"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  card: {
    minWidth: 120,
    minHeight: 120,
    flexBasis: "47%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    padding: 12
  },
  cardPressed: {
    transform: [{ scale: 0.96 }],
    backgroundColor: COLORS.primaryLight
  },
  emoji: {
    fontSize: 54
  },
  label: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary
  }
});

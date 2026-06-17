import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from "../constants/theme";
import { useHaptics } from "../hooks/useHaptics";
import { useSound } from "../hooks/useSound";
import type { ActivityProps } from "../types/activity";

const WORDS = [
  { id: "ball", label: "Ball", emoji: "⚽" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "milk", label: "Milk", emoji: "🥛" },
  { id: "mama", label: "Mama", emoji: "👩" },
  { id: "dada", label: "Dada", emoji: "👨" }
];

function WordReveal({ active, label }: { active: boolean; label: string }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, { duration: active ? 180 : 320 });
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 8 }]
  }));

  return (
    <Animated.Text pointerEvents="none" style={[styles.word, animatedStyle]}>
      {label}
    </Animated.Text>
  );
}

export function FirstWords(_props: ActivityProps) {
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const wordTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { light } = useHaptics();
  const ballSound = useSound("ball");
  const catSound = useSound("cat");
  const milkSound = useSound("milk");
  const mamaSound = useSound("mama");
  const dadaSound = useSound("dada");

  useEffect(
    () => () => {
      if (wordTimer.current) {
        clearTimeout(wordTimer.current);
      }
    },
    []
  );

  const revealWord = useCallback((wordId: string) => {
    if (wordTimer.current) {
      clearTimeout(wordTimer.current);
    }

    light();
    const sounds = {
      ball: ballSound,
      cat: catSound,
      milk: milkSound,
      mama: mamaSound,
      dada: dadaSound
    };
    void sounds[wordId as keyof typeof sounds]?.play();
    setActiveWordId(wordId);
    wordTimer.current = setTimeout(() => {
      setActiveWordId((current) => (current === wordId ? null : current));
    }, 1000);
  }, [ballSound, catSound, dadaSound, light, mamaSound, milkSound]);

  return (
    <View style={styles.canvas}>
      <View style={styles.grid}>
        {WORDS.map((word) => {
          const active = activeWordId === word.id;

          return (
            <Pressable
              key={word.id}
              accessibilityLabel={word.label}
              style={({ pressed }) => [styles.card, active && styles.cardActive, pressed && styles.cardPressed]}
              onPress={() => revealWord(word.id)}
            >
              <Text style={styles.emoji}>{word.emoji}</Text>
              <WordReveal active={active} label={word.label} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    minHeight: 380,
    justifyContent: "center",
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.primarySoft,
    padding: SPACING.md,
    ...SHADOWS.card
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: SPACING.md
  },
  card: {
    width: 112,
    minHeight: 124,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.86)",
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    ...SHADOWS.card
  },
  cardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lavender
  },
  cardPressed: {
    transform: [{ translateY: 4 }, { scale: 0.97 }]
  },
  emoji: {
    fontSize: 50
  },
  word: {
    ...TYPOGRAPHY.h3,
    minHeight: 26,
    color: COLORS.primaryDark,
    textAlign: "center"
  }
});

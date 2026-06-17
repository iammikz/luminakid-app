import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

import { COLORS, RADIUS, SHADOWS, SPACING, TOUCH_TARGET } from "../constants/theme";
import { useHaptics } from "../hooks/useHaptics";
import { useSound } from "../hooks/useSound";
import type { ActivityProps } from "../types/activity";
import { areAllFlowersBloomed } from "./activityHelpers";

const FLOWERS = [
  { flower: "🌸", color: "#FFE2EF", accent: COLORS.pink },
  { flower: "🌼", color: "#FFF4C8", accent: COLORS.secondary },
  { flower: "🌷", color: "#FFE1DA", accent: COLORS.coral },
  { flower: "🌻", color: "#FFF1B8", accent: COLORS.amber },
  { flower: "🌺", color: "#EEE9FF", accent: COLORS.primary }
];

function Celebration({ active }: { active: boolean }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (active) {
      progress.value = withSequence(withTiming(1, { duration: 450 }), withTiming(0, { duration: 550 }));
    }
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.85 + progress.value * 0.25 }]
  }));

  if (!active) {
    return null;
  }

  return (
    <Animated.View pointerEvents="none" style={[styles.celebration, animatedStyle]}>
      <Text style={styles.celebrationText}>✦ ✦ ✦</Text>
    </Animated.View>
  );
}

export function ColorGarden(_props: ActivityProps) {
  const [bloomed, setBloomed] = useState<boolean[]>(() => FLOWERS.map(() => false));
  const [backgroundColor, setBackgroundColor] = useState<string>(COLORS.mint);
  const allBloomed = areAllFlowersBloomed(bloomed);
  const { light, success } = useHaptics();
  const chime = useSound("chime");
  const successSound = useSound("success");

  const bloomFlower = useCallback((index: number) => {
    light();
    void chime.play();
    setBackgroundColor(FLOWERS[index].color);
    setBloomed((current) => {
      const next = current.map((value, itemIndex) => (itemIndex === index ? true : value));
      if (!areAllFlowersBloomed(current) && areAllFlowersBloomed(next)) {
        success();
        void successSound.play();
      }
      return next;
    });
  }, [chime, light, success, successSound]);

  return (
    <View style={[styles.canvas, { backgroundColor }]}>
      <View style={styles.gardenBed}>
        {FLOWERS.map((item, index) => {
          const isBloomed = bloomed[index];

          return (
            <Pressable
              key={item.flower}
              accessibilityLabel={`Flower bud ${index + 1}`}
              style={({ pressed }) => [
                styles.bud,
                { borderColor: isBloomed ? item.accent : "rgba(255,255,255,0.86)" },
                pressed && styles.budPressed
              ]}
              onPress={() => bloomFlower(index)}
            >
              <Text style={styles.flower}>{isBloomed ? item.flower : "🌱"}</Text>
            </Pressable>
          );
        })}
      </View>
      <Celebration active={allBloomed} />
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    minHeight: 380,
    overflow: "hidden",
    justifyContent: "flex-end",
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    ...SHADOWS.warm
  },
  gardenBed: {
    minHeight: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-around",
    justifyContent: "center",
    gap: SPACING.md
  },
  bud: {
    width: 104,
    height: 104,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(255,255,255,0.82)",
    ...SHADOWS.card
  },
  budPressed: {
    transform: [{ translateY: 4 }, { scale: 0.96 }]
  },
  flower: {
    fontSize: 54
  },
  celebration: {
    position: "absolute",
    top: 24,
    right: 24,
    left: 24,
    minHeight: TOUCH_TARGET.baby,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.lg,
    backgroundColor: "rgba(255,255,255,0.9)"
  },
  celebrationText: {
    color: COLORS.primary,
    fontSize: 42,
    letterSpacing: 0
  }
});

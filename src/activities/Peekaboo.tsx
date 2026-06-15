import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

import { COLORS, RADIUS, SHADOWS } from "../constants/theme";
import type { ActivityProps } from "../types/activity";
import type { Animal } from "./activityHelpers";
import { getRandomAnimal } from "./activityHelpers";

export function Peekaboo(_props: ActivityProps) {
  const [animal, setAnimal] = useState<Animal>(() => getRandomAnimal());
  const [isOpen, setIsOpen] = useState(false);
  const openProgress = useSharedValue(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    },
    []
  );

  const curtainStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(openProgress.value, [0, 1], [0, -360]) },
      { scaleY: interpolate(openProgress.value, [0, 1], [1, 0.08]) }
    ],
    opacity: interpolate(openProgress.value, [0, 1], [1, 0.85])
  }));

  const reveal = useCallback(() => {
    if (isOpen) {
      return;
    }

    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    setAnimal(getRandomAnimal());
    setIsOpen(true);
    openProgress.value = withTiming(1, { duration: 600 });
    closeTimer.current = setTimeout(() => {
      openProgress.value = withTiming(0, { duration: 600 });
      setIsOpen(false);
    }, 2000);
  }, [isOpen, openProgress]);

  return (
    <Pressable style={styles.canvas} onPress={reveal}>
      <View style={styles.reveal}>
        <Text style={styles.revealEmoji}>{animal.emoji}</Text>
      </View>
      <Animated.View pointerEvents="none" style={[styles.curtain, curtainStyle]}>
        <Text style={styles.curtainText}>👀</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  canvas: {
    minHeight: 380,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.lavender,
    ...SHADOWS.card
  },
  reveal: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 90,
    backgroundColor: COLORS.background,
    ...SHADOWS.warm
  },
  revealEmoji: {
    fontSize: 92
  },
  curtain: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary
  },
  curtainText: {
    color: COLORS.background,
    fontSize: 78
  }
});

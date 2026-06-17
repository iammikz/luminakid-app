import { useCallback, useEffect, useRef, useState } from "react";
import type { GestureResponderEvent } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { COLORS, RADIUS, SHADOWS, TOUCH_TARGET } from "../constants/theme";
import { useHaptics } from "../hooks/useHaptics";
import { useSound } from "../hooks/useSound";
import type { ActivityProps } from "../types/activity";
import { getRandomPastel } from "./activityHelpers";

interface Sparkle {
  id: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

function SparkleParticle({ sparkle }: { sparkle: Sparkle }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 800 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = Math.cos(sparkle.angle) * sparkle.distance * progress.value;
    const translateY = Math.sin(sparkle.angle) * sparkle.distance * progress.value;

    return {
      opacity: 1 - progress.value,
      transform: [
        { translateX },
        { translateY },
        { scale: 0.7 + progress.value * 1.3 },
        { rotate: `${progress.value * 90}deg` }
      ]
    };
  });

  return (
    <Animated.Text
      pointerEvents="none"
      style={[styles.sparkle, { left: sparkle.x - 18, top: sparkle.y - 18 }, animatedStyle]}
    >
      ✦
    </Animated.Text>
  );
}

export function TouchSparkle(_props: ActivityProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>(COLORS.primaryLight);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const cleanupTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { light } = useHaptics();
  const chime = useSound("chime");

  useEffect(
    () => () => {
      cleanupTimers.current.forEach((timer) => clearTimeout(timer));
    },
    []
  );

  const addSparkles = useCallback(
    (event: GestureResponderEvent) => {
      const { locationX, locationY } = event.nativeEvent;
      const createdAt = Date.now();
      const nextSparkles = Array.from({ length: 5 }, (_, index) => ({
        id: `${createdAt}-${index}`,
        x: locationX,
        y: locationY,
        angle: (Math.PI * 2 * index) / 5 + Math.random() * 0.45,
        distance: 52 + Math.random() * 56
      }));

      light();
      void chime.play();
      setBackgroundColor(getRandomPastel());
      setSparkles((current) => [...current, ...nextSparkles]);
      const cleanupTimer = setTimeout(() => {
        setSparkles((current) => current.filter((sparkle) => !nextSparkles.some((item) => item.id === sparkle.id)));
      }, 850);
      cleanupTimers.current.push(cleanupTimer);
    },
    [chime, light]
  );

  return (
    <Pressable style={[styles.canvas, { backgroundColor }]} onPress={addSparkles}>
      <Text style={styles.centerGlow}>✨</Text>
      {sparkles.map((sparkle) => (
        <SparkleParticle key={sparkle.id} sparkle={sparkle} />
      ))}
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
    ...SHADOWS.warm
  },
  centerGlow: {
    minWidth: TOUCH_TARGET.baby,
    minHeight: TOUCH_TARGET.baby,
    color: COLORS.primaryDark,
    fontSize: 86,
    opacity: 0.86,
    textAlign: "center"
  },
  sparkle: {
    position: "absolute",
    width: 36,
    height: 36,
    color: COLORS.primary,
    fontSize: 34,
    textAlign: "center",
    textAlignVertical: "center"
  }
});

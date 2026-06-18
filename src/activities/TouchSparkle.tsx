import { useCallback, useEffect, useRef, useState } from "react";
import type { GestureResponderEvent, LayoutChangeEvent } from "react-native";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { SHADOWS } from "../constants/theme";
import { useHaptics } from "../hooks/useHaptics";
import { useSound } from "../hooks/useSound";
import type { ActivityProps } from "../types/activity";
import {
  createSparkles,
  moveCharacter,
  type Bounds,
  type CharacterMotion,
  type SparkleModel
} from "./touchSparkleHelpers";

const CHARACTER_SIZE = 88;
const CHARACTER_TICK_MS = 32;

interface MovingCharacter extends CharacterMotion {
  id: string;
}

const INITIAL_CHARACTERS: MovingCharacter[] = [
  { id: "kitty-1", x: 18, y: 8, vx: 0.62, vy: 0.46 },
  { id: "kitty-2", x: 188, y: 58, vx: -0.54, vy: 0.68 },
  { id: "kitty-3", x: 78, y: 168, vx: 0.72, vy: -0.5 },
  { id: "kitty-4", x: 210, y: 250, vx: -0.66, vy: -0.58 },
  { id: "kitty-5", x: 22, y: 332, vx: 0.58, vy: -0.7 },
  { id: "kitty-6", x: 144, y: 420, vx: -0.74, vy: 0.52 }
];

function SparkleParticle({ sparkle }: { sparkle: SparkleModel }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: sparkle.duration,
      easing: Easing.bezier(0, 0.9, 0.57, 1)
    });
  }, [progress, sparkle.duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [
      { translateX: Math.cos(sparkle.angle) * sparkle.distance * progress.value },
      { translateY: Math.sin(sparkle.angle) * sparkle.distance * progress.value },
      { scale: 1 - progress.value }
    ]
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.sparkle,
        {
          left: sparkle.x - sparkle.size / 2,
          top: sparkle.y - sparkle.size / 2,
          width: sparkle.size,
          height: sparkle.size,
          backgroundColor: sparkle.color,
          shadowColor: sparkle.color
        },
        animatedStyle
      ]}
    />
  );
}

export function TouchSparkle(_props: ActivityProps) {
  const [canvasSize, setCanvasSize] = useState<Bounds>({ width: 0, height: 0 });
  const [characters, setCharacters] = useState<MovingCharacter[]>(INITIAL_CHARACTERS);
  const [sparkles, setSparkles] = useState<SparkleModel[]>([]);
  const cleanupTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const burstSequence = useRef(0);
  const { light } = useHaptics();
  const chime = useSound("chime");

  useEffect(() => {
    if (canvasSize.width <= 0 || canvasSize.height <= 0) {
      return undefined;
    }

    const movementTimer = setInterval(() => {
      setCharacters((current) =>
        current.map((character) => ({
          id: character.id,
          ...moveCharacter(character, canvasSize, CHARACTER_SIZE)
        }))
      );
    }, CHARACTER_TICK_MS);

    return () => clearInterval(movementTimer);
  }, [canvasSize]);

  useEffect(
    () => () => {
      cleanupTimers.current.forEach((timer) => clearTimeout(timer));
    },
    []
  );

  const measureCanvas = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasSize({ width, height });
  }, []);

  const addSparkles = useCallback(
    (event: GestureResponderEvent) => {
      const { locationX, locationY } = event.nativeEvent;
      burstSequence.current += 1;
      const nextSparkles = createSparkles(
        locationX,
        locationY,
        Math.random,
        `${Date.now()}-${burstSequence.current}`
      );
      const cleanupDelay = Math.max(...nextSparkles.map((sparkle) => sparkle.duration)) + 50;

      light();
      void chime.play();
      setSparkles((current) => [...current, ...nextSparkles]);

      const cleanupTimer = setTimeout(() => {
        const ids = new Set(nextSparkles.map((sparkle) => sparkle.id));
        setSparkles((current) => current.filter((sparkle) => !ids.has(sparkle.id)));
      }, cleanupDelay);
      cleanupTimers.current.push(cleanupTimer);
    },
    [chime, light]
  );

  return (
    <Pressable
      accessibilityLabel="Touch anywhere to create sparkles"
      onLayout={measureCanvas}
      onPress={addSparkles}
      style={styles.canvas}
    >
      <Image
        resizeMode="cover"
        source={require("../assets/images/touch-sparkle-background.png")}
        style={styles.background}
      />

      {characters.map((character) => (
        <Animated.Image
          key={character.id}
          resizeMode="contain"
          source={require("../assets/images/kindpng_6787158.png")}
          style={[
            styles.character,
            { transform: [{ translateX: character.x }, { translateY: character.y }] }
          ]}
        />
      ))}

      {sparkles.map((sparkle) => (
        <SparkleParticle key={sparkle.id} sparkle={sparkle} />
      ))}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    minHeight: 380,
    overflow: "hidden",
    backgroundColor: "#70D8EE",
    ...SHADOWS.warm
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%"
  },
  character: {
    position: "absolute",
    left: 0,
    top: 0,
    width: CHARACTER_SIZE,
    height: CHARACTER_SIZE,
    opacity: 0.92
  },
  sparkle: {
    position: "absolute",
    borderRadius: 3,
    shadowOpacity: 0.9,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 }
  }
});

import { useCallback, useEffect, useRef, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

import { COLORS, SHADOWS } from "../constants/theme";
import { useHaptics } from "../hooks/useHaptics";
import { useSound } from "../hooks/useSound";
import type { ActivityProps } from "../types/activity";
import type { BubbleModel, CanvasSize } from "./activityHelpers";
import { createBubble, createBubbleVisual } from "./activityHelpers";

interface BubbleState extends BubbleModel {
  popping: boolean;
}

function Bubble({ bubble, onPop }: { bubble: BubbleState; onPop: (id: string) => void }) {
  const progress = useSharedValue(0);
  const wobble = useSharedValue(0);
  const visual = createBubbleVisual(bubble);

  useEffect(() => {
    if (bubble.popping) {
      progress.value = withTiming(1, { duration: 300 });
    }
  }, [bubble.popping, progress]);

  useEffect(() => {
    wobble.value = withRepeat(
      withSequence(withTiming(1, { duration: visual.wobbleDuration }), withTiming(0, { duration: visual.wobbleDuration })),
      -1,
      true
    );
  }, [visual.wobbleDuration, wobble]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [
      { translateY: (wobble.value - 0.5) * visual.wobbleDistance },
      { rotate: `${visual.rotationDegrees + wobble.value * 2}deg` },
      { scale: 1 + progress.value * 0.4 }
    ]
  }));

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          left: bubble.x,
          top: bubble.y,
          width: bubble.size,
          height: bubble.size,
          borderRadius: bubble.size / 2,
          backgroundColor: visual.shellColor,
          borderColor: visual.rimColor
        },
        animatedStyle
      ]}
    >
      <Pressable style={styles.bubblePressable} onPress={() => onPop(bubble.id)}>
        <View
          pointerEvents="none"
          style={[
            styles.innerGlow,
            {
              width: visual.innerGlowSize,
              height: visual.innerGlowSize,
              borderRadius: visual.innerGlowSize / 2
            }
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.mainHighlight,
            {
              width: visual.mainHighlight.width,
              height: visual.mainHighlight.height,
              left: visual.mainHighlight.left,
              top: visual.mainHighlight.top,
              borderRadius: visual.mainHighlight.width
            }
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.secondaryHighlight,
            {
              width: visual.secondaryHighlight.width,
              height: visual.secondaryHighlight.height,
              right: visual.secondaryHighlight.right,
              bottom: visual.secondaryHighlight.bottom,
              borderRadius: visual.secondaryHighlight.width / 2
            }
          ]}
        />
        <View pointerEvents="none" style={styles.lowerRim} />
      </Pressable>
    </Animated.View>
  );
}

export function BubblePop(_props: ActivityProps) {
  const [canvas, setCanvas] = useState<CanvasSize>({ width: 0, height: 0 });
  const [bubbles, setBubbles] = useState<BubbleState[]>([]);
  const popTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { light } = useHaptics();
  const popSound = useSound("pop");

  useEffect(
    () => () => {
      popTimers.current.forEach((timer) => clearTimeout(timer));
    },
    []
  );

  const addBubble = useCallback(() => {
    setBubbles((current) => {
      if (canvas.width < 88 || canvas.height < 88 || current.length >= 5) {
        return current;
      }

      return [...current, { ...createBubble(canvas), popping: false }];
    });
  }, [canvas]);

  useEffect(() => {
    if (canvas.width < 88 || canvas.height < 88) {
      return undefined;
    }

    setBubbles((current) => {
      if (current.length > 0) {
        return current;
      }

      return Array.from({ length: 3 }, () => ({ ...createBubble(canvas), popping: false }));
    });

    const timer = setInterval(addBubble, 2000);
    return () => clearInterval(timer);
  }, [addBubble, canvas]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvas({ width, height });
  }, []);

  const popBubble = useCallback((id: string) => {
    light();
    void popSound.play();
    setBubbles((current) => current.map((bubble) => (bubble.id === id ? { ...bubble, popping: true } : bubble)));
    const popTimer = setTimeout(() => {
      setBubbles((current) => current.filter((bubble) => bubble.id !== id));
    }, 320);
    popTimers.current.push(popTimer);
  }, [light, popSound]);

  return (
    <View style={styles.canvas} onLayout={handleLayout}>
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} bubble={bubble} onPop={popBubble} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    minHeight: 380,
    overflow: "hidden",
    backgroundColor: "#DFF6FF",
    ...SHADOWS.card
  },
  bubble: {
    position: "absolute",
    overflow: "hidden",
    borderWidth: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.24,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6
  },
  bubblePressable: {
    minWidth: 88,
    minHeight: 88,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999
  },
  innerGlow: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.32)"
  },
  mainHighlight: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.68)",
    opacity: 0.86,
    transform: [{ rotate: "24deg" }]
  },
  secondaryHighlight: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.58)",
    opacity: 0.78
  },
  lowerRim: {
    position: "absolute",
    left: "16%",
    right: "16%",
    bottom: "12%",
    height: "16%",
    borderBottomWidth: 2,
    borderColor: "rgba(255,255,255,0.42)",
    borderRadius: 999,
    opacity: 0.72
  }
});

import { useCallback, useEffect, useRef, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { COLORS, RADIUS, SHADOWS } from "../constants/theme";
import type { ActivityProps } from "../types/activity";
import type { BubbleModel, CanvasSize } from "./activityHelpers";
import { createBubble } from "./activityHelpers";

interface BubbleState extends BubbleModel {
  popping: boolean;
}

function Bubble({ bubble, onPop }: { bubble: BubbleState; onPop: (id: string) => void }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (bubble.popping) {
      progress.value = withTiming(1, { duration: 300 });
    }
  }, [bubble.popping, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [{ scale: 1 + progress.value * 0.4 }]
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
          backgroundColor: bubble.color
        },
        animatedStyle
      ]}
    >
      <Pressable style={styles.bubblePressable} onPress={() => onPop(bubble.id)}>
        <Text style={styles.bubbleShine}>◦</Text>
      </Pressable>
    </Animated.View>
  );
}

export function BubblePop(_props: ActivityProps) {
  const [canvas, setCanvas] = useState<CanvasSize>({ width: 0, height: 0 });
  const [bubbles, setBubbles] = useState<BubbleState[]>([]);
  const popTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

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
    setBubbles((current) => current.map((bubble) => (bubble.id === id ? { ...bubble, popping: true } : bubble)));
    const popTimer = setTimeout(() => {
      setBubbles((current) => current.filter((bubble) => bubble.id !== id));
    }, 320);
    popTimers.current.push(popTimer);
  }, []);

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
    minHeight: 380,
    overflow: "hidden",
    borderRadius: RADIUS.xl,
    backgroundColor: "#DFF6FF",
    ...SHADOWS.card
  },
  bubble: {
    position: "absolute",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4
  },
  bubblePressable: {
    minWidth: 88,
    minHeight: 88,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bubbleShine: {
    color: COLORS.background,
    fontSize: 48,
    opacity: 0.92
  }
});

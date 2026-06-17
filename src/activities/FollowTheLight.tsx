import { useCallback, useEffect, useRef, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";

import { COLORS, RADIUS, SHADOWS, TOUCH_TARGET } from "../constants/theme";
import { useHaptics } from "../hooks/useHaptics";
import { useSound } from "../hooks/useSound";
import type { ActivityProps } from "../types/activity";
import type { CanvasSize, Point } from "./activityHelpers";
import { getNextFireflyDelay, getRandomFireflyTarget } from "./activityHelpers";

const TARGET_SIZE = TOUCH_TARGET.baby;
const FIREFLY_SIZE = 24;

function CelebrationStars({ visible }: { visible: boolean }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      progress.value = withSequence(withTiming(1, { duration: 420 }), withTiming(0, { duration: 420 }));
    }
  }, [progress, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.8 + progress.value * 0.35 }]
  }));

  if (!visible) {
    return null;
  }

  return (
    <Animated.View pointerEvents="none" style={[styles.stars, animatedStyle]}>
      <Text style={styles.starText}>★ ★ ★</Text>
    </Animated.View>
  );
}

export function FollowTheLight(_props: ActivityProps) {
  const [canvas, setCanvas] = useState<CanvasSize>({ width: 0, height: 0 });
  const [target, setTarget] = useState<Point>({ x: 0, y: 0 });
  const [catches, setCatches] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const pulse = useSharedValue(0);
  const { light, success } = useHaptics();
  const chime = useSound("chime");
  const successSound = useSound("success");

  useEffect(() => {
    pulse.value = withRepeat(withSequence(withTiming(1, { duration: 850 }), withTiming(0, { duration: 850 })), -1);
  }, [pulse]);

  useEffect(
    () => () => {
      if (moveTimer.current) {
        clearTimeout(moveTimer.current);
      }
      if (flashTimer.current) {
        clearTimeout(flashTimer.current);
      }
    },
    []
  );

  const moveFirefly = useCallback(() => {
    if (canvas.width < TARGET_SIZE || canvas.height < TARGET_SIZE) {
      return;
    }

    const nextTarget = getRandomFireflyTarget(canvas, TARGET_SIZE);
    setTarget(nextTarget);
    translateX.value = withTiming(nextTarget.x, { duration: 900 });
    translateY.value = withTiming(nextTarget.y, { duration: 900 });
    moveTimer.current = setTimeout(moveFirefly, getNextFireflyDelay());
  }, [canvas, translateX, translateY]);

  useEffect(() => {
    if (moveTimer.current) {
      clearTimeout(moveTimer.current);
    }

    moveFirefly();
  }, [moveFirefly]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      const nextCanvas = { width, height };
      const nextTarget = getRandomFireflyTarget(nextCanvas, TARGET_SIZE, () => 0.5);
      setCanvas(nextCanvas);
      setTarget(nextTarget);
      translateX.value = nextTarget.x;
      translateY.value = nextTarget.y;
    },
    [translateX, translateY]
  );

  const fireflyStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: 1 + pulse.value * 0.12 }
    ]
  }));

  const catchLight = useCallback(() => {
    light();
    void chime.play();
    setShowFlash(true);
    if (flashTimer.current) {
      clearTimeout(flashTimer.current);
    }
    flashTimer.current = setTimeout(() => setShowFlash(false), 260);

    setCatches((current) => {
      const next = current + 1;
      if (next >= 5) {
        success();
        void successSound.play();
        setShowStars(true);
      }
      return next;
    });
  }, [chime, light, success, successSound]);

  return (
    <View style={styles.canvas} onLayout={handleLayout}>
      {showFlash ? <View pointerEvents="none" style={styles.flash} /> : null}
      <Animated.View style={[styles.target, fireflyStyle]}>
        <Pressable accessibilityLabel="Glowing light" style={styles.targetPressable} onPress={catchLight}>
          <View style={styles.glow}>
            <View style={styles.firefly} />
          </View>
        </Pressable>
      </Animated.View>
      <CelebrationStars visible={showStars} />
      <View pointerEvents="none" style={[styles.restingGlow, { left: target.x, top: target.y }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    minHeight: 380,
    overflow: "hidden",
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.primaryDark,
    ...SHADOWS.warm
  },
  target: {
    position: "absolute",
    width: TARGET_SIZE,
    height: TARGET_SIZE
  },
  targetPressable: {
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    alignItems: "center",
    justifyContent: "center"
  },
  glow: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: "rgba(250,199,117,0.28)"
  },
  firefly: {
    width: FIREFLY_SIZE,
    height: FIREFLY_SIZE,
    borderRadius: FIREFLY_SIZE / 2,
    backgroundColor: COLORS.amber,
    shadowColor: COLORS.amber,
    shadowOpacity: 0.95,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  flash: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(250,199,117,0.18)"
  },
  stars: {
    position: "absolute",
    right: 24,
    bottom: 24,
    left: 24,
    minHeight: TOUCH_TARGET.baby,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.lg,
    backgroundColor: "rgba(255,255,255,0.92)"
  },
  starText: {
    color: COLORS.amber,
    fontSize: 48,
    letterSpacing: 0
  },
  restingGlow: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0
  }
});

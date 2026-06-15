import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";

import { COLORS } from "../constants/theme";

export function DepthBackdrop() {
  const drift = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(withSequence(withTiming(1, { duration: 2600 }), withTiming(0, { duration: 2600 })), -1, true);
  }, [drift]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: drift.value * 10 }, { scale: 1 + drift.value * 0.03 }]
  }));

  return (
    <View pointerEvents="none" style={styles.wrap}>
      <Animated.View style={[styles.layer, styles.primary, animatedStyle]} />
      <Animated.View style={[styles.layer, styles.secondary, animatedStyle]} />
      <View style={[styles.layer, styles.peach]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    opacity: 0.22
  },
  layer: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.72
  },
  primary: {
    top: 22,
    left: 22,
    width: 150,
    height: 150,
    backgroundColor: COLORS.primaryLight
  },
  secondary: {
    right: 18,
    bottom: 26,
    width: 130,
    height: 130,
    backgroundColor: COLORS.secondarySoft
  },
  peach: {
    top: 92,
    right: 86,
    width: 82,
    height: 82,
    backgroundColor: COLORS.peach
  }
});

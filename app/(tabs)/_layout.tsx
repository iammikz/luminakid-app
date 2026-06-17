import { Ionicons } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { COLORS, RADIUS, SHADOWS, TYPOGRAPHY } from "../../src/constants/theme";
import { getNextPlayTabsExpanded, shouldShowTabBar } from "../../src/engine/tabChrome";
import { useTabChromeStore } from "../../src/store/useTabChromeStore";

function CollapsibleTabBar(props: BottomTabBarProps) {
  const activeRouteName = props.state.routes[props.state.index]?.name;
  const playTabsExpanded = useTabChromeStore((state) => state.playTabsExpanded);
  const collapsePlayTabs = useTabChromeStore((state) => state.collapsePlayTabs);
  const setPlayTabsExpanded = useTabChromeStore((state) => state.setPlayTabsExpanded);
  const playRouteActive = activeRouteName === "index";
  const tabProgress = useSharedValue(playTabsExpanded ? 1 : 0);

  useEffect(() => {
    if (playRouteActive) {
      collapsePlayTabs();
    }
  }, [collapsePlayTabs, playRouteActive]);

  useEffect(() => {
    tabProgress.value = withTiming(playRouteActive && !playTabsExpanded ? 0 : 1, { duration: 260 });
  }, [playRouteActive, playTabsExpanded, tabProgress]);

  const animatedTabShellStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - tabProgress.value) * 116 }]
  }));

  const animatedHandleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - tabProgress.value) * 94 }]
  }));

  function handlePlayTabDrag(translationY: number) {
    const nextExpanded = getNextPlayTabsExpanded(playTabsExpanded, translationY);
    if (nextExpanded !== playTabsExpanded) {
      setPlayTabsExpanded(nextExpanded);
    }
  }

  if (playRouteActive) {
    return (
      <PanGestureHandler onEnded={(event) => handlePlayTabDrag(Number(event.nativeEvent.translationY ?? 0))}>
        <View pointerEvents="box-none" style={styles.tabBarOverlay}>
          <Animated.View
            pointerEvents="auto"
            accessibilityLabel={playTabsExpanded ? "Drag down to collapse app navigation" : "Drag up to show app navigation"}
            style={[styles.dragHandleZone, animatedHandleStyle]}
          >
            <View style={styles.dragHandle} />
          </Animated.View>
          <Animated.View pointerEvents={playTabsExpanded ? "auto" : "none"} style={[styles.playTabGroup, animatedTabShellStyle]}>
            <BottomTabBar {...props} />
          </Animated.View>
        </View>
      </PanGestureHandler>
    );
  }

  return (
    <View pointerEvents="box-none" style={styles.tabBarOverlay}>
      <BottomTabBar {...props} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CollapsibleTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          position: "absolute",
          minHeight: 88,
          width: "92%",
          maxWidth: 920,
          alignSelf: "center",
          marginHorizontal: 18,
          marginBottom: 14,
          borderTopWidth: 0,
          borderRadius: RADIUS.xl,
          backgroundColor: COLORS.surface,
          paddingBottom: 10,
          paddingTop: 8,
          ...SHADOWS.card
        },
        tabBarBackground: () => <View style={styles.transparentBackground} />,
        tabBarLabelStyle: {
          ...TYPOGRAPHY.small
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Play",
          tabBarIcon: ({ color, size }) => <Ionicons name="sparkles" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    height: 164,
    backgroundColor: "transparent"
  },
  transparentBackground: {
    flex: 1,
    backgroundColor: "transparent"
  },
  dragHandleZone: {
    position: "absolute",
    right: 0,
    bottom: 85,
    left: 0,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  dragHandle: {
    width: 58,
    height: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryDark,
    opacity: 0.62
  },
  playTabGroup: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: 108
  }
});

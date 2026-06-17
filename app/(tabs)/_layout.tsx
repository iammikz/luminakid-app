import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { COLORS, RADIUS, SHADOWS, TYPOGRAPHY } from "../../src/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
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

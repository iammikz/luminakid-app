import { Tabs } from "expo-router";

import { COLORS } from "../../src/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          minHeight: 72,
          paddingBottom: 10,
          paddingTop: 8
        },
        tabBarLabelStyle: {
          fontSize: 13
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Play" }} />
      <Tabs.Screen name="journal" options={{ title: "Journal" }} />
    </Tabs>
  );
}

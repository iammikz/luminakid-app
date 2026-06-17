import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { ElevatedSurface } from "../../src/components/ElevatedSurface";
import { LockOverlay } from "../../src/components/LockOverlay";
import { PlayDrawer } from "../../src/components/PlayDrawer";
import { COLORS, RADIUS, SHADOWS, SPACING, TOUCH_TARGET, TYPOGRAPHY } from "../../src/constants/theme";
import { getSelectableActivity } from "../../src/engine/activitySelection";
import { ACTIVITY_REGISTRY } from "../../src/engine/activityRegistry";
import { useBabyAge } from "../../src/hooks/useBabyAge";
import { useBabyStore } from "../../src/store/useBabyStore";
import { useTabChromeStore } from "../../src/store/useTabChromeStore";

export default function PlayScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const baby = useBabyStore((state) => state.baby);
  const selectedMonth = useBabyStore((state) => state.selectedMonth);
  const setSelectedMonth = useBabyStore((state) => state.setSelectedMonth);
  const revealPlayTabs = useTabChromeStore((state) => state.revealPlayTabs);
  const babyAgeMonths = useBabyAge();

  if (!baby) {
    return (
      <AppScreen>
        <ElevatedSurface style={styles.empty}>
          <Text style={styles.title}>LuminaKid</Text>
          <Link href="/setup" style={styles.link}>
            Set up baby profile
          </Link>
        </ElevatedSurface>
      </AppScreen>
    );
  }

  const activity = getSelectableActivity(selectedMonth, babyAgeMonths, ACTIVITY_REGISTRY);
  const ActivityComponent = activity.component;
  const locked = babyAgeMonths < activity.minMonths;
  const selectMonth = (month: number) => {
    setSelectedMonth(month);
    setDrawerOpen(false);
  };

  return (
    <AppScreen centered={false} style={styles.screen}>
      <View style={styles.playSurface}>
        {locked ? <LockOverlay unlockMonth={activity.minMonths} /> : <ActivityComponent babyAgeMonths={babyAgeMonths} />}
      </View>

      <Pressable
        accessibilityLabel="Open play menu"
        accessibilityRole="button"
        onPress={() => setDrawerOpen(true)}
        style={({ pressed }) => [styles.menuButton, pressed && styles.menuButtonPressed]}
      >
        <Feather name="menu" size={28} color={COLORS.primaryDark} />
      </Pressable>

      <Modal animationType="fade" transparent visible={drawerOpen} onRequestClose={() => setDrawerOpen(false)}>
        <View style={styles.drawerOverlay}>
          <Pressable accessibilityLabel="Close play menu" style={styles.drawerScrim} onPress={() => setDrawerOpen(false)} />
          <PlayDrawer
            activities={ACTIVITY_REGISTRY}
            activity={activity}
            babyAgeMonths={babyAgeMonths}
            babyName={baby.name}
            onSelectMonth={selectMonth}
            onOpenOptions={() => {
              revealPlayTabs();
              setDrawerOpen(false);
            }}
          />
        </View>
      </Modal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
    maxWidth: "100%"
  },
  playSurface: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: COLORS.primarySoft
  },
  menuButton: {
    position: "absolute",
    top: SPACING.md,
    left: SPACING.md,
    width: TOUCH_TARGET.parent,
    height: TOUCH_TARGET.parent,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(255,255,255,0.92)",
    ...SHADOWS.card
  },
  menuButtonPressed: {
    transform: [{ translateY: 2 }, { scale: 0.97 }],
    backgroundColor: COLORS.surfacePressed
  },
  drawerOverlay: {
    flex: 1,
    flexDirection: "row"
  },
  drawerScrim: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.scrim
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.lg
  },
  title: {
    ...TYPOGRAPHY.display,
    color: COLORS.primaryDark
  },
  link: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary
  }
});

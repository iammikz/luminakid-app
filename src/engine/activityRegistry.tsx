import type { ComponentType } from "react";

import { ActivityPlaceholder } from "../activities/ActivityPlaceholder";
import { AnimalDiscovery } from "../activities/AnimalDiscovery";
import { BubblePop } from "../activities/BubblePop";
import { ColorGarden } from "../activities/ColorGarden";
import { FirstWords } from "../activities/FirstWords";
import { FollowTheLight } from "../activities/FollowTheLight";
import { Peekaboo } from "../activities/Peekaboo";
import { TouchSparkle } from "../activities/TouchSparkle";
import type { Activity } from "../types/activity";
import type { ActivityProps } from "../types/activity";
import { ACTIVITY_CATALOG } from "./activityCatalog";
import { JOURNAL_DATA } from "./journalData";

function placeholder(emoji: string, title: string, goal: string) {
  return function PlaceholderActivity({ babyAgeMonths }: { babyAgeMonths: number }) {
    return <ActivityPlaceholder babyAgeMonths={babyAgeMonths} emoji={emoji} title={title} goal={goal} />;
  };
}

const COMPONENTS: Partial<Record<string, ComponentType<ActivityProps>>> = {
  "touch-sparkle": TouchSparkle,
  "bubble-pop": BubblePop,
  "animal-discovery": AnimalDiscovery,
  peekaboo: Peekaboo,
  "follow-the-light": FollowTheLight,
  "color-garden": ColorGarden,
  "first-words": FirstWords
};

export const ACTIVITY_REGISTRY: Activity[] = [
  ...ACTIVITY_CATALOG.map((entry) => ({
    id: entry.id,
    title: entry.title,
    emoji: entry.emoji,
    goal: entry.goal,
    minMonths: entry.minMonths,
    maxMonths: entry.maxMonths,
    skills: entry.skills,
    component: COMPONENTS[entry.id] ?? placeholder(entry.emoji, entry.title, entry.goal),
    journal: JOURNAL_DATA[entry.journalMonth]
  }))
];

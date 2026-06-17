import type { Activity } from "../types/activity";

export interface PlayDrawerItem {
  id: string;
  title: string;
  emoji: string;
  monthLabel: string;
  minMonths: number;
  locked: boolean;
  selected: boolean;
}

export function buildPlayDrawerItems(activities: Activity[], babyAgeMonths: number, selectedMonth: number): PlayDrawerItem[] {
  return activities.map((activity) => ({
    id: activity.id,
    title: activity.title,
    emoji: activity.emoji,
    monthLabel: `${activity.minMonths}m`,
    minMonths: activity.minMonths,
    locked: babyAgeMonths < activity.minMonths,
    selected: selectedMonth === activity.minMonths
  }));
}

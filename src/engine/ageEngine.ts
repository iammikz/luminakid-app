import { differenceInMonths } from "date-fns";

import type { Activity } from "../types/activity";

const JOURNAL_MONTHS = [6, 7, 8, 9, 10, 11, 12, 13, 16, 19] as const;

export function getBabyAgeMonths(dateOfBirth: string, now = new Date()): number {
  return Math.max(0, differenceInMonths(now, new Date(dateOfBirth)));
}

export function isActivityUnlocked(activity: Activity, ageMonths: number): boolean {
  return ageMonths >= activity.minMonths;
}

export function getActiveActivity(ageMonths: number, activities: Activity[]): Activity {
  const eligible = activities.filter((activity) => isActivityUnlocked(activity, ageMonths));
  return eligible.at(-1) ?? activities[0];
}

export function getSupportedJournalMonth(ageMonths: number): number {
  return JOURNAL_MONTHS.reduce((selected, month) => (ageMonths >= month ? month : selected), 6);
}

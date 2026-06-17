import { getActiveActivity, isActivityUnlocked } from "./ageEngine";
import type { Activity } from "../types/activity";

export function getSelectableActivity(
  selectedMonth: number | null | undefined,
  babyAgeMonths: number,
  activities: Activity[]
): Activity {
  const autoActivity = getActiveActivity(babyAgeMonths, activities);
  if (!Number.isFinite(selectedMonth)) {
    return autoActivity;
  }

  const selectedActivity = activities.find((activity) => activity.minMonths === selectedMonth);
  if (!selectedActivity || !isActivityUnlocked(selectedActivity, babyAgeMonths)) {
    return autoActivity;
  }

  return selectedActivity;
}

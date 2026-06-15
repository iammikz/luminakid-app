import { describe, expect, it } from "vitest";

import {
  getActiveActivity,
  getBabyAgeMonths,
  getSupportedJournalMonth,
  isActivityUnlocked
} from "../src/engine/ageEngine";
import type { Activity } from "../src/types/activity";

const activities = [
  { id: "touch-sparkle", minMonths: 6, maxMonths: 6 },
  { id: "bubble-pop", minMonths: 7, maxMonths: 7 },
  { id: "matching-game", minMonths: 13, maxMonths: 15 },
  { id: "mini-puzzles", minMonths: 19, maxMonths: 24 }
] as Activity[];

describe("age engine", () => {
  it("calculates completed age in months from date of birth", () => {
    expect(getBabyAgeMonths("2025-12-15", new Date("2026-06-15T12:00:00Z"))).toBe(6);
    expect(getBabyAgeMonths("2025-12-16", new Date("2026-06-15T12:00:00Z"))).toBe(5);
  });

  it("does not unlock activities before their minimum month", () => {
    expect(isActivityUnlocked(activities[0], 5)).toBe(false);
    expect(isActivityUnlocked(activities[0], 6)).toBe(true);
  });

  it("selects the latest eligible activity for the baby age", () => {
    expect(getActiveActivity(5, activities).id).toBe("touch-sparkle");
    expect(getActiveActivity(7, activities).id).toBe("bubble-pop");
    expect(getActiveActivity(16, activities).id).toBe("matching-game");
    expect(getActiveActivity(25, activities).id).toBe("mini-puzzles");
  });

  it("maps exact ages to grouped journal months", () => {
    expect(getSupportedJournalMonth(12)).toBe(12);
    expect(getSupportedJournalMonth(14)).toBe(13);
    expect(getSupportedJournalMonth(18)).toBe(16);
    expect(getSupportedJournalMonth(24)).toBe(19);
  });
});

import { describe, expect, it } from "vitest";

import { getSelectableActivity } from "../src/engine/activitySelection";
import type { Activity } from "../src/types/activity";

const activities = [
  { id: "touch-sparkle", minMonths: 6, maxMonths: 6 },
  { id: "bubble-pop", minMonths: 7, maxMonths: 7 },
  { id: "first-words", minMonths: 12, maxMonths: 12 },
  { id: "matching-game", minMonths: 13, maxMonths: 15 },
  { id: "shape-play", minMonths: 16, maxMonths: 18 },
  { id: "mini-puzzles", minMonths: 19, maxMonths: 24 }
] as Activity[];

describe("activity selection", () => {
  it("uses the active activity when no parent month is selected", () => {
    expect(getSelectableActivity(null, 12, activities).id).toBe("first-words");
  });

  it("uses a parent-selected unlocked month", () => {
    expect(getSelectableActivity(7, 12, activities).id).toBe("bubble-pop");
  });

  it("falls back when persisted selected month is locked, missing, or malformed", () => {
    expect(getSelectableActivity(16, 12, activities).id).toBe("first-words");
    expect(getSelectableActivity(99, 12, activities).id).toBe("first-words");
    expect(getSelectableActivity(Number.NaN, 12, activities).id).toBe("first-words");
  });
});

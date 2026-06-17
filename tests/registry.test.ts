import { describe, expect, it } from "vitest";

import { ACTIVITY_CATALOG } from "../src/engine/activityCatalog";
import { JOURNAL_DATA } from "../src/engine/journalData";

describe("activity registry", () => {
  it("covers the full MVP activity month map", () => {
    expect(ACTIVITY_CATALOG.map((activity) => [activity.id, activity.minMonths, activity.maxMonths])).toEqual([
      ["touch-sparkle", 6, 6],
      ["bubble-pop", 7, 7],
      ["animal-discovery", 8, 8],
      ["peekaboo", 9, 9],
      ["follow-the-light", 10, 10],
      ["color-garden", 11, 11],
      ["first-words", 12, 12],
      ["matching-game", 13, 15],
      ["shape-play", 16, 18],
      ["mini-puzzles", 19, 24]
    ]);
  });

  it("has journal data for every registry entry", () => {
    for (const activity of ACTIVITY_CATALOG) {
      const journal = JOURNAL_DATA[activity.journalMonth];
      expect(journal).toBeDefined();
      expect(journal.developmentFocus.length).toBeGreaterThan(0);
      expect(journal.milestones.length).toBeGreaterThan(0);
    }
  });

  it("replaces all Phase 1 activity placeholders with concrete components", () => {
    const phaseOneActivities = ACTIVITY_CATALOG.filter((activity) => activity.minMonths <= 12);

    expect(phaseOneActivities.every((activity) => activity.phaseOneImplemented)).toBe(true);
  });
});

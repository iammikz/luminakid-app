import { describe, expect, it } from "vitest";

import { buildPlayDrawerItems } from "../src/engine/playDrawerItems";
import type { Activity } from "../src/types/activity";

const activities = [
  { id: "touch-sparkle", title: "Touch & Sparkle", emoji: "✨", minMonths: 6, maxMonths: 6 },
  { id: "bubble-pop", title: "Bubble Pop", emoji: "🫧", minMonths: 7, maxMonths: 7 },
  { id: "animal-discovery", title: "Animal Discovery", emoji: "🐄", minMonths: 8, maxMonths: 8 }
] as Activity[];

describe("play drawer items", () => {
  it("marks selected and locked activity months for drawer rendering", () => {
    const items = buildPlayDrawerItems(activities, 7, 7);

    expect(items).toEqual([
      {
        id: "touch-sparkle",
        title: "Touch & Sparkle",
        emoji: "✨",
        monthLabel: "6m",
        minMonths: 6,
        locked: false,
        selected: false
      },
      {
        id: "bubble-pop",
        title: "Bubble Pop",
        emoji: "🫧",
        monthLabel: "7m",
        minMonths: 7,
        locked: false,
        selected: true
      },
      {
        id: "animal-discovery",
        title: "Animal Discovery",
        emoji: "🐄",
        monthLabel: "8m",
        minMonths: 8,
        locked: true,
        selected: false
      }
    ]);
  });
});

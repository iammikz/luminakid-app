import { describe, expect, it } from "vitest";

import {
  ANIMALS,
  createBubble,
  getRandomAnimal,
  selectUniqueAnimals
} from "../src/activities/activityHelpers";

describe("activity helpers", () => {
  it("selects unique animals from the approved pool", () => {
    const animals = selectUniqueAnimals(4, () => 0.42);

    expect(animals).toHaveLength(4);
    expect(new Set(animals.map((animal) => animal.id)).size).toBe(4);
    expect(animals.every((animal) => ANIMALS.some((approved) => approved.id === animal.id))).toBe(true);
  });

  it("creates bubbles inside the available canvas bounds", () => {
    const bubble = createBubble({ width: 320, height: 420 }, () => 0.5);

    expect(bubble.size).toBeGreaterThanOrEqual(80);
    expect(bubble.size).toBeLessThanOrEqual(140);
    expect(bubble.x).toBeGreaterThanOrEqual(0);
    expect(bubble.y).toBeGreaterThanOrEqual(0);
    expect(bubble.x + bubble.size).toBeLessThanOrEqual(320);
    expect(bubble.y + bubble.size).toBeLessThanOrEqual(420);
  });

  it("keeps bubbles usable in a small canvas", () => {
    const bubble = createBubble({ width: 96, height: 96 }, () => 0.99);

    expect(bubble.size).toBeGreaterThanOrEqual(80);
    expect(bubble.size).toBeLessThanOrEqual(96);
    expect(bubble.x).toBeGreaterThanOrEqual(0);
    expect(bubble.y).toBeGreaterThanOrEqual(0);
    expect(bubble.x + bubble.size).toBeLessThanOrEqual(96);
    expect(bubble.y + bubble.size).toBeLessThanOrEqual(96);
  });

  it("returns a random animal from the approved pool", () => {
    expect(getRandomAnimal(() => 0).id).toBe(ANIMALS[0].id);
    expect(getRandomAnimal(() => 0.999).id).toBe(ANIMALS.at(-1)?.id);
  });
});

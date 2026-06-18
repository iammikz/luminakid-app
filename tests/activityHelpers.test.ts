import { describe, expect, it } from "vitest";

import {
  ANIMALS,
  areAllFlowersBloomed,
  createBubbleVisual,
  createBubble,
  getNextFireflyDelay,
  getRandomFireflyTarget,
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

  it("creates a layered visual model for realistic bubbles", () => {
    const visual = createBubbleVisual({
      id: "bubble-1",
      size: 120,
      x: 48,
      y: 72,
      color: "#2E5BFF"
    });

    expect(visual.shellColor).toBe("rgba(46,91,255,0.2)");
    expect(visual.rimColor).toBe("rgba(255,255,255,0.86)");
    expect(visual.innerGlowSize).toBe(84);
    expect(visual.mainHighlight).toEqual({ width: 34, height: 48, left: 25, top: 18 });
    expect(visual.secondaryHighlight).toEqual({ width: 17, height: 17, right: 26, bottom: 30 });
    expect(visual.wobbleDistance).toBeGreaterThanOrEqual(5);
    expect(visual.wobbleDistance).toBeLessThanOrEqual(11);
    expect(visual.wobbleDuration).toBeGreaterThanOrEqual(2400);
    expect(visual.wobbleDuration).toBeLessThanOrEqual(3600);
    expect(visual.rotationDegrees).toBeGreaterThanOrEqual(-6);
    expect(visual.rotationDegrees).toBeLessThanOrEqual(6);
  });

  it("returns a random animal from the approved pool", () => {
    expect(getRandomAnimal(() => 0).id).toBe(ANIMALS[0].id);
    expect(getRandomAnimal(() => 0.999).id).toBe(ANIMALS.at(-1)?.id);
  });

  it("creates firefly targets inside the available canvas bounds", () => {
    const target = getRandomFireflyTarget({ width: 320, height: 420 }, 88, () => 0.5);

    expect(target.x).toBeGreaterThanOrEqual(0);
    expect(target.y).toBeGreaterThanOrEqual(0);
    expect(target.x + 88).toBeLessThanOrEqual(320);
    expect(target.y + 88).toBeLessThanOrEqual(420);
  });

  it("keeps firefly targets usable in a tiny canvas", () => {
    const target = getRandomFireflyTarget({ width: 64, height: 64 }, 88, () => 0.99);

    expect(target.x).toBe(0);
    expect(target.y).toBe(0);
  });

  it("uses a gentle randomized firefly movement delay", () => {
    expect(getNextFireflyDelay(() => 0)).toBe(1500);
    expect(getNextFireflyDelay(() => 0.999)).toBe(2499);
  });

  it("detects whether every garden flower has bloomed", () => {
    expect(areAllFlowersBloomed([true, true, true, true, true])).toBe(true);
    expect(areAllFlowersBloomed([true, true, false, true, true])).toBe(false);
    expect(areAllFlowersBloomed([])).toBe(false);
  });
});

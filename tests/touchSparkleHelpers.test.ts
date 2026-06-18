import { describe, expect, it } from "vitest";

import {
  SPARKLE_COLORS,
  createSparkles,
  moveCharacter
} from "../src/activities/touchSparkleHelpers";

describe("touch sparkle helpers", () => {
  it("creates twelve Stitch particles within the approved ranges", () => {
    const particles = createSparkles(120, 180, () => 0.5, "burst");

    expect(particles).toHaveLength(12);
    for (const particle of particles) {
      expect(SPARKLE_COLORS).toContain(particle.color);
      expect(particle.size).toBeGreaterThanOrEqual(10);
      expect(particle.size).toBeLessThanOrEqual(30);
      expect(particle.distance).toBeGreaterThanOrEqual(50);
      expect(particle.distance).toBeLessThanOrEqual(150);
      expect(particle.duration).toBeGreaterThanOrEqual(800);
      expect(particle.duration).toBeLessThanOrEqual(1200);
      expect(particle.x).toBe(120);
      expect(particle.y).toBe(180);
    }
  });

  it("selects the first and last Stitch palette colors", () => {
    expect(createSparkles(0, 0, () => 0, "first")[0].color).toBe(SPARKLE_COLORS[0]);
    expect(createSparkles(0, 0, () => 0.999, "last")[0].color).toBe(SPARKLE_COLORS.at(-1));
  });

  it("keeps the character inside bounds and reverses at an edge", () => {
    expect(moveCharacter({ x: 230, y: 120, vx: 3, vy: 2 }, { width: 320, height: 420 }, 88)).toEqual({
      x: 232,
      y: 122,
      vx: -3,
      vy: 2
    });
  });

  it("holds the character at the origin before layout is measured", () => {
    expect(moveCharacter({ x: 10, y: 10, vx: 2, vy: 2 }, { width: 0, height: 0 }, 88)).toEqual({
      x: 0,
      y: 0,
      vx: 2,
      vy: 2
    });
  });
});

export const SPARKLE_COLORS = ["#FF69B4", "#00FFFF", "#FFFF00", "#FFFFFF", "#FFD700"] as const;

export interface SparkleModel {
  id: string;
  x: number;
  y: number;
  size: number;
  color: (typeof SPARKLE_COLORS)[number];
  angle: number;
  distance: number;
  duration: number;
}

export interface CharacterMotion {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface Bounds {
  width: number;
  height: number;
}

function unit(random: () => number): number {
  return Math.min(Math.max(random(), 0), 0.999999);
}

export function createSparkles(
  x: number,
  y: number,
  random = Math.random,
  idPrefix = `${Date.now()}`
): SparkleModel[] {
  return Array.from({ length: 12 }, (_, index) => {
    const size = 10 + unit(random) * 20;
    const color = SPARKLE_COLORS[Math.floor(unit(random) * SPARKLE_COLORS.length)];
    const angle = unit(random) * Math.PI * 2;
    const distance = 50 + unit(random) * 100;
    const duration = 800 + unit(random) * 400;

    return { id: `${idPrefix}-${index}`, x, y, size, color, angle, distance, duration };
  });
}

export function moveCharacter(
  motion: CharacterMotion,
  bounds: Bounds,
  size: number
): CharacterMotion {
  if (bounds.width <= 0 || bounds.height <= 0) {
    return { x: 0, y: 0, vx: motion.vx, vy: motion.vy };
  }

  const maxX = Math.max(0, bounds.width - size);
  const maxY = Math.max(0, bounds.height - size);
  const nextX = motion.x + motion.vx;
  const nextY = motion.y + motion.vy;
  const vx = nextX <= 0 || nextX >= maxX ? -motion.vx : motion.vx;
  const vy = nextY <= 0 || nextY >= maxY ? -motion.vy : motion.vy;

  return {
    x: Math.min(Math.max(nextX, 0), maxX),
    y: Math.min(Math.max(nextY, 0), maxY),
    vx,
    vy
  };
}

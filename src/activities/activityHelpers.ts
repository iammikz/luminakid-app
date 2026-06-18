export interface Animal {
  id: string;
  emoji: string;
  label: string;
  soundLabel: string;
}

export interface CanvasSize {
  width: number;
  height: number;
}

export interface BubbleModel {
  id: string;
  size: number;
  x: number;
  y: number;
  color: string;
}

export interface BubbleHighlight {
  width: number;
  height: number;
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

export interface BubbleVisual {
  shellColor: string;
  rimColor: string;
  innerGlowSize: number;
  mainHighlight: BubbleHighlight;
  secondaryHighlight: BubbleHighlight;
  wobbleDistance: number;
  wobbleDuration: number;
  rotationDegrees: number;
}

export interface Point {
  x: number;
  y: number;
}

export const ANIMALS: Animal[] = [
  { id: "cow", emoji: "🐄", label: "Cow", soundLabel: "Moo! Cow!" },
  { id: "dog", emoji: "🐶", label: "Dog", soundLabel: "Woof! Dog!" },
  { id: "cat", emoji: "🐱", label: "Cat", soundLabel: "Meow! Cat!" },
  { id: "pig", emoji: "🐷", label: "Pig", soundLabel: "Oink! Pig!" },
  { id: "duck", emoji: "🦆", label: "Duck", soundLabel: "Quack! Duck!" },
  { id: "frog", emoji: "🐸", label: "Frog", soundLabel: "Ribbit! Frog!" },
  { id: "sheep", emoji: "🐑", label: "Sheep", soundLabel: "Baa! Sheep!" },
  { id: "horse", emoji: "🐴", label: "Horse", soundLabel: "Neigh! Horse!" }
];

const BUBBLE_COLORS = ["#2E5BFF", "#FFD23F", "#FF9F89", "#B8C3FF", "#DDF7ED"];
const PASTELS = ["#EEF1FF", "#DDF7ED", "#FFEFB0", "#FFE1DA", "#DFF6FF", "#EEE9FF"];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function pickIndex(length: number, random: () => number): number {
  return Math.min(Math.floor(random() * length), length - 1);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const value = hex.replace("#", "");
  const normalized = value.length === 3 ? value.split("").map((char) => `${char}${char}`).join("") : value;
  const parsed = Number.parseInt(normalized, 16);

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255
  };
}

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

export function selectUniqueAnimals(count: number, random = Math.random): Animal[] {
  const pool = [...ANIMALS];
  const selected: Animal[] = [];
  const targetCount = clamp(count, 0, ANIMALS.length);

  while (selected.length < targetCount) {
    const index = pickIndex(pool.length, random);
    const [animal] = pool.splice(index, 1);
    selected.push(animal);
  }

  return selected;
}

export function getRandomAnimal(random = Math.random): Animal {
  return ANIMALS[pickIndex(ANIMALS.length, random)];
}

export function getRandomPastel(random = Math.random): string {
  return PASTELS[pickIndex(PASTELS.length, random)];
}

export function createBubble(canvas: CanvasSize, random = Math.random): BubbleModel {
  const maxUsableSize = Math.max(80, Math.min(140, canvas.width, canvas.height));
  const size = Math.round(80 + random() * (maxUsableSize - 80));
  const maxX = Math.max(0, canvas.width - size);
  const maxY = Math.max(0, canvas.height - size);

  return {
    id: `${Date.now()}-${Math.round(random() * 1_000_000)}`,
    size,
    x: Math.round(random() * maxX),
    y: Math.round(random() * maxY),
    color: BUBBLE_COLORS[pickIndex(BUBBLE_COLORS.length, random)]
  };
}

export function createBubbleVisual(bubble: BubbleModel): BubbleVisual {
  const rgb = hexToRgb(bubble.color);
  const seed = hashString(bubble.id);
  const drift = seed % 7;
  const rotation = (Math.floor(seed / 8) % 13) - 6;

  return {
    shellColor: `rgba(${rgb.r},${rgb.g},${rgb.b},0.2)`,
    rimColor: "rgba(255,255,255,0.86)",
    innerGlowSize: Math.round(bubble.size * 0.7),
    mainHighlight: {
      width: Math.round(bubble.size * 0.28),
      height: Math.round(bubble.size * 0.4),
      left: Math.round(bubble.size * 0.21),
      top: Math.round(bubble.size * 0.15)
    },
    secondaryHighlight: {
      width: Math.round(bubble.size * 0.14),
      height: Math.round(bubble.size * 0.14),
      right: Math.round(bubble.size * 0.22),
      bottom: Math.round(bubble.size * 0.25)
    },
    wobbleDistance: 5 + drift,
    wobbleDuration: 2400 + (seed % 1201),
    rotationDegrees: rotation
  };
}

export function getRandomFireflyTarget(canvas: CanvasSize, targetSize: number, random = Math.random): Point {
  const maxX = Math.max(0, canvas.width - targetSize);
  const maxY = Math.max(0, canvas.height - targetSize);

  return {
    x: Math.round(random() * maxX),
    y: Math.round(random() * maxY)
  };
}

export function getNextFireflyDelay(random = Math.random): number {
  return Math.floor(1500 + random() * 1000);
}

export function areAllFlowersBloomed(flowers: boolean[]): boolean {
  return flowers.length > 0 && flowers.every(Boolean);
}

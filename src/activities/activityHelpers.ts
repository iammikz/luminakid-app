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

const BUBBLE_COLORS = ["#B7F0FF", "#FFD5E7", "#DCD7FF", "#CFF7DF", "#FFE4AD"];
const PASTELS = ["#EEEDFE", "#E8F8F1", "#FFF1D6", "#FCE4EC", "#E2F6FF", "#F7ECFF"];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function pickIndex(length: number, random: () => number): number {
  return Math.min(Math.floor(random() * length), length - 1);
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

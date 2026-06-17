export interface ActivityCatalogEntry {
  id: string;
  title: string;
  emoji: string;
  goal: string;
  minMonths: number;
  maxMonths: number;
  skills: string[];
  journalMonth: number;
  phaseOneImplemented: boolean;
}

export const ACTIVITY_CATALOG: ActivityCatalogEntry[] = [
  {
    id: "touch-sparkle",
    title: "Touch & Sparkle",
    emoji: "✨",
    goal: "Cause and effect through gentle touch feedback.",
    minMonths: 6,
    maxMonths: 6,
    skills: ["Hand-eye coordination", "Finger exploration", "Cause and effect"],
    journalMonth: 6,
    phaseOneImplemented: true
  },
  {
    id: "bubble-pop",
    title: "Bubble Pop",
    emoji: "🫧",
    goal: "Reach, track, and pop slow moving bubbles.",
    minMonths: 7,
    maxMonths: 7,
    skills: ["Reaching accuracy", "Tracking moving objects", "Anticipation"],
    journalMonth: 7,
    phaseOneImplemented: true
  },
  {
    id: "animal-discovery",
    title: "Animal Discovery",
    emoji: "🐄",
    goal: "Connect animal pictures with familiar sounds.",
    minMonths: 8,
    maxMonths: 8,
    skills: ["Language recognition", "Sound association", "Auditory memory"],
    journalMonth: 8,
    phaseOneImplemented: true
  },
  {
    id: "peekaboo",
    title: "Peekaboo",
    emoji: "👀",
    goal: "Build object permanence through reveal play.",
    minMonths: 9,
    maxMonths: 9,
    skills: ["Object permanence", "Anticipation", "Memory"],
    journalMonth: 9,
    phaseOneImplemented: true
  },
  {
    id: "follow-the-light",
    title: "Follow the Light",
    emoji: "🌟",
    goal: "Encourage visual tracking and focused reaching.",
    minMonths: 10,
    maxMonths: 10,
    skills: ["Visual tracking", "Attention span", "Motor planning"],
    journalMonth: 10,
    phaseOneImplemented: true
  },
  {
    id: "color-garden",
    title: "Color Garden",
    emoji: "🌸",
    goal: "Explore color and cause-and-effect through blooming flowers.",
    minMonths: 11,
    maxMonths: 11,
    skills: ["Color recognition", "Cause and effect", "Visual discrimination"],
    journalMonth: 11,
    phaseOneImplemented: true
  },
  {
    id: "first-words",
    title: "First Words",
    emoji: "🗣️",
    goal: "Pair familiar pictures with simple spoken words.",
    minMonths: 12,
    maxMonths: 12,
    skills: ["Vocabulary growth", "Word-object association", "Listening"],
    journalMonth: 12,
    phaseOneImplemented: true
  },
  {
    id: "matching-game",
    title: "Matching Game",
    emoji: "🐘",
    goal: "Recognize sameness through a first memory game.",
    minMonths: 13,
    maxMonths: 15,
    skills: ["Visual recognition", "Memory", "Concentration"],
    journalMonth: 13,
    phaseOneImplemented: false
  },
  {
    id: "shape-play",
    title: "Shape Play",
    emoji: "🔷",
    goal: "Explore shape recognition and motor planning.",
    minMonths: 16,
    maxMonths: 18,
    skills: ["Fine motor control", "Problem solving", "Shape recognition"],
    journalMonth: 16,
    phaseOneImplemented: false
  },
  {
    id: "mini-puzzles",
    title: "Mini Puzzles",
    emoji: "🧩",
    goal: "Build spatial reasoning with large simple pieces.",
    minMonths: 19,
    maxMonths: 24,
    skills: ["Spatial reasoning", "Persistence", "Problem solving"],
    journalMonth: 19,
    phaseOneImplemented: false
  }
];

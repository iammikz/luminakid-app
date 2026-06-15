import { ActivityPlaceholder } from "../activities/ActivityPlaceholder";
import type { Activity } from "../types/activity";
import { JOURNAL_DATA } from "./journalData";

function placeholder(emoji: string, title: string, goal: string) {
  return function PlaceholderActivity({ babyAgeMonths }: { babyAgeMonths: number }) {
    return <ActivityPlaceholder babyAgeMonths={babyAgeMonths} emoji={emoji} title={title} goal={goal} />;
  };
}

export const ACTIVITY_REGISTRY: Activity[] = [
  {
    id: "touch-sparkle",
    title: "Touch & Sparkle",
    emoji: "✨",
    goal: "Cause and effect through gentle touch feedback.",
    minMonths: 6,
    maxMonths: 6,
    skills: ["Hand-eye coordination", "Finger exploration", "Cause and effect"],
    component: placeholder("✨", "Touch & Sparkle", "Tap anywhere and see something delightful respond."),
    journal: JOURNAL_DATA[6]
  },
  {
    id: "bubble-pop",
    title: "Bubble Pop",
    emoji: "🫧",
    goal: "Reach, track, and pop slow moving bubbles.",
    minMonths: 7,
    maxMonths: 7,
    skills: ["Reaching accuracy", "Tracking moving objects", "Anticipation"],
    component: placeholder("🫧", "Bubble Pop", "Large bubbles invite reaching and discovery."),
    journal: JOURNAL_DATA[7]
  },
  {
    id: "animal-discovery",
    title: "Animal Discovery",
    emoji: "🐄",
    goal: "Connect animal pictures with familiar sounds.",
    minMonths: 8,
    maxMonths: 8,
    skills: ["Language recognition", "Sound association", "Auditory memory"],
    component: placeholder("🐄", "Animal Discovery", "Tap an animal card to hear and notice its sound."),
    journal: JOURNAL_DATA[8]
  },
  {
    id: "peekaboo",
    title: "Peekaboo",
    emoji: "👀",
    goal: "Build object permanence through reveal play.",
    minMonths: 9,
    maxMonths: 9,
    skills: ["Object permanence", "Anticipation", "Memory"],
    component: placeholder("👀", "Peekaboo", "A gentle reveal creates surprise and recognition."),
    journal: JOURNAL_DATA[9]
  },
  {
    id: "follow-the-light",
    title: "Follow the Light",
    emoji: "🌟",
    goal: "Encourage visual tracking and focused reaching.",
    minMonths: 10,
    maxMonths: 10,
    skills: ["Visual tracking", "Attention span", "Motor planning"],
    component: placeholder("🌟", "Follow the Light", "A soft light invites watching and reaching."),
    journal: JOURNAL_DATA[10]
  },
  {
    id: "color-garden",
    title: "Color Garden",
    emoji: "🌸",
    goal: "Explore color and cause-and-effect through blooming flowers.",
    minMonths: 11,
    maxMonths: 11,
    skills: ["Color recognition", "Cause and effect", "Visual discrimination"],
    component: placeholder("🌸", "Color Garden", "Tap a bud and watch the garden respond."),
    journal: JOURNAL_DATA[11]
  },
  {
    id: "first-words",
    title: "First Words",
    emoji: "🗣️",
    goal: "Pair familiar pictures with simple spoken words.",
    minMonths: 12,
    maxMonths: 12,
    skills: ["Vocabulary growth", "Word-object association", "Listening"],
    component: placeholder("🗣️", "First Words", "Tap familiar pictures and hear simple words."),
    journal: JOURNAL_DATA[12]
  },
  {
    id: "matching-game",
    title: "Matching Game",
    emoji: "🐘",
    goal: "Recognize sameness through a first memory game.",
    minMonths: 13,
    maxMonths: 15,
    skills: ["Visual recognition", "Memory", "Concentration"],
    component: placeholder("🐘", "Matching Game", "Find familiar pairs through gentle matching."),
    journal: JOURNAL_DATA[13]
  },
  {
    id: "shape-play",
    title: "Shape Play",
    emoji: "🔷",
    goal: "Explore shape recognition and motor planning.",
    minMonths: 16,
    maxMonths: 18,
    skills: ["Fine motor control", "Problem solving", "Shape recognition"],
    component: placeholder("🔷", "Shape Play", "Move big shapes toward matching outlines."),
    journal: JOURNAL_DATA[16]
  },
  {
    id: "mini-puzzles",
    title: "Mini Puzzles",
    emoji: "🧩",
    goal: "Build spatial reasoning with large simple pieces.",
    minMonths: 19,
    maxMonths: 24,
    skills: ["Spatial reasoning", "Persistence", "Problem solving"],
    component: placeholder("🧩", "Mini Puzzles", "Place large pieces to complete a familiar picture."),
    journal: JOURNAL_DATA[19]
  }
];

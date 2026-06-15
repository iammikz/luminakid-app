# LuminaKid — Master Development Prompt

You are building **LuminaKid**, a developmental baby app for parents of children aged 0–24 months. The app automatically unlocks age-appropriate interactive activities based on the baby's birth date, and pairs each activity with a parent-facing development journal. This document contains everything needed to build the app from scratch.

---

## 1. Product Vision

LuminaKid is a touch-first mobile application where the experience evolves month by month as the baby grows. Parents enter a birth date once; the app calculates the baby's current age and unlocks the right activities automatically. Each activity targets a specific developmental milestone. A companion journal tab explains what the baby is learning and gives parents hands-on activity ideas.

**Core principles:**
- No objectives, no failure states, no scores — only delight and discovery
- Touch targets must be large enough for a baby's imprecise motor control (minimum 88×88px)
- Every interaction must produce immediate, satisfying sensory feedback (sound + visual)
- Parents should feel informed and connected, not just like spectators

---

## 2. Tech Stack

### Mobile App (Primary Platform)
| Layer | Technology | Reason |
|---|---|---|
| Framework | React Native (Expo) | Cross-platform iOS + Android, easy audio/haptics access |
| Language | TypeScript | Type safety for activity engine and age logic |
| Navigation | Expo Router (file-based) | Clean screen routing |
| State | Zustand | Lightweight global state for baby profile + unlocked activities |
| Storage | AsyncStorage + MMKV | Persist baby profile and journal notes locally |
| Audio | expo-av | Play animal sounds, chimes, word recordings |
| Haptics | expo-haptics | Tactile feedback on every touch |
| Animations | React Native Reanimated v3 | Smooth, performant animations (bubbles, firefly, blooming) |
| 3D Rendering | Three.js + React Three Fiber + Expo GL | Shared 3D animation layer for simple tactile scenes, characters, and depth effects across native and web |
| Gestures | React Native Gesture Handler | Drag-and-drop for shape play and puzzles |
| Date logic | date-fns | Age calculation and month comparison |

### Web App (Secondary / PWA)
| Layer | Technology | Reason |
|---|---|---|
| Framework | Expo Web + React Native Web | Reuse the same Expo Router screens, activity engine, and touch-first UI across iOS, Android, and web |
| Language | TypeScript | Keep shared models, registry data, and activity logic type-safe |
| Navigation | Expo Router static web export | Supports GitHub Pages deployment from the generated `dist/` output |
| Styling | React Native StyleSheet/shared theme constants | Avoid maintaining a separate Tailwind/web-only design system |
| Animation | React Native Reanimated + CSS-backed React Native Web behavior | Keep animation code shared where browser support allows it |
| 3D Rendering | Three.js + React Three Fiber + Expo GL | Provide shared WebGL-powered 3D animation primitives for native and PWA builds |
| Audio | Expo-compatible sound abstraction | Use native audio on mobile and graceful browser behavior on web |
| State | Zustand with platform storage adapters | Persist baby profile and selected month locally on native and web |

The web/PWA is a secondary output of the Expo app, not a separate Next.js application. Keep the architecture single-codebase unless a future requirement explicitly needs a dedicated web app.

### Backend (Optional — Phase 2)
| Layer | Technology | Reason |
|---|---|---|
| API | Node.js + Express or Fastify | Simple REST endpoints |
| Auth | Clerk or Firebase Auth | Easy family account management |
| Database | PostgreSQL (Supabase) | Store baby profiles, journal entries, voice recordings |
| File Storage | Supabase Storage or S3 | Parent voice recordings for Peekaboo activity |
| Push Notifications | Expo Notifications | Monthly "New activity unlocked!" alerts |

### Phase 1 Scope (Local-only, no backend)
Build the full app with AsyncStorage only. No accounts, no cloud sync. This is the MVP.

---

## 3. Project Structure

```
luminakid/
├── app/                          # Expo Router screens
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab bar (Play / Journal)
│   │   ├── index.tsx             # Activity screen
│   │   └── journal.tsx           # Development journal screen
│   ├── setup.tsx                 # Birth date onboarding
│   └── _layout.tsx               # Root layout
│
├── src/
│   ├── activities/               # One file per activity
│   │   ├── TouchSparkle.tsx      # 6 months
│   │   ├── BubblePop.tsx         # 7 months
│   │   ├── AnimalDiscovery.tsx   # 8 months
│   │   ├── Peekaboo.tsx          # 9 months
│   │   ├── FollowTheLight.tsx    # 10 months
│   │   ├── ColorGarden.tsx       # 11 months
│   │   ├── FirstWords.tsx        # 12 months
│   │   ├── MatchingGame.tsx      # 13–15 months
│   │   ├── ShapePlay.tsx         # 16–18 months
│   │   └── MiniPuzzles.tsx       # 19–24 months
│   │
│   ├── engine/
│   │   ├── ageEngine.ts          # Age calculation + activity unlocking
│   │   ├── activityRegistry.ts   # Maps age ranges to activity components
│   │   └── journalData.ts        # Static journal content per month
│   │
│   ├── components/
│   │   ├── MonthNav.tsx          # Horizontal scrollable month selector
│   │   ├── SkillTags.tsx         # Skill pill tags display
│   │   ├── LockOverlay.tsx       # Shown on locked activities
│   │   ├── JournalCard.tsx       # Reusable journal card
│   │   └── StarBurst.tsx         # Reusable particle effect
│   │
│   ├── three/
│   │   ├── ThreeCanvas.tsx       # Shared native/web 3D canvas wrapper
│   │   ├── materials.ts          # Shared colors/material helpers
│   │   └── scenes/               # Reusable 3D scenes for activity moments
│   │
│   ├── store/
│   │   └── useBabyStore.ts       # Zustand store (baby profile, currentMonth)
│   │
│   ├── hooks/
│   │   ├── useBabyAge.ts         # Returns current age in months
│   │   └── useSound.ts           # Audio playback hook
│   │
│   ├── assets/
│   │   ├── sounds/
│   │   │   ├── chime.mp3
│   │   │   ├── pop.mp3
│   │   │   ├── success.mp3
│   │   │   ├── animals/
│   │   │   │   ├── cow.mp3       # "Moo! Cow!"
│   │   │   │   ├── dog.mp3
│   │   │   │   ├── cat.mp3
│   │   │   │   └── pig.mp3
│   │   │   └── words/
│   │   │       ├── ball.mp3
│   │   │       ├── cat.mp3
│   │   │       ├── milk.mp3
│   │   │       ├── mama.mp3
│   │   │       └── dada.mp3
│   │   └── images/
│   │       ├── animals/
│   │       └── shapes/
│   │
│   └── types/
│       ├── activity.ts
│       └── baby.ts
│
├── app.json
├── tsconfig.json
└── package.json
```

---

## 4. Core Data Models

```typescript
// src/types/baby.ts
export interface BabyProfile {
  id: string;
  name: string;
  dateOfBirth: string;          // ISO date string "YYYY-MM-DD"
  createdAt: string;
}

// src/types/activity.ts
export interface Activity {
  id: string;
  title: string;
  emoji: string;
  goal: string;
  minMonths: number;
  maxMonths: number;
  skills: string[];
  component: React.ComponentType<ActivityProps>;
  journal: JournalEntry;
}

export interface ActivityProps {
  babyAgeMonths: number;
}

export interface JournalEntry {
  monthLabel: string;
  developmentFocus: string;
  parentTip: string;
  milestones: string[];
  parentActivity: string;
}
```

---

## 5. Activity Engine

```typescript
// src/engine/ageEngine.ts
import { differenceInMonths } from 'date-fns';

export function getBabyAgeMonths(dateOfBirth: string): number {
  return differenceInMonths(new Date(), new Date(dateOfBirth));
}

export function isActivityUnlocked(activity: Activity, ageMonths: number): boolean {
  return ageMonths >= activity.minMonths;
}

export function getActiveActivity(ageMonths: number): Activity {
  const eligible = ACTIVITY_REGISTRY.filter(a => ageMonths >= a.minMonths);
  return eligible[eligible.length - 1] ?? ACTIVITY_REGISTRY[0];
}
```

```typescript
// src/engine/activityRegistry.ts
export const ACTIVITY_REGISTRY: Activity[] = [
  {
    id: 'touch-sparkle',
    title: 'Touch & Sparkle',
    emoji: '✨',
    goal: 'Cause and effect — touch something, see magic happen',
    minMonths: 6,
    maxMonths: 6,
    skills: ['Hand-eye coordination', 'Finger exploration', 'Cause & effect'],
    component: TouchSparkle,
    journal: { ... }
  },
  {
    id: 'bubble-pop',
    title: 'Bubble Pop',
    emoji: '🫧',
    minMonths: 7,
    maxMonths: 7,
    skills: ['Reaching accuracy', 'Tracking moving objects', 'Anticipation'],
    component: BubblePop,
    journal: { ... }
  },
  {
    id: 'animal-discovery',
    title: 'Animal Discovery',
    emoji: '🐄',
    minMonths: 8,
    maxMonths: 8,
    skills: ['Language recognition', 'Sound association', 'Auditory memory'],
    component: AnimalDiscovery,
    journal: { ... }
  },
  {
    id: 'peekaboo',
    title: 'Peekaboo',
    emoji: '👀',
    minMonths: 9,
    maxMonths: 9,
    skills: ['Object permanence', 'Anticipation', 'Memory'],
    component: Peekaboo,
    journal: { ... }
  },
  {
    id: 'follow-the-light',
    title: 'Follow the Light',
    emoji: '🌟',
    minMonths: 10,
    maxMonths: 10,
    skills: ['Visual tracking', 'Attention span', 'Motor planning'],
    component: FollowTheLight,
    journal: { ... }
  },
  {
    id: 'color-garden',
    title: 'Color Garden',
    emoji: '🌸',
    minMonths: 11,
    maxMonths: 11,
    skills: ['Color recognition', 'Cause & effect', 'Visual discrimination'],
    component: ColorGarden,
    journal: { ... }
  },
  {
    id: 'first-words',
    title: 'First Words',
    emoji: '🗣️',
    minMonths: 12,
    maxMonths: 12,
    skills: ['Vocabulary growth', 'Word-object association', 'Listening'],
    component: FirstWords,
    journal: { ... }
  },
  {
    id: 'matching-game',
    title: 'Matching Game',
    emoji: '🐘',
    minMonths: 13,
    maxMonths: 15,
    skills: ['Visual recognition', 'Memory', 'Concentration'],
    component: MatchingGame,
    journal: { ... }
  },
  {
    id: 'shape-play',
    title: 'Shape Play',
    emoji: '🔷',
    minMonths: 16,
    maxMonths: 18,
    skills: ['Fine motor control', 'Problem solving', 'Shape recognition'],
    component: ShapePlay,
    journal: { ... }
  },
  {
    id: 'mini-puzzles',
    title: 'Mini Puzzles',
    emoji: '🧩',
    minMonths: 19,
    maxMonths: 24,
    skills: ['Spatial reasoning', 'Persistence', 'Problem solving'],
    component: MiniPuzzles,
    journal: { ... }
  },
];
```

---

## 6. Zustand Store

```typescript
// src/store/useBabyStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BabyStore {
  baby: BabyProfile | null;
  selectedMonth: number | null;   // null = auto (use current age)
  setBaby: (baby: BabyProfile) => void;
  setSelectedMonth: (month: number | null) => void;
  clearBaby: () => void;
}

export const useBabyStore = create<BabyStore>()(
  persist(
    (set) => ({
      baby: null,
      selectedMonth: null,
      setBaby: (baby) => set({ baby }),
      setSelectedMonth: (month) => set({ selectedMonth: month }),
      clearBaby: () => set({ baby: null, selectedMonth: null }),
    }),
    {
      name: 'luminakid-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 7. Activity Implementation Specs

### Touch & Sparkle (6 months)
- Full-screen pressable canvas
- On touch: spawn 5 star particles at touch position, expand outward, fade out over 800ms
- Background color slowly shifts to a random pastel on each touch
- Play gentle xylophone chime on every touch
- Trigger light haptic feedback

### Bubble Pop (7 months)
- Bubbles spawn at random positions, diameter 80–140px
- Maximum 5 bubbles on screen at once
- New bubble appears every 2s if under the limit
- Tap to pop: scale up 1.4x then opacity 0 over 300ms, play pop sound
- New bubble replaces it after 1s

### Animal Discovery (8 months)
- 4 large animal cards in a 2×2 grid, minimum 120×120px each
- Tap: play animal sound file ("Moo! Cow!"), show speech bubble above animal
- Speech bubble fades after 2 seconds
- Shuffle which 4 animals appear each session
- Animals: cow, dog, cat, pig, duck, frog, sheep, horse (pick 4 randomly)

### Peekaboo (9 months)
- Full-screen colored curtain (purple) hides content beneath
- Tap curtain: animate it sliding UP (scaleY 1 → 0, 600ms ease-in-out)
- Reveal: random animal emoji OR a parent photo (from device gallery, opt-in)
- After 2s: curtain slides back down, new animal randomized
- If parent has recorded a voice clip: play it when curtain opens
- Voice recording: Settings → "Record your voice" → hold to record (max 5s)

### Follow the Light (10 months)
- Glowing amber circle (firefly, 24px diameter) moves to random position every 1.5–2.5s
- Uses Reanimated withTiming for smooth position transitions
- Firefly pauses 300ms at new position before moving again
- Tap on firefly: celebration flash + chime, increment catch counter
- Show star rating (1–3 stars) after 5 catches

### Color Garden (11 months)
- 5 flower buds arranged across the screen
- Each bud shows a seedling emoji (🌱)
- Tap: bud blooms into a colored flower, canvas background shifts to a matching pastel
- All 5 bloomed: short celebration animation

### First Words (12 months)
- 5 picture cards arranged on screen: ball, cat, milk, mama, dada
- Cards minimum 100×100px
- Tap: play the word audio file, card highlights in purple, word text fades in below emoji
- Highlight fades after 1s

### Matching Game (13–15 months)
- 4 cards face-down in a 2×2 grid (2 pairs)
- Tap first card: flip face-up, show animal
- Tap second card: flip face-up
  - Match: both stay face-up with green border + chime
  - No match: both flip back face-down after 800ms
- All matched: celebration screen, shuffle for new round
- Card size minimum 120×120px

### Shape Play (16–18 months)
- 3 shapes: circle (purple), square (teal), triangle (coral)
- Each shape is draggable (PanGestureHandler)
- Matching dashed outlines at target positions
- Drop within 40px of target center: snap into place + success sound
- Drop elsewhere: spring back to starting position
- All 3 placed: celebration + confetti animation

### Mini Puzzles (19–24 months)
- 3 puzzles to choose from: Cat, Dog, Car
- Each puzzle: 2–3 large draggable pieces
- Drop zone highlights when piece is within 50px
- Completed puzzle: show full image + play happy sound
- Piece size minimum 120px on shortest side

---

## 8. Sound System

```typescript
// src/hooks/useSound.ts
import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const SOUND_MAP: Record<string, any> = {
  'chime':   require('../assets/sounds/chime.mp3'),
  'pop':     require('../assets/sounds/pop.mp3'),
  'success': require('../assets/sounds/success.mp3'),
  'cow':     require('../assets/sounds/animals/cow.mp3'),
  'dog':     require('../assets/sounds/animals/dog.mp3'),
  'cat':     require('../assets/sounds/animals/cat.mp3'),
  'pig':     require('../assets/sounds/animals/pig.mp3'),
  'ball':    require('../assets/sounds/words/ball.mp3'),
  'mama':    require('../assets/sounds/words/mama.mp3'),
  'dada':    require('../assets/sounds/words/dada.mp3'),
  'milk':    require('../assets/sounds/words/milk.mp3'),
};

export function useSound(key: string) {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    Audio.Sound.createAsync(SOUND_MAP[key]).then(({ sound }) => {
      soundRef.current = sound;
    });
    return () => { soundRef.current?.unloadAsync(); };
  }, [key]);

  const play = async () => {
    await soundRef.current?.replayAsync();
  };

  return { play };
}
```

**Sound assets needed:**
- `chime.mp3` — gentle xylophone chime (Sparkle, Firefly)
- `pop.mp3` — soft bubble pop
- `success.mp3` — short celebratory jingle
- `animals/cow.mp3` — "Moo! Cow!" (warm, theatrical voice)
- `animals/dog.mp3` — "Woof! Dog!"
- `animals/cat.mp3` — "Meow! Cat!"
- `animals/pig.mp3` — "Oink! Pig!"
- `words/ball.mp3` — "Ball" (clear, slow enunciation)
- `words/mama.mp3` — "Mama"
- `words/dada.mp3` — "Dada"
- `words/milk.mp3` — "Milk"
- `words/cat.mp3` — "Cat"

Use ElevenLabs or Google Cloud TTS for word audio. Record animal sounds with a warm voice actor.
Pre-load all sounds on app launch — never lazy-load on tap (causes latency).

---

## 9. Journal Data Structure

```typescript
// src/engine/journalData.ts
export const JOURNAL_DATA: Record<number, JournalEntry> = {
  6: {
    monthLabel: '6 months',
    developmentFocus: 'Your baby is discovering that their actions cause reactions. When they touch the screen and see stars appear, they\'re building one of the most important cognitive connections of early life — cause and effect.',
    parentTip: 'Try: Let baby touch different textures — soft blanket, smooth table, bumpy toy. Talk about what they feel.',
    milestones: [
      'Reaches for objects intentionally',
      'Brings hands to midline',
      'Tracks moving objects with eyes',
      'Responds to familiar voices',
      'Rolls over in both directions',
    ],
    parentActivity: 'Sit baby in your lap and hold a bright toy just out of reach. When they reach for it, bring it close and say "You got it!" Repeat with different colored objects.',
  },
  7: {
    monthLabel: '7 months',
    developmentFocus: 'Your baby is developing intentional reach and learning to track moving objects. Bubbles are perfect — slow enough to follow, satisfying to pop.',
    parentTip: 'Try: Blow real bubbles outside! Baby will love watching them float and pop.',
    milestones: [
      'Sits with support',
      'Transfers objects hand to hand',
      'Babbles consonants (ba, ma, da)',
      'Shows excitement with whole body',
    ],
    parentActivity: 'Play "pass the ball" — gently roll a soft ball to baby and cheer when they grab it. This builds the same tracking skill as bubble popping.',
  },
  8: {
    monthLabel: '8 months',
    developmentFocus: 'Language is exploding this month. Baby can now connect sounds to meanings. Every animal sound they hear is building a vocabulary foundation that will pay off at 18–24 months.',
    parentTip: 'Try: Point to animals in picture books and make the sounds. "Look — cow! Mooo!"',
    milestones: [
      'Understands "no"',
      'Imitates sounds',
      'Crawling may begin',
      'Stranger anxiety appears',
    ],
    parentActivity: 'Take a walk and name everything you see — "dog!", "bird!", "tree!". Babies this age absorb language like sponges even before they can speak.',
  },
  9: {
    monthLabel: '9 months',
    developmentFocus: 'Peekaboo teaches one of the most profound concepts: things exist even when you can\'t see them. This is called object permanence and it is foundational to all future reasoning.',
    parentTip: 'Try: Hide a toy under a blanket. Does baby look for it? That\'s object permanence in action!',
    milestones: [
      'Pulls to stand',
      'Says mama/dada (may not be directed yet)',
      'Waves bye-bye',
      'Points at objects of interest',
    ],
    parentActivity: 'Play peekaboo with your hands, a cloth, or around a corner. Vary the timing — sometimes fast, sometimes slow — to build anticipation.',
  },
  10: {
    monthLabel: '10 months',
    developmentFocus: 'Baby\'s attention span is growing fast. Chasing a moving target requires sustained focus, visual prediction, and coordinated reaching — all happening simultaneously.',
    parentTip: 'Try: Shine a flashlight on the wall and let baby watch and swipe at the light dot.',
    milestones: [
      'Claps hands',
      'Responds to name consistently',
      'Cruising along furniture',
      'First words may emerge',
    ],
    parentActivity: 'Use a feather or ribbon on a stick and slowly move it for baby to follow. Pause it occasionally so they can grab it — success is motivating!',
  },
  11: {
    monthLabel: '11 months',
    developmentFocus: 'Your baby is starting to distinguish colors more precisely. The blooming flowers reinforce cause and effect while the colors stimulate visual processing centers in the brain.',
    parentTip: 'Try: Point out colors all day — "your red cup", "the blue sky", "green grass". Color words need lots of repetition.',
    milestones: [
      'Stands alone briefly',
      'Imitates actions and words',
      'Points to indicate wants',
      'May say 2–3 words',
    ],
    parentActivity: 'Sort objects by color during playtime. Simple bins and colored blocks work perfectly. Name each color as baby places it.',
  },
  12: {
    monthLabel: '12 months',
    developmentFocus: 'One year! Baby may now say 1–3 words. Every word they hear is building toward their vocabulary explosion at 18–24 months. Repetition is how words get stored.',
    parentTip: 'Try: Narrate your day constantly. "Now we\'re washing hands. Water! Soap! Clean hands!"',
    milestones: [
      'First birthday!',
      'Walks with support or independently',
      'Says 1–3 meaningful words',
      'Points to body parts when named',
    ],
    parentActivity: 'Read simple board books together and point to pictures. "Where\'s the cat? There\'s the cat! Cat says meow!" Repetition is the key.',
  },
  13: {
    monthLabel: '13–15 months',
    developmentFocus: 'Matching is baby\'s first logic game. Finding two that are the same requires holding an image in working memory — a huge cognitive leap forward.',
    parentTip: 'Try: Play with physical matching cards on the floor. Start face-up so baby can see all cards before any are flipped.',
    milestones: [
      'Walks independently',
      'Vocabulary growing quickly',
      'Imitates household tasks',
      'Strong preferences emerging',
    ],
    parentActivity: 'Sort laundry together — match pairs of socks! Baby can find the matching ones while you name colors and count.',
  },
  16: {
    monthLabel: '16–18 months',
    developmentFocus: 'Shape sorting requires recognizing form, planning a movement, and self-correcting when something doesn\'t fit. All vital cognitive skills that underpin future math and problem solving.',
    parentTip: 'Try: Get a physical shape sorter toy. Let baby struggle a little before helping — the effort is the learning!',
    milestones: [
      'Runs (unsteadily)',
      'Vocabulary 50+ words',
      'Beginning to combine two words',
      'Symbolic play begins',
    ],
    parentActivity: 'Draw large simple shapes on paper and let toddler place matching objects inside them. A circle for balls, square for blocks.',
  },
  19: {
    monthLabel: '19–24 months',
    developmentFocus: 'Simple puzzles build spatial reasoning — understanding how pieces relate to a whole. Persistence through frustration is also developing, which is as important as any cognitive skill.',
    parentTip: 'Try: Floor puzzles with large knobbed pieces are ideal for this age. Sit together and take turns.',
    milestones: [
      'Speaks in 2-word phrases',
      'Runs confidently',
      'Sorts by shape and color',
      'Pretend play is rich and elaborate',
    ],
    parentActivity: 'Build simple structures with blocks and knock them down together. Then have toddler try to rebuild. Celebrate every attempt, not just success.',
  },
};
```

---

## 10. Onboarding Screen

```typescript
// app/setup.tsx
// Fields: Baby name (optional, defaults to "Your baby"), Date of birth (required)
// Date picker: native DateTimePicker from @react-native-community/datetimepicker
// Validation:
//   - DOB must be in the past
//   - DOB must be within last 24 months
//   - If baby is under 6 months: show "Coming soon" screen with
//     countdown to first activity unlock at 6 months
// On submit: save to Zustand store, navigate to main tabs
// Entry animation: flowers blooming from bottom of screen
```

---

## 11. Design System

### Colors
```typescript
const COLORS = {
  primary:       '#7F77DD',  // Brand purple
  primaryLight:  '#EEEDFE',
  primaryDark:   '#3C3489',
  teal:          '#1D9E75',  // Success
  coral:         '#D85A30',  // Warm accent
  amber:         '#FAC775',  // Firefly glow
  pink:          '#D4537E',  // Garden accent
  textPrimary:   '#1A1A1A',
  textSecondary: '#6B6B6B',
  background:    '#FFFFFF',
  surface:       '#F8F7FE',
  border:        'rgba(0,0,0,0.08)',
};
```

### Typography
```typescript
const TYPOGRAPHY = {
  h1:    { fontSize: 28, fontWeight: '500' as const },
  h2:    { fontSize: 22, fontWeight: '500' as const },
  h3:    { fontSize: 18, fontWeight: '500' as const },
  body:  { fontSize: 16, lineHeight: 26 },
  small: { fontSize: 13, lineHeight: 20 },
  label: { fontSize: 11 },
};
```

### Touch Target Rules
- Minimum touch target: **88×88px** (Apple HIG requirement for accessibility)
- Bubble pop: 80–140px diameter
- Animal cards: 140×140px minimum
- Shape puzzle pieces: 100×100px minimum
- Word cards: 100×100px minimum

### Animation Constants
```typescript
const ANIM = {
  springConfig:  { stiffness: 180, damping: 20 },
  pressScale:    0.92,
  bubbleDrift:   800,    // ms
  fireflyMove:   1500,   // ms
  curtainReveal: 600,    // ms
  starFade:      800,    // ms
  speechBubble:  2000,   // ms visible
};
```

---

## 12. Screen Flow

```
App Launch
    │
    ├── First Launch → Setup Screen (name + DOB)
    │       │
    │       └── Submit → Main Tabs
    │
    └── Returning → Main Tabs (auto-loaded from storage)
            │
            ├── Tab: Play
            │     ├── Month Nav (horizontal scroll, age-gated)
            │     ├── Activity Canvas (full-width interactive area)
            │     └── Skill Tags (bottom strip)
            │
            └── Tab: Journal
                  ├── Development Focus Card
                  ├── Milestones This Month Card
                  └── Parent Activity Idea Card
```

---

## 13. Peekaboo Voice Recording Feature

```typescript
// Settings screen: "Record your voice for Peekaboo"
// Press and hold button to record (max 5 seconds)
// On release: auto-stop recording
// Show playback preview
// Save / Re-record options
// URI saved to Zustand store + AsyncStorage

import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

async function startRecording() {
  await Audio.requestPermissionsAsync();
  await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY
  );
  return recording;
}

async function stopAndSave(recording: Audio.Recording) {
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  const dest = FileSystem.documentDirectory + 'peekaboo-voice.m4a';
  await FileSystem.moveAsync({ from: uri!, to: dest });
  return dest;
}
```

---

## 14. Push Notifications (Phase 2)

```typescript
// Monthly unlock notification
// Scheduled local notification fires on baby's monthly birthday
// Message: "🌸 New activity unlocked! [Name] is 7 months old today."
// Deep links directly to the new activity

import * as Notifications from 'expo-notifications';

async function scheduleMonthlyUnlock(baby: BabyProfile) {
  const nextBirthday = addMonths(new Date(baby.dateOfBirth), currentMonth + 1);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'LuminaKid 🌸',
      body: `${baby.name} is growing! A new activity just unlocked.`,
    },
    trigger: { date: nextBirthday },
  });
}
```

---

## 15. Build & Deployment

### Initial Setup
```bash
npx create-expo-app luminakid --template blank-typescript
cd luminakid

npx expo install \
  expo-av \
  expo-haptics \
  expo-router \
  expo-notifications \
  expo-file-system \
  expo-gl \
  react-native-reanimated \
  react-native-gesture-handler \
  @react-native-async-storage/async-storage \
  @react-native-community/datetimepicker \
  zustand \
  date-fns

npm install three @react-three/fiber
npm install --save-dev @types/three
```

### app.json (key fields)
```json
{
  "expo": {
    "name": "LuminaKid",
    "slug": "luminakid",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "splash": {
      "backgroundColor": "#7F77DD",
      "resizeMode": "contain"
    },
    "ios": {
      "bundleIdentifier": "com.yourname.luminakid",
      "infoPlist": {
        "NSMicrophoneUsageDescription": "Used to record your voice for the Peekaboo activity"
      }
    },
    "android": {
      "package": "com.yourname.luminakid",
      "permissions": ["RECORD_AUDIO"]
    },
    "plugins": [
      "expo-router",
      "expo-av",
      ["expo-notifications", { "icon": "./assets/notification-icon.png" }]
    ],
    "web": {
      "output": "static"
    }
  }
}
```

### GitHub Pages web/PWA build
```bash
# Export static web build for GitHub Pages
npm run export:web
```

The GitHub Pages workflow should run tests, typecheck, export the Expo web build, upload `dist/`, and deploy it whenever the `main` branch changes.

### Build for stores
```bash
# Configure EAS
npx eas-cli init

# iOS build
eas build --platform ios --profile production

# Android build
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## 16. Key Constraints

1. **No objectives, no failure.** Every touch produces something delightful. Nothing goes wrong.
2. **Baby-proof touch targets.** Minimum 88×88px. Bigger is always better.
3. **Immediate audio + visual feedback.** Sound must play within 100ms of touch. Pre-load all audio on app launch.
4. **Portrait mode only.** Lock orientation. Landscape creates disorienting layout shifts for babies.
5. **No text babies need to read.** All instruction text is for parents. Activities must be self-evident through direct touch.
6. **Auto-select the right activity.** Parents configure once. The app decides. No settings to navigate.
7. **Offline-first.** Everything in Phase 1 works with no internet connection.
8. **No ads, no paywalls on core activities.** Keep the experience pure.
9. **Auto-brightness consideration.** Reduce bright white flashes; use gentle pastel color shifts instead.
10. **Screen time philosophy.** Journal tab should actively remind parents to put the phone down and do the real-world activity version.
11. **Single-codebase web support.** The PWA must remain an Expo Web output of the React Native app unless a future phase explicitly approves a separate web application.
12. **3D is supportive, not distracting.** Use Three.js for gentle depth, motion, and tactile scenes only when it improves baby-safe interaction. Keep 3D animations simple, performant, and non-essential to understanding the activity.

---

## 17. Phase Roadmap

### Phase 1 — MVP (weeks 1–8)
- Onboarding + birth date setup
- Activities: Touch & Sparkle, Bubble Pop, Animal Discovery, Peekaboo, Follow the Light, Color Garden, First Words
- Month navigation with age gating
- Development journal (static content per month)
- Sound + haptic feedback on all activities
- Parent voice recording for Peekaboo
- Local persistence (no accounts)

### Phase 1.2 — GitHub Pages Web/PWA Deployment
- Prepare the Expo static web build for GitHub Pages deployment after the Phase 1 app foundation is complete
- Keep native mobile as the primary target while enabling browser demos and testing through Expo Web
- Add the `export:web` script and GitHub Actions Pages workflow for the generated `dist/` output
- Run tests and typecheck before deploying the static site
- Preserve Phase 1 local-only and offline-first behavior where browser APIs allow it

### Phase 2 — Cloud & Accounts (weeks 9–16)
- Family accounts (multiple babies per parent)
- Cloud sync of baby profile and journal notes
- Monthly unlock push notifications
- Activities: Matching Game, Shape Play, Mini Puzzles
- Parent photo integration in Peekaboo

### Phase 3 — Growth (months 5–8)
- Parent journal notes ("Baby said 'dada' today!")
- Downloadable monthly development summary PDF
- Pediatrician-reviewed content verification badges
- Localization: Spanish, Filipino, French, Arabic
- Customizable baby avatar and name display in activities

# Phase 2 Activities Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 6-9 month placeholder activities with touch-first interactive implementations and document local testing/build workflow.

**Architecture:** Add one component per activity under `src/activities/`, plus `src/activities/activityHelpers.ts` for deterministic selection and bounds logic. Update `src/engine/activityRegistry.tsx` to wire the real components while preserving future placeholders.

**Tech Stack:** Expo Router, React Native, TypeScript, React Native Reanimated, Vitest.

---

### Task 1: Deterministic Activity Helpers

**Files:**
- Create: `src/activities/activityHelpers.ts`
- Create: `tests/activityHelpers.test.ts`

- [ ] Write failing Vitest tests for animal selection, bubble bounds, and random peekaboo animal selection.
- [ ] Run `npm test -- tests/activityHelpers.test.ts` and verify the test fails because the helper module does not exist.
- [ ] Implement `selectUniqueAnimals`, `createBubble`, `getRandomPastel`, and `getRandomAnimal`.
- [ ] Run `npm test -- tests/activityHelpers.test.ts` and verify the helper tests pass.

### Task 2: Touch & Sparkle

**Files:**
- Create: `src/activities/TouchSparkle.tsx`

- [ ] Implement a large pressable canvas using touch coordinates from `Pressable` events.
- [ ] Spawn five particles per touch with stable IDs, randomized drift, and timed cleanup.
- [ ] Shift canvas background through gentle pastels from the helper.
- [ ] Keep all feedback visual and immediate without sound/haptic dependencies.

### Task 3: Bubble Pop

**Files:**
- Create: `src/activities/BubblePop.tsx`

- [ ] Measure the canvas with `onLayout`.
- [ ] Seed bubbles with `createBubble` and keep no more than five visible.
- [ ] Add a timer that creates bubbles every two seconds when below the limit.
- [ ] On tap, mark the bubble popping, animate scale/opacity, remove it, then allow normal replacement.

### Task 4: Animal Discovery

**Files:**
- Create: `src/activities/AnimalDiscovery.tsx`

- [ ] Select four unique animals once per component mount.
- [ ] Render a 2x2 grid with cards at least 120x120px.
- [ ] On tap, show a speech bubble with the animal sound label for two seconds.

### Task 5: Peekaboo

**Files:**
- Create: `src/activities/Peekaboo.tsx`

- [ ] Render a large curtain canvas with a hidden animal reveal.
- [ ] On tap, open the curtain with Reanimated timing.
- [ ] Reveal a random animal from the approved pool.
- [ ] Close the curtain after two seconds and allow another reveal.

### Task 6: Registry and README

**Files:**
- Modify: `src/engine/activityRegistry.tsx`
- Modify: `README.md`

- [ ] Import the four activity components and assign them to months 6-9.
- [ ] Remove placeholder wrapping only for implemented months.
- [ ] Add README instructions for `npm install`, `npm test`, `npm run typecheck`, `npm start`, platform dev targets, and EAS build commands.

### Task 7: Verification, Review, Commit, Push

**Files:**
- Review all changed files.

- [ ] Run `npm test`.
- [ ] Run `npm run typecheck`.
- [ ] Review the diff against `docs/phase-2-prompt.md` and `docs/luminakid-master-prompt.md`.
- [ ] Commit with an imperative message.
- [ ] Push `main` to `origin`.

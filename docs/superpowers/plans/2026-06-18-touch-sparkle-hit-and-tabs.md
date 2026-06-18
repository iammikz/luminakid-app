# Touch Sparkle Hit and Tab Chrome Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep sparkles at canvas-relative touch coordinates, fade only the topmost touched Kitty and reset all six after the final fade, while centering and collapsing the shared bottom tabs on every route.

**Architecture:** Add pure hit-testing and randomized reset helpers beside the existing Touch & Sparkle math, then keep animation/timer lifecycle in `TouchSparkle.tsx`. Reuse the existing tab Chrome store and drag-threshold helper, but render one route-independent collapsible shell around a centered width-constrained tab frame.

**Tech Stack:** Expo 54, React Native 0.81, React Native Reanimated 4, Zustand, Vitest

---

### Task 1: Character hit testing and reset positions

**Files:**
- Modify: `tests/touchSparkleHelpers.test.ts`
- Modify: `src/activities/touchSparkleHelpers.ts`

- [ ] **Step 1: Write failing tests**

Add tests that call:

```ts
findTopmostCharacterAt([
  { id: "back", x: 20, y: 20, faded: false },
  { id: "front", x: 20, y: 20, faded: false }
], 40, 40, 88)
```

and expect `"front"`; expect a faded front character to select `"back"`; expect a miss to return `undefined`. Add a deterministic test for `createRandomCharacterPositions(6, { width: 320, height: 640 }, 88, () => 0.5)` that asserts six positions and verifies `0 <= x <= 232` and `0 <= y <= 552`.

- [ ] **Step 2: Verify RED**

Run `npx vitest run tests/touchSparkleHelpers.test.ts`.

Expected: FAIL because the two helper exports do not exist.

- [ ] **Step 3: Implement minimal helpers**

Add:

```ts
export interface HittableCharacter {
  id: string;
  x: number;
  y: number;
  faded: boolean;
}

export function findTopmostCharacterAt(
  characters: HittableCharacter[],
  x: number,
  y: number,
  size: number
): string | undefined {
  for (let index = characters.length - 1; index >= 0; index -= 1) {
    const character = characters[index];
    if (!character.faded && x >= character.x && x <= character.x + size && y >= character.y && y <= character.y + size) {
      return character.id;
    }
  }
  return undefined;
}

export function createRandomCharacterPositions(
  count: number,
  bounds: Bounds,
  size: number,
  random = Math.random
): Array<{ x: number; y: number }> {
  const maxX = Math.max(0, bounds.width - size);
  const maxY = Math.max(0, bounds.height - size);
  return Array.from({ length: count }, () => ({ x: unit(random) * maxX, y: unit(random) * maxY }));
}
```

- [ ] **Step 4: Verify GREEN**

Run `npx vitest run tests/touchSparkleHelpers.test.ts`.

Expected: all Touch & Sparkle helper tests pass.

### Task 2: Topmost fade and full-round reset

**Files:**
- Modify: `src/activities/TouchSparkle.tsx`

- [ ] **Step 1: Make visual descendants non-interactive**

Wrap the background, all character images, and sparkles in:

```tsx
<View pointerEvents="none" style={styles.visualLayer}>...</View>
```

with `visualLayer: StyleSheet.absoluteFillObject`. This guarantees the parent `Pressable` receives every press and its `locationX/locationY` remain canvas-relative.

- [ ] **Step 2: Add fading character state**

Extend `MovingCharacter` with `faded: boolean`, initialize all six to false, and render through a `MovingKitty` component. `MovingKitty` animates opacity with `withTiming(character.faded ? 0 : 0.92, { duration: 320 })` while preserving the existing translated position.

- [ ] **Step 3: Hit-test and schedule reset**

In `addSparkles`, call `findTopmostCharacterAt(characters, locationX, locationY, CHARACTER_SIZE)`. Mark only the returned id faded. If it was the final visible character, schedule a 320ms timer that calls `createRandomCharacterPositions(6, canvasSize, CHARACTER_SIZE)` and updates every character with its new coordinates and `faded: false`. Keep velocities unchanged and clear the reset timer on unmount.

- [ ] **Step 4: Verify activity checks**

Run `npx vitest run tests/touchSparkleHelpers.test.ts` and `npm run typecheck`.

Expected: both exit 0.

### Task 3: Route-independent centered collapsible tabs

**Files:**
- Modify: `tests/tabChrome.test.ts`
- Modify: `src/engine/tabChrome.ts`
- Modify: `app/(tabs)/_layout.tsx`

- [ ] **Step 1: Write failing tab visibility tests**

Replace the parent-route visibility expectation with:

```ts
expect(shouldShowTabBar("index", false)).toBe(false);
expect(shouldShowTabBar("journal", false)).toBe(false);
expect(shouldShowTabBar("settings", false)).toBe(false);
expect(shouldShowTabBar("index", true)).toBe(true);
expect(shouldShowTabBar("journal", true)).toBe(true);
expect(shouldShowTabBar("settings", true)).toBe(true);
```

- [ ] **Step 2: Verify RED**

Run `npx vitest run tests/tabChrome.test.ts`.

Expected: Journal and Settings collapsed assertions fail.

- [ ] **Step 3: Make visibility route-independent**

Implement:

```ts
export function shouldShowTabBar(_routeName: string | undefined, tabsExpanded: boolean): boolean {
  return tabsExpanded;
}
```

- [ ] **Step 4: Use one collapsible shell**

Remove the Play-only render branch and Play-route collapse effect. Always render the pan gesture, handle, and animated group. Derive pointer events from `shouldShowTabBar(activeRouteName, playTabsExpanded)`.

Wrap `BottomTabBar` in:

```tsx
<View style={styles.tabBarFrame}>
  <BottomTabBar {...props} />
</View>
```

Use `tabBarFrame: { width: "92%", maxWidth: 920, height: 108, alignSelf: "center" }`. Change `tabBarStyle` to `width: "100%"`, `marginHorizontal: 0`, and remove `maxWidth`/`alignSelf`; keep the existing bottom margin, height, radius, colors, and shadow.

- [ ] **Step 5: Verify GREEN**

Run `npx vitest run tests/tabChrome.test.ts` and `npm run typecheck`.

Expected: tab tests and TypeScript pass.

### Task 4: Full and visual verification

**Files:**
- Modify: `design-qa.md`

- [ ] **Step 1: Run automated checks**

Run `npm test`, `npm run typecheck`, and `git diff --check`.

Expected: all commands exit 0.

- [ ] **Step 2: Verify activity interactions**

In the in-app browser at a portrait viewport, tap background, a single Kitty, and overlapping Kitties. Confirm sparkles remain at the touch point, only the topmost overlap fades, faded characters cannot be selected again, and the sixth fade resets all six at new positions.

- [ ] **Step 3: Verify tab layouts**

At narrow and wide viewports, confirm the tab frame remains centered. On Play, Journal, and Settings, drag down to collapse and up to expand; confirm the handle remains usable while collapsed.

- [ ] **Step 4: Update QA evidence**

Append the tested states and findings to `design-qa.md`. End with `final result: passed` only when no P0/P1/P2 issue remains.

# Touch & Sparkle Stitch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the six-month Touch & Sparkle activity as the selected faithful Stitch scene with a moving bundled Hello Kitty image and Stitch-equivalent square sparkle bursts.

**Architecture:** Keep rendering and lifecycle behavior in `TouchSparkle.tsx`, while placing deterministic sparkle generation and bounded character movement in a new focused helper module. Import the exact Stitch PNG statically so Expo packages the activity for offline native and web use. Preserve existing sound and haptic hooks.

**Tech Stack:** Expo 54, React Native 0.81, TypeScript, React Native Reanimated 4, Vitest

---

## File Map

- Create `src/assets/images/kindpng_6787158.png`: exact character asset exported from the Stitch project.
- Create `src/assets/images/touch-sparkle-background.png`: generated raster background matching the Stitch rainbow shader.
- Create `src/activities/touchSparkleHelpers.ts`: particle model generation and bounded movement math.
- Create `tests/touchSparkleHelpers.test.ts`: deterministic behavior and bounds coverage.
- Modify `src/activities/TouchSparkle.tsx`: Stitch scene, moving character, particles, meter, sound, and haptics.

### Task 1: Validate the visual assets

**Files:**
- Create: `src/assets/images/kindpng_6787158.png`
- Create: `src/assets/images/touch-sparkle-background.png`

- [ ] **Step 1: Export the exact asset from Stitch**

Use the user-supplied `kindpng_6787158.png` copied from the authenticated Stitch project. Keep the generated `touch-sparkle-background.png` as the raster equivalent of the Stitch rainbow shader.

- [ ] **Step 2: Verify the file signature and dimensions**

Run:

```powershell
Get-Item src/assets/images/kindpng_6787158.png,src/assets/images/touch-sparkle-background.png | Select-Object Name,Length
```

Expected: both filenames are exact and both lengths are greater than zero. Open the local files and confirm the character has transparency and the background is a smooth portrait rainbow field.

- [ ] **Step 3: Commit the isolated asset**

```powershell
git add -- src/assets/images/kindpng_6787158.png src/assets/images/touch-sparkle-background.png
git commit -m "feat(touch-sparkle): add visual assets"
```

### Task 2: Add deterministic sparkle and movement helpers

**Files:**
- Create: `src/activities/touchSparkleHelpers.ts`
- Create: `tests/touchSparkleHelpers.test.ts`

- [ ] **Step 1: Write failing helper tests**

Create `tests/touchSparkleHelpers.test.ts`:

```ts
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

  it("reverses the character at a canvas edge", () => {
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
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run:

```powershell
npx vitest run tests/touchSparkleHelpers.test.ts
```

Expected: FAIL because `touchSparkleHelpers.ts` does not exist.

- [ ] **Step 3: Implement the minimal helper module**

Create `src/activities/touchSparkleHelpers.ts`:

```ts
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
```

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run:

```powershell
npx vitest run tests/touchSparkleHelpers.test.ts
```

Expected: four tests pass.

- [ ] **Step 5: Commit helpers and tests**

```powershell
git add -- src/activities/touchSparkleHelpers.ts tests/touchSparkleHelpers.test.ts
git commit -m "feat(touch-sparkle): add motion helpers"
```

### Task 3: Build the faithful Stitch activity

**Files:**
- Modify: `src/activities/TouchSparkle.tsx`

- [ ] **Step 1: Replace the existing text-star implementation**

Implement these units in `TouchSparkle.tsx`:

```ts
const CHARACTER_SIZE = 128;
const CHARACTER_TICK_MS = 32;

function SparkleParticle({ sparkle }: { sparkle: SparkleModel }) {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1, { duration: sparkle.duration, easing: Easing.bezier(0, 0.9, 0.57, 1) });
  }, [progress, sparkle.duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [
      { translateX: Math.cos(sparkle.angle) * sparkle.distance * progress.value },
      { translateY: Math.sin(sparkle.angle) * sparkle.distance * progress.value },
      { scale: 1 - progress.value }
    ]
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.sparkle,
        {
          left: sparkle.x - sparkle.size / 2,
          top: sparkle.y - sparkle.size / 2,
          width: sparkle.size,
          height: sparkle.size,
          backgroundColor: sparkle.color,
          shadowColor: sparkle.color
        },
        animatedStyle
      ]}
    />
  );
}
```

In `TouchSparkle`, keep `canvasSize`, six `characters`, and `sparkles` in state. Measure with `onLayout`. Initialize the six character models at dispersed positions with independent velocities. Start a `setInterval` at `CHARACTER_TICK_MS` that maps every character through `moveCharacter`; clear it on cleanup. Render every PNG instance using:

```tsx
<Animated.Image
  pointerEvents="none"
  resizeMode="contain"
  source={require("../assets/images/kindpng_6787158.png")}
  style={[
    styles.character,
    { transform: [{ translateX: character.x }, { translateY: character.y }] }
  ]}
/>
```

The full canvas structure is:

```tsx
<Pressable
  accessibilityLabel="Touch anywhere to create sparkles"
  onLayout={(event) => setCanvasSize(event.nativeEvent.layout)}
  onPress={addSparkles}
  style={styles.canvas}
>
  <Image pointerEvents="none" resizeMode="cover" source={require("../assets/images/touch-sparkle-background.png")} style={StyleSheet.absoluteFill} />
  {characters.map((character) => <Animated.Image key={character.id} ... />)}
  {sparkles.map((sparkle) => <SparkleParticle key={sparkle.id} sparkle={sparkle} />)}
</Pressable>
```

`addSparkles` must call `light()`, `void chime.play()`, append `createSparkles(locationX, locationY)`, and schedule particle cleanup after the maximum created duration plus 50ms. Touches do not reset or redirect character motion.

- [ ] **Step 2: Apply the Stitch scene styles**

Use `touch-sparkle-background.png` edge-to-edge with `resizeMode="cover"`. Style sparkles as square views with `shadowOpacity: 0.9`, `shadowRadius: 15`, and web-compatible elevation omitted. Render six 88px character instances at full opacity, matching the density and scale of the Stitch screen.

- [ ] **Step 3: Run static and unit verification**

Run:

```powershell
npm run typecheck
npm test
```

Expected: TypeScript exits 0 and every Vitest test passes.

- [ ] **Step 4: Commit the activity implementation**

```powershell
git add -- src/activities/TouchSparkle.tsx
git commit -m "feat(touch-sparkle): match Stitch scene"
```

### Task 4: Visual QA in the in-app browser

**Files:**
- Create: `design-qa.md`
- Modify if required: `src/activities/TouchSparkle.tsx`

- [ ] **Step 1: Start the Expo web app**

Run:

```powershell
npm run web
```

Expected: Expo reports a local web URL and serves the app without build errors.

- [ ] **Step 2: Capture the six-month activity**

Open the local URL in the in-app browser, select the six-month activity through the existing Play drawer if needed, and capture the initial state at a portrait viewport. Capture a second screenshot immediately after a touch so the particle response is visible.

- [ ] **Step 3: Compare with Stitch and record QA**

Create `design-qa.md` with source/implementation viewport, asset match, composition, colors, six-character motion, particle origin/count/palette, sound/haptic notes, console errors, severity-ranked findings, and one final line exactly `final result: passed` or `final result: blocked`.

Fix every P0/P1/P2 mismatch, reload the app, and repeat the same-state comparison until the report says `final result: passed`. Do not hand off a blocked result.

- [ ] **Step 4: Run final verification**

Run:

```powershell
npm test
npm run typecheck
```

Expected: both commands exit 0 after visual fixes.

- [ ] **Step 5: Commit QA and any final correction**

```powershell
git add -- design-qa.md src/activities/TouchSparkle.tsx
git commit -m "test(touch-sparkle): verify Stitch match"
```

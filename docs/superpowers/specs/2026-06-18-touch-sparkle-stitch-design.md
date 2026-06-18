# Touch & Sparkle Stitch Design

## Scope

Update only `src/activities/TouchSparkle.tsx` and its focused helpers/tests to reproduce the selected **A — Faithful Stitch adaptation** of Google Stitch's “Interactive Play: Moving Hello Kitty Sparkle.” Bundle `kindpng_6787158.png` under `src/assets/images/` for local, offline use.

This change does not alter activity routing, age gating, journal content, global navigation, or any other activity. Existing unrelated Bubble Pop work remains untouched.

## Visual Design

The activity canvas uses the actual Stitch reference composition: a soft full-screen rainbow shader and six independently moving Hello Kitty instances. The canvas remains portrait-first, fills the existing activity slot, clips overflow, and requires no text comprehension from the child. The Stitch screen has no side meter.

Each character preserves the PNG aspect ratio, drifts continuously with its own gentle velocity, and reverses direction at canvas edges. Partial edge clipping is allowed during reversal because it is present in the Stitch reference. Motion must remain slow enough for a six-month-old to track and must not block touch-anywhere interaction.

## Touch Interaction

Every press uses the local touch coordinates and immediately:

1. triggers light haptic feedback;
2. plays the existing chime through `useSound("chime")`;
3. creates twelve square sparkle particles at the press position; and
4. leaves the character motion uninterrupted so repeated touches layer sparkles over the moving scene.

The React Native implementation translates Stitch's `createSparkle(x, y)` behavior rather than injecting its DOM code. Each burst uses the Stitch palette `#FF69B4`, `#00FFFF`, `#FFFF00`, `#FFFFFF`, and `#FFD700`. Particles use randomized 10–30px sizes, radial direction, 50–150px travel distance, glow matching their color, and an 800–1200ms fade-and-scale animation. Completed particles are removed from state.

## Components and Data Flow

- `TouchSparkle` owns measured canvas dimensions, six character motion models, particle state, cleanup timers, sound, and haptics.
- `SparkleParticle` receives immutable particle geometry and animates translation, scale, and opacity with Reanimated.
- `MovingCharacter` renders one instance of the bundled PNG and applies bounded position updates independently of touch bursts.
- Pure helper functions generate particle descriptors and calculate bounded character movement. Random generation is separated from rendering so it can be tested deterministically.

A touch event flows from the full-canvas `Pressable` into particle generation and immediate feedback. Rendering consumes particle descriptors; timers remove them after their individual durations. Character animation runs independently so repeated touches do not reset its motion.

## Asset Handling

Copy the exact Stitch-referenced file as `src/assets/images/kindpng_6787158.png`. Import it with a static React Native `require` so Expo packages it for native and web builds. No runtime network request or remote image URL is allowed.

If the Stitch asset cannot be exported intact, implementation stops and reports that blocker instead of substituting a different Hello Kitty image.

## Reliability and Accessibility

- Clamp particle origins and character positions to measured canvas bounds.
- Ignore movement updates until the canvas has non-zero dimensions.
- Clear particle timers and animation callbacks on unmount.
- Keep the full canvas pressable and preserve the existing minimum activity height.
- Do not add flashing white transitions, score text, failure states, or remote dependencies.
- Preserve immediate sound and haptic feedback; visual animation starts in the same press handler.

## Testing and Verification

Add deterministic unit coverage for:

- twelve particles per burst;
- allowed color selection;
- 10–30px size range;
- 50–150px travel range;
- 800–1200ms duration range; and
- bounded character movement with edge reversal.

Run `npm test` and `npm run typecheck`. Then run the Expo web target, open the six-month Touch & Sparkle activity in the in-app browser, and compare the same viewport and interaction state with the Stitch reference. Verify character motion, touch-origin bursts, meter response, asset loading, and absence of console errors.

# Phase 2 Prompt — Core Activities: 6-9 Months

Build the first set of production activities on top of the Phase 1 app foundation.

## Goal

Replace placeholders for the 6-9 month activities with touch-first interactive experiences that match `docs/luminakid-master-prompt.md`.

## Scope

- Implement `TouchSparkle` for 6 months.
- Implement `BubblePop` for 7 months.
- Implement `AnimalDiscovery` for 8 months.
- Implement `Peekaboo` for 9 months without parent photo or voice recording.
- Add shared animation/effect helpers only when they reduce real duplication.
- Update the activity registry to use the real activity components.

## Activity Requirements

### Touch & Sparkle

- Full-screen pressable canvas.
- On touch, spawn 5 star particles at the touch position.
- Particles expand outward and fade out in about 800ms.
- Background shifts to a gentle pastel on touch.
- Minimum touch surface must remain baby-safe and easy to hit.

### Bubble Pop

- Spawn bubbles at random positions with 80-140px diameter.
- Keep at most 5 bubbles visible.
- Add a new bubble every 2 seconds when below the limit.
- Tap animation: scale up, fade out, then replace after a short delay.

### Animal Discovery

- Show 4 animal cards in a 2x2 grid.
- Cards should be at least 120x120px, preferably larger.
- Randomly choose 4 animals from cow, dog, cat, pig, duck, frog, sheep, horse.
- Tap shows a speech bubble for 2 seconds.

### Peekaboo

- Full-screen curtain reveal interaction.
- Tap curtain to reveal a random animal emoji.
- Curtain closes again after 2 seconds.
- Keep parent photo and voice recording out of this phase.

## Out of Scope

- Real sound playback assets.
- Haptic polish.
- Parent voice recording.
- Parent photo integration.
- Activities for 10+ months.

## Development Requirements

- Use React Native Reanimated where animation smoothness matters.
- Preserve the no-score, no-failure product philosophy.
- Keep touch targets at least 88x88px.
- Add tests for deterministic helpers such as animal selection or bubble bounds.

## Acceptance Criteria

- The 6-9 month activities no longer use placeholders.
- Each implemented activity gives immediate visual feedback on touch.
- Locked future months continue to work.
- `npm test` and `npm run typecheck` pass.

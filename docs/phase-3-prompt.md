# Phase 3 Prompt — Core Activities: 10-12 Months

Build the remaining Phase 1 core activities for 10-12 months.

## Goal

Replace placeholders for `FollowTheLight`, `ColorGarden`, and `FirstWords` with interactive activities aligned to the master prompt.

## Scope

- Implement `FollowTheLight` for 10 months.
- Implement `ColorGarden` for 11 months.
- Implement `FirstWords` for 12 months.
- Update the activity registry to use the real components.
- Add or refine shared helpers for simple celebration visuals.

## Activity Requirements

### Follow the Light

- Show a glowing amber firefly target.
- Move it to a random position every 1.5-2.5 seconds.
- Animate movement smoothly.
- On tap, show a celebration flash and increment an internal catch counter.
- After 5 catches, show a gentle 1-3 star celebration with no score language.

### Color Garden

- Show 5 flower buds arranged across the activity surface.
- Each bud starts as a seedling.
- Tap blooms the bud into a colored flower.
- Background shifts to a matching pastel.
- When all 5 bloom, play a short celebration animation.

### First Words

- Show 5 picture cards: ball, cat, milk, mama, dada.
- Cards must be at least 100x100px.
- Tap highlights the card and reveals the word text.
- Text fades after about 1 second.
- Audio playback can remain stubbed until Phase 4.

## Out of Scope

- Sound asset generation.
- Parent voice recording.
- Matching, shape play, and mini puzzles.
- Cloud sync or accounts.

## Development Requirements

- Use the existing design tokens and component patterns.
- Keep parent-facing text outside the activity surface where possible.
- Add tests for pure helpers such as random target bounds or bloom completion.

## Acceptance Criteria

- The 10-12 month activities no longer use placeholders.
- Each activity responds immediately to baby touch.
- Journal and month navigation still select the correct activity.
- `npm test` and `npm run typecheck` pass.

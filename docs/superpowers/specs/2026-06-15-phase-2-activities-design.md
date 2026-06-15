# Phase 2 Activities Design

## Scope

Implement the Phase 2 prompt in `docs/phase-2-prompt.md`: replace placeholders for the 6-9 month activities with production touch-first experiences.

This phase includes:

- Touch & Sparkle for 6 months.
- Bubble Pop for 7 months.
- Animal Discovery for 8 months.
- Peekaboo for 9 months.
- Deterministic helper tests for random selection and bounds logic.
- README updates for development testing and build workflow.

This phase excludes real audio playback assets, haptics polish, parent voice recording, parent photo integration, cloud sync, accounts, and activities for 10+ months.

## Architecture

Each activity will live in its own `src/activities/*.tsx` file and render as a self-contained canvas inside the existing Play tab activity slot. Shared deterministic logic will live in `src/activities/activityHelpers.ts`, keeping randomness and layout bounds testable without mounting React Native components.

The activity registry will import the four real components for months 6-9 and keep existing placeholders for future locked months. The existing `ActivityProps` contract remains unchanged.

## Activity Behavior

Touch & Sparkle renders a large pressable canvas. Each touch creates five star particles at the touch position, shifts the background to a gentle pastel, and lets particles drift outward and fade.

Bubble Pop fills the canvas with up to five large bubbles. Bubbles are generated within measured canvas bounds, tap feedback marks a bubble as popping, and replacement bubbles appear after a short delay.

Animal Discovery selects four unique animals from the approved animal set and displays them in a 2x2 grid with large touch cards. Tapping a card shows a speech bubble for two seconds.

Peekaboo renders a full-canvas curtain. Tapping opens the curtain, reveals a random animal emoji, and closes it again after two seconds.

## Testing

Vitest coverage will focus on deterministic helpers:

- Animal selection returns unique animals from the approved pool.
- Bubble generation respects 80-140px diameter and stays within canvas bounds.
- Bubble generation preserves safe behavior for small canvas bounds.
- Peekaboo random animal selection uses the approved animal pool.

Full verification before commit will run `npm test` and `npm run typecheck`.

## README Update

The README will document:

- Installing dependencies.
- Running unit tests and type checks.
- Running Expo for local app development testing.
- Running platform targets for Android, iOS, and web.
- Creating production builds with EAS after project credentials are configured.

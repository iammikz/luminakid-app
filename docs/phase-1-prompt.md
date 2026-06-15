# Phase 1 Prompt — App Foundation

Build the first runnable LuminaKid foundation from `docs/luminakid-master-prompt.md`.

## Goal

Create a local-first Expo React Native app shell that can onboard a baby profile, calculate the baby's age, select the appropriate activity month, and display Play and Journal tabs using static Phase 1 data.

## Scope

- Scaffold the Expo + TypeScript project in the repository root.
- Configure Expo Router with a root layout, setup screen, and Play/Journal tabs.
- Add the core TypeScript models for baby profiles, activities, and journal entries.
- Add a tested age engine for month calculation, activity unlock checks, active activity selection, and supported month lookup.
- Add Zustand + AsyncStorage persistence for the baby profile and selected month.
- Add static journal data for the milestone groups from the master prompt.
- Add activity registry entries for 6-24 months with placeholder activity components.
- Add reusable UI components for month navigation, skill tags, lock overlay, and journal cards.
- Keep all Phase 1 behavior offline-first and local-only.

## Out of Scope

- Production-quality animations for each individual activity.
- Sound asset generation and final audio playback polish.
- Parent voice recording.
- Cloud accounts, backend sync, push notifications, and paid features.
- App store build configuration beyond basic Expo config.

## UX Requirements

- Use portrait-first layouts.
- Preserve minimum 88x88px touch targets.
- Avoid scores, failure states, objectives, and competitive language.
- Make activities self-evident and parent-facing text available in the Journal tab.
- If the baby is under 6 months, show a coming-soon state instead of unlocking activities.

## Development Requirements

- Use TypeScript throughout.
- Use Expo Router for navigation.
- Use Zustand with AsyncStorage persistence.
- Test core age and activity selection behavior before implementation changes.
- Keep components small and aligned with the project structure in the master prompt.

## Acceptance Criteria

- The repository contains a runnable Expo app scaffold.
- `npm test` runs the core engine tests.
- The setup screen validates date of birth and stores a local profile.
- The Play tab chooses the current age month unless a parent-selected month is set.
- Locked future activities show a lock state.
- The Journal tab renders the selected activity's development focus, milestones, and parent activity idea.

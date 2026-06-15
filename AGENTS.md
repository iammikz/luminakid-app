# Repository Guidelines

## Project Structure & Module Organization

This repository is currently in planning/scaffold state. The product specification lives in `docs/luminakid-master-prompt.md`; treat it as the source of truth for scope, architecture, and UX constraints. `README.md` contains the short project summary.

When implementation begins, follow the planned Expo structure:

- `app/` for Expo Router screens, including onboarding and `(tabs)` routes.
- `src/activities/` for one activity component per milestone.
- `src/engine/` for age calculation, activity registry, and journal data.
- `src/components/`, `src/hooks/`, `src/store/`, and `src/types/` for shared UI, behavior, persistence, and TypeScript models.
- `src/assets/sounds/` and `src/assets/images/` for bundled offline-first media.

## Build, Test, and Development Commands

No `package.json` is present yet. After scaffolding the Expo app, expected commands should be:

- `npm install` to install project dependencies.
- `npx expo start` to run the local Expo development server.
- `npm test` to run the test suite once configured.
- `npm run lint` and `npm run typecheck` for code quality gates, if added.

Keep this section updated when scripts are introduced.

## Coding Style & Naming Conventions

Use TypeScript for application code. Prefer functional React Native components and hooks. Use `PascalCase` for components and activity files, such as `TouchSparkle.tsx`; use `camelCase` for functions, hooks, and store actions, such as `getBabyAgeMonths` and `useBabyStore`.

Keep touch-first UI rules from the master prompt intact: minimum 88x88px touch targets, portrait-first layouts, immediate visual/audio feedback, and no score or failure language.

## Testing Guidelines

Testing framework is not configured yet. When added, prioritize tests for age gating, date calculations, activity selection, storage behavior, and journal data integrity. Use focused test names that describe behavior, for example `ageEngine.test.ts` and `activityRegistry.test.ts`.

Run the full test suite before opening a pull request. Add regression tests for any fixed bug.

## Commit & Pull Request Guidelines

Git history currently only contains `Initial commit`, so no detailed convention is established. Use short imperative commit messages, for example `Add age engine` or `Create onboarding screen`.

Pull requests should include a concise summary, test results, linked issue if available, and screenshots or screen recordings for UI changes. For activity work, describe the milestone age, interaction behavior, sound/haptic feedback, and any assets added.

## Agent-Specific Instructions

Before implementation, read `docs/luminakid-master-prompt.md`. Keep Phase 1 local-only and offline-first unless the user explicitly expands scope.

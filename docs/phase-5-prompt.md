# Phase 5 Prompt — QA, Hardening, and MVP Readiness

Prepare the local-only MVP for reliable testing and future release work.

## Goal

Harden Phase 1 functionality, improve test coverage, clean rough edges, and make the app ready for broader manual testing.

## Scope

- Review all Phase 1 screens and activities against the master prompt constraints.
- Improve onboarding validation and under-6-month coming-soon behavior.
- Add tests for store behavior, registry completeness, journal data coverage, and DOB edge cases.
- Add lightweight accessibility labels for parent-facing controls.
- Check touch target sizing across setup, tabs, month navigation, and activities.
- Remove dead code and development-only placeholders that are no longer needed.
- Document known limitations and next-phase backlog.

## QA Requirements

- Test babies aged under 6 months, exactly 6 months, 12 months, 15 months, 18 months, 24 months, and over 24 months.
- Verify locked future activities cannot be selected.
- Verify parent-selected unlocked months sync between Play and Journal.
- Verify local persistence survives app restart.
- Verify every activity has immediate visual feedback.

## Hardening Requirements

- Avoid crashes when persisted data is malformed.
- Keep empty or missing optional assets non-fatal.
- Keep UI readable on small mobile screens.
- Maintain portrait-first layouts and 88x88px minimum touch targets.

## Out of Scope

- Backend, accounts, cloud sync, and push notifications.
- Store submission through EAS.
- Phase 2 roadmap features from the master prompt such as matching, shape play, and mini puzzles as production activities if not already implemented.

## Development Requirements

- Add regression tests before fixing discovered bugs.
- Run `npm test` and `npm run typecheck` after each meaningful batch.
- Keep fixes scoped; do not introduce new product scope during hardening.

## Acceptance Criteria

- All implemented Phase 1 activity flows are manually testable.
- Core age, registry, journal, and persistence behavior has automated coverage.
- The app has no known TypeScript errors.
- MVP limitations are documented for the next development cycle.

# MVP Readiness Notes

## Manual QA Focus

- Test setup with babies under 6 months, exactly 6 months, 12 months, 15 months, 18 months, 24 months, and over 24 months.
- Confirm future month buttons remain locked and cannot be selected.
- Confirm selecting an unlocked month in Play changes the Journal month.
- Confirm setup and Peekaboo voice settings persist after app restart.
- Confirm every implemented Phase 1 activity gives immediate visual feedback.

## Known MVP Limitations

- Matching Game, Shape Play, and Mini Puzzles remain scoped as future placeholders.
- Bundled audio files are documented but not included; missing media is treated as optional during development.
- Peekaboo voice recording is local-only and stays on the device.
- No accounts, cloud sync, push notifications, store build, or EAS release work are included.
- Browser audio and microphone behavior can vary by browser permission policy.

## Next Backlog

- Replace sound placeholder documentation with final bundled MP3 assets.
- Add native-device QA for microphone permission denial, recording release timing, and saved playback.
- Add visual regression checks for small mobile screens.
- Implement Phase 2 activities only after MVP hardening is accepted.

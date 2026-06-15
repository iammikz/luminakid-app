# Phase 4 Prompt — Sound, Haptics, and Peekaboo Voice

Add sensory feedback polish and the parent voice recording feature.

## Goal

Make every activity feel responsive through audio, haptics, and polished local media handling while keeping the app offline-first.

## Scope

- Add `expo-av` sound playback through `src/hooks/useSound.ts`.
- Add sound preloading for bundled activity sounds.
- Add `expo-haptics` feedback for every baby interaction.
- Add missing sound asset directories and placeholder asset documentation.
- Implement Peekaboo parent voice recording.
- Add a simple settings entry point for recording, previewing, saving, and re-recording a voice clip.
- Persist the saved voice URI locally.

## Sound Requirements

- Support keys: `chime`, `pop`, `success`, animal sounds, and first-word recordings.
- Avoid lazy-loading on tap where possible.
- Use graceful no-op behavior if an asset is missing during development.
- Keep tap-to-feedback latency low.

## Haptic Requirements

- Trigger light feedback for normal taps.
- Trigger a slightly stronger success feedback for completion moments.
- Never block visual response while waiting for haptics.

## Voice Recording Requirements

- Request microphone permission only when the parent starts recording.
- Press and hold to record, maximum 5 seconds.
- On release, stop and save to local document storage.
- Provide playback preview, save, and re-record actions.
- Use the saved clip when Peekaboo reveals content.

## Out of Scope

- Cloud storage for recordings.
- Parent photo integration.
- Push notifications.
- Store build and release work.

## Development Requirements

- Add tests for pure sound-map and recording-state helpers where possible.
- Handle permission denial with calm parent-facing text.
- Keep all audio and recording behavior local-only.

## Acceptance Criteria

- Touch interactions trigger visual feedback plus sound/haptic calls.
- Peekaboo can use a locally saved parent voice clip.
- Missing optional media does not crash the app.
- `npm test` and `npm run typecheck` pass.

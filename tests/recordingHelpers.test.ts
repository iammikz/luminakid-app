import { describe, expect, it } from "vitest";

import {
  canStartVoiceRecording,
  getPeekabooVoicePath,
  getRecordingStatusText
} from "../src/media/recordingHelpers";

describe("recording helpers", () => {
  it("builds the local Peekaboo voice path from the Expo document directory", () => {
    expect(getPeekabooVoicePath("file:///app/documents/")).toBe("file:///app/documents/peekaboo-voice.m4a");
    expect(getPeekabooVoicePath(null)).toBeNull();
  });

  it("allows recording only when permission is granted and no recording is active", () => {
    expect(canStartVoiceRecording({ permissionGranted: true, isRecording: false })).toBe(true);
    expect(canStartVoiceRecording({ permissionGranted: false, isRecording: false })).toBe(false);
    expect(canStartVoiceRecording({ permissionGranted: true, isRecording: true })).toBe(false);
  });

  it("returns calm parent-facing status text", () => {
    expect(getRecordingStatusText("idle")).toBe("Hold to record a short Peekaboo greeting.");
    expect(getRecordingStatusText("recording")).toBe("Recording... release when you are done.");
    expect(getRecordingStatusText("denied")).toBe("Microphone access is off. You can enable it in device settings.");
    expect(getRecordingStatusText("saved")).toBe("Voice clip saved for Peekaboo.");
  });
});

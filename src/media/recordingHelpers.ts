export type RecordingStatus = "idle" | "recording" | "denied" | "saved";

interface RecordingStartState {
  permissionGranted: boolean;
  isRecording: boolean;
}

export function getPeekabooVoicePath(documentDirectory: string | null | undefined): string | null {
  if (!documentDirectory) {
    return null;
  }

  return `${documentDirectory}peekaboo-voice.m4a`;
}

export function canStartVoiceRecording(state: RecordingStartState): boolean {
  return state.permissionGranted && !state.isRecording;
}

export function getRecordingStatusText(status: RecordingStatus): string {
  switch (status) {
    case "recording":
      return "Recording... release when you are done.";
    case "denied":
      return "Microphone access is off. You can enable it in device settings.";
    case "saved":
      return "Voice clip saved for Peekaboo.";
    case "idle":
    default:
      return "Hold to record a short Peekaboo greeting.";
  }
}

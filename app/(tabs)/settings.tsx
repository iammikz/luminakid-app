import { useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system/legacy";

import { AppScreen } from "../../src/components/AppScreen";
import { ElevatedSurface } from "../../src/components/ElevatedSurface";
import { TactileButton } from "../../src/components/TactileButton";
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from "../../src/constants/theme";
import { playUri } from "../../src/hooks/useSound";
import {
  canStartVoiceRecording,
  getPeekabooVoicePath,
  getRecordingStatusText,
  type RecordingStatus
} from "../../src/media/recordingHelpers";
import { useBabyStore } from "../../src/store/useBabyStore";

export default function SettingsScreen() {
  const savedVoiceUri = useBabyStore((state) => state.peekabooVoiceUri);
  const setPeekabooVoiceUri = useBabyStore((state) => state.setPeekabooVoiceUri);
  const [pendingVoiceUri, setPendingVoiceUri] = useState<string | null>(savedVoiceUri);
  const [status, setStatus] = useState<RecordingStatus>(savedVoiceUri ? "saved" : "idle");
  const recordingRef = useRef<Audio.Recording | null>(null);
  const maxTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearMaxTimer = useCallback(() => {
    if (maxTimer.current) {
      clearTimeout(maxTimer.current);
      maxTimer.current = null;
    }
  }, []);

  const stopRecording = useCallback(async () => {
    const recording = recordingRef.current;
    if (!recording) {
      return;
    }

    clearMaxTimer();
    recordingRef.current = null;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const destination = getPeekabooVoicePath(FileSystem.documentDirectory);
      if (!uri || !destination) {
        setStatus("idle");
        return;
      }

      await FileSystem.copyAsync({ from: uri, to: destination });
      setPendingVoiceUri(destination);
      setStatus("saved");
    } catch {
      setStatus("idle");
    }
  }, [clearMaxTimer]);

  const startRecording = useCallback(async () => {
    if (!canStartVoiceRecording({ permissionGranted: true, isRecording: Boolean(recordingRef.current) })) {
      return;
    }

    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        setStatus("denied");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setStatus("recording");
      maxTimer.current = setTimeout(() => {
        void stopRecording();
      }, 5000);
    } catch {
      setStatus("idle");
    }
  }, [stopRecording]);

  const saveClip = useCallback(() => {
    setPeekabooVoiceUri(pendingVoiceUri);
    setStatus(pendingVoiceUri ? "saved" : "idle");
  }, [pendingVoiceUri, setPeekabooVoiceUri]);

  const reRecord = useCallback(() => {
    setPendingVoiceUri(null);
    setPeekabooVoiceUri(null);
    setStatus("idle");
  }, [setPeekabooVoiceUri]);

  return (
    <AppScreen centered={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ElevatedSurface tone="lavender" style={styles.header}>
          <Text style={styles.eyebrow}>Settings</Text>
          <Text style={styles.title}>Peekaboo voice</Text>
          <Text style={styles.copy}>Record a short greeting that plays when Peekaboo reveals a surprise.</Text>
        </ElevatedSurface>

        <ElevatedSurface style={styles.panel}>
          <Pressable
            accessibilityLabel="Hold to record Peekaboo voice"
            accessibilityRole="button"
            onPressIn={startRecording}
            onPressOut={() => void stopRecording()}
            style={({ pressed }) => [styles.recordButton, status === "recording" && styles.recording, pressed && styles.pressed]}
          >
            <Text style={styles.recordIcon}>{status === "recording" ? "●" : "🎙️"}</Text>
            <Text style={styles.recordText}>{status === "recording" ? "Recording" : "Hold to record"}</Text>
          </Pressable>

          <Text style={styles.status}>{getRecordingStatusText(status)}</Text>

          <View style={styles.actions}>
            <TactileButton
              accessibilityLabel="Preview Peekaboo voice"
              onPress={() => void playUri(pendingVoiceUri)}
              variant="secondary"
              style={styles.action}
            >
              Preview
            </TactileButton>
            <TactileButton accessibilityLabel="Save Peekaboo voice" onPress={saveClip} style={styles.action}>
              Save
            </TactileButton>
          </View>

          <TactileButton
            accessibilityLabel="Record a new Peekaboo voice"
            onPress={reRecord}
            variant="secondary"
            style={styles.fullAction}
          >
            Re-record
          </TactileButton>
        </ElevatedSurface>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0
  },
  content: {
    gap: SPACING.lg,
    paddingHorizontal: SPACING.mobileMargin,
    paddingVertical: SPACING.lg
  },
  header: {
    gap: SPACING.sm
  },
  eyebrow: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary
  },
  title: {
    ...TYPOGRAPHY.display,
    color: COLORS.primaryDark
  },
  copy: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary
  },
  panel: {
    alignItems: "center",
    gap: SPACING.lg
  },
  recordButton: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    borderRadius: 90,
    backgroundColor: COLORS.primary,
    ...SHADOWS.pressLip
  },
  recording: {
    backgroundColor: COLORS.coral
  },
  pressed: {
    transform: [{ translateY: 4 }, { scale: 0.98 }]
  },
  recordIcon: {
    color: COLORS.surface,
    fontSize: 48,
    letterSpacing: 0
  },
  recordText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.surface,
    textAlign: "center"
  },
  status: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center"
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    gap: SPACING.md
  },
  action: {
    flex: 1,
    minHeight: 64,
    paddingHorizontal: SPACING.md
  },
  fullAction: {
    width: "100%",
    minHeight: 64,
    borderRadius: RADIUS.full
  }
});

import { useCallback, useEffect, useRef } from "react";
import { Audio } from "expo-av";

import { getOptionalSoundAsset, type SoundKey } from "../media/soundAssets";

export function useSound(key: SoundKey | null) {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let cancelled = false;
    const asset = key ? getOptionalSoundAsset(key) : null;

    async function loadSound() {
      if (!asset) {
        soundRef.current = null;
        return;
      }

      try {
        const { sound } = await Audio.Sound.createAsync(asset);
        if (cancelled) {
          await sound.unloadAsync();
          return;
        }
        soundRef.current = sound;
      } catch {
        soundRef.current = null;
      }
    }

    void loadSound();

    return () => {
      cancelled = true;
      const sound = soundRef.current;
      soundRef.current = null;
      void sound?.unloadAsync().catch(() => undefined);
    };
  }, [key]);

  const play = useCallback(async () => {
    try {
      await soundRef.current?.replayAsync();
    } catch {
      // Missing or unavailable development media should never block visual feedback.
    }
  }, []);

  return { play };
}

export async function playUri(uri: string | null | undefined) {
  if (!uri) {
    return;
  }

  try {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.replayAsync();
  } catch {
    // Local preview media can disappear on development resets; treat it as optional.
  }
}

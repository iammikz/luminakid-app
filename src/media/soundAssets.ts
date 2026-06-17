export const SOUND_KEYS = [
  "chime",
  "pop",
  "success",
  "cow",
  "dog",
  "cat",
  "pig",
  "duck",
  "frog",
  "sheep",
  "horse",
  "ball",
  "milk",
  "mama",
  "dada"
] as const;

export type SoundKey = (typeof SOUND_KEYS)[number];

const SOUND_ASSETS: Partial<Record<SoundKey, number>> = {};

export function isSupportedSoundKey(key: string): key is SoundKey {
  return SOUND_KEYS.includes(key as SoundKey);
}

export function getOptionalSoundAsset(key: string): number | null {
  if (!isSupportedSoundKey(key)) {
    return null;
  }

  return SOUND_ASSETS[key] ?? null;
}

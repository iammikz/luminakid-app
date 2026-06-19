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

const SOUND_ASSETS: Partial<Record<SoundKey, number>> = {
  chime: require("../assets/sounds/chime.mp3"),
  pop: require("../assets/sounds/pop.mp3"),
  success: require("../assets/sounds/success.mp3"),
  cow: require("../assets/sounds/animals/cow.mp3"),
  dog: require("../assets/sounds/animals/dog.mp3"),
  cat: require("../assets/sounds/animals/cat.mp3"),
  pig: require("../assets/sounds/animals/pig.mp3"),
  duck: require("../assets/sounds/animals/duck.mp3"),
  frog: require("../assets/sounds/animals/frog.mp3"),
  sheep: require("../assets/sounds/animals/sheep.mp3"),
  horse: require("../assets/sounds/animals/horse.mp3")
};

export function isSupportedSoundKey(key: string): key is SoundKey {
  return SOUND_KEYS.includes(key as SoundKey);
}

export function getOptionalSoundAsset(key: string): number | null {
  if (!isSupportedSoundKey(key)) {
    return null;
  }

  return SOUND_ASSETS[key] ?? null;
}

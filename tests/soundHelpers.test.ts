import { describe, expect, it } from "vitest";

import {
  getOptionalSoundAsset,
  isSupportedSoundKey,
  SOUND_KEYS
} from "../src/media/soundAssets";

describe("sound assets", () => {
  it("supports the Phase 4 activity sound keys", () => {
    expect(SOUND_KEYS).toEqual([
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
    ]);
  });

  it("detects supported sound keys", () => {
    expect(isSupportedSoundKey("chime")).toBe(true);
    expect(isSupportedSoundKey("mama")).toBe(true);
    expect(isSupportedSoundKey("missing")).toBe(false);
  });

  it("returns mapped assets for the sound files currently installed", () => {
    const installedKeys = [
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
      "horse"
    ] as const;

    installedKeys.forEach((key) => expect(getOptionalSoundAsset(key)).not.toBeNull());
  });

  it("returns null for word recordings that have not been installed", () => {
    expect(getOptionalSoundAsset("ball")).toBeNull();
    expect(getOptionalSoundAsset("milk")).toBeNull();
    expect(getOptionalSoundAsset("mama")).toBeNull();
    expect(getOptionalSoundAsset("dada")).toBeNull();
    expect(getOptionalSoundAsset("missing")).toBeNull();
  });
});

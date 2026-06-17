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

  it("returns null instead of throwing when optional development media is missing", () => {
    expect(getOptionalSoundAsset("chime")).toBeNull();
    expect(getOptionalSoundAsset("missing")).toBeNull();
  });
});

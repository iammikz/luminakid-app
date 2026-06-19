import { describe, expect, it } from "vitest";

import { sanitizePersistedBabyState, updatePersistedBabyProfile } from "../src/store/storePersistence";

describe("store persistence helpers", () => {
  it("keeps valid persisted state", () => {
    expect(
      sanitizePersistedBabyState({
        baby: {
          id: "baby-1",
          name: "Luna",
          dateOfBirth: "2025-12-16",
          createdAt: "2026-06-16T00:00:00.000Z"
        },
        selectedMonth: 7,
        peekabooVoiceUri: "file:///voice.m4a"
      })
    ).toEqual({
      baby: {
        id: "baby-1",
        name: "Luna",
        dateOfBirth: "2025-12-16",
        createdAt: "2026-06-16T00:00:00.000Z"
      },
      selectedMonth: 7,
      peekabooVoiceUri: "file:///voice.m4a"
    });
  });

  it("drops malformed persisted values without crashing", () => {
    expect(
      sanitizePersistedBabyState({
        baby: { id: 1, name: null, dateOfBirth: "bad" },
        selectedMonth: 99,
        peekabooVoiceUri: 42
      })
    ).toEqual({
      baby: null,
      selectedMonth: null,
      peekabooVoiceUri: null
    });
  });

  it("updates profile fields while preserving identity and voice data", () => {
    const state = sanitizePersistedBabyState({
      baby: {
        id: "baby-1",
        name: "Luna",
        dateOfBirth: "2025-12-16",
        createdAt: "2026-06-16T00:00:00.000Z"
      },
      selectedMonth: 7,
      peekabooVoiceUri: "file:///voice.m4a"
    });

    expect(updatePersistedBabyProfile(state, "Sophia", "2025-12-04")).toEqual({
      baby: {
        id: "baby-1",
        name: "Sophia",
        dateOfBirth: "2025-12-04",
        createdAt: "2026-06-16T00:00:00.000Z"
      },
      selectedMonth: null,
      peekabooVoiceUri: "file:///voice.m4a"
    });
  });
});

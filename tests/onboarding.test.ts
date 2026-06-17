import { describe, expect, it } from "vitest";

import {
  createBabyProfile,
  getMonthsUntilFirstActivity,
  validateDateOfBirth
} from "../src/engine/onboarding";

const now = new Date("2026-06-16T12:00:00Z");

describe("onboarding helpers", () => {
  it("creates a profile with a fallback baby name", () => {
    const profile = createBabyProfile("   ", "2025-12-16", now);

    expect(profile.name).toBe("Your baby");
    expect(profile.dateOfBirth).toBe("2025-12-16");
    expect(profile.createdAt).toBe(now.toISOString());
  });

  it("validates date of birth edge cases", () => {
    expect(validateDateOfBirth("", now)).toBe("Enter a valid date as YYYY-MM-DD.");
    expect(validateDateOfBirth("not-a-date", now)).toBe("Enter a valid date as YYYY-MM-DD.");
    expect(validateDateOfBirth("2026-06-17", now)).toBe("Date of birth must be in the past.");
    expect(validateDateOfBirth("2024-05-15", now)).toBe("LuminaKid currently supports babies up to 24 months.");
    expect(validateDateOfBirth("2026-01-16", now)).toBeNull();
    expect(validateDateOfBirth("2024-06-16", now)).toBeNull();
  });

  it("calculates the under-six-month coming soon countdown", () => {
    expect(getMonthsUntilFirstActivity("2026-01-16", now)).toBe(1);
    expect(getMonthsUntilFirstActivity("2025-12-16", now)).toBe(0);
  });
});

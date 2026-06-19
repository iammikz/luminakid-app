import { differenceInMonths, isAfter, isValid, parseISO } from "date-fns";

import type { BabyProfile } from "../types/baby";

export const DEFAULT_BABY_NAME = "Sophia";
export const DEFAULT_DATE_OF_BIRTH = "2025-12-04";

export function createBabyProfile(name: string, dateOfBirth: string, now = new Date()): BabyProfile {
  return {
    id: `${now.getTime()}`,
    name: name.trim() || DEFAULT_BABY_NAME,
    dateOfBirth,
    createdAt: now.toISOString()
  };
}

export function updateBabyProfile(profile: BabyProfile, name: string, dateOfBirth: string): BabyProfile {
  return {
    ...profile,
    name: name.trim() || DEFAULT_BABY_NAME,
    dateOfBirth
  };
}

export function validateDateOfBirth(value: string, now = new Date()): string | null {
  const parsed = parseISO(value);
  if (!value || !isValid(parsed)) {
    return "Enter a valid date as YYYY-MM-DD.";
  }
  if (isAfter(parsed, now)) {
    return "Date of birth must be in the past.";
  }
  if (differenceInMonths(now, parsed) > 24) {
    return "LuminaKid currently supports babies up to 24 months.";
  }
  return null;
}

export function getMonthsUntilFirstActivity(dateOfBirth: string, now = new Date()): number {
  const ageMonths = Math.max(0, differenceInMonths(now, parseISO(dateOfBirth)));
  return Math.max(0, 6 - ageMonths);
}

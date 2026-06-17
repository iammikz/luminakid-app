import { isValid, parseISO } from "date-fns";

import { ACTIVITY_CATALOG } from "../engine/activityCatalog";
import type { BabyProfile } from "../types/baby";

export interface PersistedBabyState {
  baby: BabyProfile | null;
  selectedMonth: number | null;
  peekabooVoiceUri: string | null;
}

const SELECTABLE_MONTHS = new Set(ACTIVITY_CATALOG.map((activity) => activity.minMonths));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function sanitizeBabyProfile(value: unknown): BabyProfile | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, name, dateOfBirth, createdAt } = value;
  if (
    typeof id !== "string" ||
    typeof name !== "string" ||
    typeof dateOfBirth !== "string" ||
    typeof createdAt !== "string" ||
    !isValid(parseISO(dateOfBirth)) ||
    !isValid(parseISO(createdAt))
  ) {
    return null;
  }

  return { id, name, dateOfBirth, createdAt };
}

function sanitizeSelectedMonth(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && SELECTABLE_MONTHS.has(value) ? value : null;
}

function sanitizeVoiceUri(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function sanitizePersistedBabyState(value: unknown): PersistedBabyState {
  if (!isRecord(value)) {
    return { baby: null, selectedMonth: null, peekabooVoiceUri: null };
  }

  return {
    baby: sanitizeBabyProfile(value.baby),
    selectedMonth: sanitizeSelectedMonth(value.selectedMonth),
    peekabooVoiceUri: sanitizeVoiceUri(value.peekabooVoiceUri)
  };
}

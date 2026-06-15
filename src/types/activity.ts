import type { ComponentType } from "react";

export interface ActivityProps {
  babyAgeMonths: number;
}

export interface JournalEntry {
  monthLabel: string;
  developmentFocus: string;
  parentTip: string;
  milestones: string[];
  parentActivity: string;
}

export interface Activity {
  id: string;
  title: string;
  emoji: string;
  goal: string;
  minMonths: number;
  maxMonths: number;
  skills: string[];
  component: ComponentType<ActivityProps>;
  journal: JournalEntry;
}

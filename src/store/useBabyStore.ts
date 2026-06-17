import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { sanitizePersistedBabyState } from "./storePersistence";
import type { BabyProfile } from "../types/baby";

interface BabyStore {
  baby: BabyProfile | null;
  selectedMonth: number | null;
  peekabooVoiceUri: string | null;
  setBaby: (baby: BabyProfile) => void;
  setSelectedMonth: (month: number | null) => void;
  setPeekabooVoiceUri: (uri: string | null) => void;
  clearBaby: () => void;
}

export const useBabyStore = create<BabyStore>()(
  persist(
    (set) => ({
      baby: null,
      selectedMonth: null,
      peekabooVoiceUri: null,
      setBaby: (baby) => set({ baby }),
      setSelectedMonth: (month) => set({ selectedMonth: month }),
      setPeekabooVoiceUri: (uri) => set({ peekabooVoiceUri: uri }),
      clearBaby: () => set({ baby: null, selectedMonth: null, peekabooVoiceUri: null })
    }),
    {
      name: "luminakid-storage",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...sanitizePersistedBabyState(persistedState)
      })
    }
  )
);

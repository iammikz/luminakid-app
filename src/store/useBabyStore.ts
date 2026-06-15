import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { BabyProfile } from "../types/baby";

interface BabyStore {
  baby: BabyProfile | null;
  selectedMonth: number | null;
  setBaby: (baby: BabyProfile) => void;
  setSelectedMonth: (month: number | null) => void;
  clearBaby: () => void;
}

export const useBabyStore = create<BabyStore>()(
  persist(
    (set) => ({
      baby: null,
      selectedMonth: null,
      setBaby: (baby) => set({ baby }),
      setSelectedMonth: (month) => set({ selectedMonth: month }),
      clearBaby: () => set({ baby: null, selectedMonth: null })
    }),
    {
      name: "luminakid-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

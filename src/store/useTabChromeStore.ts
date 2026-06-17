import { create } from "zustand";

interface TabChromeStore {
  playTabsExpanded: boolean;
  revealPlayTabs: () => void;
  collapsePlayTabs: () => void;
  setPlayTabsExpanded: (expanded: boolean) => void;
}

export const useTabChromeStore = create<TabChromeStore>((set) => ({
  playTabsExpanded: false,
  revealPlayTabs: () => set({ playTabsExpanded: true }),
  collapsePlayTabs: () => set({ playTabsExpanded: false }),
  setPlayTabsExpanded: (expanded) => set({ playTabsExpanded: expanded })
}));

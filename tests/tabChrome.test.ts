import { describe, expect, it } from "vitest";

import { getNextPlayTabsExpanded, shouldShowTabBar } from "../src/engine/tabChrome";

describe("tab chrome visibility", () => {
  it("hides every route until navigation is revealed", () => {
    expect(shouldShowTabBar("index", false)).toBe(false);
    expect(shouldShowTabBar("journal", false)).toBe(false);
    expect(shouldShowTabBar("settings", false)).toBe(false);
    expect(shouldShowTabBar("index", true)).toBe(true);
    expect(shouldShowTabBar("journal", true)).toBe(true);
    expect(shouldShowTabBar("settings", true)).toBe(true);
  });

  it("expands and collapses Play tabs from vertical drag gestures", () => {
    expect(getNextPlayTabsExpanded(false, -48)).toBe(true);
    expect(getNextPlayTabsExpanded(true, 48)).toBe(false);
    expect(getNextPlayTabsExpanded(false, -12)).toBe(false);
    expect(getNextPlayTabsExpanded(true, 12)).toBe(true);
  });
});

const PLAY_TAB_DRAG_THRESHOLD = 36;

export function shouldShowTabBar(_routeName: string | undefined, tabsExpanded: boolean): boolean {
  return tabsExpanded;
}

export function getNextPlayTabsExpanded(currentExpanded: boolean, translationY: number): boolean {
  if (translationY <= -PLAY_TAB_DRAG_THRESHOLD) {
    return true;
  }

  if (translationY >= PLAY_TAB_DRAG_THRESHOLD) {
    return false;
  }

  return currentExpanded;
}

const PLAY_TAB_DRAG_THRESHOLD = 36;

export function shouldShowTabBar(routeName: string | undefined, playTabsExpanded: boolean): boolean {
  if (routeName === "index") {
    return playTabsExpanded;
  }

  return true;
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

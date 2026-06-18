# Touch Sparkle Hit and Tab Chrome Design

## Scope

Fix Touch & Sparkle coordinate handling, add topmost-character fading and round reset behavior, center the bottom tab group at wide viewport widths, and make the same tab group collapsible on Play, Journal, and Settings.

The visual assets, sparkle palette and animation, character count, activity routing, journal content, and settings content remain unchanged.

## Touch Coordinates and Hit Selection

All background and character images become non-interactive descendants of the activity canvas. The canvas is therefore the responder for every touch, so `locationX` and `locationY` always use canvas coordinates and sparkles remain at the touched point.

The press handler hit-tests those canvas coordinates against character bounds. It scans characters in reverse render order and selects at most one match, making the last-rendered overlapping character the topmost selection. Background touches create sparkles without fading a character.

Every touch still triggers the existing chime and light haptic feedback.

## Character Fade and Reset

Each character model carries a `faded` state. Touching the topmost visible character marks only that character as faded. Its rendered opacity animates from the current visible value to zero while its movement state remains valid.

When the final visible character is selected, the app allows the last fade animation to finish, then creates six fresh positions within the measured canvas bounds. All characters become visible again at those new positions and keep their existing independent velocities. The reset has no score, success message, or stopping state.

Repeated touches on an already faded character do not select it. Cleanup timers are cleared on unmount, and a pending reset cannot run after the component is removed.

## Tab Chrome

The bottom navigation uses one route-independent collapsible shell. Play, Journal, and Settings all render the drag handle and use the same shared expanded state. Dragging upward expands the group; dragging downward collapses it. The collapsed handle remains available on every tab.

The tab bar itself sits inside a full-width overlay and a centered width-constrained frame. The frame uses 92% width with a 920px maximum; the BottomTabBar fills that frame without horizontal margins. This makes narrow layouts retain their current inset while wide layouts remain centered.

The Play route may still initialize the shared tab state as collapsed, but route changes do not force Journal or Settings permanently open.

## Test Boundaries

Pure helpers will cover:

- reverse-order topmost visible hit selection;
- ignoring faded characters during hit selection;
- six random reset positions within canvas bounds;
- preservation of canvas-relative sparkle coordinates;
- drag threshold behavior for every route; and
- route-independent tab visibility.

Verification will run focused tests first, then `npm test`, `npm run typecheck`, and in-app-browser checks at narrow and wide viewports across Play, Journal, and Settings.

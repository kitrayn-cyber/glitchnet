# Gura’s Lab · first playable version

Entry: `lab.html`, reached from both the existing map building and directory. All URLs are relative for GitHub Pages under `/glitchnet/`. No build step, network dependencies, backend, or new framework.

## Files and preservation

Only `map.html`, `assets/map/map.js`, and map browser test expectations change among existing files. Existing artwork, home, room, avatar, Cat Archive, vendor assets, and player data contracts remain unchanged. New files live under `assets/lab/`, plus `lab.html`, this guide, and `tests/lab.test.mjs`.

The lab writes only `glitchnet-lab-journal-v1` in localStorage: a JSON array of discovered potion IDs. It never clears storage or reads/writes coins, furniture, room positions, avatar, or profile keys. Storage errors fall back to a session journal. Repeated-failure counts are session-only. Reset empties only the flask.

## Play

Click/tap bottles or drag them onto the station. Keyboard: Tab and Enter/Space work on all controls; 1–7 add reagents, R resets; Enter begins a reaction when focus is outside a button/link. Choose two or three unique reagents. Result order is independent. All 21 pairs and 35 triples have consistent outcomes, including failures. Five exact recipes yield discoveries; adding a third ingredient changes a two-ingredient recipe. Use How to Play for a starting clue.

Gura uses neutral, annoyed, curious, surprised, impressed, and alarmed expressions. Each has a body/expression cue, textual mood label, and spoken observation in a polite live region. Idle animation includes breathing, blinking, head movement and weight shifts. Reduced motion freezes canvas idle and CSS effects. Hidden tabs stop the animation loop.

All laboratory artwork is original Canvas pixel art. Reagents and flask are CSS drawings. Canvas artwork is descriptive; all gameplay remains available through native labeled controls outside it. Dialogs support Escape and native focus management.

## Expand

`assets/lab/chemistry.mjs`: add reagents, recipes, dialogue and precursor clues. Keep recipe IDs stable for saved journals. `outcome()` provides exact recipes and deterministic failure rules. Recipe display and journal are generated from the same data. `scene.js` owns the independent pixel scene and Gura poses; `game.js` connects controls, state and storage.

## Verification

Run `node --test tests/lab.test.mjs tests/room-state.test.mjs tests/avatar-animation.test.mjs` (15 checks). Lab tests cover all 56 combinations and every ordering, exact recipes, invalid inputs, hints, storage failures, existing saves, and map routes. Updated `tests/map-browser.html` reflects the fourth open destination; it retains checks for remaining coming-soon locations.

Local browser QA: successful potion and preview hint; automatic journal entry and persistence through reload; pressure warning; failure result and repeat dialogue; keyboard reagent shortcuts. Touch-sized controls and responsive reflow are provided. Manual physical-touch and OS-level reduced-motion verification remain recommended before release.

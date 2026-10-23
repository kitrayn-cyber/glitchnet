# GlitchNet pixel room

This room belongs to GlitchNet. The original standalone prototype is preserved separately; this integration contains no other project's code or integrations.

## Integration

- `room.html` retains GlitchNet's beveled windows, decor shop, GlitchCoin counter, navigation, illustrated background, SVG fallback and HTML furniture controls.
- `home.html` embeds `room.html?embed=1` at the top of its default profile section. A same-origin frame isolates styles and uses the exact same room/shop code. Navigation leaves the frame. The portal, quizzes, games, cat archive, world map, login UI and Avatar Studio remain in place.
- `assets/room/controller.js` owns purchases, modes, fallback controls and persistence; `engine.js` owns Phaser input/rendering. `geometry.js` contains collision footprints and coordinate conversion. `art.js` contains the prototype artwork. `avatar.js` reuses the Avatar Studio drawing logic with a transparent background and small walking feet.
- Phaser 3.90.0 is vendored, with its MIT license in `assets/vendor/PHASER-LICENSE.md`. There is no build step or runtime CDN requirement for the room. Existing login dependencies are unchanged.

## Saved data

The existing `glitchnet-room-v1`, `glitchnet-room-positions-v1`, `glitchnet-avatar-v1`, and `glitchnet-pfp-v1` keys stay in use on the existing GlitchNet origin. Coins and purchased string IDs remain compatible. Percent coordinates remain percent coordinates on disk. Rendering uses an adapter; old positions that overlap solid furniture resolve to a safe spot visually without rewriting the save on load.

Before the first purchase or position edit, `glitchnet-room-backup-v1` stores the original raw room and positions JSON once. Avatar configuration and PFP data are never rewritten here. Reset positions changes only positions. Storage errors are reported and in-memory exploration remains usable. Saves remain browser-local, not synced to login accounts. A new host/origin cannot automatically read saves from the old host.

The old purchase loader checked `.id` on string IDs, discarding owned decorations on reload. This is fixed. Already overwritten historical purchases cannot be reconstructed from the remaining balance alone.

## Controls and fallback

- Focus the canvas: WASD / arrows move; E inspects nearby furniture.
- Click floor: walk toward it with collisions. Furniture can be clicked or activated using the ordinary buttons below the room.
- Direction buttons support touch hold/release/cancel and keyboard activation.
- Decorate: select an owned item, then click to place it. Keyboard users can select items with the buttons, while placement currently uses a pointer.
- Movement stops on blur, tab visibility changes, hidden Home section, or view switch.
- Use illustrated room toggles the original design. `room.html?renderer=classic` forces the original renderer; combine with `&embed=1` for an embedded fallback. Phaser initialization failure leaves the illustrated/SVG design, shop, saved avatar, placement and step controls available.

## Local verification

Serve the repository root with a static HTTP server, for example:

```sh
python3 -m http.server 8081 --bind 127.0.0.1
node --test tests/room-state.test.mjs
```

Open `http://127.0.0.1:8081/tests/browser.html` and click Run browser checks. It runs only on localhost, temporarily seeds legacy saves, and restores this origin's room/avatar data after unloading the test frame. Tests cover movement, collision, E and pointer furniture actions, focus isolation, purchases, placements/reload, mobile width and controls, reset safety, classic fallback, backup, shared Home and existing navigation. No OAuth sign-in is performed by these tests.

Review on the branch before merging. No production publication is required to test these changes.

# Enlarged playable room

This is a framing and layout change only. `art.js`, all image assets, avatar artwork/animation, furniture geometry, movement, collision rules, shop prices, inventory and persistence code are unchanged.

The original Phaser canvas was already full-width, but the dollhouse itself occupied only 358 of its 480 logical pixels. The camera now frames a 384 × 216 world-space view centered on the complete dollhouse and cast shadow. Uniform 1.25× camera zoom keeps the 16:9 aspect ratio and enlarges furniture and avatar together. Only surrounding background margins are trimmed; crown, floor edge and the entire dollhouse remain visible. PixelArt, roundPixels and CSS pixelated rendering remain enabled.

Home's iframe padding and nested room border are reduced. The painted dollhouse fills 90–95% of the actual enclosing Home panel at tested widths of 960, 380 and 320px. Controls and furniture buttons stay below the game in normal document flow, and the existing same-origin height reporting keeps the iframe fitted to its contents.

The framing helper allows extra space for decorations saved near floor edges, including rug fringe and lamp glow. It never moves or rewrites their saved coordinates; unusually wide edge placements may therefore use a slightly wider frame to keep the item intact. Canvas clicks are converted through the Phaser camera back to original world coordinates, while game object hit-testing continues to use Phaser's camera-aware input system.

## Validation

- 15 Node tests pass, including framing coverage/aspect ratio, edge decoration fit and unchanged geometry inputs.
- 50 browser assertions plus completion pass: movement, collisions, keyboard and pointer furniture actions, purchases, placement/reload, customization, mobile holds/cancellation, fallback, Home navigation, and six sizing/layout checks at each desktop/mobile width.
- Native clicks on the enlarged wardrobe and door in Home open Avatar Studio and World Map correctly.
- Visually checked the complete enlarged dollhouse with controls below it. Artwork and save-related source files compare byte-for-byte unchanged.

Prepared for review, not merged or deployed. Parallel untouched.

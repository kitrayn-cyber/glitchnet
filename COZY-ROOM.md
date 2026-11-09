# Cozy Phaser room art pass

Original GlitchNet artwork drawn on the existing 480 × 270 logical pixel grid. No Stardew Valley assets, generated raster assets, or external textures are used.

## Visual direction

Cream sprig wallpaper and beveled wooden trim frame honey-colored floorboards with staggered joints, grain, knots and nail marks. Lilac textiles and dusty pink pillows balance the warm wood. A crescent moon, indigo sky and slowly twinkling stars contrast with gold fairy lights and bedside lamplight. Reduced-motion users receive a static star field.

The bed has recessed wood panels, layered sheets, piping, embroidered quilt folds, a rabbit plush and slippers. The CRT has a cream shell, screen bevel, vents, keyboard and mouse; its desk holds a flip phone, CDs, mug, sticky note and plant. Books, Polaroids, framed art, a sleeping cat figurine, trailing pothos, a woven cat basket, a toy mouse and a magazine add signs of daily life. The open wardrobe remains distinct from the one large exit door.

## Implementation and compatibility

`assets/room/art.js` contains modular painters for the room shell, window, wall details, door, bed, desk, floor decor, wardrobe and purchased decorations. `engine.js` mounts the same art and retains the existing purchased-item IDs, origins, depth and hitboxes. The geometry, furniture interaction zones, movement, avatar renderer, economy and persistence code are unchanged. No save migration or reset is needed. The illustrated-room fallback and its image assets are unchanged.

Only the window interaction copy is updated to describe the nighttime art. Room, Home and module URLs are versioned to load the new art without stale browser caches.

## Verification

- 13 Node tests passed for animation, movement/collisions, room data, inventory, balances, exit geometry and URL routing.
- All 32 browser integration assertions plus completion passed: movement, collisions, furniture interactions, decoration purchases/placement/reload, saved customization, mobile controls, fallback switching and Home integration.
- Visually checked the active Phaser canvas embedded in Home, using the local preview. Final native wardrobe/door click checks verify top-level Avatar Studio and World Map navigation.

This art pass is prepared for review. It is not merged or deployed. Parallel was not modified.

# GlitchNet single-exit dollhouse fix

The front-left stairs are the only physical room exit, shared by illustrated and Phaser renderers through assets/room/entrance.js. They route to map.html, including top-level navigation from the Home iframe. The old right-wall exit zone and illustrated wardrobe hotspot are removed. Avatar Studio remains available from its toolbar and the Phaser wardrobe.

The original room-art.jpg is retained as source. The room now uses assets/room/room-art-single-exit.png: a lossless derivative with only 16,901 right-wall pixels changed. Every decoded source pixel outside the wall mask, including the front stairs, furniture and suitcase, is identical. No save keys, balance, inventory, customization or position schemas changed.

Validation: all 13 Node tests pass. The full localhost browser regression passed all 32 assertions (plus completion), covering movement, collisions, furniture, shop, saved decorations, mobile controls, customization and Home navigation. One initial synthetic touch-hold timing check failed; the complete repeat passed. Manual checks verified repaired-wall rejection, illustrated stair link, Phaser stair click and keyboard E, renderer switching and top-level Home-to-map exit. Phaser now initializes in a visible host and refreshes its bounds after renderer switching to keep pointer hitboxes aligned.

Image editing: built-in imagegen, precise-object-edit mode, original JPEG reference. Final prompt: Remove only the extreme-right door behind/right of the pink suitcase. Replace its leaf, panels, frame, handle and hinges with continuous pale-pink vertically striped wallpaper and matching baseboard. Preserve shelf/trailing plant, suitcase and extended handle, front-left open entrance, steps and slippers, furniture, character, layout and text. Keep the existing pixel-art style; add no door, cabinet or objects. Generated wall pixels were constrained to the original wall polygon, restoring original plant and suitcase pixels.

No merge or deployment performed. Parallel was not modified.

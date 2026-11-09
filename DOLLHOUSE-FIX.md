# GlitchNet dollhouse door and wardrobe fix

The basic Phaser room retains its large paneled right-wall door as the sole World Map exit. Its neighboring wardrobe is now an open lilac cabinet with a rail, two hanging garments, two drawers and short feet. drawWardrobe lives in art.js and is called by engine.js. The original wardrobe interaction and 17 × 43 collision footprint remain. The door zone is at x350/y76, with a reachable approach at x371/y164. The illustrated renderer continues to use its front-left stairs; its artwork was not changed during the wardrobe correction. Both renderer exits navigate the top-level page out of the Home iframe.

The original room-art.jpg is retained as source. The room now uses assets/room/room-art-single-exit.png: a lossless derivative with only 16,901 right-wall pixels changed. Every decoded source pixel outside the wall mask, including the front stairs, furniture and suitcase, is identical. No save keys, balance, inventory, customization or position schemas changed.

Validation: all 13 Node tests pass. The full localhost browser regression passed all 32 assertions (plus completion), covering movement, collisions, furniture, shop, saved decorations, mobile controls, customization and Home navigation. One initial synthetic touch-hold timing check failed; the complete repeat passed. Manual checks verified repaired-wall rejection, illustrated stair link, Phaser stair click and keyboard E, renderer switching and top-level Home-to-map exit. Phaser now initializes in a visible host and refreshes its bounds after renderer switching to keep pointer hitboxes aligned.

Image editing: built-in imagegen, precise-object-edit mode, original JPEG reference. Final prompt: Remove only the extreme-right door behind/right of the pink suitcase. Replace its leaf, panels, frame, handle and hinges with continuous pale-pink vertically striped wallpaper and matching baseboard. Preserve shelf/trailing plant, suitcase and extended handle, front-left open entrance, steps and slippers, furniture, character, layout and text. Keep the existing pixel-art style; add no door, cabinet or objects. Generated wall pixels were constrained to the original wall polygon, restoring original plant and suitcase pixels.

No merge or deployment performed. Parallel was not modified.


Phaser wardrobe correction: verified visually in home.html's active embedded Phaser canvas. Native clicks on the clothes cabinet opened Avatar Studio, while the large door opened the World Map. All 13 Node tests passed. No raster assets were edited for this correction.

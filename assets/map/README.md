# GlitchNet illustrated world map

Original early-2000s fantasy-village artwork replaces the hills-and-emoji map. Seven native HTML landmarks follow the final illustration's geometry. Labels and descriptions remain real text; nothing navigational is baked into the image.

## Compatibility

Open routes remain avatar.html (Avatar Mall / Avatar Studio), cats.html (Cat Archive / Cat Café / Cat Gallery), room.html (My Home), and home.html (homepage navigation). Glitch Academy, Gura's Lab, The Arcade and Pet Park are buttons that show an in-page Coming Soon notice instead of placeholder links. No account, room, avatar, currency or inventory code or data is modified. Discoveries exist only in memory for the current map visit.

## Interaction and accessibility

Landmarks have distinct non-overlapping areas, native keyboard controls, descriptive labels, focus outlines and hover/focus tooltips. Escape dismisses previews, including focused tooltips. A full directory provides generous mobile text controls. CSS disables all environmental animations and transitions for reduced motion. Lightweight CSS animates stars, flowers and windows; no new runtime libraries are loaded.

Two optional discoveries are the actual frog at the lily pond and the wishing star in the pink tree. Their hit targets are positioned separately from destination signposts, including at 320px.

## Validation

34 browser assertions plus completion pass in tests/map-browser.html: routes, labels, landmark count, native keyboard/focus behavior, future-place notices, tooltip dismissal, discoveries, 44px targets, separate hotspots, correct signpost hit recipients, no horizontal overflow at 390px and 320px, complete directory, reduced-motion CSS and absence of storage access. The test is restricted to localhost and changes no player data. Native browser clicks verified the mall, cat museum, cottage and homepage links open their actual existing pages. Desktop and narrow iframe layouts were visually inspected.

## Art provenance

Built-in imagegen; generate mode; use case illustration-story. The selected original illustration is shipped as assets/map/glitchnet-village.webp (1536 × 1152; approximately 780 KiB), encoded from the generated PNG. All landmark and terrain artwork is newly generated for GlitchNet, with no Neopets assets or characters used. HTML/CSS supply labels, signposts, tooltips, interface and interactions.

### Final generation prompt

Use case: illustration-story. Asset type: production background for GlitchNet's interactive fantasy world map, landscape 4:3 composition. Create an ORIGINAL richly illustrated miniature fantasy village, charming hand-inked early-2000s virtual pet browser game illustration with bold warm-purple outlines, soft cartoon cel shading, textured painted surfaces and playful magical Y2K details. Not an interface screenshot. Entire image is the village, no border, NO TEXT, NO letters, NO logos, NO emojis, no copied characters or buildings from any existing game. Bird's-eye three-quarter view showing fronts of buildings and their garden grounds, clear readable silhouettes. Lush rolling lime-green hills, lavender distant mountains, pink and turquoise tree canopies, tiny flowers, cobblestone plaza, winding cream dirt paths connecting ALL seven separated landmarks, a turquoise river winding down right side with wooden bridges, a small lily pond at lower left, stones and hedges. EXACTLY SEVEN recognizable destination landmarks arranged with clear separation and generous open path space, none cropped: (1) Upper left at center 23% x, 22% y: whimsical lavender magical academy castle on a hill, tall lilac/pink conical roofs, crescent flags, arched windows, broad front steps. Its silhouette fits x9-37%,y5-33%. (2) Upper right center75%x,22%y: eccentric scientist laboratory with rounded cream tower, green luminous glass dome, exposed copper coils, pipes, glowing green flask experiments and antenna; fitsx63-89%,y7-33%. (3) Middle center49%x,44%y: colorful Avatar Mall shopping arcade, two attached cream/lilac boutique storefronts with pink-and-turquoise striped awnings, mirror and mannequin-shaped displays; fitsx37-61%,y33-52%. (4) Middle left center18%x,51%y: lively purple retro arcade/amusement pavilion, chunky star-shaped marquee with NO writing, turquoise trim, decorative game machines and tiny pennants; fitsx6-30%,y38-61%. (5) Middle right center81%x,56%y: tiny cream cat museum, sculpted roof with cat ears, round cat-face window, little feline stone statues flanking door, small cafe terrace; fitsx69-94%,y42-66%. (6) Lower left-center33%x,79%y: cozy cream cottage, dusty-rose shingle roof, blue door, warm windows, white picket garden with abundant flowers, chimney and inviting curving path; fitsx19-46%,y67-91%. (7) Lower right-center68%x,81%y: cheerful pet park AREA with curved pastel fence, flower-covered wooden pergola, pawprint-shaped sandbox, pet bowls, two original tiny cute animals, not another building; fitsx53-83%,y70-95%. Buildings should look embedded in the same landscape, not isolated stickers or icons. Leave little strips of clear grass immediately below each landmark for live HTML signpost labels (DO NOT draw signs or any text yourself). Very detailed polished illustration inviting exploration. Warm cream highlights, pink/lavender/turquoise/lime palette, sunny enchanted afternoon, cozy soft shadows. A tiny frog at the pond and a secret star tucked into trees for discovery. No humans, no watermarks.

Prepared as a review PR. Not merged or deployed. Parallel untouched.


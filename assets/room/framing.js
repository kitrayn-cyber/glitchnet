// Camera-only presentation. The 480 × 270 artwork, physics and save coordinates stay intact.
export const GAME_SIZE={width:480,height:270};
const VIEW={left:48,top:39,right:432,bottom:255};
export function roomFrame(decorationBounds=[]){
 let {left,top,right,bottom}=VIEW;
 // Old decorations can sit at floor edges. Fit their complete art without moving the save.
 for(const b of decorationBounds){
  left=Math.min(left,b.left-4);top=Math.min(top,b.top-4);
  right=Math.max(right,b.right+4);bottom=Math.max(bottom,b.bottom+4);
 }
 const zoom=Math.min(GAME_SIZE.width/(right-left),GAME_SIZE.height/(bottom-top));
 const width=GAME_SIZE.width/zoom,height=GAME_SIZE.height/zoom;
 return {zoom,width,height,left:(left+right-width)/2,top:(top+bottom-height)/2};
}

// Existing item paint extents, including fringe, shadows and lamp glow.
const DECOR_BOUNDS={poster:[-10,-25,10,0],plant:[-9,-26,9,6],rug:[-29,-11,29,11],lamp:[-20,-43,20,5]};
export function decorationBounds(id,position){
 const [left,top,right,bottom]=DECOR_BOUNDS[id];
 return {left:position.x+left,top:position.y+top,right:position.x+right,bottom:position.y+bottom};
}

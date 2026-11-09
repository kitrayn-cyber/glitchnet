// One physical exit, shared by both renderers. Coordinates never enter saved data.
export const MAP_ROUTE='map.html';
export const ENTRANCE={
 id:'door',label:'Front-left stairs · World Map',
 x:168,y:219,w:40,h:27,
 approach:{x:188,y:224},interactionRadius:18,
 illustrated:{left:22,top:82,width:28,height:17}
};
export function worldMapUrl(base){return new URL(MAP_ROUTE,base).href;}
// Former right-hand doorway is wallpaper, not a walk target in the illustrated view.
export function isIllustratedRightWall(point){
 return point.x>=91.5&&point.x<=100&&point.y>=23&&point.y<=61;
}

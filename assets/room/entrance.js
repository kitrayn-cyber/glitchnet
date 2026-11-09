// One exit per renderer: the large Phaser door and the illustrated front stairs.
// Coordinates never enter saved data.
export const MAP_ROUTE='map.html';
export const ENTRANCE={
 id:'door',label:'Exit door · World Map',
 x:350,y:76,w:41,h:86,
 approach:{x:371,y:164},interactionRadius:32,
 illustrated:{left:22,top:82,width:28,height:17}
};
export function worldMapUrl(base){return new URL(MAP_ROUTE,base).href;}
// Former right-hand doorway is wallpaper, not a walk target in the illustrated view.
export function isIllustratedRightWall(point){
 return point.x>=91.5&&point.x<=100&&point.y>=23&&point.y<=61;
}

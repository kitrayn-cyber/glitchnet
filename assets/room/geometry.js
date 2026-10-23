import {clamp} from './state.js';
export const furniture = [
 {id:'bed',label:'Bed',x:91,y:137,w:70,h:85,solid:true,foot:{x:91,y:147,w:70,h:75}},
 {id:'computer',label:'Computer',x:264,y:119,w:93,h:50,solid:true,foot:{x:264,y:144,w:93,h:28}},
 {id:'shelf',label:'Favorite little things',x:192,y:86,w:65,h:33},
 {id:'window',label:'Window',x:113,y:60,w:69,h:65},
 {id:'wardrobe',label:'Wardrobe',x:395,y:89,w:17,h:43,solid:true,foot:{x:395,y:132,w:17,h:16}},
 {id:'door',label:'World Map',x:350,y:76,w:41,h:86},
 {id:'pet',label:'Pet corner',x:328,y:205,w:27,h:20}
];
const blocks=furniture.filter(f=>f.solid).map(f=>f.foot);
export function toWorld(p,decor=false) {
 return {x:70+(p.x-8)/84*340,y:decor?92+(p.y-42)/52*136:137+(p.y-47)/47*91};
}
export function toPercent(p,decor=false) {
 return {x:clamp(8+(p.x-70)/340*84,8,92),y:decor?clamp(42+(p.y-92)/136*52,42,94):clamp(47+(p.y-137)/91*47,47,94)};
}
export function canStand(x,y) {
 return x>=75 && x<=405 && y>=142 && y<=225 && !blocks.some(b=>x+5>b.x && x-5<b.x+b.w && y>b.y && y-5<b.y+b.h);
}
export function safeSpawn(p) {
 if(canStand(p.x,p.y))return {...p};
 // Old layouts can overlap newly solid furniture. Resolve visually without overwriting the save.
 let best={x:240,y:210}, distance=Infinity;
 for(let y=142;y<=225;y+=2)for(let x=75;x<=405;x+=2)if(canStand(x,y)){
  const d=(x-p.x)**2+(y-p.y)**2;if(d<distance){distance=d;best={x,y};}
 }
 return best;
}
export function move(p,dx,dy) {
 // Small substeps prevent click-to-walk and low frame rates from tunnelling through furniture.
 const count=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy))/2));
 const next={...p};
 for(let i=0;i<count;i++){
  if(canStand(next.x+dx/count,next.y))next.x+=dx/count;
  if(canStand(next.x,next.y+dy/count))next.y+=dy/count;
 }
 return next;
}

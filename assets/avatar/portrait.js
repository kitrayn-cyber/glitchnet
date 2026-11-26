import {tintArtwork} from './artwork.js';
import {composeBlink} from './blink.js?v=3';
const load=src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('Avatar artwork did not load'));image.src=new URL(src,import.meta.url).href;});
const [open,closed,hair]=await Promise.all([load('./art/portrait-open.png'),load('./art/portrait-blink.png'),load('./art/portrait-hair-mask.png')]);
const original=document.createElement('canvas');original.width=original.height=320;
const originalCtx=original.getContext('2d',{willReadFrequently:true});originalCtx.imageSmoothingEnabled=false;originalCtx.drawImage(open,0,0,320,320);
const originalPixels=originalCtx.getImageData(0,0,320,320).data;originalCtx.clearRect(0,0,320,320);originalCtx.drawImage(hair,0,0,320,320);const hairPixels=originalCtx.getImageData(0,0,320,320).data;
const blinkCache=new Map();
function blinkFrame(saved){
 const key=[saved?.hairColor,saved?.skin,saved?.eyes].join('|');if(blinkCache.has(key))return blinkCache.get(key);
 const base=tintArtwork(open,saved,'portrait'),eyes=tintArtwork(closed,saved,'portrait');
 const canvas=document.createElement('canvas');canvas.width=canvas.height=320;const ctx=canvas.getContext('2d',{willReadFrequently:true});
 const data=ctx.createImageData(320,320),baseData=base.getContext('2d').getImageData(0,0,320,320).data,eyesData=eyes.getContext('2d').getImageData(0,0,320,320).data;
 data.data.set(composeBlink(baseData,eyesData,originalPixels,hairPixels,320,320));ctx.putImageData(data,0,0);
 if(blinkCache.size>20)blinkCache.clear();blinkCache.set(key,canvas);return canvas;
}
export function drawPortrait(ctx,saved,pose={}){
 const canvas=ctx.canvas,source=pose.blink?blinkFrame(saved):tintArtwork(open,saved,'portrait');ctx.clearRect(0,0,canvas.width,canvas.height);ctx.imageSmoothingEnabled=false;
 // One-pixel breathing displacement keeps the head anchored and the movement understated.
 const breath=pose.breath?Math.max(1,Math.round(canvas.height/320)):0;ctx.drawImage(source,0,breath,canvas.width,canvas.height-breath);
}
export function createPortraitAnimator(canvases,getState){
 const media=matchMedia('(prefers-reduced-motion: reduce)');let id=0,last=0,next=0,until=0,running=false;
 function paint(pose={}){for(const canvas of canvases)drawPortrait(canvas.getContext('2d'),getState(),pose)}
 function tick(t){if(!running)return;if(!media.matches&&!document.hidden&&t-last>=100){last=t;if(!next)next=t+2600+Math.random()*4700;if(t>=next){until=t+160;next=t+2800+Math.random()*4500}paint({blink:t<until,breath:t%3600>2300})}id=requestAnimationFrame(tick)}
 function reset(){next=until=0;paint()};const change=()=>reset();media.addEventListener?.('change',change);document.addEventListener('visibilitychange',change);
 return {start(){if(running)return;running=true;reset();id=requestAnimationFrame(tick)},stop(){running=false;cancelAnimationFrame(id);media.removeEventListener?.('change',change);document.removeEventListener('visibilitychange',change)},render:reset};
}

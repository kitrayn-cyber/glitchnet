// Image-based color variants. The original v1 option indices remain the save contract.
import {normalizeAvatar} from '../room/avatar.js?v=3';
const hair=['#332a3a','#6b4038','#b16e42','#f4d284','#e8e1e9','#f39aca','#8cbcee'];
const skin=['#f6d3b7','#e7b48f','#c99266','#9c6347','#684235','#ffdbcb'];
const eyes=['#5385d4','#855a42','#4c9b76','#986bc7','#302939'];
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const cache=new Map();
function surface(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
// Build asset-specific masks from source colors, preserving transparency and original shading.
// Hair is pink/magenta; skin is warm peach; irises are the blue pixels in the eye area.
export function tintArtwork(image,state,kind){
 const s=normalizeAvatar(state),w=kind==='portrait'?320:600,h=kind==='portrait'?320:656;
 const key=[image.src,s.hairColor,s.skin,s.eyes,kind].join('|');if(cache.has(key))return cache.get(key);
 const c=surface(w,h),ctx=c.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=false;ctx.drawImage(image,0,0,w,h);
 const pixels=ctx.getImageData(0,0,w,h),d=pixels.data,hairTarget=rgb(hair[s.hairColor]),skinTarget=rgb(skin[s.skin]),eyeTarget=rgb(eyes[s.eyes]);
 function tint(i,target,base){for(let k=0;k<3;k++)d[i+k]=Math.min(255,d[i+k]*target[k]/base[k]);}
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const i=(y*w+x)*4;if(d[i+3]<30)continue;const r=d[i],g=d[i+1],b=d[i+2];
  // Mask the image colors, excluding near-neutral highlights and dark outlines.
  const magenta=r>85&&r>g*1.22&&b>g+1&&r>b*1.05;
  const peach=r>120&&r>g*1.10&&g>=b-1&&r>b*1.08;
  const blue=b>r*1.12&&b>g*1.06&&b>75&&r<175;
  if(magenta&&s.hairColor!==5)tint(i,hairTarget,[243,154,202]);
  else if(peach&&s.skin!==0)tint(i,skinTarget,[246,211,183]);
  else if(blue&&s.eyes!==0)tint(i,eyeTarget,[83,133,212]);
 }
 ctx.putImageData(pixels,0,0);if(cache.size>20)cache.clear();cache.set(key,c);return c;
}

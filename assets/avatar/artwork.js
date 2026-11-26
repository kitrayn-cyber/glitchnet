// Image-based color variants. The original v1 option indices remain the save contract.
import {normalizeAvatar} from '../room/avatar.js?v=3';
const hair=['#332a3a','#6b4038','#b16e42','#f4d284','#e8e1e9','#f39aca','#8cbcee'];
const skin=['#f6d3b7','#e7b48f','#c99266','#9c6347','#684235','#ffdbcb'];
const eyes=['#5385d4','#855a42','#4c9b76','#986bc7','#302939'];
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const cache=new Map(),maskCache=new Map();
function surface(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function pixels(image,w,h){const c=surface(w,h),ctx=c.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=false;ctx.drawImage(image,0,0,w,h);return ctx.getImageData(0,0,w,h).data;}
// A hair pixel must be present in the isolated hair reference AND match the
// original artwork color. The mask is computed from the open frame for both poses.
export function createHairMask(original,reference,w,h){
 const key=[original.src,reference?.src,w,h].join('|');if(maskCache.has(key))return maskCache.get(key);
 const result=new Uint8Array(w*h);if(!reference)return result;
 const source=pixels(original,w,h),guide=pixels(reference,w,h);
 for(let n=0;n<result.length;n++){const i=n*4,r=source[i],g=source[i+1],b=source[i+2];
  const pink=r>85&&r>g*1.22&&b>g+1&&r>b*1.05;
  const matches=guide[i+3]>=200;
  result[n]=pink&&matches?1:0;
 }
 maskCache.set(key,result);return result;
}
export function tintArtwork(image,state,kind,hairReference,original=image){
 const s=normalizeAvatar(state),w=kind==='portrait'?320:600,h=kind==='portrait'?320:656;
 const key=[image.src,original.src,hairReference?.src,s.hairColor,s.skin,s.eyes,kind].join('|');if(cache.has(key))return cache.get(key);
 const c=surface(w,h),ctx=c.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=false;ctx.drawImage(image,0,0,w,h);
 const imageData=ctx.getImageData(0,0,w,h),d=imageData.data,mask=createHairMask(original,hairReference,w,h),hairTarget=rgb(hair[s.hairColor]),skinTarget=rgb(skin[s.skin]),eyeTarget=rgb(eyes[s.eyes]);
 function tint(i,target,base){for(let k=0;k<3;k++)d[i+k]=Math.min(255,d[i+k]*target[k]/base[k]);}
 for(let n=0;n<mask.length;n++){const i=n*4;if(d[i+3]<30)continue;const r=d[i],g=d[i+1],b=d[i+2];
  const peach=r>120&&r>g*1.10&&g>=b-1&&r>b*1.08;
  const blue=b>r*1.12&&b>g*1.06&&b>75&&r<175;
  if(mask[n]){if(s.hairColor!==5)tint(i,hairTarget,[243,154,202]);}
  else if(peach&&s.skin!==0)tint(i,skinTarget,[246,211,183]);
  else if(blue&&s.eyes!==0)tint(i,eyeTarget,[83,133,212]);
 }
 ctx.putImageData(imageData,0,0);if(cache.size>20)cache.clear();cache.set(key,c);return c;
}

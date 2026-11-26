// Image-based color variants. The original v1 option indices remain the save contract.
import {normalizeAvatar} from '../room/avatar.js?v=3';
const hair=['#332a3a','#6b4038','#b16e42','#f4d284','#e8e1e9','#f39aca','#8cbcee'];
const skin=['#f6d3b7','#e7b48f','#c99266','#9c6347','#684235','#ffdbcb'];
const eyes=['#5385d4','#855a42','#4c9b76','#986bc7','#302939'];
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const cache=new Map(),maskCache=new Map();
function surface(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function pixels(image,w,h){const c=surface(w,h),ctx=c.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=false;ctx.drawImage(image,0,0,w,h);return ctx.getImageData(0,0,w,h).data;}
// Fixed pixel-aligned cutout for the isolated loop in the portrait silhouette.
// Threshold the path to whole pixels so the original art stays crisp.
let strandCutout;
function getStrandCutout(){
 if(strandCutout)return strandCutout;
 const c=surface(320,320),ctx=c.getContext('2d',{willReadFrequently:true});
 ctx.beginPath();ctx.moveTo(81,72);ctx.lineTo(84,72);ctx.lineTo(84,77);ctx.lineTo(76,84);
 ctx.lineTo(66,95);ctx.lineTo(61,101);ctx.lineTo(61,106);ctx.lineTo(68,112);
 ctx.lineTo(73,113);ctx.lineTo(73,117);ctx.lineTo(67,117);ctx.lineTo(61,113);
 ctx.lineTo(56,107);ctx.lineTo(56,99);ctx.lineTo(62,89);ctx.lineTo(70,81);
 ctx.closePath();ctx.fill();const d=ctx.getImageData(0,0,320,320).data;
 strandCutout=new Uint8Array(320*320);for(let n=0;n<strandCutout.length;n++)strandCutout[n]=d[n*4+3]>=128?1:0;
 return strandCutout;
}

// A hair pixel must be present in the isolated hair reference AND match the
// original artwork color. The mask is computed from the open frame for both poses.
export function createHairMask(original,reference,w,h,selections=null){
 if(selections){const values=pixels(selections,w,h),result=new Uint8Array(w*h);for(let n=0;n<result.length;n++)result[n]=values[n*4]>127 && !(w===320&&h===320&&getStrandCutout()[n])?1:0;return result;}
 const key=[original.src,reference?.src,w,h].join('|');if(maskCache.has(key))return maskCache.get(key);
 const result=new Uint8Array(w*h);if(!reference)return result;
 const source=pixels(original,w,h),guide=pixels(reference,w,h);
 for(let n=0;n<result.length;n++){const i=n*4,r=source[i],g=source[i+1],b=source[i+2];
  const isHairColor=r>45&&r>g*1.12&&b>=g&&r>b*1.02;
  // The guide is allowed to extend to translucent edge pixels. Require a
  // nearby opaque guide pixel with a comparable hue to exclude stray noise.
  let supported=guide[i+3]>=100;
  if(!supported && guide[i+3]>=12){const x=n%w,y=Math.floor(n/w);for(let dy=-2;dy<=2&&!supported;dy++)for(let dx=-2;dx<=2;dx++){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;const j=(yy*w+xx)*4;if(guide[j+3]>=200&&Math.abs(r-guide[j])<100&&Math.abs(g-guide[j+1])<100&&Math.abs(b-guide[j+2])<100){supported=true;break;}}}
  result[n]=isHairColor&&supported?1:0;
 }
 maskCache.set(key,result);return result;
}
export function tintArtwork(image,state,kind,hairReference,original=image,selections=null){
 const s=normalizeAvatar(state),w=kind==='portrait'?320:600,h=kind==='portrait'?320:656;
 const key=[image.src,original.src,hairReference?.src,s.hairColor,s.skin,s.eyes,kind,selections?.src].join('|');if(cache.has(key))return cache.get(key);
 const c=surface(w,h),ctx=c.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=false;ctx.drawImage(image,0,0,w,h);
 const imageData=ctx.getImageData(0,0,w,h),d=imageData.data,mask=createHairMask(original,hairReference,w,h,selections),selectionPixels=selections?pixels(selections,w,h):null,hairTarget=rgb(hair[s.hairColor]),skinTarget=rgb(skin[s.skin]),eyeTarget=rgb(eyes[s.eyes]);
 function tint(i,target,base){for(let k=0;k<3;k++)d[i+k]=Math.min(255,d[i+k]*target[k]/base[k]);}
 for(let n=0;n<mask.length;n++){const i=n*4;if(d[i+3]===0)continue;const r=d[i],g=d[i+1],b=d[i+2];
  const x=n%w,y=Math.floor(n/w);
  // Skin lives in the face, neck, chest and shoulder area of the portrait.
  // On the room sheet the color and guide still exclude clothing and hair.
  const inSkinRegion=kind!=='portrait'||(x>=25&&x<295&&y>=80&&y<315);
  const peach=selectionPixels ? selectionPixels[i+1]>127 : inSkinRegion&&r>75&&r>g*1.02&&r>b*1.02&&g>b*.79;
  const blue=selectionPixels ? selectionPixels[i+2]>127 : b>r*1.12&&b>g*1.06&&b>75&&r<175;
  if(mask[n]){if(s.hairColor===0){
   // Map luminance, not the original pink channels, onto the black palette.
   // This retains highlights and shadows without carrying pink into dark hair.
   const light=(r*.2126+g*.7152+b*.0722)/(243*.2126+154*.7152+202*.0722);
   for(let k=0;k<3;k++)d[i+k]=Math.min(255,Math.round(hairTarget[k]*light));
  }else if(s.hairColor!==5)tint(i,hairTarget,[243,154,202]);}
  else if(peach&&s.skin!==0)tint(i,skinTarget,[246,211,183]);
  else if(blue&&s.eyes!==0)tint(i,eyeTarget,[83,133,212]);
 }
 if(kind==='portrait'){const cutout=getStrandCutout();for(let n=0;n<cutout.length;n++)if(cutout[n])d[n*4+3]=0;}
 ctx.putImageData(imageData,0,0);
 if(cache.size>20)cache.clear();cache.set(key,c);return c;
}

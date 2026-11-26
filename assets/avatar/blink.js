// Pixel coordinates on the 320 × 320 portrait. Only the eye areas are replaced.
const EYES = [
  {left:132, top:108, right:185, bottom:132},
  {left:198, top:109, right:237, bottom:133}
];
export function isEyeRegion(x,y){return EYES.some(r=>x>=r.left&&x<r.right&&y>=r.top&&y<r.bottom);}
// Retain a pixel only when the isolated hair reference is opaque and its color
// closely matches the original artwork. This keeps actual overlapping strands
// without mistaking the open-eye eyeliner or iris for hair.
export function isHairPixel(original,hair,i){
 if(hair[i+3]<230)return false;
 return Math.abs(original[i]-hair[i])<35&&Math.abs(original[i+1]-hair[i+1])<35&&Math.abs(original[i+2]-hair[i+2])<35;
}
export function composeBlink(openPixels,closedPixels,originalPixels,hairPixels,width,height,tintMask=null){
 const result=new Uint8ClampedArray(openPixels);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  if(!isEyeRegion(x,y))continue;const i=(y*width+x)*4;
  if(tintMask?.[y*width+x]||isHairPixel(originalPixels,hairPixels,i))continue;
  result[i]=closedPixels[i];result[i+1]=closedPixels[i+1];result[i+2]=closedPixels[i+2];result[i+3]=closedPixels[i+3];
 }
 return result;
}

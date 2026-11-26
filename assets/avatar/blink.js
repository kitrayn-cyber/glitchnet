// Eye regions on the 320 × 320 portrait; everything else comes from the open frame.
const EYES = [
  {left:132, top:108, right:180, bottom:132},
  {left:198, top:109, right:233, bottom:133}
];
export function isEyeRegion(x,y){return EYES.some(r=>x>=r.left&&x<r.right&&y>=r.top&&y<r.bottom);}
function isHair(r,g,b){return r>85&&r>g*1.22&&b>g+1&&r>b*1.05;}
// Preserve the exact open-frame pixels outside the eyes, including any hair strands
// crossing their bounds. Tinting is performed before composition in both frames.
export function composeBlink(openPixels,closedPixels,originalPixels,width,height){
 const result=new Uint8ClampedArray(openPixels);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  if(!isEyeRegion(x,y))continue;const i=(y*width+x)*4;
  if(isHair(originalPixels[i],originalPixels[i+1],originalPixels[i+2]))continue;
  // A dark pixel touching a hair-colored pixel can be part of the hair outline.
  // Retain it too, so a blink cannot lighten a strand crossing the eye.
  if(originalPixels[i]<90&&originalPixels[i+1]<90&&originalPixels[i+2]<100){
   let touchesHair=false;for(let dy=-1;dy<=1&&!touchesHair;dy++)for(let dx=-1;dx<=1;dx++){
    const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=width||ny>=height)continue;
    const n=(ny*width+nx)*4;if(isHair(originalPixels[n],originalPixels[n+1],originalPixels[n+2])){touchesHair=true;break;}
   }if(touchesHair)continue;
  }
  result[i]=closedPixels[i];result[i+1]=closedPixels[i+1];result[i+2]=closedPixels[i+2];result[i+3]=closedPixels[i+3];
 }
 return result;
}

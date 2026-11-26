// Compose the room blink over the open frame and preserve selected hair pixels.
import {createHairMask} from './artwork.js?v=4';
export function composeRoomBlink(open,closedArtwork,original,reference,selections){
 const canvas=document.createElement('canvas');canvas.width=600;canvas.height=656;
 const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(open,0,0);
 const out=ctx.getImageData(0,0,600,656),closed=closedArtwork.getContext('2d').getImageData(0,0,600,656).data;
 const hair=createHairMask(original,reference,600,656,selections);
 for(let y=0;y<656;y++){
  if(Math.floor(y/164)===2||y%164<47||y%164>=56)continue;
  for(let x=0;x<600;x++){const n=y*600+x;if(hair[n])continue;const i=n*4;for(let k=0;k<4;k++)out.data[i+k]=closed[i+k];}
 }
 ctx.putImageData(out,0,0);return canvas;
}

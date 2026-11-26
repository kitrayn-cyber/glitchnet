import {DIRECTIONS,FRAMES_PER_DIRECTION} from './avatar.js?v=3';
// Animation advances from actual displacement, so blocked movement returns to idle.
export class AvatarAnimation{
 constructor(){this.direction='down';this.phase=0;this.blend=0;this.idle=0;this.nextBlink=2800+Math.random()*4400;this.blinkUntil=0;}
 update(dx,dy,delta,reduced=false){
  const dt=Math.min(Math.max(delta,0),50),distance=Math.hypot(dx,dy),walking=distance>.001;
  if(walking){
   // Preserve facing on tied diagonals instead of flickering between two views.
   if(Math.abs(dx)>Math.abs(dy)+.001)this.direction=dx<0?'left':'right';
   else if(Math.abs(dy)>Math.abs(dx)+.001)this.direction=dy<0?'up':'down';
   else if(!['left','right'].includes(this.direction))this.direction=dy<0?'up':'down';
   this.phase=(this.phase+distance/26)%1;if(this.idle>0)this.nextBlink=2800+Math.random()*4400;this.idle=0;this.blinkUntil=0;
  }else {this.idle+=dt;if(this.idle>=this.nextBlink){this.blinkUntil=this.idle+130;this.nextBlink=this.idle+2800+Math.random()*4400;}}
  this.blend=Math.max(0,Math.min(1,this.blend+(walking?dt/100:-dt/120)));
  let frame;
  if(reduced)frame=0;
  else if(this.blend>.05){
   // Ease the limbs back to a contact pose on stopping, without changing the head.
   const intensity=this.blend>.5?12:4;frame=intensity+Math.floor(this.phase*8)%8;
  }else{
   const breath=this.idle%2600>=1100&&this.idle%2600<2100?1:0;
   const blink=this.idle<this.blinkUntil?2:0;frame=(this.idle%11000>=10400?20:0)+breath+blink;
  }
  return {frame:DIRECTIONS.indexOf(this.direction)*FRAMES_PER_DIRECTION+frame,direction:this.direction,walking};
 }
}

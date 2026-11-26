// Layered 48px portrait. Option indices are shared with the room sprite and v1 saves.
import {normalizeAvatar,palettes} from '../room/avatar.js?v=3';
const backgrounds=['#b7c4ff','#b4eef2','#ffd2ed','#f6dc99','#e4d7f7','#8ca4d6'];
export function drawPortrait(ctx,saved,pose={}){
 const s=normalizeAvatar(saved), skin=palettes.skin[s.skin],hair=palettes.hairColor[s.hairColor],shirt=palettes.shirt[s.shirt],eye=palettes.eyes[s.eyes];
 const p=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
 ctx.save();ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,48,48);
 // Backdrop and back hair are independent layers.
 p(0,0,48,48,backgrounds[s.background]);p(0,34,48,14,'#27172d33');
 for(let i=0;i<12;i++){const x=(i*19+4)%48,y=(i*11+3)%32;p(x,y,1,1,'#ffffff99')}
 const hairShift=pose.hair?1:0;
 if(s.hairStyle===0){p(10,9,28,33,hair);p(7+hairShift,18,8,30,hair);p(33+hairShift,18,8,30,hair)}
 if(s.hairStyle===1){p(10,9,28,24,hair);p(8+hairShift,19,8,15,hair);p(32+hairShift,19,8,15,hair)}
 if(s.hairStyle===4){p(11,9,26,23,hair);p(5+hairShift,17,9,24,hair);p(34+hairShift,17,9,24,hair);p(5,18,9,2,'#ff9fce');p(34,18,9,2,'#ff9fce')}
 // Silhouette: narrow shoulders, longer neck and structured clothing.
 const breath=pose.breath?1:0;
 p(8,39-breath,32,9+breath,'#211622');p(10,37-breath,28,11+breath,shirt);p(15,34-breath,18,8,shirt);
 p(10,43,28,2,'#00000033');p(12,38-breath,4,8,'#ffffff33');p(32,38-breath,4,8,'#00000033');
 if(s.outfit===2){p(9,38-breath,9,10+breath,'#272536');p(30,38-breath,9,10+breath,'#272536');p(17,37-breath,3,8,'#d4b5cf');p(28,37-breath,3,8,'#d4b5cf');p(23,39,2,6,'#c4e776')}
 if(s.outfit===3){p(12,41-breath,24,7,shirt);p(18,38-breath,12,1,'#e5c9dd')}
 if(s.outfit===0){p(18,35-breath,12,3,'#c9a6c3');p(19,36-breath,10,1,'#f8e4ee')}
 if(s.outfit===1){p(19,36-breath,10,2,'#211622')}
 // Neck, face and shading.
 p(20,30,8,8,'#51333d');p(21,30,6,8,skin);p(21,33,6,2,'#00000033');
 p(15,13,18,20,'#3c2633');p(14,19,20,8,skin);p(16,14,16,18,skin);
 p(17,30,14,3,skin);p(18,32,12,2,'#00000033');p(16,25,2,4,'#00000022');p(30,25,2,4,'#00000022');p(18,15,2,7,'#ffffff22');
 // Foreground hair: each silhouette remains tied to the original choice.
 if(s.hairStyle!==5){
  p(13,10,22,6,hair);p(15,7,18,5,hair);
  p(12,14,4,s.hairStyle===2||s.hairStyle===3?8:15,hair);p(32,13,4,s.hairStyle===2||s.hairStyle===3?8:15,hair);
  p(16,14,8,4,hair);p(23,13,9,3,hair);p(17,17,4,2,hair);p(29,16,3,4,hair);
  p(17,10,2,5,'#ffffff55');p(20,9,1,5,'#ffffff33');p(27,10,2,4,'#00000044');p(33,18,1,9,'#00000044');
  if(s.hairStyle===3){p(12,5,4,8,hair);p(18,3,4,8,hair);p(27,4,4,8,hair);p(33,7,4,8,hair)}
  if(s.hairStyle===0){p(9+hairShift,23,4,18,hair);p(35+hairShift,23,4,18,hair);p(10+hairShift,27,1,10,'#ffffff44')}
  if(s.hairStyle===1){p(10+hairShift,27,5,6,hair);p(33+hairShift,27,5,6,hair)}
 }
 // Brows, eyeliner, irises, and a restrained confident mouth.
 p(17,20,5,1,'#3c2535');p(18,19,4,1,'#3c2535');p(26,19,4,1,'#3c2535');p(26,20,5,1,'#3c2535');
 if(pose.blink){p(17,24,6,1,'#251724');p(26,24,6,1,'#251724')}
 else {p(17,22,6,1,'#291927');p(16,23,7,1,'#291927');p(18,24,5,2,'#fff6ef');p(20,23,2,3,eye);p(21,24,1,2,'#1d1724');p(20,23,1,1,'#fff');p(26,22,6,1,'#291927');p(26,23,7,1,'#291927');p(26,24,5,2,'#fff6ef');p(27,23,2,3,eye);p(28,24,1,2,'#1d1724');p(27,23,1,1,'#fff')}
 p(23,27,2,2,'#00000022');p(22,30,5,1,'#8d4058');p(26,29,1,1,'#8d4058');
 // Accessories are a final independent layer.
 if(s.accessory===1){for(const x of [16,26]){p(x,21,7,1,'#252033');p(x,26,7,1,'#252033');p(x,22,1,4,'#252033');p(x+6,22,1,4,'#252033')}p(23,22,3,1,'#252033')}
 if(s.accessory===2){p(10,10,7,5,'#ff68b5');p(18,10,7,5,'#ff68b5');p(16,11,3,3,'#b7ff36')}
 if(s.accessory===3){p(33,12,3,9,'#b7ff36');p(30,15,9,3,'#b7ff36');p(33,15,3,3,'#fff')}
 if(s.accessory===4){p(12,12,3,17,'#252033');p(33,12,3,17,'#252033');p(15,8,18,3,'#252033');p(11,22,5,7,'#ff68b5');p(32,22,5,7,'#ff68b5')}
 ctx.restore();
}
// Randomized blink, pixel-stepped breathing and occasional hair movement.
// Motion stops for reduced-motion users and when the page is hidden.
export function createPortraitAnimator(canvases,getState){
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');let frame=0,last=0,nextBlink=0,blinkUntil=0,running=false;
 function paint(pose){for(const canvas of canvases)drawPortrait(canvas.getContext('2d'),getState(),pose)}
 function tick(now){
  if(!running)return;
  if(!media.matches&&!document.hidden&&now-last>=100){last=now;if(!nextBlink)nextBlink=now+2500+Math.random()*5000;if(now>=nextBlink){blinkUntil=now+140;nextBlink=now+2800+Math.random()*5000}paint({blink:now<blinkUntil,breath:now%3600>2100,hair:now%11000>10400})}
  frame=requestAnimationFrame(tick);
 }
 function reset(){nextBlink=0;blinkUntil=0;paint({});}
 const change=()=>reset();media.addEventListener?.('change',change);document.addEventListener('visibilitychange',change);
 return {start(){if(running)return;running=true;reset();frame=requestAnimationFrame(tick)},stop(){running=false;cancelAnimationFrame(frame);media.removeEventListener?.('change',change);document.removeEventListener('visibilitychange',change)},render:reset};
}

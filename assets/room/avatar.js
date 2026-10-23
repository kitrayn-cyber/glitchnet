// Native 24 × 32 pixel frames. Never rotate, stretch or resample the face.
// Option indices match Avatar Studio and glitchnet-avatar-v1 exactly.
export const WIDTH=24,HEIGHT=32,FRAMES_PER_DIRECTION=20;
export const DIRECTIONS=['down','left','right','up'];
const palettes={skin:['#f6d3b7','#e7b48f','#c99266','#9c6347','#684235','#ffdbcb'],hairColor:['#21192e','#5a332b','#a76437','#f5d17a','#ece4ee','#fa9ad3','#86baf2'],shirt:['#e6a4ed','#8195ec','#303b70','#90c6a2','#f7c774','#fefefe','#fb8cae'],eyes:['#5385d4','#6e442e','#428f73','#8f65be','#29223d']};
const limits={skin:6,hairColor:7,shirt:7,eyes:5,hairStyle:6,outfit:4,accessory:5,background:6};
export function normalizeAvatar(saved){const state={skin:0,hairColor:3,shirt:0,eyes:0,hairStyle:0,outfit:0,accessory:0,background:0};for(const key of Object.keys(state))if(Number.isInteger(saved?.[key])&&saved[key]>=0&&saved[key]<limits[key])state[key]=saved[key];return state;}
// Frames 0..3: normal, breathing, blink, breathing+blink. 4..11: half stride;
// 12..19: full stride. The same head geometry is drawn for every gait frame.
export function poseForFrame(frame){
 if(frame<4)return {swing:0,breath:frame%2,blink:frame>=2};
 const half=frame<12,phase=(frame-4)%8;
 return {swing:[0,1,2,1,0,-1,-2,-1][phase]*(half?.5:1),breath:0,blink:false};
}
export function drawAvatar(ctx,saved,direction,pose={swing:0,breath:0,blink:false}){
 const s=normalizeAvatar(saved),skin=palettes.skin[s.skin],hair=palettes.hairColor[s.hairColor],shirt=palettes.shirt[s.shirt],eye=palettes.eyes[s.eyes];
 const back=direction==='up',side=direction==='left'||direction==='right';
 ctx.save();ctx.clearRect(0,0,WIDTH,HEIGHT);ctx.imageSmoothingEnabled=false;
 if(direction==='left'){ctx.translate(WIDTH,0);ctx.scale(-1,1);}
 const p=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
 const swing=Math.round(pose.swing),breath=pose.breath||0;
 const arm=(x,offset)=>{p(x,18+offset-breath,3,s.outfit===1?3:5,shirt);p(x,23+offset-breath,3,3,skin);};
 const leg=(x,offset)=>{p(x,25,4,4+Math.max(0,offset),'#796b8d');p(x-1,28+offset,5,2,'#fff1e6');};
 // Far limbs, then near limbs. The arms oppose the leg on the same side.
 if(side){leg(9-swing,swing>0?1:0);arm(9+swing,0);leg(12+swing,swing<0?1:0);}
 else{leg(7,swing);leg(14,-swing);}
 // Hair behind the body, with distinct silhouettes for all studio styles.
 if(s.hairStyle===0){p(5,7,14,17,hair);p(4,15,4,11,hair);p(16,15,4,11,hair);}
 if(s.hairStyle===1)p(5,5,14,13,hair);
 if(s.hairStyle===4){p(3,9,4,14,hair);p(17,9,4,14,hair);p(3,10,4,2,'#f6d2e8');p(17,10,4,2,'#f6d2e8');}
 // Torso alone moves by one pixel on an idle inhale. Head and eyes never bob.
 p(side?8:6,18-breath,side?9:12,8+breath,shirt);
 if(s.outfit===2){p(side?8:6,18-breath,4,8+breath,'#484d79');p(side?14:14,18-breath,side?3:4,8+breath,'#484d79');p(11,19-breath,3,7+breath,'#f7f1ff');}
 if(s.outfit===3){p(side?7:5,24,side?11:14,3,shirt);if(!back)p(10,21,5,1,'#fff1e6');}
 if(s.outfit===0&&!back)p(9,18-breath,6,2,'#f9e9f2');
 if(s.outfit===1&&!back)p(10,20-breath,4,2,'#f9e9f2');
 if(side)arm(12-swing,-Math.sign(swing));else{arm(3,-swing);arm(18,swing);}
 // Fixed neck and head bounding box, identical across idle and walk frames.
 p(10,15,4,4,skin);p(7,3,10,12,skin);p(6,8,1,4,skin);p(17,8,side?2:1,4,skin);
 if(s.hairStyle!==5){
  p(6,2,12,5,hair);p(5,5,3,s.hairStyle===2||s.hairStyle===3?5:10,hair);p(16,5,3,s.hairStyle===2||s.hairStyle===3?5:10,hair);
  if(s.hairStyle===3){p(5,1,3,4,hair);p(10,0,3,4,hair);p(15,1,3,4,hair);}
  if(!back){p(8,6,4,2,hair);p(12,5,4,2,hair);}
  if(back)p(6,5,12,11,hair);
 }
 // Opaque, symmetric eye clusters on native integer pixels; no translucent lens overlay.
 if(!back){
  const eyes=side?[14]:[8,14];
  for(const x of eyes){if(pose.blink)p(x,11,2,1,'#51425d');else{p(x,9,2,3,'#fff8f3');p(x+1,10,1,2,eye);p(x+1,9,1,1,'#51425d');}}
  if(side){p(18,10,1,2,skin);p(15,14,2,1,'#975765');}else p(11,14,2,1,'#975765');
 }
 // Accessories remain anchored to the head; rear/side views avoid drawing a second face.
 if(s.accessory===1&&!back){
  for(const x of side?[13]:[7,13]){p(x,8,4,1,'#353759');p(x,12,4,1,'#353759');p(x,9,1,3,'#353759');p(x+3,9,1,3,'#353759');}if(!side)p(11,9,2,1,'#353759');
 }
 if(s.accessory===2){p(4,3,3,3,'#fe6ea9');p(8,3,3,3,'#fe6ea9');p(7,4,1,1,'#ffe9f6');}
 if(s.accessory===3){p(18,4,1,5,'#ffef86');p(16,6,5,1,'#ffef86');}
 if(s.accessory===4){p(5,3,2,10,'#4b5c9f');p(17,3,2,10,'#4b5c9f');p(7,1,10,2,'#4b5c9f');p(4,9,3,5,'#c0cdfb');p(17,9,3,5,'#c0cdfb');}
 ctx.restore();
}
export function createWalkingAvatar(scene,saved){
 const count=DIRECTIONS.length*FRAMES_PER_DIRECTION,texture=scene.textures.createCanvas('walker',WIDTH*count,HEIGHT),ctx=texture.context;
 DIRECTIONS.forEach((direction,d)=>{for(let f=0;f<FRAMES_PER_DIRECTION;f++){
  const index=d*FRAMES_PER_DIRECTION+f;ctx.save();ctx.translate(index*WIDTH,0);drawAvatar(ctx,saved,direction,poseForFrame(f));ctx.restore();texture.add(index,0,index*WIDTH,0,WIDTH,HEIGHT);
 }});texture.refresh();
}

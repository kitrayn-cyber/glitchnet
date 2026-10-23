// Avatar Studio's pixel renderer, reused with a transparent background and walking feet.
// Keep palettes and option ordering compatible with glitchnet-avatar-v1.
const sets={skin:['#f6d3b7','#e7b48f','#c99266','#9c6347','#684235','#ffdbcb'],hairColor:['#21192e','#5a332b','#a76437','#f5d17a','#ece4ee','#fa9ad3','#86baf2'],shirt:['#e6a4ed','#8195ec','#303b70','#90c6a2','#f7c774','#fefefe','#fb8cae'],background:['#b7c4ff','#b4eef2','#ffd2ed','#f6dc99','#e4d7f7','#8ca4d6'],hairStyle:['Long','Bob','Short','Spiky','Pigtails','Bald'],eyes:['Blue','Brown','Green','Violet','Dark'],outfit:['Sweater','T-shirt','Jacket','Dress'],accessory:['None','Glasses','Bow','Star','Headphones']};
const eyeColors={Blue:'#5385d4',Brown:'#6e442e',Green:'#428f73',Violet:'#8f65be',Dark:'#29223d'};
const defaults={skin:0,hairColor:3,shirt:0,background:0,hairStyle:0,eyes:0,outfit:0,accessory:0};
function draw(ctx,state){
 const S=(key)=>sets[key][state[key]],skin=S('skin'),hair=S('hairColor'),shirt=S('shirt'),bg=S('background'),style=S('hairStyle'),acc=S('accessory');
 const p=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
 ctx.clearRect(0,0,48,54);


 // Hair is drawn BEHIND the neck and face. Bob stops at the jaw;
 // long hair extends behind the shoulders rather than covering the shirt.
 if(style==='Long'){
   p(11,11,26,35,hair);p(8,23,8,25,hair);p(32,23,8,25,hair);
   p(7,36,8,12,hair);p(33,36,8,12,hair);
 }
 if(style==='Bob'){
   p(12,10,24,23,hair);p(10,17,8,16,hair);p(30,17,8,16,hair);
   p(10,30,8,3,hair);p(30,30,8,3,hair);
 }
 if(style==='Pigtails'){
   p(13,11,22,20,hair);p(6,20,8,18,hair);p(34,20,8,18,hair);
   p(6,19,8,4,'#fff5');p(34,19,8,4,'#fff5');
 }
 // Body and shoulders, with a dark pixel outline.
 p(6,38,36,10,'#38334d');p(8,36,32,12,shirt);p(12,33,24,10,shirt);
 if(S('outfit')==='Jacket'){p(8,36,9,12,'#484d79');p(31,36,9,12,'#484d79');p(21,36,6,12,'#f7f1ff')}
 if(S('outfit')==='Dress'){p(6,43,36,5,shirt);p(19,38,10,2,'#fff9')}
 if(S('outfit')==='Sweater')p(19,35,10,4,'#ffffff88');
 if(S('outfit')==='T-shirt')p(21,38,6,3,'#fff9');
 // Visible neck goes over the background hair.
 p(20,31,8,7,'#654b50');p(21,31,6,7,skin);
 p(15,15,18,19,'#4a3640');p(16,16,16,17,skin);
 p(13,23,3,7,skin);p(32,23,3,7,skin);
 p(17,30,14,3,skin);
 if(style!=='Bald'){
   // Crown / fringe and distinct front framing.
   p(13,9,22,7,hair);p(14,7,18,4,hair);
   p(12,13,5,13,hair);p(31,12,5,14,hair);
   if(style==='Short'){p(12,12,5,8,hair);p(31,12,5,7,hair)}
   if(style==='Spiky'){p(11,5,5,10,hair);p(17,3,5,10,hair);p(26,4,5,11,hair);p(33,7,4,12,hair)}
   if(style==='Bob'){
     p(11,21,4,9,hair);p(33,21,4,9,hair);
     p(11,30,6,3,hair);p(31,30,6,3,hair);
   }
   if(style==='Long'){
     p(10,21,5,17,hair);p(33,21,5,17,hair);
     p(10,36,3,12,hair);p(35,36,3,12,hair);
   }
   p(16,15,7,4,hair);p(23,14,9,3,hair);
 }
 // Eyes and mouth
 const ec=eyeColors[S('eyes')];p(18,23,4,4,'#fff');p(27,23,4,4,'#fff');p(19,24,2,3,ec);p(28,24,2,3,ec);p(19,24,1,1,'#fff');p(28,24,1,1,'#fff');
 p(23,27,2,1,'#cc907f');p(22,30,5,1,'#975765');
 if(acc==='Glasses'){p(16,22,8,6,'#353759');p(25,22,8,6,'#353759');p(18,23,5,4,'#e6edffb5');p(26,23,5,4,'#e6edffb5');p(23,23,3,1,'#353759')}
 if(acc==='Bow'){p(9,11,7,5,'#fe6ea9');p(17,12,3,3,'#ffe9f6');p(20,11,6,5,'#fe6ea9')}
 if(acc==='Star'){p(33,13,3,9,'#ffef86');p(30,16,9,3,'#ffef86');p(32,15,5,5,'#fff1a4')}
 if(acc==='Headphones'){p(12,12,3,18,'#4b5c9f');p(33,12,3,18,'#4b5c9f');p(15,9,18,3,'#4b5c9f');p(11,23,5,8,'#c0cdfb');p(32,23,5,8,'#c0cdfb')}

}

export function createWalkingAvatar(scene,saved) {
 const state={...defaults};
 for(const key of Object.keys(defaults))if(Number.isInteger(saved?.[key])&&saved[key]>=0&&saved[key]<sets[key].length)state[key]=saved[key];
 const texture=scene.textures.createCanvas('walker',48,54),ctx=texture.context;
 draw(ctx,state);
 ctx.fillStyle='#796b8d';ctx.fillRect(13,48,8,5);ctx.fillRect(28,48,8,5);
 ctx.fillStyle='#fff1e6';ctx.fillRect(11,52,10,2);ctx.fillRect(28,52,10,2);
 texture.refresh();
}

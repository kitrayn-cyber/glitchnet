// Original hand-drawn pixel scene; no remote art, dependencies, or generated sprites.
export function startScene(canvas,getState){
 const c=canvas.getContext('2d'),motion=matchMedia('(prefers-reduced-motion: reduce)');let tick=0,raf=0,last=0;
 const rect=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);};
 const line=(points,color,width=2)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();};
 function bottle(x,y,color,w=13,h=25){rect(x+3,y-5,w-6,5,'#b8a17e');rect(x+2,y,w-4,5,'#809a93');rect(x,y+5,w,h-5,'#829d9180');rect(x+2,y+10,w-4,h-12,color);rect(x+3,y+5,2,h-10,'#dce7ce80');rect(x+4,y+15,w-8,5,'#dfd3a4');}
 function flask(x,y,color){rect(x+8,y,9,16,'#96b9ae');rect(x+10,y+2,5,16,'#243b3b');rect(x+5,y+14,15,4,'#96b9ae');rect(x+1,y+18,23,19,'#96b9ae');rect(x+3,y+18,19,16,'#324e49');rect(x+3,y+24,19,10,color);rect(x+5,y+19,3,8,'#cee4c2');}
 function draw(){const state=getState();const t=motion.matches?0:tick; c.clearRect(0,0,800,350);c.imageSmoothingEnabled=false;
 rect(0,0,800,350,'#1e3033');
 // Brickwork and deep wall recesses.
 for(let y=0;y<250;y+=22){for(let x=-60;x<800;x+=64){rect(x+(y%44?32:0),y,61,20,(x+y)%3?'#293d3e':'#2c4140');rect(x+(y%44?32:0)+2,y+2,57,2,'#314745');}}
 rect(0,250,800,100,'#263736');for(let y=252;y<350;y+=20){rect(0,y,800,2,'#354741');for(let x=(y%40?0:45);x<800;x+=90)rect(x,y,2,20,'#1c2d2d');}
 rect(17,14,4,236,'#566755');rect(23,14,3,236,'#15292c');rect(770,0,9,250,'#52614f');rect(782,0,4,250,'#14272b');
 // Moonlit arched window and panes.
 rect(314,23,153,151,'#101d29');rect(321,30,139,137,'#273b50');rect(328,35,125,125,'#263e50');rect(339,32,104,10,'#354759');
 rect(407,49,22,22,'#dad9a7');rect(414,44,17,8,'#dad9a7');rect(420,48,15,20,'#263e50');
 [[344,55],[371,45],[444,92],[397,99],[334,112],[429,127],[376,77]].forEach(([x,y])=>{rect(x,y,2,2,'#b8d1c6');});
 line([[325,154],[347,133],[361,144],[383,117],[409,144],[434,128],[457,150]],'#425664',14);rect(321,160,139,7,'#243a38');rect(384,29,7,136,'#809087');rect(320,95,140,6,'#6b8279');rect(310,168,162,8,'#899481');rect(309,176,165,5,'#344f49');
 // Shelves of reagents, notebooks and instrument drawers.
 rect(46,62,223,7,'#71806a');rect(45,69,225,8,'#23312e');rect(59,75,5,18,'#646951');rect(247,75,5,18,'#646951');
 for(let i=0;i<9;i++)bottle(58+i*23,29+(i%3)*3,['#a8bf7c','#8cc4c1','#bd96b5','#d3b16f'][i%4],12,30-(i%3)*3);
 rect(44,148,238,9,'#77816b');rect(46,157,235,7,'#182c2c');
 for(let i=0;i<5;i++){rect(55+i*13,111-(i%2)*6,10,37+(i%2)*6,['#9c7f6d','#778f83','#b09e7d','#747f94','#ae8e9f'][i]);rect(57+i*13,116,6,2,'#d7c6a3');}
 flask(134,108,'#c4b774');bottle(180,112,'#b29bd0',17,34);bottle(209,109,'#8dc3a3',15,37);flask(242,109,'#a7d9c1');
 // Plant under a tiny grow lamp.
 rect(59,205,33,33,'#b19276');rect(55,203,41,8,'#c6a585');line([[76,206],[75,173],[66,164]],'#9cb48a',3);rect(60,164,13,7,'#8daf7f');rect(77,182,14,6,'#87a778');rect(69,169,5,13,'#729b73');
 // Brass distillation apparatus.
 rect(541,111,65,5,'#a58b60');rect(548,116,4,64,'#876f4e');rect(595,116,4,64,'#876f4e');
 line([[530,143],[530,87],[557,87],[557,65],[611,65],[611,161]],'#b29b6c',5);
 for(let y=76;y<135;y+=12){line([[609,y],[635,y],[635,y+6],[608,y+6]],'#bc9e70',3);}
 rect(608,144,12,18,'#a4b29a');flask(611,166,'#9ac8a4');flask(516,148,'#cebc75');
 // Right-side cabinets.
 rect(668,45,91,103,'#15282c');rect(672,49,83,95,'#40554f');rect(678,54,33,83,'#293c3d');rect(716,54,33,83,'#293c3d');rect(672,90,82,5,'#68745e');
 bottle(684,65,'#b994bc',15,23);bottle(724,62,'#a3bc87',16,27);rect(683,106,8,28,'#bd9c76');rect(694,102,9,32,'#758d8a');rect(723,110,20,20,'#afae8b');rect(726,114,14,4,'#e0d1a3');
 // Dangling warm lights.
 for(const x of [151,649]){rect(x,0,3,18,'#728173');rect(x-19,18,41,6,'#839078');rect(x-25,24,53,8,'#5b7365');rect(x-18,32,39,4,'#decf9a');let g=c.createRadialGradient(x,43,3,x,43,105);g.addColorStop(0,'#eed79b27');g.addColorStop(1,'#eed79b00');c.fillStyle=g;c.fillRect(x-105,35,210,130);}
 // Gura: stationary position, animated head, torso and expressions.
 const bob=motion.matches?0:Math.round(Math.sin(t/35));const shift=motion.matches?0:Math.round(Math.sin(t/110));const x=391+shift,y=163+bob;
 rect(x-27,y+40,56,53,'#bac2ad');rect(x-23,y+40,49,6,'#d6d6ba');rect(x-8,y+42,16,42,'#344345');rect(x-3,y+45,6,24,'#a39d77');
 line([[x-15,y+44],[x-7,y+55],[x-12,y+80]],'#829888',3);line([[x+15,y+44],[x+8,y+55],[x+13,y+81]],'#829888',3);rect(x+16,y+65,10,9,'#8e9f8c');rect(x+20,y+59,2,9,'#597681');
 const arm=state.mood==='alarmed'?-7:state.mood==='curious'?-3:0;rect(x-36,y+45+arm,10,31,'#bfc7b3');rect(x+29,y+46+arm,10,32,'#bfc7b3');rect(x-36,y+74+arm,12,9,'#c8af8d');rect(x+28,y+74+arm,12,9,'#c8af8d');
 rect(x-8,y+31,16,13,'#bda386');rect(x-19,y-2,40,37,'#c9af91');rect(x-23,y-8,46,16,'#424b45');rect(x-18,y-13,34,7,'#515a50');rect(x-24,y+4,7,19,'#3b4640');rect(x+17,y+5,8,17,'#3b4640');rect(x-19,y-5,11,9,'#677267');rect(x+10,y-6,7,8,'#72786b');
 rect(x-18,y+13,15,10,'#8a9c8d');rect(x+3,y+13,15,10,'#8a9c8d');rect(x-16,y+15,11,6,'#b5c3ac');rect(x+5,y+15,11,6,'#b5c3ac');rect(x-3,y+16,6,2,'#5c6a5b');
 const blink=!motion.matches&&t%165>158;const eyeH=blink?1:state.mood==='surprised'||state.mood==='alarmed'?5:3;
 rect(x-12,y+17,3,eyeH,'#34413b');rect(x+9,y+17,3,eyeH,'#34413b');
 line([[x-17,y+(state.mood==='annoyed'?10:9)],[x-5,y+(state.mood==='annoyed'?13:9)]],'#424c40',2);line([[x+5,y+9],[x+17,y+(state.mood==='curious'?6:9)]],'#424c40',2);
 rect(x-3,y+28,state.mood==='surprised'?6:11,state.mood==='surprised'?4:2,'#795f50');if(state.mood==='impressed')rect(x+7,y+26,2,3,'#795f50');
 // Long central bench in front of the scientist.
 rect(28,249,744,14,'#141f23');rect(22,241,755,10,'#9a9b79');rect(28,251,744,8,'#4b6556');rect(43,263,711,53,'#3f5549');
 for(let x=46;x<750;x+=118){rect(x,268,110,42,'#263e37');rect(x+4,270,102,4,'#59705b');rect(x+44,281,25,4,'#acaa7f');rect(x+50,286,13,3,'#1b322f');}
 rect(43,316,711,12,'#1a2b29');rect(55,328,16,17,'#586b51');rect(728,328,16,17,'#586b51');
 // Microscope, notes, jars and a tiny control machine.
 rect(131,230,48,9,'#8b9d89');rect(148,198,8,33,'#8b9d89');line([[150,212],[166,195],[157,184]],'#a7b3a0',7);rect(146,178,18,8,'#6e8b7f');rect(165,202,8,7,'#c6ba8b');rect(143,218,25,3,'#c0ccb2');
 rect(208,227,50,11,'#cbc9a7');rect(212,225,43,3,'#e5d9b3');for(let i=0;i<4;i++)rect(218,229+i*2,29-i*4,1,'#8c9b83');
 flask(288,204,'#b7b777');bottle(330,207,'#8eafbf',15,32);
 rect(543,206,65,32,'#768b7b');rect(548,211,32,21,'#203d39');rect(552,218,7,3,'#c7d994');rect(560,215,4,9,'#c7d994');rect(566,218,9,3,'#c7d994');rect(590,212,8,8,t%80<40?'#d7c780':'#b4c285');rect(591,225,7,7,'#3c5146');line([[607,226],[626,226],[626,237],[658,237]],'#162c2a',3);
 bottle(675,208,'#bf9bba',17,30);flask(710,201,'#a7bd8a');
 // The actual mixture is mirrored onto the central mixing apparatus.
 const color=state.result?.color|| (state.ids.length?'#b7cb9c':'#547468');flask(450,200,color);rect(442,238,44,4,'#536b55');
 if(state.ids.length){for(let i=0;i<4;i++){const by=motion.matches?191-i*6:198-((t+i*17)%45);rect(459+(i%2)*7,by,2,2,'#d1dfa3');}}
 if(state.result?.id==='growth'){line([[464,223],[465,186],[456,175]],'#a4ce7e',3);rect(450,173,12,6,'#9bc677');rect(466,184,13,6,'#a4ce7e');}
 if(state.result?.id==='smoke'||state.result?.id==='explosion'){for(let i=0;i<4;i++)rect(439+i*10,183-(i%2)*10,19,12,'#c4b3c080');}
 // Low ambient glow and scattered pixel dust.
 const glow=c.createRadialGradient(463,229,1,463,229,75);glow.addColorStop(0,'#bfdc8728');glow.addColorStop(1,'#badd8700');c.fillStyle=glow;c.fillRect(388,154,150,150);
 [[98,106],[300,66],[504,131],[658,184],[249,186]].forEach(([x,y],i)=>rect(x,y+(motion.matches?0:Math.round(Math.sin(t/50+i)*3)),2,2,'#c6c99a66'));
 }
 function frame(now){if(now-last>65){tick++;draw();last=now;}if(!document.hidden&&!motion.matches)raf=requestAnimationFrame(frame);}
 function resume(){cancelAnimationFrame(raf);draw();if(!document.hidden&&!motion.matches)raf=requestAnimationFrame(frame);}
 motion.addEventListener('change',resume);document.addEventListener('visibilitychange',resume);resume();return {redraw:draw};
}

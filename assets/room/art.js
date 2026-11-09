// Original GlitchNet artwork. Every edge uses the existing 480 × 270 pixel grid.
// Visual bounds follow geometry.js; decorative details never change walkable space.
const C={ink:0x604952,wood:0xad754b,woodLight:0xdfaf72,woodDark:0x805539,
 cream:0xf6e8c8,creamShade:0xdfccaa,lilac:0xa68bbd,lilacLight:0xd6c3e3,
 pink:0xd897aa,gold:0xffd98b,leaf:0x64866b,leafLight:0xa2b780};
function pixels(scene){
 const g=scene.add.graphics();
 const r=(x,y,w,h,c,a=1)=>{g.fillStyle(c,a);g.fillRect(x,y,w,h);};
 const star=(x,y,c=C.gold)=>{r(x+2,y,1,5,c);r(x,y+2,5,1,c);};
 const shadow=(x,y,w,h)=>{r(x+2,y,w-4,h,0x6e4e61,.12);r(x,y+2,w,h-4,0x6e4e61,.12);};
 const plant=(x,y,small=false)=>{
  const w=small?8:14;
  shadow(x-w/2-2,y+1,w+4,5);r(x-w/2,y-8,w,9,0x9b6650);r(x-w/2+2,y-6,w-4,6,0xce9672);
  r(x-w/2-1,y-9,w+2,3,0xe2b08a);r(x-w/2+2,y-9,w-4,1,0xf0c8a0);
  r(x-1,y-24,2,15,C.leaf);r(x-6,y-21,5,4,C.leaf);r(x+1,y-26,5,5,C.leafLight);
  r(x-8,y-17,7,4,C.leafLight);r(x+1,y-19,7,4,C.leaf);r(x+2,y-19,4,1,0xabc28b);
  r(x-4,y-24,3,3,0x8ca574);r(x+1,y-12,4,3,0x8ca574);
 };
 const wood=(x,y,w,h)=>{r(x,y,w,h,C.woodDark);r(x+1,y,w-2,h-1,C.wood);r(x+1,y,w-2,1,C.woodLight);if(w>7)r(x+3,y+3,w-7,1,0xc18d59);};
 const glow=(x,y,w,h,color)=>{r(x-7,y-5,w+14,h+10,color,.035);r(x-4,y-3,w+8,h+6,color,.06);r(x,y,w,h,color,.08);};
 return {g,r,star,shadow,plant,wood,glow};
}
function shell(p){
 const {r,star,wood}=p;
 // Dusk surrounds the warm miniature house; a stepped cast shadow anchors it.
 r(0,0,480,270,0x343348);r(0,192,480,78,0x3c374d);
 [[33,72],[443,97],[26,180],[454,214],[74,32],[405,30]].forEach(([x,y])=>star(x,y,0x89809f));
 r(66,244,354,5,0x282a3c,.5);r(72,249,342,3,0x282a3c,.25);
 r(61,51,358,187,C.ink);r(64,54,352,179,C.creamShade);r(67,57,346,76,C.cream);
 // Delicate paired wallpaper sprigs, interrupted by a quiet vertical stripe.
 for(let x=71;x<414;x+=12)r(x,58,1,72,0xfbf1dc);
 for(let y=64;y<128;y+=16)for(let x=77+((y/16|0)%2)*10;x<412;x+=20){
  r(x,y,1,5,0xe1d3b5);r(x-2,y,2,2,0xd7c8ad);r(x+1,y+2,2,2,0xe5c7b4);
 }
 // Crown, side posts, chair rail and warm wooden skirting.
 wood(63,52,354,5);r(65,57,2,176,0xbf9060);r(413,57,3,176,0x94704f);
 wood(67,129,346,8);r(68,130,344,2,0xf0d09a);r(68,135,344,2,0x795438);
 // Individual planks: varied honey tones, staggered joints, knots and short grain.
 const tones=[0xd3a16a,0xc99660,0xd9aa72,0xcfa06b,0xd4a36c,0xc48d58,0xd7a76f];
 for(let row=0;row<8;row++){
  const y=137+row*13,h=Math.min(13,230-y);r(67,y,346,h,tones[row%tones.length]);r(67,y+h-1,346,1,0xa8754c);r(67,y,346,1,0xe7bd85);
  for(let x=67;x<413;x++){
   const n=(x*17+row*31)%113;
   if(h>8&&n===0&&x<402){r(x,y+4,10,1,0xb78050);r(x+3,y+6,5,1,0xe7b77a);}
   if(h>10&&n===31&&x<406)r(x,y+9,6,1,0xe3b67c);
  }
  for(let x=83+(row%2)*34;x<413;x+=68){r(x,y,1,h,0xa8754c);r(x+2,y+2,1,1,0x987047);}
 }
 // A darker wall-to-floor seam and beveled front edge give the room thickness.
 r(67,137,346,3,0x805b43,.2);
 // Wide, pixel-stepped amber light pools soften the floor near the bedside lamp.
 r(68,153,30,44,0xffd27c,.07);r(68,163,37,26,0xffd27c,.09);r(69,170,28,13,0xffe0a0,.10);
 wood(61,230,358,8);r(64,231,352,2,0xf0c48b);r(65,238,350,5,0x785841);r(68,239,344,1,0xa77a53);
}
function nightWindow(scene,p){
 const {r,star,wood,glow}=p;
 wood(113,60,69,65);r(116,63,63,58,0x6d5681);r(119,66,57,52,0x353d68);
 r(120,67,55,25,0x3f477c);r(120,92,55,25,0x56518a);
 // Crescent moon and layered distant hills, all original pixel clusters.
 r(157,73,9,11,0xffedbe);r(155,75,13,7,0xffedbe);r(159,71,5,15,0xffedbe);
 r(161,72,7,10,0x3f477c);r(163,74,6,6,0x3f477c);
 r(120,109,13,8,0x3d496d);r(124,105,8,8,0x3d496d);r(132,111,26,6,0x41476a);r(157,105,18,12,0x394160);r(164,101,6,6,0x394160);
 [[125,73],[143,78],[133,94],[168,93],[153,100]].forEach(([x,y])=>star(x,y,0xc7d9ed));
 r(146,65,3,54,0xe8d5b2);r(119,90,57,3,0xe8d5b2);r(147,67,1,21,0xfff1cf);
 r(120,67,2,21,0x9bafd0,.5);r(151,95,2,18,0x9bafd0,.35);
 wood(110,121,75,5);r(112,121,71,2,0xf1d6aa);
 // Gathered lilac curtains with several light and dark folds and gold ties.
 r(106,58,82,3,0x7f5b4f);r(108,61,12,54,0x8d739e);r(110,62,8,43,0xb59bc5);r(112,62,2,42,0xd4bddc);r(116,63,2,39,0x9f83b2);r(109,105,9,3,C.gold);r(108,109,10,7,0xb59bc5);
 r(175,61,11,54,0x8d739e);r(176,62,8,43,0xb59bc5);r(178,62,2,42,0xd4bddc);r(182,63,2,39,0x9f83b2);r(177,105,8,3,C.gold);r(177,109,9,7,0xb59bc5);
 // Pixel-stepped moonlight reaches the floor without changing its collisions.
 r(119,138,53,5,0xbec9ed,.16);r(124,143,54,6,0xbec9ed,.13);r(130,149,54,6,0xbec9ed,.10);
 glow(119,65,58,53,0xb4c6ff);
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const sparks=scene.add.graphics();sparks.fillStyle(0xfff1ce);[[125,74],[144,80],[170,95]].forEach(([x,y])=>sparks.fillRect(x,y,1,1));
  scene.tweens.add({targets:sparks,alpha:{from:.25,to:1},duration:1800,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
 }
}
function wallDetails(scene,p){
 const {r,star,wood,plant,glow}=p;
 // A sagging cord with individually glowing bulbs.
 for(let x=192;x<346;x+=2){const y=61+Math.round(Math.sin((x-192)/154*Math.PI)*10);r(x,y,2,1,0x8c795f);}
 for(let x=194;x<343;x+=14){const y=63+Math.round(Math.sin((x-192)/154*Math.PI)*10);glow(x-1,y-1,5,6,0xffc35e);r(x-2,y-2,7,8,0xffce70,.09);r(x,y,3,4,0xe5a657);r(x,y,2,3,0xffe6a0);r(x+1,y,1,1,0xfff5cd);}
 // Shelf, colored book spines, ribbons and a sleeping cream cat figurine.
 r(193,114,65,5,0x805943,.17);wood(192,108,65,6);r(196,114,3,5,0x936546);r(249,114,3,5,0x936546);
 [0x8e9caa,0xb88da6,0xe0bd7c,0x87997b].forEach((c,i)=>{const x=197+i*6,y=89+i%2*3,h=19-i%2*3;r(x,y,5,h,0x6f5960);r(x+1,y+1,3,h-2,c);r(x+1,y+3,3,1,0xf2dfbd);r(x+2,y+h-4,1,2,0xf2dfbd);});
 r(225,98,18,10,0xb99e87);r(226,97,16,9,0xf5dfb5);r(226,92,5,7,0xf5dfb5);r(237,92,5,7,0xf5dfb5);r(228,94,2,3,0xd6a098);r(238,94,2,3,0xd6a098);r(228,102,3,1,C.ink);r(237,102,3,1,C.ink);r(233,104,2,1,0xb78086);r(243,102,3,4,0xf5dfb5);plant(253,106,true);
 // Framed magical-girl keepsakes and pinned Polaroids, away from the door.
 wood(82,88,21,26);r(85,91,15,20,0xf9e8cc);r(88,97,4,5,C.pink);r(93,97,4,5,C.pink);r(90,101,5,5,C.pink);r(92,95,1,1,0xfff6db);
 wood(316,88,21,26);r(319,91,15,20,0x5e6284);star(324,95,0xffe0a0);r(322,104,9,1,0xb0a4cd);r(323,107,7,1,0xb0a4cd);
 r(271,83,16,19,0xe7d6b8);r(273,85,12,11,0x8f9eac);r(276,91,6,5,0xd7ad9e);r(277,83,4,2,0xcdb3d5);
 r(291,88,13,16,0xf5e5c9);r(293,90,9,9,0xa99cb9);r(295,94,5,5,0xd9c097);r(296,87,3,2,0xc7ba90);
 // Trailing pothos spills over the shelf edge instead of a rigid green stalk.
 r(258,106,1,18,0x6e8c69);r(259,120,1,8,0x6e8c69);
 [[256,112],[259,116],[256,122],[260,126]].forEach(([x,y])=>{r(x,y,3,3,0x8ea370);r(x,y,2,1,0xb0c28a);});
 star(208,128,0xd4ae68);star(233,121,0xad8eb1);
}
function exitDoor(p){
 const {r,wood,shadow}=p;
 shadow(350,160,44,7);wood(350,76,41,86);r(354,80,33,80,0x9e704f);r(356,81,29,77,0xc3996f);
 // Recessed panels, directional bevels, brass knob and a little moon charm.
 for(const [y,h] of [[85,30],[122,31]]){r(358,y,25,h,0x8d654d);r(359,y+1,23,h-2,0xe1bd8d);r(361,y+3,20,h-5,0xbe946e);r(362,y+4,17,h-7,0xcaa27c);r(361,y+3,20,1,0xa0785a);}
 r(378,119,4,4,0x886544);r(379,118,3,3,0xffdd88);r(379,118,1,1,0xfff1bc);r(355,82,1,75,0xe6bd86);
 r(369,91,1,6,0xaa805c);r(367,97,5,5,0xf4d292);r(370,97,3,3,0xbe946e);
 r(354,160,33,2,0xf1cf98);r(354,162,33,1,0x825d43);
}
function bed(p){
 const {r,star,shadow,wood,glow}=p;
 shadow(90,218,76,12);wood(92,137,69,21);r(95,140,63,14,0xd7b185);r(98,142,57,10,0xe9c99e);r(99,143,55,1,0xf7dbb0);
 for(const x of [93,157]){r(x,135,3,24,0x986b4d);r(x-1,135,5,3,0xe2b584);}
 r(91,156,70,65,0x7d625e);r(93,155,66,61,0xdfd2bc);r(95,157,61,55,0xffefdc);r(155,159,4,55,0xc5b4bd);
 // Pillows have stepped corners, pink piping, highlights and a recessed center.
 for(const x of [98,128]){r(x,156,25,15,0xb78097);r(x-1,158,27,11,0xb78097);r(x+1,156,23,13,0xe8b3bc);r(x+2,157,21,2,0xf8d8d0);r(x+3,160,19,7,0xf0c3c7);r(x+4,167,17,1,0xd39ba8);}
 // Puffy lavender quilt, folded sheet, stitched seams and tiny embroidered stars.
 r(94,173,65,41,0x77618e);r(95,172,62,41,0xa991be);r(97,174,57,36,0xb9a1cf);r(98,175,54,2,0xd5c1e4);
 r(96,171,61,7,0xf6e5d5);r(98,173,57,3,0xe6d5dd);r(96,178,61,2,0x9279a9);
 r(151,180,5,30,0x8a719f);r(150,183,1,25,0xd1bbdf);r(97,210,55,3,0x967bad);
 // Uneven folds and a curved-looking draped edge break up the quilt silhouette.
 r(97,181,2,24,0xcbb3dd);r(99,180,2,14,0xcbb3dd);r(145,190,2,18,0xac91c4);
 r(99,213,9,2,0xa991be);r(111,213,13,2,0xb9a1cf);r(128,213,10,2,0xa991be);r(142,212,8,2,0xb9a1cf);
 for(let y=184;y<207;y+=12)for(let x=104;x<146;x+=15){star(x,y,0xe6d0e9);r(x+6,y+6,1,1,0xd2b9dd);}
 for(let x=100;x<151;x+=4)r(x,211,2,1,0xddc5e4);
 wood(91,216,70,7);r(94,223,5,4,0x805a45);r(152,223,5,4,0x805a45);r(94,216,64,1,0xebc695);
 // A tiny pink rabbit plush and a star cushion tucked against the pillows.
 r(139,163,8,9,0xc38b9e);r(138,164,10,6,0xe6b3ba);r(139,157,3,8,0xe6b3ba);r(144,156,3,8,0xe6b3ba);r(140,158,1,4,0xf7d6d1);r(145,157,1,4,0xf7d6d1);r(140,165,1,1,C.ink);r(145,165,1,1,C.ink);r(142,167,2,1,0xb67490);
 star(113,169,0xe7bf79);
 // Wooden bedside chest and pleated lampshade, with warm pool below.
 shadow(70,190,20,6);wood(72,168,16,25);r(74,172,12,8,0xc39570);r(74,182,12,8,0xc39570);r(78,176,4,1,C.gold);r(78,185,4,1,C.gold);r(71,166,18,3,0xe8c291);
 glow(69,143,23,39,0xffc66b);r(78,156,3,10,0xa6754a);r(75,164,9,2,0x8b624b);r(76,146,8,3,0xffe2a0);r(73,149,14,8,0xd69a5d);r(74,149,12,6,0xffd58c);r(76,150,1,5,0xffe8b5);r(81,149,1,6,0xeab772);r(72,156,16,2,0xa7734b);r(74,156,12,1,0xffe2a0);
}
function desk(p){
 const {r,wood,shadow,plant,glow}=p;
 shadow(264,176,93,12);wood(266,151,6,33);wood(348,151,6,33);r(268,155,2,25,0xd1a36f);
 wood(329,154,24,18);r(331,156,20,6,0xd2b18c);r(331,164,20,6,0xc7a17d);r(338,159,6,1,0x82624e);r(338,167,6,1,0x82624e);
 wood(264,144,93,10);r(265,145,91,3,0xebc78e);r(266,148,89,2,0xc9945e);r(267,152,87,1,0x936449);
 for(let x=271;x<353;x+=17)r(x,147,9,1,0xd8aa72);
 // Cream CRT has a deep bevel, curved-looking stepped screen and side vents.
 r(285,119,34,23,0x6d6163);r(284,121,36,19,0x6d6163);r(286,118,31,22,0xd7ceb5);r(287,119,30,2,0xf9ebcc);r(317,121,3,18,0xaa9c95);
 r(288,122,27,16,0x7a7890);r(290,123,23,13,0x424d71);r(291,124,21,2,0x829cc5);r(291,127,21,8,0x6986ad);r(292,128,9,6,0xd3c0df);r(293,129,7,1,0xf6e5e6);r(294,131,5,2,0x9d8aba);r(304,129,6,1,0xdce4db);r(304,132,5,1,0xdce4db);
 r(289,137,24,2,0xeee0c4);r(309,138,2,1,0x8bb58e);r(318,124,1,2,0x7e7477);r(318,128,1,2,0x7e7477);r(299,141,7,3,0xa69794);r(294,144,17,2,0xf0dfc0);glow(287,122,28,17,0xa9cfff);
 // Keyboard, mouse, mug and 2006 desk clutter: flip phone, CDs, sticky note.
 r(283,148,35,4,0x9c9299);r(284,147,33,4,0xe4d6bc);for(let x=286;x<315;x+=3){r(x,148,2,1,0xafa3a1);r(x,150,2,1,0xafa3a1);}r(320,148,6,3,0xc8b6d4);r(322,147,3,2,0xe6d4e8);
 r(271,137,7,7,0x9b788c);r(272,137,5,6,0xe8b3bb);r(278,138,3,4,0xd29cac);r(279,139,1,2,0xf2d6c4);r(272,137,5,1,0x6b5663);
 r(329,140,7,3,0x9b85ac);r(329,132,6,7,0xc3a7d1);r(330,133,4,4,0x7c99b1);r(331,140,3,1,0xf4d9e7);
 plant(344,142,true);r(269,145,8,3,0xc0c7cf);r(272,146,2,1,0x6a6c87);r(310,139,5,4,0xe9cb85);r(311,140,3,1,0xaf956e);
 // Upholstered swivel stool: shaded cushion, wooden legs and a small footrest.
 shadow(299,185,25,7);wood(302,175,4,15);wood(316,175,4,15);r(305,184,12,2,0x9e7759);
 r(299,165,23,11,0x6f5c80);r(301,162,19,3,0x9a7fad);r(300,165,21,7,0xb79dc7);r(302,164,17,2,0xd9bfdf);r(301,173,19,2,0x8e719f);
}
function floorDecor(p){
 const {r,star,shadow,plant}=p;
 // Woven lilac rug, stepped corners, cream border, embroidered diamond and fringe.
 shadow(183,221,109,8);r(187,183,100,43,0x78637f);r(183,187,108,35,0x78637f);r(187,185,100,39,0xb19ab9);r(185,189,104,31,0xb19ab9);r(191,189,92,31,0xe4cbbf);r(194,192,86,25,0xa08cae);
 for(let y=194;y<215;y+=3)for(let x=197;x<278;x+=4)r(x,y,1,1,0xb8a0bf);
 for(let x=188;x<289;x+=4){r(x,181,1,3,0xe2cbb7);r(x,226,1,3,0xd7bfae);}
 for(let i=0;i<10;i++){r(232-i*2,195+i,4+i*4,1,0xdac1ca);r(232-i*2,213-i,4+i*4,1,0xdac1ca);}
 star(232,201,0xffe4b1);star(208,200,0xe1c9d7);star(257,200,0xe1c9d7);
 // Cat basket with a quilted cushion and a toy mouse, clearly furniture.
 shadow(327,221,31,7);r(329,210,25,14,0x96714e);r(331,207,21,4,0xb18c63);r(330,212,23,9,0xc4a87b);r(332,212,19,7,0xb4c3bb);r(334,213,15,4,0xd5ded1);r(330,221,23,2,0xa47a54);
 r(331,205,5,7,0xb18c63);r(347,205,5,7,0xb18c63);r(332,206,2,3,0xe2bb9c);r(348,206,2,3,0xe2bb9c);r(335,215,3,1,0x71807c);r(346,215,3,1,0x71807c);r(341,218,2,1,0xbb8f91);
 for(let x=332;x<353;x+=4)r(x,222,2,1,0xd5b68a);
 r(358,222,5,3,0x9c8ca8);r(361,221,2,2,0xd4abc3);r(357,224,2,1,0x765b7b);plant(381,220);
 // Slippers and a dog-eared magazine: little signs somebody lives here.
 r(170,217,5,8,0x947082);r(177,218,5,8,0x947082);r(170,217,4,5,0xd4a2b3);r(177,218,4,5,0xd4a2b3);r(171,217,2,2,0xf1cad0);r(178,218,2,2,0xf1cad0);
 r(290,213,13,9,0x8b6779);r(291,212,11,8,0xe9dbb7);r(293,214,7,3,0xa58eb5);r(293,218,5,1,0xb49a7b);
}
export function drawRoom(scene){
 const p=pixels(scene);shell(p);nightWindow(scene,p);wallDetails(scene,p);exitDoor(p);floorDecor(p);bed(p);desk(p);
 return p.g;
}
export function drawWardrobe(scene){
 const p=pixels(scene),{r,wood,shadow}=p;
 // The original 17 × 43 furniture footprint and open silhouette are retained.
 shadow(394,132,20,6);wood(395,89,17,41);r(397,92,13,24,0x735c57);r(398,93,11,21,0x8f7674);wood(394,87,19,4);r(397,94,13,1,0xe9c58b);
 r(400,95,1,2,0xe9c58b);r(398,97,5,1,0xe9c58b);r(398,98,5,10,0xd69aab);r(397,99,1,3,0xd69aab);r(403,99,1,3,0xd69aab);r(399,99,1,7,0xf0bcc6);r(402,101,1,7,0xb77c98);
 r(406,95,1,2,0xe9c58b);r(405,97,4,1,0xe9c58b);r(405,98,4,13,0xa99ac1);r(404,99,1,3,0xa99ac1);r(409,99,1,3,0xa99ac1);r(406,99,1,10,0xd2bddc);r(408,103,1,7,0x8a779e);
 r(397,114,13,2,0xe0b985);
 for(const y of [117,123]){r(397,y,13,5,0xd5ba98);r(398,y,11,1,0xf3dcba);r(402,y+2,4,1,0x8b6954);r(403,y+2,2,1,0xe9c58b);}
 r(397,130,3,2,0x805539);r(407,130,3,2,0x805539);
 // Folded linens sit on top, rather than another door-shaped panel.
 r(398,84,11,3,0xb4a0c9);r(399,82,9,2,0xe8d5bd);r(399,85,9,1,0xd9c7df);
 return p.g;
}
// Purchased items keep their IDs, origins and hitboxes; only their pixels change.
export function drawDecoration(scene,id){
 const p=pixels(scene),{r,star,plant,wood,shadow,glow}=p;
 if(id==='poster'){wood(-10,-25,20,25);r(-8,-23,16,21,0x4e577a);star(-2,-20,0xffdf9c);r(-5,-9,10,1,0xc3b1d4);r(-4,-6,8,1,0x8e9db8);r(-9,-24,1,22,0xf1cf98);}
 if(id==='plant')plant(0,0);
 if(id==='rug'){shadow(-29,4,58,6);r(-29,-9,58,18,0x78637f);r(-27,-8,54,15,0xc1a5c7);r(-24,-6,48,11,0xead2c8);r(-22,-4,44,7,0xa38ab4);for(let x=-26;x<28;x+=4){r(x,-11,1,2,0xe7d5bc);r(x,9,1,2,0xe7d5bc);}star(-2,-3,0xffe1ae);}
 if(id==='lamp'){shadow(-10,-1,20,5);glow(-13,-38,26,38,0xffc66b);r(-8,-3,16,3,0x7e604b);r(-6,-4,12,2,0xd1a46a);r(-1,-30,2,27,0x9e764e);r(-9,-34,18,9,0xc8955e);r(-7,-35,14,8,0xffd58c);r(-5,-38,10,4,0xffe3a8);r(-4,-34,1,6,0xffe8b5);r(3,-34,1,6,0xe6b16f);r(-9,-27,18,2,0xa5764d);}
 return p.g;
}

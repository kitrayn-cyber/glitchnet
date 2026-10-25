// All artwork is drawn at a 480 × 270 logical resolution, with integer pixels.
export function drawRoom(scene){
 const g=scene.add.graphics(); const r=(x,y,w,h,c)=>{g.fillStyle(c);g.fillRect(x,y,w,h)};
 const line=(x,y,w,c)=>r(x,y,w,1,c);
 const star=(x,y,c=0xfff1bb)=>{r(x+2,y,2,8,c);r(x,y+3,6,2,c)};
 const plant=(x,y)=>{r(x-7,y,14,10,0xb590ad);r(x-9,y,18,3,0xdcb4cb);r(x-1,y-18,2,19,0x88a58a);r(x-8,y-15,7,5,0x9db9a1);r(x+1,y-20,7,5,0xa8c6a8);r(x+1,y-10,8,4,0x88a58a)};
 // Floating platform, wallpaper and honey-colored floor.
 r(64,54,352,185,0xd0bfdc);r(66,56,348,174,0xf5dfe8);r(66,133,348,97,0xe8c8bb);
 for(let x=70;x<414;x+=12)r(x,57,1,75,0xeacddc);
 for(let y=66;y<130;y+=14)for(let x=77;x<411;x+=24){r(x,y,2,2,0xf8edf1)}
 r(66,130,348,5,0xbfa4bb);r(66,131,348,2,0xffeff0);
 for(let y=146;y<229;y+=14){line(66,y,348,0xd6b3ac);for(let x=66+((y/14|0)%2)*26;x<414;x+=52)r(x,y-12,1,12,0xdcb8ad)}
 r(61,230,358,7,0xbca4b6);r(65,237,350,5,0xa28aa7);r(61,230,358,2,0xffe5e2);
 // Window, sky, clouds, curtains.
 r(113,60,69,65,0xb8a1bd);r(116,62,63,60,0xfff6e9);r(120,66,55,51,0xb6d5e9);
 r(127,80,19,5,0xeaf3f2);r(132,77,9,3,0xeaf3f2);r(153,94,20,5,0xeaf3f2);r(158,91,9,3,0xeaf3f2);
 r(146,65,3,53,0xfff6e9);r(119,90,57,3,0xfff6e9);r(111,121,73,5,0xd6b6bd);
 r(108,61,12,53,0xd0b9dd);r(111,65,3,45,0xe5cfea);r(174,61,11,53,0xd0b9dd);r(179,65,3,45,0xe5cfea);r(106,58,82,3,0xb59abc);
 // Fairy lights.
 for(let x=192;x<346;x+=11){r(x,62+Math.round(Math.sin((x-192)/150*Math.PI)*9),10,1,0xb7a0b9);star(x+2,64+Math.round(Math.sin((x-192)/150*Math.PI)*9),0xffe6a6)}
 // Door.
 r(350,76,41,86,0xb397b2);r(354,80,33,80,0xd8bccd);r(358,85,25,30,0xc9abbe);r(360,87,21,26,0xe3c7d7);r(358,122,25,31,0xc9abbe);r(360,124,21,27,0xe3c7d7);r(378,119,4,4,0xffe4a5);
 // Shelf, books, sleepy cat.
 r(192,108,65,5,0xb296a7);r(195,113,3,6,0xb296a7);r(248,113,3,6,0xb296a7);
 [0xc2aed9,0xe0a8b7,0xf6dba9,0xa9c5cf].forEach((c,i)=>{r(197+i*6,90+i%2*3,5,18-i%2*3,c);r(198+i*6,94+i%2*3,3,1,0xf8eeed)});
 r(225,97,17,11,0xf5e8db);r(225,92,5,8,0xf5e8db);r(237,92,5,8,0xf5e8db);r(228,102,3,1,0xa08b9d);r(236,102,3,1,0xa08b9d);r(233,105,2,1,0xd2a0ac);plant(250,98);
 // Framed heart and star print.
 r(83,89,20,25,0xb69bb5);r(85,91,16,21,0xfff1df);r(89,98,4,5,0xdba4ba);r(94,98,4,5,0xdba4ba);r(91,102,5,4,0xdba4ba);
 r(316,88,21,26,0xb49cba);r(318,90,17,22,0xf7e8e8);star(323,96,0xe2bc8f);
 // Bed.
 r(91,147,70,75,0xd0a4bb);r(94,151,64,68,0xf7e3e5);r(93,137,67,20,0xbca3c8);r(96,140,61,12,0xd5bddc);
 r(97,154,26,15,0xfff4ed);r(127,154,26,15,0xfff4ed);r(99,156,22,2,0xecd9dd);r(129,156,22,2,0xecd9dd);
 r(94,173,64,42,0xbca9d5);r(96,175,60,4,0xd5c7e4);r(151,179,5,33,0xa491c0);
 for(let y=185;y<212;y+=13)for(let x=103;x<147;x+=16)star(x,y,0xe8daf1);
 r(91,216,70,6,0xb99ab1);r(94,222,6,5,0xa48aa5);r(152,222,6,5,0xa48aa5);
 // Nightstand and lamp.
 r(72,168,16,25,0xcba8b8);r(73,167,15,3,0xffded6);r(78,178,3,2,0xffe9c6);r(79,155,2,12,0xad91ab);r(73,149,14,8,0xffe3ad);r(76,146,8,4,0xffe3ad);
 // Desk and computer.
 r(266,153,5,31,0xb899ab);r(348,153,5,31,0xb899ab);r(264,144,93,9,0xc5a5b3);r(264,144,93,3,0xffe6d6);r(329,155,23,15,0xdcbcca);r(338,161,5,2,0xffead1);
 r(285,119,34,23,0x9b8ba8);r(288,122,28,17,0xb7d1e0);r(291,125,22,2,0xd9edf0);r(292,130,9,6,0xd5c5e4);r(305,130,6,1,0xf9eee9);r(305,133,6,1,0xf9eee9);r(300,141,5,4,0x9b8ba8);r(293,144,19,2,0x9b8ba8);r(283,149,34,2,0xf1e4e4);plant(341,138);r(272,137,7,7,0xf4d8dc);r(279,138,2,4,0xf4d8dc);
 // Stool.
 r(299,169,23,7,0xa18bb8);r(302,176,3,14,0xb598b6);r(316,176,3,14,0xb598b6);r(300,162,21,8,0xc9b5d9);
 // Rug.
 r(187,183,100,43,0xd0acbe);r(183,187,108,35,0xd0acbe);r(187,185,100,39,0xe8bfcf);r(185,190,104,29,0xe8bfcf);r(193,190,88,28,0xf1d4de);r(197,193,80,22,0xe8c1d0);
 for(let x=188;x<289;x+=5){r(x,181,2,3,0xe7bdcd);r(x,226,2,3,0xe7bdcd)}
 star(231,200,0xffe8dd);star(215,202,0xffe8dd);star(247,202,0xffe8dd);
 plant(381,219);
 // Cat-shaped floor cushion.
 r(329,210,25,14,0xb7c8d6);r(331,205,6,10,0xb7c8d6);r(346,205,6,10,0xb7c8d6);r(333,214,4,2,0x8a8aab);r(346,214,4,2,0x8a8aab);r(340,219,3,2,0xe4b8c9);
 // Loose wall decor.
 star(206,131,0xe3b675);star(231,123,0xc3a5ca);
 return g;
}

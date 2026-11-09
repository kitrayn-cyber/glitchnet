import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {furniture,canStand,move} from '../assets/room/geometry.js';
import {ENTRANCE,worldMapUrl,isIllustratedRightWall} from '../assets/room/entrance.js';
test('the only Phaser exit is the reachable large right-wall door',()=>{
 const exits=furniture.filter(f=>f.id==='door');assert.equal(exits.length,1);assert.deepEqual(exits[0],ENTRANCE);
 assert.equal(ENTRANCE.x,350);assert.equal(ENTRANCE.w,41);assert.ok(canStand(ENTRANCE.approach.x,ENTRANCE.approach.y));
 const arrival=move({x:371,y:180},0,-16);assert.deepEqual(arrival,ENTRANCE.approach);
 assert.equal(furniture.filter(f=>f.id==='wardrobe').length,1);assert.equal(furniture.find(f=>f.id==='wardrobe').w,17);
 assert.equal(canStand(372,120),false,'repaired wall is outside the walking floor');
 assert.equal(canStand(420,160),false,'right boundary remains closed');
});
test('map URLs stay on the same project path from standalone and embedded rooms',()=>{
 for(const url of ['https://kitrayn-cyber.github.io/glitchnet/room.html?renderer=classic','https://kitrayn-cyber.github.io/glitchnet/room.html?embed=1'])assert.equal(worldMapUrl(url),'https://kitrayn-cyber.github.io/glitchnet/map.html');
});
test('illustrated and SVG fallbacks expose the stairs, not an old right-wall hotspot',()=>{
 const html=readFileSync(new URL('../room.html',import.meta.url),'utf8');
 assert.equal((html.match(/id="front-left-exit"/g)||[]).length,1);
 const hotspots=html.match(/<div class="art-hotspots">([\s\S]*?)<\/div>/)[1];
 assert.ok(hotspots.includes('data-action="door"'));assert.ok(!hotspots.includes('data-action="wardrobe"'));
 assert.ok(html.includes('aria-label="Front-left stairs to World Map"'));assert.ok(ENTRANCE.illustrated.left<50);
});

test('the former illustrated door is a solid wall, separate from the front-left stairs',()=>{
 assert.equal(isIllustratedRightWall({x:97,y:40}),true);
 assert.equal(isIllustratedRightWall({x:92,y:47}),true);
 assert.equal(isIllustratedRightWall({x:35,y:88}),false);
 assert.equal(isIllustratedRightWall({x:50,y:76}),false);
});

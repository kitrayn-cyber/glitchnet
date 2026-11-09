import test from 'node:test';
import assert from 'node:assert/strict';
import {GAME_SIZE,roomFrame} from '../assets/room/framing.js';
test('framing enlarges the complete dollhouse to 93% without changing the 16:9 game aspect',()=>{
 const frame=roomFrame();assert.equal(frame.zoom,1.25);
 assert.ok(358/frame.width>.90&&358/frame.width<.95);
 assert.equal(frame.width/frame.height,GAME_SIZE.width/GAME_SIZE.height);
 // Complete crown, floor edge and stepped cast shadow stay inside the camera.
 assert.ok(frame.left<61&&frame.left+frame.width>419);
 assert.ok(frame.top<51&&frame.top+frame.height>252);
});
test('edge-placed purchased decorations fit without mutating their saved geometry',()=>{
 const bounds=[{left:41,right:99,top:83,bottom:111},{left:381,right:439,top:219,bottom:238}];
 const original=JSON.stringify(bounds),frame=roomFrame(bounds);
 assert.equal(JSON.stringify(bounds),original);
 for(const b of bounds){assert.ok(b.left>=frame.left+4-1e-9);assert.ok(b.right<=frame.left+frame.width-4+1e-9);assert.ok(b.top>=frame.top+4-1e-9);assert.ok(b.bottom<=frame.top+frame.height-4+1e-9);}
 assert.ok(Math.abs(frame.width/frame.height-16/9)<1e-9);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {loadState,KEYS,write,purchase,defaultPositions} from '../assets/room/state.js';
import {toWorld,toPercent,safeSpawn,canStand,move} from '../assets/room/geometry.js';
const memory=values=>({getItem:key=>values[key]??null,setItem:(key,value)=>values[key]=value});
test('legacy string purchases, coins and percent positions survive load and save',()=>{
 const positions={avatar:{x:61,y:82},decor:{...defaultPositions().decor,plant:{x:75,y:66}}};
 const raw={[KEYS.room]:JSON.stringify({coins:35,owned:['plant','rug']}),[KEYS.positions]:JSON.stringify(positions),[KEYS.avatar]:JSON.stringify({hairStyle:4,shirt:5})};
 const before=JSON.stringify(raw),storage=memory(raw),state=loadState(storage);
 assert.equal(JSON.stringify(raw),before,'loading must not overwrite any saves');
 assert.deepEqual(state.room,{coins:35,owned:['plant','rug']});assert.deepEqual(state.positions,positions);assert.equal(state.avatar.hairStyle,4);
 write(storage,KEYS.positions,state.positions);assert.deepEqual(loadState(storage).positions,positions);
});
test('purchases charge once, enforce funds, survive refresh, and preserve avatar JSON',()=>{
 const raw={[KEYS.avatar]:'{"accessory":4}'};const storage=memory(raw),state=loadState(storage);
 assert.equal(purchase(state.room,'plant'),true);assert.equal(state.room.coins,105);
 assert.equal(purchase(state.room,'plant'),false);assert.equal(purchase(state.room,'unknown'),false);
 write(storage,KEYS.room,state.room);assert.deepEqual(loadState(storage).room,{coins:105,owned:['plant']});
 assert.equal(raw[KEYS.avatar],'{"accessory":4}');
 assert.equal(purchase({coins:0,owned:[]},'rug'),false);
});
test('invalid/partial data stays finite and unavailable storage remains usable',()=>{
 const raw={[KEYS.positions]:JSON.stringify({avatar:{x:null,y:'oops'},decor:{plant:null}}),[KEYS.room]:'broken JSON'};
 assert.deepEqual(loadState(memory(raw)).positions,defaultPositions());
 const unavailable={getItem:()=>{throw Error('denied')},setItem:()=>{throw Error('denied')}};
 assert.equal(loadState(unavailable).room.coins,150);assert.equal(write(unavailable,KEYS.room,{}),false);
});
test('legacy coordinates round trip without destructive migration',()=>{
 for(const decor of [false,true])for(const p of [{x:50,y:76},{x:8,y:47},{x:92,y:94}]){
  const actual=toPercent(toWorld(p,decor),decor);assert.ok(Math.abs(actual.x-p.x)<1e-9);assert.ok(Math.abs(actual.y-p.y)<1e-9);
 }
});
test('avatar spawns safely and movement cannot tunnel through bed, desk or room bounds',()=>{
 assert.equal(canStand(120,190),false);assert.equal(canStand(300,160),false);
 const saved={x:120,y:190},spawn=safeSpawn(saved);assert.ok(canStand(spawn.x,spawn.y));assert.deepEqual(saved,{x:120,y:190});
 const from={x:200,y:200},after=move(from,-200,0);assert.ok(after.x>=166);assert.ok(canStand(after.x,after.y));
 const desk=move({x:300,y:210},0,-200);assert.ok(desk.y>=177);
 const edge=move({x:240,y:210},9999,0);assert.ok(edge.x<=405);assert.ok(canStand(edge.x,edge.y));
 assert.deepEqual(move(from,0,0),from);
});

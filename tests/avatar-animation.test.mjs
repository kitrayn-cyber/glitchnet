import test from 'node:test';
import assert from 'node:assert/strict';
import {AvatarAnimation} from '../assets/room/animation.js';
import {normalizeAvatar,poseForFrame,FRAMES_PER_DIRECTION} from '../assets/room/avatar.js';
test('actual displacement selects all four views and keeps diagonal facing stable',()=>{
 const a=new AvatarAnimation();
 for(const [x,y,dir] of [[1,0,'right'],[-1,0,'left'],[0,-1,'up'],[0,1,'down']])assert.equal(a.update(x,y,16).direction,dir);
 a.update(-1,0,16);assert.equal(a.update(-1,-1,16).direction,'left');
});
test('stride progresses with distance, eases in/out and preserves facing while idle',()=>{
 const a=new AvatarAnimation(),frames=new Set();
 for(let n=0;n<40;n++)frames.add(a.update(1,0,16).frame);
 assert.ok(frames.size>=8);assert.equal(a.blend,1);
 a.update(0,0,16);assert.ok(a.blend>0&&a.blend<1);
 for(let n=0;n<20;n++)a.update(0,0,16);
 assert.equal(a.blend,0);assert.equal(a.direction,'right');
});
test('idle breathes and blinks; reduced motion holds a neutral frame',()=>{
 const a=new AvatarAnimation(),idle=new Set();for(let n=0;n<300;n++)idle.add(a.update(0,0,16).frame);
 assert.ok(idle.has(0)&&idle.has(1)&&idle.has(2));
 assert.equal(a.update(-1,0,16,true).frame,FRAMES_PER_DIRECTION);
});
test('all studio option ranges survive and gait has opposing symmetric poses',()=>{
 const state={skin:5,hairColor:6,shirt:6,eyes:4,hairStyle:5,outfit:3,accessory:4,background:5};assert.deepEqual(normalizeAvatar(state),state);
 assert.equal(normalizeAvatar({eyes:99}).eyes,0);
 assert.equal(poseForFrame(14).swing,-poseForFrame(18).swing);
 for(let n=4;n<20;n++){assert.equal(poseForFrame(n).blink,false);assert.equal(poseForFrame(n).breath,0);}
});

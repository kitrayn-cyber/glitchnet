import test from 'node:test';
import assert from 'node:assert/strict';
import {composeBlink,isEyeRegion} from '../assets/avatar/blink.js';
test('blink replaces eye pixels while retaining matched hair and all unrelated pixels',()=>{
 const width=320,height=320,base=new Uint8ClampedArray(width*height*4),closed=new Uint8ClampedArray(base.length).fill(200),original=new Uint8ClampedArray(base.length),hairMask=new Uint8ClampedArray(base.length);
 const pixel=(x,y)=>(y*width+x)*4;
 const hair=pixel(140,115),eyeliner=pixel(141,115),iris=pixel(170,120),outside=pixel(50,50);
 original.set([220,90,150,255],hair);hairMask.set([220,90,150,255],hair);
 original.set([20,10,20,255],eyeliner);original.set([60,110,170,255],iris);
 const tintMask=new Uint8Array(width*height);const tintedHair=pixel(145,117);tintMask[117*width+145]=1;
 const result=composeBlink(base,closed,original,hairMask,width,height,tintMask);
 assert.equal(result[tintedHair],0);
 assert.ok(isEyeRegion(140,115));assert.equal(result[hair],0);assert.equal(result[eyeliner],200);assert.equal(result[iris],200);assert.equal(result[outside],0);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(!isEyeRegion(x,y)){const i=pixel(x,y);assert.deepEqual(result.subarray(i,i+4),base.subarray(i,i+4));}
});

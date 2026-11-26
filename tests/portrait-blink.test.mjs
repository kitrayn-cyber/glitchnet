import test from 'node:test';
import assert from 'node:assert/strict';
import {composeBlink,isEyeRegion} from '../assets/avatar/blink.js';
test('blink retains every pixel outside the eyes and protects hair and its outline',()=>{
 const width=320,height=320,base=new Uint8ClampedArray(width*height*4),closed=new Uint8ClampedArray(base.length).fill(200),original=new Uint8ClampedArray(base.length);
 const pixel=(x,y)=>(y*width+x)*4;
 const hair=pixel(140,115),outline=pixel(141,115),eye=pixel(170,120),outside=pixel(50,50);
 original.set([220,90,150,255],hair);original.set([20,10,20,255],outline);original.set([180,140,130,255],eye);
 const result=composeBlink(base,closed,original,width,height);
 assert.ok(isEyeRegion(140,115));assert.equal(result[hair],0);assert.equal(result[outline],0);assert.equal(result[eye],200);assert.equal(result[outside],0);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(!isEyeRegion(x,y)){const i=pixel(x,y);assert.deepEqual(result.subarray(i,i+4),base.subarray(i,i+4));}
});

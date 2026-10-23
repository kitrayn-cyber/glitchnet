import {drawRoom} from './art.js';
import {createWalkingAvatar} from './avatar.js?v=3';
import {AvatarAnimation} from './animation.js?v=3';
import {furniture,toWorld,toPercent,move,safeSpawn} from './geometry.js';

export function mountRoom(host,options) {
 return new Promise((resolve,reject)=>{
  let game,ready=false;
  const cleanup=[];
  const timer=setTimeout(()=>{if(!ready){game?.destroy(true);reject(new Error('Room renderer timed out'));}},10000);
  const on=(el,type,fn,opts)=>{el.addEventListener(type,fn,opts);cleanup.push(()=>el.removeEventListener(type,fn,opts));};
  class Room extends Phaser.Scene {
   constructor(){super('GlitchNetRoom');this.held=new Set();this.target=null;this.mode='walk';this.selected=null;this.lastSaved='';}
   create(){
    try {
     drawRoom(this);
     const wardrobe=this.add.graphics();wardrobe.fillStyle(0xb79ac6);wardrobe.fillRect(395,89,17,43);wardrobe.fillStyle(0xe3c7dc);wardrobe.fillRect(397,91,13,38);wardrobe.fillStyle(0xffe4a5);wardrobe.fillRect(404,111,2,3);
     createWalkingAvatar(this,options.state.avatar);
     this.shadow=this.add.ellipse(0,0,18,5,0x9f85aa,.23).setDepth(5);
     this.player=this.add.sprite(0,0,'walker',0).setOrigin(.5,1).setDepth(10);
     this.animation=new AvatarAnimation();this.decor=new Map();this.sync(options.state.positions,options.state.room.owned);
     for(const f of furniture)this.add.zone(f.x+f.w/2,f.y+f.h/2,f.w,f.h).setInteractive({useHandCursor:true}).on('pointerdown',pointer=>{
      if(this.mode==='decorate')return;
      pointer.event.stopPropagation();this.target=null;options.action(f.id);this.furnitureClick=true;
     });
     this.input.on('pointerdown',pointer=>{
      this.game.canvas.focus({preventScroll:true});
      // Phaser's gameobject event runs before the scene pointer event.
      if(this.furnitureClick){this.furnitureClick=false;return;}
      const p={x:pointer.x,y:pointer.y};
      if(this.mode==='decorate'){
       if(this.selected)options.place(this.selected,toPercent(p,true));else options.status('Select an owned decoration below, then click the room to place it.');
      } else this.target=safeSpawn(p);
     });
     const canvas=this.game.canvas;canvas.tabIndex=0;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Your GlitchNet pixel room. Focus to move with WASD or arrow keys. Press E near furniture.');
     const recognized=new Set(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD','KeyE']);
     on(canvas,'keydown',e=>{if(!recognized.has(e.code)||e.ctrlKey||e.metaKey||e.altKey)return;e.preventDefault();if(e.code==='KeyE'){if(!e.repeat)this.interact();return;}this.target=null;this.held.add(e.code);});
     on(canvas,'keyup',e=>{if(recognized.has(e.code)){e.preventDefault();this.held.delete(e.code);}});
     on(canvas,'blur',()=>this.stop());on(window,'blur',()=>this.stop());
     on(document,'visibilitychange',()=>{if(document.hidden)this.stop();});
     on(window,'pagehide',()=>this.savePosition());
     this.game.events.on('destroy',()=>{this.stop();cleanup.splice(0).forEach(fn=>fn());clearTimeout(timer);});
     ready=true;clearTimeout(timer);
     resolve({sync:(p,owned)=>this.sync(p,owned),mode:(mode,id)=>{this.mode=mode;this.selected=id;this.stop();},step:(dx,dy)=>{this.target=null;const before={x:this.player.x,y:this.player.y};this.moveBy(dx,dy);const pose=this.animation.update(this.player.x-before.x,this.player.y-before.y,50);this.player.setFrame(pose.frame);this.savePosition();},hold:(code,down)=>{this.target=null;if(down)this.held.add(code);else{this.held.delete(code);this.savePosition();}},pause:()=>this.stop(),destroy:()=>game.destroy(true)});
    }catch(error){clearTimeout(timer);game?.destroy(true);reject(error);}
   }
   sync(positions,owned){
    const p=safeSpawn(toWorld(positions.avatar));this.player.setPosition(p.x,p.y);this.target=null;
    for(const object of this.decor.values())object.destroy();this.decor.clear();
    for(const id of owned){
     const p=toWorld(positions.decor[id],true),g=this.add.graphics().setPosition(p.x,p.y).setDepth(id==='rug'?2:6);
     const rect=(x,y,w,h,c)=>{g.fillStyle(c);g.fillRect(x,y,w,h);};
     if(id==='poster'){rect(-10,-25,20,25,0x9d82b4);rect(-8,-23,16,21,0xb6d3ea);rect(-1,-20,2,13,0xffedaf);rect(-6,-15,12,3,0xffedaf);}
     if(id==='plant'){rect(-7,-9,14,9,0xc99fbb);rect(-1,-26,2,18,0x7d9f85);rect(-9,-25,8,6,0x9fc49c);rect(1,-29,8,6,0x8bb58e);}
     if(id==='rug'){rect(-29,-9,58,18,0xd3a7ca);rect(-26,-7,52,14,0xf4d7e6);rect(-22,-5,44,10,0xd4b5dc);}
     if(id==='lamp'){rect(-8,-3,16,3,0xa58ab6);rect(-1,-30,2,27,0xa58ab6);rect(-9,-34,18,9,0xffe3a9);rect(-6,-38,12,4,0xffe3a9);}
     g.setInteractive(new Phaser.Geom.Rectangle(id==='rug'?-29:-11,id==='rug'?-9:-38,id==='rug'?58:22,id==='rug'?18:38),Phaser.Geom.Rectangle.Contains).on('pointerdown',()=>{
      if(this.mode==='decorate'){this.furnitureClick=true;options.select(id);}
     });this.decor.set(id,g);
    }
    this.lastSaved=JSON.stringify(toPercent(this.player));this.refreshDOM();
   }
   moveBy(dx,dy){const p=move({x:this.player.x,y:this.player.y},dx,dy);this.player.setPosition(p.x,p.y);this.refreshDOM();}
   refreshDOM(){
    this.shadow.setPosition(this.player.x,this.player.y-1);
    host.dataset.avatarX=this.player.x.toFixed(2);host.dataset.avatarY=this.player.y.toFixed(2);
    host.dataset.owned=[...this.decor.keys()].join(',');
   }
   savePosition(){if(!this.player)return;const p=toPercent(this.player);const key=JSON.stringify(p);if(key!==this.lastSaved){this.lastSaved=key;options.position(p);}}
   stop(){this.held.clear();this.target=null;this.savePosition();}
   nearest(){return furniture.map(f=>({f,d:Phaser.Math.Distance.Between(this.player.x,this.player.y,f.x+f.w/2,f.y+f.h)})).sort((a,b)=>a.d-b.d)[0];}
   interact(){const near=this.nearest();if(near.d<55)options.action(near.f.id);else options.status('Walk closer to furniture, or use the buttons below the room.');}
   update(time,delta){
    if(!ready||host.hidden||document.hidden)return;
    const held=this.held;let dx=Number(held.has('KeyD')||held.has('ArrowRight'))-Number(held.has('KeyA')||held.has('ArrowLeft'));
    let dy=Number(held.has('KeyS')||held.has('ArrowDown'))-Number(held.has('KeyW')||held.has('ArrowUp'));
    if(this.mode==='decorate'){dx=0;dy=0;}
    if(!dx&&!dy&&this.target){dx=this.target.x-this.player.x;dy=this.target.y-this.player.y;if(Math.hypot(dx,dy)<2){this.target=null;dx=dy=0;}}
    const length=Math.hypot(dx,dy),distance=Math.min(65*Math.min(delta,50)/1000,this.target?length:Infinity);
    const animationStart={x:this.player.x,y:this.player.y};
    if(length){const before={x:this.player.x,y:this.player.y};this.moveBy(dx/length*distance,dy/length*distance);if(this.target&&Math.hypot(this.player.x-before.x,this.player.y-before.y)<.01)this.target=null;this.moving=true;}
    else if(this.moving){this.savePosition();this.moving=false;}
    const pose=this.animation.update(this.player.x-animationStart.x,this.player.y-animationStart.y,delta,matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.player.setFrame(pose.frame);host.dataset.avatarDirection=pose.direction;host.dataset.avatarFrame=String(pose.frame);host.dataset.avatarWalking=String(pose.walking);
    if(this.mode==='walk'){const near=this.nearest();options.hint(near.d<55?'E · '+near.f.label:'WASD / arrows to walk · E to interact · click the floor to walk');}
   }
  }
  try{
   game=new Phaser.Game({type:Phaser.CANVAS,parent:host,width:480,height:270,backgroundColor:'#e8dff0',pixelArt:true,roundPixels:true,input:{keyboard:false},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:Room});
  }catch(error){clearTimeout(timer);game?.destroy(true);reject(error);}
 });
}

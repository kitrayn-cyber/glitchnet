import {KEYS,ITEMS,loadState,write,purchase,defaultPositions,normalizePoint} from './state.js';
const $=id=>document.getElementById(id);
let storage;try{storage=window.localStorage;}catch{storage={getItem:()=>null,setItem:()=>{throw new Error('Storage unavailable');}};}
let state=loadState(storage),engine=null,mode='walk',selection=null;
const scene=$('room-scene'),host=$('phaser-room'),status=$('status');
const say=text=>status.textContent=text;
const activeEngine=()=>engine&&scene.classList.contains('phaser-active');
let backedUp=false;
function persist(key,value){
 if(!backedUp){
  // Keep original JSON, including legacy percentage coordinates, before the first edit.
  try{if(storage.getItem('glitchnet-room-backup-v1')===null)storage.setItem('glitchnet-room-backup-v1',JSON.stringify({room:storage.getItem(KEYS.room),positions:storage.getItem(KEYS.positions)}));backedUp=true;}catch{}
 }
 const ok=write(storage,key,value);if(!ok)say('Your changes work for this visit, but this browser could not save them.');return ok;
}
function savePosition(p){state.positions.avatar=normalizePoint(p,state.positions.avatar,47);persist(KEYS.positions,state.positions);}
function refresh(){
 $('coins').textContent='🪙 '+state.room.coins+' GlitchCoins';
 $('play-sprite').style.left=state.positions.avatar.x+'%';$('play-sprite').style.top=state.positions.avatar.y+'%';
 $('shop').replaceChildren();$('owned-decor').replaceChildren();
 for(const item of ITEMS){
  const owned=state.room.owned.includes(item.id),pos=state.positions.decor[item.id];
  const decor=$('move-'+item.id);decor.style.display=owned?'block':'none';decor.style.left=pos.x+'%';decor.style.top=pos.y+'%';decor.classList.toggle('placing',selection===item.id);
  $('decor-'+item.id).style.display=owned?'':'none';
  const cell=document.createElement('div');cell.className='item';
  const label=document.createElement('span');label.textContent=item.icon+' '+item.name;
  const button=document.createElement('button');button.type='button';button.textContent=owned?'Owned ✓':item.cost+' 🪙';button.setAttribute('aria-label',owned?item.name+' owned':'Buy '+item.name+' for '+item.cost+' GlitchCoins');button.disabled=owned||state.room.coins<item.cost;
  button.onclick=()=>{if(!purchase(state.room,item.id))return;const saved=persist(KEYS.room,state.room);refresh();if(saved)say('★ '+item.name+' added to your room! Choose Decorate to place it.');};
  cell.append(label,button);$('shop').append(cell);
  if(owned){const b=document.createElement('button');b.type='button';b.textContent=item.icon+' '+item.name;b.setAttribute('aria-pressed',String(selection===item.id));b.onclick=()=>select(item.id);$('owned-decor').append(b);}
 }
 engine?.sync(state.positions,state.room.owned);
}
function setMode(next,id=null){
 mode=next;selection=id;scene.classList.add('is-playing');
 $('walk-mode').classList.toggle('active',mode==='walk');$('decorate-mode').classList.toggle('active',mode==='decorate');
 $('walk-mode').setAttribute('aria-pressed',String(mode==='walk'));$('decorate-mode').setAttribute('aria-pressed',String(mode==='decorate'));
 $('play-hint').textContent=mode==='walk'?'Focus the room to walk with WASD / arrows.':'Select an owned decoration below, then click the room to place it.';
 engine?.mode(mode,selection);
 for(const item of ITEMS)$('move-'+item.id).classList.toggle('placing',selection===item.id);
 [...$('owned-decor').children].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent.includes(ITEMS.find(i=>i.id===id)?.name||'__none__'))));
}
function select(id){if(!state.room.owned.includes(id))return;setMode('decorate',id);say('★ Place '+ITEMS.find(i=>i.id===id).name+' by clicking the room.');}
function place(id,p){if(!state.room.owned.includes(id))return;state.positions.decor[id]=normalizePoint(p,state.positions.decor[id]);const saved=persist(KEYS.positions,state.positions);setMode('decorate');refresh();if(saved)say('★ Decoration moved! Your layout was saved.');}
const messages={bed:'Your cozy bed! Rest mode and dreams are coming later. 🌙',computer:'Your GlitchNet computer! A little corner for your profile and creative projects. ☕',pet:'Your future pet corner! More little companions can move in later. 🐾',shelf:'Books, a sleepy cat plushie, and a few favorite little things. ♡',window:'Soft clouds, warm light, and room for a daydream. ✧'};
function action(id){
 if(id==='wardrobe'||id==='door'){
  engine?.pause();persist(KEYS.positions,state.positions);
  // Embedded home uses the same room, with navigation leaving the frame.
  window.top.location.href=new URL(id==='wardrobe'?'avatar.html':'map.html',location.href).href;
 }else say(messages[id]||'Welcome to your GlitchNet room.');
}
$('walk-mode').onclick=()=>setMode('walk');$('decorate-mode').onclick=()=>setMode('decorate');
$('reset-layout').onclick=()=>{engine?.pause();state.positions=defaultPositions();const saved=persist(KEYS.positions,state.positions);refresh();setMode('walk');if(saved)say('★ Positions reset! Your coins and purchased items are safe.');};
for(const [id,dx,dy,code] of [['step-left',-9,0,'ArrowLeft'],['step-right',9,0,'ArrowRight'],['step-up',0,-8,'ArrowUp'],['step-down',0,8,'ArrowDown']]){
 const b=$(id);let down=false;
 const release=()=>{if(!down)return;down=false;engine?.hold(code,false);};
 b.addEventListener('pointerdown',e=>{e.preventDefault();setMode('walk');if(activeEngine()){down=true;try{b.setPointerCapture(e.pointerId);}catch{}engine.hold(code,true);}else{savePosition({x:state.positions.avatar.x+dx,y:state.positions.avatar.y+dy});refresh();}});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,release);
 b.addEventListener('click',e=>{if(e.detail!==0)return;setMode('walk');if(activeEngine())engine.step(dx*2,dy);else{savePosition({x:state.positions.avatar.x+dx,y:state.positions.avatar.y+dy});refresh();}});
}
for(const item of ITEMS){const el=$('move-'+item.id);el.onclick=e=>{e.stopPropagation();select(item.id);};el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(item.id);}};}
scene.addEventListener('click',e=>{
 if(activeEngine()||e.target.closest('[data-action],.play-decor,#phaser-room'))return;
 const bounds=scene.getBoundingClientRect(),p={x:(e.clientX-bounds.left)/bounds.width*100,y:(e.clientY-bounds.top)/bounds.height*100};
 if(mode==='decorate'){if(selection)place(selection,p);else say('Select an owned decoration first.');}
 else{savePosition(p);refresh();}
});
document.querySelectorAll('[data-action]').forEach(el=>{el.addEventListener('click',()=>action(el.dataset.action));if(el.tagName!=='BUTTON')el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();action(el.dataset.action);}});});
const art=$('room-illustration');const showArt=()=>{if(art.naturalWidth>0)scene.classList.add('has-art');};art.addEventListener('load',showArt);showArt();
// The old view remains usable with the saved portrait if the game library cannot load.
try{const pfp=storage.getItem(KEYS.pfp);if(/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(pfp||'')){const img=document.createElement('img');img.src=pfp;img.alt='Your saved pixel avatar';img.width=38;img.height=38;$('play-sprite').replaceChildren(img);}}catch{}
refresh();setMode('walk');
let starting=false;
async function enablePhaser(){
 if(starting)return;starting=true;
 try{
  if(!window.Phaser)throw new Error('Phaser did not load');
  const {mountRoom}=await import('./engine.js?v=3');
  engine=await mountRoom(host,{storage,state,action,position:savePosition,place,select,status:say,hint:text=>{if(mode==='walk')$('play-hint').textContent=text;}});
  scene.classList.add('phaser-active');scene.dataset.renderer='phaser';$('toggle-renderer').textContent='Use illustrated room';
 }catch(error){host.replaceChildren();host.hidden=true;scene.dataset.renderer='illustrated';$('toggle-renderer').disabled=true;say('The illustrated room is ready. Your shop, saved layout and avatar still work.');console.warn('GlitchNet room fallback:',error.message);}
}
$('toggle-renderer').onclick=()=>{
 if(!engine)return;
 const active=scene.classList.toggle('phaser-active');host.hidden=!active;engine.pause();scene.dataset.renderer=active?'phaser':'illustrated';$('toggle-renderer').textContent=active?'Use illustrated room':'Use pixel room';
};
if(new URLSearchParams(location.search).get('renderer')!=='classic')enablePhaser();else{$('toggle-renderer').hidden=true;host.hidden=true;scene.dataset.renderer='illustrated';}
// Keep the embedded home in sync with edits from another GlitchNet tab.
window.addEventListener('storage',event=>{if(!Object.values(KEYS).includes(event.key))return;location.reload();});
if(new URLSearchParams(location.search).get('embed')==='1'){
 document.documentElement.classList.add('embedded-room');
 const report=()=>parent.postMessage({type:'glitchnet-room-size',height:Math.ceil(document.body.getBoundingClientRect().height)},location.origin);
 new ResizeObserver(report).observe(document.body);window.addEventListener('load',report);
 window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==parent)return;if(event.data?.type==='glitchnet-room-pause')engine?.pause();if(event.data?.type==='glitchnet-room-measure')report();});
}

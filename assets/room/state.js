// Existing storage contracts stay in percent coordinates, independent of renderer.
export const KEYS = { room: 'glitchnet-room-v1', positions: 'glitchnet-room-positions-v1', avatar: 'glitchnet-avatar-v1', pfp: 'glitchnet-pfp-v1' };
export const ITEMS = [
  {id:'poster',name:'Star Poster',icon:'🌟',cost:30},
  {id:'plant',name:'Leafy Plant',icon:'🪴',cost:45},
  {id:'rug',name:'Cloud Rug',icon:'🩷',cost:55},
  {id:'lamp',name:'Cozy Lamp',icon:'💡',cost:35}
];
export const clamp = (n,min,max) => Math.min(max,Math.max(min,n));
const number = (n,f) => typeof n === 'number' && Number.isFinite(n) ? n : f;
export const defaultPositions = () => ({avatar:{x:50,y:76},decor:{poster:{x:20,y:70},plant:{x:82,y:77},rug:{x:52,y:86},lamp:{x:30,y:60}}});
function read(storage,key) { try { return JSON.parse(storage.getItem(key) || 'null'); } catch { return null; } }
export function normalizePoint(p,f,minY=42) {
  return {x:clamp(number(p?.x,f.x),8,92),y:clamp(number(p?.y,f.y),minY,94)};
}
export function loadState(storage) {
  const prior=read(storage,KEYS.room), old=read(storage,KEYS.positions), positions=defaultPositions();
  const room={coins:150,owned:[]};
  if(prior && Number.isFinite(prior.coins) && Array.isArray(prior.owned)) {
    room.coins=Math.max(0,prior.coins);
    // Purchases have always been string IDs, not objects with an .id property.
    room.owned=[...new Set(prior.owned.filter(id=>ITEMS.some(item=>item.id===id)))];
  }
  positions.avatar=normalizePoint(old?.avatar,positions.avatar,47);
  for(const item of ITEMS) positions.decor[item.id]=normalizePoint(old?.decor?.[item.id],positions.decor[item.id]);
  return {room,positions,avatar:read(storage,KEYS.avatar)};
}
export function write(storage,key,value) { try { storage.setItem(key,JSON.stringify(value)); return true; } catch { return false; } }
export function purchase(room,id) {
  const item=ITEMS.find(item=>item.id===id);
  if(!item || room.owned.includes(id) || room.coins<item.cost) return false;
  room.coins-=item.cost; room.owned.push(id); return true;
}

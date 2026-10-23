// Embed the same room page: one shop, one save adapter, no style/global collisions.
const frame=document.getElementById('profile-room');
const section=document.getElementById('home');
if(frame&&section){
 window.addEventListener('message',event=>{
  if(event.origin!==location.origin || event.source!==frame.contentWindow || event.data?.type!=='glitchnet-room-size')return;
  const height=event.data.height;if(typeof height==='number'&&Number.isFinite(height)&&height>=200&&height<=5000)frame.style.height=Math.ceil(height)+'px';
 });
 const measure=()=>frame.contentWindow?.postMessage({type:'glitchnet-room-measure'},location.origin);
 frame.addEventListener('load',measure);measure();
 // Existing navigation hides sections inside its click handlers. Run after those handlers.
 document.addEventListener('click',()=>{
  if(section.hidden)frame.contentWindow?.postMessage({type:'glitchnet-room-pause'},location.origin);
 });
}

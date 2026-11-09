// Map-only presentation. No account, room, currency or inventory storage is read or written.
const locations={
 academy:{name:'Glitch Academy',description:'A magical school on the hill, with starlit lessons and wonderfully strange homework.',status:'Coming Soon · This destination is still being built.'},
 lab:{name:'Gura’s Lab',description:'Copper coils, glowing experiments and some very curious bubbling noises.',status:'Coming Soon · This destination is still being built.'},
 mall:{name:'Avatar Mall',description:'Visit Avatar Studio to customize your hair, outfit, accessories and pixel profile picture.',status:'Open · Avatar Studio is ready to explore.'},
 arcade:{name:'The Arcade',description:'A star-bright amusement hall for future games and one-more-round adventures.',status:'Coming Soon · This destination is still being built.'},
 cats:{name:'Cat Archive / Cat Café',description:'The Cat Gallery is open. Come browse a little museum of internet cats.',status:'Open · The Cat Gallery is waiting for you.'},
 home:{name:'My Home',description:'Your playable pixel bedroom, saved decorations, GlitchCoins and familiar little things.',status:'Open · Enter your existing room.'},
 park:{name:'Pet Park',description:'A cheerful garden reserved for future pets, brushing, playdates and muddy paws.',status:'Coming Soon · Future pets will feel at home here.'}
};
const notice=document.getElementById('notice');
function describe(id){const place=locations[id];if(!place)return;document.getElementById('journal-name').textContent=place.name;document.getElementById('journal-description').textContent=place.description;document.getElementById('journal-status').textContent=place.status;}
function clearActive(){document.querySelectorAll('.spot[data-active]').forEach(el=>el.removeAttribute('data-active'));}
document.querySelectorAll('[data-location]').forEach(el=>{
 el.addEventListener('pointerenter',()=>{clearActive();el.removeAttribute('data-dismissed');describe(el.dataset.location);});
 el.addEventListener('focus',()=>{clearActive();el.removeAttribute('data-dismissed');describe(el.dataset.location);});
});
document.querySelectorAll('[data-future]').forEach(el=>el.addEventListener('click',()=>{
 clearActive();describe(el.dataset.location);
 const spot=document.querySelector('.spot[data-location="'+el.dataset.location+'"]');
 spot.removeAttribute('data-dismissed');spot.dataset.active='true';
 notice.textContent='✦ '+el.dataset.future+' is under construction! Come back later. Your current destinations are still open.';
}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){clearActive();document.querySelectorAll('.spot').forEach(el=>el.dataset.dismissed='true');}});
document.addEventListener('pointerdown',event=>{if(!event.target.closest('[data-location]'))clearActive();});
const found=new Set();
const secrets={pond:'Ribbit! The pond’s smallest resident wishes you a very good adventure.',star:'You found a wishing star! Make a wish for something delightfully strange.'};
document.querySelectorAll('[data-secret]').forEach(el=>el.addEventListener('click',()=>{
 const id=el.dataset.secret;found.add(id);el.dataset.found='true';notice.textContent=secrets[id];document.getElementById('discovery-count').textContent=found.size+' of 2 secrets found';
}));

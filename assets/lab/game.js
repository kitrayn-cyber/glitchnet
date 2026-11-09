import {REAGENTS,RECIPES,keyOf,outcome,hint,loadJournal,saveJournal} from './chemistry.mjs';
import {startScene} from './scene.js';
const $=id=>document.getElementById(id);
let ids=[],finished=false,mood='neutral',result=null,attempts=new Map(),found=new Set(),saveOK=true;
try{found=loadJournal(localStorage);}catch{saveOK=false;}
const scene=startScene($('scene'),()=>({mood,result,ids}));
function speak(expression,line){mood=expression;$('mood').textContent='GURA · '+expression.toUpperCase();$('dialogue').textContent='“'+line+'”';$('pose').textContent={neutral:'quietly judging your methodology',annoyed:'reconsidering his open-door policy',curious:'paying very close attention',surprised:'temporarily out of sarcastic remarks',impressed:'reluctantly acknowledging the evidence',alarmed:'monitoring an avoidable pressure spike'}[mood];scene.redraw();}
function update(){
 $('mixtureCount').textContent=ids.length+' / 3 INGREDIENTS';$('react').disabled=ids.length<2||finished;
 $('liquid').style.height=ids.length?(25+ids.length*16)+'%':'0';
 if(!finished){$('liquid').style.background=ids.length?blend(ids):'#b8d7a6';$('mixTitle').textContent=ids.length?'A hypothesis in progress.':'An empty flask. Endless possibilities.';$('mixDescription').textContent=ids.length?'Add another reagent, or begin the reaction.':'Choose two or three reagents from the shelf.';}
 $('chips').replaceChildren(...ids.map(id=>{const c=document.createElement('span');c.className='chip';c.textContent=REAGENTS.find(r=>r.id===id).name;return c;}));
 $('dropZone').className='panel mixing'+(ids.length?' active':'')+(result?' result-'+result.id:'');
 $('count').textContent=found.size+'/5';$('discoveryHint').textContent=(5-found.size)+' discoveries waiting to happen';
 document.querySelectorAll('.reagent').forEach(b=>b.setAttribute('aria-pressed',String(ids.includes(b.dataset.id))));scene.redraw();
}
function blend(list){const sums=[0,0,0];list.forEach(id=>{const h=REAGENTS.find(r=>r.id===id).color;[1,3,5].forEach((pos,i)=>sums[i]+=parseInt(h.slice(pos,pos+2),16));});return '#'+sums.map(n=>Math.round(n/list.length).toString(16).padStart(2,'0')).join('');}
function add(id){
 if(!REAGENTS.some(r=>r.id===id))return;
 if(finished){speak('neutral','Reset the flask first. One experiment at a time is a surprisingly useful rule.');return;}
 if(ids.includes(id)){speak('annoyed','One measured portion is sufficient. Repetition is not a catalyst.');return;}
 if(ids.length===3){speak('annoyed','Three ingredients. That is the flask’s limit, not a personal challenge.');return;}
 ids.push(id);speak(...hint(ids));update();
}
REAGENTS.forEach((r,i)=>{const b=document.createElement('button');b.className='reagent';b.dataset.id=r.id;b.draggable=true;b.style.setProperty('--color',r.color);b.setAttribute('aria-label',`${r.name}: ${r.property} Add to flask. Shortcut ${i+1}.`);b.title=r.property;b.innerHTML=`<span class="key">${i+1}</span><span class="bottle" aria-hidden="true"></span><strong>${r.name}</strong><small>${['LIGHT','REFLECT','GROWTH','LIFT','WARMTH','SHADOW','CATALYST'][i]}</small>`;b.onclick=()=>add(r.id);b.ondragstart=e=>{e.dataTransfer.setData('text/plain',r.id);e.dataTransfer.effectAllowed='copy';};$('reagents').append(b);});
$('dropZone').ondragover=e=>{e.preventDefault();$('dropZone').classList.add('dragging');};$('dropZone').ondragleave=()=> $('dropZone').classList.remove('dragging');$('dropZone').ondrop=e=>{e.preventDefault();$('dropZone').classList.remove('dragging');add(e.dataTransfer.getData('text/plain'));};
function react(){if(finished||ids.length<2)return;result=outcome(ids);finished=true;const key=keyOf(ids),n=(attempts.get(key)||0)+1;attempts.set(key,n);
 let line=result.line;if(!result.success&&n>1)line=n===2?'The same ingredients, the same result. Reproducibility: excellent. Judgment: pending.':'We have confirmed this failure '+n+' times. Perhaps test a different hypothesis.';
 speak(!result.success&&n>1?'annoyed':result.reaction,line);if(result.success){found.add(result.id);try{saveOK=saveJournal(localStorage,found);}catch{saveOK=false;}}
 update();$('liquid').style.background=result.color;$('mixTitle').textContent=result.name;$('mixDescription').textContent=result.description+(result.success?' Recorded in your journal.':'');}
function reset(){ids=[];finished=false;result=null;speak('neutral','Clean flask. Fresh hypothesis. An encouraging order of operations.');update();}
$('react').onclick=react;$('reset').onclick=reset;
function openJournal(){ $('journalStatus').textContent=`${found.size} of 5 discoveries recorded. `+(saveOK?'Saved in this browser.':'Browser storage is unavailable; discoveries last for this visit.');$('entries').replaceChildren(...RECIPES.map(r=>{const el=document.createElement('article');el.className='entry'+(found.has(r.id)?'':' locked');const icon=document.createElement('span');icon.className='entry-icon';icon.style.color=r.color;icon.textContent=found.has(r.id)?'✧':'?';const div=document.createElement('div'),h=document.createElement('h3'),p=document.createElement('p');h.textContent=found.has(r.id)?r.name:'Undiscovered experiment';p.textContent=found.has(r.id)?r.appearance+' '+r.description:'Keep experimenting. Gura has observations.';div.append(h,p);if(found.has(r.id)){const s=document.createElement('small');s.textContent=r.ingredients.map(id=>REAGENTS.find(x=>x.id===id).name).join(' + ');div.append(s);}el.append(icon,div);return el;}));$('journal').showModal();}
$('journalTop').onclick=openJournal;$('journalBottom').onclick=openJournal;$('help').onclick=()=>$('instructions').showModal();document.querySelectorAll('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
document.addEventListener('keydown',e=>{if(e.ctrlKey||e.altKey||e.metaKey||e.repeat||document.querySelector('dialog[open]')||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;const n=Number(e.key);if(n>=1&&n<=7){e.preventDefault();add(REAGENTS[n-1].id);}else if(e.key.toLowerCase()==='r'){e.preventDefault();reset();}else if(e.key==='Enter'&&!e.target.closest('button,a')){e.preventDefault();react();}});
update();

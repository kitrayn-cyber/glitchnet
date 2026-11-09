// Fictional ingredients only. Order-independent recipe data is the expansion point.
export const REAGENTS = [
 {id:'lumen',name:'Lumen Dew',color:'#dfcc68',property:'Stores a little borrowed light.'},
 {id:'moon',name:'Moonmilk',color:'#a4bbe8',property:'Reflective, cloudy, and unusually quiet.'},
 {id:'moss',name:'Moss Essence',color:'#93c77d',property:'Remembers how to grow.'},
 {id:'cloud',name:'Cloud Tears',color:'#78c6cc',property:'Objects to the idea of gravity.'},
 {id:'ember',name:'Ember Sap',color:'#e59769',property:'Restless warmth in a bottle.'},
 {id:'shade',name:'Shade Ink',color:'#ae89ca',property:'Persuades light to look elsewhere.'},
 {id:'star',name:'Star Salt',color:'#e2a0bd',property:'Crystallized possibility. Add thoughtfully.'}
];
export const keyOf = ids => [...ids].sort().join('+');
export const RECIPES = [
 {id:'glow',ingredients:['lumen','moon'],name:'Pocket Aurora',color:'#d7ef8e',appearance:'Soft lime light with tiny golden sparks.',description:'A small, patient glow for very late reading.',reaction:'impressed',line:'Stable luminescence. You have made a lamp with more paperwork.'},
 {id:'invisible',ingredients:['moon','shade'],name:'Absent-minded Tonic',color:'#b7c6dd',appearance:'Almost transparent, with a violet shimmer.',description:'Makes the flask briefly forget to be visible.',reaction:'surprised',line:'The flask is still there. Unlike your respect for optical conventions.'},
 {id:'growth',ingredients:['moss','lumen'],name:'Botanical Overachiever',color:'#9bd577',appearance:'Leaf-green liquid sprouting a tiny vine.',description:'Encourages plants to take their ambitions seriously.',reaction:'impressed',line:'Accelerated growth, no thorns. A surprisingly considerate result.'},
 {id:'float',ingredients:['cloud','star'],name:'Gravity’s Resignation',color:'#8cdbe1',appearance:'A floating turquoise potion with silver bubbles.',description:'Temporarily excuses the flask from gravity.',reaction:'curious',line:'Gravity has lodged a complaint. I am inclined to ignore it.'},
 {id:'secret',ingredients:['lumen','shade','star'],name:'The Unwritten Spectrum',color:'#e7b4e7',appearance:'Pearlescent light shifting through impossible colors.',description:'A rare balance of light, shadow, and possibility.',reaction:'surprised',line:'That wavelength… Wait. Do not reset it yet. I need my other notebook.'}
];
export function outcome(ids) {
 if(ids.length<2||ids.length>3||new Set(ids).size!==ids.length||ids.some(id=>!REAGENTS.some(r=>r.id===id))) return null;
 const recipe=RECIPES.find(r=>keyOf(r.ingredients)===keyOf(ids));if(recipe)return {...recipe,success:true};
 if(ids.includes('ember')&&ids.includes('cloud'))return {id:'explosion',name:'A small atmospheric disagreement',color:'#edb782',description:'A harmless cartoon pop. The flask survives. Your hypothesis does not.',reaction:'alarmed',line:'Heat and cloud tears. Predictable pressure. Next time, listen before the pop.'};
 if(ids.includes('ember')&&ids.includes('shade'))return {id:'smoke',name:'Bottled Bad Weather',color:'#9e92ad',description:'A plume of purple smoke smelling faintly of old books.',reaction:'annoyed',line:'You have invented indoor weather. The ceiling will be thrilled.'};
 const n=ids.reduce((a,id)=>a+REAGENTS.findIndex(r=>r.id===id),0);
 return n%2 ? {id:'fizz',name:'Enthusiastic Nothing',color:'#b6c5a0',description:'Vigorous fizzing, followed by a spectacular lack of progress.',reaction:'neutral',line:'Bubbles are observations. They are not, by themselves, achievements.'} : {id:'sludge',name:'Philosophical Sludge',color:'#b2a589',description:'A harmless pudding-like failure. It seems to be considering its options.',reaction:'annoyed',line:'It has the consistency of a poorly defended argument.'};
}
export function hint(ids) {
 if(ids.includes('ember')&&ids.includes('cloud'))return ['alarmed','That pair builds pressure. It will be harmless, but the noise will offend me.'];
 if(ids.includes('ember')&&ids.includes('shade'))return ['annoyed','Heat and shadow tend to make smoke. Consider the ventilation.'];
 const promising=RECIPES.filter(r=>ids.every(id=>r.ingredients.includes(id)));
 if(ids.length>1&&promising.length)return ['curious',ids.includes('shade')&&ids.includes('lumen')?'Light and shadow need a mediator. Something crystalline, perhaps.':'The colors are settling. There may be a useful structure in there.'];
 const clues={lumen:'Light needs a reflective partner. Or something with leaves and ambition.',moon:'Moonmilk reflects light. Shadow, on the other hand, might help it disappear.',moss:'Moss remembers sunlight. I am studying whether that memory can be bottled.',cloud:'Cloud tears resist gravity. A little crystallized possibility might help.',ember:'Ember Sap is restless. Add a cloud and you will hear about it.',shade:'Shade Ink bends light away. Moonmilk provides a surface worth hiding.',star:'Star Salt is a mediator. Try giving a cloud something to hold on to.'};
 return ids.length===1?['neutral',clues[ids[0]]]:['annoyed','The mixture is cloudy. A smaller, more deliberate hypothesis might serve you better.'];
}
export const STORAGE_KEY='glitchnet-lab-journal-v1';
export function loadJournal(storage){try{const v=JSON.parse(storage.getItem(STORAGE_KEY)||'[]');return new Set(Array.isArray(v)?v.filter(id=>RECIPES.some(r=>r.id===id)):[]);}catch{return new Set();}}
export function saveJournal(storage,found){try{storage.setItem(STORAGE_KEY,JSON.stringify([...found]));return true;}catch{return false;}}

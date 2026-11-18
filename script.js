/* To use real photos, set img: "photo.jpg" on any item below. */
const hobbies=[
  {t:"casual drawing whenever I'm bored",e:"\u270F\uFE0F",bg:"linear-gradient(135deg,#c9b99a,#8a7d66)",img:""},
  {t:"playing volleyball with my friends",e:"\uD83C\uDFD0",bg:"linear-gradient(135deg,#e07a6b,#6a8fb8)",img:""},
  {t:"studying my programming subject",e:"\uD83D\uDCBB",bg:"linear-gradient(135deg,#1c2b36,#3a5a6e)",img:""}
];
const awards=[
  {t:"Medals and trophies",e:"\uD83C\uDFC5",bg:"#c9a24b",img:"",more:[
    {t:"Gold medal",e:"\uD83E\uDD47",bg:"#d9a43b",img:""},
    {t:"Silver medal",e:"\uD83E\uDD48",bg:"#9fb3bf",img:""},
    {t:"Bronze medal",e:"\uD83E\uDD49",bg:"#b8794a",img:""},
    {t:"Champion trophy",e:"\uD83C\uDFC6",bg:"#c9a24b",img:""},
    {t:"Runner-up trophy",e:"\uD83C\uDFC6",bg:"#7f98a6",img:""},
    {t:"Team trophy",e:"\uD83C\uDFC6",bg:"#3b7ea1",img:""},
    {t:"Best player award",e:"\uD83C\uDFC5",bg:"#26718c",img:""},
    {t:"Participation medal",e:"\uD83C\uDFC5",bg:"#5d8fa8",img:""},
    {t:"Certificate",e:"\uD83D\uDCDC",bg:"#6fa3b3",img:""}
  ]},
  {t:"Team recognition",e:"\uD83D\uDC65",bg:"#3b7ea1",img:""},
  {t:"Proud medal moment",e:"\uD83E\uDD47",bg:"#26718c",img:""},
  {t:"Champion trophy",e:"\uD83C\uDFC6",bg:"#d9a43b",img:""},
  {t:"Trophy win",e:"\uD83C\uDFC6",bg:"#5d8fa8",img:""}
];
const $=s=>document.querySelector(s);
const media=(o,cls)=>o.img?`<img src="${o.img}" alt="${o.t}">`:o.e;

/* carousel */
let cur=1;const track=$('#track'),dots=$('#dots');
function drawCarousel(){
  const n=hobbies.length,idx=[(cur+n-1)%n,cur,(cur+1)%n];
  track.innerHTML=idx.map((i,k)=>`<button class="hobby ${k==1?'active':''}" data-i="${i}" aria-label="${hobbies[i].t}"><div class="circ" style="background:${hobbies[i].bg}">${media(hobbies[i])}</div><p>${hobbies[i].t}</p></button>`).join('');
  dots.innerHTML=hobbies.map((h,i)=>`<button data-i="${i}" aria-label="Show hobby ${i+1}" ${i==cur?'aria-current="true"':''}></button>`).join('');
}
const go=d=>{cur=(cur+d+hobbies.length)%hobbies.length;drawCarousel()};
$('#prev').onclick=()=>go(-1);$('#next').onclick=()=>go(1);
track.onclick=e=>{const b=e.target.closest('.hobby');if(b)cur=+b.dataset.i,drawCarousel()};
dots.onclick=e=>{const b=e.target.closest('button');if(b)cur=+b.dataset.i,drawCarousel()};
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea'))return;if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)});
let sx=0;track.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
track.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40)go(d<0?1:-1)});
drawCarousel();

/* achievements */
$('#gal').innerHTML=awards.map((a,i)=>`<figure tabindex="0" data-i="${i}" style="background:${a.bg}" role="button" aria-label="Open ${a.t}">${media(a)}<figcaption>${a.t}</figcaption></figure>`).join('');
const dlg=$('#dlg');
function openA(i){const a=awards[i],big=$('#bigimg');
  dlg.classList.toggle('wide',!!a.more);
  if(a.more){big.className='big multi';big.style.background='';big.innerHTML=a.more.map(m=>`<div class="mi"><div class="mc" style="background:${m.bg}">${media(m)}</div><span>${m.t}</span></div>`).join('');$('#bigcap').textContent=a.t+' from competitions'}
  else{big.className='big';big.style.background=a.bg;big.innerHTML=media(a);$('#bigcap').textContent=a.t}
  dlg.showModal()}
$('#gal').onclick=e=>{const f=e.target.closest('figure');if(f)openA(+f.dataset.i)};
$('#gal').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){const f=e.target.closest('figure');if(f){e.preventDefault();openA(+f.dataset.i)}}};
$('#x').onclick=()=>dlg.close();dlg.onclick=e=>{if(e.target===dlg)dlg.close()};

/* form */
$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  const n=$('#name'),m=$('#msg'),st=$('#status');let ok=true;
  const chk=(el,er,bad,txt)=>{el.setAttribute('aria-invalid',bad);$(er).textContent=bad?txt:'';if(bad)ok=false};
  chk(n,'#e-name',n.value.trim().length<2,'Enter your name (at least 2 characters).');
  chk(m,'#e-msg',m.value.trim().length<5,'Write a message of at least 5 characters.');
  if(!ok){st.textContent='';return}
  st.textContent='Message sent. Thanks, '+n.value.trim().split(' ')[0]+'!';
  e.target.reset();
});

/* eyes follow pointer */
const pup=[...document.querySelectorAll('.pupil')];
function look(x,y){pup.forEach(p=>{const r=p.parentElement.getBoundingClientRect(),dx=x-(r.left+r.width/2),dy=y-(r.top+r.height/2),a=Math.atan2(dy,dx),d=Math.min(r.width*.24,Math.hypot(dx,dy)/8);p.style.transform=`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px)`})}
addEventListener('pointermove',e=>look(e.clientX,e.clientY));

/* nav: active link + search jump */
const secs=['home','about','ach','contacts'];
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)document.querySelectorAll('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+en.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>io.observe(document.getElementById(s)));
$('#q').addEventListener('change',e=>{const v=e.target.value.toLowerCase();const m={home:'home',about:'about','about me':'about',achievements:'ach',contacts:'contacts',contact:'contacts'}[v.trim()];if(m){document.getElementById(m).scrollIntoView({behavior:'smooth'});e.target.value=''}});

/* theme */
$('#theme').onclick=()=>{const r=document.documentElement,dark=getComputedStyle(r).getPropertyValue('--bg').trim()==='#0d2230';r.dataset.theme=dark?'light':'dark'};

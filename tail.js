
const MONSTERS = [
  { name:"이더리머", emoji:"🐺", hp:3, bg:"game/bg1.png",
    dialogue:["너는... 비트코이너인가?","웃기지마. 이더리움이 훨씬 낫다고. 비트코인은 구시대 유물이야!"],
    desc:"알트코인만 외치는 자", defeat:'"비트코인은 느려!" 외치며 도망쳤다.' },
  { name:"피아트 신봉자", emoji:"🤡", hp:3, bg:"game/bg1.png",
    dialogue:["중앙은행이 있어야 경제가 돌아가는 법이야.","비트코인? 그건 범죄자들이나 쓰는 거라고!"],
    desc:"중앙은행이 답이라 믿는 자", defeat:"화폐 발행의 진실 앞에 쓰러졌다." },
  { name:"규제쟁이", emoji:"👮", hp:4, bg:"game/bg2.png",
    dialogue:["거기 서! 비트코인은 불법이다!","지금 당장 개인키를 제출하라!"],
    desc:"비트코인을 금지하려는 자", defeat:"비트코인은 막을 수 없다. 물러났다." },
  { name:"중앙은행 수호자", emoji:"🏦", hp:4, bg:"game/bg2.png",
    dialogue:["화폐 발행권은 반드시 우리가 쥐고 있어야 해.","탈중앙화? 그건 혼란일 뿐이야. 용서할 수 없다!"],
    desc:"인플레이션을 퍼뜨리는 자", defeat:"21만 BTC의 희소성이 승리했다!" },
  { name:"인플레이션 괴물", emoji:"💸", hp:5, bg:"game/bg3.png",
    dialogue:["돈을 더 찍을수록 경제는 성장해!","희소성 따위는 필요 없어. 나를 막을 수 있겠어?"],
    desc:"돈의 가치를 갉아먹는 자", defeat:"고정 공급량 앞에 괴물이 사라졌다." },
  { name:"쉿코이너", emoji:"💩", hp:4, bg:"game/bg3.png",
    dialogue:["잠깐! 내 코인을 들어봐. 100배는 기본이야!","비트코인보다 훨씬 빠르다고! 지금 당장 스왑해!"],
    desc:"쉿코인을 팔러 난입한 자", defeat:"쉿코이너가 물러났다! 계속 진격하라!", isEvent:true },
  { name:"마왕 : DOLLAR", emoji:"👑", hp:6, bg:"game/bg3.png",
    dialogue:["드디어 여기까지 왔군...","비트코인을 파괴하겠다. 달러의 지배는 영원하다!","자, 최후의 결전을 시작하지!"],
    desc:"비트코인 파괴를 꿈꾸는 최종 보스", defeat:"마왕이 쓰러졌다!! 비트코인 네트워크는 살아있다! ₿", isBoss:true }
];

let php=5,phpMax=5,ehp=0,ehpMax=0,monIdx=0,mon=null;
let usedQ=[],usedSQ=[],curQ=null,score=0,busy=false;
let walkTimer=null,walkFrame=0,diaIdx=0;

function show(n){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('screen-'+n).classList.add('active');}
function log(h){document.getElementById('battle-log').innerHTML=h;}

function startWalk(fps){
  if(walkTimer)clearInterval(walkTimer);
  const e=document.getElementById('moving-sprite');if(e)e.src=WALK_FRAMES[0];
  walkTimer=setInterval(()=>{
    walkFrame=(walkFrame+1)%WALK_FRAMES.length;
    const el=document.getElementById('moving-sprite');if(el&&el.offsetParent!==null)el.src=WALK_FRAMES[walkFrame];
  },Math.round(1000/fps));
}
function stopWalk(){if(walkTimer){clearInterval(walkTimer);walkTimer=null;}}
function setStandingSprite(id){const e=document.getElementById(id);if(e)e.src='game/1.png';}

function startGame(){
  php=phpMax=5;monIdx=0;usedQ=[];usedSQ=[];score=0;busy=false;walkFrame=0;
  goMoving(0);
}

function goMoving(idx){
  const m=MONSTERS[idx];
  const txt=m.isBoss?'FINAL STAGE 로 이동 중':m.isEvent?'??? 이벤트 발생 예고...':(idx+1)+' 스테이지로 이동 중';
  document.getElementById('moving-txt').textContent=txt;
  const linesEl=document.getElementById('moving-lines');
  linesEl.innerHTML='';
  for(let i=0;i<10;i++){
    const d=document.createElement('div');
    d.className='moving-line';
    d.style.top=Math.random()*100+'%';
    d.style.animationDelay=(Math.random()*.8)+'s';
    d.style.animationDuration=(.5+Math.random()*.6)+'s';
    linesEl.appendChild(d);
  }
  show('moving');startWalk(14);
  setTimeout(()=>goDialogue(idx),2500);
}

function goDialogue(idx){
  monIdx=idx;mon=Object.assign({},MONSTERS[idx]);diaIdx=0;
  document.getElementById('dia-stage-num').textContent=idx+1;
  document.getElementById('dia-enemy-lbl').textContent=mon.name;
  document.getElementById('dia-arena').style.backgroundImage="url('"+mon.bg+"')";
  const ec=document.getElementById('dia-enemy-char');
  ec.textContent=mon.emoji;
  ec.className='arena-enemy-char'+(mon.isBoss?' boss-glow':'');
  document.getElementById('speech-spk').textContent=mon.name;
  document.getElementById('speech-txt').textContent=mon.dialogue[0];
  show('dialogue');stopWalk();setStandingSprite('dia-player-sprite');
}

function advanceDialogue(){
  diaIdx++;
  if(diaIdx>=mon.dialogue.length){
    if(mon.isEvent){showEventOverlay();}else{goBattle();}
  } else {
    document.getElementById('speech-txt').textContent=mon.dialogue[diaIdx];
  }
}

function showEventOverlay(){
  document.getElementById('event-overlay').style.display='flex';
  setTimeout(()=>{document.getElementById('event-overlay').style.display='none';goBattle();},3000);
}

function goBattle(){
  ehp=ehpMax=mon.hp;busy=false;
  document.getElementById('stage-num').textContent=monIdx+1;
  renderDots(monIdx);
  document.getElementById('battle-arena').style.backgroundImage="url('"+mon.bg+"')";
  const bc=document.getElementById('battle-enemy-char');
  bc.textContent=mon.emoji;
  bc.className='arena-enemy-char'+(mon.isBoss?' boss-glow':'');
  document.getElementById('ehp-lbl').textContent=(mon.isBoss?'👑 ':mon.isEvent?'💩 ':'👹 ')+mon.name;
  updatePhp();updateEhp();
  log(mon.isBoss
    ?'<span class="bad">⚠ 마왕이 나타났다! 최후의 결전이다!</span>'
    :mon.isEvent
    ?'<span class="bad">💩 쉿코이너 난입! 전용 퀴즈로 격파하라!</span>'
    :'<span class="info">'+mon.emoji+' <b>'+mon.name+'</b> 과의 전투 시작!</span>');
  show('battle');stopWalk();setStandingSprite('battle-player-sprite');loadQuiz();
}

function renderDots(cur){
  const el=document.getElementById('stage-dots');el.innerHTML='';
  MONSTERS.forEach((m,i)=>{
    const d=document.createElement('div');
    let c='stage-dot';
    if(m.isBoss)c+=' boss-dot';
    if(i<cur)c+=' done';
    if(i===cur)c+=' current';
    d.className=c;el.appendChild(d);
  });
}

function loadQuiz(){
  const pool=mon.isEvent?SHITQUIZ:QUIZ,used=mon.isEvent?usedSQ:usedQ;
  let avail=pool.map((_,i)=>i).filter(i=>!used.includes(i));
  if(!avail.length){used.length=0;avail=pool.map((_,i)=>i);}
  const idx=avail[Math.floor(Math.random()*avail.length)];
  used.push(idx);curQ=pool[idx];
  document.getElementById('quiz-q').textContent='Q. '+curQ.q;
  const grid=document.getElementById('quiz-grid');grid.innerHTML='';
  ['① ','② ','③ ','④ '].forEach((lbl,i)=>{
    const btn=document.createElement('button');
    btn.className='choice';btn.textContent=lbl+curQ.c[i];
    btn.onclick=()=>answer(i,btn);grid.appendChild(btn);
  });
  const wrap=document.getElementById('quiz-wrap');
  wrap.classList.remove('anim-fade-up');void wrap.offsetWidth;wrap.classList.add('anim-fade-up');
  busy=false;
}

function answer(picked,btn){
  if(busy)return;busy=true;
  const btns=document.querySelectorAll('.choice');
  btns.forEach(b=>b.disabled=true);
  btns[curQ.a].classList.add('ok');
  if(picked!==curQ.a)btn.classList.add('bad');
  if(picked===curQ.a){
    ehp=Math.max(0,ehp-1);score+=10;
    const ec=document.getElementById('battle-enemy-char');
    ec.classList.remove('anim-shake-enemy');void ec.offsetWidth;ec.classList.add('anim-shake-enemy');
    document.body.classList.remove('anim-bg-green','anim-bg-red');void document.body.offsetWidth;document.body.classList.add('anim-bg-green');
    updateEhp();
    const vp=document.getElementById('battle-player-sprite');if(vp)vp.src='game/v.png';
    if(ehp<=0){
      log('<span class="ok">⚔ 정답! 격파!</span> → <span class="info">'+mon.defeat+'</span>');
      setTimeout(()=>{document.getElementById('battle-enemy-char').classList.add('anim-vanish');setTimeout(nextStage,700);},500);
    }else{
      log('<span class="ok">⚔ 정답! '+mon.name+'에게 타격!</span> &nbsp;(잔여 HP: '+ehp+')');
      setTimeout(()=>{if(vp)vp.src='game/1.png';},400);
      setTimeout(loadQuiz,1000);
    }
  }else{
    php=Math.max(0,php-1);
    const pc=document.getElementById('battle-player-sprite');
    pc.src='game/T.png';
    pc.classList.remove('anim-shake-player');void pc.offsetWidth;pc.classList.add('anim-shake-player');
    setTimeout(()=>{if(pc)pc.src='game/1.png';},400);
    document.body.classList.remove('anim-bg-green','anim-bg-red');void document.body.offsetWidth;document.body.classList.add('anim-bg-red');
    updatePhp();
    if(php<=0){
      log('<span class="bad">✗ 오답! '+mon.name+'의 공격!</span> → <span class="bad">비트코이너가 쓰러졌다...</span>');
      setTimeout(gameOver,1200);
    }else{
      log('<span class="bad">✗ 오답! '+mon.name+'의 반격!</span> &nbsp;(내 HP: '+php+'/'+phpMax+')');
      setTimeout(loadQuiz,1000);
    }
  }
}

function nextStage(){
  monIdx++;
  if(monIdx>=MONSTERS.length){victory();return;}
  goMoving(monIdx);
}

function gameOver(){
  stopWalk();show('gameover');
  document.getElementById('go-sub').textContent=mon.name+'에게 패배했다... 비트코인 공부가 더 필요하다.';
  document.getElementById('go-score').textContent='STAGE '+(monIdx+1)+' 까지 진행 · 획득 점수: '+score;
}
function victory(){
  stopWalk();show('victory');
  document.getElementById('vic-stats').innerHTML='잔여 HP : '+php+' / '+phpMax+'<br>최종 점수 : '+(score+php*5)+'<br><br>비트코인 네트워크는 오늘도 살아있다. ₿';
}

function updatePhp(){
  const pct=php/phpMax*100;
  const bar=document.getElementById('php-bar');
  bar.style.width=pct+'%';bar.className='hp-fill'+(pct<=40?' danger':'');
  const h=document.getElementById('php-hearts');h.innerHTML='';
  for(let i=0;i<phpMax;i++){const s=document.createElement('span');s.className='heart'+(i>=php?' dead':'');s.textContent='❤️';h.appendChild(s);}
}
function updateEhp(){
  const pct=ehp/ehpMax*100;
  const bar=document.getElementById('ehp-bar');
  bar.style.width=pct+'%';bar.className='hp-fill r'+(pct<=40?' danger':'');
  const h=document.getElementById('ehp-hearts');h.innerHTML='';
  for(let i=0;i<ehpMax;i++){const s=document.createElement('span');s.className='heart'+(i>=ehp?' dead':'');s.textContent=mon.isBoss?'👑':'💢';h.appendChild(s);}
}
</script>
</body>
</html>

/* =========================================================
   HELPERS
   ========================================================= */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const ST={get(k,d){try{const v=localStorage.getItem('toeflpath_'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('toeflpath_'+k,JSON.stringify(v))}catch(e){}}};
function toast(m){const t=$('#toast');t.innerHTML=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2600)}
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return Math.abs(h)}
function seeded(arr,seed){let h=hash(seed)||1;const a=arr.map((x,i)=>[x,i]);for(let i=a.length-1;i>0;i--){h=(Math.imul(h,1103515245)+12345)&0x7fffffff;const j=h%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
const norm=s=>s.toLowerCase().replace(/[^a-z0-9' ]/g,' ').replace(/\s+/g,' ').trim();
const bandFromPct=p=>p>=.95?6:p>=.88?5.5:p>=.8?5:p>=.7?4.5:p>=.6?4:p>=.5?3.5:p>=.4?3:p>=.3?2.5:p>=.2?2:p>=.1?1.5:1;
const r05=x=>Math.round(x*2)/2;

/* --- audio (Text-to-Speech) --- */
const AUDIO={};let PLAYS={};
function voices(){return (window.speechSynthesis?speechSynthesis.getVoices():[]).filter(v=>/^en[-_](US|GB|AU|CA)/i.test(v.lang))}
function speakLines(lines,rate){
 if(!('speechSynthesis' in window)){toast('Browser ini tidak mendukung audio. Gunakan tombol "tampilkan teks".');return}
 speechSynthesis.cancel();const vs=voices();
 const fem=vs.find(v=>/female|samantha|zira|aria|jenny|ava|karen|victoria|google us english/i.test(v.name))||vs[0];
 const mal=vs.find(v=>/(^|\W)(male|daniel|david|guy|alex|fred|ryan|tom|google uk english male)/i.test(v.name)&&!/female/i.test(v.name))||vs[1]||vs[0];
 document.querySelectorAll('.play.playing').forEach(b=>b.classList.remove('playing'));const btn=window._playBtn;if(btn)btn.classList.add('playing');
 lines.forEach((l,ix)=>{const u=new SpeechSynthesisUtterance(l.t);if(ix===lines.length-1){u.onend=u.onerror=()=>btn&&btn.classList.remove('playing')}u.lang='en-US';u.rate=rate||ST.get('rate',0.92);
  if(vs.length)u.voice=l.s==='W'?fem:l.s==='M'?mal:(vs.find(v=>/en[-_]US/i.test(v.lang))||vs[0]);
  u.pitch=l.s==='W'?1.12:l.s==='M'?0.88:1;speechSynthesis.speak(u)});
}
if('speechSynthesis' in window){speechSynthesis.onvoiceschanged=()=>{}}
function playBtn(key,lines,limit,label){AUDIO[key]={lines,limit};return `<button class="play" data-act="play" data-key="${key}"><i data-lucide="play"></i>${label||'Putar audio'}</button> <span class="small muted" id="pc-${key}">${limit?`(maks. ${limit}× putar)`:''}</span>`}

/* --- timers --- */
let TIMERS={};
function clearTimers(){Object.values(TIMERS).forEach(clearInterval);TIMERS={};if(window.speechSynthesis)speechSynthesis.cancel()}
function fmt(s){s=Math.max(0,s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function countdown(key,secs){clearInterval(TIMERS[key]);const el=$('#clk-'+key);let left=secs;el.classList.remove('over');el.textContent=fmt(left);
 TIMERS[key]=setInterval(()=>{left--;el.textContent=fmt(left);if(left<=0){clearInterval(TIMERS[key]);el.textContent='Waktu habis!';el.classList.add('over');toast('⏰ Waktu habis')}},1000)}

/* --- components --- */
function mcq(key,q,num,sec){const sh=seeded(q.o,key+q.q);const a=sh.findIndex(p=>p[1]===0);
 return `<div class="unit mcq" data-type="mcq" data-sec="${sec||''}" data-a="${a}"><div class="qtext">${num?num+'. ':''}${q.q}</div>${sh.map((p,i)=>`<label class="opt"><input type="radio" name="${key}" value="${i}"><span>${p[0]}</span></label>`).join('')}${q.e?`<div class="explain">💡 ${q.e}</div>`:''}</div>`}
function ctw(key,text,sec){let i=0;const html=text.replace(/\{([^|}]*)\|([^}]*)\}/g,(m,a,b)=>{i++;return `${a}<input class="ctw-in" data-ans="${b}" maxlength="${b.length}" style="width:${b.length*.68+.8}em" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="huruf yang hilang ${i}">`});
 return `<div class="unit ctw passage" data-type="ctw" data-sec="${sec||''}">${html}</div>`}
const BUILD={};
function bsItem(key,it,num,sec){const ans=it.k.join(' ');let sh=seeded(it.k,key+ans).map(p=>p[1]);if(sh.every((v,i)=>v===i))sh.push(sh.shift());
 BUILD[key]={k:it.k,pool:sh,line:[]};
 return `<div class="unit bs" data-type="bs" data-sec="${sec||''}" data-key="${key}" data-ans="${ans.replace(/"/g,'&quot;')}"><div class="qtext">${num?num+'. ':''}<span class="bs-ctx">🗨️ "${it.c}"</span></div><div class="small muted">Klik potongan kata untuk menyusun jawaban:</div><div class="bs-line" id="bl-${key}"></div><div class="bs-pool" id="bp-${key}"></div><div class="flex" style="margin-top:6px"><button class="linkish" data-act="bs-reset" data-key="${key}">↺ reset</button></div><div class="explain">✅ Jawaban: <b>${it.k.join(' ').replace(/^./,c=>c.toUpperCase())}${/^(can|could|would|has|do|is|are)\b/i.test(ans)?'?':'.'}</b></div></div>`}
function bsDraw(key){const st=BUILD[key];if(!st)return;const L=$('#bl-'+key),P=$('#bp-'+key);if(!L)return;
 L.innerHTML=st.line.map(i=>`<button class="chip" data-act="bs-rem" data-key="${key}" data-i="${i}">${st.k[i]}</button>`).join('')||'<span class="small muted">&nbsp;…</span>';
 P.innerHTML=st.pool.filter(i=>!st.line.includes(i)).map(i=>`<button class="chip" data-act="bs-add" data-key="${key}" data-i="${i}">${st.k[i]}</button>`).join('')}
function drawAllBS(){Object.keys(BUILD).forEach(bsDraw)}
const WRUB=`<ul class="clean small"><li><b>5</b> – Semua poin terjawab, ide jelas & berkembang, kosakata/grammar beragam, hampir tanpa kesalahan.</li><li><b>4</b> – Semua poin terjawab, terorganisir, ada beberapa kesalahan kecil yang tidak mengganggu.</li><li><b>3</b> – Sebagian besar poin terjawab, ide kurang berkembang, kesalahan cukup sering.</li><li><b>2</b> – Poin hilang/tidak jelas, banyak kesalahan yang mengganggu makna.</li><li><b>1</b> – Sangat pendek atau sebagian besar tidak relevan.</li><li><b>0</b> – Kosong / tidak relevan.</li></ul>`;
const SRUB=`<ul class="clean small"><li><b>5</b> – Lancar & jelas, jawaban relevan dengan alasan + contoh, grammar & kosakata beragam.</li><li><b>4</b> – Cukup lancar, sedikit jeda, ada alasan/contoh, kesalahan kecil tidak mengganggu.</li><li><b>3</b> – Banyak jeda, ide umum dan kurang berkembang, kesalahan cukup sering.</li><li><b>2</b> – Sebagian sulit dipahami, jawaban sangat singkat.</li><li><b>1</b> – Hanya beberapa kata relevan.</li><li><b>0</b> – Tidak menjawab.</li></ul>`;
function selfScore(sec,max,rub,label){let o='<option value="">—</option>';for(let i=max;i>=0;i--)o+=`<option value="${i}">${i}</option>`;
 return `<div class="self-wrap"><label>${label||'Nilai diri'} (0–${max}): <select class="self" data-sec="${sec}" data-max="${max}">${o}</select></label>${rub?`<details style="margin:0;padding:4px 10px"><summary class="small">Rubrik</summary>${rub}</details>`:''}</div>`}
function writeTask(key,title,min,prompt,model,inTryout){return `<div class="task sec-W"><div class="flex"><h4 style="margin:0">${title}</h4><button class="btn sm ghost" data-act="timer" data-key="${key}" data-sec="${min*60}">⏱ Mulai ${min} menit</button><span class="clock" id="clk-${key}">${min}:00</span></div><div class="prompt">${prompt}</div><textarea id="ta-${key}" placeholder="Tulis jawabanmu di sini (bahasa Inggris)…"></textarea><div class="wc" id="wc-${key}">0 kata</div>${inTryout?`<div class="explain"><b>Contoh jawaban:</b><br>${model}</div>`:`<details><summary>Lihat contoh jawaban</summary>${model}</details>`}${selfScore('W',5,WRUB,'Nilai diri setelah membandingkan dengan rubrik')}</div>`}
function discPrompt(d){return `<div class="small muted">Profesor kamu sedang mengajar. Tulis respons yang ikut berkontribusi pada diskusi (min. 100 kata).</div><p><b>👩‍🏫 Professor:</b> ${d.prof}</p><p><b>🧑 ${d.s1[0]}:</b> ${d.s1[1]}</p><p><b>🧑 ${d.s2[0]}:</b> ${d.s2[1]}</p>`}

/* evaluate units */
function evalUnit(el){const t=el.dataset.type;let c=0,n=0;
 if(t==='mcq'){n=1;const ch=el.querySelector('input:checked');const a=+el.dataset.a;el.querySelectorAll('.opt').forEach((o,i)=>{o.classList.remove('correct','wrong');if(i===a)o.classList.add('correct')});
  if(ch&&+ch.value===a)c=1;else if(ch)ch.closest('.opt').classList.add('wrong')}
 else if(t==='ctw'){el.querySelectorAll('.reveal').forEach(r=>r.remove());el.querySelectorAll('.ctw-in').forEach(inp=>{n++;const ok=inp.value.trim().toLowerCase()===inp.dataset.ans.toLowerCase();inp.classList.toggle('ok',ok);inp.classList.toggle('bad',!ok);if(ok)c++;else inp.insertAdjacentHTML('afterend',`<span class="reveal">(${inp.dataset.ans})</span>`)})}
 else if(t==='bs'){n=1;const st=BUILD[el.dataset.key];const built=st.line.map(i=>st.k[i]).join(' ');const ok=norm(built)===norm(el.dataset.ans);if(ok)c=1;el.classList.toggle('bs-ok',ok);el.classList.toggle('bs-bad',!ok)}
 el.classList.add('done');return [c,n]}
function checkScope(scope){let c=0,n=0;scope.querySelectorAll('.unit').forEach(u=>{const [a,b]=evalUnit(u);c+=a;n+=b});scope.querySelectorAll('.transcript').forEach(t=>t.classList.add('show'));return [c,n]}

/* =========================================================
   VIEWS
   ========================================================= */
const V={};
function curWeek(){const d=ST.get('plan',{});const w=PLAN.find(p=>p.tasks.some((_,i)=>!d[p.w+'-'+i]));return w||PLAN[PLAN.length-1]}
function greet(){const h=new Date().getHours();return h<11?'Selamat pagi':h<15?'Selamat siang':h<19?'Selamat sore':'Selamat malam'}
V.beranda=()=>{
 const doneTasks=ST.get('plan',{});const totalTasks=PLAN.reduce((s,w)=>s+w.tasks.length,0);const nDone=Object.values(doneTasks).filter(Boolean).length;const pct=Math.round(nDone/totalTasks*100);
 const known=ST.get('known',{});const nKnown=Object.values(known).filter(Boolean).length;
 const hist=ST.get('hist',[]);const last=hist[hist.length-1];
 const exam=ST.get('exam','2027-02-16');const days=Math.ceil((new Date(exam)-new Date())/864e5);
 const wk=curWeek();const streak=getStreak();
 const opts=[1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6].map(v=>`<option ${v===4?'selected':''}>${v}</option>`).join('');
 const C=2*Math.PI*62;
 return `
 <section class="hero"><div class="hero-grid"><div>
 <span class="pill"><i data-lucide="sparkles"></i>TOEFL iBT · format terbaru 2026</span>
 <h1 style="margin-top:14px">${greet()}! Ayo menuju <span style="background:linear-gradient(90deg,#fde68a,#fbcfe8);-webkit-background-clip:text;background-clip:text;color:transparent">Band 4.0</span></h1>
 <p>Target kamu: <b>74 (skala 0–120)</b> ≈ <b>band 4.0 (skala 1–6)</b> ≈ CEFR <b>B2</b>. Sekarang kamu ada di <b>Minggu ${wk.w}: ${wk.t}</b>.</p>
 <div class="flex" style="margin-top:18px"><a class="btn light" href="#rencana"><i data-lucide="calendar-check"></i>Rencana minggu ini</a><a class="btn glass" href="#tryout"><i data-lucide="flag"></i>${hist.length?'Lanjut tryout':'Mulai Tryout 1'}</a></div></div>
 <div class="ring-wrap"><svg viewBox="0 0 150 150"><defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#f9a8d4"/></linearGradient></defs><circle class="rb" cx="75" cy="75" r="62"/><circle class="rf" cx="75" cy="75" r="62" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C*(1-pct/100)}"/></svg><div class="ring-txt"><div><b>${pct}%</b><span>rencana selesai</span></div></div></div>
 </div></section>

 <div class="grid g4" style="margin-bottom:18px">
  <div class="stat" style="--c:var(--W)"><div class="ico"><i data-lucide="calendar-clock"></i></div><b>${days>0?days:'—'} <small style="font-size:.9rem;font-family:inherit">hari</small></b><span>menuju tes</span><div style="margin-top:8px"><input type="date" id="examDate" value="${exam}" aria-label="Tanggal tes"></div></div>
  <div class="stat" style="--c:#ea580c"><div class="ico"><i data-lucide="flame"></i></div><b>${streak} <small style="font-size:.9rem;font-family:inherit">hari</small></b><span>belajar beruntun</span><div class="bar"><i style="width:${Math.min(streak/7,1)*100}%;background:linear-gradient(90deg,#f59e0b,#ea580c)"></i></div><span class="small">${streak>=7?'Luar biasa! 🔥':'Target: 7 hari berturut-turut'}</span></div>
  <div class="stat" style="--c:var(--S)"><div class="ico"><i data-lucide="languages"></i></div><b>${nKnown}<small style="font-size:.9rem;font-family:inherit">/${VOCAB.length}</small></b><span>kosakata dikuasai</span><div class="bar"><i style="width:${nKnown/VOCAB.length*100}%;background:linear-gradient(90deg,#14b8a6,#0d9488)"></i></div></div>
  <div class="stat" style="--c:var(--L)"><div class="ico"><i data-lucide="trophy"></i></div><b>${last?last.o.toFixed(1):'—'}</b><span>${last?`tryout terakhir · ≈ ${CONC[last.o]}/120`:'belum ada tryout'}</span><div class="bar"><i style="width:${last?last.o/6*100:0}%"></i></div></div>
 </div>

 <div class="grid g2">
  <div class="card"><div class="page-head" style="margin-bottom:8px"><h3 style="margin:0"><i data-lucide="list-checks"></i>Fokus minggu ini</h3><span class="pill">Minggu ${wk.w} · ${wk.ph}</span></div>
   <p class="small muted" style="margin-top:0">${wk.t}</p>
   <div class="today">${wk.tasks.map((t,i)=>`<label class="chk ${doneTasks[wk.w+'-'+i]?'done':''}"><input type="checkbox" data-plan="${wk.w}-${i}" ${doneTasks[wk.w+'-'+i]?'checked':''}><span>${t}</span></label>`).join('')}</div>
   <a href="#rencana" class="btn ghost sm" style="margin-top:10px">Lihat semua 12 minggu <i data-lucide="arrow-right"></i></a></div>
  <div class="card"><h3><i data-lucide="line-chart"></i>Riwayat tryout</h3>${hist.length?`<div class="hist"><div class="goal" style="bottom:${4/6*130+20}px">TARGET 4.0</div>${hist.slice(-8).map(h=>`<div class="c"><b style="color:var(--ink)">${h.o.toFixed(1)}</b><i style="height:${h.o/6*130}px"></i>${h.n.replace('Tryout ','T')}<br>${h.d}</div>`).join('')}</div><p class="small muted">${last&&last.o>=4?'🎉 Tryout terakhir sudah mencapai target — pertahankan!':'Fokuskan latihan pada section dengan band terendah.'}</p>`:`<div class="empty"><i data-lucide="flag" style="width:36px;height:36px;opacity:.4"></i><p>Belum ada tryout. Kerjakan <b>Tryout 1</b> untuk mengetahui titik awalmu.</p><a class="btn sm" href="#tryout">Mulai sekarang</a></div>`}</div>
 </div>

 <div class="grid g4" style="margin-bottom:18px">
 ${[['book-open','Materi Reading','Strategi 3 tipe soal','#reading','var(--R)'],['headphones','Materi Listening','4 tipe audio + catatan','#listening','var(--L)'],['pen-line','Materi Writing','Template email & diskusi','#writing','var(--W)'],['mic','Materi Speaking','Repeat & interview','#speaking','var(--S)']].map(x=>`<a href="${x[3]}" class="stat qcard" style="--c:${x[4]}"><div class="ico"><i data-lucide="${x[0]}"></i></div><div><h4>${x[1]}</h4><span>${x[2]}</span></div></a>`).join('')}
 </div>

 <div class="grid g2">
 <div class="card"><h3><i data-lucide="clipboard-list"></i>Format TOEFL iBT (mulai 21 Jan 2026)</h3>
 <div class="tbl"><table><tr><th>Section</th><th>Waktu</th><th>Tipe tugas</th></tr>
 <tr><td><span class="tag sec-R">Reading</span></td><td>±30'</td><td>Complete the Words · Read in Daily Life · Read an Academic Passage</td></tr>
 <tr><td><span class="tag sec-L">Listening</span></td><td>±29'</td><td>Choose a Response · Conversation · Announcement · Academic Talk</td></tr>
 <tr><td><span class="tag sec-W">Writing</span></td><td>±23'</td><td>Build a Sentence · Write an Email · Academic Discussion</td></tr>
 <tr><td><span class="tag sec-S">Speaking</span></td><td>±8'</td><td>Listen &amp; Repeat · Take an Interview</td></tr></table></div>
 <p class="small muted">Reading &amp; Listening <b>adaptif</b> (2 modul). Skor section &amp; total memakai skala 1–6 (kelipatan 0,5); total = rata-rata 4 section. Selama transisi ±2 tahun, laporan juga mencantumkan skor setara 0–120.</p></div>
 <div class="card"><h3><i data-lucide="repeat"></i>Konversi skor (tabel ETS)</h3>
 <div class="tbl"><table><tr><th>Band 1–6</th><th>Setara 0–120</th><th>CEFR</th></tr>
 ${[6,5.5,5,4.5,4,3.5,3,2.5].map(b=>`<tr class="${b===4?'hl':''}"><td>${b.toFixed(1)}${b===4?' 🎯':''}</td><td>${CONC[b]}</td><td>${CEFR(b)}</td></tr>`).join('')}</table></div></div>
 </div>
 <div class="card"><h3><i data-lucide="calculator"></i>Kalkulator skor</h3><p class="small muted" style="margin-top:0">Masukkan perkiraan band tiap section untuk melihat skor total.</p>
 <div class="grid g4" style="gap:10px">${[['Reading','R'],['Listening','L'],['Writing','W'],['Speaking','S']].map(s=>`<label class="small sec-${s[1]}"><span class="tag">${s[0]}</span><br><select class="calc" style="width:100%;margin-top:6px">${opts}</select></label>`).join('')}</div>
 <div class="result" id="calcOut" style="margin-bottom:0"></div></div>`};
V.beranda.after=()=>{const upd=()=>{const v=$$('.calc').map(s=>+s.value);const o=r05(v.reduce((a,b)=>a+b,0)/4);$('#calcOut').innerHTML=`<div class="flex" style="gap:24px"><div><span class="small muted">Skor total</span><div style="font-size:2.4rem;font-weight:800;font-family:Fraunces;line-height:1">${o.toFixed(1)}</div></div><div>≈ <b>${CONC[o]}</b> /120 · CEFR <b>${CEFR(o)}</b><br>${o>=4?'<span style="color:var(--ok);font-weight:700">✓ Memenuhi target 4.0</span>':'<span style="color:var(--bad);font-weight:700">Belum mencapai 4.0</span>'}</div></div>`};
 $$('.calc').forEach(s=>s.onchange=upd);upd();$('#examDate').onchange=e=>{ST.set('exam',e.target.value);render()};
 requestAnimationFrame(()=>setTimeout(()=>{const r=$('.rf');if(r)r.style.strokeDashoffset=r.dataset.off},60));bindPlanChecks()};

V.rencana=()=>{const d=ST.get('plan',{});const phc={Fondasi:'#dbeafe;color:#1d4ed8',Penguatan:'#ede9fe;color:#6d28d9',Simulasi:'#ffedd5;color:#c2410c','Hari H':'#dcfce7;color:#15803d'};
 const tot=PLAN.reduce((s,w)=>s+w.tasks.length,0),nd0=Object.values(d).filter(Boolean).length;
 return `<div class="page-head"><div><h1>Rencana Belajar 12 Minggu</h1><p class="muted">Dari level menengah ke band 4.0. Centang tugas yang selesai — progres tersimpan otomatis.</p></div><div class="stat" style="min-width:220px;padding:14px"><span>Progres total</span><b>${Math.round(nd0/tot*100)}%</b><div class="bar"><i style="width:${nd0/tot*100}%"></i></div></div></div>
 <div class="grid g2"><div class="card"><h3><i data-lucide="alarm-clock"></i>Rutinitas harian (±90 menit)</h3><div class="tbl"><table>
 <tr><td>15'</td><td>Kosakata: 15 kata baru + review flashcard</td></tr><tr><td>20'</td><td>Grammar / drill tipe soal sesuai minggu</td></tr><tr><td>20'</td><td>Reading: 1 teks + jawab pertanyaan</td></tr><tr><td>20'</td><td>Listening: audio + catat ide utama + shadowing</td></tr><tr><td>15'</td><td>Output: 1 email/diskusi ATAU rekam 2 jawaban interview</td></tr></table></div>
 <p class="small muted">Akhir pekan: 2–3 jam — review mingguan, tulis ulang kesalahan, dan tryout sesuai jadwal.</p></div>
 <div class="card"><h3><i data-lucide="layers"></i>4 Fase</h3><ul class="clean"><li><b>Minggu 1–4 · Fondasi</b> — grammar, word forms, kosakata, kenali format.</li><li><b>Minggu 5–8 · Penguatan</b> — skill per section, template Writing &amp; Speaking.</li><li><b>Minggu 9–11 · Simulasi</b> — kecepatan, tryout, latihan resmi ETS.</li><li><b>Minggu 12 · Hari H</b> — review ringan, persiapan teknis.</li></ul>
 <div class="tip">🎯 Untuk band 4.0 kamu tidak perlu sempurna: sekitar 60–70% benar di Reading &amp; Listening, plus jawaban Writing/Speaking yang jelas dan terstruktur sudah cukup kompetitif.</div></div></div>
 ${PLAN.map(w=>{const nd=w.tasks.filter((_,i)=>d[w.w+'-'+i]).length;return `<details class="week ${nd===w.tasks.length?'complete':''}" ${nd<w.tasks.length&&!PLAN.slice(0,w.w-1).some(p=>p.tasks.some((_,i)=>!d[p.w+'-'+i]))?'open':''}><summary><div class="wn">M${w.w}</div><div><b>${w.t}</b><span class="phase" style="background:${phc[w.ph]}">${w.ph}</span></div><span class="wprog"><span class="mini-bar"><i style="width:${nd/w.tasks.length*100}%"></i></span>${nd}/${w.tasks.length}</span></summary><div class="wb">${w.tasks.map((t,i)=>`<label class="chk ${d[w.w+'-'+i]?'done':''}"><input type="checkbox" data-plan="${w.w}-${i}" ${d[w.w+'-'+i]?'checked':''}><span>${t}</span></label>`).join('')}</div></details>`}).join('')}`};
function bindPlanChecks(){$$('[data-plan]').forEach(c=>c.onchange=()=>{const d=ST.get('plan',{});d[c.dataset.plan]=c.checked;ST.set('plan',d);c.closest('.chk').classList.toggle('done',c.checked);if(c.checked)markActive();
 const wk=c.closest('.week');if(wk){const all=wk.querySelectorAll('input'),n=[...all].filter(x=>x.checked).length;wk.querySelector('.wprog').innerHTML=`<span class="mini-bar"><i style="width:${n/all.length*100}%"></i></span>${n}/${all.length}`;wk.classList.toggle('complete',n===all.length);if(n===all.length&&c.checked){toast('🎉 Minggu selesai! Hebat.');confetti()}}updateSideFoot()})}
V.rencana.after=bindPlanChecks;

let curMap='format';
V.mindmap=()=>`<div class="page-head"><div><h1>Mind Map</h1><p class="muted">Klik setiap simpul untuk melihat penjelasannya di panel samping.</p></div></div>
 <div class="tabs">${Object.entries(MAPS).map(([k,m])=>`<button class="${k===curMap?'on':''}" data-act="map" data-k="${k}">${m.title}</button>`).join('')}</div>
 <div class="grid" style="grid-template-columns:minmax(0,2.2fr) minmax(240px,1fr);align-items:start" id="mmGrid"><div class="mm-wrap">${drawMap(MAPS[curMap])}</div><div class="card mm-panel" id="mmPanel"><span class="pill"><i data-lucide="mouse-pointer-click"></i>Pusat</span><h3 style="margin-top:10px">${MAPS[curMap].center.replace('\n',' ')}</h3><p>${MAPS[curMap].cinfo}</p></div></div>
 <style>@media(max-width:860px){#mmGrid{grid-template-columns:1fr!important}}</style>`;
function drawMap(m){const W=1000,H=720,cx=500,cy=360,n=m.branches.length;let svg='',nodes='';const info=[];
 const start=n===4?-135:-90;
 m.branches.forEach((b,i)=>{const ang=(start+i*360/n)*Math.PI/180;const bx=cx+235*Math.cos(ang),by=cy+175*Math.sin(ang);
  svg+=`<path d="M${cx},${cy} Q${(cx+bx)/2},${(cy+by)/2+20} ${bx},${by}" stroke="${b.color}" stroke-width="5" fill="none" opacity=".55"/>`;
  const k=b.children.length,spread=n===4?24:20;
  b.children.forEach((c,j)=>{const a2=ang+((j-(k-1)/2)*spread)*Math.PI/180;const x=cx+405*Math.cos(a2),y=cy+295*Math.sin(a2);
   svg+=`<path d="M${bx},${by} L${x},${y}" stroke="${b.color}" stroke-width="2" fill="none" opacity=".45"/>`;
   const w=c.name.length*7.6+22;info.push([c.name,c.info,b.color,b.name]);
   nodes+=`<g class="mm-node" data-act="mmnode" data-i="${info.length-1}"><rect x="${x-w/2}" y="${y-16}" width="${w}" height="32" rx="16" class="leaf" stroke="${b.color}" stroke-width="2"/><text class="leaf" x="${x}" y="${y+5}" text-anchor="middle" font-size="13" font-weight="600">${c.name}</text></g>`});
  const bw=b.name.length*9+30;info.push([b.name,b.info,b.color,'Cabang utama']);
  nodes+=`<g class="mm-node" data-act="mmnode" data-i="${info.length-1}"><rect x="${bx-bw/2}" y="${by-21}" width="${bw}" height="42" rx="21" fill="${b.color}"/><text x="${bx}" y="${by+6}" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">${b.name}</text></g>`});
 const ls=m.center.split('\n');
 nodes+=`<g class="mm-node" data-act="mmnode" data-i="c"><circle cx="${cx}" cy="${cy}" r="74" fill="#2e2a78"/><circle cx="${cx}" cy="${cy}" r="82" fill="none" stroke="#4f46e5" stroke-width="3" stroke-dasharray="6 6"/>${ls.map((l,i)=>`<text x="${cx}" y="${cy+6+(i-(ls.length-1)/2)*24}" text-anchor="middle" font-size="${i?17:21}" font-weight="800" fill="#fff" font-family="Fraunces,serif">${l}</text>`).join('')}</g>`;
 window.MMINFO=info;return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${m.title}" style="font-family:'Plus Jakarta Sans',sans-serif">${svg}${nodes}</svg>`}

V.rangkuman=()=>`<h1>Rangkuman Kilat</h1><p class="muted">Satu halaman untuk diulang setiap minggu — dan di malam sebelum tes.</p>
<div class="grid g2">
<div class="task sec-R"><h3>📖 Reading</h3><ul class="clean">
<li><b>Complete the Words:</b> baca seluruh paragraf dulu → tentukan kelas kata dari posisinya → cek akhiran (-s, -ed, -ly, -tion) → periksa ejaan.</li>
<li><b>Daily Life:</b> cari <i>tujuan</i> teks (judul, kalimat pertama), lalu scanning angka/tanggal/nama.</li>
<li><b>Academic:</b> baca pertanyaan → temukan kata kunci → jawaban benar biasanya <i>parafrase</i>, bukan salinan kata.</li>
<li>Eliminasi: terlalu ekstrem (always/never), tidak disebut, kebalikan, benar tapi tak menjawab.</li></ul></div>
<div class="task sec-L"><h3>🎧 Listening</h3><ul class="clean">
<li><b>Choose a Response:</b> kenali jenis kalimat (Wh-, yes/no, ajakan, keluhan, permintaan). Hindari opsi yang mengulang kata yang sama/bunyi mirip.</li>
<li><b>Conversation:</b> catat MASALAH → SOLUSI → LANGKAH BERIKUTNYA.</li>
<li><b>Announcement:</b> apa yang berubah, kenapa, apa yang harus dilakukan pendengar.</li>
<li><b>Academic Talk:</b> topik, definisi, contoh, &amp; sinyal penting ("What's surprising…", "So…").</li></ul></div>
<div class="task sec-W"><h3>✍️ Writing</h3><ul class="clean">
<li><b>Build a Sentence:</b> temukan subjek &amp; verb dulu; indirect question = <i>where + S + V</i>; awali dengan huruf kapital potongan pertama yang logis.</li>
<li><b>Email (7'):</b> salam → tujuan → 3 poin (tandai First/Also/Finally) → penutup sopan. 120–170 kata.</li>
<li><b>Discussion (10'):</b> posisi jelas + 1 alasan kuat + contoh spesifik + tanggapi 1 mahasiswa. 100–150 kata.</li>
<li>Sisakan 1 menit untuk cek: agreement, tense, artikel, ejaan.</li></ul></div>
<div class="task sec-S"><h3>🗣️ Speaking</h3><ul class="clean">
<li><b>Listen &amp; Repeat:</b> dengarkan dalam "potongan makna", tirukan ritme &amp; intonasi; jika lupa satu kata, teruskan.</li>
<li><b>Interview:</b> Answer → Reason → Example → Wrap-up. Langsung jawab di kalimat pertama.</li>
<li>Pakai filler alami: <i>"That's an interesting question…", "Let me think…"</i> — lebih baik daripada diam.</li>
<li>Bicara sedikit lebih lambat dari biasanya; kejelasan &gt; kecepatan.</li></ul></div></div>
<div class="card"><h3>🏆 10 Aturan Emas Menuju 4.0</h3><ol>
<li>Belajar <b>setiap hari</b> walau 30 menit — spacing effect lebih kuat dari belajar maraton.</li>
<li>Kuasai <b>word forms</b> dan <b>indirect questions</b> — dua kunci tipe soal baru.</li>
<li>Kosakata: 15 kata/hari, selalu dengan contoh kalimat.</li>
<li>Baca &amp; dengar konten akademik ringan (sains populer, TED-Ed).</li>
<li>Hafalkan <b>template</b> Email, Discussion, dan Interview sampai otomatis.</li>
<li>Rekam suaramu; dengarkan ulang &amp; perbaiki.</li>
<li>Catat semua kesalahan di <b>error log</b>.</li>
<li>Tidak ada pengurangan nilai — <b>jangan biarkan soal kosong</b>.</li>
<li>Perhatikan waktu; jangan terpaku di satu soal sulit.</li>
<li>Tidur cukup &amp; datang lebih awal di hari tes.</li></ol></div>
<div class="card"><h3>💬 Golden Phrases</h3><div class="grid g3">
<div><h4>Email</h4><ul class="clean small"><li>I'm writing to let you know that…</li><li>Unfortunately, I won't be able to… because…</li><li>I was wondering whether…</li><li>Would it be possible to…?</li><li>I'd like to suggest that…</li><li>Thank you for your understanding.</li></ul></div>
<div><h4>Discussion</h4><ul class="clean small"><li>I see both sides, but I agree with X that…</li><li>The main reason is that…</li><li>For instance, in my experience…</li><li>While Y makes a fair point about…, …</li><li>As a result, …</li><li>Therefore, I believe…</li></ul></div>
<div><h4>Interview</h4><ul class="clean small"><li>Personally, I prefer… mainly because…</li><li>Let me give you an example.</li><li>A good example of this is when…</li><li>That's why I think…</li><li>On the other hand, …</li><li>Overall, …</li></ul></div></div></div>`;

let tsec='all';
V.tips=()=>{const secs=[['all','Semua'],['R','Reading'],['L','Listening'],['W','Writing'],['S','Speaking']];const names={R:'Reading',L:'Listening',W:'Writing',S:'Speaking'};
 const list=TIPS.filter(t=>tsec==='all'||t.sec===tsec);
 return `<div class="page-head"><div><h1>Tips &amp; Trik Menjawab</h1><p class="muted">Strategi praktis untuk ke-12 tipe soal TOEFL iBT 2026: cara kerja, trik cepat, jebakan yang harus dihindari, dan latihan harian.</p></div></div>
 <div class="grid g3" style="margin-bottom:18px">${TIPS_GENERAL.map(g=>`<div class="stat"><div class="ico"><i data-lucide="${g[0]}"></i></div><h4>${g[1]}</h4><span>${g[2]}</span></div>`).join('')}</div>
 <div class="tabs">${secs.map(s=>`<button class="${tsec===s[0]?'on':''}" data-act="tsec" data-s="${s[0]}">${s[1]}</button>`).join('')}</div>
 ${list.map(t=>`<div class="task sec-${t.sec}"><div class="flex" style="justify-content:space-between"><div><span class="tag">${names[t.sec].toUpperCase()}</span><h3 style="margin:8px 0 2px">${t.name}</h3></div><span class="pill" style="background:color-mix(in srgb,var(--c) 12%,transparent);color:var(--c)"><i data-lucide="clock"></i>${t.time}</span></div>
 <p class="muted" style="margin:.4em 0 .8em">${t.how}</p>
 <div class="grid g2" style="gap:14px"><div><h4 class="flex" style="gap:6px;color:var(--c)"><i data-lucide="zap"></i>Trik cepat</h4><ol style="margin:0;padding-left:1.2em">${t.tricks.map(x=>`<li>${x}</li>`).join('')}</ol></div>
 <div><h4 class="flex" style="gap:6px;color:var(--bad)"><i data-lucide="alert-triangle"></i>Jebakan</h4><ul class="clean">${t.traps.map(x=>`<li>${x}</li>`).join('')}</ul>
 <div class="tip" style="margin-top:12px"><b class="flex" style="gap:6px"><i data-lucide="dumbbell"></i>Latihan harian</b>${t.drill}</div></div></div></div>`).join('')}
 <div class="card"><h3><i data-lucide="target"></i>Langsung praktikkan</h3><div class="flex"><a class="btn" href="#latihan"><i data-lucide="target"></i>Drill per tipe soal</a><a class="btn ghost" href="#tryout"><i data-lucide="flag"></i>Kerjakan tryout</a></div></div>`};
V.reading=()=>`<div class="secHead sec-R"><span class="tag sec-R">READING · ±30 menit · adaptif</span><h1>Reading</h1><p class="muted">Modul 1 sama untuk semua peserta; performa kamu menentukan modul 2 (lebih sulit atau lebih mudah). Kerjakan modul 1 dengan teliti!</p></div>
<div class="task sec-R"><h3>1. Complete the Words</h3><p>Paragraf akademik pendek; pada beberapa kata, <b>separuh huruf terakhir dihapus</b>. Tugasmu: lengkapi hurufnya. Menguji kosakata, grammar, dan ejaan sekaligus.</p>
<p class="small muted">Contoh (coba isi lalu tekan Periksa):</p><div id="rdEx">${ctw('rx','Volcanoes form where molten rock {rea|ches} the surface of the Earth. When pressure {bui|lds} up underground, an {erup|tion} can occur.','')}<button class="btn sm" data-act="check" data-scope="#rdEx">Periksa</button></div>
<h4 style="margin-top:14px">Strategi</h4><ol><li>Baca <b>seluruh paragraf</b> sekali untuk memahami topik.</li><li>Untuk tiap celah, tentukan <b>kelas kata</b> dari posisinya (lihat Grammar topik 1).</li><li>Periksa <b>grammar</b>: subjek jamak? → verb tanpa -s; ada <i>has/have</i>? → V3; ada <i>the</i>? → noun.</li><li>Jumlah kotak = jumlah huruf hilang. Pastikan ejaanmu pas jumlahnya.</li><li>Kata fungsi (the, than, it, to, of) juga sering dipotong — jangan lewatkan yang "mudah".</li></ol>
<div class="warn">⚠️ Kesalahan umum: salah eja (<i>recieve</i> → receive), lupa -s/-es, salah bentuk (<i>importance</i> vs <i>important</i>).</div></div>
<div class="task sec-R"><h3>2. Read in Daily Life</h3><p>Teks pendek yang ditemui sehari-hari: <b>email, pengumuman, jadwal, menu, iklan, pesan teks, formulir</b>.</p>
<ul class="clean"><li><b>Pertanyaan tipikal:</b> tujuan teks, detail (tanggal, harga, lokasi), inferensi ("what can be inferred…"), apa yang harus dilakukan pembaca.</li><li><b>Strategi:</b> baca judul/subjek dulu → baca pertanyaan → scanning kata kunci, angka, nama.</li><li>Perhatikan kata pembatas: <i>only, except, not included, no longer, at least</i> — sering jadi kunci jawaban.</li></ul></div>
<div class="task sec-R"><h3>3. Read an Academic Passage</h3><p>Bacaan akademik ±200 kata (sains, sejarah, seni, sosial). Tidak perlu pengetahuan khusus — semua jawaban ada di teks.</p>
<div class="tbl"><table><tr><th>Tipe soal</th><th>Ciri pertanyaan</th><th>Strategi</th></tr>
<tr><td>Main idea</td><td>"The passage is mainly about…"</td><td>Pilih yang mencakup SELURUH teks, bukan satu detail.</td></tr>
<tr><td>Detail / factual</td><td>"According to the passage…"</td><td>Temukan kata kunci → baca 1–2 kalimat di sekitarnya → cari parafrase.</td></tr>
<tr><td>Negative factual</td><td>"…EXCEPT / NOT mentioned"</td><td>Coret opsi yang ADA di teks; sisa = jawaban.</td></tr>
<tr><td>Vocabulary</td><td>"The word X is closest in meaning to"</td><td>Gantikan tiap opsi ke kalimat; pilih yang maknanya tetap.</td></tr>
<tr><td>Inference</td><td>"It can be inferred…"</td><td>Jawaban tidak tertulis langsung, tapi PASTI benar berdasarkan teks — bukan tebakan liar.</td></tr>
<tr><td>Rhetorical purpose</td><td>"Why does the author mention…"</td><td>Tanyakan: contoh untuk apa? Lihat kalimat sebelum/sesudahnya.</td></tr></table></div>
<h4 style="margin-top:14px">4 Jebakan opsi yang salah</h4><div class="grid g4"><div class="note"><b>Terlalu ekstrem</b><br><span class="small">always, never, all, only</span></div><div class="note"><b>Tidak disebut</b><br><span class="small">terdengar logis, tapi tidak ada di teks</span></div><div class="note"><b>Kebalikan</b><br><span class="small">memutar fakta teks</span></div><div class="note"><b>Benar tapi tidak relevan</b><br><span class="small">ada di teks, tapi tidak menjawab pertanyaan</span></div></div></div>
<div class="card"><h3>📝 Rangkuman</h3><p>Reading = <b>kosakata + parafrase</b>. Investasi terbesarmu: kosakata akademik (lihat halaman Kosakata) dan membaca 20 menit setiap hari. Lanjut ke <a href="#latihan">Drill</a> untuk latihan.</p></div>`;

V.listening=()=>`<div class="secHead sec-L"><span class="tag sec-L">LISTENING · ±29 menit · adaptif</span><h1>Listening</h1><p class="muted">Audio hanya diputar sekali. Kamu boleh mencatat. Di website ini audio dibacakan dengan suara sintetis (Text-to-Speech) dari browser.</p></div>
<div class="note">🔊 Kecepatan audio: <select id="rateSel">${[0.8,0.9,0.92,1,1.1].map(r=>`<option ${ST.get('rate',0.92)==r?'selected':''} value="${r}">${r}×</option>`).join('')}</select> <span class="small muted">Mulai dari 0.9×; naikkan ke 1× menjelang tes.</span></div>
<div class="task sec-L"><h3>1. Listen and Choose a Response</h3><p>Kamu mendengar <b>satu kalimat</b> (pertanyaan/pernyataan), lalu memilih respons yang paling alami.</p>
<div class="tbl"><table><tr><th>Jenis kalimat</th><th>Contoh</th><th>Respons yang cocok</th></tr>
<tr><td>Wh- question</td><td>When is the deadline?</td><td>Waktu: "Next Friday."</td></tr><tr><td>Yes/No</td><td>Have you read my slides?</td><td>Yes/No atau jawaban tidak langsung: "Not yet, I'll do it tonight."</td></tr>
<tr><td>Ajakan / saran</td><td>Why don't we study together?</td><td>"Good idea!" / "Sorry, I can't."</td></tr><tr><td>Permintaan</td><td>Would you mind closing the door?</td><td>"Not at all." (= tidak keberatan)</td></tr>
<tr><td>Keluhan / pernyataan</td><td>The printer keeps jamming.</td><td>Solusi/empati: "Try the one upstairs."</td></tr><tr><td>Pilihan (or)</td><td>Tuesday or Thursday?</td><td>Pilih salah satu, BUKAN yes/no.</td></tr></table></div>
<div class="warn">⚠️ Jebakan terbesar: opsi yang memakai <b>kata sama atau bunyi mirip</b> (close/clothes, chance, slide, trip). Biasanya itu salah!</div>
<div id="lsEx">${mcq('lx',{q:'Contoh: dengarkan lalu pilih respons terbaik.',o:["I believe it's Professor Diaz.","They charge ten dollars.","The event was fun.","On the committee."],e:"WHO → nama orang."},'', '')}<div class="flex">${playBtn('lx1',[{s:'N',t:"Who's in charge of the event planning committee?"}],0)}<button class="btn sm" data-act="check" data-scope="#lsEx">Periksa</button></div><div class="transcript">"Who's in charge of the event planning committee?"</div></div></div>
<div class="task sec-L"><h3>2. Conversation · 3. Announcement · 4. Academic Talk</h3>
<div class="grid g3"><div><h4>💬 Conversation</h4><p class="small">Percakapan kampus/sehari-hari. Pola umum: <b>Masalah → Saran/Solusi → Langkah berikutnya</b>.</p></div><div><h4>📢 Announcement</h4><p class="small">Pengumuman kelas/kampus. Catat: <b>Apa berubah? Kenapa? Apa yang harus dilakukan?</b></p></div><div><h4>🎓 Academic Talk</h4><p class="small">Kuliah singkat. Catat: <b>Topik → definisi → contoh → kesimpulan/sikap dosen</b>.</p></div></div>
<h4>Sinyal penting dalam kuliah</h4><p class="small"><i>"Today we'll talk about…"</i> (topik) · <i>"What's interesting/surprising is…"</i> (poin penting) · <i>"For example…"</i> (contoh) · <i>"In other words…"</i> (parafrase) · <i>"So…/The point is…"</i> (kesimpulan) · <i>"Now, you might think… but…"</i> (koreksi miskonsepsi)</p></div>
<div class="task sec-L"><h3>✏️ Simbol note-taking</h3><div class="tbl"><table><tr><th>Simbol</th><th>Arti</th><th>Simbol</th><th>Arti</th></tr>
<tr><td>↑ / ↓</td><td>naik / turun</td><td>→</td><td>menyebabkan / menjadi</td></tr><tr><td>= / ≠</td><td>sama / berbeda</td><td>∴</td><td>therefore</td></tr><tr><td>b/c</td><td>because</td><td>w/ , w/o</td><td>with, without</td></tr><tr><td>ex</td><td>example</td><td>imp</td><td>important</td></tr><tr><td>ppl</td><td>people</td><td>vs</td><td>dibandingkan</td></tr><tr><td>+ / –</td><td>kelebihan / kekurangan</td><td>?</td><td>belum jelas / pertanyaan</td></tr></table></div>
<div class="tip">💡 Jangan tulis kalimat lengkap. Tulis <b>kata kunci</b> dalam 2 kolom: ide utama (kiri) &amp; detail/contoh (kanan).</div></div>
<div class="card"><h3>📝 Latihan harian yang paling efektif</h3><ul class="clean"><li><b>Dikte</b> 5 menit: putar 1 kalimat, tulis persis, cek transkrip.</li><li><b>Shadowing</b> 10 menit: ulangi audio sambil mendengarkan.</li><li>1 video TED-Ed/hari → tulis 3 ide utama dalam bahasa Inggris.</li></ul></div>`;
V.listening.after=()=>{const s=$('#rateSel');if(s)s.onchange=()=>ST.set('rate',+s.value)};

V.writing=()=>`<div class="secHead sec-W"><span class="tag sec-W">WRITING · ±23 menit</span><h1>Writing</h1><p class="muted">Tiga tipe tugas pendek dan fungsional.</p></div>
<div class="task sec-W"><h3>1. Build a Sentence</h3><p>Kamu melihat satu kalimat dalam percakapan, lalu menyusun <b>potongan kata</b> menjadi respons yang benar secara grammar dan logis.</p>
<h4>Langkah</h4><ol><li>Baca konteks: pertanyaan apa yang dijawab?</li><li>Temukan <b>subjek + verb</b> utama.</li><li>Cek apakah kalimatnya pertanyaan (aux di depan) atau pernyataan.</li><li>Untuk <b>indirect question</b> (know/tell me/wonder/sure + wh-): subjek SEBELUM verb.</li><li>Letakkan keterangan tempat → waktu di akhir: <i>…on the desk in your room yesterday</i>.</li></ol>
<div id="wbEx">${bsItem('wbx',{c:"Where is the career fair this year?",k:["I am","not sure","where","it","will be","held"]},'','')}<button class="btn sm" data-act="check" data-scope="#wbEx">Periksa</button></div></div>
<div class="task sec-W"><h3>2. Write an Email (±7 menit)</h3><p>Situasi sehari-hari/kampus (meminta, menjelaskan, mengeluh, menyarankan). Biasanya ada <b>3 poin</b> yang wajib dijawab. Target 120–170 kata.</p>
<div class="tpl">Dear <em>Ms./Mr. [Nama]</em>, (atau Hi <em>[Nama]</em>, untuk teman)

I hope you are doing well. I am writing to <em>[tujuan: let you know / ask about / explain]</em>.

First, <em>[poin 1 + 1 detail/alasan]</em>.

Also, <em>[poin 2 + detail]</em>. I was wondering whether <em>[...]</em>.

Finally, I'd like to suggest that <em>[poin 3 + manfaatnya]</em>.

Thank you for your understanding. I look forward to hearing from you.

Best regards,
<em>[Nama]</em></div>
<div class="tip">✅ Checklist: semua 3 poin terjawab · nada sopan sesuai penerima · paragraf jelas · 1 detail spesifik per poin · cek grammar.</div></div>
<div class="task sec-W"><h3>3. Write for an Academic Discussion (±10 menit)</h3><p>Dosen memberi pertanyaan, dua mahasiswa sudah berpendapat. Kamu menambahkan pendapatmu. Target <b>100–150 kata</b>.</p>
<div class="tpl"><em>[Posisi]</em> I see both sides, but I agree with <em>[Nama]</em> that <em>[...]</em>.
<em>[Alasan]</em> In my view, the main reason is that <em>[...]</em>.
<em>[Contoh]</em> For example, <em>[pengalaman pribadi / contoh spesifik]</em>.
<em>[Tanggapi]</em> While <em>[Nama lain]</em> makes a fair point that <em>[...]</em>, I believe <em>[...]</em> because <em>[...]</em>.
<em>[Kesimpulan]</em> Therefore, <em>[ulang posisi singkat]</em>.</div>
<div class="tip">💡 Jangan hanya mengulang ide mahasiswa lain — tambahkan <b>ide baru</b>. Contoh spesifik (angka, pengalaman, nama tempat) membuat tulisan lebih meyakinkan.</div></div>
<h2>Latihan dengan timer</h2>
${writeTask('wpE','Latihan Email',7,TRY[0].W.em.prompt,TRY[0].W.em.model)}
${writeTask('wpD','Latihan Academic Discussion',10,discPrompt(TRY[0].W.ds),TRY[0].W.ds.model)}
<p class="small muted">Catatan: soal latihan di atas sama dengan Tryout 1 — kerjakan Tryout 1 dulu bila belum.</p>`;

V.speaking=()=>`<div class="secHead sec-S"><span class="tag sec-S">SPEAKING · ±8 menit</span><h1>Speaking</h1><p class="muted">Dua tipe tugas pendek. Website tidak bisa merekam suara — gunakan aplikasi perekam di HP lalu nilai dirimu dengan rubrik.</p></div>
<div class="task sec-S"><h3>1. Listen and Repeat</h3><p>Dengarkan kalimat, lalu <b>ulangi persis</b>. Kalimat makin panjang. Dinilai: ketepatan kata, pelafalan, intonasi, kelancaran.</p>
<ul class="clean"><li>Dengarkan dalam <b>potongan makna</b>: <i>Study rooms / can be reserved online / for up to two hours.</i></li><li>Tirukan <b>ritme</b>: kata isi (noun, verb) ditekan, kata fungsi (to, the, of) diucapkan cepat.</li><li>Jika lupa satu kata, teruskan — jangan berhenti atau mengulang dari awal.</li><li>Latihan: <b>shadowing</b> 10–15 menit/hari.</li></ul>
<div class="note">${playBtn('sx1',[{s:'N',t:"Study rooms can be reserved online for up to two hours."}],0,'Coba: putar kalimat')} <button class="linkish" data-act="show-tr" data-t="srx">tampilkan teks</button><div class="transcript" id="tr-srx">"Study rooms can be reserved online for up to two hours."</div></div></div>
<div class="task sec-S"><h3>2. Take an Interview</h3><p>Pewawancara mengajukan beberapa pertanyaan tentang satu topik; kamu menjawab <b>langsung</b> (tanpa waktu persiapan) selama ±45 detik.</p>
<div class="tpl"><em>Answer</em>   → Personally, I prefer / I think <em>[jawaban langsung]</em>.
<em>Reason</em>   → The main reason is that <em>[...]</em>.
<em>Example</em>  → For example, last semester <em>[cerita singkat]</em>.
<em>Wrap-up</em>  → So overall, that's why I <em>[ulang jawaban]</em>.</div>
<details><summary>Contoh jawaban (±45 detik)</summary><p><b>Q:</b> Do you prefer studying alone or with other people?</p><p><i>"I generally prefer studying alone. The main reason is that I can concentrate better and move at my own pace. For example, when I prepared for my final exams last semester, I studied in a quiet corner of the library, and I finished reviewing much faster than when I studied with friends, because we often got distracted and started chatting. That said, I think group study is useful right before an exam to check answers. But overall, studying alone works best for me."</i></p></details>
<div class="grid g3"><div class="note"><b>Mengulur waktu berpikir</b><br><span class="small">That's an interesting question. / Let me think about that for a second.</span></div><div class="note"><b>Memberi contoh</b><br><span class="small">For instance… / A good example is when…</span></div><div class="note"><b>Menyimpulkan</b><br><span class="small">So overall… / That's why I believe…</span></div></div></div>
<div class="task sec-S"><h3>🎤 Latihan interview</h3><p class="small muted">Putar pertanyaan → mulai timer 45 detik → jawab sambil merekam di HP → nilai diri.</p>
${["What is your favorite way to spend a weekend, and why?","Describe a teacher who influenced you.","Do you think it's better to live in a big city or a small town?","What is one skill every student should learn? Why?","How do you usually prepare for an important exam?","Should students be allowed to use phones in class? Explain."].map((q,i)=>ivItem('spi'+i,q,i+1,'')).join('')}</div>`;
function ivItem(key,q,num,sec){return `<div class="unit" style="padding:10px 14px"><div class="flex"><b>Q${num}</b>${playBtn(key,[{s:'W',t:q}],0,'Dengar pertanyaan')}<button class="btn sm ghost" data-act="timer" data-key="${key}" data-sec="45">⏱ 45 detik</button><span class="clock" id="clk-${key}">0:45</span><button class="linkish" data-act="show-tr" data-t="${key}">tampilkan teks</button></div><div class="transcript" id="tr-${key}">${q}</div>${sec?selfScore(sec,5,SRUB):''}</div>`}

V.grammar=()=>`<h1>Grammar Inti</h1><p class="muted">12 topik yang paling berdampak pada skor format baru. Klik untuk membuka.</p>
${GRAMMAR.map((g,i)=>`<details ${i===0?'open':''}><summary>${g.t}</summary>${g.b}</details>`).join('')}
<h2 style="margin-top:26px">📝 Kuis Grammar (20 soal)</h2><div id="gq">${GQUIZ.map((q,i)=>mcq('gq'+i,q,i+1,'')).join('')}<div class="flex"><button class="btn" data-act="check" data-scope="#gq" data-save="gram">Periksa jawaban</button><button class="btn ghost" data-act="rerender">Ulangi</button></div></div>`;

let vfilter='all',vmode='cards',vcat='semua';
V.kosakata=()=>{const known=ST.get('known',{});const inCat=v=>vcat==='semua'||v[4]===vcat;const list=VOCAB.map((v,i)=>[v,i]).filter(([v])=>inCat(v)&&(vfilter==='all'||!known[v[0]]));
 const cnt=c=>VOCAB.filter(v=>c==='semua'||v[4]===c).length,kn=c=>VOCAB.filter(v=>(c==='semua'||v[4]===c)&&known[v[0]]).length;
 const cats=[['semua','Semua','layers'],['akademik','Akademik','book-open'],['kampus','Kehidupan Kampus','flag'],['sains','Sains & Alam','sparkles']];
 return `<div class="page-head"><div><h1>Kosakata Akademik</h1><p class="muted">${VOCAB.length} kata dari Academic Word List, kehidupan kampus, dan sains. Klik kartu untuk membalik, 🔊 untuk mendengar, tandai yang sudah hafal.</p></div></div>
 <div class="grid g4" style="margin-bottom:16px">${cats.map(c=>`<button class="stat" data-act="vcat" data-c="${c[0]}" style="text-align:left;cursor:pointer;font:inherit;color:inherit;${vcat===c[0]?'border-color:var(--pri);box-shadow:0 0 0 3px var(--pri-soft)':''}"><div class="ico"><i data-lucide="${c[2]}"></i></div><b style="font-size:1.25rem">${c[1]}</b><span>${kn(c[0])}/${cnt(c[0])} hafal</span><div class="bar"><i style="width:${kn(c[0])/cnt(c[0])*100}%"></i></div></button>`).join('')}</div>
 <div class="tabs"><button class="${vmode==='cards'?'on':''}" data-act="vmode" data-m="cards">🃏 Flashcard</button><button class="${vmode==='quiz'?'on':''}" data-act="vmode" data-m="quiz">❓ Kuis 10 soal</button><button class="${vmode==='list'?'on':''}" data-act="vmode" data-m="list">📄 Daftar</button>
 ${vmode==='cards'?`<span style="width:16px"></span><button class="${vfilter==='all'?'on':''}" data-act="vfilter" data-f="all">Semua</button><button class="${vfilter==='todo'?'on':''}" data-act="vfilter" data-f="todo">Belum hafal</button>`:''}</div>
 ${vmode==='cards'?`<div class="grid g4">${list.map(([v,i])=>`<div><div class="fc ${known[v[0]]?'known':''}" data-act="flip"><div class="fc-in"><div class="fc-f"><span class="small muted">#${i+1} · ${v[1]}</span><b>${v[0]}</b><span class="small muted">klik untuk balik</span></div><div class="fc-b"><b style="font-size:1.05rem">${v[2]}</b><p style="margin:.5em 0 0;opacity:.9"><i>${v[3]}</i></p></div></div></div><div class="fc-tools"><button class="linkish" data-act="say" data-t="${v[0]}. ${v[3].replace(/"/g,'')}">🔊 dengar</button><button class="linkish" data-act="known" data-w="${v[0]}">${known[v[0]]?'✓ hafal':'tandai hafal'}</button></div></div>`).join('')||'<p>🎉 Semua kata sudah ditandai hafal!</p>'}</div>`:''}
 ${vmode==='quiz'?vocabQuiz():''}
 ${vmode==='list'?`<div class="card tbl"><table><tr><th>#</th><th>Kata</th><th>Kelas</th><th>Arti</th><th>Contoh</th></tr>${VOCAB.map((v,i)=>[v,i]).filter(([v])=>inCat(v)).map(([v,i])=>`<tr><td>${i+1}</td><td><b>${v[0]}</b></td><td>${v[1]}</td><td>${v[2]}</td><td><i>${v[3]}</i></td></tr>`).join('')}</table></div>`:''}
 <div class="tip">💡 Target 3 bulan: kuasai ${VOCAB.length} kata di website ini dalam 6 minggu pertama (±25 kata/minggu), lalu tambah ±15 kata/hari dari <a href="https://www.eapfoundation.com/vocab/academic/awllists/" target="_blank">Academic Word List</a> (570 keluarga kata).</div>`};
function vocabQuiz(){const pool=VOCAB.filter(v=>vcat==='semua'||v[4]===vcat);const pick=[...pool].sort(()=>Math.random()-.5).slice(0,10);const seed=Math.random().toString(36).slice(2,6);
 return `<div id="vq">${pick.map((v,i)=>{const others=VOCAB.filter(x=>x!==v).sort(()=>Math.random()-.5).slice(0,3).map(x=>x[2]);return mcq('vq'+seed+i,{q:`Arti kata <b>${v[0]}</b> (${v[1]})?`,o:[v[2],...others],e:`<i>${v[3]}</i>`},i+1,'')}).join('')}<div class="flex"><button class="btn" data-act="check" data-scope="#vq">Periksa</button><button class="btn ghost" data-act="rerender">Kuis baru</button></div></div>`}

let dtab='ctw';
V.latihan=()=>{const tabs=[['ctw','Complete the Words'],['dl','Read in Daily Life'],['cr','Choose a Response'],['bs','Build a Sentence'],['rp','Listen & Repeat']];
 let body='';
 if(dtab==='ctw')body=DRILL.ctw.map((t,i)=>`<h4>Paragraf ${i+1}</h4>${ctw('dc'+i,t,'')}`).join('');
 if(dtab==='dl')body=DRILL.dl.map((d,i)=>`<div class="notice"><b>${d.title}</b><br>${d.text}</div>${d.qs.map((q,j)=>mcq('dd'+i+j,q,j+1,'')).join('')}`).join('<hr>');
 if(dtab==='cr')body=DRILL.cr.map((it,i)=>`<div>${mcq('dr'+i,{q:`Soal ${i+1} — dengarkan, lalu pilih respons terbaik.`,o:it.o,e:it.e},'','')}<div class="flex" style="margin:-6px 0 6px 16px">${playBtn('drp'+i,[{s:'N',t:it.p}],0)}<button class="linkish" data-act="show-tr" data-t="dr${i}">tak ada suara? tampilkan teks</button></div><div class="transcript" id="tr-dr${i}">"${it.p}"</div></div>`).join('');
 if(dtab==='bs')body=DRILL.bs.map((it,i)=>bsItem('db'+i,it,i+1,'')).join('');
 if(dtab==='rp')body=`<p class="muted">Putar → ulangi dengan suara keras (rekam di HP) → buka teks untuk mengecek.</p>`+[...TRY[0].S.rp,...TRY[1].S.rp,"Before you submit your assignment, make sure you have included a list of references.","The professor explained that the experiment would need to be repeated several times."].map((s,i)=>`<div class="unit" style="padding:10px 14px"><div class="flex"><b>${i+1}.</b>${playBtn('drr'+i,[{s:'N',t:s}],0)}<button class="linkish" data-act="show-tr" data-t="drr${i}">tampilkan teks</button><span class="small muted">${s.split(' ').length} kata</span></div><div class="transcript" id="tr-drr${i}">${s}</div></div>`).join('');
 return `<h1>Drill per Tipe Soal</h1><p class="muted">Latihan fokus untuk tipe soal baru 2026. Ulangi sampai skor ≥ 80%.</p>
 <div class="tabs">${tabs.map(t=>`<button class="${dtab===t[0]?'on':''}" data-act="dtab" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>
 <div class="card" id="drill">${body}${dtab!=='rp'?`<div class="flex" style="margin-top:12px"><button class="btn" data-act="check" data-scope="#drill">Periksa jawaban</button><button class="btn ghost" data-act="rerender">Ulangi</button></div>`:''}</div>`};

/* ---------- Tryout ---------- */
let TO=null; // {i, start}
V.tryout=()=>{if(TO)return tryoutView(TO.i);const hist=ST.get('hist',[]);
 return `<div class="page-head"><div><h1>Tryout</h1><p class="muted">${TRY.length} paket lengkap 4 section mengikuti format 2026. Reading, Listening &amp; Build a Sentence dinilai otomatis; Email, Discussion &amp; Speaking dinilai sendiri dengan rubrik. Hasilnya <b>estimasi</b> band — bukan skor resmi ETS.</p></div></div>
 <div class="grid g3">${TRY.map((t,i)=>{const h=hist.filter(x=>x.n===t.name.split(' —')[0]);const best=h.length?Math.max(...h.map(x=>x.o)):null;const [nm,sub]=t.name.split(' — ');
 return `<div class="card try-card"><span class="num">${i+1}</span><span class="pill"><i data-lucide="calendar"></i>Minggu ${[1,6,8,10,11][i]||12}</span><h3 style="margin-top:12px">${nm}</h3><p class="muted small" style="margin-top:-6px">${sub}</p>
 <div class="flex small muted" style="gap:14px;margin:10px 0 14px"><span class="flex" style="gap:5px"><i data-lucide="clock"></i>±75 menit</span><span class="flex" style="gap:5px"><i data-lucide="layers"></i>4 section</span></div>
 ${best!==null?`<div class="note small" style="margin:0 0 14px"><b>Skor terbaik: ${best.toFixed(1)}</b> · ≈${CONC[best]}/120 · ${h.length}× dikerjakan</div>`:''}
 <button class="btn" data-act="start" data-i="${i}" style="width:100%;justify-content:center"><i data-lucide="${best!==null?'rotate-ccw':'play'}"></i>${best!==null?'Kerjakan lagi':'Mulai tryout'}</button></div>`}).join('')}</div>
 <div class="card"><h3><i data-lucide="info"></i>Aturan</h3><ul class="clean"><li>Kerjakan dalam satu duduk, di tempat tenang, dengan headphone.</li><li>Audio Listening hanya bisa diputar <b>2×</b> (di tes asli hanya 1×).</li><li>Gunakan timer: Reading 30', Listening 29', Writing 23', Speaking 8'.</li><li>Untuk Speaking, rekam jawabanmu dengan HP lalu nilai sendiri dengan jujur.</li><li>Setelah menekan <b>Selesai &amp; Nilai</b>, semua pembahasan, transkrip, dan contoh jawaban akan muncul.</li></ul></div>`};
function tryoutView(i){const T=TRY[i];let n=0;const k='t'+i;
 const R=`<section id="secR"><div class="secHead sec-R"><span class="tag sec-R">SECTION 1</span><h2>Reading <button class="btn sm ghost" data-act="timer" data-key="${k}R" data-sec="1800"><i data-lucide="timer"></i>30 menit</button><span class="clock" id="clk-${k}R">30:00</span></h2></div>
 <div class="task sec-R"><h3>Part A · Complete the Words</h3><p class="small muted">Lengkapi huruf yang hilang pada paragraf berikut.</p>${ctw(k+'ctw',T.R.ctw,'R')}</div>
 <div class="task sec-R"><h3>Part B · Read in Daily Life</h3><div class="notice"><b>${T.R.dl.title}</b><br><br>${T.R.dl.text}</div>${T.R.dl.qs.map((q,j)=>mcq(k+'dl'+j,q,j+1,'R')).join('')}</div>
 <div class="task sec-R"><h3>Part C · Academic Passage — ${T.R.ac.title}</h3><div class="passage">${T.R.ac.text}</div>${T.R.ac.qs.map((q,j)=>mcq(k+'ac'+j,q,j+1,'R')).join('')}</div></section>`;
 const L=`<section id="secL"><div class="secHead sec-L"><span class="tag sec-L">SECTION 2</span><h2>Listening <button class="btn sm ghost" data-act="timer" data-key="${k}L" data-sec="1740"><i data-lucide="timer"></i>29 menit</button><span class="clock" id="clk-${k}L">29:00</span></h2></div>
 <div class="task sec-L"><h3>Part A · Listen and Choose a Response</h3>${T.L.cr.map((it,j)=>`${mcq(k+'cr'+j,{q:`Soal ${j+1}: pilih respons terbaik.`,o:it.o,e:it.e},'','L')}<div class="flex" style="margin:-6px 0 8px 16px">${playBtn(k+'pcr'+j,[{s:'N',t:it.p}],2)}<button class="linkish" data-act="show-tr" data-t="${k}cr${j}">tak ada suara? tampilkan teks</button></div><div class="transcript" id="tr-${k}cr${j}">"${it.p}"</div>`).join('')}</div>
 <div class="task sec-L"><h3>Part B · Conversation</h3>${playBtn(k+'pcv',T.L.cv.lines,2,'Putar percakapan')} <button class="linkish" data-act="show-tr" data-t="${k}cv">tak ada suara? tampilkan teks</button><div class="transcript" id="tr-${k}cv">${T.L.cv.lines.map(l=>`<b>${l.s==='W'?'Woman':'Man'}:</b> ${l.t}`).join('<br>')}</div>${T.L.cv.qs.map((q,j)=>mcq(k+'cv'+j,q,j+1,'L')).join('')}</div>
 <div class="task sec-L"><h3>Part C · Announcement</h3>${playBtn(k+'pan',[{s:'W',t:T.L.an.text}],2,'Putar pengumuman')} <button class="linkish" data-act="show-tr" data-t="${k}an">tak ada suara? tampilkan teks</button><div class="transcript" id="tr-${k}an">${T.L.an.text}</div>${T.L.an.qs.map((q,j)=>mcq(k+'an'+j,q,j+1,'L')).join('')}</div>
 <div class="task sec-L"><h3>Part D · Academic Talk</h3>${playBtn(k+'pat',[{s:'M',t:T.L.at.text}],2,'Putar kuliah')} <button class="linkish" data-act="show-tr" data-t="${k}at">tak ada suara? tampilkan teks</button><div class="transcript" id="tr-${k}at">${T.L.at.text}</div>${T.L.at.qs.map((q,j)=>mcq(k+'at'+j,q,j+1,'L')).join('')}</div></section>`;
 const W=`<section id="secW"><div class="secHead sec-W"><span class="tag sec-W">SECTION 3</span><h2>Writing</h2></div>
 <div class="task sec-W"><h3>Part A · Build a Sentence</h3>${T.W.bs.map((it,j)=>bsItem(k+'bs'+j,it,j+1,'W')).join('')}</div>
 ${writeTask(k+'em','Part B · Write an Email',7,T.W.em.prompt,T.W.em.model,true)}
 ${writeTask(k+'ds','Part C · Academic Discussion',10,discPrompt(T.W.ds),T.W.ds.model,true)}</section>`;
 const S=`<section id="secS"><div class="secHead sec-S"><span class="tag sec-S">SECTION 4</span><h2>Speaking</h2></div>
 <div class="task sec-S"><h3>Part A · Listen and Repeat</h3><p class="small muted">Putar → ulangi segera (rekam di HP) → setelah selesai, buka teks dan nilai: 2 = persis, 1 = ada 1–2 kata salah/hilang, 0 = banyak yang hilang.</p>${T.S.rp.map((s,j)=>`<div class="unit" style="padding:10px 14px"><div class="flex"><b>${j+1}.</b>${playBtn(k+'rp'+j,[{s:'N',t:s}],2)}<button class="linkish" data-act="show-tr" data-t="${k}rp${j}">tampilkan teks</button></div><div class="transcript" id="tr-${k}rp${j}">${s}</div>${selfScore('S',2,'','Nilai')}</div>`).join('')}</div>
 <div class="task sec-S"><h3>Part B · Take an Interview</h3><p class="small muted">Dengar pertanyaan → mulai timer 45 detik → jawab langsung.</p>${T.S.iv.map((q,j)=>ivItem(k+'iv'+j,q,j+1,'S')).join('')}</div></section>`;
 return `<div class="sticky-bar"><div class="prog"><div class="flex small" style="gap:8px"><b>${T.name.split(' —')[0]}</b><span class="muted"><i data-lucide="clock" style="width:14px;height:14px;vertical-align:-2px"></i> <span id="tt-clock" class="clock" style="color:var(--pri)">0:00</span></span><span class="muted" id="ttAns"></span></div><div class="bar"><i id="ttBar" style="width:0"></i></div></div>${['R','L','W','S'].map(s=>`<a class="btn sm ghost sec-${s}" style="color:var(--c)" data-act="jump" data-to="sec${s}">${s}</a>`).join('')}<button class="btn sm" data-act="submit"><i data-lucide="check-circle-2"></i>Nilai</button><button class="icon-btn sm" data-act="quit" title="Keluar" aria-label="Keluar"><i data-lucide="x"></i></button></div>
 <div id="tryout"><div id="toResult"></div>${R}${L}${W}${S}<div class="flex" style="justify-content:center;margin:20px 0"><button class="btn" data-act="submit"><i data-lucide="check-circle-2"></i>Selesai &amp; Nilai</button></div></div>`}
V.tryout.after=()=>{if(!TO)return;drawAllBS();updateTryProg();const st=TO.start;TIMERS.tt=setInterval(()=>{const e=$('#tt-clock');if(e)e.textContent=fmt(Math.floor((Date.now()-st)/1000))},1000)};
function gradeTryout(){const scope=$('#tryout');if(scope.classList.contains('reviewed')){toast('Tryout ini sudah dinilai.');return}
 const sc={R:[0,0],L:[0,0],W:[0,0]};scope.querySelectorAll('.unit[data-sec]').forEach(u=>{if(!u.dataset.type)return;const [c,n]=evalUnit(u);const s=u.dataset.sec;if(sc[s]){sc[s][0]+=c;sc[s][1]+=n}});
 const self={W:[0,0,0],S:[0,0,0]};scope.querySelectorAll('select.self').forEach(s=>{const sec=s.dataset.sec;self[sec][1]+=+s.dataset.max;if(s.value!==''){self[sec][0]+=+s.value;self[sec][2]++}});
 scope.classList.add('reviewed');
 const bR=bandFromPct(sc.R[0]/sc.R[1]),bL=bandFromPct(sc.L[0]/sc.L[1]);
 const bsP=sc.W[0]/sc.W[1],wsP=self.W[1]?self.W[0]/self.W[1]:0;const bW=bandFromPct(bsP*.4+wsP*.6);
 const bS=bandFromPct(self.S[1]?self.S[0]/self.S[1]:0);
 const o=r05((bR+bL+bW+bS)/4);const name=TRY[TO.i].name.split(' —')[0];
 const hist=ST.get('hist',[]);hist.push({n:name,o,R:bR,L:bL,W:bW,S:bS,d:new Date().toLocaleDateString('id-ID',{day:'numeric',month:'short'})});ST.set('hist',hist);
 const weak=[['Reading',bR],['Listening',bL],['Writing',bW],['Speaking',bS]].sort((a,b)=>a[1]-b[1])[0];
 const miss=(self.W[2]<2||self.S[2]<9)?`<div class="warn small">⚠️ Beberapa nilai diri (Writing/Speaking) belum diisi dan dihitung 0. Isi lalu ulangi tryout untuk estimasi yang lebih akurat.</div>`:'';
 $('#toResult').innerHTML=`<div class="result"><h2>Hasil ${name}</h2><div class="bands">
 <div class="band sec-R"><span class="small">Reading</span><b>${bR.toFixed(1)}</b><span class="small muted">${sc.R[0]}/${sc.R[1]} benar</span></div>
 <div class="band sec-L"><span class="small">Listening</span><b>${bL.toFixed(1)}</b><span class="small muted">${sc.L[0]}/${sc.L[1]} benar</span></div>
 <div class="band sec-W"><span class="small">Writing</span><b>${bW.toFixed(1)}</b><span class="small muted">Build ${sc.W[0]}/${sc.W[1]} · diri ${self.W[0]}/${self.W[1]}</span></div>
 <div class="band sec-S"><span class="small">Speaking</span><b>${bS.toFixed(1)}</b><span class="small muted">diri ${self.S[0]}/${self.S[1]}</span></div>
 <div class="band total"><span class="small">TOTAL</span><b>${o.toFixed(1)}</b><span class="small">≈ ${CONC[o]} /120 · ${CEFR(o)}</span></div></div>
 <p>${o>=4?'🎉 <b>Estimasi sudah mencapai target 4.0!</b> Pertahankan dan perkuat konsistensi.':`Target 4.0 masih <b>${(4-o).toFixed(1)}</b> band lagi.`} Section terlemah: <b>${weak[0]}</b> — prioritaskan di minggu-minggu berikutnya.</p>${miss}
 <div class="flex" style="margin:6px 0 10px"><button class="btn sm" data-act="backList"><i data-lucide="arrow-right"></i>Kembali ke daftar tryout</button><a class="btn sm ghost" href="#beranda">Lihat riwayat di Beranda</a></div><p class="small muted">Gulir ke bawah untuk melihat pembahasan, transkrip, dan contoh jawaban. Estimasi ini bersifat perkiraan, bukan skor resmi ETS.</p></div>`;
 icons($('#toResult'));window.scrollTo({top:0,behavior:'smooth'});clearInterval(TIMERS.tt);markActive();if(o>=4)confetti()}

V.sumber=()=>`<h1>Sumber Belajar</h1><p class="muted">Materi website ini disusun dari informasi resmi ETS dan panduan persiapan TOEFL 2026, ditambah sumber belajar gratis berikut.</p>
<div class="grid g2">
<div class="card"><h3>🏛️ Resmi (ETS)</h3><ul class="clean">
<li><a href="https://www.ets.org/toefl" target="_blank">ETS TOEFL</a> — pendaftaran, TOEFL TestReady (latihan resmi), Official Guide.</li>
<li><a href="https://www.ets.org/toefl/scores" target="_blank">ETS — Skor &amp; tabel konversi 1–6 ↔ 0–120</a></li>
<li><a href="https://toeflaccess.ets.org/help/en/articles/11758550-toefl-ibt-updates-coming-january-2026" target="_blank">ETS — Pembaruan TOEFL iBT Januari 2026</a></li>
<li><a href="https://www.in.ets.org/toefl/institutions/ibt/about/content-structure" target="_blank">ETS — Struktur konten &amp; skala skor</a></li></ul></div>
<div class="card"><h3>📰 Panduan format 2026</h3><ul class="clean">
<li><a href="https://study.com/resources/all-toefl-test-changes.html" target="_blank">Study.com — Semua perubahan TOEFL 2026</a></li>
<li><a href="https://mliesl.edu/contents/the-new-toefl-ibt-2026-all-the-changes-you-need-to-know/" target="_blank">MLI ESL — The New TOEFL iBT 2026</a></li>
<li><a href="https://gmatclub.com/forum/the-complete-toefl-ibt-2026-preparation-guide-your-essential-roadmap-461237.html" target="_blank">GMAT Club — TOEFL iBT 2026 Preparation Guide</a></li></ul></div>
<div class="card"><h3>🎧 Listening &amp; Speaking</h3><ul class="clean">
<li><a href="https://www.bbc.co.uk/learningenglish" target="_blank">BBC Learning English</a> — 6 Minute English (pas untuk shadowing)</li>
<li><a href="https://ed.ted.com" target="_blank">TED-Ed</a> — kuliah singkat 4–6 menit</li>
<li><a href="https://youglish.com" target="_blank">YouGlish</a> — cek pelafalan kata dalam video nyata</li></ul></div>
<div class="card"><h3>📖 Reading, Kosakata &amp; Writing</h3><ul class="clean">
<li><a href="https://www.newsinlevels.com" target="_blank">News in Levels</a> — berita dengan 3 tingkat kesulitan</li>
<li><a href="https://www.eapfoundation.com/vocab/academic/awllists/" target="_blank">Academic Word List (EAP Foundation)</a></li>
<li><a href="https://dictionary.cambridge.org" target="_blank">Cambridge Dictionary</a> — arti, contoh, audio</li>
<li><a href="https://owl.purdue.edu" target="_blank">Purdue OWL</a> — grammar &amp; menulis akademik</li></ul></div></div>
<div class="warn small">⚠️ Detail format (jumlah soal per bagian, durasi persis) dapat diperbarui ETS. Selalu cek halaman resmi ETS sebelum hari tes.</div>
<div class="card"><h3>🗑️ Reset data</h3><p class="small muted">Progres, kosakata hafal, dan riwayat tryout tersimpan di browser ini saja.</p><button class="btn ghost" data-act="reset">Hapus semua progres</button> <span id="resetConf"></span></div>`;

/* =========================================================
   ROUTER & EVENTS
   ========================================================= */
/* ---------- streak & activity ---------- */
const dayKey=d=>{d=d||new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
function markActive(){const a=ST.get('days',{});if(!a[dayKey()]){a[dayKey()]=1;ST.set('days',a);updateStreak()}}
function getStreak(){const a=ST.get('days',{});let n=0;const d=new Date();if(!a[dayKey(d)])d.setDate(d.getDate()-1);while(a[dayKey(d)]){n++;d.setDate(d.getDate()-1)}return n}
function updateStreak(){const n=getStreak();const el=$('#streak');if(!el)return;el.className='streak'+(n?'':' zero');el.innerHTML=`<i data-lucide="flame"></i>${n}<span class="lbl">&nbsp;hari</span>`;icons(el)}
function updateSideFoot(){const d=ST.get('plan',{});const tot=PLAN.reduce((s,w)=>s+w.tasks.length,0);const n=Object.values(d).filter(Boolean).length;const w=curWeek();
 $('#sideFoot').innerHTML=`<div class="flex" style="justify-content:space-between"><b>Minggu ${w.w}/12</b><span style="opacity:.7">${Math.round(n/tot*100)}%</span></div><div class="bar"><i style="width:${n/tot*100}%"></i></div><div style="opacity:.65;margin-top:6px;font-size:.74rem">${w.t}</div>`}
function icons(root){try{if(window.lucide)lucide.createIcons({attrs:{'aria-hidden':'true'},nameAttr:'data-lucide',root:root||document})}catch(e){try{lucide.createIcons()}catch(_){}}}

/* ---------- confetti ---------- */
function confetti(){const c=document.createElement('canvas');c.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:100';c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);const x=c.getContext('2d');
 const cols=['#4f46e5','#7c3aed','#f59e0b','#0d9488','#ec4899','#22c55e'];const P=Array.from({length:140},()=>({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*16,vy:Math.random()*-14-4,s:Math.random()*7+4,c:cols[Math.random()*cols.length|0],r:Math.random()*6}));
 let t=0;(function f(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.vy+=.45;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=.1;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore()});if(++t<140)requestAnimationFrame(f);else c.remove()})()}

/* ---------- tryout progress ---------- */
function answered(u){const t=u.dataset.type;if(t==='mcq')return !!u.querySelector('input:checked');if(t==='ctw'){const i=[...u.querySelectorAll('.ctw-in')];return i.filter(x=>x.value.trim()).length/i.length}if(t==='bs'){const st=BUILD[u.dataset.key];return st&&st.line.length>0}return 0}
function updateTryProg(){const sc=$('#tryout');if(!sc||!$('#ttBar'))return;const us=[...sc.querySelectorAll('.unit[data-type]')],ss=[...sc.querySelectorAll('select.self')];
 const done=us.reduce((s,u)=>s+(+answered(u)),0)+ss.filter(s=>s.value!=='').length,tot=us.length+ss.length;$('#ttBar').style.width=(done/tot*100)+'%';$('#ttAns').textContent=`· ${Math.round(done)}/${tot} terisi`;return [Math.round(done),tot]}

/* ---------- command palette ---------- */
let PAL=[],palSel=0;
function palItems(q){q=q.trim().toLowerCase();const pages=NAV.filter(n=>n[0]!=='grp').map(n=>({ic:n[1],t:n[2],k:'Halaman',href:'#'+n[0]}));
 const gram=GRAMMAR.map(g=>({ic:'puzzle',t:g.t.replace(/^\d+\.\s*/,''),k:'Grammar',href:'#grammar'}));
 const voc=VOCAB.map(v=>({ic:'languages',t:v[0],s:`${v[1]} · ${v[2]}`,k:'Kosakata',href:'#kosakata'}));
 const tasks=['Complete the Words','Read in Daily Life','Academic Passage','Choose a Response','Conversation','Announcement','Academic Talk','Build a Sentence','Write an Email','Academic Discussion','Listen and Repeat','Take an Interview'].map((t,i)=>({ic:'lightbulb',t,s:'Tips & trik menjawab',k:'Tipe soal',href:'#tips'}));
 const all=[...pages,...tasks,...gram,...voc];if(!q)return [...pages,...tasks.slice(0,4)];
 return all.filter(x=>(x.t+' '+(x.s||'')).toLowerCase().includes(q)).slice(0,30)}
function palDraw(){const q=$('#palInput').value;PAL=palItems(q);palSel=Math.min(palSel,Math.max(PAL.length-1,0));
 $('#palList').innerHTML=PAL.length?PAL.map((x,i)=>`<a class="pal-item ${i===palSel?'on':''}" href="${x.href}" data-pal="${i}"><i data-lucide="${x.ic}"></i><div>${x.t}${x.s?`<small>${x.s}</small>`:''}</div><span class="k">${x.k}</span></a>`).join(''):'<div class="pal-empty">Tidak ditemukan. Coba kata lain.</div>';icons($('#palList'))}
function openPal(){const m=$('#palette');m.hidden=false;$('#palInput').value='';palSel=0;palDraw();setTimeout(()=>$('#palInput').focus(),20)}
function closeModals(){$$('.modal').forEach(m=>m.hidden=true)}
$('#palInput').addEventListener('input',()=>{palSel=0;palDraw()});
$('#palInput').addEventListener('keydown',e=>{if(e.key==='ArrowDown'){palSel=Math.min(palSel+1,PAL.length-1);palDraw();e.preventDefault()}else if(e.key==='ArrowUp'){palSel=Math.max(palSel-1,0);palDraw();e.preventDefault()}else if(e.key==='Enter'&&PAL[palSel]){location.hash=PAL[palSel].href;closeModals()}});
$('#palList').addEventListener('click',e=>{const a=e.target.closest('[data-pal]');if(a)closeModals()});

/* ---------- focus timer ---------- */
const FT={len:25*60,left:25*60,run:false,h:null,mode:'Belajar'};
function ftDraw(){const C=2*Math.PI*52;$('#frFg').style.strokeDasharray=C;$('#frFg').style.strokeDashoffset=C*(1-FT.left/FT.len);$('#focusTime').textContent=fmt(FT.left);$('#focusMode').textContent=FT.mode;
 $('#focusBtn').innerHTML=FT.run?'<i data-lucide="pause"></i>Jeda':'<i data-lucide="play"></i>Mulai';icons($('#focusBtn'));
 const pill=$('#focusPill');pill.hidden=!(FT.run&&$('#focus').hidden);pill.innerHTML=`<i data-lucide="timer"></i>${fmt(FT.left)}`;icons(pill)}
function ftTick(){FT.left--;if(FT.left<=0){clearInterval(FT.h);FT.run=false;FT.left=0;toast(FT.mode==='Belajar'?'⏰ Sesi fokus selesai! Istirahat 5 menit.':'⏰ Istirahat selesai, ayo lanjut!');if(FT.mode==='Belajar'){markActive();confetti()}try{speakLines([{s:'N',t:FT.mode==='Belajar'?'Time is up. Take a short break.':'Break is over.'}])}catch(e){}}ftDraw()}

/* ---------- render ---------- */
function render(){clearTimers();closeSide();const v=location.hash.slice(1)||'beranda';const key=V[v]?v:'beranda';const fn=V[key];
 $('#nav').innerHTML=NAV.map(n=>n[0]==='grp'?`<div class="grp">${n[1]}</div>`:`<a href="#${n[0]}" class="${n[0]===key?'on':''}"><i data-lucide="${n[1]}"></i>${n[2]}${n[3]?`<span class="dot" style="background:var(--${n[3]})"></span>`:''}</a>`).join('');
 const cur=NAV.find(n=>n[0]===key);$('#crumb').innerHTML=`<i data-lucide="${cur[1]}"></i><span>${cur[2]}</span>`;
 $('#bottomNav').innerHTML=BOTTOM.map(b=>b[0]==='menu'?`<a href="#" data-act="openSide"><i data-lucide="menu"></i>${b[2]}</a>`:`<a href="#${b[0]}" class="${b[0]===key?'on':''}"><i data-lucide="${b[1]}"></i>${b[2]}</a>`).join('');
 for(const k in BUILD)delete BUILD[k];
 const m=$('#main');m.classList.remove('view');void m.offsetWidth;m.classList.add('view');
 m.innerHTML=fn();drawAllBS();if(fn.after)fn.after();updateSideFoot();updateStreak();icons();document.title=(cur[2]==='Beranda'?'':cur[2]+' · ')+'TOEFL Path — Persiapan TOEFL iBT 2026'}
window.addEventListener('hashchange',()=>{if(TO&&location.hash!=='#tryout'){TO=null}closeModals();render();window.scrollTo(0,0)});
function closeSide(){$('#side').classList.remove('open')}

function confirmBox(html,okLabel,onOk){$('#confirmBody').innerHTML=html+`<div class="flex" style="justify-content:flex-end;margin-top:18px"><button class="btn ghost" data-act="closeModal">Batal</button><button class="btn" id="cfOk">${okLabel}</button></div>`;$('#confirm').hidden=false;icons($('#confirmBody'));$('#cfOk').onclick=()=>{closeModals();onOk()}}

const ACT={
 play(t){const a=AUDIO[t.dataset.key];if(!a)return;PLAYS[t.dataset.key]=(PLAYS[t.dataset.key]||0)+1;window._playBtn=t;speakLines(a.lines);
  if(a.limit){const left=a.limit-PLAYS[t.dataset.key];const pc=$('#pc-'+t.dataset.key);if(pc)pc.textContent=left>0?`(sisa ${left}× putar)`:'(batas putar habis)';if(left<=0)setTimeout(()=>t.disabled=true,50)}},
 'show-tr'(t){const e=$('#tr-'+t.dataset.t);if(e)e.classList.toggle('show')},
 say(t){window._playBtn=null;speakLines([{s:'N',t:t.dataset.t}])},
 'bs-add'(t){const st=BUILD[t.dataset.key];if(t.closest('.done'))return;st.line.push(+t.dataset.i);bsDraw(t.dataset.key);updateTryProg()},
 'bs-rem'(t){const st=BUILD[t.dataset.key];if(t.closest('.done'))return;st.line=st.line.filter(i=>i!==+t.dataset.i);bsDraw(t.dataset.key);updateTryProg()},
 'bs-reset'(t){const st=BUILD[t.dataset.key];const u=t.closest('.unit');if(u.closest('.reviewed'))return;u.classList.remove('done','bs-ok','bs-bad');st.line=[];bsDraw(t.dataset.key);updateTryProg()},
 check(t){const sc=$(t.dataset.scope);const [c,n]=checkScope(sc);const p=Math.round(c/n*100);markActive();toast(`Skor: <b>${c}/${n}</b> (${p}%) ${p>=80?'🎉':''}`);if(p>=80&&n>2)confetti();
  let r=sc.querySelector('.scorebox');if(!r){r=document.createElement('div');r.className='result scorebox';sc.prepend(r)}r.innerHTML=`<div class="flex" style="gap:16px"><div style="font-family:Fraunces;font-size:2rem;font-weight:800;line-height:1">${p}%</div><div><b>${c} dari ${n} benar</b><br><span class="small">${p>=80?'Bagus! Lanjutkan ke materi berikutnya.':'Pelajari pembahasan di bawah, lalu ulangi.'}</span></div></div>`;r.scrollIntoView({behavior:'smooth',block:'center'})},
 rerender(){render()},
 timer(t){countdown(t.dataset.key,+t.dataset.sec)},
 map(t){curMap=t.dataset.k;render()},
 mmnode(t){const i=t.dataset.i;const p=$('#mmPanel');$$('.mm-node.sel').forEach(n=>n.classList.remove('sel'));t.classList.add('sel');if(i==='c'){const m=MAPS[curMap];p.innerHTML=`<span class="pill">Pusat</span><h3 style="margin-top:10px">${m.center.replace('\n',' ')}</h3><p>${m.cinfo}</p>`;return}
  const [n,inf,col,par]=MMINFO[+i];p.innerHTML=`<span class="pill" style="background:${col}22;color:${col}">${par}</span><h3 style="margin-top:10px;color:${col}">${n}</h3><p>${inf}</p>`;p.style.animation='none';void p.offsetWidth;p.style.animation='fadeUp .3s'},
 flip(t){t.classList.toggle('flip')},
 known(t){const k=ST.get('known',{});k[t.dataset.w]=!k[t.dataset.w];ST.set('known',k);if(k[t.dataset.w])markActive();if(vfilter==='todo'&&k[t.dataset.w]){render();return}t.textContent=k[t.dataset.w]?'✓ hafal':'tandai hafal';t.closest('div').previousElementSibling.classList.toggle('known',k[t.dataset.w])},
 vmode(t){vmode=t.dataset.m;render()},vcat(t){vcat=t.dataset.c;render()},vfilter(t){vfilter=t.dataset.f;render()},
 dtab(t){dtab=t.dataset.t;render()},tsec(t){tsec=t.dataset.s;render()},backList(){TO=null;render();window.scrollTo(0,0)},
 start(t){TO={i:+t.dataset.i,start:Date.now()};PLAYS={};markActive();if(location.hash!=='#tryout')location.hash='tryout';else render();window.scrollTo(0,0)},
 submit(){const sc=$('#tryout');if(sc&&sc.classList.contains('reviewed')){toast('Tryout ini sudah dinilai.');return}const [d,n]=updateTryProg()||[0,0];
  confirmBox(`<h3><i data-lucide="flag"></i>Selesai &amp; nilai sekarang?</h3><p class="muted">Kamu sudah mengisi <b>${d} dari ${n}</b> bagian. ${d<n?'Bagian yang kosong akan dihitung salah/0.':'Semua bagian sudah terisi. 👍'}</p>`,'Ya, nilai',gradeTryout)},
 quit(){confirmBox('<h3>Keluar dari tryout?</h3><p class="muted">Jawaban yang belum dinilai akan hilang.</p>','Keluar',()=>{TO=null;render()})},
 jump(t,e){e.preventDefault();const el=document.getElementById(t.dataset.to);if(el){const y=el.getBoundingClientRect().top+scrollY-150;scrollTo({top:y,behavior:'smooth'})}},
 reset(t){const c=$('#resetConf');if(!t.dataset.sure){t.dataset.sure=1;t.textContent='Yakin? Klik lagi untuk menghapus';return}
  ['plan','known','hist','exam','rate','days'].forEach(k=>{try{localStorage.removeItem('toeflpath_'+k)}catch(e){}});c.textContent='✅ Data dihapus.';t.textContent='Hapus semua progres';delete t.dataset.sure;updateSideFoot();updateStreak()},
 theme(){const r=document.documentElement;r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';ST.set('theme',r.dataset.theme)},
 palette(){openPal()},closeModal(){closeModals()},
 openSide(){$('#side').classList.add('open')},closeSide(){closeSide()},
 focus(){const f=$('#focus');f.hidden=!f.hidden;ftDraw()},focusClose(){$('#focus').hidden=true;ftDraw()},
 focusSet(t){clearInterval(FT.h);FT.run=false;const m=+t.dataset.m;FT.len=FT.left=m*60;FT.mode=m===5?'Istirahat':'Belajar';$$('#focusSeg button').forEach(b=>b.classList.toggle('on',b===t));ftDraw()},
 focusToggle(){if(FT.run){clearInterval(FT.h);FT.run=false}else{if(FT.left<=0)FT.left=FT.len;FT.run=true;FT.h=setInterval(ftTick,1000)}ftDraw()},
 focusReset(){clearInterval(FT.h);FT.run=false;FT.left=FT.len;ftDraw()}
};
document.addEventListener('click',e=>{const l=e.target.closest('a[href="#tryout"]');if(l&&TO&&location.hash==='#tryout'&&$('#tryout.reviewed')){e.preventDefault();TO=null;render();return}});
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t)return;const f=ACT[t.dataset.act];if(f){if(t.tagName==='A'||t.tagName==='BUTTON')e.preventDefault();f(t,e)}});
document.addEventListener('input',e=>{if(e.target.id&&e.target.id.startsWith('ta-')){const k=e.target.id.slice(3);const w=e.target.value.trim().split(/\s+/).filter(Boolean).length;const el=$('#wc-'+k);if(el)el.textContent=w+' kata'}if(e.target.closest&&e.target.closest('#tryout'))updateTryProg()});
document.addEventListener('change',e=>{if(e.target.closest&&e.target.closest('#tryout'))updateTryProg()});
document.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPal();return}
 if(e.key==='Escape'){closeModals();closeSide();return}
 if(e.target.classList&&e.target.classList.contains('ctw-in')&&e.key==='Enter'){const all=$$('.ctw-in');const i=all.indexOf(e.target);if(all[i+1])all[i+1].focus()}});
document.addEventListener('input',e=>{if(e.target.classList&&e.target.classList.contains('ctw-in')&&e.target.value.length>=+e.target.maxLength){const all=$$('.ctw-in');const i=all.indexOf(e.target);if(all[i+1]&&!all[i+1].value)all[i+1].focus()}});
markActive();render();

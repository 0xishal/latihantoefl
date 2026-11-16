/* =========================================================
   DATA
   ========================================================= */
const NAV=[
 ['grp','Mulai'],['beranda','layout-dashboard','Beranda'],['rencana','calendar-check','Rencana 12 Minggu'],['mindmap','network','Mind Map'],['rangkuman','sticky-note','Rangkuman Kilat'],['tips','lightbulb','Tips & Trik'],
 ['grp','Materi'],['reading','book-open','Reading','R'],['listening','headphones','Listening','L'],['writing','pen-line','Writing','W'],['speaking','mic','Speaking','S'],['grammar','puzzle','Grammar Inti'],['kosakata','languages','Kosakata Akademik'],
 ['grp','Latihan'],['latihan','target','Drill per Tipe Soal'],['tryout','flag','Tryout (5 Paket)'],
 ['grp','Lainnya'],['sumber','library','Sumber Belajar']
];
const BOTTOM=[['beranda','layout-dashboard','Beranda'],['rencana','calendar-check','Rencana'],['latihan','target','Drill'],['tryout','flag','Tryout'],['menu','menu','Menu']];

const CONC={6:'114–120',5.5:'107–113',5:'95–106',4.5:'86–94',4:'72–85',3.5:'58–71',3:'44–57',2.5:'34–43',2:'24–33',1.5:'12–23',1:'0–11'};
const CEFR=b=>b>=6?'C2':b>=5?'C1':b>=4?'B2':b>=3?'B1':b>=2?'A2':'A1';

const VOCAB=[
["analyze","v","menganalisis","Researchers analyzed data from 500 students."],
["approach","n","pendekatan","This approach to learning is more effective."],
["assess","v","menilai","The test assesses your reading skills."],
["assume","v","berasumsi/mengira","Many people assume that bats are blind."],
["benefit","n","manfaat","Exercise has many health benefits."],
["concept","n","konsep","The concept of gravity is hard to explain."],
["consistent","adj","konsisten","Her results were consistent across tests."],
["context","n","konteks","Guess the meaning from the context."],
["crucial","adj","sangat penting","Sleep is crucial for memory."],
["decline","v","menurun","Bee populations have declined."],
["demonstrate","v","menunjukkan/membuktikan","The study demonstrates a clear link."],
["derive","v","berasal/memperoleh dari","Many English words derive from Latin."],
["distinct","adj","berbeda jelas","There are three distinct stages."],
["diverse","adj","beragam","The city has a diverse population."],
["emerge","v","muncul","New problems emerged after the change."],
["enhance","v","meningkatkan","Music can enhance concentration."],
["estimate","v","memperkirakan","Scientists estimate the age of the rock."],
["evaluate","v","mengevaluasi","We need to evaluate both options."],
["evidence","n","bukti","There is little evidence for this theory."],
["evolve","v","berkembang/berevolusi","Birds evolved from dinosaurs."],
["factor","n","faktor","Cost is an important factor."],
["function","n","fungsi","The main function of roots is to absorb water."],
["hypothesis","n","hipotesis","The results support the hypothesis."],
["identify","v","mengidentifikasi","Can you identify the main idea?"],
["impact","n","dampak","Tourism has a major impact on the economy."],
["indicate","v","menunjukkan","The data indicate a rise in prices."],
["initial","adj","awal","Initial results were promising."],
["interpret","v","menafsirkan","Historians interpret the event differently."],
["maintain","v","mempertahankan","It is hard to maintain a healthy diet."],
["method","n","metode","This method saves time."],
["obtain","v","memperoleh","Students must obtain permission first."],
["occur","v","terjadi","Earthquakes often occur along fault lines."],
["phenomenon","n","fenomena","Rainbows are a natural phenomenon."],
["potential","adj","berpotensi","There are potential risks."],
["previous","adj","sebelumnya","The previous chapter explained this."],
["primary","adj","utama","The primary cause is pollution."],
["process","n","proses","Learning a language is a slow process."],
["require","v","membutuhkan/mewajibkan","The course requires a lot of reading."],
["resource","n","sumber daya","Water is a valuable resource."],
["significant","adj","signifikan/berarti","There was a significant increase."],
["similar","adj","mirip","The two species look similar."],
["specific","adj","spesifik","Give a specific example."],
["structure","n","struktur","The structure of the cell is complex."],
["sufficient","adj","cukup","There was not sufficient time."],
["survive","v","bertahan hidup","Few plants survive in the desert."],
["sustain","v","menopang/mempertahankan","The land cannot sustain more farms."],
["theory","n","teori","Darwin's theory changed biology."],
["transform","v","mengubah total","The internet transformed communication."],
["vary","v","bervariasi","Prices vary from city to city."],
["widespread","adj","tersebar luas","The disease became widespread."],
["abundant","adj","melimpah","Fish were abundant in the lake."],
["adapt","v","beradaptasi","Animals adapt to their environment."],
["consequence","n","konsekuensi/akibat","Pollution has serious consequences."],
["contrast","n","perbedaan/kontras","In contrast, cities are warmer."],
["scarce","adj","langka/sulit didapat","Food is scarce in winter."],
["deadline","n","tenggat waktu","The deadline is next Friday."],
["enroll","v","mendaftar (kuliah)","She enrolled in a biology course."],
["prerequisite","n","prasyarat","Statistics is a prerequisite for this class."],
["tuition","n","biaya kuliah","Tuition increased by 5% this year."],
["assignment","n","tugas","The assignment is due on Monday."]
];

const GRAMMAR=[
{t:"1. Kelas kata & bentuk kata (word forms) — paling penting untuk Complete the Words",b:`
<p>Di soal <b>Complete the Words</b> kamu harus tahu <i>bentuk</i> kata yang tepat. Kenali posisinya: setelah <i>the/a/adjective</i> → <b>noun</b>; setelah <i>to be / sebelum noun</i> → <b>adjective</b>; menerangkan verb/adjective → <b>adverb</b>.</p>
<div class="tbl"><table><tr><th>Kelas</th><th>Akhiran umum</th><th>Contoh</th></tr>
<tr><td>Noun</td><td>-tion, -sion, -ment, -ness, -ity, -ance/-ence, -er/-or, -ist, -ship</td><td>information, movement, happiness, ability, importance, researcher</td></tr>
<tr><td>Verb</td><td>-ize, -ify, -ate, -en</td><td>organize, simplify, create, strengthen</td></tr>
<tr><td>Adjective</td><td>-ful, -less, -ous, -ive, -able/-ible, -al, -ic, -ant/-ent</td><td>useful, careless, dangerous, active, possible, natural, basic, important</td></tr>
<tr><td>Adverb</td><td>-ly</td><td>quickly, significantly, usually</td></tr></table></div>
<div class="tip">✅ Keluarga kata: <i>produce (v) → product/production (n) → productive (adj) → productively (adv)</i>. Hafalkan dalam keluarga, bukan satu-satu.</div>`},
{t:"2. Subject–verb agreement",b:`
<ul class="clean"><li>Subjek tunggal → verb + s: <i>The <b>number</b> of students <b>has</b> increased.</i></li>
<li><i>A number of</i> + plural → verb jamak: <i>A number of students <b>have</b> complained.</i></li>
<li>Abaikan frasa di tengah: <i>The <b>list</b> of books <b>is</b> on the table.</i></li>
<li><i>Either/Neither ... or/nor</i> → ikuti subjek terdekat: <i>Neither the students nor the <b>teacher</b> <b>was</b> ready.</i></li>
<li><i>Everyone, each, every</i> → tunggal: <i>Everyone <b>needs</b> sleep.</i></li></ul>`},
{t:"3. Tenses ringkas yang paling sering muncul",b:`
<div class="tbl"><table><tr><th>Tense</th><th>Pola</th><th>Fungsi</th><th>Contoh</th></tr>
<tr><td>Simple present</td><td>V1/V1+s</td><td>fakta, kebiasaan</td><td>Bees <b>carry</b> pollen.</td></tr>
<tr><td>Simple past</td><td>V2</td><td>selesai di masa lalu</td><td>Writing <b>appeared</b> around 3200 BCE.</td></tr>
<tr><td>Present perfect</td><td>have/has + V3</td><td>pengalaman / sampai sekarang</td><td>Populations <b>have declined</b> since 1990.</td></tr>
<tr><td>Past perfect</td><td>had + V3</td><td>lebih dulu dari kejadian lampau lain</td><td>The lecture <b>had started</b> when we arrived.</td></tr>
<tr><td>Future</td><td>will / be going to</td><td>rencana, prediksi</td><td>I <b>will send</b> it tonight.</td></tr></table></div>
<div class="tip">Kata kunci: <b>since/for</b> → present perfect; <b>yesterday/ago/in 2019</b> → past; <b>by the time + past</b> → past perfect.</div>`},
{t:"4. Urutan kata pertanyaan & indirect question — kunci Build a Sentence",b:`
<p><b>Direct question:</b> (Wh-) + auxiliary + subject + verb → <i>Where <b>is</b> the station? / When <b>does</b> the bus <b>leave</b>?</i></p>
<p><b>Indirect question</b> (diawali <i>Do you know / Can you tell me / I wonder / I'm not sure</i>): Wh- + <b>subject + verb</b> (TIDAK dibalik, tanpa do/does):</p>
<div class="tbl"><table><tr><th>❌ Salah</th><th>✅ Benar</th></tr>
<tr><td>Do you know where is the library?</td><td>Do you know where <b>the library is</b>?</td></tr>
<tr><td>Can you tell me when does the class start?</td><td>Can you tell me when <b>the class starts</b>?</td></tr>
<tr><td>I'm not sure what time will it end.</td><td>I'm not sure what time <b>it will end</b>.</td></tr></table></div>
<p>Yes/No question jadi indirect pakai <b>if/whether</b>: <i>I wonder <b>whether</b> she is available.</i></p>`},
{t:"5. Relative clause (who, which, that, whose, where)",b:`
<ul class="clean"><li><b>who</b> → orang: <i>The student <b>who</b> won the prize...</i></li><li><b>which/that</b> → benda: <i>The book <b>which</b> I borrowed...</i></li>
<li><b>whose</b> → kepemilikan: <i>The professor <b>whose</b> class I took...</i></li><li><b>where</b> → tempat: <i>The city <b>where</b> I grew up...</i></li></ul>
<div class="tip">Dalam Build a Sentence sering muncul: <i>the one <b>that is</b> closest to...</i>, <i>the best ... <b>I have ever</b> seen</i>.</div>`},
{t:"6. Passive voice",b:`<p>Pola: <b>be + V3</b> (+ by agent). Dipakai saat pelaku tidak penting — sangat umum di teks akademik.</p>
<p><i>The report <b>was approved</b> last week. · Reefs <b>are built</b> by tiny animals. · The results <b>have been published</b>.</i></p>`},
{t:"7. Conditional",b:`<div class="tbl"><table><tr><th>Tipe</th><th>Pola</th><th>Contoh</th></tr>
<tr><td>0 (fakta)</td><td>If + present, present</td><td>If you heat ice, it melts.</td></tr>
<tr><td>1 (mungkin)</td><td>If + present, will + V1</td><td>If it rains, we will stay home.</td></tr>
<tr><td>2 (tidak nyata sekarang)</td><td>If + past, would + V1</td><td>If I <b>had</b> time, I <b>would</b> join.</td></tr>
<tr><td>3 (tidak nyata lampau)</td><td>If + had V3, would have V3</td><td>If I had studied, I would have passed.</td></tr></table></div>`},
{t:"8. Gerund vs infinitive",b:`
<ul class="clean"><li>Setelah <b>preposisi</b> → gerund: <i>interested in <b>studying</b>, good at <b>solving</b>, before <b>leaving</b></i></li>
<li>Verb + to V1: <i>decide, plan, want, need, hope, agree, refuse, expect</i> → <i>decided <b>to change</b></i></li>
<li>Verb + V-ing: <i>enjoy, avoid, finish, suggest, consider, mind, practice</i> → <i>practice <b>answering</b></i></li>
<li><i>Would you like <b>to</b> ...?</i> · <i>Would you mind <b>-ing</b> ...?</i></li></ul>`},
{t:"9. Modal & ungkapan fungsional (Email & Speaking)",b:`
<ul class="clean"><li>Meminta: <i>Could you please...? / Would it be possible to...? / I would appreciate it if you could...</i></li>
<li>Menyarankan: <i>Perhaps we could... / Why don't we...? / I'd suggest that...</i></li>
<li>Minta maaf/menolak: <i>Unfortunately, I won't be able to... because...</i></li>
<li>Kewajiban: <i>must / have to / need to / should</i></li></ul>`},
{t:"10. Kata penghubung (transitions)",b:`<div class="tbl"><table><tr><th>Fungsi</th><th>Kata</th></tr>
<tr><td>Tambahan</td><td>In addition, Moreover, Furthermore, Also</td></tr>
<tr><td>Kontras</td><td>However, Although (+klausa), Despite (+noun/V-ing), On the other hand, While</td></tr>
<tr><td>Sebab</td><td>because (+klausa), because of / due to (+noun), since</td></tr>
<tr><td>Akibat</td><td>Therefore, As a result, Consequently, So</td></tr>
<tr><td>Contoh</td><td>For example, For instance, such as</td></tr>
<tr><td>Syarat</td><td>otherwise, unless, as long as</td></tr></table></div>
<div class="warn">⚠️ <b>Although</b> it was raining (klausa) vs <b>Despite</b> the rain (noun). Jangan tertukar.</div>`},
{t:"11. Preposisi & kolokasi wajib hafal",b:`<p><i>interested <b>in</b> · good <b>at</b> · responsible <b>for</b> · depend <b>on</b> · consist <b>of</b> · result <b>in</b> · focus <b>on</b> · similar <b>to</b> · different <b>from</b> · in charge <b>of</b> · at the beginning <b>of</b> · <b>on</b> Monday · <b>in</b> March · <b>at</b> 9 a.m. · <b>since</b> 2019 · <b>for</b> two years</i></p>`},
{t:"12. Perbandingan (comparison)",b:`<ul class="clean"><li><i>more interesting <b>than</b> I expected</i> · <i>the most useful</i> · <i>better / the best</i></li>
<li><i><b>as</b> good <b>as</b></i> / <i>not as good as</i></li><li><i><b>The more</b> you practice, <b>the more confident</b> you become.</i></li></ul>`}
];

const GQUIZ=[
{q:"The scientist's ___ was published in a major journal.",o:["discovery","discover","discovered","discovering"],e:"Setelah possessive (scientist's) butuh <b>noun</b> → discovery."},
{q:"She speaks English very ___.",o:["fluently","fluent","fluency","fluentness"],e:"Menerangkan verb <i>speaks</i> → adverb (-ly)."},
{q:"Neither the students nor the teacher ___ aware of the change.",o:["was","were","are being","have"],e:"Neither...nor → ikuti subjek terdekat (teacher, tunggal) → was."},
{q:"If I ___ more time, I would join the club.",o:["had","have","will have","would have"],e:"Conditional tipe 2: If + past, would + V1."},
{q:"The report ___ by the committee last week.",o:["was approved","approved","has approving","is approve"],e:"Laporan tidak menyetujui dirinya sendiri → passive, last week → past: was approved."},
{q:"I'm interested in ___ abroad.",o:["studying","study","to study","studied"],e:"Setelah preposisi (in) → gerund."},
{q:"Do you know where ___?",o:["the station is","is the station","does the station","is station the"],e:"Indirect question: subject + verb tidak dibalik."},
{q:"She has lived here ___ 2019.",o:["since","for","during","from"],e:"Titik waktu awal + present perfect → since."},
{q:"___ it was raining, we went for a walk.",o:["Although","Because","Despite","However"],e:"Kontras + klausa (it was raining) → Although. Despite butuh noun."},
{q:"This is ___ interesting article I've read this year.",o:["the most","more","most","a most"],e:"Superlatif + 'I've read this year' → the most."},
{q:"He decided ___ his major to biology.",o:["to change","changing","change","changed"],e:"decide + to V1."},
{q:"The number of students ___ increased.",o:["has","have","are","were"],e:"Subjek inti 'The number' (tunggal) → has."},
{q:"We need to finish the project; ___, we will miss the deadline.",o:["otherwise","moreover","therefore","because"],e:"'Jika tidak' → otherwise."},
{q:"By the time we arrived, the lecture ___.",o:["had already started","already started","has already started","starts"],e:"By the time + past → past perfect untuk kejadian yang lebih dulu."},
{q:"The ___ of the new policy surprised everyone.",o:["announcement","announce","announced","announcing"],e:"Setelah 'The' dan sebelum 'of' → noun."},
{q:"She is very good ___ solving problems.",o:["at","in","on","for"],e:"Kolokasi: good at."},
{q:"Could you tell me what time ___?",o:["the bus leaves","does the bus leave","leaves the bus","the bus does leave"],e:"Indirect question: tanpa does, subject + verb."},
{q:"The more you practice, ___ you become.",o:["the more confident","more confident","the most confident","most confident"],e:"Pola: The more..., the more..."},
{q:"Many English words ___ from Latin.",o:["derive","derives","deriving","is derived"],e:"Subjek jamak (words) + fakta → derive."},
{q:"The book ___ I borrowed was very helpful.",o:["which","who","whose","where"],e:"Benda → which/that."}
];

/* ---------- Tryouts ---------- */
const TRY=[
{name:"Tryout 1 — Diagnostik",
R:{ctw:"Sleep is essential for good health. While we {sle|ep}, the brain {orga|nizes} memories and {remo|ves} waste products. Scientists {hav|e} found that adults {ne|ed} seven to nine {ho|urs} of sleep each {nig|ht}. People who {regu|larly} sleep less {th|an} this are more {lik|ely} to have problems with attention and mood.",
 dl:{title:"Email — Library Services",text:`<b>Subject:</b> Change to Study Room Bookings<br><br>Dear Students,<br>Starting Monday, March 3, all study rooms on the second floor of Hartley Library must be booked online through the student portal. Walk-in use will no longer be permitted. Each student may reserve a room for up to two hours per day. If you cannot use your booking, please cancel it at least one hour in advance so that others may use the room. Students who miss three bookings without cancelling will lose booking privileges for two weeks.<br><br>— Library Services`,
 qs:[{q:"What is the main purpose of the email?",o:["To announce new rules for reserving study rooms","To advertise newly built study rooms","To remind students about library opening hours","To apologize for closing the second floor"],e:"Seluruh email menjelaskan aturan booking baru."},
 {q:"What happens if a student misses three bookings without cancelling?",o:["The student cannot book rooms for two weeks","The student must pay a fine","The student must meet library staff","The student loses his or her library card"],e:"'...will lose booking privileges for two weeks.'"},
 {q:"What can be inferred about the study rooms before March 3?",o:["Students could use them without booking online","They were only available for two hours","They were located on the first floor","They required a phone reservation"],e:"'Walk-in use will <b>no longer</b> be permitted' → sebelumnya boleh walk-in."}]},
 ac:{title:"The Urban Heat Island Effect",text:`<p>Cities are often several degrees warmer than the surrounding countryside, a phenomenon known as the urban heat island effect. The main cause is the replacement of natural land cover with materials such as asphalt and concrete. These surfaces absorb sunlight during the day and <b>release</b> the stored heat slowly at night, which keeps urban temperatures high even after sunset. In addition, cities have fewer trees and plants. Vegetation normally cools the air through a process called evapotranspiration, in which water evaporates from leaves. Heat produced by cars, air conditioners, and factories adds further warmth.</p><p>The consequences can be serious. Higher temperatures increase energy demand, as residents rely more heavily on air conditioning, and they can worsen air pollution. During heat waves, the effect can even threaten public health, particularly for elderly people.</p><p>Fortunately, cities can reduce the problem. Planting trees along streets provides shade and cooling. Some cities have also introduced "cool roofs," which are painted with reflective materials that bounce sunlight back into the atmosphere rather than absorbing it. Green roofs, covered with plants, offer similar benefits while also absorbing rainwater.</p>`,
 qs:[{q:"The word <b>release</b> in the passage is closest in meaning to",o:["give off","collect","measure","block"],e:"Release heat = melepaskan panas = give off."},
 {q:"According to the passage, why do cities stay warm at night?",o:["Surfaces release heat they absorbed during the day","Factories operate mainly at night","Clouds trap heat over cities","Trees produce heat after sunset"],e:"Kalimat ke-3 paragraf 1."},
 {q:"All of the following are mentioned as causes of the effect EXCEPT",o:["tall buildings that block the wind","asphalt and concrete surfaces","a lack of vegetation","heat from cars and air conditioners"],e:"Gedung tinggi/angin tidak disebut sama sekali → jawaban EXCEPT."},
 {q:"Why does the author mention elderly people?",o:["To show that the effect can be dangerous for vulnerable groups","To explain why cities use more energy","To argue that older people prefer the countryside","To give an example of a solution"],e:"Rhetorical purpose: contoh kelompok rentan saat heat wave."},
 {q:"What can be inferred about cool roofs?",o:["They absorb less sunlight than ordinary roofs","They are covered with plants","They are more expensive than green roofs","They collect rainwater"],e:"Mereka memantulkan sinar 'rather than absorbing it'."}]}},
L:{cr:[{p:"Would you mind closing the window? It's getting a bit cold.",o:["Not at all. I'll do it right now.","Yes, it's very cold outside today.","The window was installed last year.","I closed my account yesterday."],e:"'Would you mind...?' dijawab 'Not at all' = tidak keberatan."},
 {p:"When is the deadline for the history paper?",o:["I think it's due next Friday.","It's about the history of Rome.","I'll pay for it later.","The line was too long."],e:"Pertanyaan WHEN → jawaban waktu."},
 {p:"I can't believe the bookstore is already out of the textbook.",o:["Maybe you could check the library for a copy.","Yes, the book is very interesting.","The store opens at nine.","I've already read that article."],e:"Keluhan → respons memberi solusi."},
 {p:"Have you had a chance to look at my presentation slides?",o:["Not yet, but I'll get to them tonight.","I had a great chance to win.","Yes, the slide in the park is fun.","The presentation is in Room 204."],e:"Jebakan kata mirip (chance, slide). Jawaban yang tepat: belum, nanti malam."}],
 cv:{lines:[{s:"W",t:"Hi, I'm looking for the biology lab manual for Professor Lee's class. The bookstore said it's sold out."},{s:"M",t:"Ah, a lot of students have asked about that. We have two copies on reserve at the front desk."},{s:"W",t:"Can I borrow one?"},{s:"M",t:"You can, but reserve items can only be used for three hours, and they can't leave the library."},{s:"W",t:"Three hours should be enough to copy this week's experiment. Is there a scanner I can use?"},{s:"M",t:"Yes, there's one on the first floor next to the printers. Scanning is free, but you'll need your student ID to log in."},{s:"W",t:"Perfect, thanks. I have my ID with me."}],
 qs:[{q:"Why does the woman talk to the man?",o:["To find a lab manual that is unavailable at the bookstore","To return a book she borrowed","To ask about a job at the library","To complain about the scanner"]},
 {q:"What does the man say about reserve items?",o:["They must stay in the library and can be used for three hours","They can be borrowed for three days","They are only for professors","They cost a small fee"]},
 {q:"What will the woman probably do next?",o:["Scan part of the manual on the first floor","Go back to the bookstore","Buy a copy online","Get a new student ID"]}]},
 an:{text:"Attention, all students in Introduction to Psychology. Tomorrow's lecture will not take place in Room 110 as usual. Because of a heating problem, we're moving to Walker Auditorium, which is across from the student center. The lecture will start fifteen minutes later than normal, at ten fifteen, to give everyone time to get there. Also, please remember that your first research summary is due at the beginning of class, so bring a printed copy with you.",
 qs:[{q:"Why is the lecture location changing?",o:["There is a heating problem in the usual room","The class has too many students","The professor is sick","Room 110 is being painted"]},{q:"What are students asked to do?",o:["Bring a printed copy of their research summary","Arrive fifteen minutes early","Meet at the student center","Email their summary to the professor"]}]},
 at:{text:"Today let's talk about the monarch butterfly, which makes one of the most remarkable migrations in the insect world. Every fall, millions of monarchs from Canada and the northern United States fly as far as four thousand kilometers to forests in central Mexico. What's really surprising is that no single butterfly makes the full round trip. The monarchs that fly south in the fall are a special generation. They live up to eight months, while summer monarchs live only about a month. In spring, these long-lived butterflies start the trip north, but they lay eggs along the way and then die. It takes three or four generations to reach Canada again. So how do they find their way to a place they've never been? Researchers believe monarchs use the position of the sun as a compass, and they correct for the sun's movement using an internal clock located in their antennae. Some evidence also suggests they can sense Earth's magnetic field, which may help on cloudy days.",
 qs:[{q:"What is the talk mainly about?",o:["How monarch butterflies complete their long migration","Why monarch populations are declining","The life cycle of insects in Mexico","How scientists track birds"]},{q:"What is surprising about the monarch migration?",o:["No single butterfly completes the full round trip","Monarchs fly only at night","Monarchs travel alone","The trip takes less than a month"]},{q:"According to the professor, how are fall monarchs different?",o:["They live much longer than summer monarchs","They are larger in size","They do not lay eggs","They cannot sense the sun"]},{q:"What may help monarchs navigate on cloudy days?",o:["Sensing Earth's magnetic field","Following other insects","Using the moon","Smelling flowers"]}]}},
W:{bs:[{c:"Where is the career fair this year?",k:["I am","not sure","where","it","will be","held"]},
 {c:"Why weren't you at the meeting yesterday?",k:["I","had to","take","my sister","to the doctor"]},
 {c:"Could you help me with my essay?",k:["can you","tell me","when","you are","free","this week"]},
 {c:"How was the guest lecture?",k:["it was","more","interesting","than","I expected"]},
 {c:"Is the library open on Sunday?",k:["it has been","closed","on weekends","since","last month"]}],
 em:{prompt:"You recently joined a university hiking club. The club leader, <b>Ms. Carter</b>, sent an email about a trip next Saturday, but you have a scheduling conflict.<br><br>Write an email to Ms. Carter. In your email:<ul class='clean'><li>explain why you cannot attend</li><li>ask whether there will be another trip soon</li><li>suggest an idea for a future club activity</li></ul>",
 model:"Dear Ms. Carter,<br><br>Thank you for organizing the hiking trip next Saturday. Unfortunately, I won't be able to join because I have to work an extra shift at my part-time job that day, and I couldn't find anyone to replace me.<br><br>I was really looking forward to my first trip with the club, so I was wondering whether another hike is planned for later this month. If so, I would be happy to help with the preparations.<br><br>I'd also like to suggest an idea for a future activity. Since many new members are beginners, perhaps we could hold a short workshop on basic hiking safety and map reading. I think it would help everyone feel more confident on longer trails.<br><br>Thank you for understanding, and I hope the trip goes well.<br><br>Best regards,<br>Dimas"},
 ds:{prof:"This week we're discussing technology in education. Some universities are replacing traditional textbooks with digital materials such as e-books and online resources. Do you think this is a good change? Why or why not?",
 s1:["Andrew","I support it. Digital materials are cheaper and can be updated quickly, so students always get current information."],
 s2:["Kelly","I'm not so sure. People often remember less when they read on screens, and staring at a screen for hours causes eye strain."],
 model:"I understand Kelly's concern about eye strain, but overall I agree with Andrew that switching to digital materials is a positive change. The biggest advantage, in my opinion, is accessibility. Printed textbooks can cost more than a hundred dollars each, which is a real burden for many students. With digital resources, students can access the same information at a much lower cost, often on devices they already own. In addition, digital materials offer interactive features such as videos and quizzes that help students understand difficult concepts. For example, when I studied chemistry, animations of molecular reactions were far clearer than the static pictures in my book. To reduce eye strain, universities could simply encourage students to take regular breaks. Therefore, I believe the benefits clearly outweigh the drawbacks."}},
S:{rp:["Welcome to the campus tour.","The library is on your left.","Please show your student card at the entrance.","Study rooms can be reserved online for up to two hours.","If you have any questions, our staff at the information desk will be happy to help."],
 iv:["Where do you usually prefer to study, and why?","Do you prefer studying alone or with other people? Explain your answer.","Some people say university students should have part-time jobs. What is your opinion?","How do you think technology will change the way students learn in the future?"]}},

{name:"Tryout 2 — Tengah Program",
R:{ctw:"Plastic is one of the most widely used {mate|rials} in the world. It is {che|ap}, light, and very {dura|ble}. However, these same {quali|ties} create a serious problem. {Beca|use} plastic does not {bre|ak} down easily, it can {rem|ain} in the environment for {hund|reds} of years. Much of {i|t} eventually ends up in the {oce|an}, where it harms sea life.",
 dl:{title:"Notice — Apartment Management",text:`<b>NOTICE TO ALL RESIDENTS — Water Shut-Off</b><br><br>The water supply to Buildings A and B will be turned off on Thursday, October 12, from 9:00 a.m. to 1:00 p.m. while plumbers replace an old pipe in the basement. Building C will not be affected. We recommend filling a few bottles with water the night before. If the work is finished early, water service will be restored immediately. For questions, contact the management office at extension 204. We apologize for the inconvenience.`,
 qs:[{q:"Why will the water be turned off?",o:["An old pipe is being replaced","The building is being cleaned","There is a water shortage in the city","The management office is moving"]},
 {q:"Who will NOT be affected by the shut-off?",o:["Residents of Building C","Residents of Building A","Residents of Building B","Everyone in the basement"]},
 {q:"What are residents advised to do?",o:["Store some water before Thursday","Leave the building by 9:00 a.m.","Call extension 204 to confirm","Turn off their own water pipes"]}]},
 ac:{title:"The Origins of Writing",text:`<p>Writing developed independently in several parts of the world, but the earliest known system appeared in Mesopotamia, in what is now Iraq, around 3200 BCE. Interestingly, it did not begin as a way to record stories or poems. Instead, it grew out of practical needs. As cities expanded, temple officials needed to keep track of goods such as grain, livestock, and textiles. At first, they used small clay tokens of different shapes to represent these items. Later, they began pressing marks into clay tablets, which were easier to store.</p><p>Over time, these marks became more <b>abstract</b>. Scribes used a reed tool to create wedge-shaped signs, a script now called cuneiform. Eventually, signs came to represent not only objects but also sounds, which allowed writers to record names, laws, and, much later, literature such as the Epic of Gilgamesh.</p><p>Learning cuneiform was difficult, since the system contained hundreds of signs. As a result, only a small group of trained scribes could read and write, and they held considerable status in society.</p>`,
 qs:[{q:"What is the main idea of the passage?",o:["Writing in Mesopotamia developed from practical record keeping into a complex system","Writing was invented to record poems and stories","Clay tokens were more useful than clay tablets","Scribes created the Epic of Gilgamesh"],e:"Main idea mencakup seluruh bacaan, bukan detail."},
 {q:"The word <b>abstract</b> in the passage is closest in meaning to",o:["less like real objects","more colorful","easier to read","larger"]},
 {q:"According to the passage, what did officials use before clay tablets?",o:["Small clay tokens","Reed paper","Wooden boards","Painted stones"]},
 {q:"What can be inferred about scribes?",o:["Their skills were rare and valued","They worked only for temples","They invented clay tokens","They wrote mainly poetry"],e:"Hanya kelompok kecil + 'considerable status' → keahlian langka & dihargai."},
 {q:"Why does the author mention the Epic of Gilgamesh?",o:["To give an example of a later use of writing beyond record keeping","To show that writing began with literature","To compare Mesopotamia with Egypt","To explain how cuneiform signs were made"]}]}},
L:{cr:[{p:"Do you want to grab lunch after class?",o:["Sure. How about the café near the gym?","I grabbed it from the shelf.","The class was about economics.","No, I don't have the textbook."]},
 {p:"I heard the professor extended the deadline.",o:["Really? That gives me more time to revise.","The professor is very tall.","I heard it on the radio.","No, the line isn't long."]},
 {p:"Which bus goes to the downtown campus?",o:["Take number twelve. It stops right in front.","The bus was crowded yesterday.","Downtown is very busy.","I'm going there by myself."]},
 {p:"Why don't we study together for the final?",o:["Good idea. Does Tuesday evening work for you?","Because the final is hard.","I studied biology last year.","We don't sell those here."],e:"'Why don't we...?' = ajakan, bukan pertanyaan alasan."}],
 cv:{lines:[{s:"M",t:"Professor Ruiz, do you have a minute? I wanted to ask about my research paper topic."},{s:"W",t:"Of course. What are you thinking of writing about?"},{s:"M",t:"I'd like to write about social media and political opinions, but I'm finding hundreds of sources. It's overwhelming."},{s:"W",t:"That's a common problem. The topic is too broad. Why not focus on one platform and one age group? For example, how young voters use short videos to learn about elections."},{s:"M",t:"That sounds much more manageable. Should I still use books, or just journal articles?"},{s:"W",t:"Recent journal articles will be more useful, since this field changes so quickly. Try the university's database instead of a general search engine."},{s:"M",t:"Great, I'll start there tonight."}],
 qs:[{q:"What is the student's problem?",o:["His topic is too broad","He missed the deadline","He cannot access the database","He does not like social media"]},{q:"What does the professor suggest?",o:["Narrowing the topic to one platform and one age group","Changing to a completely new topic","Interviewing young voters","Using only books"]},{q:"Why does the professor recommend journal articles?",o:["The field changes quickly, so recent sources are better","Books are too expensive","Journal articles are shorter","The library has no books on the topic"]}]},
 an:{text:"Good afternoon, everyone. This is a reminder that the university's annual job fair will take place next Wednesday in the main gym from ten a.m. to four p.m. More than sixty companies will attend, including several that are hiring for summer internships. To prepare, the Career Center is offering free résumé reviews this Friday and Monday. You don't need an appointment, but lines get long, so come early. Finally, business attire is recommended for the fair.",
 qs:[{q:"What is the main purpose of the announcement?",o:["To give information about an upcoming job fair","To announce new summer courses","To introduce a new Career Center director","To cancel the job fair"]},{q:"What does the speaker suggest about the résumé reviews?",o:["Students should arrive early","Students must make an appointment","They cost a small fee","They are only on Wednesday"]}]},
 at:{text:"Let's look at something that's directly useful for all of you: the spacing effect. In the 1880s, the German psychologist Hermann Ebbinghaus tested his own memory by learning lists of nonsense syllables. He discovered that we forget new information very quickly, much of it within a day, unless we review it. He also found that reviewing material several times over spread-out intervals leads to much better long-term memory than studying it all at once. Now, you might think cramming the night before an exam works fine. And sometimes it does, for the exam itself. But studies show that students who cram forget most of the material within weeks. By contrast, students who space their study sessions remember far more months later. So the practical lesson is simple: study a little every day, and review older material regularly, rather than relying on one long session.",
 qs:[{q:"What is the talk mainly about?",o:["The benefits of spreading study sessions over time","The life of Hermann Ebbinghaus","Why nonsense syllables are hard to learn","How to prepare for a job interview"]},{q:"How did Ebbinghaus conduct his research?",o:["He memorized lists of nonsense syllables himself","He interviewed hundreds of students","He studied sleeping patterns","He tested animals in a laboratory"]},{q:"What does the professor say about cramming?",o:["It may help on the exam, but the information is quickly forgotten","It is the most effective study method","It never helps students pass exams","It improves long-term memory"]},{q:"Why does the professor tell students to study a little every day?",o:["To give practical advice based on the research","To criticize Ebbinghaus's method","To explain why exams are difficult","To introduce a new topic"]}]}},
W:{bs:[{c:"What did the advisor tell you?",k:["she told me","to take","statistics","next semester"]},
 {c:"Are you coming to the party tonight?",k:["I would","come","if","I did not","have","an exam"]},
 {c:"I lost my notes from Monday's lecture.",k:["would you","like","to borrow","mine"]},
 {c:"Which dormitory do you live in?",k:["the one","that is","closest","to the library"]},
 {c:"Have you met our new lab partner?",k:["no","I have","never","seen him","before"]}],
 em:{prompt:"You ordered a used textbook online from a student marketplace, but the book you received is a different edition and has many pages missing.<br><br>Write an email to the seller, <b>Jordan</b>. In your email:<ul class='clean'><li>describe the problem with the book</li><li>explain why the correct edition matters for your class</li><li>ask for a solution</li></ul>",
 model:"Hi Jordan,<br><br>I recently received the used biology textbook I ordered from you, but unfortunately there is a problem. The listing said it was the 12th edition, but the book I received is the 10th edition. In addition, about twenty pages in Chapter 6 are missing.<br><br>The correct edition really matters for my class because my professor assigns homework problems by page number from the 12th edition, and the chapter order is different in older versions. Without the right book, I can't complete my weekly assignments.<br><br>Could you please send me the correct edition if you have it? If not, I would appreciate a full refund. I'm happy to return the book I received as soon as you confirm.<br><br>Thank you for your help.<br><br>Best,<br>Rani"},
 ds:{prof:"Many cities are considering making public transportation free for everyone, paid for by taxes. Would free public transportation be a good idea? Why or why not?",
 s1:["Maria","Yes. If buses and trains were free, more people would leave their cars at home, which would reduce traffic and air pollution."],
 s2:["Tom","I disagree. Someone still has to pay. Higher taxes could hurt people who never use public transport, and the money might be better spent improving the service."],
 model:"Both Maria and Tom raise valid points, but I agree with Maria that free public transportation would be a good idea. The main reason is that it would encourage people to change their habits. Many drivers choose cars because they think buses are expensive or inconvenient. If the fare were removed, more people would at least try public transport, and many might continue using it. This would lead to less traffic congestion and cleaner air, which benefits everyone, including people who still drive. For instance, Tallinn, the capital of Estonia, introduced free public transport for its residents in 2013. Tom is right that taxes would pay for it, but the savings from reduced pollution and road maintenance could help balance the cost. Therefore, I believe the benefits are worth it."}},
S:{rp:["Good morning, how can I help you?","The museum opens at ten o'clock.","Please leave large bags in the lockers near the entrance.","Our special exhibition about ancient Egypt is on the third floor.","Guided tours start every hour and last approximately forty-five minutes."],
 iv:["Tell me about a place in your city that you enjoy visiting.","What do you usually do to relax after a busy week?","Do you think people should reduce the amount of plastic they use? Why?","Should governments spend more money on parks or on public transportation? Explain."]}},

{name:"Tryout 3 — Simulasi Akhir",
R:{ctw:"Honeybees play a key role in agriculture. As {th|ey} move from flower to {flo|wer}, they carry pollen, which {hel|ps} plants produce fruit and {see|ds}. In fact, about one {thi|rd} of the food we eat {dep|ends} on pollinators like bees. {Unfortu|nately}, bee populations have {decl|ined} in many countries due {t|o} disease, pesticides, and the {lo|ss} of natural habitats.",
 dl:{title:"Schedule — Campus Fitness Center",text:`<b>Riverside Campus Fitness Center — Winter Schedule</b><br>Mon–Fri: 6:00 a.m. – 10:00 p.m. &nbsp;|&nbsp; Sat: 8:00 a.m. – 8:00 p.m. &nbsp;|&nbsp; Sun: Closed<br><br><b>Free group classes</b> (sign up at the front desk; max. 20 people per class):<br>• Yoga — Mon &amp; Wed, 5:30 p.m.<br>• Spin cycling — Tue &amp; Thu, 7:00 a.m.<br>• Basketball skills — Sat, 10:00 a.m.<br><br><i>Note:</i> The swimming pool will be closed for cleaning Jan 8–14. Lockers must be emptied every night; items left overnight will be removed.`,
 qs:[{q:"When can a student take a yoga class?",o:["Wednesday evening","Sunday morning","Tuesday morning","Saturday morning"]},
 {q:"What is true about the group classes?",o:["The number of participants is limited","They require a fee","They take place in the pool","They are held every day"]},
 {q:"What happens to items left in lockers overnight?",o:["They will be removed","They will be locked for a week","They will be sent to the front desk by mail","Nothing happens"]}]},
 ac:{title:"Why Some Animals Hibernate",text:`<p>Hibernation is a state of greatly reduced activity that allows certain animals to survive long, cold winters when food is <b>scarce</b>. During hibernation, an animal's body temperature drops sharply, its heart rate slows, and its breathing becomes shallow. A hibernating ground squirrel, for example, may lower its body temperature to near freezing and breathe only a few times per minute. These changes dramatically reduce the amount of energy the animal needs.</p><p>To prepare, hibernating animals eat large amounts of food in late summer and autumn, storing energy as body fat. Some species, such as chipmunks, also collect food and store it in their burrows, waking periodically to eat.</p><p>Interestingly, hibernation is not one continuous sleep. Most hibernators wake up every few weeks for short periods. Scientists are still not certain why, since these arousals use a large share of the animal's stored energy. One hypothesis is that the animals need to restore normal body functions, such as the immune system, that do not work properly at low temperatures.</p><p>Bears are often described as hibernators, but their body temperature falls only a few degrees, so some biologists prefer to call their winter state "torpor."</p>`,
 qs:[{q:"The word <b>scarce</b> in the passage is closest in meaning to",o:["hard to find","expensive","frozen","unhealthy"]},
 {q:"According to the passage, what happens to an animal during hibernation?",o:["Its body temperature and heart rate decrease","It eats large amounts of food","It grows thicker fur","It breathes more deeply"]},
 {q:"According to paragraph 2, how are chipmunks different from some other hibernators?",o:["They store food in burrows and eat during winter","They do not store body fat","They never wake up","They hibernate only in summer"]},
 {q:"Why does the author mention the immune system?",o:["To give a possible explanation for why hibernators wake up","To show that hibernation causes disease","To explain how animals store fat","To compare bears and squirrels"]},
 {q:"What can be inferred about bears?",o:["Their winter state is less extreme than true hibernation","They do not sleep in winter","Their body temperature drops to near freezing","They are not able to store fat"]}]}},
L:{cr:[{p:"How long have you been learning Spanish?",o:["For about two years now.","It's a long way from here.","Yes, I speak it every day.","I learned it from a book."],e:"HOW LONG → durasi."},
 {p:"Excuse me, is this seat taken?",o:["No, go ahead and sit down.","I took it yesterday.","Yes, I'd like a seat by the window.","The seat is made of plastic."]},
 {p:"I'm thinking of dropping my economics class.",o:["Really? You should talk to your advisor first.","Economics is about money.","Be careful not to drop it.","The class meets on Monday."]},
 {p:"Didn't you say you'd send me the notes?",o:["Sorry, I forgot. I'll email them right now.","No, I didn't say anything to her.","The notes are on the piano.","Yes, I sent a letter to my parents."]}],
 cv:{lines:[{s:"W",t:"Hey Sam, you look busy. What's going on?"},{s:"M",t:"I just signed up to volunteer at the food bank downtown. I start this Saturday."},{s:"W",t:"That's great! How did you hear about it?"},{s:"M",t:"There was a poster in the student center. They need people to sort donations, especially during the holidays."},{s:"W",t:"I've been wanting to do something like that. Do they need more volunteers?"},{s:"M",t:"Definitely. You just have to complete a short online training first. It only takes about thirty minutes."},{s:"W",t:"Okay, I'll do the training tonight. Maybe we can go together on Saturday."},{s:"M",t:"Sounds good. I'll text you the address."}],
 qs:[{q:"What are the speakers mainly discussing?",o:["Volunteering at a food bank","A job at the student center","A holiday party","An online course for credit"]},{q:"What must new volunteers do first?",o:["Complete a short online training","Bring a donation","Get a letter from a professor","Attend a meeting on Friday"]},{q:"What will the man do?",o:["Send the woman the address","Pick the woman up at her dorm","Take the training with her tonight","Put up a poster"]}]},
 an:{text:"Hello, Professor Kim here with a quick update for Environmental Science students. Our field trip to Clearwater Lake has been moved from this Saturday to next Saturday because heavy rain is expected. The bus will still leave from the parking lot behind the science building at eight a.m. Please wear boots and bring a water bottle and a notebook. If you can no longer attend on the new date, email me by Wednesday so I can give you an alternative assignment.",
 qs:[{q:"Why was the field trip rescheduled?",o:["Bad weather is expected","The bus is not available","The lake is closed","The professor is traveling"]},{q:"What should students who cannot attend the new date do?",o:["Email the professor by Wednesday","Find another student to take notes","Visit the lake on their own","Meet in the parking lot"]}]},
 at:{text:"In economics, one of the most important ideas is opportunity cost. Opportunity cost is the value of the next best alternative that you give up when you make a choice. Let me give you an example. Suppose you have a free Saturday afternoon. You could work a shift at a café and earn sixty dollars, or you could go to a concert with friends. If you choose the concert, the ticket price isn't your only cost. You're also giving up the sixty dollars you could have earned. That's your opportunity cost. Now, why does this matter? Because people often ignore hidden costs like this. Businesses face the same issue. If a company uses its factory to make one product, it can't use that space for another product that might be more profitable. Good decision makers always ask, what am I giving up, rather than only asking, how much does this cost.",
 qs:[{q:"What is the main purpose of the talk?",o:["To explain the concept of opportunity cost","To compare prices of concert tickets","To describe how cafés make a profit","To argue that students should not work"]},{q:"In the professor's example, what is the opportunity cost of going to the concert?",o:["The money the student could have earned at the café","The price of the ticket only","The cost of transportation","The time spent with friends"]},{q:"Why does the professor mention a company's factory?",o:["To show that the concept also applies to businesses","To describe how products are made","To explain why factories are expensive","To give an example of a hidden benefit"]},{q:"What does the professor imply about people in general?",o:["They often overlook hidden costs","They always choose the cheapest option","They understand economics well","They prefer working to entertainment"]}]}},
W:{bs:[{c:"Do you know what time the exam starts?",k:["I think","it starts","at nine","in the morning"]},
 {c:"Why did you choose this university?",k:["because","it has","one of","the best","engineering programs"]},
 {c:"The printer in the lab isn't working.",k:["has anyone","reported","the problem","to","the technician"]},
 {c:"What did you think of the movie?",k:["it was not","as good","as","the book"]},
 {c:"Where should I put these boxes?",k:["could you","leave them","next to","the door"]}],
 em:{prompt:"Your group is working on a class project, but one member, <b>Alex</b>, has not responded to messages for a week, and the presentation is in five days.<br><br>Write an email to Alex. In your email:<ul class='clean'><li>explain the current status of the project</li><li>describe what you need Alex to do</li><li>suggest a time to meet</li></ul>",
 model:"Hi Alex,<br><br>I hope everything is okay. I'm writing because we haven't heard from you for about a week, and our presentation is only five days away.<br><br>Right now, the rest of the group has finished the research and the first half of the slides. However, the section on the survey results, which you agreed to prepare, is still missing.<br><br>We need you to send your data and create three or four slides summarizing the main findings by Thursday evening. If you are having any difficulties, please let us know so we can divide the work differently.<br><br>Could we meet on Wednesday at 4 p.m. in the library study room to put everything together and practice? Please reply as soon as you can.<br><br>Thanks,<br>Fajar"},
 ds:{prof:"Some people believe that university students should be required to take courses outside their major, such as art, history, or science. Others think students should focus only on courses related to their future careers. Which view do you agree with, and why?",
 s1:["Claire","Required courses outside the major help students think more broadly. A business student who takes psychology, for example, might understand customers better."],
 s2:["Ryan","University is expensive and time is limited. Students should spend their time developing the skills employers actually want."],
 model:"I agree with Claire that students should be required to take courses outside their major. Although Ryan is right that university is expensive, I believe these courses actually make graduates more employable. Today's employers want people who can communicate well, solve unfamiliar problems, and work with people from different backgrounds. Courses in history or philosophy, for example, train students to analyze arguments and write clearly, which is useful in almost any job. In my case, an elective course in statistics helped me understand data in a marketing project, even though I was studying communication. Moreover, careers change quickly, so a narrow education may soon become outdated. Therefore, a broad education is not a waste of time but an investment in long-term success."}},
S:{rp:["Thank you for calling Student Housing.","Your room key is ready for pickup.","Laundry machines are located in the basement of each building.","Quiet hours begin at eleven p.m. on weeknights and midnight on weekends.","Residents who want to change rooms should submit a request before the end of the second week."],
 iv:["What kind of job would you like to have in the future, and why?","Describe a skill you learned recently. How did you learn it?","Do you think it is better to work for a large company or a small one? Why?","Some people say artificial intelligence will replace many jobs. Do you agree? Why or why not?"]}}
];

/* ---------- Drill bank ---------- */
const DRILL={
ctw:["Coffee is one of the most popular {dri|nks} in the world. It {origi|nally} came from Ethiopia, {wh|ere} people noticed that goats {bec|ame} energetic after eating the {ber|ries} of a certain plant. {Tod|ay}, Brazil produces more coffee {th|an} any other country.",
"The internet has {chan|ged} the way people communicate. {Bef|ore} email and social media, most {peo|ple} wrote letters or made {pho|ne} calls. Now, messages can {tra|vel} around the world in {seco|nds}, and video calls allow {fami|lies} to see each other {ev|en} when they live far {ap|art}."],
cr:[{p:"Could you lend me a pen?",o:["Sure, here you go.","I'll lend it next year.","The pen is on sale.","Yes, I can't."]},
{p:"What time does the library close tonight?",o:["At midnight during exam week.","It's very close to the dorm.","I closed it already.","Tonight is cold."],e:"Jebakan bunyi: close (tutup) vs close (dekat)."},
{p:"I didn't do well on the quiz.",o:["Don't worry, it's only worth five percent.","Well, I like quizzes.","I did it very well.","The quiz is on the table."]},
{p:"Shouldn't we leave now? The movie starts at seven.",o:["You're right, let's get going.","I left my phone at seven.","The movie was long.","No, I shouldn't eat."]},
{p:"Who's in charge of the event planning committee?",o:["I believe it's Professor Diaz.","They charge ten dollars.","The event was fun.","On the committee."],e:"WHO → nama orang. 'charge' adalah jebakan kata mirip."},
{p:"Would you rather meet on Tuesday or Thursday?",o:["Thursday works better for me.","Yes, I would.","I met him on Tuesday.","Rather than meeting."],e:"Pertanyaan pilihan (or) tidak dijawab yes/no."},
{p:"This printer keeps jamming.",o:["Try the one on the second floor instead.","I like strawberry jam.","Keep it in the drawer.","It's a new color printer."]},
{p:"How was your trip to the conference?",o:["Exhausting, but I learned a lot.","I tripped on the stairs.","By plane. It takes two hours.","The conference is next week."],e:"'How was...' = bagaimana pengalamannya, bukan cara pergi."}],
bs:[{c:"Can you recommend a good restaurant?",k:["there is","a great","Thai place","near","the station"]},
{c:"Where did you put my laptop?",k:["I left it","on the desk","in","your room"]},
{c:"Is the professor in her office?",k:["I do not","know","whether","she is","available"]},
{c:"What's the homework for tomorrow?",k:["we have to","read","chapter five","and","answer","the questions"]},
{c:"Why are you late?",k:["the bus","did not","arrive","on time"]},
{c:"How long have you lived here?",k:["I have","lived here","since","I was","ten"]},
{c:"Did you enjoy the concert?",k:["it was","the best","performance","I have","ever seen"]},
{c:"I'm nervous about my interview.",k:["you should","practice","answering","common questions"]},
{c:"Is this book worth reading?",k:["yes it is","one of","the most useful","books","on the topic"]},
{c:"Could you tell me where the registrar's office is?",k:["it is","located","on the second floor","of","the main building"]}],
dl:[{title:"Text message",text:"Hi Mia! Study group is moved from 4 to 5 pm today because Jake has a lab. Same place — Room 3B in the library. Can you bring your notes from Chapter 7? I missed that lecture. Thanks! — Lena",
qs:[{q:"Why was the study group time changed?",o:["A member has a lab","The library is closed","Lena has a lecture","Room 3B is not available"]},{q:"What does Lena ask Mia to do?",o:["Bring notes from a lecture Lena missed","Book a room in the library","Tell Jake about the change","Read Chapter 7 before the meeting"]}]},
{title:"Advertisement",text:"<b>FOR RENT:</b> Bright one-bedroom apartment, 10-minute walk to campus. $750/month, includes water and internet; electricity not included. Furnished. No pets. Available January 1. Minimum lease: 6 months. Contact Mr. Patel at 555-0192 (calls after 6 p.m. only).",
qs:[{q:"Which cost is NOT included in the rent?",o:["Electricity","Water","Internet","Furniture"]},{q:"What is true about the apartment?",o:["Tenants must stay at least six months","Pets are allowed","It is available immediately","Mr. Patel accepts calls in the morning"]}]}]
};

const MAPS={
format:{title:"Format TOEFL iBT 2026",center:"TOEFL iBT\n2026",cinfo:"Sejak 21 Januari 2026: 4 section, total ±1,5 jam, skor 1–6 (kelipatan 0,5). Reading & Listening adaptif 2 modul — modul 2 lebih sulit/mudah tergantung performa modul 1. Selama masa transisi (±2 tahun) laporan skor juga mencantumkan skor setara 0–120.",
branches:[
{name:"Reading ±30'",color:"#2563eb",info:"Adaptif 2 modul. Tiga tipe tugas. Fokus: kosakata, ejaan, paraphrase, skimming & scanning.",children:[
 {name:"Complete the Words",info:"Paragraf akademik pendek; setengah akhir beberapa kata dihapus. Isi huruf yang hilang. Uji kosakata + grammar + ejaan."},
 {name:"Read in Daily Life",info:"Teks pendek sehari-hari: email, pengumuman, jadwal, iklan, chat. Soal: tujuan, detail, inferensi."},
 {name:"Academic Passage",info:"Bacaan akademik ±200 kata. Soal: main idea, detail, vocabulary, inference, purpose, negative factual."}]},
{name:"Listening ±29'",color:"#7c3aed",info:"Adaptif 2 modul. Audio diputar sekali, boleh mencatat.",children:[
 {name:"Choose a Response",info:"Dengar 1 kalimat → pilih respons paling alami. Waspadai kata yang terdengar mirip."},
 {name:"Conversation",info:"Percakapan pendek kehidupan kampus/sehari-hari. Soal: tujuan, detail, langkah berikutnya."},
 {name:"Announcement",info:"Pengumuman kampus/kelas. Catat: apa yang berubah, kenapa, apa yang harus dilakukan."},
 {name:"Academic Talk",info:"Kuliah singkat. Catat topik utama, definisi, contoh, dan sikap dosen."}]},
{name:"Writing ±23'",color:"#c2410c",info:"Tiga tipe tugas, fungsional & singkat.",children:[
 {name:"Build a Sentence",info:"Susun potongan kata menjadi kalimat respons yang benar. Kunci: urutan kata & indirect question."},
 {name:"Write an Email (7')",info:"Tanggapi situasi; jawab SEMUA poin (biasanya 3). Nada sopan, terstruktur."},
 {name:"Academic Discussion (10')",info:"Tanggapi pertanyaan dosen + 2 pendapat mahasiswa. Target 100–150 kata, ambil posisi jelas + contoh."}]},
{name:"Speaking ±8'",color:"#0f766e",info:"Dua tipe tugas pendek, fokus komunikasi alami.",children:[
 {name:"Listen & Repeat",info:"Dengar kalimat lalu ulangi persis. Panjang kalimat makin bertambah."},
 {name:"Take an Interview",info:"Jawab pertanyaan pewawancara tanpa waktu persiapan (±45 detik). Struktur: jawaban → alasan → contoh."}]}]},
strategi:{title:"Strategi Menuju Band 4.0",center:"Target\n4.0 ≈ 74",cinfo:"Band 4.0 setara 72–85 pada skala lama dan level CEFR B2. Rata-rata 4 section dibulatkan ke 0,5 terdekat — jadi kombinasi 4 + 4 + 4 + 4, atau 4,5 + 4 + 3,5 + 4 sama-sama aman.",
branches:[
{name:"Fondasi",color:"#2563eb",info:"Minggu 1–4. Tanpa fondasi grammar & kosakata, strategi tidak banyak membantu.",children:[{name:"Grammar inti",info:"12 topik di halaman Grammar Inti. Target kuis ≥ 80%."},{name:"Word forms",info:"Kunci Complete the Words & Build a Sentence: noun/verb/adj/adv + akhiran."},{name:"Kosakata akademik",info:"15 kata/hari → ±1.000 kata dalam 3 bulan. Pakai flashcard + contoh kalimat."}]},
{name:"Input harian",color:"#7c3aed",info:"Paparan bahasa Inggris setiap hari, 40–60 menit.",children:[{name:"Baca 20'",info:"Artikel sains populer/berita (News in Levels, BBC, Scientific American)."},{name:"Dengar 20'",info:"Podcast/TED-Ed. Catat 3 ide utama."},{name:"Shadowing 10'",info:"Ulangi audio kalimat per kalimat — latihan langsung untuk Listen & Repeat."}]},
{name:"Output",color:"#c2410c",info:"Writing & Speaking naik paling cepat dengan template + latihan rutin.",children:[{name:"Template email",info:"Salam → tujuan → 3 poin → penutup."},{name:"Template diskusi",info:"Posisi → alasan → contoh → tanggapi pendapat lain → kesimpulan."},{name:"Rekam suara",info:"Rekam jawaban interview dengan HP, dengarkan, perbaiki."}]},
{name:"Tes & evaluasi",color:"#0f766e",info:"Ukur, analisis, perbaiki.",children:[{name:"3 Tryout",info:"Minggu 1, 6, 10 di website ini."},{name:"Error log",info:"Catat setiap kesalahan: tipe soal, alasan salah, cara benar."},{name:"Official practice",info:"Latihan resmi ETS di minggu 11."}]},
{name:"Hari H",color:"#b45309",info:"Strategi saat ujian.",children:[{name:"Kelola waktu",info:"Jangan terpaku di satu soal; tidak ada pengurangan nilai untuk jawaban salah."},{name:"Jangan kosong",info:"Selalu tebak jika ragu — eliminasi dulu."},{name:"Fisik prima",info:"Tidur 7–8 jam, cek ID & perangkat sehari sebelumnya."}]}]},
grammar:{title:"Peta Grammar untuk TOEFL",center:"Grammar\nInti",cinfo:"Grammar diuji tidak langsung lewat Complete the Words, Build a Sentence, Email, Discussion, dan Speaking.",
branches:[
{name:"Kalimat",color:"#2563eb",info:"Struktur dasar dan urutan kata.",children:[{name:"S + V + O",info:"Setiap klausa butuh subjek + verb."},{name:"Pertanyaan",info:"Wh + aux + S + V."},{name:"Indirect question",info:"Do you know where + S + V (tidak dibalik)."}]},
{name:"Kata kerja",color:"#7c3aed",info:"Bentuk & waktu.",children:[{name:"Tenses",info:"Present, past, present perfect, past perfect, future."},{name:"Passive",info:"be + V3."},{name:"Gerund/Infinitive",info:"Setelah preposisi → V-ing; decide/plan → to V1."}]},
{name:"Klausa",color:"#c2410c",info:"Menggabungkan ide.",children:[{name:"Relative",info:"who/which/that/whose/where."},{name:"Conditional",info:"Tipe 0–3."},{name:"Noun clause",info:"what/whether/that + S + V."}]},
{name:"Kelas kata",color:"#0f766e",info:"Pilih bentuk sesuai posisi.",children:[{name:"Noun -tion/-ment",info:"information, development."},{name:"Adj -ful/-ive/-ous",info:"useful, active, famous."},{name:"Adv -ly",info:"quickly, significantly."}]},
{name:"Penghubung",color:"#b45309",info:"Kohesi tulisan & ucapan.",children:[{name:"Kontras",info:"However, Although, Despite."},{name:"Sebab-akibat",info:"Because, Therefore, As a result."},{name:"Tambahan/contoh",info:"Moreover, For example."}]}]}
};

const PLAN=[
{w:1,ph:"Fondasi",t:"Diagnosis & kenali format",tasks:["Pelajari format 2026 lewat Mind Map, Rangkuman & Tips & Trik","Kerjakan Tryout 1 (diagnostik) dan catat skor tiap section","Grammar: topik 1 (word forms) + kuis","Kosakata nomor 1–20 (flashcard)","Dengarkan podcast/berita bahasa Inggris 15 menit tiap hari","Tentukan tanggal tes & daftar di ets.org"]},
{w:2,ph:"Fondasi",t:"Grammar dasar + Complete the Words",tasks:["Grammar: topik 2–3 (agreement & tenses)","Drill Complete the Words (2 paragraf) — tulis ulang kata yang salah eja","Baca 1 artikel pendek/hari, catat 5 kata baru","Shadowing 10 menit/hari (TED-Ed / BBC)","Kosakata nomor 21–40"]},
{w:3,ph:"Fondasi",t:"Build a Sentence & Choose a Response",tasks:["Grammar: topik 4 (question & indirect question) — paling penting!","Drill Build a Sentence (10 soal) sampai skor ≥ 9/10","Drill Choose a Response (8 soal)","Kosakata nomor 41–60","Tulis 1 email latihan memakai template"]},
{w:4,ph:"Fondasi",t:"Reading akademik & note-taking",tasks:["Pelajari 6 tipe soal Academic Passage + jebakan","Latih 3 bacaan akademik (Official Guide / TestReady)","Hafalkan simbol note-taking; latih pada 2 kuliah TED-Ed","Grammar: topik 5–8 + kuis Grammar ≥ 80%","Review semua kosakata (mode 'belum hafal')"]},
{w:5,ph:"Penguatan",t:"Listening & Speaking",tasks:["Dikte 5 menit/hari: tulis persis apa yang didengar","Latihan Listen & Repeat 20 kalimat (rekam diri)","Jawab 8 pertanyaan interview dengan struktur Answer–Reason–Example","Tulis 2 Academic Discussion dengan timer 10 menit","Tambah 15 kata akademik baru/hari dari AWL"]},
{w:6,ph:"Penguatan",t:"Evaluasi tengah program",tasks:["Kerjakan Tryout 2 dalam satu duduk","Analisis kesalahan → buat error log","Fokuskan 70% waktu minggu ini ke section terlemah","Grammar: topik 9–12","Ulangi Drill dengan skor < 80%"]},
{w:7,ph:"Penguatan",t:"Writing intensif",tasks:["3 email (7 menit) + 3 diskusi (10 menit) dengan timer","Cek tiap tulisan dengan checklist (agreement, tenses, artikel)","Kumpulkan 20 'golden phrases' untuk email & diskusi","Drill Build a Sentence ulang (target 10/10)","Baca 3 bacaan akademik + rangkum 2 kalimat"]},
{w:8,ph:"Penguatan",t:"Speaking intensif",tasks:["Jawab 20 pertanyaan interview (rekam, dengar ulang)","Shadowing kalimat panjang (15+ kata) 15 menit/hari","Latih intonasi & stres kata: 'thought groups'","Kerjakan Tryout 4 dan bandingkan dengan Tryout 2","Listening: 2 conversation + 2 academic talk/hari","Review kosakata seluruhnya"]},
{w:9,ph:"Simulasi",t:"Kecepatan & akurasi",tasks:["Latihan Reading dengan batas waktu ketat","Listening: tebak jenis pertanyaan sebelum audio","Writing: 2 diskusi + 2 email","Speaking: 10 interview acak","Perbarui error log & pelajari polanya"]},
{w:10,ph:"Simulasi",t:"Tryout akhir",tasks:["Kerjakan Tryout 3 dalam kondisi seperti tes sungguhan","Bandingkan skor semua tryout di Beranda","Perbaiki 3 kelemahan terbesar","Hafalkan ulang template Writing & Speaking"]},
{w:11,ph:"Simulasi",t:"Latihan resmi ETS",tasks:["Kerjakan Tryout 5 (simulasi final) dalam satu duduk","Kerjakan practice test resmi ETS (TOEFL TestReady)","Review semua jawaban salah","Simulasi Speaking dengan teman / rekaman","Cek persyaratan tes (ID, lokasi atau Home Edition)"]},
{w:12,ph:"Hari H",t:"Taper & persiapan akhir",tasks:["Ulangi Rangkuman Kilat & Mind Map","Latihan ringan 45 menit/hari, jangan belajar berlebihan","Siapkan ID, rute ke lokasi / perangkat tes rumah","Tidur cukup 2 malam sebelum tes","Hari H: sarapan, datang lebih awal, tenang!"]}
];


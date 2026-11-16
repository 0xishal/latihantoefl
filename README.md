# TOEFL Path — Latihan TOEFL iBT 2026

Website belajar mandiri untuk persiapan **TOEFL iBT format baru (mulai 21 Januari 2026)**, dari level menengah menuju **band 4.0 (≈ 72–85 pada skala 0–120, CEFR B2)** dalam 12 minggu.

## Fitur

- **Dashboard**: hitung mundur hari tes, streak belajar, progres rencana, kosakata dikuasai, riwayat tryout, kalkulator skor 1–6 ↔ 0–120.
- **Rencana 12 minggu**: 4 fase (Fondasi → Penguatan → Simulasi → Hari H) dengan checklist mingguan.
- **Mind map interaktif**: format tes, strategi menuju 4.0, peta grammar.
- **Materi lengkap** Reading, Listening, Writing, Speaking — semua tipe soal baru 2026, strategi, jebakan, template, contoh jawaban.
- **Grammar inti** (12 topik + kuis) dan **150 kosakata** akademik, kampus & sains (flashcard, audio, kuis).
- **Drill per tipe soal**: Complete the Words, Read in Daily Life, Choose a Response, Build a Sentence, Listen & Repeat.
- **Tips & trik** untuk 12 tipe soal (trik cepat, jebakan, latihan harian).
- **5 tryout lengkap** dengan audio Text-to-Speech, timer, progres pengisian, pembahasan, dan estimasi band.
- **UX**: mode gelap, pencarian cepat (`Ctrl/⌘ + K`), timer fokus Pomodoro, navigasi bawah di HP, progres tersimpan di `localStorage`.

## Struktur

```
index.html      # kerangka aplikasi
styles.css      # desain (light/dark)
data.js         # konten inti: kosakata, grammar, tryout 1–3, drill, mind map, rencana
data-extra.js   # tryout 4–5, kosakata tambahan, tips & trik
app.js          # logika: router, view, penilaian, palette, timer
vendor/icons.js # subset ikon Lucide (ISC)
vercel.json     # konfigurasi deploy Vercel
```

Situs statis murni — tanpa build step. Jalankan lokal dengan membuka `index.html` atau `npx serve .`.

## Deploy

Terhubung ke Vercel: setiap push ke `main` otomatis ter-deploy.

## Catatan

Bukan produk resmi ETS. Skor tryout adalah **estimasi**. Selalu cek informasi terbaru di [ets.org/toefl](https://www.ets.org/toefl).

Ikon: [Lucide](https://lucide.dev) (ISC License).

import fs from 'fs';
import path from 'path';
import { ALL_FATWA, ALL_YEARS, ALL_AKADS } from '../src/data/allFatwa';
import { CATEGORIES } from '../src/data/categories';

const AKAD_GLOSSARY = [
  {
    nama: 'Murabahah',
    istilahArab: 'الْمُرَابَحَةُ',
    definisi: 'Akad jual beli barang dengan menegaskan harga perolehan kepada pembeli dan pembeli membayarnya dengan harga yang lebih sebagai laba/margin yang disepakati.',
    contohAplikasi: 'KPR Syariah, Pembiayaan Kendaraan Bermotor, Pembiayaan Modal Kerja Pengadaan Barang.'
  },
  {
    nama: 'Mudharabah',
    istilahArab: 'الْمُضَارَبَةُ',
    definisi: 'Akad kerjasama usaha antara shahibul maal (pemilik dana yang menyediakan 100% modal) dan mudharib (pengelola modal) dengan nisbah bagi hasil keuntungan yang disepakati bersama.',
    contohAplikasi: 'Deposito Syariah, Tabungan Mudharabah, Pembiayaan Usaha/Proyek, Sukuk Mudharabah.'
  },
  {
    nama: 'Musyarakah',
    istilahArab: 'الْمُشَارَكَةُ',
    definisi: 'Akad kerjasama kemitraan antara dua pihak atau lebih untuk suatu usaha tertentu di mana masing-masing pihak memberikan kontribusi modal dengan pembagian keuntungan sesuai nisbah dan kerugian proporsional sesuai porsi modal.',
    contohAplikasi: 'Pembiayaan Modal Kerja Bersama, Sindikasi Pembiayaan, Usaha Patungan (Joint Venture).'
  },
  {
    nama: 'Musyarakah Mutanaqishah (MMQ)',
    istilahArab: 'الْمُشَارَكَةُ الْمُتَنَاقِصَةُ',
    definisi: 'Bentuk musyarakah di mana kepemilikan aset atau modal salah satu pihak (bank) berkurang secara bertahap karena dibeli oleh pihak lainnya (nasabah) hingga kepemilikan aset berpindah sepenuhnya ke nasabah.',
    contohAplikasi: 'KPR Syariah Berkelanjutan, Refinancing Syariah, Pengalihan Pembiayaan (Take Over).'
  },
  {
    nama: 'Ijarah',
    istilahArab: 'الإِجَارَةُ',
    definisi: 'Akad penyaluran dana untuk pemindahan hak guna (manfaat) atas suatu barang atau jasa dalam waktu tertentu dengan pembayaran sewa (ujrah), tanpa diikuti pemindahan kepemilikan barang itu sendiri.',
    contohAplikasi: 'Sewa Gedung/Kantor, Safe Deposit Box (SDB), Jasa Tenaga Kerja/Multijasa, Pembiayaan Pendidikan/Umrah.'
  },
  {
    nama: 'Ijarah Muntahiyah bi al-Tamlik (IMBT)',
    istilahArab: 'الإِجَارَةُ الْمُنْتَهِيَةُ بِالتَّمْلِيكِ',
    definisi: 'Perjanjian sewa-menyewa yang disertai dengan opsi pemindahan hak kepemilikan atas objek sewa kepada penyewa pada saat masa sewa berakhir (melalui hibah atau jual beli).',
    contohAplikasi: 'Pembiayaan Alat Berat, Pembiayaan Mesin Industri, KPR Syariah Sewa-Beli.'
  },
  {
    nama: 'Ijarah Maushufah fi al-Dzimmah (IMFD)',
    istilahArab: 'الإِجَارَةُ الْمَوْصُوفَةُ فِي الذِّمَّةِ',
    definisi: 'Akad sewa-menyewa atas manfaat suatu barang atau jasa yang pada saat akad baru disebutkan sifat dan spesifikasinya (manfaat inden/pesanan ke depan).',
    contohAplikasi: 'KPR Rumah Inden (dalam pembangunan), Pembiayaan Proyek Infrastruktur, Paket Haji Khusus Masa Depan.'
  },
  {
    nama: 'Wadi\'ah (Titipan)',
    istilahArab: 'الْوَدِيعَةُ',
    definisi: 'Akad penitipan barang atau uang di mana pihak penerima titipan menjamin keselamatan barang titipan (Wadi\'ah Yad Dhamanah) dan dapat memanfaatkannya dengan izin, serta wajib mengembalikannya sewaktu-waktu saat diminta.',
    contohAplikasi: 'Giro Syariah, Tabungan Wadiah Bebas Biaya Admin, Penitipan Emas.'
  },
  {
    nama: 'Wakalah & Wakalah bil Ujrah',
    istilahArab: 'الْوَكَالَةُ بِالأُجْرَةِ',
    definisi: 'Akad pelimpahan kekuasaan oleh seseorang (muwakkil) kepada orang lain (wakil) dalam hal-hal yang boleh diwakilkan dengan pemberian imbalan upah/fee (ujrah).',
    contohAplikasi: 'Transfer Uang, Kliring, Inkaso, Letter of Credit (L/C), P2P Lending Syariah, Manajemen Investasi.'
  },
  {
    nama: 'Kafalah (Penjaminan)',
    istilahArab: 'الْكَفَالَةُ',
    definisi: 'Akad penjaminan yang diberikan oleh penjamin (kafil) kepada pihak ketiga (makful lahu) untuk memenuhi kewajiban pihak kedua (makful \'anhu) apabila yang dijamin gagal bayar.',
    contohAplikasi: 'Bank Garansi Syariah, Asuransi Kredit/Pembiayaan, Penjaminan LPS Syariah, Tanggung Renteng Kelompok.'
  },
  {
    nama: 'Hawalah (Pengalihan Utang)',
    istilahArab: 'الْحَوَالَةُ',
    definisi: 'Akad pengalihan utang dari pihak yang berutang (muhil) kepada pihak lain yang wajib menanggungnya (muhal \'alaih).',
    contohAplikasi: 'Anjak Piutang Syariah (Factoring), Pengalihan Pembiayaan Antar-Bank, Post Financing L/C.'
  },
  {
    nama: 'Rahn (Gadai / Agunan)',
    istilahArab: 'الرَّهْنُ',
    definisi: 'Akad penyerahan barang berharga oleh debitur (rahin) kepada kreditur (murtahin) sebagai jaminan atas utang yang diterimanya.',
    contohAplikasi: 'Gadai Emas Syariah, Agunan Tambahan Pembiayaan Bank Syariah, Rahn Tasjily (Fidusia).'
  },
  {
    nama: 'Salam',
    istilahArab: 'السَّلَمُ',
    definisi: 'Akad jual beli barang pesanan dengan kriteria dan spesifikasi yang jelas di mana pembayaran dilakukan 100% tunai di muka dan penyerahan barang dilakukan di kemudian hari.',
    contohAplikasi: 'Pembiayaan Sektor Pertanian/Perkebunan, Pengadaan Komoditas Pangan, Dropship Syariah.'
  },
  {
    nama: 'Istishna\'',
    istilahArab: 'الإِسْتِصْنَاعُ',
    definisi: 'Akad jual beli dalam bentuk pemesanan pembuatan barang tertentu dengan kriteria dan persyaratan tertentu yang disepakati antara pemesan (mustashni\') dan penjual/produsen (shani\'). Pembayaran dapat dilakukan di muka, bertahap, atau di akhir.',
    contohAplikasi: 'Pembiayaan Konstruksi Bangunan, Pabrikasi Mesin Custom, Proyek Infrastruktur.'
  },
  {
    nama: 'Sharf (Jual Beli Valuta Asing)',
    istilahArab: 'الصَّرْفُ',
    definisi: 'Akad jual beli suatu mata uang dengan mata uang lainnya (valas) dengan penyerahan tunai secara simultan (taqabudh fi al-hal / spot).',
    contohAplikasi: 'Money Changer Syariah, Transaksi Valas Kebutuhan Riil Haji/Impor, Islamic Hedging.'
  },
  {
    nama: 'Qardh & Qardhul Hasan',
    istilahArab: 'الْقَرْضُ الْحَسَنُ',
    definisi: 'Akad pinjaman dana tanpa imbalan di mana peminjam wajib mengembalikan sejumlah pokok pinjaman yang sama pada waktu yang diperjanjikan.',
    contohAplikasi: 'Pinjaman Dana Talangan Haji, Pinjaman Kebajikan Dana Sosial TBDSP, Kartu Kredit Syariah (sebagai plafon talangan).'
  },
  {
    nama: 'Tabarru\' (Dana Gotong Royong)',
    istilahArab: 'التَّبَرُّعُ',
    definisi: 'Akad kebajikan nirlaba yang diniatkan murni untuk tolong-menolong sesama tanpa mencari keuntungan komersial.',
    contohAplikasi: 'Dana Iuran Asuransi Syariah (Takaful), BPJS Syariah, Wakaf, Infaq/Sedekah.'
  },
  {
    nama: 'Samsarah & Ju\'alah',
    istilahArab: 'السَّمْسَرَةُ وَالْجُعَالَةُ',
    definisi: 'Samsarah adalah akad keperantaraan perniagaan untuk memperoleh komisi (\'umulah). Ju\'alah adalah janji imbalan kompensasi (ja\'il) kepada siapa pun yang berhasil menyelesaikan tugas tertentu.',
    contohAplikasi: 'Broker/Agen Properti Syariah, Marketplace Syariah, Sayembara/Reward Program, Penagihan Piutang.'
  }
];

function generateHtml() {
  const fatwaJson = JSON.stringify(ALL_FATWA);
  const categoriesJson = JSON.stringify(CATEGORIES);
  const glossaryJson = JSON.stringify(AKAD_GLOSSARY);

  const htmlContent = `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aplikasi Kumpulan Fatwa DSN-MUI (Offline Mandiri)</title>
  <meta name="description" content="Koleksi komprehensif 169 Fatwa Dewan Syariah Nasional Majelis Ulama Indonesia dengan pencarian dalil Quran, Hadits, Kaidah Fiqih, dan Kamus Akad.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            arabic: ['Amiri', 'serif'],
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-arabic { font-family: 'Amiri', serif; }
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    @media print {
      body * { visibility: hidden; }
      #detail-modal-container, #detail-modal-container * { visibility: visible; }
      #detail-modal-container { position: absolute; left: 0; top: 0; width: 100%; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">

  <!-- Header & Navbar -->
  <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-xl font-bold tracking-tight text-slate-900">
                Fatwa DSN-MUI
              </h1>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ${ALL_FATWA.length} Fatwa (Aplikasi HTML Mandiri)
              </span>
            </div>
            <p class="text-xs text-slate-500 font-medium hidden sm:block">
              Dewan Syariah Nasional — Majelis Ulama Indonesia
            </p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="flex items-center gap-2">
          <!-- Kamus Akad -->
          <button onclick="openGlossaryModal()" class="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200">
            <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="hidden md:inline">Kamus Akad</span>
          </button>

          <!-- Ekspor Data -->
          <button onclick="openExportModal()" class="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200">
            <svg class="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span class="font-semibold hidden sm:inline">Ekspor Data</span>
          </button>

          <!-- Favorit -->
          <button onclick="toggleFavoritesFilter()" id="btn-fav-nav" class="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-amber-700 bg-slate-100 hover:bg-amber-50 rounded-lg transition-colors border border-slate-200">
            <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
            <span class="hidden sm:inline">Tersimpan</span>
            <span id="fav-badge" class="hidden items-center justify-center px-1.5 py-0.2 text-xs font-bold bg-amber-500 text-white rounded-full min-w-[1.25rem]">0</span>
          </button>

          <!-- Simpan / Download HTML -->
          <button onclick="downloadSelfHtml()" class="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-xs" title="Unduh file HTML mandiri ini ke komputer Anda">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            <span class="hidden sm:inline">Unduh HTML</span>
          </button>
        </div>

      </div>
    </div>
  </header>

  <!-- Hero Banner -->
  <section class="bg-gradient-to-b from-white to-slate-100 border-b border-slate-200/80 py-8 sm:py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        100% Berjalan Offline Tanpa Butuh Server (File HTML Mandiri)
      </div>
      <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        Ensiklopedia & Direktori Fatwa DSN-MUI
      </h2>
      <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
        Koleksi lengkap ${ALL_FATWA.length} fatwa muamalah & keuangan syariah lengkap dengan dalil Al-Qur'an, Hadits, Kaidah Fiqhiyyah, dan Diktum Hukum.
      </p>

      <!-- Stat Badges -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-6 text-left">
        <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p class="text-xs text-slate-500 font-medium">Total Fatwa</p>
          <p class="text-xl sm:text-2xl font-bold text-slate-900">${ALL_FATWA.length} Fatwa</p>
          <p class="text-[11px] text-emerald-600 font-medium mt-0.5">Tahun 2000 - 2024</p>
        </div>
        <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p class="text-xs text-slate-500 font-medium">Sektor & Topik</p>
          <p class="text-xl sm:text-2xl font-bold text-slate-900">8 Sektor</p>
          <p class="text-[11px] text-blue-600 font-medium mt-0.5">Perbankan, Investasi dll</p>
        </div>
        <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p class="text-xs text-slate-500 font-medium">Rujukan Dalil</p>
          <p class="text-xl sm:text-2xl font-bold text-slate-900">700+ Dalil</p>
          <p class="text-[11px] text-purple-600 font-medium mt-0.5">Quran, Hadits & Kaidah</p>
        </div>
        <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p class="text-xs text-slate-500 font-medium">Ragam Akad</p>
          <p class="text-xl sm:text-2xl font-bold text-slate-900">30+ Akad</p>
          <p class="text-[11px] text-amber-600 font-medium mt-0.5">Murabahah, Ijarah dll</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Search & Filter Controls -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
    
    <!-- Search Bar -->
    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input 
          type="text" 
          id="search-input" 
          placeholder="Cari fatwa: contoh 'Murabahah', 'KPR', 'Emas', 'Saham', 'Al-Baqarah', '04/DSN-MUI/IV/2000'..." 
          class="w-full pl-11 pr-24 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm sm:text-base transition"
          oninput="handleSearch(this.value)"
        >
        <div class="absolute inset-y-0 right-2 flex items-center gap-1.5">
          <button id="clear-search-btn" onclick="clearSearch()" class="hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-md">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <span class="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 bg-slate-200/70 rounded font-mono">/</span>
        </div>
      </div>

      <!-- Quick Keywords -->
      <div class="flex items-center gap-2 text-xs overflow-x-auto pb-1 text-slate-500">
        <span class="font-medium text-slate-700 whitespace-nowrap">Kata Kunci Cepat:</span>
        <button onclick="setSearch('Murabahah')" class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition whitespace-nowrap">Murabahah</button>
        <button onclick="setSearch('Musyarakah')" class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition whitespace-nowrap">Musyarakah</button>
        <button onclick="setSearch('Ijarah')" class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition whitespace-nowrap">Ijarah</button>
        <button onclick="setSearch('KPR Syariah')" class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition whitespace-nowrap">KPR Syariah</button>
        <button onclick="setSearch('Uang Elektronik')" class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition whitespace-nowrap">E-Money / Fintech</button>
        <button onclick="setSearch('Emas')" class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition whitespace-nowrap">Jual Beli Emas</button>
        <button onclick="setSearch('Sukuk')" class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition whitespace-nowrap">Sukuk</button>
        <button onclick="setSearch('Asuransi')" class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition whitespace-nowrap">Asuransi / Takaful</button>
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500">Filter Sektor Industri</h3>
        <button onclick="resetFilters()" class="text-xs text-emerald-600 hover:underline font-medium">Reset Semua Filter</button>
      </div>
      <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none" id="categories-container">
        <!-- Rendered by JS -->
      </div>
    </div>

    <!-- Sub Filters: Year, Akad, Sort -->
    <div class="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm">
      <div class="flex flex-wrap items-center gap-2 sm:gap-3">
        <!-- Year Select -->
        <div class="flex items-center gap-1.5">
          <label for="filter-year" class="text-slate-500 font-medium">Tahun:</label>
          <select id="filter-year" onchange="handleYearChange(this.value)" class="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-emerald-500">
            <option value="all">Semua Tahun</option>
          </select>
        </div>

        <!-- Akad Select -->
        <div class="flex items-center gap-1.5">
          <label for="filter-akad" class="text-slate-500 font-medium">Akad:</label>
          <select id="filter-akad" onchange="handleAkadChange(this.value)" class="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-emerald-500 max-w-[160px] sm:max-w-[200px] truncate">
            <option value="all">Semua Akad</option>
          </select>
        </div>

        <!-- Sort Select -->
        <div class="flex items-center gap-1.5">
          <label for="filter-sort" class="text-slate-500 font-medium">Urutan:</label>
          <select id="filter-sort" onchange="handleSortChange(this.value)" class="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-emerald-500">
            <option value="terbaru">Nomor Fatwa (Terbaru)</option>
            <option value="terlama">Nomor Fatwa (Terlama)</option>
            <option value="judul-asc">Judul (A - Z)</option>
            <option value="tahun-desc">Tahun (Terbaru)</option>
          </select>
        </div>
      </div>

      <!-- Result Counter -->
      <div class="text-slate-600 font-medium" id="results-count-text">
        Menampilkan ${ALL_FATWA.length} fatwa
      </div>
    </div>

    <!-- Active Filter Badges -->
    <div id="active-filters-row" class="hidden flex-wrap items-center gap-2 text-xs">
      <span class="text-slate-500 font-medium">Filter Aktif:</span>
      <div id="active-filter-chips" class="flex flex-wrap items-center gap-2"></div>
      <button onclick="resetFilters()" class="text-emerald-700 hover:text-emerald-800 font-semibold underline ml-1">Hapus Semua</button>
    </div>

    <!-- Fatwa Grid -->
    <div id="fatwa-list-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      <!-- Injected by JavaScript -->
    </div>

    <!-- Empty State -->
    <div id="empty-state" class="hidden text-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h3 class="text-lg font-bold text-slate-800">Tidak ada fatwa yang cocok</h3>
      <p class="text-sm text-slate-500 mt-1 max-w-md mx-auto">Coba gunakan kata kunci pencarian yang lebih umum atau ubah pilihan kategori dan tahun.</p>
      <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">Reset Semua Filter</button>
    </div>

  </main>

  <!-- Footer -->
  <footer class="mt-auto bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
    <div class="max-w-7xl mx-auto px-4 space-y-2">
      <p class="font-semibold text-slate-700">Aplikasi Direktori Fatwa Dewan Syariah Nasional MUI (Versi Mandiri Offline HTML)</p>
      <p>Data bersumber dari Himpunan Fatwa DSN-MUI Jilid I - III & Fatwa Mutakhir. Dokumen hukum resmi tetap merujuk pada lembaran ketetapan asli DSN-MUI.</p>
      <p class="text-slate-400">File HTML mandiri ini dapat dibuka kapan saja di komputer atau smartphone Anda tanpa membutuhkan koneksi internet.</p>
    </div>
  </footer>

  <!-- DETAIL MODAL -->
  <div id="detail-modal" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs hidden flex items-center justify-center p-3 sm:p-4 md:p-6">
    <div class="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden" id="detail-modal-container">
      
      <!-- Modal Header -->
      <div class="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span id="modal-nomor-badge" class="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-700 text-white shadow-2xs"></span>
            <span id="modal-nomor-surat" class="text-xs font-mono font-bold text-emerald-900 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200"></span>
            <span id="modal-tahun" class="px-2 py-0.5 text-xs font-semibold rounded bg-slate-200 text-slate-700"></span>
            <span id="modal-kategori" class="px-2 py-0.5 text-xs font-semibold rounded-md"></span>
          </div>
          <h2 id="modal-judul" class="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug"></h2>
        </div>
        <div class="flex items-center gap-1.5 no-print">
          <button onclick="toggleFavoriteFromModal()" id="modal-fav-btn" class="p-2 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-200/70" title="Simpan ke Favorit">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
          </button>
          <button onclick="window.print()" class="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/70" title="Cetak Fatwa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          </button>
          <button onclick="closeDetailModal()" class="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/70" title="Tutup Modal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>

      <!-- Modal Tabs -->
      <div class="flex items-center px-4 sm:px-6 border-b border-slate-200 bg-white gap-2 overflow-x-auto text-xs sm:text-sm font-semibold">
        <button onclick="setModalTab('semua')" id="mtab-semua" class="py-2.5 px-3 border-b-2 border-emerald-600 text-emerald-800 font-bold whitespace-nowrap">Semua Bagian</button>
        <button onclick="setModalTab('ringkasan')" id="mtab-ringkasan" class="py-2.5 px-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 whitespace-nowrap">Diktum & Ketentuan</button>
        <button onclick="setModalTab('dalil')" id="mtab-dalil" class="py-2.5 px-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 whitespace-nowrap">Dalil Qur'an & Hadits</button>
        <button onclick="setModalTab('kaidah')" id="mtab-kaidah" class="py-2.5 px-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 whitespace-nowrap">Kaidah Fiqh & Ulama</button>
      </div>

      <!-- Modal Body -->
      <div class="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
        
        <!-- Ringkasan Ketentuan Hukum -->
        <div id="msec-ringkasan" class="bg-emerald-50/40 rounded-2xl p-5 border border-emerald-100">
          <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Ketentuan Pokok & Diktum Fatwa
          </h4>
          <div id="modal-ringkasan" class="whitespace-pre-line text-slate-800 font-normal leading-relaxed text-sm"></div>
        </div>

        <!-- Akad & Subjek -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p class="text-xs text-slate-500 font-medium">Akad Terkait:</p>
            <div id="modal-akads" class="flex flex-wrap gap-1.5 mt-1.5"></div>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p class="text-xs text-slate-500 font-medium">Kata Kunci / Tag:</p>
            <div id="modal-tags" class="flex flex-wrap gap-1.5 mt-1.5"></div>
          </div>
        </div>

        <!-- Dalil Al-Qur'an -->
        <div id="msec-dalil-quran">
          <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Landasan Dalil Al-Qur'an
          </h4>
          <div class="space-y-3" id="modal-dalil-quran"></div>
        </div>

        <!-- Dalil Hadits -->
        <div id="msec-dalil-hadits">
          <h4 class="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Landasan Dalil Hadits & Sunnah
          </h4>
          <div class="space-y-3" id="modal-dalil-hadits"></div>
        </div>

        <!-- Kaidah Fiqhiyyah -->
        <div id="msec-kaidah-fiqh">
          <h4 class="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Kaidah Fiqhiyyah Muamalah
          </h4>
          <div class="space-y-3" id="modal-kaidah-fiqh"></div>
        </div>

        <!-- Pendapat Ulama -->
        <div id="msec-kalam-ulama" class="bg-amber-50/40 rounded-2xl p-5 border border-amber-200/60">
          <h4 class="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
            Pendapat & Kalam Ulama Mazhab
          </h4>
          <div id="modal-kalam-ulama" class="text-slate-800 text-sm leading-relaxed whitespace-pre-line"></div>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 no-print">
        <button onclick="copyModalContent()" id="modal-copy-btn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          Salin Rujukan Fatwa
        </button>
        <button onclick="closeDetailModal()" class="px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800">
          Tutup
        </button>
      </div>

    </div>
  </div>

  <!-- KAMUS AKAD MODAL -->
  <div id="glossary-modal" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs hidden flex items-center justify-center p-3 sm:p-4 md:p-6">
    <div class="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      <div class="p-4 sm:p-5 border-b border-slate-200 bg-emerald-50 flex items-center justify-between">
        <div>
          <h3 class="text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2">
            Kamus Istilah & Akad Muamalah
          </h3>
          <p class="text-xs text-emerald-800">Glosarium lengkap akad perbankan dan industri keuangan syariah</p>
        </div>
        <button onclick="closeGlossaryModal()" class="p-2 text-slate-400 hover:text-slate-700 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div class="p-4 border-b border-slate-200">
        <input type="text" id="glossary-search" placeholder="Cari akad: contoh 'Murabahah', 'MMQ', 'Ijarah'..." oninput="filterGlossary(this.value)" class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-emerald-500">
      </div>
      <div class="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1" id="glossary-list">
        <!-- Rendered by JS -->
      </div>
    </div>
  </div>

  <!-- EXPORT DATA MODAL -->
  <div id="export-modal" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs hidden flex items-center justify-center p-3 sm:p-4 md:p-6">
    <div class="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      <div class="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 class="text-base sm:text-lg font-bold text-slate-900">Ekspor Data Fatwa DSN-MUI</h3>
          <p class="text-xs text-slate-500">Unduh data fatwa dalam format CSV atau JSON</p>
        </div>
        <button onclick="closeExportModal()" class="p-2 text-slate-400 hover:text-slate-700 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div class="p-4 sm:p-6 space-y-4 overflow-y-auto text-sm text-slate-700">
        
        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <h4 class="font-bold text-emerald-900 mb-1">Unduh Format CSV (Excel & Spreadsheet)</h4>
          <p class="text-xs text-emerald-800 mb-3">File CSV ini berisi seluruh ${ALL_FATWA.length} fatwa (Nomor, Tahun, Kategori, Judul, Akad, Ringkasan) yang dapat langsung Anda buka di Microsoft Excel atau Google Sheets.</p>
          <button onclick="downloadCSV()" class="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 text-xs inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Unduh CSV (${ALL_FATWA.length} Fatwa)
          </button>
        </div>

        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h4 class="font-bold text-slate-900 mb-1">Unduh Format JSON Lengkap</h4>
          <p class="text-xs text-slate-500 mb-3">Format data terstruktur lengkap berisi seluruh teks dalil Quran, Hadits, Kaidah Fiqhiyyah, dan Diktum.</p>
          <button onclick="downloadJSON()" class="px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 text-xs inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Unduh JSON
          </button>
        </div>

        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <h4 class="font-bold text-emerald-900 mb-1">Aplikasi Android (PWA)</h4>
          <p class="text-xs text-emerald-800">Buka versi online di browser Google Chrome / Samsung Internet pada smartphone Android Anda, lalu pilih menu titik tiga (⋮) &gt; "Tambahkan ke Layar Utama" atau "Pasang Aplikasi" untuk memasang ke HP Anda.</p>



        </div>

      </div>
    </div>
  </div>

  <!-- EMBEDDED JAVASCRIPT & DATASET -->
  <script>
    // Embedded Data
    const RAW_FATWAS = ${fatwaJson};
    const CATEGORIES = ${categoriesJson};
    const GLOSSARY = ${glossaryJson};

    // State
    let currentSearch = '';
    let currentCategory = 'all';
    let currentYear = 'all';
    let currentAkad = 'all';
    let currentSort = 'terbaru';
    let onlyFavorites = false;
    let currentActiveFatwa = null;
    let modalTab = 'semua';
    let favorites = JSON.parse(localStorage.getItem('dsn_mui_favorites') || '[]');

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      initYearOptions();
      initAkadOptions();
      renderCategories();
      renderGlossary();
      updateFavoriteCount();
      filterAndRender();

      // Keyboard shortcut '/' to search
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
          e.preventDefault();
          document.getElementById('search-input').focus();
        }
      });
    });

    // Populate Year Dropdown
    function initYearOptions() {
      const yearSelect = document.getElementById('filter-year');
      const years = Array.from(new Set(RAW_FATWAS.map(f => f.tahun))).sort((a,b) => Number(b) - Number(a));
      years.forEach(yr => {
        const opt = document.createElement('option');
        opt.value = yr;
        opt.textContent = yr;
        yearSelect.appendChild(opt);
      });
    }

    // Populate Akad Dropdown
    function initAkadOptions() {
      const akadSelect = document.getElementById('filter-akad');
      const akads = Array.from(new Set(RAW_FATWAS.flatMap(f => f.akad))).sort();
      akads.forEach(ak => {
        const opt = document.createElement('option');
        opt.value = ak;
        opt.textContent = ak;
        akadSelect.appendChild(opt);
      });
    }

    // Render Categories
    function renderCategories() {
      const container = document.getElementById('categories-container');
      
      let html = \`
        <button onclick="selectCategory('all')" id="cat-pill-all" class="cat-pill shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition \${currentCategory === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-xs' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'}">
          Semua (\${RAW_FATWAS.length})
        </button>
      \`;

      CATEGORIES.forEach(cat => {
        const count = RAW_FATWAS.filter(f => f.kategori === cat.name).length;
        const isActive = currentCategory === cat.name;
        html += \`
          <button onclick="selectCategory('\${cat.name}')" id="cat-pill-\${cat.id}" class="cat-pill shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition \${isActive ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs' : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'}">
            \${cat.shortName || cat.name} (\${count})
          </button>
        \`;
      });

      container.innerHTML = html;
    }

    // Select Category
    function selectCategory(catName) {
      currentCategory = catName;
      renderCategories();
      filterAndRender();
    }

    // Search handler
    function handleSearch(val) {
      currentSearch = val.trim();
      const clearBtn = document.getElementById('clear-search-btn');
      if (currentSearch) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
      filterAndRender();
    }

    function clearSearch() {
      document.getElementById('search-input').value = '';
      currentSearch = '';
      document.getElementById('clear-search-btn').classList.add('hidden');
      filterAndRender();
    }

    function setSearch(kw) {
      const input = document.getElementById('search-input');
      input.value = kw;
      handleSearch(kw);
      input.focus();
    }

    // Year change
    function handleYearChange(yr) {
      currentYear = yr;
      filterAndRender();
    }

    // Akad change
    function handleAkadChange(ak) {
      currentAkad = ak;
      document.getElementById('filter-akad').value = ak;
      filterAndRender();
    }

    // Sort change
    function handleSortChange(st) {
      currentSort = st;
      filterAndRender();
    }

    // Toggle Favorites
    function toggleFavoritesFilter() {
      onlyFavorites = !onlyFavorites;
      const btn = document.getElementById('btn-fav-nav');
      if (onlyFavorites) {
        btn.classList.add('bg-amber-100', 'border-amber-300', 'text-amber-900');
      } else {
        btn.classList.remove('bg-amber-100', 'border-amber-300', 'text-amber-900');
      }
      filterAndRender();
    }

    // Reset filters
    function resetFilters() {
      currentSearch = '';
      currentCategory = 'all';
      currentYear = 'all';
      currentAkad = 'all';
      currentSort = 'terbaru';
      onlyFavorites = false;
      
      document.getElementById('search-input').value = '';
      document.getElementById('clear-search-btn').classList.add('hidden');
      document.getElementById('filter-year').value = 'all';
      document.getElementById('filter-akad').value = 'all';
      document.getElementById('filter-sort').value = 'terbaru';
      
      const btn = document.getElementById('btn-fav-nav');
      btn.classList.remove('bg-amber-100', 'border-amber-300', 'text-amber-900');

      renderCategories();
      filterAndRender();
    }

    // Filter and Render List
    function filterAndRender() {
      let list = [...RAW_FATWAS];

      // 1. Favorites
      if (onlyFavorites) {
        list = list.filter(f => favorites.includes(f.no));
      }

      // 2. Category
      if (currentCategory !== 'all') {
        list = list.filter(f => f.kategori === currentCategory);
      }

      // 3. Year
      if (currentYear !== 'all') {
        list = list.filter(f => f.tahun === currentYear);
      }

      // 4. Akad
      if (currentAkad !== 'all') {
        list = list.filter(f => f.akad.some(a => a.toLowerCase().includes(currentAkad.toLowerCase())));
      }

      // 5. Search query
      if (currentSearch) {
        const q = currentSearch.toLowerCase();
        list = list.filter(f => {
          return f.no.toString() === q ||
                 f.nomor_fatwa.toLowerCase().includes(q) ||
                 f.judul.toLowerCase().includes(q) ||
                 f.tahun.toLowerCase().includes(q) ||
                 f.ringkasan.toLowerCase().includes(q) ||
                 f.akad.some(a => a.toLowerCase().includes(q)) ||
                 f.tags.some(t => t.toLowerCase().includes(q)) ||
                 (f.dalil_quran + ' ' + f.dalil_hadits + ' ' + f.kaidah_fiqh).toLowerCase().includes(q);
        });
      }

      // 6. Sort
      if (currentSort === 'terbaru') {
        list.sort((a, b) => b.no - a.no);
      } else if (currentSort === 'terlama') {
        list.sort((a, b) => a.no - b.no);
      } else if (currentSort === 'judul-asc') {
        list.sort((a, b) => a.judul.localeCompare(b.judul));
      } else if (currentSort === 'tahun-desc') {
        list.sort((a, b) => Number(b.tahun) - Number(a.tahun));
      }

      // Update Result Count text
      document.getElementById('results-count-text').textContent = \`Menampilkan \${list.length} dari \${RAW_FATWAS.length} fatwa\`;

      // Update Active filters row
      updateActiveFilterChips();

      // Render cards
      const container = document.getElementById('fatwa-list-container');
      const emptyState = document.getElementById('empty-state');

      if (list.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
      }

      emptyState.classList.add('hidden');

      let cardsHtml = '';
      list.forEach(item => {
        const isFav = favorites.includes(item.no);
        const catMeta = CATEGORIES.find(c => c.name === item.kategori) || { shortName: item.kategori, bgClass: 'bg-slate-100 text-slate-800' };

        cardsHtml += \`
          <article class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between p-4 sm:p-5 relative group">
            
            <div>
              <!-- Top Row: Badges & Bookmark -->
              <div class="flex items-start justify-between gap-2 mb-2.5">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="px-2 py-0.5 text-[11px] font-bold rounded-md bg-emerald-700 text-white shadow-2xs">
                    #\${item.no}
                  </span>
                  <span class="px-2 py-0.5 text-[11px] font-mono font-bold rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    \${item.nomor_fatwa}
                  </span>
                  <span class="px-1.5 py-0.5 text-[11px] font-semibold rounded bg-slate-100 text-slate-600">
                    \${item.tahun}
                  </span>
                </div>
                <button onclick="toggleFavorite(\${item.no}, event)" class="p-1.5 rounded-lg text-slate-300 hover:text-amber-500 hover:bg-slate-100 transition" title="\${isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}">
                  <svg class="w-4 h-4 \${isFav ? 'text-amber-500 fill-amber-500' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                  </svg>
                </button>
              </div>

              <!-- Title -->
              <h3 class="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition line-clamp-2 leading-snug mb-1.5 cursor-pointer" onclick="openDetailModal(\${item.no})">
                \${item.judul}
              </h3>

              <div class="mb-2.5">
                <span class="px-2 py-0.5 text-[10px] font-semibold rounded-md \${catMeta.bgClass}">
                  \${catMeta.shortName || catMeta.name}
                </span>
              </div>

              <!-- Summary -->
              <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                \${item.ringkasan}
              </p>

              <!-- Akads -->
              <div class="flex flex-wrap gap-1 mb-3">
                \${item.akad.map(a => \`
                  <span class="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 rounded-md">
                    \${a}
                  </span>
                \`).join('')}
              </div>
            </div>

            <!-- Bottom: Dalil indicators & Action -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between mt-1 text-xs">
              <div class="flex items-center gap-2 text-slate-400 text-[11px]">
                <span title="Dalil Al-Qur'an">📖 Quran</span>
                <span title="Dalil Hadits">📜 Hadits</span>
                <span title="Kaidah Fiqih">⚖️ Fiqih</span>
              </div>
              <button onclick="openDetailModal(\${item.no})" class="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800">
                Detail Lengkap →
              </button>
            </div>

          </article>
        \`;
      });

      container.innerHTML = cardsHtml;
    }

    function updateActiveFilterChips() {
      const row = document.getElementById('active-filters-row');
      const chips = document.getElementById('active-filter-chips');
      let chipList = [];

      if (currentSearch) {
        chipList.push(\`<span class="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-medium">Cari: "\${currentSearch}"</span>\`);
      }
      if (currentCategory !== 'all') {
        const c = CATEGORIES.find(x => x.name === currentCategory);
        chipList.push(\`<span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium">Kategori: \${c ? (c.shortName || c.name) : currentCategory}</span>\`);
      }
      if (currentYear !== 'all') {
        chipList.push(\`<span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-medium">Tahun: \${currentYear}</span>\`);
      }
      if (currentAkad !== 'all') {
        chipList.push(\`<span class="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-medium">Akad: \${currentAkad}</span>\`);
      }
      if (onlyFavorites) {
        chipList.push(\`<span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-medium">Hanya Favorit</span>\`);
      }

      if (chipList.length > 0) {
        row.classList.remove('hidden');
        chips.innerHTML = chipList.join('');
      } else {
        row.classList.add('hidden');
        chips.innerHTML = '';
      }
    }

    // Favorites Logic
    function toggleFavorite(no, e) {
      if (e) e.stopPropagation();
      const idx = favorites.indexOf(no);
      if (idx > -1) {
        favorites.splice(idx, 1);
      } else {
        favorites.push(no);
      }
      localStorage.setItem('dsn_mui_favorites', JSON.stringify(favorites));
      updateFavoriteCount();
      filterAndRender();

      if (currentActiveFatwa && currentActiveFatwa.no === no) {
        updateModalFavState();
      }
    }

    function toggleFavoriteFromModal() {
      if (!currentActiveFatwa) return;
      toggleFavorite(currentActiveFatwa.no);
    }

    function updateFavoriteCount() {
      const badge = document.getElementById('fav-badge');
      if (favorites.length > 0) {
        badge.textContent = favorites.length;
        badge.classList.remove('hidden');
        badge.classList.add('inline-flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('inline-flex');
      }
    }

    function renderDalilCards(rawText, type) {
      if (!rawText || !rawText.trim()) {
        return '<div class="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 italic">Tidak ada dalil khusus tertulis.</div>';
      }
      const chunks = rawText.replace(/\r\n/g, '\n').trim().split(/\n\s*\n+/);
      return chunks.map(function(chunk, idx) {
        const lines = chunk.split('\n').map(function(l) { return l.trim(); }).filter(Boolean);
        if (lines.length === 0) return '';
        let reference = '';
        const arabicLines = [];
        const transLines = [];
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const isBracketRef = /^\[.+\]$/.test(line);
          const isHeaderRef = /^(QS\.|Surat|Hadits|HR\.|Riwayat|Kaidah|Ijma'|Qiyas)/i.test(line);
          const hasArabic = /[\u0600-\u06FF]/.test(line);
          const isExplicitTrans = /^(Artinya\s*:?|Terjemahan\s*:?|Makna\s*:?)/i.test(line);

          if ((isBracketRef || (isHeaderRef && !hasArabic)) && !reference && arabicLines.length === 0) {
            reference = line.replace(/^\[\s*|\s*\]$/g, '').trim();
          } else if (isExplicitTrans) {
            transLines.push(line.replace(/^(Artinya\s*:?|Terjemahan\s*:?|Makna\s*:?)\s*/i, '').replace(/^"|"$/g, '').trim());
          } else if (hasArabic) {
            arabicLines.push(line);
          } else if (transLines.length > 0) {
            transLines.push(line.replace(/^"|"$/g, '').trim());
          } else if (line.startsWith('"') || (arabicLines.length > 0 && !hasArabic)) {
            transLines.push(line.replace(/^"|"$/g, '').trim());
          } else {
            if (!reference && idx === 0 && lines.length === 1) reference = line;
            else transLines.push(line);
          }
        }
        const arabic = arabicLines.join('\n').trim();
        const translation = transLines.join(' ').trim();
        const defaultRef = type === 'quran' ? "Al-Qur'an Al-Karim" : (type === 'hadits' ? 'Hadits Nabi SAW' : 'Kaidah Fiqhiyyah');
        const badgeColor = type === 'quran' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : (type === 'hadits' ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-indigo-100 text-indigo-900 border-indigo-300');
        const transBg = type === 'quran' ? 'bg-emerald-50/70 border-emerald-200/70' : (type === 'hadits' ? 'bg-amber-50/70 border-amber-200/70' : 'bg-indigo-50/70 border-indigo-200/70');
        const labelColor = type === 'quran' ? 'text-emerald-800' : (type === 'hadits' ? 'text-amber-800' : 'text-indigo-800');

        let html = '<div class="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs mb-3">';
        html += '<div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">';
        html += '<span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold border ' + badgeColor + '">' + (reference || defaultRef) + '</span>';
        html += '</div>';
        if (arabic) {
          html += '<div dir="rtl" class="font-arabic text-xl sm:text-2xl text-slate-900 leading-loose text-right mb-3 py-1 select-all">' + arabic + '</div>';
        }
        if (translation) {
          html += '<div dir="ltr" class="' + transBg + ' p-3 rounded-xl border text-xs sm:text-sm text-slate-800 text-left">';
          html += '<span class="text-[11px] font-bold uppercase tracking-wider ' + labelColor + ' block mb-1">Terjemahan:</span>';
          html += '<p class="italic font-normal">"' + translation + '"</p>';
          html += '</div>';
        }
        html += '</div>';
        return html;
      }).join('');
    }

    // Detail Modal
    function openDetailModal(no) {
      const item = RAW_FATWAS.find(f => f.no === no);
      if (!item) return;
      currentActiveFatwa = item;

      const catMeta = CATEGORIES.find(c => c.name === item.kategori) || { shortName: item.kategori, bgClass: 'bg-slate-100 text-slate-800' };

      document.getElementById('modal-nomor-badge').textContent = \`Fatwa #\${item.no}\`;
      document.getElementById('modal-nomor-surat').textContent = item.nomor_fatwa;
      document.getElementById('modal-tahun').textContent = \`Tahun \${item.tahun}\`;
      const catEl = document.getElementById('modal-kategori');
      catEl.textContent = catMeta.shortName || catMeta.name;
      catEl.className = \`px-2 py-0.5 text-xs font-semibold rounded-md \${catMeta.bgClass}\`;

      document.getElementById('modal-judul').textContent = item.judul;
      document.getElementById('modal-ringkasan').textContent = item.ringkasan;

      // Akads
      document.getElementById('modal-akads').innerHTML = item.akad.map(a => \`
        <span class="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-900 rounded-md">\${a}</span>
      \`).join('');

      // Tags
      document.getElementById('modal-tags').innerHTML = item.tags.map(t => \`
        <span class="px-2 py-0.5 text-xs bg-slate-200 text-slate-700 rounded-md">#\${t}</span>
      \`).join('');

      // Dalil Quran
      document.getElementById('modal-dalil-quran').innerHTML = renderDalilCards(item.dalil_quran, 'quran');
      // Dalil Hadits
      document.getElementById('modal-dalil-hadits').innerHTML = renderDalilCards(item.dalil_hadits, 'hadits');
      // Kaidah Fiqih
      document.getElementById('modal-kaidah-fiqh').innerHTML = renderDalilCards(item.kaidah_fiqh, 'kaidah');
      // Kalam Ulama
      document.getElementById('modal-kalam-ulama').textContent = item.kalam_ulama || 'Rujukan ijma dan qiyas dari para imam mazhab.';

      setModalTab('semua');
      updateModalFavState();

      document.getElementById('detail-modal').classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }

    function setModalTab(tab) {
      modalTab = tab;
      const tabs = ['semua', 'ringkasan', 'dalil', 'kaidah'];
      tabs.forEach(t => {
        const btn = document.getElementById(\`mtab-\${t}\`);
        if (t === tab) {
          btn.className = 'py-2.5 px-3 border-b-2 border-emerald-600 text-emerald-800 font-bold whitespace-nowrap';
        } else {
          btn.className = 'py-2.5 px-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 whitespace-nowrap';
        }
      });

      const secRingkasan = document.getElementById('msec-ringkasan');
      const secQuran = document.getElementById('msec-dalil-quran');
      const secHadits = document.getElementById('msec-dalil-hadits');
      const secKaidah = document.getElementById('msec-kaidah-fiqh');
      const secUlama = document.getElementById('msec-kalam-ulama');

      if (tab === 'semua') {
        secRingkasan.style.display = 'block';
        secQuran.style.display = 'block';
        secHadits.style.display = 'block';
        secKaidah.style.display = 'block';
        secUlama.style.display = 'block';
      } else if (tab === 'ringkasan') {
        secRingkasan.style.display = 'block';
        secQuran.style.display = 'none';
        secHadits.style.display = 'none';
        secKaidah.style.display = 'none';
        secUlama.style.display = 'none';
      } else if (tab === 'dalil') {
        secRingkasan.style.display = 'none';
        secQuran.style.display = 'block';
        secHadits.style.display = 'block';
        secKaidah.style.display = 'none';
        secUlama.style.display = 'none';
      } else if (tab === 'kaidah') {
        secRingkasan.style.display = 'none';
        secQuran.style.display = 'none';
        secHadits.style.display = 'none';
        secKaidah.style.display = 'block';
        secUlama.style.display = 'block';
      }
    }

    function updateModalFavState() {
      if (!currentActiveFatwa) return;
      const isFav = favorites.includes(currentActiveFatwa.no);
      const btn = document.getElementById('modal-fav-btn');
      if (isFav) {
        btn.innerHTML = \`<svg class="w-5 h-5 text-amber-500 fill-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>\`;
      } else {
        btn.innerHTML = \`<svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>\`;
      }
    }

    function closeDetailModal() {
      document.getElementById('detail-modal').classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      currentActiveFatwa = null;
    }

    function copyModalContent() {
      if (!currentActiveFatwa) return;
      const text = \`FATWA DEWAN SYARIAH NASIONAL - MUI\\nNO: \${currentActiveFatwa.nomor_fatwa} (Tahun \${currentActiveFatwa.tahun})\\nJUDUL: \${currentActiveFatwa.judul}\\nKATEGORI: \${currentActiveFatwa.kategori}\\nAKAD: \${currentActiveFatwa.akad.join(', ')}\\n\\n[RINGKASAN & KETENTUAN HUKUM]\\n\${currentActiveFatwa.ringkasan}\\n\\n[DALIL AL-QUR'AN]\\n\${currentActiveFatwa.dalil_quran}\\n\\n[DALIL HADITS]\\n\${currentActiveFatwa.dalil_hadits}\\n\\n[KAIDAH FIQHIYYAH]\\n\${currentActiveFatwa.kaidah_fiqh}\\n\\nSumber Resmi: \${currentActiveFatwa.url_sumber}\`;
      
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('modal-copy-btn');
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Berhasil Disalin!';
        setTimeout(() => btn.innerHTML = orig, 2000);
      });
    }

    // Glossary Modal
    function openGlossaryModal() {
      renderGlossary();
      document.getElementById('glossary-modal').classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }

    function closeGlossaryModal() {
      document.getElementById('glossary-modal').classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }

    function renderGlossary(filtered = GLOSSARY) {
      const list = document.getElementById('glossary-list');
      list.innerHTML = filtered.map(item => \`
        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300 transition space-y-1.5">
          <div class="flex items-baseline justify-between gap-2">
            <h4 class="font-bold text-slate-900 text-sm sm:text-base">\${item.nama}</h4>
            <span class="font-arabic text-base sm:text-lg text-emerald-800 font-bold">\${item.istilahArab}</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">\${item.definisi}</p>
          <p class="text-xs text-slate-500"><strong class="text-slate-600">Aplikasi:</strong> \${item.contohAplikasi}</p>
          <button onclick="closeGlossaryModal(); handleAkadChange('\${item.nama}');" class="mt-2 text-xs font-semibold text-emerald-700 hover:underline">
            Lihat Fatwa Terkait \${item.nama} →
          </button>
        </div>
      \`).join('');
    }

    function filterGlossary(val) {
      const q = val.toLowerCase();
      const filtered = GLOSSARY.filter(item => 
        item.nama.toLowerCase().includes(q) ||
        item.definisi.toLowerCase().includes(q) ||
        item.contohAplikasi.toLowerCase().includes(q)
      );
      renderGlossary(filtered);
    }

    // Export Modal
    function openExportModal() {
      document.getElementById('export-modal').classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }

    function closeExportModal() {
      document.getElementById('export-modal').classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }

    function downloadCSV() {
      const headers = ['No', 'Nomor Fatwa', 'Tahun', 'Kategori', 'Judul Fatwa', 'Akad', 'Ringkasan', 'URL Sumber'];
      const rows = RAW_FATWAS.map(f => [
        f.no,
        \`"\${f.nomor_fatwa.replace(/"/g, '""')}"\`,
        f.tahun,
        \`"\${f.kategori.replace(/"/g, '""')}"\`,
        \`"\${f.judul.replace(/"/g, '""')}"\`,
        \`"\${f.akad.join(', ')}"\`,
        \`"\${f.ringkasan.replace(/"/g, '""')}"\`,
        \`"\${f.url_sumber.replace(/"/g, '""')}"\`
      ]);
      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'kumpulan_fatwa_dsn_mui_lengkap.csv';
      a.click();
      URL.revokeObjectURL(url);
    }

    function downloadJSON() {
      const blob = new Blob([JSON.stringify(RAW_FATWAS, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'kumpulan_fatwa_dsn_mui.json';
      a.click();
      URL.revokeObjectURL(url);
    }

    function downloadSelfHtml() {
      const html = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
      const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fatwa-dsn-mui-mandiri.html';
      a.click();
      URL.revokeObjectURL(url);
    }
  </script>
</body>
</html>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'fatwa-dsn-mui.html'), htmlContent, 'utf8');
  console.log('Successfully generated standalone HTML application at public/fatwa-dsn-mui.html');
}

generateHtml();

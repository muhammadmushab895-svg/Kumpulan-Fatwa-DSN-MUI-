import React, { useState } from 'react';
import { X, BookOpen, Search, ArrowRight } from 'lucide-react';

interface KamusAkadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAkadFilter: (akadName: string) => void;
}

interface AkadDefinition {
  nama: string;
  istilahArab: string;
  definisi: string;
  contohAplikasi: string;
}

const AKAD_GLOSSARY: AkadDefinition[] = [
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

export const KamusAkadModal: React.FC<KamusAkadModalProps> = ({
  isOpen,
  onClose,
  onSelectAkadFilter,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredGlossary = AKAD_GLOSSARY.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.definisi.toLowerCase().includes(search.toLowerCase()) ||
    item.contohAplikasi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div 
        id="modal-kamus-akad"
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] z-10"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Kamus Akad & Fikih Muamalah DSN-MUI
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Glosarium lengkap istilah akad, asas hukum, dan implementasinya dalam perbankan serta keuangan syariah.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search input in modal */}
        <div className="p-4 sm:px-6 bg-white border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama akad atau pengertian (cth: murabahah, sewa beli, mudharabah, agunan)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {filteredGlossary.map((item) => (
            <div
              key={item.nama}
              className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-4 sm:p-5 transition-colors shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-slate-900">
                    {item.nama}
                  </h3>
                  <span className="font-arabic text-emerald-800 font-semibold text-sm">
                    {item.istilahArab}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onSelectAkadFilter(item.nama.split(' ')[0]);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors self-start sm:self-auto"
                >
                  <span>Filter Fatwa Akad Ini</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                {item.definisi}
              </p>

              <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600 flex items-start gap-2 border border-slate-100">
                <strong className="text-slate-800 shrink-0 font-semibold">Penerapan Riil:</strong>
                <span>{item.contohAplikasi}</span>
              </div>
            </div>
          ))}

          {filteredGlossary.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              Tidak ditemukan akad dengan kata kunci &ldquo;{search}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {filteredGlossary.length} istilah akad</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};

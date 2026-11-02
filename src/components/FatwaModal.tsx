import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Copy, 
  Check, 
  ExternalLink, 
  Printer, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  Scale,
  Scroll,
  Quote,
  Sparkles,
  FileText
} from 'lucide-react';
import { FatwaItem } from '../types';
import { CATEGORIES } from '../data/categories';

interface FatwaModalProps {
  fatwa: FatwaItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (no: number) => void;
  onPrevFatwa?: () => void;
  onNextFatwa?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const FatwaModal: React.FC<FatwaModalProps> = ({
  fatwa,
  onClose,
  isFavorite,
  onToggleFavorite,
  onPrevFatwa,
  onNextFatwa,
  hasPrev = false,
  hasNext = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'semua' | 'ringkasan' | 'quran' | 'hadits' | 'kaidah'>('ringkasan');

  if (!fatwa) return null;

  const categoryMeta = CATEGORIES.find((c) => c.name === fatwa.kategori);

  const handleCopyFull = () => {
    const fullText = `================================================
FATWA DEWAN SYARIAH NASIONAL - MAJELIS ULAMA INDONESIA
NO: ${fatwa.nomor_fatwa} (Tahun ${fatwa.tahun})
TENTANG: ${fatwa.judul}
KATEGORI: ${fatwa.kategori}
AKAD: ${fatwa.akad.join(', ')}
================================================

[RINGKASAN & KETENTUAN HUKUM]
${fatwa.ringkasan}

[DALIL AL-QUR'AN]
${fatwa.dalil_quran}

[DALIL AS-SUNNAH / HADITS]
${fatwa.dalil_hadits}

[KAIDAH FIQHIYYAH]
${fatwa.kaidah_fiqh}

[PENDAPAT ULAMA]
${fatwa.kalam_ulama}

Sumber Resmi: ${fatwa.url_sumber}
`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div 
        id="modal-fatwa-detail"
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] z-10"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/90">
          <div className="flex items-start justify-between gap-4">
            
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2.5">
                <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-800 text-white shadow-2xs">
                  Fatwa #{fatwa.no}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-950 bg-emerald-100/90 px-2.5 py-1 rounded-xl border border-emerald-300">
                  {fatwa.nomor_fatwa}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-slate-200/90 px-2.5 py-1 rounded-xl">
                  Tahun {fatwa.tahun}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryMeta?.bgClass || 'bg-slate-100'} ${categoryMeta?.textClass || 'text-slate-700'}`}>
                  {fatwa.kategori}
                </span>
                {fatwa.tahun === '2026' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-emerald-700" />
                    Fatwa Terkini
                  </span>
                )}
              </div>

              <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {fatwa.judul}
              </h2>

              <div className="flex items-center gap-1.5 flex-wrap mt-3">
                <span className="text-xs font-semibold text-slate-500">Akad Terkait:</span>
                {fatwa.akad.map((ak) => (
                  <span key={ak} className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    {ak}
                  </span>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors shrink-0"
              aria-label="Tutup modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Action Bar */}
          <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200/70 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                id="btn-modal-fav"
                onClick={() => onToggleFavorite(fatwa.no)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                  isFavorite
                    ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                <span>{isFavorite ? 'Tersimpan' : 'Simpan'}</span>
              </button>

              <button
                id="btn-modal-copy"
                onClick={handleCopyFull}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Tersalin!' : 'Salin Lengkap'}</span>
              </button>

              <button
                id="btn-modal-print"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs"
                title="Cetak atau Simpan PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Cetak</span>
              </button>
            </div>

            <a
              id="link-official-source"
              href={fatwa.url_sumber}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/80 hover:bg-emerald-200/80 px-3 py-1.5 rounded-xl border border-emerald-300 transition-colors"
            >
              <span>Dokumen Resmi DSN-MUI</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'ringkasan', label: 'Ringkasan & Diktum', icon: FileText },
              { id: 'quran', label: "Dalil Al-Qur'an", icon: BookOpen },
              { id: 'hadits', label: 'Dalil Hadits', icon: Scroll },
              { id: 'kaidah', label: 'Kaidah Fiqh & Ulama', icon: Scale },
              { id: 'semua', label: 'Semua Teks', icon: Quote },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`btn-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-slate-800">
          
          {/* TAB 1 / SEMUA: Ringkasan & Ketentuan Hukum */}
          {(activeTab === 'ringkasan' || activeTab === 'semua') && (
            <section className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                Diktum & Ringkasan Ketentuan Fatwa
              </h3>
              <div className="text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed font-normal">
                {fatwa.ringkasan}
              </div>
            </section>
          )}

          {/* TAB 2 / SEMUA: Dalil Al-Qur'an */}
          {(activeTab === 'quran' || activeTab === 'semua') && (
            <section className="bg-emerald-50/50 p-5 sm:p-6 rounded-2xl border border-emerald-200/80">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-3.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                Landasan Dalil Al-Qur'an Al-Karim
              </h3>
              <div className="font-arabic text-xl sm:text-2xl text-slate-900 whitespace-pre-line leading-loose text-right bg-white p-5 rounded-xl border border-emerald-100/90 shadow-2xs mb-3">
                {fatwa.dalil_quran}
              </div>
            </section>
          )}

          {/* TAB 3 / SEMUA: Dalil Hadits */}
          {(activeTab === 'hadits' || activeTab === 'semua') && (
            <section className="bg-amber-50/50 p-5 sm:p-6 rounded-2xl border border-amber-200/80">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-950 mb-3.5 flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-700" />
                Landasan Dalil As-Sunnah / Hadits Nabi SAW
              </h3>
              <div className="font-arabic text-xl sm:text-2xl text-slate-900 whitespace-pre-line leading-loose text-right bg-white p-5 rounded-xl border border-amber-100/90 shadow-2xs mb-3">
                {fatwa.dalil_hadits}
              </div>
            </section>
          )}

          {/* TAB 4 / SEMUA: Kaidah Fiqhiyyah & Kalam Ulama */}
          {(activeTab === 'kaidah' || activeTab === 'semua') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <section className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-200/80">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-indigo-950 mb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-indigo-700" />
                  Kaidah Fiqhiyyah
                </h3>
                <div className="font-arabic text-lg sm:text-xl text-slate-900 whitespace-pre-line leading-loose text-right bg-white p-4 rounded-xl border border-indigo-100 shadow-2xs mb-2">
                  {fatwa.kaidah_fiqh}
                </div>
              </section>

              <section className="bg-teal-50/50 p-5 rounded-2xl border border-teal-200/80">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-teal-950 mb-3 flex items-center gap-2">
                  <Quote className="w-4 h-4 text-teal-700" />
                  Pendapat Ulama & Ijtihad DSN
                </h3>
                <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-white p-4 rounded-xl border border-teal-100 shadow-2xs">
                  {fatwa.kalam_ulama}
                </div>
              </section>
            </div>
          )}

          {/* Tags */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Kata Kunci & Indeks:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {fatwa.tags.map((t) => (
                <span key={t} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  #{t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with Previous / Next Navigation */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs sm:text-sm">
          <button
            id="btn-prev-fatwa"
            onClick={onPrevFatwa}
            disabled={!hasPrev}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 font-bold rounded-xl border transition-all ${
              hasPrev
                ? 'bg-white text-slate-700 hover:text-emerald-800 hover:border-emerald-300 border-slate-200 shadow-2xs'
                : 'bg-slate-100 text-slate-400 border-transparent cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya (←)</span>
          </button>

          <span className="text-slate-500 font-semibold text-xs">
            Gunakan tombol panah keyboard (← / →) untuk navigasi
          </span>

          <button
            id="btn-next-fatwa"
            onClick={onNextFatwa}
            disabled={!hasNext}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 font-bold rounded-xl border transition-all ${
              hasNext
                ? 'bg-emerald-700 text-white hover:bg-emerald-800 border-emerald-700 shadow-xs'
                : 'bg-slate-100 text-slate-400 border-transparent cursor-not-allowed'
            }`}
          >
            <span>Selanjutnya (→)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
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
  FileText,
  GraduationCap
} from 'lucide-react';
import { FatwaItem } from '../types';
import { CATEGORIES } from '../data/categories';
import { parseDalilText } from '../utils/dalilParser';
import { DalilSection } from './DalilCard';

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

  const quranBlocks = useMemo(() => parseDalilText(fatwa?.dalil_quran, 'quran'), [fatwa?.dalil_quran]);
  const haditsBlocks = useMemo(() => parseDalilText(fatwa?.dalil_hadits, 'hadits'), [fatwa?.dalil_hadits]);
  const kaidahBlocks = useMemo(() => parseDalilText(fatwa?.kaidah_fiqh, 'kaidah'), [fatwa?.kaidah_fiqh]);

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
            <DalilSection
              type="quran"
              title="Landasan Dalil Al-Qur'an Al-Karim"
              blocks={quranBlocks}
              rawFallback={fatwa.dalil_quran}
            />
          )}

          {/* TAB 3 / SEMUA: Dalil Hadits */}
          {(activeTab === 'hadits' || activeTab === 'semua') && (
            <DalilSection
              type="hadits"
              title="Landasan Dalil As-Sunnah / Hadits Nabi SAW"
              blocks={haditsBlocks}
              rawFallback={fatwa.dalil_hadits}
            />
          )}

          {/* TAB 4 / SEMUA: Kaidah Fiqhiyyah & Kalam Ulama */}
          {(activeTab === 'kaidah' || activeTab === 'semua') && (
            <div className="space-y-6">
              <DalilSection
                type="kaidah"
                title="Landasan Kaidah Fiqhiyyah"
                blocks={kaidahBlocks}
                rawFallback={fatwa.kaidah_fiqh}
              />

              <section className="bg-teal-50/50 p-5 sm:p-6 rounded-2xl border border-teal-200/80">
                <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-teal-950 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-teal-700" />
                    <span>Pendapat Ulama, Fuqaha & Ijtihad DSN-MUI</span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    Rujukan Fiqh Klasik & Kontemporer
                  </span>
                </div>
                <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-teal-600 shrink-0 mt-0.5 opacity-80" />
                    <div className="text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed font-normal">
                      {fatwa.kalam_ulama}
                    </div>
                  </div>
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
        <div className="p-3.5 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2 text-xs sm:text-sm">
          <button
            id="btn-prev-fatwa"
            onClick={onPrevFatwa}
            disabled={!hasPrev}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 font-bold rounded-xl border transition-all text-xs sm:text-sm ${
              hasPrev
                ? 'bg-white text-slate-700 hover:text-emerald-800 hover:border-emerald-300 border-slate-200 shadow-2xs'
                : 'bg-slate-100 text-slate-400 border-transparent cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span>Sebelumnya</span>
          </button>

          <span className="hidden md:inline text-slate-500 font-semibold text-xs text-center">
            Gunakan tombol panah keyboard (← / →) untuk navigasi
          </span>

          <button
            id="btn-next-fatwa"
            onClick={onNextFatwa}
            disabled={!hasNext}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 font-bold rounded-xl border transition-all text-xs sm:text-sm ${
              hasNext
                ? 'bg-emerald-700 text-white hover:bg-emerald-800 border-emerald-700 shadow-xs'
                : 'bg-slate-100 text-slate-400 border-transparent cursor-not-allowed'
            }`}
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

      </div>
    </div>
  );
};

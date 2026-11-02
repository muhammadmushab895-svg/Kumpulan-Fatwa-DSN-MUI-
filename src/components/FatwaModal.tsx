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
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);

  const quranBlocks = useMemo(() => parseDalilText(fatwa?.dalil_quran, 'quran'), [fatwa?.dalil_quran]);
  const haditsBlocks = useMemo(() => parseDalilText(fatwa?.dalil_hadits, 'hadits'), [fatwa?.dalil_hadits]);
  const kaidahBlocks = useMemo(() => parseDalilText(fatwa?.kaidah_fiqh, 'kaidah'), [fatwa?.kaidah_fiqh]);

  if (!fatwa) return null;

  const categoryMeta = CATEGORIES.find((c) => c.name === fatwa.kategori);

  const diktumTextSize = fontSizeLevel === 2 
    ? 'text-lg sm:text-xl' 
    : fontSizeLevel === 1 
      ? 'text-base sm:text-lg' 
      : 'text-[15px] sm:text-base';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div 
        id="modal-fatwa-detail"
        className="relative bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh] sm:max-h-[92vh] z-10"
      >
        {/* Streamlined & Compact Modal Header */}
        <div className="p-3 sm:p-6 pb-2.5 sm:pb-3.5 border-b border-slate-200 bg-slate-50/95 sticky top-0 z-20 backdrop-blur-md">
          
          {/* Top Row: Meta Badges (Left) + Compact Action Toolbar & Close (Right) */}
          <div className="flex items-center justify-between gap-2">
            
            {/* Left: Badges */}
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-extrabold bg-emerald-800 text-white shadow-2xs shrink-0">
                #{fatwa.no}
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-950 bg-emerald-100/90 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl border border-emerald-300 shrink-0">
                {fatwa.nomor_fatwa}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-600 bg-slate-200/90 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl shrink-0">
                {fatwa.tahun}
              </span>
              <span className={`text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-full shrink-0 ${categoryMeta?.bgClass || 'bg-slate-100'} ${categoryMeta?.textClass || 'text-slate-700'}`}>
                {fatwa.kategori}
              </span>
              {fatwa.tahun === '2026' && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shrink-0">
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  <span>Terkini</span>
                </span>
              )}
            </div>

            {/* Right: Actions Toolbar in ONE single compact line */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Bookmark / Favorit */}
              <button
                id="btn-modal-fav"
                onClick={() => onToggleFavorite(fatwa.no)}
                className={`inline-flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-lg sm:rounded-xl border transition-all ${
                  isFavorite
                    ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title={isFavorite ? 'Hapus dari Simpanan' : 'Simpan ke Favorit'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-500 text-amber-500' : 'text-slate-500'}`} />
                <span className="hidden sm:inline">{isFavorite ? 'Tersimpan' : 'Simpan'}</span>
              </button>

              {/* Salin Lengkap */}
              <button
                id="btn-modal-copy"
                onClick={handleCopyFull}
                className="inline-flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg sm:rounded-xl transition-colors shadow-2xs"
                title="Salin Lengkap Fatwa"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span className="hidden sm:inline">{copied ? 'Tersalin!' : 'Salin'}</span>
              </button>

              {/* Cetak (desktop only) */}
              <button
                id="btn-modal-print"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs"
                title="Cetak atau Simpan PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Cetak</span>
              </button>

              {/* Dokumen Resmi DSN-MUI */}
              <a
                id="link-official-source"
                href={fatwa.url_sumber}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/90 hover:bg-emerald-200/90 p-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-emerald-300 transition-colors"
                title="Buka Dokumen Resmi Asli DSN-MUI"
              >
                <span className="hidden md:inline">Dokumen Resmi</span>
                <span className="hidden sm:inline md:hidden">Dokumen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Close Button */}
              <button
                id="btn-close-modal"
                onClick={onClose}
                className="p-1 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg sm:rounded-full transition-colors ml-0.5"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Middle: Title */}
          <h2 className="text-sm sm:text-xl md:text-2xl font-bold sm:font-extrabold text-slate-900 leading-snug my-1.5 sm:my-2.5 line-clamp-3 sm:line-clamp-none">
            {fatwa.judul}
          </h2>

          {/* Akad Terkait (Compact inline) */}
          {fatwa.akad && fatwa.akad.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-400 text-[11px]">Akad:</span>
              {fatwa.akad.map((ak) => (
                <span key={ak} className="text-[11px] font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {ak}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Header Row: Tab Navigation & Font Resizer */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/80">
            {/* Tab Navigation */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-0.5 scrollbar-none flex-1 min-w-0">
              {[
                { id: 'ringkasan', shortLabel: 'Diktum Fatwa', label: 'Ringkasan & Diktum', icon: FileText },
                { id: 'quran', shortLabel: "Al-Qur'an", label: "Dalil Al-Qur'an", icon: BookOpen },
                { id: 'hadits', shortLabel: 'Hadits', label: 'Dalil Hadits', icon: Scroll },
                { id: 'kaidah', shortLabel: 'Kaidah & Ulama', label: 'Kaidah Fiqh & Ulama', icon: Scale },
                { id: 'semua', shortLabel: 'Semua Teks', label: 'Semua Teks', icon: Quote },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`btn-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-lg sm:rounded-xl whitespace-nowrap transition-all border shrink-0 ${
                      isActive
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Text Size Adjuster (A- / A+) */}
            <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-lg p-0.5 shrink-0 shadow-2xs">
              <button
                onClick={() => setFontSizeLevel((prev) => Math.max(0, prev - 1))}
                disabled={fontSizeLevel === 0}
                className={`px-1.5 py-0.5 text-xs font-bold rounded ${fontSizeLevel === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100'}`}
                title="Perkecil Ukuran Teks"
              >
                A-
              </button>
              <span className="text-[10px] text-slate-400 font-bold px-1 select-none">
                {fontSizeLevel === 0 ? '1x' : fontSizeLevel === 1 ? '1.15x' : '1.3x'}
              </span>
              <button
                onClick={() => setFontSizeLevel((prev) => Math.min(2, prev + 1))}
                disabled={fontSizeLevel === 2}
                className={`px-1.5 py-0.5 text-xs font-bold rounded ${fontSizeLevel === 2 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100'}`}
                title="Perbesar Ukuran Teks"
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-3.5 sm:p-6 md:p-8 overflow-y-auto flex-1 space-y-4 sm:space-y-6 text-slate-800">
          
          {/* TAB 1 / SEMUA: Ringkasan & Ketentuan Hukum */}
          {(activeTab === 'ringkasan' || activeTab === 'semua') && (
            <section className="bg-white sm:bg-slate-50/70 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Diktum & Ketentuan Hukum Fatwa</span>
                </h3>
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  Ketetapan Pokok
                </span>
              </div>
              <div className={`${diktumTextSize} text-slate-800 whitespace-pre-line leading-relaxed font-normal select-text`}>
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
              fontSizeLevel={fontSizeLevel}
            />
          )}

          {/* TAB 3 / SEMUA: Dalil Hadits */}
          {(activeTab === 'hadits' || activeTab === 'semua') && (
            <DalilSection
              type="hadits"
              title="Landasan Dalil As-Sunnah / Hadits Nabi SAW"
              blocks={haditsBlocks}
              rawFallback={fatwa.dalil_hadits}
              fontSizeLevel={fontSizeLevel}
            />
          )}

          {/* TAB 4 / SEMUA: Kaidah Fiqhiyyah & Kalam Ulama */}
          {(activeTab === 'kaidah' || activeTab === 'semua') && (
            <div className="space-y-4 sm:space-y-6">
              <DalilSection
                type="kaidah"
                title="Landasan Kaidah Fiqhiyyah"
                blocks={kaidahBlocks}
                rawFallback={fatwa.kaidah_fiqh}
                fontSizeLevel={fontSizeLevel}
              />

              <section className="bg-teal-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-teal-200/80">
                <div className="flex items-center justify-between mb-3 border-b border-teal-100/80 pb-2 flex-wrap gap-2">
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-teal-950 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>Pendapat Ulama & Ijtihad DSN-MUI</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded-md">
                    Rujukan Fiqh Klasik & Kontemporer
                  </span>
                </div>
                <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-teal-100 shadow-2xs">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0 mt-1 opacity-80" />
                    <div className={`${diktumTextSize} text-slate-700 whitespace-pre-line leading-relaxed font-normal select-text`}>
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
        <div className="p-2.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2 text-xs sm:text-sm">
          <button
            id="btn-prev-fatwa"
            onClick={onPrevFatwa}
            disabled={!hasPrev}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 font-bold rounded-lg sm:rounded-xl border transition-all text-xs sm:text-sm ${
              hasPrev
                ? 'bg-white text-slate-700 hover:text-emerald-800 hover:border-emerald-300 border-slate-200 shadow-2xs'
                : 'bg-slate-100 text-slate-400 border-transparent cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span>Sebelumnya</span>
          </button>

          <span className="hidden md:inline text-slate-500 font-semibold text-xs text-center">
            Gunakan panah keyboard (← / →) untuk navigasi fatwa
          </span>

          <button
            id="btn-next-fatwa"
            onClick={onNextFatwa}
            disabled={!hasNext}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 font-bold rounded-lg sm:rounded-xl border transition-all text-xs sm:text-sm ${
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

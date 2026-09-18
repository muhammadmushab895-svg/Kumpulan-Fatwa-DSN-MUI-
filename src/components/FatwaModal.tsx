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
  Share2
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
  const [activeTab, setActiveTab] = useState<'semua' | 'ringkasan' | 'dalil' | 'kaidah'>('semua');

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div 
        id="modal-fatwa-detail"
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] z-10"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-start justify-between gap-4">
            
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-700 text-white shadow-xs">
                  Fatwa #{fatwa.no}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {fatwa.nomor_fatwa}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-md">
                  Tahun {fatwa.tahun}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryMeta?.bgClass || 'bg-slate-100'} ${categoryMeta?.textClass || 'text-slate-700'}`}>
                  {fatwa.kategori}
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {fatwa.judul}
              </h2>
            </div>

            {/* Close Button */}
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors shrink-0"
              title="Tutup (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Akad Tags list */}
          <div className="flex items-center gap-1.5 flex-wrap mt-3 pt-3 border-t border-slate-200/60">
            <span className="text-xs font-semibold text-slate-500 mr-1">Akad Terkait:</span>
            {fatwa.akad.map((ak) => (
              <span key={ak} className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-md">
                {ak}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Navigation Filter */}
        <div className="flex items-center px-6 border-b border-slate-200 bg-white gap-2 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('semua')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'semua'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Semua Bagian
          </button>
          <button
            onClick={() => setActiveTab('ringkasan')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'ringkasan'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Diktum & Ketentuan Hukum
          </button>
          <button
            onClick={() => setActiveTab('dalil')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'dalil'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Dalil Qur'an & Hadits
          </button>
          <button
            onClick={() => setActiveTab('kaidah')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'kaidah'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Kaidah Fiqh & Ulama
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm sm:text-base leading-relaxed">
          
          {/* SECTION 1: Ringkasan Ketentuan Hukum */}
          {(activeTab === 'semua' || activeTab === 'ringkasan') && (
            <div className="bg-emerald-50/40 rounded-2xl p-5 border border-emerald-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-emerald-700" />
                Ketentuan Pokok & Diktum Fatwa
              </h3>
              <div className="whitespace-pre-line text-slate-800 font-normal leading-relaxed text-sm sm:text-base">
                {fatwa.ringkasan}
              </div>
            </div>
          )}

          {/* SECTION 2: Dalil Al-Qur'an */}
          {(activeTab === 'semua' || activeTab === 'dalil') && fatwa.dalil_quran && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Landasan Dalil Al-Qur'an
              </h3>
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 mb-2">
                <p className="font-arabic text-xl sm:text-2xl text-slate-900 text-right mb-3 leading-loose">
                  {fatwa.dalil_quran}
                </p>
              </div>
            </div>
          )}

          {/* SECTION 3: Dalil Hadits & As-Sunnah */}
          {(activeTab === 'semua' || activeTab === 'dalil') && fatwa.dalil_hadits && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
                <Scroll className="w-4 h-4 text-teal-600" />
                Landasan Dalil Hadits & Sunnah
              </h3>
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 mb-2">
                <p className="font-arabic text-xl sm:text-2xl text-slate-900 text-right mb-3 leading-loose">
                  {fatwa.dalil_hadits}
                </p>
              </div>
            </div>
          )}

          {/* SECTION 4: Kaidah Fiqhiyyah */}
          {(activeTab === 'semua' || activeTab === 'kaidah') && fatwa.kaidah_fiqh && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
                <Quote className="w-4 h-4 text-amber-600" />
                Kaidah Fiqhiyyah Muamalah
              </h3>
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 whitespace-pre-line font-arabic text-lg sm:text-xl text-slate-900 leading-relaxed text-right">
                {fatwa.kaidah_fiqh}
              </div>
            </div>
          )}

          {/* SECTION 5: Pendapat / Kalam Ulama */}
          {(activeTab === 'semua' || activeTab === 'kaidah') && fatwa.kalam_ulama && (
            <div className="bg-amber-50/40 rounded-2xl p-5 border border-amber-200/60">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2 mb-2">
                <Quote className="w-4 h-4 text-amber-700" />
                Pendapat & Kalam Ulama Mazhab
              </h3>
              <p className="text-slate-800 text-sm leading-relaxed">
                {fatwa.kalam_ulama}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Kata Kunci / Tags:</h4>
            <div className="flex items-center gap-1.5 flex-wrap">
              {fatwa.tags.map((t) => (
                <span key={t} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  #{t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Bar Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          
          {/* Navigation Prev/Next */}
          <div className="flex items-center gap-2">
            {hasPrev && (
              <button
                id="btn-modal-prev"
                onClick={onPrevFatwa}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                title="Fatwa Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>
            )}
            {hasNext && (
              <button
                id="btn-modal-next"
                onClick={onNextFatwa}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                title="Fatwa Selanjutnya"
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            
            {/* Bookmark toggle */}
            <button
              id="btn-modal-favorite"
              onClick={() => onToggleFavorite(fatwa.no)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                isFavorite
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? 'Tersimpan' : 'Simpan'}</span>
            </button>

            {/* Copy Full Button */}
            <button
              id="btn-modal-copy-full"
              onClick={handleCopyFull}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
              title="Salin Teks Lengkap Fatwa"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Fatwa</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              id="btn-modal-print"
              onClick={handlePrint}
              className="p-2 text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors hidden md:inline-flex"
              title="Cetak Fatwa"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Official PDF Document link */}
            <a
              id="btn-modal-open-pdf"
              href={fatwa.url_sumber}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors"
            >
              <span>Dokumen Asli</span>
              <ExternalLink className="w-4 h-4" />
            </a>

          </div>

        </div>

      </div>
    </div>
  );
};

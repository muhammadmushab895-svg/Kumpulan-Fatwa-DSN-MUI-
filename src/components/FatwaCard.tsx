import React, { useState } from 'react';
import { 
  Bookmark, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronRight, 
  Scale, 
  Calendar, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { FatwaItem } from '../types';
import { CATEGORIES } from '../data/categories';

interface FatwaCardProps {
  fatwa: FatwaItem;
  onOpenDetail: (fatwa: FatwaItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (no: number) => void;
  viewMode: 'grid' | 'list';
  searchHighlight?: string;
}

export const FatwaCard: React.FC<FatwaCardProps> = ({
  fatwa,
  onOpenDetail,
  isFavorite,
  onToggleFavorite,
  viewMode,
  searchHighlight = '',
}) => {
  const [copied, setCopied] = useState(false);

  // Find category styling
  const categoryMeta = CATEGORIES.find((c) => c.name === fatwa.kategori);

  const isRecent2026 = fatwa.tahun === '2026';
  const isRecent2025 = fatwa.tahun === '2025';

  const handleCopySummary = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `Fatwa DSN-MUI No. ${fatwa.nomor_fatwa} (${fatwa.tahun})\nJudul: ${fatwa.judul}\nKategori: ${fatwa.kategori}\nAkad: ${fatwa.akad.join(', ')}\n\nRingkasan:\n${fatwa.ringkasan}\n\nSumber Resmi: ${fatwa.url_sumber}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to highlight matching keywords in text
  const highlightText = (text: string, query: string) => {
    if (!query || query.trim() === '') return text;
    const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-200/90 text-slate-900 rounded-sm px-0.5 font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // LIST VIEW LAYOUT
  if (viewMode === 'list') {
    return (
      <div 
        id={`card-fatwa-${fatwa.no}`}
        onClick={() => onOpenDetail(fatwa)}
        className={`group bg-white rounded-2xl border p-4 sm:p-5 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isRecent2026 
            ? 'border-emerald-300 ring-1 ring-emerald-500/20 hover:border-emerald-500' 
            : 'border-slate-200/90 hover:border-emerald-400'
        }`}
      >
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          
          {/* Number Badge */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200/70 group-hover:from-emerald-50 group-hover:to-teal-100/50 text-slate-800 group-hover:text-emerald-800 font-extrabold flex flex-col items-center justify-center shrink-0 border border-slate-200 group-hover:border-emerald-300 transition-colors shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-emerald-600">No</span>
            <span className="text-base leading-none font-extrabold">{fatwa.no}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              {isRecent2026 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-700 px-2 py-0.5 rounded-full shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  TERBARU 2026
                </span>
              )}
              {isRecent2025 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                  TERBARU 2025
                </span>
              )}
              <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                {fatwa.nomor_fatwa}
              </span>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg">
                <Calendar className="w-3 h-3" />
                {fatwa.tahun}
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${categoryMeta?.bgClass || 'bg-slate-100'} ${categoryMeta?.textClass || 'text-slate-700'}`}>
                {fatwa.kategori}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
              {highlightText(fatwa.judul, searchHighlight)}
            </h3>

            <div className="flex items-center gap-1.5 flex-wrap mt-2">
              {fatwa.akad.map((ak) => (
                <span key={ak} className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60">
                  {ak}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            id={`btn-fav-${fatwa.no}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(fatwa.no);
            }}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-amber-50 text-amber-600 border-amber-300 shadow-2xs'
                : 'text-slate-400 hover:text-amber-600 bg-slate-50 hover:bg-amber-50 border-slate-200'
            }`}
            title={isFavorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>

          <button
            id={`btn-copy-${fatwa.no}`}
            onClick={handleCopySummary}
            className="p-2.5 text-slate-400 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-200 transition-colors shadow-2xs"
            title="Salin Ringkasan"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            id={`btn-view-${fatwa.no}`}
            onClick={() => onOpenDetail(fatwa)}
            className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all hover:translate-x-0.5"
          >
            <span>Detail & Dalil</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // GRID VIEW LAYOUT (Default)
  return (
    <div 
      id={`card-fatwa-${fatwa.no}`}
      onClick={() => onOpenDetail(fatwa)}
      className={`group bg-white rounded-3xl border p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
        isRecent2026 
          ? 'border-emerald-300 ring-2 ring-emerald-500/15 hover:border-emerald-500 shadow-emerald-500/5' 
          : 'border-slate-200/90 hover:border-emerald-400/90'
      }`}
    >
      {/* Top Banner & Number */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-xl font-extrabold text-xs flex items-center justify-center border shadow-2xs ${
              isRecent2026
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              #{fatwa.no}
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/60">
              {fatwa.nomor_fatwa}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isRecent2026 && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                2026
              </span>
            )}
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {fatwa.tahun}
            </span>

            <button
              id={`btn-fav-${fatwa.no}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(fatwa.no);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-amber-50 text-amber-500'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50/50'
              }`}
              title={isFavorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category Pill */}
        <div className="mb-2.5">
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${categoryMeta?.bgClass || 'bg-slate-100'} ${categoryMeta?.textClass || 'text-slate-700'}`}>
            {fatwa.kategori}
          </span>
        </div>

        {/* Fatwa Title */}
        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2 mb-2.5">
          {highlightText(fatwa.judul, searchHighlight)}
        </h3>

        {/* Summary Snippet */}
        <p className="text-xs text-slate-600 line-clamp-3 mb-3.5 leading-relaxed font-normal">
          {fatwa.ringkasan}
        </p>

        {/* Akad Badges */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {fatwa.akad.map((ak) => (
            <span key={ak} className="text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200">
              {ak}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <button
          id={`btn-copy-${fatwa.no}`}
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-800 font-semibold py-1 px-2.5 rounded-lg hover:bg-emerald-50 transition-colors"
          title="Salin Ringkasan Fatwa"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin</span>
            </>
          )}
        </button>

        <span className="inline-flex items-center gap-1 font-bold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all">
          <span>Baca Dalil & Diktum</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};

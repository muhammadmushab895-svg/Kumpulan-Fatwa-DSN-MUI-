import React, { useState } from 'react';
import { 
  Bookmark, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronRight, 
  Scale, 
  FileText,
  Calendar,
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

  const handleCopySummary = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `Fatwa DSN-MUI No. ${fatwa.nomor_fatwa} (${fatwa.tahun})\nJudul: ${fatwa.judul}\nKategori: ${fatwa.kategori}\nAkad: ${fatwa.akad.join(', ')}\n\nRingkasan:\n${fatwa.ringkasan}`;
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
        <mark key={i} className="bg-amber-200 text-slate-900 rounded px-0.5 font-medium">
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
        className="group bg-white rounded-xl border border-slate-200/90 hover:border-emerald-400 p-4 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          
          {/* Number Badge */}
          <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-700 font-bold flex flex-col items-center justify-center shrink-0 border border-slate-200/80 group-hover:border-emerald-200 transition-colors">
            <span className="text-[10px] uppercase font-semibold text-slate-400">No</span>
            <span className="text-base leading-none font-bold">{fatwa.no}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {fatwa.nomor_fatwa}
              </span>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {fatwa.tahun}
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${categoryMeta?.bgClass || 'bg-slate-100'} ${categoryMeta?.textClass || 'text-slate-700'}`}>
                {fatwa.kategori}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
              {highlightText(fatwa.judul, searchHighlight)}
            </h3>

            <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
              {fatwa.akad.map((ak) => (
                <span key={ak} className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
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
            className={`p-2 rounded-lg border transition-colors ${
              isFavorite
                ? 'bg-amber-50 text-amber-600 border-amber-300'
                : 'text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
            title={isFavorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>

          <button
            id={`btn-copy-${fatwa.no}`}
            onClick={handleCopySummary}
            className="p-2 text-slate-400 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 rounded-lg border border-slate-200 hover:border-emerald-200 transition-colors"
            title="Salin Ringkasan"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            id={`btn-view-${fatwa.no}`}
            onClick={() => onOpenDetail(fatwa)}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
          >
            <span>Detail</span>
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
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-400/90 p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      {/* Top Banner & Number */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200/70">
              #{fatwa.no}
            </span>
            <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              {fatwa.nomor_fatwa}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
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
        <div className="mb-2">
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryMeta?.bgClass || 'bg-slate-100'} ${categoryMeta?.textClass || 'text-slate-700'}`}>
            {fatwa.kategori}
          </span>
        </div>

        {/* Fatwa Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2 mb-2.5">
          {highlightText(fatwa.judul, searchHighlight)}
        </h3>

        {/* Summary Snippet */}
        <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
          {fatwa.ringkasan}
        </p>

        {/* Akad Badges */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {fatwa.akad.map((ak) => (
            <span key={ak} className="text-[11px] font-medium text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md border border-slate-200/60">
              {ak}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <button
          id={`btn-copy-${fatwa.no}`}
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-700 font-medium py-1 px-2 rounded hover:bg-emerald-50 transition-colors"
          title="Salin Ringkasan Fatwa"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin</span>
            </>
          )}
        </button>

        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all">
          <span>Baca Dalil & Diktum</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};

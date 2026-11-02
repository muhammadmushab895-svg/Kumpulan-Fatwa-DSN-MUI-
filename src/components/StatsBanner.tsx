import React from 'react';
import { Scale, Calendar, Layers, Bookmark } from 'lucide-react';
import { FatwaItem } from '../types';

interface StatsBannerProps {
  fatwaList: FatwaItem[];
  favoriteCount: number;
  onFilterFavorites: () => void;
  isFavoriteActive: boolean;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  fatwaList,
  favoriteCount,
  onFilterFavorites,
  isFavoriteActive,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-7 w-full max-w-full">
      
      {/* Stat 1: Total Fatwa */}
      <div className="bg-white/95 backdrop-blur-sm p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 group min-w-0">
        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
          <Scale className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-none">
              {fatwaList.length}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
              Lengkap
            </span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 truncate">
            Total Fatwa DSN-MUI
          </div>
        </div>
      </div>

      {/* Stat 2: Periode Tahun */}
      <div className="bg-white/95 backdrop-blur-sm p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 group min-w-0">
        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
          <Calendar className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0">
          <div className="text-base sm:text-2xl font-extrabold text-slate-900 leading-none truncate">
            2000 — 2026
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 flex items-center gap-1">
            <span className="truncate">26 Tahun Regulasi</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
          </div>
        </div>
      </div>

      {/* Stat 3: Kategori Utama */}
      <div className="bg-white/95 backdrop-blur-sm p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 group min-w-0">
        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
          <Layers className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0">
          <div className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-none">
            8 Sektor
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 truncate">
            Industri & Muamalah
          </div>
        </div>
      </div>

      {/* Stat 4: Bookmark Favorit */}
      <div 
        onClick={onFilterFavorites}
        className={`p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 min-w-0 ${
          isFavoriteActive
            ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
            : 'bg-white/95 backdrop-blur-sm text-slate-900 border-slate-200/90 hover:border-amber-300 hover:bg-amber-50/40 shadow-xs hover:shadow-md'
        }`}
      >
        <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${
          isFavoriteActive
            ? 'bg-white/20 text-white'
            : 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-sm shadow-amber-500/20'
        }`}>
          <Bookmark className={`w-4 h-4 sm:w-6 sm:h-6 ${favoriteCount > 0 ? 'fill-current' : ''}`} />
        </div>
        <div className="min-w-0">
          <div className={`text-xl sm:text-3xl font-extrabold leading-none ${isFavoriteActive ? 'text-white' : 'text-slate-900'}`}>
            {favoriteCount}
          </div>
          <div className={`text-[11px] sm:text-xs font-medium mt-1 truncate ${isFavoriteActive ? 'text-amber-100' : 'text-slate-500'}`}>
            {isFavoriteActive ? 'Memfilter Favorit' : 'Fatwa Tersimpan'}
          </div>
        </div>
      </div>

    </div>
  );
};

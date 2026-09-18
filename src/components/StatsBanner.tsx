import React from 'react';
import { Scale, Calendar, Layers, Handshake, Bookmark } from 'lucide-react';
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      
      {/* Stat 1: Total Fatwa */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">
            {fatwaList.length}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">Total Fatwa DSN</div>
        </div>
      </div>

      {/* Stat 2: Periode Tahun */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-none">
            2000 — 2026
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">26 Tahun Perjalanan</div>
        </div>
      </div>

      {/* Stat 3: Kategori Utama */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">
            8 Sektor
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">Kategori Industri</div>
        </div>
      </div>

      {/* Stat 4: Bookmark Favorit */}
      <div 
        onClick={onFilterFavorites}
        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
          isFavoriteActive
            ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-400/30'
            : 'bg-white text-slate-900 border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 shadow-xs'
        }`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
          isFavoriteActive
            ? 'bg-white/20 text-white border-white/30'
            : 'bg-amber-50 text-amber-600 border-amber-200'
        }`}>
          <Bookmark className={`w-5 h-5 ${favoriteCount > 0 ? 'fill-current' : ''}`} />
        </div>
        <div>
          <div className={`text-xl sm:text-2xl font-extrabold leading-none ${isFavoriteActive ? 'text-white' : 'text-slate-900'}`}>
            {favoriteCount}
          </div>
          <div className={`text-xs font-medium mt-1 ${isFavoriteActive ? 'text-amber-100' : 'text-slate-500'}`}>
            Fatwa Tersimpan
          </div>
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { 
  Calendar, 
  Handshake, 
  ArrowUpDown, 
  RotateCcw, 
  Grid3X3, 
  List,
  Bookmark,
  Filter
} from 'lucide-react';
import { FilterState } from '../types';

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  availableYears: string[];
  availableAkads: string[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  activeFilterCount: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableYears,
  availableAkads,
  viewMode,
  setViewMode,
  activeFilterCount,
}) => {
  return (
    <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
      
      {/* Left controls: Dropdowns & Toggles */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1 min-w-[280px]">
        
        {/* Tahun Filter */}
        <div className="relative inline-flex items-center">
          <Calendar className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <select
            id="select-filter-tahun"
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="Semua">Semua Tahun</option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                Tahun {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Akad Filter */}
        <div className="relative inline-flex items-center">
          <Handshake className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <select
            id="select-filter-akad"
            value={filters.akad}
            onChange={(e) => onFilterChange({ akad: e.target.value })}
            className="pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors appearance-none cursor-pointer max-w-[200px] sm:max-w-none truncate"
          >
            <option value="Semua">Semua Akad / Prinsip</option>
            {availableAkads.map((ak) => (
              <option key={ak} value={ak}>
                Akad {ak}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="relative inline-flex items-center">
          <ArrowUpDown className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <select
            id="select-sort-fatwa"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="nomor_desc">Nomor Terbesar (Terbaru 2026)</option>
            <option value="nomor_asc">Nomor Terkecil (Mulai No. 1)</option>
            <option value="tahun_desc">Tahun: Terbaru → Terlama</option>
            <option value="tahun_asc">Tahun: Terlama → Terbaru</option>
            <option value="judul_asc">Judul: A - Z</option>
          </select>
        </div>

        {/* Favorite Only Toggle */}
        <button
          id="btn-filter-favorite-only"
          onClick={() => onFilterChange({ favoriteOnly: !filters.favoriteOnly })}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
            filters.favoriteOnly
              ? 'bg-amber-500 text-white border-amber-600 shadow-xs ring-2 ring-amber-400/30'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
          title="Tampilkan hanya fatwa yang disimpan"
        >
          <Bookmark className={`w-3.5 h-3.5 ${filters.favoriteOnly ? 'fill-current' : 'text-slate-400'}`} />
          <span>Favorit</span>
        </button>

        {/* Reset Filter Button */}
        {activeFilterCount > 0 && (
          <button
            id="btn-reset-filters"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 px-3 py-2.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200"
            title="Reset semua filter"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ({activeFilterCount})</span>
          </button>
        )}

      </div>

      {/* Right controls: View Toggle (Grid / List) */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          id="btn-view-grid"
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            viewMode === 'grid'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Tampilan Grid"
        >
          <Grid3X3 className="w-4 h-4" />
          <span className="hidden sm:inline">Grid</span>
        </button>

        <button
          id="btn-view-list"
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            viewMode === 'list'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Tampilan Daftar / Tabel"
        >
          <List className="w-4 h-4" />
          <span className="hidden sm:inline">List</span>
        </button>
      </div>

    </div>
  );
};

import React from 'react';
import { 
  Calendar, 
  Handshake, 
  ArrowUpDown, 
  RotateCcw, 
  Grid3X3, 
  List,
  Bookmark
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
    <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
      
      {/* Left controls: Dropdowns & Toggles */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-[280px]">
        
        {/* Tahun Filter */}
        <div className="relative inline-flex items-center">
          <Calendar className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <select
            id="select-filter-tahun"
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors appearance-none cursor-pointer"
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
            className="pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors appearance-none cursor-pointer max-w-[180px] sm:max-w-none truncate"
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
            className="pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="nomor_desc">Nomor Terbesar (Terbaru)</option>
            <option value="nomor_asc">Nomor Terkecil (Fatwa 1)</option>
            <option value="tahun_desc">Tahun: Terbaru → Terlama</option>
            <option value="tahun_asc">Tahun: Terlama → Terbaru</option>
            <option value="judul_asc">Judul: A - Z</option>
          </select>
        </div>

        {/* Favorite Only Toggle */}
        <button
          id="btn-filter-favorite-only"
          onClick={() => onFilterChange({ favoriteOnly: !filters.favoriteOnly })}
          className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
            filters.favoriteOnly
              ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-400/20'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
          title="Tampilkan hanya fatwa yang di-bookmark"
        >
          <Bookmark className={`w-3.5 h-3.5 ${filters.favoriteOnly ? 'text-amber-600 fill-amber-600' : 'text-slate-400'}`} />
          <span>Favorit</span>
        </button>

        {/* Reset Filter Button */}
        {activeFilterCount > 0 && (
          <button
            id="btn-reset-filters"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
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
          className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
            viewMode === 'grid'
              ? 'bg-white text-emerald-800 shadow-xs font-semibold'
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
          className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
            viewMode === 'list'
              ? 'bg-white text-emerald-800 shadow-xs font-semibold'
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

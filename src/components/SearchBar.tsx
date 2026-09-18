import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onTagClick: (tag: string) => void;
  resultCount: number;
  totalCount: number;
}

const POPULAR_TAGS = [
  'Murabahah',
  'Mudharabah',
  'Musyarakah',
  'Ijarah',
  'E-Money',
  'Sukuk',
  'Saham Syariah',
  'Emas',
  'Rahn (Gadai)',
  'KPR Syariah',
  'Fintech P2P',
  'Dana Pensiun'
];

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onTagClick,
  resultCount,
  totalCount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-emerald-600" />
        </div>

        <input
          ref={inputRef}
          id="input-search-fatwa"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari fatwa berdasarkan nomor, judul, akad, dalil, atau topik (cth: 110, e-money, emas, murabahah, saham)..."
          className="w-full pl-11 pr-24 py-3.5 sm:py-4 text-sm sm:text-base bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all placeholder:text-slate-400 text-slate-900"
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
          {searchQuery && (
            <button
              id="btn-clear-search"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
            /
          </kbd>
        </div>
      </div>

      {/* Suggested Keyword Chips */}
      <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
        <span className="text-slate-500 flex items-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Pencarian Populer:
        </span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            id={`btn-tag-${tag.toLowerCase().replace(/[\s()]/g, '-')}`}
            onClick={() => onTagClick(tag)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              searchQuery.toLowerCase().includes(tag.toLowerCase())
                ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Result Status Indicator */}
      <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
        <span>
          Menampilkan <strong className="text-slate-900 font-semibold">{resultCount}</strong> dari <strong className="text-slate-900">{totalCount}</strong> fatwa
        </span>
        {searchQuery && (
          <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
            Hasil pencarian untuk: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
};

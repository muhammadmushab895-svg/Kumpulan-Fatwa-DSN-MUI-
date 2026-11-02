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
  'Emas Digital',
  'Bulion / Bank Emas',
  'Rahn (Gadai)',
  'EBAS-SP',
  'Murabahah',
  'Musyarakah (MMQ)',
  'KPR Syariah',
  'Sukuk',
  'E-Money',
  'Fintech P2P',
  'Dana Pensiun',
  'Saham Syariah'
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
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== inputRef.current) {
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
      <div className="relative flex items-center group">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <input
          ref={inputRef}
          id="input-search-fatwa"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari fatwa berdasarkan nomor, kata kunci, akad, dalil, atau topik (cth: 168, emas digital, rahn, bulion, sukuk)..."
          className="w-full pl-12 sm:pl-14 pr-24 sm:pr-28 py-4 sm:py-4.5 text-sm sm:text-base bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 focus:outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
        />

        <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center gap-2">
          {searchQuery && (
            <button
              id="btn-clear-search"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          <kbd className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-lg shadow-2xs">
            /
          </kbd>
        </div>
      </div>

      {/* Suggested Keyword Chips */}
      <div className="mt-3.5 flex items-center gap-2 flex-wrap text-xs">
        <span className="text-slate-500 flex items-center gap-1.5 font-semibold shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Pencarian Populer:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {POPULAR_TAGS.map((tag) => {
            const isMatch = searchQuery.toLowerCase().includes(tag.toLowerCase());
            return (
              <button
                key={tag}
                id={`btn-tag-${tag.toLowerCase().replace(/[\s()/]/g, '-')}`}
                onClick={() => onTagClick(tag)}
                className={`px-3 py-1 rounded-xl border transition-all ${
                  isMatch
                    ? 'bg-emerald-700 text-white border-emerald-700 font-semibold shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-800 hover:bg-emerald-50/60 shadow-2xs'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Status Indicator */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          Menampilkan <strong className="text-slate-900 font-bold">{resultCount}</strong> dari <strong className="text-slate-900">{totalCount}</strong> fatwa
        </span>
        {searchQuery && (
          <span className="text-emerald-800 font-medium bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-lg">
            Hasil untuk: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
};

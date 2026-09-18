import React, { useState, useMemo, useEffect } from 'react';
import { 
  Scale, 
  Search, 
  Layers, 
  BookOpen, 
  Bookmark, 
  FileSpreadsheet, 
  Sparkles,
  ArrowUp,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

import { ALL_FATWA, ALL_YEARS, ALL_AKADS } from './data/allFatwa';
import { FatwaItem, FilterState } from './types';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { FilterControls } from './components/FilterControls';
import { FatwaCard } from './components/FatwaCard';
import { FatwaModal } from './components/FatwaModal';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { KamusAkadModal } from './components/KamusAkadModal';
import { AboutModal } from './components/AboutModal';
import { StatsBanner } from './components/StatsBanner';
import { HtmlAppModal } from './components/HtmlAppModal';

const ITEMS_PER_PAGE = 24;

export default function App() {
  // --- States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    kategori: 'Semua',
    tahun: 'Semua',
    akad: 'Semua',
    sortBy: 'nomor_desc',
    favoriteOnly: false,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Modals state
  const [selectedFatwa, setSelectedFatwa] = useState<FatwaItem | null>(null);
  const [isSheetsOpen, setIsSheetsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false);

  // Favorites state (persisted in localStorage)
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('dsn_fatwa_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dsn_fatwa_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  }, [favorites]);

  const toggleFavorite = (no: number) => {
    setFavorites((prev) =>
      prev.includes(no) ? prev.filter((id) => id !== no) : [...prev, no]
    );
  };

  // --- Filtering & Searching Logic ---
  const filteredFatwas = useMemo(() => {
    let result = [...ALL_FATWA];

    // 1. Search Query filter (checks nomor_fatwa, no, judul, akad, ringkasan, dalil, tags)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((f) => {
        const matchNo = f.no.toString() === q || `fatwa ${f.no}`.includes(q) || `#${f.no}` === q;
        const matchNomorSurat = f.nomor_fatwa.toLowerCase().includes(q);
        const matchJudul = f.judul.toLowerCase().includes(q);
        const matchKategori = f.kategori.toLowerCase().includes(q);
        const matchAkad = f.akad.some((ak) => ak.toLowerCase().includes(q));
        const matchRingkasan = f.ringkasan.toLowerCase().includes(q);
        const matchTags = f.tags.some((t) => t.toLowerCase().includes(q));
        const matchDalil = (f.dalil_quran + ' ' + f.dalil_hadits + ' ' + f.kaidah_fiqh).toLowerCase().includes(q);

        return (
          matchNo ||
          matchNomorSurat ||
          matchJudul ||
          matchKategori ||
          matchAkad ||
          matchRingkasan ||
          matchTags ||
          matchDalil
        );
      });
    }

    // 2. Kategori filter
    if (filters.kategori !== 'Semua') {
      result = result.filter((f) => f.kategori === filters.kategori);
    }

    // 3. Tahun filter
    if (filters.tahun !== 'Semua') {
      result = result.filter((f) => f.tahun === filters.tahun);
    }

    // 4. Akad filter
    if (filters.akad !== 'Semua') {
      result = result.filter((f) =>
        f.akad.some((a) => a.toLowerCase().includes(filters.akad.toLowerCase()))
      );
    }

    // 5. Favorite filter
    if (filters.favoriteOnly) {
      result = result.filter((f) => favorites.includes(f.no));
    }

    // 6. Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'nomor_asc':
          return a.no - b.no;
        case 'nomor_desc':
          return b.no - a.no;
        case 'tahun_asc':
          return Number(a.tahun) - Number(b.tahun) || a.no - b.no;
        case 'tahun_desc':
          return Number(b.tahun) - Number(a.tahun) || b.no - a.no;
        case 'judul_asc':
          return a.judul.localeCompare(b.judul);
        default:
          return b.no - a.no;
      }
    });

    return result;
  }, [searchQuery, filters, favorites]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, filters]);

  // Current visible slice
  const displayedFatwas = useMemo(() => {
    return filteredFatwas.slice(0, visibleCount);
  }, [filteredFatwas, visibleCount]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.kategori !== 'Semua') count++;
    if (filters.tahun !== 'Semua') count++;
    if (filters.akad !== 'Semua') count++;
    if (filters.favoriteOnly) count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [filters, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      kategori: 'Semua',
      tahun: 'Semua',
      akad: 'Semua',
      sortBy: 'nomor_desc',
      favoriteOnly: false,
    });
  };

  // Modal navigation (Previous & Next fatwa in filtered list)
  const currentModalIndex = useMemo(() => {
    if (!selectedFatwa) return -1;
    return filteredFatwas.findIndex((f) => f.no === selectedFatwa.no);
  }, [selectedFatwa, filteredFatwas]);

  const handlePrevFatwa = () => {
    if (currentModalIndex > 0) {
      setSelectedFatwa(filteredFatwas[currentModalIndex - 1]);
    }
  };

  const handleNextFatwa = () => {
    if (currentModalIndex >= 0 && currentModalIndex < filteredFatwas.length - 1) {
      setSelectedFatwa(filteredFatwas[currentModalIndex + 1]);
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFatwa) return;
      if (e.key === 'ArrowLeft') {
        handlePrevFatwa();
      } else if (e.key === 'ArrowRight') {
        handleNextFatwa();
      } else if (e.key === 'Escape') {
        setSelectedFatwa(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFatwa, currentModalIndex, filteredFatwas]);

  // Scroll to top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <Navbar
        favoriteCount={favorites.length}
        onOpenFavorites={() => setFilters((prev) => ({ ...prev, favoriteOnly: !prev.favoriteOnly }))}
        onOpenSheets={() => setIsSheetsOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenHtmlApp={() => setIsHtmlModalOpen(true)}
        totalFatwa={ALL_FATWA.length}
      />

      {/* Hero Header & Search Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3 shadow-2xs">
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kompilasi Resmi Fatwa DSN-MUI (2000 — 2026)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pencarian Cepat & Kategori Fatwa DSN-MUI
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Akses cepat ketentuan hukum, dalil Al-Qur'an & Hadits, kaidah fiqhiyyah, serta integrasi ekspor data ke Google Sheets.
            </p>
          </div>

          {/* Quick Stats Summary */}
          <StatsBanner
            fatwaList={ALL_FATWA}
            favoriteCount={favorites.length}
            onFilterFavorites={() => setFilters((prev) => ({ ...prev, favoriteOnly: !prev.favoriteOnly }))}
            isFavoriteActive={filters.favoriteOnly}
          />

          {/* Main Search Input */}
          <div className="max-w-4xl mx-auto">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onTagClick={(tag) => setSearchQuery(tag)}
              resultCount={filteredFatwas.length}
              totalCount={ALL_FATWA.length}
            />
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Category Filter Pills / Grid */}
        <CategoryFilter
          selectedCategory={filters.kategori}
          onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, kategori: cat }))}
          fatwaList={ALL_FATWA}
        />

        {/* Filter Controls (Year, Akad, Sort, View Layout) */}
        <FilterControls
          filters={filters}
          onFilterChange={(newF) => setFilters((prev) => ({ ...prev, ...newF }))}
          onResetFilters={handleResetFilters}
          availableYears={ALL_YEARS}
          availableAkads={ALL_AKADS}
          viewMode={viewMode}
          setViewMode={setViewMode}
          activeFilterCount={activeFilterCount}
        />

        {/* Fatwa Cards Container */}
        {filteredFatwas.length > 0 ? (
          <div>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5' : 'space-y-3'}>
              {displayedFatwas.map((fatwa) => (
                <FatwaCard
                  key={fatwa.no}
                  fatwa={fatwa}
                  onOpenDetail={(f) => setSelectedFatwa(f)}
                  isFavorite={favorites.includes(fatwa.no)}
                  onToggleFavorite={toggleFavorite}
                  viewMode={viewMode}
                  searchHighlight={searchQuery}
                />
              ))}
            </div>

            {/* Load More Pagination */}
            {visibleCount < filteredFatwas.length && (
              <div className="mt-10 text-center">
                <button
                  id="btn-load-more"
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all text-sm group"
                >
                  <span>Tampilkan Lebih Banyak ({filteredFatwas.length - visibleCount} lagi)</span>
                  <ChevronDown className="w-4 h-4 text-emerald-600 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Tidak Ada Fatwa Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
              Tidak ada fatwa yang cocok dengan kriteria pencarian &ldquo;{searchQuery}&rdquo; atau kombinasi filter saat ini.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        )}

      </main>

      {/* Floating Scroll-to-Top Button */}
      <button
        id="btn-scroll-top"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-20 p-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all"
        title="Kembali ke atas"
        aria-label="Kembali ke atas"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Modals */}
      <FatwaModal
        fatwa={selectedFatwa}
        onClose={() => setSelectedFatwa(null)}
        isFavorite={selectedFatwa ? favorites.includes(selectedFatwa.no) : false}
        onToggleFavorite={toggleFavorite}
        onPrevFatwa={handlePrevFatwa}
        onNextFatwa={handleNextFatwa}
        hasPrev={currentModalIndex > 0}
        hasNext={currentModalIndex >= 0 && currentModalIndex < filteredFatwas.length - 1}
      />

      <GoogleSheetsModal
        isOpen={isSheetsOpen}
        onClose={() => setIsSheetsOpen(false)}
        fatwaList={filteredFatwas}
      />

      <KamusAkadModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        onSelectAkadFilter={(akad) => {
          setFilters((prev) => ({ ...prev, akad }));
        }}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <HtmlAppModal
        isOpen={isHtmlModalOpen}
        onClose={() => setIsHtmlModalOpen(false)}
        totalFatwa={ALL_FATWA.length}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Kumpulan Fatwa DSN-MUI — Referensi Fikih Muamalah Indonesia</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsHtmlModalOpen(true)}
              className="hover:text-emerald-800 transition-colors font-bold text-emerald-700 inline-flex items-center gap-1"
            >
              <span>Aplikasi HTML (Offline)</span>
            </button>
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="hover:text-emerald-700 transition-colors"
            >
              Kamus Akad
            </button>
            <button
              onClick={() => setIsSheetsOpen(true)}
              className="hover:text-emerald-700 transition-colors font-semibold text-emerald-800"
            >
              Ekspor Google Sheets
            </button>
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-emerald-700 transition-colors"
            >
              Tentang DSN-MUI
            </button>
            <a
              href="https://dsnmui.or.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700"
            >
              <span>dsnmui.or.id</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

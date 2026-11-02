import React, { useState } from 'react';
import { 
  BookOpen, 
  Bookmark, 
  Smartphone, 
  HelpCircle, 
  Scale, 
  Sparkles, 
  FileCode, 
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenPwa: () => void;
  onOpenGlossary: () => void;
  onOpenAbout: () => void;
  onOpenHtmlApp: () => void;
  totalFatwa: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoriteCount,
  onOpenFavorites,
  onOpenPwa,
  onOpenGlossary,
  onOpenAbout,
  onOpenHtmlApp,
  totalFatwa,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 shrink">
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 ring-1 ring-emerald-500/30 shrink-0">
              <Scale className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-200" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-xl font-extrabold tracking-tight text-slate-900 truncate">
                  Fatwa DSN-MUI
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-700" />
                  <span>{totalFatwa}</span>
                  <span className="hidden sm:inline">Fatwa</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium hidden sm:block truncate">
                Dewan Syariah Nasional — Majelis Ulama Indonesia
              </p>
            </div>
          </div>

          {/* Desktop Navigation (> sm) */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-2.5 shrink-0">
            {/* Aplikasi HTML Mandiri */}
            <button
              id="btn-nav-html-app"
              onClick={onOpenHtmlApp}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200 shadow-2xs hover:shadow-xs"
              title="Unduh & Buka Aplikasi HTML Mandiri (Bisa Dibuka Offline)"
            >
              <FileCode className="w-4 h-4 text-emerald-700" />
              <span>Aplikasi Offline</span>
              <span className="inline-block text-[10px] uppercase tracking-wider bg-emerald-800 text-emerald-100 px-1.5 py-0.5 rounded-md font-bold">
                HTML
              </span>
            </button>

            {/* Kamus Akad Button */}
            <button
              id="btn-nav-glossary"
              onClick={onOpenGlossary}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-800 bg-slate-100/90 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-200"
              title="Kamus Istilah & Akad Syariah"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Kamus Akad</span>
            </button>

            {/* Download PWA Android Button */}
            <button
              id="btn-nav-pwa"
              onClick={onOpenPwa}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold text-emerald-950 bg-gradient-to-r from-emerald-100 via-emerald-50 to-teal-100 hover:from-emerald-200 hover:to-teal-200 rounded-xl transition-all border border-emerald-300 shadow-2xs hover:shadow-xs"
              title="Pasang / Download Aplikasi Android (PWA)"
            >
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>PWA Android</span>
              <span className="inline-block text-[10px] uppercase tracking-wider bg-emerald-800 text-white px-1.5 py-0.5 rounded-md font-bold">
                App
              </span>
            </button>

            {/* Bookmarks Toggle */}
            <button
              id="btn-nav-bookmarks"
              onClick={onOpenFavorites}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-amber-800 bg-slate-100/90 hover:bg-amber-50 rounded-xl transition-all border border-transparent hover:border-amber-200"
              title="Fatwa Tersimpan / Favorit"
            >
              <Bookmark className={`w-4 h-4 ${favoriteCount > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-500'}`} />
              <span>Tersimpan</span>
              {favoriteCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold bg-amber-500 text-white rounded-full min-w-[1.25rem]">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* About / Info */}
            <button
              id="btn-nav-about"
              onClick={onOpenAbout}
              className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors"
              title="Tentang Aplikasi Fatwa DSN-MUI"
              aria-label="Info Aplikasi"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Bar (< sm) */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            {/* Quick PWA Button on Mobile */}
            <button
              onClick={onOpenPwa}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-lg border border-emerald-300 shadow-2xs"
              title="Pasang PWA Android"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span>PWA</span>
            </button>

            {/* Quick Favorite on Mobile */}
            <button
              onClick={onOpenFavorites}
              className="relative p-1.5 text-slate-700 bg-slate-100 hover:bg-amber-50 rounded-lg border border-slate-200"
              title="Fatwa Tersimpan"
              aria-label="Favorit"
            >
              <Bookmark className={`w-4 h-4 ${favoriteCount > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-500'}`} />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center px-1 py-0.2 text-[9px] font-bold bg-amber-500 text-white rounded-full min-w-[1rem] leading-none">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white/98 px-4 py-3.5 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => {
              onOpenPwa();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <div className="text-left">
              <div>Download PWA Android</div>
              <div className="text-[10px] text-emerald-700 font-normal">Pasang aplikasi di layar utama HP</div>
            </div>
          </button>

          <button
            onClick={() => {
              onOpenHtmlApp();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <FileCode className="w-4 h-4 text-emerald-700" />
            <div className="text-left">
              <div>Aplikasi Offline HTML</div>
              <div className="text-[10px] text-slate-500 font-normal">Unduh 1 file mandiri tanpa internet</div>
            </div>
          </button>

          <button
            onClick={() => {
              onOpenGlossary();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <div className="text-left">
              <div>Kamus Akad & Istilah Syariah</div>
              <div className="text-[10px] text-slate-500 font-normal">Penjelasan akad muamalah perbankan</div>
            </div>
          </button>

          <button
            onClick={() => {
              onOpenAbout();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-600" />
            <div className="text-left">
              <div>Tentang Dewan Syariah Nasional MUI</div>
              <div className="text-[10px] text-slate-500 font-normal">Metodologi & sejarah fatwa DSN</div>
            </div>
          </button>
        </div>
      )}
    </header>
  );
};

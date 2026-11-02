import React from 'react';
import { 
  BookOpen, 
  Bookmark, 
  FileSpreadsheet, 
  HelpCircle, 
  Scale,
  Sparkles,
  FileCode,
  Download
} from 'lucide-react';

interface NavbarProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenSheets: () => void;
  onOpenGlossary: () => void;
  onOpenAbout: () => void;
  onOpenHtmlApp: () => void;
  totalFatwa: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoriteCount,
  onOpenFavorites,
  onOpenSheets,
  onOpenGlossary,
  onOpenAbout,
  onOpenHtmlApp,
  totalFatwa,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 ring-1 ring-emerald-500/30">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-200" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                  Fatwa DSN-MUI
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100/90 text-emerald-900 border border-emerald-300 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  {totalFatwa} Fatwa
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Dewan Syariah Nasional — Majelis Ulama Indonesia
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Aplikasi HTML Mandiri / Download */}
            <button
              id="btn-nav-html-app"
              onClick={onOpenHtmlApp}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200 shadow-2xs hover:shadow-xs"
              title="Unduh & Buka Aplikasi HTML Mandiri (Bisa Dibuka Offline)"
            >
              <FileCode className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Aplikasi Offline</span>
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
              <span className="hidden md:inline">Kamus Akad</span>
            </button>

            {/* Google Sheets Export / Sync Button */}
            <button
              id="btn-nav-sheets"
              onClick={onOpenSheets}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 rounded-xl transition-all border border-teal-200 shadow-2xs"
              title="Ekspor & Buka di Google Sheets"
            >
              <FileSpreadsheet className="w-4 h-4 text-teal-700" />
              <span className="hidden sm:inline">Google Sheets</span>
              <span className="sm:hidden">Sheets</span>
            </button>

            {/* Bookmarks Toggle */}
            <button
              id="btn-nav-bookmarks"
              onClick={onOpenFavorites}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-amber-800 bg-slate-100/90 hover:bg-amber-50 rounded-xl transition-all border border-transparent hover:border-amber-200"
              title="Fatwa Tersimpan / Favorit"
            >
              <Bookmark className={`w-4 h-4 ${favoriteCount > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-500'}`} />
              <span className="hidden md:inline">Tersimpan</span>
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

        </div>
      </div>
    </header>
  );
};

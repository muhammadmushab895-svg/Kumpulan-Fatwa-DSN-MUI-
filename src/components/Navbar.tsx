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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  Fatwa DSN-MUI
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {totalFatwa} Fatwa
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Dewan Syariah Nasional — Majelis Ulama Indonesia
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Aplikasi HTML Mandiri / Download */}
            <button
              id="btn-nav-html-app"
              onClick={onOpenHtmlApp}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 rounded-lg transition-colors border border-emerald-300/80 shadow-2xs"
              title="Unduh & Buka Aplikasi HTML Mandiri (Bisa Dibuka Offline)"
            >
              <FileCode className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Aplikasi HTML</span>
              <span className="inline-block text-[10px] uppercase tracking-wider bg-emerald-700 text-white px-1.5 py-0.5 rounded font-bold">
                Offline
              </span>
            </button>

            {/* Kamus Akad Button */}
            <button
              id="btn-nav-glossary"
              onClick={onOpenGlossary}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 bg-slate-100/80 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-200"
              title="Kamus Istilah & Akad Syariah"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">Kamus Akad</span>
            </button>

            {/* Google Sheets Export / Sync Button */}
            <button
              id="btn-nav-sheets"
              onClick={onOpenSheets}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/80 rounded-lg transition-colors border border-emerald-200"
              title="Ekspor & Buka di Google Sheets"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold hidden sm:inline">Google Sheets</span>
              <span className="sm:hidden font-semibold">Sheets</span>
            </button>

            {/* Bookmarks Toggle */}
            <button
              id="btn-nav-bookmarks"
              onClick={onOpenFavorites}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-amber-700 bg-slate-100/80 hover:bg-amber-50 rounded-lg transition-colors border border-transparent hover:border-amber-200"
              title="Fatwa Tersimpan / Favorit"
            >
              <Bookmark className={`w-4 h-4 ${favoriteCount > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-500'}`} />
              <span className="hidden md:inline">Tersimpan</span>
              {favoriteCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-amber-500 text-white rounded-full min-w-[1.25rem]">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* About / Info */}
            <button
              id="btn-nav-about"
              onClick={onOpenAbout}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Tentang Aplikasi Fatwa DSN-MUI"
              aria-label="Info Aplikasi"
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

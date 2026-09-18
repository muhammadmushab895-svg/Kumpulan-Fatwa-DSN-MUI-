import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  Check, 
  FileCode, 
  Laptop, 
  Smartphone, 
  WifiOff, 
  ShieldCheck,
  Layers,
  Sparkles
} from 'lucide-react';

interface HtmlAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalFatwa: number;
}

export const HtmlAppModal: React.FC<HtmlAppModalProps> = ({
  isOpen,
  onClose,
  totalFatwa,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const res = await fetch('/fatwa-dsn-mui.html');
      if (!res.ok) throw new Error('Gagal mengunduh file HTML');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fatwa-dsn-mui-mandiri.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      window.open('/fatwa-dsn-mui.html', '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div 
        id="modal-html-app"
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <FileCode className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  Aplikasi HTML Mandiri (Offline)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  .HTML
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-0.5">
                Buka seluruh {totalFatwa} fatwa langsung di peramban tanpa internet & tanpa server
              </p>
            </div>
          </div>

          <button
            id="btn-close-html-modal"
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-5 text-slate-700 text-sm">
          
          {/* Main Action Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Unduh File HTML Siap Pakai
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 mt-1 max-w-md">
                File tunggal berukuran ringan (~290 KB) yang memuat seluruh {totalFatwa} fatwa DSN-MUI, dalil Quran & Hadits, kaidah fikih, serta kamus akad.
              </p>
            </div>

            <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
              <button
                id="btn-download-html-file"
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition active:scale-95 disabled:opacity-50"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    Telah Diunduh!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    {downloading ? 'Mengunduh...' : 'Unduh File .HTML'}
                  </>
                )}
              </button>

              <a
                href="/fatwa-dsn-mui.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-emerald-100/60 text-emerald-900 border border-emerald-300 font-semibold text-xs transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Buka di Tab Baru
              </a>
            </div>
          </div>

          {/* Key Advantages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Keunggulan Aplikasi HTML Mandiri:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                  <WifiOff className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm">100% Offline</h5>
                <p className="text-xs text-slate-500 mt-1">
                  Bisa dibuka di pesawat, pelosok, atau tanpa koneksi internet sama sekali.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                  <Laptop className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm">Tanpa Instalasi</h5>
                <p className="text-xs text-slate-500 mt-1">
                  Tidak memerlukan Node.js, npm, Docker, atau web server. Cukup klik ganda.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm">Semua Perangkat</h5>
                <p className="text-xs text-slate-500 mt-1">
                  Kompatibel dengan Google Chrome, Edge, Safari, Firefox di Windows, Mac, Android, & iOS.
                </p>
              </div>

            </div>
          </div>

          {/* How to use */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Petunjuk Penggunaan File HTML:
            </h5>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 text-xs sm:text-sm pl-1">
              <li>Klik tombol <strong>"Unduh File .HTML"</strong> di atas.</li>
              <li>Simpan file <code>fatwa-dsn-mui-mandiri.html</code> di folder dokumen, flashdisk, atau penyimpanan HP Anda.</li>
              <li>Klik 2x (atau tap) file tersebut untuk membukanya di peramban favorit Anda kapan saja.</li>
              <li>Gunakan fitur pencarian cepat, filter sektor industri, penjelajah dalil, dan bookmark favorit seperti biasa.</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};

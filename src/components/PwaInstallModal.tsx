import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  WifiOff, 
  Zap, 
  CheckCircle2, 
  ExternalLink, 
  Share2, 
  MoreVertical, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstallPrompt?: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({
  isOpen,
  onClose,
  onInstallPrompt,
  isInstallable,
  isInstalled,
}) => {
  const [downloadingHtml, setDownloadingHtml] = useState(false);

  if (!isOpen) return null;

  const handleDownloadOfflineHtml = () => {
    setDownloadingHtml(true);
    const link = document.createElement('a');
    link.href = '/fatwa-dsn-mui.html';
    link.download = 'Fatwa-DSN-MUI-Offline.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadingHtml(false), 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-xs font-semibold mb-3">
            <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
            <span>Progressive Web App (PWA) Android</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 border border-white/20 shadow-inner shrink-0 flex items-center justify-center">
              <img 
                src="/icons/icon.svg" 
                alt="Logo Fatwa DSN-MUI" 
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Pasang di HP Android
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5">
                Aplikasi Fatwa DSN-MUI langsung di layar utama smartphone Anda
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">

          {/* Quick Install Button if supported */}
          {isInstallable && !isInstalled && onInstallPrompt && (
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Pemasangan Otomatis Terdeteksi
              </p>
              <button
                onClick={() => {
                  onInstallPrompt();
                  onClose();
                }}
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4 animate-bounce" />
                <span>Pasang Aplikasi Sekarang (Gratis)</span>
              </button>
              <p className="text-[11px] text-emerald-600 font-medium">
                Satu ketukan langsung memasang aplikasi ke menu HP Anda
              </p>
            </div>
          )}

          {isInstalled && (
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs text-emerald-900 font-medium">
                Aplikasi Fatwa DSN-MUI sudah terpasang di perangkat ini. Anda dapat membukanya langsung dari layar utama.
              </div>
            </div>
          )}

          {/* Key Advantages */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Keunggulan Aplikasi PWA Android:
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Cepat & Fullscreen</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Tampilan layar penuh tanpa bilah URL browser layaknya aplikasi APK native.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs mb-1">
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Akses 100% Offline</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Dapat dibuka dan dicari kapan saja walau kuota habis atau tanpa sinyal.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs mb-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Sangat Ringan</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Hanya berukuran ~2 MB, tidak membebani memori RAM dan penyimpanan HP.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Otomatis Update</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Fatwa baru otomatis tersinkron tanpa perlu *update* manual di Play Store.
                </p>
              </div>
            </div>
          </div>

          {/* Manual Installation Guide */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <MoreVertical className="w-4 h-4 text-emerald-700" />
              <span>Panduan Pasang Manual di Google Chrome (Android):</span>
            </h3>

            <ol className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <span>
                  Buka website ini di browser <strong>Google Chrome</strong> atau <strong>Samsung Internet</strong> pada HP Android Anda.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <span>
                  Ketuk ikon <strong>menu titik tiga (⋮)</strong> di pojok kanan atas browser.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <span>
                  Pilih opsi <strong>"Tambahkan ke Layar Utama"</strong> (<em>Add to Home screen</em>) atau <strong>"Pasang Aplikasi"</strong> (<em>Install app</em>).
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  4
                </span>
                <span>
                  Ketuk <strong>"Pasang"</strong> (<em>Install</em>). Ikon aplikasi Fatwa DSN-MUI akan langsung muncul di daftar aplikasi HP Anda!
                </span>
              </li>
            </ol>
          </div>

          {/* Alternative Offline HTML Download */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Ingin File HTML Mandiri Offline?
                </p>
                <p className="text-[11px] text-slate-500">
                  Unduh 1 file HTML tunggal untuk disimpan di memori HP / dokumen.
                </p>
              </div>

              <button
                onClick={handleDownloadOfflineHtml}
                disabled={downloadingHtml}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingHtml ? 'Mengunduh...' : 'Unduh File HTML'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>

      </div>
    </div>
  );
};

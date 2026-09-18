import React from 'react';
import { X, Scale, ShieldCheck, BookOpen, ExternalLink, Award, FileSpreadsheet } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div 
        id="modal-about-app"
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] z-10"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Tentang Fatwa DSN-MUI
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Dewan Syariah Nasional — Majelis Ulama Indonesia
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-slate-700 text-sm leading-relaxed">
          
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Kedudukan Hukum Fatwa DSN-MUI
            </h3>
            <p className="text-slate-600 leading-relaxed mb-3">
              Dewan Syariah Nasional Majelis Ulama Indonesia (DSN-MUI) dibentuk oleh Majelis Ulama Indonesia pada tahun 1999 dengan mandat menetapkan fatwa-fatwa yang mengikat bagi seluruh Lembaga Keuangan Syariah (LKS), Lembaga Bisnis Syariah (LBS), dan Lembaga Perekonomian Syariah (LPS) di Indonesia.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Berdasarkan <strong>Undang-Undang No. 21 Tahun 2008 tentang Perbankan Syariah</strong> dan <strong>UU No. 4 Tahun 2023 (UU P2SK)</strong>, prinsip syariah yang diakui secara yuridis formal di Indonesia adalah fatwa yang dikeluarkan oleh MUI/DSN-MUI, yang kemudian diintegrasikan ke dalam Peraturan Otoritas Jasa Keuangan (POJK) dan Peraturan Bank Indonesia (PBI).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
              <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                Metodologi Penetapan Fatwa
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Dirumuskan melalui musyawarah para ulama fikih dan pakar ekonomi moneter berdasarkan Al-Qur'an, Sunnah Nabawiyyah, Ijma', Qiyas, dan kaidah fikih muamalah kontemporer.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                Integrasi Google Sheets & Tabular
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Aplikasi ini dilengkapi fitur ekspor satu-klik langsung ke Google Sheets (CSV/TSV) untuk mempermudah akademisi, praktisi perbankan, dan pengkaji syariah.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
              Situs Resmi & Referensi:
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href="https://dsnmui.or.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-semibold transition-colors border border-emerald-200"
              >
                <span>Portal Resmi DSN-MUI (dsnmui.or.id)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://mui.or.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-semibold transition-colors border border-slate-200"
              >
                <span>Majelis Ulama Indonesia (mui.or.id)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Kumpulan Fatwa DSN-MUI 2000 - 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl transition-colors shadow-xs"
          >
            Mengerti & Tutup
          </button>
        </div>

      </div>
    </div>
  );
};

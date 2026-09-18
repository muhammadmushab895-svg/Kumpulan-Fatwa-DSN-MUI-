import React, { useState } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Table, 
  Info,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FatwaItem } from '../types';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fatwaList: FatwaItem[];
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  fatwaList,
}) => {
  const [copiedTSV, setCopiedTSV] = useState(false);
  const [activeTab, setActiveTab] = useState<'export' | 'preview'>('export');

  if (!isOpen) return null;

  // Generate CSV data formatted for Google Sheets & Excel
  const generateCSV = () => {
    const headers = [
      'No',
      'Nomor Fatwa',
      'Tahun',
      'Judul Fatwa',
      'Kategori',
      'Akad Terkait',
      'Ringkasan Ketentuan',
      'Dalil Quran',
      'Dalil Hadits',
      'Kaidah Fiqh',
      'Kalam Ulama',
      'Tautan Dokumen Resmi'
    ];

    const escapeCSV = (str: string) => {
      if (!str) return '""';
      return `"${str.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    };

    const rows = fatwaList.map((f) => [
      f.no,
      escapeCSV(f.nomor_fatwa),
      f.tahun,
      escapeCSV(f.judul),
      escapeCSV(f.kategori),
      escapeCSV(f.akad.join(', ')),
      escapeCSV(f.ringkasan),
      escapeCSV(f.dalil_quran),
      escapeCSV(f.dalil_hadits),
      escapeCSV(f.kaidah_fiqh),
      escapeCSV(f.kalam_ulama),
      escapeCSV(f.url_sumber)
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    return csvContent;
  };

  // Generate TSV data for instant copy-paste into Google Sheets
  const generateTSV = () => {
    const headers = [
      'No',
      'Nomor Fatwa',
      'Tahun',
      'Judul Fatwa',
      'Kategori',
      'Akad Terkait',
      'Ringkasan Ketentuan',
      'Tautan Dokumen'
    ];

    const cleanField = (str: string) => (str || '').replace(/[\t\r\n]+/g, ' ');

    const rows = fatwaList.map((f) => [
      f.no,
      cleanField(f.nomor_fatwa),
      f.tahun,
      cleanField(f.judul),
      cleanField(f.kategori),
      cleanField(f.akad.join(', ')),
      cleanField(f.ringkasan),
      cleanField(f.url_sumber)
    ]);

    return [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
  };

  const handleDownloadCSV = () => {
    const csvData = generateCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Kumpulan_Fatwa_DSN_MUI_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyTSV = () => {
    const tsvData = generateTSV();
    navigator.clipboard.writeText(tsvData);
    setCopiedTSV(true);
    setTimeout(() => setCopiedTSV(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div 
        id="modal-google-sheets"
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] z-10"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-emerald-50/60 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Integrasi & Ekspor Google Sheets
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {fatwaList.length} Baris Data
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Format spreadsheet terstandarisasi untuk Google Sheets, Microsoft Excel, dan basis data tabular.
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

        {/* Tab switch */}
        <div className="flex items-center px-6 border-b border-slate-200 bg-white gap-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'export'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Panduan & Pilihan Ekspor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'preview'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Pratinjau Tabel Data ({fatwaList.length})
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'export' ? (
            <>
              {/* Option 1: Direct CSV Download for Google Sheets */}
              <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-5 hover:border-emerald-300 transition-colors">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-xs">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        1. Unduh File CSV Terformat (Google Sheets / Excel)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        File CSV lengkap dengan encoding UTF-8 (mencakup teks Arab dan karakter khusus), siap diimpor ke Google Sheets melalui menu <em>File &gt; Import</em>.
                      </p>
                    </div>
                  </div>

                  <button
                    id="btn-download-sheets-csv"
                    onClick={handleDownloadCSV}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all shrink-0 w-full sm:w-auto justify-center"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh CSV ({fatwaList.length} Fatwa)</span>
                  </button>
                </div>
              </div>

              {/* Option 2: Copy TSV for Direct Paste */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 bg-slate-800 text-white rounded-xl shadow-xs">
                      <Copy className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        2. Salin Data Tabular (Paste Langsung ke Google Sheets)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        Salin seluruh kolom data ke clipboard, lalu buka spreadsheet baru di Google Sheets dan tekan <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono font-bold">Ctrl+V</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono font-bold">Cmd+V</kbd>.
                      </p>
                    </div>
                  </div>

                  <button
                    id="btn-copy-sheets-tsv"
                    onClick={handleCopyTSV}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all shrink-0 w-full sm:w-auto justify-center"
                  >
                    {copiedTSV ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Tersalin ke Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Tabel ke Clipboard</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Step by step Instructions */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Langkah Cepat Membuka di Google Sheets:
                </h3>

                <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      Buka Google Sheets baru dengan mengeklik tombol{' '}
                      <a
                        href="https://sheets.new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold underline"
                      >
                        Buka sheets.new <ExternalLink className="w-3 h-3" />
                      </a>
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      Pilih menu <strong>File</strong> &gt; <strong>Impor (Import)</strong> &gt; <strong>Upload</strong> &gt; pilih file CSV yang telah diunduh di atas.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      Pilih opsi <em>"Ganti spreadsheet"</em> atau <em>"Sisipkan sheet baru"</em> dengan tipe pemisah Otomatis / Koma.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <span>
                      Seluruh dataset Fatwa DSN-MUI (Nomor, Tahun, Judul, Kategori, Akad, Dalil, dan Ringkasan) akan tersinkronisasi rapi dalam baris dan kolom Google Sheets.
                    </span>
                  </li>
                </ol>
              </div>
            </>
          ) : (
            /* PREVIEW DATA TABLE */
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 sticky top-0 font-bold text-slate-700">
                    <tr>
                      <th className="p-3 w-12 text-center">No</th>
                      <th className="p-3 whitespace-nowrap">Nomor Fatwa</th>
                      <th className="p-3 w-16">Tahun</th>
                      <th className="p-3 min-w-[200px]">Judul Fatwa</th>
                      <th className="p-3 min-w-[150px]">Kategori</th>
                      <th className="p-3 min-w-[150px]">Akad</th>
                      <th className="p-3 min-w-[280px]">Ringkasan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {fatwaList.slice(0, 50).map((f) => (
                      <tr key={f.no} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 text-center font-bold text-slate-500">{f.no}</td>
                        <td className="p-3 font-mono font-medium text-emerald-800 whitespace-nowrap">{f.nomor_fatwa}</td>
                        <td className="p-3 text-slate-600">{f.tahun}</td>
                        <td className="p-3 font-semibold text-slate-900">{f.judul}</td>
                        <td className="p-3 text-slate-700">{f.kategori}</td>
                        <td className="p-3 text-slate-600">{f.akad.join(', ')}</td>
                        <td className="p-3 text-slate-600 line-clamp-2">{f.ringkasan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {fatwaList.length > 50 && (
                <div className="p-3 bg-slate-50 text-center text-xs text-slate-500 font-medium border-t border-slate-200">
                  Menampilkan pratinjau 50 dari {fatwaList.length} total baris data fatwa.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Total {fatwaList.length} data fatwa terstruktur
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 rounded-xl transition-colors"
            >
              Tutup
            </button>
            <a
              href="https://sheets.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors"
            >
              <span>Buka Google Sheets</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { BookOpen, Scroll, Scale, Copy, Check, Quote } from 'lucide-react';
import { DalilBlock } from '../utils/dalilParser';

interface DalilSectionProps {
  type: 'quran' | 'hadits' | 'kaidah';
  title: string;
  blocks: DalilBlock[];
  rawFallback?: string;
}

export const DalilSection: React.FC<DalilSectionProps> = ({
  type,
  title,
  blocks,
  rawFallback,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTheme = () => {
    switch (type) {
      case 'quran':
        return {
          icon: BookOpen,
          sectionBg: 'bg-emerald-50/50 border-emerald-200/80',
          titleColor: 'text-emerald-950',
          iconColor: 'text-emerald-700',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          cardBg: 'bg-white',
          cardBorder: 'border-emerald-100/90',
          transBg: 'bg-emerald-50/60 border-emerald-200/60 text-slate-800',
          labelColor: 'text-emerald-800',
        };
      case 'hadits':
        return {
          icon: Scroll,
          sectionBg: 'bg-amber-50/50 border-amber-200/80',
          titleColor: 'text-amber-950',
          iconColor: 'text-amber-700',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          cardBg: 'bg-white',
          cardBorder: 'border-amber-100/90',
          transBg: 'bg-amber-50/60 border-amber-200/60 text-slate-800',
          labelColor: 'text-amber-800',
        };
      case 'kaidah':
      default:
        return {
          icon: Scale,
          sectionBg: 'bg-indigo-50/50 border-indigo-200/80',
          titleColor: 'text-indigo-950',
          iconColor: 'text-indigo-700',
          badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          cardBg: 'bg-white',
          cardBorder: 'border-indigo-100/90',
          transBg: 'bg-indigo-50/60 border-indigo-200/60 text-slate-800',
          labelColor: 'text-indigo-800',
        };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  if (blocks.length === 0 && !rawFallback) {
    return null;
  }

  return (
    <section className={`${theme.sectionBg} p-5 sm:p-6 rounded-2xl border`}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className={`text-sm font-extrabold uppercase tracking-wider ${theme.titleColor} flex items-center gap-2`}>
          <Icon className={`w-4 h-4 ${theme.iconColor}`} />
          <span>{title}</span>
        </h3>
        <span className="text-xs font-semibold text-slate-500">
          {blocks.length} {type === 'quran' ? 'Ayat' : type === 'hadits' ? 'Hadits' : 'Kaidah'}
        </span>
      </div>

      <div className="space-y-4">
        {blocks.map((block) => {
          const fullCopyText = [
            block.reference ? `[${block.reference}]` : '',
            block.arabic || '',
            block.translation ? `Artinya: "${block.translation}"` : '',
            block.notes || '',
          ].filter(Boolean).join('\n');

          const isCopied = copiedId === block.id;

          return (
            <div
              key={block.id}
              className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} p-4 sm:p-5 shadow-2xs transition-all hover:shadow-xs`}
            >
              {/* Header: Reference Badge & Individual Copy */}
              <div className="flex items-center justify-between gap-2 mb-3 border-b border-slate-100 pb-2.5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border max-w-[80%] ${theme.badgeBg}`}>
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="break-words line-clamp-1 sm:line-clamp-none">{block.reference || (type === 'quran' ? "Al-Qur'an" : 'Hadits')}</span>
                </span>

                <button
                  onClick={() => handleCopy(block.id, fullCopyText)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded-md border border-slate-200 transition-colors shrink-0"
                  title="Salin teks Arab dan terjemahan"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Arabic Text Block (RTL) */}
              {block.arabic && (
                <div
                  dir="rtl"
                  className="font-arabic text-lg sm:text-2xl text-slate-900 leading-loose text-right mb-3.5 py-1 px-1 sm:px-2 select-all tracking-wide break-words max-w-full"
                >
                  {block.arabic}
                </div>
              )}

              {/* Indonesian Translation Block (LTR) */}
              {block.translation && (
                <div
                  dir="ltr"
                  className={`${theme.transBg} p-3 sm:p-3.5 rounded-xl border text-xs sm:text-base leading-relaxed text-left break-words max-w-full`}
                >
                  <div className="flex items-start gap-2">
                    <Quote className={`w-4 h-4 ${theme.labelColor} shrink-0 mt-0.5 opacity-80`} />
                    <div className="flex-1">
                      <span className={`text-xs font-bold uppercase tracking-wider ${theme.labelColor} block mb-1`}>
                        Terjemahan:
                      </span>
                      <p className="italic font-normal text-slate-800">
                        "{block.translation}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Notes (if any) */}
              {block.notes && (
                <div dir="ltr" className="mt-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
                  {block.notes}
                </div>
              )}
            </div>
          );
        })}

        {/* Fallback if parsing returned nothing */}
        {blocks.length === 0 && rawFallback && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700 whitespace-pre-line leading-relaxed">
            {rawFallback}
          </div>
        )}
      </div>
    </section>
  );
};

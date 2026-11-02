import React from 'react';
import { 
  Building2, 
  ShoppingBag, 
  TrendingUp, 
  FileText, 
  PieChart, 
  ShieldCheck, 
  Smartphone, 
  RefreshCw,
  Layers,
  Sparkles,
  Clock
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { FatwaItem } from '../types';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedEra: string;
  onSelectEra: (era: string) => void;
  fatwaList: FatwaItem[];
}

export const ERAS = [
  { id: 'Semua', label: 'Semua Periode (2000-2026)' },
  { id: '2024-2026', label: 'Terkini (2024–2026)' },
  { id: '2018-2023', label: 'Era Digital (2018–2023)' },
  { id: '2010-2017', label: 'Ekspansi (2010–2017)' },
  { id: '2000-2009', label: 'Fondasi Awal (2000–2009)' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedEra,
  onSelectEra,
  fatwaList,
}) => {
  // Compute count for each category
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    fatwaList.forEach((f) => {
      counts[f.kategori] = (counts[f.kategori] || 0) + 1;
    });
    return counts;
  }, [fatwaList]);

  // Icon mapping with distinct styles
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-4 h-4" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4" />;
      case 'FileText':
        return <FileText className="w-4 h-4" />;
      case 'PieChart':
        return <PieChart className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'RefreshCw':
        return <RefreshCw className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Era / Periode Quick Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none w-full max-w-full">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0 pl-0.5">
          <Clock className="w-3.5 h-3.5 text-teal-600" />
          Periode:
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
          {ERAS.map((era) => {
            const isSelected = selectedEra === era.id;
            return (
              <button
                key={era.id}
                id={`btn-era-${era.id}`}
                onClick={() => onSelectEra(era.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-800 hover:bg-emerald-50/50'
                }`}
              >
                {era.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-600" />
          Kategori Industri & Sektor Fatwa
        </h2>
        {selectedCategory !== 'Semua' && (
          <button
            onClick={() => onSelectCategory('Semua')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
          >
            Tampilkan Semua Kategori
          </button>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
        
        {/* 'Semua' Option Card */}
        <button
          id="btn-cat-all"
          onClick={() => onSelectCategory('Semua')}
          className={`group flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all ${
            selectedCategory === 'Semua'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
              : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`p-2 rounded-xl transition-colors ${
              selectedCategory === 'Semua' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800'
            }`}>
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-bold truncate">Semua Kategori</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ml-1.5 ${
            selectedCategory === 'Semua' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            {fatwaList.length}
          </span>
        </button>

        {/* Dynamic Category Cards */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const count = categoryCounts[cat.name] || 0;

          return (
            <button
              key={cat.id}
              id={`btn-cat-${cat.id}`}
              onClick={() => onSelectCategory(cat.name)}
              className={`group flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-600/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                  isSelected ? 'bg-white/20 text-white' : `${cat.bgClass} group-hover:scale-105`
                }`}>
                  {getIcon(cat.icon)}
                </div>
                <span className="text-xs sm:text-sm font-bold truncate leading-tight" title={cat.name}>
                  {cat.shortName || cat.name}
                </span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ml-1.5 shrink-0 ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

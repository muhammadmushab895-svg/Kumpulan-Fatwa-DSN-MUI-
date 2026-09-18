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
  Layers
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { FatwaItem } from '../types';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  fatwaList: FatwaItem[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
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

  // Icon mapping
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
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-600" />
          Kategori Topik
        </h2>
        {selectedCategory !== 'Semua' && (
          <button
            onClick={() => onSelectCategory('Semua')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            Tampilkan Semua Kategori
          </button>
        )}
      </div>

      {/* Categories Horizontal Scroll / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
        
        {/* 'Semua' Option Card */}
        <button
          id="btn-cat-all"
          onClick={() => onSelectCategory('Semua')}
          className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
            selectedCategory === 'Semua'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`p-1.5 rounded-lg ${selectedCategory === 'Semua' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-semibold truncate">Semua Fatwa</span>
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
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-600/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {getIcon(cat.icon)}
                </div>
                <span className="text-xs sm:text-sm font-semibold truncate leading-tight" title={cat.name}>
                  {cat.name}
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

export interface FatwaItem {
  no: number;
  nomor_fatwa: string;
  tahun: string;
  judul: string;
  kategori: FatwaCategory;
  akad: string[];
  dalil_quran: string;
  dalil_hadits: string;
  kaidah_fiqh: string;
  kalam_ulama: string;
  ringkasan: string;
  url_sumber: string;
  tags: string[];
}

export type FatwaCategory =
  | 'Perbankan & Simpanan'
  | 'Jual Beli & Murabahah'
  | 'Investasi & Kerjasama'
  | 'Sewa, Jasa & Keperantaraan'
  | 'Pasar Modal, Saham & Sukuk'
  | 'Fintech, E-Commerce & Emas'
  | 'Asuransi & Jaminan Sosial'
  | 'Restrukturisasi & Piutang';

export interface CategoryMeta {
  id: string;
  name: string;
  shortName?: string;
  icon: string;
  description: string;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass?: string;
}

export interface FilterState {
  kategori: string;
  tahun: string;
  akad: string;
  era: string;
  sortBy: 'nomor_desc' | 'nomor_asc' | 'tahun_desc' | 'tahun_asc' | 'judul_asc';
  favoriteOnly: boolean;
}

export interface GlossaryItem {
  term: string;
  arabic?: string;
  meaning: string;
  example: string;
  relatedFatwaNo: number[];
}

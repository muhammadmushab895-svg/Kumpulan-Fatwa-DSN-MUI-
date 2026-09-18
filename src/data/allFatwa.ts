import { FatwaItem } from '../types';
import { FATWA_PART1 } from './fatwaPart1';
import { FATWA_PART2 } from './fatwaPart2';
import { FATWA_PART3 } from './fatwaPart3';
import { FATWA_PART4 } from './fatwaPart4';

export const ALL_FATWA: FatwaItem[] = [
  ...FATWA_PART1,
  ...FATWA_PART2,
  ...FATWA_PART3,
  ...FATWA_PART4,
];

// Helper to extract unique years
export const ALL_YEARS: string[] = Array.from(
  new Set(ALL_FATWA.map((f) => f.tahun))
).sort((a, b) => Number(b) - Number(a));

// Helper to extract unique akads
export const ALL_AKADS: string[] = Array.from(
  new Set(ALL_FATWA.flatMap((f) => f.akad))
).sort((a, b) => a.localeCompare(b));

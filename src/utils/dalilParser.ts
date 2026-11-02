export interface DalilBlock {
  id: string;
  reference?: string;
  arabic?: string;
  translation?: string;
  notes?: string;
}

/**
 * Parses raw dalil text (which may contain multiple Quranic verses, Hadiths, or Kaidah)
 * into structured blocks with separate reference, Arabic text, and Indonesian translation.
 */
export function parseDalilText(rawText: string | undefined, defaultType: 'quran' | 'hadits' | 'kaidah'): DalilBlock[] {
  if (!rawText || !rawText.trim()) return [];

  const normalized = rawText.replace(/\r\n/g, '\n').trim();
  
  // Split on double newlines or lines starting with [QS, [HR, [Hadits, [Kaidah
  // We can use a regex that matches double newlines or lookahead for section headers
  const chunks = normalized.split(/\n\s*\n+/);
  const blocks: DalilBlock[] = [];

  chunks.forEach((chunk, index) => {
    const lines = chunk.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    let reference = '';
    const arabicLines: string[] = [];
    const translationLines: string[] = [];
    const noteLines: string[] = [];

    for (const line of lines) {
      // Check if line is a reference header like [QS. Al-Baqarah (2): 275] or [HR. Bukhari]
      const isBracketRef = /^\[.+\]$/.test(line);
      const isHeaderRef = /^(QS\.|Surat|Hadits|HR\.|Riwayat|Kaidah|Ijma'|Qiyas)/i.test(line);
      const hasArabic = /[\u0600-\u06FF]/.test(line);
      const isExplicitTrans = /^(Artinya\s*:?|Terjemahan\s*:?|Makna\s*:?)/i.test(line);

      if ((isBracketRef || (isHeaderRef && !hasArabic)) && !reference && arabicLines.length === 0) {
        reference = line.replace(/^\[\s*|\s*\]$/g, '').trim();
      } else if (isExplicitTrans) {
        // Strip the "Artinya:" prefix for clean presentation or keep it clean
        const cleaned = line.replace(/^(Artinya\s*:?|Terjemahan\s*:?|Makna\s*:?)\s*/i, '').replace(/^"|"$/g, '').trim();
        if (cleaned) {
          translationLines.push(cleaned);
        }
      } else if (hasArabic) {
        arabicLines.push(line);
      } else if (translationLines.length > 0) {
        translationLines.push(line.replace(/^"|"$/g, '').trim());
      } else if (line.startsWith('"') || (arabicLines.length > 0 && !hasArabic)) {
        // Line following Arabic that is Latin text is almost certainly the translation
        const cleaned = line.replace(/^"|"$/g, '').trim();
        if (cleaned) {
          translationLines.push(cleaned);
        }
      } else {
        // Narrative / notes
        if (!reference && index === 0 && lines.length === 1) {
          reference = line;
        } else {
          noteLines.push(line);
        }
      }
    }

    const arabic = arabicLines.join('\n').trim();
    const translation = translationLines.join(' ').trim();
    const notes = noteLines.join('\n').trim();

    // Default reference if missing
    let finalRef = reference;
    if (!finalRef) {
      if (defaultType === 'quran') finalRef = "Al-Qur'an Al-Karim";
      else if (defaultType === 'hadits') finalRef = 'Hadits Rasulullah SAW';
      else if (defaultType === 'kaidah') finalRef = 'Kaidah Fiqhiyyah';
    }

    // Only add if there is meaningful content
    if (arabic || translation || notes) {
      blocks.push({
        id: `${defaultType}-${index}-${Math.random().toString(36).substr(2, 6)}`,
        reference: finalRef,
        arabic: arabic || undefined,
        translation: translation || (notes && !arabic ? notes : undefined),
        notes: notes && arabic ? notes : undefined
      });
    }
  });

  return blocks;
}

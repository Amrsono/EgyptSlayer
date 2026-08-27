export interface TrackInfo {
  number: number;
  title: string;
  titleArabic?: string;
  duration?: string;
  highlight: string;
  highlightArabic?: string;
}

export interface BandMetadata {
  bandName: string;
  bandNameArabic: string;
  genre: string;
  origin: string;
  originArabic: string;
  formedYear: string;
  albumTitle: string;
  albumTitleArabic: string;
  releaseYear: string;
  rating: number; // 1 to 5 stars
  lineup: string[];
}

export type PageLayoutType = 
  | 'wide-header'          // صورة عريضة للمقالة و تحتها عامودين
  | 'tall-right'           // صورة طولية يمين و تحتها و جنبها العواميد
  | 'tall-left'            // صورة طولية شمال تحتها و جنبها العواميد
  | 'columns-only'         // عواميد كتابة فقط
  | 'full-image'           // صورة طولية بملىء الصفحة فقط
  | 'image-above-title';   // صورة بعرض الصفحة فى اعلى الوسط و تحتها العنوان و تحتها العواميد

export interface ArticleInput {
  titleArabic: string;
  textArabic: string;
  bandName: string;
  albumTitle: string;
  genre: string;
  origin: string;
  formedYear: string;
  rating: number;
  logoUrl: string | null;
  albumArtUrl: string | null;
  fillerArtUrls: string[]; // List of page separator image URLs
  layoutStyle?: PageLayoutType;
}

export interface DualLanguageContent {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  bandBioEn: string;
  bandBioAr: string;
  gigReviewEn: string;
  gigReviewAr: string;
  albumAnalysisEn: string;
  albumAnalysisAr: string;
  pullQuoteEn: string;
  pullQuoteAr: string;
  verdictEn: string;
  verdictAr: string;
  tracks: TrackInfo[];
  keyHighlightsEn: string[];
  keyHighlightsAr: string[];
}

export type PageType = 'cover' | 'article-1' | 'filler' | 'article-2' | 'back-cover';

export interface MagazinePageData {
  id: string;
  pageNumber: number;
  type: PageType;
  // Left side is Arabic (RTL), Right side is English (LTR)
  fillerImageUrl?: string;
}

export interface AIConfig {
  provider: 'gemini' | 'ollama' | 'builtin';
  apiKey?: string;
  modelName?: string;
  endpoint?: string;
}

export interface MagazinePageConfig {
  id: string;
  type: 'article-1' | 'article-2' | 'filler';
  fillerUrl?: string;
  pageNumber: number;
  label: string;
}

export function getMagazinePageConfigs(input: ArticleInput): MagazinePageConfig[] {
  const pages: MagazinePageConfig[] = [
    {
      id: 'article-1',
      type: 'article-1',
      pageNumber: 1,
      label: 'Main Feature & Review',
    },
  ];

  let currentPageNum = 2;

  // First artwork separator if available
  if (input.fillerArtUrls && input.fillerArtUrls[0]) {
    pages.push({
      id: 'filler-0',
      type: 'filler',
      fillerUrl: input.fillerArtUrls[0],
      pageNumber: currentPageNum++,
      label: 'Band Artwork Gallery #1',
    });
  }

  // Second article page (Deep-dive review & track breakdown)
  pages.push({
    id: 'article-2',
    type: 'article-2',
    pageNumber: currentPageNum++,
    label: 'Gig History & Track Breakdown',
  });

  // Remaining artwork separators
  if (input.fillerArtUrls) {
    for (let i = 1; i < input.fillerArtUrls.length; i++) {
      pages.push({
        id: `filler-${i}`,
        type: 'filler',
        fillerUrl: input.fillerArtUrls[i],
        pageNumber: currentPageNum++,
        label: `Band Artwork Gallery #${i + 1}`,
      });
    }
  }

  return pages;
}


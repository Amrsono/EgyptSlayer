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

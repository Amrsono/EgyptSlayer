import React from 'react';
import { DualLanguageContent, ArticleInput, PageLayoutType } from '../types/magazine';
import { Star, Disc, Award } from 'lucide-react';

interface MagazineSpreadProps {
  content: DualLanguageContent;
  input: ArticleInput;
  pageType?: 'cover' | 'article-1' | 'article-2' | 'filler';
  fillerImageUrl?: string;
  pageNumber?: number;
  isPdfMode?: boolean;
}

export const MagazineSpread: React.FC<MagazineSpreadProps> = ({
  content,
  input,
  pageType = 'article-1',
  fillerImageUrl,
  pageNumber = 1,
  isPdfMode = true
}) => {
  const layoutStyle: PageLayoutType = input.layoutStyle || 'wide-header';
  const showLogo = pageType !== 'filler';
  const effectivePageNum = pageNumber;

  // ----------------------------------------------------
  // FILLER / BAND ARTWORK PAGE (NO LOGO, CLEAN WHITE/PRINT BG OR FULL BLEED)
  // ----------------------------------------------------
  if (pageType === 'filler' && fillerImageUrl) {
    return (
      <div 
        style={{ fontFamily: "'Cairo', 'Amiri', 'Montserrat', sans-serif" }}
        className="magazine-page-render w-full min-h-[950px] bg-white text-black p-8 sm:p-12 shadow-2xl relative flex flex-col justify-between border border-gray-300"
      >
        {/* Top Header - No Logo on filler pages as per Item 5 */}
        <div className="flex justify-between items-center border-b border-black/20 pb-3 text-xs font-mono font-bold uppercase tracking-wider text-gray-800">
          <span>EGYPTSLAYER MAGAZINE</span>
          <span>ARTWORK GALLERY</span>
        </div>

        {/* Center Artwork Container */}
        <div className="my-auto py-6 flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-h-[700px] overflow-hidden rounded shadow-lg border border-black/10">
            <img
              src={fillerImageUrl}
              alt="Band Visual Divider"
              className="w-full h-full object-cover max-h-[680px]"
            />
          </div>
          <div className="text-center pt-2">
            <h3 className="text-2xl font-black tracking-widest text-black uppercase font-serif">
              {input.bandName.toUpperCase()}
            </h3>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest pt-1">
              {input.albumTitle} • EXCLUSIVE VISUAL
            </p>
          </div>
        </div>

        {/* Footer - Format: [Page Number], Egyptslayer Magazine (Item 8 Requirement) */}
        <div className="pt-4 border-t border-black/20 flex justify-between items-center text-xs font-mono font-bold text-black">
          <span>{effectivePageNum}, Egyptslayer Magazine</span>
          <span>ARTWORK SECTION</span>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ARTICLE PAGE (WHITE BACKGROUND, BLACK TEXT, PORTRAIT)
  // ----------------------------------------------------
  const headlineArabic = content.titleAr || input.titleArabic;
  const headlineEnglish = content.titleEn || input.bandName.toUpperCase();
  const subtitleArabic = content.subtitleAr;
  const subtitleEnglish = content.subtitleEn;

  return (
    <div
      style={{ fontFamily: "'Cairo', 'Amiri', 'Montserrat', sans-serif" }}
      className="magazine-page-render w-full min-h-[1050px] bg-white text-black p-6 sm:p-10 shadow-2xl relative flex flex-col justify-between border border-gray-300"
    >
      {/* 1. TOP HEADER - Clean top bar with Optional Band Logo (Item 4: Removed yellow/red web banners) */}
      <div className="flex justify-between items-center border-b-2 border-black pb-3 mb-6">
        <div className="flex items-center gap-3">
          {showLogo && input.logoUrl ? (
            <img src={input.logoUrl} alt="Logo" className="h-9 max-w-[130px] object-contain filter grayscale contrast-200" />
          ) : showLogo ? (
            <span className="text-base font-black tracking-tighter uppercase font-serif text-black">
              {input.bandName}
            </span>
          ) : null}
        </div>
        <div className="text-xs font-bold font-mono text-black tracking-widest uppercase">
          EGYPTSLAYER MAGAZINE
        </div>
      </div>

      {/* ARTICLE CONTENT WRAPPER BASED ON SELECTED LAYOUT STYLE (Item 9 Requirement) */}
      <div className="flex-1 flex flex-col justify-between space-y-6">

        {/* LAYOUT OPTION: image-above-title (Full Width Top Image -> Centered Title -> Columns) */}
        {layoutStyle === 'image-above-title' && input.albumArtUrl && (
          <div className="w-full max-h-[300px] overflow-hidden rounded mb-2 border border-black/10 shadow-sm">
            <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-48 sm:h-64 object-cover" />
          </div>
        )}

        {/* 6. CENTERED HEADLINE & SUBTITLE (Item 6 Requirement: Always Centered & 150% Larger) */}
        {layoutStyle !== 'full-image' && (
          <div className="text-center space-y-3 px-2 py-2 border-b border-black/10">
            {/* Main Headline - 150% Larger (1.5x) than default 3xl -> 5xl/6xl */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight uppercase font-serif">
              {headlineEnglish}
            </h1>

            {/* Arabic Headline */}
            <h2 className="text-2xl sm:text-3xl font-black text-black font-arabic leading-snug">
              {headlineArabic}
            </h2>

            {/* Subtitles */}
            {(subtitleEnglish || subtitleArabic) && (
              <p className="text-xs sm:text-sm font-semibold text-gray-700 font-arabic italic max-w-3xl mx-auto leading-relaxed pt-1">
                {subtitleArabic} • {subtitleEnglish}
              </p>
            )}
          </div>
        )}

        {/* LAYOUT OPTION: wide-header (Centered Title -> Wide Image -> 2 Columns) */}
        {layoutStyle === 'wide-header' && input.albumArtUrl && (
          <div className="w-full overflow-hidden rounded border border-black/10 shadow-sm my-2">
            <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-48 sm:h-64 object-cover" />
          </div>
        )}

        {/* LAYOUT OPTION: full-image (Full Page Portrait Image Only) */}
        {layoutStyle === 'full-image' ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-4">
            <h1 className="text-3xl sm:text-4xl font-black text-black text-center font-serif uppercase">
              {headlineEnglish}
            </h1>
            {input.albumArtUrl && (
              <div className="w-full max-w-2xl h-[650px] overflow-hidden rounded border border-black/20 shadow-md">
                <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ) : (
          /* 7. DUAL COLUMN LAYOUT (Item 7 Requirement: Right Column for Arabic, Left Column for English) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-start pt-2">
            
            {/* RIGHT COLUMN: ARABIC CONTENT (RTL) */}
            <div dir="rtl" className="space-y-4 font-arabic text-xs sm:text-sm text-black leading-relaxed text-justify border-b md:border-b-0 md:border-l border-black/10 pl-0 md:pl-6">
              
              {/* Optional Tall Image on Right Side if tall-right layout is chosen */}
              {layoutStyle === 'tall-right' && input.albumArtUrl && (
                <div className="w-full h-56 overflow-hidden rounded mb-4 border border-black/10 shadow-sm">
                  <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Arabic Pull Quote */}
              {content.pullQuoteAr && (
                <div className="p-3 my-2 border-r-4 border-black bg-gray-100 italic font-bold text-black text-xs">
                  "{content.pullQuoteAr}"
                </div>
              )}

              <div className="space-y-3">
                <p className="first-letter:text-2xl font-normal leading-relaxed">
                  {content.bandBioAr || input.textArabic}
                </p>
                {content.albumAnalysisAr && <p className="leading-relaxed">{content.albumAnalysisAr}</p>}
                {content.gigReviewAr && <p className="leading-relaxed">{content.gigReviewAr}</p>}
              </div>

              {/* Track Highlights */}
              {content.tracks && content.tracks.length > 0 && (
                <div className="pt-3 border-t border-black/10">
                  <h4 className="font-bold text-xs uppercase mb-1.5 text-black">أبرز الأغاني في الألبوم:</h4>
                  <ul className="space-y-1 text-xs">
                    {content.tracks.slice(0, 3).map((tr) => (
                      <li key={tr.number} className="flex justify-between border-b border-gray-200 pb-0.5">
                        <span className="font-semibold">{tr.number}. {tr.titleArabic || tr.title}</span>
                        <span className="font-mono text-gray-600">{tr.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* LEFT COLUMN: ENGLISH CONTENT (LTR) */}
            <div dir="ltr" className="space-y-4 text-xs sm:text-sm text-black leading-relaxed text-justify font-sans">
              
              {/* Optional Tall Image on Left Side if tall-left layout is chosen */}
              {layoutStyle === 'tall-left' && input.albumArtUrl && (
                <div className="w-full h-56 overflow-hidden rounded mb-4 border border-black/10 shadow-sm">
                  <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Band Metadata Box */}
              <div className="p-3 bg-gray-100 rounded border border-gray-300 space-y-1 font-mono text-[11px]">
                <div className="font-black text-xs uppercase">{input.bandName} — {input.albumTitle}</div>
                <div className="text-gray-700">{input.genre} • {input.origin} ({input.formedYear})</div>
                <div className="flex items-center gap-1 font-bold text-black pt-0.5">
                  <span>Rating: {input.rating} / 5 Stars</span>
                </div>
              </div>

              {/* English Pull Quote */}
              {content.pullQuoteEn && (
                <div className="p-3 my-2 border-l-4 border-black bg-gray-100 italic font-bold text-black text-xs">
                  "{content.pullQuoteEn}"
                </div>
              )}

              <div className="space-y-3">
                <p className="leading-relaxed">{content.bandBioEn}</p>
                <p className="leading-relaxed">{content.albumAnalysisEn}</p>
                <p className="leading-relaxed">{content.gigReviewEn}</p>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 8. FOOTER - Format: [Page Number], Egyptslayer Magazine (Item 8 Requirement) */}
      <div className="pt-4 mt-6 border-t-2 border-black flex justify-between items-center text-xs font-mono font-bold text-black uppercase">
        <span>{effectivePageNum}, Egyptslayer Magazine</span>
        <span>{input.bandName.toUpperCase()} ARTICLE</span>
      </div>

    </div>
  );
};

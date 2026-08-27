import React from 'react';
import { DualLanguageContent, ArticleInput, PageLayoutType } from '../types/magazine';

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
  const effectivePageNum = pageNumber || 1;

  // ----------------------------------------------------
  // FILLER / BAND ARTWORK PAGE (CLEAN EDITORIAL PAPER STYLE)
  // ----------------------------------------------------
  if (pageType === 'filler' && fillerImageUrl) {
    return (
      <div 
        style={{ fontFamily: "'Cairo', 'Amiri', 'Montserrat', serif" }}
        className="magazine-page-render w-full min-h-[1050px] bg-[#f7f6f2] text-[#111111] p-8 sm:p-12 shadow-2xl relative flex flex-col justify-between border border-gray-300/80"
      >
        {/* Top Header Bar */}
        <div className="flex justify-between items-center border-b border-black/15 pb-2 text-[11px] font-sans font-bold uppercase tracking-wider text-gray-700">
          <span>EGYPTSLAYER MAGAZINE</span>
          <span>ARTWORK GALLERY</span>
        </div>

        {/* Center Artwork Box with Distress Border Effect */}
        <div className="my-auto py-4 flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-h-[720px] overflow-hidden rounded-sm shadow-md border border-black/20 p-1 bg-white">
            <img
              src={fillerImageUrl}
              alt="Band Visual Divider"
              className="w-full h-full object-cover max-h-[700px] grayscale contrast-125 hover:contrast-100 transition-all duration-500"
            />
          </div>
          <div className="text-center pt-1">
            <h3 className="text-2xl font-black tracking-widest text-[#111111] uppercase font-serif">
              {(input.bandName || 'EGYPTSLAYER').toUpperCase()}
            </h3>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest pt-1">
              {input.albumTitle || 'SPECIAL RELEASE'} • EXCLUSIVE VISUAL GALLERY
            </p>
          </div>
        </div>

        {/* Bottom Minimalist Editorial Footer */}
        <div className="pt-3 border-t border-black/15 flex justify-between items-center text-[11px] font-sans font-bold text-[#111111]">
          <span>{effectivePageNum} | EGYPTSLAYER MAGAZINE</span>
          <span>SPECIAL ISSUE</span>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ARTICLE PAGE 2: ALBUM ANALYSIS & TRACK BREAKDOWN
  // ----------------------------------------------------
  if (pageType === 'article-2') {
    return (
      <div
        style={{ fontFamily: "'Cairo', 'Amiri', 'Georgia', serif" }}
        className="magazine-page-render w-full min-h-[1050px] bg-[#f7f6f2] text-[#111111] p-8 sm:p-12 shadow-2xl relative flex flex-col justify-between border border-gray-300/80"
      >
        <div className="flex-1 flex flex-col justify-between space-y-6">
          
          {/* Sub-Header Title */}
          <div className="text-center space-y-2 pb-4 border-b border-black/15">
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight uppercase font-serif">
              {(input.bandName || 'EGYPTSLAYER').toUpperCase()} — {(input.albumTitle || 'ALBUM REVIEW').toUpperCase()}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-red-800 font-sans uppercase tracking-widest">
              EDITORIAL DEEP-DIVE • ALBUM ANALYSIS & PRODUCTION
            </p>
          </div>

          {/* 2-COLUMN DUAL LANGUAGE SECOND SPREAD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 flex-1 items-start pt-2">
            
            {/* RIGHT COLUMN: ARABIC DEEP-DIVE (RTL) */}
            <div dir="rtl" className="space-y-4 font-arabic text-[13px] sm:text-[14px] text-[#1a1a1a] leading-[1.75] text-justify border-b md:border-b-0 md:border-l border-black/15 pl-0 md:pl-8">
              {content?.albumAnalysisAr && (
                <div className="space-y-2">
                  <h3 className="font-black text-sm text-[#000000] border-b border-black/10 pb-1">تحليل الألبوم وتفاصيل الإنتاج:</h3>
                  <p className="leading-[1.75]">{content.albumAnalysisAr}</p>
                </div>
              )}

              {content?.gigReviewAr && (
                <div className="space-y-2 pt-2">
                  <h3 className="font-black text-sm text-[#000000] border-b border-black/10 pb-1">تفاصيل الحفلات المباشرة والتفاعل:</h3>
                  <p className="leading-[1.75]">{content.gigReviewAr}</p>
                </div>
              )}

              {/* Track Highlights */}
              {content?.tracks && content.tracks.length > 0 && (
                <div className="pt-3 border-t border-black/15 mt-4">
                  <h4 className="font-black text-xs uppercase mb-2 text-[#111111]">أبرز مقطوعات الألبوم:</h4>
                  <div className="space-y-1.5 text-xs">
                    {content.tracks.map((tr) => (
                      <div key={tr.number} className="flex justify-between border-b border-gray-300 pb-1">
                        <span className="font-bold text-[#111111]">{tr.number}. {tr.titleArabic || tr.title}</span>
                        <span className="font-mono text-gray-600 text-[11px]">{tr.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* LEFT COLUMN: ENGLISH DEEP-DIVE (LTR) */}
            <div dir="ltr" className="space-y-4 font-serif text-[13px] sm:text-[14px] text-[#1a1a1a] leading-[1.75] text-justify">
              
              {/* Band Metadata & Logo Box */}
              <div className="p-3.5 bg-black/5 rounded-sm border border-black/15 space-y-2 font-sans text-[11px]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-black text-xs uppercase text-[#111111]">{input.bandName} — {input.albumTitle}</div>
                    <div className="text-gray-700">{input.genre} • {input.origin} ({input.formedYear})</div>
                  </div>
                  {input.logoUrl && (
                    <img src={input.logoUrl} alt="Logo" className="h-8 max-w-[80px] object-contain" />
                  )}
                </div>
                <div className="font-bold text-[#111111] pt-0.5 flex justify-between">
                  <span>Rating: {input.rating} / 5 Stars</span>
                  <span>EGYPTSLAYER APPROVED</span>
                </div>
              </div>

              {content?.albumAnalysisEn && (
                <div className="space-y-1">
                  <strong className="font-sans font-black text-[#000000] text-xs uppercase tracking-wider block">ALBUM ANALYSIS & PRODUCTION</strong>
                  <p className="leading-[1.75]">{content.albumAnalysisEn}</p>
                </div>
              )}

              {content?.gigReviewEn && (
                <div className="space-y-1 pt-2">
                  <strong className="font-sans font-black text-[#000000] text-xs uppercase tracking-wider block">LIVE SHOW PERFORMANCE</strong>
                  <p className="leading-[1.75]">{content.gigReviewEn}</p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Minimalist Editorial Footer */}
        <div className="pt-3 mt-6 border-t border-black/15 flex justify-between items-center text-[11px] font-sans font-bold text-[#111111] uppercase tracking-wider">
          <span>{effectivePageNum} | EGYPTSLAYER MAGAZINE</span>
          <span className="text-gray-600 font-semibold">{input.bandName} REVIEW & TRACKS</span>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ARTICLE PAGE 1: PRIMARY FEATURE COVER & LAYOUT
  // ----------------------------------------------------
  const headlineArabic = input.titleArabic || content?.titleAr || 'مقالة إيجيبت سلاير';
  const headlineEnglish = (input.bandName || 'EGYPTSLAYER').toUpperCase();
  const subtitleArabic = content?.subtitleAr;
  const subtitleEnglish = content?.subtitleEn || `${input.albumTitle} • EXCLUSIVE FEATURE`;
  const bodyTextArabic = input.textArabic || content?.bandBioAr || '';

  return (
    <div
      style={{ fontFamily: "'Cairo', 'Amiri', 'Georgia', serif" }}
      className="magazine-page-render w-full min-h-[1050px] bg-[#f7f6f2] text-[#111111] p-8 sm:p-12 shadow-2xl relative flex flex-col justify-between border border-gray-300/80"
    >
      {/* ARTICLE CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col justify-between space-y-6">

        {/* 1. LAYOUT OPTION: image-above-title (Full Width Top Image -> Centered Title -> Columns) */}
        {layoutStyle === 'image-above-title' && input.albumArtUrl && (
          <div className="w-full max-h-[380px] overflow-hidden rounded-sm border border-black/20 shadow-md p-1 bg-white mb-2">
            <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-64 sm:h-80 object-cover filter contrast-105" />
          </div>
        )}

        {/* 2. CENTERED EDITORIAL HEADLINE & SUBTITLE */}
        {layoutStyle !== 'full-image' && (
          <div className="text-center space-y-2 pb-4 border-b border-black/15">
            {/* English Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight leading-none uppercase font-serif">
              {headlineEnglish}
            </h1>

            {/* Subtitle / Intro Lead */}
            <p className="text-base sm:text-lg font-bold text-gray-800 font-serif italic max-w-3xl mx-auto pt-1 leading-snug">
              {subtitleEnglish}
            </p>

            {/* Arabic Main Headline */}
            <p className="text-sm sm:text-base font-bold text-red-900 font-arabic max-w-3xl mx-auto pt-1 leading-relaxed">
              {headlineArabic}
            </p>
          </div>
        )}

        {/* 3. LAYOUT OPTION: wide-header (Title -> Wide Image -> 2 Columns) */}
        {layoutStyle === 'wide-header' && input.albumArtUrl && (
          <div className="w-full overflow-hidden rounded-sm border border-black/20 shadow-md p-1 bg-white my-2">
            <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-56 sm:h-72 object-cover filter contrast-105" />
          </div>
        )}

        {/* 4. LAYOUT OPTION: full-image (Full Page Portrait Image Only) */}
        {layoutStyle === 'full-image' ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#111111] text-center font-serif uppercase">
              {headlineEnglish}
            </h1>
            {input.albumArtUrl && (
              <div className="w-full max-w-2xl h-[680px] overflow-hidden rounded-sm border border-black/20 shadow-md p-1 bg-white">
                <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ) : (
          /* 5. SMOOTH 2-COLUMN DUAL LANGUAGE EDITORIAL LAYOUT */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 flex-1 items-start pt-2">
            
            {/* RIGHT COLUMN: ARABIC CONTENT (RTL) */}
            <div dir="rtl" className="space-y-4 font-arabic text-[13px] sm:text-[14px] text-[#1a1a1a] leading-[1.75] text-justify border-b md:border-b-0 md:border-l border-black/15 pl-0 md:pl-8">
              
              {/* Optional Tall Image on Right Side */}
              {layoutStyle === 'tall-right' && input.albumArtUrl && (
                <div className="w-full h-64 overflow-hidden rounded-sm mb-4 border border-black/20 shadow-md p-1 bg-white">
                  <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Arabic Pull Quote */}
              {content?.pullQuoteAr && (
                <div className="p-3.5 my-3 border-r-4 border-black bg-black/5 italic font-bold text-[#111111] text-xs sm:text-sm leading-relaxed">
                  "{content.pullQuoteAr}"
                </div>
              )}

              {/* Arabic Article Body */}
              <div className="space-y-3.5">
                <p className="first-letter:text-3xl font-normal leading-[1.75]">
                  <strong className="font-black text-[#000000]">نبذة الفرقة والتأثير الموسيقي: </strong>
                  {bodyTextArabic}
                </p>
              </div>
            </div>

            {/* LEFT COLUMN: ENGLISH CONTENT (LTR) */}
            <div dir="ltr" className="space-y-4 font-serif text-[13px] sm:text-[14px] text-[#1a1a1a] leading-[1.75] text-justify">
              
              {/* Optional Tall Image on Left Side */}
              {layoutStyle === 'tall-left' && input.albumArtUrl && (
                <div className="w-full h-64 overflow-hidden rounded-sm mb-4 border border-black/20 shadow-md p-1 bg-white">
                  <img src={input.albumArtUrl} alt={input.albumTitle} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Band Metadata Box */}
              <div className="p-3.5 bg-black/5 rounded-sm border border-black/15 space-y-1.5 font-sans text-[11px]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-black text-xs uppercase text-[#111111]">{input.bandName} — {input.albumTitle}</div>
                    <div className="text-gray-700">{input.genre} • {input.origin} ({input.formedYear})</div>
                  </div>
                  {input.logoUrl && (
                    <img src={input.logoUrl} alt="Logo" className="h-8 max-w-[80px] object-contain" />
                  )}
                </div>
                <div className="font-bold text-[#111111] pt-0.5">Rating: {input.rating} / 5 Stars</div>
              </div>

              {/* English Pull Quote */}
              {content?.pullQuoteEn && (
                <div className="p-3.5 my-3 border-l-4 border-black bg-black/5 italic font-bold text-[#111111] text-xs sm:text-sm leading-relaxed font-serif">
                  "{content.pullQuoteEn}"
                </div>
              )}

              {/* English Bio / Article Body Paragraphs */}
              <div className="space-y-3.5">
                {content?.bandBioEn && (
                  <p className="leading-[1.75]">
                    <strong className="font-sans font-black text-[#000000] text-xs uppercase tracking-wider block mb-0.5">BAND HISTORY & SOUND IMPACT</strong>
                    {content.bandBioEn}
                  </p>
                )}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MINIMALIST EDITORIAL FOOTER */}
      <div className="pt-3 mt-6 border-t border-black/15 flex justify-between items-center text-[11px] font-sans font-bold text-[#111111] uppercase tracking-wider">
        <span>{effectivePageNum} | EGYPTSLAYER MAGAZINE</span>
        <span className="text-gray-600 font-semibold">{input.bandName} FEATURE</span>
      </div>

    </div>
  );
};


import React from 'react';
import { DualLanguageContent, ArticleInput } from '../types/magazine';
import { Star, Flame, Disc, Radio, Shield, Globe, Award } from 'lucide-react';

interface MagazineSpreadProps {
  content: DualLanguageContent;
  input: ArticleInput;
  pageType?: 'cover' | 'article-1' | 'article-2' | 'filler';
  fillerImageUrl?: string;
}

export const MagazineSpread: React.FC<MagazineSpreadProps> = ({
  content,
  input,
  pageType = 'article-1',
  fillerImageUrl
}) => {
  // If this spread is a full-page band artwork filler
  if (pageType === 'filler' && fillerImageUrl) {
    return (
      <div className="magazine-page-render w-full h-[600px] sm:h-[720px] bg-metal-950 rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center border border-red-900/50">
        <img
          src={fillerImageUrl}
          alt="Band Artwork Divider"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-125 hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-metal-950 via-metal-950/40 to-metal-950/60" />
        
        <div className="relative z-10 text-center space-y-4 px-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/90 border border-red-700 text-red-300 font-mono text-xs shadow-metal-glow">
            <Flame className="w-4 h-4" /> BAND ARTWORK DIVIDER
          </div>
          <h2 className="text-4xl sm:text-6xl font-black metal-red-title tracking-wider">
            {input.bandName.toUpperCase()}
          </h2>
          <p className="text-sm font-semibold tracking-widest text-amber-400 uppercase">
            {input.albumTitle} • EXCLUSIVE ARTWORK GALLERY
          </p>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 border-t-2 border-l-2 border-red-600 w-8 h-8" />
        <div className="absolute top-4 right-4 border-t-2 border-r-2 border-red-600 w-8 h-8" />
        <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-red-600 w-8 h-8" />
        <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-red-600 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="magazine-page-render w-full bg-metal-950 rounded-2xl shadow-book-shadow border border-red-950 overflow-hidden">
      
      {/* Magazine Spread Grid: Left Page = Arabic (RTL), Right Page = English (LTR) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        
        {/* Central Book Spine Shadow */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-20 pointer-events-none spine-shadow" />

        {/* LEFT PAGE: ARABIC (RTL) */}
        <div dir="rtl" className="p-6 sm:p-8 bg-metal-900/90 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-l border-metal-800">
          
          {/* Subtle page background grid pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top Header Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-red-900/40 pb-3">
              <div className="flex items-center gap-3">
                {input.logoUrl ? (
                  <img src={input.logoUrl} alt="Logo" className="h-10 max-w-[120px] object-contain" />
                ) : (
                  <div className="h-9 px-3 rounded bg-red-950 border border-red-800 text-red-400 font-black flex items-center text-xs">
                    {input.bandName}
                  </div>
                )}
                <span className="text-[11px] font-mono text-amber-500 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-900/60">
                  مقال خاص • العدد الأول
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">صفحة (عربية)</span>
            </div>

            {/* Arabic Main Title & Subtitle */}
            <div className="space-y-2 pt-2">
              <h2 className="text-2xl sm:text-3xl font-black arabic-metal-title leading-tight">
                {content.titleAr}
              </h2>
              <p className="text-xs font-arabic text-amber-200/90 leading-relaxed font-semibold">
                {content.subtitleAr}
              </p>
            </div>
          </div>

          {/* Middle Body Content: Bio & Gig Review */}
          <div className="my-6 space-y-4 text-xs font-arabic text-slate-300 leading-relaxed">
            
            {/* Arabic Pull Quote */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/60 to-metal-950 border-r-4 border-red-600 my-2 shadow-inner">
              <p className="italic font-bold text-amber-300 text-xs sm:text-sm">
                {content.pullQuoteAr}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> نبذة الفرقة والتأثير الموسيقي
              </h4>
              <p>{content.bandBioAr}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" /> تحليل الألبوم وتفاصيل الحفلات
              </h4>
              <p>{content.albumAnalysisAr}</p>
              <p>{content.gigReviewAr}</p>
            </div>

            {/* Arabic Tracklist Highlights */}
            {content.tracks && content.tracks.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                  <Disc className="w-3.5 h-3.5" /> أبرز الأغاني في الألبوم
                </h4>
                <div className="space-y-1.5 bg-metal-950/80 p-3 rounded-xl border border-metal-800">
                  {content.tracks.slice(0, 3).map((track) => (
                    <div key={track.number} className="flex justify-between items-center text-[11px] border-b border-metal-800/60 pb-1 last:border-0">
                      <span className="font-bold text-slate-200">{track.number}. {track.titleArabic || track.title}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{track.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer Section */}
          <div className="pt-3 border-t border-metal-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>تقييم الألبوم: </span>
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < input.rating ? 'fill-amber-500' : 'text-slate-700'}`} />
              ))}
            </div>
            <span>EGYPTSLAYER MAGAZINE • ARABIC SECTION</span>
          </div>

        </div>

        {/* RIGHT PAGE: ENGLISH (LTR) */}
        <div dir="ltr" className="p-6 sm:p-8 bg-metal-950 relative flex flex-col justify-between">
          
          {/* Top Header Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-red-900/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-widest text-red-500 font-mono">
                  SPECIAL FEATURE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-300 font-mono">
                  ISSUE #01
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">PAGE (ENGLISH)</span>
            </div>

            {/* English Main Title & Subtitle */}
            <div className="space-y-2 pt-2">
              <h2 className="text-2xl sm:text-3xl font-black metal-red-title tracking-wide leading-tight">
                {content.titleEn}
              </h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {content.subtitleEn}
              </p>
            </div>
          </div>

          {/* Middle Body Section: Album Cover Frame & Article Text */}
          <div className="my-6 space-y-4 text-xs text-slate-300 leading-relaxed">
            
            {/* Album Cover & Band Metadata Box */}
            <div className="flex gap-4 items-center bg-metal-900 p-3.5 rounded-xl border border-red-900/40 shadow-lg">
              {input.albumArtUrl ? (
                <img
                  src={input.albumArtUrl}
                  alt={input.albumTitle}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-red-600 shadow-metal-glow"
                />
              ) : (
                <div className="w-24 h-24 bg-metal-950 rounded-lg border border-slate-700 flex items-center justify-center text-slate-600 text-xs">
                  NO COVER
                </div>
              )}
              
              <div className="space-y-1 text-[11px]">
                <div className="text-amber-400 font-bold text-xs uppercase">{input.bandName}</div>
                <div className="text-slate-300 font-semibold">{input.albumTitle}</div>
                <div className="text-slate-400">{input.genre} • {input.origin}</div>
                <div className="text-slate-500 font-mono">Formed: {input.formedYear}</div>
                <div className="flex items-center gap-1 pt-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-amber-400 font-bold">VERDICT: 9.8 / 10</span>
                </div>
              </div>
            </div>

            {/* English Article Paragraphs */}
            <div className="space-y-3">
              <p>{content.bandBioEn}</p>
              <p>{content.albumAnalysisEn}</p>
              <p>{content.gigReviewEn}</p>
            </div>

            {/* English Pull Quote */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-metal-900 to-red-950/60 border-l-4 border-amber-500 my-2">
              <p className="italic font-bold text-amber-200 text-xs sm:text-sm font-gothic">
                {content.pullQuoteEn}
              </p>
            </div>
          </div>

          {/* Bottom Footer Section */}
          <div className="pt-3 border-t border-metal-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>EGYPTSLAYER MAGAZINE • ENGLISH SECTION</span>
            <span className="text-slate-400">{input.bandName.toUpperCase()} ARTICLE</span>
          </div>

        </div>

      </div>
    </div>
  );
};

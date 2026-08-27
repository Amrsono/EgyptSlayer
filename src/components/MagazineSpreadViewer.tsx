import React, { useState } from 'react';
import { DualLanguageContent, ArticleInput, getMagazinePageConfigs } from '../types/magazine';
import { MagazineSpread } from './MagazineSpread';
import { ChevronLeft, ChevronRight, Layers, Layout, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MagazineSpreadViewerProps {
  content: DualLanguageContent | null;
  input: ArticleInput;
}

export const MagazineSpreadViewer: React.FC<MagazineSpreadViewerProps> = ({
  content,
  input
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const { t } = useLanguage();

  const pages = getMagazinePageConfigs(input);
  const totalPages = pages.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentPageConfig = pages[currentPage] || pages[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black metal-title">{t.spread.title}</h2>
        <p className="text-xs text-slate-400 font-mono">{t.spread.subtitle}</p>
      </div>

      {/* Toolbar & Page Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-metal-900/90 p-4 rounded-2xl border border-red-900/40 shadow-xl">
        
        {/* Current Page Title Indicator */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-950 text-red-400 border border-red-800">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-amber-200 uppercase tracking-wide">
              {input.bandName || 'EGYPTSLAYER'} — {input.albumTitle || 'MAGAZINE'}
            </h3>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span>{t.spread.pagePrefix || 'Page'} {currentPage + 1} {t.spread.pageOf || 'of'} {totalPages}</span>
              <span className="text-slate-600">•</span>
              <span className="text-red-400 font-semibold">{currentPageConfig.label}</span>
            </p>
          </div>
        </div>

        {/* Flipping & Navigation Controls (Enabled in Single Page Mode) */}
        {viewMode === 'single' && (
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-metal-850 hover:bg-metal-800 text-slate-200 border border-slate-700 disabled:opacity-30 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> {t.spread.prevPage || 'Previous'}
            </button>

            {/* Quick Page Jump Pills */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-metal-950 border border-slate-800 text-xs font-mono">
              {pages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentPage(idx)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    idx === currentPage
                      ? 'bg-red-600 text-white shadow-metal-glow scale-105'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                  title={p.label}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-red-800 text-white shadow-metal-glow hover:brightness-110 disabled:opacity-30 transition-all cursor-pointer"
            >
              {t.spread.nextPage || 'Next'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* View Mode Toggle Switch (Single vs All Pages Stacked) */}
        <div className="flex items-center gap-1 bg-metal-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('single')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'single'
                ? 'bg-red-900 text-white shadow-metal-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>{t.spread.viewSingle || 'Single Page'}</span>
          </button>

          <button
            onClick={() => setViewMode('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'all'
                ? 'bg-red-900 text-white shadow-metal-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.spread.viewAll || 'All Pages Stacked'}</span>
          </button>
        </div>

      </div>

      {/* Main Spread Display Area */}
      {viewMode === 'single' ? (
        <div id="magazine-spread-container" className="flex justify-center">
          <div className="w-full max-w-5xl shadow-2xl">
            <MagazineSpread
              content={content || {} as any}
              input={input}
              pageType={currentPageConfig.type}
              fillerImageUrl={currentPageConfig.fillerUrl}
              pageNumber={currentPageConfig.pageNumber}
            />
          </div>
        </div>
      ) : (
        <div id="magazine-spread-container" className="space-y-12 flex flex-col items-center">
          {pages.map((page) => (
            <div key={page.id} className="w-full max-w-5xl shadow-2xl">
              <MagazineSpread
                content={content || {} as any}
                input={input}
                pageType={page.type}
                fillerImageUrl={page.fillerUrl}
                pageNumber={page.pageNumber}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

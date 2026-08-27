import React, { useState } from 'react';
import { DualLanguageContent, ArticleInput, getMagazinePageConfigs } from '../types/magazine';
import { MagazineSpread } from './MagazineSpread';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2, RotateCcw, BookOpen, Flame, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FlipbookViewerProps {
  content: DualLanguageContent;
  input: ArticleInput;
  onEditRequested: () => void;
}

export const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
  content,
  input,
  onEditRequested
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const { t } = useLanguage();

  // Play realistic page turn sound simulation using Web Audio API
  const playPageTurnSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // AudioContext fallback
    }
  };

  // Construct total array of page spreads using unified helper
  const pageSpreads = getMagazinePageConfigs(input);


  const totalPages = pageSpreads.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      playPageTurnSound();
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 350);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      playPageTurnSound();
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 350);
    }
  };

  const currentSpread = pageSpreads[currentPage];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Toolbar & Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-metal-900/90 p-4 rounded-2xl border border-red-900/40 shadow-xl">
        
        {/* Book Title & Page Indicator */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-950 text-red-400 border border-red-800">
            <BookOpen className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-black text-amber-200 uppercase tracking-wide">
              {input.bandName} • {input.albumTitle}
            </h3>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span>{t.flipbook.spreadPrefix} {currentPage + 1} {t.flipbook.spreadOf} {totalPages}</span>
              <span className="text-slate-600">•</span>
              <span className="text-red-400 font-semibold">{currentSpread.label}</span>
            </p>
          </div>
        </div>

        {/* Page Flip Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0 || isFlipping}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-metal-850 hover:bg-metal-800 text-slate-200 border border-slate-700 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> {t.flipbook.prevPage}
          </button>

          {/* Quick Page Jump Pill */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-metal-950 border border-slate-800 text-xs font-mono text-amber-400">
            {pageSpreads.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx !== currentPage) {
                    setIsFlipping(true);
                    playPageTurnSound();
                    setTimeout(() => {
                      setCurrentPage(idx);
                      setIsFlipping(false);
                    }, 300);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentPage ? 'bg-red-600 scale-125 shadow-metal-glow' : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={`${t.flipbook.jumpToPage} ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-red-800 text-white shadow-metal-glow hover:brightness-110 disabled:opacity-30 transition-all"
          >
            {t.flipbook.nextPage} <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sound & Edit Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-metal-850 hover:bg-metal-800 text-slate-300 border border-slate-700 transition-all"
            title={soundEnabled ? t.flipbook.muteSound : t.flipbook.enableSound}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={onEditRequested}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-metal-850 hover:bg-metal-800 text-slate-300 border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> {t.flipbook.editInput}
          </button>
        </div>

      </div>

      {/* 3D ANIMATED FLIPBOOK CONTAINER */}
      <div className="relative perspective-1000 py-4 flex justify-center">
        
        {/* Book Container with 3D Flip Effects */}
        <div
          id="magazine-spread-container"
          className={`w-full max-w-5xl transition-all duration-500 ease-out transform ${
            isFlipping
              ? flipDirection === 'next'
                ? '-rotate-y-6 scale-98 blur-[0.5px]'
                : 'rotate-y-6 scale-98 blur-[0.5px]'
              : 'rotate-y-0 scale-100'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 30px rgba(220, 38, 38, 0.2)'
          }}
        >
          <MagazineSpread
            content={content}
            input={input}
            pageType={currentSpread.type}
            fillerImageUrl={currentSpread.fillerUrl}
            pageNumber={currentPage + 1}
          />
        </div>

        {/* Page Curl Indicator overlay */}
        <div className="absolute right-6 top-8 pointer-events-none opacity-40 hover:opacity-100 transition-opacity hidden md:block">
          <div className="w-12 h-12 bg-gradient-to-bl from-amber-500/20 to-transparent border-t-2 border-r-2 border-amber-400/50 rounded-tr-lg" />
        </div>

      </div>

      {/* Bottom Information Bar */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono px-2">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-red-500" />
          <span>{t.flipbook.bottomNote}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{t.flipbook.turnPageNote}</span>
        </div>
      </div>

    </div>
  );
};


import React, { useState } from 'react';
import { Flame, Sparkles, BookOpen, Download, Settings, RefreshCw, Globe, CheckCircle } from 'lucide-react';
import { AIConfig } from '../types/magazine';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeTab: 'editor' | 'flipbook' | 'spread';
  setActiveTab: (tab: 'editor' | 'flipbook' | 'spread') => void;
  onExportPDF: () => void;
  isExporting: boolean;
  aiConfig: AIConfig;
  setAiConfig: (config: AIConfig) => void;
  onLoadSample: () => void;
  onOpenCeoDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onExportPDF,
  isExporting,
  aiConfig,
  setAiConfig,
  onLoadSample,
  onOpenCeoDrawer
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isSavedToastVisible, setIsSavedToastVisible] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleSaveSettings = () => {
    localStorage.setItem('egyptslayer_ai_config', JSON.stringify(aiConfig));
    setIsSavedToastVisible(true);
    setTimeout(() => {
      setIsSavedToastVisible(false);
      setShowSettings(false);
    }, 1800);
  };

  return (
    <nav className="sticky top-0 z-50 bg-metal-950/95 backdrop-blur-md border-b border-red-900/40 px-4 lg:px-8 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-black border border-red-500 shadow-metal-glow">
            <Flame className="w-6 h-6 text-red-100 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wider flex items-center gap-2">
              <span className="metal-red-title">EGYPTSLAYER</span>
              <span className="text-xs px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-mono tracking-normal [webkit-text-fill-color:initial]">
                {t.navbar.magazineBadge}
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              {t.navbar.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-metal-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'editor'
                ? 'bg-gradient-to-r from-red-900 to-red-700 text-white shadow-metal-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-metal-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {t.navbar.editorTab}
          </button>
          
          <button
            onClick={() => setActiveTab('flipbook')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'flipbook'
                ? 'bg-gradient-to-r from-red-900 to-red-700 text-white shadow-metal-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-metal-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t.navbar.flipbookTab}
          </button>

          <button
            onClick={() => setActiveTab('spread')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'spread'
                ? 'bg-gradient-to-r from-red-900 to-red-700 text-white shadow-metal-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-metal-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            {t.navbar.spreadTab}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Metal Hammer CEO AI Side Applet Toggle Button */}
          <button
            onClick={onOpenCeoDrawer}
            title="Metal Hammer CEO AI Design Advisor"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black bg-gradient-to-r from-amber-600 via-red-600 to-red-800 text-white shadow-metal-glow hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-amber-500/50"
          >
            <Flame className="w-4 h-4 text-amber-200 animate-pulse" />
            <span>{t.navbar.ceoAdvisorBtn}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            title={language === 'en' ? 'تغيير اللغة إلى العربية' : 'Switch Language to English'}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-metal-900 hover:bg-metal-800 text-amber-400 border border-amber-900/60 transition-all cursor-pointer shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button
            onClick={onLoadSample}
            title="Load Metal Band Sample Data"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-metal-850 hover:bg-metal-800 text-slate-300 border border-slate-700 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            {t.navbar.demoData}
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-metal-900 text-slate-300 hover:text-white border border-slate-800 transition-all"
            title={t.navbar.settingsTooltip}
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={onExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black bg-gradient-to-r from-red-600 to-red-800 text-white shadow-metal-glow hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? t.navbar.exportingPdf : t.navbar.exportPdf}
          </button>
        </div>
      </div>

      {/* AI Settings Modal */}
      {showSettings && (
        <div className="max-w-md mx-auto mt-3 p-4 rounded-xl bg-metal-900 border border-red-900/60 shadow-2xl text-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-metal-800">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> {t.settings.title}
            </h3>
            <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">{t.settings.providerLabel}</label>
            <select
              value={aiConfig.provider}
              onChange={(e) => setAiConfig({ ...aiConfig, provider: e.target.value as any })}
              className="w-full bg-metal-950 border border-slate-700 rounded-lg p-2 text-slate-200"
            >
              <option value="builtin">{t.settings.providerBuiltin}</option>
              <option value="gemini">{t.settings.providerGemini}</option>
              <option value="ollama">{t.settings.providerOllama}</option>
            </select>
          </div>

          {aiConfig.provider === 'gemini' && (
            <div>
              <label className="block text-slate-400 mb-1">{t.settings.apiKeyLabel}</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={aiConfig.apiKey || ''}
                onChange={(e) => setAiConfig({ ...aiConfig, apiKey: e.target.value })}
                className="w-full bg-metal-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
          )}

          {aiConfig.provider === 'ollama' && (
            <div>
              <label className="block text-slate-400 mb-1">{t.settings.endpointLabel}</label>
              <input
                type="text"
                placeholder="http://localhost:11434"
                value={aiConfig.endpoint || 'http://localhost:11434'}
                onChange={(e) => setAiConfig({ ...aiConfig, endpoint: e.target.value })}
                className="w-full bg-metal-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
          )}

          {/* Explicit Save Settings Button & Feedback Toast */}
          <div className="pt-2 flex justify-between items-center border-t border-metal-800">
            <div>
              {isSavedToastVisible && (
                <span className="text-xs text-emerald-400 font-bold animate-pulse flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> {t.settings.savedToast}
                </span>
              )}
            </div>
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 via-red-700 to-amber-600 hover:brightness-110 text-white font-bold text-xs shadow-metal-glow transition-all active:scale-95"
            >
              {t.settings.saveButton}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};



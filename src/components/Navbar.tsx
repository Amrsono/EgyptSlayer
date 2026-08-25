import React from 'react';
import { Flame, Sparkles, BookOpen, Download, Settings, RefreshCw } from 'lucide-react';
import { AIConfig } from '../types/magazine';

interface NavbarProps {
  activeTab: 'editor' | 'flipbook' | 'spread';
  setActiveTab: (tab: 'editor' | 'flipbook' | 'spread') => void;
  onExportPDF: () => void;
  isExporting: boolean;
  aiConfig: AIConfig;
  setAiConfig: (config: AIConfig) => void;
  onLoadSample: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onExportPDF,
  isExporting,
  aiConfig,
  setAiConfig,
  onLoadSample
}) => {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-metal-950/95 backdrop-blur-md border-b border-red-900/40 px-4 lg:px-8 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-black border border-red-500 shadow-metal-glow">
            <Flame className="w-6 h-6 text-red-100 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wider metal-red-title flex items-center gap-2">
              EGYPTSLAYER <span className="text-xs px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-mono tracking-normal">MAGAZINE</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              Dual-Language Metal Publication Engine
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
            Article & Assets Editor
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
            3D Animated Flipbook
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
            Dual Spread View
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onLoadSample}
            title="Load Metal Band Sample Data"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-metal-850 hover:bg-metal-800 text-amber-400 border border-amber-900/50 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Demo Data
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-metal-900 text-slate-300 hover:text-white border border-slate-800 transition-all"
            title="AI Engine Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={onExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black bg-gradient-to-r from-red-600 to-red-800 text-white shadow-metal-glow hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting PDF...' : 'Export Animated PDF'}
          </button>
        </div>
      </div>

      {/* AI Settings Modal */}
      {showSettings && (
        <div className="max-w-md mx-auto mt-3 p-4 rounded-xl bg-metal-900 border border-red-900/60 shadow-2xl text-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-metal-800">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Embedded AI Generator Settings
            </h3>
            <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">AI Provider</label>
            <select
              value={aiConfig.provider}
              onChange={(e) => setAiConfig({ ...aiConfig, provider: e.target.value as any })}
              className="w-full bg-metal-950 border border-slate-700 rounded-lg p-2 text-slate-200"
            >
              <option value="builtin">Built-in Metal Journalism AI (Offline / Fast)</option>
              <option value="gemini">Google Gemini API</option>
              <option value="ollama">Local Ollama LLM</option>
            </select>
          </div>

          {aiConfig.provider === 'gemini' && (
            <div>
              <label className="block text-slate-400 mb-1">Gemini API Key</label>
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
              <label className="block text-slate-400 mb-1">Ollama Endpoint URL</label>
              <input
                type="text"
                placeholder="http://localhost:11434"
                value={aiConfig.endpoint || 'http://localhost:11434'}
                onChange={(e) => setAiConfig({ ...aiConfig, endpoint: e.target.value })}
                className="w-full bg-metal-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

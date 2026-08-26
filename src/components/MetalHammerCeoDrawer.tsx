import React, { useState, useEffect, useRef } from 'react';
import { Flame, X, Send, Sparkles, RefreshCw, Trash2, Award, Zap, BookOpen, Key, AlertTriangle } from 'lucide-react';
import { ArticleInput, DualLanguageContent, AIConfig } from '../types/magazine';
import { useLanguage } from '../context/LanguageContext';
import { getMetalHammerCeoAdvice } from '../services/ceoAdvisorService';

interface MetalHammerCeoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  input: ArticleInput;
  generatedContent: DualLanguageContent | null;
  activeTab: string;
  config: AIConfig;
  onOpenSettings: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ceo' | 'user';
  text: string;
  timestamp: Date;
}

export const MetalHammerCeoDrawer: React.FC<MetalHammerCeoDrawerProps> = ({
  isOpen,
  onClose,
  input,
  generatedContent,
  activeTab,
  config,
  onOpenSettings
}) => {
  const { t, language, dir, isRtl } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize drawer welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ceo',
          text: t.ceoAdvisor.welcomeMsg,
          timestamp: new Date()
        }
      ]);
    }
  }, [t]);

  // Scroll to bottom of chat when new message arrives
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const handleSendMessage = async (queryToUse?: string) => {
    const query = queryToUse || inputQuery;
    if (!query.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryToUse) setInputQuery('');
    setIsThinking(true);

    try {
      const responseText = await getMetalHammerCeoAdvice({
        input,
        generatedContent,
        activeTab,
        userQuery: query,
        config,
        language
      });

      const ceoMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ceo',
        text: responseText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, ceoMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ceo',
        text: language === 'ar' 
          ? '❌ حدث خطأ أثناء الاتصال بمحرك الذكاء الاصطناعي. يرجى التأكد من حفظ مفتاح API في الإعدادات.' 
          : '❌ Error connecting to AI engine. Please verify your API Key in Settings.',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ceo',
        text: t.ceoAdvisor.welcomeMsg,
        timestamp: new Date()
      }
    ]);
  };

  const hasApiKey = Boolean(config.apiKey);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in">
      
      {/* Side Drawer Container */}
      <div 
        dir={dir}
        className={`w-full max-w-xl bg-metal-950 border-l border-red-900/60 shadow-2xl flex flex-col justify-between h-full transform transition-transform duration-300 ${
          isRtl ? 'border-r border-l-0' : 'border-l'
        }`}
      >
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-metal-900 via-metal-950 to-metal-900 border-b border-red-900/50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-red-800 to-amber-700 p-0.5 shadow-metal-glow flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-200 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-amber-200 uppercase tracking-wide flex items-center gap-2">
                {t.ceoAdvisor.drawerTitle}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {t.ceoAdvisor.drawerSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              title={t.ceoAdvisor.clearChat}
              className="p-2 rounded-lg bg-metal-900 hover:bg-metal-850 text-slate-400 hover:text-slate-200 border border-slate-800 transition-all text-xs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-metal-900 hover:bg-red-950 text-slate-400 hover:text-white border border-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Project Snapshot Badge */}
        <div className="p-3 bg-metal-900/80 border-b border-metal-850 text-xs space-y-2 shrink-0">
          <div className="flex justify-between items-center">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-red-500" /> {t.ceoAdvisor.projectSnapshotTitle}
            </span>
            {hasApiKey ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Gemini API Saved
              </span>
            ) : (
              <button
                onClick={onOpenSettings}
                className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 border border-amber-800 text-amber-300 hover:bg-amber-900 font-mono flex items-center gap-1 transition-all"
              >
                <AlertTriangle className="w-3 h-3 text-amber-400" /> Save API Key in Settings ⚙️
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-slate-300">
            <div className="p-1.5 bg-metal-950 rounded border border-metal-800 truncate">
              <span className="text-slate-500">Band:</span> {input.bandName || 'EgyptSlayer'}
            </div>
            <div className="p-1.5 bg-metal-950 rounded border border-metal-800 truncate">
              <span className="text-slate-500">{t.ceoAdvisor.layoutLabel}</span> {input.layoutStyle || 'wide-header'}
            </div>
            <div className="p-1.5 bg-metal-950 rounded border border-metal-800 truncate">
              <span className="text-slate-500">{t.ceoAdvisor.artworksLabel}</span> {input.fillerArtUrls.length}
            </div>
          </div>
        </div>

        {/* Quick Critiques Toolbar */}
        <div className="p-3 bg-metal-950 border-b border-metal-900 space-y-1.5 shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> {t.ceoAdvisor.quickCritiquesTitle}
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSendMessage(t.ceoAdvisor.quickActions.critiqueLayout)}
              disabled={isThinking}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-metal-900 hover:bg-red-950 text-amber-300 border border-amber-900/60 hover:border-red-600 transition-all disabled:opacity-50"
            >
              {t.ceoAdvisor.quickActions.critiqueLayout}
            </button>
            <button
              onClick={() => handleSendMessage(t.ceoAdvisor.quickActions.coverHeadline)}
              disabled={isThinking}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-metal-900 hover:bg-red-950 text-slate-200 border border-slate-700 hover:border-red-600 transition-all disabled:opacity-50"
            >
              {t.ceoAdvisor.quickActions.coverHeadline}
            </button>
            <button
              onClick={() => handleSendMessage(t.ceoAdvisor.quickActions.readingFlow)}
              disabled={isThinking}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-metal-900 hover:bg-red-950 text-slate-200 border border-slate-700 hover:border-red-600 transition-all disabled:opacity-50"
            >
              {t.ceoAdvisor.quickActions.readingFlow}
            </button>
            <button
              onClick={() => handleSendMessage(t.ceoAdvisor.quickActions.goldenSecrets)}
              disabled={isThinking}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-metal-900 hover:bg-red-950 text-amber-400 border border-amber-900/60 hover:border-red-600 transition-all disabled:opacity-50"
            >
              {t.ceoAdvisor.quickActions.goldenSecrets}
            </button>
          </div>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] p-3.5 rounded-2xl space-y-2 shadow-lg leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-red-900 to-red-700 text-white rounded-br-none font-semibold'
                    : 'bg-metal-900 border border-red-900/50 text-slate-200 rounded-bl-none font-serif text-[13px]'
                }`}
              >
                {msg.sender === 'ceo' && (
                  <div className="flex items-center gap-1.5 pb-1 border-b border-metal-800 text-[10px] font-bold text-amber-400 font-sans uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 text-red-500" /> Metal Hammer Chief Editor
                  </div>
                )}
                
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>

                <div className="text-[9px] opacity-60 text-right font-mono">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-metal-900 border border-red-900/50 text-amber-400 p-3 rounded-2xl rounded-bl-none flex items-center gap-2 text-xs">
                <Sparkles className="w-4 h-4 text-red-500 animate-spin" />
                <span>{t.ceoAdvisor.thinking}</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Message Input Bar */}
        <div className="p-3 bg-metal-900 border-t border-red-900/50 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={t.ceoAdvisor.inputPlaceholder}
              className="flex-1 bg-metal-950 border border-metal-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-red-600 outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" /> {t.ceoAdvisor.sendBtn}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

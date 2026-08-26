import React, { useState, useEffect } from 'react';
import { ArticleInput, DualLanguageContent, AIConfig } from '../types/magazine';
import { generateMagazineContent } from '../services/aiGenerator';
import { exportMagazineToPDF } from '../services/pdfExporter';
import { SAMPLE_METAL_ARTICLE } from '../components/SampleData';
import { Navbar } from '../components/Navbar';
import { MagazineEditor } from '../components/MagazineEditor';
import { FlipbookViewer } from '../components/FlipbookViewer';
import { MagazineSpread } from '../components/MagazineSpread';
import { MetalHammerCeoDrawer } from '../components/MetalHammerCeoDrawer';
import { Sparkles, Download, Flame, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'flipbook' | 'spread'>('editor');
  const [articleInput, setArticleInput] = useState<ArticleInput>(SAMPLE_METAL_ARTICLE);
  const [aiConfig, setAiConfigState] = useState<AIConfig>(() => {
    const saved = localStorage.getItem('egyptslayer_ai_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return { provider: 'builtin' };
  });
  const [generatedContent, setGeneratedContent] = useState<DualLanguageContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<{ percent: number; status: string } | null>(null);
  const [isCeoDrawerOpen, setIsCeoDrawerOpen] = useState(false);
  const { t } = useLanguage();

  const setAiConfig = (config: AIConfig) => {
    setAiConfigState(config);
    localStorage.setItem('egyptslayer_ai_config', JSON.stringify(config));
  };

  // Automatically generate initial sample magazine on first load
  useEffect(() => {
    handleGenerateContent(SAMPLE_METAL_ARTICLE);
  }, []);

  const handleGenerateContent = async (inputToUse?: ArticleInput): Promise<DualLanguageContent | null> => {
    const input = inputToUse || articleInput;
    setIsGenerating(true);
    try {
      const content = await generateMagazineContent(input, aiConfig);
      setGeneratedContent(content);
      if (!inputToUse) {
        setActiveTab('flipbook');
      }
      return content;
    } catch (err) {
      console.error('Failed to generate magazine content:', err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    setExportProgress({ percent: 5, status: t.toast.preparing });
    
    try {
      // Ensure content is generated
      let content = generatedContent;
      if (!content) {
        setExportProgress({ percent: 15, status: t.toast.generating });
        content = await handleGenerateContent(articleInput);
      }

      if (!content) {
        throw new Error('Could not generate magazine content for export.');
      }

      // Allow DOM to settle for offscreen render container
      await new Promise((resolve) => setTimeout(resolve, 300));

      await exportMagazineToPDF(
        'magazine-export-hidden-container',
        `${articleInput.bandName || 'EgyptSlayer'}_Metal_Magazine.pdf`,
        (percent, status) => setExportProgress({ percent, status })
      );
    } catch (err: any) {
      console.error('PDF export failed:', err);
      alert(`PDF Export Note: ${err.message || 'Error capturing canvas'}. Retrying with active view...`);
      // Fallback export targeting active view container
      try {
        await exportMagazineToPDF(
          'magazine-spread-container',
          `${articleInput.bandName}_Metal_Magazine.pdf`,
          (percent, status) => setExportProgress({ percent, status })
        );
      } catch (fallbackErr) {
        console.error('Fallback PDF export failed:', fallbackErr);
      }
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportProgress(null), 3000);
    }
  };

  const loadSampleData = () => {
    setArticleInput(SAMPLE_METAL_ARTICLE);
    handleGenerateContent(SAMPLE_METAL_ARTICLE);
  };

  return (
    <div className="min-h-screen bg-metal-950 text-slate-100 flex flex-col justify-between selection:bg-red-900 selection:text-white">
      
      {/* Main Top Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportPDF={handleExportPDF}
        isExporting={isExporting}
        aiConfig={aiConfig}
        setAiConfig={setAiConfig}
        onLoadSample={loadSampleData}
        onOpenCeoDrawer={() => setIsCeoDrawerOpen(true)}
      />

      {/* Metal Hammer CEO Side Applet Drawer */}
      <MetalHammerCeoDrawer
        isOpen={isCeoDrawerOpen}
        onClose={() => setIsCeoDrawerOpen(false)}
        input={articleInput}
        generatedContent={generatedContent}
        activeTab={activeTab}
        config={aiConfig}
        onOpenSettings={() => {
          setIsCeoDrawerOpen(false);
        }}
      />

      {/* Export Progress Notification Toast */}
      {exportProgress && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-metal-900 border border-red-800 p-4 rounded-xl shadow-2xl space-y-2 animate-bounce">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-red-500 animate-spin" /> {exportProgress.status}
            </span>
            <span>{exportProgress.percent}%</span>
          </div>
          <div className="w-full bg-metal-950 h-2 rounded-full overflow-hidden border border-metal-800">
            <div
              className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-300"
              style={{ width: `${exportProgress.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Workspace Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'editor' && (
          <MagazineEditor
            input={articleInput}
            setInput={setArticleInput}
            onGenerate={() => handleGenerateContent()}
            isGenerating={isGenerating}
          />
        )}

        {activeTab === 'flipbook' && generatedContent && (
          <FlipbookViewer
            content={generatedContent}
            input={articleInput}
            onEditRequested={() => setActiveTab('editor')}
          />
        )}

        {activeTab === 'spread' && generatedContent && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black metal-title">{t.spread.title}</h2>
              <p className="text-xs text-slate-400 font-mono">{t.spread.subtitle}</p>
            </div>
            
            <div id="magazine-spread-container">
              <MagazineSpread
                content={generatedContent}
                input={articleInput}
                pageType="article-1"
              />
            </div>
          </div>
        )}

        {/* OFFSCREEN FULL MAGAZINE RENDER CONTAINER FOR HIGH-RES PORTRAIT PDF EXPORT FROM ANY TAB */}
        {generatedContent && (
          <div
            id="magazine-export-hidden-container"
            className="fixed -left-[9999px] top-0 w-[800px] pointer-events-none opacity-100 z-[-100] space-y-12 bg-white"
          >
            <MagazineSpread
              content={generatedContent}
              input={articleInput}
              pageType="article-1"
              pageNumber={1}
            />
            {articleInput.fillerArtUrls.map((url, idx) => (
              <MagazineSpread
                key={idx}
                content={generatedContent}
                input={articleInput}
                pageType="filler"
                fillerImageUrl={url}
                pageNumber={idx + 2}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-metal-950 border-t border-metal-900 py-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-600" />
            <span className="font-bold text-slate-400">{t.footer.title}</span>
          </div>
          <div>
            {t.footer.text}
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;



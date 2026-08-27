import React, { useState } from 'react';
import { ArticleInput, DualLanguageContent, PageLayoutType } from '../types/magazine';
import { Upload, Sparkles, Image as ImageIcon, Music, Trash2, Plus, Flame, FileText, Globe, LayoutGrid, Edit3, Languages, Sliders, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MagazineEditorProps {
  input: ArticleInput;
  setInput: (input: ArticleInput) => void;
  generatedContent: DualLanguageContent | null;
  setGeneratedContent: React.Dispatch<React.SetStateAction<DualLanguageContent | null>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

const LAYOUT_OPTIONS: { id: PageLayoutType; titleAr: string; titleEn: string; descriptionAr: string; descriptionEn: string }[] = [
  {
    id: 'wide-header',
    titleAr: 'صورة عريضة وتحتها عامودين',
    titleEn: 'Wide Top Banner + 2 Columns',
    descriptionAr: 'صورة بعرض المقال في الأعلى يتبعها أعمدة النص العربي والإنجليزي',
    descriptionEn: 'Full article width header picture followed by dual reading columns'
  },
  {
    id: 'image-above-title',
    titleAr: 'صورة بعرض الصفحة ثم العنوان والأعمدة',
    titleEn: 'Full Width Image Top -> Title -> Columns',
    descriptionAr: 'صورة في أعلى المنتصف يليها العنوان الرئيسي ثم أعمدة النصوص',
    descriptionEn: 'Top centered image followed by primary headline and columns'
  },
  {
    id: 'tall-right',
    titleAr: 'صورة طولية يمين مع أعمدة',
    titleEn: 'Tall Portrait Image Right',
    descriptionAr: 'صورة رأسية في الجهة اليمنى تحيط بها أعمدة القراءة',
    descriptionEn: 'Vertical right-side portrait framed by reading text'
  },
  {
    id: 'tall-left',
    titleAr: 'صورة طولية شمال مع أعمدة',
    titleEn: 'Tall Portrait Image Left',
    descriptionAr: 'صورة رأسية في الجهة اليسرى تحيط بها أعمدة القراءة',
    descriptionEn: 'Vertical left-side portrait framed by reading text'
  },
  {
    id: 'columns-only',
    titleAr: 'عواميد كتابة فقط',
    titleEn: 'Columns Text Only',
    descriptionAr: 'تنسيق مجلة كلاسيكي بدون صور داخلية (نصوص قراءة فقط)',
    descriptionEn: 'Classic editorial text columns without embedded photos'
  },
  {
    id: 'full-image',
    titleAr: 'صورة طولية بملىء الصفحة فقط',
    titleEn: 'Full Page Portrait Artwork',
    descriptionAr: 'صفحة صورة كاملة بدون نصوص جانبية',
    descriptionEn: 'Full-bleed photo showcase spread page without text'
  }
];

export const MagazineEditor: React.FC<MagazineEditorProps> = ({
  input,
  setInput,
  generatedContent,
  setGeneratedContent,
  onGenerate,
  isGenerating
}) => {
  const [newFillerUrl, setNewFillerUrl] = useState('');
  const [isManualEditActive, setIsManualEditActive] = useState(true);
  const { t, language } = useLanguage();

  const handleInputChange = (field: keyof ArticleInput, value: any) => {
    setInput({ ...input, [field]: value });
  };

  const handleTranslationChange = (field: keyof DualLanguageContent, value: any) => {
    if (!generatedContent) return;
    setGeneratedContent({
      ...generatedContent,
      [field]: value
    });
  };

  const handleFileUpload = (field: 'logoUrl' | 'albumArtUrl', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleInputChange(field, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFillerUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setInput({
          ...input,
          fillerArtUrls: [...input.fillerArtUrls, e.target.result as string]
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const addFillerUrl = () => {
    if (newFillerUrl.trim()) {
      setInput({
        ...input,
        fillerArtUrls: [...input.fillerArtUrls, newFillerUrl.trim()]
      });
      setNewFillerUrl('');
    }
  };

  const removeFillerUrl = (index: number) => {
    const updated = input.fillerArtUrls.filter((_, i) => i !== index);
    setInput({ ...input, fillerArtUrls: updated });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-400 text-xs font-mono">
          <Flame className="w-3.5 h-3.5" /> {t.editor.stepBadge}
        </div>
        <h2 className="text-4xl font-black metal-title uppercase tracking-wide">
          {t.editor.mainTitle}
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          {t.editor.mainDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Arabic Article Input & Band Info */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Band Metadata Box */}
          <div className="metal-border p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Music className="w-4 h-4" /> {t.editor.bandMetadataHeader}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.bandNameLabel}</label>
                <input
                  type="text"
                  value={input.bandName}
                  onChange={(e) => handleInputChange('bandName', e.target.value)}
                  placeholder={t.editor.bandNamePlaceholder}
                  className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-red-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.albumTitleLabel}</label>
                <input
                  type="text"
                  value={input.albumTitle}
                  onChange={(e) => handleInputChange('albumTitle', e.target.value)}
                  placeholder={t.editor.albumTitlePlaceholder}
                  className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-red-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.genreLabel}</label>
                <input
                  type="text"
                  value={input.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  placeholder={t.editor.genrePlaceholder}
                  className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-red-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.originLabel}</label>
                <input
                  type="text"
                  value={input.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder={t.editor.originPlaceholder}
                  className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-red-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Arabic Article Box */}
          <div className="metal-border p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> {t.editor.arabicArticleHeader}
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">{t.editor.rtlBadge}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.headlineLabel}</label>
              <input
                type="text"
                dir="rtl"
                value={input.titleArabic}
                onChange={(e) => handleInputChange('titleArabic', e.target.value)}
                placeholder={t.editor.headlinePlaceholder}
                className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm font-arabic text-amber-200 focus:border-red-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.articleContentLabel}</label>
              <textarea
                rows={8}
                dir="rtl"
                value={input.textArabic}
                onChange={(e) => handleInputChange('textArabic', e.target.value)}
                placeholder={t.editor.articleContentPlaceholder}
                className="w-full bg-metal-950 border border-metal-800 rounded-lg p-3 text-sm font-arabic text-slate-200 leading-relaxed focus:border-red-600 outline-none resize-y"
              />
            </div>
          </div>

          {/* Page Layout Structure Selector */}
          <div className="metal-border p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-red-500" /> {t.editor.layoutOptionsHeader}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">{t.editor.layoutCountBadge}</span>
            </div>

            <p className="text-xs text-slate-300">
              {t.editor.layoutDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {LAYOUT_OPTIONS.map((opt) => {
                const isSelected = (input.layoutStyle || 'wide-header') === opt.id;
                const title = language === 'ar' ? opt.titleAr : opt.titleEn;
                const description = language === 'ar' ? opt.descriptionAr : opt.descriptionEn;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleInputChange('layoutStyle', opt.id)}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-2.5 ${
                      language === 'ar' ? 'text-right' : 'text-left'
                    } ${
                      isSelected
                        ? 'border-red-600 bg-red-950/70 shadow-metal-glow ring-2 ring-red-500/50'
                        : 'border-metal-800 bg-metal-950/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full gap-2">
                      <span className="text-xs font-bold font-sans text-amber-200 leading-snug">
                        {title}
                      </span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-red-500 bg-red-600' : 'border-slate-600'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Assets (Logo, Album Cover, Filler Artworks) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Logo & Album Artwork Uploads */}
          <div className="metal-border p-6 rounded-2xl space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-red-400" /> {t.editor.visualAssetsHeader}
            </h3>

            {/* Band Logo Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">{t.editor.bandLogoLabel}</label>
              <div className="flex items-center gap-4">
                {input.logoUrl ? (
                  <div className="relative w-20 h-20 bg-metal-950 rounded-lg border border-red-800 p-2 flex items-center justify-center">
                    <img src={input.logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
                    <button
                      onClick={() => handleInputChange('logoUrl', null)}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-600 text-white text-xs hover:bg-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex-1 flex flex-col items-center justify-center h-24 border-2 border-dashed border-metal-700 hover:border-red-600 rounded-lg cursor-pointer bg-metal-950/50 transition-all">
                    <Upload className="w-6 h-6 text-slate-500 mb-1" />
                    <span className="text-[11px] text-slate-400">{t.editor.uploadLogo}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('logoUrl', e.target.files[0])}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Album Cover Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">{t.editor.albumCoverLabel}</label>
              <div className="flex items-center gap-4">
                {input.albumArtUrl ? (
                  <div className="relative w-24 h-24 bg-metal-950 rounded-lg border border-red-800 p-1 flex items-center justify-center overflow-hidden">
                    <img src={input.albumArtUrl} alt="Album Art" className="max-w-full max-h-full object-contain rounded" />
                    <button
                      onClick={() => handleInputChange('albumArtUrl', null)}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-600 text-white text-xs hover:bg-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex-1 flex flex-col items-center justify-center h-24 border-2 border-dashed border-metal-700 hover:border-red-600 rounded-lg cursor-pointer bg-metal-950/50 transition-all">
                    <Upload className="w-6 h-6 text-slate-500 mb-1" />
                    <span className="text-[11px] text-slate-400">{t.editor.uploadAlbum}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('albumArtUrl', e.target.files[0])}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Page Separators / Band Artwork Fillers */}
          <div className="metal-border p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" /> {t.editor.pageSeparatorsHeader}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">{input.fillerArtUrls.length} {t.editor.artworksCount}</span>
            </div>

            <p className="text-xs text-slate-400">
              {t.editor.separatorsDescription}
            </p>

            {/* Existing Fillers Grid */}
            <div className="grid grid-cols-3 gap-3">
              {input.fillerArtUrls.map((url, idx) => (
                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-800 bg-metal-950 p-1 flex items-center justify-center">
                  <img src={url} alt={`Filler ${idx + 1}`} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                  <button
                    onClick={() => removeFillerUrl(idx)}
                    className="absolute top-1 right-1 p-1 bg-red-900/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-metal-700 hover:border-amber-500 rounded-lg cursor-pointer bg-metal-950/40 transition-all">
                <Plus className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-[10px] text-slate-400">{t.editor.addArt}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFillerUpload(e.target.files[0])}
                />
              </label>
            </div>

            {/* Optional URL Input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder={t.editor.pasteUrlPlaceholder}
                value={newFillerUrl}
                onChange={(e) => setNewFillerUrl(e.target.value)}
                className="flex-1 bg-metal-950 border border-metal-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none"
              />
              <button
                onClick={addFillerUrl}
                className="px-3 py-1.5 rounded-lg bg-metal-800 hover:bg-metal-700 text-xs font-semibold text-slate-200"
              >
                {t.editor.addUrlButton}
              </button>
            </div>
          </div>

          {/* Submit / Generate Button */}
          <button
            onClick={onGenerate}
            disabled={isGenerating || !input.textArabic}
            className="w-full py-4 rounded-xl font-black text-sm tracking-wider uppercase bg-gradient-to-r from-red-600 via-red-700 to-amber-600 text-white shadow-metal-glow hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: isGenerating ? '2s' : '0s' }} />
            {isGenerating ? t.editor.generatingButton : t.editor.generateButton}
          </button>

        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MANUAL TRANSLATION & CONTENT EDITOR (TAKEOVER MODE)  */}
      {/* ---------------------------------------------------- */}
      <div className="metal-border p-6 rounded-2xl space-y-6 mt-8">
        <div className="flex flex-wrap justify-between items-center gap-4 border-b border-metal-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800/80 text-amber-400">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-amber-200 uppercase tracking-wide flex items-center gap-2">
                {t.editor.manualTranslationHeader}
                <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 text-[10px] font-mono">
                  LIVE TAKEOVER
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {t.editor.manualTranslationSub}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsManualEditActive(!isManualEditActive)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isManualEditActive
                  ? 'bg-red-900 text-white shadow-metal-glow'
                  : 'bg-metal-800 text-slate-300 hover:bg-metal-700'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              {t.editor.toggleManualEdit}
            </button>
          </div>
        </div>

        {isManualEditActive && (
          <div>
            {!generatedContent ? (
              <div className="p-6 text-center space-y-3 bg-metal-950/80 rounded-xl border border-metal-800">
                <Sliders className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
                <p className="text-sm font-bold text-slate-300">
                  {language === 'ar'
                    ? 'انقر على "توليد المجلة" أو ابدأ التعديل اليدوي المباشر الآن لتعديل جميع الترجمات والنصوص بحرية'
                    : 'Click "Generate Metal Magazine" or initialize manual editing to edit all translations and content.'}
                </p>
                <button
                  type="button"
                  onClick={onGenerate}
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-metal-glow hover:brightness-110 cursor-pointer"
                >
                  {t.editor.generateButton}
                </button>
              </div>
            ) : (
              <div className="space-y-6 pt-2">
                
                {/* 1. Main Titles & Subtitles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-metal-950/60 p-4 rounded-xl border border-metal-800">
                  {/* English Headline */}
                  <div>
                    <label className="block text-xs font-semibold text-amber-400 mb-1">{t.editor.titleEnLabel}</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={generatedContent.titleEn || ''}
                      onChange={(e) => handleTranslationChange('titleEn', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-red-600 outline-none"
                    />
                  </div>
                  {/* Arabic Headline */}
                  <div>
                    <label className="block text-xs font-semibold text-amber-400 mb-1">{t.editor.titleArLabel}</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={generatedContent.titleAr || ''}
                      onChange={(e) => handleTranslationChange('titleAr', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm font-arabic text-slate-100 focus:border-red-600 outline-none"
                    />
                  </div>

                  {/* English Subtitle */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.subtitleEnLabel}</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={generatedContent.subtitleEn || ''}
                      onChange={(e) => handleTranslationChange('subtitleEn', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-200 focus:border-red-600 outline-none"
                    />
                  </div>
                  {/* Arabic Subtitle */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.subtitleArLabel}</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={generatedContent.subtitleAr || ''}
                      onChange={(e) => handleTranslationChange('subtitleAr', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm font-arabic text-slate-200 focus:border-red-600 outline-none"
                    />
                  </div>
                </div>

                {/* 2. Band History & Bio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-metal-950/60 p-4 rounded-xl border border-metal-800">
                  <div>
                    <label className="block text-xs font-semibold text-red-400 mb-1">{t.editor.bandBioEnLabel}</label>
                    <textarea
                      rows={4}
                      dir="ltr"
                      value={generatedContent.bandBioEn || ''}
                      onChange={(e) => handleTranslationChange('bandBioEn', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-200 leading-relaxed focus:border-red-600 outline-none resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-red-400 mb-1">{t.editor.bandBioArLabel}</label>
                    <textarea
                      rows={4}
                      dir="rtl"
                      value={generatedContent.bandBioAr || ''}
                      onChange={(e) => handleTranslationChange('bandBioAr', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm font-arabic text-slate-200 leading-relaxed focus:border-red-600 outline-none resize-y"
                    />
                  </div>
                </div>

                {/* 3. Album Analysis & Production */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-metal-950/60 p-4 rounded-xl border border-metal-800">
                  <div>
                    <label className="block text-xs font-semibold text-amber-400 mb-1">{t.editor.albumAnalysisEnLabel}</label>
                    <textarea
                      rows={4}
                      dir="ltr"
                      value={generatedContent.albumAnalysisEn || ''}
                      onChange={(e) => handleTranslationChange('albumAnalysisEn', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-200 leading-relaxed focus:border-red-600 outline-none resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-400 mb-1">{t.editor.albumAnalysisArLabel}</label>
                    <textarea
                      rows={4}
                      dir="rtl"
                      value={generatedContent.albumAnalysisAr || ''}
                      onChange={(e) => handleTranslationChange('albumAnalysisAr', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm font-arabic text-slate-200 leading-relaxed focus:border-red-600 outline-none resize-y"
                    />
                  </div>
                </div>

                {/* 4. Live Show Performance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-metal-950/60 p-4 rounded-xl border border-metal-800">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.gigReviewEnLabel}</label>
                    <textarea
                      rows={3}
                      dir="ltr"
                      value={generatedContent.gigReviewEn || ''}
                      onChange={(e) => handleTranslationChange('gigReviewEn', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-200 leading-relaxed focus:border-red-600 outline-none resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">{t.editor.gigReviewArLabel}</label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={generatedContent.gigReviewAr || ''}
                      onChange={(e) => handleTranslationChange('gigReviewAr', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm font-arabic text-slate-200 leading-relaxed focus:border-red-600 outline-none resize-y"
                    />
                  </div>
                </div>

                {/* 5. Pull Quote & Verdict */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-metal-950/60 p-4 rounded-xl border border-metal-800">
                  <div>
                    <label className="block text-xs font-semibold text-amber-400 mb-1">{t.editor.pullQuoteEnLabel}</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={generatedContent.pullQuoteEn || ''}
                      onChange={(e) => handleTranslationChange('pullQuoteEn', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-200 focus:border-red-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-400 mb-1">{t.editor.pullQuoteArLabel}</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={generatedContent.pullQuoteAr || ''}
                      onChange={(e) => handleTranslationChange('pullQuoteAr', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm font-arabic text-slate-200 focus:border-red-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-red-400 mb-1">{t.editor.verdictEnLabel}</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={generatedContent.verdictEn || ''}
                      onChange={(e) => handleTranslationChange('verdictEn', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-200 focus:border-red-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-red-400 mb-1">{t.editor.verdictArLabel}</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={generatedContent.verdictAr || ''}
                      onChange={(e) => handleTranslationChange('verdictAr', e.target.value)}
                      className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm font-arabic text-slate-200 focus:border-red-600 outline-none"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


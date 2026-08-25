import React, { useState } from 'react';
import { ArticleInput } from '../types/magazine';
import { Upload, Sparkles, Image as ImageIcon, Music, Trash2, Plus, Flame, FileText, Globe } from 'lucide-react';

interface MagazineEditorProps {
  input: ArticleInput;
  setInput: (input: ArticleInput) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const MagazineEditor: React.FC<MagazineEditorProps> = ({
  input,
  setInput,
  onGenerate,
  isGenerating
}) => {
  const [newFillerUrl, setNewFillerUrl] = useState('');

  const handleInputChange = (field: keyof ArticleInput, value: any) => {
    setInput({ ...input, [field]: value });
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
          <Flame className="w-3.5 h-3.5" /> STEP 1: CONTENT & VISUAL ASSETS INPUT
        </div>
        <h2 className="text-4xl font-black metal-title uppercase tracking-wide">
          Metal Magazine Creator
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          Provide your Arabic metal band article, band logo, album cover, and artwork fillers.
          Our embedded AI will translate, structure, and assemble an interactive dual-language magazine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Arabic Article Input & Band Info */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Band Metadata Box */}
          <div className="metal-border p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Music className="w-4 h-4" /> Band & Album Metadata
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Band Name (اسم الفرقة)</label>
                <input
                  type="text"
                  value={input.bandName}
                  onChange={(e) => handleInputChange('bandName', e.target.value)}
                  placeholder="e.g. EgyptSlayer"
                  className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-red-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Album Title (عنوان الألبوم)</label>
                <input
                  type="text"
                  value={input.albumTitle}
                  onChange={(e) => handleInputChange('albumTitle', e.target.value)}
                  placeholder="e.g. Dominion of Osiris"
                  className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-red-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Genre (النوع الموسيقي)</label>
                <input
                  type="text"
                  value={input.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  placeholder="e.g. Oriental Thrash Metal"
                  className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-red-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Origin / City (البلد / المدينة)</label>
                <input
                  type="text"
                  value={input.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="e.g. Cairo, Egypt"
                  className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-red-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Arabic Article Box */}
          <div className="metal-border p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Arabic Article Text (المقال باللغة العربية)
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">RTL Arabic Input</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Article Headline (عنوان المقال)</label>
              <input
                type="text"
                dir="rtl"
                value={input.titleArabic}
                onChange={(e) => handleInputChange('titleArabic', e.target.value)}
                placeholder="مثال: صعود ملحمة إيجيبت سلاير في عالم الميتال..."
                className="w-full bg-metal-950 border border-metal-800 rounded-lg p-2.5 text-sm font-arabic text-amber-200 focus:border-red-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Full Arabic Article Content (تفاصيل الفرقة والحفلات والنقد)</label>
              <textarea
                rows={8}
                dir="rtl"
                value={input.textArabic}
                onChange={(e) => handleInputChange('textArabic', e.target.value)}
                placeholder="اكتب هنا تفاصيل الفرقة، مراجعة الألبوم، تاريخ الحفلات، والملاحظات الخاصة بالمقال..."
                className="w-full bg-metal-950 border border-metal-800 rounded-lg p-3 text-sm font-arabic text-slate-200 leading-relaxed focus:border-red-600 outline-none resize-y"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Visual Assets (Logo, Album Cover, Filler Artworks) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Logo & Album Artwork Uploads */}
          <div className="metal-border p-6 rounded-2xl space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-red-400" /> Logo & Album Artworks
            </h3>

            {/* Band Logo Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">Band Logo (شعار الفرقة)</label>
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
                    <span className="text-[11px] text-slate-400">Upload Logo Image</span>
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
              <label className="block text-xs font-semibold text-slate-400">Album Cover Picture (صورة الألبوم)</label>
              <div className="flex items-center gap-4">
                {input.albumArtUrl ? (
                  <div className="relative w-24 h-24 bg-metal-950 rounded-lg border border-red-800 p-1 flex items-center justify-center overflow-hidden">
                    <img src={input.albumArtUrl} alt="Album Art" className="w-full h-full object-cover rounded" />
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
                    <span className="text-[11px] text-slate-400">Upload Album Artwork</span>
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
                <Globe className="w-4 h-4 text-amber-400" /> Page Separators (Band Art Fillers)
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">{input.fillerArtUrls.length} Artworks</span>
            </div>

            <p className="text-xs text-slate-400">
              Full-bleed band artwork pages will be inserted as visual page separators between magazine chapters.
            </p>

            {/* Existing Fillers Grid */}
            <div className="grid grid-cols-3 gap-3">
              {input.fillerArtUrls.map((url, idx) => (
                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-800 bg-metal-950">
                  <img src={url} alt={`Filler ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
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
                <span className="text-[10px] text-slate-400">Add Art</span>
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
                placeholder="Or paste artwork image URL..."
                value={newFillerUrl}
                onChange={(e) => setNewFillerUrl(e.target.value)}
                className="flex-1 bg-metal-950 border border-metal-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none"
              />
              <button
                onClick={addFillerUrl}
                className="px-3 py-1.5 rounded-lg bg-metal-800 hover:bg-metal-700 text-xs font-semibold text-slate-200"
              >
                Add URL
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
            {isGenerating ? 'AI Generating Metal Magazine...' : 'Generate 3D Animated Metal Magazine'}
          </button>

        </div>
      </div>
    </div>
  );
};

export type Language = 'en' | 'ar';

export interface Translations {
  navbar: {
    magazineBadge: string;
    brandSubtitle: string;
    editorTab: string;
    flipbookTab: string;
    spreadTab: string;
    demoData: string;
    settingsTooltip: string;
    exportPdf: string;
    exportingPdf: string;
  };
  settings: {
    title: string;
    providerLabel: string;
    providerBuiltin: string;
    providerGemini: string;
    providerOllama: string;
    apiKeyLabel: string;
    endpointLabel: string;
  };
  editor: {
    stepBadge: string;
    mainTitle: string;
    mainDescription: string;
    bandMetadataHeader: string;
    bandNameLabel: string;
    bandNamePlaceholder: string;
    albumTitleLabel: string;
    albumTitlePlaceholder: string;
    genreLabel: string;
    genrePlaceholder: string;
    originLabel: string;
    originPlaceholder: string;
    arabicArticleHeader: string;
    rtlBadge: string;
    headlineLabel: string;
    headlinePlaceholder: string;
    articleContentLabel: string;
    articleContentPlaceholder: string;
    layoutOptionsHeader: string;
    layoutCountBadge: string;
    layoutDescription: string;
    visualAssetsHeader: string;
    bandLogoLabel: string;
    uploadLogo: string;
    albumCoverLabel: string;
    uploadAlbum: string;
    pageSeparatorsHeader: string;
    artworksCount: string;
    separatorsDescription: string;
    addArt: string;
    pasteUrlPlaceholder: string;
    addUrlButton: string;
    generateButton: string;
    generatingButton: string;
  };
  flipbook: {
    spreadPrefix: string;
    spreadOf: string;
    prevPage: string;
    nextPage: string;
    jumpToPage: string;
    muteSound: string;
    enableSound: string;
    editInput: string;
    bottomNote: string;
    turnPageNote: string;
  };
  spread: {
    title: string;
    subtitle: string;
  };
  toast: {
    preparing: string;
    generating: string;
  };
  footer: {
    title: string;
    text: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      magazineBadge: 'MAGAZINE',
      brandSubtitle: 'Dual-Language Metal Publication Engine',
      editorTab: 'Article & Assets Editor',
      flipbookTab: '3D Animated Flipbook',
      spreadTab: 'Dual Spread View',
      demoData: 'Demo Data',
      settingsTooltip: 'AI Engine Settings',
      exportPdf: 'Export Animated PDF',
      exportingPdf: 'Exporting PDF...',
    },
    settings: {
      title: 'Embedded AI Generator Settings',
      providerLabel: 'AI Provider',
      providerBuiltin: 'Built-in Metal Journalism AI (Offline / Fast)',
      providerGemini: 'Google Gemini API',
      providerOllama: 'Local Ollama LLM',
      apiKeyLabel: 'Gemini API Key',
      endpointLabel: 'Ollama Endpoint URL',
    },
    editor: {
      stepBadge: 'STEP 1: CONTENT & VISUAL ASSETS INPUT',
      mainTitle: 'Metal Magazine Creator',
      mainDescription:
        'Provide your Arabic metal band article, band logo, album cover, and artwork fillers. Our embedded AI will translate, structure, and assemble an interactive dual-language magazine.',
      bandMetadataHeader: 'Band & Album Metadata',
      bandNameLabel: 'Band Name',
      bandNamePlaceholder: 'e.g. EgyptSlayer',
      albumTitleLabel: 'Album Title',
      albumTitlePlaceholder: 'e.g. Dominion of Osiris',
      genreLabel: 'Genre',
      genrePlaceholder: 'e.g. Oriental Thrash Metal',
      originLabel: 'Origin / City',
      originPlaceholder: 'e.g. Cairo, Egypt',
      arabicArticleHeader: 'Arabic Article Text',
      rtlBadge: 'RTL Arabic Input',
      headlineLabel: 'Article Headline',
      headlinePlaceholder: 'e.g. Rise of EgyptSlayer...',
      articleContentLabel: 'Full Arabic Article Content',
      articleContentPlaceholder:
        'Write band details, album review, concert history, and notes here...',
      layoutOptionsHeader: 'Page Layout Options',
      layoutCountBadge: '6 Presets',
      layoutDescription:
        'Select desired page layout style for article, columns, and images:',
      visualAssetsHeader: 'Logo & Album Artworks',
      bandLogoLabel: 'Band Logo',
      uploadLogo: 'Upload Logo Image',
      albumCoverLabel: 'Album Cover Picture',
      uploadAlbum: 'Upload Album Artwork',
      pageSeparatorsHeader: 'Page Separators (Band Art Fillers)',
      artworksCount: 'Artworks',
      separatorsDescription:
        'Full-bleed band artwork pages will be inserted as visual page separators between magazine chapters.',
      addArt: 'Add Art',
      pasteUrlPlaceholder: 'Or paste artwork image URL...',
      addUrlButton: 'Add URL',
      generateButton: 'Generate 3D Animated Metal Magazine',
      generatingButton: 'AI Generating Metal Magazine...',
    },
    flipbook: {
      spreadPrefix: 'Spread',
      spreadOf: 'of',
      prevPage: 'Previous Page',
      nextPage: 'Next Page',
      jumpToPage: 'Jump to Page',
      muteSound: 'Mute Page Flip Sound',
      enableSound: 'Enable Page Flip Sound',
      editInput: 'Edit Input',
      bottomNote: 'Interactive 3D Book Mode • Left: Arabic (RTL) | Right: English (LTR)',
      turnPageNote: 'Use Next/Prev buttons or Click Page Indicators to Turn Pages',
    },
    spread: {
      title: 'DUAL-LANGUAGE SPREAD PREVIEW',
      subtitle: 'Full-bleed side-by-side Arabic (RTL) & English (LTR) layout',
    },
    toast: {
      preparing: 'Preparing magazine layout for export...',
      generating: 'Generating magazine content...',
    },
    footer: {
      title: 'EGYPTSLAYER VISUAL MAGAZINE GENERATOR',
      text: 'Built with Embedded AI Engine • Arabic & English Split Layout • 3D Book Animation',
    },
  },
  ar: {
    navbar: {
      magazineBadge: 'مجلة',
      brandSubtitle: 'محرك المجلات المعدنية ثنائي اللغة',
      editorTab: 'محرر المقال والوسائط',
      flipbookTab: 'كتاب 3D تفاعلي',
      spreadTab: 'عرض الصفحة المزدوجة',
      demoData: 'بيانات تجريبية',
      settingsTooltip: 'إعدادات محرك الذكاء الاصطناعي',
      exportPdf: 'تصدير PDF تفاعلي',
      exportingPdf: 'جاري تصدير PDF...',
    },
    settings: {
      title: 'إعدادات مولد الذكاء الاصطناعي المدمج',
      providerLabel: 'مزود الذكاء الاصطناعي',
      providerBuiltin: 'الذكاء الاصطناعي الصحفي المدمج (بدون إنترنت / سريع)',
      providerGemini: 'Google Gemini API',
      providerOllama: 'نموذج Ollama المحلي',
      apiKeyLabel: 'مفتاح Gemini API Key',
      endpointLabel: 'رابط خادم Ollama Endpoint',
    },
    editor: {
      stepBadge: 'الخطوة ١: إدخال المحتوى والوسائط البصرية',
      mainTitle: 'صانع مجلة الميتال',
      mainDescription:
        'أدخل مقال فرقة الميتال باللغة العربية، شعار الفرقة، غلاف الألبوم، والصور الفاصلة. سيقوم الذكاء الاصطناعي المدمج بترجمة وتنسيق وتجميع مجلة تفاعلية ثنائية اللغة.',
      bandMetadataHeader: 'بيانات الفرقة والألبوم',
      bandNameLabel: 'اسم الفرقة (Band Name)',
      bandNamePlaceholder: 'مثال: إيجيبت سلاير (EgyptSlayer)',
      albumTitleLabel: 'عنوان الألبوم (Album Title)',
      albumTitlePlaceholder: 'مثال: هيمنة أوزيريس (Dominion of Osiris)',
      genreLabel: 'النوع الموسيقي (Genre)',
      genrePlaceholder: 'مثال: أورينتال ثراش ميتال (Oriental Thrash Metal)',
      originLabel: 'البلد / المدينة (Origin / City)',
      originPlaceholder: 'مثال: القاهرة، مصر (Cairo, Egypt)',
      arabicArticleHeader: 'نص المقال باللغة العربية',
      rtlBadge: 'إدخال عربي (من اليمين لليسار)',
      headlineLabel: 'عنوان المقال الرئيسية (Headline)',
      headlinePlaceholder: 'مثال: صعود ملحمة إيجيبت سلاير في عالم الميتال...',
      articleContentLabel: 'محتوى المقال كاملاً باللغة العربية',
      articleContentPlaceholder:
        'اكتب هنا تفاصيل الفرقة، مراجعة الألبوم، تاريخ الحفلات، والملاحظات الخاصة بالمقال...',
      layoutOptionsHeader: 'اختيار شكل تصميم الصفحة بالمقال',
      layoutCountBadge: '٦ قوالب جاهزة',
      layoutDescription:
        'اختر شكل تصميم الصفحة المطلوب لعرض المقال والأعمدة والصور:',
      visualAssetsHeader: 'الشعار وأغلفة الألبوم',
      bandLogoLabel: 'شعار الفرقة (Logo)',
      uploadLogo: 'رفع صورة الشعار',
      albumCoverLabel: 'صورة غلاف الألبوم (Album Cover)',
      uploadAlbum: 'رفع غلاف الألبوم',
      pageSeparatorsHeader: 'فواصل الصفحات (معرض الصور الفنية)',
      artworksCount: 'صور فنية',
      separatorsDescription:
        'سيتم إدراج صفحات فنية كاملة كفواصل بصرية بين فصول المجلة.',
      addArt: 'إضافة صورة',
      pasteUrlPlaceholder: 'أو الصق رابط صورة الألبوم...',
      addUrlButton: 'إضافة رابط',
      generateButton: 'توليد مجلة الميتال التفاعلية 3D',
      generatingButton: 'جاري توليد المجلة بواسطة الذكاء الاصطناعي...',
    },
    flipbook: {
      spreadPrefix: 'الصفحة المزدوجة',
      spreadOf: 'من',
      prevPage: 'الصفحة السابقة',
      nextPage: 'الصفحة التالية',
      jumpToPage: 'الانتقال إلى الصفحة',
      muteSound: 'كتم صوت تقليب الصفحات',
      enableSound: 'تفعيل صوت تقليب الصفحات',
      editInput: 'تعديل البيانات',
      bottomNote: 'وضع الكتاب التفاعلي 3D • اليمين: اللغة العربية (RTL) | اليسار: اللغة الإنجليزية (LTR)',
      turnPageNote: 'استخدم أزرار التالي/السابق أو اضغط على دوائر الصفحات لتقليب الصفحات',
    },
    spread: {
      title: 'معاينة الصفحة المزدوجة ثنائية اللغة',
      subtitle: 'تنسيق متقابل يجمع بين اللغة العربية (RTL) والإنجليزية (LTR)',
    },
    toast: {
      preparing: 'جاري تجهيز تصميم المجلة للتصدير...',
      generating: 'جاري توليد محتوى المجلة...',
    },
    footer: {
      title: 'مولد مجلة إيجيبت سلاير البصرية',
      text: 'تم التطوير باستخدام محرك ذكاء اصطناعي مدمج • تصميم مزدوج باللغتين العربية والإنجليزية • تقليب كتاب 3D',
    },
  },
};

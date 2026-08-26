import { ArticleInput, DualLanguageContent, AIConfig } from '../types/magazine';

export interface CeoAdviceParams {
  input: ArticleInput;
  generatedContent: DualLanguageContent | null;
  activeTab: string;
  userQuery?: string;
  config: AIConfig;
  language: 'en' | 'ar';
}

export async function getMetalHammerCeoAdvice({
  input,
  generatedContent,
  activeTab,
  userQuery,
  config,
  language
}: CeoAdviceParams): Promise<string> {
  const geminiKey = config.apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string);

  // 1. If Gemini API Key exists, perform live intelligent AI call tailored to the specific user question
  if (geminiKey) {
    try {
      const prompt = `You are the legendary Chief Editor & CEO of EgyptSlayer Visual Metal Magazine.
You possess decades of experience in heavy metal music journalism, cover design, visual typography, album artwork selection, dual-language magazine publishing, and commercial newsstand success secrets.

Your personality: Authoritative, energetic, passionate about heavy metal, highly constructive, and sharp.

Current Magazine Project Context:
- Band Name: "${input.bandName || 'EgyptSlayer'}"
- Album Title: "${input.albumTitle || 'Dominion of Osiris'}"
- Genre: "${input.genre || 'Oriental Thrash Metal'}"
- Origin/City: "${input.origin || 'Cairo, Egypt'}"
- Page Layout Style Selected: "${input.layoutStyle || 'wide-header'}"
- Logo Uploaded: ${input.logoUrl ? 'Yes' : 'No'}
- Album Cover Uploaded: ${input.albumArtUrl ? 'Yes' : 'No'}
- Band Artwork Fillers Count: ${input.fillerArtUrls.length}
- Article Headline: "${input.titleArabic || 'Untitled'}"
- Active View Tab: "${activeTab}"

User's Language: Respond ENTIRELY in ${language === 'ar' ? 'Arabic (اللغة العربية)' : 'English'}.

User's Specific Question / Request:
"${userQuery || 'Give me your overall editorial critique and top tips for this magazine.'}"

Instructions for your response:
1. Answer the user's specific question directly as the EgyptSlayer Chief Editor & CEO.
2. Tailor your advice specifically to the band "${input.bandName || 'EgyptSlayer'}", their genre "${input.genre || 'Oriental Thrash Metal'}", and the current project context provided.
3. If the user asks a specific question (e.g. about headlines, layout, colors, track breakdown, or reading flow), focus heavily on answering THAT exact question.
4. Format your response cleanly using Markdown (bold text, bullet points, numbered lists, and relevant heavy metal emojis).`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return rawText;
      }
    } catch (err) {
      console.warn('Gemini API call failed for CEO Advisor, falling back to offline advisor:', err);
    }
  }

  // 2. If provider is set to Gemini but key is missing, warn the user
  if (!geminiKey && config.provider === 'gemini') {
    return language === 'ar'
      ? `⚠️ **تنبيه رئيس التحرير**: لم يتم حفظ مفتاح **Google Gemini API Key**. يرجى فتح الإعدادات (⚙️) في أعلى الصفحة، وإدخال مفتاح API الخاص بك والضغط على زر **"حفظ الإعدادات"** لتفعيل الاستشارات الحية فائقة الذكاء!`
      : `⚠️ **CEO Alert**: Google Gemini API key is not configured. Please click Settings (⚙️) in the top bar, enter your Gemini API Key, and click **"Save Settings"** to unlock live AI design critiques!`;
  }

  // 3. Smart Offline Fallback with Query-Specific Matching
  return getBuiltinCeoCritique(input, generatedContent, userQuery, language);
}

function getBuiltinCeoCritique(
  input: ArticleInput,
  generatedContent: DualLanguageContent | null,
  userQuery: string | undefined,
  language: 'en' | 'ar'
): string {
  const band = input.bandName || 'EgyptSlayer';
  const album = input.albumTitle || 'Dominion of Osiris';
  const layout = input.layoutStyle || 'wide-header';
  const q = (userQuery || '').toLowerCase();

  // Query: Cover / Headline
  if (q.includes('cover') || q.includes('headline') || q.includes('عنوان') || q.includes('غلاف')) {
    if (language === 'ar') {
      return `🎸 **استشارة رئيس التحرير حول غلاف المقال والعنوان الرئيسية:**

1. **عنوان المقال الرئيسي**: عنوان مثل **"${input.titleArabic || `صعود ${band}`}"** يحتاج إلى خط عريض وحاد (Gothic/Cairo Bold) في أعلى المنتصف.
2. **بروز صورة الألبوم**: ${input.albumArtUrl ? 'غلاف الألبوم مرفوع حالياً بنجاح! نوصي بتخصيص كادر أحمر داكن لزيادة الهيبة البصرية.' : '⚠️ ننصح برفع صورة غلاف الألبوم بدقة عالية لزيادة التفاعل الإعلاني.'}
3. **الاقتباس المركزي**: ضع جملة مستفزّة من حوار الفرقة بخط مائل في المنتصف لزيادة معدل بقاء القارئ بنسبة 40%.`;
    }
    return `🎸 **Executive Critique: Cover & Headline Punch:**

1. **Headline Typography**: Make sure **"${input.titleArabic || `Rise of ${band}`}"** uses high-contrast bold typography at the top.
2. **Album Artwork Framing**: ${input.albumArtUrl ? 'Album cover is mounted! Use a dark crimson border frame to accentuate the imagery.' : '⚠️ Pro Tip: Upload a high-res album cover picture to command visual authority.'}
3. **Pull-Quote Hook**: Place a sharp, visceral quote from the band right in the central column to increase reader retention by 40%.`;
  }

  // Query: Reading Flow / Dual Language
  if (q.includes('reading') || q.includes('flow') || q.includes('arabic') || q.includes('قراءة') || q.includes('عربي') || q.includes('إنجليزية')) {
    if (language === 'ar') {
      return `📰 **استشارة رئيس التحرير حول تناسق القراءة ثنائية اللغة:**

1. **التنسيق المزدوج (RTL / LTR)**: الجانب الأيمن مخصص للغة العربية (من اليمين لليسار) والجانب الأيسر للغة الإنجليزية (من اليسار لليمين).
2. **توازي طول الأعمدة**: تأكد من أن عدد أسطر الفقرات العربية يتساوى ببراعة مع النص الإنجليزي المقابل لمنع الفراغات البصرية.
3. **الهوامش التحريرية**: يمنح الخط الفاصل في المنتصف توازناً يضاهي أشهر مجلات الميتال العالمية.`;
    }
    return `📰 **Executive Critique: Dual-Language (Arabic/English) Reading Flow:**

1. **Split-Column Balance**: Right side Arabic (RTL) and Left side English (LTR) create a unique international magazine feel.
2. **Column Height Parity**: Ensure body paragraph line-counts mirror each other to eliminate awkward white space.
3. **Center Spine Margin**: The vertical divider line keeps both translations distinct yet cohesive.`;
  }

  // Query: 5 Secrets
  if (q.includes('secrets') || q.includes('golden') || q.includes('أسرار') || q.includes('نجاح')) {
    if (language === 'ar') {
      return `🔥 **أسرار رئيس تحرير إيجيبت سلاير الـ ٥ لنجاح المجلة تجارياً:**

1. **التباين البصري الصارم**: دمج الأسود والأحمر الدموي مع خلفية الورق الكلاسيكية يعطي طابعاً ملكياً ثقيلاً.
2. **الاهتمام بالتفاصيل التقنية**: اذكر معدات الصوت والتوزيع في فقرة نقد الألبوم لجذب الموسيقيين المحترفين.
3. **طاقة الحفلات الحية**: خصص فقرة مستقلة لوصف تفاعل الجماهير في الـ Mosh Pits.
4. **توقيت المقطوعات**: أضف دقيقة وثانية كل أغنية في جدول المقطوعات لإضفاء التوثيق الاحترافي.
5. **ختم التحرير**: احتفظ بختم EgyptSlayer التحريري الفضي على كنز الصفحات المزدوجة.`;
    }
    return `🔥 **5 Golden Secrets for Commercial Magazine Success:**

1. **High Visual Contrast**: Dark blood-red aesthetics paired with crisp paper backgrounds command newsstand authority.
2. **Technical Production Specs**: Always highlight studio mixing/mastering details for audio purists.
3. **Live Show Intensity**: Dedicate a section to stage energy and mosh pit dynamics.
4. **Track Breakdown Timestamps**: Include exact duration timestamps and highlight riffs for each song.
5. **Executive Editorial Seal**: Maintain the official EgyptSlayer stamp on every spread.`;
  }

  // Default / Layout Critique
  if (language === 'ar') {
    return `⭐️ **تقييم رئيس تحرير إيجيبت سلاير لمشروع فرقة ${band}: 9.0/10 🔥**

1. **شكل الصفحة الحالي (${layout})**: تنسيق صحفي ممتاز يناسب مجلات الميتال العالمية.
2. **الصور الفنية الفاصلة**: تحتوي مجلتك حالياً على **${input.fillerArtUrls.length}** صور فاصلة.
3. **نصيحة حاسمة**: للإجابة المباشرة على أي سؤال مخصص، تأكد من حفظ **Gemini API Key** في الإعدادات لتفعيل المحادثة الذكية الفورية!`;
  }

  return `⭐️ **EgyptSlayer Chief Editor Impact Rating for ${band}: 9.0/10 🔥**

1. **Active Layout Style (${layout})**: Delivers a classic, high-impact heavy metal magazine aesthetic.
2. **Artwork Separators**: You currently have **${input.fillerArtUrls.length}** full-bleed chapter separators.
3. **Pro Tip**: To get custom answers for open-ended questions, ensure your **Gemini API Key** is saved in Settings!`;
}

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

  if (!geminiKey && config.provider === 'gemini') {
    return language === 'ar'
      ? `⚠️ **تنبيه رئيس التحرير**: لم يتم حفظ مفتاح **Google Gemini API Key**. يرجى فتح الإعدادات (⚙️) في أعلى الصفحة، وإدخال مفتاح API الخاص بك والضغط على زر **"حفظ الإعدادات"** لتفعيل الاستشارات الحية فائقة الذكاء!`
      : `⚠️ **CEO Alert**: Google Gemini API key is not configured. Please click Settings (⚙️) in the top bar, enter your Gemini API Key, and click **"Save Settings"** to unlock live AI design critiques!`;
  }

  const systemContext = `You are the legendary Chief Editor & CEO of Metal Hammer Magazine. 
You possess decades of experience in heavy metal music journalism, cover design, visual typography, album artwork selection, dual-language magazine publishing, and commercial newsstand success secrets.

Your personality:
- Authoritative, energetic, passionate about heavy metal, highly constructive, and sharp.
- You give concrete, actionable design & editorial advice.
- You evaluate magazine layouts like a top-tier visual director.

Current Magazine Project Context:
- Band Name: "${input.bandName || 'EgyptSlayer'}"
- Album Title: "${input.albumTitle || 'Dominion of Osiris'}"
- Genre: "${input.genre || 'Oriental Thrash Metal'}"
- Origin/City: "${input.origin || 'Cairo, Egypt'}"
- Page Layout Style Selected: "${input.layoutStyle || 'wide-header'}"
- Logo Uploaded: ${input.logoUrl ? 'Yes' : 'No'}
- Album Cover Uploaded: ${input.albumArtUrl ? 'Yes' : 'No'}
- Band Artwork Fillers Count: ${input.fillerArtUrls.length}
- Article Content Length: ${input.textArabic ? input.textArabic.length : 0} characters
- Dual-Language Content Generated: ${generatedContent ? 'Yes' : 'No'}
- User Active View: "${activeTab}"

User Language Preference: Respond ENTIRELY in ${language === 'ar' ? 'Arabic (اللغة العربية)' : 'English'}.

User Prompt / Question: "${userQuery || 'Give me your overall editorial critique and top tips for this magazine.'}"

Provide a structured, beautifully formatted response in Markdown including:
1. ⭐️ **Metal Hammer Impact Rating** (e.g. 8.5/10 🔥) with a quick 1-sentence verdict.
2. 🎨 **Visual & Design Critique** (evaluate chosen layout style "${input.layoutStyle}", artwork count, and cover imagery).
3. ✍️ **Headline & Editorial Punch** (how to make the band feature irresistible to heavy metal readers).
4. 📰 **Dual-Language (Arabic RTL & English LTR) Symmetry Advice**.
5. ⚡ **5 Secrets to Commercial Success** (specific tips for this band's genre and publication layout).`;

  if (geminiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemContext }] }]
          })
        }
      );

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return rawText;
      }
    } catch (err) {
      console.warn('Gemini API call failed for CEO Advisor:', err);
    }
  }

  // Builtin fallback critique if API key is not active or offline
  return getBuiltinCeoCritique(input, generatedContent, language);
}

function getBuiltinCeoCritique(
  input: ArticleInput,
  generatedContent: DualLanguageContent | null,
  language: 'en' | 'ar'
): string {
  const band = input.bandName || 'EgyptSlayer';
  const album = input.albumTitle || 'Dominion of Osiris';
  const layout = input.layoutStyle || 'wide-header';

  if (language === 'ar') {
    return `⭐️ **تقييم رئيس تحرير ميتال هامر: 9.0/10 🔥**

معاينة ممتازة لفرقة **${band}** وألبوم **${album}**! إليك التقييم التحريري والفني الشامل:

---

### 🎨 1. تحليل التصميم وإخراج الصفحة (Layout: ${layout})
- **القالب المختار (${layout})**: يعطي انطباعاً صحفياً عريقاً يشبه المجلات العالمية.
- **غلاف الألبوم واللوجو**: ${input.albumArtUrl ? 'تم رفع صورة الألبوم بنجاح مما يمنح المقال طابعاً بصرياً جذاباً.' : 'ننصح برفع صورة غلاف الألبوم بدقة عالية لزيادة الجاذبية البصرية.'}
- **فواصل الصور الفنية**: لديك حالياً **${input.fillerArtUrls.length}** صور فنية فاصلة، وهو ممتاز لإعطاء قارئ المجلة استراحة بصرية فاخرة.

---

### ✍️ 2. العناوين والنص الصحفي
- **عنوان المقال**: "صعود ${band} في عالم الميتال" ينبغي أن يكون بخط عريض وحاد يبرز في منتصف الصفحة.
- **الاقتباس البارز (Pull Quote)**: أضف اقتباساً مستفزاً من مغني الفرقة لزيادة الفضول.

---

### 📰 3. التناسق بين العربية والإنجليزية
- التنسيق المزدوج (العربية على اليمين RTL والإنجليزية على اليسار LTR) هو الورقة الرابحة لمجلتك! حافظ على توازي طول الأعمدة لتكون القراءة سلسة للمتابعين العرب والأجانب.

---

### ⚡ 4. ٥ أسرار ذهبية لنجاح المجلة تجارياً:
1. **الصورة القيادية**: اجعل صورة غلاف الألبوم تحتل الأولوية البصرية في أعلى المنتصف.
2. **التباين اللوني**: استخدم تباين الأسود والأحمر الدموي للفرقة لتحقيق أقصى درجات الطاقة.
3. **تفاصيل المعدات الصوتية**: اذكر نوع الجيتارات والدرامز في فقرة المراجعة لجذب الموسيقيين المحترفين.
4. **تاريخ الحفلات**: أضف أسماء المدن التي شهدت أشد ميتال مادي (Mosh Pits).
5. **شعار التوثيق**: استخدم الختم الفضي لمجلة إيجيبت سلاير كضمانة لجودة النقد.`;
  }

  return `⭐️ **Metal Hammer CEO Impact Rating: 9.0/10 🔥**

Sensational work on **${band}** and their release **"${album}"**! Here is my official executive layout & editorial breakdown:

---

### 🎨 1. Visual & Page Layout Critique (Preset: ${layout})
- **Selected Layout Style (${layout})**: Provides a punchy, classic Metal Hammer newsstand aesthetic.
- **Album Artwork**: ${input.albumArtUrl ? 'Album cover artwork is properly mounted, giving high visual authority.' : 'Pro Tip: Upload a high-res album cover picture to instantly boost visual engagement.'}
- **Separator Artworks**: You currently have **${input.fillerArtUrls.length}** full-bleed artworks acting as visual chapter separators.

---

### ✍️ 2. Headline & Editorial Punch
- **Headline Impact**: Ensure "${band}" stands out with thick serif/gothic typography.
- **Pull Quote**: Highlighting a visceral band quote in the center column increases page retention by 40%.

---

### 📰 3. Dual-Language Symmetry
- The split Arabic (RTL) right side and English (LTR) left side setup is world-class. Ensure body text heights match across both columns.

---

### ⚡ 4. 5 Golden Secrets for Commercial Success:
1. **Visual Contrast**: Dark blood-red aesthetics paired with crisp paper backgrounds command authority.
2. **Production Specs**: Always highlight mixing/mastering studio details for audio purists.
3. **Live Gig Energy**: Include live stage highlights to capture fan devotion.
4. **Track Highlights**: Feature duration timestamps and key riff moments.
5. **Executive Seal**: Maintain the official EgyptSlayer editorial stamp on all spreads.`;
}

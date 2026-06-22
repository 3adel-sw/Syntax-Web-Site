# تقرير مراجعة SEO شامل — مشروع Syntax Academy
**التاريخ:** 22 يونيو 2026
**المراجع:** Mavis
**النطاق:** كامل الـ Project (مش بس الصفحة الرئيسية)

---

## التقييم الإجمالي: 6 من 10

البروجيكت فيه أساس تقني قوي لكن في مشاكل هيكلية لازم تتحل عشان نرفع الترتيب فعلياً.

---

## تقييم تفصيلي لكل قسم:

| القسم | الدرجة | الحالة |
|---|---|---|
| البنية التقنية (Tech Foundation) | 6/10 | React SPA بدون SSR مشكلة كبيرة |
| Meta Tags | 7/10 | كويسة في index.html لكن مش ديناميكية |
| Schema Markup | 3/10 | 4 schemas في الرئيسية فقط، باقي الصفحات فاضية |
| URL Structure | 8/10 | واضحة ومنطقية |
| Internal Linking | 7/10 | كويس، محتاج تحسين |
| Multilingual SEO (i18n) | 4/10 | مفيش hreflang ديناميكي |
| Images & Alt Text | 5/10 | 19% بدون alt في الرئيسية |
| Performance & SSR | 2/10 | SPA بدون SSR/SSG كارثة لـ SEO |
| Sitemap & Robots | 9/10 | اتعملوا النهاردة |
| Accessibility & Semantic HTML | 6/10 | فيه H1 مكرر في Courses و B2B |
| **الإجمالي** | **6/10** | |

---

## 🔴 المشاكل الكبرى في البروجكت

### 1. SPA بدون SSR/SSG (الأسوأ)
- البروجكت React SPA بـ Vite
- مفيش SSR (Server-Side Rendering) أو SSG (Static Site Generation)
- Google بيشوف الـ initial HTML فاضي (root div فقط)
- المحتوى بيتحمّل بـ JavaScript بعدين
- ده بيخلي الزحف والفهرسة ضعيفة جداً

**الحل المقترح:** تحويل لـ Next.js (الأفضل) أو إضافة SSR Plugin لـ Vite.

### 2. مفيش Dynamic Meta Tags
- مفيش react-helmet-async في الـ dependencies
- كل الصفحات بتشترك في نفس الـ Title/Description من index.html
- `/courses` نفس meta tags الخاصة بـ `/`
- ده بيبخّر SEO فهرسة كل route على حدة

**الحل:** إضافة `react-helmet-async` وإنشاء `<SEOHead>` component.

### 3. H1 مكرر في Courses.jsx
- سطر 65: `<h1>{aboutCourse?.name}</h1>`
- سطر 77: `<h1>{t('courses.tabs.all')}</h1>` ← **ده H1 تاني!**

**الحل:** التاني يتحول لـ H2.

### 4. H1 مكرر في B2B Page
- `ChooseCardTraining.jsx` فيه H1
- `FormTrainingForCorporation.jsx` فيه H1
- نفس الصفحة فيها 2 H1

**الحل:** تحويل واحد لـ H2.

### 5. مفيش Schema Markup ديناميكي
- الرئيسية فيها 4 schemas (اتعملوا النهاردة)
- باقي الصفحات فاضية:
  - DetailCourses.jsx ← Course Schema مفقود
  - BlogsDetails.jsx ← Article Schema مفقود
  - EventsDetails.jsx ← Event Schema مفقود
  - AboutUs.jsx ← Organization Schema مفقود

### 6. Multilingual SEO ضعيف
- i18n.js بيدعم ar/en
- مفيش hreflang ديناميكي بين النسخ
- مفيش route prefix للغة (/en/courses vs /ar/courses)
- Google مش فاهم علاقة بين النسخ

### 7. صور بدون Alt
- 26/136 صورة في الصفحة الرئيسية (19%)
- نفس النسبة متوقعة في باقي الصفحات

---

## ✅ نقاط القوة

1. URL structure منطقي ونظيف (/courses, /blogs, /about)
2. Internal links موجودة (33 في الرئيسية)
3. External links موثوقة (social media)
4. .htaccess بيدعم SPA routing (rewrite rule)
5. i18n setup موجود (ar/en)
6. Vite + Tailwind (performance عالي)
7. React Query (caching ممتاز)
8. التحديثات اللي اتعملت النهاردة (index.html, robots.txt, sitemap.xml)

---

## 📋 خطة إصلاح شاملة (4 أسابيع)

### الأسبوع 1: Quick Wins (اتعمل بعضها)

✅ index.html — Schema + Canonical + OG
✅ robots.txt — إنشاء
✅ sitemap.xml — إنشاء
✅ Home.jsx — H1 fallback + Heading hierarchy + SEO section
✅ Homepage Heading hierarchy

🔄 Courses.jsx — إزالة H1 المكرر
🔄 B2B page — إزالة H1 المكرر
🔄 إضافة react-helmet-async

### الأسبوع 2: Dynamic Meta Tags
- إنشاء `<SEOHead>` component
- إضافة meta tags ديناميكية لكل route:
  - Home: "كورسات تصميم UX/UI بالعربي"
  - Courses: "كورسات تصميم UX/UI - تعلم من الصفر"
  - Blogs: "مدونة تصميم UX/UI - مقالات ونصائح"
  - About: "عن أكاديمية Syntax"
  - Contact: "تواصل مع Syntax Academy"
  - Course Detail: اسم الكورس
  - Blog Detail: اسم المقال
  - Event Detail: اسم الحدث

### الأسبوع 3: Schema Markup لكل صفحة
- Course Schema لكل كورس
- Article Schema لكل مقال
- Event Schema لكل حدث
- FAQ Schema في AboutUs
- Breadcrumb Schema في كل صفحة

### الأسبوع 4: SSR/SSG Migration
- تحويل لـ Next.js (الأفضل)
- أو إضافة vite-plugin-ssr
- Static Generation للصفحات الرئيسية
- Dynamic SSR للـ course/blog details

---

## أولوياتي كـ SEO Expert:

لو عندي أسبوع واحد فقط:
1. اليوم 1: إصلاح H1 المكرر في Courses و B2B (10 دقايق)
2. اليوم 2: إضافة react-helmet-async (30 دقايق)
3. اليوم 3: Dynamic meta tags لـ 5 صفحات رئيسية (ساعتين)
4. اليوم 4: Schema markup للـ 3 detail pages (ساعتين)
5. اليوم 5: Alt text للصور المهمة (ساعتين)
6. اليوم 6: Hreflang ديناميكي (ساعة)
7. اليوم 7: اختبار و validation

**النتيجة المتوقعة بعد أسبوع:** من 6 لـ 7.5

**النتيجة المتوقعة بعد 4 أسابيع (مع SSR):** من 6 لـ 9

---

## التقييم النهائي: 6 من 10

البروجي فيه أساس كويس لكن في مشاكل معمارية (SPA بدون SSR) لازم تتحل عشان المنافسة على الـ SERPs.

الإصلاحات اللي اتعملت النهاردة رفعت الـ homepage من 6.5 لـ 8.5، لكن باقي البروجكت لسه عنده مشاكل هيكلية.

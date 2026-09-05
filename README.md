# رفيق العمرة — تطبيق ويب (PWA) على Firebase

## المحتويات
- `public/index.html` — التطبيق كامل (ملف واحد)
- `public/firebase-config.js` — إعدادات مشروعك (يجب تعديلها)
- `public/manifest.webmanifest` + `public/sw.js` + `public/icons/` — ملفات التثبيت على الموبايل والديسكتوب والعمل بدون إنترنت
- `firebase.json` + `firestore.rules` + `.firebaserc` — إعدادات النشر وقواعد قاعدة البيانات

## خطوات النشر (مرة واحدة)
1. افتح https://console.firebase.google.com وأنشئ مشروعًا جديدًا (مثلًا: umrah-companion).
2. من القائمة: Build → Firestore Database → Create database → اختر الموقع (مثلًا me-central1 أو europe-west) → ابدأ في وضع production.
3. من Project settings → General → Your apps → أيقونة الويب `</>` → سجّل تطبيقًا → انسخ كائن `firebaseConfig`.
4. الصق القيم في `public/firebase-config.js`.
5. ضع `projectId` في `.firebaserc` بدل `PASTE_PROJECT_ID`.
6. في PowerShell داخل هذا المجلد:
   ```
   npm install -g firebase-tools
   firebase login
   firebase deploy
   ```
   (يرفع الاستضافة وقواعد Firestore معًا.)
7. الرابط سيكون: `https://PROJECT_ID.web.app`

## التثبيت كتطبيق
- أندرويد (Chrome): القائمة ⋮ → «إضافة إلى الشاشة الرئيسية» / «تثبيت التطبيق».
- آيفون (Safari): مشاركة → «إضافة إلى الشاشة الرئيسية».
- ويندوز/ماك (Chrome/Edge): أيقونة التثبيت في شريط العنوان.

## ما يتزامن بين الجميع
- الأدعية المضافة والمحذوفة (مجموعة `duas`)
- عدّادا الطواف والسعي (وثيقة `shared/counters`)
- حجم الخط يبقى محليًا على كل جهاز.

## التحديث لاحقًا
عدّل `public/index.html` ثم `firebase deploy --only hosting`.
غيّر رقم `CACHE` في `sw.js` (v1 → v2) عند كل تحديث كبير حتى يُحدَّث التطبيق المثبَّت فورًا.

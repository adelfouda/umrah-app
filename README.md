# رفيق الطريق — تطبيق ويب (PWA)

## الكود والنشر على GitHub
- المستودع: https://github.com/adelfouda/umrah-app
- الرابط الشغال (GitHub Pages): https://adelfouda.github.io/umrah-app/
- أي `push` على فرع `main` ينشر مجلد `public/` تلقائيًا عبر `.github/workflows/pages.yml`.

## مشروع Firebase (مُفعَّل بالفعل — المزامنة تعمل)
- Project ID: `umrah-companion-adf2026`
- Firestore: مفعّل (منطقة me-central1) وقواعد الحماية مرفوعة من `firestore.rules`.
- رابط Firebase Hosting الرئيسي (مختصر): https://rafiq-tareeq.web.app
- الرابط القديم لا يزال يعمل أيضًا (نفس المزامنة): https://umrah-companion-adf2026.web.app
- لوحة التحكم: https://console.firebase.google.com/project/umrah-companion-adf2026/overview
- `public/firebase-config.js` فيه القيم الحقيقية بالفعل — لا حاجة لتعديله.
- **النشر على Firebase Hosting تلقائي أيضًا:** أي `push` على `main` ينشر الاستضافة وقواعد Firestore معًا عبر `.github/workflows/firebase-deploy.yml`، بشرط وجود الـ Secret `FIREBASE_SERVICE_ACCOUNT_UMRAH_COMPANION_ADF2026` في إعدادات المستودع (GitHub → Settings → Secrets and variables → Actions) — قيمته ملف JSON لمفتاح خدمة يُنشأ من Firebase Console → Project settings → Service accounts → Generate new private key.
- لو الـ Secret مش موجود أو الـ workflow فشل، يمكن النشر يدويًا:
  ```
  npx -y firebase-tools deploy --only firestore:rules,hosting --project umrah-companion-adf2026
  ```
  الرابطان (GitHub Pages وFirebase Hosting) يقرآن نفس بيانات Firestore، فأي إضافة دعاء أو تغيير عدّاد من أحدهما يظهر في الآخر مباشرة.

### للتكملة من جهاز آخر
```
git clone https://github.com/adelfouda/umrah-app.git
cd umrah-app
```
عدّل `public/index.html` ثم:
```
git add -A
git commit -m "وصف التعديل"
git push
```
غيّر رقم `CACHE` في `public/sw.js` (v1 → v2) عند كل تحديث كبير حتى يُحدَّث التطبيق المثبَّت فورًا.

> ملاحظة: بدون إعدادات Firebase يعمل التطبيق كاملًا لكن الأدعية المضافة والعدّادات تُحفظ محليًا على كل جهاز بدون مزامنة. لتفعيل المزامنة اتبع قسم Firebase أدناه.

---

# النشر على Firebase (اختياري — للمزامنة بين الأجهزة)

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

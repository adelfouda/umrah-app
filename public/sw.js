// رفيق العمرة — service worker: app shell offline, network-first for HTML
const CACHE = 'umrah-companion-v1';
const SHELL = ['./', './index.html', './firebase-config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Firestore / Google APIs: let the SDK handle networking itself
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('firebaseio.com')) return;
  if (url.origin === location.origin) {
    // network-first for same-origin so updates land quickly; fall back to cache offline
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
  } else {
    // fonts / SDK: cache-first
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })));
  }
});

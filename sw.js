const CACHE_NAME = 'smartsnap-cyberhayde-v1';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './assets/vendor/jszip.min.js',
  './assets/vendor/filesaver.min.js',
  './assets/vendor/tesseract/tesseract.min.js',
  './assets/vendor/tesseract/worker.min.js',
  './assets/vendor/tesseract/tesseract-core-lstm.wasm.js',
  './assets/vendor/tesseract/tesseract-core-lstm.wasm',
  './assets/vendor/tesseract/tesseract-core-simd-lstm.wasm.js',
  './assets/vendor/tesseract/tesseract-core-simd-lstm.wasm',
  './assets/vendor/tesseract/lang-data/eng.traineddata.gz',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/favicon-32.png',
  './icons/favicon-16.png',
  './icons/favicon.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});

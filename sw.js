/* Service worker — My House Game
 * - App shell: precache + cache-first (works offline).
 * - Page navigations: network-first, so new versions arrive; falls back to cache offline.
 * - Google Fonts: stale-while-revalidate in a separate, size-capped cache.
 * - Anything else: not intercepted (no caching of third-party content).
 * Bump VERSION on every release so clients drop old caches.
 */
const VERSION = 'v1.0.0';
const APP_CACHE = 'myhouse-app-' + VERSION;
const FONT_CACHE = 'myhouse-fonts-v1';
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const MAX_FONT_ENTRIES = 30;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(APP_CACHE).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keep = new Set([APP_CACHE, FONT_CACHE]);
    for (const key of await caches.keys()) {
      if (key.startsWith('myhouse-') && !keep.has(key)) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 1. Navigations: network-first, offline fallback to the cached app shell.
  if (req.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh.ok) { const c = await caches.open(APP_CACHE); c.put('./index.html', fresh.clone()); }
        return fresh;
      } catch (_) {
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  // 2. Same-origin static files: cache-first.
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(APP_CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }

  // 3. Google Fonts: stale-while-revalidate.
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith((async () => {
      const cache = await caches.open(FONT_CACHE);
      const hit = await cache.match(req);
      const net = fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') { cache.put(req, res.clone()).then(() => trim(FONT_CACHE, MAX_FONT_ENTRIES)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })());
  }
  // 4. Everything else goes straight to the network (not intercepted).
});

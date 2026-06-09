/**
 * SERVICE WORKER - LANDING PAGE INSTALLABLE (PWA)
 * 
 * Estrategia: Network-First falling back to Cache.
 * Permite que los cambios se visualicen al instante cuando hay conexión,
 * y sirve los archivos desde la caché local cuando no hay conexión.
 */

const CACHE_NAME = 'biolink-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.css',
  './app.js',
  './config.js'
];

// Instalar y pre-cachear los recursos estructurales básicos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Algunos activos no se pudieron cachear en la instalación:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activar el SW y limpiar versiones antiguas de la caché
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar peticiones para servir sin conexión
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no sean GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignorar esquemas que no sean http o https (por ejemplo, extensiones de navegador)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la red responde correctamente, guardar una copia en caché
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si la red falla (offline), servir desde caché
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Si es una navegación HTML que no está en caché, servir index.html por defecto
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});

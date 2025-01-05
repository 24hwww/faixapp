const CACHE_NAME = "vite-react-cache-v1";
const urlsToCache = [
  "/", 
  "/index.html",
  "/src/main.tsx", // O "/src/main.tsx" si usas TypeScript
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching assets");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación y limpieza de caché antigua
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Borrando caché antigua", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Intercepción de fetch para servir desde caché o red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    }).catch(() => caches.match("/offline.html")) // Modo offline
  );
});

// Notifica a los clientes cuando hay una nueva versión disponible
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

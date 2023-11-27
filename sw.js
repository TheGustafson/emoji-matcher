const CACHE_NAME = "matchmoji-cache-00006";

// Update this list with the paths of assets you want to cache
const PRECACHE_ASSETS = ["/src/", "/icons/"];

// Install event - caches assets and forces new service worker to take control immediately
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_ASSETS);
      self.skipWaiting(); // Forces this version of the service worker to activate immediately
    })()
  );
});

// Activate event - claims clients and cleans up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Claim clients immediately
      self.clients.claim();

      // Get all the cache keys (cache names)
      const cacheKeys = await caches.keys();

      // Wait for all old caches to be deleted
      await Promise.all(
        cacheKeys.map((cacheKey) => {
          if (cacheKey !== CACHE_NAME) {
            return caches.delete(cacheKey); // Delete caches not matching the current CACHE_NAME
          }
        })
      );
    })()
  );
});

const CACHE_NAME = "cool-cache";

// Add whichever assets you want to precache here:
const PRECACHE_ASSETS = ["/src/", "/icons/"];

// Listener for the install event - precaches our assets list on service worker install.
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(PRECACHE_ASSETS);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

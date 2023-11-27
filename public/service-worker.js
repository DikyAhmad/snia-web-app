try {
  const PRECACHE = "snia-cache";

  
  // The activate handler takes care of cleaning up old caches.
  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches
        .keys()
        .then(() => self.clients.claim())
    );
  });
 
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
          const networkFetch = fetch(event.request).then(response => {
            // update the cache with a clone of the network response
            const responseClone = response.clone()
            caches.open(PRECACHE).then(cache => {
              cache.put(event.request, responseClone)
            })
            return response
          }).catch(function (reason) {
            console.error('ServiceWorker fetch failed: ', reason)
          })
          // prioritize network response over cached
          return networkFetch || cachedResponse
        }
      )
    )
  })

  self.addEventListener("install", event => {
      event.waitUntil(
        caches.open(PRECACHE)
      );
  });
 
  
} catch (e) {
  console.log(e);
}

const CACHE_NAME = 'ruang-teduh-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/assets/images/Ruangteduh.jpg',
  '/manifest.json',
  '/assets/images/counselors/anne.jpg',
  '/assets/images/counselors/beatrix.jpg',
  '/assets/images/counselors/zifa.jpg',
  '/assets/images/counselors/al.jpg',
  '/assets/images/counselors/difa.jpg',
  '/assets/images/counselors/dedek.jpg',
  '/assets/images/counselors/einzella.jpg',
  '/assets/images/team/barcelona.jpg',
  '/assets/images/team/mike-mentzer.jpg',
  '/assets/images/team/rdr-2.jpg',
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
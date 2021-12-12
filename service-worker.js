console.log("hecho");

var cacheStatic = "cache-static-v2";
var cacheInmutable = "cache-inmutable-v1";
var cacheDinamyc = "cache-dinamyc-v1";

const files = [
  "README.md",
  "public/css/styles.css",
  "public/js/main.js",
  "public/js/carrito.js",
  "index.html",
];
const inmutable_files = [
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css",
];

self.addEventListener("install", (event) => {
  console.log("install SW");

  const guardarCacheStatic = caches
    .open(cacheStatic)
    .then((cache) => cache.addAll(files));

  const guardarCacheInmutable = caches
    .open(cacheInmutable)
    .then((cache) => cache.addAll(inmutable_files));

  event.waitUntil(Promise.all([guardarCacheStatic, guardarCacheInmutable]));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log("Obteniendo recurso: " + e.request.url);
      return (
        r ||
        fetch(e.request).then((response) => {
          return caches.open(cacheDinamyc).then((cache) => {
            console.log(
              "Almacenando el nuevo recurso: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});

//Actualizar cache
self.addEventListener("activate", (event) => {
  const cacheList = [cacheStatic, cacheInmutable, cacheDinamyc];

  console.log("Activado");
  event.waitUntil(
    caches.keys().then((cachesNames) =>
      cachesNames.map((cacheName) => {
        if (cacheList.indexOf(cacheName) === -1) {
          console.log("activado");
          return caches.delete(cacheName);
        }
      })
    )
  );
});



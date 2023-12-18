'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "b22417bd6a0eaee02ded6deb11133ef8",
"index.html": "91598f43240f6c4a1cdab8213c8188c2",
"/": "91598f43240f6c4a1cdab8213c8188c2",
"main.dart.js": "82b1a64aeb992bf406a10c7ee6d3d00e",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "beba5a36137417f655af5f5d9984c171",
"assets/images/twitter_img.png": "262b6637e0ecc18da0f1ebcc800bf640",
"assets/images/facebook_img.png": "419340b6d7adbb765486ccb1f7aaacf8",
"assets/images/image_picker.png": "bdd8044285c9797f1715746f7fc7a5f7",
"assets/images/profile_icon.png": "b6700022fb40c54ae00f899f04518686",
"assets/images/empty_image.png": "cd0a7b7bfb0da12c466e771059cb4abd",
"assets/images/order.png": "2a8926d7c8c215c6c316b53db6a086d3",
"assets/images/cover_image.png": "6ef7ca114e4381b6760a360747a3ae14",
"assets/images/select_cover_image.png": "f67192e03e27a19a149177fadc5640d5",
"assets/images/edit_icon.png": "7df286f9280604b0c33e76d70b931f33",
"assets/images/delete_icon.png": "5151c33e76cf72531e7a367b4696a7a8",
"assets/images/add_icon.png": "24b91eb9a49249cc68080790fa5c257e",
"assets/images/home.png": "929b1245202bdfd73ef11d1c85ef8d9a",
"assets/images/user.png": "04b2bd9546e2f8bb72ffd8e596c93968",
"assets/images/upload_creation.png": "cfee98ca52ac3b34ae2c64d7561dec31",
"assets/images/no_order.json": "8ef83d0c31a4e70faf016013a2db1739",
"assets/images/placeHolder.png": "0c37c11258c8f108cef5b59141171f7a",
"assets/images/arrow_up_down.svg": "ff483dd5aa57905dee5b87018f5bbe46",
"assets/images/logo.png": "c76381a834eef3940c0a141733f9206c",
"assets/images/instagram_img.png": "4f84ff9f7bdef71058b6e5ff0bca393d",
"assets/images/whatsapp.svg": "f23978de379903d272ac6058ed088dcf",
"assets/images/logo_image.png": "aebcf79544ec7fa4b9fcf64fe9e10d41",
"assets/images/icon_upload.png": "d681407137e28fc3952fe2b15668dc2a",
"assets/images/delete_image.png": "8944e99b439573a528b3f99fd6d16f7d",
"assets/images/insert_chart.png": "0a5dfe57008dd6d685fbeb995861021c",
"assets/images/setting_icon.png": "72bf9d4ea8c60ba3f0192505d1982e52",
"assets/images/measurement_icon.png": "6da617f19da2ad2a8dee271383248771",
"assets/images/th.jpg": "67aa6e8e0caf51d3f8a038fd194a1d79",
"assets/images/whatsapp_img.png": "ec620169cf68e71952fae6314349bd1e",
"assets/images/upload_creation_image.png": "5e79ae7338714232b2c476aa43999f29",
"assets/AssetManifest.json": "1e94c7423751175b3f9601d776009f48",
"assets/NOTICES": "df0ef66a0db8cf215f68949ddfbdca26",
"assets/FontManifest.json": "d7266237a95d15602862054c788dea8b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/flutter_phosphor_icons/fonts/Phosphor.ttf": "ae434202ddb6730654adbf02f8f3bc5d",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "3ac71584215ab628090b3183fa39b629",
"assets/fonts/MaterialIcons-Regular.otf": "8e5fbc4747ddf4616af10126940458aa",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

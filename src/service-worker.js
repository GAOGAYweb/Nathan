/**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

/**
 * Created by Administrator on 2017/4/9.
 */
let cacheFiles = [];
self.addEventListener("install", function (evt) {
  evt.waitUntil(caches.open('my-test-cahce-v1').then(function (cache) {
      return cache.addAll(cacheFiles);
    })
  );
});
self.addEventListener("fetch", function (evt) {
  console.log("fetch intercept!");
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      if (response) {
        console.log("cache hit!");
        return response;
      }
      else {
        let request = evt.request.clone();
        console.log("cache miss! send a request...");
        return fetch(request).then(function (response) {
          if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/image/)) {
            return response;
          }
          let responseClone = response.clone();
          caches.open('my-test-cache-v1').then(function (cache) {
            cache.put(evt.request, responseClone);
          });
          return response;
        });
      }
    })
  );
});

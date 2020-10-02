---
permalink: /sw.js
sitemap: false
serviceworker: false
---

'use strict';

const cacheVersion = '{{ site.time | date: "%s" }}::';
{% assign exclude = site.pages | concat: site.posts | where_exp: 'entry', 'entry.serviceworker == false' | sort: 'url' %}
const urlsToExclude = [{% for entry in exclude %}
  '{{ entry.url | relative_url }}'{% if forloop.last == false %},{% endif %}{% endfor %}
];
{% assign include = site.pages | concat: site.posts | where_exp: 'entry', 'entry.serviceworker != false' | sort: 'url' %}
const urlsToCache = [{% for entry in include %}
  '{{ entry.url | relative_url }}'{% if forloop.last == false %},{% endif %}{% endfor %}
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheVersion + 'static').then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
  return self.skipWaiting();
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.indexOf(cacheVersion) !== 0;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(cacheVersion + 'static').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(function () {
        return caches.match('{{ "/404" | relative_url }}')
      });
    })
  );
});

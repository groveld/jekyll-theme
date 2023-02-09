---
layout: null
sitemap: false
serviceworker: true
---

{% if site.serviceworker and jekyll.environment == 'production' %}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceworker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
{% endif %}

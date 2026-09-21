const CACHE='atelier-dados-v10';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./dice-icon-32-v2.png','./dice-icon-180-v2.png','./dice-icon-192-v2.png','./dice-icon-512-v2.png','./dice-icon-maskable-v2.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('atelier-dados-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())))});

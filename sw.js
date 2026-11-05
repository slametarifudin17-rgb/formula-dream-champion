const CACHE="fdc-shell-v4";
const CORE=["./","./index.html","./style.css","./game.js","./circuits.js","./teams.js","./manifest.webmanifest","./icon.svg"];
const THREE="https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
self.addEventListener("install",event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(CORE);try{await c.add(THREE);}catch(e){}await self.skipWaiting();})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener("fetch",event=>{const req=event.request;if(req.method!=="GET")return;event.respondWith((async()=>{const cached=await caches.match(req);if(cached)return cached;try{const response=await fetch(req);if(response.ok&&(new URL(req.url).origin===self.location.origin||req.url===THREE)){const c=await caches.open(CACHE);c.put(req,response.clone());}return response;}catch(e){return (await caches.match("./index.html"))||Response.error();}})());});

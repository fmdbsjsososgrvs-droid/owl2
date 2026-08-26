// QR SENDER 오프라인 캐시
// 한 번 온라인으로 열면 이 페이지를 저장해두고, 이후엔 네트워크 없이도 그대로 열립니다.
// 주의: 이 파일의 scope는 등록부(sender.html)에서 '/sender.html'로 좁혀서 등록하지만,
// 구형 브라우저 대비로 fetch 핸들러에서도 이 자산 하나만 명시적으로 가로챈다.
const CACHE_NAME = "qr-sender-v2";
const ASSET = "/sender.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(ASSET))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.pathname !== ASSET) return; // 이 파일 외엔 절대 가로채지 않음 — 다른 페이지는 손대지 않는다
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
            return res;
          })
          .catch(() => cached)
      );
    })
  );
});

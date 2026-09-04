// VAULT 오프라인 캐시
// 한 번 온라인으로 열면 이 페이지를 저장해두고, 이후엔 네트워크 없이도 그대로 열립니다.
// 주의: 이 파일의 scope는 등록부(vault.html)에서 '/vault.html'로 좁혀서 등록하지만,
// 구형 브라우저 대비로 fetch 핸들러에서도 이 자산 하나만 명시적으로 가로챈다.
// (vault.html은 라이브러리를 전부 내장한 단일 파일이다 — 에어갭 기기로 파일 하나만 옮겨도
// 그대로 동작해야 하므로, 외부 js 파일로 쪼개지 않는다.)
const CACHE_NAME = "vault-v4";
const ASSET = "/vault.html";

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
  // stale-while-revalidate: 캐시가 있으면 즉시 그걸로 응답(오프라인/속도 보장)하되,
  // 백그라운드로 항상 최신본을 다시 받아 캐시를 갱신해둔다 — 이러면 다음에 열 때부터
  // 새 배포가 자동 반영되고, CACHE_NAME을 매번 올려줘야 하는 문제가 없어진다.
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        const network = fetch(event.request)
          .then((res) => {
            cache.put(event.request, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});

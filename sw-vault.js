// VAULT 오프라인 캐시
// 한 번 온라인으로 열면 이 페이지(+ 안에서 쓰는 라이브러리 파일들)를 저장해두고,
// 이후엔 네트워크 없이도 그대로 열립니다.
// 주의: 이 파일의 scope는 등록부(vault.html)에서 '/vault.html'로 좁혀서 등록하지만,
// 구형 브라우저 대비로 fetch 핸들러에서도 이 자산들만 명시적으로 가로챈다.
const CACHE_NAME = "vault-v3";
const ASSETS = [
  "/vault.html",
  "/lib-age.js",
  "/lib-jsqr.js",
  "/lib-qrcodestyling.js",
  "/lib-qrcode.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // 병렬(Promise.all/addAll)로 받으면 일부 항목이 누락되는 경우가 있어 순차적으로 받는다.
      for (const url of ASSETS) {
        try {
          const res = await fetch(url);
          await cache.put(url, res);
        } catch (e) {
          // 설치 시점에 하나 실패해도 나머지는 계속 진행 — 다음 방문 때 fetch 핸들러가 다시 채워준다.
        }
      }
    })
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
  if (!ASSETS.includes(url.pathname)) return; // 이 자산들 외엔 절대 가로채지 않음 — 다른 페이지는 손대지 않는다
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

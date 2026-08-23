// 블로그 목록 페이지(security.html, travel.html)의 카드마다
// 조회수 / 좋아요 / 댓글 수를 Supabase에서 불러와 채워넣습니다.
(function () {
  if (!window.supabase || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
    console.warn("list-engagement.js: Supabase 설정이 없습니다.");
    return;
  }
  var client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

  var slugMap = {};
  document.querySelectorAll(".post-card[href]").forEach(function (card) {
    var href = card.getAttribute("href");
    if (!href || href.indexOf("http") === 0) return;
    var slug = href.replace(/\.html.*$/, "");
    slugMap[slug] = card;
  });
  var slugs = Object.keys(slugMap);
  if (!slugs.length) return;

  client
    .from("page_stats")
    .select("slug,views")
    .in("slug", slugs)
    .then(function (res) {
      var map = {};
      (res.data || []).forEach(function (r) {
        map[r.slug] = r.views;
      });
      slugs.forEach(function (slug) {
        var el = slugMap[slug].querySelector("[data-stat-views]");
        if (el) el.textContent = map[slug] != null ? map[slug] : 0;
      });
    });

  client
    .from("likes")
    .select("slug,count")
    .in("slug", slugs)
    .then(function (res) {
      var map = {};
      (res.data || []).forEach(function (r) {
        map[r.slug] = r.count;
      });
      slugs.forEach(function (slug) {
        var el = slugMap[slug].querySelector("[data-stat-likes]");
        if (el) el.textContent = map[slug] != null ? map[slug] : 0;
      });
    });

  client
    .from("comments")
    .select("slug")
    .in("slug", slugs)
    .then(function (res) {
      var counts = {};
      (res.data || []).forEach(function (r) {
        counts[r.slug] = (counts[r.slug] || 0) + 1;
      });
      slugs.forEach(function (slug) {
        var el = slugMap[slug].querySelector("[data-stat-comments]");
        if (el) el.textContent = counts[slug] || 0;
      });
    });
})();

// OWL BUTLER 블로그 · 좋아요 / 익명 댓글 / 조회수
// 각 포스트 페이지 파일명(확장자 제외)을 slug로 사용합니다.
(function () {
  if (!window.supabase || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
    console.warn("engagement.js: Supabase 설정이 없습니다.");
    return;
  }
  var client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  var slug = location.pathname.split("/").pop().replace(/\.html$/, "");

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function formatDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
  }

  // ---- 조회수 ----
  client.rpc("increment_views", { p_slug: slug }).then(function (res) {
    if (res.error) return console.warn(res.error);
    document.querySelectorAll("[data-view-count]").forEach(function (el) {
      el.textContent = res.data;
    });
  });

  // ---- 좋아요 ----
  var likeKey = "liked_" + slug;
  function renderLikeState() {
    var liked = !!localStorage.getItem(likeKey);
    document.querySelectorAll("[data-like-btn]").forEach(function (btn) {
      btn.classList.toggle("liked", liked);
    });
  }
  client
    .from("likes")
    .select("count")
    .eq("slug", slug)
    .maybeSingle()
    .then(function (res) {
      var count = (res.data && res.data.count) || 0;
      document.querySelectorAll("[data-like-count]").forEach(function (el) {
        el.textContent = count;
      });
    });
  renderLikeState();

  document.querySelectorAll("[data-like-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (localStorage.getItem(likeKey)) return;
      btn.disabled = true;
      client
        .rpc("increment_likes", { p_slug: slug })
        .then(function (res) {
          btn.disabled = false;
          if (res.error) return console.warn(res.error);
          localStorage.setItem(likeKey, "1");
          renderLikeState();
          document.querySelectorAll("[data-like-count]").forEach(function (el) {
            el.textContent = res.data;
          });
        });
    });
  });

  // ---- 댓글 ----
  function loadComments() {
    client
      .from("comments")
      .select("*")
      .eq("slug", slug)
      .order("created_at", { ascending: false })
      .then(function (res) {
        if (res.error) return console.warn(res.error);
        var rows = res.data || [];
        document.querySelectorAll("[data-comment-count]").forEach(function (el) {
          el.textContent = rows.length;
        });
        var list = document.querySelector("[data-comment-list]");
        if (!list) return;
        if (!rows.length) {
          list.innerHTML = '<div class="comment-empty">첫 댓글을 남겨보세요.</div>';
          return;
        }
        list.innerHTML = rows
          .map(function (c) {
            return (
              '<div class="comment-item">' +
              '<div class="comment-meta"><span class="comment-name">' +
              escapeHtml(c.name || "익명") +
              '</span><span class="comment-date">' +
              formatDate(c.created_at) +
              "</span></div>" +
              '<div class="comment-content">' +
              escapeHtml(c.content) +
              "</div>" +
              "</div>"
            );
          })
          .join("");
      });
  }
  loadComments();

  var form = document.querySelector("[data-comment-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameInput = form.querySelector('[name="name"]');
      var contentInput = form.querySelector('[name="content"]');
      var name = (nameInput.value || "").trim().slice(0, 24) || "익명";
      var content = (contentInput.value || "").trim().slice(0, 500);
      if (!content) return;
      var submitBtn = form.querySelector(".comment-submit");
      if (submitBtn) submitBtn.disabled = true;
      client
        .from("comments")
        .insert({ slug: slug, name: name, content: content })
        .then(function (res) {
          if (submitBtn) submitBtn.disabled = false;
          if (res.error) return console.warn(res.error);
          contentInput.value = "";
          loadComments();
        });
    });
  }
})();

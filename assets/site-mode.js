"use strict";
(function () {
  var cfg = typeof SITE_CONFIG !== "undefined" && SITE_CONFIG ? SITE_CONFIG : {};
  var mode = cfg.mode === "problems" ? "problems" : "contributions";
  document.documentElement.setAttribute("data-site-mode", mode);

  function applyHomeMeta() {
    var m =
      document.documentElement.getAttribute("data-site-mode") === "problems"
        ? "problems"
        : "contributions";
    var hd = cfg.homeDocument;
    if (!hd || !document.body || document.body.id !== "page-home") return;
    var block = m === "problems" ? hd.problems : hd.contributions;
    if (!block) return;
    if (block.title) document.title = block.title;
    if (block.description) {
      var md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute("content", block.description);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyHomeMeta);
  } else {
    applyHomeMeta();
  }
})();

"use strict";
(() => {
  // src/constants.ts
  var SERIES_TOTAL_DEFAULT = 108;
  var FIRST_PROBLEM_OPENS_TITLE = "First problem opens 7 May 2026, 00:00 IST.";

  // src/lib/html.ts
  function escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[c]
    );
  }
  function clamp(n, lo, hi) {
    if (!Number.isFinite(n)) return lo;
    return Math.min(hi, Math.max(lo, n));
  }

  // src/browser/app.ts
  function getSeriesTotal() {
    if (typeof SERIES_TOTAL === "number" && SERIES_TOTAL > 0) return SERIES_TOTAL;
    if (Array.isArray(PROBLEM_CATALOG) && PROBLEM_CATALOG.length) return PROBLEM_CATALOG.length;
    return SERIES_TOTAL_DEFAULT;
  }
  function getCatalog() {
    if (Array.isArray(PROBLEM_CATALOG) && PROBLEM_CATALOG.length) return PROBLEM_CATALOG;
    if (Array.isArray(PROBLEMS)) {
      return PROBLEMS.map(({ n, title, tag }) => ({
        n,
        title,
        tag
      }));
    }
    return [];
  }
  function findCatalog(n) {
    return getCatalog().find((p) => p.n === n) ?? null;
  }
  function findDetail(n) {
    if (!Array.isArray(PROBLEMS)) return null;
    const d = PROBLEMS.find((p) => p.n === n);
    return d && typeof d.body === "string" && d.body.length ? d : null;
  }
  function maxReveal() {
    const total = getSeriesTotal();
    return typeof maxRevealedN === "function" ? maxRevealedN(void 0, total) : total;
  }
  function opensLineForN(n) {
    return typeof unlockDateLineForProblemN === "function" ? unlockDateLineForProblemN(n) : "";
  }
  function typesetMath(node) {
    if (!node || typeof window === "undefined") return;
    const el = node;
    function run() {
      const mj2 = window.MathJax;
      if (!mj2 || typeof mj2.typesetPromise !== "function") return false;
      void mj2.typesetPromise([el]).catch((err) => console.warn("[mathjax]", err));
      return true;
    }
    if (run()) return;
    const mj = window.MathJax;
    if (mj?.startup?.promise && typeof mj.startup.promise.then === "function") {
      void mj.startup.promise.then(run);
      return;
    }
    let tries = 0;
    const id = window.setInterval(() => {
      tries += 1;
      if (run() || tries > 80) window.clearInterval(id);
    }, 50);
  }
  function rowInnerHtml(p, secondaryLine) {
    const num = String(p.n).padStart(3, "0");
    const sec = secondaryLine ? `<span class="problem-row-meta">${escapeHtml(secondaryLine)}</span>` : "";
    return `
    <span class="pn">${num}</span>
    <span class="pt">${escapeHtml(p.title)}${sec}</span>
  `;
  }
  function appendRow(ol, p, opts) {
    const li = document.createElement("li");
    const cls = opts.href ? "problem-row" : "problem-row problem-row--locked";
    const inner = rowInnerHtml(p, opts.secondaryLine);
    if (opts.href) {
      const a = document.createElement("a");
      a.className = cls;
      a.href = opts.href;
      a.innerHTML = inner;
      li.appendChild(a);
    } else {
      const span = document.createElement("span");
      span.className = cls;
      span.innerHTML = inner;
      li.appendChild(span);
    }
    ol.appendChild(li);
  }
  function renderIndex() {
    const cap = maxReveal();
    const cat = getCatalog();
    const released = cat.filter((p) => p.n <= cap).sort((a, b) => a.n - b.n);
    const latest = released[released.length - 1];
    const link = document.getElementById("hero-today-link");
    if (!link) return;
    if (latest && findDetail(latest.n)) {
      link.href = `problem.html?n=${latest.n}`;
      link.removeAttribute("title");
      return;
    }
    link.href = "archive.html";
    link.title = cap < 1 ? FIRST_PROBLEM_OPENS_TITLE : "Open the archive for dates and links.";
  }
  function renderArchive() {
    const root = document.getElementById("archive-list");
    if (!root) return;
    const total = getSeriesTotal();
    const released = getCatalog().filter((p) => findDetail(p.n)).sort((a, b) => a.n - b.n);
    root.innerHTML = "";
    if (!released.length) {
      const empty = document.createElement("p");
      empty.className = "problems-empty";
      empty.textContent = "Nothing here yet \u2014 problems appear as each daily publication adds them.";
      root.appendChild(empty);
    } else {
      const ol = document.createElement("ol");
      ol.className = "problem-list";
      for (const p of released) {
        appendRow(ol, p, {
          href: `problem.html?n=${p.n}`,
          secondaryLine: null
        });
      }
      root.appendChild(ol);
    }
    const meta = document.getElementById("archive-meta");
    if (meta) {
      meta.textContent = released.length === 0 ? `108 problems over the season \u2014 published here one by one.` : `${released.length} published \xB7 ${total} total over the season.`;
    }
  }
  function renderProblem() {
    const root = document.getElementById("problem");
    if (!root) return;
    const total = getSeriesTotal();
    const n = clamp(parseInt(new URLSearchParams(location.search).get("n") ?? "", 10), 1, total);
    const meta = findCatalog(n);
    if (!meta) {
      root.innerHTML = `<p>Problem ${n} not found.</p>`;
      return;
    }
    const detail = findDetail(n);
    const cap = maxReveal();
    if (detail) {
      document.title = `${n}. ${meta.title} \xB7 Project Brahmagupta`;
      root.innerHTML = `<h1>${escapeHtml(meta.title)}</h1>`;
      const bodyEl = document.createElement("div");
      bodyEl.className = "body problem-tex";
      bodyEl.textContent = detail.body;
      root.appendChild(bodyEl);
      typesetMath(bodyEl);
    } else {
      const opened = n <= cap;
      document.title = opened ? `${n}. ${meta.title} \xB7 Project Brahmagupta` : `Problem ${n} \xB7 Project Brahmagupta`;
      const when = escapeHtml(opensLineForN(n) || "");
      const note = opened ? `Statement not in this bundle yet \u2014 same calendar as below \xB7 <strong>${when}</strong>` : `Not yet available \xB7 opens <strong>${when}</strong>`;
      root.innerHTML = `<h1>${escapeHtml(meta.title)}</h1><p class="problem-locked-lede">${note}</p><p class="problem-locked-hint"><a href="./archive.html">\u2190 Archive</a></p>`;
    }
    const pos = document.getElementById("problem-pos");
    if (pos) pos.textContent = `${n} of ${total}`;
    const prevHref = n > 1 && findDetail(n - 1) ? `problem.html?n=${n - 1}` : null;
    const nextHref = n < total && findDetail(n + 1) ? `problem.html?n=${n + 1}` : null;
    setPager("prev-link", prevHref);
    setPager("prev-link-2", prevHref);
    setPager("next-link", nextHref);
    setPager("next-link-2", nextHref);
    document.addEventListener(
      "keydown",
      function onKey(e) {
        const t = e.target;
        if (t && /input|textarea|select/i.test(t.tagName)) return;
        if (e.key === "ArrowLeft" && prevHref) location.href = prevHref;
        if (e.key === "ArrowRight" && nextHref) location.href = nextHref;
      },
      { once: true }
    );
  }
  function setPager(id, href) {
    const node = document.getElementById(id);
    if (!node) return;
    if (href) {
      node.href = href;
      node.classList.remove("disabled");
    } else {
      node.removeAttribute("href");
      node.classList.add("disabled");
    }
  }
  Object.assign(globalThis, { renderIndex, renderArchive, renderProblem });
})();

"use strict";
(() => {
  // src/browser/tex-render.ts
  function texColor(name) {
    const trimmed = name.trim();
    return /^gr[ae]y$/i.test(trimmed) ? "#9a988c" : trimmed;
  }
  var WRAP_TAGS = {
    emph: "em",
    textit: "em",
    textbf: "strong",
    texttt: "code",
    textsc: "span",
    underline: "u"
  };
  function readGroup(s, brace) {
    let depth = 1;
    let i = brace + 1;
    const start = i;
    while (i < s.length && depth > 0) {
      const c = s[i];
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) break;
      }
      i++;
    }
    return { inner: s.slice(start, i), end: i + 1 };
  }
  function renderInline(el, body) {
    const token = /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\$[^$]*\$|\\begin\{([a-zA-Z*]+)\}[\s\S]*?\\end\{\1\}|\\(emph|textit|textbf|texttt|textsc|underline|fontcolor)\s*\{/g;
    let cursor = 0;
    let m;
    while ((m = token.exec(body)) !== null) {
      const name = m[2];
      if (name === void 0) continue;
      if (m.index > cursor) {
        el.appendChild(document.createTextNode(body.slice(cursor, m.index)));
      }
      if (name === "fontcolor") {
        const color = readGroup(body, token.lastIndex - 1);
        let j = color.end;
        while (j < body.length && /\s/.test(body[j])) j++;
        if (body[j] !== "{") {
          el.appendChild(document.createTextNode(m[0]));
          cursor = token.lastIndex;
          continue;
        }
        const text = readGroup(body, j);
        const span = document.createElement("span");
        span.className = "tex-fontcolor";
        span.style.color = texColor(color.inner);
        renderInline(span, text.inner);
        el.appendChild(span);
        cursor = text.end;
      } else {
        const g = readGroup(body, token.lastIndex - 1);
        const node = document.createElement(WRAP_TAGS[name]);
        if (name === "textsc") node.style.fontVariant = "small-caps";
        renderInline(node, g.inner);
        el.appendChild(node);
        cursor = g.end;
      }
      token.lastIndex = cursor;
    }
    if (cursor < body.length) {
      el.appendChild(document.createTextNode(body.slice(cursor)));
    }
  }
  function listItems(inner) {
    return inner.split(/\\item\b/).map((s) => s.trim()).filter((s) => s.length > 0);
  }
  function renderTexBody(el, body) {
    const listRe = /\\begin\{(enumerate|itemize)\}([\s\S]*?)\\end\{\1\}/g;
    let cursor = 0;
    let m;
    while ((m = listRe.exec(body)) !== null) {
      if (m.index > cursor) {
        renderInline(el, body.slice(cursor, m.index));
      }
      const list = document.createElement(m[1] === "enumerate" ? "ol" : "ul");
      for (const item of listItems(m[2] ?? "")) {
        const li = document.createElement("li");
        renderInline(li, item);
        list.appendChild(li);
      }
      el.appendChild(list);
      cursor = listRe.lastIndex;
    }
    if (cursor < body.length) {
      renderInline(el, body.slice(cursor));
    }
  }
  Object.assign(globalThis, { texColor, renderTexBody });

  // src/constants.ts
  var SERIES_TOTAL_DEFAULT = 108;
  var FIRST_PROBLEM_OPENS_TITLE = "First problem opens 1 July 2026, 00:00 IST.";

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
      return PROBLEMS.map(({ n, title }) => ({
        n,
        title
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
  function siteMode() {
    const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : void 0;
    return cfg?.mode === "problems" ? "problems" : "contributions";
  }
  function backFromProblemHref() {
    return siteMode() === "problems" ? "./archive.html" : "./";
  }
  function backFromProblemLabel() {
    return siteMode() === "problems" ? "\u2190 Archive" : "\u2190 Home";
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
      empty.textContent = "Nothing here yet. Problems appear as each daily publication adds them.";
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
      meta.textContent = released.length === 0 ? `108 problems over the season, published here one by one.` : `${released.length} published \xB7 ${total} total over the season.`;
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
      renderTexBody(bodyEl, detail.body);
      root.appendChild(bodyEl);
    } else {
      const opened = n <= cap;
      document.title = opened ? `${n}. ${meta.title} \xB7 Project Brahmagupta` : `Problem ${n} \xB7 Project Brahmagupta`;
      const when = escapeHtml(opensLineForN(n) || "");
      const note = opened ? `Statement not in this bundle yet, same calendar as below \xB7 <strong>${when}</strong>` : `Not yet available \xB7 opens <strong>${when}</strong>`;
      const heading = opened && meta.title ? meta.title : `Problem ${n}`;
      const backHref = escapeHtml(backFromProblemHref());
      const backLabel = escapeHtml(backFromProblemLabel());
      root.innerHTML = `<h1>${escapeHtml(heading)}</h1><p class="problem-locked-lede">${note}</p><p class="problem-locked-hint"><a href="${backHref}">${backLabel}</a></p>`;
    }
    typesetMath(root);
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

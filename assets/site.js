"use strict";

window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true,
    tags: "none",
  },
  options: { skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"] },
  startup: { typeset: true },
};

(function () {
  var DAY_MS = 86400000;
  var DEVANAGARI = "०१२३४५६७८९";

  var problems = Array.isArray(window.PROBLEMS) ? window.PROBLEMS : [];
  var total = window.SERIES_TOTAL || 108;
  var byN = new Map(problems.map(function (p) { return [p.n, p]; }));

  function devanagari(n) {
    return String(n).replace(/\d/g, function (d) { return DEVANAGARI[+d]; });
  }

  function unlockMs(n) {
    return window.SERIES_START_MS + (n - 1) * DAY_MS;
  }

  function unlockLine(n) {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(unlockMs(n))) + ", 00:00 IST";
  }

  function pending(n) {
    return unlockMs(n) > Date.now() ? "Opens " + unlockLine(n) : "Not published yet";
  }

  var TAGS = {
    emph: "em", textit: "em", textbf: "strong",
    texttt: "code", textsc: "span", underline: "u",
  };

  var TOKEN = /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\$[^$]*\$|\\begin\{([a-zA-Z*]+)\}[\s\S]*?\\end\{\1\}|\\(emph|textit|textbf|texttt|textsc|underline|fontcolor)\s*\{/;

  function group(s, open) {
    var depth = 1;
    var i = open + 1;
    for (; i < s.length && depth > 0; i++) {
      if (s[i] === "\\") i++;
      else if (s[i] === "{") depth++;
      else if (s[i] === "}" && --depth === 0) break;
    }
    return { inner: s.slice(open + 1, i), end: i + 1 };
  }

  function renderInline(el, tex) {
    var token = new RegExp(TOKEN.source, "g");
    var cursor = 0;
    var m;

    while ((m = token.exec(tex)) !== null) {
      var name = m[2];
      if (name === undefined) continue;

      if (m.index > cursor) el.appendChild(document.createTextNode(tex.slice(cursor, m.index)));

      var g = group(tex, token.lastIndex - 1);
      var node;

      if (name === "fontcolor") {
        var after = /^\s*\{/.exec(tex.slice(g.end));
        if (!after) {
          el.appendChild(document.createTextNode(m[0]));
          cursor = token.lastIndex;
          continue;
        }
        var text = group(tex, g.end + after[0].length - 1);
        node = document.createElement("span");
        node.style.color = /^gr[ae]y$/i.test(g.inner.trim()) ? "var(--text-muted)" : g.inner.trim();
        renderInline(node, text.inner);
        cursor = text.end;
      } else {
        node = document.createElement(TAGS[name]);
        if (name === "textsc") node.style.fontVariant = "small-caps";
        renderInline(node, g.inner);
        cursor = g.end;
      }

      el.appendChild(node);
      token.lastIndex = cursor;
    }

    if (cursor < tex.length) el.appendChild(document.createTextNode(tex.slice(cursor)));
  }

  function renderTex(el, tex) {
    var lists = /\\begin\{(enumerate|itemize)\}([\s\S]*?)\\end\{\1\}/g;
    var cursor = 0;
    var m;

    while ((m = lists.exec(tex)) !== null) {
      if (m.index > cursor) renderInline(el, tex.slice(cursor, m.index));

      var list = document.createElement(m[1] === "enumerate" ? "ol" : "ul");
      m[2].split(/\\item\b/).forEach(function (item) {
        if (!item.trim()) return;
        var li = document.createElement("li");
        renderInline(li, item.trim());
        list.appendChild(li);
      });
      el.appendChild(list);

      cursor = lists.lastIndex;
    }

    if (cursor < tex.length) renderInline(el, tex.slice(cursor));
  }

  function plainTitle(title) {
    return title.replace(/\\[()[\]]|\$/g, "").replace(/\\([a-zA-Z]+)/g, "$1").trim();
  }

  function teaser(tex, max) {
    var flat = tex
      .replace(/\\\[([\s\S]*?)\\\]/g, "\\($1\\)")
      .replace(/\$\$([\s\S]*?)\$\$/g, "\\($1\\)")
      .replace(/\\(?:begin|end)\{(?:enumerate|itemize)\}/g, " ")
      .replace(/\\item\s*/g, "· ")
      .replace(/\s+/g, " ")
      .trim();
    if (flat.length <= max) return flat;

    var cut = max;
    var spans = /\\\([\s\S]*?\\\)|\$[^$]*\$|\\[a-zA-Z]+\{[^{}]*\}(?:\s*\{[^{}]*\})?/g;
    var m;
    while ((m = spans.exec(flat)) !== null) {
      if (m.index >= cut) break;
      if (m.index + m[0].length > cut) { cut = m.index; break; }
    }

    var space = flat.lastIndexOf(" ", cut);
    if (space > max * 0.6) cut = space;
    return flat.slice(0, cut).replace(/[\s.,;:]+$/, "") + "…";
  }

  function scroller(root) {
    var track = root.querySelector("[data-track]");
    var prev = root.querySelector("[data-prev]");
    var next = root.querySelector("[data-next]");

    if (track.children.length <= 3) {
      root.classList.add("is-static");
      return;
    }

    function sync() {
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    }

    prev.addEventListener("click", function () { track.scrollBy({ left: -track.clientWidth, behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: track.clientWidth, behavior: "smooth" }); });
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }

  function slideshow(root, startAt) {
    var slides = [].slice.call(root.querySelectorAll("[data-slide]"));
    var dots = root.querySelector("[data-dots]");
    var index = 0;

    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.textContent = String(i + 1);
      dot.setAttribute("aria-label", "Sample " + (i + 1));
      dot.addEventListener("click", function () { show(i); });
      dots.appendChild(dot);
    });

    function show(to) {
      index = (to + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
      [].forEach.call(dots.children, function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    root.querySelector("[data-prev]").addEventListener("click", function () { show(index - 1); });
    root.querySelector("[data-next]").addEventListener("click", function () { show(index + 1); });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "ArrowRight") show(index + 1);
      else return;
      e.preventDefault();
    });

    show(startAt || 0);
  }

  function problemCard(p) {
    var card = document.createElement("a");
    card.className = "card";
    card.href = "problem.html?n=" + p.n;
    card.innerHTML =
      '<span class="card__n">Problem ' + String(p.n).padStart(3, "0") + "</span>" +
      '<h3 class="card__title"></h3>' +
      '<div class="card__body tex"></div>' +
      '<span class="card__cta">View problem →</span>';
    card.querySelector(".card__title").textContent = p.title || "Problem " + p.n;
    renderTex(card.querySelector(".card__body"), teaser(p.body, 168));
    return card;
  }

  function home() {
    var grid = document.getElementById("cell-grid");
    var frag = document.createDocumentFragment();

    for (var n = 1; n <= total; n++) {
      var open = byN.has(n);
      var cell = document.createElement(open ? "a" : "span");
      cell.className = "cell" + (open ? " cell--open" : "");
      cell.lang = "sa";
      cell.textContent = devanagari(n);
      cell.style.setProperty("--delay", String(Math.floor((n - 1) / 12) + ((n - 1) % 12)));

      if (open) {
        cell.href = "problem.html?n=" + n;
        cell.setAttribute("aria-label", "Problem " + n + ": " + plainTitle(byN.get(n).title));
      } else {
        var why = pending(n);
        cell.title = why;
        cell.setAttribute("aria-label", "Problem " + n + " — " + why);
      }
      frag.appendChild(cell);
    }
    grid.appendChild(frag);

    var track = document.getElementById("problems-track");
    problems.forEach(function (p) { track.appendChild(problemCard(p)); });
    scroller(document.getElementById("problems-carousel"));
  }

  function archive() {
    var root = document.getElementById("archive-list");
    var meta = document.getElementById("archive-meta");

    meta.textContent = problems.length
      ? problems.length + " published · " + total + " total over the season."
      : total + " problems over the season, published here one by one.";

    if (!problems.length) {
      root.innerHTML = '<p class="empty">Nothing here yet. Problems appear as each day unlocks.</p>';
      return;
    }

    var list = document.createElement("ol");
    list.className = "problem-list";
    problems.forEach(function (p) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "problem.html?n=" + p.n;
      a.innerHTML = '<span class="pn"></span><span class="pt"></span>';
      a.querySelector(".pn").textContent = String(p.n).padStart(3, "0");
      a.querySelector(".pt").textContent = p.title;
      li.appendChild(a);
      list.appendChild(li);
    });
    root.appendChild(list);
  }

  function problem() {
    var root = document.getElementById("problem");
    var n = Math.min(Math.max(parseInt(new URLSearchParams(location.search).get("n"), 10) || 1, 1), total);
    var p = byN.get(n);
    var heading = document.createElement("h1");

    if (p) {
      document.title = n + ". " + plainTitle(p.title) + " · Project Brahmagupta";
      heading.textContent = p.title;
      var body = document.createElement("div");
      body.className = "tex";
      renderTex(body, p.body);
      root.replaceChildren(heading, body);
    } else {
      document.title = "Problem " + n + " · Project Brahmagupta";
      heading.textContent = "Problem " + n;
      var note = document.createElement("p");
      note.className = "locked";
      note.textContent = pending(n) + ".";
      root.replaceChildren(heading, note);
    }

    document.getElementById("problem-pos").textContent = n + " of " + total;

    var prev = byN.has(n - 1) ? "problem.html?n=" + (n - 1) : null;
    var next = byN.has(n + 1) ? "problem.html?n=" + (n + 1) : null;
    [].forEach.call(document.querySelectorAll("[data-prev-link]"), function (a) { setLink(a, prev); });
    [].forEach.call(document.querySelectorAll("[data-next-link]"), function (a) { setLink(a, next); });

    document.addEventListener("keydown", function (e) {
      if (/input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === "ArrowLeft" && prev) location.href = prev;
      if (e.key === "ArrowRight" && next) location.href = next;
    });
  }

  function setLink(a, href) {
    if (href) a.href = href;
    else a.removeAttribute("href");
    a.classList.toggle("is-disabled", !href);
  }

  function contribute() {
    var root = document.querySelector(".samples");
    var track = document.getElementById("samples-track");
    var samples = problems.slice(0, 3);

    if (samples.length) {
      samples.forEach(function (p, i) {
        var slide = document.createElement("article");
        slide.className = "samples__slide";
        slide.setAttribute("data-slide", "");
        slide.innerHTML = '<p class="samples__meta"></p><div class="tex"></div>';
        slide.querySelector(".samples__meta").textContent = "Sample 0." + (i + 1) + " · " + p.title;
        renderTex(slide.querySelector(".tex"), p.body);
        track.appendChild(slide);
      });
      var want = parseInt(new URLSearchParams(location.search).get("sample"), 10);
      slideshow(root, want >= 1 && want <= samples.length ? want - 1 : 0);
    } else {
      root.hidden = true;
    }

    var form = document.getElementById("contribute-form");
    var message = document.getElementById("form-message");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var field = function (id) { return document.getElementById(id).value.trim(); };
      var title = field("cf-title");
      var statement = field("cf-statement");

      if (!title || !statement) {
        message.textContent = "Please give at least a title and a problem statement.";
        return;
      }

      var body = [
        "Title: " + title,
        field("cf-source") && "Source: " + field("cf-source"),
        "\nStatement:\n" + statement,
        field("cf-answer") && "\nAnswer: " + field("cf-answer"),
        field("cf-notes") && "\nNotes:\n" + field("cf-notes"),
        field("cf-name") && "\nSubmitted by: " + field("cf-name"),
      ].filter(Boolean).join("\n");

      message.textContent = "Opening your mail client…";
      location.href =
        "mailto:" + form.dataset.recipient +
        "?subject=" + encodeURIComponent("[contribute] " + title) +
        "&body=" + encodeURIComponent(body);
    });
  }

  ({ home: home, archive: archive, problem: problem, contribute: contribute }[document.body.dataset.page] || function () {})();
})();

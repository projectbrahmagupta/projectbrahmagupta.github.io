/// <reference path="./globals.d.ts" />

import type { ProblemCatalogEntry, ProblemPublished } from "../types.js";
import { FIRST_PROBLEM_OPENS_TITLE, SERIES_TOTAL_DEFAULT } from "../constants.js";
import { clamp, escapeHtml } from "../lib/html.js";

function getSeriesTotal(): number {
  if (typeof SERIES_TOTAL === "number" && SERIES_TOTAL > 0) return SERIES_TOTAL;
  if (Array.isArray(PROBLEM_CATALOG) && PROBLEM_CATALOG.length) return PROBLEM_CATALOG.length;
  return SERIES_TOTAL_DEFAULT;
}

function getCatalog(): ProblemCatalogEntry[] {
  if (Array.isArray(PROBLEM_CATALOG) && PROBLEM_CATALOG.length) return PROBLEM_CATALOG;
  if (Array.isArray(PROBLEMS)) {
    return PROBLEMS.map(({ n, title, tag }) => ({
      n,
      title,
      tag,
    }));
  }
  return [];
}

function findCatalog(n: number): ProblemCatalogEntry | null {
  return getCatalog().find((p) => p.n === n) ?? null;
}

function findDetail(n: number): ProblemPublished | null {
  if (!Array.isArray(PROBLEMS)) return null;
  const d = PROBLEMS.find((p) => p.n === n);
  return d && typeof d.body === "string" && d.body.length ? d : null;
}

function siteMode(): "contributions" | "problems" {
  const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : undefined;
  return cfg?.mode === "problems" ? "problems" : "contributions";
}

function backFromProblemHref(): string {
  return siteMode() === "problems" ? "./archive.html" : "./";
}

function backFromProblemLabel(): string {
  return siteMode() === "problems" ? "← Archive" : "← Home";
}

function maxReveal(): number {
  const total = getSeriesTotal();
  return typeof maxRevealedN === "function" ? maxRevealedN(undefined, total) : total;
}

function opensLineForN(n: number): string {
  return typeof unlockDateLineForProblemN === "function" ? unlockDateLineForProblemN(n) : "";
}

function typesetMath(node: Element | null): void {
  if (!node || typeof window === "undefined") return;
  const el = node;

  function run(): boolean {
    const mj = window.MathJax;
    if (!mj || typeof mj.typesetPromise !== "function") return false;
    void mj.typesetPromise([el]).catch((err: unknown) => console.warn("[mathjax]", err));
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

function rowInnerHtml(p: ProblemCatalogEntry, secondaryLine: string | null): string {
  const num = String(p.n).padStart(3, "0");
  const sec = secondaryLine
    ? `<span class="problem-row-meta">${escapeHtml(secondaryLine)}</span>`
    : "";
  return `
    <span class="pn">${num}</span>
    <span class="pt">${escapeHtml(p.title)}${sec}</span>
  `;
}

function appendRow(
  ol: HTMLOListElement,
  p: ProblemCatalogEntry,
  opts: { href: string | null; secondaryLine: string | null },
): void {
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

function renderIndex(): void {
  const cap = maxReveal();
  const cat = getCatalog();
  const released = cat.filter((p) => p.n <= cap).sort((a, b) => a.n - b.n);
  const latest = released[released.length - 1];

  const link = document.getElementById("hero-today-link") as HTMLAnchorElement | null;
  if (!link) return;

  if (latest && findDetail(latest.n)) {
    link.href = `problem.html?n=${latest.n}`;
    link.removeAttribute("title");
    return;
  }
  link.href = "archive.html";
  link.title =
    cap < 1 ? FIRST_PROBLEM_OPENS_TITLE : "Open the archive for dates and links.";
}

function renderArchive(): void {
  const root = document.getElementById("archive-list");
  if (!root) return;

  const total = getSeriesTotal();
  const released = getCatalog()
    .filter((p) => findDetail(p.n))
    .sort((a, b) => a.n - b.n);

  root.innerHTML = "";

  if (!released.length) {
    const empty = document.createElement("p");
    empty.className = "problems-empty";
    empty.textContent =
      "Nothing here yet — problems appear as each daily publication adds them.";
    root.appendChild(empty);
  } else {
    const ol = document.createElement("ol");
    ol.className = "problem-list";
    for (const p of released) {
      appendRow(ol, p, {
        href: `problem.html?n=${p.n}`,
        secondaryLine: null,
      });
    }
    root.appendChild(ol);
  }

  const meta = document.getElementById("archive-meta");
  if (meta) {
    meta.textContent =
      released.length === 0
        ? `108 problems over the season — published here one by one.`
        : `${released.length} published · ${total} total over the season.`;
  }
}

function renderProblem(): void {
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
    document.title = `${n}. ${meta.title} · Project Brahmagupta`;
    root.innerHTML = `<h1>${escapeHtml(meta.title)}</h1>`;
    const bodyEl = document.createElement("div");
    bodyEl.className = "body problem-tex";
    bodyEl.textContent = detail.body;
    root.appendChild(bodyEl);
    typesetMath(bodyEl);
  } else {
    const opened = n <= cap;
    document.title = opened
      ? `${n}. ${meta.title} · Project Brahmagupta`
      : `Problem ${n} · Project Brahmagupta`;
    const when = escapeHtml(opensLineForN(n) || "");
    const note = opened
      ? `Statement not in this bundle yet — same calendar as below · <strong>${when}</strong>`
      : `Not yet available · opens <strong>${when}</strong>`;
    const backHref = escapeHtml(backFromProblemHref());
    const backLabel = escapeHtml(backFromProblemLabel());
    root.innerHTML =
      `<h1>${escapeHtml(meta.title)}</h1>` +
      `<p class="problem-locked-lede">${note}</p>` +
      `<p class="problem-locked-hint"><a href="${backHref}">${backLabel}</a></p>`;
  }

  const pos = document.getElementById("problem-pos");
  if (pos) pos.textContent = `${n} of ${total}`;

  const prevHref =
    n > 1 && findDetail(n - 1) ? `problem.html?n=${n - 1}` : null;
  const nextHref =
    n < total && findDetail(n + 1) ? `problem.html?n=${n + 1}` : null;
  setPager("prev-link", prevHref);
  setPager("prev-link-2", prevHref);
  setPager("next-link", nextHref);
  setPager("next-link-2", nextHref);

  document.addEventListener(
    "keydown",
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && /input|textarea|select/i.test(t.tagName)) return;
      if (e.key === "ArrowLeft" && prevHref) location.href = prevHref;
      if (e.key === "ArrowRight" && nextHref) location.href = nextHref;
    },
    { once: true },
  );
}

function setPager(id: string, href: string | null): void {
  const node = document.getElementById(id) as HTMLAnchorElement | null;
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

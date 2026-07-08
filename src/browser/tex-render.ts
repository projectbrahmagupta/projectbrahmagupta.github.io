/** Map a `\fontcolor{...}` token to a CSS color, theming a couple of friendly names. */
export function texColor(name: string): string {
  const trimmed = name.trim();
  return /^gr[ae]y$/i.test(trimmed) ? "#9a988c" : trimmed;
}

/**
 * Render a run of body text into `el`, turning `\fontcolor{color}{text}` into
 * colored spans while leaving everything else as text so MathJax still typesets
 * the math. Does not handle list environments — see renderTexBody.
 */
function renderInline(el: HTMLElement, body: string): void {
  const open = /\\fontcolor\s*\{([^}]*)\}\s*\{/g;
  let cursor = 0;
  let m: RegExpExecArray | null;

  while ((m = open.exec(body)) !== null) {
    if (m.index > cursor) {
      el.appendChild(document.createTextNode(body.slice(cursor, m.index)));
    }

    const contentStart = open.lastIndex;
    let depth = 1;
    let i = contentStart;
    while (i < body.length && depth > 0) {
      const c = body[i]!;
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (c === "{") depth++;
      else if (c === "}") depth--;
      if (depth === 0) break;
      i++;
    }

    const span = document.createElement("span");
    span.className = "tex-fontcolor";
    span.style.color = texColor(m[1] ?? "");
    span.textContent = body.slice(contentStart, i);
    el.appendChild(span);

    cursor = i + 1;
    open.lastIndex = cursor;
  }

  if (cursor < body.length) {
    el.appendChild(document.createTextNode(body.slice(cursor)));
  }
}

/**
 * Split the inner text of a list environment into item strings, dropping the
 * whitespace preamble before the first `\item`.
 */
function listItems(inner: string): string[] {
  return inner
    .split(/\\item\b/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Render a problem body into `el`. List environments (`enumerate`/`itemize`)
 * become real `<ol>`/`<ul>` elements: MathJax has no such environments, so
 * leaving them as text raises "Unknown environment 'enumerate'". Everything
 * else (inline/display math, `\fontcolor`) is left for renderInline + MathJax.
 */
export function renderTexBody(el: HTMLElement, body: string): void {
  const listRe = /\\begin\{(enumerate|itemize)\}([\s\S]*?)\\end\{\1\}/g;
  let cursor = 0;
  let m: RegExpExecArray | null;

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

// Expose on globalThis so standalone pages (e.g. contribute.html) can use the same
// renderer via the assets/tex-render.js bundle without re-implementing it inline.
Object.assign(globalThis, { texColor, renderTexBody });

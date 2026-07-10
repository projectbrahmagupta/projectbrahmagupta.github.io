/** Map a `\fontcolor{...}` token to a CSS color, theming a couple of friendly names. */
export function texColor(name: string): string {
  const trimmed = name.trim();
  return /^gr[ae]y$/i.test(trimmed) ? "#9a988c" : trimmed;
}

/** Text-mode LaTeX markup commands, mapped to the inline HTML element they become. */
const WRAP_TAGS: Record<string, string> = {
  emph: "em",
  textit: "em",
  textbf: "strong",
  texttt: "code",
  textsc: "span",
  underline: "u",
};

/** Read a `{...}` group starting at the `{` index; returns inner text and the index past the closing `}`. Honors `\` escapes. */
function readGroup(s: string, brace: number): { inner: string; end: number } {
  let depth = 1;
  let i = brace + 1;
  const start = i;
  while (i < s.length && depth > 0) {
    const c = s[i]!;
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

/**
 * Render a run of body text into `el`: translate text-mode markup (`\emph`,
 * `\textbf`, `\textit`, `\texttt`, `\textsc`, `\underline`, `\fontcolor`) to HTML
 * and recurse into it, while leaving math spans (`\(…\)`, `\[…\]`, `$…$`, math
 * environments) untouched as text for MathJax. The tokenizer consumes whole math
 * spans, so command-like text inside them is never rewritten.
 */
function renderInline(el: HTMLElement, body: string): void {
  const token =
    /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\$[^$]*\$|\\begin\{([a-zA-Z*]+)\}[\s\S]*?\\end\{\1\}|\\(emph|textit|textbf|texttt|textsc|underline|fontcolor)\s*\{/g;
  let cursor = 0;
  let m: RegExpExecArray | null;

  while ((m = token.exec(body)) !== null) {
    const name = m[2];
    if (name === undefined) continue; // math span / environment: leave for MathJax

    if (m.index > cursor) {
      el.appendChild(document.createTextNode(body.slice(cursor, m.index)));
    }

    if (name === "fontcolor") {
      const color = readGroup(body, token.lastIndex - 1);
      let j = color.end;
      while (j < body.length && /\s/.test(body[j]!)) j++;
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
      const node = document.createElement(WRAP_TAGS[name]!);
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

/** Split the inner text of a list environment into item strings, dropping the preamble before the first `\item`. */
function listItems(inner: string): string[] {
  return inner
    .split(/\\item\b/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Render a problem body into `el`. List environments (`enumerate`/`itemize`)
 * become real `<ol>`/`<ul>` — MathJax has no such environments, so leaving them
 * as text raises "Unknown environment". Everything else goes through renderInline.
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

Object.assign(globalThis, { texColor, renderTexBody });

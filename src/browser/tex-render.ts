/** Map a `\fontcolor{...}` token to a CSS color, theming a couple of friendly names. */
export function texColor(name: string): string {
  const trimmed = name.trim();
  return /^gr[ae]y$/i.test(trimmed) ? "#9a988c" : trimmed;
}

/**
 * Render a problem body into `el`, turning `\fontcolor{color}{text}` into colored
 * spans while leaving everything else as text so MathJax still typesets the math.
 */
export function renderTexBody(el: HTMLElement, body: string): void {
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

// Expose on globalThis so standalone pages (e.g. contribute.html) can use the same
// renderer via the assets/tex-render.js bundle without re-implementing it inline.
Object.assign(globalThis, { texColor, renderTexBody });

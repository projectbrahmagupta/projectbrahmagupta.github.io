"use strict";
(() => {
  // src/browser/tex-render.ts
  function texColor(name) {
    const trimmed = name.trim();
    return /^gr[ae]y$/i.test(trimmed) ? "#9a988c" : trimmed;
  }
  function renderTexBody(el, body) {
    const open = /\\fontcolor\s*\{([^}]*)\}\s*\{/g;
    let cursor = 0;
    let m;
    while ((m = open.exec(body)) !== null) {
      if (m.index > cursor) {
        el.appendChild(document.createTextNode(body.slice(cursor, m.index)));
      }
      const contentStart = open.lastIndex;
      let depth = 1;
      let i = contentStart;
      while (i < body.length && depth > 0) {
        const c = body[i];
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
  Object.assign(globalThis, { texColor, renderTexBody });
})();

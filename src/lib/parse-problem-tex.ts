/** Parsed `problems/p###.tex` after comment stripping. */

export type ParsedProblemTex =
  | { mode: "environment"; title: string; body: string }
  | { mode: "raw"; body: string };

const BEGIN_PROBLEM = "\\begin{problem}";
const END_PROBLEM = "\\end{problem}";

/**
 * If the file contains `\begin{problem}{Title}...\end{problem}`, returns that title and inner body.
 * Otherwise returns the full text as `body` (legacy fragments).
 */
export function parseProblemTex(stripped: string): ParsedProblemTex {
  const s = stripped.trim();
  const bi = s.indexOf(BEGIN_PROBLEM);
  if (bi === -1) return { mode: "raw", body: s };

  let i = bi + BEGIN_PROBLEM.length;
  while (i < s.length && /\s/.test(s[i]!)) i++;
  if (s[i] !== "{") return { mode: "raw", body: s };

  i++;
  const titleStart = i;
  let depth = 1;
  while (i < s.length && depth > 0) {
    const c = s[i]!;
    if (c === "\\") {
      i += i + 1 < s.length ? 2 : 1;
      continue;
    }
    if (c === "{") {
      depth++;
      i++;
      continue;
    }
    if (c === "}") {
      depth--;
      i++;
      continue;
    }
    i++;
  }
  if (depth !== 0) return { mode: "raw", body: s };

  const title = s.slice(titleStart, i - 1).trim();
  const bodyEnd = s.indexOf(END_PROBLEM, i);
  if (bodyEnd === -1) return { mode: "raw", body: s };
  const body = s.slice(i, bodyEnd).trim();
  return { mode: "environment", title, body };
}

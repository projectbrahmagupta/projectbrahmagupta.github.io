import { parseProblemTex } from "./parse-problem-tex.js";
import { readProblemTex } from "./read-problem-tex.js";

/** Title + MathJax body from `problems/p###.tex` (environment wrapper or raw fragment). */
export function titleAndBodyFromTex(repoRoot: string, n: number): { title: string; body: string } {
  const tex = readProblemTex(repoRoot, n);
  const parsed = parseProblemTex(tex);
  if (parsed.mode === "environment") {
    return { title: parsed.title, body: parsed.body };
  }
  return { title: "", body: parsed.body };
}

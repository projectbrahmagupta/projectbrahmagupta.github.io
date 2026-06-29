import fs from "node:fs";
import path from "node:path";

import { PROBLEMS_DIR } from "../constants.js";
import { stripLatexComments } from "./strip-latex-comments.js";

/** UTF-8 contents of `problems/p###.tex` (zero-padded, e.g. p001; comments stripped), or empty if missing. */
export function readProblemTex(repoRoot: string, n: number): string {
  const file = path.join(repoRoot, PROBLEMS_DIR, `p${String(n).padStart(3, "0")}.tex`);
  try {
    return stripLatexComments(fs.readFileSync(file, "utf8")).trim();
  } catch {
    return "";
  }
}

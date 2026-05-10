#!/usr/bin/env node
import fs from "node:fs";

import { DATA_DIR, PROBLEMS_SOURCE_FILENAME } from "../src/constants.js";
import { parseProblemTex } from "../src/lib/parse-problem-tex.js";
import { resolveFromImport } from "../src/lib/path-utils.js";
import { readProblemTex } from "../src/lib/read-problem-tex.js";
import type { ProblemSourceRow } from "../src/types.js";
import { loadProblemsSource } from "./load-problems-source.js";

const REPO_ROOT = resolveFromImport(import.meta.url, "..");
const sourcePath = resolveFromImport(import.meta.url, "..", DATA_DIR, PROBLEMS_SOURCE_FILENAME);
const { PROBLEMS } = loadProblemsSource(sourcePath);

function titleAndStatement(p: ProblemSourceRow): { title: string; statement: string } {
  const tex = readProblemTex(REPO_ROOT, p.n);
  const parsed = parseProblemTex(tex);
  const title = parsed.mode === "environment" ? parsed.title : "";
  return { title, statement: parsed.body };
}

const dest = resolveFromImport(import.meta.url, "..", "problems.txt");
let out = "";
out += "Project Brahmagupta — 108 problems from the Indian mathematical tradition\n";
out += "Plain-text dump (no answer key). Regenerate: npm run export-txt\n";
out += "=".repeat(72) + "\n\n";

for (const p of PROBLEMS) {
  const { title, statement } = titleAndStatement(p);
  out += "=".repeat(80) + "\n";
  out += `Problem ${p.n}\n`;
  out += "=".repeat(80) + "\n";
  out += `Source:     ${p.source}\n`;
  out += `Title:      ${title}\n`;
  out += "-".repeat(80) + "\n";
  out += statement + "\n\n";
}

fs.writeFileSync(dest, out, "utf8");
console.log("Wrote", dest, PROBLEMS.length, "problems,", fs.statSync(dest).size, "bytes");

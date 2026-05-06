#!/usr/bin/env node
import fs from "node:fs";

import { DATA_DIR, PROBLEMS_SOURCE_FILENAME } from "../src/constants.js";
import { resolveFromImport } from "../src/lib/path-utils.js";
import { readProblemTex } from "../src/lib/read-problem-tex.js";
import type { ProblemRow } from "../src/types.js";
import { loadProblemsSource } from "./load-problems-source.js";

const REPO_ROOT = resolveFromImport(import.meta.url, "..");
const sourcePath = resolveFromImport(import.meta.url, "..", DATA_DIR, PROBLEMS_SOURCE_FILENAME);
const { PROBLEMS } = loadProblemsSource(sourcePath);

function flattenFracs(html: string): string {
  let s = html;
  const re =
    /<span class="frac">\s*<span class="num">([^<]*)<\/span>\s*<span class="den">([^<]*)<\/span>\s*<\/span>/g;
  for (let i = 0; i < 30; i++) {
    const next = s.replace(re, "($1)/($2)");
    if (next === s) break;
    s = next;
  }
  return s;
}

function htmlToText(html: string): string {
  const h = flattenFracs(html).replace(/<cite>[^<]*<\/cite>/gi, (m) => {
    return " [" + m.replace(/<\/?cite>/gi, "").trim() + "]";
  });
  let s = h
    .replace(/<blockquote>/gi, "\n")
    .replace(/<\/blockquote>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<\/ul>|<\/ol>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  s = s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
  return s.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** Prefer `problems/p{n}.tex`; if empty, fall back to legacy HTML from problems.source.js */
function statementForProblem(p: ProblemRow): string {
  const tex = readProblemTex(REPO_ROOT, p.n);
  if (tex.length > 0) return tex;
  const raw = p.body;
  if (/<[a-z][\s\S]*>/i.test(raw)) return htmlToText(raw);
  return raw;
}

const dest = resolveFromImport(import.meta.url, "..", "problems.txt");
let out = "";
out += "Project Brahmagupta — 108 problems from the Indian mathematical tradition\n";
out += "Plain-text dump (no answer key). Regenerate: npm run export-txt\n";
out += "=".repeat(72) + "\n\n";

for (const p of PROBLEMS) {
  out += "=".repeat(80) + "\n";
  out += `Problem ${p.n}\n`;
  out += "=".repeat(80) + "\n";
  out += `Source:     ${p.source}\n`;
  out += `Title:      ${p.title}\n`;
  out += `Tag:        ${p.tag}\n`;
  out += "-".repeat(80) + "\n";
  out += statementForProblem(p) + "\n\n";
}

fs.writeFileSync(dest, out, "utf8");
console.log("Wrote", dest, PROBLEMS.length, "problems,", fs.statSync(dest).size, "bytes");

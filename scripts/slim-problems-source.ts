#!/usr/bin/env node
/**
 * One-time / occasional migration: shrink legacy problems.source.js to `{ n, source }[]`.
 * Run: npx tsx scripts/slim-problems-source.ts
 */
import fs from "node:fs";
import vm from "node:vm";

import { DATA_DIR, PROBLEMS_SOURCE_FILENAME } from "../src/constants.js";
import { resolveFromImport } from "../src/lib/path-utils.js";

const REPO_ROOT = resolveFromImport(import.meta.url, "..");
const dest = resolveFromImport(import.meta.url, "..", DATA_DIR, PROBLEMS_SOURCE_FILENAME);

const raw = fs.readFileSync(dest, "utf8");
const wrap =
  `"use strict";\n` +
  raw +
  `\n; module.exports = { PROBLEMS: PROBLEMS };\n`;
const sandbox = {
  module: { exports: {} as { PROBLEMS: { n: number; source: string }[] } },
  exports: {},
  console,
};
sandbox.exports = sandbox.module.exports;
vm.createContext(sandbox);
vm.runInNewContext(wrap, sandbox);
const rows = sandbox.module.exports.PROBLEMS;
const slim = rows.map((p) => ({ n: p.n, source: p.source }));

const banner =
  "/* Project Brahmagupta — bibliography only for each problem.\n" +
  " * Titles and statements are built from problems/p###.tex (see \\begin{problem}{Title} … \\end{problem}).\n" +
  " * Generate data/problems.js: npm run build:data\n" +
  " */\n";

const body =
  banner +
  `"use strict";\n\n` +
  `var PROBLEMS = ${JSON.stringify(slim, null, 2)};\n\n` +
  `if (typeof module !== "undefined") {\n` +
  `  module.exports = { PROBLEMS };\n` +
  `}\n`;

fs.writeFileSync(dest, body, "utf8");
console.log("Wrote", dest, slim.length, "rows");

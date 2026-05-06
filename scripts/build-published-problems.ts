#!/usr/bin/env node
import fs from "node:fs";

import {
  DATA_DIR,
  ENV_PUBLISH_MAX_N,
  PROBLEMS_PUBLISHED_FILENAME,
  PROBLEMS_SOURCE_FILENAME,
  REVEAL_BROWSER_FILENAME,
} from "../src/constants.js";
import { REVEAL_SERIES_START_MS } from "../src/reveal.js";
import { resolveFromImport } from "../src/lib/path-utils.js";
import { resolvedPublishMaxN } from "../src/lib/publish-env.js";
import { readProblemTex } from "../src/lib/read-problem-tex.js";
import { maxRevealedN } from "../src/lib/schedule-ist.js";
import { loadProblemsSource } from "./load-problems-source.js";

/**
 * Builds data/problems.js for the shipped site:
 * - PROBLEM_CATALOG: metadata for every problem (from data/problems.source.js).
 * - PROBLEMS: metadata + `body` from `problems/p{n}.tex` (LaTeX fragments for MathJax), for n ≤ slice.
 */

const REPO_ROOT = resolveFromImport(import.meta.url, "..");
const SOURCE_PATH = resolveFromImport(import.meta.url, "..", DATA_DIR, PROBLEMS_SOURCE_FILENAME);
const OUTPUT_PATH = resolveFromImport(import.meta.url, "..", DATA_DIR, PROBLEMS_PUBLISHED_FILENAME);
const REVEAL_BROWSER_PATH = resolveFromImport(import.meta.url, "..", DATA_DIR, REVEAL_BROWSER_FILENAME);

function writeRevealBrowserConfig(): void {
  const banner =
    "/* Generated — do not edit by hand.\n" +
    " * Source: src/reveal.ts (REVEAL_SERIES_START_ISO)\n" +
    " * Regenerate: npm run build:data\n" +
    ` * REVEAL_SERIES_START_MS = ${REVEAL_SERIES_START_MS}\n */\n`;
  const body = `"use strict";\n` + `var REVEAL_SERIES_START_MS = ${REVEAL_SERIES_START_MS};\n`;
  fs.writeFileSync(REVEAL_BROWSER_PATH, banner + body, "utf8");
  console.log("Wrote", REVEAL_BROWSER_PATH);
}

writeRevealBrowserConfig();

const { PROBLEMS: fullProblems } = loadProblemsSource(SOURCE_PATH);

const SERIES_TOTAL = fullProblems.length;
const calendarMax = maxRevealedN(new Date(), SERIES_TOTAL, REVEAL_SERIES_START_MS);
const maxBuilt = resolvedPublishMaxN(process.env[ENV_PUBLISH_MAX_N], calendarMax, SERIES_TOTAL);

const catalog = fullProblems.map((p) => ({
  n: p.n,
  title: p.title,
  tag: p.tag,
}));

const published = fullProblems
  .filter((p) => p.n <= maxBuilt)
  .map((p) => ({
    n: p.n,
    source: p.source,
    title: p.title,
    tag: p.tag,
    body: readProblemTex(REPO_ROOT, p.n),
  }));

const banner =
  "/* Generated — do not edit by hand.\n" +
  " * Catalog: data/problems.source.js · Statements: problems/p*.tex\n" +
  " * Regenerate: npm run build:data\n" +
  ` * Publication slice at build (${new Date().toISOString()}): bodies for n ≤ ${maxBuilt} (${published.length}/${SERIES_TOTAL}).\n */\n`;

const outfile =
  banner +
  `"use strict";\n\n` +
  `var SERIES_TOTAL = ${SERIES_TOTAL};\n\n` +
  `var PROBLEM_CATALOG = ${JSON.stringify(catalog, null, 2)};\n\n` +
  `var PROBLEMS = ${JSON.stringify(published, null, 2)};\n`;

fs.writeFileSync(OUTPUT_PATH, outfile, "utf8");
console.log("Wrote", OUTPUT_PATH, "| bodies", published.length, "/", SERIES_TOTAL, "| max n", maxBuilt);

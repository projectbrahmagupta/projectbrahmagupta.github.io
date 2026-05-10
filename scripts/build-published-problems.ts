#!/usr/bin/env node
import fs from "node:fs";

import {
  CONTRIBUTE_SAMPLES_FILENAME,
  DATA_DIR,
  ENV_PUBLISH_MAX_N,
  PROBLEMS_PUBLISHED_FILENAME,
  PROBLEMS_SOURCE_FILENAME,
  REVEAL_BROWSER_FILENAME,
} from "../src/constants.js";
import { REVEAL_SERIES_START_MS } from "../src/reveal.js";
import { resolveFromImport } from "../src/lib/path-utils.js";
import { resolvedPublishMaxN } from "../src/lib/publish-env.js";
import { parseProblemTex } from "../src/lib/parse-problem-tex.js";
import { readProblemTex } from "../src/lib/read-problem-tex.js";
import { maxRevealedN } from "../src/lib/schedule-ist.js";
import { loadProblemsSource } from "./load-problems-source.js";

/**
 * Builds data/problems.js for the shipped site:
 * - PROBLEM_CATALOG: `n` + `title` (title from `\begin{problem}{Title}` in `problems/p###.tex`, or a fallback).
 * - PROBLEMS: catalog row + `source` from data/problems.source.js + `body` (MathJax fragment), for n ≤ slice.
 */

const REPO_ROOT = resolveFromImport(import.meta.url, "..");
const SOURCE_PATH = resolveFromImport(import.meta.url, "..", DATA_DIR, PROBLEMS_SOURCE_FILENAME);
const OUTPUT_PATH = resolveFromImport(import.meta.url, "..", DATA_DIR, PROBLEMS_PUBLISHED_FILENAME);
const CONTRIBUTE_SAMPLES_PATH = resolveFromImport(import.meta.url, "..", DATA_DIR, CONTRIBUTE_SAMPLES_FILENAME);
const REVEAL_BROWSER_PATH = resolveFromImport(import.meta.url, "..", DATA_DIR, REVEAL_BROWSER_FILENAME);

/** Problem indices shown on contribute.html sample carousel (must match three `.tex` files). */
const CONTRIBUTE_SAMPLE_NS = [1, 2, 3] as const;

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

function titleAndBodyFromTex(n: number): { title: string; body: string } {
  const tex = readProblemTex(REPO_ROOT, n);
  const parsed = parseProblemTex(tex);
  if (parsed.mode === "environment") {
    return { title: parsed.title, body: parsed.body };
  }
  return { title: "", body: parsed.body };
}

const enriched = fullProblems.map((p) => {
  const { title, body } = titleAndBodyFromTex(p.n);
  return { n: p.n, source: p.source, title, body };
});

const catalog = enriched.map(({ n, title }) => ({ n, title }));

const published = enriched
  .filter((p) => p.n <= maxBuilt)
  .map(({ n, source, title, body }) => ({ n, source, title, body }));

const banner =
  "/* Generated — do not edit by hand.\n" +
  " * Sources: data/problems.source.js · Titles + statements: problems/p###.tex\n" +
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

const contributeSlides = CONTRIBUTE_SAMPLE_NS.map((n) => {
  const { title, body } = titleAndBodyFromTex(n);
  return { n, title, body };
});
const contributeBanner =
  "/* Generated — do not edit by hand.\n" +
  " * Source: problems/p001.tex … p003.tex (same \\begin{problem}{…} parser as problems.js)\n" +
  " * Regenerate: npm run build:data\n */\n";
fs.writeFileSync(
  CONTRIBUTE_SAMPLES_PATH,
  contributeBanner +
    `"use strict";\n` +
    `var CONTRIBUTE_SAMPLE_SLIDES = ${JSON.stringify(contributeSlides, null, 2)};\n`,
  "utf8",
);
console.log("Wrote", CONTRIBUTE_SAMPLES_PATH);

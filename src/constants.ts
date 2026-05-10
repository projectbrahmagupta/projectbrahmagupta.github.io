/**
 * Shared constants (no module-level side effects) for browser bundles and tooling paths.
 * Series start instant lives in `src/reveal.ts`.
 */
export const SERIES_TOTAL_DEFAULT = 108;

export const DAY_MS = 86_400_000;

export const TIMEZONE_IST = "Asia/Kolkata";

/** Hero / lock messaging when the calendar has not yet opened. */
export const FIRST_PROBLEM_OPENS_TITLE = "First problem opens 7 May 2026, 00:00 IST.";

export const DATA_DIR = "data";

/** Relative to repo root: `p001.tex` … `p108.tex` (LaTeX / MathJax). */
export const PROBLEMS_DIR = "problems";

export const PROBLEMS_SOURCE_FILENAME = "problems.source.js";
export const PROBLEMS_PUBLISHED_FILENAME = "problems.js";
/** Carousel on contribute.html — built from problems/p001.tex … p003.tex. */
export const CONTRIBUTE_SAMPLES_FILENAME = "contribute-samples.js";

/** Problem indices included in that carousel (must match `problems/p00#.tex` files). */
export const CONTRIBUTE_SAMPLE_NS = [1, 2, 3] as const;
export const REVEAL_BROWSER_FILENAME = "reveal-config.js";

/** Env override for local previews (`PB_PUBLISH_MAX_N`). */
export const ENV_PUBLISH_MAX_N = "PB_PUBLISH_MAX_N";

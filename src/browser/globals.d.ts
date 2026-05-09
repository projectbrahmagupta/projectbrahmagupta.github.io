import type { ProblemCatalogEntry, ProblemPublished } from "../types.js";

interface SiteConfig {
  mode?: "contributions" | "problems";
  homeDocument?: {
    contributions?: { title?: string; description?: string };
    problems?: { title?: string; description?: string };
  };
}

declare global {
  var SITE_CONFIG: SiteConfig | undefined;
  var REVEAL_SERIES_START_MS: number;
  var SERIES_TOTAL: number;
  var PROBLEM_CATALOG: ProblemCatalogEntry[];
  var PROBLEMS: ProblemPublished[];
  var maxRevealedN: (now?: Date, totalProblems?: number) => number;
  var unlockDateLineForProblemN: (n: number) => string;
  function renderIndex(): void;
  function renderArchive(): void;
  function renderProblem(): void;
  interface Window {
    MathJax?: {
      typesetPromise?: (nodes: Element[]) => Promise<unknown>;
      startup?: { promise?: Promise<unknown> };
    };
  }
}

export {};

export type ProblemCatalogEntry = {
  n: number;
  title: string;
  tag: string;
};

/** Full row in `data/problems.source.js`. */
export type ProblemRow = ProblemCatalogEntry & {
  source: string;
  body: string;
};

/** Row in generated `data/problems.js`. */
export type ProblemPublished = ProblemCatalogEntry & {
  source?: string;
  body: string;
};

export type LoadedProblemsSource = {
  PROBLEMS: ProblemRow[];
};

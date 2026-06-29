export type ProblemCatalogEntry = {
  n: number;
  title: string;
};

/** Row in `data/problems.source.js` — bibliography only; title + statement come from `problems/p###.tex`. */
export type ProblemSourceRow = {
  n: number;
  source: string;
};

/** Row in generated `data/problems.js`. */
export type ProblemPublished = ProblemCatalogEntry & {
  source: string;
  body: string;
};

export type LoadedProblemsSource = {
  PROBLEMS: ProblemSourceRow[];
};

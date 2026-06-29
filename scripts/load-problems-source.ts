import fs from "node:fs";
import vm from "node:vm";

import type { LoadedProblemsSource } from "../src/types.js";

/** Load `data/problems.source.js` exports from disk (runs in isolation). */
export function loadProblemsSource(absPath: string): LoadedProblemsSource {
  const raw = fs.readFileSync(absPath, "utf8");
  const wrap =
    `"use strict";\n` +
    raw +
    `\n; module.exports = { PROBLEMS: PROBLEMS };\n`;
  const sandbox = {
    module: { exports: {} },
    exports: {},
    console,
  };
  sandbox.exports = sandbox.module.exports;
  vm.createContext(sandbox);
  vm.runInNewContext(wrap, sandbox);
  return sandbox.module.exports as LoadedProblemsSource;
}

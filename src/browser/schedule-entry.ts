import {
  maxRevealedN as maxRevealedNCore,
  unlockDateLineForProblemN as unlockDateLineCore,
} from "../lib/schedule-ist.js";
import { SERIES_TOTAL_DEFAULT } from "../constants.js";

function seriesStartMs(): number {
  return globalThis.REVEAL_SERIES_START_MS;
}

function maxRevealedN(now?: Date, totalProblems?: number): number {
  const total =
    totalProblems ??
    (typeof globalThis.SERIES_TOTAL === "number" && globalThis.SERIES_TOTAL > 0
      ? globalThis.SERIES_TOTAL
      : SERIES_TOTAL_DEFAULT);
  return maxRevealedNCore(now, total, seriesStartMs());
}

function unlockDateLineForProblemN(n: number): string {
  return unlockDateLineCore(n, seriesStartMs());
}

Object.assign(globalThis, {
  maxRevealedN,
  unlockDateLineForProblemN,
});

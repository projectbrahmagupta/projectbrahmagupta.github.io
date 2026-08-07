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

function isBundledN(n: number): boolean {
  const list = globalThis.PROBLEMS;
  if (!Array.isArray(list)) return false;
  const p = list.find((row) => row && row.n === n);
  return !!p && typeof p.body === "string" && p.body.length > 0;
}

function isUnlockedN(n: number, now?: Date): boolean {
  return n >= 1 && n <= maxRevealedN(now) && isBundledN(n);
}

function latestUnlockedN(now?: Date): number {
  for (let n = maxRevealedN(now); n >= 1; n--) {
    if (isBundledN(n)) return n;
  }
  return 0;
}

Object.assign(globalThis, {
  maxRevealedN,
  unlockDateLineForProblemN,
  isUnlockedN,
  latestUnlockedN,
});

"use strict";
(() => {
  // src/constants.ts
  var SERIES_TOTAL_DEFAULT = 108;
  var DAY_MS = 864e5;
  var TIMEZONE_IST = "Asia/Kolkata";

  // src/lib/schedule-ist.ts
  function istYmd(d) {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE_IST,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    const parts = fmt.formatToParts(d);
    const get = (type) => parseInt(parts.find((p) => p.type === type).value, 10);
    return { y: get("year"), m: get("month"), d: get("day") };
  }
  function istMidnightUtcMs(y, m, day) {
    return Date.parse(
      `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00+05:30`
    );
  }
  function istMidnightUtcNow(d = /* @__PURE__ */ new Date()) {
    const p = istYmd(d);
    return istMidnightUtcMs(p.y, p.m, p.d);
  }
  function revealDayOffset(now, seriesStartMs2) {
    const t = now ?? /* @__PURE__ */ new Date();
    return Math.floor((istMidnightUtcNow(t) - seriesStartMs2) / DAY_MS);
  }
  function maxRevealedN(now, totalProblems, seriesStartMs2) {
    const off = revealDayOffset(now, seriesStartMs2);
    if (off < 0) return 0;
    return Math.min(totalProblems, off + 1);
  }
  function unlockInstantMsForProblemN(n, seriesStartMs2) {
    return seriesStartMs2 + (n - 1) * DAY_MS;
  }
  function unlockDateLineForProblemN(n, seriesStartMs2) {
    const t = unlockInstantMsForProblemN(n, seriesStartMs2);
    const d = new Date(t);
    const line = new Intl.DateTimeFormat("en-GB", {
      timeZone: TIMEZONE_IST,
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(d);
    return `${line}, 00:00 IST`;
  }

  // src/browser/schedule-entry.ts
  function seriesStartMs() {
    return globalThis.REVEAL_SERIES_START_MS;
  }
  function maxRevealedN2(now, totalProblems) {
    const total = totalProblems ?? (typeof globalThis.SERIES_TOTAL === "number" && globalThis.SERIES_TOTAL > 0 ? globalThis.SERIES_TOTAL : SERIES_TOTAL_DEFAULT);
    return maxRevealedN(now, total, seriesStartMs());
  }
  function unlockDateLineForProblemN2(n) {
    return unlockDateLineForProblemN(n, seriesStartMs());
  }
  Object.assign(globalThis, {
    maxRevealedN: maxRevealedN2,
    unlockDateLineForProblemN: unlockDateLineForProblemN2
  });
})();

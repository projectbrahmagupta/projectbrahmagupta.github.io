import { DAY_MS, TIMEZONE_IST } from "../constants.js";

export function istYmd(d: Date): { y: number; m: number; d: number } {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE_IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(d);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parseInt(parts.find((p) => p.type === type)!.value, 10);
  return { y: get("year"), m: get("month"), d: get("day") };
}

export function istMidnightUtcMs(y: number, m: number, day: number): number {
  return Date.parse(
    `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00+05:30`,
  );
}

export function istMidnightUtcNow(d = new Date()): number {
  const p = istYmd(d);
  return istMidnightUtcMs(p.y, p.m, p.d);
}

export function revealDayOffset(now: Date | undefined, seriesStartMs: number): number {
  const t = now ?? new Date();
  return Math.floor((istMidnightUtcNow(t) - seriesStartMs) / DAY_MS);
}

/** Largest problem index published by the calendar (1…total); 0 before the series starts. */
export function maxRevealedN(now: Date | undefined, totalProblems: number, seriesStartMs: number): number {
  const off = revealDayOffset(now, seriesStartMs);
  if (off < 0) return 0;
  return Math.min(totalProblems, off + 1);
}

export function unlockInstantMsForProblemN(n: number, seriesStartMs: number): number {
  return seriesStartMs + (n - 1) * DAY_MS;
}

export function unlockDateLineForProblemN(n: number, seriesStartMs: number): string {
  const t = unlockInstantMsForProblemN(n, seriesStartMs);
  const d = new Date(t);
  const line = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE_IST,
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
  return `${line}, 00:00 IST`;
}

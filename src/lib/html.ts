export function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) =>
    (({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }) as Record<string, string>)[c]!,
  );
}

export function clamp(n: number, lo: number, hi: number): number {
  if (!Number.isFinite(n)) return lo;
  return Math.min(hi, Math.max(lo, n));
}

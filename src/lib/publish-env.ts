export function resolvedPublishMaxN(
  envValue: string | undefined,
  calendarSliceMax: number,
  seriesTotal: number,
): number {
  const parsed =
    envValue !== undefined && envValue !== "" && /^[0-9]+$/.test(String(envValue))
      ? parseInt(envValue, 10)
      : calendarSliceMax;
  return Math.max(0, Math.min(parsed, seriesTotal));
}

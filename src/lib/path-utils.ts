import path from "node:path";
import { fileURLToPath } from "node:url";

/** Resolve a path relative to the importing module's directory. */
export function resolveFromImport(importMetaUrl: string, ...segments: string[]): string {
  return path.resolve(path.dirname(fileURLToPath(importMetaUrl)), ...segments);
}

/** Remove LaTeX `%` line comments; `\%` stays as a literal percent. */
export function stripLatexComments(source: string): string {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  for (const line of lines) {
    out.push(stripLineComment(line));
  }
  return out.join("\n").trimEnd();
}

function stripLineComment(line: string): string {
  let i = 0;
  let result = "";
  while (i < line.length) {
    const c = line[i];
    if (c === "\\" && i + 1 < line.length) {
      result += c + line[i + 1];
      i += 2;
      continue;
    }
    if (c === "%") break;
    result += c;
    i += 1;
  }
  return result.replace(/\s+$/, "");
}

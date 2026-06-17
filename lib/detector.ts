export interface DetectedVar {
  name: string;
  lang: string;
  occurrences: number;
  lines: number[];
}

const PATTERNS = [
  { lang: 'JS/TS', source: String.raw`process\.env\.([A-Z_][A-Z0-9_]*)` },
  { lang: 'JS/TS', source: String.raw`process\.env\[['"]([A-Z_][A-Z0-9_]*)['"]` },
  { lang: 'JS/TS', source: String.raw`import\.meta\.env\.([A-Z_][A-Z0-9_]*)` },
  { lang: 'Python', source: String.raw`os\.environ\.get\(['"]([A-Z_][A-Z0-9_]*)['"]` },
  { lang: 'Python', source: String.raw`os\.environ\[['"]([A-Z_][A-Z0-9_]*)['"]` },
  { lang: 'Python', source: String.raw`os\.getenv\(['"]([A-Z_][A-Z0-9_]*)['"]` },
  { lang: 'Go', source: String.raw`os\.Getenv\("([A-Z_][A-Z0-9_]*)"` },
  { lang: 'Ruby', source: String.raw`ENV\[['"]([A-Z_][A-Z0-9_]*)['"]` },
  { lang: 'Ruby', source: String.raw`ENV\.fetch\(['"]([A-Z_][A-Z0-9_]*)['"]` },
  { lang: 'Rust', source: String.raw`env::var\("([A-Z_][A-Z0-9_]*)"` },
  { lang: 'PHP', source: String.raw`\$_ENV\[['"]([A-Z_][A-Z0-9_]*)['"]` },
  { lang: 'PHP', source: String.raw`getenv\(['"]([A-Z_][A-Z0-9_]*)['"]` },
]

export function detectVarsInCode(code: string): DetectedVar[] {
  if (!code.trim()) return []

  const found = new Map<string, { name: string; langs: Set<string>; occurrences: number; lines: number[] }>()
  const codeLines = code.split('\n')

  for (const { lang, source } of PATTERNS) {
    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i]
      const re = new RegExp(source, 'g')
      let match: RegExpExecArray | null
      while ((match = re.exec(line)) !== null) {
        const name = match[1]
        const lineNum = i + 1
        const existing = found.get(name)
        if (existing) {
          existing.occurrences++
          existing.langs.add(lang)
          if (!existing.lines.includes(lineNum)) existing.lines.push(lineNum)
        } else {
          found.set(name, { name, langs: new Set([lang]), occurrences: 1, lines: [lineNum] })
        }
      }
    }
  }

  return Array.from(found.values())
    .map(({ langs, ...rest }) => ({ ...rest, lang: [...langs].join(', ') }))
    .sort((a, b) => b.occurrences - a.occurrences)
}

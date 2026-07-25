#!/usr/bin/env tsx
/**
 * Record an explicit `timeout` outcome per alias for files the checker cannot finish.
 *
 * Without this those files are simply absent from the results, which reads as a smaller
 * corpus rather than as work that failed. Naming the reason keeps the denominator whole.
 */
import fs from 'node:fs'
import path from 'node:path'
import { decompileFile } from './decompile.js'
import { REPO_ROOT } from './corpus.js'

const [listPath, outPath] = process.argv.slice(2)
if (!listPath || !outPath) {
  console.error('usage: record-timeouts.js <listfile> <out.json>')
  process.exit(2)
}

const out: unknown[] = []
for (const rel of fs.readFileSync(listPath, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean)) {
  try {
    const abs = path.join(REPO_ROOT, rel)
    const entries = decompileFile(abs, fs.readFileSync(abs, 'utf8'))
    for (const e of entries) {
      out.push({
        file: rel,
        name: e.name,
        status: 'timeout',
        gaps: [],
        detail: 'the checker did not finish resolving this file within the sweep budget',
      })
    }
  } catch {
    /* unreadable: nothing to record */
  }
}
fs.writeFileSync(outPath, JSON.stringify(out))
console.log(`recorded ${out.length} timeout outcomes`)

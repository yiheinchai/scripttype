#!/usr/bin/env tsx
/**
 * List corpus files that have type-level aliases but no recorded outcome.
 *
 * A capped shard stops part-way through its list, so the files after the cut are absent
 * from the results rather than marked as failures. Without this the coverage denominator
 * silently shrinks, which reads as a coverage change when it is really missing data.
 */
import fs from 'node:fs'
import path from 'node:path'
import { collectFiles } from './batch.js'
import { decompileFile } from './decompile.js'
import { REPO_ROOT } from './corpus.js'

const dir = process.argv[2]
if (!dir) {
  console.error('usage: list-unmeasured.js <results-dir>')
  process.exit(2)
}

const measured = new Set<string>()
if (fs.existsSync(dir)) {
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue
    try {
      for (const o of JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))) measured.add(o.file)
    } catch {
      /* a shard killed mid-write leaves truncated JSON; skip it */
    }
  }
}

const ROOTS = [
  '01-type-level-programming',
  '02-inference-at-scale',
  '03-schema-and-type-level-parsers',
  '04-query-builders-orm',
  '05-functional-effects-hkt',
  '06-state-and-forms',
  '07-compiler-internals',
]

for (const root of ROOTS) {
  for (const rel of collectFiles(root)) {
    if (measured.has(rel)) continue
    // Only files that actually contain generic aliases are worth revisiting.
    try {
      const abs = path.join(REPO_ROOT, rel)
      const text = fs.readFileSync(abs, 'utf8')
      if (text.length > 1_200_000) continue
      if (decompileFile(abs, text).length) console.log(rel)
    } catch {
      /* unreadable or unparseable: nothing to measure */
    }
  }
}

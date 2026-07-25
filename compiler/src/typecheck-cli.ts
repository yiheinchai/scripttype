#!/usr/bin/env tsx
/** Typecheck gate CLI: `tsx src/typecheck-cli.ts [filter]` over hand-authored corpus sources. */
import fs from 'node:fs'
import path from 'node:path'
import { findTargets, REPO_ROOT } from './corpus.js'
import { extractType } from './extract.js'
import { typecheckScriptType } from './typecheck.js'

const filter = process.argv.slice(2).find((a) => !a.startsWith('-'))
let ok = 0
let bad = 0
for (const dir of findTargets()) {
  if (filter && !dir.includes(filter)) continue
  const p = path.join(dir, 'source.st.ts')
  if (!fs.existsSync(p)) continue
  const name = path.relative(path.resolve(import.meta.dirname, '../../corpus'), dir)
  // The fixture may reference the local helpers its reference implementation uses.
  let deps: string[] = []
  try {
    const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'))
    const ex = extractType(path.join(REPO_ROOT, meta.sourcePath), meta.typeName)
    deps = ex.emitted.filter((n) => n !== meta.typeName)
  } catch {
    /* no deps available */
  }
  const r = typecheckScriptType(
    { [`${name.replace(/\//g, '__')}.st.ts`]: fs.readFileSync(p, 'utf8') },
    deps,
  )
  if (r.ok) {
    ok++
    console.log(`PASS  ${name}`)
  } else {
    bad++
    console.log(`FAIL  ${name}`)
    for (const e of r.errors.slice(0, 6)) console.log(`        ${e}`)
    for (const s of r.suppressions) console.log(`        suppression: ${s}`)
  }
}
console.log(`\ntypecheck: ${ok}/${ok + bad} ScriptType sources typecheck cleanly`)
process.exit(bad === 0 ? 0 : 1)

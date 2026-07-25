#!/usr/bin/env tsx
/**
 * All fast gates in one process.
 *
 * Running the typecheck gate and the corpus verifier as separate commands pays the
 * TypeScript startup and lib-parsing cost twice; sharing one process makes the whole
 * suite quick enough to run on every change.
 */
import fs from 'node:fs'
import path from 'node:path'
import { findTargets, runTarget, REPO_ROOT } from './corpus.js'
import { extractType } from './extract.js'
import { typecheckScriptType } from './typecheck.js'

const filter = process.argv.slice(2).find((a) => !a.startsWith('-'))
const dirs = findTargets().filter((d) => !filter || d.includes(filter))

let gateOk = 0
const gateBad: string[] = []
let verifyOk = 0
const verifyBad: string[] = []

for (const dir of dirs) {
  const name = path.relative(path.resolve(import.meta.dirname, '../../corpus'), dir)
  const stPath = path.join(dir, 'source.st.ts')
  if (!fs.existsSync(stPath)) continue

  // Gate 1: the ScriptType source must itself typecheck.
  let deps: string[] = []
  try {
    const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'))
    const ex = extractType(path.join(REPO_ROOT, meta.sourcePath), meta.typeName)
    deps = ex.emitted.filter((n: string) => n !== meta.typeName)
  } catch {
    /* no deps */
  }
  const tc = typecheckScriptType(
    { [`${name.replace(/\//g, '__')}.st.ts`]: fs.readFileSync(stPath, 'utf8') },
    deps,
  )
  if (tc.ok) gateOk++
  else gateBad.push(`${name}: ${tc.errors[0] ?? tc.suppressions[0]}`)

  // Gate 2: the compiled output must be type-identical to the reference.
  const r = runTarget(dir)
  if (r.verify?.ok && r.rawFree) verifyOk++
  else {
    const why = r.compileError ?? r.verify?.compiledDiagnostics[0] ?? 'not type-identical'
    verifyBad.push(`${name}: ${why}`)
  }
}

const total = gateOk + gateBad.length
console.log(`typecheck gate:  ${gateOk}/${total}`)
for (const b of gateBad) console.log(`  FAIL ${b.slice(0, 160)}`)
console.log(`type identity:   ${verifyOk}/${total}`)
for (const b of verifyBad) console.log(`  FAIL ${b.slice(0, 160)}`)

process.exit(gateBad.length === 0 && verifyBad.length === 0 ? 0 : 1)

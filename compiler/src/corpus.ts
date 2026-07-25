/**
 * Corpus runner: the project's self-verification mechanism.
 *
 * Each target directory holds
 *   meta.json     provenance (repo + file + type name) and sample instantiations
 *   reference.ts  the original TypeScript, extracted verbatim from the clone
 *   source.st.ts  the ScriptType program that must compile to an equivalent type
 *
 * A target counts as covered only when the compiled output typechecks AND is
 * type-identical to the reference for every sample AND uses no `raw()` escape hatch.
 */
import fs from 'node:fs'
import path from 'node:path'
import { compile } from './compile.js'
import { verify, type VerifyResult } from './verify.js'
import { extractType } from './extract.js'

export interface TargetMeta {
  /** Stable id, e.g. 'kysely/ExtractAliasFromStringSelectExpression'. */
  name: string
  /** Corpus-relative path the reference was extracted from, for provenance. */
  sourcePath: string
  /** The type name shared by reference.ts and the compiled output. */
  typeName: string
  /** Type-argument lists to compare, e.g. ["'a/b', '/'"]. */
  samples: string[]
  /** Optional prose: which language feature this target exercises. */
  exercises?: string
  /** Set when the reference could not be extracted verbatim and was adapted. */
  adapted?: boolean
}

export interface TargetResult {
  meta: TargetMeta
  dir: string
  verify?: VerifyResult
  compiled?: string
  /** True when source.st.ts contains no raw() escape hatch. */
  rawFree: boolean
  /** Provenance: does reference.ts still match the clone? */
  provenance: 'ok' | 'drifted' | 'unchecked' | 'missing'
  compileError?: string
}

export const CORPUS_ROOT = path.resolve(import.meta.dirname, '../../corpus')
export const REPO_ROOT = path.resolve(import.meta.dirname, '../..')

export function findTargets(root = CORPUS_ROOT): string[] {
  const out: string[] = []
  if (!fs.existsSync(root)) return out
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(p)
      else if (entry.name === 'meta.json') out.push(dir)
    }
  }
  walk(root)
  return out.sort()
}

export function runTarget(dir: string): TargetResult {
  const meta: TargetMeta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'))
  const refPath = path.join(dir, 'reference.ts')
  const stPath = path.join(dir, 'source.st.ts')

  const reference = fs.existsSync(refPath) ? fs.readFileSync(refPath, 'utf8') : ''
  const stSource = fs.existsSync(stPath) ? fs.readFileSync(stPath, 'utf8') : ''
  const rawFree = !/\braw\s*\(/.test(stSource)

  // Provenance: re-extract from the clone and compare, so a fixture cannot silently
  // drift away from the library code it claims to reproduce.
  let provenance: TargetResult['provenance'] = 'unchecked'
  if (meta.adapted) {
    provenance = 'unchecked'
  } else {
    const abs = path.join(REPO_ROOT, meta.sourcePath)
    if (!fs.existsSync(abs)) provenance = 'missing'
    else {
      try {
        const fresh = extractType(abs, meta.typeName)
        provenance = normalize(fresh.source) === normalize(reference) ? 'ok' : 'drifted'
      } catch {
        provenance = 'missing'
      }
    }
  }

  if (!stSource.trim()) {
    return { meta, dir, rawFree, provenance, compileError: 'source.st.ts is empty' }
  }

  let compiled: string
  try {
    compiled = compile(stSource, { fileName: stPath }).code
  } catch (e) {
    return { meta, dir, rawFree, provenance, compileError: (e as Error).message }
  }

  // The reference bundles the local helpers it depends on; the compiled module needs
  // them too, since ScriptType is only asked to express this one alias.
  let compiledWithDeps = compiled
  if (!meta.adapted) {
    try {
      const ex = extractType(path.join(REPO_ROOT, meta.sourcePath), meta.typeName)
      const deps = ex.parts.filter((p) => p.name !== meta.typeName)
      if (deps.length) compiledWithDeps = deps.map((p) => p.text).join('\n\n') + '\n\n' + compiled
    } catch {
      /* fall back to the compiled module alone */
    }
  }

  const v = verify({
    name: meta.name,
    original: reference,
    compiled: compiledWithDeps,
    typeName: meta.typeName,
    samples: meta.samples,
  })

  return { meta, dir, verify: v, compiled: compiledWithDeps, rawFree, provenance }
}

const normalize = (s: string) => s.replace(/\s+/g, ' ').trim()

export interface CorpusSummary {
  total: number
  passed: number
  covered: number
  results: TargetResult[]
}

export function runCorpus(filter?: string): CorpusSummary {
  const dirs = findTargets().filter((d) => !filter || d.includes(filter))
  const results = dirs.map(runTarget)
  const passed = results.filter((r) => r.verify?.ok).length
  const covered = results.filter((r) => r.verify?.ok && r.rawFree).length
  return { total: results.length, passed, covered, results }
}

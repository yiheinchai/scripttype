#!/usr/bin/env tsx
/**
 * Batched round-trip runner.
 *
 * Creating a TypeScript program per alias is far too slow for thousands of targets, so
 * this builds ONE program per file: a shared module holding the original declarations,
 * one module per compiled alias (to keep helper names from colliding), and a check
 * module asserting type identity for each pair.
 *
 * Usage:
 *   tsx src/batch.ts <file-or-dir> [<file-or-dir>...] [--json out.json]
 */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { compile } from './compile.js'
import { decompileFile } from './decompile.js'
import { extractType } from './extract.js'
import { REPO_ROOT } from './corpus.js'

export type Status =
  | 'covered'
  | 'raw'
  | 'compile-error'
  | 'mismatch'
  | 'unresolved-deps'
  | 'reference-error'

export interface AliasOutcome {
  file: string
  name: string
  status: Status
  gaps: string[]
  detail?: string
}

const LIB_OPTIONS: ts.CompilerOptions = {
  strict: true,
  noEmit: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipLibCheck: true,
  noErrorTruncation: true,
}

/**
 * Parsed lib.d.ts files are shared across programs. Without this cache every file's
 * program re-parses several megabytes of standard library, which exhausts the V8 heap
 * partway through a full-corpus run.
 */
const LIB_CACHE = new Map<string, ts.SourceFile | undefined>()
function cachedLibFile(fileName: string, lv: ts.ScriptTarget | ts.CreateSourceFileOptions): ts.SourceFile | undefined {
  if (LIB_CACHE.has(fileName)) return LIB_CACHE.get(fileName)
  const text = ts.sys.readFile(fileName)
  const sf = text === undefined ? undefined : ts.createSourceFile(fileName, text, lv, true)
  LIB_CACHE.set(fileName, sf)
  return sf
}

const EQ = `export type __Eq<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false\n`

/** A missing cross-file import is a harness limitation, not a language gap. */
const isMissingName = (d: string) => /^Cannot find name|^Cannot find module|is not generic/.test(d)

function witnessArgs(decl: ts.TypeAliasDeclaration, sf: ts.SourceFile): string[] {
  return (decl.typeParameters ?? []).map((tp) => {
    if (!tp.constraint) return 'any'
    const c = tp.constraint.getText(sf)
    if (/\binfer\b/.test(c)) return 'any'
    return c
  })
}

export function batchFile(rel: string): AliasOutcome[] {
  const abs = path.join(REPO_ROOT, rel)
  let text: string
  try {
    text = fs.readFileSync(abs, 'utf8')
  } catch {
    return []
  }
  if (text.length > 1_500_000) return []

  const sf = ts.createSourceFile(abs, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const entries = decompileFile(abs, text)
  if (!entries.length) return []

  const outcomes: AliasOutcome[] = []
  const files = new Map<string, string>([['/eq.ts', EQ]])
  const checks: string[] = [`import type { __Eq } from './eq.js'`]
  const live: { name: string; idx: number }[] = []

  entries.forEach((e, i) => {
    if (e.result.gaps.length) {
      outcomes.push({ file: rel, name: e.name, status: 'raw', gaps: e.result.gaps })
      return
    }
    let emitted: string
    try {
      emitted = compile(e.result.source, { fileName: `${e.name}.st.ts` }).code
    } catch (err) {
      outcomes.push({
        file: rel,
        name: e.name,
        status: 'compile-error',
        gaps: [],
        detail: (err as Error).message.split('\n')[0],
      })
      return
    }
    let ex
    try {
      ex = extractType(abs, e.name)
    } catch (err) {
      outcomes.push({
        file: rel,
        name: e.name,
        status: 'reference-error',
        gaps: [],
        detail: (err as Error).message.split('\n')[0],
      })
      return
    }
    const deps = ex.parts.filter((p) => p.name !== e.name)
    const depSrc = deps.length ? deps.map((p) => p.text).join('\n\n') + '\n\n' : ''

    files.set(`/o${i}.ts`, ex.source)
    files.set(`/c${i}.ts`, depSrc + emitted)
    const args = witnessArgs(e.decl, sf)
    const inst = (ns: string) => (args.length ? `${ns}${i}.${e.name}<${args.join(', ')}>` : `${ns}${i}.${e.name}`)
    checks.push(`import type * as o${i} from './o${i}.js'`)
    checks.push(`import type * as c${i} from './c${i}.js'`)
    checks.push(`export type __O${i} = ${inst('o')}`)
    checks.push(`export type __C${i} = ${inst('c')}`)
    checks.push(`export type __EQ${i} = __Eq<${inst('o')}, ${inst('c')}>`)
    live.push({ name: e.name, idx: i })
  })

  if (!live.length) return outcomes

  files.set('/check.ts', checks.join('\n') + '\n')

  const libDir = ts.getDefaultLibFilePath(LIB_OPTIONS).replace(/[^/\\]+$/, '')
  const host: ts.CompilerHost = {
    fileExists: (f) => files.has(f) || ts.sys.fileExists(f),
    readFile: (f) => files.get(f) ?? ts.sys.readFile(f),
    writeFile: () => {},
    getCanonicalFileName: (f) => f,
    getCurrentDirectory: () => '/',
    getDefaultLibFileName: () => libDir + 'lib.es2022.d.ts',
    getNewLine: () => '\n',
    useCaseSensitiveFileNames: () => true,
    getSourceFile: (fileName, lv) => {
      const own = files.get(fileName)
      if (own !== undefined) return ts.createSourceFile(fileName, own, lv, true)
      return cachedLibFile(fileName, lv)
    },
  }

  let program: ts.Program
  try {
    program = ts.createProgram(['/check.ts'], LIB_OPTIONS, host)
  } catch (err) {
    for (const l of live) {
      outcomes.push({ file: rel, name: l.name, status: 'mismatch', gaps: [], detail: 'program creation failed' })
    }
    return outcomes
  }

  const checker = program.getTypeChecker()
  const fmt = (d: ts.Diagnostic) => ts.flattenDiagnosticMessageText(d.messageText, ' ')
  const checkSf = program.getSourceFile('/check.ts')!
  const aliases = new Map<string, ts.TypeAliasDeclaration>()
  for (const s of checkSf.statements) if (ts.isTypeAliasDeclaration(s)) aliases.set(s.name.text, s)
  const strOf = (n: string) => {
    const d = aliases.get(n)
    if (!d) return undefined
    try {
      return checker.typeToString(
        checker.getTypeAtLocation(d.type),
        undefined,
        ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias,
      )
    } catch {
      return undefined
    }
  }

  for (const { name, idx } of live) {
    const cSf = program.getSourceFile(`/c${idx}.ts`)
    const oSf = program.getSourceFile(`/o${idx}.ts`)
    const cDiags = cSf ? program.getSemanticDiagnostics(cSf).map(fmt) : ['missing compiled module']
    const oDiags = oSf ? program.getSemanticDiagnostics(oSf).map(fmt) : ['missing reference module']

    if (oDiags.length && oDiags.every(isMissingName)) {
      outcomes.push({ file: rel, name, status: 'unresolved-deps', gaps: [], detail: oDiags[0] })
      continue
    }
    if (oDiags.length) {
      outcomes.push({ file: rel, name, status: 'reference-error', gaps: [], detail: oDiags[0] })
      continue
    }
    if (cDiags.length) {
      const status: Status = cDiags.every(isMissingName) ? 'unresolved-deps' : 'compile-error'
      outcomes.push({ file: rel, name, status, gaps: [], detail: cDiags[0] })
      continue
    }
    const eq = strOf(`__EQ${idx}`)
    if (eq === 'true') {
      outcomes.push({ file: rel, name, status: 'covered', gaps: [] })
    } else {
      outcomes.push({
        file: rel,
        name,
        status: 'mismatch',
        gaps: [],
        detail: `original=${(strOf(`__O${idx}`) ?? '?').slice(0, 90)} compiled=${(strOf(`__C${idx}`) ?? '?').slice(0, 90)}`,
      })
    }
  }
  return outcomes
}

const SKIP_DIR = /(^|\/)(node_modules|dist|build|\.git|coverage|docs|website|examples?|e2e|__tests__|tests?|benchmarks?|fixtures)(\/|$)/
const SKIP_FILE = /\.(test|spec|bench|test-d|test-types)\.tsx?$/

export function collectFiles(relRoot: string): string[] {
  const abs = path.join(REPO_ROOT, relRoot)
  const st = fs.statSync(abs)
  if (st.isFile()) return [relRoot]
  const out: string[] = []
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (!SKIP_DIR.test(p)) walk(p)
      } else if (/\.tsx?$/.test(e.name) && !SKIP_FILE.test(e.name)) {
        out.push(path.relative(REPO_ROOT, p))
      }
    }
  }
  walk(abs)
  return out.sort()
}

if (process.argv[1] && import.meta.filename === path.resolve(process.argv[1])) {
  const args = process.argv.slice(2)
  const jsonIdx = args.indexOf('--json')
  const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : undefined
  const roots = args.filter((a, i) => !a.startsWith('--') && !(jsonIdx >= 0 && i === jsonIdx + 1))
  if (!roots.length) {
    console.error('usage: batch.ts <file-or-dir>... [--json out.json]')
    process.exit(2)
  }

  const all: AliasOutcome[] = []
  for (const root of roots) {
    for (const f of collectFiles(root)) {
      try {
        all.push(...batchFile(f))
      } catch (err) {
        console.error(`  error in ${f}: ${(err as Error).message.split('\n')[0]}`)
      }
    }
  }

  const counts = new Map<Status, number>()
  for (const o of all) counts.set(o.status, (counts.get(o.status) ?? 0) + 1)
  const gapCounts = new Map<string, number>()
  for (const o of all) for (const g of o.gaps) gapCounts.set(g, (gapCounts.get(g) ?? 0) + 1)

  const total = all.length
  const covered = counts.get('covered') ?? 0
  console.log(`\n=== ${total} generic type aliases across ${roots.length} root(s) ===`)
  for (const [s, n] of [...counts].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(5)}  ${s}  (${((n / total) * 100).toFixed(1)}%)`)
  }
  console.log(`\ncovered: ${covered}/${total} = ${((covered / total) * 100).toFixed(1)}%`)

  if (gapCounts.size) {
    console.log('\nlanguage gaps (raw() fallbacks), most frequent first:')
    for (const [g, n] of [...gapCounts].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
      console.log(`  ${String(n).padStart(5)}  ${g}`)
    }
  }

  const otherDetail = new Map<string, number>()
  for (const o of all) {
    if (o.status === 'mismatch' || o.status === 'compile-error') {
      const key = (o.detail ?? '?').replace(/'[^']*'/g, "'X'").slice(0, 80)
      otherDetail.set(key, (otherDetail.get(key) ?? 0) + 1)
    }
  }
  if (otherDetail.size) {
    console.log('\ntop failure reasons:')
    for (const [d, n] of [...otherDetail].sort((a, b) => b[1] - a[1]).slice(0, 15)) {
      console.log(`  ${String(n).padStart(5)}  ${d}`)
    }
  }

  if (jsonOut) {
    fs.writeFileSync(jsonOut, JSON.stringify(all, null, 2))
    console.log(`\nwrote ${jsonOut}`)
  }
}

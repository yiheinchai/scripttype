#!/usr/bin/env tsx
/**
 * Instantiation-cost benchmark: does ScriptType's output cost more to check than the
 * hand-written type it replaces?
 *
 * This is the question a performance-conscious TypeScript user asks before adopting
 * anything that generates types, and the project had no answer. Compile speed is not
 * the concern — that is milliseconds — the concern is what the *emitted* types do to
 * `tsc` on every build afterwards.
 *
 * Method: for each hand-authored corpus target, build two otherwise identical programs,
 * one importing the reference type and one importing the compiled ScriptType, and
 * instantiate each with the same sample arguments. `checker.getInstantiationCount()` is
 * the metric TypeScript itself reports under `--extendedDiagnostics`, and it is
 * deterministic — unlike wall-clock time, which on a checker this small is mostly noise.
 *
 * The two programs are built separately so neither warms the other's caches. Each type
 * is instantiated in its own program for the same reason.
 *
 * Usage: tsx src/bench.ts [filter] [--json out.json]
 */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { compile } from './compile.js'
import { findTargets, REPO_ROOT } from './corpus.js'
import { extractType } from './extract.js'

export interface BenchCase {
  name: string
  /** Source defining the type under test, exporting `typeName`. */
  source: string
  typeName: string
  /** Type-argument lists to instantiate. */
  samples: string[]
}

export interface BenchResult {
  name: string
  originalInstantiations: number
  compiledInstantiations: number
  /** compiled / original. 1.0 means identical cost. */
  ratio: number
  error?: string
}

const OPTIONS: ts.CompilerOptions = {
  strict: true,
  noEmit: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipLibCheck: true,
}

/**
 * Instantiations attributable to checking `source` with the given samples.
 *
 * A baseline program — same file, no instantiations — is measured and subtracted, so the
 * figure is the cost of the instantiations themselves rather than of parsing the lib.
 */
function measure(source: string, typeName: string, samples: string[]): number {
  const run = (withSamples: boolean): number => {
    const inst = (args: string) => (args.trim() ? `${typeName}<${args}>` : typeName)
    const uses = withSamples
      ? samples.map((a, i) => `export type __S${i} = ${inst(a)}`).join('\n')
      : ''
    const files = new Map<string, string>([['/m.ts', source + '\n' + uses + '\n']])

    const libDir = ts.getDefaultLibFilePath(OPTIONS).replace(/[^/\\]+$/, '')
    const host: ts.CompilerHost = {
      fileExists: (f) => files.has(f) || ts.sys.fileExists(f),
      readFile: (f) => files.get(f) ?? ts.sys.readFile(f),
      writeFile: () => {},
      getCanonicalFileName: (f) => f,
      getCurrentDirectory: () => '/',
      getDefaultLibFileName: () => libDir + 'lib.es2022.d.ts',
      getNewLine: () => '\n',
      useCaseSensitiveFileNames: () => true,
      getSourceFile: (f, lv) => {
        const text = files.get(f) ?? ts.sys.readFile(f)
        return text === undefined ? undefined : ts.createSourceFile(f, text, lv, true)
      },
    }

    const program = ts.createProgram(['/m.ts'], OPTIONS, host)
    const checker = program.getTypeChecker()
    const sf = program.getSourceFile('/m.ts')!
    // Force the checker to actually resolve everything; instantiation is lazy.
    program.getSemanticDiagnostics(sf)
    for (const stmt of sf.statements) {
      if (ts.isTypeAliasDeclaration(stmt) && stmt.name.text.startsWith('__S')) {
        // Stringifying the type is what forces the alias to be fully instantiated.
        checker.typeToString(
          checker.getTypeAtLocation(stmt),
          undefined,
          ts.TypeFormatFlags.NoTruncation,
        )
      }
    }
    // `getInstantiationCount` is what tsc reports under --extendedDiagnostics. It is
    // declared on the internal checker interface rather than the public one, so the
    // cast is the supported way to reach it from the API.
    return (checker as ts.TypeChecker & { getInstantiationCount(): number }).getInstantiationCount()
  }

  return Math.max(0, run(true) - run(false))
}

export function benchCase(
  name: string,
  original: string,
  compiled: string,
  typeName: string,
  samples: string[],
): BenchResult {
  try {
    return {
      name,
      originalInstantiations: measure(original, typeName, samples),
      compiledInstantiations: measure(compiled, typeName, samples),
      ratio: 0,
    }
  } catch (e) {
    return {
      name,
      originalInstantiations: 0,
      compiledInstantiations: 0,
      ratio: 0,
      error: (e as Error).message,
    }
  }
}

// ---------------------------------------------------------------------------
// Driver over the hand-authored corpus targets
// ---------------------------------------------------------------------------

function main(): number {
  const args = process.argv.slice(2)
  const filter = args.find((a) => !a.startsWith('-'))
  const jsonIdx = args.indexOf('--json')
  const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : undefined

  const dirs = findTargets().filter((d) => !filter || d.includes(filter))
  const results: BenchResult[] = []

  for (const dir of dirs) {
    const name = path.basename(path.dirname(dir)) + '/' + path.basename(dir)
    const stPath = path.join(dir, 'source.st.ts')
    const refPath = path.join(dir, 'reference.ts')
    if (!fs.existsSync(stPath) || !fs.existsSync(refPath)) continue

    let meta: { typeName: string; samples?: string[]; sourcePath?: string }
    try {
      meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'))
    } catch {
      continue
    }
    const samples = meta.samples ?? []
    if (!samples.length) continue

    // The reference needs the helper types it depends on, exactly as verify does.
    let original = fs.readFileSync(refPath, 'utf8')
    try {
      if (meta.sourcePath) {
        const ex = extractType(path.join(REPO_ROOT, meta.sourcePath), meta.typeName)
        if (ex.source) original = ex.source
      }
    } catch {
      /* fall back to reference.ts as written */
    }

    let compiled: string
    try {
      compiled = compile(fs.readFileSync(stPath, 'utf8'), { fileName: stPath }).code
    } catch (e) {
      results.push({
        name,
        originalInstantiations: 0,
        compiledInstantiations: 0,
        ratio: 0,
        error: `compile failed: ${(e as Error).message}`,
      })
      continue
    }

    const r = benchCase(name, original, compiled, meta.typeName, samples)
    r.ratio = r.originalInstantiations ? r.compiledInstantiations / r.originalInstantiations : 0
    results.push(r)
  }

  const ok = results.filter((r) => !r.error && r.originalInstantiations > 0)
  const width = Math.max(20, ...results.map((r) => r.name.length))
  console.log(`${'target'.padEnd(width)}  ${'original'.padStart(9)}  ${'compiled'.padStart(9)}  ratio`)
  for (const r of results) {
    if (r.error) {
      console.log(`${r.name.padEnd(width)}  ${'—'.padStart(9)}  ${'—'.padStart(9)}  ${r.error.slice(0, 40)}`)
      continue
    }
    // A type with no type parameters instantiates nothing in either form; reporting a
    // ratio of 0.00x for it would read as a huge win rather than as "not applicable".
    if (r.originalInstantiations === 0 && r.compiledInstantiations === 0) {
      console.log(`${r.name.padEnd(width)}  ${'0'.padStart(9)}  ${'0'.padStart(9)}  —  (nothing to instantiate)`)
      continue
    }
    const flag = r.ratio > 1.2 ? '  <-- worse' : r.ratio < 0.85 ? '  <-- better' : ''
    console.log(
      `${r.name.padEnd(width)}  ${String(r.originalInstantiations).padStart(9)}  ` +
        `${String(r.compiledInstantiations).padStart(9)}  ${r.ratio.toFixed(2)}x${flag}`,
    )
  }

  if (ok.length) {
    const totalO = ok.reduce((s, r) => s + r.originalInstantiations, 0)
    const totalC = ok.reduce((s, r) => s + r.compiledInstantiations, 0)
    // Report the aggregate ratio, not the mean of ratios: a cheap type with a 3x ratio
    // on six instantiations should not outweigh an expensive one that broke even.
    console.log(
      `\n${ok.length} targets · ${totalO} -> ${totalC} instantiations · ` +
        `${(totalC / totalO).toFixed(2)}x overall`,
    )
    const worse = ok.filter((r) => r.ratio > 1.2).length
    console.log(worse ? `${worse} target(s) more than 20% more expensive` : 'no target is more than 20% more expensive')
  }

  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(results, null, 2))
  return 0
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  process.exit(main())
}

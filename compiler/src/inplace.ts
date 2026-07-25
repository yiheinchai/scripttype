#!/usr/bin/env tsx
/**
 * In-place round-trip: the high-coverage harness.
 *
 * The single-file extraction harness (`batch.ts`) cannot judge ~64% of the corpus,
 * because a type that references another module — or a non-exported local helper —
 * cannot be typechecked in isolation.
 *
 * This harness sidesteps that entirely. Instead of extracting a self-contained copy,
 * it *appends* the recompiled aliases to the real source file, in a virtual overlay at
 * the real path. Consequences:
 *   - every local declaration, exported or not, is already in scope;
 *   - the file's own relative imports resolve against the real filesystem;
 *   - the original and the compiled version can be compared in one place.
 *
 * Generated names are suffixed so they cannot collide with the file's own, and only
 * diagnostics inside the appended region are attributed to us.
 *
 * Usage: tsx src/inplace.ts <file-or-dir>... [--json out.json] [--show]
 */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { compile } from './compile.js'
import { decompileFile, type NamespaceLink } from './decompile.js'
import { REPO_ROOT } from './corpus.js'
import { collectFiles, type Status } from './batch.js'
import { typecheckScriptType } from './typecheck.js'
import { ambientFor } from './freenames.js'

export interface Outcome {
  file: string
  name: string
  status: Status
  gaps: string[]
  detail?: string
}

const OPTIONS: ts.CompilerOptions = {
  strict: true,
  noEmit: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipLibCheck: true,
  noResolve: false,
  allowJs: false,
  noErrorTruncation: true,
  // The corpus clones have no node_modules; unresolved imports must not abort checking.
  noImplicitAny: false,
}

const LIB_CACHE = new Map<string, ts.SourceFile | undefined>()
function cachedFile(fileName: string, lv: ts.ScriptTarget | ts.CreateSourceFileOptions): ts.SourceFile | undefined {
  if (LIB_CACHE.has(fileName)) return LIB_CACHE.get(fileName)
  const text = ts.sys.readFile(fileName)
  const sf = text === undefined ? undefined : ts.createSourceFile(fileName, text, lv, true)
  LIB_CACHE.set(fileName, sf)
  return sf
}

const EQ_NAME = '__st_Eq'
const EQ_DECL = `type ${EQ_NAME}<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false`

/** Rename every alias a compiled module declares, so nothing collides with the host file. */
function suffixAliases(code: string, names: string[], suffix: string): { code: string; map: Map<string, string> } {
  const map = new Map<string, string>()
  for (const n of names) map.set(n, `${n}${suffix}`)
  let out = code
  for (const [from, to] of map) {
    out = out.replace(new RegExp(`(?<![A-Za-z0-9_$])${escapeRe(from)}(?![A-Za-z0-9_$])`, 'g'), to)
  }
  return { code: out, map }
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Names declared by a compiled module (top-level `type X =` declarations). */
function declaredNames(code: string): string[] {
  const out: string[] = []
  for (const m of code.matchAll(/^(?:export )?type ([A-Za-z_$][A-Za-z0-9_$]*)/gm)) out.push(m[1]!)
  return out
}

function witnessArgs(decl: ts.TypeAliasDeclaration, sf: ts.SourceFile): string[] {
  return (decl.typeParameters ?? []).map((tp) => {
    if (!tp.constraint) return 'any'
    const c = tp.constraint.getText(sf)
    if (/\binfer\b/.test(c)) return 'any'
    return c
  })
}

interface Overlay {
  rel: string
  abs: string
  /** Real text plus the appended generated aliases. */
  text: string
  /** Offset where the appended region begins. */
  offset: number
  live: { name: string; idx: number; ns: NamespaceLink[] }[]
  /** Outcomes already decided without needing the checker. */
  decided: Outcome[]
}

/**
 * Build the overlay for one file: its real text with the recompiled aliases appended.
 *
 * Checking is deliberately *not* done here. TypeScript re-binds and re-checks a file's
 * entire relative-import closure for every program it creates, so one program per file
 * repeats that work once per file. Overlaying every file in a shard and checking them in
 * a single program does it once.
 */
function buildOverlay(rel: string): Overlay | undefined {
  const abs = path.join(REPO_ROOT, rel)
  let realText: string
  try {
    realText = fs.readFileSync(abs, 'utf8')
  } catch {
    return undefined
  }
  if (realText.length > 1_200_000) return undefined

  const sf = ts.createSourceFile(abs, realText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const entries = decompileFile(abs, realText)
  if (!entries.length) return undefined

  const outcomes: Outcome[] = []
  const appended: string[] = ['', '// ===== ScriptType round-trip (generated) =====', EQ_DECL]
  const live: { name: string; idx: number; ns: NamespaceLink[] }[] = []

  entries.forEach((e, i) => {
    if (e.result.gaps.length) {
      outcomes.push({ file: rel, name: e.name, status: 'raw', gaps: e.result.gaps })
      return
    }
    let compiled
    try {
      compiled = compile(e.result.source, { fileName: `${e.name}.st.ts` })
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
    // ScriptType source must itself be valid TypeScript. This is part of verification:
    // a program that does not typecheck does not count, however good its output.
    const tc = typecheckScriptType({ [`${e.name}.st.ts`]: e.result.source }, [], ambientFor(e.result.source))
    if (!tc.ok) {
      outcomes.push({
        file: rel,
        name: e.name,
        status: 'typecheck-error',
        gaps: [],
        detail: (tc.errors[0] ?? tc.suppressions[0] ?? 'unknown').slice(0, 160),
      })
      return
    }

    const suffix = `__st${i}`
    const { code } = suffixAliases(compiled.code, declaredNames(compiled.code), suffix)
    const body = code.replace(/^export type /gm, 'type ').trimEnd()

    if (e.ns.length) {
      // Same namespace chain, so sibling and self references resolve exactly as they do
      // for the original. Export-ness must match too: merging a non-exported namespace
      // with an exported one of the same name is TS2395, and then every name inside it
      // fails to resolve.
      const inner = body.replace(/^type /gm, 'export type ')
      const exported = e.ns.some((l) => l.exported) ? 'export ' : ''
      appended.push(`${exported}namespace ${e.ns.map((l) => l.name).join('.')} {`)
      appended.push(inner)
      appended.push(`}`)
    } else {
      appended.push(body)
    }

    const qualify = (n: string) => (e.ns.length ? `${e.ns.map((l) => l.name).join('.')}.${n}` : n)
    const args = witnessArgs(e.decl, sf)
    const inst = (n: string) => (args.length ? `${qualify(n)}<${args.join(', ')}>` : qualify(n))
    appended.push(`type __st_EQ${i} = ${EQ_NAME}<${inst(e.name)}, ${inst(`${e.name}${suffix}`)}>`)
    live.push({ name: e.name, idx: i, ns: e.ns })
  })

  if (!live.length) return { rel, abs, text: realText, offset: realText.length, live: [], decided: outcomes }

  return {
    rel,
    abs,
    text: realText + appended.join('\n') + '\n',
    offset: realText.length,
    live,
    decided: outcomes,
  }
}

/** Check a batch of overlays in one program and produce their outcomes. */
function checkOverlays(overlays: Overlay[]): Outcome[] {
  const out: Outcome[] = []
  for (const o of overlays) out.push(...o.decided)
  const active = overlays.filter((o) => o.live.length)
  if (!active.length) return out

  const byPath = new Map(active.map((o) => [o.abs, o]))
  const host: ts.CompilerHost = {
    fileExists: (f) => byPath.has(f) || ts.sys.fileExists(f),
    readFile: (f) => byPath.get(f)?.text ?? ts.sys.readFile(f),
    writeFile: () => {},
    getCanonicalFileName: (f) => f,
    getCurrentDirectory: () => REPO_ROOT,
    getDefaultLibFileName: () => ts.getDefaultLibFilePath(OPTIONS),
    getNewLine: () => '\n',
    useCaseSensitiveFileNames: () => true,
    getSourceFile: (fileName, lv) => {
      const ov = byPath.get(fileName)
      if (ov) return ts.createSourceFile(fileName, ov.text, lv, true)
      return cachedFile(fileName, lv)
    },
  }

  let program: ts.Program
  try {
    program = ts.createProgram([...byPath.keys()], OPTIONS, host)
  } catch (err) {
    for (const o of active) {
      for (const l of o.live) {
        out.push({ file: o.rel, name: l.name, status: 'mismatch', gaps: [], detail: 'program creation failed' })
      }
    }
    return out
  }

  const checker = program.getTypeChecker()
  for (const o of active) out.push(...readOutcomes(program, checker, o))
  return out
}

function readOutcomes(program: ts.Program, checker: ts.TypeChecker, o: Overlay): Outcome[] {
  const outcomes: Outcome[] = []
  const { rel, abs, offset, live } = o
  const overlaySf = program.getSourceFile(abs)
  if (!overlaySf) {
    for (const l of live) {
      outcomes.push({ file: rel, name: l.name, status: 'mismatch', gaps: [], detail: 'overlay missing' })
    }
    return outcomes
  }
  // Only diagnostics inside the appended region are ours; the host file itself will
  // legitimately report unresolved imports (the clones have no node_modules).
  const ourDiags = program
    .getSemanticDiagnostics(overlaySf)
    .filter((d) => (d.start ?? 0) >= offset)
    .map((d) => ({ start: d.start ?? 0, msg: ts.flattenDiagnosticMessageText(d.messageText, ' ') }))

  const aliases = new Map<string, ts.TypeAliasDeclaration>()
  const indexAliases = (n: ts.Node) => {
    if (ts.isTypeAliasDeclaration(n) && n.getStart() >= offset) aliases.set(n.name.text, n)
    ts.forEachChild(n, indexAliases)
  }
  indexAliases(overlaySf)
  const resolve = (n: string): string | undefined => {
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
    const eqDecl = aliases.get(`__st_EQ${idx}`)
    const compiledDecl = aliases.get(`${name}__st${idx}`)
    // Attribute a diagnostic to this alias when it falls inside its own declaration.
    const own = compiledDecl
      ? ourDiags.filter((d) => d.start >= compiledDecl.getStart() && d.start <= compiledDecl.getEnd())
      : []
    if (own.length) {
      outcomes.push({ file: rel, name, status: 'compile-error', gaps: [], detail: own[0]!.msg })
      continue
    }
    const eq = eqDecl ? resolve(`__st_EQ${idx}`) : undefined
    if (eq === 'true') {
      outcomes.push({ file: rel, name, status: 'covered', gaps: [] })
    } else if (eq === undefined) {
      outcomes.push({ file: rel, name, status: 'mismatch', gaps: [], detail: 'comparison did not resolve' })
    } else {
      outcomes.push({
        file: rel,
        name,
        status: 'mismatch',
        gaps: [],
        detail: `eq=${eq}`,
      })
    }
  }
  return outcomes
}

/**
 * Round-trip a batch of files, checking them together.
 *
 * `onBatch` is invoked after each batch so a caller can persist partial results. That
 * matters because a single corpus file can occupy the checker for many minutes — typebox
 * and hotscript both contain type-level programs that are genuinely expensive to
 * evaluate — and a run that is cut short should still keep what it finished.
 */
export function inplaceFiles(
  rels: string[],
  batchSize = 20,
  onBatch?: (soFar: Outcome[]) => void,
): Outcome[] {
  const out: Outcome[] = []
  const overlays: Overlay[] = []
  for (const rel of rels) {
    try {
      const ov = buildOverlay(rel)
      if (ov) overlays.push(ov)
    } catch (err) {
      out.push({
        file: rel,
        name: '(file)',
        status: 'compile-error',
        gaps: [],
        detail: (err as Error).message.split('\n')[0],
      })
    }
  }
  // Batched rather than all at once: a single program over thousands of overlays holds
  // every type in memory simultaneously and exhausts the heap.
  for (let i = 0; i < overlays.length; i += batchSize) {
    out.push(...checkOverlays(overlays.slice(i, i + batchSize)))
    onBatch?.(out)
  }
  return out
}

/** Round-trip a single file. */
export function inplaceFile(rel: string): Outcome[] {
  return inplaceFiles([rel])
}

if (process.argv[1] && import.meta.filename === path.resolve(process.argv[1])) {
  const args = process.argv.slice(2)
  const jsonIdx = args.indexOf('--json')
  const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : undefined
  // `--shard k/n` processes only every n-th file, so the corpus can be split across
  // parallel workers. Sharding by file rather than by repository balances the load:
  // repositories differ by more than an order of magnitude in size.
  // `--files <listfile>` processes exactly the newline-separated paths given, so a sweep
  // pass can revisit only what an earlier capped run left unmeasured.
  const filesIdx = args.indexOf('--files')
  const filesList = filesIdx >= 0 ? args[filesIdx + 1] : undefined
  const batchIdx = args.indexOf('--batch')
  const batchArg = batchIdx >= 0 ? Number(args[batchIdx + 1]) : undefined

  const shardIdx = args.indexOf('--shard')
  const shardSpec = shardIdx >= 0 ? args[shardIdx + 1] : undefined
  let shard: { k: number; n: number } | undefined
  if (shardSpec) {
    const [k, n] = shardSpec.split('/').map(Number)
    if (!Number.isInteger(k) || !Number.isInteger(n) || !n || k! >= n!) {
      console.error(`invalid --shard '${shardSpec}': expected k/n with 0 <= k < n`)
      process.exit(2)
    }
    shard = { k: k!, n: n! }
  }
  const skipValues = new Set<string | undefined>()
  if (jsonIdx >= 0) skipValues.add(args[jsonIdx + 1])
  if (shardIdx >= 0) skipValues.add(args[shardIdx + 1])
  const valueSlots = new Set(
    [jsonIdx, shardIdx, filesIdx, batchIdx].filter((i) => i >= 0).map((i) => i + 1),
  )
  const roots = args.filter((a, i) => !a.startsWith('--') && !valueSlots.has(i))
  if (!roots.length && !filesList) {
    console.error(
      'usage: inplace.ts <file-or-dir>... [--json out.json] [--shard k/n] [--batch n]\n' +
        '   or: inplace.ts --files <listfile> [--json out.json] [--shard k/n] [--batch n]',
    )
    process.exit(2)
  }

  const files: string[] = []
  if (filesList) {
    files.push(
      ...fs
        .readFileSync(filesList, 'utf8')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
    )
  } else {
    for (const root of roots) files.push(...collectFiles(root))
  }
  const mine = shard ? files.filter((_, i) => i % shard!.n === shard!.k) : files

  // Persist after every batch, so a shard that is killed mid-run still contributes.
  const writeSoFar = (soFar: Outcome[]) => {
    if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(soFar))
  }
  const all: Outcome[] = inplaceFiles(mine, batchArg && batchArg > 0 ? batchArg : 5, writeSoFar)

  const counts = new Map<Status, number>()
  for (const o of all) counts.set(o.status, (counts.get(o.status) ?? 0) + 1)
  const total = all.length
  const covered = counts.get('covered') ?? 0
  console.log(`\n=== ${total} generic type aliases ===`)
  for (const [s, n] of [...counts].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(5)}  ${s}  (${((n / total) * 100).toFixed(1)}%)`)
  }
  console.log(`\ncovered: ${covered}/${total} = ${((covered / total) * 100).toFixed(1)}%`)

  const reasons = new Map<string, number>()
  for (const o of all) {
    if (o.status === 'compile-error' || o.status === 'mismatch') {
      const k = (o.detail ?? '?').replace(/'[^']*'/g, "'X'").slice(0, 90)
      reasons.set(k, (reasons.get(k) ?? 0) + 1)
    }
  }
  if (reasons.size) {
    console.log('\ntop failure reasons:')
    for (const [d, n] of [...reasons].sort((a, b) => b[1] - a[1]).slice(0, 15)) {
      console.log(`  ${String(n).padStart(5)}  ${d}`)
    }
  }
  if (jsonOut) {
    fs.writeFileSync(jsonOut, JSON.stringify(all, null, 2))
    console.log(`\nwrote ${jsonOut}`)
  }
}

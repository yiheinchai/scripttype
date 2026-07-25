/**
 * Semantic equivalence verifier.
 *
 * Textual comparison is the wrong criterion (helper names, clause order and
 * whitespace are all semantically irrelevant), so instead we ask the TypeScript
 * checker itself: for each sample instantiation, is `Equals<Original<A>, Compiled<A>>`
 * exactly `true`?
 *
 * `Equals` is the well-known conditional-variance trick. It is strictly stronger than
 * mutual assignability — it distinguishes `any` from `unknown`, and `{a: string}` from
 * `{a: string} | {a: string}` collapse artefacts — which is what makes it the right gate.
 *
 * Original and compiled types live in separate in-memory modules so their internal
 * helper names can collide freely.
 */
import ts from 'typescript'

export interface VerifyCase {
  /** Human-readable id, e.g. 'kysely/ExtractAliasFromStringSelectExpression'. */
  name: string
  /** Source text defining the reference type (plus any helpers it needs). */
  original: string
  /** Source text of the ScriptType-compiled output. */
  compiled: string
  /** The exported type name to compare in both modules. */
  typeName: string
  /** Type-argument lists to instantiate, e.g. ["'a/b', '/'", "'x', '/'"]. */
  samples: string[]
}

export interface SampleResult {
  args: string
  equal: boolean
  originalType?: string
  compiledType?: string
}

export interface VerifyResult {
  name: string
  ok: boolean
  /** Type errors in the compiled module — always a hard failure. */
  compiledDiagnostics: string[]
  /** Type errors in the reference module — usually means the fixture is wrong. */
  originalDiagnostics: string[]
  samples: SampleResult[]
  error?: string
}

const EQUALS_HELPER = `export type __Equals<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
`

export function verify(c: VerifyCase): VerifyResult {
  const files = new Map<string, string>()
  files.set('/eq.ts', EQUALS_HELPER)
  files.set('/original.ts', c.original)
  files.set('/compiled.ts', c.compiled)

  const assertions = c.samples
    .map((args, i) => {
      // A non-generic type must be referenced bare; `T<>` is a syntax error.
      const inst = (ns: string) => (args.trim() ? `${ns}.${c.typeName}<${args}>` : `${ns}.${c.typeName}`)
      return (
        `export type __O${i} = ${inst('O')}\n` +
        `export type __C${i} = ${inst('C')}\n` +
        `export type __EQ${i} = __Equals<${inst('O')}, ${inst('C')}>`
      )
    })
    .join('\n')

  files.set(
    '/check.ts',
    `import type * as O from './original.js'\n` +
      `import type * as C from './compiled.js'\n` +
      `import type { __Equals } from './eq.js'\n` +
      assertions +
      '\n',
  )

  const options: ts.CompilerOptions = {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
  }

  const libDir = ts.getDefaultLibFilePath(options).replace(/[^/\\]+$/, '')
  const host: ts.CompilerHost = {
    fileExists: (f) => files.has(f) || ts.sys.fileExists(f),
    readFile: (f) => files.get(f) ?? ts.sys.readFile(f),
    writeFile: () => {},
    getCanonicalFileName: (f) => f,
    getCurrentDirectory: () => '/',
    getDefaultLibFileName: () => libDir + 'lib.es2022.d.ts',
    getNewLine: () => '\n',
    useCaseSensitiveFileNames: () => true,
    getSourceFile: (fileName, languageVersion) => {
      const text = files.get(fileName) ?? ts.sys.readFile(fileName)
      if (text === undefined) return undefined
      return ts.createSourceFile(fileName, text, languageVersion, true)
    },
  }

  let program: ts.Program
  try {
    program = ts.createProgram(['/check.ts'], options, host)
  } catch (e) {
    return {
      name: c.name,
      ok: false,
      compiledDiagnostics: [],
      originalDiagnostics: [],
      samples: [],
      error: `failed to create program: ${(e as Error).message}`,
    }
  }

  const checker = program.getTypeChecker()
  const fmt = (d: ts.Diagnostic) => ts.flattenDiagnosticMessageText(d.messageText, ' ')
  const diagsFor = (path: string): string[] => {
    const sf = program.getSourceFile(path)
    if (!sf) return [`missing source file ${path}`]
    return [...program.getSemanticDiagnostics(sf), ...program.getSyntacticDiagnostics(sf)].map(fmt)
  }

  const compiledDiagnostics = diagsFor('/compiled.ts')
  const originalDiagnostics = diagsFor('/original.ts')
  const checkSf = program.getSourceFile('/check.ts')!
  const checkDiagnostics = [
    ...program.getSemanticDiagnostics(checkSf),
    ...program.getSyntacticDiagnostics(checkSf),
  ].map(fmt)

  // Index the alias declarations we generated so we can resolve their types.
  const aliases = new Map<string, ts.TypeAliasDeclaration>()
  for (const stmt of checkSf.statements) {
    if (ts.isTypeAliasDeclaration(stmt)) aliases.set(stmt.name.text, stmt)
  }

  const typeStringOf = (name: string): string | undefined => {
    const decl = aliases.get(name)
    if (!decl) return undefined
    const t = checker.getTypeAtLocation(decl.type)
    return checker.typeToString(t, undefined, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias)
  }

  const samples: SampleResult[] = c.samples.map((args, i) => {
    const eq = typeStringOf(`__EQ${i}`)
    return {
      args,
      equal: eq === 'true',
      originalType: typeStringOf(`__O${i}`),
      compiledType: typeStringOf(`__C${i}`),
    }
  })

  const ok =
    compiledDiagnostics.length === 0 &&
    originalDiagnostics.length === 0 &&
    checkDiagnostics.length === 0 &&
    samples.length > 0 &&
    samples.every((s) => s.equal)

  return {
    name: c.name,
    ok,
    compiledDiagnostics: [...compiledDiagnostics, ...checkDiagnostics.map((d) => `[check] ${d}`)],
    originalDiagnostics,
    samples,
  }
}

export function formatResult(r: VerifyResult): string {
  if (r.ok) return `PASS  ${r.name}  (${r.samples.length} samples)`
  const lines = [`FAIL  ${r.name}`]
  if (r.error) lines.push(`  error: ${r.error}`)
  for (const d of r.originalDiagnostics) lines.push(`  reference type error: ${d}`)
  for (const d of r.compiledDiagnostics) lines.push(`  compiled type error: ${d}`)
  for (const s of r.samples) {
    if (s.equal) continue
    lines.push(`  mismatch for <${s.args}>`)
    lines.push(`    original: ${s.originalType}`)
    lines.push(`    compiled: ${s.compiledType}`)
  }
  return lines.join('\n')
}

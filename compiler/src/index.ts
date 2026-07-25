/**
 * The public API.
 *
 * Everything re-exported here is supported and will not change shape without a version
 * bump. Everything else under `src/` is internal — the lowering, the IR, the corpus
 * harnesses — and is deliberately not reachable through the package `exports` map, so a
 * consumer cannot come to depend on it by accident.
 *
 *     import { compileAll, formatDiagnostic } from 'scripttype'
 *
 *     const { result, errors } = compileAll(source, { fileName: 'types.st.ts' })
 *     for (const e of errors) console.error(formatDiagnostic({ code: e.code, message: e.message }))
 *     if (result) writeFileSync('types.ts', result.code)
 */

// --- Compiling ScriptType to TypeScript -------------------------------------
export {
  compile,
  compileAll,
  rewriteSpecifier,
  CompileError,
  type CompileOptions,
  type CompileResult,
} from './compile.js'

// --- Going the other way: TypeScript types to ScriptType --------------------
export { decompileAlias, decompileFile, type DecompileResult } from './decompile.js'

// --- Checking that ScriptType source is valid TypeScript --------------------
export {
  typecheckScriptType,
  AMBIENT_DTS,
  type TypecheckResult,
  type TypecheckDiagnostic,
} from './typecheck.js'

// --- Reporting problems -----------------------------------------------------
export {
  CATALOGUE,
  allCodes,
  didYouMean,
  explain,
  formatDiagnostic,
  type DiagCode,
  type Diagnostic,
  type DiagnosticSpec,
} from './diagnostics.js'

// --- Introspecting the language --------------------------------------------
export { BUILTINS, type Builtin } from './builtins.js'

/** The version of this package, for tools that report it. */
export const VERSION = '0.1.0'

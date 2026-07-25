/**
 * TypeScript language-service plugin: ScriptType errors in the editor, as you type.
 *
 * This closes the one place where ScriptType was flatly *harder* than writing types by
 * hand. A type error in vanilla TypeScript is underlined the moment you type it; a
 * ScriptType error required saving the file and running the CLI, and only 2 of 9 error
 * classes happened to be visible to the editor (the ones that are also plain TypeScript
 * errors, like an undeclared `console`). The other seven were invisible until you ran a
 * command.
 *
 * A tsserver plugin fixes that for every editor that speaks the protocol — VS Code,
 * WebStorm, neovim — with no extension to install: add it to `tsconfig.json` under
 * `compilerOptions.plugins` and the diagnostics appear alongside TypeScript's own.
 *
 * Enable it with:
 *
 *     { "compilerOptions": { "plugins": [{ "name": "scripttype/ts-plugin" }] } }
 *
 * (In VS Code this needs the workspace TypeScript version — "TypeScript: Select
 * TypeScript Version" -> "Use Workspace Version" — because plugins load in tsserver.)
 *
 * Deliberately conservative: it only ever *adds* diagnostics to `.st.ts` files, and any
 * failure inside the compiler is swallowed. An editor plugin that breaks the editor is
 * worse than no plugin, so a compiler bug must degrade to "no ScriptType diagnostics",
 * never to a dead language service.
 */
import type tsModule from 'typescript/lib/tsserverlibrary'
import { compileAll } from './compile.js'
import { CATALOGUE, type DiagCode } from './diagnostics.js'

/**
 * ScriptType codes rendered as TypeScript diagnostic codes.
 *
 * `ts.Diagnostic.code` is a number, so `ST1102` becomes `951102`. The 95xxxx range is
 * far outside the codes TypeScript itself issues, so nothing collides, and the readable
 * form is kept at the front of the message where the user actually reads it.
 */
const CODE_BASE = 950000
const numericCode = (code: string): number => {
  const n = Number(code.replace(/^\D+/, ''))
  return Number.isFinite(n) ? CODE_BASE + n : CODE_BASE
}

const IS_SCRIPTTYPE = /\.st\.[cm]?[jt]sx?$/

function init(mod: { typescript: typeof tsModule }) {
  const ts = mod.typescript

  function create(info: tsModule.server.PluginCreateInfo) {
    const log = (msg: string) => info.project.projectService.logger.info(`[scripttype] ${msg}`)
    log('plugin loaded')

    // Proxy every method through, so anything not overridden behaves exactly as before.
    const proxy: tsModule.LanguageService = Object.create(null)
    for (const k of Object.keys(info.languageService) as (keyof tsModule.LanguageService)[]) {
      const original = info.languageService[k]
      // Heterogeneous interface, so the index write is untyped by necessity.
      ;(proxy as unknown as Record<string, unknown>)[k] = (...args: unknown[]) =>
        (original as (...a: unknown[]) => unknown).apply(info.languageService, args)
    }

    proxy.getSemanticDiagnostics = (fileName) => {
      const prior = info.languageService.getSemanticDiagnostics(fileName)
      if (!IS_SCRIPTTYPE.test(fileName)) return prior

      const program = info.languageService.getProgram()
      const file = program?.getSourceFile(fileName)
      if (!file) return prior

      try {
        return [...prior, ...scriptTypeDiagnostics(ts, file, fileName)]
      } catch (e) {
        // Never let a compiler bug take the language service down with it.
        log(`diagnostics failed for ${fileName}: ${(e as Error).message}`)
        return prior
      }
    }

    // Hovering a ScriptType function shows the TypeScript it compiles to.
    //
    // This is the part that goes past parity rather than reaching it. The compiled type
    // is the thing you actually care about and it lives in another file, so without this
    // you are holding two artifacts in your head at once — the one failure mode a
    // compile-to-TypeScript language adds that hand-written types do not have.
    proxy.getQuickInfoAtPosition = (fileName, position) => {
      const prior = info.languageService.getQuickInfoAtPosition(fileName, position)
      if (!IS_SCRIPTTYPE.test(fileName)) return prior

      const file = info.languageService.getProgram()?.getSourceFile(fileName)
      if (!file) return prior

      try {
        const emitted = compiledAliasAt(ts, file, fileName, position)
        if (!emitted) return prior
        // Leading newlines because editors concatenate documentation parts with no
        // separator, which ran this straight onto the end of the preceding sentence.
        const docs: tsModule.SymbolDisplayPart[] = [
          { kind: 'text', text: '\n\ncompiles to:\n\n```ts\n' + emitted + '\n```' },
        ]
        // Keep whatever TypeScript had to say and add to it, rather than replacing a
        // hover the user may also want.
        return prior
          ? { ...prior, documentation: [...(prior.documentation ?? []), ...docs] }
          : {
              kind: ts.ScriptElementKind.functionElement,
              kindModifiers: '',
              textSpan: { start: position, length: 0 },
              documentation: docs,
            }
      } catch (e) {
        log(`quick info failed for ${fileName}: ${(e as Error).message}`)
        return prior
      }
    }

    return proxy
  }

  return { create }
}

/**
 * The emitted TypeScript for the ScriptType function containing `position`, if any.
 *
 * Matching is by name: the compiler emits the user-facing alias first, followed by any
 * generated helpers, and all of them are worth showing — the helper is where a recovered
 * loop actually lives.
 */
function compiledAliasAt(
  ts: typeof tsModule,
  file: tsModule.SourceFile,
  fileName: string,
  position: number,
): string | undefined {
  // Only when the cursor is on the function's *name*. Firing anywhere in the body would
  // append the whole compiled alias to every hover inside it, including hovers over
  // builtins that have useful documentation of their own.
  let name: string | undefined
  for (const stmt of file.statements) {
    if (!ts.isFunctionDeclaration(stmt) || !stmt.name) continue
    if (position >= stmt.name.getStart(file) && position <= stmt.name.getEnd()) {
      name = stmt.name.text
    }
  }
  if (!name) return undefined

  const { result } = compileAll(file.getFullText(), { fileName, includePrelude: false })
  if (!result) return undefined

  // `aliases` holds one emitted declaration each: the function's own, then its helpers,
  // which are named `Fn__loop` and friends.
  const own = result.aliases.filter((a) =>
    new RegExp(`\\btype ${name}(__[A-Za-z0-9_$]+)?\\s*[<=]`).test(a),
  )
  return own.length ? own.join('\n') : undefined
}

/** Compile the file and translate whatever went wrong into editor diagnostics. */
function scriptTypeDiagnostics(
  ts: typeof tsModule,
  file: tsModule.SourceFile,
  fileName: string,
): tsModule.Diagnostic[] {
  const { errors } = compileAll(file.getFullText(), { fileName })
  return errors.map((e) => {
    // A node from our own parse of the same text: the offsets line up, but clamp anyway
    // rather than risk asking the editor to underline past the end of the file.
    const start = e.node ? Math.min(e.node.getStart(e.node.getSourceFile()), file.end) : 0
    const end = e.node ? Math.min(e.node.getEnd(), file.end) : 0

    const help = e.help ?? CATALOGUE[e.code as DiagCode]?.help
    return {
      file,
      start,
      length: Math.max(1, end - start),
      // The readable code leads, because that is what a user searches for and what
      // `scripttype explain` takes.
      messageText: `[${e.code}] ${e.message}` + (help ? `\n  help: ${help}` : ''),
      category: ts.DiagnosticCategory.Error,
      code: numericCode(e.code),
      source: 'scripttype',
    }
  })
}

export = init

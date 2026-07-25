import ts from 'typescript'
import { mapExpr } from './ir.js'
import { formatAlias } from './format.js'
import { compileSourceFile, CompileError, type ImportInfo } from './lower.js'
import { resolvePrelude } from './prelude.js'
import { optimize } from './optimize.js'

export interface CompileOptions {
  /** Emit the prelude helper types the module depends on. Off for snippet tests. */
  includePrelude?: boolean
  fileName?: string
  /** Keep parameter names verbatim (see LowerOptions.preserveParamNames). */
  preserveParamNames?: boolean
  /** Column to wrap emitted declarations at. */
  width?: number
}

export interface CompileResult {
  code: string
  /** Emitted aliases in order: user-facing alias first, then generated helpers. */
  aliases: string[]
  prelude: string[]
  /** Type-only imports carried over from the source, with specifiers rewritten. */
  imports: string[]
}

export function compile(source: string, opts: CompileOptions = {}): CompileResult {
  const fileName = opts.fileName ?? 'input.st.ts'
  // A `.js` source is the pure-JavaScript dialect: parse as JS so JSDoc types, which
  // carry the type-parameter constraints, are attached to the AST.
  const kind = /\.jsx?$/.test(fileName) ? ts.ScriptKind.JS : ts.ScriptKind.TS
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, kind)

  const syntactic = (sf as unknown as { parseDiagnostics?: ts.Diagnostic[] }).parseDiagnostics ?? []
  if (syntactic.length) {
    const d = syntactic[0]!
    // Attach the span so the CLI can draw a source frame, rather than embedding a
    // "at 3:12" fragment in the message text.
    const node = d.start != null ? findNodeAt(sf, d.start) : undefined
    throw new CompileError(
      ts.flattenDiagnosticMessageText(d.messageText, ' '),
      node ?? sf,
      'ST1001',
    )
  }

  // Generated sources opt in via a pragma so the setting travels with the file.
  const preserveParamNames =
    opts.preserveParamNames ?? /@scripttype\s+preserveParamNames/.test(source)
  const { aliases, prelude, imports } = compileSourceFile(sf, { preserveParamNames })
  for (const a of aliases) a.body = optimize(a.body)

  const entries = opts.includePrelude === false ? [] : resolvePrelude(prelude)

  // A user type may share a name with a prelude helper (a ScriptType function called
  // `Equals` alongside the `Equals` helper). Rename the helper, not the user's type.
  const userNames = new Set(aliases.map((a) => a.name))
  const renames = new Map<string, string>()
  for (const e of entries) {
    for (const p of e.provides) {
      if (userNames.has(p)) {
        let candidate = `${p}$`
        while (userNames.has(candidate) || renames.has(candidate)) candidate += '$'
        renames.set(p, candidate)
      }
    }
  }

  const preludeSrc = entries.map((e) => applyRenames(e.source, renames))
  if (renames.size) {
    for (const a of aliases) {
      a.body = mapExpr(a.body, (x) =>
        x.kind === 'ref' && renames.has(x.name)
          ? { ...x, name: renames.get(x.name)! }
          : undefined,
      )
    }
  }

  const aliasSrc = aliases.map((a) => formatAlias(a, { width: opts.width }))
  const importSrc = renderImports(imports, aliasSrc.join('\n'))
  const parts: string[] = []
  if (importSrc.length) parts.push(...importSrc, '')
  if (preludeSrc.length) {
    parts.push('// --- ScriptType prelude ---', ...preludeSrc, '')
  }
  parts.push(...aliasSrc)

  return {
    code: parts.join('\n') + '\n',
    aliases: aliasSrc,
    prelude: preludeSrc,
    imports: importSrc,
  }
}

/**
 * Rewrite a module specifier for the compiled world.
 *
 * A ScriptType module `shared.st.ts` compiles to `shared.ts`, so a source that imports
 * from `./shared.st.js` — the spelling that makes TypeScript resolve to the `.st.ts`
 * file, and therefore the spelling that lets the *source* typecheck — must import from
 * `./shared.js` once compiled. Anything that is not a ScriptType module is left alone.
 */
export function rewriteSpecifier(spec: string): string {
  return spec.replace(/\.st(\.[cm]?js|\.[cm]?ts)?$/, (_m, ext: string | undefined) => ext ?? '')
}

/**
 * Render carried-over imports as type-only imports.
 *
 * Only names the output actually mentions are emitted: a ScriptType source may import a
 * helper that gets inlined away, and an unused import is an error under `noUnusedLocals`.
 * A re-export is emitted whether or not it is referenced, because its whole purpose is
 * to be visible to other modules.
 */
function renderImports(imports: ImportInfo[], body: string): string[] {
  const mentions = (name: string) => new RegExp(`(?<![A-Za-z0-9_$])${name}(?![A-Za-z0-9_$])`).test(body)
  const out: string[] = []
  for (const i of imports) {
    const spec = rewriteSpecifier(i.specifier)
    if (i.isExport) {
      const clause = i.namespaceName
        ? `* as ${i.namespaceName}`
        : `{ ${i.named.map((n) => (n.alias ? `${n.name} as ${n.alias}` : n.name)).join(', ')} }`
      out.push(`export type ${clause} from '${spec}'`)
      continue
    }
    const named = i.named.filter((n) => mentions(n.alias ?? n.name))
    const clauses: string[] = []
    if (i.defaultName && mentions(i.defaultName)) clauses.push(i.defaultName)
    if (i.namespaceName && mentions(i.namespaceName)) clauses.push(`* as ${i.namespaceName}`)
    if (named.length) {
      clauses.push(`{ ${named.map((n) => (n.alias ? `${n.name} as ${n.alias}` : n.name)).join(', ')} }`)
    }
    if (clauses.length) out.push(`import type ${clauses.join(', ')} from '${spec}'`)
  }
  return out
}

/** Innermost node containing `pos`, so a parse diagnostic gets a span to underline. */
function findNodeAt(sf: ts.SourceFile, pos: number): ts.Node | undefined {
  let found: ts.Node | undefined
  const visit = (n: ts.Node): void => {
    if (pos >= n.getStart(sf) && pos < n.getEnd()) {
      found = n
      ts.forEachChild(n, visit)
    }
  }
  ts.forEachChild(sf, visit)
  return found
}

/** Whole-word rename of type names inside prelude source text. */
function applyRenames(src: string, renames: Map<string, string>): string {
  if (!renames.size) return src
  let out = src
  for (const [from, to] of renames) {
    out = out.replace(new RegExp(`(?<![A-Za-z0-9_$])${from}(?![A-Za-z0-9_$])`, 'g'), to)
  }
  return out
}

export { CompileError }

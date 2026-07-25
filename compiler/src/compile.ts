import ts from 'typescript'
import { mapExpr } from './ir.js'
import { formatAlias } from './format.js'
import { compileSourceFile, CompileError } from './lower.js'
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
  const { aliases, prelude } = compileSourceFile(sf, { preserveParamNames })
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
  const parts: string[] = []
  if (preludeSrc.length) {
    parts.push('// --- ScriptType prelude ---', ...preludeSrc, '')
  }
  parts.push(...aliasSrc)

  return { code: parts.join('\n') + '\n', aliases: aliasSrc, prelude: preludeSrc }
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

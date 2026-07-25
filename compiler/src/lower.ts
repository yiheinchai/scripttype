/**
 * The lowering pass: imperative statements -> pure type expressions.
 *
 * The whole compiler is a continuation-passing translation. `lowerStmts` carries a
 * continuation `k` describing "what the rest of the function does", so an `if`
 * becomes a conditional type whose two branches each contain the continuation, and
 * a `return` simply discards it. Loops become generated tail-recursive helper
 * aliases whose parameters are the loop's mutable variables.
 */
import ts from 'typescript'
import {
  type TypeAlias,
  type TypeExpr,
  type TypeParam,
  NEVER,
  cond,
  countRefs,
  emit,
  indexed,
  infer as inferNode,
  intersection,
  kw,
  num,
  bool,
  ref,
  str,
  substitute,
  template,
  tuple,
  union,
} from './ir.js'
import { BUILTINS, type Lowering, guardEquivalent } from './builtins.js'
import { didYouMean } from './diagnostics.js'

/**
 * A user-facing compiler error.
 *
 * `code` indexes the diagnostic catalogue, which supplies the `help:` line and the
 * long-form `scripttype explain` text. `help` overrides the catalogue where the throw
 * site knows something more specific (a "did you mean" suggestion, say).
 */
export class CompileError extends Error {
  readonly code: string
  readonly help?: string

  constructor(
    message: string,
    readonly node?: ts.Node,
    code: string = 'ST1500',
    help?: string,
  ) {
    super(message)
    this.code = code
    this.help = help
  }
}

/**
 * What each `typeof` tag narrows to as a type. Thunks, because the IR nodes for the
 * compound cases are built rather than shared.
 */
const TYPEOF_TAGS: Record<string, () => TypeExpr> = {
  string: () => kw('string'),
  number: () => kw('number'),
  boolean: () => kw('boolean'),
  bigint: () => kw('bigint'),
  symbol: () => kw('symbol'),
  object: () => kw('object'),
  undefined: () => kw('undefined'),
  // There is no `function` keyword type, and the general callable signature must take
  // a *rest* parameter: `(a0: any[]) => any` accepts only a single array argument, so
  // `(x: string) => void` would not match it.
  function: () => ({
    kind: 'fn',
    params: [{ kind: 'array', element: kw('any') }],
    ret: kw('any'),
    hasRest: true,
  }),
}

/**
 * The element type of an array constraint, when it is informative.
 *
 * `readonly unknown[]` is the fallback constraint the loop lowering uses when nothing
 * better is known, and constraining a peeled element to `unknown` buys nothing, so it
 * is treated as absent.
 */
function elementTypeOf(constraint: TypeExpr | undefined): TypeExpr | undefined {
  if (!constraint) return undefined
  if (constraint.kind === 'array') {
    const el = constraint.element
    return el.kind === 'keyword' && el.name === 'unknown' ? undefined : el
  }
  return undefined
}

/** Arguments for the CompileError constructor, spread at a throw site. */
type ErrorArgs = [message: string, node: ts.Node, code: string, help?: string]

/** Human-readable name for a statement kind, for "X has no type-level meaning". */
function describeStatement(stmt: ts.Statement): string {
  const names: Partial<Record<ts.SyntaxKind, string>> = {
    [ts.SyntaxKind.TryStatement]: '`try`/`catch`',
    [ts.SyntaxKind.DoStatement]: '`do`/`while`',
    [ts.SyntaxKind.ForStatement]: 'a C-style `for` loop',
    [ts.SyntaxKind.LabeledStatement]: 'a labelled statement',
    [ts.SyntaxKind.ClassDeclaration]: 'a class declaration',
    [ts.SyntaxKind.WithStatement]: '`with`',
    [ts.SyntaxKind.EmptyStatement]: 'an empty statement',
    [ts.SyntaxKind.DebuggerStatement]: '`debugger`',
    [ts.SyntaxKind.FunctionDeclaration]: 'a nested function declaration',
  }
  return names[stmt.kind] ?? `\`${ts.SyntaxKind[stmt.kind]}\``
}

/**
 * `unknown variable 'x'` is the most common ScriptType error, and almost always either
 * a typo or a reach for a runtime global. Both deserve a specific fix, not a generic one.
 */
function unknownVariable(target: ts.Identifier, vars: Vars): ErrorArgs {
  const name = target.text
  const RUNTIME_GLOBALS = new Set([
    'console', 'Math', 'JSON', 'process', 'window', 'document', 'globalThis',
    'Date', 'RegExp', 'Error', 'Map', 'Set', 'Reflect',
  ])
  if (RUNTIME_GLOBALS.has(name)) {
    return [
      `'${name}' is a runtime value and has no type-level meaning`,
      target,
      'ST1102',
      `Type-level code cannot observe \`${name}\`; delete the statement.`,
    ]
  }
  const near = didYouMean(name, [...vars.keys(), ...Object.keys(BUILTINS)])
  return [
    `unknown variable '${name}'`,
    target,
    'ST1102',
    near ? `Did you mean \`${near}\`?` : undefined,
  ]
}

/** Compound assignment and side-effecting calls are the two common shapes here. */
function unsupportedStatementExpression(e: ts.Expression): ErrorArgs {
  if (ts.isBinaryExpression(e) && ts.isIdentifier(e.left)) {
    const op = ts.tokenToString(e.operatorToken.kind) ?? '?='
    if (op.length > 1 && op.endsWith('=')) {
      const bare = op.slice(0, -1)
      const x = e.left.text
      return [
        `compound assignment \`${op}\` is not supported`,
        e,
        'ST1101',
        `Write it out: \`${x} = ${x} ${bare} ${e.right.getText()}\`.`,
      ]
    }
  }
  return [`\`${e.getText()}\` has no type-level meaning`, e, 'ST1101']
}

/** An unsupported expression, with a hint for the shapes people actually reach for. */
function unsupportedExpression(e: ts.Expression): ErrorArgs {
  const hints: Partial<Record<ts.SyntaxKind, string>> = {
    [ts.SyntaxKind.ArrowFunction]:
      'Type-level code has no closures; declare a top-level function and call it by name.',
    [ts.SyntaxKind.FunctionExpression]:
      'Type-level code has no closures; declare a top-level function and call it by name.',
    [ts.SyntaxKind.AwaitExpression]: 'There is nothing to await at the type level.',
    [ts.SyntaxKind.NewExpression]:
      'Use `ctorType(params, ret)` for a constructor type, or name the type with `t<T>()`.',
    [ts.SyntaxKind.RegularExpressionLiteral]:
      'Match with a template-literal pattern instead: `matches<`${Hole<"A">}-${Hole<"B">}`>(x)`.',
    [ts.SyntaxKind.TypeOfExpression]:
      'In an expression a name already denotes its type; `typeof` is only needed inside a type annotation.',
  }
  return [
    `${ts.SyntaxKind[e.kind]} \`${ellipsis(e.getText())}\` has no type-level lowering`,
    e,
    'ST1500',
    hints[e.kind],
  ]
}

const ellipsis = (s: string, n = 40): string =>
  s.length <= n ? s : s.slice(0, n - 1).replace(/\s+$/, '') + '…'

/** Variable environment: source identifier -> current type-level value. */
type Vars = Map<string, TypeExpr>

/** What to emit once the current statement list runs out. */
type Cont = (vars: Vars) => TypeExpr

interface LoopCtx {
  onBreak: Cont
  onContinue: Cont
}

const TYPE_KEYWORDS = new Set([
  'string',
  'number',
  'boolean',
  'bigint',
  'symbol',
  'object',
  'unknown',
  'never',
  'any',
  'void',
  'null',
  'undefined',
])

function pascal(name: string): string {
  if (!name) return name
  // Already capitalized (or SHOUTY) — respect the author's choice so emitted
  // parameter names can match a library's originals exactly.
  if (name[0] === name[0]!.toUpperCase()) return name
  return name[0]!.toUpperCase() + name.slice(1)
}

/**
 * An import or re-export carried through from the source.
 *
 * Everything a ScriptType module imports becomes a *type* once compiled — a type
 * function is called in value position in the source but is a generic alias in the
 * output — so the emitted form is always `import type`.
 */
export interface ImportInfo {
  /** Module specifier as written, before `.st.js` -> `.js` rewriting. */
  specifier: string
  named: { name: string; alias?: string }[]
  defaultName?: string
  namespaceName?: string
  /** A re-export (`export { X } from …`) rather than an import. */
  isExport: boolean
}

/**
 * A ScriptType type function, however it was spelled.
 *
 * Both spellings mean the same thing and compile identically:
 *
 *     export function Trim(v: string) { return TrimLeft(TrimRight(v)) }
 *     export const Trim = (v: string) => TrimLeft(TrimRight(v))
 *
 * The arrow form exists because the statement form was the one place ScriptType was
 * reliably *longer* than the TypeScript it replaces — three lines against one for an
 * alias that is just a composition. A language whose selling point is ergonomics cannot
 * afford to lose on the simplest case.
 */
interface TypeFunction {
  name: string
  parameters: ts.NodeArray<ts.ParameterDeclaration>
  /** A block, or a bare expression for a concise arrow body. */
  body: ts.Block | ts.Expression
  exported: boolean
  /** Where to look for JSDoc: the declaration statement, not the arrow itself. */
  docNode: ts.Node
}

export interface ModuleResult {
  aliases: TypeAlias[]
  prelude: Set<string>
  imports: ImportInfo[]
  /**
   * Errors collected per function rather than thrown at the first one, so a file with
   * several broken functions reports all of them in one pass instead of making the
   * user fix and re-run once per error.
   */
  errors: CompileError[]
}

export interface LowerOptions {
  /**
   * Keep parameter names exactly as written instead of capitalising them.
   *
   * Capitalising `fn` to `Fn` is the right convention for hand-written ScriptType, but
   * it is wrong for decompiled code: if the file also declares a type called `Fn`, a
   * constraint referring to that type suddenly resolves to the parameter itself, and
   * `<Fn extends Fn>` is a circular constraint.
   */
  preserveParamNames?: boolean
}

export function compileSourceFile(sf: ts.SourceFile, opts: LowerOptions = {}): ModuleResult {
  const aliases: TypeAlias[] = []
  const prelude = new Set<string>()
  const imports: ImportInfo[] = []
  const errors: CompileError[] = []
  for (const stmt of sf.statements) {
    const imported = importInfo(stmt)
    if (imported) {
      imports.push(imported)
    } else if (ts.isFunctionDeclaration(stmt) && stmt.body && stmt.name) {
      // A function is the natural recovery boundary: each compiles to its own alias, so
      // one failing does not corrupt the others.
      try {
        const fc = new FunctionCompiler(stmt, sf, prelude, opts)
        aliases.push(...fc.compile())
      } catch (e) {
        if (!(e instanceof CompileError)) throw e
        errors.push(e)
      }
    } else if (ts.isTypeAliasDeclaration(stmt)) {
      // Pass hand-written type aliases through untouched.
      aliases.push({
        name: stmt.name.text,
        params: (stmt.typeParameters ?? []).map((tp) => ({
          name: tp.name.text,
          constraint: tp.constraint ? rawType(tp.constraint) : undefined,
          default: tp.default ? rawType(tp.default) : undefined,
        })),
        body: rawType(stmt.type),
        exported: hasExport(stmt),
      })
    }
  }
  return { aliases, prelude, imports, errors }
}

/**
 * Read an import or re-export declaration, or return undefined for anything else.
 *
 * A side-effect import (`import './x.js'`) is deliberately dropped: it has no type-level
 * meaning, and carrying it into a file of pure type aliases would emit a runtime import
 * from a module that no longer exists at that path.
 */
function importInfo(stmt: ts.Statement): ImportInfo | undefined {
  const read = (
    clause: ts.ImportClause | ts.NamedExportBindings | undefined,
    specifier: string,
    isExport: boolean,
  ): ImportInfo | undefined => {
    const info: ImportInfo = { specifier, named: [], isExport }
    if (clause && 'name' in clause && clause.name) info.defaultName = clause.name.text
    const bindings =
      clause && 'namedBindings' in clause ? clause.namedBindings : (clause as ts.NamedExportBindings | undefined)
    if (bindings) {
      if (ts.isNamespaceImport(bindings) || ts.isNamespaceExport(bindings)) {
        info.namespaceName = bindings.name.text
      } else if (ts.isNamedImports(bindings) || ts.isNamedExports(bindings)) {
        for (const el of bindings.elements) {
          info.named.push({
            name: (el.propertyName ?? el.name).text,
            alias: el.propertyName ? el.name.text : undefined,
          })
        }
      }
    }
    return info.named.length || info.defaultName || info.namespaceName ? info : undefined
  }

  if (ts.isImportDeclaration(stmt) && ts.isStringLiteral(stmt.moduleSpecifier)) {
    return read(stmt.importClause, stmt.moduleSpecifier.text, false)
  }
  // Only a re-export can be carried over; a bare `export { X }` refers to local
  // declarations, which are already emitted with their own `export` modifier.
  if (ts.isExportDeclaration(stmt) && stmt.moduleSpecifier && ts.isStringLiteral(stmt.moduleSpecifier)) {
    return read(stmt.exportClause, stmt.moduleSpecifier.text, true)
  }
  return undefined
}

const hasExport = (n: ts.Node): boolean =>
  !!(ts.getCombinedModifierFlags(n as ts.Declaration) & ts.ModifierFlags.Export)

const rawType = (n: ts.TypeNode): TypeExpr => ({ kind: 'raw', text: n.getText() })

class FunctionCompiler {
  private helpers: TypeAlias[] = []
  private used = new Set<string>()
  private counter = 0
  private fnName: string
  /** Type parameters of the top-level alias, carried into every generated helper. */
  private topParams: TypeParam[] = []
  /**
   * Variables bound to a pattern match: `const m = matches<P>(v)`.
   *
   * The match itself is not a value, so `m` is not bound in `vars`; testing `m` lowers
   * to the conditional, and `m.H` reads hole `H` bound by the pattern. This two-step
   * form exists so ScriptType source typechecks: a hole name cannot simply appear as a
   * free identifier, but a property of an `any` is always well-typed.
   */
  private markers = new Map<string, Lowering & { tag: 'match' }>()
  /** Declared annotations of local `const`/`let`, used to constrain accumulators. */
  private localTypes = new Map<string, TypeExpr>()
  /**
   * Initial value of each local, so an accumulator's constraint can be inferred from
   * its shape when no annotation was written (the pure-JavaScript dialect has none).
   */
  private localInits = new Map<string, TypeExpr>()

  constructor(
    private fn: TypeFunction,
    private sf: ts.SourceFile,
    private prelude: Set<string>,
    private opts: LowerOptions = {},
  ) {
    this.fnName = fn.name
    this.used.add(this.fnName)
  }

  /** Emitted name for a source parameter. */
  private paramName(src: string): string {
    return this.opts.preserveParamNames ? src : pascal(src)
  }

  private fresh(hint: string): string {
    let name = pascal(hint)
    if (!this.used.has(name)) {
      this.used.add(name)
      return name
    }
    while (this.used.has(`${name}${++this.counter}`)) {
      /* advance */
    }
    const out = `${name}${this.counter}`
    this.used.add(out)
    return out
  }

  /** Names of the emitted type parameters, for undoing source-only `typeof` queries. */
  private paramNames(): Set<string> {
    return new Set(this.topParams.map((p) => p.name))
  }

  private ctx() {
    return {
      fresh: (h: string) => this.fresh(h),
      typeArgs: [] as TypeExpr[],
      usePrelude: (n: string) => this.prelude.add(n),
    }
  }

  compile(): TypeAlias[] {
    const vars: Vars = new Map()
    for (const p of this.fn.parameters) {
      if (!ts.isIdentifier(p.name)) throw new CompileError('destructured parameters are not supported', p, 'ST1002')
      const pName = this.paramName(p.name.text)
      this.used.add(pName)
      // `extends unknown` is redundant; omit it so output matches hand-written types.
      // Pass `vars` so a constraint referring to an earlier parameter resolves to that
      // parameter's emitted name (`<a, b extends a>` -> `<A, B extends A>`).
      //
      // In the pure-JavaScript dialect there are no annotations, so the constraint comes
      // from a JSDoc `@param {T}` tag instead.
      const annotation = p.type ?? jsDocParamType(p)
      const constraint = annotation ? this.typeNode(annotation, vars) : undefined
      this.topParams.push({
        name: pName,
        constraint: constraint && !(constraint.kind === 'keyword' && constraint.name === 'unknown')
          ? constraint
          : undefined,
        default: p.initializer ? this.expr(p.initializer, vars) : undefined,
      })
      vars.set(p.name.text, ref(pName))
    }

    const body = this.lowerStmts(
      (this.fn.body as ts.Block).statements,
      0,
      vars,
      () => {
        throw new CompileError(
          `function '${this.fnName}' has a code path that does not return; every path must return a type`,
          this.fn,
          'ST1003',
        )
      },
      undefined,
    )

    const doc = ts
      .getJSDocCommentsAndTags(this.fn.docNode)
      .map((d) => (ts.isJSDoc(d) ? ts.getTextOfJSDocComment(d.comment) : undefined))
      .filter(Boolean)
      .join('\n')

    return [
      {
        name: this.fnName,
        params: this.topParams,
        body,
        exported: this.fn.exported,
        doc: doc || undefined,
      },
      ...this.helpers,
    ]
  }

  // -------------------------------------------------------------------------
  // Statements
  // -------------------------------------------------------------------------

  private lowerStmts(
    stmts: readonly ts.Statement[],
    idx: number,
    vars: Vars,
    k: Cont,
    loop: LoopCtx | undefined,
  ): TypeExpr {
    if (idx >= stmts.length) return k(vars)
    const stmt = stmts[idx]!
    const rest: Cont = (v) => this.lowerStmts(stmts, idx + 1, v, k, loop)

    if (ts.isReturnStatement(stmt)) {
      if (!stmt.expression) throw new CompileError('bare `return` has no type-level meaning', stmt, 'ST1004')
      return this.expr(stmt.expression, vars)
    }

    if (ts.isBlock(stmt)) return this.lowerStmts(stmt.statements, 0, new Map(vars), rest, loop)

    if (ts.isVariableStatement(stmt)) return this.lowerVarDecl(stmt, vars, rest)

    if (ts.isIfStatement(stmt)) {
      const thenK: Cont = (v) =>
        this.lowerStmts(asStatements(stmt.thenStatement), 0, new Map(v), rest, loop)
      const elseK: Cont = stmt.elseStatement
        ? (v) => this.lowerStmts(asStatements(stmt.elseStatement!), 0, new Map(v), rest, loop)
        : rest
      return this.lowerTest(stmt.expression, vars, thenK, elseK)
    }

    if (ts.isForInStatement(stmt)) return this.lowerForIn(stmt, vars, rest)

    if (ts.isWhileStatement(stmt) || ts.isForOfStatement(stmt)) {
      return this.lowerLoop(stmt, vars, rest, loop)
    }

    if (ts.isSwitchStatement(stmt)) return this.lowerSwitch(stmt, vars, rest, loop)

    if (ts.isBreakStatement(stmt)) {
      if (!loop) throw new CompileError('`break` outside a loop', stmt, 'ST1104')
      return loop.onBreak(vars)
    }
    if (ts.isContinueStatement(stmt)) {
      if (!loop) throw new CompileError('`continue` outside a loop', stmt, 'ST1105')
      return loop.onContinue(vars)
    }

    if (ts.isThrowStatement(stmt)) {
      this.prelude.add('ScriptTypeError')
      const msg = this.throwMessage(stmt)
      return ref('ScriptTypeError', [str(msg)])
    }

    if (ts.isExpressionStatement(stmt)) {
      this.applyMutation(stmt.expression, vars)
      return rest(vars)
    }

    // A stray `;` — as in `if (a) { return 1 };` — is valid JavaScript and carries no
    // meaning at all. Rejecting it would be a gratuitous difference from the language
    // ScriptType is spelled in.
    if (stmt.kind === ts.SyntaxKind.EmptyStatement) return rest(vars)

    throw new CompileError(
      `${describeStatement(stmt)} has no type-level meaning`,
      stmt,
      'ST1100',
    )
  }

  private throwMessage(stmt: ts.ThrowStatement): string {
    const e = stmt.expression
    if (ts.isNewExpression(e) && e.arguments?.length) {
      const a = e.arguments[0]!
      if (ts.isStringLiteral(a)) return a.text
    }
    if (ts.isStringLiteral(e)) return e.text
    return 'error'
  }

  /** `x = expr`, `x.push(expr)`, `out[k] = v` — record the new value of a variable. */
  private applyMutation(e: ts.Expression, vars: Vars): void {
    if (ts.isBinaryExpression(e) && e.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      if (!ts.isIdentifier(e.left)) throw new CompileError('only simple assignment is supported', e, 'ST1103')
      vars.set(e.left.text, this.expr(e.right, vars))
      return
    }
    if (ts.isCallExpression(e) && ts.isPropertyAccessExpression(e.expression)) {
      const target = e.expression.expression
      const method = e.expression.name.text
      if (ts.isIdentifier(target)) {
        const cur = vars.get(target.text)
        if (!cur) throw new CompileError(...unknownVariable(target, vars))
        const args = e.arguments.map((a) => this.expr(a, vars))
        if (method === 'push') {
          vars.set(target.text, tuple([{ expr: cur, spread: true }, ...args.map((a) => ({ expr: a }))]))
          return
        }
        if (method === 'unshift') {
          vars.set(target.text, tuple([...args.map((a) => ({ expr: a })), { expr: cur, spread: true }]))
          return
        }
        if (method === 'concat') {
          vars.set(
            target.text,
            tuple([{ expr: cur, spread: true }, ...args.map((a) => ({ expr: a, spread: true }))]),
          )
          return
        }
      }
    }
    throw new CompileError(...unsupportedStatementExpression(e))
  }

  // -------------------------------------------------------------------------
  // Variable declarations
  // -------------------------------------------------------------------------

  private lowerVarDecl(stmt: ts.VariableStatement, vars: Vars, k: Cont): TypeExpr {
    let out: TypeExpr | undefined
    const decls = stmt.declarationList.declarations
    // Process declarations right-to-left so each wraps the continuation of the next.
    const build = (i: number, v: Vars): TypeExpr => {
      if (i >= decls.length) return k(v)
      const d = decls[i]!
      if (!d.initializer) throw new CompileError('declaration without an initializer', d, 'ST1200')
      const next: Cont = (v2) => build(i + 1, v2)

      if (ts.isIdentifier(d.name)) {
        // `const m = matches<P>(v)` records a pattern to test, not a value.
        if (
          ts.isCallExpression(d.initializer) &&
          ts.isIdentifier(d.initializer.expression) &&
          d.initializer.expression.text === 'matches'
        ) {
          const m = this.lowerMatches(d.initializer, v)
          if (m.tag === 'match') {
            this.markers.set(d.name.text, m)
            return next(v)
          }
        }
        return this.bindSimple(d.name.text, d.initializer, d.type, v, next, stmt)
      }
      if (ts.isArrayBindingPattern(d.name)) {
        return this.bindArrayPattern(d.name, d.initializer, v, next)
      }
      if (ts.isObjectBindingPattern(d.name)) {
        const v2 = new Map(v)
        const src = this.expr(d.initializer, v)
        for (const el of d.name.elements) {
          if (!ts.isIdentifier(el.name)) throw new CompileError('nested object patterns are not supported', el, 'ST1201')
          const key = el.propertyName ? propName(el.propertyName) : el.name.text
          v2.set(el.name.text, indexed(src, str(key)))
        }
        return next(v2)
      }
      throw new CompileError('unsupported binding form', d, 'ST1203')
    }
    out = build(0, vars)
    return out
  }

  /**
   * Bind one identifier. Substitutes the value inline when it is referenced at most
   * once (keeping output close to hand-written types); otherwise emits the canonical
   * type-level let-binding `Value extends infer Name ? body : never`.
   */
  private bindSimple(
    name: string,
    init: ts.Expression,
    typeNode: ts.TypeNode | undefined,
    vars: Vars,
    k: Cont,
    pragmaNode: ts.Node = init,
  ): TypeExpr {
    if (typeNode) this.localTypes.set(name, this.typeNode(typeNode))
    const value = this.expr(init, vars)
    this.localInits.set(name, value)
    // A bare reference / literal is free to duplicate. A generic application is not.
    const trivial =
      (value.kind === 'ref' && !value.args) ||
      value.kind === 'lit' ||
      value.kind === 'keyword' ||
      value.kind === 'raw'
    const forceBind = this.hasPragma(pragmaNode, '@bind')
    const forceInline = this.hasPragma(pragmaNode, '@inline')

    if (trivial && !forceBind) {
      const v2 = new Map(vars)
      v2.set(name, value)
      return k(v2)
    }

    const placeholder = this.fresh(name)
    const v2 = new Map(vars)
    v2.set(name, ref(placeholder))
    const body = k(v2)
    const uses = countRefs(body, placeholder)

    if (forceBind || (uses > 1 && !forceInline)) {
      return cond(value, inferNode(placeholder, typeNode ? this.typeNode(typeNode) : undefined), body, NEVER)
    }
    this.used.delete(placeholder)
    return substitute(body, new Map([[placeholder, value]]))
  }

  private hasPragma(node: ts.Node, pragma: string): boolean {
    const full = node.getFullText(this.sf)
    const trivia = full.slice(0, node.getLeadingTriviaWidth(this.sf))
    return trivia.includes(pragma)
  }

  /** `const [a, ...rest] = init` -> `Init extends [infer A, ...infer Rest] ? k : never` */
  private bindArrayPattern(
    pattern: ts.ArrayBindingPattern,
    initArg: ts.Expression,
    vars: Vars,
    k: Cont,
  ): TypeExpr {
    let init = initArg
    const names: (string | undefined)[] = []
    const rests: boolean[] = []
    for (const el of pattern.elements) {
      if (ts.isOmittedExpression(el)) {
        names.push(undefined)
        rests.push(false)
        continue
      }
      if (!ts.isIdentifier(el.name)) throw new CompileError('nested array patterns are not supported', el, 'ST1202')
      names.push(el.name.text)
      rests.push(!!el.dotDotDotToken)
    }

    // `const [a, b] = orElse(x, fallback)` supplies the value used when the pattern
    // does not match. Without it a failed destructure yields `never`.
    let fallback: TypeExpr = NEVER
    let source = init
    if (
      ts.isCallExpression(init) &&
      ts.isIdentifier(init.expression) &&
      init.expression.text === 'orElse'
    ) {
      if (init.arguments.length !== 2) {
        throw new CompileError('orElse(value, fallback) takes exactly two arguments', init, 'ST1402')
      }
      source = init.arguments[0]!
      fallback = this.expr(init.arguments[1]!, vars)
    }
    init = source

    // A pattern-matching builtin (splitOnce, ...) supplies its own `extends` pattern.
    const m = this.tryBuiltinMatch(init, vars)
    if (m && m.tag === 'match' && m.binds.length) {
      const renames = new Map<string, TypeExpr>()
      const v2 = new Map(vars)
      m.binds.forEach((bind, i) => {
        const target = names[i]
        if (!target) return
        const fresh = this.fresh(target)
        renames.set(bind, ref(fresh))
        v2.set(target, ref(fresh))
      })
      const ext = substitute(m.ext, renames)
      // Rename the infer nodes themselves, which `substitute` does not touch.
      const ext2 = renameInfers(ext, renames)
      return cond(m.check, ext2, k(v2), fallback)
    }

    const src = this.expr(init, vars)
    const elements = names.map((n, i) => {
      const fresh = n ? this.fresh(n) : this.fresh('Skip')
      return { name: n, fresh, spread: rests[i]! }
    })
    const v2 = new Map(vars)
    for (const e of elements) if (e.name) v2.set(e.name, ref(e.fresh))
    const ext = tuple(
      elements.map((e) => ({
        expr: inferNode(e.fresh),
        spread: e.spread,
      })),
    )
    return cond(src, ext, k(v2), fallback)
  }

  private tryBuiltinMatch(e: ts.Expression, vars: Vars): Lowering | undefined {
    const asMethod = this.tryMethodMatch(e, vars)
    if (asMethod) return asMethod
    if (!ts.isCallExpression(e) || !ts.isIdentifier(e.expression)) return undefined
    if (e.expression.text === 'matches') return this.lowerMatches(e, vars)
    const b = BUILTINS[e.expression.text]
    if (!b) return undefined
    const ctx = this.ctx()
    ctx.typeArgs = (e.typeArguments ?? []).map((t) => this.typeNode(t, vars))
    const args = e.arguments.map((a) => this.expr(a, vars))
    return b.lower(args, ctx)
  }

  /**
   * Lower `receiver.method(args)` when `method` denotes a type operation and `receiver`
   * is a value in scope. This is what lets ScriptType be written as plain JavaScript.
   */
  private tryMethodCall(e: ts.CallExpression, vars: Vars): TypeExpr | undefined {
    if (!ts.isPropertyAccessExpression(e.expression)) return undefined
    const recvNode = e.expression.expression
    const builtinName = METHOD_BUILTINS[e.expression.name.text]
    if (!builtinName) return undefined
    // Only treat it as a method call when the receiver is something we can lower as a
    // value; a namespaced type reference (`ns.Foo`) must not be captured here.
    if (ts.isIdentifier(recvNode) && !vars.has(recvNode.text) && !TYPE_KEYWORDS.has(recvNode.text)) {
      return undefined
    }
    const b = BUILTINS[builtinName]
    if (!b) return undefined
    const recv = this.expr(recvNode, vars)
    const args = e.arguments.map((a) => this.expr(a, vars))
    const ctx = this.ctx()
    const lowered = b.lower([recv, ...args], ctx)
    if (lowered.tag === 'expr') return lowered.expr
    return cond(lowered.check, lowered.ext, bool(true), bool(false))
  }

  /** Same as `tryMethodCall`, but yielding the raw match so it can drive a conditional. */
  private tryMethodMatch(e: ts.Expression, vars: Vars): Lowering | undefined {
    if (!ts.isCallExpression(e) || !ts.isPropertyAccessExpression(e.expression)) return undefined
    const recvNode = e.expression.expression
    const builtinName = METHOD_BUILTINS[e.expression.name.text]
    if (!builtinName) return undefined
    if (ts.isIdentifier(recvNode) && !vars.has(recvNode.text) && !TYPE_KEYWORDS.has(recvNode.text)) {
      return undefined
    }
    const b = BUILTINS[builtinName]
    if (!b) return undefined
    const recv = this.expr(recvNode, vars)
    const args = e.arguments.map((a) => this.expr(a, vars))
    return b.lower([recv, ...args], this.ctx())
  }

  /**
   * `matches<Pattern>(x)` — the general pattern-match primitive.
   *
   * `infer` is only *semantically* legal inside a conditional type's extends clause,
   * but it parses anywhere a type does, so a pattern carrying `infer` names can be
   * written as a type argument. Each `infer X` in the pattern becomes a variable `X`
   * bound in the true-branch. This is what makes the language expressively complete
   * for conditional types, and what lets the decompiler be total.
   */
  private lowerMatches(e: ts.CallExpression, vars: Vars): Lowering {
    const pattern = e.typeArguments?.[0]
    if (!pattern) throw new CompileError('matches<Pattern>(value) requires a pattern type argument', e, 'ST1400')
    if (e.arguments.length !== 1) throw new CompileError('matches() takes exactly one value', e, 'ST1401')
    const check = this.expr(e.arguments[0]!, vars)
    const ext = this.typeNode(pattern, vars)
    const binds: string[] = []
    const collect = (n: ts.Node) => {
      if (ts.isInferTypeNode(n)) binds.push(n.typeParameter.name.text)
      // `Hole<'N'>` is the typecheckable spelling of `infer N`.
      if (ts.isTypeReferenceNode(n) && n.typeName.getText() === 'Hole') {
        const arg = n.typeArguments?.[0]
        if (arg && ts.isLiteralTypeNode(arg) && ts.isStringLiteral(arg.literal)) {
          binds.push(arg.literal.text)
        }
      }
      ts.forEachChild(n, collect)
    }
    collect(pattern)
    for (const b of binds) this.used.add(b)
    return { tag: 'match', check, ext, binds }
  }

  // -------------------------------------------------------------------------
  // Conditions
  // -------------------------------------------------------------------------

  /**
   * Lower a boolean-valued expression into branching type structure. Handles `!`,
   * `&&`, `||` compositionally by rearranging the continuations, which is why no
   * separate boolean algebra is needed at the type level.
   */
  private lowerTest(e: ts.Expression, vars: Vars, onTrue: Cont, onFalse: Cont): TypeExpr {
    if (ts.isParenthesizedExpression(e)) return this.lowerTest(e.expression, vars, onTrue, onFalse)

    if (ts.isPrefixUnaryExpression(e) && e.operator === ts.SyntaxKind.ExclamationToken) {
      return this.lowerTest(e.operand, vars, onFalse, onTrue)
    }

    // `typeof x === 'string'` is how a JavaScript programmer narrows, and it is exactly
    // what `X extends string` means. Recognising it before the generic `===` case keeps
    // the obvious spelling working instead of demanding `extendsType<string>(x)`.
    const typeofNarrow = this.tryTypeofNarrowing(e, vars)
    if (typeofNarrow) {
      const [t, f] = typeofNarrow.negated ? [onFalse, onTrue] : [onTrue, onFalse]
      return cond(typeofNarrow.check, typeofNarrow.ext, t(vars), f(vars))
    }

    if (ts.isBinaryExpression(e)) {
      const op = e.operatorToken.kind
      // `'a' in o` is the JavaScript spelling of `'a' extends keyof O`.
      if (op === ts.SyntaxKind.InKeyword) {
        return cond(
          this.expr(e.left, vars),
          { kind: 'op', op: 'keyof', target: this.expr(e.right, vars) },
          onTrue(vars),
          onFalse(vars),
        )
      }
      // Relational operators need type-level arithmetic, which is a library concern
      // rather than a language one. Say so, instead of "no lowering".
      if (
        op === ts.SyntaxKind.LessThanToken ||
        op === ts.SyntaxKind.GreaterThanToken ||
        op === ts.SyntaxKind.LessThanEqualsToken ||
        op === ts.SyntaxKind.GreaterThanEqualsToken
      ) {
        throw new CompileError(
          `\`${ts.tokenToString(op)}\` has no type-level meaning`,
          e,
          'ST1500',
          'TypeScript cannot compare numbers in the type system. Compare tuple lengths ' +
            'instead, or call a type-level arithmetic helper.',
        )
      }
      if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
        return this.lowerTest(e.left, vars, (v) => this.lowerTest(e.right, v, onTrue, onFalse), onFalse)
      }
      if (op === ts.SyntaxKind.BarBarToken) {
        return this.lowerTest(e.left, vars, onTrue, (v) => this.lowerTest(e.right, v, onTrue, onFalse))
      }
      if (op === ts.SyntaxKind.EqualsEqualsEqualsToken || op === ts.SyntaxKind.EqualsEqualsToken) {
        return cond(this.expr(e.left, vars), this.expr(e.right, vars), onTrue(vars), onFalse(vars))
      }
      if (op === ts.SyntaxKind.ExclamationEqualsEqualsToken || op === ts.SyntaxKind.ExclamationEqualsToken) {
        return cond(this.expr(e.left, vars), this.expr(e.right, vars), onFalse(vars), onTrue(vars))
      }
    }

    if (e.kind === ts.SyntaxKind.TrueKeyword) return onTrue(vars)
    if (e.kind === ts.SyntaxKind.FalseKeyword) return onFalse(vars)

    if (ts.isIdentifier(e)) {
      const marker = this.markers.get(e.text)
      if (marker) {
        const v2 = new Map(vars)
        for (const b of marker.binds) v2.set(b, ref(b))
        return cond(marker.check, marker.ext, onTrue(v2), onFalse(vars))
      }
    }

    // A predicate builtin: use its check/pattern and bind any inferred names.
    const m = this.tryBuiltinMatch(e, vars)
    if (m && m.tag === 'match') {
      const v2 = new Map(vars)
      for (const b of m.binds) v2.set(b, ref(b))
      return cond(m.check, m.ext, onTrue(v2), onFalse(vars))
    }

    // Fall back to testing the value against `true`.
    const value = m && m.tag === 'expr' ? m.expr : this.expr(e, vars)
    return cond(value, kw('true'), onTrue(vars), onFalse(vars))
  }

  /**
   * The JavaScript runtime type tests, as type-level `extends` checks:
   *
   *   typeof x === 'string'   ->  X extends string
   *   typeof x !== 'string'   ->  handled by the caller's `!` path
   *   Array.isArray(x)        ->  X extends any[]
   *
   * Returns undefined when `e` is not one of these, so the caller falls through.
   */
  private tryTypeofNarrowing(
    e: ts.Expression,
    vars: Vars,
  ): { check: TypeExpr; ext: TypeExpr; negated?: boolean } | undefined {
    if (
      ts.isCallExpression(e) &&
      ts.isPropertyAccessExpression(e.expression) &&
      ts.isIdentifier(e.expression.expression) &&
      e.expression.expression.text === 'Array' &&
      e.expression.name.text === 'isArray' &&
      e.arguments.length === 1
    ) {
      return { check: this.expr(e.arguments[0]!, vars), ext: { kind: 'array', element: kw('any') } }
    }

    if (!ts.isBinaryExpression(e)) return undefined
    const op = e.operatorToken.kind
    const negated =
      op === ts.SyntaxKind.ExclamationEqualsEqualsToken || op === ts.SyntaxKind.ExclamationEqualsToken
    const equality =
      op === ts.SyntaxKind.EqualsEqualsEqualsToken || op === ts.SyntaxKind.EqualsEqualsToken
    if (!equality && !negated) return undefined
    // Either order: `typeof x === 'string'` and `'string' === typeof x`.
    const [typeofSide, literalSide] = ts.isTypeOfExpression(e.left)
      ? [e.left, e.right]
      : ts.isTypeOfExpression(e.right)
        ? [e.right, e.left]
        : [undefined, undefined]
    if (!typeofSide || !literalSide || !ts.isStringLiteral(literalSide)) return undefined

    const ext = TYPEOF_TAGS[literalSide.text]
    if (!ext) {
      throw new CompileError(
        `'${literalSide.text}' is not a value \`typeof\` can produce`,
        literalSide,
        'ST1500',
        `Expected one of: ${Object.keys(TYPEOF_TAGS).join(', ')}.`,
      )
    }
    return { check: this.expr(typeofSide.expression, vars), ext: ext(), negated }
  }

  private lowerSwitch(stmt: ts.SwitchStatement, vars: Vars, k: Cont, loop: LoopCtx | undefined): TypeExpr {
    const subject = this.expr(stmt.expression, vars)
    const clauses = stmt.caseBlock.clauses
    const build = (i: number): TypeExpr => {
      if (i >= clauses.length) return NEVER
      const c = clauses[i]!
      if (ts.isDefaultClause(c)) {
        return this.lowerStmts(c.statements, 0, new Map(vars), k, loop)
      }
      const body = this.lowerStmts(c.statements, 0, new Map(vars), k, loop)
      return cond(subject, this.expr(c.expression, vars), body, build(i + 1))
    }
    return build(0)
  }

  // -------------------------------------------------------------------------
  // Loops
  // -------------------------------------------------------------------------

  private lowerLoop(
    stmt: ts.WhileStatement | ts.ForOfStatement,
    vars: Vars,
    after: Cont,
    _outerLoop: LoopCtx | undefined,
  ): TypeExpr {
    const bodyStmts = asStatements(stmt.statement)
    const helperName = this.fresh(`${this.fnName}__loop`)

    // Mutable variables assigned inside the loop become accumulator parameters.
    const mutated = [...collectAssigned(stmt.statement)].filter((n) => vars.has(n))

    // For-of: the iterated list is itself an accumulator (it shrinks each round).
    let iterVar: string | undefined
    let listVar: string | undefined
    let listInit: TypeExpr | undefined
    let listConstraint: TypeExpr | undefined
    if (ts.isForOfStatement(stmt)) {
      const decl = stmt.initializer
      if (!ts.isVariableDeclarationList(decl) || decl.declarations.length !== 1) {
        throw new CompileError('for-of must declare exactly one variable', stmt, 'ST1300')
      }
      const nameNode = decl.declarations[0]!.name
      if (!ts.isIdentifier(nameNode)) throw new CompileError('for-of cannot destructure in the loop header', nameNode, 'ST1301')
      iterVar = nameNode.text
      listInit = this.expr(stmt.expression, vars)
      listVar = this.fresh('Rest')
      // Carry the element type into the loop. Constraining the list to a bare
      // `readonly unknown[]` would make each destructured element `unknown`, so
      // iterating a `string[]` and calling a `V extends string` function on an element
      // emitted TypeScript that did not typecheck.
      if (ts.isIdentifier(stmt.expression)) {
        listConstraint = this.constraintOf(stmt.expression.text, vars)
      }
    }

    // Free variables the loop reads but never writes are carried through unchanged.
    // The guard counts as part of the loop: a variable read only there (`n` in
    // `while (length(it) !== n)`) must still be a parameter of the helper.
    const readInLoop = collectRead(stmt.statement)
    if (ts.isWhileStatement(stmt)) for (const n of collectRead(stmt.expression)) readInLoop.add(n)
    const readNames = [...readInLoop].filter(
      (n) => vars.has(n) && !mutated.includes(n) && n !== iterVar,
    )
    const carried = [...new Set(readNames)]

    // Order accumulators so the loop "driver" (a mutable variable tested by the
    // guard, e.g. `rest` in `while (includes(rest, sep))`) comes first, matching
    // how these recursive helpers are conventionally written by hand.
    const guardNames = ts.isWhileStatement(stmt) ? collectRead(stmt.expression) : new Set<string>()
    const accumNames = [...mutated].sort((a, b) => {
      const av = guardNames.has(a) ? 0 : 1
      const bv = guardNames.has(b) ? 0 : 1
      return av - bv || mutated.indexOf(a) - mutated.indexOf(b)
    })

    const params: TypeParam[] = []
    const helperVars: Vars = new Map()
    // Helper parameters live in their own scope, so allocate their names from a
    // helper-local namespace instead of the function-wide one.
    const helperUsed = new Set<string>()
    const helperFresh = (hint: string): string => {
      const base = pascal(hint)
      if (!helperUsed.has(base)) {
        helperUsed.add(base)
        return base
      }
      let i = 1
      while (helperUsed.has(`${base}${i}`)) i++
      const out = `${base}${i}`
      helperUsed.add(out)
      return out
    }

    if (listVar) {
      helperUsed.add(listVar)
      params.push({
        name: listVar,
        constraint: listConstraint ?? { kind: 'raw', text: 'readonly unknown[]' },
      })
    }
    const emitParam = (srcName: string) => {
      const pName = helperFresh(srcName)
      params.push({ name: pName, constraint: this.constraintOf(srcName, vars) })
      helperVars.set(srcName, ref(pName))
    }
    for (const a of accumNames) emitParam(a)
    for (const c of carried) emitParam(c)

    const callWith = (v: Vars): TypeExpr => {
      const args: TypeExpr[] = []
      if (listVar) args.push(v.get(`__list__${helperName}`) ?? ref(listVar))
      for (const a of accumNames) args.push(v.get(a) ?? ref(a))
      for (const c of carried) args.push(v.get(c) ?? ref(c))
      return ref(helperName, args)
    }

    const loopCtx: LoopCtx = {
      onBreak: (v) => after(v),
      onContinue: (v) => callWith(v),
    }

    // Build the helper body.
    let helperBody: TypeExpr
    if (ts.isForOfStatement(stmt)) {
      const headName = this.fresh(iterVar!)
      const tailName = this.fresh('Tail')
      const bodyVars = new Map(helperVars)
      bodyVars.set(iterVar!, ref(headName))
      const recurse: Cont = (v) => {
        const v2 = new Map(v)
        v2.set(`__list__${helperName}`, ref(tailName))
        return callWith(v2)
      }
      const bodyExpr = this.lowerStmts(bodyStmts, 0, bodyVars, recurse, {
        onBreak: loopCtx.onBreak,
        onContinue: recurse,
      })
      // Constrain the peeled element and tail when the element type is known.
      // TypeScript does not push a `Rest extends string[]` constraint through the
      // destructuring pattern, so without this `infer Head` is `unknown` and passing it
      // to a function that wants a `string` emits TypeScript that does not typecheck.
      const elem = elementTypeOf(listConstraint)
      helperBody = cond(
        ref(listVar!),
        tuple([
          { expr: inferNode(headName, elem) },
          { expr: inferNode(tailName, elem && { kind: 'array', element: elem }), spread: true },
        ]),
        bodyExpr,
        after(helperVars),
      )
    } else {
      const recurse: Cont = (v) => callWith(v)
      const isWhileTrue = stmt.expression.kind === ts.SyntaxKind.TrueKeyword
      if (isWhileTrue) {
        helperBody = this.lowerStmts(bodyStmts, 0, new Map(helperVars), recurse, {
          onBreak: loopCtx.onBreak,
          onContinue: recurse,
        })
      } else {
        // Fuse the guard with an immediately-following destructure of the same
        // shape, so `while (includes(r,s)) { const [h,t] = splitOnce(r,s) }`
        // emits a single inferring conditional instead of two nested tests.
        const fused = this.tryFuseGuard(stmt.expression, bodyStmts, helperVars, recurse, loopCtx, after)
        helperBody =
          fused ??
          this.lowerTest(
            stmt.expression,
            helperVars,
            (v) =>
              this.lowerStmts(bodyStmts, 0, new Map(v), recurse, {
                onBreak: loopCtx.onBreak,
                onContinue: recurse,
              }),
            (v) => after(v),
          )
      }
    }

    this.helpers.push({
      name: helperName,
      params,
      body: helperBody,
      exported: false,
      generatedFrom: this.fnName,
    })

    // The call site: initial accumulator values from the enclosing scope.
    const args: TypeExpr[] = []
    if (listInit) args.push(listInit)
    for (const a of accumNames) args.push(vars.get(a)!)
    for (const c of carried) args.push(vars.get(c)!)
    return ref(helperName, args)
  }

  /**
   * `for (const k in o) { out[k] = f(o[k]) }` -> `{ [K in keyof O]: F<O[K]> }`
   *
   * Recognising this as a mapped type rather than lowering it to recursion is what
   * keeps the output idiomatic: a recursive rebuild of an object would be correct
   * but would look nothing like the library code it is meant to reproduce.
   *
   * A computed key (`out[upper(k)] = ...`) becomes an `as` clause.
   */
  private lowerForIn(stmt: ts.ForInStatement, vars: Vars, k: Cont): TypeExpr {
    const decl = stmt.initializer
    if (!ts.isVariableDeclarationList(decl) || decl.declarations.length !== 1) {
      throw new CompileError('for-in must declare exactly one variable', stmt, 'ST1302')
    }
    const nameNode = decl.declarations[0]!.name
    if (!ts.isIdentifier(nameNode)) throw new CompileError('for-in cannot destructure in the loop header', nameNode, 'ST1303')
    const keySrc = nameNode.text

    const body = asStatements(stmt.statement)
    if (body.length !== 1 || !ts.isExpressionStatement(body[0]!)) {
      throw new CompileError(
        'a for-in body must be a single assignment of the form `out[key] = value`',
        stmt.statement,
        'ST1304',
      )
    }
    const assign = (body[0] as ts.ExpressionStatement).expression
    if (
      !ts.isBinaryExpression(assign) ||
      assign.operatorToken.kind !== ts.SyntaxKind.EqualsToken ||
      !ts.isElementAccessExpression(assign.left) ||
      !ts.isIdentifier(assign.left.expression)
    ) {
      throw new CompileError('a for-in body must assign to `out[key]`', assign, 'ST1305')
    }

    const target = assign.left.expression.text
    const param = this.fresh(this.paramName(keySrc))
    const bodyVars = new Map(vars)
    bodyVars.set(keySrc, ref(param))

    // The iterated expression is the key domain. `for (const p in t)` follows
    // JavaScript and means "the keys of t" -> `keyof T`. When the value is already a
    // key union rather than an object, `keySet(K)` says so explicitly -> `[P in K]`.
    // `keyof(t)` written by hand is respected as-is rather than doubled.
    const iterExpr = stmt.expression
    const isKeySet =
      ts.isCallExpression(iterExpr) &&
      ts.isIdentifier(iterExpr.expression) &&
      iterExpr.expression.text === 'keySet'
    const iterated = isKeySet
      ? this.expr((iterExpr as ts.CallExpression).arguments[0]!, vars)
      : this.expr(iterExpr, vars)
    const constraint =
      isKeySet || (iterated.kind === 'op' && iterated.op === 'keyof')
        ? iterated
        : { kind: 'op' as const, op: 'keyof' as const, target: iterated }

    // A key expression other than the bare loop variable becomes an `as` clause.
    const keyExpr = this.expr(assign.left.argumentExpression, bodyVars)
    const asClause = keyExpr.kind === 'ref' && keyExpr.name === param ? undefined : keyExpr

    // Property modifiers are written as markers wrapping the value:
    //   out[k] = optional(v)      ->  { [K in ...]?: V }
    //   out[k] = required(v)      ->  { [K in ...]-?: V }
    //   out[k] = readonlyProp(v)  ->  { readonly [K in ...]: V }
    //   out[k] = mutable(v)       ->  { -readonly [K in ...]: V }
    const { expr: valueNode, optional, readonly } = stripModifiers(assign.right)
    const value = this.expr(valueNode, bodyVars)
    const mapped: TypeExpr = {
      kind: 'mapped',
      param,
      constraint,
      value,
      as: asClause,
      optional,
      readonly,
    }

    const v2 = new Map(vars)
    v2.set(target, mapped)
    return k(v2)
  }

  /** Guard/destructure fusion — see `guardEquivalent`. */
  private tryFuseGuard(
    guardExpr: ts.Expression,
    bodyStmts: readonly ts.Statement[],
    helperVars: Vars,
    recurse: Cont,
    loopCtx: LoopCtx,
    after: Cont,
  ): TypeExpr | undefined {
    const guard = this.tryBuiltinMatch(guardExpr, helperVars)
    if (!guard || guard.tag !== 'match' || guard.binds.length) return undefined
    const first = bodyStmts[0]
    if (!first || !ts.isVariableStatement(first)) return undefined
    const d = first.declarationList.declarations[0]
    if (!d || !d.initializer || !ts.isArrayBindingPattern(d.name)) return undefined

    // Snapshot name allocation so a failed probe doesn't leak fresh names.
    const before = new Set(this.used)
    const m = this.tryBuiltinMatch(d.initializer, helperVars)
    if (!m || m.tag !== 'match' || !m.binds.length || emit(m.check) !== emit(guard.check)) {
      this.used = before
      return undefined
    }
    if (!guardEquivalent(guard.ext, m.ext)) {
      this.used = before
      return undefined
    }
    // Equivalent: emit the inferring conditional and skip the guard entirely.
    const bodyExpr = this.lowerStmts(bodyStmts, 0, new Map(helperVars), recurse, {
      onBreak: loopCtx.onBreak,
      onContinue: recurse,
    })
    // `lowerStmts` re-lowered the destructure, producing `Check extends P ? ... : never`.
    // Replace that dead `never` with the after-loop continuation.
    if (bodyExpr.kind === 'conditional' && bodyExpr.else.kind === 'keyword' && bodyExpr.else.name === 'never') {
      return { ...bodyExpr, else: after(helperVars) }
    }
    return undefined
  }

  private constraintOf(name: string, vars: Vars): TypeExpr | undefined {
    // A declared annotation (`const out: string[] = []`) is the best source. It is
    // load-bearing, not cosmetic: without it the emitted `[...Out, X]` spread does
    // not typecheck.
    const declared = this.localTypes.get(name)
    if (declared) return declared
    const cur = vars.get(name)
    if (!cur) return undefined
    // Otherwise infer a usable constraint from the initial value's shape. This is
    // load-bearing, not cosmetic: an unconstrained accumulator makes the emitted
    // `[...Out, X]` spread fail to typecheck.
    const init = this.localInits.get(name)
    if (init?.kind === 'tuple' || init?.kind === 'array') return { kind: 'raw', text: 'readonly unknown[]' }
    if (init?.kind === 'lit' && init.str) return kw('string')
    if (cur.kind === 'tuple') return { kind: 'raw', text: 'readonly unknown[]' }
    if (cur.kind === 'lit' && cur.str) return kw('string')
    if (cur.kind === 'lit' && typeof cur.value === 'number') return kw('number')
    if (cur.kind === 'ref') {
      const tp = this.topParams.find((p) => p.name === cur.name)
      if (tp?.constraint) return tp.constraint
    }
    return undefined
  }

  // -------------------------------------------------------------------------
  // Expressions
  // -------------------------------------------------------------------------

  private expr(e: ts.Expression, vars: Vars): TypeExpr {
    if (ts.isParenthesizedExpression(e)) return this.expr(e.expression, vars)

    if (ts.isIdentifier(e)) {
      const local = vars.get(e.text)
      if (local) return local
      if (TYPE_KEYWORDS.has(e.text)) return kw(e.text)
      if (e.text === 'undefined') return kw('undefined')
      // Spellings for types that have no usable value form: `{}` cannot be an operand
      // of `&`, and `null` cannot be an operand of `|`, so they get named stand-ins.
      if (e.text === 'emptyObject') return { kind: 'object', props: [] }
      if (e.text === 'Null') return kw('null')
      if (e.text === 'Undefined') return kw('undefined')
      return ref(e.text)
    }

    if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) return str(e.text)
    if (ts.isNumericLiteral(e)) return num(Number(e.text))
    if (e.kind === ts.SyntaxKind.TrueKeyword) return bool(true)
    if (e.kind === ts.SyntaxKind.FalseKeyword) return bool(false)
    if (e.kind === ts.SyntaxKind.NullKeyword) return kw('null')

    if (ts.isPrefixUnaryExpression(e) && e.operator === ts.SyntaxKind.MinusToken) {
      const inner = this.expr(e.operand, vars)
      if (inner.kind === 'lit' && typeof inner.value === 'number') return num(-inner.value)
    }

    if (ts.isBinaryExpression(e)) {
      const op = e.operatorToken.kind
      if (op === ts.SyntaxKind.BarToken) return union([this.expr(e.left, vars), this.expr(e.right, vars)])
      if (op === ts.SyntaxKind.AmpersandToken) {
        return intersection([this.expr(e.left, vars), this.expr(e.right, vars)])
      }
      if (op === ts.SyntaxKind.PlusToken) {
        // String concatenation at the type level is a template literal.
        return template(['', '', ''], [this.expr(e.left, vars), this.expr(e.right, vars)])
      }
      // Comparisons in expression position produce a boolean-valued conditional.
      if (
        op === ts.SyntaxKind.EqualsEqualsEqualsToken ||
        op === ts.SyntaxKind.EqualsEqualsToken ||
        op === ts.SyntaxKind.ExclamationEqualsEqualsToken ||
        op === ts.SyntaxKind.ExclamationEqualsToken
      ) {
        return this.lowerTest(
          e,
          vars,
          () => bool(true),
          () => bool(false),
        )
      }
    }

    if (ts.isConditionalExpression(e)) {
      return this.lowerTest(
        e.condition,
        vars,
        (v) => this.expr(e.whenTrue, v),
        (v) => this.expr(e.whenFalse, v),
      )
    }

    if (ts.isArrayLiteralExpression(e)) {
      return tuple(
        e.elements.map((el) => {
          if (ts.isSpreadElement(el)) return { expr: this.expr(el.expression, vars), spread: true }
          // `optElem(x)` marks an optional tuple element: `[A, B?]`.
          if (
            ts.isCallExpression(el) &&
            ts.isIdentifier(el.expression) &&
            el.expression.text === 'optElem' &&
            el.arguments.length === 1
          ) {
            return { expr: this.expr(el.arguments[0]!, vars), optional: true }
          }
          return { expr: this.expr(el, vars) }
        }),
      )
    }

    if (ts.isObjectLiteralExpression(e)) {
      const props = e.properties.map((p) => {
        if (ts.isPropertyAssignment(p)) {
          const computed = ts.isComputedPropertyName(p.name)
          const name = computed
            ? emit(this.expr((p.name as ts.ComputedPropertyName).expression, vars))
            : propName(p.name)
          const mods = stripModifiers(p.initializer)
          return {
            name: computed ? `[${name}]` : name,
            value: this.expr(mods.expr, vars),
            computed,
            optional: mods.optional === true,
            readonly: mods.readonly === true,
          }
        }
        if (ts.isShorthandPropertyAssignment(p)) {
          return { name: p.name.text, value: this.expr(p.name, vars) }
        }
        throw new CompileError('unsupported object member', p, 'ST1501')
      })
      return { kind: 'object', props }
    }

    if (ts.isTemplateExpression(e)) {
      const quasis = [e.head.text]
      const exprs: TypeExpr[] = []
      for (const span of e.templateSpans) {
        exprs.push(this.expr(span.expression, vars))
        quasis.push(span.literal.text)
      }
      return template(quasis, exprs)
    }

    if (ts.isElementAccessExpression(e)) {
      return indexed(this.expr(e.expression, vars), this.expr(e.argumentExpression, vars))
    }

    if (ts.isPropertyAccessExpression(e)) {
      if (ts.isIdentifier(e.expression) && this.markers.has(e.expression.text)) {
        return ref(e.name.text)
      }
      // `o.name` where `o` is a variable is an indexed access; `ns.Foo` where `ns` is
      // not in scope is a qualified type name and must stay dotted.
      const q = qualifiedName(e)
      if (q && !vars.has(q.root)) return ref(q.text)
      if (e.name.text === 'length') return indexed(this.expr(e.expression, vars), str('length'))
      return indexed(this.expr(e.expression, vars), str(e.name.text))
    }

    if (ts.isAsExpression(e)) {
      if (e.type.kind === ts.SyntaxKind.TypeReference && e.type.getText() === 'const') {
        const inner = this.expr(e.expression, vars)
        if (inner.kind === 'tuple') return { kind: 'op', op: 'readonly', target: inner }
        return inner
      }
      return this.expr(e.expression, vars)
    }

    if (ts.isCallExpression(e)) return this.callExpr(e, vars)

    if (ts.isNonNullExpression(e)) return this.expr(e.expression, vars)

    throw new CompileError(...unsupportedExpression(e))
  }

  private callExpr(e: ts.CallExpression, vars: Vars): TypeExpr {
    // `Object.keys(o)` is the JavaScript spelling of `keyof O`.
    if (
      ts.isPropertyAccessExpression(e.expression) &&
      ts.isIdentifier(e.expression.expression) &&
      e.expression.expression.text === 'Object' &&
      (e.expression.name.text === 'keys' || e.expression.name.text === 'entries')
    ) {
      const target = this.expr(e.arguments[0]!, vars)
      return { kind: 'op', op: 'keyof', target }
    }

    // A method on a value in scope is the JavaScript spelling of a builtin.
    const method = this.tryMethodCall(e, vars)
    if (method) return method

    // A qualified callee is a namespaced generic type: `ns.Foo(X)` -> `ns.Foo<X>`.
    if (ts.isPropertyAccessExpression(e.expression)) {
      const q = qualifiedName(e.expression)
      if (q && !vars.has(q.root)) {
        const args = e.arguments.map((a) => this.expr(a, vars))
        const typeArgs = (e.typeArguments ?? []).map((t) => this.typeNode(t, vars))
        return ref(q.text, [...args, ...typeArgs])
      }
    }
    if (!ts.isIdentifier(e.expression)) {
      throw new CompileError('only direct calls are supported', e, 'ST1403')
    }
    const name = e.expression.text
    const args = e.arguments.map((a) => this.expr(a, vars))
    const b = BUILTINS[name]
    if (b) {
      const ctx = this.ctx()
      ctx.typeArgs = (e.typeArguments ?? []).map((t) => this.typeNode(t, vars))
      const lowered = b.lower(args, ctx)
      if (lowered.tag === 'expr') return lowered.expr
      // A predicate used in value position yields a boolean.
      return cond(lowered.check, lowered.ext, bool(true), bool(false))
    }
    // User-defined type function (possibly this one, recursively).
    const typeArgs = (e.typeArguments ?? []).map((t) => this.typeNode(t))
    return ref(name, [...args, ...typeArgs])
  }

  // -------------------------------------------------------------------------
  // Type annotations
  // -------------------------------------------------------------------------

  private typeNode(t: ts.TypeNode, vars?: Vars): TypeExpr {
    switch (t.kind) {
      case ts.SyntaxKind.StringKeyword:
        return kw('string')
      case ts.SyntaxKind.NumberKeyword:
        return kw('number')
      case ts.SyntaxKind.BooleanKeyword:
        return kw('boolean')
      case ts.SyntaxKind.UnknownKeyword:
        return kw('unknown')
      case ts.SyntaxKind.NeverKeyword:
        return kw('never')
      case ts.SyntaxKind.AnyKeyword:
        return kw('any')
      case ts.SyntaxKind.BigIntKeyword:
        return kw('bigint')
      case ts.SyntaxKind.SymbolKeyword:
        return kw('symbol')
      case ts.SyntaxKind.ObjectKeyword:
        return kw('object')
    }
    if (ts.isArrayTypeNode(t)) return { kind: 'array', element: this.typeNode(t.elementType, vars) }
    if (ts.isTupleTypeNode(t)) {
      return tuple(
        t.elements.map((el) =>
          ts.isRestTypeNode(el)
            ? { expr: this.typeNode(el.type, vars), spread: true }
            : { expr: this.typeNode(el, vars) },
        ),
      )
    }
    if (ts.isUnionTypeNode(t)) return union(t.types.map((x) => this.typeNode(x, vars)))
    if (ts.isIntersectionTypeNode(t)) return intersection(t.types.map((x) => this.typeNode(x, vars)))
    if (ts.isLiteralTypeNode(t)) {
      const l = t.literal
      if (ts.isStringLiteral(l)) return str(l.text)
      if (ts.isNumericLiteral(l)) return num(Number(l.text))
      if (l.kind === ts.SyntaxKind.TrueKeyword) return bool(true)
      if (l.kind === ts.SyntaxKind.FalseKeyword) return bool(false)
      if (l.kind === ts.SyntaxKind.NullKeyword) return kw('null')
    }
    if (ts.isInferTypeNode(t)) {
      const tp = t.typeParameter
      return inferNode(tp.name.text, tp.constraint ? this.typeNode(tp.constraint, vars) : undefined)
    }
    if (ts.isTypeReferenceNode(t)) {
      const name = t.typeName.getText()
      // `Hole<'N'>` is the ScriptType spelling of `infer N`. `infer` is only legal
      // inside a conditional type's extends clause, so it cannot appear in a
      // type-argument position; a hole is an ordinary type and typechecks.
      if (name === 'Hole') {
        const arg = t.typeArguments?.[0]
        if (arg && ts.isLiteralTypeNode(arg) && ts.isStringLiteral(arg.literal)) {
          // A second argument is the inference constraint: `infer X extends C`.
          const c = t.typeArguments?.[1]
          return inferNode(arg.literal.text, c ? this.typeNode(c, vars) : undefined)
        }
      }
      const args = (t.typeArguments ?? []).map((a) => this.typeNode(a, vars))
      // A bare reference naming an in-scope variable resolves to that variable's
      // current value, so patterns written with the source's parameter spelling
      // still refer to the emitted type parameter.
      if (!args.length && vars?.has(name)) return vars.get(name)!
      return ref(name, args)
    }
    if (ts.isParenthesizedTypeNode(t)) return this.typeNode(t.type, vars)
    if (ts.isTypeOperatorNode(t)) {
      if (t.operator === ts.SyntaxKind.KeyOfKeyword) {
        return { kind: 'op', op: 'keyof', target: this.typeNode(t.type, vars) }
      }
      if (t.operator === ts.SyntaxKind.ReadonlyKeyword) {
        return { kind: 'op', op: 'readonly', target: this.typeNode(t.type, vars) }
      }
    }
    if (ts.isIndexedAccessTypeNode(t)) {
      return indexed(this.typeNode(t.objectType, vars), this.typeNode(t.indexType, vars))
    }
    if (ts.isTypeQueryNode(t)) {
      // `typeof X` names the value X; in ScriptType that value *is* a type.
      // `typeof m.H` reads hole H bound by match marker m.
      if (ts.isQualifiedName(t.exprName)) {
        const root = t.exprName.left.getText()
        if (this.markers.has(root)) return ref(t.exprName.right.text)
      }
      const name = t.exprName.getText()
      if (vars?.has(name)) return vars.get(name)!
      return ref(name)
    }
    if (ts.isTemplateLiteralTypeNode(t)) {
      const quasis = [t.head.text]
      const exprs: TypeExpr[] = []
      for (const span of t.templateSpans) {
        exprs.push(this.typeNode(span.type, vars))
        quasis.push(span.literal.text)
      }
      return template(quasis, exprs)
    }
    if (ts.isRestTypeNode(t)) return this.typeNode(t.type, vars)
    if (ts.isOptionalTypeNode(t)) return this.typeNode(t.type, vars)
    if (ts.isNamedTupleMember(t)) return this.typeNode(t.type, vars)
    // Anything else is already valid type syntax; pass it through verbatim — but first
    // turn any `Hole<'X'>` back into `infer X`, since a hole is ScriptType spelling and
    // must never reach the emitted TypeScript.
    return { kind: 'raw', text: holesToInfer(t, this.sf, this.paramNames()) }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Peel property-modifier markers off an expression. Returns the inner expression plus
 * the mapped-type modifier each marker denotes.
 */
function stripModifiers(e: ts.Expression): {
  expr: ts.Expression
  optional?: '+' | '-' | true
  readonly?: '+' | '-' | true
} {
  let expr = e
  let optional: '+' | '-' | true | undefined
  let readonly: '+' | '-' | true | undefined
  for (;;) {
    if (!ts.isCallExpression(expr) || !ts.isIdentifier(expr.expression) || expr.arguments.length !== 1) break
    const name = expr.expression.text
    if (name === 'optional') optional = true
    else if (name === 'required') optional = '-'
    else if (name === 'readonlyProp') readonly = true
    else if (name === 'mutable') readonly = '-'
    else break
    expr = expr.arguments[0]!
  }
  return { expr, optional, readonly }
}

/**
 * Native JavaScript methods that denote type operations, so a ScriptType program can be
 * written as plain JavaScript: `rest.includes(sep)` instead of `includes(rest, sep)`.
 * Maps method name -> builtin name, with the receiver passed as the first argument.
 */
const METHOD_BUILTINS: Record<string, string> = {
  includes: 'includes',
  startsWith: 'startsWith',
  endsWith: 'endsWith',
  toUpperCase: 'upper',
  toLowerCase: 'lower',
  split: 'split',
  trim: 'trim',
  replaceAll: 'replaceAll',
  replace: 'replaceAll',
  reverse: 'reverse',
  join: 'join',
  at: 'at',
}

/** Flatten `a.b.c` into its dotted text plus its root identifier, if it is purely dotted. */
function qualifiedName(e: ts.PropertyAccessExpression): { text: string; root: string } | undefined {
  const parts: string[] = [e.name.text]
  let cur: ts.Expression = e.expression
  while (ts.isPropertyAccessExpression(cur)) {
    parts.unshift(cur.name.text)
    cur = cur.expression
  }
  if (!ts.isIdentifier(cur)) return undefined
  parts.unshift(cur.text)
  return { text: parts.join('.'), root: cur.text }
}

const RAW_PRINTER = ts.createPrinter({ removeComments: true, newLine: ts.NewLineKind.LineFeed })

/**
 * Print a type node verbatim, rewriting `Hole<'X'>` (and `Hole<'X', C>`) back into
 * `infer X` (`infer X extends C`).
 *
 * Holes exist only so ScriptType source typechecks; they are not TypeScript semantics.
 * Any path that emits a node's original text must therefore undo them, or a hole leaks
 * into the output and the emitted type fails to compile.
 */
function holesToInfer(t: ts.TypeNode, sf: ts.SourceFile, params?: Set<string>): string {
  let sawHole = false
  const transformer: ts.TransformerFactory<ts.Node> = (ctx) => (root) => {
    const visit = (n: ts.Node): ts.Node => {
      // `typeof X` is how a ScriptType *source* refers to a parameter in type position;
      // in the emitted type the parameter is a type, so the query has to come back off.
      if (ts.isTypeQueryNode(n) && ts.isIdentifier(n.exprName)) {
        const name = n.exprName.text
        if (!params || params.has(name)) {
          sawHole = true
          return ctx.factory.createTypeReferenceNode(name, undefined)
        }
      }
      if (ts.isTypeReferenceNode(n) && n.typeName.getText(sf) === 'Hole') {
        const arg = n.typeArguments?.[0]
        if (arg && ts.isLiteralTypeNode(arg) && ts.isStringLiteral(arg.literal)) {
          sawHole = true
          const constraint = n.typeArguments?.[1]
          return ctx.factory.createInferTypeNode(
            ctx.factory.createTypeParameterDeclaration(
              undefined,
              ctx.factory.createIdentifier(arg.literal.text),
              constraint,
              undefined,
            ),
          )
        }
      }
      return ts.visitEachChild(n, visit, ctx)
    }
    return ts.visitNode(root, visit) as ts.Node
  }
  const result = ts.transform(t, [transformer])
  const out = result.transformed[0] as ts.TypeNode
  const text = sawHole
    ? RAW_PRINTER.printNode(ts.EmitHint.Unspecified, out, sf)
    : t.getText(sf)
  result.dispose()
  return text.replace(/\s*\n\s*/g, ' ').trim()
}

/** The JSDoc `@param {T}` type for a parameter, used by the pure-JavaScript dialect. */
function jsDocParamType(p: ts.ParameterDeclaration): ts.TypeNode | undefined {
  for (const tag of ts.getJSDocParameterTags(p)) {
    if (tag.typeExpression?.type) return tag.typeExpression.type
  }
  return undefined
}

function asStatements(s: ts.Statement): readonly ts.Statement[] {
  return ts.isBlock(s) ? s.statements : [s]
}

function propName(n: ts.PropertyName | ts.BindingName): string {
  if (ts.isIdentifier(n) || ts.isStringLiteral(n) || ts.isNumericLiteral(n)) return n.text
  if (ts.isPrivateIdentifier(n)) return n.text
  return n.getText()
}

/** Identifiers assigned to (or mutated via push/unshift/concat) inside a subtree. */
function collectAssigned(root: ts.Node): Set<string> {
  const out = new Set<string>()
  const visit = (n: ts.Node) => {
    if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      if (ts.isIdentifier(n.left)) out.add(n.left.text)
    }
    if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression)) {
      const m = n.expression.name.text
      if ((m === 'push' || m === 'unshift' || m === 'concat') && ts.isIdentifier(n.expression.expression)) {
        out.add(n.expression.expression.text)
      }
    }
    ts.forEachChild(n, visit)
  }
  visit(root)
  return out
}

/** Identifiers read anywhere inside a subtree. */
function collectRead(root: ts.Node): Set<string> {
  const out = new Set<string>()
  const visit = (n: ts.Node) => {
    if (ts.isIdentifier(n)) out.add(n.text)
    ts.forEachChild(n, visit)
  }
  visit(root)
  return out
}

/** Rename `infer X` nodes (which `substitute` deliberately leaves alone). */
function renameInfers(e: TypeExpr, renames: Map<string, TypeExpr>): TypeExpr {
  const nameFor = (old: string): string | undefined => {
    const r = renames.get(old)
    return r && r.kind === 'ref' ? r.name : undefined
  }
  const walk = (x: TypeExpr): TypeExpr => {
    if (x.kind === 'infer') {
      const n = nameFor(x.name)
      return n ? { ...x, name: n } : x
    }
    switch (x.kind) {
      case 'template':
        return { ...x, exprs: x.exprs.map(walk) }
      case 'tuple':
        return { ...x, elements: x.elements.map((el) => ({ ...el, expr: walk(el.expr) })) }
      case 'union':
        return { ...x, members: x.members.map(walk) }
      case 'intersection':
        return { ...x, members: x.members.map(walk) }
      case 'ref':
        return x.args ? { ...x, args: x.args.map(walk) } : x
      case 'conditional':
        return { ...x, check: walk(x.check), ext: walk(x.ext), then: walk(x.then), else: walk(x.else) }
      default:
        return x
    }
  }
  return walk(e)
}

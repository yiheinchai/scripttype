/**
 * Decompiler: TypeScript type alias -> ScriptType source.
 *
 * This is the scalable half of the project. Hand-authoring a ScriptType program for
 * each of the corpus's ~7500 generic type aliases is infeasible, but decompiling then
 * recompiling makes the round-trip itself the verification: if
 * `compile(decompile(T))` is type-identical to `T`, the language can express `T`.
 *
 * It also measures the language honestly. Every construct the decompiler cannot
 * express becomes a `raw()` call, and `raw()` disqualifies a target from counting as
 * covered — so the residual `raw()` rate is a direct readout of what the language is
 * still missing.
 */
import ts from 'typescript'
import { detectTailLoop, type LoopShape } from './recover-loop.js'

export interface DecompileResult {
  source: string
  /** Constructs that fell back to raw(), i.e. real language gaps. */
  gaps: string[]
}

const INDENT = '  '

export function decompileAlias(decl: ts.TypeAliasDeclaration, sf: ts.SourceFile): DecompileResult {
  const gaps: string[] = []
  const paramNames = new Set((decl.typeParameters ?? []).map((tp) => tp.name.text))
  const anyParams = new Set(
    (decl.typeParameters ?? []).filter((tp) => !tp.constraint).map((tp) => tp.name.text),
  )
  const d = new Decompiler(sf, gaps, paramNames, anyParams)
  d.paramOrder = (decl.typeParameters ?? []).map((tp) => tp.name.text)
  d.aliasName = decl.name.text
  d.seedScope(d.paramOrder)
  const name = decl.name.text

  const params = (decl.typeParameters ?? []).map((tp) => {
    // Keep the original parameter name: `pascal()` preserves already-capitalised
    // names, so emitted type parameters match the reference exactly.
    // No annotation when unconstrained: annotating `unknown` would make every use of
    // the parameter a type error, and `extends unknown` is not emitted anyway.
    const ann = tp.constraint ? `: ${holePattern(tp.constraint, sf, paramNames)}` : ''
    const def = tp.default ? ` = ${d.exprNoHoist(tp.default)}` : ''
    return `${tp.name.text}${ann}${def}`
  })

  // A tail-recursive accumulator is a loop written as recursion; recovering the loop is
  // the largest readability gain available here.
  const loop = detectTailLoop(decl, sf)
  if (loop) {
    const recovered = d.loopBody(loop)
    if (recovered) {
      const sig = loop.publicParams.map((tp) => {
        const ann = tp.constraint ? `: ${holePattern(tp.constraint, sf, paramNames)}` : ''
        const dflt = tp.default ? ` = ${d.exprNoHoist(tp.default)}` : ''
        return `${tp.name.text}${ann}${dflt}`
      })
      const src =
        `/* @scripttype preserveParamNames */\n` +
        d.lifted.join('\n') +
        `export function ${name}(${sig.join(', ')}) {\n` +
        recovered.map((l) => INDENT + l).join('\n') +
        '\n}\n'
      return { source: src, gaps }
    }
  }

  const body = d.statements(decl.type, 1)
  const src =
    `/* @scripttype preserveParamNames */\n` +
    d.lifted.join('\n') +
    `export function ${name}(${params.join(', ')}) {\n` +
    body.map((l) => INDENT + l).join('\n') +
    '\n}\n'
  return { source: src, gaps }
}

class Decompiler {
  /** Statements hoisted out of the expression currently being rendered. */
  private pending: string[] = []
  private temps = 0
  private markers = 0
  /**
   * Names bound by the enclosing pattern, mapped to how they are read.
   *
   * A hole cannot appear as a bare identifier in ScriptType source — it would be an
   * undeclared name and would not typecheck. It is read as a property of the match
   * marker instead (`m1.R`), which is always well-typed because the marker is `any`.
   */
  private holeScope: Map<string, string> = new Map()
  /** Depth of contexts with no statement position available for a marker. */
  private noHoist = 0
  /**
   * Functions lifted out of positions that cannot hold statements.
   *
   * A mapped type's value is a single expression, so a construct needing statements
   * (a nested mapped type, or a pattern with bindings) cannot be expressed inline. It is
   * extracted into its own ScriptType function instead — ordinary lambda lifting — and the
   * value becomes a call. The compiler turns that into a helper type alias, which is what
   * a person writing this by hand would do too.
   */
  lifted: string[] = []
  /** Names in scope at the current lift point, becoming the lifted function's parameters. */
  private scopeVars: string[] = []
  private liftCount = 0
  /** Parameters rewritten to loop locals. */
  private locals: Map<string, string> = new Map()
  /** Declaration order of the alias's parameters, for matching recursive-call arguments. */
  paramOrder: string[] = []
  /** Name of the alias being decompiled, used to name lifted functions. */
  aliasName = 'Lifted'

  constructor(
    private sf: ts.SourceFile,
    private gaps: string[],
    /** Type parameters of the alias — values in ScriptType, so patterns use `typeof`. */
    private params: Set<string> = new Set(),
    /** Parameters with no annotation, hence `any` at the value level. */
    private anyParams: Set<string> = new Set(),
  ) {}

  /**
   * Whether an expression will be `any` at the value level.
   *
   * `|` and `&` are JavaScript's bitwise operators, so they only typecheck when every
   * operand is any/number/bigint. Knowing this lets us keep the readable `A | B`
   * spelling wherever it is valid, and fall back to a call form only where it is not.
   */
  private isAnyTyped(t: ts.TypeNode): boolean {
    const n = unwrapParens(t)
    // Calls return `any`: every builtin and every applied type is declared that way.
    if (ts.isTypeReferenceNode(n)) {
      const name = n.typeName.getText(this.sf)
      if (n.typeArguments?.length) return true // becomes a call
      if (this.holeScope.has(name)) return true // read off a marker, which is `any`
      if (this.anyParams.has(name)) return true
      if (this.params.has(name)) return false // annotated parameter: its own type
      return true // free name, declared `const … : any`
    }
    if (ts.isTypeOperatorNode(n) || ts.isIndexedAccessTypeNode(n)) return true // keyof(...)/get(...)
    if (ts.isConditionalTypeNode(n)) return true // marker ternary yields `any`
    if (ts.isMappedTypeNode(n)) return true // hoisted into an `emptyObject` accumulator
    if (ts.isArrayTypeNode(n)) return true // arrayOf(...)
    if (ts.isFunctionTypeNode(n)) return true // fnType(...)
    switch (n.kind) {
      // Bare type keywords are declared as values of type `any`.
      case ts.SyntaxKind.AnyKeyword:
      case ts.SyntaxKind.UnknownKeyword:
      case ts.SyntaxKind.NeverKeyword:
      case ts.SyntaxKind.StringKeyword:
      case ts.SyntaxKind.NumberKeyword:
      case ts.SyntaxKind.BooleanKeyword:
      case ts.SyntaxKind.ObjectKeyword:
      case ts.SyntaxKind.SymbolKeyword:
      case ts.SyntaxKind.BigIntKeyword:
      case ts.SyntaxKind.VoidKeyword:
        return true
    }
    if (ts.isLiteralTypeNode(n)) {
      // `null` and `undefined` are spelled as `any`-typed constants; other literals
      // keep their own literal type and cannot be operands.
      const l = n.literal
      return l.kind === ts.SyntaxKind.NullKeyword
    }
    // Object and tuple literals, template literals: not `any`.
    return false
  }

  /**
   * Render an expression, capturing any statements it needs hoisted above itself.
   * A mapped type has no expression spelling in ScriptType (it is a `for...in` loop),
   * so nested mapped types are lifted into a preceding `const`.
   */
  private withHoist(f: () => string): { lines: string[]; value: string } {
    const saved = this.pending
    this.pending = []
    const value = f()
    const lines = this.pending
    this.pending = saved
    return { lines, value }
  }

  private gap(node: ts.Node, why: string): string {
    this.gaps.push(why)
    let text: string
    try {
      text = PRINTER.printNode(ts.EmitHint.Unspecified, node, this.sf)
    } catch {
      text = node.getText(this.sf).replace(/\/\/[^\n]*/g, '')
    }
    // Escape for a single-quoted string literal.
    text = text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\s*\n\s*/g, ' ').trim()
    return `raw('${text}')`
  }

  /**
   * Render a recovered loop.
   *
   * Parameters that change across iterations become mutable locals; defaulted parameters
   * become locals seeded with their default. The guard is tested inside `while (true)` so
   * a failed match can `break` out to the exit expression, which is exactly the shape the
   * compiler lowers back into a tail-recursive helper.
   */
  loopBody(loop: LoopShape): string[] | undefined {
    const declared = new Map<string, string>()
    const lines: string[] = []

    // Accumulators first: they read as the thing being built up.
    const taken = new Set(this.paramOrder)
    const accNames = new Set<string>()
    for (const { param, init } of loop.accumulators) {
      const local = this.localName(param.name.text, false, taken)
      declared.set(param.name.text, local)
      accNames.add(param.name.text)
      taken.add(local)
      const initText = this.expr(init)
      // An empty array literal infers `never[]`, which rejects every `push`. Annotate.
      const ann = /^\[\s*\]$/.test(initText) ? ': any[]' : ''
      lines.push(`let ${local}${ann} = ${initText}`)
    }
    for (const p of loop.publicParams) {
      if (!loop.changing.has(p.name.text)) continue
      const local = this.localName(p.name.text, true, taken)
      declared.set(p.name.text, local)
      taken.add(local)
      lines.push(`let ${local} = ${p.name.text}`)
    }
    if (this.pending.length) return undefined // an accumulator needing hoists: bail out

    // Inside the loop, a changing parameter refers to its local.
    const savedLocals = this.locals
    this.locals = new Map([...savedLocals, ...declared])

    const holes = inferNames(loop.pattern)
    if (loop.recursiveOnTrue && !holes.length) {
      // Continuing while a binding-free guard matches would loop forever unless some
      // parameter shrinks; that is not a shape worth guessing at.
      this.locals = savedLocals
      return undefined
    }
    const marker = holes.length ? `m${++this.markers}` : ''
    const pattern = holePattern(loop.pattern, this.sf, this.params, this.holeScope)
    const check = this.expr(loop.check)
    if (this.pending.length) {
      this.locals = savedLocals
      return undefined
    }

    const savedHoles = this.holeScope
    this.holeScope = new Map(savedHoles)
    for (const h of holes) this.holeScope.set(h, `${marker}.${h}`)

    // One assignment per changing parameter, in declaration order.
    const updates: string[] = []
    let bail = false
    for (const [i, arg] of loop.nextArgs.entries()) {
      const pname = this.paramOrder[i]
      if (!pname || !loop.changing.has(pname)) continue
      const local = declared.get(pname)
      if (!local) {
        bail = true
        break
      }
      // `Acc = [...Acc, x]` is an append; say so.
      const prepended = prependedItems(arg, pname, this.sf)
      if (prepended) {
        const items = prepended.map((x) => this.expr(x))
        if (this.pending.length) {
          bail = true
          break
        }
        updates.push(`${local}.unshift(${items.join(', ')})`)
        continue
      }
      const appended = appendedItems(arg, pname, this.sf)
      if (appended) {
        const items = appended.map((x) => this.expr(x))
        if (this.pending.length) {
          bail = true
          break
        }
        updates.push(`${local}.push(${items.join(', ')})`)
        continue
      }
      const value = this.expr(arg)
      if (this.pending.length) {
        bail = true
        break
      }
      updates.push(`${local} = ${value}`)
    }

    const exit = this.expr(loop.exit)
    const exitPending = [...this.pending]
    this.pending = []
    this.holeScope = savedHoles
    this.locals = savedLocals
    if (bail) return undefined

    lines.push(`while (true) {`)
    if (marker) {
      lines.push(`${INDENT}const ${marker} = matches<${pattern}>(${check})`)
      lines.push(`${INDENT}if (${loop.recursiveOnTrue ? '!' : ''}${marker}) {`)
    } else {
      // No bindings: test the guard inline.
      const natural = this.naturalGuard(check, loop.pattern)
      // A natural guard is an operator expression, so negating it needs parentheses:
      // `!typeof x === 'string'` would parse as `(!typeof x) === 'string'`.
      const inline = natural
        ? loop.recursiveOnTrue
          ? `!(${natural})`
          : natural
        : `${loop.recursiveOnTrue ? '!' : ''}matches<${pattern}>(${check})`
      lines.push(`${INDENT}if (${inline}) {`)
    }
    lines.push(`${INDENT}${INDENT}break`)
    lines.push(`${INDENT}}`)
    for (const u of updates) lines.push(INDENT + u)
    lines.push(`}`)
    lines.push(...exitPending)
    lines.push(`return ${exit}`)
    return lines
  }

  /**
   * A local name for a parameter turned into a loop variable.
   *
   * A public parameter needs a *different* name, since `let S = S` shadows the parameter
   * with itself and is not valid. Lowercasing the first letter keeps the connection
   * obvious while reading.
   */
  /**
   * Extract `t` into its own ScriptType function and return a call to it.
   *
   * Parameters are the names `t` actually reads that are bound in the enclosing scope:
   * the alias's own parameters, the mapped-type key, and any pattern bindings. Holes are
   * passed as `marker.hole`, so the lifted function sees them as ordinary parameters.
   */
  private lift(t: ts.TypeNode): string {
    const inScope = new Set(this.scopeVars)
    const used = new Set<string>()
    const walk = (n: ts.Node) => {
      if (ts.isTypeReferenceNode(n) && ts.isIdentifier(n.typeName)) used.add(n.typeName.text)
      if (ts.isTypeQueryNode(n)) used.add(n.exprName.getText(this.sf).split('.')[0]!)
      ts.forEachChild(n, walk)
    }
    walk(t)

    const params: string[] = []
    const args: string[] = []
    for (const name of inScope) {
      if (!used.has(name)) continue
      params.push(name)
      args.push(this.holeScope.get(name) ?? this.locals.get(name) ?? name)
    }

    const fnName = `${this.aliasName}__v${++this.liftCount}`
    // Render the body in a nested decompiler so its own hoists and markers are local.
    const inner = new Decompiler(this.sf, this.gaps, new Set(params), new Set(params))
    inner.aliasName = fnName
    inner.paramOrder = params
    const body = inner.statements(t, 1)
    this.lifted.push(...inner.lifted)
    this.lifted.push(
      `export function ${fnName}(${params.join(', ')}) {\n` +
        body.map((l) => INDENT + l).join('\n') +
        '\n}\n',
    )
    return `${fnName}(${args.join(', ')})`
  }

  /**
   * A fresh name for a mapped-type accumulator.
   *
   * Shared by every mapped type in a declaration, so a statement-level accumulator cannot
   * collide with a hoisted one — a collision emitted `out[K] = out`, a self-reference.
   */
  /**
   * Render an expression in a context that cannot hold statements, such as a parameter
   * default. Anything needing a statement is lifted into its own function instead of
   * silently losing its declaration.
   */
  exprNoHoist(t: ts.TypeNode): string {
    this.noHoist++
    try {
      return this.expr(t)
    } finally {
      this.noHoist--
    }
  }

  /** Names in scope before any nesting: the alias's own parameters. */
  seedScope(names: string[]): void {
    this.scopeVars = [...names]
  }

  private accName(): string {
    const n = ++this.temps
    return n === 1 ? 'out' : `out${n}`
  }

  private localName(param: string, isPublic: boolean, taken: Set<string>): string {
    if (!isPublic) return param
    let candidate = param[0]!.toLowerCase() + param.slice(1)
    if (candidate === param) candidate = `${param}_`
    while (taken.has(candidate)) candidate += '_'
    return candidate
  }

  /** Lower a type node into a statement list ending in a `return`. */
  statements(t: ts.TypeNode, depth: number): string[] {
    t = unwrapParens(t)

    if (ts.isConditionalTypeNode(t)) {
      const { lines, value: check } = this.withHoist(() => this.expr(t.checkType))
      const holes = inferNames(t.extendsType)
      const pattern = holePattern(t.extendsType, this.sf, this.params, this.holeScope)

      if (!holes.length) {
        const thenStmts = this.statements(t.trueType, depth + 1)
        const elseStmts = this.statements(t.falseType, depth)
        const guard = this.naturalGuard(check, t.extendsType) ?? `matches<${pattern}>(${check})`
        return [
          ...lines,
          `if (${guard}) {`,
          ...thenStmts.map((l) => INDENT + l),
          `}`,
          ...elseStmts,
        ]
      }

      // Bindings are read off the marker, so they are declared names rather than free
      // identifiers, and the source typechecks.
      const marker = `m${++this.markers}`
      const saved = this.holeScope
      this.holeScope = new Map(saved)
      for (const h of holes) this.holeScope.set(h, `${marker}.${h}`)
      const savedScope = this.scopeVars
      this.scopeVars = [...savedScope, ...holes]
      const thenStmts = this.statements(t.trueType, depth + 1)
      this.scopeVars = savedScope
      this.holeScope = saved
      const elseStmts = this.statements(t.falseType, depth)
      return [
        ...lines,
        `const ${marker} = matches<${pattern}>(${check})`,
        `if (${marker}) {`,
        ...thenStmts.map((l) => INDENT + l),
        `}`,
        ...elseStmts,
      ]
    }

    if (ts.isMappedTypeNode(t)) {
      const name = this.accName()
      const mapped = this.mapped(t, name)
      if (mapped) return [...mapped, `return ${name}`]
      return [`return ${this.gap(t, 'mapped type with unsupported modifiers')}`]
    }

    const { lines, value } = this.withHoist(() => this.expr(t))
    return [...lines, `return ${value}`]
  }

  /**
   * A mapped type becomes a `for...in` over its key domain. The domain is already a
   * key union, so it is marked with `keySet()` rather than being wrapped in `keyof`.
   */
  private mapped(t: ts.MappedTypeNode, varName = 'out'): string[] | undefined {
    if (!t.type) return undefined

    const param = t.typeParameter.name.text
    const constraint = t.typeParameter.constraint
    if (!constraint) return undefined
    // The key variable is a value in ScriptType, so type positions referring to it need
    // `typeof`. Register it for the duration of the body, and as a liftable scope name.
    this.params.add(param)
    this.scopeVars.push(param)

    const domain = ts.isTypeOperatorNode(constraint) && constraint.operator === ts.SyntaxKind.KeyOfKeyword
      ? `keyof(${this.expr(constraint.type)})`
      : `keySet(${this.expr(constraint)})`

    const key = t.nameType ? this.expr(t.nameType) : param
    // A mapped type's value is a single expression: nothing can be hoisted above it.
    this.noHoist++
    let value = this.expr(t.type)
    this.noHoist--
    // Property modifiers become value-wrapping markers.
    if (t.questionToken) {
      value = t.questionToken.kind === ts.SyntaxKind.MinusToken ? `required(${value})` : `optional(${value})`
    }
    if (t.readonlyToken) {
      value =
        t.readonlyToken.kind === ts.SyntaxKind.MinusToken ? `mutable(${value})` : `readonlyProp(${value})`
    }
    return [
      `const ${varName} = emptyObject`,
      `for (const ${param} in ${domain}) {`,
      `${INDENT}${varName}[${key}] = ${value}`,
      `}`,
    ]
  }

  /**
   * The natural JavaScript spelling of a binding-free guard, when there is one.
   *
   * `matches<string>(t)` is a correct lowering of `T extends string`, but no JavaScript
   * programmer writes it that way — they write `typeof t === 'string'`, which compiles
   * to the same thing. Since the readability case is the whole argument for the
   * language, the decompiler should produce the spelling a reader already knows.
   *
   * Only exact, unambiguous correspondences are mapped. Anything else keeps
   * `matches<…>`, which is explicit about being an `extends` test.
   */
  private naturalGuard(check: string, ext: ts.TypeNode): string | undefined {
    const t = unwrapParens(ext)

    const TYPEOF_TAG: Partial<Record<ts.SyntaxKind, string>> = {
      [ts.SyntaxKind.StringKeyword]: 'string',
      [ts.SyntaxKind.NumberKeyword]: 'number',
      [ts.SyntaxKind.BooleanKeyword]: 'boolean',
      [ts.SyntaxKind.BigIntKeyword]: 'bigint',
      [ts.SyntaxKind.SymbolKeyword]: 'symbol',
      [ts.SyntaxKind.UndefinedKeyword]: 'undefined',
    }
    const tag = TYPEOF_TAG[t.kind]
    // A parenthesised check would read as `typeof (a | b) === …`, which is not the
    // same test, so only a simple operand qualifies.
    if (tag && isSimpleOperand(check)) return `typeof ${check} === '${tag}'`

    // `T extends any[]` — but not `string[]`, whose runtime test would be weaker than
    // the type test it replaces.
    if (
      ts.isArrayTypeNode(t) &&
      t.elementType.kind === ts.SyntaxKind.AnyKeyword &&
      isSimpleOperand(check)
    ) {
      return `Array.isArray(${check})`
    }

    // `'k' extends keyof O` is exactly what `'k' in o` means.
    if (ts.isTypeOperatorNode(t) && t.operator === ts.SyntaxKind.KeyOfKeyword) {
      const obj = this.expr(t.type)
      if (isSimpleOperand(obj)) return `${check} in ${obj}`
    }

    return undefined
  }

  /**
   * A function or constructor parameter, marked optional where it is.
   *
   * Dropping the `?` changes the type: `(a?: T) => R` and `(a: T) => R` are different, so
   * an equivalence check would fail on an otherwise correct translation.
   */
  private paramExpr(p: ts.ParameterDeclaration): string {
    const inner = p.type ? this.expr(p.type) : 'unknown'
    if (p.dotDotDotToken) return `...${inner}`
    return p.questionToken ? `optElem(${inner})` : inner
  }

  /** Render a type node as a ScriptType *expression*. */
  expr(t: ts.TypeNode): string {
    t = unwrapParens(t)

    switch (t.kind) {
      case ts.SyntaxKind.StringKeyword:
        return 'string'
      case ts.SyntaxKind.NumberKeyword:
        return 'number'
      case ts.SyntaxKind.BooleanKeyword:
        return 'boolean'
      case ts.SyntaxKind.UnknownKeyword:
        return 'unknown'
      case ts.SyntaxKind.NeverKeyword:
        return 'never'
      case ts.SyntaxKind.AnyKeyword:
        return 'any'
      case ts.SyntaxKind.BigIntKeyword:
        return 'bigint'
      case ts.SyntaxKind.SymbolKeyword:
        return 'symbol'
      case ts.SyntaxKind.ObjectKeyword:
        return 'object'
      case ts.SyntaxKind.UndefinedKeyword:
        return 'Undefined'
      case ts.SyntaxKind.VoidKeyword:
        return 'voidType()'
    }

    if (ts.isLiteralTypeNode(t)) {
      const l = t.literal
      if (ts.isStringLiteral(l)) return `'${l.text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
      if (ts.isNumericLiteral(l)) return l.text
      if (l.kind === ts.SyntaxKind.TrueKeyword) return 'true'
      if (l.kind === ts.SyntaxKind.FalseKeyword) return 'false'
      // `Null` where it must be an operand of `|`; plain `null` reads better elsewhere,
      // and the call forms accept it as an argument.
      if (l.kind === ts.SyntaxKind.NullKeyword) return 'Null'
      if (ts.isPrefixUnaryExpression(l)) return l.getText(this.sf)
      return this.gap(t, `literal type ${ts.SyntaxKind[l.kind]}`)
    }

    if (ts.isTypeReferenceNode(t)) {
      const name = t.typeName.getText(this.sf)
      const args = t.typeArguments ?? []
      const bound = this.holeScope.get(name)
      if (bound && !args.length) return bound
      const local = this.locals.get(name)
      if (local && !args.length) return local
      // `Array<T>` and `ReadonlyArray<T>` have real expression forms, so use them rather
      // than falling into the `t<…>()` case below. That matters beyond tidiness: `t<…>()`
      // renders its argument as verbatim *type* text, and a ScriptType function is a
      // value, so a nested call like `Array<Dehydrate<U>>` would emit `Dehydrate<U>` in
      // type position and fail to typecheck.
      const ARRAY_FORM: Record<string, string> = {
        Array: 'arrayOf',
        ReadonlyArray: 'readonlyArrayOf',
      }
      const arrayForm = ARRAY_FORM[name]
      if (arrayForm && args.length === 1) return `${arrayForm}(${this.expr(args[0]!)})`

      // A global whose value form is a constructor cannot be applied as a call, so name
      // the type directly instead of emitting `Promise(T)`.
      if (CONSTRUCTOR_GLOBALS.has(name.split('.')[0]!)) {
        return `t<${patternLike(t, this.sf, this.params, this.holeScope)}>()`
      }
      if (!args.length) return name
      return `${name}(${args.map((a) => this.expr(a)).join(', ')})`
    }

    if (ts.isUnionTypeNode(t)) {
      return t.types.every((x) => this.isAnyTyped(x))
        ? t.types.map((x) => this.wrap(x)).join(' | ')
        : `anyOf(${t.types.map((x) => this.expr(x)).join(', ')})`
    }
    if (ts.isIntersectionTypeNode(t)) {
      return t.types.every((x) => this.isAnyTyped(x))
        ? t.types.map((x) => this.wrap(x)).join(' & ')
        : `merge(${t.types.map((x) => this.expr(x)).join(', ')})`
    }

    if (ts.isArrayTypeNode(t)) return `arrayOf(${this.expr(t.elementType)})`

    if (ts.isTupleTypeNode(t)) {
      const parts = t.elements.map((el) => {
        if (ts.isRestTypeNode(el)) {
          // A tuple rest element's type IS the array: `[A, ...B[]]` means "an A then
          // any number of B". So `...T[]` must stay an array (`arrayOf(T)`); unwrapping
          // it to the element type produces `[A, ...B]`, which does not typecheck.
          return `...${this.expr(el.type)}`
        }
        if (ts.isNamedTupleMember(el)) return this.expr(el.type)
        if (ts.isOptionalTypeNode(el)) return `optElem(${this.expr(el.type)})`
        return this.expr(el)
      })
      return `[${parts.join(', ')}]`
    }

    if (ts.isTypeLiteralNode(t)) {
      const props: string[] = []
      for (const m of t.members) {
        if (ts.isPropertySignature(m) && m.type && m.name) {
          const key = ts.isIdentifier(m.name) ? m.name.text : m.name.getText(this.sf)
          let v = this.expr(m.type)
          if (m.questionToken) v = `optional(${v})`
          if (m.modifiers?.some((x) => x.kind === ts.SyntaxKind.ReadonlyKeyword)) v = `readonlyProp(${v})`
          props.push(`${key}: ${v}`)
        } else if (ts.isIndexSignatureDeclaration(m)) {
          // `{ [key: K]: V }` — an index signature, not a named property.
          if (t.members.length !== 1 || !m.type || !m.parameters[0]?.type) {
            return this.gap(t, 'index signature combined with other members')
          }
          return `indexRecord(${this.expr(m.parameters[0].type)}, ${this.expr(m.type)})`
        } else {
          return this.gap(t, `object member ${ts.SyntaxKind[m.kind]}`)
        }
      }
      return props.length ? `{ ${props.join(', ')} }` : '{}'
    }

    if (ts.isTemplateLiteralTypeNode(t)) {
      let out = '`' + escapeTemplate(t.head.text)
      for (const span of t.templateSpans) {
        out += '${' + this.expr(span.type) + '}' + escapeTemplate(span.literal.text)
      }
      return out + '`'
    }

    if (ts.isIndexedAccessTypeNode(t)) {
      return `${this.wrapPostfix(t.objectType)}[${this.expr(t.indexType)}]`
    }

    if (ts.isTypeOperatorNode(t)) {
      if (t.operator === ts.SyntaxKind.KeyOfKeyword) return `keyof(${this.expr(t.type)})`
      if (t.operator === ts.SyntaxKind.ReadonlyKeyword) {
        if (ts.isArrayTypeNode(t.type)) return `readonlyArrayOf(${this.expr(t.type.elementType)})`
        return `asReadonly(${this.expr(t.type)})`
      }
      return this.gap(t, `type operator ${ts.SyntaxKind[t.operator]}`)
    }

    // A conditional in expression position becomes a ternary; `matches()` binds any
    // `infer` names for the true-branch just as it does in statement position.
    if (ts.isConditionalTypeNode(t)) {
      const check = this.expr(t.checkType)
      const holes = inferNames(t.extendsType)
      const pattern = holePattern(t.extendsType, this.sf, this.params, this.holeScope)
      if (!holes.length) {
        const guard = this.naturalGuard(check, t.extendsType) ?? `matches<${pattern}>(${check})`
        return `${guard} ? ${this.wrap(t.trueType)} : ${this.wrap(t.falseType)}`
      }
      if (this.noHoist > 0) return this.lift(t)
      const marker = `m${++this.markers}`
      this.pending.push(`const ${marker} = matches<${pattern}>(${check})`)
      const saved = this.holeScope
      this.holeScope = new Map(saved)
      for (const h of holes) this.holeScope.set(h, `${marker}.${h}`)
      const t1 = this.wrap(t.trueType)
      this.holeScope = saved
      const t2 = this.wrap(t.falseType)
      return `${marker} ? ${t1} : ${t2}`
    }

    if (ts.isFunctionTypeNode(t)) {
      const params = t.parameters.map((p) => this.paramExpr(p))
      const ret = this.expr(t.type)
      if (t.typeParameters?.length) {
        // The `<T>() => ...` variance trick: type parameters are named as string literals.
        const tps = t.typeParameters.map((tp) => `'${tp.getText(this.sf).replace(/'/g, "\\'")}'`)
        return `genericFnType([${tps.join(', ')}], [${params.join(', ')}], ${ret})`
      }
      return `fnType([${params.join(', ')}], ${ret})`
    }

    if (ts.isConstructorTypeNode(t)) {
      const params = t.parameters.map((p) => this.paramExpr(p))
      return `ctorType([${params.join(', ')}], ${this.expr(t.type)})`
    }

    if (ts.isTypeQueryNode(t)) {
      // `typeof X` names a value; there is no expression form, so name the type directly.
      return `t<${t.getText(this.sf)}>()`
    }

    if (ts.isMappedTypeNode(t)) {
      // Nothing can be hoisted above a mapped type's value expression, so a mapped type
      // nested there cannot be lifted into a preceding `const`; its declaration would be
      // dropped and the reference left dangling.
      if (this.noHoist > 0) return this.lift(t)
      const name = this.accName()
      const lines = this.mapped(t, name)
      if (!lines) return this.gap(t, 'mapped type with unsupported modifiers')
      this.pending.push(...lines)
      return name
    }
    if (ts.isInferTypeNode(t)) return this.gap(t, 'infer outside a pattern')

    return this.gap(t, `type node ${ts.SyntaxKind[t.kind]}`)
  }

  /** Parenthesise where JavaScript operator precedence differs from type precedence. */
  private wrap(t: ts.TypeNode): string {
    const inner = unwrapParens(t)
    const s = this.expr(inner)
    if (ts.isConditionalTypeNode(inner) || ts.isUnionTypeNode(inner) || ts.isIntersectionTypeNode(inner)) {
      return `(${s})`
    }
    return s
  }

  private wrapPostfix(t: ts.TypeNode): string {
    const inner = unwrapParens(t)
    const s = this.expr(inner)
    return ts.isUnionTypeNode(inner) || ts.isIntersectionTypeNode(inner) || ts.isConditionalTypeNode(inner)
      ? `(${s})`
      : s
  }
}

const PRINTER = ts.createPrinter({ removeComments: true, newLine: ts.NewLineKind.LineFeed })

/**
 * If `arg` is `[...Param, a, b]`, return the appended items. Recognising this lets an
 * accumulator update be written as `acc.push(a, b)` rather than a spread reassignment.
 */
function appendedItems(arg: ts.TypeNode, param: string, sf: ts.SourceFile): ts.TypeNode[] | undefined {
  let n = arg
  while (ts.isParenthesizedTypeNode(n)) n = n.type
  if (!ts.isTupleTypeNode(n) || n.elements.length < 2) return undefined
  const [first, ...rest] = n.elements
  if (!first || !ts.isRestTypeNode(first)) return undefined
  const spread = first.type
  if (!ts.isTypeReferenceNode(spread) || spread.typeName.getText(sf) !== param) return undefined
  if (spread.typeArguments?.length) return undefined
  if (rest.some((e) => ts.isRestTypeNode(e))) return undefined
  return rest
}

/** If `arg` is `[a, b, ...Param]`, return the prepended items. */
function prependedItems(arg: ts.TypeNode, param: string, sf: ts.SourceFile): ts.TypeNode[] | undefined {
  let n = arg
  while (ts.isParenthesizedTypeNode(n)) n = n.type
  if (!ts.isTupleTypeNode(n) || n.elements.length < 2) return undefined
  const last = n.elements[n.elements.length - 1]!
  const front = n.elements.slice(0, -1)
  if (!ts.isRestTypeNode(last)) return undefined
  const spread = last.type
  if (!ts.isTypeReferenceNode(spread) || spread.typeName.getText(sf) !== param) return undefined
  if (spread.typeArguments?.length) return undefined
  if (front.some((e) => ts.isRestTypeNode(e))) return undefined
  return front
}

/**
 * Globals whose value form is a constructor: applying them as a call is an error
 * ("Value of type 'PromiseConstructor' is not callable"), so such a type is named with
 * `t<...>()` rather than called.
 */
const CONSTRUCTOR_GLOBALS = new Set([
  'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Array', 'ReadonlyArray', 'Date', 'RegExp',
  'Error', 'String', 'Number', 'Boolean', 'Object', 'Symbol', 'Function', 'BigInt', 'Proxy',
  'Int8Array', 'Uint8Array', 'Float32Array', 'Float64Array', 'ArrayBuffer', 'DataView',
  'Iterator', 'AsyncIterator', 'Generator', 'AsyncGenerator', 'Iterable', 'AsyncIterable',
])

/** Render a type verbatim, with holes and parameter references made typecheckable. */
function patternLike(
  t: ts.TypeNode,
  sf: ts.SourceFile,
  params: Set<string>,
  holes: Map<string, string>,
): string {
  return holePattern(t, sf, params, holes)
}

/** Names introduced by `infer` inside a pattern, in source order. */
function inferNames(t: ts.TypeNode): string[] {
  const out: string[] = []
  const walk = (n: ts.Node) => {
    if (ts.isInferTypeNode(n)) out.push(n.typeParameter.name.text)
    ts.forEachChild(n, walk)
  }
  walk(t)
  return out
}

/**
 * Render a pattern with each `infer X` replaced by `Hole<'X'>`.
 *
 * `infer` is a semantic error outside a conditional type's extends clause, so it cannot
 * survive into a type-argument position. A hole is an ordinary type, so the pattern
 * typechecks, and the compiler turns it back into `infer X`. Any inference constraint is
 * preserved as a second argument.
 */
/**
 * Whether an emitted expression binds tightly enough to sit beside an operator without
 * parentheses.
 *
 * This has to be exact rather than approximate, because both operators it guards are
 * silently wrong on a loose operand: `typeof (a | b)` is a different test, and `k in a | b`
 * parses as `(k in a) | b` since `in` binds tighter than `|`. So the emitted text is
 * parsed and the node kind inspected, rather than pattern-matched — a call or an index
 * is fine, a binary expression is not.
 */
function isSimpleOperand(s: string): boolean {
  const sf = ts.createSourceFile('op.ts', `(${s});`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const stmt = sf.statements[0]
  if (!stmt || !ts.isExpressionStatement(stmt) || sf.statements.length !== 1) return false
  if ((sf as unknown as { parseDiagnostics?: unknown[] }).parseDiagnostics?.length) return false
  let e: ts.Expression = stmt.expression
  while (ts.isParenthesizedExpression(e)) e = e.expression
  return (
    ts.isIdentifier(e) ||
    ts.isPropertyAccessExpression(e) ||
    ts.isElementAccessExpression(e) ||
    ts.isCallExpression(e)
  )
}

function holePattern(
  t: ts.TypeNode,
  sf: ts.SourceFile,
  params: Set<string> = new Set(),
  holes: Map<string, string> = new Map(),
): string {
  const transformer: ts.TransformerFactory<ts.Node> = (ctx) => (root) => {
    const visit = (n: ts.Node): ts.Node => {
      // A hole bound by an enclosing pattern is read off its marker, so in a type
      // position it is `typeof marker.hole`.
      if (
        ts.isTypeReferenceNode(n) &&
        !n.typeArguments?.length &&
        ts.isIdentifier(n.typeName) &&
        holes.has(n.typeName.text)
      ) {
        const [marker, prop] = holes.get(n.typeName.text)!.split('.')
        return ctx.factory.createTypeQueryNode(
          ctx.factory.createQualifiedName(
            ctx.factory.createIdentifier(marker!),
            ctx.factory.createIdentifier(prop!),
          ),
        )
      }
      // A ScriptType parameter is a value, so referring to it in a type position needs
      // `typeof`; a bare reference would be TS2749.
      if (
        ts.isTypeReferenceNode(n) &&
        !n.typeArguments?.length &&
        ts.isIdentifier(n.typeName) &&
        params.has(n.typeName.text)
      ) {
        return ctx.factory.createTypeQueryNode(ctx.factory.createIdentifier(n.typeName.text))
      }
      if (ts.isInferTypeNode(n)) {
        const tp = n.typeParameter
        const args: ts.TypeNode[] = [
          ctx.factory.createLiteralTypeNode(ctx.factory.createStringLiteral(tp.name.text)),
        ]
        if (tp.constraint) args.push(tp.constraint)
        return ctx.factory.createTypeReferenceNode('Hole', args)
      }
      return ts.visitEachChild(n, visit, ctx)
    }
    return ts.visitNode(root, visit) as ts.Node
  }
  const result = ts.transform(t, [transformer])
  const out = result.transformed[0] as ts.TypeNode
  const text = PRINTER.printNode(ts.EmitHint.Unspecified, out, sf)
  result.dispose()
  return text.replace(/\s*\n\s*/g, ' ').trim()
}

function unwrapParens(t: ts.TypeNode): ts.TypeNode {
  while (ts.isParenthesizedTypeNode(t)) t = t.type
  return t
}

const escapeTemplate = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')

/** Decompile every generic type alias in a source file. */
export interface NamespaceLink {
  name: string
  /** Whether the original declaration is exported. */
  exported: boolean
  /** Whether the original declaration is ambient (`declare`). */
  ambient: boolean
}

/**
 * The namespaces enclosing a declaration, outermost first.
 *
 * Export-ness is part of the answer, not decoration: appending a non-exported namespace
 * beside an exported one of the same name is TS2395, "individual declarations in merged
 * declaration must be all exported or all local", and every name inside then fails to
 * resolve. The generated block has to match.
 */
export function namespaceChain(n: ts.Node): NamespaceLink[] {
  const out: NamespaceLink[] = []
  let cur: ts.Node | undefined = n.parent
  while (cur) {
    if (ts.isModuleDeclaration(cur) && ts.isIdentifier(cur.name)) {
      const flags = ts.getCombinedModifierFlags(cur as ts.Declaration)
      out.unshift({
        name: cur.name.text,
        exported: !!(flags & ts.ModifierFlags.Export),
        ambient: !!(flags & ts.ModifierFlags.Ambient),
      })
    }
    cur = cur.parent
  }
  return out
}

export function decompileFile(
  filePath: string,
  text: string,
): { name: string; result: DecompileResult; decl: ts.TypeAliasDeclaration; ns: NamespaceLink[] }[] {
  const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const out: { name: string; result: DecompileResult; decl: ts.TypeAliasDeclaration; ns: NamespaceLink[] }[] = []
  const visit = (n: ts.Node) => {
    if (ts.isTypeAliasDeclaration(n) && (n.typeParameters?.length ?? 0) > 0) {
      out.push({ name: n.name.text, result: decompileAlias(n, sf), decl: n, ns: namespaceChain(n) })
    }
    ts.forEachChild(n, visit)
  }
  visit(sf)
  return out
}

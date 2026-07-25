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

export interface DecompileResult {
  source: string
  /** Constructs that fell back to raw(), i.e. real language gaps. */
  gaps: string[]
}

const INDENT = '  '

export function decompileAlias(decl: ts.TypeAliasDeclaration, sf: ts.SourceFile): DecompileResult {
  const gaps: string[] = []
  const d = new Decompiler(sf, gaps)
  const name = decl.name.text

  const params = (decl.typeParameters ?? []).map((tp) => {
    // Keep the original parameter name: `pascal()` preserves already-capitalised
    // names, so emitted type parameters match the reference exactly.
    const ann = tp.constraint ? `: ${tp.constraint.getText(sf)}` : ': unknown'
    const def = tp.default ? ` = ${d.expr(tp.default)}` : ''
    return `${tp.name.text}${ann}${def}`
  })

  const body = d.statements(decl.type, 1)
  const src =
    `/* @scripttype preserveParamNames */\n` +
    `export function ${name}(${params.join(', ')}) {\n` +
    body.map((l) => INDENT + l).join('\n') +
    '\n}\n'
  return { source: src, gaps }
}

class Decompiler {
  /** Statements hoisted out of the expression currently being rendered. */
  private pending: string[] = []
  private temps = 0

  constructor(
    private sf: ts.SourceFile,
    private gaps: string[],
  ) {}

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

  /** Lower a type node into a statement list ending in a `return`. */
  statements(t: ts.TypeNode, depth: number): string[] {
    t = unwrapParens(t)

    if (ts.isConditionalTypeNode(t)) {
      const { lines, value: check } = this.withHoist(() => this.expr(t.checkType))
      const pattern = patternText(t.extendsType, this.sf)
      const thenStmts = this.statements(t.trueType, depth + 1)
      const elseStmts = this.statements(t.falseType, depth)
      return [
        ...lines,
        `if (matches<${pattern}>(${check})) {`,
        ...thenStmts.map((l) => INDENT + l),
        `}`,
        ...elseStmts,
      ]
    }

    if (ts.isMappedTypeNode(t)) {
      const mapped = this.mapped(t)
      if (mapped) return [...mapped, `return out`]
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

    const domain = ts.isTypeOperatorNode(constraint) && constraint.operator === ts.SyntaxKind.KeyOfKeyword
      ? `keyof(${this.expr(constraint.type)})`
      : `keySet(${this.expr(constraint)})`

    const key = t.nameType ? this.expr(t.nameType) : param
    let value = this.expr(t.type)
    // Property modifiers become value-wrapping markers.
    if (t.questionToken) {
      value = t.questionToken.kind === ts.SyntaxKind.MinusToken ? `required(${value})` : `optional(${value})`
    }
    if (t.readonlyToken) {
      value =
        t.readonlyToken.kind === ts.SyntaxKind.MinusToken ? `mutable(${value})` : `readonlyProp(${value})`
    }
    return [
      `const ${varName} = {}`,
      `for (const ${param} in ${domain}) {`,
      `${INDENT}${varName}[${key}] = ${value}`,
      `}`,
    ]
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
        return 'undefined'
      case ts.SyntaxKind.VoidKeyword:
        return 'voidType()'
    }

    if (ts.isLiteralTypeNode(t)) {
      const l = t.literal
      if (ts.isStringLiteral(l)) return `'${l.text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
      if (ts.isNumericLiteral(l)) return l.text
      if (l.kind === ts.SyntaxKind.TrueKeyword) return 'true'
      if (l.kind === ts.SyntaxKind.FalseKeyword) return 'false'
      if (l.kind === ts.SyntaxKind.NullKeyword) return 'null'
      if (ts.isPrefixUnaryExpression(l)) return l.getText(this.sf)
      return this.gap(t, `literal type ${ts.SyntaxKind[l.kind]}`)
    }

    if (ts.isTypeReferenceNode(t)) {
      const name = t.typeName.getText(this.sf)
      const args = t.typeArguments ?? []
      if (!args.length) return name
      return `${name}(${args.map((a) => this.expr(a)).join(', ')})`
    }

    if (ts.isUnionTypeNode(t)) return t.types.map((x) => this.wrap(x)).join(' | ')
    if (ts.isIntersectionTypeNode(t)) return t.types.map((x) => this.wrap(x)).join(' & ')

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
        if (ts.isOptionalTypeNode(el)) return this.gap(el, 'optional tuple element')
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
          return this.gap(t, 'index signature')
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
      const pattern = patternText(t.extendsType, this.sf)
      return `matches<${pattern}>(${check}) ? ${this.wrap(t.trueType)} : ${this.wrap(t.falseType)}`
    }

    if (ts.isFunctionTypeNode(t)) {
      // Generic function types (the `<T>() => ...` variance trick) have no spelling yet.
      if (t.typeParameters?.length) return this.gap(t, 'generic function type')
      const params = t.parameters.map((p) => (p.type ? this.expr(p.type) : 'unknown'))
      return `fnType([${params.join(', ')}], ${this.expr(t.type)})`
    }

    if (ts.isMappedTypeNode(t)) {
      const name = `m${++this.temps}`
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
 * Pattern text for a `matches<...>` type argument.
 *
 * Printing (rather than copying source text) is load-bearing: real type-level code
 * carries `//` line comments inside its extends clauses, and collapsing such text to
 * one line would let the comment swallow the rest of the pattern.
 */
function patternText(t: ts.TypeNode, sf: ts.SourceFile): string {
  try {
    return PRINTER.printNode(ts.EmitHint.Unspecified, t, sf).replace(/\s*\n\s*/g, ' ').trim()
  } catch {
    return t.getText(sf).replace(/\/\/[^\n]*/g, '').replace(/\s*\n\s*/g, ' ').trim()
  }
}

function unwrapParens(t: ts.TypeNode): ts.TypeNode {
  while (ts.isParenthesizedTypeNode(t)) t = t.type
  return t
}

const escapeTemplate = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')

/** Decompile every generic type alias in a source file. */
export function decompileFile(
  filePath: string,
  text: string,
): { name: string; result: DecompileResult; decl: ts.TypeAliasDeclaration }[] {
  const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const out: { name: string; result: DecompileResult; decl: ts.TypeAliasDeclaration }[] = []
  const visit = (n: ts.Node) => {
    if (ts.isTypeAliasDeclaration(n) && (n.typeParameters?.length ?? 0) > 0) {
      out.push({ name: n.name.text, result: decompileAlias(n, sf), decl: n })
    }
    ts.forEachChild(n, visit)
  }
  visit(sf)
  return out
}

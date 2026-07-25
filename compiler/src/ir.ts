/**
 * ScriptType intermediate representation: the *output* side of the compiler.
 *
 * A TypeExpr is a TypeScript type-level expression tree. The lowering pass turns
 * imperative statements into one of these; the emitter turns it into source text.
 */

export type TypeExpr =
  | { kind: 'ref'; name: string; args?: TypeExpr[] }
  | { kind: 'lit'; value: string | number | boolean; str?: boolean }
  | { kind: 'keyword'; name: string }
  | { kind: 'union'; members: TypeExpr[] }
  | { kind: 'intersection'; members: TypeExpr[] }
  | { kind: 'tuple'; elements: TupleElement[] }
  | { kind: 'array'; element: TypeExpr; readonly?: boolean }
  | { kind: 'object'; props: PropSig[]; index?: { key: TypeExpr; value: TypeExpr } }
  | { kind: 'template'; quasis: string[]; exprs: TypeExpr[] }
  | { kind: 'indexed'; obj: TypeExpr; index: TypeExpr }
  | { kind: 'conditional'; check: TypeExpr; ext: TypeExpr; then: TypeExpr; else: TypeExpr }
  | { kind: 'infer'; name: string; constraint?: TypeExpr }
  | { kind: 'mapped'; param: string; constraint: TypeExpr; value: TypeExpr; as?: TypeExpr; optional?: '+' | '-' | true; readonly?: '+' | '-' | true }
  | { kind: 'op'; op: 'keyof' | 'typeof' | 'readonly'; target: TypeExpr }
  | { kind: 'paren'; inner: TypeExpr }
  /** `hasRest` marks the final parameter as a rest parameter: `(...a0: T) => R`. */
  | { kind: 'fn'; params: TypeExpr[]; ret: TypeExpr; typeParams?: string[]; isCtor?: boolean; hasRest?: boolean }
  | { kind: 'raw'; text: string }

export interface TupleElement {
  expr: TypeExpr
  spread?: boolean
  optional?: boolean
  name?: string
}

export interface PropSig {
  name: string
  value: TypeExpr
  optional?: boolean
  readonly?: boolean
  computed?: boolean
}

/** A generated or user-facing type alias declaration. */
export interface TypeAlias {
  name: string
  params: TypeParam[]
  body: TypeExpr
  exported: boolean
  /** Generated helpers carry the source function they came from, for diagnostics. */
  generatedFrom?: string
  doc?: string
}

export interface TypeParam {
  name: string
  constraint?: TypeExpr
  default?: TypeExpr
  variance?: 'in' | 'out' | 'in out'
  isConst?: boolean
}

// ---------------------------------------------------------------------------
// Constructors
// ---------------------------------------------------------------------------

export const ref = (name: string, args?: TypeExpr[]): TypeExpr =>
  args && args.length ? { kind: 'ref', name, args } : { kind: 'ref', name }
export const kw = (name: string): TypeExpr => ({ kind: 'keyword', name })
export const str = (value: string): TypeExpr => ({ kind: 'lit', value, str: true })
export const num = (value: number): TypeExpr => ({ kind: 'lit', value })
export const bool = (value: boolean): TypeExpr => ({ kind: 'lit', value })
export const NEVER = kw('never')
export const UNKNOWN = kw('unknown')

export const tuple = (elements: TupleElement[]): TypeExpr => ({ kind: 'tuple', elements })
export const infer = (name: string, constraint?: TypeExpr): TypeExpr =>
  constraint ? { kind: 'infer', name, constraint } : { kind: 'infer', name }
export const indexed = (obj: TypeExpr, index: TypeExpr): TypeExpr => ({ kind: 'indexed', obj, index })
export const raw = (text: string): TypeExpr => ({ kind: 'raw', text })

export const cond = (check: TypeExpr, ext: TypeExpr, then: TypeExpr, els: TypeExpr): TypeExpr => ({
  kind: 'conditional',
  check,
  ext,
  then,
  else: els,
})

export function union(members: TypeExpr[]): TypeExpr {
  const flat: TypeExpr[] = []
  for (const m of members) {
    if (m.kind === 'union') flat.push(...m.members)
    else if (m.kind === 'keyword' && m.name === 'never') continue // never is the union identity
    else flat.push(m)
  }
  if (flat.length === 0) return NEVER
  if (flat.length === 1) return flat[0]!
  // Deduplicate structurally identical members.
  const seen = new Map<string, TypeExpr>()
  for (const m of flat) seen.set(emit(m), m)
  const uniq = [...seen.values()]
  return uniq.length === 1 ? uniq[0]! : { kind: 'union', members: uniq }
}

export function intersection(members: TypeExpr[]): TypeExpr {
  const flat: TypeExpr[] = []
  for (const m of members) {
    if (m.kind === 'intersection') flat.push(...m.members)
    else flat.push(m)
  }
  if (flat.length === 0) return UNKNOWN
  return flat.length === 1 ? flat[0]! : { kind: 'intersection', members: flat }
}

/**
 * Build a template literal type, folding adjacent literal parts.
 * `${'a'}${'b'}c` collapses to the string literal `'abc'`.
 */
export function template(quasis: string[], exprs: TypeExpr[]): TypeExpr {
  const q: string[] = [quasis[0] ?? '']
  const e: TypeExpr[] = []
  for (let i = 0; i < exprs.length; i++) {
    const x = exprs[i]!
    const next = quasis[i + 1] ?? ''
    if (x.kind === 'lit' && x.str) {
      q[q.length - 1] += String(x.value) + next
    } else if (x.kind === 'template') {
      // Splice a nested template inline.
      q[q.length - 1] += x.quasis[0] ?? ''
      for (let j = 0; j < x.exprs.length; j++) {
        e.push(x.exprs[j]!)
        q.push(x.quasis[j + 1] ?? '')
      }
      q[q.length - 1] += next
    } else {
      e.push(x)
      q.push(next)
    }
  }
  if (e.length === 0) return str(q[0]!)
  return { kind: 'template', quasis: q, exprs: e }
}

// ---------------------------------------------------------------------------
// Emitter
// ---------------------------------------------------------------------------

// Precedence: higher binds tighter.
export const P_COND = 1
export const P_UNION = 2
export const P_INTER = 3
export const P_PREFIX = 4
export const P_POSTFIX = 5
export const P_ATOM = 6

/** Binding strength of a type expression, so the printer can parenthesise. */
export function precedenceOf(e: TypeExpr): number {
  switch (e.kind) {
    case 'conditional':
    case 'fn':
      return P_COND
    case 'union':
      return P_UNION
    case 'intersection':
      return P_INTER
    case 'op':
      return P_PREFIX
    case 'infer':
      return e.constraint ? P_COND : P_PREFIX
    case 'indexed':
    case 'array':
      return P_POSTFIX
    default:
      return P_ATOM
  }
}

const quote = (s: string) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

/** Escape a literal chunk for inclusion in a template literal type. */
const escapeQuasi = (s: string) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')

const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/

/**
 * One parameter of a function type. Parameter names are synthesised (`a0`, `a1`) —
 * a type-level function type has no meaningful names — and only the final one may be
 * a rest parameter.
 */
export function emitFnParam(
  fn: Extract<TypeExpr, { kind: 'fn' }>,
  p: TypeExpr,
  i: number,
): string {
  const rest = fn.hasRest && i === fn.params.length - 1 ? '...' : ''
  return `${rest}a${i}: ${emit(p)}`
}

export function emit(e: TypeExpr, minPrec = 0): string {
  const text = emitInner(e)
  return precedenceOf(e) < minPrec ? `(${text})` : text
}

function emitInner(e: TypeExpr): string {
  switch (e.kind) {
    case 'ref':
      return e.args?.length ? `${e.name}<${e.args.map((a) => emit(a)).join(', ')}>` : e.name
    case 'keyword':
      return e.name
    case 'lit':
      return e.str ? quote(String(e.value)) : String(e.value)
    case 'union':
      return e.members.map((m) => emit(m, P_UNION + 1)).join(' | ')
    case 'intersection':
      return e.members.map((m) => emit(m, P_INTER + 1)).join(' & ')
    case 'tuple': {
      const parts = e.elements.map((el) => {
        // Spread needs an array-ish operand, so bind tighter than union/intersection.
        // An `infer X` is exempt, constrained or not: the tuple's `,` or `]` already
        // terminates the constraint, so `...infer T extends string[]` parses, and the
        // parentheses would only be noise.
        const inner = emit(el.expr, el.spread && el.expr.kind !== 'infer' ? P_PREFIX : 0)
        const named = el.name ? `${el.name}${el.optional ? '?' : ''}: ` : ''
        if (el.spread) return `...${named}${inner}`
        return `${named}${inner}${el.optional && !el.name ? '?' : ''}`
      })
      return `[${parts.join(', ')}]`
    }
    case 'array': {
      const inner = emit(e.element, P_POSTFIX)
      return `${e.readonly ? 'readonly ' : ''}${inner}[]`
    }
    case 'object': {
      const props = e.props.map((p) => {
        const key = p.computed || IDENT_RE.test(p.name) ? p.name : quote(p.name)
        return `${p.readonly ? 'readonly ' : ''}${key}${p.optional ? '?' : ''}: ${emit(p.value)}`
      })
      if (e.index) props.unshift(`[key: ${emit(e.index.key)}]: ${emit(e.index.value)}`)
      return props.length ? `{ ${props.join('; ')} }` : '{}'
    }
    case 'template': {
      let out = '`' + escapeQuasi(e.quasis[0] ?? '')
      for (let i = 0; i < e.exprs.length; i++) {
        out += '${' + emit(e.exprs[i]!) + '}' + escapeQuasi(e.quasis[i + 1] ?? '')
      }
      return out + '`'
    }
    case 'indexed':
      return `${emit(e.obj, P_POSTFIX)}[${emit(e.index)}]`
    case 'conditional':
      return `${emit(e.check, P_COND + 1)} extends ${emit(e.ext, P_COND + 1)} ? ${emit(e.then)} : ${emit(e.else)}`
    case 'infer':
      return e.constraint ? `infer ${e.name} extends ${emit(e.constraint, P_COND + 1)}` : `infer ${e.name}`
    case 'mapped': {
      const ro = e.readonly === true ? 'readonly ' : e.readonly === '+' ? '+readonly ' : e.readonly === '-' ? '-readonly ' : ''
      const opt = e.optional === true ? '?' : e.optional === '+' ? '+?' : e.optional === '-' ? '-?' : ''
      const as = e.as ? ` as ${emit(e.as)}` : ''
      return `{ ${ro}[${e.param} in ${emit(e.constraint)}${as}]${opt}: ${emit(e.value)} }`
    }
    case 'op':
      return `${e.op} ${emit(e.target, P_PREFIX + 1)}`
    case 'paren':
      return `(${emit(e.inner)})`
    case 'fn': {
      const tp = e.typeParams?.length ? `<${e.typeParams.join(', ')}>` : ''
      const args = e.params.map((p, i) => emitFnParam(e, p, i)).join(', ')
      return `${e.isCtor ? 'new ' : ''}${tp}(${args}) => ${emit(e.ret)}`
    }
    case 'raw':
      return e.text
  }
}

export function emitAlias(a: TypeAlias): string {
  const params = a.params.length
    ? `<${a.params
        .map((p) => {
          const v = p.variance ? `${p.variance} ` : ''
          const c = p.isConst ? 'const ' : ''
          const con = p.constraint ? ` extends ${emit(p.constraint)}` : ''
          const def = p.default ? ` = ${emit(p.default)}` : ''
          return `${c}${v}${p.name}${con}${def}`
        })
        .join(', ')}>`
    : ''
  const doc = a.doc ? `/**\n * ${a.doc.split('\n').join('\n * ')}\n */\n` : ''
  return `${doc}${a.exported ? 'export ' : ''}type ${a.name}${params} = ${emit(a.body)}`
}

/** Rewrite every `ref` node matching `name` using `fn`. Used by the inliner. */
export function mapExpr(e: TypeExpr, fn: (e: TypeExpr) => TypeExpr | undefined): TypeExpr {
  const replaced = fn(e)
  if (replaced) return replaced
  const rec = (x: TypeExpr) => mapExpr(x, fn)
  switch (e.kind) {
    case 'ref':
      return e.args ? { ...e, args: e.args.map(rec) } : e
    case 'union':
      return { ...e, members: e.members.map(rec) }
    case 'intersection':
      return { ...e, members: e.members.map(rec) }
    case 'tuple':
      return { ...e, elements: e.elements.map((el) => ({ ...el, expr: rec(el.expr) })) }
    case 'array':
      return { ...e, element: rec(e.element) }
    case 'object':
      return {
        ...e,
        props: e.props.map((p) => ({ ...p, value: rec(p.value) })),
        index: e.index ? { key: rec(e.index.key), value: rec(e.index.value) } : undefined,
      }
    case 'template':
      return { ...e, exprs: e.exprs.map(rec) }
    case 'indexed':
      return { ...e, obj: rec(e.obj), index: rec(e.index) }
    case 'conditional':
      return { ...e, check: rec(e.check), ext: rec(e.ext), then: rec(e.then), else: rec(e.else) }
    case 'infer':
      return e.constraint ? { ...e, constraint: rec(e.constraint) } : e
    case 'mapped':
      return { ...e, constraint: rec(e.constraint), value: rec(e.value), as: e.as ? rec(e.as) : undefined }
    case 'op':
      return { ...e, target: rec(e.target) }
    case 'fn':
      return { ...e, params: e.params.map(rec), ret: rec(e.ret) }
    case 'paren':
      return { ...e, inner: rec(e.inner) }
    default:
      return e
  }
}

/** Substitute type-parameter references by name. */
export function substitute(e: TypeExpr, subs: Map<string, TypeExpr>): TypeExpr {
  return mapExpr(e, (x) => (x.kind === 'ref' && !x.args && subs.has(x.name) ? subs.get(x.name)! : undefined))
}

export function countRefs(e: TypeExpr, name: string): number {
  let n = 0
  mapExpr(e, (x) => {
    if (x.kind === 'ref' && x.name === name) n++
    return undefined
  })
  return n
}

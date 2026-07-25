import { describe, expect, it } from 'vitest'
import { compile, compileAll, CompileError } from '../src/compile.js'

/**
 * Compile for a *lowering* assertion.
 *
 * Wrapping is disabled so these tests read as one line each and stay insensitive to
 * layout changes; the line-breaking rules have their own tests in format.test.ts.
 */
const c = (src: string) =>
  compile(src, { includePrelude: false, width: Infinity }).code.trim()

describe('expressions', () => {
  it('lowers a trivial return', () => {
    expect(c(`export function Id(t: unknown) { return t }`)).toBe(`export type Id<T> = T`)
  })

  it('lowers unions, intersections and tuples', () => {
    expect(c(`export function U(a: unknown, b: unknown) { return a | b }`)).toBe(
      `export type U<A, B> = A | B`,
    )
    expect(c(`export function I(a: unknown, b: unknown) { return a & b }`)).toBe(
      `export type I<A, B> = A & B`,
    )
    expect(c(`export function T(a: unknown) { return [a, 'x'] }`)).toBe(`export type T<A> = [A, 'x']`)
  })

  it('lowers template literals and constrains parameters', () => {
    expect(c(`export function Greet(name: string) { return \`hi \${name}\` }`)).toBe(
      'export type Greet<Name extends string> = `hi ${Name}`',
    )
  })

  it('folds literal-only templates into a string literal', () => {
    expect(c(`export function K() { return \`a\${'b'}c\` }`)).toBe(`export type K = 'abc'`)
  })

  it('lowers indexed access and property access', () => {
    expect(c(`export function G(o: unknown, k: string) { return o[k] }`)).toBe(
      `export type G<O, K extends string> = O[K]`,
    )
    expect(c(`export function L(t: unknown[]) { return t.length }`)).toBe(
      `export type L<T extends unknown[]> = T['length']`,
    )
  })
})

describe('const bindings', () => {
  it('inlines a single-use binding', () => {
    const src = `export function F(s: string) {
      const u = upper(s)
      return u
    }`
    expect(c(src)).toBe(`export type F<S extends string> = Uppercase<S>`)
  })

  it('emits a let-binding when the value is used twice', () => {
    const src = `export function F(s: string) {
      const u = upper(s)
      return [u, u]
    }`
    expect(c(src)).toBe(`export type F<S extends string> = Uppercase<S> extends infer U ? [U, U] : never`)
  })

  it('honours @bind to force a let-binding', () => {
    const src = `export function F(s: string) {
      /* @bind */ const u = upper(s)
      return u
    }`
    expect(c(src)).toBe(`export type F<S extends string> = Uppercase<S> extends infer U ? U : never`)
  })
})

describe('conditionals', () => {
  it('lowers if/else to a conditional type', () => {
    const src = `export function IsStr(t: unknown) {
      if (extendsType<string>(t)) { return true }
      return false
    }`
    expect(c(src)).toBe(`export type IsStr<T> = T extends string ? true : false`)
  })

  it('lowers early return chains to nested conditionals', () => {
    const src = `export function Kind(t: unknown) {
      if (extendsType<string>(t)) return 'str'
      if (extendsType<number>(t)) return 'num'
      return 'other'
    }`
    expect(c(src)).toBe(
      `export type Kind<T> = T extends string ? 'str' : T extends number ? 'num' : 'other'`,
    )
  })

  it('negates with !', () => {
    const src = `export function NotStr(t: unknown) {
      if (!extendsType<string>(t)) return true
      return false
    }`
    expect(c(src)).toBe(`export type NotStr<T> = T extends string ? false : true`)
  })

  it('lowers && by nesting', () => {
    const src = `export function Both(a: unknown, b: unknown) {
      if (extendsType<string>(a) && extendsType<number>(b)) return true
      return false
    }`
    expect(c(src)).toBe(
      `export type Both<A, B> = A extends string ? B extends number ? true : false : false`,
    )
  })

  it('lowers || by nesting on the false branch', () => {
    const src = `export function Either(a: unknown, b: unknown) {
      if (extendsType<string>(a) || extendsType<number>(b)) return true
      return false
    }`
    expect(c(src)).toBe(
      `export type Either<A, B> = A extends string ? true : B extends number ? true : false`,
    )
  })

  it('lowers isNever using the tuple-wrap trick', () => {
    const src = `export function IsNever(t: unknown) {
      if (isNever(t)) return true
      return false
    }`
    expect(c(src)).toBe(`export type IsNever<T> = [T] extends [never] ? true : false`)
  })

  it('lowers a ternary expression', () => {
    const src = `export function Pick2(t: unknown) {
      return extendsType<string>(t) ? 'yes' : 'no'
    }`
    expect(c(src)).toBe(`export type Pick2<T> = T extends string ? 'yes' : 'no'`)
  })
})

describe('destructuring', () => {
  it('lowers tuple destructuring to infer patterns, pruning unread bindings', () => {
    const src = `export function Head(t: unknown[]) {
      const [h, ...rest] = t
      return h
    }`
    // `rest` is never read, so it becomes a wildcard rather than a dead `infer`. The
    // wildcard is `any`: an `infer` matched anything, and `unknown` would fail wherever
    // the surrounding type imposes a constraint.
    expect(c(src)).toBe(
      `export type Head<T extends unknown[]> = T extends [infer H, ...any[]] ? H : never`,
    )
  })

  it('keeps infer bindings that are actually read', () => {
    const src = `export function Swap(t: unknown[]) {
      const [a, b] = t
      return [b, a]
    }`
    expect(c(src)).toBe(
      `export type Swap<T extends unknown[]> = T extends [infer A, infer B] ? [B, A] : never`,
    )
  })

  it('lowers splitOnce to a template literal infer', () => {
    const src = `export function Before(s: string) {
      const [l, r] = splitOnce(s, '/')
      return l
    }`
    expect(c(src)).toBe('export type Before<S extends string> = S extends `${infer L}/${string}` ? L : never')
  })
})

describe('optimizer', () => {
  it('fuses a guard with a following destructure of the same shape', () => {
    const src = `export function Alias(se: string) {
      if (includes(se, ' as ')) {
        const [, a] = splitOnce(se, ' as ')
        return a
      }
      return se
    }`
    // One conditional, not a redundant guard test wrapping the destructure.
    expect(c(src)).toBe(
      'export type Alias<Se extends string> = Se extends `${string} as ${infer A}` ? A : Se',
    )
  })

  it('fuses inside a while loop, producing a tail-recursive helper', () => {
    const src = `export function Split(input: string, sep: string) {
      const out: string[] = []
      let rest = input
      while (includes(rest, sep)) {
        const [head, tail] = splitOnce(rest, sep)
        out.push(head)
        rest = tail
      }
      out.push(rest)
      return out
    }`
    const code = c(src)
    expect(code).toContain('export type Split<Input extends string, Sep extends string> = Split__loop<Input, [], Sep>')
    expect(code).toContain(
      'type Split__loop<Rest extends string, Out extends string[], Sep extends string> = ' +
        'Rest extends `${infer Head}${Sep}${infer Tail}` ? Split__loop<Tail, [...Out, Head], Sep> : [...Out, Rest]',
    )
  })

  it('lowers object destructuring to indexed access', () => {
    const src = `export function Name(o: unknown) {
      const { name } = o
      return name
    }`
    expect(c(src)).toBe(`export type Name<O> = O['name']`)
  })
})

describe('recursion', () => {
  it('supports direct self-recursion', () => {
    const src = `export function Flat(t: unknown): unknown {
      if (extendsType<unknown[]>(t)) {
        const [h, ...rest] = t
        return [h, ...Flat(rest)]
      }
      return t
    }`
    expect(c(src)).toBe(
      `export type Flat<T> = T extends unknown[] ? T extends [infer H, ...infer Rest] ? [H, ...Flat<Rest>] : never : T`,
    )
  })
})

describe('switch', () => {
  it('lowers switch to nested conditionals with default as the tail', () => {
    const src = `export function Tag(t: unknown) {
      switch (t) {
        case 'a': return 1
        case 'b': return 2
        default: return 0
      }
    }`
    expect(c(src)).toBe(`export type Tag<T> = T extends 'a' ? 1 : T extends 'b' ? 2 : 0`)
  })
})

/**
 * The spellings a JavaScript programmer reaches for without being taught anything.
 * Each of these used to be a compile error, which is the wrong answer for a language
 * whose pitch is "write it the way you already write JavaScript".
 */
describe('JavaScript idioms', () => {
  it('narrows with typeof', () => {
    const src = `export function F(a) { if (typeof a === 'string') { return 1 }; return 0 }`
    expect(c(src)).toBe(`export type F<A> = A extends string ? 1 : 0`)
  })

  it('accepts typeof in either operand order, and negated', () => {
    expect(c(`export function F(a) { if ('number' === typeof a) { return 1 }; return 0 }`)).toBe(
      `export type F<A> = A extends number ? 1 : 0`,
    )
    expect(c(`export function F(a) { if (typeof a !== 'string') { return 1 }; return 0 }`)).toBe(
      `export type F<A> = A extends string ? 0 : 1`,
    )
  })

  it('maps every typeof tag, including function', () => {
    // The rest parameter is load-bearing: `(a0: any[]) => any` accepts only a single
    // array argument, so `(x: string) => void` would not match it.
    expect(c(`export function F(a) { if (typeof a === 'function') { return 1 }; return 0 }`)).toBe(
      `export type F<A> = A extends ((...a0: any[]) => any) ? 1 : 0`,
    )
    expect(c(`export function F(a) { if (typeof a === 'bigint') { return 1 }; return 0 }`)).toBe(
      `export type F<A> = A extends bigint ? 1 : 0`,
    )
  })

  it('rejects a typeof tag that cannot exist, and lists the real ones', () => {
    let err: CompileError | undefined
    try {
      c(`export function F(a) { if (typeof a === 'array') { return 1 }; return 0 }`)
    } catch (e) {
      err = e as CompileError
    }
    expect(err?.message).toMatch(/'array' is not a value `typeof` can produce/)
    expect(err?.help).toMatch(/string, number, boolean/)
  })

  it('lowers `in` to a keyof test', () => {
    expect(c(`export function F(o) { if ('a' in o) { return 1 }; return 0 }`)).toBe(
      `export type F<O> = 'a' extends keyof O ? 1 : 0`,
    )
  })

  it('lowers Array.isArray to an array extends check', () => {
    expect(c(`export function F(a) { if (Array.isArray(a)) { return 1 }; return 0 }`)).toBe(
      `export type F<A> = A extends any[] ? 1 : 0`,
    )
  })

  it('ignores a stray semicolon', () => {
    // `if (…) { … };` is valid JavaScript, and rejecting it was a gratuitous
    // difference from the language ScriptType is spelled in.
    expect(c(`export function F(a: string) { if (a === 'x') { return 1 }; return 0 }`)).toBe(
      `export type F<A extends string> = A extends 'x' ? 1 : 0`,
    )
  })

  it('explains why numeric comparison cannot work', () => {
    let err: CompileError | undefined
    try {
      c(`export function F(a: number, b: number) { if (a < b) { return 1 } return 0 }`)
    } catch (e) {
      err = e as CompileError
    }
    expect(err?.message).toMatch(/`<` has no type-level meaning/)
    expect(err?.help).toMatch(/cannot compare numbers/)
  })
})

describe('error recovery', () => {
  it('reports every broken function, not just the first', () => {
    // Fix-and-rerun once per error is the single most tiring thing a compiler can do.
    const { errors, result } = compileAll(
      `export function A(t: string) { console.log(t); return t }
       export function B(t: string) { let x = 1; x *= 2; return x }
       export function Fine(t: string) { return t }
       export function D(xs: any[]) { for (const [a] of xs) { return a } return never }`,
      { includePrelude: false },
    )
    expect(errors.map((e) => e.code)).toEqual(['ST1102', 'ST1101', 'ST1301'])
    // The functions that did compile are still available, so a partial build is
    // inspectable rather than discarded.
    expect(result?.code).toContain('export type Fine<T extends string> = T')
  })

  it('reports nothing for a clean file', () => {
    const { errors, result } = compileAll(`export function F(t: string) { return t }`, {
      includePrelude: false,
    })
    expect(errors).toEqual([])
    expect(result?.code.trim()).toBe('export type F<T extends string> = T')
  })

  it('stops at a syntax error, because nothing after it can be trusted', () => {
    const { errors, result } = compileAll(`export function Oops( {`, { includePrelude: false })
    expect(errors.map((e) => e.code)).toEqual(['ST1001'])
    expect(result).toBeUndefined()
  })
})

describe('errors', () => {
  /** Compile, expecting failure, and return the CompileError for inspection. */
  const fails = (src: string): CompileError => {
    try {
      c(src)
    } catch (e) {
      if (e instanceof CompileError) return e
      throw e
    }
    throw new Error('expected a CompileError, but compilation succeeded')
  }

  it('rejects a non-returning path', () => {
    const e = fails(`export function Bad(t: unknown) {
      if (extendsType<string>(t)) { return 1 }
    }`)
    expect(e.message).toMatch(/does not return/)
    expect(e.code).toBe('ST1003')
  })

  it('rejects invalid TypeScript syntax', () => {
    const e = fails(`export function Oops( {`)
    expect(e.code).toBe('ST1001')
  })

  // Diagnostics are the product surface, so the properties that make them useful —
  // a stable code, a span to underline, and a fix hint — are asserted, not the prose.
  it('reports a runtime global as such, with a fix', () => {
    const e = fails(`export function F(t: string) {
      console.log(t)
      return t
    }`)
    expect(e.code).toBe('ST1102')
    expect(e.help).toMatch(/delete the statement/)
    expect(e.node).toBeDefined()
  })

  it('suggests the long form for compound assignment', () => {
    const e = fails(`export function F(t: string) {
      let x = 1
      x += 2
      return x
    }`)
    expect(e.code).toBe('ST1101')
    expect(e.help).toBe('Write it out: `x = x + 2`.')
  })

  it('suggests a near-miss builtin name', () => {
    const e = fails(`export function F(t: string) {
      let acc = t
      accum.push(t)
      return acc
    }`)
    expect(e.code).toBe('ST1102')
    expect(e.help).toMatch(/Did you mean `acc`\?/)
  })

  it('names the construct that has no lowering', () => {
    const e = fails(`export function F(t: string) {
      try { return t } catch { return t }
    }`)
    expect(e.code).toBe('ST1100')
    expect(e.message).toMatch(/`try`\/`catch` has no type-level meaning/)
  })

  it('carries a span that points at the offending token', () => {
    const src = `export function F(t: string) {\n  console.log(t)\n  return t\n}`
    const e = fails(src)
    const sf = e.node!.getSourceFile()
    const { line, character } = sf.getLineAndCharacterOfPosition(e.node!.getStart(sf))
    expect([line, character]).toEqual([1, 2])
  })
})

describe('mapped types', () => {
  it('lowers for-in over an object to a mapped type', () => {
    const src = `export function Nullable(t: unknown) {
      const out = {}
      for (const p in t) { out[p] = t[p] | null }
      return out
    }`
    expect(c(src)).toBe(`export type Nullable<T> = { [P in keyof T]: T[P] | null }`)
  })

  it('treats keySet() as an already-key-union domain', () => {
    const src = `export function Rec(K: keyof any, T: unknown) {
      const out = {}
      for (const p in keySet(K)) { out[p] = T }
      return out
    }`
    expect(c(src)).toBe(`export type Rec<K extends keyof any, T> = { [P in K]: T }`)
  })

  it('emits an as clause for a remapped key', () => {
    const src = `export function Shout(t: unknown) {
      const out = {}
      for (const k in t) { out[upper(k)] = t[k] }
      return out
    }`
    expect(c(src)).toBe(`export type Shout<T> = { [K in keyof T as Uppercase<K>]: T[K] }`)
  })

  it('supports property modifier markers', () => {
    const opt = `export function Opt(t: unknown) {
      const out = {}
      for (const k in t) { out[k] = optional(t[k]) }
      return out
    }`
    expect(c(opt)).toBe(`export type Opt<T> = { [K in keyof T]?: T[K] }`)

    const ro = `export function Ro(t: unknown) {
      const out = {}
      for (const k in t) { out[k] = readonlyProp(t[k]) }
      return out
    }`
    expect(c(ro)).toBe(`export type Ro<T> = { readonly [K in keyof T]: T[K] }`)

    const req = `export function Req(t: unknown) {
      const out = {}
      for (const k in t) { out[k] = required(t[k]) }
      return out
    }`
    expect(c(req)).toBe(`export type Req<T> = { [K in keyof T]-?: T[K] }`)
  })
})

describe('matches() general pattern primitive', () => {
  it('binds infer names from an arbitrary pattern', () => {
    const src = `export function Elem(t: unknown) {
      if (matches<ReadonlyArray<infer I>>(t)) { return I }
      return never
    }`
    expect(c(src)).toBe(`export type Elem<T> = T extends ReadonlyArray<infer I> ? I : never`)
  })

  it('supports patterns with no bindings', () => {
    const src = `export function IsFn(t: unknown) {
      if (matches<string>(t)) return 1
      return 2
    }`
    expect(c(src)).toBe(`export type IsFn<T> = T extends string ? 1 : 2`)
  })

  it('binds several names and prunes the unread ones', () => {
    const src = `export function Second(t: unknown) {
      if (matches<[infer A, infer B]>(t)) { return B }
      return never
    }`
    expect(c(src)).toBe(`export type Second<T> = T extends [any, infer B] ? B : never`)
  })
})

describe('for-of loops', () => {
  it('lowers for-of to a recursive helper consuming the list', () => {
    const src = `export function Uppers(items: string[]) {
      const out: string[] = []
      for (const item of items) { out.push(upper(item)) }
      return out
    }`
    const code = c(src)
    expect(code).toContain('export type Uppers<Items extends string[]> = Uppers__loop<Items, []>')
    // The element constraint is carried in from `Items extends string[]`, so the
    // peeled `Item` is a string rather than unknown.
    expect(code).toContain('Rest extends [infer Item extends string, ...infer Tail extends string[]] ? Uppers__loop<Tail, [...Out, Uppercase<Item>]> : Out')
  })
})

describe('orElse fallback', () => {
  it('uses the fallback when a destructuring pattern fails', () => {
    const src = `export function Tail(it: unknown[]) {
      const [, ...rest] = orElse(it, [])
      return rest
    }`
    expect(c(src)).toBe(`export type Tail<It extends unknown[]> = It extends [any, ...infer Rest] ? Rest : []`)
  })
})

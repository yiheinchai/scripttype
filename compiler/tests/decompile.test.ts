/**
 * Decompiler readability, checked by round trip.
 *
 * Every case asserts two things: that the ScriptType reads the way a JavaScript
 * programmer would write it, and that recompiling reproduces the original type. The
 * second matters as much as the first — a nicer spelling that changes the meaning is
 * worse than the verbose one.
 */
import { describe, expect, it } from 'vitest'
import ts from 'typescript'
import { decompileAlias } from '../src/decompile.js'
import { compile } from '../src/compile.js'

/** Decompile the first type alias in `src`. */
function decompile(src: string): string {
  const sf = ts.createSourceFile('t.ts', src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const decl = sf.statements.find(ts.isTypeAliasDeclaration)
  if (!decl) throw new Error('no type alias in source')
  return decompileAlias(decl, sf).source.trim()
}

/** Decompile, then recompile, and return the TypeScript that comes back. */
function roundTrip(src: string): string {
  return compile(decompile(src), { includePrelude: false, width: Infinity }).code.trim()
}

// The decompiler always emits an exported function, so the recompiled alias is exported
// whether or not the original was; that difference is not what these tests are about.
const normalise = (s: string) =>
  s.replace(/\s+/g, ' ').replace(/;$/, '').replace(/^export /, '').trim()

describe('natural narrowing forms', () => {
  it('decompiles a keyword check to typeof', () => {
    const original = 'type IsStr<T> = T extends string ? 1 : 0'
    expect(decompile(original)).toContain("typeof T === 'string'")
    expect(normalise(roundTrip(original))).toBe(normalise(original))
  })

  it('covers every typeof-able keyword', () => {
    for (const [kw, tag] of [
      ['number', 'number'],
      ['boolean', 'boolean'],
      ['bigint', 'bigint'],
      ['symbol', 'symbol'],
    ]) {
      const original = `type F<T> = T extends ${kw} ? 1 : 0`
      expect(decompile(original), kw).toContain(`typeof T === '${tag}'`)
      expect(normalise(roundTrip(original)), kw).toBe(normalise(original))
    }
  })

  it('decompiles an any[] check to Array.isArray', () => {
    const original = 'type IsArr<T> = T extends any[] ? 1 : 0'
    expect(decompile(original)).toContain('Array.isArray(T)')
    expect(normalise(roundTrip(original))).toBe(normalise(original))
  })

  it('leaves a typed array alone, whose test is not the same as isArray', () => {
    // `T extends string[]` is stricter than `Array.isArray(t)`, so mapping it would
    // silently widen the check.
    expect(decompile('type F<T> = T extends string[] ? 1 : 0')).toContain('matches<')
  })

  it('decompiles a keyof check to `in`', () => {
    const original = "type Has<O> = 'a' extends keyof O ? 1 : 0"
    expect(decompile(original)).toContain("'a' in O")
    expect(normalise(roundTrip(original))).toBe(normalise(original))
  })

  it('keeps matches<> when the operand is not simple', () => {
    // `typeof (A | B) === 'string'` would be a different test, so a compound operand
    // must not take the natural form.
    const out = decompile('type F<A, B> = (A | B) extends string ? 1 : 0')
    expect(out).toContain('matches<')
    expect(out).not.toContain('typeof')
  })

  it('parenthesises a negated natural guard in a recovered loop', () => {
    // `!typeof x === 'string'` parses as `(!typeof x) === 'string'` — a real bug if the
    // parentheses are dropped.
    const original = 'type Drop<T> = T extends any[] ? Drop<T[0]> : T'
    const out = decompile(original)
    if (out.includes('while') && out.includes('!')) {
      expect(out).toMatch(/!\(.*\)/)
    }
  })
})

describe('array types', () => {
  it('uses the expression form rather than naming the type', () => {
    // Regression: `Array<T>` went through `t<…>()`, which renders its argument as
    // verbatim *type* text. A nested reference to a ScriptType function — a value —
    // then appeared in type position and the converted file would not typecheck.
    const original = 'type Boxed<T> = T extends unknown ? Array<Wrap<T>> : never'
    const out = decompile(original)
    expect(out).toContain('arrayOf(Wrap(T))')
    expect(out).not.toContain('t<Array<')
  })

  it('handles ReadonlyArray too', () => {
    expect(decompile('type R<T> = T extends unknown ? ReadonlyArray<T> : never')).toContain(
      'readonlyArrayOf(T)',
    )
  })

  it('still names a constructor global that has no expression form', () => {
    expect(decompile('type P<T> = T extends unknown ? Promise<T> : never')).toContain('t<Promise<')
  })
})

/**
 * Object members that are signatures rather than types. These were the two largest
 * language gaps in the corpus, so each case here is a shape that used to become `raw()`.
 */
describe('object signature members', () => {
  // Parameters are named positionally on the way out, as they already are for `fnType`,
  // so these cases are written with the names the round trip produces.
  const same = (original: string) => expect(normalise(roundTrip(original))).toBe(normalise(original))

  it('keeps a method a method', () => {
    const original = 'type A<T> = { subscribe(a0: T): number }'
    expect(decompile(original)).toContain('subscribe: methodType([T], number)')
    same(original)
  })

  it('keeps call and construct signatures', () => {
    same('type B<T> = { (a0: T): number }')
    same('type C<T> = { new (a0: T): T }')
    same('type E<T> = { name: string; get(a0: string): T; (a0: T): void }')
  })

  it('keeps an overload set, which no set of keys could spell', () => {
    const original = 'type D<T> = { (a0: T): number; (a0: T, a1: string): boolean }'
    expect(decompile(original)).toContain('...callSig([T], number), ...callSig([T, string], boolean)')
    same(original)
    same('type O<T> = { with(a0: T): number; with(): boolean }')
    same('type P<T> = { with?(a0: T): number; with?(): boolean }')
  })

  it('leaves a readonly index signature as a gap rather than dropping the modifier', () => {
    // The object node carries one index and no modifier for it. Emitting a mutable one
    // would be a different type, and a wrong answer is worse than an admitted gap.
    expect(decompile('type R<T> = { readonly [key: string]: T }')).toContain('raw(')
  })

  it('keeps type parameters, optionality, rest and optional parameters', () => {
    same('type F<T> = { run<R>(a0: T, a1: R): R }')
    same('type G<T> = { f?(a0: T): void }')
    same('type H<T> = { f(...a0: T[]): void }')
    same('type I<T> = { f(a0?: T): void }')
  })

  it('keeps an index signature that sits beside named members', () => {
    const original = 'type J<T> = { [key: string]: T | string; name: string }'
    expect(decompile(original)).toContain('...indexRecord(string,')
    same(original)
  })

  it('reads a get-only accessor as the readonly property it is', () => {
    // Not an assumption: `same` puts both spellings through the equivalence gate.
    expect(decompile('type K<T> = { get foo(): T }')).toContain('readonlyProp(T)')
    expect(normalise(roundTrip('type K<T> = { get foo(): T }'))).toBe(
      normalise('type K<T> = { readonly foo: T }'),
    )
  })
})

/**
 * A type predicate names one of the enclosing signature's parameters, and those are
 * renamed positionally on the way out, so it has to travel as an index.
 */
describe('type predicates', () => {
  it('narrows the parameter it named, by position', () => {
    const original = 'type P<T> = { f: (a0: number, a1: T) => a1 is string }'
    expect(decompile(original)).toContain('paramIs(1, string)')
    expect(normalise(roundTrip(original))).toBe(normalise(original))
  })

  it('carries an assertion', () => {
    const original = 'type Q<T> = { assert(a0: unknown): asserts a0 is T }'
    expect(normalise(roundTrip(original))).toBe(normalise(original))
  })
})

describe('round trip', () => {
  it('preserves a multi-branch conditional', () => {
    const original =
      "type Kind<T> = T extends string ? 'str' : T extends number ? 'num' : T extends any[] ? 'arr' : 'other'"
    const out = decompile(original)
    expect(out).toContain("typeof T === 'string'")
    expect(out).toContain('Array.isArray(T)')
    expect(normalise(roundTrip(original))).toBe(normalise(original))
  })
})

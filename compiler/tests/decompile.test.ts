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

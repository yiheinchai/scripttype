import { describe, expect, it } from 'vitest'
import { compile } from '../src/compile.js'
import { formatAlias } from '../src/format.js'
import { cond, kw, ref, str, tuple, union, type TypeAlias } from '../src/ir.js'

/** Compile and return the emitted TypeScript, wrapped at `width`. */
const at = (src: string, width: number) =>
  compile(src, { includePrelude: false, width }).code.trim()

/** Build an alias directly, to exercise layout without going through lowering. */
const alias = (body: TypeAlias['body'], params: TypeAlias['params'] = []): TypeAlias => ({
  name: 'T',
  params,
  body,
  exported: true,
})

describe('layout', () => {
  it('leaves a declaration that fits on one line', () => {
    expect(at(`export function Id(t: unknown) { return t }`, 96)).toBe('export type Id<T> = T')
  })

  it('never breaks a short declaration, however narrow the body', () => {
    // Regression guard: the value of the formatter is in the long cases, and it must
    // not tax the short ones.
    const out = at(`export function Trim(v: string) { return TrimLeft(TrimRight(v)) }`, 96)
    expect(out).toBe('export type Trim<V extends string> = TrimLeft<TrimRight<V>>')
    expect(out).not.toContain('\n')
  })

  it('moves the body to its own line when the declaration overflows', () => {
    const src = `export function Pick(t: unknown) {
      if (extendsType<string>(t)) { return SomeVeryLongTypeConstructorName(t) }
      return never
    }`
    const out = at(src, 60)
    expect(out.split('\n')[0]).toBe('export type Pick<T> =')
    expect(out).toContain('\n  T extends string')
  })

  it('gives a single decision the conventional ? / : shape', () => {
    const body = cond(ref('T'), kw('string'), ref('AVeryLongConsequentTypeName'), kw('never'))
    expect(formatAlias(alias(body, [{ name: 'T' }]), { width: 40 })).toBe(
      ['export type T<T> =', '  T extends string', '    ? AVeryLongConsequentTypeName', '    : never'].join('\n'),
    )
  })

  it('prints a chain of conditionals as a flat cascade, guards in one column', () => {
    // Three arms plus a tail. Every guard must start at the same column, which is the
    // property that keeps a six-branch selector readable.
    const body = cond(
      ref('SE'),
      str('aaaaaaaaaaaaaaaaaaaa'),
      ref('First'),
      cond(
        ref('SE'),
        str('bbbbbbbbbbbbbbbbbbbb'),
        ref('Second'),
        cond(ref('SE'), str('cccccccccccccccccccc'), ref('Third'), kw('never')),
      ),
    )
    const out = formatAlias(alias(body, [{ name: 'SE' }]), { width: 50 })
    const lines = out.split('\n')
    expect(lines[0]).toBe('export type T<SE> =')
    const guardCols = lines
      .slice(1)
      .filter((l) => l.includes('extends'))
      .map((l) => l.length - l.trimStart().length)
    expect(guardCols).toEqual([2, 2, 2])
    expect(lines.at(-1)).toBe('  : never')
  })

  it('indents a conditional nested in a then-branch by exactly one step', () => {
    const src = `export function F(SE: string, DB, TB: keyof typeof DB) {
      const m1 = matches<\`\${Hole<"T">}.\${Hole<"C">} as \${string}\`>(SE)
      if (m1) {
        if (matches<typeof TB>(m1.T)) { return DB[m1.T][m1.C] }
        return never
      }
      const m2 = matches<\`\${Hole<"C">} as \${string}\`>(SE)
      if (m2) { return DB[m2.C] }
      return never
    }`
    const out = at(src, 70)
    const indentOf = (needle: string) => {
      const line = out.split('\n').find((l) => l.includes(needle))!
      return line.length - line.trimStart().length
    }
    // The chain's guards sit at 2; the decision subordinate to the first guard is one
    // step further in, at 4 — not two steps, which is the drift this asserts against.
    expect(indentOf('? T extends TB')).toBe(4)
  })

  it('breaks a union one member per line, with a leading separator', () => {
    const members = Array.from({ length: 6 }, (_, i) => ref(`LongMemberTypeName${i}`))
    const out = formatAlias(alias(union(members)), { width: 50 })
    const lines = out.split('\n').slice(1)
    expect(lines.every((l) => l.startsWith('  | '))).toBe(true)
    expect(lines).toHaveLength(6)
  })

  it('breaks a tuple one element per line and closes at the anchor', () => {
    const els = Array.from({ length: 5 }, (_, i) => ({ expr: ref(`LongElementTypeName${i}`) }))
    const out = formatAlias(alias(tuple(els)), { width: 40 })
    const lines = out.split('\n')
    // The opening bracket stays on the `=` line.
    expect(lines[0]).toBe('export type T = [')
    expect(lines[1]).toBe('  LongElementTypeName0,')
    expect(lines.at(-1)).toBe(']')
  })

  it('produces output that parses back to the same type', () => {
    // The formatter must only move whitespace. Comparing the wrapped output with the
    // unwrapped one after collapsing runs of whitespace catches a dropped token.
    const src = `export function F(SE: string, DB) {
      const m1 = matches<\`\${Hole<"T">}.\${Hole<"C">}\`>(SE)
      if (m1) { return DB[m1.T][m1.C] }
      const m2 = matches<\`\${Hole<"C">}\`>(SE)
      if (m2) { return DB[m2.C] }
      return never
    }`
    const collapse = (s: string) => s.replace(/\s+/g, ' ').trim()
    expect(collapse(at(src, 40))).toBe(collapse(at(src, Infinity)))
  })
})

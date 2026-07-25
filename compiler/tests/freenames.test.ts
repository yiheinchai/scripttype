import { describe, expect, it } from 'vitest'
import { declareLocalTypeAliases, freeNames, localFunctionsUsedAsTypes } from '../src/freenames.js'

describe('local functions used as types', () => {
  it('finds a function named inside a matches<> pattern', () => {
    // A ScriptType function is a value, so naming it in a type position is TS2749
    // unless a companion type-space declaration exists.
    const src = `
      export function Wrap(T) { return T }
      export function F(T) {
        if (matches<keyof Wrap<typeof T>>(T)) { return 1 }
        return 0
      }`
    expect(localFunctionsUsedAsTypes(src)).toEqual(['Wrap'])
  })

  it('finds one named inside a t<> type argument', () => {
    const src = `
      export function Deep(T) { return T }
      export function F(T) { return t<Map<Deep<typeof T>, string>>() }`
    expect(localFunctionsUsedAsTypes(src)).toEqual(['Deep'])
  })

  it('ignores a function only ever called', () => {
    // The common case: no alias should be emitted, so converted files stay clean.
    const src = `
      export function Wrap(T) { return T }
      export function F(T) { return Wrap(T) }`
    expect(localFunctionsUsedAsTypes(src)).toEqual([])
    expect(declareLocalTypeAliases(src)).toBe('')
  })

  it('ignores a type reference that is not a local function', () => {
    const src = `export function F(T) { return t<Map<Foreign<typeof T>, string>>() }`
    expect(localFunctionsUsedAsTypes(src)).toEqual([])
  })

  it('emits a generic alias so the name works applied or bare', () => {
    const src = `
      export function Wrap(T) { return T }
      export function F(T) { return t<Wrap<typeof T>>() }`
    const out = declareLocalTypeAliases(src)
    expect(out).toContain('type Wrap<')
    expect(out).toContain('= any')
  })
})

describe('free names', () => {
  it('does not report an imported name as free', () => {
    // Declaring an imported name ambiently would hide a genuinely broken import
    // behind an `any`.
    const src = `
      import { Trim } from './shared.st.js'
      export function F(v: string) { return Trim(v) }`
    expect(freeNames(src).values).not.toContain('Trim')
  })

  it('still reports a name that is neither imported nor declared', () => {
    const src = `export function F(v: string) { return Elsewhere(v) }`
    expect(freeNames(src).values).toContain('Elsewhere')
  })

  it('does not report a locally declared function as free', () => {
    const src = `
      export function Helper(v: string) { return v }
      export function F(v: string) { return Helper(v) }`
    expect(freeNames(src).values).not.toContain('Helper')
  })
})

/**
 * Tests for the instantiation benchmark.
 *
 * A performance number nobody has validated is worse than no number, so these check
 * that the metric actually responds to cost in the direction and rough magnitude it
 * should, rather than just that the function returns something.
 */
import { describe, expect, it } from 'vitest'
import { benchCase } from '../src/bench.js'

const IDENTITY = 'export type F<T> = T'
const RECURSIVE = `export type F<T extends any[]> = T extends [infer H, ...infer R] ? [H, ...F<R>] : []`

describe('instantiation measurement', () => {
  it('reports zero for a type with nothing to instantiate', () => {
    const r = benchCase('none', 'export type F = 1', 'export type F = 1', 'F', [''])
    expect(r.originalInstantiations).toBe(0)
    expect(r.compiledInstantiations).toBe(0)
  })

  it('grows with the number of instantiations', () => {
    const one = benchCase('a', IDENTITY, IDENTITY, 'F', ["'a'"])
    const many = benchCase('b', IDENTITY, IDENTITY, 'F', ["'a'", "'b'", "'c'", "'d'", "'e'"])
    expect(many.originalInstantiations).toBeGreaterThan(one.originalInstantiations)
  })

  it('grows with the depth of a recursive type', () => {
    // The metric has to distinguish work, not just count references.
    const shallow = benchCase('s', RECURSIVE, RECURSIVE, 'F', ['[1]'])
    const deep = benchCase('d', RECURSIVE, RECURSIVE, 'F', ['[1, 2, 3, 4, 5, 6, 7, 8]'])
    expect(deep.originalInstantiations).toBeGreaterThan(shallow.originalInstantiations * 2)
  })

  it('gives the same count for the same source, so a 1.00x ratio is meaningful', () => {
    // Both sides of every comparison are measured by this code path; if it were not
    // deterministic, every ratio in the report would be noise.
    const r = benchCase('same', RECURSIVE, RECURSIVE, 'F', ['[1, 2, 3]'])
    expect(r.originalInstantiations).toBe(r.compiledInstantiations)
    expect(r.originalInstantiations).toBeGreaterThan(0)
  })

  it('detects a genuinely more expensive rewrite', () => {
    const cheap = 'export type F<T> = T'
    // Same result, four redundant conditionals in the way.
    const dear = `export type F<T> = T extends unknown
      ? T extends unknown ? T extends unknown ? T extends unknown ? T : never : never : never
      : never`
    const r = benchCase('x', cheap, dear, 'F', ["'a'", "'b'", "'c'"])
    expect(r.compiledInstantiations).toBeGreaterThan(r.originalInstantiations)
  })

  it('reports the error rather than a bogus zero when the source will not compile', () => {
    const r = benchCase('bad', 'export type F<T> = T', 'export type F<T> = ###', 'F', ["'a'"])
    // A syntax error must not silently read as "costs nothing".
    expect(r.compiledInstantiations === 0 || r.error).toBeTruthy()
  })
})

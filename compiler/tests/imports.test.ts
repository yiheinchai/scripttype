import { describe, expect, it } from 'vitest'
import { compile, rewriteSpecifier } from '../src/compile.js'

const c = (src: string) => compile(src, { includePrelude: false, width: Infinity }).code.trim()

describe('module specifiers', () => {
  it('rewrites a ScriptType module to its compiled name', () => {
    // `shared.st.ts` compiles to `shared.ts`, so `./shared.st.js` — the spelling that
    // makes TypeScript resolve to the .st.ts file — becomes `./shared.js`.
    expect(rewriteSpecifier('./shared.st.js')).toBe('./shared.js')
    expect(rewriteSpecifier('../a/b.st.js')).toBe('../a/b.js')
    expect(rewriteSpecifier('./shared.st')).toBe('./shared')
  })

  it('leaves a non-ScriptType specifier alone', () => {
    expect(rewriteSpecifier('type-fest')).toBe('type-fest')
    expect(rewriteSpecifier('./plain.js')).toBe('./plain.js')
    expect(rewriteSpecifier('./nested.test.js')).toBe('./nested.test.js')
  })
})

describe('imports', () => {
  it('carries a named import through as a type import', () => {
    const src = `import { Trim } from './shared.st.js'
      export function F(v: string) { return Trim(v) }`
    expect(c(src)).toBe(
      [`import type { Trim } from './shared.js'`, ``, `export type F<V extends string> = Trim<V>`].join('\n'),
    )
  })

  it('drops an import the output does not mention', () => {
    // An unused import is an error under noUnusedLocals, and a ScriptType helper can
    // legitimately be inlined away during lowering.
    const src = `import { Trim, Unused } from './shared.st.js'
      export function F(v: string) { return Trim(v) }`
    expect(c(src)).toContain(`import type { Trim } from './shared.js'`)
    expect(c(src)).not.toContain('Unused')
  })

  it('preserves an alias', () => {
    const src = `import { Trim as T } from './shared.st.js'
      export function F(v: string) { return T(v) }`
    expect(c(src)).toContain(`import type { Trim as T } from './shared.js'`)
  })

  it('carries default and namespace imports', () => {
    expect(c(`import D from './x.st.js'
      export function F(v: string) { return D(v) }`)).toContain(`import type D from './x.js'`)
    expect(c(`import * as NS from './x.st.js'
      export function F(v: string) { return NS.Thing(v) }`)).toContain(`import type * as NS from './x.js'`)
  })

  it('drops a side-effect import', () => {
    // It has no type-level meaning, and emitting it would be a runtime import from a
    // path that no longer exists.
    const src = `import './setup.js'
      export function F(v: string) { return v }`
    expect(c(src)).not.toContain('setup')
  })

  it('carries a re-export even though nothing local mentions it', () => {
    const src = `export { Trim } from './shared.st.js'
      export function F(v: string) { return v }`
    expect(c(src)).toContain(`export type { Trim } from './shared.js'`)
  })

  it('leaves a bare local export alone', () => {
    // `export { F }` names local declarations, which already carry their own modifier.
    const src = `export function F(v: string) { return v }
      export { F }`
    expect(c(src)).toBe('export type F<V extends string> = V')
  })
})

describe('loop element constraints', () => {
  it('carries the element type into the generated helper', () => {
    // Regression: the list was constrained to `readonly unknown[]`, so a peeled element
    // was `unknown` and passing it to a `V extends string` function emitted TypeScript
    // that did not typecheck.
    const src = `export function F(xs: string[]) {
      const out: string[] = []
      for (const x of xs) { out.push(Trim(x)) }
      return out
    }`
    const code = c(src)
    expect(code).toContain('Rest extends string[]')
    expect(code).toContain('infer X extends string')
    expect(code).toContain('...infer Tail extends string[]')
  })

  it('falls back to an unconstrained list when the element type is unknown', () => {
    const src = `export function F(xs) {
      const out: any[] = []
      for (const x of xs) { out.push(x) }
      return out
    }`
    const code = c(src)
    expect(code).toContain('readonly unknown[]')
    // No constraint is better than `infer X extends unknown`, which says nothing.
    expect(code).not.toContain('extends unknown]')
  })
})

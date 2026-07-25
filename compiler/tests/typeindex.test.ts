/**
 * Resolving a generated file's free names to their real declarations.
 *
 * The point of this is not tidiness. A free name declared as `type X<T1 = any, …> = any`
 * makes a file typecheck while checking almost nothing: `any` accepts every arity and
 * every argument, so a reference that is simply wrong passes. Importing the real
 * declaration turns that check back into a real one — which is only worth doing if the
 * value shim survives alongside it, since ScriptType applies types in call position.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { ambientFor } from '../src/freenames.js'
import { resolverFor, type Resolver } from '../src/typeindex.js'

/** A source referencing one free name, used as both a type and a value. */
const SRC = `export function Get(S) {\n  const m1 = matches<StoreApi>(S)\n  if (m1) { return StoreApi(S) }\n  return never\n}\n`

const fake = (map: Record<string, string>): Resolver => ({ resolve: (n) => map[n] })

describe('free names with a resolver', () => {
  it('imports a name it can resolve, and stops stubbing its type', () => {
    const out = ambientFor(SRC, fake({ StoreApi: './vanilla.js' }))
    expect(out).toContain(`import type { StoreApi } from './vanilla.js'`)
    expect(out).not.toContain('type StoreApi<T1 = any')
  })

  it('keeps the value declaration, which the import cannot provide', () => {
    // `StoreApi(S)` is ScriptType's spelling of `StoreApi<S>`, so the name must exist in
    // value space. `import type` binds only in type space; the two coexist.
    const out = ambientFor(SRC, fake({ StoreApi: './vanilla.js' }))
    expect(out).toContain('declare const StoreApi: any')
  })

  it('stubs what it cannot resolve', () => {
    const out = ambientFor(SRC, fake({}))
    expect(out).toContain('type StoreApi<T1 = any')
    expect(out).not.toContain('import type')
  })

  it('emits the old stub when there is no resolver at all', () => {
    // The round-trip harness checks in memory, where a relative import has nothing to
    // resolve against, so it must keep getting the self-contained form.
    const out = ambientFor(SRC)
    expect(out).toContain('type StoreApi<T1 = any')
    expect(out).not.toContain('import type')
  })

  it('groups names from one module into a single import', () => {
    const src = `export function F(S) { return merge(A(S), B(S), C(S)) }\n`
    const out = ambientFor(src, fake({ A: './m.js', B: './m.js', C: './other.js' }))
    expect(out).toContain(`import type { A, B } from './m.js'`)
    expect(out).toContain(`import type { C } from './other.js'`)
  })

  it('never imports a function this file declares', () => {
    // A ScriptType function used in a pattern needs a companion type alias, but it is
    // defined right here — importing it would shadow the local definition.
    const src = `export function Helper(T) { return T }\nexport function Use(S) {\n  const m1 = matches<Helper>(S)\n  if (m1) { return S }\n  return never\n}\n`
    const out = ambientFor(src, fake({ Helper: './elsewhere.js' }))
    expect(out).not.toContain('import type { Helper }')
    expect(out).toContain('type Helper<T1 = any')
  })
})

describe('resolving against a library on disk', () => {
  let dir: string
  beforeAll(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'st-index-'))
    fs.mkdirSync(path.join(dir, 'src'), { recursive: true })
    fs.writeFileSync(
      path.join(dir, 'src/vanilla.ts'),
      'export type StoreApi<T> = { get: T }\ntype Local = string\nexport class Klass {}\n',
    )
    fs.writeFileSync(path.join(dir, 'src/other.ts'), 'export type Other<T> = T\n')
    // The companion-object pattern: one name exported as both an interface and a value.
    fs.writeFileSync(
      path.join(dir, 'src/companion.ts'),
      'export interface Compiled<O> { o: O }\nexport const Compiled = { make: 1 }\n',
    )
    // The same name exported from two files: ambiguous, and must not be guessed.
    fs.writeFileSync(path.join(dir, 'src/dup-a.ts'), 'export type Dup<T> = T\n')
    fs.writeFileSync(path.join(dir, 'src/dup-b.ts'), 'export type Dup<T> = T\n')
  })
  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }))

  it('resolves a name exported elsewhere in the library', () => {
    const r = resolverFor(dir, path.join(dir, 'src/vanilla.ts'), path.join(dir, 'gen'))
    expect(r.resolve('Other')).toBe('../src/other.js')
  })

  it('prefers the file the ScriptType was decompiled from', () => {
    // Most free names are declared in that very file and were dropped only because they
    // are not generic type aliases — the least ambiguous case there is.
    const r = resolverFor(dir, path.join(dir, 'src/vanilla.ts'), path.join(dir, 'gen'))
    expect(r.resolve('StoreApi')).toBe('../src/vanilla.js')
  })

  it('refuses a name that is declared but not exported', () => {
    // It cannot be imported at all: TS2305, "has no exported member".
    const r = resolverFor(dir, path.join(dir, 'src/vanilla.ts'), path.join(dir, 'gen'))
    expect(r.resolve('Local')).toBeUndefined()
  })

  it('refuses a class, which would collide with the value shim', () => {
    // A class occupies value space too, so `import type { K }` beside `declare const K`
    // is TS2440 — and dropping the shim is not an option, because a type-only import
    // cannot appear in a call, which is how ScriptType applies a type.
    const r = resolverFor(dir, path.join(dir, 'src/vanilla.ts'), path.join(dir, 'gen'))
    expect(r.resolve('Klass')).toBeUndefined()
  })

  it('refuses a name the module also exports as a value', () => {
    // `import type { X }` binds every meaning X has, so an interface with a same-named
    // companion `const` collides with the value shim (TS2440).
    const r = resolverFor(dir, path.join(dir, 'src/vanilla.ts'), path.join(dir, 'gen'))
    expect(r.resolve('Compiled')).toBeUndefined()
  })

  it('refuses a name two files both export', () => {
    // Picking one would substitute a *wrong* type, which is worse than the `any` it
    // replaces, because it would be believed.
    const r = resolverFor(dir, path.join(dir, 'src/vanilla.ts'), path.join(dir, 'gen'))
    expect(r.resolve('Dup')).toBeUndefined()
  })

  it('returns undefined for a name the library does not declare', () => {
    const r = resolverFor(dir, path.join(dir, 'src/vanilla.ts'), path.join(dir, 'gen'))
    expect(r.resolve('Nowhere')).toBeUndefined()
  })
})

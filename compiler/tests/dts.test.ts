/**
 * The ambient declarations are what the editor reads, so they are part of the DX surface
 * rather than an implementation detail.
 */
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { BUILTINS } from '../src/builtins.js'
import { syncDts } from '../src/sync-dts.js'

const DTS_PATH = path.resolve(import.meta.dirname, '../src/scripttype.d.ts')
const DTS = fs.readFileSync(DTS_PATH, 'utf8')

describe('scripttype.d.ts', () => {
  it('has the builtin docs already generated into it', () => {
    // Generation, not vigilance: a new builtin cannot ship with `(...a: any[]) => any`
    // as the only thing the editor can tell you about it.
    expect(syncDts(DTS), 'run `pnpm sync-dts`').toBe(DTS)
  })

  it('documents every builtin it declares', () => {
    const undocumented: string[] = []
    const lines = DTS.split('\n')
    lines.forEach((line, i) => {
      const m = /^declare function (\w+)(?:<[^>]*>)?\(/.exec(line)
      if (!m || !BUILTINS[m[1]!]) return
      const above = lines[i - 1] ?? ''
      if (!above.trimEnd().endsWith('*/')) undocumented.push(m[1]!)
    })
    expect(undocumented).toEqual([])
  })

  it('declares every builtin the compiler knows about', () => {
    // A builtin the compiler accepts but the declarations omit would compile from the
    // CLI and be a red squiggle in the editor — the worst possible split.
    const declared = new Set(
      [...DTS.matchAll(/^declare function (\w+)(?:<[^>]*>)?\(/gm)].map((m) => m[1]!),
    )
    const missing = Object.keys(BUILTINS).filter((n) => !declared.has(n))
    expect(missing).toEqual([])
  })

  it('is idempotent under a second sync', () => {
    expect(syncDts(syncDts(DTS))).toBe(syncDts(DTS))
  })

  it('does not clobber a hand-written block comment', () => {
    // Several declarations carry design notes worth more than the one-line summary.
    const src = [
      '/**',
      ' * A carefully written note.',
      ' */',
      'declare function upper(...a: any[]): any',
    ].join('\n')
    expect(syncDts(src)).toBe(src)
  })
})

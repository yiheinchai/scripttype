/**
 * The parallel corpus runner: how shards are formed, and how a lost shard is reported.
 *
 * Everything here exists because of one failure. Five shards of a full sweep started
 * `node dist/inplace.js` in the seconds a concurrent `npm pack` (whose `prepack` is
 * `rm -rf dist && tsc`) had `dist` deleted, died with MODULE_NOT_FOUND before writing any
 * JSON, and reached COVERAGE.md as `not measured: Error: Cannot find module '/Users/...`
 * — cut off one character before the part that identified the problem. Two invariants
 * follow: a shard must never be handed a path that is not there, and a shard that measures
 * nothing must say why in full.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { collectFiles } from '../src/batch.js'
import { REPO_ROOT } from '../src/corpus.js'
import { shardOf } from '../src/inplace.js'

const COMPILER = path.resolve(import.meta.dirname, '..')
const RUNNER = path.join(COMPILER, 'run-parallel.sh')
const TSX = path.join(COMPILER, 'node_modules', '.bin', 'tsx')

/** A small repository with real generic aliases, cheap enough to round-trip in a test. */
const SAMPLE = '05-functional-effects-hkt/neverthrow'

// The corpus clones are gitignored inputs restored by ./refresh.sh, so a fresh checkout
// has nothing to shard. Skip rather than fail: their absence is not a regression.
const hasCorpus = fs.existsSync(path.join(REPO_ROOT, SAMPLE))

/**
 * The corpus roots the runner sweeps when given no arguments, read out of the script
 * itself. Restating them here would defeat the point: a root misspelled in the script is
 * precisely the mistake this is meant to catch, and a private copy could not see it.
 */
function defaultRoots(): string[] {
  const src = fs.readFileSync(RUNNER, 'utf8')
  const m = src.match(/ROOTS=\((0\d[\s\S]*?)\)/)
  expect(m, 'run-parallel.sh no longer declares default ROOTS').toBeTruthy()
  return m![1]!.split(/[\s\\]+/).filter(Boolean)
}

describe('shard formation', () => {
  it('sweeps only corpus roots that exist', () => {
    const roots = defaultRoots()
    expect(roots.length).toBe(7)
    for (const r of roots) {
      // `collectFiles` stats its root, so a name that is not on disk kills the shard
      // before it can write anything — the same silent zero as a crashed process.
      expect(fs.existsSync(path.join(REPO_ROOT, r)), `missing corpus root ${r}`).toBe(hasCorpus)
    }
  })

  it.skipIf(!hasCorpus)('hands every shard paths that are on disk', () => {
    const files = collectFiles(SAMPLE)
    expect(files.length).toBeGreaterThan(0)
    for (let k = 0; k < 30; k++) {
      for (const rel of shardOf(files, k, 30)) {
        expect(fs.existsSync(path.join(REPO_ROOT, rel)), `shard ${k} wants missing ${rel}`).toBe(
          true,
        )
      }
    }
  })

  it.skipIf(!hasCorpus)('covers every file exactly once across the shards', () => {
    // A file dropped by the sharding is indistinguishable in the report from a file with
    // no generic aliases, so the partition has to be exact rather than merely disjoint.
    const files = collectFiles(SAMPLE)
    const seen: string[] = []
    for (let k = 0; k < 30; k++) seen.push(...shardOf(files, k, 30))
    expect(seen.sort()).toEqual([...files].sort())
  })
})

describe('the built harness', () => {
  const entry = path.join(COMPILER, 'dist', 'inplace.js')
  const built = fs.existsSync(entry)

  it.skipIf(!built || !hasCorpus)('measures the same from a copy of dist beside it', () => {
    // The runner shards from a per-run copy of `dist`, so that a build starting elsewhere
    // cannot delete the code out from under a sweep in flight. That only works while the
    // harness locates the corpus relative to its own directory: anything that resolved
    // paths from `dist` by name, or from the working directory, would break the copy and
    // leave every shard measuring nothing.
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scripttype-shard-'))
    const copy = path.join(COMPILER, `dist-run.test-${process.pid}`)
    try {
      fs.cpSync(path.join(COMPILER, 'dist'), copy, { recursive: true })
      const json = path.join(dir, 'out.json')
      execFileSync('node', [path.join(copy, 'inplace.js'), `${SAMPLE}/src/_internals`, '--json', json], {
        cwd: COMPILER,
        stdio: 'pipe',
      })
      const outcomes = JSON.parse(fs.readFileSync(json, 'utf8'))
      expect(outcomes.length).toBeGreaterThan(0)
      expect(outcomes.every((o: { file: string }) => o.file.startsWith(SAMPLE))).toBe(true)
    } finally {
      fs.rmSync(copy, { recursive: true, force: true })
      fs.rmSync(dir, { recursive: true, force: true })
    }
  }, 60_000)
})

describe('reporting a shard that measured nothing', () => {
  // The real crash, verbatim, because the bug was in what the report did with it.
  const CRASH = [
    'node:internal/modules/cjs/loader:1478',
    '  throw err;',
    '  ^',
    '',
    `Error: Cannot find module '/Users/dev/ScriptType/compiler/dist/inplace.js'`,
    '    at Module._resolveFilename (node:internal/modules/cjs/loader:1475:15)',
    '    at Module._load (node:internal/modules/cjs/loader:1261:25)',
    '',
    'Node.js v25.8.1',
  ].join('\n')

  const aggregate = (files: Record<string, string>): string => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scripttype-agg-'))
    try {
      for (const [name, text] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), text)
      return execFileSync(TSX, [path.join(COMPILER, 'src', 'aggregate.ts'), dir], {
        cwd: COMPILER,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  }

  it('keeps the whole reason, module path included', () => {
    const out = aggregate({ 'shard24.txt': CRASH })
    expect(out).toContain(`Cannot find module '/Users/dev/ScriptType/compiler/dist/inplace.js'`)
    expect(out).toContain('not measured')
  })

  it('names the thrown error rather than the stack around it', () => {
    // The first line matching /error/ in a node crash dump is the loader frame, not the
    // message; reporting that would be technically non-empty and entirely useless.
    const out = aggregate({ 'shard24.txt': CRASH })
    expect(out).not.toContain('not measured: node:internal')
  })

  it('says up front that a run produced nothing', () => {
    // A single cell in a long table is easy to read past. This one sat unnoticed through
    // several sweeps, so the summary above the table has to carry it too.
    const out = aggregate({ 'shard24.txt': CRASH, 'shard25.txt': CRASH })
    expect(out).toContain('produced no results at all')
    expect(out).toContain('shard24, shard25')
  })

  it('does not let a crash dump break the table', () => {
    // Pipes inside a reason would end the cell early and shift every column after it.
    const out = aggregate({ 'shard7.txt': 'Error: spawn a|b|c ENOENT\n' })
    const cells = (row: string) => row.split(/(?<!\\)\|/).length
    const header = out.split('\n').find((l) => l.startsWith('|---'))!
    const row = out.split('\n').find((l) => l.startsWith('| shard7 '))!
    expect(cells(row)).toBe(cells(header))
  })
})

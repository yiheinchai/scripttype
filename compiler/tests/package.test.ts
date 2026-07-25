/**
 * Packaging: can someone who is not us actually install and run this?
 *
 * Every other test runs against the repo, with tsx available and `src/` on disk. None of
 * that is true for an installed copy, so this packs the real tarball, installs it into an
 * empty directory, and drives it from there. It is slow (npm pack + npm install), which is
 * the price of the only test that would catch a missing `files` entry, a bin that needs a
 * dev dependency, or a build that emits nothing.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const PKG = path.resolve(import.meta.dirname, '..')

let dir: string
let installed = false

beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scripttype-pack-'))
  // `npm pack` runs prepack, which rebuilds dist from scratch — so this also covers the
  // case where dist is stale or absent.
  const out = execFileSync('npm', ['pack', '--silent', '--pack-destination', dir], {
    cwd: PKG,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  const tarball = path.join(dir, out.trim().split('\n').pop()!.trim())
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: 't', private: true }))
  execFileSync('npm', ['install', '--silent', '--no-audit', '--no-fund', tarball], {
    cwd: dir,
    stdio: 'pipe',
  })
  installed = true
}, 300_000)

afterAll(() => {
  if (dir) fs.rmSync(dir, { recursive: true, force: true })
})

const bin = () => path.join(dir, 'node_modules', '.bin', 'scripttype')
const run = (args: string[]) =>
  execFileSync(bin(), args, { cwd: dir, encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } })

describe('an installed copy', () => {
  it('installs a working binary', () => {
    expect(installed).toBe(true)
    expect(fs.existsSync(bin())).toBe(true)
    expect(run(['--version']).trim()).toBe('0.1.0')
  })

  it('does not depend on tsx being present', () => {
    // The repo's bin falls back to tsx when dist is missing; an installed copy ships dist
    // and must never reach that path, because tsx is a devDependency.
    expect(fs.existsSync(path.join(dir, 'node_modules', 'scripttype', 'dist', 'cli.js'))).toBe(true)
    expect(fs.existsSync(path.join(dir, 'node_modules', 'tsx'))).toBe(false)
  })

  it('ships the ambient declarations `init` needs', () => {
    // A .d.ts is not emitted into dist, so it has to be listed in `files` explicitly —
    // the classic way this breaks.
    expect(
      fs.existsSync(path.join(dir, 'node_modules', 'scripttype', 'src', 'scripttype.d.ts')),
    ).toBe(true)
  })

  it('scaffolds and builds a project', () => {
    run(['init', 'app'])
    run(['build', 'app/example.st.ts'])
    const out = fs.readFileSync(path.join(dir, 'app', 'example.ts'), 'utf8')
    expect(out).toContain('export type Split<')
  })

  it('reports errors with the same quality as in the repo', () => {
    fs.writeFileSync(
      path.join(dir, 'bad.st.ts'),
      'export function F(t: string) {\n  console.log(t)\n  return t\n}\n',
    )
    let stderr = ''
    try {
      run(['check', 'bad.st.ts'])
    } catch (e) {
      stderr = (e as { stderr?: string }).stderr ?? ''
    }
    expect(stderr).toContain('error[ST1102]')
    expect(stderr).toContain('help:')
  })

  it('exposes a programmatic API through the package name', () => {
    // Reaching into `src/` or `dist/` directly must not be necessary; the exports map is
    // the supported surface.
    fs.writeFileSync(
      path.join(dir, 'api.mjs'),
      [
        `import { compileAll, explain, BUILTINS, VERSION } from 'scripttype'`,
        `const ok = compileAll('export function Id(t: unknown) { return t }')`,
        `const bad = compileAll('export function F(t) { console.log(t); return t }')`,
        `console.log(JSON.stringify({`,
        `  code: ok.result.code.trim(),`,
        `  errorCode: bad.errors[0].code,`,
        `  explains: explain('ST1102', false).length > 0,`,
        `  builtins: Object.keys(BUILTINS).length > 0,`,
        `  version: VERSION,`,
        `}))`,
      ].join('\n'),
    )
    const parsed = JSON.parse(
      execFileSync('node', ['api.mjs'], { cwd: dir, encoding: 'utf8' }).trim(),
    )
    expect(parsed).toEqual({
      code: 'export type Id<T> = T',
      errorCode: 'ST1102',
      explains: true,
      builtins: true,
      version: '0.1.0',
    })
  })

  it('keeps internals out of the exports map', () => {
    // `src/lower.ts` and friends are not a supported surface; importing them by
    // subpath must fail rather than quietly becoming someone's dependency.
    expect(() =>
      execFileSync('node', ['-e', `import('scripttype/lower.js')`], { cwd: dir, stdio: 'pipe' }),
    ).toThrow()
  })
})

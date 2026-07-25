import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { ConfigError, findConfig, loadConfig } from '../src/config.js'

const BIN = path.resolve(import.meta.dirname, '../bin/scripttype.mjs')

let dir: string
beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scripttype-config-'))
})
afterAll(() => fs.rmSync(dir, { recursive: true, force: true }))

const write = (rel: string, text: string) => {
  const p = path.join(dir, rel)
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, text)
  return p
}

const run = (args: string[], cwd = dir) => {
  try {
    return {
      status: 0,
      stdout: execFileSync(BIN, args, {
        cwd,
        encoding: 'utf8',
        env: { ...process.env, NO_COLOR: '1' },
        stdio: ['ignore', 'pipe', 'pipe'],
      }),
      stderr: '',
    }
  } catch (e) {
    const err = e as { status?: number; stdout?: string; stderr?: string }
    return { status: err.status ?? 1, stdout: err.stdout ?? '', stderr: err.stderr ?? '' }
  }
}

describe('validation', () => {
  const load = (text: string) => {
    const p = write('v/scripttype.json', text)
    return () => loadConfig(path.dirname(p))
  }

  it('accepts a complete config', () => {
    const { config } = load('{"include":["src"],"outDir":"gen","width":80,"checkSource":false}')()
    expect(config).toEqual({ include: ['src'], outDir: 'gen', width: 80, checkSource: false })
  })

  it('rejects an unknown setting with a suggestion', () => {
    // Silently ignoring a misspelled key is why people stop trusting config files.
    expect(load('{"outdir":"gen"}')).toThrow(/unknown setting 'outdir'.*Did you mean 'outDir'/)
  })

  it('lists the known settings when nothing is close', () => {
    expect(load('{"frobnicate":1}')).toThrow(/Known settings: include, outDir, width, checkSource/)
  })

  it('rejects wrong types, naming what it got', () => {
    expect(load('{"width":"wide"}')).toThrow(/'width' must be a number of at least 20, got a string/)
    expect(load('{"include":"src"}')).toThrow(/'include' must be an array of strings/)
    expect(load('{"include":[1]}')).toThrow(/'include' must be an array of strings/)
    expect(load('{"checkSource":"yes"}')).toThrow(/'checkSource' must be true or false/)
    expect(load('{"outDir":null}')).toThrow(/'outDir' must be a string, got null/)
  })

  it('rejects an absurdly narrow width rather than emitting one token per line', () => {
    expect(load('{"width":4}')).toThrow(/at least 20/)
  })

  it('rejects malformed JSON, quoting the parser', () => {
    expect(load('{"width": 96,,}')).toThrow(ConfigError)
    expect(load('{"width": 96,,}')).toThrow(/is not valid JSON/)
  })

  it('rejects a non-object', () => {
    expect(load('[1,2]')).toThrow(/must contain a JSON object/)
  })

  it('returns empty when there is no config', () => {
    const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'st-noconfig-'))
    expect(loadConfig(empty).config).toEqual({})
    expect(loadConfig(empty).path).toBeUndefined()
    fs.rmSync(empty, { recursive: true, force: true })
  })

  it('errors when an explicitly named config is missing', () => {
    // A discovered config that is absent means "no config"; one the user named does not.
    expect(() => loadConfig(dir, 'definitely-not-here.json')).toThrow(/config file not found/)
  })
})

describe('discovery', () => {
  it('walks up from a subdirectory', () => {
    write('proj/scripttype.json', '{"width":80}')
    fs.mkdirSync(path.join(dir, 'proj/a/b'), { recursive: true })
    expect(findConfig(path.join(dir, 'proj/a/b'))).toBe(path.join(dir, 'proj/scripttype.json'))
  })

  it('stops at a package boundary so a monorepo package does not inherit the root', () => {
    write('mono/scripttype.json', '{"width":80}')
    write('mono/pkg/package.json', '{"name":"pkg"}')
    expect(findConfig(path.join(dir, 'mono/pkg'))).toBeUndefined()
  })
})

describe('precedence', () => {
  const project = () => {
    const p = path.join(dir, 'p')
    fs.rmSync(p, { recursive: true, force: true })
    fs.mkdirSync(p, { recursive: true })
    fs.writeFileSync(
      path.join(p, 'a.st.ts'),
      'export function VeryLongTypeFunctionName(input: string, sep: string) {\n' +
        '  return TrimLeft(TrimRight(SomethingElseEntirely(input, sep)))\n}\n',
    )
    return p
  }

  it('uses outDir from config when no flag is given', () => {
    const p = project()
    fs.writeFileSync(path.join(p, 'scripttype.json'), '{"outDir":"gen"}')
    expect(run(['build', '--no-check-source'], p).status).toBe(0)
    expect(fs.existsSync(path.join(p, 'gen/a.ts'))).toBe(true)
  })

  it('lets --out override config', () => {
    const p = project()
    fs.writeFileSync(path.join(p, 'scripttype.json'), '{"outDir":"gen"}')
    run(['build', '--out', 'flagdir', '--no-check-source'], p)
    expect(fs.existsSync(path.join(p, 'flagdir/a.ts'))).toBe(true)
    expect(fs.existsSync(path.join(p, 'gen/a.ts'))).toBe(false)
  })

  it('applies width from config, and lets --width override it', () => {
    const p = project()
    fs.writeFileSync(path.join(p, 'scripttype.json'), '{"width":40}')
    const narrow = run(['build', '--stdout', '--quiet', '--no-check-source'], p).stdout
    const wide = run(['build', '--stdout', '--quiet', '--no-check-source', '--width', '200'], p).stdout
    expect(narrow.split('\n').length).toBeGreaterThan(wide.split('\n').length)
  })

  it('honours checkSource:false from config', () => {
    const p = project()
    fs.writeFileSync(path.join(p, 'scripttype.json'), '{"checkSource":false}')
    // Unresolved names would warn if the source check ran.
    expect(run(['build'], p).stdout).not.toContain('warning')
  })

  it('ignores the config entirely with --no-config', () => {
    const p = project()
    fs.writeFileSync(path.join(p, 'scripttype.json'), '{"outDir":"gen"}')
    run(['build', '--no-config', '--no-check-source'], p)
    // Falls back to writing beside the source.
    expect(fs.existsSync(path.join(p, 'a.ts'))).toBe(true)
    expect(fs.existsSync(path.join(p, 'gen/a.ts'))).toBe(false)
  })

  it('compiles `include` when no paths are named', () => {
    const p = project()
    fs.mkdirSync(path.join(p, 'only'), { recursive: true })
    fs.writeFileSync(path.join(p, 'only/b.st.ts'), 'export function B(t: unknown) { return t }\n')
    fs.writeFileSync(path.join(p, 'scripttype.json'), '{"include":["only"],"outDir":"gen"}')
    run(['build', '--no-check-source'], p)
    expect(fs.existsSync(path.join(p, 'gen/b.ts'))).toBe(true)
    // `a.st.ts` sits outside `include`, so it must not be compiled.
    expect(fs.existsSync(path.join(p, 'gen/a.ts'))).toBe(false)
  })

  it('surfaces a bad config as a plain error, not a stack trace', () => {
    const p = project()
    fs.writeFileSync(path.join(p, 'scripttype.json'), '{"nope":1}')
    const r = run(['build'], p)
    expect(r.status).toBe(1)
    expect(r.stderr).toMatch(/^error: /m)
    expect(r.stderr).not.toContain('at ')
  })
})

describe('init', () => {
  it('writes a config that loads cleanly', () => {
    const p = path.join(dir, 'scaffold')
    expect(run(['init', p]).status).toBe(0)
    expect(fs.existsSync(path.join(p, 'scripttype.json'))).toBe(true)
    expect(() => loadConfig(p)).not.toThrow()
    expect(loadConfig(p).config.outDir).toBe('generated')
  })
})

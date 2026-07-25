/**
 * The editor experience, tested against a real tsserver.
 *
 * Loading the plugin module proves nothing — the question is whether *tsserver* finds it,
 * loads it, and reports its diagnostics. Both of the bugs found while building this were
 * invisible to any lighter test: tsserver's plugin loader ignores the package `exports`
 * map, and it will not load a plugin from the project's own node_modules unless
 * `--allowLocalPluginLoads` is passed (which is what an editor does).
 *
 * So this drives the actual protocol: open a file, ask for semantic diagnostics, read what
 * comes back.
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const PKG = path.resolve(import.meta.dirname, '..')
const TSSERVER = path.join(PKG, 'node_modules', 'typescript', 'lib', 'tsserver.js')

interface Diag {
  code: number
  source?: string
  text: string
}

/** Open `file` in tsserver and return the diagnostics it reports. */
function diagnose(projectDir: string, file: string): Promise<Diag[]> {
  return new Promise((resolve, reject) => {
    const srv = spawn(
      'node',
      [TSSERVER, '--disableAutomaticTypingAcquisition', '--allowLocalPluginLoads'],
      { cwd: projectDir, stdio: ['pipe', 'pipe', 'pipe'] },
    )
    let seq = 0
    const send = (command: string, args: unknown) =>
      srv.stdin.write(JSON.stringify({ seq: ++seq, type: 'request', command, arguments: args }) + '\n')

    const timer = setTimeout(() => {
      srv.kill()
      reject(new Error('tsserver did not answer within 20s'))
    }, 20_000)

    let buf = ''
    srv.stdout.on('data', (chunk: Buffer) => {
      buf += chunk.toString()
      for (const line of buf.split('\n')) {
        const t = line.trim()
        if (!t.startsWith('{')) continue
        let msg: { command?: string; body?: unknown[] }
        try {
          msg = JSON.parse(t)
        } catch {
          continue
        }
        if (msg.command === 'semanticDiagnosticsSync') {
          clearTimeout(timer)
          srv.kill()
          const body = (msg.body ?? []) as { code: number; source?: string; text?: string; message?: string }[]
          resolve(
            body.map((d) => ({
              code: d.code,
              source: d.source,
              text: typeof d.text === 'string' ? d.text : String(d.message ?? ''),
            })),
          )
          return
        }
      }
    })

    const abs = path.resolve(projectDir, file)
    send('open', { file: abs })
    setTimeout(() => send('semanticDiagnosticsSync', { file: abs }), 800)
  })
}

let dir: string
beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scripttype-plugin-'))
  // Link the package in rather than installing a tarball: this test is about plugin
  // discovery and loading, and a symlinked node_modules exercises the same resolver in a
  // fraction of the time.
  const nm = path.join(dir, 'node_modules')
  fs.mkdirSync(nm, { recursive: true })
  fs.symlinkSync(PKG, path.join(nm, 'scripttype'), 'dir')
  fs.symlinkSync(path.join(PKG, 'node_modules', 'typescript'), path.join(nm, 'typescript'), 'dir')

  fs.copyFileSync(path.join(PKG, 'src', 'scripttype.d.ts'), path.join(dir, 'scripttype.d.ts'))
  fs.writeFileSync(
    path.join(dir, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        lib: ['ES2022'],
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        strict: true,
        noImplicitAny: false,
        noEmit: true,
        plugins: [{ name: 'scripttype/ts-plugin' }],
      },
      include: ['**/*.st.ts', 'scripttype.d.ts'],
    }),
  )
}, 120_000)

afterAll(() => {
  if (dir) fs.rmSync(dir, { recursive: true, force: true })
})

const check = async (source: string): Promise<Diag[]> => {
  fs.writeFileSync(path.join(dir, 't.st.ts'), source)
  return diagnose(dir, 't.st.ts')
}

describe('editor diagnostics', () => {
  it('reports a ScriptType error tsc alone cannot see', async () => {
    // Compound assignment is perfectly valid TypeScript, so without the plugin the editor
    // shows nothing and the mistake survives until someone runs the CLI.
    const diags = await check('export function F(t: string) {\n  let x = 1\n  x += 2\n  return x\n}\n')
    const ours = diags.filter((d) => d.source === 'scripttype')
    expect(ours).toHaveLength(1)
    expect(ours[0]!.text).toContain('[ST1101]')
    expect(ours[0]!.text).toContain('help:')
  }, 60_000)

  it('covers the statement-shape errors, not just the ones that are also TS errors', async () => {
    const cases: [string, string][] = [
      ['ST1003', 'export function F(t: string) {\n  if (extendsType<"x">(t)) { return 1 }\n}\n'],
      ['ST1100', 'export function F(t: string) {\n  try { return t } catch { return t }\n}\n'],
      ['ST1004', 'export function F(t: string) {\n  return\n}\n'],
    ]
    for (const [code, src] of cases) {
      const diags = await check(src)
      expect(diags.some((d) => d.source === 'scripttype' && d.text.includes(code)), code).toBe(true)
    }
  }, 120_000)

  it('says nothing about a correct file', async () => {
    // A plugin that cries wolf is worse than no plugin.
    const diags = await check('export function F(s: string) {\n  return upper(s)\n}\n')
    expect(diags).toEqual([])
  }, 60_000)

  it('leaves non-ScriptType files alone', async () => {
    fs.writeFileSync(path.join(dir, 'plain.ts'), 'export const x: number = 1\n')
    expect(await diagnose(dir, 'plain.ts')).toEqual([])
  }, 60_000)

  it('keeps TypeScript diagnostics alongside its own', async () => {
    // The plugin adds; it must never replace. A typo is caught by tsc's own resolution.
    const diags = await check('export function F(s: string) {\n  return uppercse(s)\n}\n')
    expect(diags.some((d) => d.source !== 'scripttype' && d.text.includes('uppercse'))).toBe(true)
  }, 60_000)
})

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

/**
 * A single long-lived tsserver, shared by every test in this file.
 *
 * Spawning one per request was both slow and racy: under the parallel suite the project
 * and its plugins were sometimes not loaded by the time the first reply came back, and
 * the symptom was an empty result rather than a timeout — so it read as a broken feature
 * instead of a race. One warm server removes the race and the twelve process spawns.
 *
 * Replies are matched by `request_seq`, which is the protocol's own correlation id;
 * matching on `command` alone cannot tell one caller's reply from another's.
 */
class TsServer {
  private proc: ReturnType<typeof spawn>
  private seq = 0
  private buf = ''
  private waiting = new Map<number, (body: unknown) => void>()

  constructor(cwd: string) {
    this.proc = spawn(
      'node',
      [TSSERVER, '--disableAutomaticTypingAcquisition', '--allowLocalPluginLoads'],
      { cwd, stdio: ['pipe', 'pipe', 'pipe'] },
    )
    this.proc.stdout!.on('data', (chunk: Buffer) => {
      this.buf += chunk.toString()
      const lines = this.buf.split('\n')
      this.buf = lines.pop() ?? ''
      for (const line of lines) {
        const t = line.trim()
        if (!t.startsWith('{')) continue
        let msg: { type?: string; request_seq?: number; body?: unknown }
        try {
          msg = JSON.parse(t)
        } catch {
          continue
        }
        if (msg.type !== 'response' || msg.request_seq === undefined) continue
        const resolve = this.waiting.get(msg.request_seq)
        if (resolve) {
          this.waiting.delete(msg.request_seq)
          resolve(msg.body)
        }
      }
    })
  }

  request<T>(command: string, args: unknown): Promise<T> {
    const seq = ++this.seq
    this.proc.stdin!.write(JSON.stringify({ seq, type: 'request', command, arguments: args }) + '\n')
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.waiting.delete(seq)
        reject(new Error(`tsserver did not answer '${command}' within 30s`))
      }, 30_000)
      this.waiting.set(seq, (body) => {
        clearTimeout(timer)
        resolve(body as T)
      })
    })
  }

  /**
   * Open a file and wait for one full analysis, so plugins are loaded before we ask.
   *
   * Closes first: these tests rewrite the same path between cases, and tsserver serves an
   * already-open file from its own buffer, so re-opening without closing would silently
   * analyse the previous contents.
   */
  async open(abs: string): Promise<void> {
    const notify = (command: string, args: unknown) =>
      this.proc.stdin!.write(
        JSON.stringify({ seq: ++this.seq, type: 'request', command, arguments: args }) + '\n',
      )
    notify('close', { file: abs })
    // Send the text rather than letting tsserver read the path. These tests rewrite the
    // same file between cases, and an open file is served from tsserver's own buffer —
    // which produced the previous case's diagnostics for the current case's source.
    notify('open', { file: abs, fileContent: fs.readFileSync(abs, 'utf8') })
    await this.request('semanticDiagnosticsSync', { file: abs })
  }

  stop(): void {
    this.proc.kill()
  }
}

let server: TsServer

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
  server = new TsServer(dir)
}, 120_000)

afterAll(() => {
  server?.stop()
  if (dir) fs.rmSync(dir, { recursive: true, force: true })
})

const diagnose = async (projectDir: string, file: string): Promise<Diag[]> => {
  const abs = path.resolve(projectDir, file)
  await server.open(abs)
  const body = await server.request<{ code: number; source?: string; text?: string }[]>(
    'semanticDiagnosticsSync', { file: abs },
  )
  return (body ?? []).map((d) => ({ code: d.code, source: d.source, text: String(d.text ?? '') }))
}

const check = async (source: string): Promise<Diag[]> => {
  fs.writeFileSync(path.join(dir, 't.st.ts'), source)
  return diagnose(dir, 't.st.ts')
}

const quickInfo = async (
  projectDir: string, file: string, line: number, offset: number,
): Promise<string> => {
  const abs = path.resolve(projectDir, file)
  await server.open(abs)
  const body = await server.request<{ documentation?: unknown }>('quickinfo', {
    file: abs, line, offset,
  })
  const doc = body?.documentation
  return typeof doc === 'string' ? doc : JSON.stringify(doc ?? '')
}

const codeFixes = async (
  projectDir: string, file: string, line: number,
  startOffset: number, endOffset: number, errorCode: number,
): Promise<{ description: string; newText: string }[]> => {
  const abs = path.resolve(projectDir, file)
  await server.open(abs)
  const body = await server.request<
    { description: string; changes: { textChanges: { newText: string }[] }[] }[]
  >('getCodeFixes', {
    file: abs, startLine: line, startOffset, endLine: line, endOffset, errorCodes: [errorCode],
  })
  return (body ?? []).map((f) => ({
    description: f.description,
    newText: f.changes.flatMap((c) => c.textChanges.map((t) => t.newText)).join(''),
  }))
}

describe('hover', () => {
  it('shows the TypeScript a function compiles to', async () => {
    // The compiled type is what you actually care about and it lives in another file.
    // Showing it on hover is the one thing here that hand-written types cannot do.
    fs.writeFileSync(
      path.join(dir, 'h.st.ts'),
      [
        'export function Split(input: string, sep: string) {',
        '  const out: string[] = []',
        '  let rest = input',
        '  while (includes(rest, sep)) {',
        '    const [head, tail] = splitOnce(rest, sep)',
        '    out.push(head)',
        '    rest = tail',
        '  }',
        '  out.push(rest)',
        '  return out',
        '}',
      ].join('\n') + '\n',
    )
    const doc = await quickInfo(dir, 'h.st.ts', 1, 17)
    expect(doc).toContain('compiles to:')
    expect(doc).toContain('export type Split<Input extends string, Sep extends string>')
    // The generated helper is where a recovered loop actually lives, so it is shown too.
    expect(doc).toContain('Split__loop')
  }, 60_000)

  it('adds nothing when hovering outside a function', async () => {
    fs.writeFileSync(path.join(dir, 'h2.st.ts'), '\nexport function G(t: unknown) { return t }\n')
    const doc = await quickInfo(dir, 'h2.st.ts', 1, 1)
    expect(doc).not.toContain('compiles to:')
  }, 60_000)

  it('leaves hovers in ordinary TypeScript files untouched', async () => {
    fs.writeFileSync(path.join(dir, 'plain2.ts'), 'export const value: number = 1\n')
    const doc = await quickInfo(dir, 'plain2.ts', 1, 14)
    expect(doc).not.toContain('compiles to:')
  }, 60_000)
})

describe('quick fixes', () => {
  it('rewrites compound assignment to the long form', async () => {
    fs.writeFileSync(
      path.join(dir, 'f1.st.ts'),
      'export function F(t: string) {\n  let x = 1\n  x += 2\n  return x\n}\n',
    )
    const fixes = await codeFixes(dir, 'f1.st.ts', 3, 3, 9, 951101)
    expect(fixes).toHaveLength(1)
    expect(fixes[0]!.newText).toBe('x = x + 2')
  }, 60_000)

  it('deletes a statement with no type-level meaning', async () => {
    fs.writeFileSync(
      path.join(dir, 'f2.st.ts'),
      'export function F(t: string) {\n  console.log(t)\n  return t\n}\n',
    )
    const fixes = await codeFixes(dir, 'f2.st.ts', 2, 3, 10, 951102)
    expect(fixes[0]?.description).toBe('Delete this statement')
    expect(fixes[0]?.newText).toBe('')
  }, 60_000)

  it('turns a bare return into `return never`', async () => {
    fs.writeFileSync(path.join(dir, 'f3.st.ts'), 'export function F(t: string) {\n  return\n}\n')
    const fixes = await codeFixes(dir, 'f3.st.ts', 2, 3, 9, 951004)
    expect(fixes[0]?.newText).toBe('return never')
  }, 60_000)

  it('offers nothing for a diagnostic with no single right answer', async () => {
    // A fix that guesses is worse than none, so `try`/`catch` gets the help text only.
    fs.writeFileSync(
      path.join(dir, 'f4.st.ts'),
      'export function F(t: string) {\n  try { return t } catch { return t }\n}\n',
    )
    const fixes = await codeFixes(dir, 'f4.st.ts', 2, 3, 6, 951100)
    expect(fixes.filter((f) => f.description.startsWith('Rewrite') || f.description.startsWith('Delete'))).toEqual([])
  }, 60_000)
})

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

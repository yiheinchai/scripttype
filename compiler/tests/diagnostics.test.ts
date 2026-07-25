import { describe, expect, it } from 'vitest'
import {
  CATALOGUE,
  allCodes,
  didYouMean,
  editDistance,
  explain,
  formatDiagnostic,
} from '../src/diagnostics.js'

describe('rendering', () => {
  const text = ['export function F(t: string) {', '  console.log(t)', '  return t', '}'].join('\n')

  it('draws a source frame with a caret under the span', () => {
    const out = formatDiagnostic(
      {
        code: 'ST1102',
        message: "'console' is a runtime value and has no type-level meaning",
        file: 'f.st.ts',
        start: text.indexOf('console'),
        length: 'console'.length,
        help: 'Delete the statement.',
      },
      { text, color: false, context: 1 },
    )
    expect(out.split('\n')).toEqual([
      "error[ST1102]: 'console' is a runtime value and has no type-level meaning",
      '  --> f.st.ts:2:3',
      '  |',
      '1 | export function F(t: string) {',
      '2 |   console.log(t)',
      '  |   ^^^^^^^',
      '3 |   return t',
      '  |',
      'help: Delete the statement.',
      '      run `scripttype explain ST1102` for a worked example',
    ])
  })

  it('clamps the caret to the line it starts on', () => {
    // A span covering a whole function would otherwise underline hundreds of
    // characters and wrap the terminal.
    const out = formatDiagnostic(
      { code: 'ST1003', message: 'no return', file: 'f.st.ts', start: 0, length: text.length },
      { text, color: false },
    )
    const caret = out.split('\n').find((l) => l.includes('^'))!
    expect(caret.replace(/[^^]/g, '').length).toBe('export function F(t: string) {'.length)
  })

  it('omits the frame when there is no source text', () => {
    const out = formatDiagnostic({ code: 'ST1003', message: 'no return', file: 'f.st.ts' }, { color: false })
    expect(out).toContain('error[ST1003]: no return')
    expect(out).not.toContain('|')
  })

  it('renders a warning as a warning', () => {
    const out = formatDiagnostic({ code: 'TS2307', message: 'nope', severity: 'warning' }, { color: false })
    expect(out.startsWith('warning[TS2307]')).toBe(true)
  })

  it('emits no escape codes when colour is off, and some when on', () => {
    const plain = formatDiagnostic({ code: 'ST1003', message: 'x' }, { color: false })
    const painted = formatDiagnostic({ code: 'ST1003', message: 'x' }, { color: true })
    expect(plain).not.toMatch(/\x1b\[/)
    expect(painted).toMatch(/\x1b\[/)
  })
})

describe('catalogue', () => {
  it('gives every code both a help line and a worked explanation', () => {
    for (const code of allCodes()) {
      const spec = CATALOGUE[code as keyof typeof CATALOGUE]
      expect(spec.help, `${code} help`).toBeTruthy()
      expect(spec.explain.length, `${code} explain`).toBeGreaterThan(40)
    }
  })

  it('explains a known code and refuses an unknown one', () => {
    expect(explain('ST1102', false)).toContain('There is no global object')
    expect(explain('st1102', false)).toBeTruthy() // case-insensitive
    expect(explain('ST9999', false)).toBeUndefined()
  })
})

describe('didYouMean', () => {
  it('finds a one-character typo', () => {
    expect(didYouMean('startWith', ['startsWith', 'endsWith'])).toBe('startsWith')
  })

  it('always catches a pure case difference', () => {
    // The most common typo of all, and one that edit distance alone would miss on a
    // long name.
    expect(didYouMean('uppercase', ['toUpperCase', 'Uppercase'])).toBe('Uppercase')
  })

  it('stays silent when nothing is close', () => {
    expect(didYouMean('frobnicate', ['startsWith', 'endsWith'])).toBeUndefined()
  })

  it('is stricter about short names, where everything looks close', () => {
    expect(didYouMean('abc', ['xyz'])).toBeUndefined()
    expect(didYouMean('abc', ['abd'])).toBe('abd')
  })

  it('never suggests the name itself', () => {
    expect(didYouMean('keyof', ['keyof'])).toBeUndefined()
  })

  it('measures edit distance correctly', () => {
    expect(editDistance('', 'abc')).toBe(3)
    expect(editDistance('abc', '')).toBe(3)
    expect(editDistance('kitten', 'sitting')).toBe(3)
    expect(editDistance('same', 'same')).toBe(0)
  })
})

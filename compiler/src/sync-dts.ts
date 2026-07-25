#!/usr/bin/env tsx
/**
 * Copy each builtin's documentation into `scripttype.d.ts` as JSDoc.
 *
 * The declarations are what the editor reads, so without this, hovering `splitOnce` shows
 * `function splitOnce(...a: any[]): any` — true and useless. The description already
 * exists on `BUILTINS[name].doc`; it just was not where anyone could see it. With it in
 * place, completion and hover explain the builtin surface in the editor, which is where
 * discovery should happen rather than in a separate CLI command.
 *
 * Kept in sync by generation rather than by hand: `tests/dts.test.ts` fails if running
 * this would change the file, so a new builtin cannot ship undocumented.
 *
 * Usage: tsx src/sync-dts.ts [--check]
 */
import fs from 'node:fs'
import path from 'node:path'
import { BUILTINS } from './builtins.js'

const DTS = path.resolve(import.meta.dirname, 'scripttype.d.ts')

/** A JSDoc line we generated, as opposed to prose someone wrote by hand. */
const GENERATED = /^\/\*\* .* \*\/$/

export function syncDts(source: string): string {
  const lines = source.split('\n')
  const out: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    const m = /^declare function (\w+)\(/.exec(line)
    const doc = m ? BUILTINS[m[1]!]?.doc : undefined

    if (!doc) {
      out.push(line)
      continue
    }
    // Drop a previously generated one-liner so re-running is idempotent. A hand-written
    // multi-line JSDoc is left alone — those carry design notes worth more than the
    // one-line summary.
    if (out.length && GENERATED.test(out[out.length - 1]!)) out.pop()
    const prev = out[out.length - 1]
    if (prev?.trimEnd().endsWith('*/')) {
      out.push(line) // hand-written block comment above: leave it be
      continue
    }
    out.push(`/** ${doc.replace(/\*\//g, '* /')} */`, line)
  }
  return out.join('\n')
}

function main(): number {
  const before = fs.readFileSync(DTS, 'utf8')
  const after = syncDts(before)
  const check = process.argv.includes('--check')

  if (before === after) {
    console.log('scripttype.d.ts: builtin docs are in sync')
    return 0
  }
  if (check) {
    console.error('scripttype.d.ts is out of sync with BUILTINS — run `pnpm sync-dts`')
    return 1
  }
  fs.writeFileSync(DTS, after)
  const added = after.split('\n').length - before.split('\n').length
  console.log(`scripttype.d.ts: updated (${added >= 0 ? '+' : ''}${added} lines)`)
  return 0
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  process.exit(main())
}

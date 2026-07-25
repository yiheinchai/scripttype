#!/usr/bin/env node
/**
 * `scripttype` executable.
 *
 * Prefers the compiled `dist/`, which is what an installed copy ships and what makes
 * startup plain-node fast. Falls back to registering tsx and loading `src/` directly, so
 * a clone with no build step still works — that fallback is a development convenience,
 * not something an installed package should ever need.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const built = path.join(here, '..', 'dist', 'cli.js')
const source = path.join(here, '..', 'src', 'cli.ts')

// Source wins when it is present. An installed copy ships only `src/scripttype.d.ts`, so
// this is exactly the development case — and there, preferring a build would mean a stale
// `dist/` silently shadowing the code being edited, which is a genuinely confusing bug to
// chase. Installed copies have no `src/cli.ts` and take the fast plain-node path below.
let cli
if (!fs.existsSync(source) && fs.existsSync(built)) {
  cli = await import(pathToFileURL(built).href)
} else {
  let register
  try {
    ;({ register } = await import('tsx/esm/api'))
  } catch {
    process.stderr.write(
      'scripttype: no build found and tsx is unavailable.\n' +
        'Run `pnpm install && pnpm build` in the compiler directory.\n',
    )
    process.exit(2)
  }
  register()
  cli = await import(pathToFileURL(source).href)
}

cli.run(process.argv.slice(2))

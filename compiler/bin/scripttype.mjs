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

let cli
if (fs.existsSync(built)) {
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
  cli = await import(pathToFileURL(path.join(here, '..', 'src', 'cli.ts')).href)
}

cli.run(process.argv.slice(2))

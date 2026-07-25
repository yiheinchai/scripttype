#!/usr/bin/env node
/**
 * `scripttype` executable.
 *
 * The compiler is TypeScript and there is no build step, so this shim registers tsx's
 * ESM loader and then imports the CLI. Registering in-process rather than spawning tsx
 * as a subprocess keeps startup around 0.6s instead of doubling it.
 */
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

let register
try {
  ;({ register } = await import('tsx/esm/api'))
} catch {
  process.stderr.write(
    "scripttype: cannot find 'tsx'. Run `pnpm install` in the compiler directory first.\n",
  )
  process.exit(2)
}

register()

const here = path.dirname(fileURLToPath(import.meta.url))
const cli = await import(pathToFileURL(path.join(here, '..', 'src', 'cli.ts')).href)
cli.run(process.argv.slice(2))

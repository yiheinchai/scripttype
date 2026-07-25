/**
 * `scripttype.json` — project configuration.
 *
 * Without it a real project repeats `--out generated --width 100` in every npm script and
 * every CI step, and the two drift. The file is deliberately small: four settings, all of
 * which a project wants to fix once. Anything genuinely per-invocation stays a flag.
 *
 * Discovery walks up from the working directory the way `tsconfig.json` does, so running
 * the CLI from a subdirectory finds the project's config rather than silently using
 * defaults — silently using defaults is the failure mode that makes config files
 * untrustworthy.
 *
 * A malformed config is a hard error, never a shrug back to defaults. Getting the wrong
 * `outDir` because a key was misspelled is worse than being told the key is wrong.
 */
import fs from 'node:fs'
import path from 'node:path'
import { didYouMean } from './diagnostics.js'

export interface Config {
  /** Files or directories to compile when none are named on the command line. */
  include?: string[]
  /** Where compiled TypeScript goes. Relative to the config file, not the cwd. */
  outDir?: string
  /** Column to wrap emitted declarations at. */
  width?: number
  /** Typecheck the ScriptType source against the builtin surface. Default true. */
  checkSource?: boolean
}

/** A config plus where it came from, so errors and relative paths can be resolved. */
export interface LoadedConfig {
  config: Config
  /** Absolute path of the file, or undefined when no config was found. */
  path?: string
  /** Directory the config's relative paths resolve against. */
  dir: string
}

export const CONFIG_NAME = 'scripttype.json'

const KEYS = ['include', 'outDir', 'width', 'checkSource'] as const

/** Thrown for a config that exists but cannot be used. The CLI renders it as an error. */
export class ConfigError extends Error {}

/**
 * Find the nearest `scripttype.json`, walking up from `from`.
 *
 * Stops at a directory containing `package.json` *after* checking it, so a monorepo
 * package does not accidentally inherit the repository root's config.
 */
export function findConfig(from: string): string | undefined {
  let dir = path.resolve(from)
  for (;;) {
    const candidate = path.join(dir, CONFIG_NAME)
    if (fs.existsSync(candidate)) return candidate
    if (fs.existsSync(path.join(dir, 'package.json'))) return undefined
    const parent = path.dirname(dir)
    if (parent === dir) return undefined
    dir = parent
  }
}

/**
 * Load and validate a config.
 *
 * `explicit` is a path the user named with `--config`; a missing file there is an error,
 * whereas a missing discovered file simply means "no config".
 */
export function loadConfig(cwd: string, explicit?: string): LoadedConfig {
  const file = explicit ? path.resolve(cwd, explicit) : findConfig(cwd)
  if (!file) return { config: {}, dir: path.resolve(cwd) }
  if (!fs.existsSync(file)) throw new ConfigError(`config file not found: ${file}`)

  let raw: unknown
  const text = fs.readFileSync(file, 'utf8')
  try {
    raw = JSON.parse(text)
  } catch (e) {
    throw new ConfigError(`${file} is not valid JSON: ${(e as Error).message}`)
  }
  return { config: validate(raw, file), path: file, dir: path.dirname(file) }
}

function validate(raw: unknown, file: string): Config {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new ConfigError(`${file} must contain a JSON object`)
  }
  const out: Config = {}
  for (const [key, value] of Object.entries(raw)) {
    // A misspelled key that is silently ignored is the whole reason people distrust
    // config files, so it is an error with a suggestion.
    if (!(KEYS as readonly string[]).includes(key)) {
      const near = didYouMean(key, KEYS as readonly string[])
      throw new ConfigError(
        `${file}: unknown setting '${key}'` +
          (near ? `. Did you mean '${near}'?` : `. Known settings: ${KEYS.join(', ')}.`),
      )
    }
    const bad = (want: string) =>
      new ConfigError(`${file}: '${key}' must be ${want}, got ${describe(value)}`)

    switch (key as (typeof KEYS)[number]) {
      case 'include':
        if (!Array.isArray(value) || value.some((v) => typeof v !== 'string')) {
          throw bad('an array of strings')
        }
        out.include = value as string[]
        break
      case 'outDir':
        if (typeof value !== 'string') throw bad('a string')
        out.outDir = value
        break
      case 'width':
        if (typeof value !== 'number' || !Number.isFinite(value) || value < 20) {
          throw bad('a number of at least 20')
        }
        out.width = value
        break
      case 'checkSource':
        if (typeof value !== 'boolean') throw bad('true or false')
        out.checkSource = value
        break
    }
  }
  return out
}

const describe = (v: unknown): string =>
  v === null ? 'null' : Array.isArray(v) ? 'an array' : `a ${typeof v}`

/** The config file `scripttype init` writes. */
export const CONFIG_TEMPLATE = `{
  "include": ["."],
  "outDir": "generated",
  "width": 96,
  "checkSource": true
}
`

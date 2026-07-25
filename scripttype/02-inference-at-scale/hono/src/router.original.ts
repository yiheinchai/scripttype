/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/router.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ParamIndexMap = Record<string, number>

export type ParamStash = string[]

export type Params = Record<string, string>

export type Result<T> = [[T, ParamIndexMap][], ParamStash] | [[T, Params][]]

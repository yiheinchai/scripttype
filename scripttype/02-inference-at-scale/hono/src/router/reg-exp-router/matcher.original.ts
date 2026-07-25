/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/router/reg-exp-router/matcher.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ParamIndexMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HandlerData<T> = [T, ParamIndexMap][]

export type StaticMap<T> = Record<string, Result<T>>

export type Matcher<T> = [RegExp, HandlerData<T>[], StaticMap<T>]

export type MatcherMap<T> = Record<string, Matcher<T> | null>

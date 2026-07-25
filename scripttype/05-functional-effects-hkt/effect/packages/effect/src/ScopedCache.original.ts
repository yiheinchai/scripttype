/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/ScopedCache.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Deferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutableHashMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Scope<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Entry<A, E> {
  expiresAt: number | undefined
  readonly deferred: Deferred.Deferred<A, E>
  readonly scope: Scope.Closeable
}

export type State<K, A, E> = {
  readonly _tag: "Open"
  readonly map: MutableHashMap.MutableHashMap<K, Entry<A, E>>
} | {
  readonly _tag: "Closed"
}

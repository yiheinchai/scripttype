/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/PubSub.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Deferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutableList<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface BackingSubscription<out A> {
    isEmpty(): boolean
    size(): number
    poll(): A | MutableList.Empty
    pollUpTo(n: number): Array<A>
    unsubscribe(): void
  }

export type Subscribers<A> = Map<
    BackingSubscription<A>,
    Set<MutableList.MutableList<Deferred.Deferred<A>>>
  >

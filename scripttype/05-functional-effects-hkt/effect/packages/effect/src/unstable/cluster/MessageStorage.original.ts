/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cluster/MessageStorage.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Option<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Rpc<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SaveResult<R extends Rpc.Any> = SaveResult.Success | SaveResult.Duplicate<R>

export type EncodedUnprocessedOptions<A> = {
  readonly existingShards: Array<number>
  readonly newShards: Array<number>
  readonly cursor: Option.Option<A>
}

export type EncodedRepliesOptions<A> = {
  readonly existingRequests: Array<string>
  readonly newRequests: Array<string>
  readonly cursor: Option.Option<A>
}

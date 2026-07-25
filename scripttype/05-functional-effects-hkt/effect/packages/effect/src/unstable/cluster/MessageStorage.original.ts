/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cluster/MessageStorage.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Option<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Rpc<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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

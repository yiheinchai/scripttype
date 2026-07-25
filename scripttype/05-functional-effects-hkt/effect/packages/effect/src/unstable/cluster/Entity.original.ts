/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cluster/Entity.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cause<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Queue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Request<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Stream<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HandlersFrom<Rpc extends Rpc.Any> = {
  readonly [Current in Rpc as Current["_tag"]]: (
    envelope: Request<Current>
  ) => Rpc.WrapperOr<Rpc.ResultFrom<Current, any>>
}

export type Success<R extends Rpc.Any> = Rpc.Success<R> extends Stream.Stream<infer _A, infer _E, infer _R> ?
    Stream.Stream<_A, _E | Rpc.Error<R>, _R> | Queue.Dequeue<_A, _E | Rpc.Error<R> | Cause.Done>
    : Rpc.Success<R>

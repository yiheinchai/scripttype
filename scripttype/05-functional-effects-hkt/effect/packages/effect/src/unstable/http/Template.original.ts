/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/http/Template.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Option<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Stream<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Context<A> = A extends infer T ? T extends Option.Option<infer _> ? never
    : T extends Effect.Effect<infer _A, infer _E, infer R> ? R
    : T extends Stream.Stream<infer _A, infer _E, infer R> ? R
    : never
    : never

export type Error<A> = A extends infer T ? T extends Option.Option<infer _> ? never
    : T extends Stream.Stream<infer _A, infer E, infer _R> ? E
    : T extends Effect.Effect<infer _A, infer E, infer _R> ? E
    : never
    : never

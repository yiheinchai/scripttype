/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/fp-ts/src/ValidationT.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Either<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Kind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Kind2<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type URIS<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type URIS2<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ValidationT1<M extends URIS, E, A> = Kind<M, Either<E, A>>

export type ValidationT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>

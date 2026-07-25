/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/fp-ts/src/TheseT.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Kind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Kind2<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type These<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type URIS<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type URIS2<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TheseT1<M extends URIS, E, A> = Kind<M, These<E, A>>

export type TheseT2<M extends URIS2, R, E, A> = Kind2<M, R, These<E, A>>

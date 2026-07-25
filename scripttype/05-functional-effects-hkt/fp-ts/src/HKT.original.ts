/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/fp-ts/src/HKT.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface URItoKind<A> {}

export type URIS = keyof URItoKind<any>

export type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any

export interface URItoKind2<E, A> {}

export type URIS2 = keyof URItoKind2<any, any>

export type Kind2<URI extends URIS2, E, A> = URI extends URIS2 ? URItoKind2<E, A>[URI] : any

export interface URItoKind3<R, E, A> {}

export type URIS3 = keyof URItoKind3<any, any, any>

export type Kind3<URI extends URIS3, R, E, A> = URI extends URIS3 ? URItoKind3<R, E, A>[URI] : any

export interface URItoKind4<S, R, E, A> {}

export type URIS4 = keyof URItoKind4<any, any, any, any>

export type Kind4<URI extends URIS4, S, R, E, A> = URI extends URIS4 ? URItoKind4<S, R, E, A>[URI] : any

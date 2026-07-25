/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/LayerMap.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Duration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Layer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IdleTimeToLiveInput<K> = Duration.Input | ((key: K) => Duration.Input)

export type Key<Options> = Options extends { readonly lookup: (key: infer K) => any } ? K
    : Options extends { readonly layers: infer Layers } ? keyof Layers
    : never

export type Layers<Options> = Options extends { readonly lookup: (key: infer _K) => infer Layers } ? Layers
    : Options extends { readonly layers: infer Layers } ? Layers[keyof Layers]
    : never

export type Success<Options> = Layers<Options> extends Layer.Layer<infer _A, infer _E, infer _R> ? _A : never

export type Error<Options> = Layers<Options> extends Layer.Layer<infer _A, infer _E, infer _R> ? _E : never

export type Services<Options> = Layers<Options> extends Layer.Layer<infer _A, infer _E, infer _R> ? _R : never

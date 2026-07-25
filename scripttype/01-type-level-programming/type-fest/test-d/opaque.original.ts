/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/opaque.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Opaque<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tagged<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UUID = Opaque<string, 'UUID'>;

export type NormalizedDictionary<T> = Record<UUID, T>;

export type JsonOf<T> = Tagged<string, 'JSON', T>;

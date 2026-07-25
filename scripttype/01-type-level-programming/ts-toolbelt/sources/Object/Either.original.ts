/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Either.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ComputeRaw<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Strict<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type __Either<O extends object, K extends Key> =
    _Omit<O, K> & ({           // Merge all but K
        [P in K]: _Pick<O, P> // With K possibilities
    }[K])

export type EitherStrict<O extends object, K extends Key> =
    Strict<__Either<O, K>>

export type EitherLoose<O extends object, K extends Key> =
    ComputeRaw<__Either<O, K>>

export type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
}[strict]

export type Either<O extends object, K extends Key, strict extends Boolean = 1> =
    O extends unknown
    ? _Either<O, K, strict>
    : never

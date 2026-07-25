/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Either.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OEither<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _ListOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Either<L extends List, K extends Key, strict extends Boolean = 1> =
    OEither<ObjectOf<L>, `${K & number}` | K, strict> extends infer OE
    ? OE extends unknown
      ? _ListOf<OE & {}>
      : never
    : never

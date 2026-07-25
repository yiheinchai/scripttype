/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/P/Update.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LUpdate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OUpdate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tail<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UpdateAt<O, Path extends List<Key>, A> =
  O extends BuiltIn ? O :
  Path extends [Key]
  ? O extends List   ? LUpdate<O, Path[0], A> :
    O extends object ? OUpdate<O, Path[0], A> :
    O
  : {
      [K in keyof O]: K extends Path[0]
      ? UpdateAt<O[K], Tail<Path>, A>
      : O[K]
    }

export type Update<O extends object, Path extends List<Key>, A extends any> =
    Path extends unknown
    ? UpdateAt<O, Path, A>
    : never

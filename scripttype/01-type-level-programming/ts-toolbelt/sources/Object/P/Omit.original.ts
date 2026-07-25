/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/P/Omit.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tail<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _LOmit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _OOmit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OmitAt<O, Path extends List<Key>> =
  O extends BuiltIn ? O :
  Path extends [Key]
  ? O extends List   ? _LOmit<O, Path[0]> :
    O extends object ? _OOmit<O, Path[0]> :
    O
  : {
      [K in keyof O]: K extends Path[0]
      ? OmitAt<O[K], Tail<Path>>
      : O[K]
    }

export type Omit<O extends object, Path extends List<Key>> =
  Path extends unknown
  ? OmitAt<O, Path>
  : never

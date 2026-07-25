/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/P/Merge.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OMerge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tail<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MergeAt<O, Path extends List<Key>, O1, depth extends Depth> =
  O extends BuiltIn ? O :
  Path extends []
  ? O extends List   ? OMerge<O, O1 & {}, depth> :
    O extends object ? OMerge<O, O1 & {}, depth> :
    O
  : {
      [K in keyof O]: K extends Path[0]
      ? MergeAt<O[K], Tail<Path>, O1, depth>
      : O[K]
    }

export type Merge<O extends object, Path extends List<Key>, O1 extends object, depth extends Depth = 'flat'> =
  Path extends unknown
  ? MergeAt<O, Path, O1, depth>
  : never

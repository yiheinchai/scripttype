/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/P/Pick.ts, for comparison with the ScriptType alongside.
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
type _ListOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _OPick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PickAt<O, Path extends List<Key>> =
    [] extends Path ? O :
    O extends BuiltIn ? O :
    O extends List ? _ListOf<{
      [K in keyof _OPick<O, Path[0]>]:
      PickAt<O[K], Tail<Path>>
    }> :
    O extends object ? {
      [K in keyof _OPick<O, Path[0]>]:
      PickAt<O[K], Tail<Path>>
    } : O

export type Pick<O extends object, Path extends List<Key>> =
  Path extends unknown
  ? PickAt<O, Path>
  : never

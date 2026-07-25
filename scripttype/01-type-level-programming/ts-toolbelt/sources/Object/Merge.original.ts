/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Merge.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Anyfy<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type At<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Has<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _OptionalKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Longer<L extends List, L1 extends List> =
  L extends unknown ? L1 extends unknown ?
  {0: 0, 1: 1}[Has<RequiredKeys<L>, RequiredKeys<L1>>]
  : never : never

export type MergeProp<OK, O1K, fill, OOKeys extends Key, K extends Key> =
  K extends OOKeys                // if prop of `O` is optional
  ? Exclude<OK, undefined> | O1K  // merge it with prop of `O1`
  : [OK] extends [never] ? O1K :  // complete with prop of `O1`
    OK extends fill ? O1K : OK

export type MergeFlatObject<O extends object, O1 extends object, fill, OOKeys extends Key = _OptionalKeys<O>> = {
  [K in keyof (Anyfy<O> & O1)]: MergeProp<At<O, K>, At<O1, K>, fill, OOKeys, K>
} & {}

export type MergeFlatChoice<O extends object, O1 extends object, ignore extends object, fill> =
  O extends ignore ? O :
  O1 extends ignore ? O :
  O extends List
  ? O1 extends List
    ? MergeFlatList<O, O1, ignore, fill>
    : MergeFlatObject<O, O1, fill>
  : MergeFlatObject<O, O1, fill>

export type MergeFlatList<L extends List, L1 extends List, ignore extends object, fill, LOK extends Key = _OptionalKeys<L>> =
  number extends Length<L | L1>
  ? MergeFlatChoice<L[number], L1[number], ignore, fill>[]
  : Longer<L, L1> extends 1
    ? {[K in keyof L]: MergeProp<L[K], At<L1, K>, fill, LOK, K>}
    : {[K in keyof L1]: MergeProp<At<L, K>, L1[K], fill, LOK, K>}

export type MergeFlat<O extends object, O1 extends object, ignore extends object = BuiltIn, fill = undefined> =
  O extends unknown ? O1 extends unknown ?
  MergeFlatChoice<O, O1, ignore, fill>
  : never : never

export type MergeDeepObject<O extends object, O1 extends object, ignore extends object, fill, OOKeys extends Key = _OptionalKeys<O>> = {
  [K in keyof (Anyfy<O> & O1)]: MergeDeepChoice<At<O, K>, At<O1, K>, ignore, fill, OOKeys, K>
}

export type MergeDeepChoice<OK, O1K, ignore extends object, fill, OOKeys extends Key, K extends Key> =
  [OK] extends [never] ? MergeProp<OK, O1K, fill, OOKeys, K> :
  [O1K] extends [never] ? MergeProp<OK, O1K, fill, OOKeys, K> :
  OK extends ignore ? MergeProp<OK, O1K, fill, OOKeys, K> :
  O1K extends ignore ? MergeProp<OK, O1K, fill, OOKeys, K> :
  OK extends List
  ? O1K extends List
    ? MergeDeepList<OK, O1K, ignore, fill>
    : MergeProp<OK, O1K, fill, OOKeys, K>
  : OK extends object
    ? O1K extends object
      ? MergeDeepObject<OK, O1K, ignore, fill>
      : MergeProp<OK, O1K, fill, OOKeys, K>
    : MergeProp<OK, O1K, fill, OOKeys, K>

export type MergeDeepList<L extends List, L1 extends List, ignore extends object, fill> =
  number extends Length<L | L1>
  ? MergeDeepChoice<L[number], L1[number], ignore, fill, never, any>[]
  : Longer<L, L1> extends 1
    ? {[K in keyof L]: MergeDeepChoice<L[K], At<L1, K>, ignore, fill, _OptionalKeys<L>, K>}
    : {[K in keyof L1]: MergeDeepChoice<At<L, K>, L1[K], ignore, fill, _OptionalKeys<L>, K>}

export type MergeDeep<O extends object, O1 extends object, ignore extends object, fill> =
  O extends unknown ? O1 extends unknown ?
  MergeDeepChoice<O, O1, ignore, fill, 'x', 'y'>
  : never : never

export type Merge<O extends object, O1 extends object, depth extends Depth = 'flat', ignore extends object = BuiltIn, fill extends any = undefined> = {
  'flat': MergeFlat<O, O1, ignore, fill>
  'deep': MergeDeep<O, O1, ignore, fill>
}[depth]

/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Patch.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type At<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Has<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Longer<L extends List, L1 extends List> =
  L extends unknown ? L1 extends unknown ?
  {0: 0, 1: 1}[Has<keyof L, keyof L1>]
  : never : never

export type PatchProp<OK, O1K, fill, OKeys extends Key, K extends Key> =
  K extends OKeys
  ? OK extends fill ? O1K : OK
  : O1K

export type PatchFlatObject<O extends object, O1 extends object, fill, OKeys extends Key = keyof O> = {
  [K in keyof (O & _Omit<O1, OKeys>)]: PatchProp<At<O, K>, At<O1, K>, fill, OKeys, K>
} & {}

export type PatchFlatChoice<O extends object, O1 extends object, ignore extends object, fill> =
  O extends ignore ? O :
  O1 extends ignore ? O :
  O extends List
  ? O1 extends List
    ? PatchFlatList<O, O1, ignore, fill>
    : PatchFlatObject<O, O1, fill>
  : PatchFlatObject<O, O1, fill>

export type PatchFlatList<L extends List, L1 extends List, ignore extends object, fill> =
  number extends Length<L | L1>
  ? PatchFlatChoice<L[number], L1[number], ignore, fill>[]
  : Longer<L, L1> extends 1
    ? {[K in keyof L]: PatchProp<L[K], At<L1, K>, fill, keyof L, K>}
    : {[K in keyof L1]: PatchProp<At<L, K>, L1[K], fill, keyof L, K>}

export type PatchFlat<O extends object, O1 extends object, ignore extends object = BuiltIn, fill = never> =
  O extends unknown ? O1 extends unknown ?
  PatchFlatChoice<O, O1, ignore, fill>
  : never : never

export type PatchDeepObject<O extends object, O1 extends object, ignore extends object, fill, OKeys extends Key = keyof O> = {
    [K in keyof (O & _Omit<O1, OKeys>)]: PatchDeepChoice<At<O, K>, At<O1, K>, ignore, fill, OKeys, K>
}

export type PatchDeepChoice<OK, O1K, ignore extends object, fill, OKeys extends Key, K extends Key> =
  [OK] extends [never] ? PatchProp<OK, O1K, fill, OKeys, K> :
  [O1K] extends [never] ? PatchProp<OK, O1K, fill, OKeys, K> :
  OK extends ignore ? PatchProp<OK, O1K, fill, OKeys, K> :
  O1K extends ignore ? PatchProp<OK, O1K, fill, OKeys, K> :
  OK extends List
  ? O1K extends List
    ? PatchDeepList<OK, O1K, ignore, fill>
    : PatchProp<OK, O1K, fill, OKeys, K>
  : OK extends object
    ? O1K extends object
      ? PatchDeepObject<OK, O1K, ignore, fill>
      : PatchProp<OK, O1K, fill, OKeys, K>
    : PatchProp<OK, O1K, fill, OKeys, K>

export type PatchDeepList<L extends List, L1 extends List, ignore extends object, fill> =
  number extends Length<L | L1>
  ? PatchDeepChoice<L[number], L1[number], ignore, fill, never, any>[]
  : Longer<L, L1> extends 1
    ? {[K in keyof L]: PatchDeepChoice<L[K], At<L1, K>, ignore, fill, keyof L, K>}
    : {[K in keyof L1]: PatchDeepChoice<At<L, K>, L1[K], ignore, fill, keyof L, K>}

export type PatchDeep<O extends object, O1 extends object, ignore extends object, fill> =
  O extends unknown ? O1 extends unknown ?
  PatchDeepChoice<O, O1, ignore, fill, 'x', 'y'> // dummy x, y
  : never : never

export type Patch<O extends object, O1 extends object, depth extends Depth = 'flat', ignore extends object = BuiltIn, fill extends any = never> = {
  'flat': PatchFlat<O, O1, ignore, fill>
  'deep': PatchDeep<O, O1, ignore, fill>
}[depth]

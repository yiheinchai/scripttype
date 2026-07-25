/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/evaluate/compare.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtendsResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultDisjoint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultLeftInside<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultRightInside<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TCompare<Left extends TSchema, Right extends TSchema, 
  Extends extends [ExtendsResult.TResult, ExtendsResult.TResult] = [
    Left extends TUnknown ? ExtendsResult.TExtendsFalse : TExtends<{}, Left, Right>,
    Left extends TUnknown ? ExtendsResult.TExtendsTrue : TExtends<{}, Right, Left>,
  ]
> = ( // TCompareResult
  Extends extends [ExtendsResult.TExtendsTrueLike, ExtendsResult.TExtendsTrueLike] ? typeof ResultEqual :
  Extends extends [ExtendsResult.TExtendsTrueLike, ExtendsResult.TExtendsFalse] ? typeof ResultLeftInside :
  Extends extends [ExtendsResult.TExtendsFalse, ExtendsResult.TExtendsTrueLike] ? typeof ResultRightInside :
  typeof ResultDisjoint
)

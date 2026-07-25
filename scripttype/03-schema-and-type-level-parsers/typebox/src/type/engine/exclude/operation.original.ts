/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/exclude/operation.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtendsResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExcludeType<Left extends TSchema, Right extends TSchema,
  Check extends ExtendsResult.TResult = TExtends<{}, Left, Right>,
  Result extends TSchema[] = Check extends ExtendsResult.TExtendsTrueLike ? [] : [Left]
> = Result

export type TExcludeUnion<Left extends TSchema[], Right extends TSchema, Result extends TSchema[] = []> = (
  Left extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
    ? TExcludeUnion<Tail, Right, [...Result, ...TExcludeType<Head, Right>]>
    : Result
)

export type TExcludeOperation<Left extends TSchema, Right extends TSchema,
  Evaluated extends TSchema = TEvaluateType<Left>,
  Canonical extends TSchema[] = Evaluated extends TUnion<infer Types extends TSchema[]> ? Types : [Evaluated],
  Remaining extends TSchema[] = TExcludeUnion<Canonical, Right>,
  Result extends TSchema = TEvaluateUnion<Remaining>
> = Result

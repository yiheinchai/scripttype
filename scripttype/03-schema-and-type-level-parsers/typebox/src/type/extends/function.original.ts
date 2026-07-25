/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/function.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsParameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExtendsFunction<Inferred extends TProperties, Parameters extends TSchema[], ReturnType extends TSchema, Right extends TSchema> = (  
  Right extends TAny ? Result.TExtendsTrue<Inferred> :
  Right extends TUnknown ? Result.TExtendsTrue<Inferred> :
  Right extends TFunction
    ? TExtendsParameters<Inferred, Parameters, Right['parameters']> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
      ? TExtendsReturnType<Inferred, ReturnType, Right['returnType']>
      : Result.TExtendsFalse // 'not-a-parameter-match'
    : Result.TExtendsFalse // 'not-a-function'
)

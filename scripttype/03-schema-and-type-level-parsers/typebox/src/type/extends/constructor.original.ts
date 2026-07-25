/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/constructor.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TConstructor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsParameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExtendsConstructor<Inferred extends TProperties, Parameters extends TSchema[], InstanceType extends TSchema, Right extends TSchema> = (  
  Right extends TAny ? Result.TExtendsTrue<Inferred> :
  Right extends TUnknown ? Result.TExtendsTrue<Inferred> :
  Right extends TConstructor
    ? TExtendsParameters<Inferred, Parameters, Right['parameters']> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
      ? TExtendsReturnType<Inferred, InstanceType, Right['instanceType']>
      : Result.TExtendsFalse // 'not-a-parameter-match'
    : Result.TExtendsFalse // 'not-a-constructor'
)

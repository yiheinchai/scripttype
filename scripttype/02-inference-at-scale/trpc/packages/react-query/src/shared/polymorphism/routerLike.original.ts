/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/shared/polymorphism/routerLike.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyMutationProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyQueryProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RouterLikeInner<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyQueryProcedure
      ? QueryLike<TRoot, $Value>
      : $Value extends AnyMutationProcedure
        ? MutationLike<TRoot, $Value>
        : $Value extends RouterRecord
          ? RouterLikeInner<TRoot, $Value>
          : never
    : never;
};

export type RouterLike<TRouter extends AnyRouter> = RouterLikeInner<
  TRouter['_def']['_config']['$types'],
  TRouter['_def']['record']
>;

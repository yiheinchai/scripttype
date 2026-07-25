/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/clientish/inference.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferrableClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Serialize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferObservableValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type inferTransformedProcedureOutput<
  TInferrable extends InferrableClientTypes,
  TProcedure extends AnyProcedure,
> = inferClientTypes<TInferrable>['transformer'] extends false
  ? Serialize<inferProcedureOutput<TProcedure>>
  : inferProcedureOutput<TProcedure>;

export type inferTransformedSubscriptionOutput<
  TInferrable extends InferrableClientTypes,
  TProcedure extends AnyProcedure,
> = inferClientTypes<TInferrable>['transformer'] extends false
  ? Serialize<inferObservableValue<inferProcedureOutput<TProcedure>>>
  : inferObservableValue<inferProcedureOutput<TProcedure>>;

export type GetInferenceHelpers<
  TType extends 'input' | 'output',
  TRoot extends AnyClientTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyProcedure
      ? TType extends 'input'
        ? inferProcedureInput<$Value>
        : inferTransformedProcedureOutput<TRoot, $Value>
      : $Value extends RouterRecord
        ? GetInferenceHelpers<TType, TRoot, $Value>
        : never
    : never;
};

export type inferRouterInputs<TRouter extends AnyRouter> = GetInferenceHelpers<
  'input',
  TRouter['_def']['_config']['$types'],
  TRouter['_def']['record']
>;

export type inferRouterOutputs<TRouter extends AnyRouter> = GetInferenceHelpers<
  'output',
  TRouter['_def']['_config']['$types'],
  TRouter['_def']['record']
>;

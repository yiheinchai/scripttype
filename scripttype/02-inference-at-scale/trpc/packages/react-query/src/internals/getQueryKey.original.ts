/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/internals/getQueryKey.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DecorateRouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DecoratedMutation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DecoratedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepPartial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GetInfiniteQueryInput<
  TProcedureInput,
  TInputWithoutCursorAndDirection = Omit<
    TProcedureInput,
    'cursor' | 'direction'
  >,
> = keyof TInputWithoutCursorAndDirection extends never
  ? undefined
  : DeepPartial<TInputWithoutCursorAndDirection> | undefined;

export type GetQueryProcedureInput<TProcedureInput> = TProcedureInput extends {
  cursor?: any;
}
  ? GetInfiniteQueryInput<TProcedureInput>
  : DeepPartial<TProcedureInput> | undefined;

export type ProcedureOrRouter =
  | DecoratedMutation<any>
  | DecoratedQuery<any>
  | DecorateRouterRecord<any, any>;

export type QueryType = 'any' | 'infinite' | 'query';

export type GetParams<TProcedureOrRouter extends ProcedureOrRouter> =
  TProcedureOrRouter extends DecoratedQuery<infer $Def>
    ? [input?: GetQueryProcedureInput<$Def['input']>, type?: QueryType]
    : [];

export type QueryKeyKnown<TInput, TType extends Exclude<QueryType, 'any'>> = [
  string[],
  { input?: GetQueryProcedureInput<TInput>; type: TType }?,
];

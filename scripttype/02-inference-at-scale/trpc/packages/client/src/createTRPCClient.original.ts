/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/createTRPCClient.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncGenerator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncIterable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferrableClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProcedureType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCProcedureOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCSubscriptionObserver<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUntypedClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Unsubscribable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TRPCResolverDef = {
  input: any;
  output: any;
  transformer: boolean;
  errorShape: any;
};

export type coerceAsyncGeneratorToIterable<T> =
  T extends AsyncGenerator<infer $T, infer $Return, infer $Next>
    ? AsyncIterable<$T, $Return, $Next>
    : T;

export type Resolver<TDef extends TRPCResolverDef> = (
  input: TDef['input'],
  opts?: TRPCProcedureOptions,
) => Promise<coerceAsyncGeneratorToIterable<TDef['output']>>;

export type SubscriptionResolver<TDef extends TRPCResolverDef> = (
  input: TDef['input'],
  opts: Partial<
    TRPCSubscriptionObserver<TDef['output'], TRPCClientError<TDef>>
  > &
    TRPCProcedureOptions,
) => Unsubscribable;

export type DecorateProcedure<
  TType extends ProcedureType,
  TDef extends TRPCResolverDef,
> = TType extends 'query'
  ? {
      query: Resolver<TDef>;
    }
  : TType extends 'mutation'
    ? {
        mutate: Resolver<TDef>;
      }
    : TType extends 'subscription'
      ? {
          subscribe: SubscriptionResolver<TDef>;
        }
      : never;

export type DecoratedProcedureRecord<
  TRoot extends InferrableClientTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyProcedure
      ? DecorateProcedure<
          $Value['_def']['type'],
          {
            input: inferProcedureInput<$Value>;
            output: inferTransformedProcedureOutput<
              inferClientTypes<TRoot>,
              $Value
            >;
            errorShape: inferClientTypes<TRoot>['errorShape'];
            transformer: inferClientTypes<TRoot>['transformer'];
          }
        >
      : $Value extends RouterRecord
        ? DecoratedProcedureRecord<TRoot, $Value>
        : never
    : never;
};

export type TRPCClient<TRouter extends AnyRouter> = DecoratedProcedureRecord<
  {
    transformer: TRouter['_def']['_config']['$types']['transformer'];
    errorShape: TRouter['_def']['_config']['$types']['errorShape'];
  },
  TRouter['_def']['record']
> & {
  [untypedClientSymbol]: TRPCUntypedClient<TRouter>;
};

export type inferRouterClient<TRouter extends AnyRouter> = TRPCClient<TRouter>;

export type CreateTRPCClient<TRouter extends AnyRouter> = TRPCClient<TRouter>;

/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/next/src/app-dir/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProcedureType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Resolver<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ResolverDef = {
  input: any;
  output: any;
  transformer: boolean;
  errorShape: any;
};

export type DecorateProcedureServer<
  TType extends ProcedureType,
  TDef extends ResolverDef,
> = TType extends 'query'
  ? {
      query: Resolver<TDef>;
      revalidate: (
        input?: TDef['input'],
      ) => Promise<
        { revalidated: false; error: string } | { revalidated: true }
      >;
    }
  : TType extends 'mutation'
    ? {
        mutate: Resolver<TDef>;
      }
    : TType extends 'subscription'
      ? {
          subscribe: Resolver<TDef>;
        }
      : never;

export type NextAppDirDecorateRouterRecord<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyProcedure
      ? DecorateProcedureServer<
          $Value['_def']['type'],
          {
            input: inferProcedureInput<$Value>;
            output: inferTransformedProcedureOutput<TRoot, $Value>;
            errorShape: TRoot['errorShape'];
            transformer: TRoot['transformer'];
          }
        >
      : $Value extends RouterRecord
        ? NextAppDirDecorateRouterRecord<TRoot, $Value>
        : never
    : never;
};

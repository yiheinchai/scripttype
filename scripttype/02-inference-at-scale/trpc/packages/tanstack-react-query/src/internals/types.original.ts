/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/tanstack-react-query/src/internals/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type WithRequired<TObj, TKey extends keyof TObj> = TObj & {
  [P in TKey]-?: TObj[P];
};

export type CursorInput = { cursor?: any };

export type ExtractCursorType<TInput> = TInput extends CursorInput
  ? TInput['cursor']
  : unknown;

export type TRPCInfiniteData<TInput, TOutput> = InfiniteData<
  TOutput,
  NonNullable<ExtractCursorType<TInput>> | null
>;

export type QueryType = 'any' | 'infinite' | 'query';

export type TRPCQueryKeyWithoutPrefix = [
  path: string[],
  opts?: { input?: unknown; type?: Exclude<QueryType, 'any'> },
];

export type TRPCQueryKeyWithPrefix = [
  prefix: string[],
  ...TRPCQueryKeyWithoutPrefix,
];

export type TRPCQueryKey<TPrefixEnabled extends boolean = false> =
  TPrefixEnabled extends true
    ? TRPCQueryKeyWithPrefix
    : TRPCQueryKeyWithoutPrefix;

export type TRPCMutationKeyWithoutPrefix = [path: string[]];

export type TRPCMutationKeyWithPrefix = [
  prefix: string[],
  ...TRPCMutationKeyWithoutPrefix,
];

export type TRPCMutationKey<TPrefixEnabled extends boolean = false> =
  TPrefixEnabled extends true
    ? TRPCMutationKeyWithPrefix
    : TRPCMutationKeyWithoutPrefix;

export type FeatureFlags = { keyPrefix: boolean };

export type ofFeatureFlags<T extends FeatureFlags> = T;

export type KeyPrefixOptions<TFeatureFlags extends FeatureFlags> =
  TFeatureFlags['keyPrefix'] extends true
    ? {
        keyPrefix: string;
      }
    : {
        /**
         * In order to use a query key prefix, you have to initialize the context with the `keyPrefix`
         */
        keyPrefix?: never;
      };

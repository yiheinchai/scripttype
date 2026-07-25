/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/clientish/inferrable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRootTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pick<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type AnyClientTypes = Pick<AnyRootTypes, 'errorShape' | 'transformer'>;

export type PickTypes<T extends AnyClientTypes> = {
  transformer: T['transformer'];
  errorShape: T['errorShape'];
};

export type InitLike = {
  _config: {
    $types: AnyClientTypes;
  };
};

export type RouterLike = {
  _def: InitLike;
};

export type RootConfigLike = {
  $types: AnyClientTypes;
};

export type InferrableClientTypes =
  | RouterLike
  | InitLike
  | RootConfigLike
  | AnyClientTypes;

export type inferClientTypes<TInferrable extends InferrableClientTypes> =
  TInferrable extends AnyClientTypes
    ? PickTypes<TInferrable>
    : TInferrable extends RootConfigLike
      ? PickTypes<TInferrable['$types']>
      : TInferrable extends InitLike
        ? PickTypes<TInferrable['_config']['$types']>
        : TInferrable extends RouterLike
          ? PickTypes<TInferrable['_def']['_config']['$types']>
          : never;

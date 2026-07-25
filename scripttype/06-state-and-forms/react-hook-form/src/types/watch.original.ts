/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/watch.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Control<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DeepPartialSkipArrayKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FieldPath<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FieldPathValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FieldPathValues<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FieldValues<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReactNode<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type UseWatchProps<TFieldValues extends FieldValues = FieldValues> = {
  defaultValue?: unknown;
  disabled?: boolean;
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[];
  control?: Control<TFieldValues>;
  exact?: boolean;
  compute?: (formValues: TFieldValues) => TFieldValues;
};

export type WatchDefaultValue<
  TFieldName,
  TFieldValues extends FieldValues = FieldValues,
> =
  TFieldName extends FieldPath<TFieldValues>
    ? FieldPathValue<TFieldValues, TFieldName>
    : DeepPartialSkipArrayKey<TFieldValues>;

export type WatchName<TFieldValues extends FieldValues> =
  | FieldPath<TFieldValues>
  | FieldPath<TFieldValues>[]
  | readonly FieldPath<TFieldValues>[]
  | undefined;

export type WatchValue<
  TFieldName,
  TFieldValues extends FieldValues = FieldValues,
> = TFieldName extends readonly FieldPath<TFieldValues>[]
  ? FieldPathValues<TFieldValues, TFieldName>
  : TFieldName extends FieldPath<TFieldValues>
    ? FieldPathValue<TFieldValues, TFieldName>
    : TFieldValues;

export type WatchRenderValue<
  TFieldName,
  TFieldValues extends FieldValues,
  TComputeValue,
> = TComputeValue extends undefined
  ? WatchValue<TFieldName, TFieldValues>
  : TComputeValue;

export type WatchProps<
  TFieldName extends WatchName<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
  TComputeValue = undefined,
> = {
  control?: Control<TFieldValues, TContext, TTransformedValues>;
  /**
   * @deprecated This prop will be renamed to `name` in the next major release.
   * Use `name` instead.
   */
  names?: TFieldName;
  name?: TFieldName;
  disabled?: boolean;
  exact?: boolean;
  defaultValue?: WatchDefaultValue<TFieldName, TFieldValues>;
  compute?: (value: WatchValue<TFieldName, TFieldValues>) => TComputeValue;
  render: (
    value: WatchRenderValue<TFieldName, TFieldValues, TComputeValue>,
  ) => ReactNode | ReactNode[];
};

/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/formStateSubscribe.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type FieldValues<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReactNode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseFormStateProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseFormStateReturn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FormStateProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = UseFormStateProps<TFieldValues, TTransformedValues> & {
  render: (values: UseFormStateReturn<TFieldValues>) => ReactNode;
};

export type FormStateSubscribeProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = FormStateProps<TFieldValues, TTransformedValues>;

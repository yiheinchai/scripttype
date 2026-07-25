/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/resolvers.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CriteriaMode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Field<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldErrors<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldValues<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InternalFieldName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ResolverSuccess<TTransformedValues> = {
  values: TTransformedValues;
  errors: Record<string, never>;
};

export type ResolverError<TFieldValues extends FieldValues = FieldValues> = {
  values: Record<string, never>;
  errors: FieldErrors<TFieldValues>;
};

export type ResolverResult<
  TFieldValues extends FieldValues = FieldValues,
  TTransformedValues = TFieldValues,
> = ResolverSuccess<TTransformedValues> | ResolverError<TFieldValues>;

export interface ResolverOptions<TFieldValues extends FieldValues> {
  criteriaMode?: CriteriaMode;
  fields: Record<InternalFieldName, Field['_f']>;
  names?: FieldName<TFieldValues>[];
  shouldUseNativeValidation: boolean | undefined;
}

export type Resolver<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = (
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>,
) =>
  | Promise<ResolverResult<TFieldValues, TTransformedValues>>
  | ResolverResult<TFieldValues, TTransformedValues>;

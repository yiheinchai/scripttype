/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/fieldArray.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Control<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldArrayPath<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldArrayPathValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldValues<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type React<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisterOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Validate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FieldArray<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
> =
  FieldArrayPathValue<TFieldValues, TFieldArrayName> extends
    | ReadonlyArray<infer U>
    | null
    | undefined
    ? U
    : never;

export type UseFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
  TTransformedValues = TFieldValues,
> = {
  name: TFieldArrayName;
  keyName?: TKeyName;
  control?: Control<TFieldValues, any, TTransformedValues>;
  rules?: {
    validate?:
      | Validate<FieldArray<TFieldValues, TFieldArrayName>[], TFieldValues>
      | Record<
          string,
          Validate<FieldArray<TFieldValues, TFieldArrayName>[], TFieldValues>
        >;
  } & Pick<
    RegisterOptions<TFieldValues>,
    'maxLength' | 'minLength' | 'required'
  >;
  shouldUnregister?: boolean;
  disabled?: boolean;
};

export type FieldArrayWithId<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> = FieldArray<TFieldValues, TFieldArrayName> & Record<TKeyName, string>;

export type FieldArrayMethodProps = {
  shouldFocus?: boolean;
  focusIndex?: number;
  focusName?: string;
};

export type UseFieldArrayPrepend<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
> = (
  value:
    | FieldArray<TFieldValues, TFieldArrayName>
    | FieldArray<TFieldValues, TFieldArrayName>[],
  options?: FieldArrayMethodProps,
) => void;

export type UseFieldArrayAppend<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
> = (
  value:
    | FieldArray<TFieldValues, TFieldArrayName>
    | FieldArray<TFieldValues, TFieldArrayName>[],
  options?: FieldArrayMethodProps,
) => void;

export type UseFieldArrayInsert<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
> = (
  index: number,
  value:
    | FieldArray<TFieldValues, TFieldArrayName>
    | FieldArray<TFieldValues, TFieldArrayName>[],
  options?: FieldArrayMethodProps,
) => void;

export type UseFieldArrayUpdate<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
> = (index: number, value: FieldArray<TFieldValues, TFieldArrayName>) => void;

export type UseFieldArrayReplace<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
> = (
  value:
    | FieldArray<TFieldValues, TFieldArrayName>
    | FieldArray<TFieldValues, TFieldArrayName>[],
) => void;

export type UseFieldArraySwap = (indexA: number, indexB: number) => void;

export type UseFieldArrayMove = (indexA: number, indexB: number) => void;

export type UseFieldArrayRemove = (index?: number | number[]) => void;

export type UseFieldArrayReturn<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> = {
  swap: UseFieldArraySwap;
  move: UseFieldArrayMove;
  prepend: UseFieldArrayPrepend<TFieldValues, TFieldArrayName>;
  append: UseFieldArrayAppend<TFieldValues, TFieldArrayName>;
  remove: UseFieldArrayRemove;
  insert: UseFieldArrayInsert<TFieldValues, TFieldArrayName>;
  update: UseFieldArrayUpdate<TFieldValues, TFieldArrayName>;
  replace: UseFieldArrayReplace<TFieldValues, TFieldArrayName>;
  fields: (FieldArrayWithId<TFieldValues, TFieldArrayName, TKeyName> & {
    disabled?: boolean;
  })[];
};

export type FieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> = {
  render: (
    fieldArray: UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName>,
  ) => React.ReactElement;
} & UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>;

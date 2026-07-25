/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/form.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Awaited<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepPartial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepPartialSkipArrayKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorOption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldArrayPath<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldErrors<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldPath<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldPathValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldPathValues<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldRefs<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldValues<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FormData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTMLFormElement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InternalFieldName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Noop<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type React<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisterOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Resolver<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Response<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Subject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Subscription<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type VALIDATION_MODE<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateForm<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NestedValue<TValue extends object = object> = {
  [$NestedValue]: never;
} & TValue;

export type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown,
) => Promise<TFieldValues>;

export type DefaultValues<TFieldValues> =
  TFieldValues extends AsyncDefaultValues<TFieldValues>
    ? DeepPartial<Awaited<TFieldValues>>
    : DeepPartial<TFieldValues>;

export type SubmitHandler<T, TResult = unknown> = (
  data: T,
  event?: React.BaseSyntheticEvent,
) => TResult;

export type FormSubmitHandler<TTransformedValues> = (payload: {
  data: TTransformedValues;
  event?: React.BaseSyntheticEvent;
  formData: FormData;
  formDataJson: string;
  method?: 'post' | 'put' | 'delete';
}) => unknown | Promise<unknown>;

export type SubmitErrorHandler<TFieldValues extends FieldValues> = (
  errors: FieldErrors<TFieldValues>,
  event?: React.BaseSyntheticEvent,
) => unknown | Promise<unknown>;

export type ResetFieldConfig<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<{
  keepDirty: boolean;
  keepTouched: boolean;
  keepError: boolean;
  defaultValue: FieldPathValue<TFieldValues, TFieldName>;
}>;

export type ValidationMode = typeof VALIDATION_MODE;

export type Mode = keyof ValidationMode;

export type ResetAction<TFieldValues> = (formValues: TFieldValues) => TFieldValues;

export type KeepStateOptions = Partial<{
  keepDirtyValues: boolean;
  keepErrors: boolean;
  keepDirty: boolean;
  keepValues: boolean;
  keepDefaultValues: boolean;
  keepIsSubmitted: boolean;
  keepIsSubmitSuccessful: boolean;
  keepTouched: boolean;
  keepIsValidating: boolean;
  keepIsValid: boolean;
  keepSubmitCount: boolean;
  keepFieldsRef: boolean;
}>;

export type UseFormReset<TFieldValues extends FieldValues> = (
  values?:
    | DefaultValues<TFieldValues>
    | TFieldValues
    | ResetAction<TFieldValues>,
  keepStateOptions?: KeepStateOptions,
) => void;

export type CriteriaMode = 'firstError' | 'all';

export type WatchObserver<TFieldValues extends FieldValues> = (
  value: DeepPartialSkipArrayKey<TFieldValues>,
  info: {
    name?: FieldPath<TFieldValues>;
    type?: EventType;
    values?: unknown;
  },
) => void;

export type UseFormWatch<TFieldValues extends FieldValues> = {
  /**
   * Watch and subscribe to all form updates and changes based on onChange, and trigger re-renders at the useForm level.
   *
   * @remarks
   * [API](https://react-hook-form.com/docs/useform/watch) • [Demo](https://codesandbox.io/s/react-hook-form-watch-v7-ts-8et1d) • [Video](https://www.youtube.com/watch?v=3qLd69WMqKk)
   *
   * @returns The entire form values.
   *
   * @example
   * ```tsx
   * const formValues = watch();
   * ```
   */
  (): TFieldValues;
  /**
   * Watch and subscribe to an array of fields used outside of render.
   *
   * @remarks
   * [API](https://react-hook-form.com/docs/useform/watch) • [Demo](https://codesandbox.io/s/react-hook-form-watch-v7-ts-8et1d) • [Video](https://www.youtube.com/watch?v=3qLd69WMqKk)
   *
   * @param names - An array of field names.
   * @param defaultValue - DefaultValues for the entire form.
   *
   * @returns An array of field values.
   *
   * @example
   * ```tsx
   * const [name, name1] = watch(["name", "name1"]);
   * ```
   */
  <TFieldNames extends readonly FieldPath<TFieldValues>[]>(
    names: readonly [...TFieldNames],
    defaultValue?: DeepPartial<TFieldValues>,
  ): FieldPathValues<TFieldValues, TFieldNames>;
  /**
   * Watch and subscribe to a single field used outside of render.
   *
   * @remarks
   * [API](https://react-hook-form.com/docs/useform/watch) • [Demo](https://codesandbox.io/s/react-hook-form-watch-v7-ts-8et1d) • [Video](https://www.youtube.com/watch?v=3qLd69WMqKk)
   *
   * @param name - the path name to the form field value.
   * @param defaultValue - defaultValues for the entire form
   *
   * @returns the single field value
   *
   * @example
   * ```tsx
   * const name = watch("name");
   * ```
   */
  <TFieldName extends FieldPath<TFieldValues>>(
    name: TFieldName,
    defaultValue?: FieldPathValue<TFieldValues, TFieldName>,
  ): FieldPathValue<TFieldValues, TFieldName>;
  /**
   * Subscribe to field updates and changes without triggering a re-render.
   *
   * @remarks
   * [API](https://react-hook-form.com/docs/useform/watch) • [Demo](https://codesandbox.io/s/react-hook-form-watch-v7-ts-8et1d) • [Video](https://www.youtube.com/watch?v=3qLd69WMqKk)
   *
   * @param callback - Callback function to subscribe to all field changes and return an unsubscribe function.
   * @param defaultValues - DefaultValues for the entire form.
   *
   * @returns Unsubscribe function.
   *
   * @example
   * ```tsx
   * useEffect(() => {
   *   const { unsubscribe } = watch((value) => {
   *     console.log(value);
   *   });
   *   return () => unsubscribe();
   * }, [watch])
   * ```
   */
  (
    callback: WatchObserver<TFieldValues>,
    defaultValues?: DeepPartial<TFieldValues>,
  ): Subscription;
};

export type EitherOption<T> = {
  [K in keyof T]: {
    [P in K]: T[P];
  } & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];

export type GetValuesConfig = EitherOption<{
  dirtyFields: boolean;
  touchedFields: boolean;
}>;

export type UseFormGetValues<TFieldValues extends FieldValues> = {
  /**
   * Get the entire form values when no argument is supplied to this function.
   *
   * @remarks
   * [API](https://react-hook-form.com/docs/useform/getvalues) • [Demo](https://codesandbox.io/s/react-hook-form-v7-ts-getvalues-txsfg)
   *
   * @returns Form values.
   *
   * @example
   * ```tsx
   * <button onClick={() => getValues()}>getValues</button>
   *
   * <input {...register("name", {
   *   validate: (value, formValues) => formValues.otherField === value;
   * })} />
   * ```
   */
  (name?: undefined, config?: GetValuesConfig): TFieldValues;
  /**
   * Get a single field value.
   *
   * @remarks
   * [API](https://react-hook-form.com/docs/useform/getvalues) • [Demo](https://codesandbox.io/s/react-hook-form-v7-ts-getvalues-txsfg)
   *
   * @param name - The path name to the form field value.
   * @param config - Return touched or dirty fields.
   *
   * @returns the single field value
   *
   * @example
   * ```tsx
   * <button onClick={() => getValues("name")}>getValues</button>
   *
   * <input {...register("name", {
   *   validate: () => getValues('otherField') === "test";
   * })} />
   * ```
   */
  <TFieldName extends FieldPath<TFieldValues>>(
    name: TFieldName,
    config?: GetValuesConfig,
  ): FieldPathValue<TFieldValues, TFieldName>;
  /**
   * Get an array of field values.
   *
   * @remarks
   * [API](https://react-hook-form.com/docs/useform/getvalues) • [Demo](https://codesandbox.io/s/react-hook-form-v7-ts-getvalues-txsfg)
   *
   * @param names - an array of field names
   * @param config - return touched or dirty fields
   *
   * @returns An array of field values
   *
   * @example
   * ```tsx
   * <button onClick={() => getValues(["name", "name1"])}>getValues</button>
   *
   * <input {...register("name", {
   *   validate: () => getValues(["fieldA", "fieldB"]).includes("test");
   * })} />
   * ```
   */
  <TFieldNames extends FieldPath<TFieldValues>[]>(
    names: readonly [...TFieldNames],
    config?: GetValuesConfig,
  ): [...FieldPathValues<TFieldValues, TFieldNames>];
};

export type FieldNamesMarkedBoolean<TFieldValues extends FieldValues> = DeepMap<
  DeepPartial<TFieldValues>,
  boolean
>;

export type FormState<TFieldValues extends FieldValues> = {
  isDirty: boolean;
  isLoading: boolean;
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
  isSubmitting: boolean;
  isValidating: boolean;
  isValid: boolean;
  disabled: boolean;
  submitCount: number;
  defaultValues?: undefined | Readonly<DeepPartial<TFieldValues>>;
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
  touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
  validatingFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
  errors: FieldErrors<TFieldValues>;
  isReady: boolean;
};

export type UseFormGetFieldState<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues>,
>(
  name: TFieldName,
  formState?: FormState<TFieldValues>,
) => {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  isValidating: boolean;
  error?: FieldError;
};

export type UseFormSetError<TFieldValues extends FieldValues> = (
  name:
    | FieldPath<TFieldValues>
    | `root.${string}`
    | 'root'
    | 'form'
    | `form.${string}`,
  error: ErrorOption,
  options?: {
    shouldFocus: boolean;
  },
) => void;

export type UseFormClearErrors<TFieldValues extends FieldValues> = (
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[]
    | `root.${string}`
    | 'root'
    | 'form'
    | `form.${string}`,
) => void;

export type SetValueConfig = Partial<{
  shouldValidate: boolean;
  shouldDirty: boolean;
  shouldTouch: boolean;
  delayError: boolean;
}>;

export type UseFormSetValue<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  value: FieldPathValue<TFieldValues, TFieldName>,
  options?: SetValueConfig,
) => void;

export type UseFormSetValues<TFieldValues extends FieldValues> = (
  value: Partial<TFieldValues> | ResetAction<TFieldValues>,
  options?: SetValueConfig,
) => void;

export type TriggerConfig = Partial<{
  shouldFocus: boolean;
}>;

export type UseFormTrigger<TFieldValues extends FieldValues> = (
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[],
  options?: TriggerConfig,
) => Promise<boolean>;

export type UseFormResetField<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: ResetFieldConfig<TFieldValues, TFieldName>,
) => void;

export type UseFormResetDefaultValues<TFieldValues extends FieldValues> = (
  values: DefaultValues<TFieldValues> | TFieldValues,
  options?: Partial<Pick<KeepStateOptions, 'keepDirty' | 'keepIsValid'>>,
) => void;

export type UseFormHandleSubmit<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = <TResult>(
  onValid: SubmitHandler<TTransformedValues, TResult>,
  onInvalid?: SubmitErrorHandler<TFieldValues>,
) => (e?: React.BaseSyntheticEvent) => Promise<Awaited<TResult> | undefined>;

export type UseFormUnregister<TFieldValues extends FieldValues> = (
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[],
  options?: Omit<
    KeepStateOptions,
    | 'keepIsSubmitted'
    | 'keepSubmitCount'
    | 'keepValues'
    | 'keepDefaultValues'
    | 'keepErrors'
  > & { keepValue?: boolean; keepDefaultValue?: boolean; keepError?: boolean },
) => void;

export type FormStateSubjectRef<TFieldValues extends FieldValues> = Subject<
  Partial<FormState<TFieldValues>> & {
    name?: InternalFieldName;
    values?: TFieldValues;
    type?: EventType;
  }
>;

export type Subjects<TFieldValues extends FieldValues = FieldValues> = {
  array: Subject<{
    name?: InternalFieldName;
    values?: FieldValues;
  }>;
  state: FormStateSubjectRef<TFieldValues>;
};

export type InternalNameSet = Set<InternalFieldName>;

export type Names = {
  mount: InternalNameSet;
  unMount: InternalNameSet;
  disabled: InternalNameSet;
  array: InternalNameSet;
  watch: InternalNameSet;
  registerName: InternalNameSet;
  focus?: InternalFieldName;
  watchAll?: boolean;
};

export type GetIsDirty = <TName extends InternalFieldName, TData>(
  name?: TName,
  data?: TData,
) => boolean;

export type FormStateProxy<TFieldValues extends FieldValues = FieldValues> = {
  isDirty: boolean;
  isValidating: boolean;
  dirtyFields: FieldNamesMarkedBoolean<TFieldValues>;
  touchedFields: FieldNamesMarkedBoolean<TFieldValues>;
  validatingFields: FieldNamesMarkedBoolean<TFieldValues>;
  errors: boolean;
  isValid: boolean;
};

export type ReadFormState = { [K in keyof FormStateProxy]: boolean | 'all' } & {
  values?: boolean;
  defaultValues?: boolean | 'all';
  isSubmitted?: boolean | 'all';
  submitCount?: boolean | 'all';
};

export type WatchInternal<TFieldValues> = (
  fieldNames?: InternalFieldName | InternalFieldName[],
  defaultValue?: DeepPartial<TFieldValues>,
  isMounted?: boolean,
  isGlobal?: boolean,
) =>
  | FieldPathValue<FieldValues, InternalFieldName>
  | FieldPathValues<FieldValues, InternalFieldName[]>;

export type BatchFieldArrayUpdate = <
  T extends Function,
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> =
    FieldArrayPath<TFieldValues>,
>(
  name: InternalFieldName,
  updatedFieldArrayValues?: Partial<
    FieldArray<TFieldValues, TFieldArrayName>
  >[],
  method?: T,
  args?: Partial<{
    argA: unknown;
    argB: unknown;
  }>,
  shouldSetValue?: boolean,
  shouldUpdateFieldsAndErrors?: boolean,
) => void;

export type FromSubscribe<TFieldValues extends FieldValues> = <
  TFieldNames extends readonly FieldPath<TFieldValues>[],
>(payload: {
  name?: readonly [...TFieldNames] | TFieldNames[number];
  formState?: Partial<ReadFormState>;
  callback: (
    data: Partial<FormState<TFieldValues>> & {
      values: TFieldValues;
      name?: InternalFieldName;
    },
  ) => void;
  exact?: boolean;
  reRenderRoot?: boolean;
}) => () => void;

export type ChangeHandler = (event: {
  target: any;
  type?: any;
}) => Promise<void | boolean>;

export type RefCallBack = (instance: any) => void;

export type UseFormRegisterReturn<
  TFieldName extends InternalFieldName = InternalFieldName,
> = {
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  name: TFieldName;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
};

export type UseFormRegister<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: RegisterOptions<TFieldValues, TFieldName>,
) => UseFormRegisterReturn<TFieldName>;

export type Control<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = {
  _subjects: Subjects<TFieldValues>;
  _removeUnmounted: Noop;
  _names: Names;
  _state: {
    mount: boolean;
    action: boolean;
    watch: boolean;
  };
  _reset: UseFormReset<TFieldValues>;
  _options: UseFormProps<TFieldValues, TContext, TTransformedValues>;
  _getDirty: GetIsDirty;
  _resetDefaultValues: Noop;
  _formState: FormState<TFieldValues>;
  _setValid: (shouldUpdateValid?: boolean) => void;
  _fields: FieldRefs;
  _formValues: FieldValues;
  _proxyFormState: ReadFormState;
  _defaultValues: Partial<DefaultValues<TFieldValues>>;
  _getWatch: WatchInternal<TFieldValues>;
  _setFieldArray: BatchFieldArrayUpdate;
  _getFieldArray: <TFieldArrayValues>(
    name: InternalFieldName,
  ) => Partial<TFieldArrayValues>[];
  _setErrors: (errors: FieldErrors<TFieldValues>) => void;
  _setDisabledField: (props: {
    disabled?: boolean;
    name: FieldName<any>;
  }) => void;
  _runSchema: (names: InternalFieldName[]) => Promise<{ errors: FieldErrors }>;
  _updateIsValidating: (
    names?: InternalFieldName[],
    isValidating?: boolean,
  ) => void;
  _focusError: () => boolean | undefined;
  _disableForm: (disabled?: boolean) => void;
  _subscribe: FromSubscribe<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  handleSubmit: UseFormHandleSubmit<TFieldValues, TTransformedValues>;
  unregister: UseFormUnregister<TFieldValues>;
  getFieldState: UseFormGetFieldState<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
};

export type SetFocusOptions = Partial<{
  shouldSelect: boolean;
}>;

export type UseFormSetFocus<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: SetFocusOptions,
) => void;

export type UseFormSubscribe<TFieldValues extends FieldValues> = <
  TFieldNames extends readonly FieldPath<TFieldValues>[],
>(payload: {
  name?: readonly [...TFieldNames] | TFieldNames[number];
  formState?: Partial<ReadFormState>;
  callback: (
    data: Partial<FormState<TFieldValues>> & {
      values: TFieldValues;
      name?: InternalFieldName;
      type?: EventType;
    },
  ) => void;
  exact?: boolean;
}) => () => void;

export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = {
  watch: UseFormWatch<TFieldValues>;
  getValues: UseFormGetValues<TFieldValues>;
  getFieldState: UseFormGetFieldState<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  setValues: UseFormSetValues<TFieldValues>;
  trigger: UseFormTrigger<TFieldValues>;
  formState: FormState<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;
  reset: UseFormReset<TFieldValues>;
  resetDefaultValues: UseFormResetDefaultValues<TFieldValues>;
  handleSubmit: UseFormHandleSubmit<TFieldValues, TTransformedValues>;
  unregister: UseFormUnregister<TFieldValues>;
  control: Control<TFieldValues, TContext, TTransformedValues>;
  register: UseFormRegister<TFieldValues>;
  setFocus: UseFormSetFocus<TFieldValues>;
  subscribe: UseFormSubscribe<TFieldValues>;
};

export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = Partial<{
  mode: Mode;
  disabled: boolean;
  reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
  defaultValues: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>;
  values: TFieldValues;
  errors: FieldErrors<TFieldValues>;
  resetOptions: Parameters<UseFormReset<TFieldValues>>[1];
  resolver: Resolver<TFieldValues, TContext, TTransformedValues>;
  context: TContext;
  shouldFocusError: boolean;
  shouldUnregister: boolean;
  shouldUseNativeValidation: boolean;
  progressive: boolean;
  criteriaMode: CriteriaMode;
  delayError: number;
  formControl?: Omit<
    UseFormReturn<TFieldValues, TContext, TTransformedValues>,
    'formState'
  >;
  validate: ValidateForm<TFieldValues>;
}>;

export type SetFieldValue<TFieldValues extends FieldValues> =
  FieldValue<TFieldValues>;

export type UseFormStateProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = Partial<{
  control?: Control<TFieldValues, any, TTransformedValues>;
  disabled?: boolean;
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[];
  exact?: boolean;
}>;

export type UseFormStateReturn<TFieldValues extends FieldValues> =
  FormState<TFieldValues>;

export type FormProviderProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = {
  children: React.ReactNode | React.ReactNode[];
} & UseFormReturn<TFieldValues, TContext, TTransformedValues>;

export type FormProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onError' | 'onSubmit'> &
  Partial<{
    control: Control<TFieldValues, any, TTransformedValues>;
    headers: Record<string, string>;
    validateStatus: (status: number) => boolean;
    onError: ({
      response,
      error,
    }:
      | {
          response: Response;
          error?: undefined;
        }
      | {
          response?: undefined;
          error: unknown;
        }) => void;
    onSuccess: ({ response }: { response: Response }) => void;
    onSubmit: FormSubmitHandler<TTransformedValues>;
    method: 'post' | 'put' | 'delete';
    children: React.ReactNode | React.ReactNode[];
    render: (props: {
      submit: (e?: React.FormEvent) => void;
    }) => React.ReactNode | React.ReactNode[];
    encType:
      | 'application/x-www-form-urlencoded'
      | 'multipart/form-data'
      | 'text/plain'
      | 'application/json';
  }>;

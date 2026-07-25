/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/validator.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EVENTS<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldPath<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldPathValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldValues<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FormState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Message<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ValidationValue = boolean | number | string | RegExp;

export type ValidationValueMessage<
  TValidationValue extends ValidationValue = ValidationValue,
> = {
  value: TValidationValue | undefined;
  message: Message;
};

export type ValidationRule<
  TValidationValue extends ValidationValue = ValidationValue,
> = TValidationValue | ValidationValueMessage<TValidationValue>;

export type FormValidateResult<T> =
  | Partial<
      Record<
        keyof T,
        {
          message: Message | Message[] | boolean | undefined;
          type: string;
        }
      >
    >
  | string
  | boolean;

export type ValidateResult = Message | Message[] | boolean | undefined;

export type Validate<TFieldValue, TFormValues> = (
  value: TFieldValue,
  formValues: TFormValues,
) => ValidateResult | Promise<ValidateResult>;

export type ValidateFormEventType = (typeof EVENTS)[keyof typeof EVENTS];

export type ValidateForm<
  TFormValues extends FieldValues,
  TFieldName extends FieldPath<TFormValues> = FieldPath<TFormValues>,
> = (props: {
  formValues: TFormValues;
  formState: FormState<TFormValues>;
  eventType?: ValidateFormEventType;
  name?: TFieldName | TFieldName[];
}) =>
  | FormValidateResult<TFormValues>
  | Promise<FormValidateResult<TFormValues>>;

export type RegisterOptions<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number>;
  minLength: ValidationRule<number>;
  validate:
    | Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>
    | Record<
        string,
        Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>
      >;
  value: FieldPathValue<TFieldValues, TFieldName>;
  setValueAs: (value: any) => any;
  shouldUnregister?: boolean;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
  disabled: boolean;
  deps: FieldPath<TFieldValues> | FieldPath<TFieldValues>[];
}> &
  (
    | {
        pattern?: ValidationRule<RegExp>;
        valueAsNumber?: false;
        valueAsDate?: false;
      }
    | {
        pattern?: undefined;
        valueAsNumber?: false;
        valueAsDate?: true;
      }
    | {
        pattern?: undefined;
        valueAsNumber?: true;
        valueAsDate?: false;
      }
  );

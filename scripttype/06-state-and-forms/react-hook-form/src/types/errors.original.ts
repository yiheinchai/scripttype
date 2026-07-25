/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/errors.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Blob<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BrowserNativeObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FieldValues<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LiteralUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Ref<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisterOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DeepRequired<T> = T extends BrowserNativeObject | Blob
  ? T
  : {
      [K in keyof T]-?: NonNullable<DeepRequired<T[K]>>;
    };

export type MultipleFieldErrors = {
  [K in keyof RegisterOptions]?: ValidateResult;
} & {
  [key: string]: ValidateResult;
};

export type Message = string;

export type FieldError = {
  type: LiteralUnion<keyof RegisterOptions, string>;
  root?: FieldError;
  ref?: Ref;
  types?: MultipleFieldErrors;
  message?: Message;
};

export type GlobalError = Partial<{
  type: string | number;
  message: Message;
}>;

export type FieldErrorsImpl<T extends FieldValues = FieldValues> = {
  [K in keyof T]?: T[K] extends BrowserNativeObject | Blob
    ? FieldError
    : K extends 'root' | `root.${string}`
      ? GlobalError
      : T[K] extends object
        ? Merge<FieldError, FieldErrorsImpl<T[K]>>
        : FieldError;
};

export type FieldErrors<T extends FieldValues = FieldValues> = Partial<
  FieldErrorsImpl<DeepRequired<T>>
> & {
  root?: Record<string, GlobalError> & GlobalError;
  form?: GlobalError;
};

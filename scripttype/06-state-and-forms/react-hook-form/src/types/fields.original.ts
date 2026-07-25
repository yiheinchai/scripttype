/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/fields.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FileList<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTMLElement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTMLInputElement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTMLOptionsCollection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTMLSelectElement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTMLTextAreaElement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsFlatObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Noop<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FieldValues = Record<string, any>;

export type FieldName<TFieldValues extends FieldValues> =
  IsFlatObject<TFieldValues> extends true
    ? Extract<keyof TFieldValues, string>
    : string;

export type CustomElement<TFieldValues extends FieldValues> =
  Partial<HTMLElement> & {
    name: FieldName<TFieldValues>;
    type?: string;
    value?: any;
    disabled?: boolean;
    checked?: boolean;
    options?: HTMLOptionsCollection;
    files?: FileList | null;
    focus?: Noop;
  };

export type InternalFieldName = string;

export type FieldValue<TFieldValues extends FieldValues> =
  TFieldValues[InternalFieldName];

export type FieldElement<TFieldValues extends FieldValues = FieldValues> =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement<TFieldValues>;

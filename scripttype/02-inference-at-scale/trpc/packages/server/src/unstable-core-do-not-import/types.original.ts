/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AsyncIterable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Awaited<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _errorSymbol<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Maybe<TType> = TType | null | undefined;

export type Simplify<TType> = TType extends any[] | Date
  ? TType
  : { [K in keyof TType]: TType[K] };

export type Dict<TType> = Record<string, TType | undefined>;

export type MaybePromise<TType> = Promise<TType> | TType;

export type FilterKeys<TObj extends object, TFilter> = {
  [TKey in keyof TObj]: TObj[TKey] extends TFilter ? TKey : never;
}[keyof TObj];

export type Result<TType, TErr = unknown> =
  | { ok: true; value: TType }
  | { ok: false; error: TErr };

export type Filter<TObj extends object, TFilter> = Pick<
  TObj,
  FilterKeys<TObj, TFilter>
>;

export type Unwrap<TType> = TType extends (...args: any[]) => infer R
  ? Awaited<R>
  : TType;

export type DeepPartial<TObject> = TObject extends object
  ? {
      [P in keyof TObject]?: DeepPartial<TObject[P]>;
    }
  : TObject;

export type DistributiveOmit<TObj, TKey extends keyof any> = TObj extends any
  ? Omit<TObj, TKey>
  : never;

export type WithoutIndexSignature<TObj> = {
  [K in keyof TObj as string extends K
    ? never
    : number extends K
      ? never
      : K]: TObj[K];
};

export type Overwrite<TType, TWith> = TWith extends any
  ? TType extends object
    ? {
        [K in  // Exclude index signature from keys
          | keyof WithoutIndexSignature<TType>
          | keyof WithoutIndexSignature<TWith>]: K extends keyof TWith
          ? TWith[K]
          : K extends keyof TType
            ? TType[K]
            : never;
      } & (string extends keyof TWith // Handle cases with an index signature
        ? { [key: string]: TWith[string] }
        : number extends keyof TWith
          ? { [key: number]: TWith[number] }
          : {})
    : TWith
  : never;

export type ValidateShape<TActualShape, TExpectedShape> =
  TActualShape extends TExpectedShape
    ? Exclude<keyof TActualShape, keyof TExpectedShape> extends never
      ? TActualShape
      : TExpectedShape
    : never;

export type PickFirstDefined<TType, TPick> = undefined extends TType
  ? undefined extends TPick
    ? never
    : TPick
  : TType;

export type KeyFromValue<
  TValue,
  TType extends Record<PropertyKey, PropertyKey>,
> = {
  [K in keyof TType]: TValue extends TType[K] ? K : never;
}[keyof TType];

export type InvertKeyValue<TType extends Record<PropertyKey, PropertyKey>> = {
  [TValue in TType[keyof TType]]: KeyFromValue<TValue, TType>;
};

export type IntersectionError<TKey extends string> =
  `The property '${TKey}' in your router collides with a built-in method, rename this router or procedure on your backend.`;

export type ProtectedIntersection<TType, TWith> = keyof TType &
  keyof TWith extends never
  ? TType & TWith
  : IntersectionError<string & keyof TType & keyof TWith>;

export type TypeError<TMessage extends string> = TMessage & {
  _: typeof _errorSymbol;
};

export type ValueOf<TObj> = TObj[keyof TObj];

export type coerceAsyncIterableToArray<TValue> =
  TValue extends AsyncIterable<infer $Inferred> ? $Inferred[] : TValue;

export type inferAsyncIterableYield<T> =
  T extends AsyncIterable<infer U> ? U : T;

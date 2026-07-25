/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/ssr/serializer/transformer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRoute<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncGenerator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadableStream<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredConfigType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredSsr<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveAllSSR<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SSROption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface SerializationAdapterTypes<
  TInput,
  TOutput,
  TExtendsAdapters extends ReadonlyArray<AnySerializationAdapter>,
> {
  input: TInput | UnionizeSerializationAdaptersInput<TExtendsAdapters>
  output: TOutput
  extends: TExtendsAdapters
}

export interface SerializationAdapter<
  TInput,
  TOutput,
  TExtendsAdapters extends ReadonlyArray<AnySerializationAdapter>,
> {
  '~types': SerializationAdapterTypes<TInput, TOutput, TExtendsAdapters>
  key: string
  extends?: TExtendsAdapters
  test: (value: unknown) => value is TInput
  toSerializable: (value: TInput) => TOutput
  fromSerializable: (value: TOutput) => TInput
}

export type AnySerializationAdapter = SerializationAdapter<any, any, any>

export type UnionizeSerializationAdaptersInput<
  TAdapters extends ReadonlyArray<AnySerializationAdapter>,
> = TAdapters[number]['~types']['input']

export interface SerializationError<in out TMessage extends string> {
  [SERIALIZATION_ERROR]: TMessage
}

export interface SerializerExtensions extends DefaultSerializerExtensions {}

export type RegisteredReadableStream =
  unknown extends SerializerExtensions['ReadableStream']
    ? never
    : SerializerExtensions['ReadableStream']

export type ValidateSerializableMapped<T, TSerializable> = {
  [K in keyof T]: ValidateSerializable<T[K], TSerializable>
}

export type ValidateSerializableArray<T, TSerializable> = T extends readonly [
  any,
  ...Array<any>,
]
  ? ValidateSerializableMapped<T, TSerializable>
  : T extends Array<infer U>
    ? Array<ValidateSerializable<U, TSerializable>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<ValidateSerializable<U, TSerializable>>
      : never

export type ValidateSerializablePromise<T, TSerializable> =
  T extends Promise<infer TAwaited>
    ? Promise<ValidateSerializable<TAwaited, TSerializable>>
    : never

export type ValidateReadableStream<T, TSerializable> =
  T extends ReadableStream<infer TStreamed>
    ? ReadableStream<ValidateSerializable<TStreamed, TSerializable>>
    : never

export type ValidateSerializableSet<T, TSerializable> =
  T extends Set<infer TItem>
    ? Set<ValidateSerializable<TItem, TSerializable>>
    : never

export type ValidateSerializableMap<T, TSerializable> =
  T extends Map<infer TKey, infer TValue>
    ? Map<
        ValidateSerializable<TKey, TSerializable>,
        ValidateSerializable<TValue, TSerializable>
      >
    : never

export type ValidateSerializableAsyncGenerator<T, TSerializable> =
  T extends AsyncGenerator<infer T, infer TReturn, infer TNext>
    ? AsyncGenerator<
        ValidateSerializable<T, TSerializable>,
        ValidateSerializable<TReturn, TSerializable>,
        TNext
      >
    : never

export type ValidateSerializable<T, TSerializable> = T extends TSerializable
  ? T
  : T extends (...args: Array<any>) => any
    ? SerializationError<'Function may not be serializable'>
    : T extends RegisteredReadableStream
      ? SerializationError<'JSX is not be serializable'>
      : T extends ReadonlyArray<any>
        ? ValidateSerializableArray<T, TSerializable>
        : T extends Promise<any>
          ? ValidateSerializablePromise<T, TSerializable>
          : T extends ReadableStream<any>
            ? ValidateReadableStream<T, TSerializable>
            : T extends Set<any>
              ? ValidateSerializableSet<T, TSerializable>
              : T extends Map<any, any>
                ? ValidateSerializableMap<T, TSerializable>
                : T extends AsyncGenerator<any, any>
                  ? ValidateSerializableAsyncGenerator<T, TSerializable>
                  : T extends object
                    ? ValidateSerializableMapped<T, TSerializable>
                    : SerializationError<'Type may not be serializable'>

export type RegisteredSerializationAdapters<TRegister> = RegisteredConfigType<
  TRegister,
  'serializationAdapters'
>

export interface SerializableExtensions extends DefaultSerializable {}

export type Serializable = SerializableExtensions[keyof SerializableExtensions]

export type RegisteredSerializableInput<TRegister> =
  | (unknown extends RegisteredSerializationAdapters<TRegister>
      ? never
      : RegisteredSerializationAdapters<TRegister> extends ReadonlyArray<AnySerializationAdapter>
        ? RegisteredSerializationAdapters<TRegister>[number]['~types']['input']
        : never)
  | Serializable

export type ValidateSerializableInput<TRegister, T> = ValidateSerializable<
  T,
  RegisteredSerializableInput<TRegister>
>

export type RegisteredSSROption<TRegister> =
  unknown extends RegisteredConfigType<TRegister, 'defaultSsr'>
    ? SSROption
    : RegisteredConfigType<TRegister, 'defaultSsr'>

export type ValidateSerializableLifecycleResultSSR<
  TRegister,
  TParentRoute extends AnyRoute,
  TSSR,
  TFn,
> =
  ResolveAllSSR<TParentRoute, TSSR> extends false
    ? any
    : RegisteredSSROption<TRegister> extends false
      ? any
      : ValidateSerializableInput<TRegister, LooseReturnType<TFn>>

export type ValidateSerializableLifecycleResult<
  TRegister,
  TParentRoute extends AnyRoute,
  TSSR,
  TFn,
> =
  false extends RegisteredSsr<TRegister>
    ? any
    : ValidateSerializableLifecycleResultSSR<
          TRegister,
          TParentRoute,
          TSSR,
          TFn
        > extends infer TInput
      ? TInput
      : never

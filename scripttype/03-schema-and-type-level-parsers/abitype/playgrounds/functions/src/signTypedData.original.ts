/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/playgrounds/functions/src/signTypedData.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypedData<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypedDataDomain<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypedDataToPrimitiveTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SignTypedDataParameters<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData,
  ///
  schema extends Record<string, unknown> = typedData extends TypedData
    ? TypedDataToPrimitiveTypes<typedData>
    : { [_: string]: any },
  message extends schema[keyof schema] = schema[primaryType extends keyof schema
    ? primaryType
    : keyof schema],
> = {
  domain: TypedDataDomain
  primaryType:
    | primaryType // infer value
    | keyof typedData // show all values
  types: typedData
  message: { [_: string]: any } extends message // Check if message was inferred
    ? Record<string, unknown>
    : message
}

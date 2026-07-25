/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/playgrounds/functions/src/watchEvent.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Abi<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiEvent<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiParametersToPrimitiveTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractAbiEvent<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractAbiEventNames<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type WatchEventParameters<
  abi extends Abi | readonly unknown[],
  eventName extends string,
  ///
  eventNames extends string = abi extends Abi
    ? ExtractAbiEventNames<abi>
    : string,
  abiEvent extends AbiEvent = abi extends Abi
    ? ExtractAbiEvent<abi, eventName>
    : AbiEvent,
  primitiveTypes = AbiParametersToPrimitiveTypes<
    abiEvent['inputs'],
    'inputs',
    true
  >,
> = {
  abi: abi
  eventName:
    | eventNames // show all values
    | (eventName extends eventNames ? eventName : never) // infer value (if valid)
    | (Abi extends abi ? string : never) // fallback if `abi` is declared as `Abi`
  onEmit: Abi extends abi
    ? (...args: unknown[]) => void // `abi` declared as `Abi`
    : abi extends Abi
      ? (
          // `abi` was inferrable
          ...args: primitiveTypes extends readonly unknown[]
            ? primitiveTypes
            : unknown[]
        ) => void
      : (...args: unknown[]) => void // fallback
}

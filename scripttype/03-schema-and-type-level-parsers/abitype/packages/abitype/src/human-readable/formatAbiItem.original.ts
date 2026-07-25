/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/formatAbiItem.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Abi<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiConstructor<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiEvent<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiEventParameter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiFallback<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiFunction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiParameter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiReceive<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbiStateMutability<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AssertName<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FormatAbiParameters_<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type FormatAbiParameters<
  abiParameters extends readonly (AbiParameter | AbiEventParameter)[],
> = abiParameters['length'] extends 0
  ? ''
  : FormatAbiParameters_<
      abiParameters extends readonly [
        AbiParameter | AbiEventParameter,
        ...(readonly (AbiParameter | AbiEventParameter)[]),
      ]
        ? abiParameters
        : never
    >

export type FormatAbiItem<abiItem extends Abi[number]> =
  Abi[number] extends abiItem
    ? string
    :
        | (abiItem extends AbiFunction
            ? AbiFunction extends abiItem
              ? string
              : `function ${AssertName<abiItem['name']>}(${FormatAbiParameters<
                  abiItem['inputs']
                >})${abiItem['stateMutability'] extends Exclude<
                  AbiStateMutability,
                  'nonpayable'
                >
                  ? ` ${abiItem['stateMutability']}`
                  : ''}${abiItem['outputs']['length'] extends 0
                  ? ''
                  : ` returns (${FormatAbiParameters<abiItem['outputs']>})`}`
            : never)
        | (abiItem extends AbiEvent
            ? AbiEvent extends abiItem
              ? string
              : `event ${AssertName<abiItem['name']>}(${FormatAbiParameters<
                  abiItem['inputs']
                >})`
            : never)
        | (abiItem extends AbiError
            ? AbiError extends abiItem
              ? string
              : `error ${AssertName<abiItem['name']>}(${FormatAbiParameters<
                  abiItem['inputs']
                >})`
            : never)
        | (abiItem extends AbiConstructor
            ? AbiConstructor extends abiItem
              ? string
              : `constructor(${FormatAbiParameters<
                  abiItem['inputs']
                >})${abiItem['stateMutability'] extends 'payable'
                  ? ' payable'
                  : ''}`
            : never)
        | (abiItem extends AbiFallback
            ? AbiFallback extends abiItem
              ? string
              : `fallback() external${abiItem['stateMutability'] extends 'payable'
                  ? ' payable'
                  : ''}`
            : never)
        | (abiItem extends AbiReceive
            ? AbiReceive extends abiItem
              ? string
              : 'receive() external payable'
            : never)

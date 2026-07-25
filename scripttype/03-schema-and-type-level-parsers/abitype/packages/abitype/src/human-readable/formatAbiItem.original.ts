/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/formatAbiItem.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Abi<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiConstructor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiEvent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiEventParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiFallback<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiReceive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiStateMutability<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AssertName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FormatAbiParameters_<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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

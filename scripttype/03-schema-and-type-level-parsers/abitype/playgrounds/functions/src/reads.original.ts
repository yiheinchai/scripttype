/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/playgrounds/functions/src/reads.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Abi<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ContractParameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ContractReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadParameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Contract<
  abi extends Abi | readonly unknown[] = Abi | readonly unknown[],
  functionName extends string = string,
  args extends readonly unknown[] | undefined = readonly unknown[] | undefined,
> = { abi: abi; functionName: functionName; args?: args }

export type MAXIMUM_DEPTH = 20

export type UninferrableContracts = (ContractParameters & {
  abi: Abi | readonly unknown[]
})[]

export type ReadsStateMutability = 'pure' | 'view'

export type ContractsParameters<
  contracts extends Contract[],
  result extends any[] = [],
  depth extends readonly number[] = [],
> = depth['length'] extends MAXIMUM_DEPTH
  ? UninferrableContracts
  : contracts extends []
    ? []
    : contracts extends [infer head extends Contract]
      ? [
          ...result,
          ReadParameters<head['abi'], head['functionName'], head['args']>,
        ]
      : contracts extends [
            infer head extends Contract,
            ...infer tail extends Contract[],
          ]
        ? ContractsParameters<
            [...tail],
            [
              ...result,
              ReadParameters<head['abi'], head['functionName'], head['args']>,
            ],
            [...depth, 1]
          >
        : unknown[] extends contracts
          ? contracts
          : // If `contracts` is *some* array but we couldn't assign `unknown[]` to it, then it must hold some known/homogenous type!
            // use this to infer the param types in the case of Array.map() argument
            contracts extends {
                abi: infer abi extends Abi | readonly unknown[]
                functionName: infer functionName extends string
                args?: infer args extends readonly unknown[] | undefined
              }[]
            ? string extends functionName // if `functionName` is exactly `string`, then we can't infer the type param
              ? UninferrableContracts
              : (ContractParameters<
                  abi,
                  functionName,
                  ReadsStateMutability,
                  args
                > & {
                  abi: abi
                })[]
            : UninferrableContracts

export type ReadsParameters<contracts extends Contract[]> = {
  contracts: readonly [...ContractsParameters<contracts>]
}

export type ContractsReturnType<
  contracts extends Contract[],
  result extends any[] = [],
  depth extends readonly number[] = [],
> = depth['length'] extends MAXIMUM_DEPTH
  ? ContractReturnType[]
  : contracts extends []
    ? []
    : contracts extends [infer head extends Contract]
      ? [
          ...result,
          ContractReturnType<head['abi'], head['functionName'], head['args']>,
        ]
      : contracts extends [
            infer head extends Contract,
            ...infer tail extends Contract[],
          ]
        ? ContractsReturnType<
            [...tail],
            [
              ...result,
              ContractReturnType<
                head['abi'],
                head['functionName'],
                head['args']
              >,
            ],
            [...depth, 1]
          >
        : contracts extends {
              abi: infer abi extends Abi | readonly unknown[]
              functionName: infer functionName extends string
              args?: infer args extends readonly unknown[] | undefined
            }[]
          ? ContractReturnType<abi, functionName, args>[]
          : ContractReturnType[]

export type ReadsResult<contracts extends Contract[]> =
  ContractsReturnType<contracts>

/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/playgrounds/functions/src/write.ts, for comparison with the ScriptType alongside.
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
export type WriteParameters<
  abi extends Abi | readonly unknown[],
  functionName extends string,
  args extends readonly unknown[] | undefined = readonly unknown[] | undefined,
> = { abi: abi } & ContractParameters<
  abi,
  functionName,
  'nonpayable' | 'payable',
  args
>

export type WriteReturnType<
  abi extends Abi | readonly unknown[],
  functionName extends string,
  args extends readonly unknown[] | undefined,
> = ContractReturnType<abi, functionName, args>

/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/playgrounds/functions/src/write.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Abi<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ContractParameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ContractReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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

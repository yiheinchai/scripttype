/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/formatAbi.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Abi<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FormatAbiItem<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FormatAbi<abi extends Abi | readonly unknown[]> = Abi extends abi
  ? readonly string[]
  : abi extends readonly []
    ? never
    : abi extends Abi
      ? {
          [key in keyof abi]: FormatAbiItem<abi[key]>
        }
      : readonly string[]

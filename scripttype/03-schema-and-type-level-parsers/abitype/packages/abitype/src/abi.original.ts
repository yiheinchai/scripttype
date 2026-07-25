/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/abi.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Range<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolvedRegister<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SolidityFixedArrayRange = Range<
  ResolvedRegister['fixedArrayMinLength'],
  ResolvedRegister['fixedArrayMaxLength']
>[number]

export type _BuildArrayTypes<
  T extends string,
  Depth extends readonly number[] = [],
> = ResolvedRegister['arrayMaxDepth'] extends false
  ? `${T}[${string}]`
  : Depth['length'] extends ResolvedRegister['arrayMaxDepth']
    ? T
    : T extends `${any}[${SolidityFixedArrayRange | ''}]`
      ? _BuildArrayTypes<
          T | `${T}[${SolidityFixedArrayRange | ''}]`,
          [...Depth, 1]
        >
      : _BuildArrayTypes<`${T}[${SolidityFixedArrayRange | ''}]`, [...Depth, 1]>

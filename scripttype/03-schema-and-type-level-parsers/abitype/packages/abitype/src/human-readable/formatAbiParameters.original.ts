/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/formatAbiParameters.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbiEventParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FormatAbiParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Join<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FormatAbiParameters<
  abiParameters extends readonly [
    AbiParameter | AbiEventParameter,
    ...(readonly (AbiParameter | AbiEventParameter)[]),
  ],
> = Join<
  {
    [key in keyof abiParameters]: FormatAbiParameter<abiParameters[key]>
  },
  ', '
>

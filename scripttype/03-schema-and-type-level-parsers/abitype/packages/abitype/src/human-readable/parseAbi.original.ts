/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/parseAbi.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Abi<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Filter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParseSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParseStructs<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Signatures<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ParseAbi<signatures extends readonly string[]> =
  string[] extends signatures
    ? Abi // If `T` was not able to be inferred (e.g. just `string[]`), return `Abi`
    : signatures extends readonly string[]
      ? signatures extends Signatures<signatures> // Validate signatures
        ? ParseStructs<signatures> extends infer structs
          ? {
              [key in keyof signatures]: signatures[key] extends string
                ? ParseSignature<signatures[key], structs>
                : never
            } extends infer mapped extends readonly unknown[]
            ? Filter<mapped, never> extends infer result
              ? result extends readonly []
                ? never
                : result
              : never
            : never
          : never
        : never
      : never

/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/parseAbiItem.ts, for comparison with the ScriptType alongside.
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
type Signature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Signatures<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ParseAbiItem<
  signature extends string | readonly string[] | readonly unknown[],
> =
  | (signature extends string
      ? string extends signature
        ? Abi[number]
        : signature extends Signature<signature> // Validate signature
          ? ParseSignature<signature>
          : never
      : never)
  | (signature extends readonly string[]
      ? string[] extends signature
        ? Abi[number] // Return generic Abi item since type was no inferrable
        : signature extends Signatures<signature> // Validate signature
          ? ParseStructs<signature> extends infer structs
            ? {
                [key in keyof signature]: ParseSignature<
                  signature[key] extends string ? signature[key] : never,
                  structs
                >
              } extends infer mapped extends readonly unknown[]
              ? // Filter out `never` since those are structs
                Filter<mapped, never>[0] extends infer result
                ? result extends undefined // convert `undefined` to `never` (e.g. `ParseAbiItem<['struct Foo { string name; }']>`)
                  ? never
                  : result
                : never
              : never
            : never
          : never
      : never)

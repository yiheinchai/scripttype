/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/formatAbiParameter.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbiEventParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AssertName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNarrowable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Join<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FormatAbiParameter<
  abiParameter extends AbiParameter | AbiEventParameter,
> = abiParameter extends {
  name?: infer name extends string
  type: `tuple${infer array}`
  components: infer components extends readonly AbiParameter[]
  indexed?: infer indexed extends boolean
}
  ? FormatAbiParameter<
      {
        type: `(${Join<
          {
            [key in keyof components]: FormatAbiParameter<
              {
                type: components[key]['type']
              } & (IsNarrowable<components[key]['name'], string> extends true
                ? { name: components[key]['name'] }
                : unknown) &
                (components[key] extends { components: readonly AbiParameter[] }
                  ? { components: components[key]['components'] }
                  : unknown)
            >
          },
          ', '
        >})${array}`
      } & (IsNarrowable<name, string> extends true ? { name: name } : unknown) &
        (IsNarrowable<indexed, boolean> extends true
          ? { indexed: indexed }
          : unknown)
    >
  : `${abiParameter['type']}${abiParameter extends { indexed: true }
      ? ' indexed'
      : ''}${abiParameter['name'] extends infer name extends string
      ? name extends ''
        ? ''
        : ` ${AssertName<name>}`
      : ''}`

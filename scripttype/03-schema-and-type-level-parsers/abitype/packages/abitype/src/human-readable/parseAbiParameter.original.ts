/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/parseAbiParameter.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbiParameter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Filter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsStructSignature<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Modifier<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ParseAbiParameter_<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ParseStructs<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ParseAbiParameter<
  param extends string | readonly string[] | readonly unknown[],
> =
  | (param extends string
      ? param extends ''
        ? never
        : string extends param
          ? AbiParameter
          : ParseAbiParameter_<param, { modifier: Modifier }>
      : never)
  | (param extends readonly string[]
      ? string[] extends param
        ? AbiParameter // Return generic AbiParameter item since type was no inferrable
        : ParseStructs<param> extends infer structs
          ? {
              [key in keyof param]: param[key] extends string
                ? IsStructSignature<param[key]> extends true
                  ? never
                  : ParseAbiParameter_<
                      param[key],
                      { modifier: Modifier; structs: structs }
                    >
                : never
            } extends infer mapped extends readonly unknown[]
            ? Filter<mapped, never>[0] extends infer result
              ? result extends undefined
                ? never
                : result
              : never
            : never
          : never
      : never)

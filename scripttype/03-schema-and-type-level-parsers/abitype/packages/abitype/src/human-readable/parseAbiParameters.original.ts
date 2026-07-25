/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/parseAbiParameters.ts, for comparison with the ScriptType alongside.
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
type ParseAbiParameters_<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ParseStructs<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SplitParameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type DeepFlatten<
  T extends readonly unknown[],
  Acc extends readonly unknown[] = readonly [],
> = T extends readonly [infer head, ...infer tail]
  ? tail extends undefined
    ? never
    : head extends readonly unknown[]
      ? DeepFlatten<tail, readonly [...Acc, ...DeepFlatten<head>]>
      : DeepFlatten<tail, readonly [...Acc, head]>
  : Acc

export type ParseAbiParameters<
  params extends string | readonly string[] | readonly unknown[],
> =
  | (params extends string
      ? params extends ''
        ? never
        : string extends params
          ? readonly AbiParameter[]
          : ParseAbiParameters_<SplitParameters<params>, { modifier: Modifier }>
      : never)
  | (params extends readonly string[]
      ? string[] extends params
        ? AbiParameter // Return generic AbiParameter item since type was no inferrable
        : ParseStructs<params> extends infer structs
          ? {
              [key in keyof params]: params[key] extends string
                ? IsStructSignature<params[key]> extends true
                  ? never
                  : ParseAbiParameters_<
                      SplitParameters<params[key]>,
                      { modifier: Modifier; structs: structs }
                    >
                : never
            } extends infer mapped extends readonly unknown[]
            ? Filter<mapped, never> extends readonly [...infer content]
              ? content['length'] extends 0
                ? never
                : DeepFlatten<content>
              : never
            : never
          : never
      : never)

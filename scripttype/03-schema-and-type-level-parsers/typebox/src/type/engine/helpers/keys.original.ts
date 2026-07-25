/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/helpers/keys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TLiteralValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TConvertToIntegerKey<Value extends TLiteralValue,
  Normal extends string = `${Value}`,
  Result extends TLiteralValue = (
    Normal extends ` ${infer _ extends number}` ? Normal :
    Normal extends `${infer _ extends number} ` ? Normal :
    Normal extends `0${infer _ extends number}` ? Normal :
    Normal extends `-${infer _ extends number}` ? Normal :
    Normal extends `${infer Value extends number}` ? Value :
    Value
  )
> = Result

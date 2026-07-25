/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/_codec.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticDirection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StaticCodec<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Type extends TSchema, Decoded extends unknown> = (
  Direction extends 'Decode' ? Decoded : StaticType<Stack, Direction, Context, This, Omit<Type, '~codec'>> // prevent recurrent static
)

export type TDecodeCallback<Encoded extends unknown, Decoded = unknown> = (input: Encoded) => Decoded

export type TEncodeCallback<Encoded extends unknown, Decoded = unknown> = (input: Decoded) => Encoded

export type TCodec<Type extends TSchema = TSchema, Decoded extends unknown = unknown> = Type & {
  '~codec': {
    encode: TDecodeCallback<unknown, Decoded>
    decode: TEncodeCallback<unknown, Decoded>
  }
}

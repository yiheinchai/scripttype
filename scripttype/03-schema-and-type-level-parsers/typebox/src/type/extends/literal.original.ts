/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/literal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TBigInt<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TBoolean<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TExtendsRight<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TLiteralValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TNumber<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TString<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnreachable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TExtendsLiteralValue<Inferred extends TProperties, Left extends TLiteralValue, Right extends TLiteralValue> = (
  Left extends Right
  ? Result.TExtendsTrue<Inferred>
  : Result.TExtendsFalse
)

export type TExtendsLiteralBigInt<Inferred extends TProperties, Left extends bigint, Right extends TSchema> = (
  Right extends TLiteral<infer Value extends bigint> ? TExtendsLiteralValue<Inferred, Left, Value> :
  Right extends TBigInt ? Result.TExtendsTrue<Inferred> :
  TExtendsRight<Inferred, TLiteral<Left>, Right>
)

export type TExtendsLiteralBoolean<Inferred extends TProperties, Left extends boolean, Right extends TSchema> = (
  Right extends TLiteral<infer Value extends boolean> ? TExtendsLiteralValue<Inferred, Left, Value> :
  Right extends TBoolean ? Result.TExtendsTrue<Inferred> :
  TExtendsRight<Inferred, TLiteral<Left>, Right>
)

export type TExtendsLiteralNumber<Inferred extends TProperties, Left extends number, Right extends TSchema> = (
  Right extends TLiteral<infer Value extends number> ? TExtendsLiteralValue<Inferred, Left, Value> :
  Right extends TNumber ? Result.TExtendsTrue<Inferred> :
  TExtendsRight<Inferred, TLiteral<Left>, Right>
)

export type TExtendsLiteralString<Inferred extends TProperties, Left extends string, Right extends TSchema> = (
  Right extends TLiteral<infer Value extends string> ? TExtendsLiteralValue<Inferred, Left, Value> :
  Right extends TString ? Result.TExtendsTrue<Inferred> :
  TExtendsRight<Inferred, TLiteral<Left>, Right>
)

export type TExtendsLiteral<Inferred extends TProperties, Left extends TLiteral, Right extends TSchema> = (
  Left extends TLiteral<infer Value extends bigint> ? TExtendsLiteralBigInt<Inferred, Value, Right> :
  Left extends TLiteral<infer Value extends boolean> ? TExtendsLiteralBoolean<Inferred, Value, Right> :
  Left extends TLiteral<infer Value extends number> ? TExtendsLiteralNumber<Inferred, Value, Right> :
  Left extends TLiteral<infer Value extends string> ? TExtendsLiteralString<Inferred, Value, Right> :
  TUnreachable // TExtendsRight<Inferred, Left, Right>
)

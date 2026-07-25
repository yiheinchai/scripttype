/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/schema/VariantSchema.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type FieldTypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Struct_<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface Field<in out A extends Field.Config> extends Pipeable {
  readonly [FieldTypeId]: typeof FieldTypeId
  readonly schemas: A
}

export type Validate<A, Variant extends string> = {
    readonly [K in keyof A]: A[K] extends { readonly [TypeId]: infer _ } ? Validate<A[K], Variant> :
      A[K] extends Field<infer Config> ? [keyof Config] extends [Variant] ? {} : "field must have valid variants"
      : {}
  }

export type ConfigWithKeys<K extends string> = {
    readonly [P in K]?: Schema.Top
  }

export interface Struct<in out A extends Field.Fields> extends Pipeable {
  readonly [TypeId]: A
  /** @internal */
  [cacheSymbol]?: Record<string, Schema.Top>
}

export type Extract<V extends string, A extends Struct<any>, IsDefault = false> = [A] extends [
  Struct<infer Fields>
] ? IsDefault extends true ? [A] extends [Schema.Top] ? A : Schema.Struct<Struct_.Simplify<ExtractFields<V, Fields>>>
  : Schema.Struct<Struct_.Simplify<ExtractFields<V, Fields>>>
  : never

export type ExtractFields<V extends string, Fields extends Struct.Fields, IsDefault = false> = {
  readonly [
    K in keyof Fields as [Fields[K]] extends [Field<infer Config>] ? V extends keyof Config ? K
      : never
      : K
  ]: [Fields[K]] extends [Struct<infer _>] ? Extract<V, Fields[K], IsDefault>
    : [Fields[K]] extends [Field<infer Config>] ? [Config[V]] extends [Schema.Top] ? Config[V]
      : never
    : [Fields[K]] extends [Schema.Top] ? Fields[K]
    : never
}

export type MissingSelfGeneric<Params extends string = ""> =
  `Missing \`Self\` generic - use \`class Self extends Class<Self>()(${Params}{ ... })\``

export type Variants<Members extends ReadonlyArray<Struct<any>>, Variants extends string> = {
    readonly [Variant in Variants]: Schema.Union<
      {
        [K in keyof Members]: Extract<Variant, Members[K]>
      }
    >
  }

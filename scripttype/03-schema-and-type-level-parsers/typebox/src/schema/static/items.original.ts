/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/items.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type XSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type XStaticElements<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type XStaticSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type XFromSized<Stack extends string[], Root extends XSchema, Schema extends XSchema, Items extends XSchema[]> = (
  XStaticElements<Stack, Root, Schema, Items>
)

export type XFromUnsized<Stack extends string[], Root extends XSchema, Schema extends XSchema> = (
  XStaticSchema<Stack, Root, Schema>[]
)

export type XStaticItems<Stack extends string[], Root extends XSchema, Schema extends XSchema, Items extends XSchema[] | XSchema,
  Result extends unknown = (
    Items extends XSchema[] ? XFromSized<Stack, Root, Schema, [...Items]> :
    Items extends XSchema ? XFromUnsized<Stack, Root, Items> :
    never
  )
> = Result

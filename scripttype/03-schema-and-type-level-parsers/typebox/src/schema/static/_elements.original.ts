/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/_elements.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type XAdditionalItems<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XLessThan<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XMaxItems<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XMinItems<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type XWithElements<Stack extends string[], Root extends XSchema, Schemas extends XSchema[], Result extends unknown[] = []> = (
  Schemas extends [infer Left extends XSchema, ...infer Right extends XSchema[]]
    ? XWithElements<Stack, Root, Right, [...Result, XStaticSchema<Stack, Root, Left>]>
    : Result
)

export type XWithMaxItemsRemap<Elements extends unknown[], MaxItems extends number, Result extends unknown[] = []> = (
 Elements extends [infer Left extends unknown, ...infer Right extends unknown[]]
  ? XLessThan<Result['length'], MaxItems> extends true
    ? XWithMaxItemsRemap<Right, MaxItems, [...Result, Left]>
    : Result
  : Result
)

export type XWithMaxItems<Schema extends XSchema, Elements extends unknown[],
  Result extends unknown[] = Schema extends XMaxItems<infer MaxItems extends number> 
    ? XWithMaxItemsRemap<Elements, MaxItems> 
    : Elements
> = Result

export type XNeedsAdditionalItems<Schema extends XSchema, Elements extends unknown[],
  Result extends boolean = (
    Schema extends XMaxItems<infer MaxItems extends number> 
      ? XLessThan<Elements['length'], MaxItems> 
      : true
  )
> = Result

export type XWithMinItemsRemap<Elements extends unknown[], MinItems extends number, Result extends unknown[] = []> = (
  Elements extends [infer Left, ...infer Right]
    ? XLessThan<Result['length'], MinItems> extends true
      ? XWithMinItemsRemap<Right, MinItems, [...Result, Left]>
      : XWithMinItemsRemap<Right, MinItems, [...Result, Left?]>
    : Result
)

export type XWithMinItems<Schema extends XSchema, Values extends unknown[],
  MinItems extends number = Schema extends XMinItems<infer MinItems extends number> ? MinItems : 0,
  Result extends unknown[] = XWithMinItemsRemap<Values, MinItems> 
> = Result

export type XWithAdditionalItems<Stack extends string[], Root extends XSchema, Schema extends XSchema, Elements extends unknown[],
  Result extends unknown[] = Schema extends XAdditionalItems<infer Schema extends XSchema> ? (
    Schema extends true ? [...Elements, ...unknown[]] :
    Schema extends false ? [...Elements] :
    [...Elements, ...XStaticSchema<Stack, Root, Schema>[]]
  ) : [...Elements, ...unknown[]]
> = Result

export type XStaticElements<Stack extends string[], Root extends XSchema, Schema extends XSchema, PrefixItems extends XSchema[],
  WithElements extends unknown[] = XWithElements<Stack, Root, PrefixItems>,
  WithMaxItems extends unknown[] = XWithMaxItems<Schema, WithElements>,
  NeedsAdditional extends boolean = XNeedsAdditionalItems<Schema, WithMaxItems>,
  WithMinItems extends unknown[] = XWithMinItems<Schema, WithMaxItems>,
  WithAdditionalItems extends unknown[] = NeedsAdditional extends true 
    ? XWithAdditionalItems<Stack, Root, Schema, WithMinItems>
    : WithMinItems
> = WithAdditionalItems

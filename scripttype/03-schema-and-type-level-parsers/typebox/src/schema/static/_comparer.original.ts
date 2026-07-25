/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/_comparer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type XBuildTuple<Size extends number, Tuple extends unknown[] = []> = (
  Tuple['length'] extends Size 
    ? Tuple 
    : XBuildTuple<Size, [...Tuple, unknown]>
)

export type XLessThan<Left extends number, Right extends number> = Left extends Right ? false
  : XBuildTuple<Left> extends [...XBuildTuple<Right>, ...infer _Rest] ? false
  : true

export type XLessThanEqual<Left extends number, Right extends number> = (
  Left extends Right ? true : XLessThan<Left, Right>
)

export type XGreaterThan<Left extends number, Right extends number> = (
  XLessThan<Right, Left>
)

export type XGreaterThanEqual<Left extends number, Right extends number> = (
  XLessThanEqual<Right, Left>
)

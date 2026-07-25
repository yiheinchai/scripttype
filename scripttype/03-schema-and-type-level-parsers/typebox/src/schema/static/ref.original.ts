/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/ref.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type XPointerGet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type XCyclicCheck<Stack extends unknown[], MaxLength extends number, Buffer extends unknown[] = []> = (
  Stack extends [infer Left, ...infer Right]
    ? Buffer['length'] extends MaxLength
      ? false 
      : XCyclicCheck<Right, MaxLength, [...Buffer, Left]>
    : true
)

export type XCyclicGuard<Stack extends unknown[], Ref extends string> = (
  Ref extends Stack[number] ? XCyclicCheck<Stack, 2> : true
)

export type XNormal<Pointer extends string,
  Result extends string = (
    Pointer extends `#${infer Rest extends string}`
      ? Rest
      : Pointer
)> = Result

export type XStaticRef<Stack extends string[], Root extends XSchema, Ref extends string,
  Normal extends string = XNormal<Ref>,
  Target extends unknown = XPointerGet<Root, Normal>,
  Schema extends XSchema = Target extends XSchema ? Target : {},
  Result extends unknown = (
    XCyclicGuard<Stack, Ref> extends true
      ? XStaticSchema<[...Stack, Ref], Root, Schema>
      : any // terminate-recursive
)> = Result

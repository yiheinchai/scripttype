/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/ref.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type XPointerGet<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type XSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type XStaticSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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

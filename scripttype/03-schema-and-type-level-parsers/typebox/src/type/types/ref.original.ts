/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/ref.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type StaticDirection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CyclicStackLength<Stack extends unknown[], MaxLength extends number, Buffer extends unknown[] = []> = (
  Stack extends [infer Left, ...infer Right]
    ? Buffer['length'] extends MaxLength
      ? false 
      : CyclicStackLength<Right, MaxLength, [...Buffer, Left]>
    : true
)

export type CyclicGuard<Stack extends unknown[], Ref extends string> = (
  Ref extends Stack[number] ? CyclicStackLength<Stack, 2> : true
)

export type StaticGuardedRef<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Ref extends string, Type extends TSchema> = (
  CyclicGuard<Stack, Ref> extends true
    ? StaticType<[...Stack, Ref], Direction, Context, This, Type>
    : any
)

export type StaticRef<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Ref extends string,
  Target extends TSchema = Ref extends keyof Context ? Context[Ref] : TUnknown,
  Result extends unknown = Target extends TObject
    ? StaticType<[/* Reset */], Direction, Context, This, Target>
    : StaticGuardedRef<Stack, Direction, Context, This, Ref, Target>
> = Result

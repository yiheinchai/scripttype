/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/pointer/pointer_get.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TEscape1<Index extends string> = Index extends `${infer Left}~1${infer Right}` ? `${Left}/${TEscape<Right>}` : Index

export type TEscape<Index extends string, Escaped0 extends string = TEscape0<Index>, Escaped1 extends string = TEscape1<Escaped0>> = Escaped1

export type TEscape0<Index extends string> = Index extends `${infer Left}~0${infer Right}` ? `${Left}~${TEscape<Right>}` : Index

export type IndicesReduce<Pointer extends string, Result extends string[] = []> = (
  Pointer extends `${infer Left extends string}/${infer Right extends string}` 
    ? Left extends '' 
      ? IndicesReduce<Right, Result>
      : IndicesReduce<Right, [...Result, TEscape<Left>]>
    : [...Result, TEscape<Pointer>]
)

export type TIndices<Pointer extends string,
  Result extends string[] = Pointer extends '' ? [] : IndicesReduce<Pointer>
> = Result

export type TResolve<Value extends unknown, Indices extends string[]> = (
  Indices extends [infer Left extends string, ...infer Right extends string[]] 
    ? Left extends keyof Value 
      ? TResolve<Value[Left], Right>
      : undefined
    : Value
)

export type XPointerGet<Value extends unknown, Pointer extends string, 
  Indices extends string[] = TIndices<Pointer>, 
  Result extends unknown = TResolve<Value, Indices>
> = Result

/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/SchemaRepresentation.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SchemaAST<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface FilterReviver<P> {
  readonly id: string
  readonly payloadSchema: Schema.Decoder<P>
  readonly revive: (input: {
    readonly payload: P
    readonly schemas: ReadonlyArray<Schema.Top>
    readonly annotations: Schema.Annotations.Filter | undefined
  }) => SchemaAST.Filter<any>
}

export interface FilterGroupReviver<P> {
  readonly id: string
  readonly payloadSchema: Schema.Decoder<P>
  readonly revive: (input: {
    readonly payload: P
    readonly schemas: ReadonlyArray<Schema.Top>
    readonly annotations: Schema.Annotations.Filter | undefined
  }) => SchemaAST.FilterGroup<any>
}

export type CheckReviver<P> = FilterReviver<P> | FilterGroupReviver<P>

export interface DeclarationReviver<P> {
  readonly id: string
  readonly payloadSchema: Schema.Decoder<P>
  readonly revive: (input: {
    readonly payload: P
    readonly typeParameters: ReadonlyArray<Schema.Top>
    readonly annotations: Schema.Annotations.Annotations | undefined
  }) => Schema.Top
}

export type Reviver<P> = DeclarationReviver<P> | CheckReviver<P>

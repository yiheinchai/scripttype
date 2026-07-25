/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/SchemaRepresentation.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaAST<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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

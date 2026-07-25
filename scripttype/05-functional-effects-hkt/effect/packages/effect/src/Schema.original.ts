/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Schema.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Brand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FastCheck<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaAST<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Unify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Optionality = "required" | "optional"

export type Mutability = "readonly" | "mutable"

export type ConstructorDefault = "no-default" | "with-default"

export interface Constraint {
  readonly [TypeId]: typeof TypeId
  readonly "ast": SchemaAST.AST

  readonly "Type": unknown
  readonly "Encoded": unknown
  readonly "DecodingServices": unknown
  readonly "EncodingServices": unknown

  readonly "~type.parameters": any
  readonly "~type.make.in": unknown
  readonly "~type.make": unknown
  readonly "Iso": unknown

  readonly "~type.optionality": Optionality
  readonly "~type.mutability": Mutability
  readonly "~type.constructor.default": ConstructorDefault
  readonly "~encoded.optionality": Optionality
  readonly "~encoded.mutability": Mutability
}

export interface Codec<out T, out E = T, out RD = never, out RE = never> extends Schema<T> {
  readonly "Encoded": E
  readonly "DecodingServices": RD
  readonly "EncodingServices": RE
  readonly "Rebuild": Codec<T, E, RD, RE>
}

export type Type<TypeParameters extends ReadonlyArray<Constraint>> = {
      readonly [K in keyof TypeParameters]: Codec<TypeParameters[K]["Type"]>
    }

export type Encoded<TypeParameters extends ReadonlyArray<Constraint>> = {
      readonly [K in keyof TypeParameters]: Codec<TypeParameters[K]["Encoded"]>
    }

export type Elements = ReadonlyArray<Constraint>

export type DecodingServices<E extends Elements> = E[number]["DecodingServices"]

export type EncodingServices<E extends Elements> = E[number]["EncodingServices"]

export type LiteralPart = string | number | bigint

export type AppendType<
    Template extends string,
    Next
  > = Next extends LiteralPart ? `${Template}${Next}`
    : Next extends { readonly Encoded: infer E extends LiteralPart } ? `${Template}${E}`
    : never

export interface Struct<Fields extends Struct.Fields> extends BottomLazy<SchemaAST.Objects, Struct<Fields>> {
  readonly "Type": Struct.Type<Fields>
  readonly "Encoded": Struct.Encoded<Fields>
  readonly "DecodingServices": Struct.DecodingServices<Fields>
  readonly "EncodingServices": Struct.EncodingServices<Fields>
  readonly "~type.make.in": Struct.MakeIn<Fields>
  readonly "~type.make": Struct.MakeIn<Fields>
  readonly "Iso": Struct.Iso<Fields>
  /**
   * The field definitions of this struct. Spread them into a new struct to
   * reuse fields across schemas.
   *
   * **Example** (Reusing fields across structs)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * const Timestamped = Schema.Struct({
   *   createdAt: Schema.Date,
   *   updatedAt: Schema.Date
   * })
   *
   * const User = Schema.Struct({
   *   ...Timestamped.fields,
   *   name: Schema.String,
   *   email: Schema.String
   * })
   * ```
   */
  readonly fields: Fields
  /**
   * Returns a new struct with the fields modified by the provided function.
   *
   * **Details**
   *
   * Options:
   *
   * - `unsafePreserveChecks` - if `true`, keep any `.check(...)` constraints
   *   that were attached to the original union. Defaults to `false`.
   *
   *   **Warning**: This is an unsafe operation. Since `mapFields`
   *   transformations change the schema type, the original refinement functions
   *   may no longer be valid or safe to apply to the transformed schema. Only
   *   use this option if you have verified that your refinements remain correct
   *   after the transformation.
   */
  mapFields<To extends Struct.Fields>(
    f: (fields: Fields) => To,
    options?: {
      readonly unsafePreserveChecks?: boolean | undefined
    } | undefined
  ): Struct<Simplify<Readonly<To>>>
}

export type TypeOptionalKeys<Fields extends Struct.Fields> = {
    [K in keyof Fields]: Fields[K] extends { readonly "~type.optionality": "optional" } ? K
      : never
  }[keyof Fields]

export type TypeMutableKeys<Fields extends Struct.Fields> = {
    [K in keyof Fields]: Fields[K] extends { readonly "~type.mutability": "mutable" } ? K
      : never
  }[keyof Fields]

export type SetOptional<A, K extends keyof A> = Omit<A, K> & Partial<Pick<A, K>>

export type Mutable<A> = { -readonly [K in keyof A]: A[K] }

export type SetMutable<A, K extends keyof A> = Omit<A, K> & Mutable<Pick<A, K>>

export type EncodedOptionalKeys<Fields extends Struct.Fields> = {
    [K in keyof Fields]: Fields[K] extends { readonly "~encoded.optionality": "optional" } ? K
      : never
  }[keyof Fields]

export type EncodedMutableKeys<Fields extends Struct.Fields> = {
    [K in keyof Fields]: Fields[K] extends { readonly "~encoded.mutability": "mutable" } ? K
      : never
  }[keyof Fields]

export type Fields = { readonly [x: PropertyKey]: Constraint }

export type Side = "Type" | "Iso" | "Encoded"

export type SideOptionalKeys<F extends Fields, S extends Side> = S extends "Encoded" ? EncodedOptionalKeys<F>
    : TypeOptionalKeys<F>

export type SideMutableKeys<F extends Fields, S extends Side> = S extends "Encoded" ? EncodedMutableKeys<F>
    : TypeMutableKeys<F>

export type ReadonlySide<F extends Fields, S extends Side> = { readonly [K in keyof F]: F[K][S] }

export type View<
    F extends Fields,
    S extends Side,
    O extends keyof F = SideOptionalKeys<F, S>,
    M extends keyof F = SideMutableKeys<F, S>
  > = [O | M] extends [never] ? Simplify<ReadonlySide<F, S>>
    : [M] extends [never] ? Simplify<SetOptional<ReadonlySide<F, S>, O>>
    : [O] extends [never] ? Simplify<SetMutable<ReadonlySide<F, S>, M>>
    : Simplify<
      SetMutable<
        SetOptional<ReadonlySide<F, S>, O>,
        Extract<keyof SetOptional<ReadonlySide<F, S>, O>, M>
      >
    >

export interface TupleWithRest<
  S extends TupleWithRest.TupleType,
  Rest extends TupleWithRest.Rest
> extends
  BottomLazy<
    SchemaAST.Arrays,
    TupleWithRest<S, Rest>
  >
{
  readonly "Type": TupleWithRest.Type<S["Type"], Rest>
  readonly "Encoded": TupleWithRest.Encoded<S["Encoded"], Rest>
  readonly "DecodingServices": S["DecodingServices"] | Rest[number]["DecodingServices"]
  readonly "EncodingServices": S["EncodingServices"] | Rest[number]["EncodingServices"]
  readonly "~type.make.in": TupleWithRest.MakeIn<S["~type.make"], Rest>
  readonly "~type.make": TupleWithRest.MakeIn<S["~type.make"], Rest>
  readonly "Iso": TupleWithRest.Iso<S["Iso"], Rest>
  readonly schema: S
  readonly rest: Rest
}

export type Iso<T extends ReadonlyArray<unknown>, Rest extends TupleWithRest.Rest> = Rest extends
    readonly [infer Head extends Constraint, ...infer Tail extends ReadonlyArray<Constraint>] ? Readonly<[
      ...T,
      ...Array<Head["Iso"]>,
      ...{ readonly [K in keyof Tail]: Tail[K]["Iso"] }
    ]> :
    T

export type TypeConstructorDefaultedKeys<Fields extends Struct.Fields> = {
    [K in keyof Fields]: Fields[K] extends { readonly "~type.constructor.default": "with-default" } ? K
      : never
  }[keyof Fields]

export type ReadonlyMakeIn<F extends Fields> = { readonly [K in keyof F]: F[K]["~type.make"] }

export type MakeInView<
    F extends Fields,
    O extends keyof F = TypeOptionalKeys<F> | TypeConstructorDefaultedKeys<F>
  > = [O] extends [never] ? ReadonlyMakeIn<F> : Simplify<SetOptional<ReadonlyMakeIn<F>, O>>

export type MakeIn<M extends ReadonlyArray<unknown>, Rest extends TupleWithRest.Rest> = Rest extends
    readonly [infer Head extends Constraint, ...infer Tail extends ReadonlyArray<Constraint>] ? readonly [
      ...M,
      ...Array<Head["~type.make"]>,
      ...{ readonly [K in keyof Tail]: Tail[K]["~type.make"] }
    ] :
    M

export type MergeTuple<T extends ReadonlyArray<unknown>> = T extends readonly [infer Head, ...infer Tail] ?
    Head & MergeTuple<Tail>
    : {}

export type Objects = Constraint & { readonly ast: SchemaAST.Objects }

export interface StructWithRest<
  S extends StructWithRest.Objects,
  Records extends StructWithRest.Records
> extends
  BottomLazy<
    SchemaAST.Objects,
    StructWithRest<S, Records>
  >
{
  readonly "Type": Simplify<StructWithRest.Type<S, Records>>
  readonly "Encoded": Simplify<StructWithRest.Encoded<S, Records>>
  readonly "DecodingServices": StructWithRest.DecodingServices<S, Records>
  readonly "EncodingServices": StructWithRest.EncodingServices<S, Records>
  readonly "~type.make.in": Simplify<StructWithRest.MakeIn<S, Records>>
  readonly "~type.make": Simplify<StructWithRest.MakeIn<S, Records>>
  readonly "Iso": Simplify<StructWithRest.Iso<S, Records>>
  readonly schema: S
  readonly records: Records
}

export type Intersect<
    S extends Objects,
    Records extends StructWithRest.Records,
    Side extends "Type" | "Iso" | "Encoded" | "~type.make"
  > =
    & S[Side]
    & MergeTuple<{ readonly [K in keyof Records]: Records[K][Side] }>

export type Services<
    S extends Objects,
    Records extends StructWithRest.Records,
    Side extends "DecodingServices" | "EncodingServices"
  > =
    | S[Side]
    | { [K in keyof Records]: Records[K][Side] }[number]

export type IncompatibleKeys<A, B, OK extends (keyof A & keyof B) = Extract<keyof A, keyof B>> = {
    [K in OK]: Required<Pick<A, K>>[K] extends B[K] ? never : K
  }[OK]

export type IncompatibleSideKeys<
    S extends Objects,
    Records extends StructWithRest.Records,
    Side extends "Type" | "Encoded" | "Iso" | "~type.make"
  > = {
    [I in keyof Records]: Records[I][Side] extends object ? IncompatibleKeys<S[Side], Records[I][Side]> : never
  }[number]

export type IncompatibleRecords<S extends Objects, Records extends StructWithRest.Records> =
    | IncompatibleSideKeys<S, Records, "Type">
    | IncompatibleSideKeys<S, Records, "Encoded">
    | IncompatibleSideKeys<S, Records, "Iso">
    | IncompatibleSideKeys<S, Records, "~type.make">

export type ValidateRecords<
    S extends Objects,
    Records extends StructWithRest.Records
  > = [IncompatibleRecords<S, Records>] extends [never] ? true
    : {
      "incompatible index signatures": IncompatibleRecords<S, Records>
    }

export type Type_<
    Elements,
    Out extends ReadonlyArray<any> = readonly []
  > = Elements extends readonly [infer Head, ...infer Tail] ?
    Head extends { readonly "Type": infer T } ?
      Head extends { readonly "~type.optionality": "optional" } ? Type_<Tail, readonly [...Out, T?]>
      : Type_<Tail, readonly [...Out, T]>
    : Out
    : Out

export type Iso_<
    Elements,
    Out extends ReadonlyArray<any> = readonly []
  > = Elements extends readonly [infer Head, ...infer Tail] ?
    Head extends { readonly "Iso": infer T } ?
      Head extends { readonly "~type.optionality": "optional" } ? Iso_<Tail, readonly [...Out, T?]>
      : Iso_<Tail, readonly [...Out, T]>
    : Out
    : Out

export type Encoded_<
    Elements,
    Out extends ReadonlyArray<any> = readonly []
  > = Elements extends readonly [infer Head, ...infer Tail] ?
    Head extends { readonly "Encoded": infer T } ?
      Head extends { readonly "~encoded.optionality": "optional" } ? Encoded_<Tail, readonly [...Out, T?]>
      : Encoded_<Tail, readonly [...Out, T]>
    : Out
    : Out

export type MakeIn_<
    E,
    Out extends ReadonlyArray<any> = readonly []
  > = E extends readonly [infer Head, ...infer Tail] ?
    Head extends { "~type.make": infer T } ?
      Head extends
        { readonly "~type.optionality": "optional" } | { readonly "~type.constructor.default": "with-default" } ?
        MakeIn_<Tail, readonly [...Out, T?]> :
      MakeIn_<Tail, readonly [...Out, T]>
    : Out :
    Out

export type DistributeBrands<B> = UnionToIntersection<B extends infer U extends string ? Brand.Brand<U> : never>

export interface decodeTo<To extends Constraint, From extends Constraint, RD = never, RE = never> extends
  BottomLazy<
    To["ast"],
    decodeTo<To, From, RD, RE>,
    To["~type.parameters"],
    To["~type.mutability"],
    To["~type.optionality"],
    To["~type.constructor.default"],
    From["~encoded.mutability"],
    From["~encoded.optionality"]
  >
{
  readonly "Type": To["Type"]
  readonly "Encoded": From["Encoded"]
  readonly "DecodingServices": To["DecodingServices"] | From["DecodingServices"] | RD
  readonly "EncodingServices": To["EncodingServices"] | From["EncodingServices"] | RE
  readonly "~type.make.in": To["~type.make.in"]
  readonly "~type.make": To["~type.make"]
  readonly "Iso": To["Iso"]
  readonly from: From
  readonly to: To
}

export interface Literal<L extends SchemaAST.LiteralValue>
  extends Bottom<L, L, never, never, SchemaAST.Literal, Literal<L>>
{
  readonly literal: L
  transform<L2 extends SchemaAST.LiteralValue>(to: L2): decodeTo<Literal<L2>, Literal<L>>
}

export interface tag<Tag extends SchemaAST.LiteralValue> extends withConstructorDefault<Literal<Tag>> {}

export type TaggedStruct<Tag extends SchemaAST.LiteralValue, Fields extends Struct.Fields> = Struct<
  Simplify<{ readonly _tag: tag<Tag> } & Fields>
>

export interface Union<Members extends ReadonlyArray<Constraint>> extends
  BottomLazy<
    SchemaAST.Union<{ [K in keyof Members]: Members[K]["ast"] }[number]>,
    Union<Members>
  >
{
  readonly "Type": { [K in keyof Members]: Members[K]["Type"] }[number]
  readonly "Encoded": { [K in keyof Members]: Members[K]["Encoded"] }[number]
  readonly "DecodingServices": { [K in keyof Members]: Members[K]["DecodingServices"] }[number]
  readonly "EncodingServices": { [K in keyof Members]: Members[K]["EncodingServices"] }[number]
  readonly "~type.make.in": { [K in keyof Members]: Members[K]["~type.make"] }[number]
  readonly "~type.make": { [K in keyof Members]: Members[K]["~type.make"] }[number]
  readonly "Iso": { [K in keyof Members]: Members[K]["Iso"] }[number]
  readonly members: Members
  /**
   * Returns a new union with the members modified by the provided function.
   *
   * **Details**
   *
   * Options:
   *
   * - `unsafePreserveChecks` - if `true`, keep any `.check(...)` constraints
   *   that were attached to the original union. Defaults to `false`.
   *
   *   **Warning**: This is an unsafe operation. Since `mapFields`
   *   transformations change the schema type, the original refinement functions
   *   may no longer be valid or safe to apply to the transformed schema. Only
   *   use this option if you have verified that your refinements remain correct
   *   after the transformation.
   */
  mapMembers<To extends ReadonlyArray<Constraint>>(
    f: (members: Members) => To,
    options?: {
      readonly unsafePreserveChecks?: boolean | undefined
    } | undefined
  ): Union<Simplify<Readonly<To>>>
}

export type Flatten<Schemas> = Schemas extends readonly [infer Head, ...infer Tail]
  ? Head extends Union<infer Inner> ? [...Flatten<Inner>, ...Flatten<Tail>]
  : [Head, ...Flatten<Tail>]
  : []

export type TaggedUnionUtils<
  Tag extends PropertyKey,
  Members extends ReadonlyArray<Constraint & { readonly Type: { readonly [K in Tag]: PropertyKey } }>,
  Flattened extends ReadonlyArray<Constraint & { readonly Type: { readonly [K in Tag]: PropertyKey } }> = Flatten<
    Members
  >
> = {
  /**
   * Discriminant values in flattened member order.
   */
  readonly discriminants: { readonly [I in keyof Flattened]: Flattened[I]["Type"][Tag] }
  readonly cases: Simplify<{ [M in Flattened[number] as M["Type"][Tag]]: M }>
  readonly isAnyOf: <const Keys>(
    keys: ReadonlyArray<Keys>
  ) => (value: Members[number]["Type"]) => value is Extract<Members[number]["Type"], { readonly [K in Tag]: Keys }>
  readonly guards: { [M in Flattened[number] as M["Type"][Tag]]: (u: unknown) => u is M["Type"] }
  readonly match: {
    <
      Cases extends { [M in Flattened[number] as M["Type"][Tag]]: (value: M["Type"]) => any }
    >(
      value: Members[number]["Type"],
      cases: Cases
    ): Cases[keyof Cases] extends (value: any) => infer R ? Unify<R>
      : never
    <
      Cases extends { [M in Flattened[number] as M["Type"][Tag]]: (value: M["Type"]) => any }
    >(
      cases: Cases
    ): (value: Members[number]["Type"]) => Cases[keyof Cases] extends (value: any) => infer R ? Unify<R>
      : never
  }
}

export type toTaggedUnion<
  Tag extends PropertyKey,
  Members extends ReadonlyArray<Constraint & { readonly Type: { readonly [K in Tag]: PropertyKey } }>
> = Union<Members> & TaggedUnionUtils<Tag, Members>

export type OptionIso<A extends Constraint> =
  | { readonly _tag: "None" }
  | { readonly _tag: "Some"; readonly value: A["Iso"] }

export type ResultIso<A extends Constraint, E extends Constraint> =
  | { readonly _tag: "Success"; readonly success: A["Iso"] }
  | { readonly _tag: "Failure"; readonly failure: E["Iso"] }

export type CauseReasonIso<E extends Constraint, D extends Constraint> = {
  readonly _tag: "Fail"
  readonly error: E["Iso"]
} | {
  readonly _tag: "Die"
  readonly error: D["Iso"]
} | {
  readonly _tag: "Interrupt"
  readonly fiberId: number | undefined
}

export type CauseIso<E extends Constraint, D extends Constraint> = ReadonlyArray<CauseReasonIso<E, D>>

export type ExitIso<A extends Constraint, E extends Constraint, D extends Constraint> = {
  readonly _tag: "Success"
  readonly value: A["Iso"]
} | {
  readonly _tag: "Failure"
  readonly cause: CauseIso<E, D>
}

export type ReadonlyMapIso<Key extends Constraint, Value extends Constraint> = ReadonlyArray<
  readonly [Key["Iso"], Value["Iso"]]
>

export type HashMapIso<Key extends Constraint, Value extends Constraint> = ReadonlyArray<
  readonly [Key["Iso"], Value["Iso"]]
>

export type ReadonlySetIso<Value extends Constraint> = ReadonlyArray<Value["Iso"]>

export type HashSetIso<Value extends Constraint> = ReadonlyArray<Value["Iso"]>

export type ChunkIso<Value extends Constraint> = ReadonlyArray<Value["Iso"]>

export type InheritStaticMembers<C, Static> = C & Pick<Static, Exclude<keyof Static, keyof C>>

export type MissingSelfGeneric<Usage extends string> =
  `Missing \`Self\` generic - use \`class Self extends ${Usage}<Self>(...)\``

export type LazyArbitrary<T> = (fc: typeof FastCheck) => FastCheck.Arbitrary<T>

export interface TreeRecord<A> {
  readonly [x: string]: Tree<A>
}

export type Tree<Node> = Node | TreeRecord<Node> | ReadonlyArray<Tree<Node>>

export interface Derivation<T> {
      readonly arbitrary: FastCheck.Arbitrary<T>
      readonly terminal?: FastCheck.Arbitrary<T> | undefined
    }

export type Output<T> = FastCheck.Arbitrary<T> | Derivation<T>

/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Brand.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BrandError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Option<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaAST<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Types<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Brand<in out Keys extends string> {
  readonly [TypeId]: {
    readonly [K in Keys]: Keys
  }
}

export interface Constructor<in out B extends Brand<any>> {
  /**
   * Constructs a branded type from a value of type `Unbranded<B>`, throwing an
   * error if the provided value is not valid.
   */
  (unbranded: Brand.Unbranded<B>): B
  /**
   * Constructs a branded type from a value of type `Unbranded<B>`, returning
   * `Some<B>` if the provided value is valid, `None` otherwise.
   */
  option(unbranded: Brand.Unbranded<B>): Option.Option<B>
  /**
   * Constructs a branded type from a value of type `Unbranded<B>`, returning
   * `Success<B>` if the provided value is valid, `Failure<BrandError>`
   * otherwise.
   */
  result(unbranded: Brand.Unbranded<B>): Result.Result<B, BrandError>
  /**
   * Attempts to refine the provided value of type `Unbranded<B>`, returning
   * `true` if the provided value is a valid branded type, `false` otherwise.
   */
  is(unbranded: Brand.Unbranded<B>): unbranded is Brand.Unbranded<B> & B

  /**
   * The checks that are applied to the branded type.
   *
   * @internal
   */
  checks?: readonly [SchemaAST.Check<Brand.Unbranded<B>>, ...Array<SchemaAST.Check<Brand.Unbranded<B>>>] | undefined
}

export type FromConstructor<C> = C extends Constructor<infer B> ? B : never

export type Keys<B extends Brand<any>> = keyof B[typeof TypeId]

export type Brands<B extends Brand<any>> = Types.UnionToIntersection<
    { [K in Keys<B>]: K extends string ? Brand<K> : never }[Keys<B>]
  >

export type Unbranded<B extends Brand<any>> = B extends infer U & Brands<B> ? U : B

export type EnsureCommonBase<
    Brands extends readonly [Constructor<any>, ...Array<Constructor<any>>]
  > = {
    [B in keyof Brands]: Brand.Unbranded<Brand.FromConstructor<Brands[0]>> extends
      Brand.Unbranded<Brand.FromConstructor<Brands[B]>>
      ? Brand.Unbranded<Brand.FromConstructor<Brands[B]>> extends Brand.Unbranded<Brand.FromConstructor<Brands[0]>>
        ? Brands[B]
      : Brands[B]
      : "ERROR: All brands should have the same base type"
  }

export type Branded<A, Key extends string> = A & Brand<Key>

/**
 * ORIGINAL TypeScript from 01-type-level-programming/expect-type/src/branding.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ConstructorOverloadParameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InstanceType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutuallyExtends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NumOverloads<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OverloadsInfoUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ThisParameterType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleToRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DeepBrandOptions = {
  nominalTypes: {}
}

export type NominalType<T, Options extends DeepBrandOptions> = Options['nominalTypes'] extends infer N
  ? {
      [K in keyof N]: MutuallyExtends<N[K], T> extends true ? K : never
    }[keyof N]
  : never

export type DeepBrand<T, Options extends DeepBrandOptions> =
  IsNever<T> extends true
    ? {type: 'never'}
    : IsAny<T> extends true
      ? {type: 'any'}
      : IsUnknown<T> extends true
        ? {type: 'unknown'}
        : NominalType<T, Options> extends infer Nominal
          ? IsNever<Nominal> extends true
            ? T extends string | number | boolean | symbol | bigint | null | undefined | void
              ? {
                  type: 'primitive'
                  value: T
                }
              : T extends new (...args: any[]) => any
                ? {
                    type: 'constructor'
                    params: ConstructorOverloadParameters<T>
                    instance: DeepBrand<InstanceType<Extract<T, new (...args: any) => any>>, Options>
                  }
                : T extends (...args: infer P) => infer R // avoid functions with different params/return values matching
                  ? NumOverloads<T> extends 1
                    ? {
                        type: 'function'
                        params: DeepBrand<P, Options>
                        return: DeepBrand<R, Options>
                        this: DeepBrand<ThisParameterType<T>, Options>
                        props: DeepBrand<Omit<T, keyof Function>, Options>
                      }
                    : UnionToTuple<OverloadsInfoUnion<T>> extends infer OverloadsTuple
                      ? {
                          type: 'overloads'
                          overloads: {
                            [K in keyof OverloadsTuple]: DeepBrand<OverloadsTuple[K], Options>
                          }
                        }
                      : never
                  : T extends any[]
                    ? IsTuple<T> extends true
                      ? {
                          type: 'tuple'
                          items: {
                            [K in keyof T]: DeepBrand<T[K], Options>
                          }
                        }
                      : {
                          type: 'array'
                          items: DeepBrand<T[number], Options>
                        }
                    : IsRecord<T> extends true
                      ? {
                          type: 'record'
                          keys: keyof T
                          values: DeepBrand<T[keyof T], Options>
                        }
                      : {
                          type: 'object'
                          properties: {
                            [K in keyof T]: DeepBrand<T[K], Options>
                          }
                          readonly: ReadonlyKeys<T>
                          required: RequiredKeys<T>
                          optional: OptionalKeys<T>
                          constructorParams: ConstructorOverloadParameters<T> extends infer P
                            ? IsNever<P> extends true
                              ? never
                              : DeepBrand<P, Options>
                            : never
                        }
            : {type: Nominal}
          : never

export type StrictEqualUsingBranding<Left, Right, Options extends DeepBrandOptions> = MutuallyExtends<
  DeepBrand<Left, Options>,
  DeepBrand<Right, Options>
>

export type Prop<K> = K extends string | number ? K : 'UNEXPECTED_NON_LITERAL_PROP'

export type DeepBrandPropPathSuffix<T, K> = T extends {type: string}
  ? K extends 'items'
    ? '[number]'
    : K extends 'properties'
      ? ''
      : `(${Prop<K>})`
  : `.${Prop<K>}`

export type _DeepPropTypesOfBranded<T, PathTo extends string, FindType extends string> =
  IsNever<T> extends true
    ? {}
    : T extends string
      ? {}
      : T extends {type: FindType}
        ? {[K in PathTo]: T['type']} & {deepBrandLeafNode: true} // deepBrandLeafNode marker helps us throw out lots of array props which we don't want to include
        : T extends any[]
          ? _DeepPropTypesOfBranded<TupleToRecord<T>, PathTo, FindType>
          : UnionToIntersection<
              {
                [K in keyof T]: Extract<
                  _DeepPropTypesOfBranded<T[K], `${PathTo}${DeepBrandPropPathSuffix<T, Prop<K>>}`, FindType>,
                  {deepBrandLeafNode: true}
                >
              }[keyof T]
            >

export type DeepBrandPropNotesOptions = Partial<DeepBrandOptions> & {
  findType: 'any' | 'never' | 'unknown'
}

export type DeepBrandOptionsDefaults = {
  nominalTypes: {
    Date: Date
  }
}

export type DeepBrandPropNotes<T, Options extends DeepBrandPropNotesOptions> =
  _DeepPropTypesOfBranded<DeepBrand<T, DeepBrandOptionsDefaults & Options>, '', Options['findType']> extends infer X
    ? {} extends X
      ? Record<string | number | symbol, 'No flagged props found!'> // avoid letting `{'.propThatUsedToBeAny': 'any'}` still being accepted after it's fixed
      : {[K in Exclude<keyof X, 'deepBrandLeafNode'>]: X[K]}
    : never
